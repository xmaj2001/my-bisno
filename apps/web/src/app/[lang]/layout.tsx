import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { i18n, isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { AppProviders } from "@/providers/app-providers";
import "../globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};

  const dict = await getDictionary(lang as Locale);
  return {
    title: {
      default: dict.seo.homeTitle,
      template: `%s | ${dict.seo.siteName}`,
    },
    description: dict.seo.homeDescription,
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {

  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang as Locale);
  return (
    <html
      lang={lang}
      suppressHydrationWarning
      // className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <TooltipProvider>
          <AppProviders networkDictionary={dict.network}>
            {children}
          </AppProviders>
        </TooltipProvider>
      </body>
    </html>
  );
}
