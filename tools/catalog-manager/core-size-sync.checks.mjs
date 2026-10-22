import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { coreSizeSelection } from "./core-size-selection.mjs";
import { sizesFromXml, updateCoreProductSizes } from "./sync-core-sizes.mjs";
import { extractProductArray } from "./read-public-catalog.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const xmlEscape = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
function item(title, size = "38", availability = "in stock", quantity = "1", group = "100") {
  return "<item><title_second_line>" + xmlEscape(title) + "</title_second_line><size>" + size +
    "</size><availability>" + availability + "</availability><availability_count>" + quantity +
    "</availability_count><item_group_id>" + group + "</item_group_id></item>";
}
function feed(brand, entries = coreSizeSelection.filter((entry) => entry.brand === brand)) {
  const items = entries.map((entry) => item(entry.feedTitle));
  return "<rss><channel><title>" + brand + "</title>" + items.join("") + "</channel></rss>";
}
const quiet = () => {};

test("all curated core products have unique slugs and source title/brand mappings", () => {
  assert.equal(coreSizeSelection.length, 19);
  assert.equal(new Set(coreSizeSelection.map((p) => p.slug)).size, 19);
  assert.equal(new Set(coreSizeSelection.map((p) => p.brand + "/" + p.feedTitle)).size, 19);
  assert.deepEqual(coreSizeSelection.reduce((map, entry) => {
    map[entry.brand] = (map[entry.brand] || 0) + 1; return map;
  }, {}), { Barebarics: 8, "Be Lenka": 11 });
});

test("matching is exact; zero availability and out-of-stock sizes never qualify", () => {
  const brand = "Be Lenka";
  const entries = coreSizeSelection.filter((p) => p.brand === brand);
  const target = entries[0];
  const xml = "<rss><channel><title>Be Lenka</title>" +
    entries.map((entry) => entry === target
      ? item(entry.feedTitle, "38", "in stock", "4") +
        item(entry.feedTitle, "39", "out of stock", "0") +
        item(entry.feedTitle, "40", "in stock", "0")
      : item(entry.feedTitle)).join("") +
    "</channel></rss>";
  const result = sizesFromXml(xml, brand, quiet);
  assert.deepEqual(result.get(target.slug), ["38"]);
  assert.equal(result.size, 11);
});

test("a missing selected color, wrong brand, malformed XML or DOCTYPE fails closed", () => {
  const missing = coreSizeSelection.filter((e) => e.brand === "Barebarics").slice(1);
  assert.throws(() => sizesFromXml(feed("Barebarics", missing), "Barebarics", quiet), /missing/i);
  assert.throws(() => sizesFromXml(feed("Be Lenka"), "Barebarics", quiet), /channel brand/i);
  assert.throws(() => sizesFromXml("<rss><channel>", "Be Lenka", quiet), /Malformed/i);
  assert.throws(() => sizesFromXml('<!DOCTYPE rss [<!ENTITY ext "bad">]>' + feed("Be Lenka"), "Be Lenka", quiet), /DOCTYPE/i);
});

test("ambiguous supplier group, duplicate size or unknown availability rejects snapshot", () => {
  const entries = coreSizeSelection.filter((e) => e.brand === "Barebarics");
  const target = entries[0];
  for (const extra of [
    item(target.feedTitle, "39", "in stock", "1", "different-group"),
    item(target.feedTitle, "38", "in stock", "1", "100"),
  ]) {
    const xml = "<rss><channel><title>Barebarics</title>" + entries.map((entry) =>
      item(entry.feedTitle) + (entry === target ? extra : "")).join("") + "</channel></rss>";
    assert.throws(() => sizesFromXml(xml, "Barebarics", quiet));
  }
  const badXml = "<rss><channel><title>Barebarics</title>" + entries.map((entry) =>
    item(entry.feedTitle, "38", entry === target ? "unknown" : "in stock")).join("") + "</channel></rss>";
  assert.throws(() => sizesFromXml(badXml, "Barebarics", quiet), /availability/i);
});

test("size replacement keeps product identity, photos, pricing and Groundies composition", async () => {
  const text = await readFile(resolve(root, "src/data/products.ts"), "utf8");
  const products = extractProductArray(text, "coreProducts");
  assert.ok(text.includes("...coreProducts, ...groundiesProducts"));
  const approved = new Map(coreSizeSelection.map((entry) => [entry.slug, ["38", "40"]]));
  const next = updateCoreProductSizes(products, approved);
  assert.equal(next.length, products.length);
  for (let i = 0; i < products.length; i++) {
    assert.deepEqual(next[i].consultableSizes, ["38", "40"]);
    const expected = { ...products[i], consultableSizes: ["38", "40"] };
    assert.deepEqual(next[i], expected);
  }
  const incomplete = new Map(approved);
  incomplete.delete(products[0].slug);
  assert.throws(() => updateCoreProductSizes(products, incomplete), /allowlist/i);
});
