"use client";

import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { SIGNUP_URL } from "./constants";
import { useScrollFrame } from "./Parallax";

export function Hero() {
  const img = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useScrollFrame((y, vh) => {
    if (y > vh * 1.2) return;
    if (img.current)
      img.current.style.transform = `translate3d(0, ${y * 0.35}px, 0) scale(1.08)`;
    if (content.current) {
      content.current.style.transform = `translate3d(0, ${y * 0.1}px, 0)`;
      content.current.style.opacity = String(Math.max(0, 1 - y / (vh * 0.75)));
    }
  });

  return (
    <section
      id="topo"
      className="theme-dark relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Imagem de fundo com parallax */}
      <div ref={img} className="absolute inset-0 scale-[1.08]" aria-hidden>
        <img
          src="/hero-night-doorway.jpg"
          alt="À noite, uma jovem caminha com o telemóvel na mão em direção a portas iluminadas"
          width={1920}
          height={1080}
          className="animate-fade h-full w-full object-cover object-[65%_center]"
        />
      </div>

      {/* Overlay escuro gradiente — replica o estilo da referência */}
      <div className="absolute inset-0 bg-gradient-to-r from-night/65 via-night/30 to-night/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-night/8 via-transparent to-transparent" />

      {/* Conteúdo */}
      <div
        ref={content}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pb-24 pt-36 lg:px-12 lg:pb-32"
      >
        {/* Título */}
        <h1 className="max-w-2xl font-display text-5xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
          <span
            className="animate-line-up block overflow-hidden"
            style={{ animationDelay: "200ms" }}
          >
            Bisno
          </span>
          <span
            className="animate-line-up block overflow-hidden pt-1"
            style={{ animationDelay: "350ms" }}
          >
            Divulga produtos.
          </span>
          <span
            className="animate-line-up block overflow-hidden pt-1"
            style={{ animationDelay: "500ms" }}
          >
            <span className="text-primary">Ganha</span> comissões.
          </span>
        </h1>

        {/* Subtítulo */}
        <p
          className="animate-rise mt-8 max-w-sm text-base leading-relaxed text-white/60"
          style={{ animationDelay: "750ms" }}
        >
          A plataforma angolana de afiliados, conectando afiliados, clientes e
          lojas.
        </p>

        {/* CTA */}
        <div className="animate-rise mt-10" style={{ animationDelay: "950ms" }}>
          <Button
            asChild
            variant="hero"
            size="lg"
            className="rounded-full px-8"
          >
            <a href={SIGNUP_URL}>
              Iniciar Sessão <ArrowRight className="ml-1 size-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
