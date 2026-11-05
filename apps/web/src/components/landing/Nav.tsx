"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogoMark } from "../logo-mark";
import { SIGNUP_URL } from "./constants";
import { useScrollFrame } from "./Parallax";

const links = [
  { href: "#como-funciona", label: "Como Funciona" },
  { href: "#envio-e-compra", label: "Vantagens" },
  { href: "#comissoes", label: "Estatísticas" },
  { href: "#perguntas", label: "FAQ" },
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

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open
          ? "bg-white/95 backdrop-blur-md border-b border-black/8 py-4 shadow-sm"
          : "bg-transparent py-6",
      )}
    >
      <span
        ref={bar}
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-primary"
      />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
        {/* Logo */}
        <a
          href="#topo"
          aria-label="Bisno, início"
          className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <LogoMark className="h-7 w-auto" />
          <span
            className={cn(
              "font-display text-lg font-bold tracking-[0.12em] transition-colors duration-500",
              scrolled || open ? "text-foreground" : "text-white",
            )}
          >
            Bisno
          </span>
        </a>

        {/* Links desktop */}
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm font-medium transition-colors duration-300",
                scrolled || open
                  ? "text-foreground/70 hover:text-foreground"
                  : "text-white/70 hover:text-white",
              )}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA desktop */}
        <div className="hidden lg:block">
          <Button
            asChild
            variant={scrolled ? "hero" : "outline"}
            size="default"
            className={cn(
              "rounded-full px-6 transition-all duration-300",
              !scrolled &&
                "border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white",
            )}
          >
            <a href={SIGNUP_URL}>
              Entrar <span aria-hidden>→</span>
            </a>
          </Button>
        </div>

        {/* Hambúrguer mobile */}
        <button
          className={cn(
            "flex size-10 items-center justify-center rounded-full border backdrop-blur-md lg:hidden transition-colors",
            scrolled || open
              ? "border-black/10 bg-black/5 text-foreground hover:bg-black/10"
              : "border-white/20 bg-white/5 text-white hover:bg-white/10",
          )}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          type="button"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {/* Menu mobile */}
      <div
        className={cn(
          "grid transition-all duration-500 lg:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <nav className="flex flex-col border-t border-black/10 bg-white px-6 pb-6 pt-4">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-black/8 py-4 text-base font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                <span>{l.label}</span>
                <span className="font-mono text-xs text-primary/80">
                  0{i + 1}
                </span>
              </a>
            ))}
            <Button
              asChild
              variant="hero"
              size="lg"
              className="mt-6 w-full rounded-full"
            >
              <a href={SIGNUP_URL} onClick={() => setOpen(false)}>
                Entrar →
              </a>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
