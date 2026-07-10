import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-serif text-xl", className)}>
      <span className="relative flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <svg viewBox="0 0 24 24" className="size-4" fill="none">
          <path
            d="M12 3c-2.8 3.2-5 6.4-5 9.5A5 5 0 0 0 12 17a5 5 0 0 0 5-4.5C17 9.4 14.8 6.2 12 3Z"
            fill="currentColor"
          />
        </svg>
      </span>
      Haru
    </span>
  );
}
