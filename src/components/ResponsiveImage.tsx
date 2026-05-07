import { cfImage, cfSrcSet } from "@/lib/cloudflareImages";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  widths: number[];
  sizes: string;
  width: number;
  height: number;
  className?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  quality?: number;
}

const ResponsiveImage = ({
  src,
  alt,
  widths,
  sizes,
  width,
  height,
  className,
  loading = "lazy",
  fetchPriority = "auto",
  quality,
}: ResponsiveImageProps) => {
  const sortedWidths = [...widths].sort((a, b) => a - b);
  const fallbackWidth = sortedWidths[sortedWidths.length - 1] ?? width;

  return (
    <img
      src={cfImage(src, fallbackWidth, quality)}
      srcSet={cfSrcSet(src, sortedWidths, quality)}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
    />
  );
};

export default ResponsiveImage;
