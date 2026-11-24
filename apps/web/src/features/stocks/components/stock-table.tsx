"use client";

import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { StockItem } from "../types";

const stockFeatures = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  filterFns: { includesString: filterFn_includesString },
  sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
});

type StockTableFeatures = typeof stockFeatures;
const columnHelper = createColumnHelper<StockTableFeatures, StockItem>();

function createColumns(lang: string) {
  return columnHelper.columns([
    columnHelper.accessor("image", {
      header: "Produto",
      cell: ({ row }) => (
        <Link
          href={`/${lang}/system/stocks/${row.original.slug}`}
          className="flex items-center gap-3 hover:text-primary"
        >
          <div className="relative size-10 overflow-hidden rounded-xs border bg-secondary">
            <Image
              src={row.original.image}
              alt={row.original.name}
              fill
              className="object-cover"
            />
          </div>
          <span className="font-medium">{row.original.name}</span>
        </Link>
      ),
      enableSorting: false,
    }),
    columnHelper.accessor("category", {
      header: "Categoria",
      cell: ({ getValue }) => (
        <span className="text-muted-foreground">{getValue()}</span>
      ),
    }),
    columnHelper.accessor("price", {
      header: () => <div className="text-right">Preço</div>,
      cell: ({ getValue }) => (
        <div className="text-right font-medium">{getValue()}</div>
      ),
    }),
    columnHelper.accessor("stock", {
      header: () => <div className="text-center">Stock</div>,
      cell: ({ getValue }) => (
        <div className="text-center font-semibold">{getValue()} un.</div>
      ),
    }),
    columnHelper.accessor("commission", {
      header: () => <div className="text-right">Comissão</div>,
      cell: ({ getValue }) => (
        <div className="text-right text-primary font-semibold">
          {getValue()}
        </div>
      ),
    }),
    columnHelper.accessor("status", {
      header: "Estado",
      cell: ({ getValue }) => {
        const status = getValue();
        return (
          <Badge
            variant={
              status === "disponivel"
                ? "default"
                : status === "baixo"
                  ? "secondary"
                  : "destructive"
            }
          >
            {status === "disponivel"
              ? "Disponível"
              : status === "baixo"
                ? "Stock Baixo"
                : "Esgotado"}
          </Badge>
        );
      },
    }),
  ]);
}

interface StockTableRowProps {
  row: ReturnType<
    ReturnType<typeof useTable<StockTableFeatures, StockItem>>["getRowModel"]
  >["rows"][number];
  table: ReturnType<typeof useTable<StockTableFeatures, StockItem>>;
}

/**
 * Componente individual para renderizar cada linha da tabela
 */
export function StockTableRow({ row, table }: StockTableRowProps) {
  return (
    <TableRow key={row.id}>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          <table.FlexRender cell={cell} />
        </TableCell>
      ))}
    </TableRow>
  );
}

interface StockTableProps {
  data: StockItem[];
  globalFilter: string;
}

/**
 * Componente principal da Tabela de Stock
 */
export function StockTable({ data, globalFilter }: StockTableProps) {
  const lang = usePathname().split("/")[1];
  const columns = createColumns(lang);
  const items = Array.isArray(data) ? data : [];
  const query = globalFilter.trim().toLocaleLowerCase();
  const filteredData = query
    ? items.filter(
        (item) =>
          item.name?.toLocaleLowerCase().includes(query) ||
          item.category?.toLocaleLowerCase().includes(query),
      )
    : items;
  const table = useTable({
    features: stockFeatures,
    data: filteredData,
    columns,
  });

  return (
    <div className="overflow-hidden border bg-background">
      <Table>
        <TableHeader className="dark bg-night">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : (
                    <table.FlexRender header={header} />
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table
              .getRowModel()
              .rows.map((row) => (
                <StockTableRow key={row.id} row={row} table={table} />
              ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Nenhum produto encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
