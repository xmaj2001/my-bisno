import "server-only";

import { cache } from "react";
import { env } from "@/env";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/features/auth/auth";
import type { Prisma } from "@/generated/prisma/client";
import {
  computeEarning,
  mapFeaturedProduct,
  mapPrismaProduct,
} from "./helper";
import {
  getMockFeaturedProducts,
  getMockNewProducts,
  getMockPaginatedProducts,
  getMockProductBySlug,
  getMockSearchProducts,
} from "./mocks/products.mock";
import type {
  APIProductDetails,
  FeaturedProductsResponse,
  GetProductsParams,
  NewProductsResponse,
  ProductDetailsResponse,
  ProductSearchResponse,
  ProductsPageResponse,
} from "./types";

// ─── Produtos novos ───────────────────────────────────────────────────────────

export const getNewProducts = cache(
  async (limit = 10): Promise<NewProductsResponse> => {
    if (env.USE_MOCKS) {
      return getMockNewProducts();
    }

    const products = await prisma.product.findMany({
      take: limit,
      include: {
        specs: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return {
      success: true,
      data: products.map(mapPrismaProduct),
      ts: new Date().toISOString(),
    };
  },
);

// ─── Produtos recomendados ────────────────────────────────────────────────────

export const getRecommendedProducts = cache(
  async (): Promise<NewProductsResponse> => {
    if (env.USE_MOCKS) {
      return getMockNewProducts();
    }

    const products = await prisma.product.findMany({
      take: 10,
      include: {
        specs: true,
      },
      orderBy: { rating: "desc" },
    });

    return {
      success: true,
      data: products.map(mapPrismaProduct),
      ts: new Date().toISOString(),
    };
  },
);

// ─── Listagem paginada por cursor ─────────────────────────────────────────────

export const getProducts = cache(
  async (params: GetProductsParams = {}): Promise<ProductsPageResponse> => {
    if (env.USE_MOCKS) {
      return getMockPaginatedProducts(params);
    }

    const { cursor, limit = "24", categoryId, storeId, q } = params;
    const limitNum = Number.parseInt(limit, 10) || 24;
    const take = limitNum + 1;

    const whereClause: Prisma.ProductWhereInput = {};
    if (categoryId) whereClause.categoryId = categoryId;
    if (storeId) whereClause.storeId = storeId;
    if (q) {
      whereClause.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ];
    }

    const products = await prisma.product.findMany({
      take,
      ...(cursor && {
        skip: 1,
        cursor: { id: cursor },
      }),
      where: whereClause,
      include: {
        specs: true,
      },
      orderBy: { createdAt: "desc" },
    });

    let nextCursor: string | null = null;
    if (products.length > limitNum) {
      const nextItem = products.pop();
      nextCursor = nextItem?.id ?? null;
    }

    return {
      success: true,
      data: {
        items: products.map(mapPrismaProduct),
        nextCursor,
      },
      ts: new Date().toISOString(),
    };
  },
);

// ─── Produtos em destaque ─────────────────────────────────────────────────────

export const getFeaturedProducts = cache(
  async (limit = 4): Promise<FeaturedProductsResponse> => {
    if (env.USE_MOCKS) {
      return getMockFeaturedProducts();
    }

    const featuredRecords = await prisma.featuredProduct.findMany({
      take: limit,
      include: {
        product: {
          include: {
            specs: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return {
      success: true,
      data: featuredRecords.map(mapFeaturedProduct),
      ts: new Date().toISOString(),
    };
  },
);

// ─── Pesquisa ─────────────────────────────────────────────────────────────────

export const searchProducts = cache(
  async (query: string, limit = 8): Promise<ProductSearchResponse> => {
    if (env.USE_MOCKS) {
      return getMockSearchProducts(query, limit);
    }

    const products = await prisma.product.findMany({
      take: limit,
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
      include: {
        specs: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return {
      success: true,
      data: products.map(mapPrismaProduct),
      ts: new Date().toISOString(),
    };
  },
);

// ─── Detalhe por slug ─────────────────────────────────────────────────────────

export const getProductBySlug = cache(
  async (slug: string): Promise<ProductDetailsResponse> => {
    if (env.USE_MOCKS) {
      return getMockProductBySlug(slug);
    }

    const decodedSlug = decodeURIComponent(slug);
    const userId = await getSessionUserId();
    const product = await prisma.product.findFirst({
      where: {
        OR: [{ slug }, { slug: decodedSlug }],
      },
      include: {
        category: true,
        specs: true,
        stockAfiliates: userId
          ? { where: { userId }, select: { coupon: true, isActive: true } }
          : false,
      },
    });

    if (!product) {
      throw new Error(`Product not found: ${slug}`);
    }

    const affiliateRecord =
      userId && product.stockAfiliates && product.stockAfiliates.length > 0
        ? product.stockAfiliates[0]
        : null;

    const productDetails: APIProductDetails = {
      id: product.id,
      slug: product.slug,
      name: product.name,
      description: product.description,
      price: product.price,
      commission: product.commission,
      earning: computeEarning(product.price, product.commission),
      image: product.images[0] ?? "",
      images: product.images,
      category: product.category?.name ?? "",
      specs: product.specs.map((s) => ({ label: s.label, value: s.value })),
      affiliateInfo: affiliateRecord
        ? { coupon: affiliateRecord.coupon, isActive: affiliateRecord.isActive }
        : null,
    };

    return {
      success: true,
      data: productDetails,
      ts: new Date().toISOString(),
    };
  },
);
