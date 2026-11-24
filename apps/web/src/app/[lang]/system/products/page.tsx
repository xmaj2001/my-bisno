// exportar de forma dinâmica a página de produtos, para que o Next.js não faça cache da página e sempre busque os produtos mais recentes do banco de dados.
export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { ProductNavbar } from "@/components/product-navbar";
import { ProductList, ProductSearchFilters } from "@/features/products";
import { SessionFeaturedProducts } from "@/features/products/components/session-featured-products";
import { SessionNewProducts } from "@/features/products/components/session-new-products";
import { SessionRecommendedProducts } from "@/features/products/components/session-recommended-products";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

interface ProductsPageProps {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{
    q?: string;
    categoryId?: string;
    storeId?: string;
  }>;
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
    <main>
      <header className="flex h-16 shrink-0 items-center gap-2 px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-vertical:h-4 data-vertical:self-auto"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href={`/${lang}/system/products`}>
                  {dict.dashboard.sidebar.dashboardLabel}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{dict.dashboard.sidebar.stock}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 pb-4 px-2 md:px-16">
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
    </main>
  );
}
