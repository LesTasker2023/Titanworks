# ⚡ Performance Optimization & Monitoring

_Master Next.js performance: Bundle optimization, Core Web Vitals, and enterprise-scale monitoring_

---

## 🎯 What You'll Learn

- **Bundle Optimization**: Code splitting, tree shaking, and dependency analysis
- **React Performance**: Memoization, virtualization, and rendering optimization
- **Core Web Vitals**: LCP, FID, CLS optimization and monitoring
- **Performance Monitoring**: Real-time metrics, alerting, and analysis
- **Advanced Techniques**: Service workers, caching strategies, and CDN optimization

---

## 🚀 Performance Philosophy at Daedalus

Performance isn't just about speed—it's about **user experience**, **business metrics**, and **developer productivity**:

```typescript
// The Daedalus Performance Strategy
const PERFORMANCE_GOALS = {
  coreWebVitals: {
    LCP: '< 2.5 seconds', // Largest Contentful Paint
    FID: '< 100 milliseconds', // First Input Delay
    CLS: '< 0.1', // Cumulative Layout Shift
  },
  bundleSize: {
    initial: '< 100KB gzipped',
    total: '< 500KB gzipped',
    thirdParty: '< 200KB total',
  },
  runtime: {
    timeToInteractive: '< 3.5 seconds',
    renderTime: '< 16ms per frame',
    memoryUsage: '< 50MB baseline',
  },
  infrastructure: {
    serverResponse: '< 200ms TTFB',
    cdnHitRate: '> 95%',
    uptime: '99.9% SLA',
  },
} as const;

// Quality Standards
const OPTIMIZATION_PRINCIPLES = {
  measureFirst: 'Always measure before optimizing',
  userCentric: 'Optimize for perceived performance',
  progressive: 'Progressive enhancement and graceful degradation',
  sustainable: 'Maintainable optimizations over micro-optimizations',
  monitoring: 'Continuous performance monitoring and alerting',
} as const;
```

---

## 📦 Bundle Optimization

### **Webpack Bundle Analyzer Setup**

```typescript
// next.config.ts - Advanced optimization configuration
import type { NextConfig } from 'next';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const nextConfig: NextConfig = {
  // Performance optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Experimental features for performance
  experimental: {
    // Modern bundling optimizations
    swcMinify: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons', 'react-hook-form'],

    // Memory optimization
    webpackMemoryOptimizations: true,

    // CSS optimization
    optimizeCss: true,
  },

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: false,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Output optimization
  output: 'standalone',
  generateEtags: false,

  // Headers for caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Webpack customization
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    // Bundle analyzer in development
    if (process.env.ANALYZE === 'true') {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true,
        })
      );
    }

    // Optimize chunk splitting
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,

          // Framework chunk (React, Next.js)
          framework: {
            chunks: 'all',
            name: 'framework',
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },

          // Common chunk for shared code
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
            priority: 20,
          },

          // UI library chunk
          ui: {
            name: 'ui',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](@radix-ui|class-variance-authority|clsx|tailwind-merge)[\\/]/,
            priority: 30,
          },

          // Icons chunk
          icons: {
            name: 'icons',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](lucide-react|@heroicons)[\\/]/,
            priority: 25,
          },
        },
      };
    }

    // Tree shaking optimization
    config.optimization.usedExports = true;
    config.optimization.sideEffects = false;

    // Module resolution optimizations
    config.resolve.alias = {
      ...config.resolve.alias,
      // Dedupe React (in case of multiple versions)
      react: require.resolve('react'),
      'react-dom': require.resolve('react-dom'),
    };

    return config;
  },
};

export default nextConfig;
```

### **Advanced Tree Shaking**

```typescript
// utils/tree-shaking-helpers.ts - Optimize import patterns
// ✅ GOOD: Tree-shakable import pattern
export const optimizedImports = {
  // Instead of importing entire libraries
  // import * as Icons from 'lucide-react'; ❌

  // Use specific imports
  ChevronDown: () => import('lucide-react/dist/esm/icons/chevron-down').then(mod => mod.ChevronDown),
  Check: () => import('lucide-react/dist/esm/icons/check').then(mod => mod.Check),
  X: () => import('lucide-react/dist/esm/icons/x').then(mod => mod.X),
} as const;

// Dynamic icon loader with caching
const iconCache = new Map<string, React.ComponentType>();

export const loadIcon = async (iconName: keyof typeof optimizedImports) => {
  if (iconCache.has(iconName)) {
    return iconCache.get(iconName)!;
  }

  const IconComponent = await optimizedImports[iconName]();
  iconCache.set(iconName, IconComponent);
  return IconComponent;
};

// Usage in components
const DynamicIcon = ({ name, ...props }: { name: keyof typeof optimizedImports } & React.SVGProps<SVGSVGElement>) => {
  const [Icon, setIcon] = React.useState<React.ComponentType | null>(null);

  React.useEffect(() => {
    loadIcon(name).then(setIcon);
  }, [name]);

  if (!Icon) {
    return <div className="w-4 h-4 bg-gray-200 animate-pulse rounded" />;
  }

  return <Icon {...props} />;
};

// Bundle analyzer helper
export const analyzeBundleSize = () => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    // Client-side bundle size tracking
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'resource' && entry.name.includes('.js')) {
          console.log(`Bundle: ${entry.name.split('/').pop()}, Size: ${(entry as any).transferSize} bytes`);
        }
      });
    });

    observer.observe({ entryTypes: ['resource'] });
  }
};

// Package.json scripts for bundle analysis
const packageJsonScripts = {
  "analyze": "cross-env ANALYZE=true next build",
  "analyze:server": "cross-env BUNDLE_ANALYZE=server next build",
  "analyze:browser": "cross-env BUNDLE_ANALYZE=browser next build",
  "bundle-size": "npx bundlesize",
  "lighthouse": "lighthouse http://localhost:3000 --output html --output-path ./reports/lighthouse.html",
};
```

### **Dependency Optimization**

```typescript
// scripts/dependency-analyzer.ts - Analyze and optimize dependencies
import { execSync } from 'child_process';
import fs from 'fs/promises';
import path from 'path';

interface DependencyAnalysis {
  name: string;
  version: string;
  size: number;
  gzippedSize: number;
  dependencies: number;
  treeshakable: boolean;
  alternatives?: string[];
}

class DependencyOptimizer {
  private packageJson: any;
  private bundleReport: any;

  constructor() {
    this.loadPackageJson();
  }

  private async loadPackageJson() {
    const content = await fs.readFile('package.json', 'utf-8');
    this.packageJson = JSON.parse(content);
  }

  // Analyze bundle impact of each dependency
  async analyzeDependencies(): Promise<DependencyAnalysis[]> {
    const dependencies = {
      ...this.packageJson.dependencies,
      ...this.packageJson.devDependencies,
    };

    const analyses: DependencyAnalysis[] = [];

    for (const [name, version] of Object.entries(dependencies)) {
      try {
        // Get package size info
        const sizeInfo = await this.getPackageSize(name);
        const depInfo = await this.getDependencyInfo(name);

        analyses.push({
          name,
          version: version as string,
          size: sizeInfo.size,
          gzippedSize: sizeInfo.gzipped,
          dependencies: depInfo.dependencies,
          treeshakable: await this.isTreeShakable(name),
          alternatives: this.getAlternatives(name),
        });
      } catch (error) {
        console.warn(`Failed to analyze ${name}:`, error);
      }
    }

    return analyses.sort((a, b) => b.gzippedSize - a.gzippedSize);
  }

  private async getPackageSize(packageName: string) {
    try {
      const result = execSync(`npx package-size ${packageName} --json`, { encoding: 'utf-8' });
      return JSON.parse(result);
    } catch {
      return { size: 0, gzipped: 0 };
    }
  }

  private async getDependencyInfo(packageName: string) {
    try {
      const result = execSync(`npm view ${packageName} dependencies --json`, { encoding: 'utf-8' });
      const deps = JSON.parse(result);
      return { dependencies: Object.keys(deps || {}).length };
    } catch {
      return { dependencies: 0 };
    }
  }

  private async isTreeShakable(packageName: string): Promise<boolean> {
    try {
      const result = execSync(`npx package-json ${packageName}`, { encoding: 'utf-8' });
      const pkg = JSON.parse(result);
      return pkg.sideEffects === false || pkg.module !== undefined;
    } catch {
      return false;
    }
  }

  private getAlternatives(packageName: string): string[] {
    const alternatives: Record<string, string[]> = {
      lodash: ['ramda', 'just'],
      moment: ['date-fns', 'dayjs'],
      'react-icons': ['lucide-react', '@heroicons/react'],
      'styled-components': ['emotion', 'stitches'],
      axios: ['ky', 'fetch'],
    };

    return alternatives[packageName] || [];
  }

  // Generate optimization recommendations
  async generateReport(): Promise<void> {
    const analyses = await this.analyzeDependencies();
    const heavyDeps = analyses.filter(dep => dep.gzippedSize > 50000); // > 50KB
    const nonTreeShakable = analyses.filter(dep => !dep.treeshakable && dep.gzippedSize > 10000);

    const report = {
      summary: {
        totalDependencies: analyses.length,
        totalSize: analyses.reduce((sum, dep) => sum + dep.gzippedSize, 0),
        heavyDependencies: heavyDeps.length,
        nonTreeShakable: nonTreeShakable.length,
      },
      recommendations: [
        ...heavyDeps.map(dep => ({
          type: 'heavy_dependency',
          package: dep.name,
          size: dep.gzippedSize,
          recommendation: dep.alternatives?.length
            ? `Consider replacing with: ${dep.alternatives.join(', ')}`
            : 'Consider if this dependency is necessary',
        })),
        ...nonTreeShakable.map(dep => ({
          type: 'tree_shaking',
          package: dep.name,
          recommendation: 'Use specific imports instead of default imports',
        })),
      ],
      dependencies: analyses,
    };

    await fs.writeFile('reports/dependency-analysis.json', JSON.stringify(report, null, 2));
    console.log('📊 Dependency analysis complete. Check reports/dependency-analysis.json');
  }
}

// Usage
const optimizer = new DependencyOptimizer();
optimizer.generateReport();
```

---

## ⚡ React Performance Optimization

### **Advanced Memoization Patterns**

```typescript
// hooks/useOptimizedState.ts - Performance-optimized state management
import { useCallback, useMemo, useRef, useState } from 'react';

// Debounced state for expensive operations
export const useDebouncedState = <T>(initialValue: T, delay: number = 300) => {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const updateValue = useCallback((newValue: T | ((prev: T) => T)) => {
    setValue(newValue);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(typeof newValue === 'function' ? (newValue as Function)(value) : newValue);
    }, delay);
  }, [delay, value]);

  return [debouncedValue, updateValue] as const;
};

// Memoized callback with dependency tracking
export const useStableMemo = <T>(fn: () => T, deps: React.DependencyList): T => {
  const depsRef = useRef<React.DependencyList>();
  const valueRef = useRef<T>();

  // Check if dependencies changed
  const depsChanged = !depsRef.current ||
    deps.length !== depsRef.current.length ||
    deps.some((dep, index) => dep !== depsRef.current![index]);

  if (depsChanged) {
    depsRef.current = deps;
    valueRef.current = fn();
  }

  return valueRef.current!;
};

// Optimized component with advanced memoization
interface OptimizedComponentProps {
  items: Array<{ id: string; name: string; category: string }>;
  onItemSelect: (item: { id: string; name: string }) => void;
  searchTerm: string;
  selectedCategory: string;
}

const OptimizedComponent = React.memo<OptimizedComponentProps>(({
  items,
  onItemSelect,
  searchTerm,
  selectedCategory,
}) => {
  // Memoize expensive filtering operations
  const filteredItems = useMemo(() => {
    console.log('🔍 Filtering items...'); // This should only log when items/filters change

    return items.filter(item => {
      const matchesSearch = !searchTerm ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory ||
        item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [items, searchTerm, selectedCategory]);

  // Stable callback that won't cause child re-renders
  const handleItemSelect = useCallback((item: { id: string; name: string }) => {
    onItemSelect(item);
  }, [onItemSelect]);

  // Memoize categories for dropdown
  const categories = useStableMemo(() => {
    return Array.from(new Set(items.map(item => item.category))).sort();
  }, [items]);

  return (
    <div className="optimized-component">
      <div className="filters">
        <CategoryDropdown
          categories={categories}
          selectedCategory={selectedCategory}
        />
      </div>

      <div className="items">
        {filteredItems.map(item => (
          <ItemCard
            key={item.id}
            item={item}
            onSelect={handleItemSelect}
          />
        ))}
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison for optimized re-rendering
  return (
    prevProps.items.length === nextProps.items.length &&
    prevProps.searchTerm === nextProps.searchTerm &&
    prevProps.selectedCategory === nextProps.selectedCategory &&
    prevProps.onItemSelect === nextProps.onItemSelect
  );
});

// Individual item component with memo
const ItemCard = React.memo<{
  item: { id: string; name: string };
  onSelect: (item: { id: string; name: string }) => void;
}>(({ item, onSelect }) => {
  // Stable click handler
  const handleClick = useCallback(() => {
    onSelect(item);
  }, [item, onSelect]);

  return (
    <div
      className="item-card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <h3>{item.name}</h3>
      <span>ID: {item.id}</span>
    </div>
  );
});
```

### **Virtual Scrolling Implementation**

```typescript
// components/VirtualScroller.tsx - High-performance list rendering
import { useCallback, useEffect, useRef, useState } from 'react';

interface VirtualScrollerProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  overscan?: number; // Number of items to render outside visible area
}

export const VirtualScroller = <T,>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  overscan = 3,
}: VirtualScrollerProps<T>) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate visible range
  const visibleRange = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.ceil((scrollTop + containerHeight) / itemHeight);

    return {
      start: Math.max(0, start - overscan),
      end: Math.min(items.length, end + overscan),
    };
  }, [scrollTop, itemHeight, containerHeight, items.length, overscan]);

  // Handle scroll events with throttling
  const handleScroll = useCallback(
    throttle((e: React.UIEvent<HTMLDivElement>) => {
      setScrollTop(e.currentTarget.scrollTop);
    }, 16), // 60fps
    []
  );

  // Calculate total height for scrollbar
  const totalHeight = items.length * itemHeight;

  return (
    <div
      ref={containerRef}
      className="virtual-scroller"
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={handleScroll}
    >
      {/* Spacer for total height */}
      <div style={{ height: totalHeight, position: 'relative' }}>
        {/* Render only visible items */}
        <div
          style={{
            position: 'absolute',
            top: visibleRange.start * itemHeight,
            left: 0,
            right: 0,
          }}
        >
          {items
            .slice(visibleRange.start, visibleRange.end)
            .map((item, index) => (
              <div
                key={visibleRange.start + index}
                style={{ height: itemHeight }}
              >
                {renderItem(item, visibleRange.start + index)}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

// Throttle helper for scroll performance
function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): T {
  let inThrottle: boolean;
  return ((...args: any[]) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  }) as T;
}

// Usage example with 10,000 items
const LargeListExample = () => {
  const items = useMemo(() =>
    Array.from({ length: 10000 }, (_, i) => ({
      id: i,
      name: `Item ${i}`,
      value: Math.random() * 1000,
    }))
  , []);

  return (
    <VirtualScroller
      items={items}
      itemHeight={50}
      containerHeight={400}
      overscan={5}
      renderItem={(item, index) => (
        <div className="flex items-center p-3 border-b">
          <span className="font-medium">{item.name}</span>
          <span className="ml-auto text-gray-500">
            ${item.value.toFixed(2)}
          </span>
        </div>
      )}
    />
  );
};
```

---

## 📊 Performance Monitoring

### **Real-Time Performance Tracking**

```typescript
// utils/performance-monitor.ts - Comprehensive performance monitoring
class PerformanceMonitor {
  private metrics: Map<string, number[]> = new Map();
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initializeObservers();
  }

  private initializeObservers() {
    // Core Web Vitals monitoring
    if (typeof window !== 'undefined') {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.recordMetric('LCP', lastEntry.startTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(lcpObserver);

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries() as PerformanceEventTiming[];
        entries.forEach((entry) => {
          this.recordMetric('FID', entry.processingStart - entry.startTime);
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.push(fidObserver);

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries() as LayoutShift[];
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        this.recordMetric('CLS', clsValue);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(clsObserver);

      // Resource loading performance
      const resourceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries() as PerformanceResourceTiming[];
        entries.forEach((entry) => {
          if (entry.name.includes('.js') || entry.name.includes('.css')) {
            this.recordMetric('ResourceLoad', entry.responseEnd - entry.requestStart);
          }
        });
      });
      resourceObserver.observe({ entryTypes: ['resource'] });
      this.observers.push(resourceObserver);

      // Memory usage monitoring
      if ('memory' in performance) {
        setInterval(() => {
          const memory = (performance as any).memory;
          this.recordMetric('MemoryUsage', memory.usedJSHeapSize / 1024 / 1024); // MB
        }, 30000); // Every 30 seconds
      }
    }
  }

  private recordMetric(name: string, value: number) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }

    const values = this.metrics.get(name)!;
    values.push(value);

    // Keep only last 100 measurements
    if (values.length > 100) {
      values.shift();
    }

    // Send to analytics if available
    this.sendToAnalytics(name, value);
  }

  private sendToAnalytics(metric: string, value: number) {
    // Google Analytics 4 example
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'performance_metric', {
        metric_name: metric,
        metric_value: Math.round(value),
        custom_map: { metric_1: metric },
      });
    }

    // Custom analytics endpoint
    if (process.env.NODE_ENV === 'production') {
      fetch('/api/analytics/performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metric,
          value,
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          url: window.location.href,
        }),
      }).catch(() => {}); // Silent fail
    }
  }

  // Get performance summary
  getMetrics() {
    const summary: Record<string, { avg: number; p95: number; latest: number }> = {};

    this.metrics.forEach((values, name) => {
      const sorted = [...values].sort((a, b) => a - b);
      const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
      const p95Index = Math.floor(sorted.length * 0.95);
      const p95 = sorted[p95Index] || 0;
      const latest = values[values.length - 1] || 0;

      summary[name] = { avg, p95, latest };
    });

    return summary;
  }

  // Manual timing for custom metrics
  startTiming(name: string) {
    const start = performance.now();
    return () => {
      const duration = performance.now() - start;
      this.recordMetric(name, duration);
      return duration;
    };
  }

  // React component performance tracking
  trackComponentRender(componentName: string) {
    const end = this.startTiming(`Component_${componentName}_Render`);

    return {
      componentDidMount: () => end(),
      componentDidUpdate: () => end(),
    };
  }

  // Cleanup
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.metrics.clear();
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

// React hook for component performance tracking
export const usePerformanceTracking = (componentName: string) => {
  useEffect(() => {
    const tracker = performanceMonitor.trackComponentRender(componentName);

    return () => {
      tracker.componentDidMount();
    };
  }, [componentName]);
};

// Performance dashboard component
const PerformanceDashboard = () => {
  const [metrics, setMetrics] = useState<Record<string, any>>({});

  useEffect(() => {
    const updateMetrics = () => {
      setMetrics(performanceMonitor.getMetrics());
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 5000);

    return () => clearInterval(interval);
  }, []);

  const getScoreColor = (metric: string, value: number) => {
    const thresholds = {
      LCP: { good: 2500, poor: 4000 },
      FID: { good: 100, poor: 300 },
      CLS: { good: 0.1, poor: 0.25 },
      MemoryUsage: { good: 50, poor: 100 },
    };

    const threshold = thresholds[metric as keyof typeof thresholds];
    if (!threshold) return 'text-gray-600';

    if (value <= threshold.good) return 'text-green-600';
    if (value <= threshold.poor) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="performance-dashboard p-6">
      <h2 className="text-2xl font-bold mb-4">Performance Metrics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(metrics).map(([name, data]) => (
          <div key={name} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium text-gray-900">{name}</h3>
            <div className="mt-2">
              <div className={`text-2xl font-bold ${getScoreColor(name, data.latest)}`}>
                {data.latest.toFixed(1)}{name.includes('Memory') ? ' MB' : ' ms'}
              </div>
              <div className="text-sm text-gray-500">
                Avg: {data.avg.toFixed(1)} | P95: {data.p95.toFixed(1)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
```

### **Performance Budget Enforcement**

```typescript
// scripts/performance-budget.ts - Automated performance budget checking
import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';

interface PerformanceBudget {
  bundleSize: {
    initial: number;
    total: number;
    chunks: Record<string, number>;
  };
  assets: {
    images: number;
    fonts: number;
    css: number;
  };
  metrics: {
    lcp: number;
    fid: number;
    cls: number;
  };
}

const PERFORMANCE_BUDGET: PerformanceBudget = {
  bundleSize: {
    initial: 100 * 1024, // 100KB
    total: 500 * 1024, // 500KB
    chunks: {
      framework: 150 * 1024,
      commons: 100 * 1024,
      ui: 50 * 1024,
    },
  },
  assets: {
    images: 2 * 1024 * 1024, // 2MB
    fonts: 100 * 1024, // 100KB
    css: 50 * 1024, // 50KB
  },
  metrics: {
    lcp: 2500, // ms
    fid: 100, // ms
    cls: 0.1, // score
  },
};

class PerformanceBudgetChecker {
  private violations: string[] = [];

  async checkBundleSizes() {
    try {
      // Build the application
      console.log('🔨 Building application...');
      execSync('npm run build', { stdio: 'inherit' });

      // Analyze bundle sizes
      const buildDir = '.next';
      await this.analyzeBuildOutput(buildDir);
    } catch (error) {
      this.violations.push(`Build failed: ${error}`);
    }
  }

  private async analyzeBuildOutput(buildDir: string) {
    const staticDir = path.join(buildDir, 'static');

    try {
      const chunks = await fs.readdir(path.join(staticDir, 'chunks'));
      let totalSize = 0;

      for (const chunk of chunks) {
        if (chunk.endsWith('.js')) {
          const chunkPath = path.join(staticDir, 'chunks', chunk);
          const stats = await fs.stat(chunkPath);
          const size = stats.size;
          totalSize += size;

          // Check individual chunk budgets
          const chunkName = this.getChunkName(chunk);
          const budget = PERFORMANCE_BUDGET.bundleSize.chunks[chunkName];

          if (budget && size > budget) {
            this.violations.push(
              `Chunk ${chunkName} (${chunk}) exceeds budget: ${this.formatBytes(size)} > ${this.formatBytes(budget)}`
            );
          }
        }
      }

      // Check total bundle size
      if (totalSize > PERFORMANCE_BUDGET.bundleSize.total) {
        this.violations.push(
          `Total bundle size exceeds budget: ${this.formatBytes(totalSize)} > ${this.formatBytes(PERFORMANCE_BUDGET.bundleSize.total)}`
        );
      }
    } catch (error) {
      this.violations.push(`Failed to analyze build output: ${error}`);
    }
  }

  private getChunkName(filename: string): string {
    if (filename.includes('framework')) return 'framework';
    if (filename.includes('commons')) return 'commons';
    if (filename.includes('ui')) return 'ui';
    return 'other';
  }

  async checkAssetSizes() {
    const publicDir = 'public';

    try {
      const files = await this.getAllFiles(publicDir);
      const assetSizes = {
        images: 0,
        fonts: 0,
        css: 0,
      };

      for (const file of files) {
        const stats = await fs.stat(file);
        const size = stats.size;

        if (this.isImage(file)) {
          assetSizes.images += size;
        } else if (this.isFont(file)) {
          assetSizes.fonts += size;
        } else if (this.isCss(file)) {
          assetSizes.css += size;
        }
      }

      // Check asset budgets
      Object.entries(assetSizes).forEach(([type, size]) => {
        const budget = PERFORMANCE_BUDGET.assets[type as keyof typeof PERFORMANCE_BUDGET.assets];
        if (size > budget) {
          this.violations.push(`${type} assets exceed budget: ${this.formatBytes(size)} > ${this.formatBytes(budget)}`);
        }
      });
    } catch (error) {
      this.violations.push(`Failed to check asset sizes: ${error}`);
    }
  }

  private async getAllFiles(dir: string): Promise<string[]> {
    const files: string[] = [];

    try {
      const items = await fs.readdir(dir);

      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stats = await fs.stat(fullPath);

        if (stats.isDirectory()) {
          const subFiles = await this.getAllFiles(fullPath);
          files.push(...subFiles);
        } else {
          files.push(fullPath);
        }
      }
    } catch (error) {
      // Directory might not exist
    }

    return files;
  }

  private isImage(filename: string): boolean {
    return /\.(jpg|jpeg|png|gif|webp|avif|svg)$/i.test(filename);
  }

  private isFont(filename: string): boolean {
    return /\.(woff|woff2|ttf|otf|eot)$/i.test(filename);
  }

  private isCss(filename: string): boolean {
    return /\.css$/i.test(filename);
  }

  async runLighthouseAudit() {
    try {
      console.log('🔍 Running Lighthouse audit...');

      // Start the application
      const server = execSync('npm run start &', { stdio: 'pipe' });

      // Wait for server to start
      await new Promise(resolve => setTimeout(resolve, 5000));

      // Run Lighthouse
      const result = execSync(
        'npx lighthouse http://localhost:3000 --chrome-flags="--headless" --output=json --quiet',
        { encoding: 'utf-8' }
      );

      const report = JSON.parse(result);
      const metrics = report.lhr.audits;

      // Check Core Web Vitals
      const lcp = metrics['largest-contentful-paint']?.numericValue || 0;
      const fid = metrics['first-input-delay']?.numericValue || 0;
      const cls = metrics['cumulative-layout-shift']?.numericValue || 0;

      if (lcp > PERFORMANCE_BUDGET.metrics.lcp) {
        this.violations.push(`LCP exceeds budget: ${lcp}ms > ${PERFORMANCE_BUDGET.metrics.lcp}ms`);
      }

      if (fid > PERFORMANCE_BUDGET.metrics.fid) {
        this.violations.push(`FID exceeds budget: ${fid}ms > ${PERFORMANCE_BUDGET.metrics.fid}ms`);
      }

      if (cls > PERFORMANCE_BUDGET.metrics.cls) {
        this.violations.push(`CLS exceeds budget: ${cls} > ${PERFORMANCE_BUDGET.metrics.cls}`);
      }

      // Kill the server
      execSync('pkill -f "npm run start"');
    } catch (error) {
      this.violations.push(`Lighthouse audit failed: ${error}`);
    }
  }

  private formatBytes(bytes: number): string {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${Math.round((bytes / Math.pow(1024, i)) * 100) / 100} ${sizes[i]}`;
  }

  async generateReport() {
    console.log('📊 Checking performance budget...');

    await this.checkBundleSizes();
    await this.checkAssetSizes();
    await this.runLighthouseAudit();

    const report = {
      timestamp: new Date().toISOString(),
      budget: PERFORMANCE_BUDGET,
      violations: this.violations,
      passed: this.violations.length === 0,
    };

    await fs.writeFile('reports/performance-budget.json', JSON.stringify(report, null, 2));

    if (this.violations.length === 0) {
      console.log('✅ All performance budgets passed!');
    } else {
      console.log('❌ Performance budget violations:');
      this.violations.forEach(violation => console.log(`  - ${violation}`));

      if (process.env.CI) {
        process.exit(1); // Fail CI build
      }
    }

    return report;
  }
}

// Run the checker
const checker = new PerformanceBudgetChecker();
checker.generateReport();
```

---

## 🎯 Next Steps & Advanced Optimization

Ready to achieve peak performance?

1. **🧪 [Testing Strategy](./06-testing-strategy.md)** - Performance testing integration
2. **📚 [Storybook Documentation](./08-storybook-documentation.md)** - Performance metrics in Storybook
3. **♿ [Accessibility](./05-accessibility-patterns.md)** - Accessible performance optimization
4. **🎨 [Design System](./11-design-system.md)** - Performance-optimized design tokens

---

## ⚡ Performance Mastery Checklist

**✅ Bundle Optimization**

- [ ] Code splitting implemented
- [ ] Tree shaking configured
- [ ] Bundle analyzer integrated
- [ ] Performance budgets enforced

**✅ React Performance**

- [ ] Memoization patterns mastered
- [ ] Virtual scrolling implemented
- [ ] Lazy loading configured
- [ ] Render optimization complete

**✅ Core Web Vitals**

- [ ] LCP < 2.5s consistently
- [ ] FID < 100ms achieved
- [ ] CLS < 0.1 maintained
- [ ] Real-time monitoring active

**✅ Infrastructure**

- [ ] CDN configuration optimized
- [ ] Caching strategies implemented
- [ ] Performance monitoring dashboard
- [ ] Automated performance testing

---

## 💫 Pro Performance Tips

- **Measure first, optimize second**: Always profile before optimizing
- **User-centric metrics**: Focus on perceived performance, not just technical metrics
- **Progressive enhancement**: Build fast, then enhance with features
- **Continuous monitoring**: Performance is not a one-time fix
- **Budget enforcement**: Set and maintain strict performance budgets
- **Real-world testing**: Test on real devices with real network conditions
- **Critical path optimization**: Prioritize above-the-fold content
- **Graceful degradation**: Ensure functionality on slower devices/connections

---

_Performance mastery achieved! Your applications now deliver lightning-fast experiences at enterprise scale._ ⚡🚀
