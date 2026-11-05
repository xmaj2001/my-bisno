import { Suspense } from "react";
import { getNewProducts } from "../queries";
import { ProductGrid, SkeletonGrid } from "./product-list/product-grid";

export const SessionNewProducts = () => {
  return (
    <div id="new" className="mx-auto max-w-7xl scroll-mt-20 px-4 pt-24">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {"Novos produtos"}
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          {"Acabaram de chegar. Seja o primeiro a partilhar."}
        </p>
      </div>
      <Suspense fallback={<SkeletonGrid />}>
        <NewProductsGrid />
      </Suspense>
    </div>
  );
};

export const NewProductsGrid = async () => {
  const newProducts = await getNewProducts();
  const data = newProducts.data;
  return <ProductGrid items={data} />;
};
