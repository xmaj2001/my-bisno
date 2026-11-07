import { ProductDetailsGallery } from "./products-details-gallery";
import {
  Link2,
  MessageCircle,
  ShieldCheck,
  TrendingUp,
  Percent,
  Tag,
} from "lucide-react";
import { formatKz } from "@/lib/utils";
import { getProductBySlug } from "../../queries";
import { ProductAction } from "./product-action";
import { Suspense } from "react";

interface ProductDetailsProps {
  slug: string;
}

export const  ProductDetails = async ({ slug }: ProductDetailsProps) => {
  return (
    <Suspense
      fallback={
        <div className="grid gap-6 lg:grid-cols-2 animate-pulse">
          <div className="aspect-square rounded-xl bg-muted" />
          <div className="h-125 rounded-xl bg-muted" />
        </div>
      }
    >
      <ProductDetailsContent slug={slug} />
    </Suspense>
  );
};

export const ProductDetailsContent = async ({ slug }: ProductDetailsProps) => {
  const res = await getProductBySlug(slug);
  const p = res.data;

  const earningPerSale = Number(p.earning);
  const isInStock = p.affiliateInfo !== null;
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Lado Esquerdo: Galeria de Imagens */}
      <ProductDetailsGallery gallery={p.images} productName={p.name} />

      {/* Lado Direito: Informações e Ações do Produto */}
      <div className="flex flex-col gap-6 rounded-lg border bg-card p-6 md:p-8 shadow-sm">
        {/* Categoria e Tag de Comissão */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Tag className="h-3.5 w-3.5" />
            {p.category}
          </span>

          <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold text-black">
            <Percent className="h-3.5 w-3.5" />
            {p.commission}% de comissão
          </span>
        </div>

        {/* Título e Preço de Venda ao Consumidor */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {p.name}
          </h1>
          <p className="text-xs font-medium text-muted-foreground">
            Preço ao cliente final:{" "}
            <span className="text-sm font-semibold text-foreground">
              {formatKz(p.price)}
            </span>
          </p>
        </div>

        {/* CARD FINANCEIRO DO AFILIADO (Lucro Visual) */}
        <div className="relative overflow-hidden rounded-xs bg-linear-to-br from-night via-night/95 to-deep/90 p-5 text-white shadow-md">
          <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-primary/30 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-1">
            <span className="flex items-center gap-1.5 text-xs font-medium text-primary">
              <TrendingUp className="h-4 w-4" /> Seu lucro por cada venda
            </span>
            <span className="text-3xl font-extrabold tracking-tight text-primary">
              {formatKz(p.earning)}
            </span>
          </div>

          {/* Projeção de Ganhos */}
          <div className="relative z-10 mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-3 text-center">
            {[5, 10, 20].map((qty) => (
              <div
                key={qty}
                className="rounded-xs bg-white/5 p-2 backdrop-blur-sm"
              >
                <p className="text-xs text-white/70">{qty} vendas</p>
                <p className="text-xs font-bold text-white">
                  {formatKz((earningPerSale * qty).toString())}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Descrição */}
        <div className="space-y-1">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Descrição do produto
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {p.description}
          </p>
        </div>

        {/* Especificações Técnicas (Grids Adaptáveis) */}
        {p.specs && p.specs.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Especificações
            </h3>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {p.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="rounded-lg border bg-muted/30 p-2.5 text-center transition hover:border-primary/50"
                >
                  <p className="text-xs font-bold text-foreground">
                    {spec.value.slice(0, 10)}...
                  </p>
                  <p className="text-[11px] text-muted-foreground truncate">
                    {spec.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ação do Estoque (Client Component com estado Auth) */}
        <ProductAction productSlug={p.slug} initialInStock={isInStock} />

        {/* Garantias do Afiliado */}
        <div className="grid gap-2.5 text-xs text-muted-foreground sm:grid-cols-2 pt-2 border-t">
          <p className="flex items-center gap-2">
            <Link2 className="h-4 w-4 text-primary shrink-0" /> Link exclusivo
            de rastreamento
          </p>
          <p className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-primary shrink-0" />{" "}
            Divulgação direta no WhatsApp
          </p>
          <p className="flex items-center gap-2 sm:col-span-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />{" "}
            Comissão atrelada automaticamente ao seu ID
          </p>
        </div>
      </div>
    </div>
  );
};