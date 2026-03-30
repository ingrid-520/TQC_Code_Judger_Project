import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/TQC_Code_Judger_Project",
  images: {
    unoptimized: true,
  },
  turbopack: {},
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Fix Monaco Editor AMD loader conflicting with Next.js error overlays in ALL modules
      config.module.rules.push({
        test: /\.js$/,
        parser: { amd: false },
      });
    }
    return config;
  },
};

export default nextConfig;
