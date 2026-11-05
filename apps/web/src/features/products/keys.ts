import type { ProductFilters } from "./types";

export const productKeys = {
  all: ["products"] as const,
  list: (filters?: ProductFilters) =>
    [...productKeys.all, "list", filters] as const,
  detail: (id: string) => [...productKeys.all, "detail", id] as const,
};
