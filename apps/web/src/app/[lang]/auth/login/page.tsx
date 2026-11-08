"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Globe, Download } from "lucide-react";

import { claudeAuthSchema, ClaudeAuthValues } from "./schema";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

export default function ClaudeAuthPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaudeAuthValues>({
    resolver: zodResolver(claudeAuthSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: ClaudeAuthValues) {
    console.log("Autenticação com e-mail:", values);
  }

  return (
    <div className="min-h-screen bg-night text-primary flex flex-col justify-between font-sans">
      {/* Header / Navbar Simples */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-lg tracking-tight">
          {/* Ícone Estilizado da Logo (Claude style) */}
          <Logo className="text-white" />
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-[#6b6965]">
          <Link href="#" className="hover:text-black transition-colors">
            Meet Claude
          </Link>
          <Link href="#" className="hover:text-black transition-colors">
            Platform
          </Link>
          <Link href="#" className="hover:text-black transition-colors">
            Solutions
          </Link>
          <Link href="#" className="hover:text-black transition-colors">
            Pricing
          </Link>
          <Link href="#" className="hover:text-black transition-colors">
            Resources
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="#" className="text-sm font-medium hover:opacity-80">
            Contact sales
          </Link>
          <Button className="bg-[#1a1918] text-white hover:bg-black rounded-full px-5 text-sm h-9">
            Try Claude
          </Button>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto py-12">
        {/* Coluna Esquerda: Tópicos e Formulário */}
        <div className="lg:col-span-6 flex flex-col justify-center max-w-md">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-normal tracking-tight text-[#1a1918] mb-3">
              Question what’s next
            </h1>
            <p className="text-base text-[#6b6965]">
              Your thinking partner for big ambitions
            </p>
          </div>

          <div className="space-y-3">
            {/* Botão Google */}
            <Button
              variant="outline"
              type="button"
              className="w-full h-12 rounded-xl border-[#e6e4dc] bg-white hover:bg-[#f5f3ed] text-[#1a1918] font-normal flex items-center justify-center gap-3 shadow-sm transition-all"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Continue with Google
            </Button>

            {/* Botão Apple */}
            <Button
              variant="outline"
              type="button"
              className="w-full h-12 rounded-xl border-[#e6e4dc] bg-white hover:bg-[#f5f3ed] text-[#1a1918] font-normal flex items-center justify-center gap-3 shadow-sm transition-all"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.13-1.96.99-3.12-1 .04-2.2.67-2.9 1.49-.6.7-1.12 1.83-.98 2.96 1.12.09 2.22-.51 2.89-1.33" />
              </svg>
              Continue with Apple
            </Button>

            {/* Divisor "or" */}
            <div className="relative my-4 flex items-center justify-center">
              <div className="w-full border-t border-[#e6e4dc]"></div>
              <span className="absolute bg-[#faf9f5] px-3 text-xs text-[#8c8981]">
                or
              </span>
            </div>

            {/* Formulário com o componente Field do Shadcn */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup className="space-y-4">
                <Field data-invalid={!!errors.email}>
                  <FieldLabel htmlFor="email" className="sr-only">
                    Email Address
                  </FieldLabel>
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    {...register("email")}
                    aria-invalid={!!errors.email}
                    className="h-12 border-[#e6e4dc] bg-white px-4 text-[#1a1918] placeholder:text-[#8c8981] focus-visible:ring-1 focus-visible:ring-[#1a1918] rounded-xl shadow-sm"
                  />
                  <FieldError
                    errors={[errors.email]}
                    className="text-red-600 text-xs mt-1"
                  />
                </Field>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl bg-[#1a1918] text-white hover:bg-black font-medium flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  Continue with email
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </FieldGroup>
            </form>

            <p className="text-[11px] text-[#8c8981] text-center mt-3 leading-relaxed">
              By continuing, you agree to our{" "}
              <Link href="#" className="underline hover:text-black">
                Terms
              </Link>{" "}
              &{" "}
              <Link href="#" className="underline hover:text-black">
                Privacy Policy
              </Link>
              .
            </p>

            {/* Download Desktop App Link */}
            <div className="pt-6 flex justify-center">
              <Link
                href="#"
                className="inline-flex items-center gap-2 text-xs text-[#6b6965] hover:text-black font-medium transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                Download the desktop app
              </Link>
            </div>
          </div>
        </div>

        {/* Coluna Direita: Imagem de Exemplo Clean (Workspace estilo Claude) */}
        <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[540px] aspect-[4/4] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/hero-night-doorway.jpg"
              alt="Workspace Overview"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </main>

      {/* Footer Minimalista */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 border-t border-[#e6e4dc] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8c8981]">
        <p>© 2026 Anthropic, PBC</p>
        <div className="flex items-center gap-6 mt-3 sm:mt-0">
          <Link href="#" className="hover:text-black">
            Terms
          </Link>
          <Link href="#" className="hover:text-black">
            Privacy
          </Link>
          <Link href="#" className="hover:text-black flex items-center gap-1">
            <Globe className="h-3.5 w-3.5" /> English
          </Link>
        </div>
      </footer>
    </div>
  );
}
