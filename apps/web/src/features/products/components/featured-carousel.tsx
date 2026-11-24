"index";
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { buttonVariants } from "@/components/ui/button";
import { FeaturedProduct } from "../types";

interface FeaturedCarouselProps {
  items: FeaturedProduct[];
}

export const FeaturedCarousel = ({ items }: FeaturedCarouselProps) => {
  // Plugin de autoplay configurado para mudar de slide a cada 5 segundos
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {items.map((feat) => (
          <CarouselItem key={feat.id}>
            <div className="relative overflow-hidden bg-card text-card-foreground shadow-sm rounded-lg">
              {/* Imagem de Fundo (Backdrop) com overlay escuro para contraste */}
              <div className="hidden md:block absolute inset-0 z-0">
                <Image
                  src={feat.bannerDesktop}
                  alt={feat.title}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-center brightness-50 transition-transform duration-1000 hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-night/90 via-night/40 to-transparent" />
              </div>

              <div className="md:hidden absolute inset-0 z-0">
                <Image
                  src={feat.bannerMobile}
                  alt={feat.title}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-center brightness-50 transition-transform duration-1000 hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-night/90 via-night/40 to-transparent" />
              </div>

              {/* Conteúdo do Banner */}
              <div className="relative z-10 flex flex-col justify-end min-h-[400px] sm:min-h-[480px] p-6 sm:p-10 md:p-12">
                {/* Badge de Destaque / Subtítulo */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
                    {/* <Sparkles className="h-3.5 w-3.5" /> */}
                    {feat.subtitle}
                  </span>
                </div>

                {/* Título Principal */}
                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-2">
                  {feat.title} -{" "}
                  <span className="text-primary">{feat.product.name}</span>
                </h2>

                {/* Descrição */}
                <p className="max-w-2xl text-sm sm:text-base text-zinc-300 line-clamp-2 mb-6">
                  {feat.description}
                </p>

                {/* Especificações Técnicas em Chips */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  {feat.product.specs.map((spec, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg bg-black/40 px-3 py-1.5 text-xs backdrop-blur-md border border-white/10"
                    >
                      <span className="text-zinc-400 mr-1.5">
                        {spec.label}:
                      </span>
                      <span className="font-semibold text-white">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Ações / Link de Detalhes */}
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href={`/system/product/${feat.product.slug}`}
                    className={buttonVariants({ size: "lg" })}
                  >
                    Ver Detalhes
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>

                  <div className="text-sm font-medium text-white/80">
                    Ganhe até{" "}
                    <span className="text-primary font-bold text-base">
                      {feat.product.earning}
                    </span>{" "}
                    por venda
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Setas de navegação discretas */}
      <CarouselPrevious variant={"hero"} className="left-4 backdrop-blur-md" />
      <CarouselNext variant={"hero"} className="right-4 backdrop-blur-md" />
    </Carousel>
  );
};
