import { Suspense } from "react";
import { getStockList } from "../queries";
import { Skeleton } from "@/components/ui/skeleton";
import { StockTableGrid } from "./stock-table-grid";

export function StockView() {
  return (
    <Suspense fallback={<StockViewSkeleton />}>
      <StockViewContent />
    </Suspense>
  );
}

async function StockViewContent() {
  const response = await getStockList();
  const data = response.data;

  return <StockTableGrid data={data} />;
}

function StockViewSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-10 w-full max-w-sm rounded-md" />
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>
      <div className="rounded-md border p-4 space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between gap-4">
            <Skeleton className="h-12 w-12 rounded-md" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/6" />
            <Skeleton className="h-4 w-1/6" />
          </div>
        ))}
      </div>
    </div>
  );
}