import { ProductDetailsGallery } from "@/features/products";
import { Suspense } from "react";
import { getStockById } from "../../queries";
import { Tabs } from "@/components/ui/tabs";
import { StockDetailsTabs } from "./stock-details-tabs";

interface StockDetailsProps {
  id: string;
}

export const StockDetails = async ({ id }: StockDetailsProps) => {
  return (
    <Suspense
      fallback={
        <div className="grid gap-6 lg:grid-cols-2 animate-pulse">
          <div className="aspect-square rounded-xl bg-muted" />
          <div className="h-125 rounded-xl bg-muted" />
        </div>
      }
    >
      <StockDetailsContent id={id} />
    </Suspense>
  );
};

export const StockDetailsContent = async ({ id }: StockDetailsProps) => {
  const res = await getStockById(id);
  const p = res.data;

  const earningPerSale = Number(p.earning);
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Lado Esquerdo: Galeria de Imagens */}
      <ProductDetailsGallery
        gallery={p.images}
        productName={p.name}
        downloadImage={true}
      />

      {/* Lado Direito: Informações e Ações do Produto */}
      <div className="flex flex-col gap-6 rounded-md bg-card shadow-sm">
        <StockDetailsTabs />
      </div>
    </div>
  );
};
