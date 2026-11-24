import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { mapFeaturedProduct } from "../helper";

@Injectable()
export class GetFeaturedProductsUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(limit: number = 4) {
    const featuredRecords = await this.prisma.featuredProduct.findMany({
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

    return featuredRecords.map(mapFeaturedProduct);
  }
}
