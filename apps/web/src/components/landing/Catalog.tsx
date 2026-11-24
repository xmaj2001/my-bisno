"use client";

import { Check, Plus, Ticket } from "lucide-react";
import { useState } from "react";
import headphones from "@/assets/product-headphones.jpg";
import perfume from "@/assets/product-perfume.jpg";
import sneaker from "@/assets/product-sneaker.jpg";
import { cn } from "@/lib/utils";
import { Parallax } from "../Parallax";
import { MaskedLines, Reveal } from "../Reveal";
import { SectionLabel } from "./SectionLabel";

const tabs = ["Em destaque", "Recomendados", "Novos", "Em alta"] as const;

const products = [
  {
    id: "aus",
    name: "Auscultadores sem fio",
    cat: "Eletrónica",
    pct: 10,
    img: headphones,
    code: "AUS",
  },
  {
    id: "per",
    name: "Perfume âmbar",
    cat: "Beleza",
    pct: 5,
    img: perfume,
    code: "PER",
  },
  {
    id: "ten",
    name: "Ténis casual",
    cat: "Moda",
    pct: 2,
    img: sneaker,
    code: "TEN",
  },
];

const orderByTab: Record<(typeof tabs)[number], string[]> = {
  "Em destaque": ["aus", "per", "ten"],
  Recomendados: ["per", "ten", "aus"],
  Novos: ["ten", "aus", "per"],
  "Em alta": ["aus", "ten", "per"],
};

export function Catalog() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Em destaque");
  const [stock, setStock] = useState<Record<string, boolean>>({});
  const list = orderByTab[tab].map((id) => products.find((p) => p.id === id)!);

  return (
    <section
      id="catalogo"
      className="theme-light relative overflow-hidden py-24 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionLabel n="01">O que é a Bisno</SectionLabel>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <MaskedLines
            className="text-4xl font-extrabold uppercase leading-[0.98] sm:text-5xl lg:text-6xl"
            lines={[
              "Um catálogo de",
              "produtos de lojas,",
              "pronto para divulgares.",
            ]}
            lineClassName={(i) => (i === 2 ? "text-primary" : undefined)}
          />
          <Reveal delay={200}>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Quem entra na Bisno vê logo o catálogo, organizado em produtos em
              destaque, recomendados, novos e em alta. Escolhes os que queres
              divulgar e adicionas ao teu estoque. Nesse momento é criado um
              cupom só teu para aquele produto.
            </p>
          </Reveal>
        </div>

        <Reveal delay={100} className="mt-16">
          <div className="border border-foreground/90">
            <div className="flex flex-col justify-between gap-px border-b border-foreground/90 sm:flex-row sm:items-stretch">
              <div className="grid grid-cols-2 sm:flex">
                {tabs.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={cn(
                      "relative px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] transition-colors duration-500 sm:border-r sm:border-foreground/15",
                      t === tab
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <p className="hidden items-center px-5 text-xs text-muted-foreground lg:flex">
                Produtos e comissões meramente ilustrativos
              </p>
            </div>

            <div className="grid sm:grid-cols-3">
              {list.map((p, i) => {
                const added = !!stock[p.id];
                return (
                  <article
                    key={`${tab}-${p.id}`}
                    className={cn(
                      "animate-rise group flex flex-col border-foreground/15",
                      i > 0 && "border-t sm:border-l sm:border-t-0",
                    )}
                    style={{ animationDelay: `${i * 90}ms` }}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted sm:aspect-square">
                      <Parallax speed={-0.08} scale={1.18} className="h-full">
                        <img
                          src={typeof p.img === "string" ? p.img : p.img.src}
                          alt={p.name}
                          loading="lazy"
                          width={816}
                          height={816}
                          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                        />
                      </Parallax>
                      <span className="theme-dark absolute left-0 top-0 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em]">
                        <span className="text-primary">{p.pct}%</span> comissão
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="eyebrow text-[0.6rem] text-muted-foreground">
                        {p.cat}
                      </p>
                      <h3 className="mt-2 text-lg font-bold">{p.name}</h3>
                      <button
                        onClick={() =>
                          setStock((s) => ({ ...s, [p.id]: !s[p.id] }))
                        }
                        className={cn(
                          "mt-5 flex w-full items-center justify-center gap-2 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition-colors duration-500",
                          added
                            ? "bg-primary text-primary-foreground"
                            : "border border-foreground text-foreground hover:bg-foreground hover:text-background",
                        )}
                      >
                        {added ? (
                          <Check className="size-3.5" />
                        ) : (
                          <Plus className="size-3.5" />
                        )}
                        {added ? "No teu estoque" : "Adicionar ao estoque"}
                      </button>
                      <div
                        className={cn(
                          "grid transition-all duration-500",
                          added
                            ? "mt-3 grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0",
                        )}
                      >
                        <div className="overflow-hidden">
                          <div className="flex items-center gap-2 border border-dashed border-primary px-3 py-2 text-xs">
                            <Ticket className="size-3.5 text-primary" />
                            <span className="text-muted-foreground">
                              Cupom:
                            </span>
                            <span className="font-mono font-semibold text-primary">
                              {p.code}-ANA27
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Experimenta: adiciona um produto ao estoque.{" "}
            <span className="lg:hidden">
              Produtos e comissões meramente ilustrativos.
            </span>
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-14">
          <div className="grid gap-6 border-l-4 border-primary pl-6 md:grid-cols-[auto_1fr] md:items-baseline md:gap-12">
            <p className="eyebrow text-primary">Lojas</p>
            <p className="max-w-3xl text-lg leading-relaxed">
              Nesta primeira fase, os produtos vêm da loja da própria Bisno.
              Mais tarde, outras lojas serão cadastradas pelos administradores e
              vão publicar os seus próprios produtos no catálogo.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
