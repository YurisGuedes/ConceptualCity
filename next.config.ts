import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first (best compression, ~50% smaller than JPEG), WebP fallback
    // for browsers without AVIF support. Default here is webp-only.
    formats: ["image/avif", "image/webp"],
    // Sanity-hosted blog images (mainImage, in-body images, author photos) —
    // next/image refuses any remote host not explicitly listed here.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
