export type ProductGender = "men" | "women" | "unisex" | "kids";

export type ProductStatus = "preorder" | "in_stock" | "coming_soon";

/** Public, storefront-safe catalog data. Keep sourcing and margin data elsewhere. */
export interface Product {
  id: string;
  slug: string;
  brand: string;
  parentBrand?: string;
  model: string;
  /** Stable key used to combine color variants into one storefront card. */
  groupSlug?: string;
  /** Customer-facing name shared by every variant in a storefront group. */
  groupName?: string;
  name: string;
  subtitle: string;
  gender: ProductGender;
  category: string;
  colorName: string;
  colorFamily: string;
  colorHex: string;
  price: number;
  currency: string;
  status: ProductStatus;
  /** Sizes that can be requested for confirmation; this is not a stock promise. */
  consultableSizes: string[];
  sizes: string[];
  images: string[];
  features: string[];
  tags: string[];
  isFeatured: boolean;
  isNew: boolean;
  seoTitle: string;
  seoDescription: string;
  /** Temporary display label retained for existing catalog cards. */
  tag?: string;
}
