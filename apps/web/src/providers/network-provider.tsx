"use client";

import { onlineManager } from "@tanstack/react-query";
import { Wifi, WifiOff } from "lucide-react";
import * as React from "react";

interface NetworkContextValue {
  isOnline: boolean;
}

const NetworkContext = React.createContext<NetworkContextValue>({
  isOnline: true,
});

export function useNetworkStatus() {
  return React.useContext(NetworkContext);
}

interface NetworkProviderProps {
  children: React.ReactNode;
  dictionary?: {
    offline: string;
    backOnline: string;
  };
}

export function NetworkProvider({
  children,
  dictionary = {
    offline: "Sem ligação à internet. Algumas ações foram desativadas.",
    backOnline: "Ligação restabelecida!",
  },
}: NetworkProviderProps) {
  const [isOnline, setIsOnline] = React.useState(true);
  const [showStatusBanner, setShowStatusBanner] = React.useState(false);
  const [hasChanged, setHasChanged] = React.useState(false);

  React.useEffect(() => {
    setIsOnline(navigator.onLine);
    onlineManager.setOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      onlineManager.setOnline(true);
      setHasChanged(true);
      setShowStatusBanner(true);
      const timer = setTimeout(() => setShowStatusBanner(false), 4000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      onlineManager.setOnline(false);
      setHasChanged(true);
      setShowStatusBanner(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <NetworkContext.Provider value={{ isOnline }}>
      {children}
      {hasChanged && showStatusBanner && (
        <output
          aria-live="polite"
          className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium shadow-lg transition-all duration-300 ${
            isOnline
              ? "bg-emerald-600 text-white dark:bg-emerald-500"
              : "bg-destructive text-destructive-foreground"
          }`}
        >
          {isOnline ? (
            <>
              <Wifi className="h-4 w-4" />
              <span>{dictionary.backOnline}</span>
            </>
          ) : (
            <>
              <WifiOff className="h-4 w-4" />
              <span>{dictionary.offline}</span>
            </>
          )}
        </output>
      )}
    </NetworkContext.Provider>
  );
}
