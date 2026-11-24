import type { Metadata } from "next";
import { env } from "@/env";
import { i18n, type Locale } from "@/i18n/config";

export type ImageInput =
  | string
  | {
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    };

export interface ConstructMetadataProps {
  title?: string;
  description?: string;
  lang: Locale;
  path?: string;
  image?: ImageInput | ImageInput[];
  noIndex?: boolean;
  type?: "website" | "article";
  keywords?: string[];
}

export function getBaseUrl(): string {
  return env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
}

export function resolveAbsoluteUrl(pathOrUrl: string, baseUrl = getBaseUrl()): string {
  if (!pathOrUrl) return `${baseUrl}/logo.png`;
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }
  const cleanPath = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${baseUrl}${cleanPath}`;
}

export function constructMetadata({
  title,
  description,
  lang,
  path = "",
  image,
  noIndex = false,
  type = "website",
  keywords,
}: ConstructMetadataProps): Metadata {
  const baseUrl = getBaseUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${baseUrl}/${lang}${normalizedPath === "/" ? "" : normalizedPath}`;

  const languagesRecord: Record<string, string> = {};
  for (const locale of i18n.locales) {
    languagesRecord[locale] =
      `${baseUrl}/${locale}${normalizedPath === "/" ? "" : normalizedPath}`;
  }

  const defaultTitle = "Bisno — Conectando Afiliados e Lojas";
  const finalTitle = title ? `${title} | Bisno` : defaultTitle;
  const finalDescription =
    description ||
    "A plataforma angolana de afiliados, conectando afiliados, clientes e lojas com envio rápido e comissões garantidas.";

  // Normalização de imagens para URLs absolutas
  const rawImages =
    image && (!Array.isArray(image) || image.length > 0)
      ? Array.isArray(image)
        ? image
        : [image]
      : ["/logo.png"];

  const ogImages = rawImages.map((img) => {
    const isString = typeof img === "string";
    const url = isString
      ? resolveAbsoluteUrl(img, baseUrl)
      : resolveAbsoluteUrl(img.url, baseUrl);
    const isHttps = url.startsWith("https://");

    return {
      url,
      secureUrl: isHttps ? url : undefined,
      width: isString ? 1200 : (img.width ?? 1200),
      height: isString ? 630 : (img.height ?? 630),
      alt: (isString ? title : img.alt) || title || "Bisno",
      type: "image/jpeg",
    };
  });

  const twitterImages = ogImages.map((img) => img.url);

  return {
    metadataBase: new URL(baseUrl),
    title: finalTitle,
    description: finalDescription,
    keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: languagesRecord,
    },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: canonicalUrl,
      siteName: "Bisno",
      locale: lang === "pt" ? "pt_AO" : "en_US",
      type,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      images: twitterImages,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

// ─── Helpers para Dados Estruturados (JSON-LD) ────────────────────────────────

export interface ProductJsonLdProps {
  name: string;
  description?: string;
  images?: string[];
  price?: string | number;
  currency?: string;
  category?: string;
  sku?: string;
  url: string;
  inStock?: boolean;
  brand?: string;
}

export function createProductJsonLd({
  name,
  description,
  images,
  price,
  currency = "AOA",
  category,
  sku,
  url,
  inStock = true,
  brand = "Bisno",
}: ProductJsonLdProps) {
  const baseUrl = getBaseUrl();
  const rawImages = images && images.length > 0 ? images : ["/logo.png"];
  const formattedImages = rawImages.map((img) => resolveAbsoluteUrl(img, baseUrl));

  // Extrair valor numérico do preço formatado (ex.: "150.000 Kz" -> 150000)
  const cleaned = String(price || "").replace(/[^\d,\.]/g, "");
  let numericPrice = 0;
  if (typeof price === "number") {
    numericPrice = price;
  } else if (cleaned.includes(",") && cleaned.includes(".")) {
    numericPrice =
      Number.parseFloat(cleaned.replace(/\./g, "").replace(",", ".")) || 0;
  } else if (cleaned.includes(",")) {
    numericPrice = Number.parseFloat(cleaned.replace(",", ".")) || 0;
  } else if (cleaned.includes(".")) {
    const parts = cleaned.split(".");
    if (parts.length > 1 && parts[parts.length - 1].length === 3) {
      numericPrice = Number.parseFloat(cleaned.replace(/\./g, "")) || 0;
    } else {
      numericPrice = Number.parseFloat(cleaned) || 0;
    }
  } else {
    numericPrice = Number.parseFloat(cleaned) || 0;
  }

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description: description || name,
    image: formattedImages,
    category,
    sku: sku || name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    brand: {
      "@type": "Brand",
      name: brand,
    },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: currency,
      price: numericPrice,
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };
}

export function createBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function createWebsiteJsonLd(lang: Locale) {
  const baseUrl = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Bisno",
    url: `${baseUrl}/${lang}`,
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/${lang}/products?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}
