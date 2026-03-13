import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    position: 'bottom-right', 
  },
  output: 'export',
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['@tauri-apps/api'],
  },
  trailingSlash: true,
};

export default nextConfig;