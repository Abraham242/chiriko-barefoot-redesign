#!/usr/bin/env node

/** Opt-in public-source verification. Never reads XML or changes the catalog. */
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { groundiesGalleries } from "./groundies-galleries.mjs";
import { groundiesSelection } from "./groundies-selection.mjs";
import { groundiesImageFamily, groundiesImageKey, publicImage } from "./sync-groundies-selection.mjs";

export function verifyOfficialGallerySource(slug, gallery, product) {
  const urls = [gallery.primaryImage, ...gallery.secondaryImages.map(({ url }) => url)];
  const available = new Set(product.images.map(({ src }) => groundiesImageKey(src)));
  assert.equal(product.title, gallery.title, `${slug}: official source title changed`);
  const primary = product.images.find(({ src }) => groundiesImageKey(src) === groundiesImageKey(gallery.primaryImage));
  assert.ok(primary, `${slug}: primary is not present on its official product page`);
  assert.ok(product.variants.some((variant) => variant.option1 === gallery.fit && variant.option2 === gallery.color &&
    (variant.image_id === primary.id || primary.variant_ids?.includes(variant.id))),
  `${slug}: official primary is not linked to the exact approved color/fit`);
  const family = groundiesImageFamily(gallery.primaryImage);
  for (const url of urls) {
    assert.ok(publicImage(url) && new URL(url).hostname === "cdn.shopify.com", `${slug}: unsafe photo URL`);
    assert.ok(available.has(groundiesImageKey(url)), `${slug}: image was not observed on its official product page`);
    assert.ok(family && groundiesImageFamily(url) === family, `${slug}: photo belongs to another media family`);
  }
  assert.equal(new Set(urls.map(groundiesImageKey)).size, urls.length, `${slug}: repeated photo URL`);
}

async function publicRequest(url) {
  // Only trusted, explicitly curated public destinations can be fetched.
  const parsed = new URL(url);
  assert.equal(parsed.protocol, "https:");
  assert.ok(["www.groundies.com", "groundies.com", "cdn.shopify.com"].includes(parsed.hostname));
  assert.ok(!parsed.username && !parsed.password);
  const response = await fetch(url, { redirect: "error", signal: AbortSignal.timeout(30000) });
  assert.equal(response.status, 200, "Public manufacturer resource did not return HTTP 200");
  return response;
}

export async function verifyGroundiesGalleries() {
  assert.equal(Object.keys(groundiesGalleries).length, groundiesSelection.length, "Every approved colorway needs a reviewed gallery");
  const products = new Map();
  let count = 0;
  for (const [slug, gallery] of Object.entries(groundiesGalleries)) {
    const selection = groundiesSelection.find((entry) => entry.title === gallery.title && entry.color === gallery.color && entry.gender === gallery.gender);
    assert.ok(selection, `${slug}: gallery is outside the curated selection`);
    // Fetch the public Shopify product document, never a supplier/B2B endpoint.
    const source = new URL(gallery.sourceUrl);
    assert.ok(["https://www.groundies.com", "https://groundies.com"].includes(source.origin) &&
      /^\/products\/[a-z0-9-]+$/.test(source.pathname) && !source.search && !source.hash,
    `${slug}: invalid official source page`);
    if (!products.has(gallery.sourceUrl)) {
      const response = await publicRequest(`${gallery.sourceUrl}.json`);
      products.set(gallery.sourceUrl, (await response.json()).product);
    }
    verifyOfficialGallerySource(slug, gallery, products.get(gallery.sourceUrl));
    const urls = [gallery.primaryImage, ...gallery.secondaryImages.map(({ url }) => url)];
    const hashes = new Set();
    // Small bounded batches keep this explicit network check reasonably fast.
    for (let start = 0; start < urls.length; start += 3) {
      const batch = await Promise.all(urls.slice(start, start + 3).map(async (url) => {
        const response = await publicRequest(url);
        assert.match(response.headers.get("content-type") ?? "", /^image\//, `${slug}: resource is not an image`);
        const bytes = Buffer.from(await response.arrayBuffer());
        assert.ok(bytes.length > 0 && bytes.length <= 16000000, `${slug}: unreasonable image size`);
        const jpeg = bytes[0] === 0xff && bytes[1] === 0xd8;
        const png = bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
        const webp = bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP";
        assert.ok(jpeg || png || webp, `${slug}: unsupported or invalid image bytes`);
        return createHash("sha256").update(bytes).digest("hex");
      }));
      for (const hash of batch) {
        assert.ok(!hashes.has(hash), `${slug}: duplicate image content`);
        hashes.add(hash);
      }
    }
    count += urls.length;
    console.log(`${slug}: ${urls.length} verified public photos`);
    if (gallery.missingViews.length) console.log(`  Manufacturer photography still useful: ${gallery.missingViews.join(", ")}`);
  }
  console.log(`Verified ${count} photos for ${groundiesSelection.length} exact colorways. Visual review remains required for future edits.`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  verifyGroundiesGalleries().catch((error) => {
    // Do not print response bodies, raw public product JSON or underlying URLs.
    console.error(`Gallery verification failed: ${error.message}`);
    process.exitCode = 1;
  });
}
