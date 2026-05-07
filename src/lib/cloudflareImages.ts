const DEFAULT_QUALITY = 76;

const isDataUrl = (src: string) => src.startsWith("data:");
const isSvg = (src: string) => /\.svg($|\?)/i.test(src);
const isAbsoluteUrl = (src: string) => /^https?:\/\//i.test(src);
const isCloudflareTransformed = (src: string) => src.includes("/cdn-cgi/image/");

const canTransform = (src: string) => {
  if (!src || isDataUrl(src) || isSvg(src) || isCloudflareTransformed(src)) {
    return false;
  }

  if (isAbsoluteUrl(src)) {
    try {
      const url = new URL(src);
      if (typeof window !== "undefined" && url.origin === window.location.origin) {
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  return src.startsWith("/");
};

const shouldBypassInDev = () =>
  import.meta.env.DEV && !import.meta.env.VITE_ENABLE_CF_IMAGE_TRANSFORMS;

export const cfImage = (
  src: string,
  width: number,
  quality: number = DEFAULT_QUALITY
) => {
  if (!canTransform(src) || shouldBypassInDev()) {
    return src;
  }

  return `/cdn-cgi/image/width=${width},quality=${quality},format=auto,fit=scale-down${src}`;
};

export const cfSrcSet = (
  src: string,
  widths: number[],
  quality: number = DEFAULT_QUALITY
) => {
  if (!widths.length) {
    return undefined;
  }

  return widths.map((w) => `${cfImage(src, w, quality)} ${w}w`).join(", ");
};
