import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ipfs.io',
      },
      {
        protocol: 'https',
        hostname: 'gateway.ipfs.io',
      },
    ],
    unoptimized: false, // Enable optimization
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  // Code splitting optimizations
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Optimize chunks
      config.optimization.splitChunks.chunks = 'all';
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
        },
        wagmi: {
          test: /[\\/]node_modules[\\/](wagmi|@wagmi|viem|ethers)[\\/]/,
          name: 'wagmi',
          chunks: 'all',
          priority: 20,
        },
        ui: {
          test: /[\\/]components[\\/]/,
          name: 'ui',
          chunks: 'all',
          priority: 15,
        },
      };
    }
    return config;
  },
};

export default bundleAnalyzer(nextConfig);
