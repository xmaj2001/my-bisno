/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from "@nestjs/common";
import { computeEarning } from "src/modules/products/helper";
import { PrismaService } from "src/shared/prisma/prisma.service";

@Injectable()
export class GetStockBySlugUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(slug: string, userId: string) {
    const product = await this.prisma.product.findFirst({
      where: { slug },
      include: {
        category: true,
        specs: true,
        stockAfiliates: {
          where: { userId },
          select: { coupon: true, isActive: true },
        },
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
      throw new NotFoundException("Product not found");
    }

    // Verifica se o utilizador já tem este produto no seu stock
    const affiliateRecord =
      userId && product.stockAfiliates && product.stockAfiliates.length > 0
        ? product.stockAfiliates[0]
        : null;

    const stockQty = product.stock ?? 0;
    const status: "disponivel" | "baixo" | "esgotado" =
      stockQty === 0 ? "esgotado" : stockQty <= 5 ? "baixo" : "disponivel";
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
      status: status,
      stock: product.stock,
      images: product.images,
      category: product.category?.name ?? "",
      specs: product.specs.map((s) => ({ label: s.label, value: s.value })),
      coupon: affiliateRecord?.coupon,
      isActive: affiliateRecord?.isActive,
      store: product.store,
    };
    return productDetails;
  }
}
