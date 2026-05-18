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
      <div className="grid gap-4 lg:grid-cols-[88px_1fr] lg:items-start">
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
                sizes="88px"
                width={180}
                height={180}
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <div className="relative flex items-center justify-center overflow-hidden bg-background aspect-square md:aspect-[4/3] lg:aspect-[4/3] min-h-[420px] md:min-h-[620px] lg:min-h-[760px]">
            <ResponsiveImage
              src={images[selectedIndex]}
              alt={`${productName} imagen ${selectedIndex + 1}`}
              widths={[640, 900, 1200, 1600]}
              sizes="(min-width: 1024px) 50vw, 100vw"
              width={1200}
              height={1200}
              loading="eager"
              fetchPriority="high"
              className="h-full w-full object-contain scale-105 md:scale-115 lg:scale-125 transition-transform duration-300"
            />

            <button
              type="button"
              onClick={goPrev}
              aria-label="Imagen anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 h-11 w-11 border border-border/70 bg-background/85 flex items-center justify-center text-foreground"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="Imagen siguiente"
              className="absolute right-3 top-1/2 -translate-y-1/2 h-11 w-11 border border-border/70 bg-background/85 flex items-center justify-center text-foreground"
            >
              <ChevronRight size={18} />
            </button>

            <button
              type="button"
              onClick={openLightbox}
              aria-label="Ampliar imagen"
              className="absolute right-3 top-3 h-11 w-11 border border-border/70 bg-background/85 flex items-center justify-center text-foreground"
            >
              <Expand size={18} />
            </button>
          </div>

          <div className="flex lg:hidden gap-2 overflow-x-auto pb-1">
            {images.map((image, index) => (
              <button
                key={`${image}-mobile-${index}`}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`overflow-hidden border min-w-20 ${
                  selectedIndex === index ? "border-foreground" : "border-border"
                }`}
              >
                <ResponsiveImage
                  src={image}
                  alt={`${productName} miniatura móvil ${index + 1}`}
                  widths={[120, 180]}
                  sizes="80px"
                  width={120}
                  height={120}
                  loading="lazy"
                  className="aspect-square h-20 w-20 object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#1A1A18]/85 p-4 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
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
              className="w-full max-h-[85vh] object-contain"
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
