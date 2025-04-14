import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Wildcard: allow any HTTPS domain
      },
    ],
  },
};

export default nextConfig;
