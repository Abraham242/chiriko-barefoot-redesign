/**
 * Public-only editorial Groundies galleries.
 * The exact primary picture comes from the reviewed supplier snapshot.
 * Supplemental picture URLs must come from the official Groundies product gallery,
 * use the same shoe-variant filename stem and never encode private feed data.
 */
import { approvedGroundiesGallery } from "./approved-groundies-gallery.mjs";

export function photoStem(value) {
  try {
    const url = new URL(value);
    const filename = decodeURIComponent(url.pathname.split("/").at(-1) ?? "");
    const found = filename.match(/^(gnd-\d{6}-\d{2}-h)_pic\d+/i);
    return found?.[1].toLowerCase() ?? null;
  } catch {
    return null;
  }
}

export function officialGroundiesPhoto(value) {
  try {
    const url = new URL(value);
    const approvedLocation = (url.origin === "https://groundies.com" && url.pathname.startsWith("/cdn/shop/files/")) ||
      (url.origin === "https://cdn.shopify.com" && url.pathname.startsWith("/s/files/1/0933/3063/7143/files/"));
    if (!approvedLocation ||
        url.username || url.password || url.hash ||
        url.searchParams.size !== 1 ||
        !/^\d+$/.test(url.searchParams.get("v") ?? "")) return false;
    const filename = decodeURIComponent(url.pathname.split("/").at(-1) ?? "");
    return /^gnd-\d{6}-\d{2}-h_pic[2-9]\d*(?:_[a-z0-9-]+)?\.(?:jpg|jpeg|png|webp)$/i.test(filename);
  } catch {
    return false;
  }
}

export function withApprovedGroundiesGallery(product, manifest = approvedGroundiesGallery) {
  if (product.brand !== "Groundies" || !Array.isArray(product.images) || product.images.length < 1) {
    throw new Error("Invalid Groundies product for gallery enrichment.");
  }
  const original = product.images[0];
  const stem = photoStem(original);
  if (!stem) throw new Error("Groundies primary photo lacks a verified SKU stem.");
  const extras = manifest[product.slug] ?? [];
  if (!Array.isArray(extras) || extras.length > 7) throw new Error("Too many Groundies gallery photos.");
  // The official domain and Shopify CDN can expose the same photo under
  // different paths. Filename identity also ignores public cache versions.
  const photoKey = (url) => decodeURIComponent(new URL(url).pathname.split("/").at(-1)).toLowerCase();
  const chosen = new Set([photoKey(original)]);
  const result = [original];
  for (const url of extras) {
    if (!officialGroundiesPhoto(url) || photoStem(url) !== stem) {
      throw new Error("Groundies gallery photo does not match approved model/color/fit.");
    }
    const key = photoKey(url);
    if (chosen.has(key)) throw new Error("Duplicate Groundies gallery image.");
    chosen.add(key);
    result.push(url);
  }
  return { ...product, images: result };
}
