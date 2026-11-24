"use client";

import { Megaphone, ShoppingBag, Store } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { STORE_MESSAGE } from "./constants";
import { PhoneScreen } from "./PhoneScreens";
import { MaskedLines, Reveal } from "../Reveal";
import { SectionLabel } from "./SectionLabel";

type Actor = "Afiliado" | "Cliente" | "Loja";

const steps: { actor: Actor; title: string; text: string }[] = [
  {
    actor: "Afiliado",
    title: "Abres o produto no teu estoque",
    text: "A Bisno gera automaticamente um texto pronto, dirigido ao teu cliente, com o link que o leva ao WhatsApp da loja que fornece o produto.",
  },
  {
    actor: "Afiliado",
    title: "Copias o texto com um toque",
    text: "Não precisas de escrever nada. O texto já explica ao cliente que, para adquirir o produto, basta clicar no link.",
  },
  {
    actor: "Afiliado",
    title: "Envias a quem quiseres",
    text: "Colas o texto numa conversa de WhatsApp, Facebook, Instagram ou qualquer outra rede. Uma pessoa, um grupo ou um estado.",
  },
  {
    actor: "Cliente",
    title: "O cliente clica no link",
    text: "Recebe o teu texto na conversa e toca no link. Não precisa de criar conta nem de instalar nada.",
  },
  {
    actor: "Cliente",
    title: "O WhatsApp abre já na conversa com a loja",
    text: `A mensagem vem escrita: "${STORE_MESSAGE}". Por baixo vai o link do produto com o teu cupom, que mostra a imagem, o nome e a descrição.`,
  },
  {
    actor: "Cliente",
    title: "Só falta enviar",
    text: "O cliente envia a mensagem e, a partir daí, fala diretamente com a loja para fechar a compra.",
  },
  {
    actor: "Loja",
    title: "A loja vê o produto e o teu cupom",
    text: "Ao receber a mensagem, a loja identifica o produto e, pelo cupom, sabe que o cliente veio de ti.",
  },
  {
    actor: "Loja",
    title: "Venda feita, comissão para ti",
    text: "A loja trata do pagamento e da entrega. Quando a venda é concluída, a comissão do produto é atribuída a ti.",
  },
];

const actorIcon = { Afiliado: Megaphone, Cliente: ShoppingBag, Loja: Store };
const actors: Actor[] = ["Afiliado", "Cliente", "Loja"];

export function Flow() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting)
            setActive(Number((e.target as HTMLElement).dataset["index"]));
        });
      },
      {
        rootMargin: window.matchMedia("(min-width: 1024px)").matches
          ? "-48% 0px -48% 0px"
          : "-72% 0px -18% 0px",
      },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const activeActor = steps[active]?.actor ?? "Afiliado";

  return (
    <section id="envio-e-compra" className="theme-dark relative py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionLabel n="03">O processo de envio e compra</SectionLabel>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <MaskedLines
            className="text-4xl font-extrabold uppercase leading-[0.98] sm:text-5xl lg:text-6xl"
            lines={[
              "Do teu telemóvel",
              "ao WhatsApp da loja,",
              "em três toques.",
            ]}
            lineClassName={(i) => (i === 2 ? "text-primary" : undefined)}
          />
          <Reveal delay={200}>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Acompanha o percurso completo: o que tu fazes, o que o cliente vê
              e como a loja sabe que a venda é tua.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-16 grid gap-10 lg:grid-cols-[1fr_auto] lg:gap-20">
          {/* Phone */}
          <div className="sticky top-[60px] z-10 -mx-6 self-start border-b border-border bg-background px-6 pb-4 pt-4 lg:order-2 lg:top-28 lg:mx-0 lg:border-0 lg:bg-transparent lg:p-0">
            <div className="mb-4 grid grid-cols-3 border border-border">
              {actors.map((a, ai) => {
                const Icon = actorIcon[a];
                return (
                  <span
                    key={a}
                    className={cn(
                      "flex items-center justify-center gap-1.5 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-500",
                      ai > 0 && "border-l border-border",
                      a === activeActor
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    <Icon className="size-3.5" /> {a}
                  </span>
                );
              })}
            </div>
            <div className="h-[340px] sm:h-[420px] lg:h-auto">
              <div className="relative mx-auto w-[260px] origin-top scale-[0.62] sm:scale-[0.78] lg:w-[300px] lg:scale-100">
                <span
                  className="absolute -inset-3 border border-primary/40"
                  aria-hidden
                />
                <span
                  className="absolute -inset-6 border border-border"
                  aria-hidden
                />
                <div className="relative aspect-[9/18.5] overflow-hidden border-[6px] border-surface bg-night shadow-deep ring-1 ring-border">
                  <span className="absolute left-1/2 top-2.5 z-20 h-4 w-16 -translate-x-1/2 bg-night" />
                  {steps.map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        i === active
                          ? "translate-y-0 opacity-100"
                          : cn(
                              "pointer-events-none opacity-0",
                              i < active ? "-translate-y-6" : "translate-y-6",
                            ),
                      )}
                      aria-hidden={i !== active}
                    >
                      {Math.abs(i - active) <= 1 && <PhoneScreen step={i} />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="lg:order-1">
            <ol className="relative">
              <span className="absolute bottom-0 left-[19px] top-0 w-px bg-border" />
              <span
                className="absolute left-[19px] top-0 w-[2px] bg-primary transition-all duration-700"
                style={{ height: `${((active + 1) / steps.length) * 100}%` }}
              />
              {steps.map((s, i) => {
                const showActor = i === 0 || steps[i - 1]?.actor !== s.actor;
                const Icon = actorIcon[s.actor];
                return (
                  <li
                    key={i}
                    data-index={i}
                    ref={(el) => {
                      refs.current[i] = el;
                    }}
                    className="relative pl-16"
                  >
                    {showActor && (
                      <p className="eyebrow mb-6 pt-6 text-[0.6rem] text-primary">
                        Do lado {s.actor === "Loja" ? "da" : "do"}{" "}
                        {s.actor.toLowerCase()}
                      </p>
                    )}
                    <div className="flex min-h-[34vh] flex-col justify-center py-8 lg:min-h-[52vh]">
                      <span
                        className={cn(
                          "absolute left-0 flex size-10 items-center justify-center border text-xs font-bold transition-all duration-500",
                          i <= active
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-muted-foreground",
                        )}
                      >
                        {i === active ? (
                          <Icon className="size-4" />
                        ) : (
                          `0${i + 1}`
                        )}
                      </span>
                      <h3
                        className={cn(
                          "text-2xl font-bold transition-all duration-700 sm:text-3xl",
                          i === active
                            ? "translate-x-0 text-foreground"
                            : "-translate-x-1 text-foreground/30",
                        )}
                      >
                        {s.title}
                      </h3>
                      <p
                        className={cn(
                          "mt-4 max-w-lg leading-relaxed transition-colors duration-700",
                          i === active
                            ? "text-muted-foreground"
                            : "text-muted-foreground/35",
                        )}
                      >
                        {s.text}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
            <div aria-hidden className="h-[10vh] lg:h-[30vh]" />
          </div>
        </div>
      </div>
    </section>
  );
}
