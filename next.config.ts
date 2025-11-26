import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Allow cross-origin requests from local network devices during development
  allowedDevOrigins: [
    "192.168.137.1",
    "192.168.1.1",
    "172.19.192.1",
    "localhost",
  ],
};

export default nextConfig;
