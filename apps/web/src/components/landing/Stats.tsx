"use client";

import { MapPin, Tags, Users } from "lucide-react";
import Image from "next/image";
import { MaskedLines, Reveal, useInView } from "../Reveal";
import { SectionLabel } from "./SectionLabel";

const features = [
  {
    icon: MapPin,
    title: "Onde mais se compra",
    text: "Vê em que províncias cada produto é mais comprado e direciona a tua divulgação.",
  },
  {
    icon: Users,
    title: "Quantos já compraram",
    text: "Acompanha quantas pessoas já compraram cada produto.",
  },
  {
    icon: Tags,
    title: "O que cada região procura",
    text: "Descobre as categorias mais procuradas em cada província. Em breve, também por município.",
  },
];

export function Stats() {
  const { ref } = useInView<HTMLDivElement>();

  return (
    <section
      id="estatisticas"
      className="theme-dark relative py-24 lg:py-36 overflow-hidden"
    >
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10">
        {/* Coluna de Texto */}
        <div className="lg:order-2">
          <SectionLabel n="06">Estatísticas</SectionLabel>
          <MaskedLines
            className="mt-8 text-4xl font-extrabold uppercase leading-[1.05] sm:text-5xl tracking-tight"
            lines={["Divulga com dados,", "não às cegas."]}
            lineClassName={(i) => (i === 1 ? "text-primary" : undefined)}
          />
          <Reveal delay={150}>
            <p className="mt-6 text-base lg:text-lg leading-relaxed text-muted-foreground">
              A Bisno mostra-te informação em tempo real para saberes onde e a
              quem vale mais a pena divulgar cada produto.
            </p>
          </Reveal>

          <ul className="mt-10 space-y-2">
            {features.map((f, i) => (
              <Reveal
                as="li"
                key={f.title}
                delay={200 + i * 100}
                className="flex gap-5 border-t border-border/60 py-6 last:border-b"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 text-primary">
                  <f.icon className="size-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {f.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {f.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Coluna do Painel com Imagem a Ocupar Todo o Espaço */}
        <Reveal delay={150} className="lg:order-1 h-full min-h-[420px] lg:min-h-[520px]">
          <div
            ref={ref}
            className="relative h-full w-full overflow-hidden rounded-2xl border border-border/60 bg-surface/80 shadow-2xl"
          >
            <Image
              src="/landing/stats.jpeg"
              alt="Estatísticas e vendas"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
              priority
            />
            {/* Gradiente ou overlay opcional subtil para integrar perfeitamente no tema escuro */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}