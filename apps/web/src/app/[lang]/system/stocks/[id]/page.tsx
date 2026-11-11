import { StockDetails } from "@/features/stocks/components/stock-details/stock-details";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ lang: Locale; id: string }>;
};

export default async function StockDateilsPage({ params }: Props) {
  const { lang, id } = await params;
  const dict = await getDictionary(lang);
  return (
    <div className="flex flex-col gap-4">
      <StockDetails id={id} lang={lang} translations={dict.stockDetails} />
    </div>
  );
}
