"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { Dictionary } from "@/i18n/get-dictionary";

interface RegisterFormProps {
  lang: string;
  translations: Dictionary["auth"];
}

export function RegisterForm({ lang, translations }: RegisterFormProps) {
  const copy = translations.register;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (formData.get("password") !== formData.get("confirmPassword")) {
      toast.error(translations.passwordMismatch);
      return;
    }

    toast.info(translations.submitUnavailable);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
          <FieldLabel htmlFor="register-name">{copy.fullName}</FieldLabel>
          <Input
            id="register-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder={copy.fullNamePlaceholder}
            required
            className="h-11"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="register-email">{copy.email}</FieldLabel>
          <Input
            id="register-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={copy.emailPlaceholder}
            required
            className="h-11"
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="register-password">{copy.password}</FieldLabel>
            <Input
              id="register-password"
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              className="h-11"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="register-confirm-password">
              {copy.confirmPassword}
            </FieldLabel>
            <Input
              id="register-confirm-password"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              className="h-11"
            />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="register-gender">{copy.gender}</FieldLabel>
            <select
              id="register-gender"
              name="gender"
              required
              defaultValue=""
              className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <option value="" disabled>
                {copy.genderPlaceholder}
              </option>
              <option value="female">{copy.genderOptions.female}</option>
              <option value="male">{copy.genderOptions.male}</option>
              <option value="other">{copy.genderOptions.other}</option>
              <option value="prefer-not-to-say">
                {copy.genderOptions.preferNotToSay}
              </option>
            </select>
          </Field>
          <Field>
            <FieldLabel htmlFor="register-birth-date">
              {copy.birthDate}
            </FieldLabel>
            <Input
              id="register-birth-date"
              name="birthDate"
              type="date"
              autoComplete="bday"
              required
              className="h-11"
            />
          </Field>
        </div>
      </FieldGroup>

      <Button type="submit" size="lg" className="h-12 w-full text-sm">
        {copy.submit}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {copy.haveAccount}{" "}
        <Link
          href={`/${lang}/auth/login`}
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          {copy.login}
        </Link>
      </p>
    </form>
  );
}
