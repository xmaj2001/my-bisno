"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import type { StockItem } from "../types";

interface StockItemGridProps {
  item: StockItem;
}

/**
 * Componente individual para renderizar cada card de stock na grelha
 */
export function StockItemGrid({ item }: StockItemGridProps) {
  const lang = usePathname().split("/")[1];

  return (
    <Link
      href={`/${lang}/system/stocks/${item.slug}`}
      className="group flex flex-col overflow-hidden rounded-xs border bg-background p-4 transition-all hover:shadow-md"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-secondary mb-3">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
            Sem imagem
          </div>
        )}
        {item.status && (
          <div className="absolute top-2 right-2">
            <Badge
              className="uppercase"
              variant={
                item.status === "disponivel"
                  ? "default"
                  : item.status === "baixo"
                    ? "secondary"
                    : "destructive"
              }
            >
              {item.status}
            </Badge>
          </div>
        )}
      </div>
      {item.category && (
        <span className="text-xs text-muted-foreground mb-1">
          {item.category}
        </span>
      )}
      <h3 className="font-semibold text-sm line-clamp-1 mb-2">{item.name}</h3>
      <div className="mt-auto flex items-center justify-between pt-2 border-t text-sm">
        <div>
          <span className="text-xs text-muted-foreground block">Preço</span>
          <span className="font-bold">{item.price}</span>
        </div>
        {item.commission && (
          <div className="text-right">
            <span className="text-xs text-muted-foreground block">Comissão</span>
            <span className="font-semibold text-primary">{item.commission}</span>
          </div>
        )}
      </div>
    </Link>
  );
}

interface StockGridProps {
  data: StockItem[];
  globalFilter: string;
}

/**
 * Componente contentor da grelha que filtra e lista os itens
 */
export function StockGrid({ data, globalFilter }: StockGridProps) {
  const items = Array.isArray(data) ? data : [];
  const filteredData = globalFilter
    ? items.filter(
        (item) =>
          item.name?.toLowerCase().includes(globalFilter.toLowerCase()) ||
          item.category?.toLowerCase().includes(globalFilter.toLowerCase()),
      )
    : items;

  if (filteredData.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-md border bg-card text-muted-foreground">
        Nenhum produto encontrado.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredData.map((item) => (
        <StockItemGrid key={item.id} item={item} />
      ))}
    </div>
  );
}
