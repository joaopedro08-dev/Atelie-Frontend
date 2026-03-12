import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    position: 'bottom-right', 
  },
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;