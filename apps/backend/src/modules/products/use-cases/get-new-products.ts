import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { mapPrismaProduct } from "../helper";

@Injectable()
export class GetNewProductsUseCase {
  constructor(private readonly prisma: PrismaService) {}
  async execute(limit: number = 10) {
    const products = await this.prisma.product.findMany({
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    return products.map(mapPrismaProduct);
  }

}
