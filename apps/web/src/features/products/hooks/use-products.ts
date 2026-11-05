"use client";

import { useQuery } from "@tanstack/react-query";
import { productKeys } from "../keys";
import type { Product, ProductFilters } from "../types";

export function useProducts(filters?: ProductFilters, initialData?: Product[]) {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: async (): Promise<Product[]> => {
      // In client, can fetch via route handler or server action if needed
      return initialData ?? [];
    },
    initialData,
    staleTime: 60 * 1000,
  });
}
