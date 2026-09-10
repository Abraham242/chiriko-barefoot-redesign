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
const itemElementNames = new Set(["product", "item", "article", "offer", "productitem", "shopitem"]);

function usage(message) {
  if (message) console.error(`Error: ${message}\n`);
  console.error("Usage: node tools/catalog-manager/import-feed.mjs <local-feed.xml> [--inspect]");
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

// Supports ordinary tags and supplier-style named parameter elements.
function fieldsFor(node) {
  const fields = new Map();
  const add = (name, value) => {
    const key = normalizedName(name);
    const cleaned = clean(value);
    if (key && cleaned) fields.set(key, [...(fields.get(key) ?? []), cleaned]);
  };
  const visit = (candidate) => {
    if (!candidate.children.length) add(candidate.name, nodeValue(candidate));
    Object.entries(candidate.attributes).forEach(([name, value]) => add(name, value));
    const key = candidate.children.find((child) => ["name", "paramname", "attributename", "propertyname"].includes(normalizedName(child.name)));
    const value = candidate.children.find((child) => ["value", "val", "paramvalue", "attributevalue", "propertyvalue"].includes(normalizedName(child.name)));
    if (key && value) add(nodeValue(key), nodeValue(value));
    candidate.children.forEach(visit);
  };
  visit(node);
  return fields;
}

function fieldValues(fields, aliases) {
  for (const alias of aliases) {
    const found = fields.get(normalizedName(alias));
    if (found?.length) return found;
  }
  return [];
}

function field(fields, aliases, fallback = "") {
  return clean(fieldValues(fields, aliases)[0], fallback);
}

function normalizeBrand(value) {
  const compact = normalizedName(value);
  if (compact === "belenka") return "Be Lenka";
  if (compact === "barebarics") return "Barebarics";
  return clean(value, "Brand to review");
}

function titleCase(value) {
  return clean(value).toLocaleLowerCase().replace(/(^|[\s/-])\p{L}/gu, (letter) => letter.toLocaleUpperCase());
}

function normalizeGender(value) {
  const gender = slugify(value);
  if (/^(men|male|man|mens|hombre|hombres|caballero)$/.test(gender)) return "men";
  if (/^(women|female|woman|womens|mujer|mujeres|dama)$/.test(gender)) return "women";
  if (/^(kids|kid|child|children|junior|nino|nina|ninos|ninas)$/.test(gender)) return "kids";
  return "unisex";
}

function safeUrl(value) {
  try {
    const url = new URL(clean(value));
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

function publicPrice(fields) {
  // Generic PRICE and cost/net/B2B/wholesale/supplier/margin fields are deliberately excluded.
  const raw = field(fields, ["recommendedRetailPrice", "retailPrice", "rrp", "publicPrice", "consumerPrice", "customerPrice", "priceRrp", "priceRetail", "priceConsumer"]);
  if (!raw) return 0;
  let normalized = raw.replace(/[^\d.,-]/g, "");
  if (normalized.includes(",") && normalized.includes(".")) normalized = normalized.lastIndexOf(",") > normalized.lastIndexOf(".")
    ? normalized.replace(/\./g, "").replace(",", ".") : normalized.replace(/,/g, "");
  else normalized = normalized.replace(",", ".");
  const number = Number(normalized);
  return Number.isFinite(number) && number >= 0 ? number : 0;
}

function imageValues(fields) {
  const images = [];
  for (const [name, values] of fields) {
    if (/^(image|images|imageurl|imgurl|picture|photo|mainimage|additionalimage|galleryimage)\d*(url)?$/.test(name)
      || /^(imageurl|imgurl|pictureurl|photourl)(alternative|additional|detail|large)?\d*$/.test(name)) images.push(...values);
  }
  return unique(images.flatMap((value) => value.split(/[|;,]\s*(?=https?:\/\/)/i)).map(safeUrl));
}

function rowFrom(node) {
  const fields = fieldsFor(node);
  const brand = normalizeBrand(field(fields, ["brand", "brandName", "manufacturer", "manufacturerName", "producer", "maker"]));
  const productName = field(fields, ["productName", "fullName", "productTitle", "title", "name"]);
  const model = field(fields, ["modelName", "model", "collectionName", "styleName", "style"], productName || "Model to review");
  const colorName = titleCase(field(fields, ["colorName", "colourName", "color", "colour", "variantColor"], "Color to review"));
  return {
    brand, productName: productName || clean(`${brand} ${model}`), model, colorName,
    parentBrand: field(fields, ["parentBrand"]),
    gender: normalizeGender(field(fields, ["gender", "genderName", "sex", "department", "ageGroup"])),
    category: field(fields, ["categoryName", "categoryPath", "category", "productType", "type"], "Category to review"),
    colorFamily: titleCase(field(fields, ["colorFamily", "colourFamily"], colorName)),
    colorHex: field(fields, ["colorHex", "colourHex"], "#E5E1DA"),
    price: publicPrice(fields),
    currency: field(fields, ["publicCurrency", "retailCurrency", "customerCurrency", "currency"], "$"),
    explicitStatus: slugify(field(fields, ["publicStatus"])),
    images: imageValues(fields),
    sizes: unique(fieldValues(fields, ["euSize", "shoeSize", "sizeName", "size", "sizes"])),
  };
}

function mergeRows(rows) {
  const groups = new Map();
  for (const row of rows) {
    const key = [row.brand, row.productName || row.model, row.colorName].map(slugify).join("|");
    const current = groups.get(key);
    if (!current) groups.set(key, { ...row });
    else {
      current.sizes = unique([...current.sizes, ...row.sizes]);
      current.images = unique([...current.images, ...row.images]);
      if (!current.price && row.price) current.price = row.price;
    }
  }
  return [...groups.values()];
}

function toDraft(row) {
  const { brand, model, colorName } = row;
  const groupSlug = slugify(`${brand}-${model}`);
  const groupName = row.productName;
  const variantSlug = slugify(`${brand}-${model}-${colorName}`);

  return {
    id: variantSlug,
    slug: variantSlug,
    brand,
    parentBrand: row.parentBrand,
    model,
    groupSlug,
    groupName,
    name: groupName,
    subtitle: `${colorName} · borrador pendiente de revisión`,
    gender: row.gender,
    category: row.category,
    colorName,
    colorFamily: row.colorFamily,
    colorHex: row.colorHex,
    price: row.price,
    currency: row.currency,
    status: row.explicitStatus === "in-stock" ? "in_stock" : "preorder",
    consultableSizes: row.sizes,
    sizes: [],
    images: row.images,
    features: [],
    tags: [],
    isFeatured: false,
    isNew: false,
    seoTitle: `${groupName} ${colorName} | Chiriko Studio`.slice(0, 70),
    seoDescription: `${groupName} en ${colorName}. Consulta disponibilidad y talla con Chiriko Studio.`.slice(0, 160),
  };
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

function inspectStructure(root, items) {
  const elements = new Map();
  const attributes = new Map();
  const visit = (node, depth = 0) => {
    const key = `${depth}:${node.name}`;
    elements.set(key, (elements.get(key) ?? 0) + 1);
    Object.keys(node.attributes).forEach((name) => attributes.set(name, (attributes.get(name) ?? 0) + 1));
    node.children.forEach((child) => visit(child, depth + 1));
  };
  root.children.forEach((node) => visit(node));
  console.log("Safe XML structure (names and counts only; no values):");
  for (const [key, count] of [...elements].sort()) {
    const separator = key.indexOf(":");
    const depth = Number(key.slice(0, separator));
    console.log(`${"  ".repeat(Math.min(depth, 8))}<${key.slice(separator + 1)}> × ${count}`);
  }
  if (attributes.size) console.log(`Attribute names: ${[...attributes].sort().map(([name, count]) => `${name} (${count})`).join(", ")}`);
  console.log(`Detected variant rows: ${items.length}; distinct field names: ${new Set(items.flatMap((item) => [...fieldsFor(item).keys()])).size}.`);
}

async function main() {
  const args = process.argv.slice(2);
  const inspectOnly = args.includes("--inspect");
  const paths = args.filter((argument) => argument !== "--inspect");
  if (paths.length !== 1 || args.some((argument) => argument.startsWith("--") && argument !== "--inspect")) return usage("provide one local XML path and optionally --inspect");

  const inputPath = resolve(process.cwd(), paths[0]);
  const allowedInputDirectory = resolve(toolDirectory, "input");
  if (inputPath === outputPath) return usage("the output file cannot be used as input");

  const xml = await readFile(inputPath, "utf8");
  const root = parseXml(xml);
  const items = findItems(root);
  if (!items.length) throw new Error("No product, item, article, offer, productitem, or shopitem elements were found");
  if (inspectOnly) return inspectStructure(root, items);

  const drafts = mergeRows(items.map(rowFrom)).map(toDraft);
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(drafts, null, 2)}\n`, { mode: 0o600 });

  const locationWarning = inputPath.startsWith(`${allowedInputDirectory}/`) ? "" : " (consider moving the source into the ignored input directory)";
  console.log(`Created ${drafts.length} grouped, review-only draft(s) at ${outputPath}${locationWarning}.`);
  console.log("Nothing was published or copied into src/data/products.ts.");
}

main().catch((error) => {
  console.error(`Import failed: ${error.message}`);
  process.exitCode = 1;
});
