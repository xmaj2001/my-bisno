"use client";

// import { StockToggleButton } from "@/features/affiliates/components/stock-toggle-button/stock-toggle-button";
// import { authClient } from "@/features/auth/auth";
import { ProductStockAction } from "./product-stock-action";

interface ProductStockActionProps {
  productSlug: string;
  lang?: string;
  initialInStock?: boolean;
  initialCoupon?: string | null;
}

export const ProductAction = ({
  productSlug,
  lang = "pt",
  initialInStock = false,
  initialCoupon = null,
}: ProductStockActionProps) => {
  // const { data } = authClient.useSession();
  const isLoggedIn = false;
  return (
    <div>
      <ProductStockAction
        isLoggedIn={isLoggedIn}
        productSlug={productSlug}
        initialInStock={initialInStock}
      />
    </div>
  );
};
