import { StockView } from "@/features/stocks/components/stock-view";
import type { Locale } from "@/i18n/config";

interface StockPageProps {
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function StockPage({ params }: StockPageProps) {
  const { lang } = await params;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gestão de Stock</h1>
        <p className="text-sm text-muted-foreground">
          Consulte o stock atual disponível e acompanhe as comissões por
          produto.
        </p>
      </div>

      <StockView />
    </div>
  );
}
