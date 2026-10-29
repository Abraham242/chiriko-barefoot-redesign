import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { extractProductArray } from "./read-public-catalog.mjs";
import { groundiesSelection } from "./groundies-selection.mjs";
import { approvedGroundiesGallery } from "./approved-groundies-gallery.mjs";
import { withApprovedGroundiesGallery, photoStem, officialGroundiesPhoto } from "./groundies-gallery-utils.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

test("only the 14 curated product slugs can receive official multi-angle galleries", async () => {
  const code = await readFile(resolve(root,"src/data/groundiesProducts.ts"),"utf8");
  const products = extractProductArray(code, "groundiesProducts");
  const selected = new Set(products.map((p) => p.slug));
  assert.equal(selected.size, groundiesSelection.length);
  assert.equal(selected.size, 14);
  const approved = Object.keys(approvedGroundiesGallery);
  assert.equal(new Set(approved).size, approved.length);
  assert.ok(approved.every((slug) => selected.has(slug)));
  for (const p of products) {
    const extras = approvedGroundiesGallery[p.slug] ?? [];
    assert.equal(p.status, "preorder");
    assert.ok(Array.isArray(extras));
    if (!extras.length) {
      assert.equal(p.images.length, 1);
      continue;
    }
    assert.ok(extras.length >= 3 && extras.length <= 7);
    assert.ok(extras.every(officialGroundiesPhoto));
    assert.ok(extras.every((img) => photoStem(img) === photoStem(p.images[0])));
    const withGallery = withApprovedGroundiesGallery(p);
    assert.deepEqual(withGallery.images, [p.images[0], ...extras]);
    assert.deepEqual(withGallery.images, p.images);
  }
});

test("gallery validator rejects other fits, colors, suppliers, credentials and duplicate views", () => {
  const main = {
    brand: "Groundies", slug:"groundies-g-flex-women-off-white",
    images:["https://cdn.shopify.com/s/files/1/0933/3063/7143/files/gnd-130291-02-h_pic1.jpg?v=123"]
  };
  const valid = "https://groundies.com/cdn/shop/files/gnd-130291-02-h_pic2.jpg?v=123";
  assert.deepEqual(withApprovedGroundiesGallery(main,{[main.slug]:[valid]}).images,[main.images[0],valid]);
  for (const bad of [
    "http://groundies.com/cdn/shop/files/gnd-130291-02-h_pic2.jpg?v=123",
    "https://groundies.com/cdn/shop/files/gnd-230291-02-h_pic2.jpg?v=123",
    "https://groundies.com/cdn/shop/files/gnd-130291-01-h_pic2.jpg?v=123",
    "https://groundies.com/cdn/shop/files/gnd-130291-02-h_pic2.jpg?token=private",
    "https://elsewhere.com/cdn/shop/files/gnd-130291-02-h_pic2.jpg?v=123"
  ]) {
    assert.throws(() => withApprovedGroundiesGallery(main,{[main.slug]:[bad]}));
  }
  assert.throws(() => withApprovedGroundiesGallery(main,{[main.slug]:[valid,valid]}),/Duplicate/);
  const cdnAlias = "https://cdn.shopify.com/s/files/1/0933/3063/7143/files/gnd-130291-02-h_pic2.jpg?v=456";
  assert.ok(officialGroundiesPhoto(cdnAlias));
  assert.throws(() => withApprovedGroundiesGallery(main,{[main.slug]:[valid,cdnAlias]}),/Duplicate/);
});

test("the gallery additions do not change colors, prices, sizes or identity", async () => {
  const code = await readFile(resolve(root,"src/data/groundiesProducts.ts"),"utf8");
  const records = extractProductArray(code,"groundiesProducts");
  for (const p of records) {
    const x = withApprovedGroundiesGallery(p);
    const a = {...p,images:[]}, b = {...x,images:[]};
    assert.deepEqual(a,b);
  }
});
