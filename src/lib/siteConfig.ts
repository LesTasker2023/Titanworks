import siteConfigData from '../../data/siteConfig.json';

// Type definitions for site configuration
export interface SiteConfig {
  site: {
    name: string;
    title: string;
    description: string;
    url: string;
    logo: {
      path: string;
      alt: string;
      width: number;
      height: number;
    };
    brand: {
      displayName: string;
      tagline: string;
      theme: {
        primaryColor: string;
        accentColor: string;
      };
    };
  };
  project: {
    version: string;
    grade: string;
    lastUpdated: string;
    status: string;
    repository: {
      name: string;
      owner: string;
      url: string;
    };
  };
  metrics: {
    totalComponents: number;
    storiesCoverage: number;
    testsCoverage: number;
    exportCoverage: number;
    qualityScore: number;
  };
  features: {
    automation: {
      enabled: boolean;
      version: string;
      features: string[];
    };
    documentation: {
      comprehensive: boolean;
      tutorials: number;
      quickReference: boolean;
      apiDocs: boolean;
    };
    testing: {
      framework: string;
      storybook: boolean;
      coverage: boolean;
      e2e: boolean;
    };
  };
  navigation: {
    mainMenu: Array<{
      label: string;
      items: Array<{
        title: string;
        description: string;
        href: string;
      }>;
    }>;
    quickLinks: Array<{
      title: string;
      href: string;
    }>;
  };
  seo: {
    keywords: string[];
    author: string;
    robots: string;
    ogImage: string;
  };
  build: {
    timestamp: string;
    environment: string;
    deploymentId: string;
  };
}

// Export the configuration with type safety
export const siteConfig: SiteConfig = siteConfigData as SiteConfig;

// Helper functions for common access patterns
export const getSiteMetadata = () => ({
  title: siteConfig.site.title,
  description: siteConfig.site.description,
  keywords: siteConfig.seo.keywords.join(', '),
  author: siteConfig.seo.author,
  robots: siteConfig.seo.robots,
  openGraph: {
    title: siteConfig.site.title,
    description: siteConfig.site.description,
    url: siteConfig.site.url,
    images: [siteConfig.seo.ogImage],
  },
});

export const getProjectInfo = () => ({
  version: siteConfig.project.version,
  grade: siteConfig.project.grade,
  lastUpdated: siteConfig.project.lastUpdated,
  status: siteConfig.project.status,
});

export const getBrandInfo = () => ({
  name: siteConfig.site.brand.displayName,
  tagline: siteConfig.site.brand.tagline,
  logo: siteConfig.site.logo,
});

export const getMetrics = () => siteConfig.metrics;

export const getNavigation = () => siteConfig.navigation;

export default siteConfig;
