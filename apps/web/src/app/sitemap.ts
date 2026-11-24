import type { MetadataRoute } from "next";
import { env } from "@/env";
import { getProducts } from "@/features/products/queries";
import { i18n } from "@/i18n/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  const routes = ["", "/catalog", "/products"];

  const staticEntries: MetadataRoute.Sitemap = routes.flatMap((route) => {
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

  try {
    const productsRes = await getProducts({ limit: "50" });
    const products = productsRes?.data?.items ?? [];

    const productEntries: MetadataRoute.Sitemap = products.flatMap((product) => {
      const productPath = `/products/${product.slug}`;
      return i18n.locales.map((lang) => ({
        url: `${baseUrl}/${lang}${productPath}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
        alternates: {
          languages: Object.fromEntries(
            i18n.locales.map((locale) => [
              locale,
              `${baseUrl}/${locale}${productPath}`,
            ]),
          ),
        },
      }));
    });

    return [...staticEntries, ...productEntries];
  } catch (error) {
    console.error("Falha ao gerar sitemap dos produtos:", error);
    return staticEntries;
  }
}
