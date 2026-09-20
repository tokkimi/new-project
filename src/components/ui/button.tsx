import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "border border-white/65 bg-transparent text-white shadow-none backdrop-blur-2xl hover:bg-white/8 active:scale-[0.99] dark:border-white/55 dark:bg-transparent dark:text-white dark:hover:bg-white/8",
        secondary:
          "border border-white/55 bg-transparent text-white shadow-none backdrop-blur-2xl hover:bg-white/8 dark:border-white/45 dark:bg-transparent dark:text-white dark:hover:bg-white/8",
        outline:
          "border border-white/55 bg-transparent text-white shadow-none backdrop-blur-2xl hover:bg-white/8 dark:border-white/45 dark:bg-transparent dark:text-white dark:hover:bg-white/8",
        ghost: "border border-transparent bg-transparent text-white shadow-none hover:bg-white/8 dark:text-white dark:hover:bg-white/8",
        link: "text-primary underline-offset-4 hover:underline",
        destructive:
          "bg-destructive text-destructive-foreground hover:brightness-105",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-4 text-xs",
        lg: "h-12 px-7 text-base",
        icon: "size-10",
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
