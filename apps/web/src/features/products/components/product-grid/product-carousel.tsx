"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Product } from "../../types";

interface ProductCarouselProps {
  products: Product[];
  title: string;
}

export function ProductCarousel({ products, title }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (products.length === 0) return null;

  const currentProduct = products[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            aria-label="Previous product"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            aria-label="Next product"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <div className="relative aspect-video w-full flex-1 overflow-hidden rounded-xl bg-muted md:h-64">
          <Image
            src={currentProduct.imageUrl}
            alt={currentProduct.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-all duration-500"
            priority
          />
        </div>
        <div className="flex flex-1 flex-col justify-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {currentProduct.category}
          </span>
          <h4 className="mt-1 text-2xl font-bold text-foreground">
            {currentProduct.name}
          </h4>
          <p className="mt-2 text-muted-foreground">
            {currentProduct.description}
          </p>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-foreground">
              €{currentProduct.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
