import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import ResponsiveImage from "@/components/ResponsiveImage";

type ProductImageGalleryProps = {
  images: string[];
  productName: string;
};

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const goPrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const openLightbox = () => setIsLightboxOpen(true);
  const closeLightbox = () => setIsLightboxOpen(false);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isLightboxOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [images]);

  if (images.length === 0) {
    return null;
  }

  return (
    <>
      <div className="w-full max-w-full overflow-hidden grid gap-3 lg:grid-cols-[78px_minmax(0,1fr)] lg:items-start">
        <div className="hidden gap-3 lg:flex lg:flex-col">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`overflow-hidden border transition-colors ${
                selectedIndex === index ? "border-foreground" : "border-border"
              }`}
            >
              <ResponsiveImage
                src={image}
                alt={`${productName} miniatura ${index + 1}`}
                widths={[120, 180]}
                sizes="78px"
                width={180}
                height={180}
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
            </button>
          ))}
        </div>

        <div className="space-y-3 w-full max-w-full">
          <div className="relative flex w-full max-w-full aspect-square lg:aspect-[4/3] items-center justify-center overflow-hidden bg-white">
            <ResponsiveImage
              src={images[selectedIndex]}
              alt={`${productName} imagen ${selectedIndex + 1}`}
              widths={[640, 900, 1200, 1600]}
              sizes="(min-width: 1024px) 50vw, 100vw"
              width={1200}
              height={1200}
              loading="eager"
              fetchPriority="high"
              className="h-full w-full object-contain p-2 sm:p-4 md:p-6 lg:scale-105 transition-transform duration-300"
            />

            <button
              type="button"
              onClick={goPrev}
              aria-label="Imagen anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-11 sm:w-11 border border-border/70 bg-background/85 flex items-center justify-center text-foreground"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="Imagen siguiente"
              className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-11 sm:w-11 border border-border/70 bg-background/85 flex items-center justify-center text-foreground"
            >
              <ChevronRight size={18} />
            </button>

            <button
              type="button"
              onClick={openLightbox}
              aria-label="Ampliar imagen"
              className="absolute right-3 top-3 h-10 w-10 sm:h-11 sm:w-11 border border-border/70 bg-background/85 flex items-center justify-center text-foreground"
            >
              <Expand size={18} />
            </button>
          </div>

          <div className="flex lg:hidden gap-2 overflow-x-auto max-w-full pb-1">
            {images.map((image, index) => (
              <button
                key={`${image}-mobile-${index}`}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`h-16 w-16 min-w-16 overflow-hidden bg-white border ${
                  selectedIndex === index ? "border-foreground" : "border-border"
                }`}
              >
                <ResponsiveImage
                  src={image}
                  alt={`${productName} miniatura móvil ${index + 1}`}
                  widths={[120, 180]}
                  sizes="64px"
                  width={120}
                  height={120}
                  loading="lazy"
                  className="aspect-square h-16 w-16 object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#1A1A18]/85 p-3 sm:p-4 flex items-center justify-center overflow-hidden"
          onClick={closeLightbox}
        >
          <div className="relative w-full max-w-5xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Cerrar imagen ampliada"
              className="absolute right-0 -top-14 h-11 w-11 border border-white/40 text-white flex items-center justify-center"
            >
              <X size={18} />
            </button>

            <button
              type="button"
              onClick={goPrev}
              aria-label="Imagen anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 h-11 w-11 border border-white/40 bg-black/25 text-white flex items-center justify-center"
            >
              <ChevronLeft size={20} />
            </button>

            <ResponsiveImage
              src={images[selectedIndex]}
              alt={`${productName} imagen ampliada ${selectedIndex + 1}`}
              widths={[900, 1200, 1600]}
              sizes="100vw"
              width={1600}
              height={1600}
              loading="eager"
              className="max-h-[82vh] w-full object-contain"
            />

            <button
              type="button"
              onClick={goNext}
              aria-label="Imagen siguiente"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-11 w-11 border border-white/40 bg-black/25 text-white flex items-center justify-center"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductImageGallery;
