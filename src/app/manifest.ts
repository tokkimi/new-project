import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Haru — Skincare Routine Intelligence",
    short_name: "Haru",
    description:
      "Haru analyzes your skincare products, flags ingredient conflicts, and builds your ideal AM/PM routine.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbf7f2",
    theme_color: "#e8583f",
    orientation: "portrait-primary",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icon-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
