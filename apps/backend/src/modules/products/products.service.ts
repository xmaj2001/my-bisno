import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { GetNewProductsUseCase } from "./use-cases/get-new-products";
import { GetProductsUseCase, GetProductsQuery } from "./use-cases/get-products";
import { GetProductBySlugUseCase } from "./use-cases/get-product-by-slug";
import { GetFeaturedProductsUseCase } from "./use-cases/get-featured-products";

@Injectable()
export class ProductsService {
  constructor(
    private readonly getNewProductsUseCase: GetNewProductsUseCase,
    private readonly getProductsUseCase: GetProductsUseCase,
    private readonly getProductBySlugUseCase: GetProductBySlugUseCase,
    private readonly getFeaturedProductsUseCase: GetFeaturedProductsUseCase,
  ) {}

  create(createProductDto: CreateProductDto) {
    return "This action adds a new product";
  }

  async findAll(query: GetProductsQuery) {
    return this.getProductsUseCase.execute(query);
  }

  async findNew(limit: number) {
    return this.getNewProductsUseCase.execute(limit);
  }

  async findBySlug(slug: string, userId?: string) {
    return this.getProductBySlugUseCase.execute(slug, userId);
  }

  async findFeatured(limit?: number) {
    return this.getFeaturedProductsUseCase.execute(limit);
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
