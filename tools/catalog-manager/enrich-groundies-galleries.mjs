#!/usr/bin/env node
/**
 * Optional, manual-only public media enrichment for 14 preapproved Groundies colorways.
 * Requires network access; never reads confidential XML or runs during site build.
 * Fails closed if a selected gallery is missing/ambiguous. Review before publishing.
 */
import { randomUUID } from "node:crypto";
import { readFile, rename, unlink, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { extractProductArray } from "./read-public-catalog.mjs";
import { groundiesSelection } from "./groundies-selection.mjs";
import { photoStem, withApprovedGroundiesGallery, officialGroundiesPhoto } from "./groundies-gallery-utils.mjs";
import { serializeGroundiesProducts } from "./sync-groundies-selection.mjs";

const dir = dirname(fileURLToPath(import.meta.url));
const catalogFile = resolve(dir, "../../src/data/groundiesProducts.ts");
const photoFile = resolve(dir, "./approved-groundies-gallery.mjs");
const BASE = "https://groundies.com";
const STORE_ID = "/s/files/1/0933/3063/7143/files/";
const MIN_PHOTOS = 4;
const MAX_PHOTOS = 8;

/** Fixed, previously verified PUBLIC product handles; no user-supplied URLs. */
const sourceBySlug = Object.freeze({
  "groundies-nova-gs1-stone-zebra": "nova-gs1-women",
  "groundies-nova-gs1-navy-wax-paper": "nova-gs1",
  "groundies-nova-go1-chocolate": "nova-go1-women",
  "groundies-nova-go1-black": "nova-go1",
  "groundies-starlite-2-0-white-silver-black": "groundies-r-starlite-2-0",
  "groundies-starlite-2-0-beige-caramel": "groundies-r-starlite-2-0",
  "groundies-panama-khaki": "panama",
  "groundies-panama-bordeaux": "panama",
  "groundies-panama-soft-caramel": "panama-soft-women",
  "groundies-active-knit-white": "active-knit-women",
  "groundies-active-knit-stone-lime": "active-knit-women",
  "groundies-g-flex-women-black": "g-flex-women",
  "groundies-g-flex-women-off-white": "g-flex-women",
  "groundies-g-flex-men-off-white": "g-flex-men"
});

function assert(ok, message) { if (!ok) throw new Error(message); }
function basePhotoFilename(url) {
  try { return decodeURIComponent(new URL(url).pathname.split("/").at(-1) ?? ""); }
  catch { return ""; }
}
function pictureNo(url) {
  const match = basePhotoFilename(url).match(/_pic(\d+)/i);
  return match ? Number(match[1]) : Infinity;
}
function canonicalOfficialUrl(source) {
  try {
    // Shopify JSON uses remote CDN paths; never accept redirects or unknown hosts here.
    const u = new URL(source.startsWith("//") ? "https:" + source : source, BASE);
    if (u.protocol !== "https:" || u.username || u.password || u.hash) return null;
    if (u.hostname === "cdn.shopify.com" && u.pathname.startsWith(STORE_ID)) {
      u.pathname = "/cdn/shop/files/" + u.pathname.slice(STORE_ID.length);
      u.hostname = "groundies.com";
    } else if (!(u.hostname === "groundies.com" && u.pathname.startsWith("/cdn/shop/files/"))) {
      return null;
    }
    // Preserve only Shopify's public numeric cache-version query.
    if (u.searchParams.size !== 1 || !/^\d+$/.test(u.searchParams.get("v") ?? "")) return null;
    u.search = "?v=" + u.searchParams.get("v");
    const result = u.href;
    return officialGroundiesPhoto(result) ? result : null;
  } catch {
    return null;
  }
}

async function fetchPublicProduct(handle) {
  const candidates = [
    BASE + "/products/" + handle + ".js",
    BASE + "/en/products/" + handle + ".js"
  ];
  let lastError;
  for (const url of candidates) {
    try {
      const response = await fetch(url, {
        redirect: "error",
        headers: { Accept: "application/json", "User-Agent": "ChirikoStudioCatalogPhotoReview/1.0" },
        signal: AbortSignal.timeout(15000)
      });
      assert(response.ok, "Public product data unavailable");
      const contentType = response.headers.get("content-type") ?? "";
      assert(/json|javascript|text\/plain/i.test(contentType), "Unexpected public media feed response");
      const contentLength = Number(response.headers.get("content-length") ?? 0);
      assert(!contentLength || contentLength <= 5_000_000, "Unexpected public media feed size");
      const body = await response.text();
      assert(body.length <= 5_000_000, "Oversized public product media feed");
      const product = JSON.parse(body);
      assert(product && typeof product === "object" && Array.isArray(product.images),
        "Public product feed lacks image array");
      assert(product.handle === handle || !product.handle, "Unexpected public product handle");
      return product;
    } catch (e) { lastError = e; }
  }
  throw new Error("Could not fetch official public gallery for " + handle + ": " +
    (lastError instanceof Error ? lastError.message : "Unknown error"));
}

async function main() {
  assert(process.argv.length === 2, "No command arguments; fixed reviewed SKU selections only.");
  const source = await readFile(catalogFile, "utf8");
  const catalog = extractProductArray(source, "groundiesProducts");
  assert(catalog?.length === groundiesSelection.length && catalog.length === 14,
    "Unexpected approved Groundies count; no changes made");
  assert(Object.keys(sourceBySlug).length === catalog.length &&
    new Set(catalog.map((p) => p.slug)).size === catalog.length &&
    catalog.every((p) => sourceBySlug[p.slug]), "Unknown approved Groundies slug");

  const handles = [...new Set(Object.values(sourceBySlug))];
  const publicProducts = new Map();
  // Fetch only the official Shopify product image index (NOT supplier private XML).
  for (const handle of handles) publicProducts.set(handle, await fetchPublicProduct(handle));

  const reviewed = {};
  for (const product of catalog) {
    const current = product.images[0];
    const stem = photoStem(current);
    assert(stem, "Invalid primary Groundies product photograph");

    const result = publicProducts.get(sourceBySlug[product.slug]);
    const candidates = result.images
      .map((entry) => typeof entry === "string" ? entry : entry?.src)
      .filter((v) => typeof v === "string")
      .map(canonicalOfficialUrl)
      .filter(Boolean)
      .filter((url) => photoStem(url) === stem);

    // Exclude pic1 (primary) and require multiple distinct *real* angles.
    const seen = new Set();
    const extras = candidates.filter((u) => {
      const key = new URL(u).pathname.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).sort((a,b) => pictureNo(a) - pictureNo(b) || a.localeCompare(b))
      .slice(0, MAX_PHOTOS-1);

    assert(extras.length >= MIN_PHOTOS-1,
      "Missing verified official angles for " + product.slug + "; nothing changed");
    reviewed[product.slug] = extras;
    console.log(product.slug + ": " + (extras.length+1) + " images");
  }

  // Validate every size/model/color/fit key before writing either output.
  const enriched = catalog.map((p) => withApprovedGroundiesGallery(p, reviewed));
  assert(enriched.every((p) => p.images.length >= MIN_PHOTOS && p.images.length <= MAX_PHOTOS),
    "Some approved models have insufficient gallery coverage");

  const manifest = [
    "/** Reviewed PUBLIC official Shopify image links, never private supplier data. */",
    "export const approvedGroundiesGallery = " + JSON.stringify(reviewed,null,2) + ";",
    ""
  ].join("\n");
  const productCode = serializeGroundiesProducts(enriched);
  const tmpManifest = photoFile + "." + randomUUID() + ".tmp";
  const tmpCatalog = catalogFile + "." + randomUUID() + ".tmp";
  try {
    await writeFile(tmpManifest, manifest, {encoding:"utf8", flag:"wx"});
    await writeFile(tmpCatalog, productCode, {encoding:"utf8", flag:"wx"});
    // The manifest is the source of truth on later manual XML syncs.
    await rename(tmpManifest, photoFile);
    await rename(tmpCatalog, catalogFile);
  } finally {
    for (const path of [tmpManifest,tmpCatalog]) {
      await unlink(path).catch((error) => { if (error.code !== "ENOENT") throw error; });
    }
  }
  console.log("All 14 curated Groundies galleries updated; visually review BEFORE merging.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : "Official image sync failed");
  process.exitCode = 1;
});
