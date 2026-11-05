import type { MetadataRoute } from "next";
import { env } from "@/env";
import { i18n } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  const routes = [""];

  return routes.flatMap((route) => {
    return i18n.locales.map((lang) => ({
      url: `${baseUrl}/${lang}${route}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: route === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          i18n.locales.map((locale) => [
            locale,
            `${baseUrl}/${locale}${route}`,
          ]),
        ),
      },
    }));
  });
}
