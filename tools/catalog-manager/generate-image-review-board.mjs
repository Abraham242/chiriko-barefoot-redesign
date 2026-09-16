#!/usr/bin/env node

/**
 * Generate a read-only, public-catalog image review board.
 *
 * Only the four identifying display fields and image URLs are copied from the
 * catalog. The source catalog and remote images are never changed or fetched.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const toolDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(toolDirectory, "../..");
const catalogPath = resolve(repositoryRoot, "src/data/products.ts");
const outputPath = resolve(toolDirectory, "output/product-image-review.html");

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

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
}

function filenameFor(url) {
  try {
    return decodeURIComponent(basename(new URL(url).pathname)) || "unnamed image";
  } catch {
    return basename(String(url).split(/[?#]/, 1)[0]) || "unnamed image";
  }
}

function productSection(product) {
  const images = Array.isArray(product.images) ? product.images : [];
  const isLargeGallery = images.length > 6;
  const cards = images.map((url, index) => {
    const safeUrl = escapeHtml(url);
    const filename = escapeHtml(filenameFor(url));
    const slug = escapeHtml(product.slug);
    return `
          <a class="image-card" href="${safeUrl}" target="_blank" rel="noopener noreferrer">
            <img src="${safeUrl}" alt="${slug}, image ${index + 1}" loading="lazy">
            <span class="image-details"><strong>Image ${index + 1}</strong><span>${filename}</span><span>${slug}</span></span>
          </a>`;
  }).join("");

  return `
    <section class="product${isLargeGallery ? " large-gallery" : ""}">
      <header>
        <div>
          <p class="eyebrow">${escapeHtml(product.brand)} · ${escapeHtml(product.model)}</p>
          <h2>${escapeHtml(product.colorName)}</h2>
          <p class="slug">${escapeHtml(product.slug)}</p>
        </div>
        <span class="count">${images.length} image${images.length === 1 ? "" : "s"}</span>
      </header>
      ${isLargeGallery ? '<p class="gallery-warning">Large gallery · more than 6 images</p>' : ""}
      <div class="image-grid">${cards || '<p class="empty">No images</p>'}</div>
    </section>`;
}

const source = await readFile(catalogPath, "utf8");
const products = extractProducts(source);
const imageCount = products.reduce((total, product) => total + (Array.isArray(product.images) ? product.images.length : 0), 0);
const sections = products.map(productSection).join("");
const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,nofollow">
  <title>Product Image Review</title>
  <style>
    :root { color-scheme: light; font-family: Inter, ui-sans-serif, system-ui, sans-serif; color: #25231f; background: #f4f1ea; }
    * { box-sizing: border-box; }
    body { margin: 0; }
    main { width: min(1440px, calc(100% - 40px)); margin: 0 auto; padding: 48px 0 80px; }
    .page-header { display: flex; justify-content: space-between; gap: 24px; align-items: end; margin-bottom: 32px; }
    h1, h2, p { margin: 0; }
    h1 { font-family: Georgia, serif; font-size: clamp(2rem, 5vw, 4rem); font-weight: 500; }
    .summary, .slug, .image-details { color: #6e685d; }
    .product { margin: 0 0 28px; padding: 24px; border: 1px solid #d8d2c6; border-radius: 16px; background: #fff; }
    .product.large-gallery { border: 3px solid #c66b32; box-shadow: 0 0 0 4px #f3d7c5; }
    .product header { display: flex; justify-content: space-between; gap: 20px; align-items: start; }
    .eyebrow { margin-bottom: 5px; color: #746c5d; font-size: .76rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
    h2 { font-family: Georgia, serif; font-size: 1.65rem; font-weight: 500; }
    .slug { margin-top: 5px; font-family: ui-monospace, monospace; font-size: .78rem; }
    .count { flex: none; padding: 7px 10px; border-radius: 999px; background: #eeebe4; font-size: .78rem; font-weight: 700; }
    .gallery-warning { margin-top: 16px; color: #944218; font-size: .82rem; font-weight: 800; text-transform: uppercase; }
    .image-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 14px; margin-top: 20px; }
    .image-card { min-width: 0; overflow: hidden; border: 1px solid #ded9cf; border-radius: 10px; color: inherit; background: #f8f7f3; text-decoration: none; transition: transform .15s, box-shadow .15s; }
    .image-card:hover, .image-card:focus-visible { transform: translateY(-2px); box-shadow: 0 8px 20px #28231b24; outline: 3px solid #c66b32; outline-offset: 2px; }
    img { display: block; width: 100%; aspect-ratio: 1; object-fit: contain; background: #eeece7; }
    .image-details { display: grid; gap: 4px; padding: 11px; font-size: .72rem; overflow-wrap: anywhere; }
    .image-details strong { color: #25231f; font-size: .82rem; }
    .empty { grid-column: 1 / -1; padding: 20px; color: #8b8376; text-align: center; }
    @media (max-width: 600px) { main { width: min(100% - 24px, 1440px); padding-top: 28px; } .page-header { display: block; } .summary { margin-top: 10px; } .product { padding: 16px; } }
  </style>
</head>
<body>
  <main>
    <header class="page-header">
      <div><p class="eyebrow">Read-only catalog tool</p><h1>Product image review</h1></div>
      <p class="summary">${products.length} products · ${imageCount} images</p>
    </header>${sections}
  </main>
</body>
</html>
`;

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, html, "utf8");
console.log(`Wrote ${products.length} products and ${imageCount} images to ${outputPath}`);
