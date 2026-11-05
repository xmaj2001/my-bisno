"use client";

import type * as React from "react";
import { NetworkProvider } from "./network-provider";
import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";

interface AppProvidersProps {
  children: React.ReactNode;
  networkDictionary?: {
    offline: string;
    backOnline: string;
  };
}

export function AppProviders({
  children,
  networkDictionary,
}: AppProvidersProps) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <NetworkProvider dictionary={networkDictionary}>
          {children}
        </NetworkProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
