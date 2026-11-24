import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { UpdateProductDto } from "./dto/update-product.dto";
import {
  AllowAnonymous,
  OptionalAuth,
  Session,
  type UserSession,
} from "@thallesp/nestjs-better-auth";

@Controller({
  path: "products",
  version: "1",
})
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * GET /v1/products
   * Keyset pagination com filtros opcionais de categoria e loja.
   *
   * Query params:
   *   - cursor          : ID do último item da página anterior
   *   - cursorPublishedAt : publishedAt ISO do último item
   *   - limit           : itens por página (default: 12)
   *   - categoryId      : filtrar por categoria
   *   - storeId         : filtrar por loja
   */
  @AllowAnonymous()
  @Get()
  findAll(
    @Query("cursor") cursor?: string,
    @Query("limit") limit?: string,
    @Query("categoryId") categoryId?: string,
    @Query("q") q?: string,
  ) {
    return this.productsService.findAll({
      cursorId: cursor,
      limit: limit ? parseInt(limit, 10) : undefined,
      categoryId,
      searchQuery: q,
    });
  }

  /**
   * GET /v1/products/featured?placement=HOME|CATALOG
   * Destaques editoriais ativos para um dado placement.
   */
  @AllowAnonymous()
  @Get("featured")
  findFeatured(@Query("limit") limit?: string) {
    return this.productsService.findFeatured(limit ? Number(limit) : undefined);
  }

  @AllowAnonymous()
  @Get("new")
  findNew(@Query("limit") limit: number = 10) {
    return this.productsService.findNew(limit);
  }

  @OptionalAuth()
  @Get(":slug")
  findBySlug(@Param("slug") slug: string, @Session() auth: UserSession) {
    const userId = auth ? auth.user.id : undefined;
    return this.productsService.findBySlug(slug, userId);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productsService.remove(+id);
  }
}
