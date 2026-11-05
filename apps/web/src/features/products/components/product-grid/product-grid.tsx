import { Suspense } from "react";
import { ProductGridContent } from "./product-grid-content";
import { ProductGridSkeleton } from "./product-grid-skeleton";

interface ProductGridProps {
  dictionary: {
    title: string;
    description: string;
    featuredCarousel: string;
    addToCart: string;
    addingToCart: string;
    addedToCart: string;
    inStock: string;
    outOfStock: string;
    price: string;
  };
}

export function ProductGrid({ dictionary }: ProductGridProps) {
  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <ProductGridContent dictionary={dictionary} />
    </Suspense>
  );
}
