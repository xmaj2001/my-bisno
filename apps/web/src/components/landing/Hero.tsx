"use client";

import { ArrowDown, ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SIGNUP_URL } from "./constants";
import { useScrollFrame } from "./Parallax";

const words = ["Escolhe", "Partilha", "A loja vende", "Tu ganhas"];

function Dust() {
  const specks = Array.from({ length: 16 }, (_, i) => i);
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {specks.map((i) => (
        <span
          key={i}
          className="animate-dust absolute bottom-0 block bg-glow"
          style={{
            left: `${45 + ((i * 37) % 55)}%`,
            width: `${2 + (i % 2)}px`,
            height: `${2 + (i % 2)}px`,
            animationDuration: `${9 + (i % 7) * 2}s`,
            animationDelay: `${(i * 1.3) % 12}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const img = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useScrollFrame((y, vh) => {
    if (y > vh * 1.2) return;
    if (img.current)
      img.current.style.transform = `translate3d(0, ${y * 0.4}px, 0) scale(1.08)`;
    if (content.current) {
      content.current.style.transform = `translate3d(0, ${y * 0.12}px, 0)`;
      content.current.style.opacity = String(Math.max(0, 1 - y / (vh * 0.75)));
    }
  });

  return (
    <section
      id="topo"
      className="theme-dark grain relative flex min-h-[100svh] overflow-hidden"
    >
      <div ref={img} data-parallax className="absolute inset-0 scale-[1.08]">
        <img
          src={"/hero-night-doorway.jpg"}
          alt="À noite, uma jovem caminha com o telemóvel na mão em direção a portas iluminadas"
          width={1920}
          height={1080}
          className="animate-fade h-full w-full object-cover object-[70%_center]"
        />
      </div>
      <div className="bg-fade-left absolute inset-0" />
      <div className="absolute inset-0 bg-night/60 lg:hidden" />
      <div className="bg-fade-bottom absolute inset-0" />
      <Dust />

      <div
        ref={content}
        className="relative mx-auto flex w-full max-w-7xl flex-col justify-end px-6 pb-12 pt-36 lg:px-10 lg:pb-16"
      >
       
        {/* Título principal redimensionado para uma escala profissional e limpa */}
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.1]">
          <span className="block overflow-hidden">
            <span
              className="animate-line-up block"
              style={{ animationDelay: "350ms" }}
            >
              Divulga produtos.
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              className="animate-line-up block text-primary mt-1"
              style={{ animationDelay: "520ms" }}
            >
              Ganha comissões.
            </span>
          </span>
        </h1>

        <span
          className="animate-draw mt-8 block h-px w-full max-w-2xl bg-border/80"
          style={{ animationDelay: "800ms" }}
        />

        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_1.4fr] lg:grid-cols-[1fr_1.3fr_auto] lg:items-end">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 md:flex-col">
            {words.map((w, i) => (
              <li
                key={w}
                className={cn(
                  "animate-rise flex items-center gap-2.5 text-xs font-medium uppercase tracking-wider",
                  i === words.length - 1 ? "text-primary font-semibold" : "text-muted-foreground",
                )}
                style={{ animationDelay: `${900 + i * 120}ms` }}
              >
                <span className="hidden size-1 rounded-full bg-primary/80 md:block" />
                {w}
              </li>
            ))}
          </ul>
          
          <p
            className="animate-rise max-w-md text-base leading-relaxed text-muted-foreground/90 font-normal"
            style={{ animationDelay: "1100ms" }}
          >
            A Bisno é a plataforma angolana de afiliados. Escolhes produtos do
            catálogo, partilhas com o teu cupom exclusivo e a loja trata da
            venda, do pagamento e da entrega.
          </p>

          <div
            className="animate-rise flex flex-wrap gap-3 md:col-span-2 lg:col-span-1"
            style={{ animationDelay: "1300ms" }}
          >
            <Button asChild variant="hero" size="lg">
              <a href={SIGNUP_URL}>
                Quero ser afiliado <ArrowRight className="size-4 ml-1" />
              </a>
            </Button>
            <Button asChild variant="line" size="lg">
              <a href="#envio-e-compra">Ver como funciona</a>
            </Button>
          </div>
        </div>

        <div className="mt-14 flex items-end justify-between border-t border-border/40 pt-6 text-muted-foreground">
          <span className="text-xs uppercase tracking-widest text-muted-foreground/70">
            Luanda, Angola
          </span>
          <a
            href="#catalogo"
            className="group flex items-center gap-2.5 text-xs uppercase tracking-wider transition-colors hover:text-foreground"
          >
            <span>Descer</span>
            <span className="flex size-8 items-center justify-center border border-border/80 transition-colors group-hover:border-primary">
              <ArrowDown className="animate-float size-3.5" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}