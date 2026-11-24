import { Module } from "@nestjs/common";
import { StockController } from "./stock.controller";
import { StockService } from "./stock.service";
import { GetStockBySlugUseCase } from "./use-case/get-product-by-slug";

@Module({
  controllers: [StockController],
  providers: [StockService, GetStockBySlugUseCase],
})
export class StocksModule {}
