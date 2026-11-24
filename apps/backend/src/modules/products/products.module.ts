import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { GetNewProductsUseCase } from "./use-cases/get-new-products";
import { GetProductsUseCase } from "./use-cases/get-products";
import { GetProductBySlugUseCase } from "./use-cases/get-product-by-slug";
import { GetFeaturedProductsUseCase } from "./use-cases/get-featured-products";

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    GetNewProductsUseCase,
    GetProductsUseCase,
    GetProductBySlugUseCase,
    GetFeaturedProductsUseCase,
  ],
})
export class ProductsModule {}
