"use client";

import * as React from "react";
import { ProductVisual } from "@/components/product-visual";
import { cn } from "@/lib/utils";

type ProductImageSize = "sm" | "md" | "lg";

const SIZE_CLASS: Record<ProductImageSize, string> = {
  sm: "size-12 rounded-xl",
  md: "size-24 rounded-2xl",
  lg: "aspect-square w-full rounded-none",
};

const FALLBACK_SIZE: Record<ProductImageSize, "sm" | "md" | "lg"> = {
  sm: "sm",
  md: "md",
  lg: "lg",
};

export function ProductImage({
  imageUrl,
  category,
  name,
  size = "md",
  className,
}: {
  imageUrl?: string | null;
  category: string;
  name: string;
  size?: ProductImageSize;
  className?: string;
}) {
  const sizeClass = SIZE_CLASS[size];
  const [failed, setFailed] = React.useState(false);

  const wrapper = cn(
    "flex shrink-0 items-center justify-center overflow-hidden bg-white p-3 ring-1 ring-border/70",
    sizeClass,
    className
  );

  // No usable image (missing, or the real one failed to load) → branded swatch.
  if (!imageUrl || failed) {
    return (
      <div className={wrapper}>
        <ProductVisual
          category={category}
          size={FALLBACK_SIZE[size]}
          className={cn(size === "lg" && "h-full w-full rounded-xl", size !== "lg" && "rounded-lg")}
        />
      </div>
    );
  }

  return (
    <div className={wrapper}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt={name}
        className="h-full w-full object-contain"
        loading="lazy"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
