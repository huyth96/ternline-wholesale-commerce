import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ternline Wholesale Commerce",
    short_name: "Ternline",
    description: "A data-aware wholesale workplace ordering application.",
    start_url: "/",
    display: "standalone",
    background_color: "#F6F1E8",
    theme_color: "#123849",
  };
}
