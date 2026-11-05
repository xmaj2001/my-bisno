"use client";

import { Check, Loader2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { useNetworkStatus } from "@/providers/network-provider";
import { addToCartAction } from "../../interactions";
import type { Product } from "../../types";

interface ProductItemProps {
  product: Product;
  dictionary: {
    addToCart: string;
    addingToCart: string;
    addedToCart: string;
    inStock: string;
    outOfStock: string;
    price: string;
  };
}

export function ProductItem({ product, dictionary }: ProductItemProps) {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const { isOnline } = useNetworkStatus();

  const handleAddToCart = () => {
    if (!isOnline || !product.inStock) return;

    startTransition(async () => {
      const res = await addToCartAction({
        productId: product.id,
        quantity: 1,
      });

      if (res.success) {
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 2000);
      }
    });
  };

  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 rounded-full px-2.5 py-0.5 text-xs font-semibold backdrop-blur-md bg-background/80 text-foreground border border-border">
          {product.category}
        </div>
      </div>

      <div className="mt-4 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg leading-snug text-foreground">
            {product.name}
          </h3>
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        <div>
          <span className="text-xs text-muted-foreground">
            {product.inStock ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                {dictionary.inStock}
              </span>
            ) : (
              <span className="text-destructive font-medium">
                {dictionary.outOfStock}
              </span>
            )}
          </span>
          <p className="text-lg font-bold text-foreground">
            €{product.price.toFixed(2)}
          </p>
        </div>

        <Button
          size="sm"
          disabled={!product.inStock || isPending || !isOnline}
          onClick={handleAddToCart}
          className="gap-2"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>{dictionary.addingToCart}</span>
            </>
          ) : isSuccess ? (
            <>
              <Check className="h-4 w-4 text-emerald-400" />
              <span>{dictionary.addedToCart}</span>
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" />
              <span>{dictionary.addToCart}</span>
            </>
          )}
        </Button>
      </div>
    </article>
  );
}
