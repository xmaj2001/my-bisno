export const dynamic = "force-dynamic";

import { ProductList, ProductSearchFilters } from "@/features/products";
import { isValidLocale, Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { notFound } from "next/navigation";

interface DashboardPageProps {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{
    q?: string;
    categoryId?: string;
    storeId?: string;
  }>;
}

export default async function DashboardPage({
  params,
  searchParams,
}: DashboardPageProps) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const resolvedSearchParams = await searchParams;
  return (
    <div className="flex flex-col gap-4">
      <header className="animate-fade-up flex flex-col items-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          {dict.productsPage.title}
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground">
          {dict.productsPage.subtitle}
        </p>
      </header>

      {/* Filtros e Busca */}
        <ProductSearchFilters dictionary={dict.search} />

      {/* Listagem com Infinite Scroll */}
      {resolvedSearchParams.q && (
        <p className="mb-4 text-sm text-muted-foreground">
          {dict.search.showingResults} &ldquo;{resolvedSearchParams.q}
          &rdquo;
        </p>
      )}
      <ProductList params={resolvedSearchParams} />
    </div>
  );
}
