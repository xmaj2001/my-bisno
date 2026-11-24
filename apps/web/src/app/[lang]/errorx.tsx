"use client";

import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Home,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import enDict from "@/i18n/dictionaries/en.json";
import ptDict from "@/i18n/dictionaries/pt.json";
import { cn } from "@/lib/utils";

interface ErrorProps {
  error: Error & { digest?: string };
  retry: () => void;
  reset?: () => void;
}

export default function ErrorPage({ error, retry, reset }: ErrorProps) {
  const pathname = usePathname();
  const [showDetails, setShowDetails] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  const lang = pathname?.startsWith("/en") ? "en" : "pt";
  const dict = lang === "en" ? enDict.error : ptDict.error;

  useEffect(() => {
    // Log unexpected error for diagnostics
    console.error("Runtime route error caught:", error);
  }, [error]);

  const handleRetry = () => {
    setIsRetrying(true);
    if (typeof retry === "function") {
      retry();
    } else if (typeof reset === "function") {
      reset();
    }
  };

  return (
    <div className="container mx-auto flex min-h-[75vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center animate-in fade-in zoom-in-95 duration-500">
      {/* Animated Error Badge */}
      <div className="relative mb-8 flex items-center justify-center">
        <span className="absolute inline-flex h-24 w-24 animate-ping rounded-full bg-destructive/15 opacity-60" />
        <span className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-destructive/30 bg-destructive/10 text-destructive shadow-lg backdrop-blur-md">
          <AlertTriangle className="h-10 w-10 animate-bounce transition-transform duration-300" />
        </span>
      </div>

      {/* Title & Description */}
      <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        {dict.title}
      </h1>
      <p className="mt-3 max-w-lg text-base text-muted-foreground sm:text-lg">
        {dict.description}
      </p>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <Button
          size="lg"
          onClick={handleRetry}
          disabled={isRetrying}
          className="w-full gap-2 font-semibold shadow-md sm:w-auto"
        >
          <RotateCcw
            className={`h-4 w-4 ${isRetrying ? "animate-spin" : ""}`}
          />
          <span>{dict.retry}</span>
        </Button>

        <Link
          href={`/${lang}`}
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "w-full gap-2 sm:w-auto",
          )}
        >
          <Home className="h-4 w-4" />
          <span>{dict.backHome}</span>
        </Link>
      </div>

      {/* Diagnostic details section */}
      {error && (
        <div className="mt-10 w-full rounded-xl border border-border bg-card/60 p-4 text-left shadow-sm backdrop-blur-sm transition-all">
          <button
            type="button"
            onClick={() => setShowDetails((prev) => !prev)}
            className="flex w-full items-center justify-between text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            <span>
              {dict.digest}{" "}
              <code className="font-mono text-primary">
                {error.digest ?? "N/A"}
              </code>
            </span>
            {showDetails ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          {showDetails && (
            <div className="mt-3 border-t border-border pt-3">
              <pre className="overflow-x-auto rounded-lg bg-muted p-3 font-mono text-xs text-muted-foreground">
                {error.message || "Unknown error occurred"}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
