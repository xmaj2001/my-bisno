"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useNetworkStatus } from "@/providers/network-provider";
import { Check, Loader2, PackagePlus, WifiOff } from "lucide-react";

interface ProductStockActionProps {
  productSlug: string;
  lang?: string;
  initialInStock?: boolean;
  isLoggedIn: boolean
}

export const ProductStockAction = ({
  productSlug,
  lang = "pt",
  initialInStock = false,
  isLoggedIn,
}: ProductStockActionProps) => {
  const router = useRouter();
  const { isOnline } = useNetworkStatus();
  const [inStock, setInStock] = useState(initialInStock);
  const [isPending, startTransition] = useTransition();

  const handleAction = async () => {
    // if (!isOnline) {
    //   toast.error("Não é possível alterar o stock enquanto estiver offline.");
    //   return;
    // }

    if (!isLoggedIn) {
      router.push(`/${lang}/auth/login?redirect=/products/${productSlug}`);
      return;
    }

    startTransition(async () => {
      try {
        if (!inStock) {
          // const res = await addToStockAction({ productSlug });
          // setInStock(true);
          // toast.success(
          //   `Produto adicionado ao seu stock! Teu cupão: ${res.data.coupon}`,
          // );
        } else {
          //TODO: REMAVA ISSO POIS VAI DAR PROBLEMA ANALIZA BEM ISSO
          // await removeFromStockAction({ productSlug });
          // setInStock(false);
          toast.success("Produto retirado do stock com sucesso.");
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "ERRO";
        toast.error(message || "Ocorreu um erro ao atualizar o stock.");
      }
    });
  };

  // if (!isOnline) {
  //   return (
  //     <Button
  //       type="button"
  //       disabled
  //       variant="outline"
  //       className={`w-full gap-2 rounded-lg py-6 text-base font-semibold opacity-70`}
  //     >
  //       <WifiOff className="h-5 w-5 text-muted-foreground" />
  //       Offline
  //     </Button>
  //   );
  // }
  return (
    <Button
      type="button"
      onClick={handleAction}
      disabled={isPending}
      variant={inStock ? "secondary" : "default"}
      className={`w-full gap-2 rounded-lg py-6 text-base font-semibold shadow-md transition`}
    >
      {isPending ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          {inStock ? "A remover..." : "A adicionar..."}
        </>
      ) : inStock ? (
        <>
          <Check className="h-5 w-5 text-emerald-500" />
          {"No seu stock (Clique para remover)"}
        </>
      ) : (
        <>
          <PackagePlus className="h-5 w-5" />
          {"Adicionar ao meu stock"}
        </>
      )}
    </Button>
  );
};
