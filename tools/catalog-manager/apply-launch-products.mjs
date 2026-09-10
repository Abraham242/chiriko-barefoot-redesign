#!/usr/bin/env node

/**
 * Apply the locally reviewed, public-safe launch proposal to the storefront.
 *
 * This tool deliberately reads only the proposal produced by
 * prepare-launch-products.mjs. Private feed and intermediate selection files
 * are never inputs to this script.
 */

import { readFile, rename, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const toolDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(toolDirectory, "../..");
const proposalPath = resolve(toolDirectory, "output/launch-products.proposal.json");
const catalogPath = resolve(repositoryRoot, "src/data/products.ts");
const temporaryCatalogPath = `${catalogPath}.tmp`;

const expectedProductCount = 22;
const featuredSlugs = new Set([
  "barebarics-zing-all-white",
  "barebarics-zing-black-white",
  "be-lenka-rebound-all-white",
  "be-lenka-rebound-all-black",
  "barebarics-enigma-ivory",
  "be-lenka-grace-2-0-beige",
]);
const requiredStringFields = [
  "id",
  "slug",
  "brand",
  "model",
  "groupSlug",
  "groupName",
  "name",
  "gender",
  "category",
  "colorName",
  "colorFamily",
  "colorHex",
];
const blockedTextPatterns = [
  /borrador/i,
  /pendiente de revisi[oó]n/i,
  /Product to review/i,
  /Color to review/i,
  /availability_count/i,
  /supplier/i,
  /secretKey/i,
  /token/i,
];
const credentialMarkerPattern = /(?:secret|token|api[_-]?key|auth|signature|password)/i;
const maximumLaunchImages = 8;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function validateProposalProduct(product, index) {
  const label = `Product ${index + 1}`;
  assert(product && typeof product === "object" && !Array.isArray(product), `${label} must be an object`);

  for (const field of requiredStringFields) {
    assert(typeof product[field] === "string" && product[field].trim(), `${label}.${field} must be a non-empty string`);
  }

  if (Object.hasOwn(product, "parentBrand")) {
    assert(typeof product.parentBrand === "string" && product.parentBrand.trim(), `${label}.parentBrand must be a non-empty string`);
  }

  assert(["men", "women", "unisex", "kids"].includes(product.gender), `${label}.gender is not supported`);
  assert(Array.isArray(product.consultableSizes), `${label}.consultableSizes must be an array`);
  assert(
    product.consultableSizes.every((size) => typeof size === "string" && size.trim()),
    `${label}.consultableSizes must contain only non-empty strings`,
  );
  assert(Array.isArray(product.images) && product.images.length > 0, `${label}.images must be a non-empty array`);
  assert(product.images.length <= maximumLaunchImages, `${label}.images exceeds the launch maximum of ${maximumLaunchImages}`);
  assert(
    product.images.every((image) => typeof image === "string" && /^https:\/\//i.test(image)),
    `${label}.images must contain only remote HTTPS URLs`,
  );
  assert(
    product.images.every((image) => !credentialMarkerPattern.test(image)),
    `${label}.images contains a URL with a credential marker`,
  );

  const publicText = requiredStringFields.map((field) => product[field]).join(" ");
  for (const pattern of blockedTextPatterns) {
    assert(!pattern.test(publicText), `${label} contains blocked review or private text`);
  }
}

function isSandals(category) {
  return /sandalia/i.test(category);
}

function customerCopy(product) {
  const sandals = isSandals(product.category);
  const color = product.colorName.trim();

  if (sandals) {
    return {
      subtitle: `${color} · sandalia barefoot en preventa asistida`,
      tags: ["Sandalias barefoot", "Clima cálido", "Preventa asistida"],
      features: [
        "Diseño ligero",
        "Ideal para clima cálido",
        "Preventa asistida",
        "Espacio amplio para los dedos",
      ],
      seoDescription: `${product.name} en ${color}. Sandalia barefoot en preventa asistida con confirmación de talla por WhatsApp.`,
    };
  }

  return {
    subtitle: `${color} · preventa asistida`,
    tags: ["Diseño urbano", "Uso diario", "Preventa asistida"],
    features: [
      "Horma anatómica",
      "Drop cero",
      "Espacio amplio para los dedos",
      "Diseño urbano",
      "Ligero para uso diario",
      "Preventa asistida",
    ],
    seoDescription: `${product.name} en ${color}. Calzado barefoot en preventa asistida con confirmación de talla por WhatsApp.`,
  };
}

function toStorefrontProduct(product) {
  const copy = customerCopy(product);
  const featured = featuredSlugs.has(product.slug);
  const storefrontProduct = {
    id: product.id,
    slug: product.slug,
    brand: product.brand,
    model: product.model,
    groupSlug: product.groupSlug,
    groupName: product.groupName,
    name: product.name,
    subtitle: copy.subtitle,
    gender: product.gender,
    category: product.category,
    colorName: product.colorName,
    colorFamily: product.colorFamily,
    colorHex: product.colorHex,
    price: 0,
    currency: "$",
    status: "preorder",
    consultableSizes: [...product.consultableSizes],
    sizes: [],
    images: [...product.images],
    features: copy.features,
    tags: copy.tags,
    isFeatured: featured,
    isNew: true,
    seoTitle: `${product.name} ${product.colorName} | Chiriko Studio Venezuela`,
    seoDescription: copy.seoDescription,
    tag: featured ? "Lanzamiento" : "Preventa",
  };

  if (product.parentBrand) storefrontProduct.parentBrand = product.parentBrand;
  return storefrontProduct;
}

function serializeCatalog(products) {
  const serializedProducts = JSON.stringify(products, null, 2);

  return `import type { Product } from "./productTypes";\n\nexport type { Product } from "./productTypes";\n\nexport const products: Product[] = ${serializedProducts};\n`;
}

function validateCatalog(catalog, products) {
  for (const pattern of blockedTextPatterns) {
    assert(!pattern.test(catalog), `Generated products.ts contains blocked text matching ${pattern}`);
  }
  assert(products.length === expectedProductCount, `Expected ${expectedProductCount} launch products, received ${products.length}`);
  assert(new Set(products.map(({ slug }) => slug)).size === products.length, "Product slugs must be unique");
  assert(new Set(products.map(({ id }) => id)).size === products.length, "Product IDs must be unique");

  const actualFeatured = products.filter(({ isFeatured }) => isFeatured).map(({ slug }) => slug);
  assert(actualFeatured.length === featuredSlugs.size, "The proposal is missing one or more required featured products");
  for (const slug of featuredSlugs) {
    assert(actualFeatured.includes(slug), `Required featured product is missing: ${slug}`);
  }
}

async function main() {
  const parsed = JSON.parse(await readFile(proposalPath, "utf8"));
  assert(Array.isArray(parsed), "Launch proposal must be a JSON array");
  assert(parsed.length === expectedProductCount, `Launch proposal must contain exactly ${expectedProductCount} products`);
  parsed.forEach(validateProposalProduct);

  const products = parsed.map(toStorefrontProduct);
  const catalog = serializeCatalog(products);
  validateCatalog(catalog, products);

  await writeFile(temporaryCatalogPath, catalog, "utf8");
  await rename(temporaryCatalogPath, catalogPath);
  console.log(`Applied ${products.length} approved launch products to ${catalogPath}`);
}

main().catch((error) => {
  console.error(`Launch catalog update failed: ${error.message}`);
  process.exitCode = 1;
});
