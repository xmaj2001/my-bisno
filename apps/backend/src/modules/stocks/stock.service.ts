import {
  Injectable,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";
import { Prisma } from "src/generated/prisma/client";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { mapPrismaStockAfiliate } from "../products/helper";

export interface GetProductsQuery {
  /** ID do último item da página anterior (para keyset pagination) */
  cursorId?: string;

  /** Número de itens por página (default: 12) */
  limit?: number;
  /** Filtrar por ID de categoria */
  categoryId?: string;

  searchQuery?: string;
}
@Injectable()
export class StockService {
  constructor(private readonly prisma: PrismaService) {}

  async addToStock(userId: string, productId: string) {
    // Verifica se o produto existe
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      select: { id: true, name: true },
    });
    if (!product) {
      throw new NotFoundException("Produto não encontrado.");
    }

    // Verifica se já está no stock (unique constraint [userId, productId])
    const existing = await this.prisma.stockAfiliate.findUnique({
      where: { userId_productId: { userId, productId } },
    });
    if (existing) {
      throw new ConflictException("Este produto já está no teu stock.");
    }

    // Gera um cupão único para este afiliado
    const shortUser = userId.replace(/-/g, "").slice(0, 6).toUpperCase();
    const shortProd = productId.replace(/-/g, "").slice(0, 4).toUpperCase();
    const rand = Math.floor(Math.random() * 9000) + 1000;
    const coupon = `BISNO-${shortUser}-${shortProd}-${rand}`;

    const record = await this.prisma.stockAfiliate.create({
      data: { userId, productId, coupon, isActive: true },
      select: { id: true, coupon: true, isActive: true, productId: true },
    });

    return {
      success: true,
      coupon: record.coupon,
      productId: record.productId,
    };
  }

  async findAll(query: GetProductsQuery, userId: string) {
    const { cursorId, searchQuery, limit = 24, categoryId } = query;
    const take = limit + 1;
    const whereClause: Prisma.StockAfiliateWhereInput = {};
    if (whereClause.product && categoryId)
      whereClause.product.categoryId = categoryId;
    if (searchQuery) {
      whereClause.OR = [
        {
          product: {
            name: { contains: searchQuery, mode: "insensitive" },
          },
        },
        {
          product: {
            description: { contains: searchQuery, mode: "insensitive" },
          },
        },
      ];
    }
    const products = await this.prisma.stockAfiliate.findMany({
      take: take,
      ...(cursorId && {
        skip: 1,
        cursor: { id: cursorId },
      }),
      where: {
        userId,
      },
      include: {
        product: {
          include: {
            category: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    let nextCursor: string | null = null;
    if (products.length > limit) {
      const nextItem = products.pop();
      nextCursor = nextItem?.id ?? null;
    }
    return {
      items: products.map((x) => mapPrismaStockAfiliate(x)),
      nextCursor,
    };
  }
}
