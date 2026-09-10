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
