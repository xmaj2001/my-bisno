import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { SessionFeaturedProducts } from "@/features/products/components/session-featured-products";
import { SessionNewProducts } from "@/features/products/components/session-new-products";
import { SessionRecommendedProducts } from "@/features/products/components/session-recommended-products";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { constructMetadata } from "@/lib/seo";

interface CatalogPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const dict = await getDictionary(lang as Locale);
  return constructMetadata({
    title: dict.catalog.title,
    description: dict.catalog.description,
    lang: lang as Locale,
    path: "/catalog",
  });
}

export default async function CatalogPage({ params }: CatalogPageProps) {
  const { lang } = await params;
  return (
    <div className="min-h-screen bg-background">
      <div className="mb-10">
        {/* Sessão de Produtos em Destaque */}
        <SessionFeaturedProducts />
        {/* Sessão de Novos Produtos */}
        <SessionNewProducts />
        {/* Sessão de Produtos Recomendados */}
        <SessionRecommendedProducts />
      </div>
      <Footer lang={lang} />
    </div>
  );
}
