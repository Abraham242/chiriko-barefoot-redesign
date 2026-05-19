import { useEffect } from "react";

type SEOProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  ogType?: "website" | "product";
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
};

const SITE_NAME = "Chiriko Studio";
const SITE_URL = "https://chirikostudio.com";
const DEFAULT_IMAGE = `${SITE_URL}/placeholder.svg`;
const SEO_JSON_LD_ID = "seo-jsonld";

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element!.setAttribute(key, value);
  });
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector(
    `link[rel="${rel}"]`
  ) as HTMLLinkElement | null;

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

function buildUrl(path: string) {
  if (!path || path === "/") return `${SITE_URL}/`;

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function buildTitle(title: string) {
  if (title.includes(SITE_NAME)) return title;
  return `${title} | ${SITE_NAME}`;
}

function upsertJsonLd(data?: SEOProps["jsonLd"]) {
  const existingScript = document.getElementById(SEO_JSON_LD_ID);

  if (!data) {
    existingScript?.remove();
    return;
  }

  const payload = Array.isArray(data) ? data : [data];
  let script = existingScript as HTMLScriptElement | null;

  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = SEO_JSON_LD_ID;
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(payload.length === 1 ? payload[0] : payload);
}

export default function SEO({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  noIndex = false,
  ogType = "website",
  jsonLd,
}: SEOProps) {
  useEffect(() => {
    const fullTitle = buildTitle(title);
    const url = buildUrl(path);

    document.title = fullTitle;

    upsertMeta('meta[name="description"]', {
      name: "description",
      content: description,
    });

    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: noIndex ? "noindex, nofollow" : "index, follow",
    });

    upsertLink("canonical", url);

    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: ogType,
    });

    upsertMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: SITE_NAME,
    });

    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: fullTitle,
    });

    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });

    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: url,
    });

    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: image,
    });

    upsertMeta('meta[property="og:image:alt"]', {
      property: "og:image:alt",
      content: "Chiriko Studio, calzado barefoot y respetuoso en Venezuela",
    });

    upsertMeta('meta[property="og:locale"]', {
      property: "og:locale",
      content: "es_VE",
    });

    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });

    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: fullTitle,
    });

    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    });

    upsertMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: image,
    });

    upsertMeta('meta[name="twitter:image:alt"]', {
      name: "twitter:image:alt",
      content: "Chiriko Studio, calzado barefoot y respetuoso en Venezuela",
    });

    upsertJsonLd(jsonLd);
  }, [title, description, path, image, noIndex, ogType, jsonLd]);

  return null;
}
