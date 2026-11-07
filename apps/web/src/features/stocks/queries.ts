import "server-only";

import { cache } from "react";
import { env } from "@/env";
import type {
  GetStockParams,
  StockListResponse,
  StockPageResponse,
} from "./types";
import { getMockStock } from "./mocks/stock.mock"; // ou o teu ficheiro de mocks correspondente
import { apiFetch } from "@/lib/api/api-fetch";

// ─── Listagem completa ou filtrada de stock ──────────────────────────────────

export const getStockList = cache(
  async (params: GetStockParams = {}): Promise<StockListResponse> => {
    if (env.USE_MOCKS) {
      let items = getMockStock();

      // Filtragem básica em mock se houver parâmetros (ex: pesquisa ou status)
      if (params.q) {
        const q = params.q.toLowerCase();
        items = items.filter((item) => item.name.toLowerCase().includes(q));
      }
      if (params.status) {
        items = items.filter((item) => item.status === params.status);
      }

      return {
        success: true,
        data: items,
        ts: new Date().toISOString(),
      };
    }

    const qs = new URLSearchParams();
    if (params.cursor) qs.set("cursor", params.cursor);
    if (params.limit) qs.set("limit", params.limit);
    if (params.categoryId) qs.set("categoryId", params.categoryId);
    if (params.status) qs.set("status", params.status);
    if (params.q) qs.set("q", params.q);

    const query = qs.toString();
    return apiFetch(`/stock${query ? `?${query}` : ""}`);
  },
);
