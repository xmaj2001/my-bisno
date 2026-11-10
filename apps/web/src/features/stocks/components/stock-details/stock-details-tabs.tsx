"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StockDetailsTabsProps {}

export function StockDetailsTabs({}: StockDetailsTabsProps) {
  return (
    <Tabs defaultValue="produto" className="flex flex-col">
      {/* Tab Header */}
      <div className="border-b">
        <TabsList className="h-auto gap-0 rounded-none bg-transparent p-0">
          <TabsTrigger
            value="produto"
            className="rounded-none border-b-2 border-transparent px-4 py-2 text-sm font-medium data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Produto
          </TabsTrigger>
          <TabsTrigger
            value="partilha"
            className="rounded-none border-b-2 border-transparent px-4 py-2 text-sm font-medium data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Partilha
          </TabsTrigger>
          <TabsTrigger
            value="desempenho"
            className="rounded-none border-b-2 border-transparent px-4 py-2 text-sm font-medium data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Meu Desempenho
          </TabsTrigger>
        </TabsList>
      </div>

      {/* ── ABA 1: PRODUTO ── */}
      <TabsContent value="produto" className="mt-0"></TabsContent>

      {/* ── ABA 2 PARTILHA ── */}
      <TabsContent value="produto" className="mt-0"></TabsContent>

      {/* ── ABA 3: MEU DESEMPENHO ── */}
      <TabsContent value="desempenho" className="mt-0"></TabsContent>
    </Tabs>
  );
}
