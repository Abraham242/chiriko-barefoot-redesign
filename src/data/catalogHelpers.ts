import { products } from "./products";
import type { Product, ProductGender, ProductStatus } from "./productTypes";

const normalize = (value: string) => value.trim().toLocaleLowerCase();

export const getProductById = (id: string): Product | undefined =>
  products.find((product) => product.id === id || product.slug === id);

export const getFeaturedProducts = (): Product[] => products.filter((product) => product.isFeatured);

export const getProductsByBrand = (brand: string): Product[] =>
  products.filter((product) => normalize(product.brand) === normalize(brand));

export const getProductsByParentBrand = (parentBrand: string): Product[] =>
  products.filter((product) =>
    product.parentBrand
      ? normalize(product.parentBrand) === normalize(parentBrand)
      : normalize(product.brand) === normalize(parentBrand),
  );

export const getProductsByCategory = (category: string): Product[] =>
  products.filter((product) => normalize(product.category) === normalize(category));

export const getProductsByGender = (gender: ProductGender): Product[] =>
  products.filter((product) => product.gender === gender);

export const getProductsByStatus = (status: ProductStatus): Product[] =>
  products.filter((product) => product.status === status);

export const getAvailableSizes = (catalog: Product[] = products): string[] =>
  [...new Set(catalog.flatMap((product) => product.sizes))].sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true }),
  );

export const getConsultableSizes = (catalog: Product[] = products): string[] =>
  [...new Set(catalog.flatMap((product) => product.consultableSizes))].sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true }),
  );

/** Sizes suitable for collection filters without presenting preorder ranges as stock. */
export const getFilterableSizes = (catalog: Product[] = products): string[] =>
  [...new Set(catalog.flatMap((product) => {
    if (product.status === "preorder") return product.consultableSizes;
    if (product.status === "in_stock") return product.sizes;
    return [];
  }))].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

export const getCollectionBrands = (): string[] =>
  [...new Set(products.map((product) => product.brand))].sort((a, b) => a.localeCompare(b));

export const getCollectionCategories = (): string[] =>
  [...new Set(products.map((product) => product.category))].sort((a, b) => a.localeCompare(b));
