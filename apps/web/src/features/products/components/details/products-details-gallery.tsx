"use client";

import { Download } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductDetailsGalleryProps {
  gallery: string[];
  productName: string;
  downloadImage?: boolean;
  downloadImageLabel?: string;
  downloadImageSuccess?: string;
  downloadImageError?: string;
}

export const ProductDetailsGallery = ({
  gallery,
  productName,
  downloadImage = false,
  downloadImageLabel,
  downloadImageSuccess,
  downloadImageError,
}: ProductDetailsGalleryProps) => {
  const [selectedImg, setSelectedImg] = useState(0);

  const handleDownload = async () => {
    try {
      const response = await fetch(gallery[selectedImg]);
      if (!response.ok) {
        throw new Error(`Image download failed: ${response.status}`);
      }

      const image = await response.blob();
      const objectUrl = URL.createObjectURL(image);
      const link = document.createElement("a");
      link.href = objectUrl;
      const extension = image.type.split("/")[1]?.split("+")[0] || "jpg";
      link.download = `${
        productName
          .trim()
          .replace(/[^a-z0-9]+/gi, "-")
          .replace(/^-|-$/g, "") || "product"
      }-${selectedImg + 1}.${extension}`;
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
      if (downloadImageSuccess) toast.success(downloadImageSuccess);
    } catch (error) {
      console.error("Could not download product image.", error);
      if (downloadImageError) toast.error(downloadImageError);
    }
  };

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
        {downloadImage && (
          <Button
            type="button"
            onClick={handleDownload}
            className="absolute bottom-4 right-4 z-20 h-11 gap-2 rounded-full px-5 shadow-lg"
          >
            <Download />
            {downloadImageLabel}
          </Button>
        )}
      </div>

      {/* Miniaturas / Thumbs */}
      {gallery.length > 1 && (
        <div className="grid grid-cols-5 gap-2.5">
          {gallery.map((imgUrl, index) => (
            <button
              key={imgUrl}
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
