# Internal catalog feed importer

This local Node tool converts a supplier XML export into **review-only** Chiriko
product drafts. It does not contact a remote feed, download images, alter
`src/data/products.ts`, or publish anything to the storefront.

## Run it

1. Create `tools/catalog-manager/input/` locally.
2. Put the XML file there, for example as `feed.xml`.
3. From the repository root, run:

   ```sh
   node tools/catalog-manager/import-feed.mjs ./tools/catalog-manager/input/feed.xml
   ```

The generated file is `tools/catalog-manager/output/product-drafts.json`.
Both the input and output directories are ignored by Git. The output contains
public-shaped drafts only, but it remains local so that every record can be
checked before selected records are manually copied into
`src/data/products.ts`.

The importer recognizes `<product>`, `<item>`, and `<article>` records, including
the Be Lenka/Venalio merchant feed structure. Merchant-feed items may each be a
single SKU/size row, so the importer first creates safe intermediate rows and
then groups them into one product/color draft by normalized brand, commercial
model/name, and color. It never creates a separate Chiriko product merely
because the size or item group differs.

Supplier `title_first_line` values may be category labels (for example,
`Barefoot tenisky`) rather than model names. When `title_second_line` is
present, the importer treats it as the commercial model/color title: for
example, `Zing - White & Black Vegan` becomes model `Zing` and color name
`White & Black Vegan`. The XML `color` remains the broader `colorFamily`.
Rows without a second line fall back safely to `title` or a non-generic first
line.

Before a draft is written, image URL filenames and paths are filtered against
the normalized commercial brand/model and color variant. Obvious images from a
different model or color variant are removed. Explicitly Vegan variants reject
leather filenames; explicitly leather variants prefer them; and an unlabelled
variant may use leather filenames when they are its only otherwise-matching
images. Launch drafts are limited to eight images. If strict color matching
leaves no images, only safe primary `image_link` values from the matching rows
may be retained.

Non-footwear accessories and care products—including insoles, socks, shirts,
sprays, cleaners, waxes, and protectors—are excluded from the main product
drafts by default. The console reports how many such groups were excluded.

Imported size labels go into `consultableSizes` only; `sizes` stays empty. The
feed's `availability` yes/no value only decides which sizes appear as
consultable in review drafts: unavailable or unclear values are excluded, while
a missing field remains eligible for manual review. The feed's
`availability_count` is never exposed, and stock is never published. Final
availability must always be confirmed manually before offering a pair to a
customer.

Prices are intentionally not imported until Chiriko confirms a safe public
customer-facing field, so every draft keeps `price: 0` and defaults to
`preorder`. The generated output is review-only and never updates the
storefront by itself.

## Security and review checklist

Never commit:

- supplier feed URLs or credentials;
- `.env` files, tokens, API keys, or other secrets;
- the source XML or other private B2B exports;
- wholesale prices, supplier cost, margin data, retail-price formulas, private
  terms, stock quantities, or logistics notes;
- generated output without first moving only approved, public-safe fields into
  the catalog by hand.

Keep all supplier pricing, costs, margins, availability details, and internal
calculations outside `src/`, `public/`, HTML, and every frontend bundle. Do not
add a feed request to React code. If local URL support is added later, keep the
URL and credentials in an uncommitted `.env` and perform the request only from
an internal Node tool.

Before using any draft, verify its title, grouping, category, color, image URLs,
sizes, customer-facing price, and status. Remove placeholders and confirm that
descriptions contain no private supplier information. Copy approved objects to
`src/data/products.ts` manually; running this importer never changes the public
catalog.

Generated images must be visually reviewed before publishing. URL filtering is
a safety check, not a replacement for confirming that every photograph shows
the intended commercial product and color.

## Review current product images

Generate a read-only visual board from the public product catalog with:

```sh
npm run catalog:review-images
```

Open `tools/catalog-manager/output/product-image-review.html` in a browser to
review every product image and open its original URL. Products with more than
six images are highlighted. The generated board stays in the ignored `output/`
directory and contains only public product identity fields and image URLs.

## Prepare an approved launch selection

After curating and approving the local selection, save it as:

```text
tools/catalog-manager/output/chiriko-launch-selection.json
```

From the repository root, generate a public-safe, review-only proposal with:

```sh
node tools/catalog-manager/prepare-launch-products.mjs
```

The helper validates exactly 22 products with non-empty image arrays, rejects
cross-product/model/color image contamination (including leather images on
explicitly Vegan variants), enforces the eight-image launch limit, and writes
`tools/catalog-manager/output/launch-products.proposal.json`. It rejects image
URLs containing common credential markers and copies properties through a
strict public-field allowlist. Supplier prices, stock quantities,
`availability_count`, and all other unrecognized source properties are neither
accessed nor written to the proposal.

Both the approved selection and generated proposal remain in the Git-ignored
`output/` directory. Review the proposal before applying it.

## Apply the approved launch proposal

Once `launch-products.proposal.json` has been reviewed and approved, update the
storefront catalog from the repository root:

```sh
node tools/catalog-manager/apply-launch-products.mjs
```

The apply helper accepts exactly 22 products, validates the public storefront
fields and remote image URLs, and replaces the exported catalog in
`src/data/products.ts`. It deliberately enforces launch pricing/status display
defaults and generates Spanish customer-facing copy; it does not read the feed
or either intermediate draft/selection file. The local files under `output/`
remain ignored and must not be committed.

## Groundies curated sync

This is a **manual snapshot**, not a live stock feed. Only the 14 exact approved
title/color pairs across 7 commercial models in `groundies-selection.mjs` can
reach the public catalog; new supplier models and colors are ignored until deliberately curated. Women,
Men and unisex versions have separate groups and visible fit labels. The
representative color swatches are editorial metadata, not supplier fields.

The curated family order is Nova GS1, Nova GO1, Starlite 2.0, Panama,
Panama Soft, Active Knit, then G-Flex. Panama and Panama Soft remain distinct
adjacent models. The collection keeps its existing
featured-first sorting, promoting Starlite while preserving the other families'
selection order. Only White/Silver/Black Starlite is featured among Groundies.
Women's/men's G-Flex URLs include their fit to avoid collisions between
same-color versions. The only approved G-Flex colorways are Women Black,
Women Off-White and Men Off-White. Men Mint, all G-Flex Precision, all
Chamonix TR Precision, and both former G-Pure colorways are excluded.

At the reviewed snapshot, regular G-Flex Women Black/Off-White have sizes 36–42,
and G-Flex Men Off-White has 40–45. Panama Soft Caramel remains approved,
with only sizes 37, 39, 40, 41, 42. These are consultable sizes, not guaranteed
stock.
Refreshes always use the actual XML and never fill in missing sizes; all models
remain subject to final availability confirmation by WhatsApp.

1. Place the newest **private XML** locally at
   `tools/catalog-manager/input/groundies.xml`. The entire `input/` directory is
   gitignored. Never commit the XML or put it under `src/` or `public/`.
   Vite also denies requests for the private input/output directories.
2. From the repository root, run:

   ```sh
   npm.cmd run catalog:sync-groundies
   # Optional path, still inside the private input directory:
   npm.cmd run catalog:sync-groundies -- ./tools/catalog-manager/input/groundies.xml
   ```

   On Linux/macOS use `npm` instead of `npm.cmd`. No network request is made;
   the tool reads a local UTF-8 XML file only. Do not attach this command to
   Vite builds or public deployments.
3. Review `src/data/groundiesProducts.ts`, including every size and image.
   Availability is converted **only** into `consultableSizes`: only exact
   `in_stock` size records qualify. Sizes are deduplicated and sorted numerically.
   Supplier stock does **not** mean Chiriko physical stock. Every Groundies
   product remains `status: "preorder"`, `price: 0`, and `sizes: []`.
4. Run `npm.cmd run catalog:review-images` and review the ignored image board.
   Only primary `image_link` values from exact matching records are used;
   repeated URLs are deduplicated. One-image colorways are reported as needing
   additional editorial photography. Galleries are never fabricated.
5. Validate with `npm.cmd run build`, `npm.cmd run test`, `npm.cmd run lint`, and:

   ```sh
   node --test tools/catalog-manager/groundies-sync.checks.mjs
   ```

The XML is private. No GTIN/SKU, supplier IDs, group IDs, costs, stock quantities,
feed URLs, credentials, or other private supplier metadata is published.
Only allowlisted editorial fields, public image URLs and consultable sizes
are serialized. The frontend imports the generated public array; it never
requests or parses XML. Images must be public HTTPS URLs with no credentials
or fragments. Only Shopify CDN's numeric `v` image cache version is accepted
in query strings; signed/private links require editorial replacement.

Missing files, malformed/incomplete XML, DOCTYPE/ENTITY declarations, missing
approved colorways, unsupported sizes/availability, and missing safe photography
abort without changing the existing generated catalog. Output is replaced
atomically only after the entire selection validates. A colorway with all sizes
out of stock is retained with **empty** `consultableSizes`, never stale sizes,
and a clear warning requiring manual publication review. A repeated sync with
the same XML produces identical public data. Recheck Starlite's two approved
unisex colors against the current feed; never fill gaps in Panama Soft sizes.

`products.ts` keeps the existing 22 products as `coreProducts` and appends the
generated Groundies array. The legacy 22-product apply helper refreshes only
that core and preserves the Groundies import/composition. The image review and
audit helpers read both public arrays without executing frontend code.

Changing supplier stock does not update the website automatically. A person
must rerun sync, review, and publish the resulting public data. Chiriko must
confirm final supplier availability by WhatsApp before taking a reservation.
An initially empty Groundies array means no valid source snapshot has been
generated yet; do not publish the launch until all selected products are reviewed.

## Curated Be Lenka and Barebarics primary photos

The public-only `approved-primary-photos.mjs` maps the 22 original launch slugs to
reviewed public image CDN URLs from the October 2026 supplier XML snapshots.
The storefront uses the selected link as the **first** photo, preserving existing
secondary gallery images. `apply-launch-products.mjs` honors the same choices so
reapplying the legacy 22-product catalog does not revert the primary photographs.

This mapping is editorial and manual: **never** commit either private Be Lenka or
Barebarics source XML, and never copy costs, quantities or supplier identifiers.
Before publishing, review the photograph for every colorway on mobile and desktop;
a CDN image link alone does not establish that the framing is visually ideal.
