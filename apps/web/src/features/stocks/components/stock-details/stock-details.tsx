import { Suspense } from "react";
import { env } from "@/env";
import { ProductDetailsGallery } from "@/features/products";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { getStockBySlug } from "../../queries";
import { StockDetailsTabs } from "./stock-details-tabs";

interface StockDetailsProps {
  slug: string;
  lang: Locale;
  translations: Dictionary["stockDetails"];
}

export const StockDetails = async (props: StockDetailsProps) => {
  return (
    <Suspense
      fallback={
        <div className="grid gap-6 lg:grid-cols-2 animate-pulse">
          <div className="aspect-square rounded-xl bg-muted" />
          <div className="h-125 rounded-xl bg-muted" />
        </div>
      }
    >
      <StockDetailsContent {...props} />
    </Suspense>
  );
};

export const StockDetailsContent = async ({
  slug,
  lang,
  translations,
}: StockDetailsProps) => {
  const res = await getStockBySlug(slug);
  const p = res.data;

  const productUrl = new URL(
    `/${lang}/products/${encodeURIComponent(p.slug)}`,
    env.NEXT_PUBLIC_APP_URL,
  );
  if (p.coupon) productUrl.searchParams.set("coupon", p.coupon);
  const whatsappMessage = translations.whatsappMessage
    .replace("{product}", p.name)
    .replace("{link}", productUrl.toString());
  const whatsappLink = `https://wa.me/${p.store.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Lado Esquerdo: Galeria de Imagens */}
      <ProductDetailsGallery
        gallery={p.images}
        productName={p.name}
        downloadImage
        downloadImageLabel={translations.downloadImage}
        downloadImageSuccess={translations.imageDownloaded}
        downloadImageError={translations.imageDownloadError}
      />

      {/* Lado Direito: Informações e Ações do Produto */}
      <div className="flex flex-col gap-6 rounded-md bg-card shadow-sm">
        <StockDetailsTabs
          product={p}
          productUrl={productUrl.toString()}
          whatsappLink={whatsappLink}
          translations={translations}
        />
      </div>
    </div>
  );
};
