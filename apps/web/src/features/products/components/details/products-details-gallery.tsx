"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductDetailsGalleryProps {
  gallery: string[];
  productName: string;
}

export const ProductDetailsGallery = ({
  gallery,
  productName,
}: ProductDetailsGalleryProps) => {
  const [selectedImg, setSelectedImg] = useState(0);

  if (!gallery || gallery.length === 0) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-xl border bg-muted text-muted-foreground">
        Sem imagem disponível
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Imagem Principal */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl border bg-card shadow-sm">
        <Image
          src={gallery[selectedImg]}
          alt={productName}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-all duration-300"
        />
      </div>

      {/* Miniaturas / Thumbs */}
      {gallery.length > 1 && (
        <div className="grid grid-cols-5 gap-2.5">
          {gallery.map((imgUrl, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImg(index)}
              className={cn(
                "relative aspect-square w-full overflow-hidden rounded-lg border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                index === selectedImg
                  ? "border-primary ring-2 ring-primary/20 opacity-100"
                  : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={imgUrl}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                sizes="100px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};