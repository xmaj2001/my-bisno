import { Suspense } from "react";
import { getFeaturedProducts } from "../queries"; // ou a tua função real de API
import { FeaturedCarousel } from "./featured-carousel";
import { Skeleton } from "@/components/ui/skeleton";

export const SessionFeaturedProducts = () => {
  return (
    <section className="mx-auto max-w-7xl  pt-10">
      <Suspense fallback={<SkeletonFeaturedCarousel />}>
        <FeaturedProductsContent />
      </Suspense>
    </section>
  );
};

const FeaturedProductsContent = async () => {
  const response = await getFeaturedProducts();
  const data = response.data;

  if (!data || data.length === 0) return null;

  return <FeaturedCarousel items={data} />;
};

const SkeletonFeaturedCarousel = () => {
  return (
    <div className="w-full py-6">
      <Skeleton className="h-[400px] sm:h-[480px] w-full rounded-2xl" />
    </div>
  );
};
