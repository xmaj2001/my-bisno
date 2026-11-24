import { cn } from "@/lib/utils";
import { Reveal } from "../Reveal";

/** "01 ——— Catálogo": numbered label that opens every section. */
export function SectionLabel({
  n,
  children,
  className,
}: {
  n: string;
  children: string;
  className?: string;
}) {
  return (
    <Reveal className={cn("flex items-center gap-4", className)}>
      <span className="font-wide text-xs font-bold text-primary">{n}</span>
      <span className="h-px w-12 bg-current opacity-30" />
      <span className="eyebrow text-muted-foreground">{children}</span>
    </Reveal>
  );
}
