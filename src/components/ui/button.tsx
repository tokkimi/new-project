import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "haru-liquid-button inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 text-xs font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-3.5 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "border border-primary bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:scale-[0.99]",
        secondary:
          "border border-border bg-secondary text-secondary-foreground shadow-none hover:bg-secondary/75",
        outline:
          "border border-input bg-card/80 text-foreground shadow-none backdrop-blur-xl hover:bg-secondary",
        ghost: "border border-transparent bg-transparent text-foreground shadow-none hover:bg-secondary",
        link: "text-primary underline-offset-4 hover:underline",
        destructive:
          "bg-destructive text-destructive-foreground hover:brightness-105",
      },
      size: {
        default: "h-9 px-4 text-xs",
        sm: "h-9 px-4 text-xs",
        lg: "h-9 px-4 text-xs",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
