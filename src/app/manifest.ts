import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Haru Skin",
    short_name: "Haru",
    description:
      "Haru analyzes your skincare products, flags ingredient conflicts, and builds your ideal AM/PM routine.",
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    orientation: "portrait-primary",
    icons: [
      { src: "/icon.png?v=haru-glass-20260930", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icon-maskable.png?v=haru-glass-20260930",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      { src: "/apple-icon.png?v=haru-glass-20260930", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
  };
}
