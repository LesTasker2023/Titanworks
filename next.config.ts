import bundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

// Bundle analyzer for performance optimization
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 year
  },

  // Experimental features for performance
  experimental: {
    optimizePackageImports: ['@radix-ui/react-slot', 'class-variance-authority'],
  },
};

export default withBundleAnalyzer(nextConfig);
