"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { Dictionary } from "@/i18n/get-dictionary";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient, signIn } from "../auth-client";
interface LoginFormProps {
  lang: string;
  translations: Dictionary["auth"];
}

export function LoginForm({ lang, translations }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function getCallbackUrl() {
    const requestedUrl = searchParams.get("callbackUrl");
    return requestedUrl?.startsWith(`/${lang}/`)
      ? requestedUrl
      : `/${lang}/system`;
  }
  const copy = translations.login;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const callbackURL = getCallbackUrl();

    void signIn
      .email(
        {
          email: String(formData.get("email")),
          password: String(formData.get("password")),
          rememberMe: formData.get("rememberMe") === "on",
          callbackURL,
        },
        {
          onError: () => {
            setError(copy.loginError);
            toast.warning(copy.loginError);
            setLoading(false);
          },
          onSuccess: () => {
            router.replace(callbackURL);
            router.refresh();
          },
        },
      )
      .catch(() => {
        setError(copy.genericError);
        toast.error(copy.genericError);
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          BISNO
        </p>
        <h2 className="text-3xl font-bold tracking-tight">{copy.title}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {copy.description}
        </p>
      </div>

      <FieldGroup className="gap-4">
        <Field>
          <FieldLabel htmlFor="login-email">{copy.email}</FieldLabel>
          <Input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={copy.emailPlaceholder}
            required
            className="h-11"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="login-password">{copy.password}</FieldLabel>
          <Input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="h-11"
          />
        </Field>
      </FieldGroup>

      <Button
        type="submit"
        disabled={loading}
        size="lg"
        className="h-12 w-full text-sm"
      >
        {loading ? copy.signingIn : copy.continue}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {copy.noAccount}{" "}
        <Link
          href={`/${lang}/auth/register`}
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          {copy.createAccount}
        </Link>
      </p>
    </form>
  );
}
