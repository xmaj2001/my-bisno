import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { StockDetails } from "@/features/stocks/components/stock-details/stock-details";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Separator } from "@base-ui/react";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ lang: Locale; slug: string }>;
};

export default async function StockDateilsPage({ params }: Props) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);
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
      <div className="flex flex-1 flex-col gap-4 pb-4 px-0 md:px-14">
        <StockDetails
          slug={slug}
          lang={lang}
          translations={dict.stockDetails}
        />
      </div>
    </main>
  );
}
