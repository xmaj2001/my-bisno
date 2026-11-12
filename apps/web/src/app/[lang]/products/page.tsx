// exportar de forma dinâmica a página de produtos, para que o Next.js não faça cache da página e sempre busque os produtos mais recentes do banco de dados.
export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { ProductNavbar } from "@/components/product-navbar";
import { ProductList, ProductSearchFilters } from "@/features/products";
import { SessionFeaturedProducts } from "@/features/products/components/session-featured-products";
import { SessionNewProducts } from "@/features/products/components/session-new-products";
import { SessionRecommendedProducts } from "@/features/products/components/session-recommended-products";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import {
  constructMetadata,
  createBreadcrumbJsonLd,
  getBaseUrl,
} from "@/lib/seo";

interface ProductsPageProps {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{
    q?: string;
    categoryId?: string;
    storeId?: string;
  }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};

  const dict = await getDictionary(lang as Locale);
  return constructMetadata({
    title: dict.productsPage.title,
    description: dict.productsPage.description,
    lang: lang as Locale,
    path: "/products",
    image: "/landing/stats.jpeg",
  });
}

export default async function ProductsPage({
  params,
  searchParams,
}: ProductsPageProps) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const resolvedSearchParams = await searchParams;
  const baseUrl = getBaseUrl();
  const canonicalUrl = `${baseUrl}/${lang}/products`;

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Bisno", url: `${baseUrl}/${lang}` },
    { name: dict.productsPage.title, url: canonicalUrl },
  ]);

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: dict.productsPage.title,
    description: dict.productsPage.description,
    url: canonicalUrl,
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Dados Estruturados JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      <ProductNavbar lang={lang} />
      {/* Sessão de Produtos em Destaque */}
      <SessionFeaturedProducts />
      {/* Sessão de Novos Produtos */}
      <SessionNewProducts />
      {/* Sessão de Produtos Recomendados */}
      <SessionRecommendedProducts />
      <div className="flex flex-col gap-4 w-full"></div>
      <div className="mx-auto max-w-7xl px-4 pt-28 sm:px-6 lg:px-8">
        <header className="animate-fade-up text-center sm:text-left">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {dict.productsPage.title}
          </h1>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">
            {dict.productsPage.subtitle}
          </p>
        </header>

        {/* Filtros e Busca */}
        <div className="mt-8">
          <ProductSearchFilters dictionary={dict.search} />
        </div>

        {/* Listagem com Infinite Scroll */}
        {resolvedSearchParams.q && (
          <p className="mb-4 text-sm text-muted-foreground">
            {dict.search.showingResults} &ldquo;{resolvedSearchParams.q}
            &rdquo;
          </p>
        )}
        <ProductList params={resolvedSearchParams} />
      </div>
      <Footer lang={lang} />
    </main>
  );
}
