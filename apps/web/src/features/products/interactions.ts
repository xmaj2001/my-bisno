"use server";

import { addToStockAction as stockAddToStockAction } from "@/features/stocks/interactions";
import { getProducts } from "./queries";
import type { GetProductsParams, ProductsPageResponse } from "./types";

export type { AddToStockResult } from "@/features/stocks/interactions";

export async function addToStockAction(productId: string) {
  return stockAddToStockAction(productId);
}

export async function getProductsAction(
  params: GetProductsParams = {},
): Promise<ProductsPageResponse> {
  return getProducts(params);
}
