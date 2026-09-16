#!/usr/bin/env node

/**
 * Read-only catalog image audit.
 *
 * This tool reads the exported literal in src/data/products.ts and writes a
 * report under the ignored catalog-manager output directory. It never edits
 * the catalog or any image files.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const toolDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(toolDirectory, "../..");
const catalogPath = resolve(repositoryRoot, "src/data/products.ts");
const outputPath = resolve(toolDirectory, "output/product-image-audit.json");
const imageExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"]);
const colorNoise = new Set(["all", "and", "color", "colour", "leather", "vegan", "with"]);
const rejectedVelocityImageIds = new Set(["80542", "80543", "80544", "80545", "80546"]);

function extractProducts(source) {
  const declaration = /export\s+const\s+products(?:\s*:\s*Product\[\])?\s*=\s*/g.exec(source);
  if (!declaration) throw new Error("Could not find the exported products array");

  const start = source.indexOf("[", declaration.index + declaration[0].length);
  if (start < 0) throw new Error("Could not find the start of the products array");

  let depth = 0;
  let quote = "";
  let escaped = false;
  for (let index = start; index < source.length; index += 1) {
    const character = source[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === quote) quote = "";
      continue;
    }
    if (character === '"' || character === "'") quote = character;
    else if (character === "[") depth += 1;
    else if (character === "]" && --depth === 0) {
      try {
        return JSON.parse(source.slice(start, index + 1));
      } catch (error) {
        throw new Error(`The products array is not a JSON-compatible literal: ${error.message}`);
      }
    }
  }
  throw new Error("Could not find the end of the products array");
}

function normalize(value) {
  return String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function urlDetails(url) {
  try {
    const parsed = new URL(url);
    const filename = decodeURIComponent(basename(parsed.pathname));
    const extension = extname(filename).toLowerCase();
    return {
      filename,
      extension,
      stem: filename.slice(0, extension ? -extension.length : undefined).toLowerCase(),
      searchable: normalize(decodeURIComponent(parsed.pathname)),
    };
  } catch {
    const filename = basename(String(url).split(/[?#]/, 1)[0]);
    const extension = extname(filename).toLowerCase();
    return {
      filename,
      extension,
      stem: filename.slice(0, extension ? -extension.length : undefined).toLowerCase(),
      searchable: normalize(url),
    };
  }
}

function tokens(value) {
  return normalize(value).split("-").filter(Boolean);
}

function imageAssetId(url) {
  return urlDetails(url).stem.match(/-(\d+)$/)?.[1] ?? "";
}

function containsTokenSequence(haystack, expectedTokens) {
  return expectedTokens.length > 0 && `-${haystack}-`.includes(`-${expectedTokens.join("-")}-`);
}

function mismatchReasons(product, url) {
  const { searchable } = urlDetails(url);
  const modelTokens = tokens(product.model);
  const colorTokens = tokens(product.colorName).filter((token) => !colorNoise.has(token));
  const reasons = [];

  if (!containsTokenSequence(searchable, modelTokens)) {
    reasons.push(`URL does not contain model "${product.model}"`);
  }
  if (colorTokens.length && !colorTokens.every((token) => tokens(searchable).includes(token))) {
    reasons.push(`URL does not contain all color tokens for "${product.colorName}"`);
  }
  return reasons;
}

function groupedDuplicates(entries, keyForEntry) {
  const groups = new Map();
  for (const entry of entries) {
    const key = keyForEntry(entry);
    const group = groups.get(key) ?? [];
    group.push(entry);
    groups.set(key, group);
  }
  return [...groups.entries()].filter(([, occurrences]) => occurrences.length > 1);
}

const source = await readFile(catalogPath, "utf8");
const products = extractProducts(source);
const entries = products.flatMap((product) => (product.images ?? []).map((url, imageIndex) => ({
  productSlug: product.slug,
  imageIndex,
  url,
})));

const exactDuplicateUrls = groupedDuplicates(entries, (entry) => entry.url).map(([url, occurrences]) => ({
  url,
  occurrences: occurrences.map(({ productSlug, imageIndex }) => ({ productSlug, imageIndex })),
}));

const filenamesWithDifferentExtensions = groupedDuplicates(entries, (entry) => urlDetails(entry.url).stem)
  .map(([filenameStem, occurrences]) => ({
    filenameStem,
    extensions: [...new Set(occurrences.map((entry) => urlDetails(entry.url).extension))].sort(),
    occurrences,
  }))
  .filter(({ extensions }) => extensions.length > 1 && extensions.every((extension) => imageExtensions.has(extension)));

const imagesReusedAcrossProducts = groupedDuplicates(entries, (entry) => entry.url)
  .filter(([, occurrences]) => new Set(occurrences.map(({ productSlug }) => productSlug)).size > 1)
  .map(([url, occurrences]) => ({
    url,
    productSlugs: [...new Set(occurrences.map(({ productSlug }) => productSlug))].sort(),
  }));

const productsWithMoreThanSixImages = products.filter((product) => (product.images?.length ?? 0) > 6)
  .map((product) => ({ productSlug: product.slug, imageCount: product.images.length }));

const possibleSlugMismatches = products.flatMap((product) => (product.images ?? []).flatMap((url, imageIndex) => {
  const reasons = mismatchReasons(product, url);
  return reasons.length ? [{ productSlug: product.slug, imageIndex, url, reasons }] : [];
}));

const knownBrokenVelocityImages = entries.filter((entry) => {
  const product = products.find(({ slug }) => slug === entry.productSlug);
  return product?.model === "Velocity" && rejectedVelocityImageIds.has(imageAssetId(entry.url));
});

const report = {
  generatedAt: new Date().toISOString(),
  source: "src/data/products.ts",
  summary: {
    productsAudited: products.length,
    imagesAudited: entries.length,
    exactDuplicateUrls: exactDuplicateUrls.length,
    filenamesWithDifferentExtensions: filenamesWithDifferentExtensions.length,
    imagesReusedAcrossProducts: imagesReusedAcrossProducts.length,
    productsWithMoreThanSixImages: productsWithMoreThanSixImages.length,
    possibleSlugMismatches: possibleSlugMismatches.length,
    knownBrokenVelocityImages: knownBrokenVelocityImages.length,
  },
  findings: {
    exactDuplicateUrls,
    filenamesWithDifferentExtensions,
    imagesReusedAcrossProducts,
    productsWithMoreThanSixImages,
    possibleSlugMismatches,
    knownBrokenVelocityImages,
  },
};

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

console.log("\nChiriko product image audit");
console.log("============================");
console.log(`Products audited:                  ${report.summary.productsAudited}`);
console.log(`Images audited:                    ${report.summary.imagesAudited}`);
console.log(`Exact duplicate URL groups:        ${report.summary.exactDuplicateUrls}`);
console.log(`Filenames with mixed extensions:   ${report.summary.filenamesWithDifferentExtensions}`);
console.log(`Images reused across products:     ${report.summary.imagesReusedAcrossProducts}`);
console.log(`Products with more than 6 images:  ${report.summary.productsWithMoreThanSixImages}`);
console.log(`Possible model/color mismatches:   ${report.summary.possibleSlugMismatches}`);
console.log(`Known broken Velocity images:      ${report.summary.knownBrokenVelocityImages}`);
console.log(`\nReport written to: ${outputPath}`);
console.log("No catalog entries or images were modified.\n");

if (knownBrokenVelocityImages.length > 0) process.exitCode = 1;
