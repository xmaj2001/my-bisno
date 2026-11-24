"use client";

import { authClient } from "@/features/auth/auth-client";
// import { authClient } from "@/features/auth/auth-client";
import { ProductStockAction } from "./product-stock-action";

interface ProductActionProps {
  productId: string;
  productSlug: string;
  lang?: string;
  initialInStock?: boolean;
  initialCoupon?: string | null;
}

export const ProductAction = ({
  productId,
  productSlug,
  lang = "pt",
  initialInStock = false,
  initialCoupon = null,
}: ProductActionProps) => {
  const { data } = authClient.useSession();
  const isLoggedIn = data?.session ? true : false; // TODO: ligar ao authClient.useSession() quando pronto
  return (
    <ProductStockAction
      isLoggedIn={isLoggedIn}
      productId={productId}
      productSlug={productSlug}
      lang={lang}
      initialInStock={initialInStock}
      initialCoupon={initialCoupon}
    />
  );
};
