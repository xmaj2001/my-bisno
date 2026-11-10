"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ProductDetailsGalleryProps {
  gallery: string[];
  productName: string;
  downloadImage?: boolean;
}

export const ProductDetailsGallery = ({
  gallery,
  productName,
  downloadImage = false,
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
        <Button
          variant={"ghost"}
          size={"icon"}
          className={cn(
            "absolute z-40 m-4 right-1 text-white shadow",
            !downloadImage ? "hidden" : "",
          )}
        >
          <Download />
        </Button>
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
                  : "border-transparent opacity-60 hover:opacity-100",
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
