import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { RegisterForm } from "@/features/auth/components/register-form";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};

  const dict = await getDictionary(lang);
  return {
    title: dict.auth.register.title,
    description: dict.auth.register.description,
  };
}

export default async function RegisterPage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  return (
    <AuthShell lang={lang} translations={dict.auth}>
      <RegisterForm lang={lang} translations={dict.auth} />
    </AuthShell>
  );
}
