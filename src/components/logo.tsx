import { cn } from "@/lib/utils";

/** The Haru Skin "HS" monogram mark. */
export function LogoMark({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/haru-logo-mark.png" alt="" className={cn("object-contain", className)} />
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
