import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Haru Skin",
    short_name: "Haru",
    description:
      "Haru analyzes your skincare products, flags ingredient conflicts, and builds your ideal AM/PM routine.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f8f8",
    theme_color: "#f7f8f8",
    orientation: "portrait-primary",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icon-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
  };
}
