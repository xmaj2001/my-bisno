import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { Prisma } from "src/generated/prisma/client";
import { mapPrismaProduct } from "../helper";

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
export class GetProductsUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetProductsQuery) {
    const { cursorId, searchQuery, limit = 24, categoryId } = query;

    const take = limit + 1;
    const whereClause: Prisma.ProductWhereInput = {};
    if (categoryId) whereClause.categoryId = categoryId;
    if (searchQuery) {
      whereClause.OR = [
        { name: { contains: searchQuery, mode: "insensitive" } },
        { description: { contains: searchQuery, mode: "insensitive" } },
      ];
    }
    const products = await this.prisma.product.findMany({
      take: take,
      ...(cursorId && {
        skip: 1,
        cursor: { id: cursorId },
      }),
      where: whereClause,
      orderBy: { createdAt: "desc" },
    });

    let nextCursor: string | null = null;
    if (products.length > limit) {
      const nextItem = products.pop();
      nextCursor = nextItem?.id ?? null;
    }

    return {
      items: products.map(mapPrismaProduct),
      nextCursor,
    };
  }
}
