import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  Param,
} from "@nestjs/common";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { StockService } from "./stock.service";
import { IsString } from "class-validator";
import { GetStockBySlugUseCase } from "./use-case/get-product-by-slug";

export class AddToStockDto {
  @IsString()
  productId!: string;
}

@Controller({
  path: "stocks",
  version: "1",
})
export class StockController {
  constructor(
    private readonly service: StockService,
    private readonly stock: GetStockBySlugUseCase,
  ) {}

  /**
   * GET /v1/stocks
   * Lista de produtos no stock do utilizador autenticado.
   */
  @Get()
  findAll(
    @Session() auth: UserSession,
    @Query("cursorId") cursorId?: string,
    @Query("limit") limit?: string,
    @Query("categoryId") categoryId?: string,
    @Query("searchQuery") searchQuery?: string,
  ) {
    const userId = auth.user.id;
    return this.service.findAll(
      {
        cursorId,
        limit: limit ? parseInt(limit, 10) : undefined,
        categoryId,
        searchQuery,
      },
      userId,
    );
  }

  /**
   * POST /v1/stocks
   * Adiciona um produto ao stock do utilizador autenticado.
   * Body: { productId: string }
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  addToStock(@Session() auth: UserSession, @Body() dto: AddToStockDto) {
    const userId = auth.user.id;
    return this.service.addToStock(userId, dto.productId);
  }

  @Get(":slug")
  findBySlug(@Param("slug") slug: string, @Session() auth: UserSession) {
    const userId = auth.user.id;
    return this.stock.execute(slug, userId);
  }
}
