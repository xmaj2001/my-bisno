"use client";

import {
  ArrowDown,
  ArrowRight,
  Menu,
  X,
  Sparkles,
  Package,
  Percent,
  BarChart3,
  HelpCircle,
  CircleQuestionMark,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SIGNUP_URL } from "./constants";
import { Logo } from "./Logo";
import { useScrollFrame } from "./Parallax";
import { LogoMark } from "../logo-mark";

const links = [
  { href: "#como-funciona", label: "Como funciona", icon: CircleQuestionMark },
  { href: "#envio-e-compra", label: "Envio e compra", icon: Package },
  { href: "#comissoes", label: "Comissões", icon: Percent },
  { href: "#estatisticas", label: "Estatísticas", icon: BarChart3 },
  { href: "#perguntas", label: "Perguntas", icon: HelpCircle },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useScrollFrame((y) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (bar.current)
      bar.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  });

  const isScrolledOrOpen = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        isScrolledOrOpen
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-4 shadow-sm"
          : "theme-dark bg-transparent py-6",
      )}
    >
      <span
        ref={bar}
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-primary"
      />
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
        <a
          href="#topo"
          aria-label="Bisno, início"
          className="transition-opacity hover:opacity-80 flex items-center gap-2"
        >
          {/* Garante que as cores da logo se adaptam perfeitamente quando o fundo fica branco */}
          <div
            className={cn(
              "transition-colors duration-300 inline-flex items-center gap-3",
              isScrolledOrOpen ? "text-slate-900" : "text-white",
            )}
          >
            <LogoMark className="h-8 w-auto" />
            <span
              className={cn(
                "font-display text-xl tracking-[0.2em] text-foreground",
                isScrolledOrOpen ? "text-slate-900" : "text-white",
              )}
            >
              BISNO
            </span>
          </div>
        </a>

        {/* Links de navegação com ícones Lucide */}
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => {
            const Icon = l.icon;
            return (
              <a
                key={l.href}
                href={l.href}
                className={cn(
                  "group relative flex items-center gap-2 py-1 text-sm font-medium transition-colors duration-300",
                  isScrolledOrOpen
                    ? "text-slate-600 hover:text-slate-900"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="size-4 text-primary transition-transform duration-300 group-hover:scale-110" />
                <span>{l.label}</span>
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-right scale-x-0 bg-primary transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
              </a>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button
            asChild
            variant="hero"
            size="default"
            className="rounded-[10px] shadow-md shadow-primary/20 hover:shadow-primary/40 transition-all duration-300"
          >
            <a href={SIGNUP_URL}>Quero ser afiliado</a>
          </Button>
        </div>

        <button
          className={cn(
            "flex size-10 items-center justify-center rounded-xl border backdrop-blur-md lg:hidden transition-colors",
            isScrolledOrOpen
              ? "border-slate-200 bg-slate-100 text-slate-800"
              : "border-border/60 bg-background/20 text-foreground",
          )}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Menu Mobile */}
      <div
        className={cn(
          "grid transition-all duration-500 lg:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <nav className="mt-4 flex flex-col border-t border-slate-200 bg-white px-6 pb-6 shadow-xl">
            {links.map((l, i) => {
              const Icon = l.icon;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-slate-100 py-4 text-base font-medium text-slate-800 transition-colors hover:text-primary"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="size-5 text-primary" />
                    <span>{l.label}</span>
                  </div>
                  <span className="text-xs font-mono text-primary">
                    0{i + 1}
                  </span>
                </a>
              );
            })}
            <Button
              asChild
              variant="hero"
              size="lg"
              className="mt-6 w-full rounded-xl shadow-lg shadow-primary/20"
            >
              <a href={SIGNUP_URL} onClick={() => setOpen(false)}>
                Quero ser afiliado
              </a>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}

const steps = ["Escolhe", "Partilha", "A loja vende", "Tu ganhas"];

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
          className="animate-dust absolute bottom-0 block bg-glow opacity-60"
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
      className="theme-dark grain relative flex min-h-[100svh] overflow-hidden items-end"
    >
      {/* Imagem de Fundo com Parallax */}
      <div ref={img} data-parallax className="absolute inset-0 scale-[1.08]">
        <img
          src={"/hero-night-doorway.jpg"}
          alt="À noite, uma jovem caminha com o telemóvel na mão em direção a portas iluminadas"
          width={1920}
          height={1080}
          className="animate-fade h-full w-full object-cover object-[70%_center]"
        />
      </div>

      {/* Camadas de Overlay Gradientes */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent lg:max-w-4xl" />
      <div className="absolute inset-0 bg-black/50 lg:hidden" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

      <Dust />

      {/* Conteúdo Principal */}
      <div
        ref={content}
        className="relative mx-auto flex w-full max-w-7xl flex-col justify-end px-6 pb-16 pt-36 lg:px-12 lg:pb-20 z-10"
      >
        <div
          className="animate-line-up mb-6 inline-flex items-center gap-2.5 self-start rounded-full border border-border/60 bg-background/40 px-4 py-1.5 text-xs font-medium tracking-wide text-muted-foreground backdrop-blur-md"
          style={{ animationDelay: "200ms" }}
        >
          <span className="size-2 rounded-full bg-primary animate-pulse" />
          Plataforma angolana de afiliados
        </div>

        <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-7xl leading-[1.05]">
          <span className="block overflow-hidden pb-1">
            <span
              className="animate-line-up block"
              style={{ animationDelay: "350ms" }}
            >
              Divulga produtos.
            </span>
          </span>
          <span className="block overflow-hidden pt-1">
            <span
              className="animate-line-up block text-primary"
              style={{ animationDelay: "520ms" }}
            >
              Ganha comissões.
            </span>
          </span>
        </h1>

        <span
          className="animate-draw my-8 block h-px w-full max-w-2xl bg-border/60"
          style={{ animationDelay: "800ms" }}
        />

        <div className="grid gap-8 md:grid-cols-[1fr_1.5fr] lg:grid-cols-[1fr_1.4fr_auto] lg:items-end">
          <ul className="flex flex-wrap gap-x-6 gap-y-2.5 md:flex-col">
            {steps.map((w, i) => (
              <li
                key={w}
                className={cn(
                  "animate-rise flex items-center gap-3 text-xs font-semibold uppercase tracking-wider",
                  i === steps.length - 1
                    ? "text-primary"
                    : "text-muted-foreground/80",
                )}
                style={{ animationDelay: `${900 + i * 120}ms` }}
              >
                <span className="hidden size-1.5 rounded-full bg-primary/80 md:block" />
                <span className="font-mono text-[10px] opacity-60">
                  0{i + 1}
                </span>
                {w}
              </li>
            ))}
          </ul>

          <p
            className="animate-rise max-w-lg text-base lg:text-lg leading-relaxed text-muted-foreground font-normal"
            style={{ animationDelay: "1100ms" }}
          >
            A Bisno é a plataforma angolana de afiliados. Escolhes produtos do
            catálogo, partilhas com o teu cupom exclusivo e a loja trata da
            venda, do pagamento e da entrega.
          </p>

          <div
            className="animate-rise flex flex-wrap gap-3.5 md:col-span-2 lg:col-span-1"
            style={{ animationDelay: "1300ms" }}
          >
            <Button
              asChild
              variant="hero"
              size="lg"
              className="rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
            >
              <a href={SIGNUP_URL}>
                Quero ser afiliado <ArrowRight className="size-4 ml-1.5" />
              </a>
            </Button>
            <Button asChild variant="line" size="lg" className="rounded-xl">
              <a href="#envio-e-compra">Ver como funciona</a>
            </Button>
          </div>
        </div>

        <div className="mt-14 flex items-end justify-between border-t border-border/30 pt-6 text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-muted-foreground/70">
              Luanda, Angola
            </span>
          </div>
          <a
            href="#catalogo"
            className="group flex items-center gap-3 text-xs uppercase tracking-wider transition-colors hover:text-foreground"
          >
            <span className="text-muted-foreground/80 group-hover:text-foreground">
              Descer
            </span>
            <span className="flex size-9 items-center justify-center rounded-xl border border-border/60 bg-background/20 backdrop-blur-sm transition-all group-hover:border-primary group-hover:bg-primary/10">
              <ArrowDown className="animate-float size-4 text-primary" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
