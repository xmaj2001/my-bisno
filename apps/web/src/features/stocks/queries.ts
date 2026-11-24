import "server-only";

import { cache } from "react";
import { env } from "@/env";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/features/auth/auth";
import type { Prisma } from "@/generated/prisma/client";
import { computeEarning } from "@/features/products/helper";
import { mapPrismaStockAfiliate } from "./helper";
import type {
  GetStockParams,
  StockDetailsResponse,
  StockItemDetails,
  StockListResponse,
} from "./types";
import { getMockStock, getMockStockSlug } from "./mocks/stock.mock";

// ─── Listagem completa ou filtrada de stock ──────────────────────────────────

export const getStockList = cache(
  async (params: GetStockParams = {}): Promise<StockListResponse> => {
    if (env.USE_MOCKS) {
      let items = getMockStock();

      if (params.q) {
        const q = params.q.toLowerCase();
        items = items.filter((item) => item.name.toLowerCase().includes(q));
      }
      if (params.status) {
        items = items.filter((item) => item.status === params.status);
      }

      return {
        success: true,
        data: items,
        ts: new Date().toISOString(),
      };
    }

    const userId = await getSessionUserId();
    if (!userId) {
      return {
        success: true,
        data: { items: [], nextCursor: null },
        ts: new Date().toISOString(),
      };
    }

    const { cursor, limit = "24", categoryId, q } = params;
    const limitNum = Number.parseInt(limit, 10) || 24;
    const take = limitNum + 1;

    const whereClause: Prisma.StockAfiliateWhereInput = {
      userId,
    };

    if (categoryId) {
      whereClause.product = { categoryId };
    }

    if (q) {
      whereClause.product = {
        ...(whereClause.product as Prisma.ProductWhereInput),
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
        ],
      };
    }

    const records = await prisma.stockAfiliate.findMany({
      take,
      ...(cursor && {
        skip: 1,
        cursor: { id: cursor },
      }),
      where: whereClause,
      include: {
        product: {
          include: {
            category: true,
            store: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    let nextCursor: string | null = null;
    if (records.length > limitNum) {
      const nextItem = records.pop();
      nextCursor = nextItem?.id ?? null;
    }

    const items = records.map(mapPrismaStockAfiliate);

    return {
      success: true,
      data: {
        items,
        nextCursor,
      },
      ts: new Date().toISOString(),
    };
  },
);

// ─── Detalhe por slug ─────────────────────────────────────────────────────────

export const getStockBySlug = cache(
  async (slug: string): Promise<StockDetailsResponse> => {
    if (env.USE_MOCKS) {
      return getMockStockSlug(slug);
    }

    const userId = await getSessionUserId();
    const product = await prisma.product.findFirst({
      where: { slug },
      include: {
        category: true,
        specs: true,
        stockAfiliates: userId
          ? {
              where: { userId },
              select: { coupon: true, isActive: true },
            }
          : false,
        store: {
          select: {
            whatsapp: true,
            name: true,
            logoUrl: true,
          },
        },
      },
    });

    if (!product) {
      throw new Error(`Product not found in stock: ${slug}`);
    }

    const affiliateRecord =
      userId && product.stockAfiliates && product.stockAfiliates.length > 0
        ? product.stockAfiliates[0]
        : null;

    const stockQty = product.stock ?? 0;
    const status: "disponivel" | "baixo" | "esgotado" =
      stockQty === 0 ? "esgotado" : stockQty <= 5 ? "baixo" : "disponivel";

    const productDetails: StockItemDetails = {
      id: product.id,
      slug: product.slug,
      name: product.name,
      description: product.description,
      price: product.price,
      commission: `${product.commission}%`,
      stock: product.stock,
      earning: computeEarning(product.price, product.commission),
      status,
      images: product.images,
      category: product.category?.name ?? "",
      store: product.store ?? {
        name: "Bisno",
        logoUrl: null,
        whatsapp: "+244944083160",
      },
      coupon: affiliateRecord?.coupon ?? "",
      specs: product.specs.map((s) => ({ label: s.label, value: s.value })),
    };

    return {
      success: true,
      data: productDetails,
      ts: new Date().toISOString(),
    };
  },
);
