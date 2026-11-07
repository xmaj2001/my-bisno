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
export type FeaturedProduct = {
  id: string; // Adicionado para chaves de mapeamento únicas
  title: string;
  subtitle: string;
  description: string;
  backdrop: string;
  aspectRatio?: number;
  specifications: {
    key: string;
    value: string;
  }[];
  product: Product;
};



interface spec {
  label: string;
  value: string;
}

interface affiliateInfo {
  coupon: string;
  isActive: boolean;
}

export type APIProductDetails = {
  id: string;
  slug: string;
  name: string;
  earning: string;
  description: string;
  price: string;
  commission: number;
  images: string[];
  category: string;
  specs: spec[];
  affiliateInfo: affiliateInfo | null;
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
