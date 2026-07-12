import { cn } from "@/lib/utils";

/** The full Haru Skin logo lockup (monogram + wordmark). */
export function Logo({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/haru-logo-full.png"
      alt="Haru Skin"
      className={cn("h-14 w-auto object-contain", className)}
    />
  );
}
