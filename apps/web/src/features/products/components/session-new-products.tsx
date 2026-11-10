import { Suspense } from "react";
import { getNewProducts } from "../queries";
import { ProductCarousel, SkeletonProductCarousel } from "./product-carousel";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const SessionNewProducts = () => {
  return (
    <div id="new" className="mx-auto max-w-7xl scroll-mt-20 px-4 mb-4">
      {/* Cabeçalho com Título e Botão "Ver mais" */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-2">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Novos produtos
          </h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Acabaram de chegar. Seja o primeiro a partilhar.
          </p>
        </div>

        <Link
          href="/products?sort=new"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          Ver mais produtos
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <Suspense fallback={<SkeletonProductCarousel />}>
        <NewProductsCarousel />
      </Suspense>
    </div>
  );
};

export const NewProductsCarousel = async () => {
  const newProducts = await getNewProducts();
  const data = newProducts.data;

  return <ProductCarousel items={data} />;
};
