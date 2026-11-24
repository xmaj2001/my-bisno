import type { Product as PrismaProduct } from "@/generated/prisma/client";
import type { FeaturedProduct, Product } from "./types";

/**
 * Calcula o valor de comissão em Kwanzas a partir do preço e percentagem.
 * O preço pode ter o formato "45.000 Kz" ou "45000 Kz".
 */
export function computeEarning(price: string, commissionPct: number): string {
  const numeric = parseFloat(price.replace(/[^\d,\.]/g, "").replace(",", "."));
  if (isNaN(numeric)) return "0 Kz";
  const earning = Math.round((numeric * commissionPct) / 100);
  return `${earning.toLocaleString("pt-PT")} Kz`;
}

export function mapPrismaProduct(
  p: PrismaProduct & {
    specs?: { id: string; label: string; value: string; productId: string }[];
  },
): Product {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    description: p.description,
    price: p.price,
    commission: p.commission,
    earning: computeEarning(p.price, p.commission),
    image: p.images[0] ?? "",
    specs: p.specs ?? [],
  };
}

export function mapFeaturedProduct(feat: {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bannerDesktop: string;
  bannerMobile: string;
  textColor: string;
  aspectRatio: number | null;
  product: PrismaProduct & {
    specs?: { id: string; label: string; value: string; productId: string }[];
  };
}): FeaturedProduct {
  const prod = feat.product;

  return {
    id: feat.id,
    title: feat.title,
    subtitle: feat.subtitle,
    description: feat.description,
    bannerDesktop: feat.bannerDesktop,
    bannerMobile: feat.bannerMobile,
    textColor: feat.textColor,
    aspectRatio: feat.aspectRatio ?? undefined,
    product: mapPrismaProduct(prod),
  };
}
