import { Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { formatKz } from "@/lib/utils";
import type { Product } from "../../types";

interface ProductItemProps {
  product: Product;
}

export const ProductItem = ({ product }: ProductItemProps) => {
  const liked = false;
  const p = product;

  return (
    <Link
      href={`/products/${p.slug}`}
      className="group relative flex h-full w-full min-w-0 flex-col overflow-hidden rounded-md border bg-card transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-soft"
    >
      {/* Wrapper com proporção fixa: é ele que define o tamanho */}
      <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden bg-secondary">
        <Image
          src={p.image}
          alt={p.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <button
          type="button"
          aria-label="Favorito"
          className="absolute right-2 top-2 z-10 grid h-7 w-7 place-items-center rounded-md bg-card/90 backdrop-blur transition hover:scale-110"
        >
          <Heart
            className={`h-3.5 w-3.5 transition ${liked ? "fill-destructive text-destructive" : ""}`}
          />
        </button>

        <div className="absolute inset-x-2 bottom-2 z-10 flex items-center justify-between gap-2 rounded-md bg-neutral-900 px-2.5 py-1.5 text-deep-foreground">
          <span className="text-[10px] uppercase tracking-wider opacity-70">
            Ganhe
          </span>
          <span className="whitespace-nowrap text-xs font-semibold text-primary">
            <span className="text-zinc-300">Até </span>
            <span className="text-[15px]">{formatKz(p.earning)}</span>
            <span className="text-zinc-300"> /venda</span>
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="line-clamp-1 text-sm font-medium">{p.name}</h3>
        <div className="mt-auto flex items-center justify-between pt-1">
          <span className="font-display text-sm font-semibold">
            {formatKz(p.price)}
          </span>
          <span className="flex items-center gap-0.5 text-[11px] text-muted-foreground">
            <Star className="h-3 w-3 fill-chart-4 text-chart-4" />
            4/4
          </span>
        </div>
      </div>
    </Link>
  );
};

export const ProducttItemSkeleton = () => {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-full w-full min-w-0 flex-col overflow-hidden rounded-md border bg-card"
    >
      {/* Mesmo wrapper do card real */}
      <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden">
        <Skeleton className="absolute inset-0 rounded-none" />

        {/* Botão de favorito */}
        <Skeleton className="absolute right-2 top-2 h-7 w-7 rounded-md" />

        {/* Badge "Ganhe até" */}
        <div className="absolute inset-x-2 bottom-2 flex h-8 items-center justify-between gap-2 rounded-md bg-neutral-900 px-2.5">
          <Skeleton className="h-3 w-8 bg-zinc-700" />
          <Skeleton className="h-4 w-20 bg-zinc-700" />
        </div>
      </div>

      {/* Info: mesmas medidas do card real */}
      <div className="flex flex-1 flex-col gap-1 p-3">
        <Skeleton className="h-5 w-4/5" />
        <div className="mt-auto flex items-center justify-between pt-1">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-4 w-8" />
        </div>
      </div>
    </div>
  );
};
