import { Suspense } from "react";
// Importa a função de busca apropriada (ex.: getRecommendedProducts)
import { getRecommendedProducts } from "../queries";
import { ProductCarousel, SkeletonProductCarousel } from "./product-carousel";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const SessionRecommendedProducts = () => {
  return (
    <section
      id="recommended"
      className="mx-auto max-w-7xl scroll-mt-20 px-4 pt-24"
    >
      {/* Cabeçalho com Título e Botão "Ver mais" */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-2">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Recomendados para si
          </h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Seleção especial com as melhores oportunidades de comissão para si.
          </p>
        </div>

        <Link
          href="/products?filter=recommended"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          Ver mais produtos
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <Suspense fallback={<SkeletonProductCarousel />}>
        <RecommendedProductsCarousel />
      </Suspense>
    </section>
  );
};

export const RecommendedProductsCarousel = async () => {
  // Chamada à tua query de recomendados
  const recommendedProducts = await getRecommendedProducts();
  const data = recommendedProducts.data;

  return <ProductCarousel items={data} />;
};
