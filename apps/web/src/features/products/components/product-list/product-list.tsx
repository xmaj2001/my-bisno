import { Suspense } from "react";
import type { GetProductsParams } from "../../types";
import { SkeletonGrid } from "../product-grid";
import { getProducts } from "../../queries";
import { ProductListInfinite } from "./product-list-infinite";
export function ProductList({ params = {} }: { params?: GetProductsParams }) {
  return (
    // key: quando os filtros/params mudam, o Suspense volta a mostrar o skeleton
    <Suspense key={JSON.stringify(params)} fallback={<SkeletonGrid />}>
      <ProductListContent params={params} />
    </Suspense>
  );
}

async function ProductListContent({
  params = {},
}: {
  params?: GetProductsParams;
}) {
  const { data } = await getProducts(params);
  return <ProductListInfinite params={params} initialPage={data} />;
}
