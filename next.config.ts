import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Cloudinary is the media source. Images are requested through the
    // loader in lib/cloudinary.ts, so no remote host is whitelisted here
    // beyond Cloudinary's delivery domain.
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
