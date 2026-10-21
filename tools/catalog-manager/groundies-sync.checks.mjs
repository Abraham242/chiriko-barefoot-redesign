// Run with node --test tools/catalog-manager/groundies-sync.checks.mjs.
// Synthetic markup stays in memory for parser/security tests; it is never a feed
// file or a substitute for supplier-backed storefront generation.
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import test from "node:test";
import { groundiesSelection } from "./groundies-selection.mjs";
import { generateGroundiesProducts, serializeGroundiesProducts, syncGroundiesSelection } from "./sync-groundies-selection.mjs";
import { extractProductArray, readPublicCatalog } from "./read-public-catalog.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const escapeXml = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
function item(entry, overrides = {}) {
  const fields = {
    title: entry.title, color: entry.color, size: "38", availability: "in_stock",
    image_link: `https://images.example.com/${groundiesSelection.indexOf(entry)}.jpg`, ...overrides,
  };
  return `<item>${Object.entries(fields).map(([key, value]) => `<g:${key}>${escapeXml(value)}</g:${key}>`).join("")}</item>`;
}
const feed = (items) => `<rss xmlns:g="http://base.google.com/ns/1.0"><channel>${items.join("")}</channel></rss>`;
const complete = (replace = (entry) => item(entry)) => feed(groundiesSelection.map(replace));
const generate = (xml) => generateGroundiesProducts(xml, () => {});
const productFor = (products, model, gender, color) => {
  const product = products.find((p) => p.model === model && p.gender === gender && (!color || p.colorName === color));
  assert.ok(product, `Missing ${model} / ${gender} / ${color ?? "any color"}`);
  return product;
};

test("exact allowlist, public output and fit groups", () => {
  const xml = complete();
  const products = generate(xml);
  assert.equal(products.length, groundiesSelection.length);
  assert.equal(new Set(products.map((p) => p.id)).size, groundiesSelection.length);
  assert.equal(new Set(products.map((p) => p.slug)).size, groundiesSelection.length);
  assert.equal(productFor(products, "Active Knit", "women", "White").colorName, "White");
  for (const model of ["Nova GS1", "Nova GO1"]) {
    assert.notEqual(productFor(products, model, "women").groupSlug, productFor(products, model, "unisex").groupSlug);
  }
  const women = productFor(products, "G-Flex", "women");
  const men = productFor(products, "G-Flex", "men");
  assert.notEqual(women.groupSlug, men.groupSlug);
  assert.match(women.name, /Mujer/);
  assert.match(men.name, /Hombre/);
  assert.equal(productFor(products, "G-Flex", "women", "Black").groupSlug, productFor(products, "G-Flex", "women", "Off-White").groupSlug);
  assert.notEqual(productFor(products, "G-Flex", "women", "Off-White").slug, productFor(products, "G-Flex", "men", "Off-White").slug);
  assert.equal(productFor(products, "Starlite 2.0", "unisex", "White/Silver/Black").groupSlug, productFor(products, "Starlite 2.0", "unisex", "Beige/Caramel").groupSlug);
  assert.deepEqual(products.filter((p) => p.isFeatured).map((p) => p.slug), ["groundies-starlite-2-0-white-silver-black"]);
  for (const product of products) {
    assert.equal(product.status, "preorder");
    assert.equal(product.price, 0);
    assert.deepEqual(product.sizes, []);
    assert.equal(product.currency, "$");
    assert.equal(product.images.length, 1);
  }
  assert.equal(serializeGroundiesProducts(generate(xml)), serializeGroundiesProducts(products));
});

test("approved families retain their curated order with distinct adjacent Panama models", () => {
  const products = generate(complete());
  assert.equal(products.length, 14);
  assert.deepEqual([...new Set(products.map((p) => p.model))], [
    "Nova GS1", "Nova GO1", "Starlite 2.0", "Panama", "Panama Soft", "Active Knit", "G-Flex",
  ]);
  const nextToPanama = products[products.findLastIndex((p) => p.model === "Panama") + 1];
  assert.equal(nextToPanama.model, "Panama Soft");
  assert.notEqual(productFor(products, "Panama", "unisex").groupSlug, nextToPanama.groupSlug);
  assert.equal(products.some((p) => /G-Pure|G-Flex Precision|Chamonix/.test(p.model)), false);
});

test("numeric sizes are deduplicated, sorted and restricted to in_stock", () => {
  const products = generate(complete((entry) => [
    item(entry, { size: "40" }), item(entry, { size: "36" }), item(entry, { size: "36.0" }),
    item(entry, { size: "37,5" }), item(entry, { size: "39", availability: "out_of_stock" }),
  ].join("")));
  assert.deepEqual(products[0].consultableSizes, ["36", "37.5", "40"]);
  assert.equal(products[0].images.length, 1);
});

test("out-of-stock refresh clears previous sizes and requests publication review", () => {
  const previous = generate(complete());
  const warnings = [];
  const next = generateGroundiesProducts(complete((entry) => item(entry, {
    availability: entry.model === "Panama Soft" ? "out_of_stock" : "in_stock",
  })), (message) => warnings.push(message));
  assert.deepEqual(productFor(previous, "Panama Soft", "women").consultableSizes, ["38"]);
  assert.deepEqual(productFor(next, "Panama Soft", "women").consultableSizes, []);
  assert.equal(next.length, groundiesSelection.length);
  assert.ok(warnings.some((message) => /groundies-panama-soft-caramel.*manual publication review/.test(message)));
});

test("new models, colors and similarly named fits cannot enter the selection", () => {
  const extra = [
    item({ title: "Chamonix TR Precision", color: "Black" }),
    item({ title: "Chamonix TR Precision Women", color: "Sand/Coal" }, { size: "38" }),
    item({ title: "Chamonix TR Precision Men", color: "Sand/Coal" }, { size: "44" }),
    item({ title: "Chamonix TR Low Women", color: "Sand/Coal" }, { size: "49" }),
    item({ title: "G-Flex Precision Women", color: "Black" }, { size: "49" }),
    item({ title: "G-Flex Precision Men", color: "Off-White" }, { size: "49" }),
    item({ title: "G-Flex Men", color: "Black" }),
    item({ title: "G-Flex Men", color: "Mint" }, { size: "49" }),
    item({ title: "G-Pure Women", color: "Dark Brown" }),
    item({ title: "G-Pure Men", color: "Sand/Orange" }),
    item({ title: "GROUNDIES® Starlite 2.0 Women", color: "White/Silver/Black" }, { size: "49" }),
    item({ title: "Nova GS1", color: "New Color" }),
  ];
  assert.deepEqual(generate(feed([...groundiesSelection.map((entry) => item(entry)), ...extra])), generate(complete()));
  assert.throws(() => generate(complete((entry) => entry.featured
    ? item({ ...entry, title: "GROUNDIES® Starlite 2.0 Women" }) : item(entry))), /Incomplete approved selection/);
});

test("fragmented availability and Starlite ranges are derived only from input rows", () => {
  const products = generate(complete((entry) => {
    const sizes = entry.model === "Starlite 2.0" ? Array.from({ length: 12 }, (_, i) => String(36 + i)) : ["36", "39", "42"];
    return sizes.map((size) => item(entry, { size })).join("");
  }));
  const starlite = productFor(products, "Starlite 2.0", "unisex", "White/Silver/Black");
  assert.deepEqual(starlite.consultableSizes, Array.from({ length: 12 }, (_, i) => String(36 + i)));
  assert.deepEqual(productFor(products, "Starlite 2.0", "unisex", "Beige/Caramel").consultableSizes, starlite.consultableSizes);
  assert.deepEqual(productFor(products, "Panama Soft", "women").consultableSizes, ["36", "39", "42"]);
});

test("only the three approved regular G-Flex colorways retain their fit-specific sizes", () => {
  const selected = groundiesSelection.filter((entry) => entry.model === "G-Flex");
  assert.deepEqual(selected.map(({ title, color }) => [title, color]), [
    ["G-Flex Women", "Black"], ["G-Flex Women", "Off-White"], ["G-Flex Men", "Off-White"],
  ]);
  const sizesFor = (entry) => entry.gender === "women"
    ? ["36", "37", "38", "39", "40", "41", "42"] : ["40", "41", "42", "43", "44", "45"];
  const products = generate(complete((entry) => selected.includes(entry)
    ? sizesFor(entry).map((size) => item(entry, { size })).join("") : item(entry)));
  for (const entry of selected) {
    assert.deepEqual(productFor(products, entry.model, entry.gender, entry.color).consultableSizes, sizesFor(entry));
  }
  for (const entry of selected) {
    assert.throws(() => generate(complete((candidate) => candidate === entry
      ? item({ ...entry, title: `G-Flex Precision ${entry.gender === "women" ? "Women" : "Men"}` }) : item(candidate))), /Incomplete approved selection/);
  }
});

test("primary image changes propagate; only matching image_link URLs become images", () => {
  const products = generate(complete((entry) => item(entry, {
    image_link: `https://images.example.com/updated-${groundiesSelection.indexOf(entry)}.png`,
    additional_image_link: "https://images.example.com/another-color.jpg",
  })));
  assert.deepEqual(products[0].images, ["https://images.example.com/updated-0.png"]);
  const versioned = "https://cdn.shopify.com/s/files/1/public-image.jpg?v=1234567890";
  assert.deepEqual(generate(complete((entry) => item(entry, { image_link: versioned })))[0].images, [versioned]);
});

test("private fields and XML content never become public product metadata", () => {
  const products = generate(complete((entry) => item(entry, {
    id: "PRIVATE_ID_SENTINEL", gtin: "PRIVATE_GTIN_SENTINEL", item_group_id: "PRIVATE_GROUP_SENTINEL",
    availability_count: "PRIVATE_STOCK_SENTINEL", price: "PRIVATE_COST_SENTINEL",
    description: "PRIVATE_DESCRIPTION_SENTINEL", feed_url: "https://private.example.com/feed.xml",
  })));
  assert.doesNotMatch(serializeGroundiesProducts(products), /PRIVATE_|private\.example|availability|gtin|item_group_id|feed_url/);
});

test("incomplete selection aborts rather than retaining previous data", () => {
  assert.throws(() => generate(feed(groundiesSelection.slice(1).map((entry) => item(entry)))), /Incomplete approved selection/);
});

test("malformed XML, unsafe declarations and entity references fail without leaking input", () => {
  for (const xml of ["", "\n\n", "<rss><item></rss>", "<rss>&private_secret;</rss>",
    '<!DOCTYPE rss SYSTEM "https://private.example.com/secret"><rss/>',
    '<!ENTITY private "PRIVATE_VALUE"><rss/>']) {
    assert.throws(() => generate(xml), (error) => {
      assert.doesNotMatch(error.message, /private_secret|private\.example|PRIVATE_VALUE/);
      return true;
    });
  }
});

test("missing, ambiguous and invalid matched fields fail safely", () => {
  for (const overrides of [{ size: "" }, { size: "36 PRIVATE_ID" }, { availability: "" }, { availability: "yes" }]) {
    assert.throws(() => generate(complete((entry) => item(entry, overrides))), /missing or unsupported/);
  }
  const duplicate = complete().replace("</item>", "<g:size>40</g:size></item>");
  assert.throws(() => generate(duplicate), /ambiguous size/);
});

test("missing, non-HTTPS and credential-bearing images block publication", () => {
  for (const image_link of ["", "http://images.example.com/a.jpg", "https://user:pass@images.example.com/a.jpg",
    "https://images.example.com/a.jpg?token=PRIVATE_VALUE", "https://images.example.com/secret/a.jpg",
    "https://images.example.com/%74oken/a.jpg", "https://images.example.com/feed.xml", "https://127.0.0.1/a.jpg",
    "https://cdn.shopify.com/a.jpg?token=PRIVATE_VALUE", "https://cdn.shopify.com/a.jpg?v=123&token=PRIVATE_VALUE",
    "https://cdn.shopify.com/a.jpg?v=PRIVATE_VALUE", "https://[::ffff:127.0.0.1]/a.jpg"]) {
    assert.throws(() => generate(complete((entry) => item(entry, { image_link }))), /Invalid approved photography/);
  }
});

test("CLI rejects remote, missing and escaping local paths without altering generated data", async () => {
  const path = resolve(root, "src/data/groundiesProducts.ts");
  const before = await readFile(path);
  for (const input of ["https://private.example.com/feed.xml", resolve(root, "tools/catalog-manager/input/absent-security-check.xml"), resolve(root, "package.json")]) {
    await assert.rejects(syncGroundiesSelection(input));
    assert.deepEqual(await readFile(path), before);
  }
});

test("legacy 22-product apply workflow preserves the Groundies composition", async () => {
  const directory = await mkdtemp(resolve(tmpdir(), "chiriko-legacy-check-"));
  try {
    const tool = resolve(directory, "tools/catalog-manager");
    const data = resolve(directory, "src/data");
    await mkdir(resolve(tool, "output"), { recursive: true });
    await mkdir(data, { recursive: true });
    const source = await readFile(resolve(root, "src/data/products.ts"), "utf8");
    const core = extractProductArray(source, "coreProducts");
    assert.equal(core.length, 22);
    const groundies = serializeGroundiesProducts(generate(complete()));
    await writeFile(resolve(data, "groundiesProducts.ts"), groundies);
    await writeFile(resolve(tool, "output/launch-products.proposal.json"), JSON.stringify(core));
    await writeFile(resolve(tool, "apply-launch-products.mjs"), await readFile(resolve(root, "tools/catalog-manager/apply-launch-products.mjs")));
    await promisify(execFile)(process.execPath, [resolve(tool, "apply-launch-products.mjs")]);
    const applied = await readFile(resolve(data, "products.ts"), "utf8");
    assert.deepEqual(extractProductArray(applied, "coreProducts"), core);
    assert.match(applied, /\.\.\.coreProducts, \.\.\.groundiesProducts/);
    assert.equal(await readFile(resolve(data, "groundiesProducts.ts"), "utf8"), groundies);
    assert.equal((await readPublicCatalog(resolve(data, "products.ts"))).length, core.length + groundiesSelection.length);
    await promisify(execFile)(process.execPath, [resolve(tool, "apply-launch-products.mjs")]);
    assert.equal(await readFile(resolve(data, "products.ts"), "utf8"), applied);
  } finally { await rm(directory, { recursive: true, force: true }); }
});
