import ResponsiveImage from "@/components/ResponsiveImage";
import type { Product } from "@/data/productTypes";

interface ProductVariantThumbnailsProps {
  variants: Product[];
  selectedVariant: Product;
  onSelect: (variant: Product) => void;
  displayName: string;
  className?: string;
}

const ProductVariantThumbnails = ({
  variants,
  selectedVariant,
  onSelect,
  displayName,
  className = "",
}: ProductVariantThumbnailsProps) => (
  <div
    className={`-mx-1 flex gap-2.5 overflow-x-auto px-1 pb-2 pt-1 sm:gap-3 ${className}`}
    role="group"
    aria-label={`Seleccionar color de ${displayName}`}
  >
    {variants.map((variant) => {
      const isSelected = variant.id === selectedVariant.id;
      const accessibleName = `${displayName} en ${variant.colorName}`;

      return (
        <button
          key={variant.id}
          type="button"
          onClick={() => onSelect(variant)}
          aria-pressed={isSelected}
          aria-label={accessibleName}
          title={variant.colorName}
          className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-sm border bg-[#f5f3ee] transition duration-200 hover:border-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 sm:h-14 sm:w-14 ${
            isSelected
              ? "border-foreground ring-1 ring-foreground"
              : "border-foreground/15"
          }`}
        >
          <ResponsiveImage
            src={variant.images[0]}
            alt={accessibleName}
            widths={[96, 112]}
            sizes="(min-width: 640px) 56px, 48px"
            width={112}
            height={112}
            className="h-full w-full object-contain p-1"
          />
        </button>
      );
    })}
  </div>
);

export default ProductVariantThumbnails;
