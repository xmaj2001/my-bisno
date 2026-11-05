"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import enDict from "@/i18n/dictionaries/en.json";
import ptDict from "@/i18n/dictionaries/pt.json";
import Image from "next/image";

export default function NotFound() {
  const pathname = usePathname();
  const lang = pathname?.startsWith("/en") ? "en" : "pt";
  const dict = lang === "en" ? enDict.notFound : ptDict.notFound;

  return (
    <div className="relative flex min-h-screen w-full items-center justify-start overflow-hidden px-6 lg:px-20">
      {/* 1. Imagem de fundo */}
      <Image
        src="/hero-night-doorway.jpg"
        alt="Bisno Background"
        fill
        priority
        className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
      />

      {/* 2. Overlay escuro concentrado no lado esquerdo para isolar o texto */}
      <div className="absolute inset-0 bg-black/70 lg:bg-gradient-to-r lg:from-black/90 lg:via-black/60 lg:to-transparent z-10" />

      {/* 3. Conteúdo estritamente à esquerda */}
      <div className="relative z-20 max-w-lg text-left">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start"
        >
          {/* Logótipo pequeno no topo */}
          <div className="relative mb-6 h-10 w-24">
            <Image
              src="/logo.png"
              alt="Bisno"
              fill
              className="object-contain object-left"
            />
          </div>

          <h1 className="text-7xl lg:text-8xl font-extrabold tracking-tight text-white drop-shadow-md">
            404xxxxxxxx
          </h1>

          <h2 className="mt-3 text-xl lg:text-2xl font-bold text-white tracking-tight">
            {dict.title}
          </h2>
          
          <p className="mt-2 text-sm lg:text-base text-gray-300 leading-relaxed">
            {dict.description}
          </p>

          <div className="mt-6">
            <Link
              href={`/${lang}`}
              className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/35 transition-all hover:bg-primary/90"
            >
              {dict.button}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}