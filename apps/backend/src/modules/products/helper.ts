import { Product } from "src/generated/prisma/client";

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

export function mapPrismaProduct(p: Product) {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    description: p.description,
    price: p.price,
    commission: p.commission,
    earning: computeEarning(p.price, p.commission),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    image: p.images[0],
  };
}

export function mapPrismaStockAfiliate(
  stock: {
    product: {
      categoryId: string;
      category?: { id: string; name: string } | null;
      id: string;
      createdAt: Date;
      name: string;
      slug: string;
      description: string;
      price: string;
      rating: number;
      reviewsCount: number;
      stock: number;
      images: string[];
      updatedAt: Date;
      storeId: string | null;
    };
  } & {
    id: string;
    productId: string;
    coupon: string;
    isActive: boolean;
    createdAt: Date;
    userId: string;
  },
) {
  const stockQty = stock.product.stock ?? 0;
  const status: "disponivel" | "baixo" | "esgotado" =
    stockQty === 0 ? "esgotado" : stockQty <= 5 ? "baixo" : "disponivel";

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const commissionPct: number = (stock.product as any).commission ?? 10;

  return {
    id: stock.product.id,
    slug: stock.product.slug,
    name: stock.product.name,
    category: stock.product.category?.name ?? "Geral",
    price: stock.product.price,
    stock: stockQty,
    commission: `${commissionPct}%`,
    earning: computeEarning(stock.product.price, commissionPct),
    status,
    coupon: stock.coupon,
    isActive: stock.isActive,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    image: stock.product.images[0],
  };
}

export function mapFeaturedProduct(
  feat: {
    product: {
      specs: {
        id: string;
        label: string;
        value: string;
        productId: string;
      }[];
    };
  } & {
    id: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    subtitle: string;
    bannerDesktop: string;
    bannerMobile: string;
    textColor: string;
    aspectRatio: number | null;
    productId: string;
  },
) {
  const prod = feat.product;

  return {
    id: feat.id,
    title: feat.title,
    subtitle: feat.subtitle,
    description: feat.description,
    banner: {
      desktop: feat.bannerDesktop,
      mobile: feat.bannerMobile,
    },
    textColor: feat.textColor as "dark" | "light",
    aspectRatio: feat.aspectRatio ?? undefined,
    product: prod,
  };
}
