#!/usr/bin/env node

// Local, manual snapshot sync. This module is never imported by the storefront.
import { randomUUID } from "node:crypto";
import { readFile, realpath, rename, stat, unlink, writeFile } from "node:fs/promises";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";
import { isIP } from "node:net";
import { fileURLToPath } from "node:url";
import { TextDecoder } from "node:util";
import { JSDOM } from "jsdom";
import { groundiesSelection } from "./groundies-selection.mjs";
import { groundiesGalleries } from "./groundies-galleries.mjs";

const toolDirectory = dirname(fileURLToPath(import.meta.url));
const inputDirectory = resolve(toolDirectory, "input");
const outputPath = resolve(toolDirectory, "../../src/data/groundiesProducts.ts");
const fitLabels = { women: "Mujer", men: "Hombre", unisex: "Unisex" };
const features = ["Horma anatómica", "Drop cero", "Espacio amplio para los dedos", "Preventa asistida"];
const normalize = (text) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const selectionKey = (title, color) => JSON.stringify([title, color]);

function field(item, name) {
  const fields = [...item.children].filter((child) => child.localName === name);
  if (fields.length > 1 || fields.some((child) => child.children.length)) {
    throw new Error(`XML item has ambiguous ${name} markup; catalog unchanged.`);
  }
  return fields[0]?.textContent.trim() ?? "";
}

export function publicImage(value) {
  try {
    const url = new URL(value);
    const decoded = decodeURIComponent(value);
    // Shopify's numeric `v` is a public image cache version, not authentication.
    // Reject every other query rather than accidentally publishing signed links.
    const publicQuery = !url.search || (url.hostname === "cdn.shopify.com" &&
      [...url.searchParams].length === 1 && /^\d+$/.test(url.searchParams.get("v") ?? ""));
    if (url.protocol !== "https:" || url.username || url.password || !publicQuery || url.hash ||
        !url.hostname.includes(".") || url.hostname.endsWith(".local") ||
        url.hostname.endsWith(".localhost") || isIP(url.hostname.replace(/^\[|\]$/g, "")) ||
        /\s/u.test(value) || /[\u0000-\u001f\u007f]/u.test(decoded) ||
        /secret|token|api[_-]?key|auth|signature|password|credential|\.xml(?:$|\/)/i.test(decoded) ||
        url.pathname === "/") return null;
    return url.href;
  } catch {
    return null;
  }
}

// Ignore public cache versions when detecting the same photograph twice.
export function groundiesImageKey(value) {
  const url = new URL(value);
  return `${url.origin}${url.pathname}`;
}

// Compare already-observed media families; never construct or guess URLs.
export function groundiesImageFamily(value) {
  const filename = new URL(value).pathname.split("/").at(-1).toLowerCase();
  const marker = filename.indexOf("_pic");
  return marker > 0 ? filename.slice(0, marker) : null;
}

function reviewedGallery(entry, slug, primaryImages, galleries) {
  const gallery = galleries[slug];
  if (!gallery) {
    if (Object.keys(galleries).length) throw new Error(`${slug}: missing reviewed gallery; catalog unchanged.`);
    return [...primaryImages];
  }
  let validSource = false;
  try {
    const source = new URL(gallery.sourceUrl);
    validSource = ["https://www.groundies.com", "https://groundies.com"].includes(source.origin) &&
      !source.username && !source.password && !source.search && !source.hash && /^\/products\/[a-z0-9-]+$/.test(source.pathname);
  } catch { /* Fail below without printing source values. */ }
  if (!validSource || gallery.title !== entry.title || gallery.color !== entry.color ||
      gallery.gender !== entry.gender || gallery.fit !== "Barefoot" || !Array.isArray(gallery.secondaryImages)) {
    throw new Error(`${slug}: reviewed source identity does not match the approved variant; catalog unchanged.`);
  }
  const allowedViews = new Set(["top", "sole", "rear", "detail", "angled", "on-foot"]);
  if (gallery.secondaryImages.some((image) => !image || !allowedViews.has(image.view))) {
    throw new Error(`${slug}: invalid reviewed photograph metadata; catalog unchanged.`);
  }
  const reviewed = [gallery.primaryImage, ...gallery.secondaryImages.map(({ url }) => url)].map(publicImage);
  if (reviewed.some((url) => !url || new URL(url).hostname !== "cdn.shopify.com")) {
    throw new Error(`${slug}: unsafe reviewed image URL; catalog unchanged.`);
  }
  const family = groundiesImageFamily(reviewed[0]);
  if (!family || reviewed.some((url) => groundiesImageFamily(url) !== family)) {
    throw new Error(`${slug}: reviewed photos mix model, color or fit media families; catalog unchanged.`);
  }
  const approvedKeys = new Set(reviewed.map(groundiesImageKey));
  if (approvedKeys.size !== reviewed.length || reviewed.length > 8) {
    throw new Error(`${slug}: reviewed gallery must contain distinct photos and at most 8 images; catalog unchanged.`);
  }
  if ([...primaryImages].some((url) => groundiesImageKey(url) !== groundiesImageKey(reviewed[0]))) {
    throw new Error(`${slug}: XML primary image needs a new gallery review; catalog unchanged.`);
  }
  const images = new Map();
  for (const url of [...primaryImages, ...reviewed]) {
    const key = groundiesImageKey(url);
    if (!images.has(key)) images.set(key, url);
  }
  return [...images.values()];
}

function sizeLabel(value, slug) {
  if (!/^[1-9]\d?(?:[.,]\d+)?$/.test(value)) {
    throw new Error(`${slug}: missing or unsupported numeric size; catalog unchanged.`);
  }
  return String(Number(value.replace(",", ".")));
}

/** Parse privately; return only explicitly constructed public fields. No raw XML errors escape. */
export function generateGroundiesProducts(xml, warn = console.warn, galleries = groundiesGalleries) {
  if (/<!\s*(?:DOCTYPE|ENTITY)\b/i.test(xml)) {
    throw new Error("DOCTYPE and ENTITY declarations are forbidden; catalog unchanged.");
  }
  let dom;
  try {
    dom = new JSDOM(xml, { contentType: "application/xml" });
  } catch {
    throw new Error("Malformed or incomplete XML; catalog unchanged.");
  }
  try {
    const items = [...dom.window.document.getElementsByTagNameNS("*", "item")];
    if (!items.length || items.some((item) => item.getElementsByTagNameNS("*", "item").length)) {
      throw new Error("XML must contain non-nested item records; catalog unchanged.");
    }
    const selected = new Map(groundiesSelection.map(({ title, color }) => [selectionKey(title, color), []]));
    for (const item of items) {
      selected.get(selectionKey(field(item, "title"), field(item, "color")))?.push(item);
    }
    return groundiesSelection.map((entry) => {
      const color = entry.colorName ?? entry.color;
      const slug = entry.slug ?? `groundies-${normalize(entry.model)}-${normalize(color)}`;
      const rows = selected.get(selectionKey(entry.title, entry.color));
      if (!rows.length) {
        warn(`WARNING ${slug}: approved colorway is missing; synchronization aborted.`);
        throw new Error("Incomplete approved selection; catalog unchanged.");
      }
      const sizes = new Set();
      const images = new Set();
      for (const row of rows) {
        const availability = field(row, "availability");
        if (!["in_stock", "out_of_stock", "preorder", "backorder"].includes(availability)) {
          throw new Error(`${slug}: missing or unsupported availability; catalog unchanged.`);
        }
        const size = sizeLabel(field(row, "size"), slug);
        if (availability === "in_stock") sizes.add(size);
        const image = publicImage(field(row, "image_link"));
        if (image) images.add(image);
      }
      if (!images.size) {
        warn(`WARNING ${slug}: no valid public HTTPS image; synchronization aborted.`);
        throw new Error("Invalid approved photography; catalog unchanged.");
      }
      if (!sizes.size) warn(`WARNING ${slug}: zero consultable sizes; manual publication review required.`);
      const galleryImages = reviewedGallery(entry, slug, images, galleries);
      if (galleryImages.length < 4) warn(`EDITORIAL ${slug}: ${galleryImages.length} photo(s); additional manufacturer photography needed.`);
      const groupSlug = `groundies-${normalize(entry.model)}${entry.gender === "unisex" ? "" : `-${entry.gender}`}`;
      const name = `Groundies ${entry.model} · ${fitLabels[entry.gender]}`;
      return {
        id: slug, slug, brand: "Groundies", model: entry.model, groupSlug, groupName: name, name,
        subtitle: `${color} · preventa asistida`, gender: entry.gender, category: entry.category,
        colorName: color, colorFamily: color, colorHex: entry.colorHex,
        price: 0, currency: "$", status: "preorder",
        consultableSizes: [...sizes].sort((a, b) => Number(a) - Number(b)), sizes: [], images: galleryImages,
        features: [...features], tags: ["Preventa asistida"], isNew: true, isFeatured: entry.featured === true,
        tag: entry.featured ? "Lanzamiento" : "Preventa",
        seoTitle: `Groundies ${entry.model} ${color} | Chiriko Studio Venezuela`,
        seoDescription: `Groundies ${entry.model} en ${color}. Calzado barefoot en preventa asistida con confirmación de talla por WhatsApp.`,
      };
    });
  } finally {
    dom.window.close();
  }
}

export function serializeGroundiesProducts(products) {
  return `import type { Product } from "./productTypes";\n\n// Generated by the manual curated sync. Review before publishing.\nexport const groundiesProducts: Product[] = ${JSON.stringify(products, null, 2)};\n`;
}

export async function syncGroundiesSelection(inputPath = resolve(inputDirectory, "groundies.xml")) {
  if (typeof inputPath !== "string" || /^[a-z][a-z\d+.-]*:/i.test(inputPath)) {
    throw new Error("Only a local XML file inside the private input directory is accepted.");
  }
  let bytes;
  try {
    const [privateRoot, actualPath] = await Promise.all([realpath(inputDirectory), realpath(resolve(inputPath))]);
    const inside = relative(privateRoot, actualPath);
    if (!inside || inside === ".." || inside.startsWith(`..${sep}`) || isAbsolute(inside) || !(await stat(actualPath)).isFile()) {
      throw new Error("Invalid input");
    }
    bytes = await readFile(actualPath);
  } catch {
    throw new Error("Cannot read a local XML file inside the private input directory; catalog unchanged.");
  }
  let xml;
  try { xml = new TextDecoder("utf-8", { fatal: true }).decode(bytes); }
  catch { throw new Error("XML must be valid UTF-8; catalog unchanged."); }
  const products = generateGroundiesProducts(xml);
  const expectedCount = groundiesSelection.length;
  if (!expectedCount || products.length !== expectedCount || new Set(products.map(({ slug }) => slug)).size !== expectedCount ||
      new Set(products.map(({ id }) => id)).size !== expectedCount) {
    throw new Error(`The approved selection must contain exactly ${expectedCount} unique products; catalog unchanged.`);
  }
  const serialized = serializeGroundiesProducts(products);
  const temporaryPath = `${outputPath}.${randomUUID()}.tmp`;
  try {
    await writeFile(temporaryPath, serialized, { encoding: "utf8", flag: "wx", mode: 0o644 });
    await rename(temporaryPath, outputPath);
  } finally {
    await unlink(temporaryPath).catch((error) => { if (error.code !== "ENOENT") throw error; });
  }
  console.log(`Synchronized ${products.length} approved Groundies colorways. Review this manual snapshot before publication.`);
  return products;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv.length > 3) {
    console.error("Pass at most one local XML path. Catalog unchanged.");
    process.exitCode = 1;
  } else {
    syncGroundiesSelection(process.argv[2]).catch((error) => {
      // Never print system errors, input paths, XML excerpts, or supplier values.
      console.error(error.code ? "Groundies sync could not write public output; catalog unchanged." : error.message);
      process.exitCode = 1;
    });
  }
}
