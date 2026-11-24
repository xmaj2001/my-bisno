import { ArrowUpRight, BadgePercent, Package, Share2 } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/Logo";
import type { Dictionary } from "@/i18n/get-dictionary";

interface AuthShellProps {
  lang: string;
  translations: Dictionary["auth"];
  children: ReactNode;
  isLogin?: boolean;
}

const stepIcons = [Package, Share2, BadgePercent] as const;

export function AuthShell({
  lang,
  translations,
  isLogin = false,
  children,
}: AuthShellProps) {
  return (
    <main className="min-h-svh bg-muted/30 px-4 py-5 sm:px-6 sm:py-8">
      <header className="mx-auto flex max-w-7xl items-center justify-between pb-5">
        <Link href={`/${lang}`} aria-label="Bisno">
          <Logo />
        </Link>
        <Link
          href={`/${lang}`}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {translations.home}
          <ArrowUpRight className="size-4" />
        </Link>
      </header>

      <section className="mx-auto grid max-w-7xl overflow-hidden rounded-lg border bg-card shadow-xl lg:min-h-[680px] lg:grid-cols-2">
        <aside
          className="relative flex md:min-h-80 flex-col justify-end overflow-hidden bg-cover bg-center p-7 text-white sm:p-10 lg:min-h-full lg:p-12"
          style={{
            backgroundImage: `${isLogin ? "url('/hero-night-doorway.jpg')" : "url('/landing/stats.jpeg')"}`,
          }}
        >
          <div className="absolute inset-0 bg-linear-to-br from-black/85 via-black/70 to-primary/45" />
          <div className="relative z-10 max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {translations.panelEyebrow}
            </p>
            <h1 className="mt-5 text-lg md:text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              {translations.panelTitle}
            </h1>
            <p className="hidden md:block mt-5 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
              {translations.panelDescription}
            </p>
          </div>
        </aside>

        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-lg">{children}</div>
        </div>
      </section>
    </main>
  );
}
