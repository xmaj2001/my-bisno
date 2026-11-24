"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Loader2,
  PackagePlus,
  WifiOff,
  Lock,
  Copy,
  Sparkles,
} from "lucide-react";
import { useNetworkStatus } from "@/providers/network-provider";
import { addToStockAction } from "../../interactions";
import { cn } from "@/lib/utils";

interface ProductStockActionProps {
  productId: string;
  productSlug: string;
  lang?: string;
  initialInStock?: boolean;
  initialCoupon?: string | null;
  isLoggedIn: boolean;
}

export const ProductStockAction = ({
  productId,
  productSlug,
  lang = "pt",
  initialInStock = false,
  initialCoupon = null,
  isLoggedIn,
}: ProductStockActionProps) => {
  const router = useRouter();
  const { isOnline } = useNetworkStatus();
  const [inStock, setInStock] = useState(initialInStock);
  const [coupon, setCoupon] = useState<string | null>(initialCoupon);
  const [isPending, startTransition] = useTransition();
  const [justAdded, setJustAdded] = useState(false);

  const handleCopyCoupon = () => {
    if (!coupon) return;
    navigator.clipboard.writeText(coupon).then(() => {
      toast.success("Cupão copiado para a área de transferência!");
    });
  };

  const handleAddToStock = () => {
    if (!isOnline) {
      toast.error("Sem ligação à internet. Tenta novamente mais tarde.");
      return;
    }

    if (!isLoggedIn) {
      router.push(`/${lang}/auth/login?redirect=/${lang}/system/product/${productSlug}`);
      return;
    }

    startTransition(async () => {
      try {
        const result = await addToStockAction(productId);
        setInStock(true);
        setCoupon(result.coupon);
        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 3000);
        toast.success(
          `Produto adicionado! O teu cupão é: ${result.coupon}`,
          { duration: 6000 },
        );
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Ocorreu um erro. Tenta novamente.";
        toast.error(message);
      }
    });
  };

  /* ── Offline ──────────────────────────────────────────────────── */
  // if (!isOnline) {
  //   return (
  //     <Button
  //       type="button"
  //       disabled
  //       variant="outline"
  //       className="w-full gap-2 py-6 text-base font-semibold opacity-60"
  //     >
  //       <WifiOff className="h-5 w-5 text-muted-foreground" />
  //       Sem ligação
  //     </Button>
  //   );
  // }

  /* ── Não autenticado ──────────────────────────────────────────── */
  if (!isLoggedIn) {
    return (
      <Button
        type="button"
        onClick={handleAddToStock}
        variant="outline"
        className="w-full gap-2 py-6 text-base font-semibold border-dashed hover:border-primary hover:text-primary transition-colors"
      >
        <Lock className="h-5 w-5" />
        Entra para adicionar ao teu stock
      </Button>
    );
  }

  /* ── Já no stock ──────────────────────────────────────────────── */
  if (inStock) {
    return (
      <div className="flex flex-col gap-2.5">
        <div
          className={cn(
            "flex items-center gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 transition-all",
            justAdded && "scale-[1.01] border-emerald-500/60 bg-emerald-500/15",
          )}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
            <Check className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              {justAdded ? "Adicionado com sucesso!" : "Já no teu stock"}
            </p>
            {coupon && (
              <p className="text-xs text-muted-foreground truncate">
                Cupão:{" "}
                <span className="font-mono font-bold text-foreground">{coupon}</span>
              </p>
            )}
          </div>
          {coupon && (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground"
              onClick={handleCopyCoupon}
              title="Copiar cupão"
            >
              <Copy className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Partilha o teu link de afiliado e começa a ganhar.
        </p>
      </div>
    );
  }

  /* ── CTA principal ────────────────────────────────────────────── */
  return (
    <Button
      type="button"
      onClick={handleAddToStock}
      disabled={isPending}
      className="w-full gap-2.5 py-6 text-base font-semibold shadow-md shadow-primary/20 transition-all hover:shadow-primary/30 hover:scale-[1.01] active:scale-100"
    >
      {isPending ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          A adicionar ao stock...
        </>
      ) : (
        <>
          <PackagePlus className="h-5 w-5" />
          Adicionar ao meu stock
          <Sparkles className="ml-auto h-4 w-4 opacity-70" />
        </>
      )}
    </Button>
  );
};
