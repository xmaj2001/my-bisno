export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { ProductNavbar } from "@/components/product-navbar";
import { ProductDetails } from "@/features/products/components/details/products-details";
import { getProductBySlug } from "@/features/products/queries";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import {
  constructMetadata,
  createBreadcrumbJsonLd,
  createProductJsonLd,
  getBaseUrl,
} from "@/lib/seo";

interface ProductPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isValidLocale(lang)) return {};

  try {
    const res = await getProductBySlug(slug);
    const product = res?.data;

    if (!product) {
      return constructMetadata({
        title: "Produto não encontrado",
        lang: lang as Locale,
        path: `/products/${slug}`,
        noIndex: true,
      });
    }

    const dict = await getDictionary(lang as Locale);
    const priceFormatted = product.price ? ` — ${product.price}` : "";
    const title = `${product.name}${priceFormatted}`;
    const description = product.description || dict.productsPage.description;

    return constructMetadata({
      title,
      description,
      lang: lang as Locale,
      path: `/products/${slug}`,
      image:
        product.images && product.images.length > 0
          ? product.images
          : undefined,
      type: "article",
    });
  } catch (error) {
    console.error(`Erro ao gerar metadados para /products/${slug}:`, error);
    return constructMetadata({
      title: "Detalhes do Produto",
      lang: lang as Locale,
      path: `/products/${slug}`,
    });
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { lang, slug } = await params;
  if (!isValidLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const baseUrl = getBaseUrl();

  let product = null;
  try {
    const res = await getProductBySlug(slug);
    product = res?.data;
  } catch {
    product = null;
  }

  if (!product) {
    notFound();
  }

  const canonicalUrl = `${baseUrl}/${lang}/products/${slug}`;
  const inStock = product.affiliateInfo !== null;

  // JSON-LD Dados Estruturados para motores de busca (Google Rich Snippets)
  const productJsonLd = createProductJsonLd({
    name: product.name,
    description: product.description,
    images:
      product.images && product.images.length > 0
        ? product.images
        : [].filter(Boolean),
    price: product.price,
    currency: "AOA",
    category: product.category,
    sku: product.id,
    url: canonicalUrl,
    inStock,
  });

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Bisno", url: `${baseUrl}/${lang}` },
    { name: dict.productsPage.title, url: `${baseUrl}/${lang}/products` },
    { name: product.name, url: canonicalUrl },
  ]);

  return (
    <div className="min-h-screen">
      {/* Dados estruturados JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <ProductNavbar lang={lang} />
      <main className="mx-auto max-w-7xl px-4 pt-20 mb-10">
        <ProductDetails slug={slug} />
      </main>
      <Footer lang={lang} />
    </div>
  );
}
