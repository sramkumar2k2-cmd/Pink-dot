import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",          // REQUIRED for Hostinger
  images: {
    unoptimized: true,       // Next/Image must be unoptimized for export
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
