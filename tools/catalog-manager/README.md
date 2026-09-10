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

The importer recognizes `<product>`, `<item>`, `<article>`, `<offer>`, and
`<productitem>`, and `<shopitem>` records. Size/SKU rows are grouped by normalized brand,
commercial product name, and color. Their sizes are combined into one draft's
`consultableSizes`; `sizes` stays empty. Common model, color, gender, category,
image, and named-parameter shapes are recognized, and Be Lenka/Barebarics brand
spellings are normalized.

Only a field explicitly identified as public, consumer, customer, retail, or
RRP pricing is imported; otherwise `price` is `0`. Generic price fields and
wholesale, purchase, supplier, B2B, cost, net, or margin pricing are not used.
Only an explicit `public_status`/`publicStatus` value of `in_stock` produces an
in-stock draft. All other records default to `preorder`. Imported size labels
go into `consultableSizes`; `sizes` stays empty because feed availability is
not a customer stock guarantee.

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

## Safe schema inspection

For an unfamiliar feed, inspect its shape without producing drafts:

```sh
node tools/catalog-manager/import-feed.mjs ./tools/catalog-manager/input/feed.xml --inspect
```

Inspection prints only tag and attribute names, nesting, and occurrence, row,
and field counts. It never prints XML values, URLs, prices, costs, stock
quantities, or private terms.
