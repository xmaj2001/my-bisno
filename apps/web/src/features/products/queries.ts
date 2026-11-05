import "server-only";
import { cache } from "react";
import { env } from "@/env";
import { generateMockProducts } from "./mocks/products.mock";
import type { Product, ProductFilters } from "./types";

/**
 * Cached server-side read for products.
 * Uses React cache() for request deduplication.
 */
export const getProducts = cache(
  async (filters?: ProductFilters): Promise<Product[]> => {
    if (env.USE_MOCKS) {
      const mockList = generateMockProducts();
      if (!filters) return mockList;

      return mockList.filter((item) => {
        if (filters.category && item.category !== filters.category)
          return false;
        if (filters.inStockOnly && !item.inStock) return false;
        if (filters.minPrice && item.price < filters.minPrice) return false;
        if (filters.maxPrice && item.price > filters.maxPrice) return false;
        return true;
      });
    }

    // When USE_MOCKS is false, fetch from actual API / database
    // Example: const res = await fetch("https://api.example.com/products", { next: { tags: ["products"] } });
    return [];
  },
);

export const getProductById = cache(
  async (id: string): Promise<Product | null> => {
    if (env.USE_MOCKS) {
      const mockList = generateMockProducts();
      return mockList.find((p) => p.id === id) ?? null;
    }

    return null;
  },
);
