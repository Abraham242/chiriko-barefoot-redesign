const DEFAULT_QUALITY = 76;

const isDataUrl = (src: string) => src.startsWith("data:");
const isSvg = (src: string) => /\.svg($|\?)/i.test(src);
const isAbsoluteUrl = (src: string) => /^https?:\/\//i.test(src);
const isCloudflareTransformed = (src: string) => src.includes("/cdn-cgi/image/");

const areCloudflareTransformsEnabled = () =>
  import.meta.env.VITE_ENABLE_CF_IMAGE_TRANSFORMS === "true";

export const getTransformablePath = (src: string): string | null => {
  if (!src || isDataUrl(src) || isSvg(src) || isCloudflareTransformed(src)) {
    return null;
  }

  if (src.startsWith("/")) {
    return src;
  }

  if (isAbsoluteUrl(src)) {
    try {
      const url = new URL(src);

      if (typeof window !== "undefined" && url.origin === window.location.origin) {
        return `${url.pathname}${url.search}`;
      }
    } catch {
      return null;
    }
  }

  return null;
};

export const cfImage = (
  src: string,
  width: number,
  quality: number = DEFAULT_QUALITY
) => {
  if (!areCloudflareTransformsEnabled()) {
    return src;
  }

  const transformablePath = getTransformablePath(src);

  if (!transformablePath) {
    return src;
  }

  return `/cdn-cgi/image/width=${width},quality=${quality},format=auto,fit=scale-down${transformablePath}`;
};

export const cfSrcSet = (
  src: string,
  widths: number[],
  quality: number = DEFAULT_QUALITY
) => {
  if (!areCloudflareTransformsEnabled()) {
    return undefined;
  }

  const transformablePath = getTransformablePath(src);

  if (!widths.length || !transformablePath) {
    return undefined;
  }

  return widths
    .map(
      (w) =>
        `/cdn-cgi/image/width=${w},quality=${quality},format=auto,fit=scale-down${transformablePath} ${w}w`
    )
    .join(", ");
};
