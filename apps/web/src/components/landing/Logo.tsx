import { cn } from "@/lib/utils";
import { LogoMark } from "../logo-mark";


export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark className="h-8 w-auto" />
      <span className="font-display text-xl font-bold tracking-[0.18em] text-foreground">
        BISNO
      </span>
    </span>
  );
}
