#!/usr/bin/env node

/**
 * Internal, review-only XML importer.
 *
 * This script intentionally uses an allowlist and never copies descriptions,
 * pricing formulas, inventory quantities, or other unrecognized source fields.
 * Every generated draft must be reviewed before it is copied to the storefront.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const toolDirectory = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(toolDirectory, "output/product-drafts.json");
const itemElementNames = new Set(["product", "item", "article"]);
const genericProductTypes = new Set([
  "barefoot-tenisky", "barefoot-topanky", "barefoot-sandale",
  "zimne-barefoot-topanky", "barefoot-snehule", "detske-barefoot-topanky",
  "barefoot-baleriny", "barefoot-ponozky", "stielka", "unisex-tricko",
]);

function usage(message) {
  if (message) console.error(`Error: ${message}\n`);
  console.error("Usage: node tools/catalog-manager/import-feed.mjs <local-feed.xml>");
  process.exitCode = 1;
}

function decodeXml(value) {
  return value.replace(/&(?:#(\d+)|#x([\da-f]+)|amp|lt|gt|quot|apos);/gi, (entity, decimal, hex) => {
    if (decimal) return String.fromCodePoint(Number(decimal));
    if (hex) return String.fromCodePoint(Number.parseInt(hex, 16));
    return { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&apos;": "'" }[entity.toLowerCase()];
  });
}

function parseXml(xml) {
  if (/<!DOCTYPE|<!ENTITY/i.test(xml)) {
    throw new Error("DOCTYPE and ENTITY declarations are not accepted");
  }

  const root = { name: "root", attributes: {}, children: [], text: "" };
  const stack = [root];
  const tokens = xml.match(/<!\[CDATA\[[\s\S]*?\]\]>|<!--[\s\S]*?-->|<[^>]+>|[^<]+/g) ?? [];

  for (const token of tokens) {
    if (token.startsWith("<!--") || token.startsWith("<?")) continue;
    if (token.startsWith("<![CDATA[")) {
      stack.at(-1).text += token.slice(9, -3);
    } else if (token.startsWith("</")) {
      const closingName = token.slice(2, -1).trim().split(":").at(-1).toLowerCase();
      if (stack.length === 1 || stack.at(-1).name !== closingName) throw new Error(`Malformed XML near ${token}`);
      stack.pop();
    } else if (token.startsWith("<")) {
      const selfClosing = /\/\s*>$/.test(token);
      const rawName = token.slice(1).match(/^\s*([^\s/>]+)/)?.[1];
      if (!rawName || token.startsWith("<!")) continue;
      const attributes = {};
      const attributeSource = token.slice(token.indexOf(rawName) + rawName.length, token.length - (selfClosing ? 2 : 1));
      for (const match of attributeSource.matchAll(/([^\s=]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) {
        attributes[normalizedName(match[1].split(":").at(-1))] = decodeXml(match[2] ?? match[3] ?? "");
      }
      const node = { name: rawName.split(":").at(-1).toLowerCase(), attributes, children: [], text: "" };
      stack.at(-1).children.push(node);
      if (!selfClosing) stack.push(node);
    } else {
      stack.at(-1).text += decodeXml(token);
    }
  }

  if (stack.length !== 1) throw new Error("Malformed XML: an element was not closed");
  return root;
}

function normalizedName(value) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function directValue(node, aliases) {
  const accepted = new Set(aliases.map(normalizedName));
  const child = node.children.find((candidate) => accepted.has(normalizedName(candidate.name)));
  if (child) return nodeValue(child);
  const attribute = Object.entries(node.attributes).find(([name]) => accepted.has(name));
  return attribute?.[1] ?? "";
}

function directNode(node, aliases) {
  const accepted = new Set(aliases.map(normalizedName));
  return node.children.find((candidate) => accepted.has(normalizedName(candidate.name)));
}

function descendantValues(node, aliases) {
  const accepted = new Set(aliases.map(normalizedName));
  const values = [];
  const visit = (candidate) => {
    if (accepted.has(normalizedName(candidate.name))) values.push(nodeValue(candidate));
    candidate.children.forEach(visit);
  };
  node.children.forEach(visit);
  return values.filter(Boolean);
}

function allText(node) {
  return [node.text, ...node.children.map(allText)].join(" ").replace(/\s+/g, " ").trim();
}

function nodeValue(node) {
  return allText(node) || node.attributes.url || node.attributes.src || node.attributes.value || node.attributes.name || "";
}

function clean(value, fallback = "") {
  return String(value || fallback).replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, 240);
}

function slugify(value) {
  return clean(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 100) || "review-product";
}

function unique(values) {
  return [...new Set(values.map((value) => clean(value)).filter(Boolean))];
}

const colorStopWords = new Set(["all", "and", "with", "vegan", "leather", "color", "colour"]);

function urlSlug(value) {
  try {
    return slugify(decodeURIComponent(new URL(value).pathname));
  } catch {
    return "";
  }
}

function identityTokens(value) {
  return slugify(value).split("-").filter((token) => token.length > 1);
}

function colorTokens(value) {
  return identityTokens(value).filter((token) => !colorStopWords.has(token) && !/^\d+$/.test(token));
}

function containsTokens(haystack, tokens) {
  const padded = `-${haystack}-`;
  return tokens.length > 0 && tokens.every((token) => padded.includes(`-${token}-`));
}

function hasLeatherMarker(image) {
  return /(^|-)leather(-|$)/.test(urlSlug(image));
}

function materialPreference(product) {
  const naming = `${product.colorName} ${product.sourceTitle}`;
  if (/\bvegan\b/i.test(naming)) return "vegan";
  if (/\bleather\b/i.test(naming)) return "leather";
  return "unspecified";
}

function selectMaterialImages(images, product) {
  const preference = materialPreference(product);
  const leather = images.filter(hasLeatherMarker);
  const nonLeather = images.filter((image) => !hasLeatherMarker(image));

  if (preference === "vegan") return nonLeather;
  if (preference === "leather") return leather.length ? leather : nonLeather;
  // An unlabelled color normally uses unlabelled files, but some supplier
  // leather colors (notably Zing) only have otherwise-valid leather URLs.
  return nonLeather.length ? nonLeather : leather;
}

function imageMatchesProduct(image, product, catalog, { strictColor = true } = {}) {
  const path = urlSlug(image);
  const modelTokens = identityTokens(product.model);
  if (!path || !containsTokens(path, modelTokens)) return false;

  const otherModels = unique(catalog
    .filter((candidate) => slugify(candidate.model) !== slugify(product.model))
    .map((candidate) => candidate.model))
    .filter((model) => !identityTokens(model).every((token) => modelTokens.includes(token)));
  if (otherModels.some((model) => containsTokens(path, identityTokens(model)))) return false;
  const otherBrands = unique(catalog
    .filter((candidate) => slugify(candidate.brand) !== slugify(product.brand))
    .map((candidate) => candidate.brand));
  if (otherBrands.some((brand) => containsTokens(path, identityTokens(brand)))) return false;

  const sameModelRows = catalog.filter((candidate) => slugify(candidate.model) === slugify(product.model));

  const selected = colorTokens(product.colorName);
  const selectedTokenMatch = selected.some((token) => containsTokens(path, [token]));
  const selectedColorMatch = containsTokens(path, selected);
  const otherColors = unique(sameModelRows
    .filter((candidate) => slugify(candidate.colorName) !== slugify(product.colorName))
    .map((candidate) => candidate.colorName));
  const obviousOtherColor = otherColors.some((color) => {
    const tokens = colorTokens(color);
    return containsTokens(path, tokens) && !selectedTokenMatch;
  });
  if (obviousOtherColor) return false;
  if (!strictColor) return true;

  // Some supplier filenames omit colors entirely. Only demand a color match when
  // the path contains color tokens belonging to one of this model's variants.
  const knownColorTokens = new Set(sameModelRows.flatMap((candidate) => colorTokens(candidate.colorName)));
  const pathHasKnownColor = [...knownColorTokens].some((token) => containsTokens(path, [token]));
  return !pathHasKnownColor || selectedColorMatch;
}

function normalizeGender(value) {
  const gender = slugify(value);
  if (/^(men|male|man|hombre|hombres)$/.test(gender)) return "men";
  if (/^(women|female|woman|mujer|mujeres)$/.test(gender)) return "women";
  if (/^(kids|kid|child|children|nino|nina|ninos)$/.test(gender)) return "kids";
  return "unisex";
}

function safeUrl(value) {
  try {
    const url = new URL(clean(value));
    if (!["http:", "https:"].includes(url.protocol)) return "";
    const credentialPattern = /secret(?:key)?|token|api_?key|auth|signature|password/i;
    if ([...url.searchParams].some(([key, value]) => credentialPattern.test(key) || credentialPattern.test(value))) return "";
    return url.href;
  } catch {
    return "";
  }
}

function normalizeBrand(value, title) {
  const source = `${value} ${title}`;
  if (/bare\s*barics/i.test(source)) return { brand: "Barebarics", parentBrand: "Be Lenka" };
  if (/be\s*lenka/i.test(source)) return { brand: "Be Lenka", parentBrand: "" };
  return { brand: clean(value, "Brand to review"), parentBrand: "" };
}

function normalizeCategory(value) {
  const category = slugify(value);
  if (/sandal|sandale/.test(category)) return "Sandalias";
  if (/boot|zimne|snehule/.test(category)) return "Botas";
  if (/barefoot-shoe|shoe|sneaker|tenisky|topanky/.test(category)) return "Zapatillas";
  return "Zapatillas";
}

function parseCommercialTitle(secondLine, fallbackTitle, firstLine, xmlColor) {
  const commercialTitle = clean(secondLine) || clean(fallbackTitle) ||
    (!genericProductTypes.has(slugify(firstLine)) ? clean(firstLine) : "") || "Product to review";
  const separator = commercialTitle.indexOf(" - ");
  if (separator === -1) return { model: commercialTitle, colorName: clean(xmlColor, "Color to review") };

  return {
    model: clean(commercialTitle.slice(0, separator), "Product to review"),
    colorName: clean(commercialTitle.slice(separator + 3), clean(xmlColor, "Color to review")),
  };
}

function isNonFootwear(row) {
  const searchable = slugify([row.brand, row.model, row.colorName, row.productType, row.sourceTitle].join(" "));
  return /(^|-)(waterproofing-spray|collonil|pedag|stielka|insole|insoles|ponozky|sock|socks|tricko|t-shirt|shirt|cleaner|wax|protector|waterproofer|shoe-fresh)(-|$)/.test(searchable);
}

function normalizeAvailability(value) {
  const availability = slugify(value);
  if (/^(yes|true|in-stock|available)$/.test(availability)) return "available";
  if (/^(no|false|out-of-stock|unavailable)$/.test(availability)) return "unavailable";
  return "unclear";
}

function toSafeRow(node) {
  const title = clean(directValue(node, ["title"]));
  const firstLine = clean(directValue(node, ["title_first_line", "titleFirstLine"]));
  const secondLine = clean(directValue(node, ["title_second_line", "titleSecondLine"]));
  const normalizedBrand = normalizeBrand(directValue(node, ["brand", "manufacturer", "maker"]), `${title} ${firstLine} ${secondLine}`);
  const colorNode = directNode(node, ["color", "colour", "colorName"]);
  const colorFamily = clean(colorNode ? nodeValue(colorNode) : "", "Color to review");
  const { model, colorName } = parseCommercialTitle(secondLine, title, firstLine, colorFamily);
  const rawColorHex = clean(colorNode?.attributes.hexcode || directValue(node, ["colorHex", "color_hex"]));
  const availabilityNode = directNode(node, ["availability"]);
  const availability = clean(availabilityNode ? nodeValue(availabilityNode) : "");
  const images = unique(descendantValues(node, ["image_link", "additional_image_link", "image", "imageUrl", "image_url", "picture", "photo"])
    .map(safeUrl));
  const primaryImage = safeUrl(directValue(node, ["image_link"]));

  return {
    ...normalizedBrand,
    model,
    colorName,
    colorFamily,
    colorHex: /^#[0-9a-f]{6}$/i.test(rawColorHex) ? rawColorHex : "#E5E1DA",
    gender: normalizeGender(directValue(node, ["gender", "sex", "department"])),
    category: normalizeCategory(firstLine || directValue(node, ["product_type", "main_category", "category", "productType", "type"])),
    size: clean(directValue(node, ["size", "sizeName", "size_name", "euSize", "eu_size"])),
    images,
    primaryImage,
    // These are deliberately read only as safe grouping/size hints, never emitted.
    groupHint: clean(directValue(node, ["item_group_id"])),
    availability,
    availabilityPresent: Boolean(availabilityNode),
    availabilityState: normalizeAvailability(availability),
    productType: firstLine,
    sourceTitle: title,
  };
}

function toDraft(rows, catalog, imageStats) {
  const first = rows[0];
  const productIdentity = {
    ...first,
    sourceTitle: unique(rows.map((row) => row.sourceTitle)).join(" "),
  };
  const { brand, parentBrand, model, colorName } = first;
  const groupSlug = slugify(`${brand}-${model}`);
  const groupName = clean(`${brand} ${model}`);
  const variantSlug = slugify(`${groupName}-${colorName}`);
  const allImages = unique(rows.flatMap((row) => row.images));
  const identityMatchingImages = allImages.filter((image) => imageMatchesProduct(image, productIdentity, catalog));
  const strictlyMatchingImages = selectMaterialImages(identityMatchingImages, productIdentity);
  let images = strictlyMatchingImages;
  if (!images.length) {
    const matchingPrimaryImages = unique(rows.map((row) => row.primaryImage))
      .filter((image) => imageMatchesProduct(image, productIdentity, catalog, { strictColor: false }));
    images = selectMaterialImages(matchingPrimaryImages, productIdentity);
  }
  images = images.slice(0, 8);
  imageStats.read += rows.reduce((count, row) => count + row.images.length, 0);
  imageStats.kept += images.length;
  imageStats.removed += allImages.filter((image) =>
    !strictlyMatchingImages.includes(image) && !images.includes(image),
  ).length;
  const sizes = unique(rows
    .filter((row) => row.availabilityState === "available" || !row.availabilityPresent)
    .map((row) => row.size));

  return {
    id: variantSlug,
    slug: variantSlug,
    brand,
    parentBrand,
    model,
    groupSlug,
    groupName,
    name: groupName,
    subtitle: `${colorName} · borrador pendiente de revisión`,
    gender: first.gender,
    category: first.category,
    colorName,
    colorFamily: first.colorFamily,
    colorHex: first.colorHex,
    // Supplier feed prices are intentionally not imported until Chiriko confirms which field is safe as a public customer-facing price.
    price: 0,
    currency: "$",
    status: "preorder",
    consultableSizes: sizes,
    sizes: [],
    images,
    features: [],
    tags: [],
    isFeatured: false,
    isNew: false,
    seoTitle: `${groupName} ${colorName} | Chiriko Studio`.slice(0, 70),
    seoDescription: `${groupName} en ${colorName}. Consulta disponibilidad y talla con Chiriko Studio.`.slice(0, 160),
  };
}

function groupRows(rows) {
  const groups = new Map();
  for (const row of rows) {
    const key = [row.brand, row.model, row.colorName].map(slugify).join("\u0000");
    const group = groups.get(key) ?? [];
    group.push(row);
    groups.set(key, group);
  }
  return [...groups.values()];
}

function findItems(root) {
  const items = [];
  const visit = (node) => {
    if (itemElementNames.has(node.name)) items.push(node);
    else node.children.forEach(visit);
  };
  root.children.forEach(visit);
  return items;
}

async function main() {
  const inputArgument = process.argv[2];
  if (!inputArgument || process.argv.length > 3) return usage("provide exactly one local XML file path");

  const inputPath = resolve(process.cwd(), inputArgument);
  if (inputPath === outputPath) return usage("the output file cannot be used as input");

  const xml = await readFile(inputPath, "utf8");
  const items = findItems(parseXml(xml));
  if (!items.length) throw new Error("No <product>, <item>, or <article> elements were found");

  const rows = items.map(toSafeRow);
  const groupedRows = groupRows(rows);
  const excludedGroups = groupedRows.filter((group) => group.some(isNonFootwear));
  const footwearGroups = groupedRows.filter((group) => !group.some(isNonFootwear));
  const footwearRows = footwearGroups.flat();
  const imageStats = { read: 0, kept: 0, removed: 0 };
  const drafts = footwearGroups.map((group) => toDraft(group, footwearRows, imageStats));
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(drafts, null, 2)}\n`, { mode: 0o600 });

  console.log(`XML items read: ${items.length}`);
  console.log(`Footwear draft products generated: ${drafts.length}`);
  console.log(`Excluded non-footwear groups: ${excludedGroups.length}`);
  console.log(`Image URLs read: ${imageStats.read}`);
  console.log(`Image URLs kept after product/color filtering: ${imageStats.kept}`);
  console.log(`Image URLs removed as cross-product mismatches: ${imageStats.removed}`);
  console.log(`Drafts with images: ${drafts.filter((draft) => draft.images.length).length}`);
  console.log(`Drafts without images: ${drafts.filter((draft) => !draft.images.length).length}`);
  console.log(`Drafts with consultable sizes: ${drafts.filter((draft) => draft.consultableSizes.length).length}`);
  console.log(`Drafts without consultable sizes: ${drafts.filter((draft) => !draft.consultableSizes.length).length}`);
  console.log(`Drafts with price 0: ${drafts.filter((draft) => draft.price === 0).length}`);
  console.log(`Rows skipped from consultableSizes because availability was no: ${rows.filter((row) => row.availabilityState === "unavailable").length}`);
}

main().catch((error) => {
  console.error(`Import failed: ${error.message}`);
  process.exitCode = 1;
});
