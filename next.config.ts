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

  // EMERGENCY: Output configuration for Vercel size limits
  output: 'standalone',

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
    // EMERGENCY: Exclude heavy dependencies from serverless functions
    if (!dev && isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        '@storybook/addon-docs': 'commonjs @storybook/addon-docs',
        '@storybook/addon-a11y': 'commonjs @storybook/addon-a11y',
        '@chromatic-com/storybook': 'commonjs @chromatic-com/storybook',
        '@storybook/nextjs': 'commonjs @storybook/nextjs',
        '@storybook/nextjs-vite': 'commonjs @storybook/nextjs-vite',
        '@vitest/browser': 'commonjs @vitest/browser',
        '@vitest/coverage-v8': 'commonjs @vitest/coverage-v8',
        '@testing-library/react': 'commonjs @testing-library/react',
        '@testing-library/jest-dom': 'commonjs @testing-library/jest-dom',
        '@testing-library/user-event': 'commonjs @testing-library/user-event',
        vitest: 'commonjs vitest',
        concurrently: 'commonjs concurrently',
        husky: 'commonjs husky',
        chalk: 'commonjs chalk',
        'cross-env': 'commonjs cross-env',
        'npm-run-all': 'commonjs npm-run-all',
      });
    }

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

      // EMERGENCY: Aggressive chunk splitting for size reduction
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          // Vendor libraries
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
            maxSize: 244000, // 240KB chunks
          },
          // Radix UI components (heavy)
          radix: {
            test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
            name: 'radix',
            chunks: 'all',
            priority: 20,
            maxSize: 200000, // 200KB max
          },
          // Lucide icons (only used ones)
          lucide: {
            test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
            name: 'lucide',
            chunks: 'all',
            priority: 15,
            maxSize: 100000, // 100KB max
          },
          // Charts library
          recharts: {
            test: /[\\/]node_modules[\\/]recharts[\\/]/,
            name: 'recharts',
            chunks: 'all',
            priority: 12,
            maxSize: 150000, // 150KB max
          },
          // Default group
          default: {
            minChunks: 2,
            priority: -10,
            reuseExistingChunk: true,
            maxSize: 200000, // 200KB max
          },
        },
      };
    }

    return config;
  },
};

export default withBundleAnalyzer(nextConfig);
