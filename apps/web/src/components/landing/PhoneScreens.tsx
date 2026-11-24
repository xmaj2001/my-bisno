import {
  ArrowLeft,
  Check,
  CheckCheck,
  Copy,
  LayoutDashboard,
  Send,
  Store,
  Ticket,
  UserRound,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SAMPLE_COUPON, SAMPLE_PRODUCT, STORE_MESSAGE } from "./constants";
import { LogoMark } from "../logo-mark";

const productLink = `…/produto/auscultadores-sem-fio?cupom=${SAMPLE_COUPON}`;

function AffiliateText() {
  return (
    <>
      Olá! Tenho uma sugestão para ti: <strong>{SAMPLE_PRODUCT}</strong>. Para
      adquirir este produto, clica no link abaixo e fala diretamente com a loja
      pelo WhatsApp.
      <span className="mt-1 block break-all text-chat-accent underline">
        wa.me/…loja-bisno
      </span>
    </>
  );
}

function LinkPreview({ compact = false }: { compact?: boolean }) {
  return (
    <div className="overflow-hidden rounded-lg bg-night/60">
      {/* <img
        src={typeof headphones === "string" ? headphones : headphones.src}
        alt=""
        className={cn("w-full object-cover", compact ? "h-20" : "h-28")}
      /> */}
      <div className="p-2.5">
        <p className="text-[11px] font-semibold text-foreground">
          {SAMPLE_PRODUCT}
        </p>
        <p className="mt-0.5 text-[10px] leading-snug text-muted-foreground">
          Som limpo, bateria de longa duração e conforto para o dia todo.
        </p>
        <p className="mt-1 text-[9px] uppercase tracking-wider text-muted-foreground/70">
          bisno
        </p>
      </div>
    </div>
  );
}

function ChatHeader({
  name,
  sub,
  icon,
}: {
  name: string;
  sub: string;
  icon: "store" | "user";
}) {
  return (
    <div className="flex items-center gap-2.5 bg-chat-head px-3 pb-3 pt-9">
      <ArrowLeft className="size-4 text-foreground/70" />
      <span className="flex size-8 items-center justify-center rounded-full bg-muted">
        {icon === "store" ? (
          <Store className="size-4 text-primary" />
        ) : (
          <UserRound className="size-4 text-foreground/70" />
        )}
      </span>
      <div>
        <p className="text-xs font-semibold text-foreground">{name}</p>
        <p className="text-[10px] text-muted-foreground">{sub}</p>
      </div>
    </div>
  );
}

function Bubble({
  side,
  children,
  className,
  time = "14:32",
  read,
}: {
  side: "in" | "out";
  children: React.ReactNode;
  className?: string;
  time?: string;
  read?: boolean;
}) {
  return (
    <div
      className={cn("flex", side === "out" ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[88%] rounded-xl px-2.5 py-2 text-[11px] leading-relaxed text-foreground shadow-deep",
          side === "out"
            ? "rounded-tr-sm bg-chat-out"
            : "rounded-tl-sm bg-chat-in",
          className,
        )}
      >
        {children}
        <span className="mt-1 flex items-center justify-end gap-1 text-[9px] text-foreground/60">
          {time}
          {side === "out" &&
            (read ? (
              <CheckCheck className="size-3 text-chat-accent" />
            ) : (
              <Check className="size-3" />
            ))}
        </span>
      </div>
    </div>
  );
}

function InputBar({
  value,
  highlight,
}: {
  value?: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-end gap-2 bg-chat px-2.5 pb-5 pt-2">
      <div
        className={cn(
          "flex-1 rounded-2xl bg-chat-in px-3 py-2 text-[11px] leading-relaxed text-foreground/90 transition-shadow",
          highlight && "ring-1 ring-chat-accent",
        )}
      >
        {value ?? <span className="text-muted-foreground">Mensagem</span>}
      </div>
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full bg-chat-accent text-night",
          highlight && "animate-glow-pulse",
        )}
      >
        <Send className="size-3.5" />
      </span>
    </div>
  );
}

function BisnoStockScreen({ copied }: { copied: boolean }) {
  return (
    <div className="flex h-full flex-col bg-background px-4 pb-5 pt-9">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LogoMark className="h-5 w-auto" />
          <span className="eyebrow text-[0.55rem] text-foreground">
            Meu estoque
          </span>
        </div>
        <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] text-glow">
          10%
        </span>
      </div>
      <div className="mt-4 flex gap-3 rounded-xl border border-border bg-card p-2.5">
        {/* <img
          src={typeof headphones === "string" ? headphones : headphones.src}
          alt=""
          className="size-14 rounded-lg object-cover"
        /> */}
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold">{SAMPLE_PRODUCT}</p>
          <p className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
            <Ticket className="size-3 text-primary" /> Cupom{" "}
            <span className="font-mono text-glow">{SAMPLE_COUPON}</span>
          </p>
        </div>
      </div>
      <p className="eyebrow mt-5 text-[0.55rem] text-primary">
        Texto pronto para copiar
      </p>
      <div className="mt-2 flex-1 rounded-xl border border-dashed border-primary/40 bg-card/60 p-3 text-[11px] leading-relaxed text-foreground/90">
        <AffiliateText />
      </div>
      <button
        className={cn(
          "mt-4 flex items-center justify-center gap-2 rounded-full py-2.5 text-xs font-semibold transition-all duration-500",
          copied
            ? "bg-accent text-glow"
            : "bg-primary text-primary-foreground shadow-glow",
        )}
        tabIndex={-1}
      >
        {copied ? (
          <Check className="size-3.5" />
        ) : (
          <Copy className="size-3.5" />
        )}
        {copied ? "Texto copiado" : "Copiar texto"}
      </button>
    </div>
  );
}

function ChatScreen({
  children,
  header,
  input,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
  input: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col bg-chat">
      {header}
      <div className="flex flex-1 flex-col justify-end gap-2 overflow-hidden px-2.5 py-3">
        {children}
      </div>
      {input}
    </div>
  );
}

export function PhoneScreen({ step }: { step: number }) {
  switch (step) {
    case 0:
      return <BisnoStockScreen copied={false} />;
    case 1:
      return <BisnoStockScreen copied />;
    case 2:
      return (
        <ChatScreen
          header={
            <ChatHeader
              name="Cliente"
              sub="WhatsApp, Facebook ou outra rede"
              icon="user"
            />
          }
          input={<InputBar />}
        >
          <Bubble side="in" time="14:30">
            Boa tarde! Tens alguma coisa boa para mim?
          </Bubble>
          <Bubble side="out" className="animate-rise">
            <AffiliateText />
          </Bubble>
        </ChatScreen>
      );
    case 3:
      return (
        <ChatScreen
          header={<ChatHeader name="Afiliado" sub="online" icon="user" />}
          input={<InputBar />}
        >
          <Bubble side="in" className="relative">
            <AffiliateText />
            <span className="absolute bottom-6 right-6 flex size-7 items-center justify-center">
              <span className="animate-glow-pulse absolute inset-0 rounded-full bg-glow/40" />
              <span className="relative size-3 rounded-full bg-glow" />
            </span>
          </Bubble>
        </ChatScreen>
      );
    case 4:
      return (
        <ChatScreen
          header={
            <ChatHeader
              name="Loja Bisno"
              sub="Conta comercial · WhatsApp"
              icon="store"
            />
          }
          input={
            <div className="bg-chat">
              <div className="animate-rise mx-2.5 rounded-xl bg-chat-in p-2">
                <LinkPreview compact />
              </div>
              <InputBar
                highlight
                value={
                  <>
                    {STORE_MESSAGE}
                    <span className="mt-1 block break-all text-chat-accent">
                      {productLink}
                    </span>
                  </>
                }
              />
            </div>
          }
        >
          <p className="mx-auto rounded-md bg-chat-in px-2 py-1 text-[9px] text-muted-foreground">
            Mensagem já escrita. Só falta enviar.
          </p>
        </ChatScreen>
      );
    case 5:
      return (
        <ChatScreen
          header={
            <ChatHeader
              name="Loja Bisno"
              sub="Conta comercial · WhatsApp"
              icon="store"
            />
          }
          input={<InputBar />}
        >
          <Bubble side="out" read className="animate-rise">
            <LinkPreview />
            <p className="mt-2">{STORE_MESSAGE}</p>
            <span className="block break-all text-chat-accent">
              {productLink}
            </span>
          </Bubble>
          <Bubble side="in" time="14:34">
            Olá! Obrigado pelo contacto. Vamos tratar já do seu pedido.
          </Bubble>
        </ChatScreen>
      );
    case 6:
      return (
        <ChatScreen
          header={
            <ChatHeader
              name="Novo cliente"
              sub="Recebido pela loja"
              icon="user"
            />
          }
          input={<InputBar />}
        >
          <Bubble side="in">
            <LinkPreview compact />
            <p className="mt-2">{STORE_MESSAGE}</p>
            <span className="block break-all text-chat-accent">
              …/produto/auscultadores-sem-fio?cupom=
              <span className="rounded bg-primary px-1 font-semibold text-primary-foreground">
                {SAMPLE_COUPON}
              </span>
            </span>
          </Bubble>
          <div className="animate-rise mx-auto flex items-center gap-2 rounded-full border border-primary/50 bg-night px-3 py-1.5 text-[10px]">
            <Ticket className="size-3 text-primary" />
            Cupom <span className="font-mono text-glow">{SAMPLE_COUPON}</span> ·
            cliente vindo da afiliada Ana
          </div>
        </ChatScreen>
      );
    default:
      return (
        <div className="flex h-full flex-col items-center justify-center bg-background px-6 text-center">
          <div className="relative">
            <span className="bg-glow-radial animate-glow-pulse absolute -inset-16" />
            <span className="relative flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow-lg">
              <Check className="size-8" />
            </span>
          </div>
          <p className="eyebrow mt-8 text-[0.55rem] text-primary">
            Venda concluída
          </p>
          <p className="mt-3 font-display text-xl font-bold">
            Comissão atribuída à Ana
          </p>
          <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
            {SAMPLE_PRODUCT} · cupom {SAMPLE_COUPON}
            <br />
            Comissão deste produto: 10% da venda
          </p>
          <div className="mt-6 flex items-center gap-2 rounded-full bg-card px-3 py-1.5 text-[10px] text-muted-foreground">
            <LayoutDashboard className="size-3" /> Registado no painel do
            afiliado
          </div>
        </div>
      );
  }
}
