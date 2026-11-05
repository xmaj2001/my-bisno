import type { Metadata } from "next";
import { env } from "@/env";
import { i18n, type Locale } from "@/i18n/config";

interface ConstructMetadataProps {
  title?: string;
  description?: string;
  lang: Locale;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

export function constructMetadata({
  title,
  description,
  lang,
  path = "",
  image,
  noIndex = false,
}: ConstructMetadataProps): Metadata {
  const baseUrl = env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${baseUrl}/${lang}${normalizedPath === "/" ? "" : normalizedPath}`;

  const languagesRecord: Record<string, string> = {};
  for (const locale of i18n.locales) {
    languagesRecord[locale] =
      `${baseUrl}/${locale}${normalizedPath === "/" ? "" : normalizedPath}`;
  }

  const defaultTitle = "Bisno";
  const finalTitle = title ? `${title} | Bisno` : defaultTitle;

  return {
    title: finalTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: languagesRecord,
    },
    openGraph: {
      title: finalTitle,
      description,
      url: canonicalUrl,
      siteName: "Bisno",
      locale: lang === "pt" ? "pt_PT" : "en_US",
      type: "website",
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description,
      ...(image ? { images: [image] } : {}),
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
  };
}
