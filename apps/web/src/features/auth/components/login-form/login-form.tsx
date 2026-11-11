"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { Dictionary } from "@/i18n/get-dictionary";

interface LoginFormProps {
  lang: string;
  translations: Dictionary["auth"];
}

export function LoginForm({ lang, translations }: LoginFormProps) {
  const copy = translations.login;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.info(translations.submitUnavailable);
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

      <Button type="submit" size="lg" className="h-12 w-full text-sm">
        {copy.submit}
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
