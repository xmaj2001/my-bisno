import { ArrowUpRight, BadgePercent, Package, Share2 } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/Logo";
import type { Dictionary } from "@/i18n/get-dictionary";

interface AuthShellProps {
  lang: string;
  translations: Dictionary["auth"];
  children: ReactNode;
}

const stepIcons = [Package, Share2, BadgePercent] as const;

export function AuthShell({ lang, translations, children }: AuthShellProps) {
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

      <section className="mx-auto grid max-w-7xl overflow-hidden rounded-2xl border bg-card shadow-xl lg:min-h-[680px] lg:grid-cols-2">
        <aside
          className="relative flex min-h-80 flex-col justify-end overflow-hidden bg-cover bg-center p-7 text-white sm:p-10 lg:min-h-full lg:p-12"
          style={{ backgroundImage: "url('/hero-night-doorway.jpg')" }}
        >
          <div className="absolute inset-0 bg-linear-to-br from-black/85 via-black/70 to-primary/45" />
          <div className="relative z-10 max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {translations.panelEyebrow}
            </p>
            <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              {translations.panelTitle}
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
              {translations.panelDescription}
            </p>
            <ol className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {translations.steps.map((step, index) => {
                const Icon = stepIcons[index];
                return (
                  <li
                    key={step}
                    className="flex items-center gap-3 border border-white/15 bg-black/20 p-3 backdrop-blur-sm"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                      <Icon className="size-4" />
                    </span>
                    <span className="text-sm font-medium">{step}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        </aside>

        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-lg">{children}</div>
        </div>
      </section>
    </main>
  );
}
