"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Search, ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "./logo-mark";
import type { Locale } from "@/i18n/config";

interface NavBarProps {
  lang: Locale;
}

export function ProductNavbar({ lang }: NavBarProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-12 h-16 gap-4">
        {/* Logo & Marca */}
        <div className="flex items-center gap-8">
          <Link
            href={`/${lang}`}
            aria-label="Bisno, início"
            className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-80"
          >
            <LogoMark className="h-6 w-auto" />
            <span className="font-display text-lg font-bold tracking-[0.12em]">
              Bisno
            </span>
          </Link>

          {/* Links de Navegação Interna do Catálogo com prefixo de idioma */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href={`/${lang}/products`}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === `/${lang}/products`
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              Todos os Produtos
            </Link>
            <Link
              href={`/${lang}/products?filter=recommended`}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Recomendados
            </Link>
            <Link
              href={`/${lang}/products?sort=new`}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Novidades
            </Link>
          </nav>
        </div>

        {/* Barra de Pesquisa Rápida */}
        <div className="hidden lg:flex items-center relative max-w-xs w-full">
          <Search className="absolute left-3 size-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Pesquisar produtos..."
            className="w-full rounded-full border bg-muted/50 px-4 py-2 pl-9 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
          />
        </div>

        {/* Ações do Utilizador (Favoritos, Carrinho, Conta com lang) */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full relative"
            asChild
          >
            <Link href={`/${lang}/products/favorites`} aria-label="Favoritos">
              <Heart className="size-5" />
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full relative"
            asChild
          >
            <Link href={`/${lang}/cart`} aria-label="Carrinho ou Vendas">
              <ShoppingBag className="size-5" />
            </Link>
          </Button>

          {/* Botão de Perfil / Acesso à Conta */}
          <Button
            asChild
            variant="hero"
            size="sm"
            className="rounded-full gap-2 hidden sm:inline-flex"
          >
            <Link href={`/${lang}/auth/login`}>
              <User className="size-4" />
              <span>Minha Conta</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
