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
  if (/sandal/.test(category)) return "Sandalias";
  if (/boot/.test(category)) return "Botas";
  if (/barefoot-shoe|shoe|sneaker/.test(category)) return "Zapatillas";
  return "Zapatillas";
}

codex/improve-xml-importer-for-be-lenka-feed-avrezq
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
  const model = firstLine || title || "Product to review";
  const normalizedBrand = normalizeBrand(directValue(node, ["brand", "manufacturer", "maker"]), `${title} ${firstLine} ${secondLine}`);
  const colorNode = directNode(node, ["color", "colour", "colorName"]);
  const colorName = clean(colorNode ? nodeValue(colorNode) : "", "Color to review");
  const rawColorHex = clean(colorNode?.attributes.hexcode || directValue(node, ["colorHex", "color_hex"]));
codex/improve-xml-importer-for-be-lenka-feed-avrezq
  const availabilityNode = directNode(node, ["availability"]);
  const availability = clean(availabilityNode ? nodeValue(availabilityNode) : "");

  const images = unique(descendantValues(node, ["image_link", "additional_image_link", "image", "imageUrl", "image_url", "picture", "photo"])
    .map(safeUrl));

  return {
    ...normalizedBrand,
    model,
    subtitle: secondLine,
    colorName,
    colorHex: /^#[0-9a-f]{6}$/i.test(rawColorHex) ? rawColorHex : "#E5E1DA",
    gender: normalizeGender(directValue(node, ["gender", "sex", "department"])),
    category: normalizeCategory(directValue(node, ["product_type", "main_category", "category", "productType", "type"])),
    size: clean(directValue(node, ["size", "sizeName", "size_name", "euSize", "eu_size"])),
    images,
 codex/improve-xml-importer-for-be-lenka-feed-avrezq
    // These are deliberately read only as safe grouping/size hints, never emitted.
    groupHint: clean(directValue(node, ["item_group_id"])),
    availability,
    availabilityPresent: Boolean(availabilityNode),
    availabilityState: normalizeAvailability(availability),

    // These are deliberately read only as safe grouping/status hints, never emitted.
    groupHint: clean(directValue(node, ["item_group_id"])),
    availability: clean(directValue(node, ["availability"])),

  };
}

function toDraft(rows) {
  const first = rows[0];
  const { brand, parentBrand, model, colorName } = first;
  const groupSlug = slugify(`${brand}-${model}`);
  const groupName = clean(`${brand} ${model}`);
  const variantSlug = slugify(`${groupName}-${colorName}`);
  const images = unique(rows.flatMap((row) => row.images));
codex/improve-xml-importer-for-be-lenka-feed-avrezq
  const sizes = unique(rows
    .filter((row) => row.availabilityState === "available" || !row.availabilityPresent)
    .map((row) => row.size));

  const sizes = unique(rows.map((row) => row.size));


  return {
    id: variantSlug,
    slug: variantSlug,
    brand,
    parentBrand,
    model,
    groupSlug,
    groupName,
    name: groupName,
    subtitle: first.subtitle || `${colorName} · borrador pendiente de revisión`,
    gender: first.gender,
    category: first.category,
    colorName,
    colorFamily: colorName,
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
    const key = [row.brand, row.model, row.colorName].map((value) => clean(value).toLocaleLowerCase()).join("\u0000");
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
  const drafts = groupRows(rows).map(toDraft);
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(drafts, null, 2)}\n`, { mode: 0o600 });

  console.log(`XML items read: ${items.length}`);
  console.log(`Draft products generated: ${drafts.length}`);
  console.log(`Drafts with images: ${drafts.filter((draft) => draft.images.length).length}`);
  console.log(`Drafts without images: ${drafts.filter((draft) => !draft.images.length).length}`);
  console.log(`Drafts with consultable sizes: ${drafts.filter((draft) => draft.consultableSizes.length).length}`);
  console.log(`Drafts without consultable sizes: ${drafts.filter((draft) => !draft.consultableSizes.length).length}`);
  console.log(`Drafts with price 0: ${drafts.filter((draft) => draft.price === 0).length}`);
codex/improve-xml-importer-for-be-lenka-feed-avrezq
  console.log(`Rows skipped from consultableSizes because availability was no: ${rows.filter((row) => row.availabilityState === "unavailable").length}`);

}

main().catch((error) => {
  console.error(`Import failed: ${error.message}`);
  process.exitCode = 1;
});
