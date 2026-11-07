// exportar de forma dinâmica a página de produtos, para que o Next.js não faça cache da página e sempre busque os produtos mais recentes do banco de dados.
export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductList, ProductSearchFilters } from "@/features/products";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { constructMetadata } from "@/lib/seo";
import { Footer } from "@/components/footer";
import { SessionFeaturedProducts } from "@/features/products/components/session-featured-products";
import { SessionNewProducts } from "@/features/products/components/session-new-products";
import { SessionRecommendedProducts } from "@/features/products/components/session-recommended-products";
import { ProductNavbar } from "@/components/product-navbar";

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

  return (
    <main className="min-h-screen bg-background">
      <ProductNavbar lang={lang} />
      {/* Sessão de Produtos em Destaque */}
      <SessionFeaturedProducts />
      {/* Sessão de Novos Produtos */}
      <SessionNewProducts />
      {/* Sessão de Produtos Recomendados */}
      <SessionRecommendedProducts />
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
      <Footer />
    </main>
  );
}
