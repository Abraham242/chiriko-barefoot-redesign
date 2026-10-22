#!/usr/bin/env node
/**
 * Manual availability snapshot for the 22 curated Be Lenka/Barebarics products.
 * Supplier XML is read only from the gitignored private input directory.
 * This module is not imported by the storefront and never runs during builds.
 */
import { randomUUID } from "node:crypto";
import { readFile, realpath, rename, stat, unlink, writeFile } from "node:fs/promises";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { TextDecoder } from "node:util";
import { JSDOM } from "jsdom";
import ts from "typescript";
import { coreSizeSelection } from "./core-size-selection.mjs";
import { extractProductArray } from "./read-public-catalog.mjs";

const toolDirectory = dirname(fileURLToPath(import.meta.url));
const inputRoot = resolve(toolDirectory, "input");
const outputPath = resolve(toolDirectory, "../../src/data/products.ts");
const feeds = Object.freeze({
  "Be Lenka": resolve(inputRoot, "be-lenka.xml"),
  Barebarics: resolve(inputRoot, "barebarics.xml"),
});

function assert(condition, message) {
  if (!condition) throw new Error(message);
}
function field(item, name) {
  const matching = [...item.children].filter((node) => node.localName === name);
  assert(matching.length <= 1 && matching.every((node) => node.children.length === 0),
    "Ambiguous supplier XML field; catalog unchanged.");
  return matching[0]?.textContent.trim() ?? "";
}
function parseSize(value) {
  assert(/^[1-9]\d?$/.test(value), "Invalid supplier shoe size; catalog unchanged.");
  const size = Number(value);
  assert(size >= 20 && size <= 60, "Unsupported supplier shoe size; catalog unchanged.");
  return String(size);
}

/** Parse a supplier file without serializing its private records. */
export function sizesFromXml(xml, brand, warn = console.warn) {
  assert(brand === "Be Lenka" || brand === "Barebarics", "Unknown brand");
  assert(!/<!\s*(DOCTYPE|ENTITY)\b/i.test(xml), "DOCTYPE/ENTITY forbidden; catalog unchanged.");
  let dom;
  try {
    dom = new JSDOM(xml, { contentType: "application/xml" });
  } catch {
    throw new Error("Malformed supplier XML; catalog unchanged.");
  }
  try {
    const doc = dom.window.document;
    const channel = doc.documentElement?.localName === "rss"
      ? [...doc.documentElement.children].find((node) => node.localName === "channel")
      : null;
    assert(channel && field(channel, "title") === brand,
      "XML channel brand does not match expected supplier; catalog unchanged.");

    const selected = coreSizeSelection.filter((entry) => entry.brand === brand);
    const grouped = new Map(selected.map((entry) => [entry.feedTitle, []]));
    assert(grouped.size === selected.length, "Duplicate title in core allowlist.");
    const items = [...channel.children].filter((node) => node.localName === "item");
    assert(items.length > 0, "Empty supplier XML; catalog unchanged.");
    for (const item of items) {
      const title = field(item, "title_second_line");
      if (grouped.has(title)) grouped.get(title).push(item);
    }
    const output = new Map();
    for (const entry of selected) {
      const records = grouped.get(entry.feedTitle);
      assert(records.length > 0,
        "An approved product/color is missing from supplier feed; manual review required; catalog unchanged.");
      const sizes = new Set();
      const seenSizes = new Set();
      const groups = new Set();
      for (const record of records) {
        const size = parseSize(field(record, "size"));
        assert(!seenSizes.has(size), "Duplicate supplier variant size; catalog unchanged.");
        seenSizes.add(size);
        const group = field(record, "item_group_id");
        assert(group.length > 0, "Missing supplier variant group; catalog unchanged.");
        groups.add(group);
        const availability = field(record, "availability");
        assert(["in stock", "out of stock"].includes(availability),
          "Unexpected supplier availability; catalog unchanged.");
        const quantity = field(record, "availability_count");
        assert(/^\d+$/.test(quantity), "Missing supplier availability count; catalog unchanged.");
        if (availability === "in stock" && Number(quantity) > 0) sizes.add(size);
      }
      assert(groups.size === 1, "Multiple supplier variant groups for approved color; catalog unchanged.");
      const sorted = [...sizes].sort((a, b) => Number(a) - Number(b));
      if (sorted.length === 0) warn("WARNING " + entry.slug + ": no consultable sizes; review publication manually.");
      else if (sorted.length < 6) warn("REVIEW " + entry.slug + ": limited size coverage (" + sorted.length + ").");
      output.set(entry.slug, sorted);
    }
    return output;
  } finally {
    dom.window.close();
  }
}

export function updateCoreProductSizes(products, sizesBySlug) {
  assert(Array.isArray(products) && products.length === coreSizeSelection.length,
    "Unexpected core product count; catalog unchanged.");
  const bySlug = new Map(coreSizeSelection.map((entry) => [entry.slug, entry]));
  assert(bySlug.size === coreSizeSelection.length && sizesBySlug.size === coreSizeSelection.length,
    "Incomplete or duplicated size allowlist; catalog unchanged.");
  const ids = new Set();
  return products.map((product) => {
    const entry = bySlug.get(product.slug);
    assert(entry && entry.brand === product.brand && product.id && !ids.has(product.id) &&
      product.status === "preorder", "Unexpected core product identity or status; catalog unchanged.");
    ids.add(product.id);
    const sizes = sizesBySlug.get(product.slug);
    assert(Array.isArray(sizes), "Missing approved sizes; catalog unchanged.");
    return { ...product, consultableSizes: sizes };
  });
}

async function readPrivateXml(inputPath) {
  let contents;
  try {
    const [root, actual] = await Promise.all([realpath(inputRoot), realpath(inputPath)]);
    const inside = relative(root, actual);
    assert(inside && inside !== ".." && !inside.startsWith(".." + sep) && !isAbsolute(inside),
      "XML must be inside private input directory.");
    assert((await stat(actual)).isFile(), "XML input must be a file.");
    contents = await readFile(actual);
  } catch {
    throw new Error("Cannot read required private supplier XML; catalog unchanged.");
  }
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(contents);
  } catch {
    throw new Error("Supplier XML must be UTF-8; catalog unchanged.");
  }
}
function findCoreArray(source) {
  const ast = ts.createSourceFile("products.ts", source, ts.ScriptTarget.Latest, true);
  for (const stmt of ast.statements) {
    if (!ts.isVariableStatement(stmt)) continue;
    for (const decl of stmt.declarationList.declarations) {
      if (ts.isIdentifier(decl.name) && decl.name.text === "coreProducts" &&
          decl.initializer && ts.isArrayLiteralExpression(decl.initializer)) {
        return { start: decl.initializer.getStart(ast), end: decl.initializer.getEnd() };
      }
    }
  }
  throw new Error("Core catalog structure has changed; catalog unchanged.");
}

export async function syncCoreSizes() {
  const source = await readFile(outputPath, "utf8");
  assert(source.includes("...coreProducts, ...groundiesProducts"),
    "Groundies composition missing; catalog unchanged.");
  const before = extractProductArray(source, "coreProducts");
  const blobs = await Promise.all([
    readPrivateXml(feeds["Be Lenka"]),
    readPrivateXml(feeds.Barebarics),
  ]);
  const all = new Map();
  for (const [index, brand] of ["Be Lenka", "Barebarics"].entries()) {
    for (const [slug, sizes] of sizesFromXml(blobs[index], brand)) {
      assert(!all.has(slug), "Duplicate approved core slug; catalog unchanged.");
      all.set(slug, sizes);
    }
  }
  const next = updateCoreProductSizes(before, all);
  const span = findCoreArray(source);
  const output = source.slice(0, span.start) + JSON.stringify(next, null, 2) + source.slice(span.end);
  const tempPath = outputPath + "." + randomUUID() + ".tmp";
  try {
    await writeFile(tempPath, output, { encoding: "utf8", flag: "wx", mode: 0o644 });
    await rename(tempPath, outputPath);
  } finally {
    await unlink(tempPath).catch((error) => {
      if (error.code !== "ENOENT") throw error;
    });
  }
  console.log("Updated sizes for " + next.length + " curated core products. Verify before publication.");
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv.length !== 2) {
    console.error("No command-line arguments accepted; use fixed private XML filenames.");
    process.exitCode = 1;
  } else {
    syncCoreSizes().catch((error) => {
      console.error(error.code ? "Core size sync I/O failure; catalog unchanged." : error.message);
      process.exitCode = 1;
    });
  }
}
