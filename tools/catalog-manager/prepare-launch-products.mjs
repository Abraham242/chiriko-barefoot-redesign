#!/usr/bin/env node

/**
 * Build a review-only, public-safe proposal from the locally approved launch
 * selection. Source properties are copied through an explicit allowlist so
 * supplier pricing, inventory, availability counts, and other metadata cannot
 * reach the generated proposal.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const toolDirectory = dirname(fileURLToPath(import.meta.url));
const inputPath = resolve(toolDirectory, "output/chiriko-launch-selection.json");
const outputPath = resolve(toolDirectory, "output/launch-products.proposal.json");

const requiredFields = [
  "id", "slug", "brand", "model", "groupSlug", "groupName", "name",
  "colorName", "category", "consultableSizes", "images", "price", "status",
];
const stringFields = [
  "id", "slug", "brand", "model", "groupSlug", "groupName", "name",
  "colorName", "category", "status",
];
const optionalStringFields = [
  "parentBrand", "subtitle", "gender", "colorFamily", "colorHex", "currency",
  "seoTitle", "seoDescription",
];
const optionalArrayFields = ["sizes", "features", "tags"];
const forbiddenImageUrlPattern = /secret|token|api_key|auth|signature|password/i;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function selectedProducts(parsed) {
  assert(Array.isArray(parsed), "Launch selection must be a JSON array of products");
  assert(parsed.length > 0, "Launch selection must contain at least one product");
  return parsed;
}

function validateProduct(product, index) {
  const label = `Product ${index + 1}`;
  assert(product && typeof product === "object" && !Array.isArray(product), `${label} must be an object`);

  for (const field of requiredFields) {
    assert(Object.hasOwn(product, field), `${label} is missing required field "${field}"`);
  }
  for (const field of stringFields) {
    assert(typeof product[field] === "string" && product[field].trim(), `${label}.${field} must be a non-empty string`);
  }
  assert(Number.isFinite(product.price) && product.price >= 0, `${label}.price must be a non-negative number`);
  assert(["preorder", "in_stock"].includes(product.status), `${label}.status must be "preorder" or "in_stock"`);
  assert(Array.isArray(product.consultableSizes), `${label}.consultableSizes must be an array`);
  assert(product.consultableSizes.every((size) => typeof size === "string" && size.trim()), `${label}.consultableSizes must contain only non-empty strings`);
  assert(Array.isArray(product.images) && product.images.length > 0, `${label}.images must be a non-empty array`);
  assert(product.images.every((image) => typeof image === "string" && image.trim()), `${label}.images must contain only non-empty strings`);

  for (const image of product.images) {
    assert(!forbiddenImageUrlPattern.test(image), `${label} has an image URL containing a forbidden credential marker`);
  }
  for (const field of optionalStringFields) {
    assert(!Object.hasOwn(product, field) || typeof product[field] === "string", `${label}.${field} must be a string when provided`);
  }
  for (const field of optionalArrayFields) {
    assert(!Object.hasOwn(product, field) || (Array.isArray(product[field]) && product[field].every((value) => typeof value === "string")), `${label}.${field} must be an array of strings when provided`);
  }
  for (const field of ["isFeatured", "isNew"]) {
    assert(!Object.hasOwn(product, field) || typeof product[field] === "boolean", `${label}.${field} must be a boolean when provided`);
  }
}

function toPublicProduct(product) {
  const proposal = {
    id: product.id,
    slug: product.slug,
    brand: product.brand,
    model: product.model,
    groupSlug: product.groupSlug,
    groupName: product.groupName,
    name: product.name,
    subtitle: product.subtitle ?? "",
    gender: product.gender ?? "unisex",
    category: product.category,
    colorName: product.colorName,
    colorFamily: product.colorFamily ?? product.colorName,
    colorHex: product.colorHex ?? "#E5E1DA",
    price: product.price,
    currency: product.currency ?? "$",
    status: product.status,
    consultableSizes: product.consultableSizes,
    sizes: product.sizes ?? [],
    images: product.images,
    features: product.features ?? [],
    tags: product.tags ?? [],
    isFeatured: product.isFeatured ?? false,
    isNew: product.isNew ?? false,
    seoTitle: product.seoTitle ?? "",
    seoDescription: product.seoDescription ?? "",
  };

  if (product.parentBrand) proposal.parentBrand = product.parentBrand;
  return proposal;
}

async function main() {
  const source = JSON.parse(await readFile(inputPath, "utf8"));
  const products = selectedProducts(source);
  products.forEach(validateProduct);
  const proposal = products.map(toPublicProduct);

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(proposal, null, 2)}\n`, { mode: 0o600 });
  console.log(`Validated launch products: ${proposal.length}`);
  console.log(`Review-only proposal written to: ${outputPath}`);
  console.log("The storefront catalog was not modified.");
}

main().catch((error) => {
  console.error(`Proposal generation failed: ${error.message}`);
  process.exitCode = 1;
});
