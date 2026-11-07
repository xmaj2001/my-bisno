"use client";


import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Leaf } from "lucide-react";

import { signUpSchema, SignUpValues } from "./schema";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: SignUpValues) {
    console.log("Dados do Formulário:", values);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#111111] p-4 sm:p-6">
      {/* Container Principal */}
      <div className="relative flex w-full max-w-[1000px] overflow-hidden rounded-[32px] border border-amber-900/30 bg-[#0c0a09] shadow-2xl">
        {/* Painel Esquerdo - Imagem */}
        <div className="relative hidden w-1/2 min-h-[620px] md:block">
          <Image
            src="/hero-night-doorway.jpg"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Divisor Central */}
        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 z-10 md:flex items-center justify-center">
          <div className="flex items-center gap-1.5 rounded-full bg-[#1c1917] px-3 py-1.5 border border-amber-900/40 shadow-lg">
            <span className="h-2 w-2 rounded-full bg-amber-400"></span>
            <span className="h-1.5 w-1.5 rounded-full bg-stone-500"></span>
          </div>
        </div>

        {/* Painel Direito - Formulário */}
        <div className="relative flex w-full flex-col justify-between bg-gradient-to-br from-primary via-[#f8d3bb] to-primary p-8 md:w-1/2 md:p-12 text-stone-900">
          {/* Header de Alternância */}
          <div className="flex justify-end text-xs sm:text-sm">
            <span className="text-stone-700">Already have an account? </span>
            <Link
              href="#"
              className="ml-1 font-semibold text-stone-900 underline hover:opacity-80"
            >
              Log In
            </Link>
          </div>

          {/* Seção Principal */}
          <div className="my-auto py-6">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
                Build Your Flow
              </h1>
              <p className="mt-2 text-sm text-stone-700">
                Create your account and get started with a clear mind
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup className="space-y-4">
                {/* Campo de E-mail */}
                <Field data-invalid={!!errors.email}>
                  <FieldLabel htmlFor="email" className="sr-only">
                    Email Address
                  </FieldLabel>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3.5 h-4 w-4 text-stone-500" />
                    <Input
                      id="email"
                      placeholder="Email Address"
                      {...register("email")}
                      aria-invalid={!!errors.email}
                      className="h-12 border-stone-800/10 bg-white/30 pl-10 text-stone-900 placeholder:text-stone-600 focus-visible:ring-amber-900/30 backdrop-blur-sm rounded-xl"
                    />
                  </div>
                  <FieldError
                    errors={[errors.email]}
                    className="text-red-700 text-xs mt-1"
                  />
                </Field>

                {/* Campo de Senha */}
                <Field data-invalid={!!errors.password}>
                  <FieldLabel htmlFor="password" className="sr-only">
                    Password
                  </FieldLabel>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-3.5 h-4 w-4 text-stone-500" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      {...register("password")}
                      aria-invalid={!!errors.password}
                      className="h-12 border-stone-800/10 bg-white/30 pl-10 pr-10 text-stone-900 placeholder:text-stone-600 focus-visible:ring-amber-900/30 backdrop-blur-sm rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 text-stone-600 hover:text-stone-900"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <FieldError
                    errors={[errors.password]}
                    className="text-red-700 text-xs mt-1"
                  />
                </Field>

                {/* Botão de Envio */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#111111] text-white hover:bg-black font-medium transition-all"
                >
                  Sign Up
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </FieldGroup>
            </form>

            {/* Separador */}
            <div className="relative my-8 flex items-center justify-center">
              <div className="w-full border-t border-stone-800/10"></div>
              <span className="absolute bg-transparent px-3 text-xs text-stone-600">
                or continue with
              </span>
            </div>

            {/* Login Social */}
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant="outline"
                type="button"
                className="h-11 border-stone-800/10 bg-white/20 hover:bg-white/40 text-stone-800 backdrop-blur-sm rounded-xl font-normal text-xs sm:text-sm"
              >
                <svg className="mr-1.5 h-4 w-4" viewBox="0 0 24 24">
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
                Google
              </Button>

              <Button
                variant="outline"
                type="button"
                className="h-11 border-stone-800/10 bg-white/20 hover:bg-white/40 text-stone-800 backdrop-blur-sm rounded-xl font-normal text-xs sm:text-sm"
              >
                <svg
                  className="mr-1.5 h-4 w-4 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.13-1.96.99-3.12-1 .04-2.2.67-2.9 1.49-.6.7-1.12 1.83-.98 2.96 1.12.09 2.22-.51 2.89-1.33" />
                </svg>
                Apple
              </Button>

              <Button
                variant="outline"
                type="button"
                className="h-11 border-stone-800/10 bg-white/20 hover:bg-white/40 text-stone-800 backdrop-blur-sm rounded-xl font-normal text-xs sm:text-sm"
              >
                <svg
                  className="mr-1.5 h-4 w-4 fill-[#0088cc]"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .54-1.42.53-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.25.38-.51 1.07-.78 4.18-1.82 6.97-3.02 8.37-3.61 3.99-1.68 4.82-1.97 5.37-1.98.12 0 .39.03.57.17.15.12.19.29.21.41-.01.06.01.24 0 .38z" />
                </svg>
                Telegram
              </Button>
            </div>
          </div>

          {/* Footer Terms */}
          <div className="text-center text-xs text-stone-700">
            By signing up, you agree to our{" "}
            <Link href="#" className="font-semibold text-stone-900 underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="font-semibold text-stone-900 underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
