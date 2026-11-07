import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { constructMetadata } from "@/lib/seo";
import { Hero } from "@/components/landing/Hero";
import { NoHassle, Commission } from "@/components/landing/Benefits";
import { Faq, FinalCta } from "@/components/landing/Closing";
import { Flow } from "@/components/landing/Flow";
import { Steps } from "@/components/landing/Steps";
import { Stats } from "@/components/landing/Stats";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/footer";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};

  const dict = await getDictionary(lang as Locale);
  return constructMetadata({
    title: dict.seo.homeTitle,
    description: dict.seo.homeDescription,
    lang: lang as Locale,
  });
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const dict = await getDictionary(lang as Locale);

  return (
   <div className="min-h-screen bg-black text-foreground">
      <Nav />
      <main>
        <Hero />
        {/* <Catalog /> */}
        <Steps />
        <Flow />
        <NoHassle />
        <Commission />
        <Stats />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
