"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "../Logo";
import { LogoMark } from "../logo-mark";
import { Parallax } from "../Parallax";
import { MaskedLines, Reveal } from "../Reveal";
import { STORE_MESSAGE } from "./constants";
import { SectionLabel } from "./SectionLabel";

const faqs = [
  {
    q: "Quanto custa ser afiliado?",
    a: "Para começares, basta criares a tua conta de afiliado na Bisno e escolheres os produtos que queres divulgar.",
  },
  {
    q: "Quanto vou ganhar?",
    a: "Depende das vendas e do produto. Cada produto tem a sua própria comissão em percentagem, que vês no catálogo. Não há valores fixos nem ganhos garantidos.",
  },
  {
    q: "Como é que a loja sabe que o cliente veio de mim?",
    a: "Quando adicionas um produto ao estoque, é criado um cupom exclusivo teu para esse produto. O link que o cliente envia à loja leva esse cupom, e é por ele que a loja te identifica.",
  },
  {
    q: "O cliente precisa de criar conta ou instalar alguma coisa?",
    a: `Não. O cliente só clica no link, o WhatsApp abre na conversa com a loja com a mensagem "${STORE_MESSAGE}" já escrita, e ele só tem de enviar.`,
  },
  {
    q: "Tenho de tratar do pagamento ou da entrega?",
    a: "Não. O cliente fala diretamente com a loja, que trata da venda, do pagamento e da entrega. O teu trabalho é divulgar.",
  },
  {
    q: "Onde posso divulgar os produtos?",
    a: "Onde quiseres: WhatsApp, Facebook, Instagram ou qualquer outra rede. Copias o texto pronto e envias.",
  },
  {
    q: "De que lojas são os produtos?",
    a: "Nesta primeira fase, da loja da própria Bisno. Mais tarde, outras lojas serão cadastradas pelos administradores e vão publicar os seus próprios produtos.",
  },
];

export function Faq() {
  return (
    <section id="perguntas" className="theme-light py-24 lg:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionLabel n="07">Perguntas frequentes</SectionLabel>
          <MaskedLines
            className="mt-10 text-4xl font-extrabold uppercase leading-[0.98] sm:text-5xl"
            lines={["Ainda com", "dúvidas?"]}
            lineClassName={(i) => (i === 1 ? "text-primary" : undefined)}
          />
        </div>
        <Reveal delay={150}>
          <AccordionPrimitive.Root
            type="single"
            collapsible
            className="border-t border-foreground"
          >
            {faqs.map((f, i) => (
              <AccordionPrimitive.Item
                key={f.q}
                value={`f${i}`}
                className="group border-b border-foreground/15 data-[state=open]:border-foreground"
              >
                <AccordionPrimitive.Header>
                  <AccordionPrimitive.Trigger className="flex w-full cursor-pointer items-center gap-5 py-6 text-left transition-colors duration-300 hover:text-primary">
                    <span className="font-wide w-8 shrink-0 text-xs font-bold text-muted-foreground">
                      0{i + 1}
                    </span>
                    <span className="flex-1 text-lg font-semibold">{f.q}</span>
                    <span className="flex size-9 shrink-0 items-center justify-center border border-foreground/25 transition-all duration-500 group-data-[state=open]:rotate-45 group-data-[state=open]:border-primary group-data-[state=open]:bg-primary group-data-[state=open]:text-primary-foreground">
                      <Plus className="size-4" />
                    </span>
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <p className="pb-7 pl-[3.25rem] pr-14 text-base leading-relaxed text-muted-foreground">
                    {f.a}
                  </p>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            ))}
          </AccordionPrimitive.Root>
        </Reveal>
      </div>
    </section>
  );
}

const finalWords = ["Escolhe", "Copia", "Envia", "Ganha"];

export function FinalCta({ lang }: { lang: string }) {
  return (
    <section
      id="comecar"
      className="theme-dark grain relative overflow-hidden py-32 lg:py-48"
    >
      <Parallax speed={0.3} scale={1.3} className="absolute inset-0">
        <img
          src={"/hero-night-doorway.jpg"}
          alt=""
          loading="lazy"
          width={1920}
          height={1080}
          className="h-full w-full object-cover object-[70%_center]"
        />
      </Parallax>
      <div className="absolute inset-0 bg-night/75" />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <Reveal>
          <LogoMark className="h-20 w-auto" />
        </Reveal>
        <Reveal delay={150}>
          <ul className="mt-10 grid grid-cols-2 border border-border sm:grid-cols-4">
            {finalWords.map((w, i) => (
              <li
                key={w}
                className={
                  "eyebrow border-border px-5 py-3 text-[0.62rem] " +
                  (i % 2 === 1 ? "border-l " : "") +
                  (i > 1 ? "border-t sm:border-t-0 " : "") +
                  (i === 2 ? "sm:border-l " : "") +
                  (i === finalWords.length - 1
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/75")
                }
              >
                {w}
              </li>
            ))}
          </ul>
        </Reveal>
        <MaskedLines
          delay={250}
          className="mt-10 text-4xl font-extrabold uppercase leading-[0.98] sm:text-6xl"
          lines={["Começa a divulgar", "e a ganhar comissões."]}
          lineClassName={(i) => (i === 1 ? "text-primary" : undefined)}
        />
        <Reveal delay={450}>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground">
            Cria a tua conta de afiliado, escolhe os primeiros produtos do
            catálogo e partilha o teu primeiro texto ainda hoje.
          </p>
        </Reveal>
        <Reveal delay={550}>
          <Button asChild variant="hero" size="xl" className="mt-10">
            <Link href={`/${lang}/auth/register`}>
              Criar conta de afiliado <ArrowRight />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
