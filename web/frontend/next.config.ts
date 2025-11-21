import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['wonderjarcreative.local', 'cms.wonderjarcreative.com', 'wonderjarcreative.com']
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;
