import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AuthShell } from "@/features/auth/components/auth-shell/auth-shell";
import { LoginForm } from "@/features/auth/components/login-form/login-form";
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
    title: dict.auth.login.title,
    description: dict.auth.login.description,
  };
}

export default async function LoginPage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  return (
    <AuthShell lang={lang} translations={dict.auth}>
      <LoginForm lang={lang} translations={dict.auth} />
    </AuthShell>
  );
}
