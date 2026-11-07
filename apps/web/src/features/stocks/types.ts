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
export type StockDetailsResponse = ApiEnvelope<StockItem>;
