import bundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';
import path from 'path';

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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Experimental features for performance
  experimental: {
    optimizePackageImports: [
      '@radix-ui/react-slot',
      'class-variance-authority',
      'lucide-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
      '@radix-ui/react-accordion',
      '@radix-ui/react-avatar',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-progress',
      '@radix-ui/react-slider',
      'framer-motion', // If used
      'date-fns', // If used
    ],
    // Enhanced tree shaking for modern browsers
    optimizeCss: true,
    // Note: turbo config moved to turbopack in Next.js 15+
  },

  // Turbopack configuration (Next.js 15+)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, 'src'),
      };

      // Enhanced tree shaking optimization
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;

      // Advanced tree shaking for modules
      config.optimization.providedExports = true;
      config.optimization.innerGraph = true;

      // Remove unused CSS and dead code
      config.optimization.concatenateModules = true;

      // Split chunks for better caching and tree shaking
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks?.cacheGroups,
          // Separate chunk for Radix UI components
          radix: {
            test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
            name: 'radix',
            chunks: 'all',
            priority: 10,
          },
          // Separate chunk for Lucide icons (only used ones)
          lucide: {
            test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
            name: 'lucide',
            chunks: 'all',
            priority: 9,
          },
        },
      };
    }

    return config;
  },
};

export default withBundleAnalyzer(nextConfig);
