export const dynamic = "force-dynamic";
import { Footer } from "@/components/footer";
import { ProductNavbar } from "@/components/product-navbar";
import { ProductDetails } from "@/features/products/components/details/products-details";
import { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type Props = {
  params: Promise<{ lang: Locale; slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen">
      <ProductNavbar lang={lang} />
      <main className="mx-auto max-w-7xl px-4 pt-20 mb-10">
        {/* <GoBack title="Produtos" /> */}
        <ProductDetails slug={slug} />
      </main>
      <Footer />
    </div>
  );
}
