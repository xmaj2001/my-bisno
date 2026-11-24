"use client";

import { useState } from "react";
import type { StockItem } from "../types";
import { StockTable } from "./stock-table";
import { StockGrid } from "./stock-grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LayoutGrid, Table as TableIcon, Search } from "lucide-react";

interface StockTableGridProps {
  data: StockItem[] | { items?: StockItem[] };
}

export function StockTableGrid({ data }: StockTableGridProps) {
  const [viewMode, setViewMode] = useState<"table" | "grid">("grid");
  const [globalFilter, setGlobalFilter] = useState("");

  const items = Array.isArray(data)
    ? data
    : Array.isArray((data as { items?: StockItem[] })?.items)
      ? (data as { items: StockItem[] }).items
      : [];

  return (
    <div className="space-y-4">
      {/* Barra de Pesquisa e Alternância */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar stock..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-1 rounded-xs border bg-muted p-1">
          <Button
            variant={viewMode === "table" ? "hero" : "ghost"}
            size="sm"
            onClick={() => setViewMode("table")}
            className="gap-2"
          >
            <TableIcon className="size-4" />
            <span>Tabela</span>
          </Button>
          <Button
            variant={viewMode === "grid" ? "hero" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="gap-2"
          >
            <LayoutGrid className="size-4" />
            <span>Grelha</span>
          </Button>
        </div>
      </div>

      {/* Renderização Condicional Limpa */}
      {viewMode === "table" ? (
        <StockTable data={items} globalFilter={globalFilter} />
      ) : (
        <StockGrid data={items} globalFilter={globalFilter} />
      )}
    </div>
  );
}
