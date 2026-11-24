export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@base-ui/react";

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
      path: `/system/product/${slug}`,
      image:
        product.images && product.images.length > 0
          ? product.images
          : undefined,
      type: "article",
      noIndex: true,
    });
  } catch (error) {
    console.error(`Erro ao gerar metadados para /system/product/${slug}:`, error);
    return constructMetadata({
      title: "Detalhes do Produto",
      lang: lang as Locale,
      path: `/system/product/${slug}`,
      noIndex: true,
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
      <div className="flex flex-1 flex-col gap-4 pb-4 px-0 md:px-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        <ProductDetails slug={slug} />
      </div>
    </main>
  );
}
