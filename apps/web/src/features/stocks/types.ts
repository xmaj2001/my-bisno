import type { ApiCursorEnvelope, ApiEnvelope } from "@/lib/api/types";

// ─── Modelos de domínio ───────────────────────────────────────────────────────
export type StockItem = {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  commission: string;
  status: "disponivel" | "baixo" | "esgotado";
  image: string;
};

interface spec {
  label: string;
  value: string;
}
export type StockItemDetails = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: string;
  commission: string;
  stock: number;
  earning: string;
  status: "disponivel" | "baixo" | "esgotado";
  images: string[];
  category: string;
  
  coupon: string;
  specs: spec[];
};

// ─── Params dos endpoints ─────────────────────────────────────────────────────
export interface GetStockParams {
  cursor?: string;
  limit?: string;
  categoryId?: string;
  status?: "disponivel" | "baixo" | "esgotado";
  q?: string;
}

// ─── Aliases de resposta (response shapes prontas a usar nos componentes) ─────

/** GET /v1/stock */
export type StockListResponse = ApiEnvelope<StockItem[]>;

/** GET /v1/stock/paginated?... (se precisares de paginação por cursor no stock) */
export type StockPageResponse = ApiEnvelope<ApiCursorEnvelope<StockItem>>;

/** GET /v1/stock/:id */
export type StockDetailsResponse = ApiEnvelope<StockItemDetails>;
