import { LayoutGrid, Megaphone, Percent, Ticket } from "lucide-react";
import { Parallax } from "../Parallax";
import { MaskedLines, Reveal } from "../Reveal";
import { SectionLabel } from "./SectionLabel";
import { LogoMark } from "../logo-mark";

const steps = [
  {
    icon: LayoutGrid,
    title: "Escolhe produtos",
    text: "Navega pelo catálogo e adiciona ao teu estoque os produtos que queres divulgar.",
  },
  {
    icon: Ticket,
    title: "Recebe o teu cupom",
    text: "Cada produto que adicionas gera um cupom exclusivo teu. É assim que a loja sabe que o cliente veio de ti.",
  },
  {
    icon: Percent,
    title: "Conhece a comissão",
    text: "Cada produto tem a sua própria comissão em percentagem. Vês sempre quanto vale antes de divulgar.",
  },
  {
    icon: Megaphone,
    title: "Divulga onde quiseres",
    text: "WhatsApp, Facebook, Instagram, TikTok, grupos, estados. Tu escolhes onde e para quem.",
  },
];

const channels = [
  "WhatsApp",
  "Facebook",
  "Instagram",
  "TikTok",
  "Grupos",
  "Estados",
  "Mensagem direta",
  "Comunidades",
];

export function Steps() {
  return (
    <section id="como-funciona" className="theme-gold relative overflow-hidden">
      <Parallax
        speed={0.25}
        className="pointer-events-none absolute -right-24 top-10 hidden h-[620px] w-[420px] opacity-[0.13] md:block"
      >
        <LogoMark className="h-full w-auto fill-foreground" title="" />
      </Parallax>

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-36">
        <SectionLabel n="02">Como funciona</SectionLabel>
        <div className="mt-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <MaskedLines
            className="max-w-3xl text-4xl font-extrabold uppercase leading-[0.98] sm:text-5xl lg:text-6xl"
            lines={["Quatro passos", "entre ti e a tua", "primeira comissão."]}
          />
          <Reveal delay={200}>
            <p className="max-w-sm text-lg leading-relaxed text-muted-foreground">
              Não precisas de ter stock, receber pagamentos nem fazer entregas.
              Só divulgas.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid border-t border-foreground/40 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal
              key={s.title}
              delay={i * 120}
              className="border-b border-foreground/40 sm:[&:nth-child(odd)]:border-r lg:border-r lg:last:border-r-0"
            >
              <div className="group relative h-full overflow-hidden p-7 transition-colors duration-700 hover:bg-card hover:text-card-foreground lg:p-8">
                <Parallax speed={-0.06 - i * 0.03} className="h-20">
                  <span className="font-wide text-7xl font-extrabold leading-none text-outline opacity-70 transition-opacity duration-500 group-hover:opacity-100">
                    0{i + 1}
                  </span>
                </Parallax>
                <s.icon className="mt-10 size-7 text-primary transition-colors duration-700 group-hover:text-gold" />
                <h3 className="mt-5 text-xl font-bold uppercase">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground transition-colors duration-700 group-hover:text-card-foreground/70">
                  {s.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div
        className="theme-dark overflow-hidden border-y border-border py-7"
        aria-hidden
      >
        <div className="animate-marquee flex w-max gap-12">
          {[...channels, ...channels].map((c, i) => (
            <span
              key={i}
              className="flex items-center gap-12 font-wide text-2xl font-bold uppercase text-foreground/85 sm:text-3xl"
            >
              {c}
              <span className="size-2.5 bg-primary" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
