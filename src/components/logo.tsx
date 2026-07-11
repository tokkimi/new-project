import { cn } from "@/lib/utils";

/**
 * "Haru" (하루) = "one day" in Korean — the mark is a sunrise: a rising
 * disc cut by a horizon line, echoing the app's AM/PM routine concept.
 * Deliberately not a droplet shape.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} fill="none">
      <circle cx="14" cy="14" r="14" className="fill-primary" />
      <path d="M7.5 17.5a6.5 6.5 0 0 1 13 0Z" className="fill-primary-foreground" />
      <path d="M6.5 17.5h15" className="stroke-primary" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-serif text-xl", className)}>
      <LogoMark className="size-7 shrink-0" />
      Haru
    </span>
  );
}
