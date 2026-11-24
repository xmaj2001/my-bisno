import type { StockItem } from "./types";
import { computeEarning } from "@/features/products/helper";

export function mapPrismaStockAfiliate(stock: {
  id: string;
  productId: string;
  coupon: string;
  isActive: boolean;
  createdAt: Date;
  userId: string;
  product: {
    id: string;
    slug: string;
    name: string;
    description: string;
    price: string;
    commission: number;
    stock: number;
    images: string[];
    category?: { id: string; name: string } | null;
    store?: { name: string; logoUrl: string | null; whatsapp: string } | null;
  };
}): StockItem {
  const stockQty = stock.product.stock ?? 0;
  const status: "disponivel" | "baixo" | "esgotado" =
    stockQty === 0 ? "esgotado" : stockQty <= 5 ? "baixo" : "disponivel";

  const commissionPct: number = stock.product.commission ?? 10;

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
    image: stock.product.images[0] ?? "",
  };
}
