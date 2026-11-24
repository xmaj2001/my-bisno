/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { computeEarning } from "../helper";

@Injectable()
export class GetProductBySlugUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(slug: string, userId?: string) {
    const product = await this.prisma.product.findFirst({
      where: { slug },
      include: {
        category: true,
        specs: true,
        stockAfiliates: userId
          ? { where: { userId }, select: { coupon: true, isActive: true } }
          : false,
      },
    });

    if (!product) {
      throw new NotFoundException("Product not found");
    }

    // Verifica se o utilizador já tem este produto no seu stock
    const affiliateRecord =
      userId && product.stockAfiliates && product.stockAfiliates.length > 0
        ? product.stockAfiliates[0]
        : null;
    console.log("X:", affiliateRecord);
    console.log("W:", product.stockAfiliates);

    const productDetails = {
      id: product.id,
      slug: product.slug,
      name: product.name,
      description: product.description,
      price: product.price,
      commission: product.commission,
      earning: computeEarning(product.price, product.commission),
      rating: product.rating,
      reviews: product.reviewsCount,
      stock: product.stock,
      images: product.images,
      category: product.category?.name ?? "",
      specs: product.specs.map((s) => ({ label: s.label, value: s.value })),
      /** Informação de afiliação — null se o utilizador não tiver este produto no stock */
      affiliateInfo: affiliateRecord
        ? { coupon: affiliateRecord.coupon, isActive: affiliateRecord.isActive }
        : null,
    };
    return productDetails;
  }
}
