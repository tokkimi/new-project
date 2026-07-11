import {
  Droplets,
  Waves,
  Sparkles,
  FlaskConical,
  Target,
  Eye,
  CloudDrizzle,
  Droplet,
  Sun,
  Package,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORY_STYLE: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
    className: string;
  }
> = {
  cleanser: { icon: Droplets, className: "from-success/25 via-success/10 to-transparent text-success" },
  toner: { icon: Waves, className: "from-am/35 via-am/10 to-transparent text-am-foreground" },
  essence: { icon: Sparkles, className: "from-primary/25 via-primary/8 to-transparent text-primary" },
  serum: { icon: FlaskConical, className: "from-primary/35 via-primary/12 to-transparent text-primary" },
  spot: { icon: Target, className: "from-destructive/25 via-destructive/8 to-transparent text-destructive" },
  eye: { icon: Eye, className: "from-pm/25 via-pm/8 to-transparent text-pm" },
  moisturizer: { icon: CloudDrizzle, className: "from-accent/35 via-accent/10 to-transparent text-accent-foreground" },
  oil: { icon: Droplet, className: "from-am/30 via-accent/10 to-transparent text-am-foreground" },
  sunscreen: { icon: Sun, className: "from-am/40 via-am/12 to-transparent text-am-foreground" },
};

export function ProductVisual({
  category,
  size = "md",
  className,
}: {
  category: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const style = CATEGORY_STYLE[category] ?? {
    icon: Package,
    className: "from-muted via-muted/50 to-transparent text-muted-foreground",
  };
  const Icon = style.icon;

  const sizeClasses = {
    sm: "size-12 rounded-xl",
    md: "size-16 rounded-2xl",
    lg: "aspect-square w-full rounded-2xl",
  }[size];

  const iconSize = { sm: "size-5", md: "size-6", lg: "size-12" }[size];

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden bg-gradient-to-br bg-grain",
        sizeClasses,
        style.className,
        className
      )}
    >
      <Icon className={cn(iconSize, "relative")} strokeWidth={1.5} />
    </div>
  );
}
