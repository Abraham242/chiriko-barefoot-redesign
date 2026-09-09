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
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

function publicPrice(node) {
  const raw = directValue(node, ["publicPrice", "public_price", "consumerPrice", "consumer_price"]);
  if (!raw) return 0;
  const number = Number(raw.replace(/[^\d.,-]/g, "").replace(",", "."));
  return Number.isFinite(number) && number >= 0 ? number : 0;
}

function toDraft(node, index) {
  const brand = clean(directValue(node, ["brand", "manufacturer", "maker"]), "Brand to review");
  const model = clean(directValue(node, ["model", "modelName", "style"]), `Model ${index + 1}`);
  const colorName = clean(directValue(node, ["color", "colour", "colorName"]), "Color to review");
  const groupSlug = slugify(`${brand}-${model}`);
  const groupName = clean(`${brand} ${model}`);
  const variantSlug = slugify(`${groupName}-${colorName}`);
  const category = clean(directValue(node, ["category", "productType", "type"]), "Category to review");
  const images = unique(descendantValues(node, ["image", "imageUrl", "image_url", "picture", "photo"]).map(safeUrl));
  const sizes = unique(descendantValues(node, ["size", "sizeName", "size_name", "euSize", "eu_size"]));
  const explicitStatus = slugify(directValue(node, ["publicStatus", "public_status"]));

  return {
    id: variantSlug,
    slug: variantSlug,
    brand,
    parentBrand: clean(directValue(node, ["parentBrand", "parent_brand"])),
    model,
    groupSlug,
    groupName,
    name: groupName,
    subtitle: `${colorName} · borrador pendiente de revisión`,
    gender: normalizeGender(directValue(node, ["gender", "sex", "department"])),
    category,
    colorName,
    colorFamily: clean(directValue(node, ["colorFamily", "color_family"]), colorName),
    colorHex: clean(directValue(node, ["colorHex", "color_hex"]), "#E5E1DA"),
    price: publicPrice(node),
    currency: clean(directValue(node, ["publicCurrency", "public_currency", "currency"]), "$"),
    status: explicitStatus === "in-stock" ? "in_stock" : "preorder",
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
  const allowedInputDirectory = resolve(toolDirectory, "input");
  if (inputPath === outputPath) return usage("the output file cannot be used as input");

  const xml = await readFile(inputPath, "utf8");
  const items = findItems(parseXml(xml));
  if (!items.length) throw new Error("No <product>, <item>, or <article> elements were found");

  const drafts = items.map(toDraft);
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(drafts, null, 2)}\n`, { mode: 0o600 });

  const locationWarning = inputPath.startsWith(`${allowedInputDirectory}/`) ? "" : " (consider moving the source into the ignored input directory)";
  console.log(`Created ${drafts.length} review-only draft(s) at ${outputPath}${locationWarning}.`);
  console.log("Nothing was published or copied into src/data/products.ts.");
}

main().catch((error) => {
  console.error(`Import failed: ${error.message}`);
  process.exitCode = 1;
});
