import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first (best compression, ~50% smaller than JPEG), WebP fallback
    // for browsers without AVIF support. Default here is webp-only.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
