"use client";

import { Ban, Package, Smartphone, Truck, UserX, Wallet } from "lucide-react";
import { useState } from "react";
import { commissionFor, formatKz } from "@/lib/commission";
import { cn } from "@/lib/utils";
import { Parallax } from "../Parallax";
import { MaskedLines, Reveal } from "../Reveal";
import { SectionLabel } from "./SectionLabel";
import { LogoMark } from "../logo-mark";

export function NoHassle() {
  const columns = [
    {
      title: "Para ti, afiliado",
      theme: "theme-dark",
      items: [
        { icon: Package, label: "Sem stock para gerir" },
        { icon: Wallet, label: "Sem receber pagamentos" },
        { icon: Truck, label: "Sem fazer entregas" },
      ],
    },
    {
      title: "Para o teu cliente",
      theme: "theme-light",
      items: [
        { icon: UserX, label: "Não precisa de criar conta" },
        { icon: Ban, label: "Não precisa de instalar nada" },
        { icon: Smartphone, label: "Só envia uma mensagem" },
      ],
    },
  ];
  return (
    <section className="theme-paper relative overflow-hidden py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionLabel n="04">Sem complicações</SectionLabel>
        <MaskedLines
          className="mt-10 max-w-4xl text-4xl font-extrabold uppercase leading-[0.98] sm:text-5xl lg:text-6xl"
          lines={["Tu divulgas.", "A loja trata do resto."]}
          lineClassName={(i) => (i === 1 ? "text-primary" : undefined)}
        />
        <div className="mt-16 grid md:grid-cols-2">
          {columns.map((col, ci) => (
            <Reveal key={col.title} delay={ci * 150} variant="wipe">
              <div
                className={cn(
                  col.theme,
                  "h-full border border-foreground/15 p-8 sm:p-12",
                  ci === 0 && "md:translate-y-10",
                )}
              >
                <p
                  className={cn(
                    "eyebrow",
                    ci == 1 ? "text-black" : "text-primary",
                  )}
                >
                  {col.title}
                </p>
                <ul className="mt-10">
                  {col.items.map((it, i) => (
                    <li
                      key={it.label}
                      className="group flex items-center gap-5 border-t border-border py-5 last:border-b"
                    >
                      <span className="font-wide text-xs font-bold text-muted-foreground">
                        0{i + 1}
                      </span>
                      <span className="flex size-11 shrink-0 rounded-xs items-center justify-center bg-primary text-primary-foreground transition-transform duration-500 group-hover:-rotate-6">
                        <it.icon className="size-5" />
                      </span>
                      <span className="text-lg font-medium">{it.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const examplePcts = [10, 5, 2];

export function Commission() {
  const [pct, setPct] = useState(10);
  const [value, setValue] = useState(25000);
  const result = commissionFor(value, pct);

  return (
    <section
      id="comissoes"
      className="theme-gold relative overflow-hidden py-24 lg:py-36"
    >
      <Parallax
        speed={-0.2}
        className="pointer-events-none absolute -left-16 bottom-0 h-[520px] w-[340px] opacity-[0.12]"
      >
        <LogoMark className="h-full w-auto fill-foreground" title="" />
      </Parallax>
      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center lg:px-10">
        <div>
          <SectionLabel n="05">Comissões</SectionLabel>
          <MaskedLines
            className="mt-10 text-4xl font-extrabold uppercase leading-[0.98] sm:text-5xl lg:text-6xl"
            lines={["Cada produto", "tem a sua", "comissão."]}
          />
          <Reveal delay={200}>
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
              A comissão é uma percentagem da venda e muda de produto para
              produto. Um pode ter 10%, outro 5%, outro 2%. Vês a percentagem de
              cada produto no catálogo antes de o adicionares ao estoque.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-8 border-l-4 border-foreground pl-5 font-medium">
              Não há valores fixos nem ganhos garantidos: recebes comissão pelas
              vendas que a loja concluir com clientes que chegaram com o teu
              cupom.
            </p>
          </Reveal>
        </div>

        <Reveal delay={150} variant="wipe">
          <div className="theme-dark p-7 shadow-deep sm:p-10">
            <div className="flex items-center justify-between border-b border-border pb-5">
              <p className="eyebrow text-[0.6rem] text-muted-foreground">
                Simulador de exemplo
              </p>
              <span className="size-2 bg-primary" />
            </div>

            <label
              className="mt-8 block text-sm text-muted-foreground"
              htmlFor="valor"
            >
              Valor da venda
            </label>
            <div className="mt-2 flex items-center border border-input bg-surface px-4 transition-colors focus-within:border-primary">
              <input
                id="valor"
                type="number"
                min={0}
                step={500}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="h-14 w-full bg-transparent text-lg outline-none"
              />
              <span className="text-muted-foreground">Kz</span>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              Comissão do produto
            </p>
            <div className="mt-2 grid grid-cols-3 border border-input">
              {examplePcts.map((p, i) => (
                <button
                  key={p}
                  onClick={() => setPct(p)}
                  className={cn(
                    "h-14 font-wide text-xl font-bold transition-colors duration-500",
                    i > 0 && "border-l border-input",
                    p === pct
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {p}%
                </button>
              ))}
            </div>

            <div className="mt-8 border-t-2 border-primary bg-surface p-6">
              <p className="text-sm text-muted-foreground">
                Comissão nesta venda
              </p>
              <p
                key={`${pct}-${value}`}
                className="animate-rise mt-2 font-wide text-4xl font-extrabold text-primary sm:text-5xl"
              >
                {formatKz(result)}
              </p>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Cálculo ilustrativo. A percentagem real é a que aparece em cada
              produto.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
