// exportar de forma dinâmica a página de produtos, para que o Next.js não faça cache da página e sempre busque os produtos mais recentes do banco de dados.
export const dynamic = "force-dynamic";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SessionFeaturedProducts } from "@/features/products/components/session-featured-products";
import { SessionNewProducts } from "@/features/products/components/session-new-products";
import { SessionRecommendedProducts } from "@/features/products/components/session-recommended-products";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

interface ProductsPageProps {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{
    q?: string;
    categoryId?: string;
    storeId?: string;
  }>;
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { lang } = await params;

  const dict = await getDictionary(lang as Locale);

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
                <BreadcrumbLink href={`/${lang}/system/stocks`}>
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
      <div className="flex flex-1 flex-col gap-4 pb-4 px-0 md:px-2">
        {/* Sessão de Produtos em Destaque */}
        <SessionFeaturedProducts />
        {/* Sessão de Novos Produtos */}
        <SessionNewProducts />
        {/* Sessão de Produtos Recomendados */}
        {/* <SessionRecommendedProducts /> */}
      </div>
    </main>
  );
}
