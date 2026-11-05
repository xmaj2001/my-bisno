import type { ApiCursorEnvelope, ApiEnvelope } from "@/lib/api/types";
import type { ProductFilters, ProductsPageParams } from "./schemas";

export type { ProductFilters, ProductsPageParams };

// ─── Modelos de domínio ───────────────────────────────────────────────────────

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: string;
  commission: number;
  /** Valor de comissão formatado (ex.: "250 Kz") */
  earning: string;
  image: string;
};

export type FeaturedProduct = Product & {
  featured: boolean;
  rank?: number;
};

export type APIProductDetails = Product & {
  storeId: string;
  storeName: string;
  storeWhatsapp: string;
  categoryId: string;
  categoryName: string;
  stock: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
};

// ─── Params dos endpoints ─────────────────────────────────────────────────────

export interface GetProductsParams {
  cursor?: string;
  cursorPublishedAt?: string;
  limit?: string;
  categoryId?: string;
  storeId?: string;
  q?: string;
}

// ─── Aliases de resposta (response shapes prontas a usar nos componentes) ─────

/** GET /v1/products/new */
export type NewProductsResponse = ApiEnvelope<Product[]>;

/** GET /v1/products?... (paginação por cursor) */
export type ProductsPageResponse = ApiEnvelope<ApiCursorEnvelope<Product>>;

/** GET /v1/products/featured */
export type FeaturedProductsResponse = ApiEnvelope<FeaturedProduct[]>;

/** GET /v1/products/search?q=... */
export type ProductSearchResponse = ApiEnvelope<Product[]>;

/** GET /v1/products/:slug */
export type ProductDetailsResponse = ApiEnvelope<APIProductDetails>;
