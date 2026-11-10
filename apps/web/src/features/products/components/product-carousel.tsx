import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductItem, ProducttItemSkeleton } from "./product-item";
import { Product } from "../types";

interface ProductCarouselProps {
  items: Product[];
  isLoading?: boolean;
}

const CAROUSEL_SKELETON_KEYS = [
  "c-skeleton-1",
  "c-skeleton-2",
  "c-skeleton-3",
  "c-skeleton-4",
];

export const ProductCarousel = ({ items, isLoading }: ProductCarouselProps) => {
  return (
    <div className="relative mt-8 sm:px-0">
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-3">
          {items.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-3 basis-1/2 sm:basis-1/3 lg:basis-1/4"
            >
              <div className="h-full">
                <ProductItem product={product} />
              </div>
            </CarouselItem>
          ))}

          {/* Renderiza skeletons adicionais se estiver a carregar */}
          {isLoading &&
            CAROUSEL_SKELETON_KEYS.map((id) => (
              <CarouselItem
                key={id}
                className="pl-3 basis-1/2 sm:basis-1/3 lg:basis-1/4"
              >
                <div className="h-full">
                  <ProducttItemSkeleton />
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>

        {/* Botões de navegação (aparecem nas laterais em ecrãs maiores) */}
        <CarouselPrevious
          variant={"hero"}
          className="-left-6 hidden sm:inline-flex"
        />
        <CarouselNext
          variant={"hero"}
          className="-right-6 hidden sm:inline-flex"
        />
      </Carousel>
    </div>
  );
};

export const SkeletonProductCarousel = ({ count = 4 }: { count?: number }) => {
  return (
    <div className="relative mt-8 px-4 sm:px-0">
      <Carousel className="w-full">
        <CarouselContent className="-ml-3">
          {CAROUSEL_SKELETON_KEYS.slice(0, count).map((id) => (
            <CarouselItem
              key={id}
              className="pl-3 basis-1/2 sm:basis-1/3 lg:basis-1/4"
            >
              <div className="h-full">
                <ProducttItemSkeleton />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
