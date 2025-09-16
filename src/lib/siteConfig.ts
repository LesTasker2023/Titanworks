import siteConfigData from '../../data/siteConfig.json';

// Helper function to get environment variable with fallback
const getEnvVar = (key: string, fallback: string | number | boolean = ''): string => {
  const value = process.env[key];
  return value !== undefined ? value : String(fallback);
};

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
        textColor: string;
        backgroundColor: string;
        borderColor: string;
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
  content: {
    hero: {
      headline: string;
      tagline: string;
      description: string;
      primaryCta: {
        text: string;
        href: string;
      };
      secondaryCta: {
        text: string;
        href: string;
      };
    };
    socialProof: {
      headline: string;
      metrics: Array<{
        value: string;
        label: string;
        description: string;
      }>;
    };
    valueProps: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
    copyright: string;
    footer: {
      companyName: string;
      year: string;
    };
  };
  contact: {
    supportEmail: string;
    generalEmail: string;
    salesEmail: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
    socialMedia: {
      twitter: string;
      linkedin: string;
      github: string;
    };
  };
  branding: {
    companyName: string;
    legalName: string;
    foundedYear: number;
    industry: string;
    mission: string;
    vision: string;
    values: string[];
  };
  technical: {
    framework: string;
    language: string;
    testingFramework: string;
    stylingSystem: string;
    componentLibrary: string;
    documentation: string;
    deployment: string;
    repository: {
      platform: string;
      visibility: string;
      defaultBranch: string;
    };
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

// Build site config from environment variables with fallbacks
const buildSiteConfig = (): SiteConfig => {
  return {
    site: {
      name: getEnvVar('NEXT_PUBLIC_SITE_NAME', siteConfigData.site.name),
      title: getEnvVar('NEXT_PUBLIC_SITE_TITLE', siteConfigData.site.title),
      description: getEnvVar('NEXT_PUBLIC_SITE_DESCRIPTION', siteConfigData.site.description),
      url: getEnvVar('NEXT_PUBLIC_SITE_URL', siteConfigData.site.url),
      logo: {
        path: getEnvVar('NEXT_PUBLIC_LOGO_PATH', siteConfigData.site.logo.path),
        alt: getEnvVar('NEXT_PUBLIC_LOGO_ALT', siteConfigData.site.logo.alt),
        width: parseInt(getEnvVar('NEXT_PUBLIC_LOGO_WIDTH', siteConfigData.site.logo.width)),
        height: parseInt(getEnvVar('NEXT_PUBLIC_LOGO_HEIGHT', siteConfigData.site.logo.height)),
      },
      brand: {
        displayName: getEnvVar(
          'NEXT_PUBLIC_BRAND_DISPLAY_NAME',
          siteConfigData.site.brand.displayName
        ),
        tagline: getEnvVar('NEXT_PUBLIC_BRAND_TAGLINE', siteConfigData.site.brand.tagline),
        theme: {
          primaryColor: getEnvVar(
            'NEXT_PUBLIC_THEME_PRIMARY_COLOR',
            siteConfigData.site.brand.theme.primaryColor
          ),
          accentColor: getEnvVar(
            'NEXT_PUBLIC_THEME_ACCENT_COLOR',
            siteConfigData.site.brand.theme.accentColor
          ),
          textColor: getEnvVar('NEXT_PUBLIC_THEME_TEXT_COLOR', '#1f2937'),
          backgroundColor: getEnvVar('NEXT_PUBLIC_THEME_BACKGROUND_COLOR', '#ffffff'),
          borderColor: getEnvVar('NEXT_PUBLIC_THEME_BORDER_COLOR', '#e5e7eb'),
        },
      },
    },
    project: {
      version: getEnvVar('NEXT_PUBLIC_PROJECT_VERSION', siteConfigData.project.version),
      grade: getEnvVar('NEXT_PUBLIC_PROJECT_GRADE', siteConfigData.project.grade),
      lastUpdated: getEnvVar(
        'NEXT_PUBLIC_PROJECT_LAST_UPDATED',
        siteConfigData.project.lastUpdated
      ),
      status: getEnvVar('NEXT_PUBLIC_PROJECT_STATUS', siteConfigData.project.status),
      repository: {
        name: getEnvVar('NEXT_PUBLIC_REPO_NAME', siteConfigData.project.repository.name),
        owner: getEnvVar('NEXT_PUBLIC_REPO_OWNER', siteConfigData.project.repository.owner),
        url: getEnvVar('NEXT_PUBLIC_REPO_URL', siteConfigData.project.repository.url),
      },
    },
    metrics: {
      totalComponents: parseInt(
        getEnvVar('NEXT_PUBLIC_METRICS_TOTAL_COMPONENTS', siteConfigData.metrics.totalComponents)
      ),
      storiesCoverage: parseInt(
        getEnvVar('NEXT_PUBLIC_METRICS_STORIES_COVERAGE', siteConfigData.metrics.storiesCoverage)
      ),
      testsCoverage: parseInt(
        getEnvVar('NEXT_PUBLIC_METRICS_TESTS_COVERAGE', siteConfigData.metrics.testsCoverage)
      ),
      exportCoverage: parseInt(
        getEnvVar('NEXT_PUBLIC_METRICS_EXPORT_COVERAGE', siteConfigData.metrics.exportCoverage)
      ),
      qualityScore: parseFloat(
        getEnvVar('NEXT_PUBLIC_METRICS_QUALITY_SCORE', siteConfigData.metrics.qualityScore)
      ),
    },
    content: {
      hero: {
        headline: getEnvVar('NEXT_PUBLIC_HERO_HEADLINE', siteConfigData.content.hero.headline),
        tagline: getEnvVar('NEXT_PUBLIC_HERO_TAGLINE', siteConfigData.content.hero.tagline),
        description: getEnvVar(
          'NEXT_PUBLIC_HERO_DESCRIPTION',
          siteConfigData.content.hero.description
        ),
        primaryCta: {
          text: getEnvVar(
            'NEXT_PUBLIC_HERO_PRIMARY_CTA_TEXT',
            siteConfigData.content.hero.primaryCta.text
          ),
          href: getEnvVar(
            'NEXT_PUBLIC_HERO_PRIMARY_CTA_HREF',
            siteConfigData.content.hero.primaryCta.href
          ),
        },
        secondaryCta: {
          text: getEnvVar(
            'NEXT_PUBLIC_HERO_SECONDARY_CTA_TEXT',
            siteConfigData.content.hero.secondaryCta.text
          ),
          href: getEnvVar(
            'NEXT_PUBLIC_HERO_SECONDARY_CTA_HREF',
            siteConfigData.content.hero.secondaryCta.href
          ),
        },
      },
      socialProof: {
        headline: getEnvVar(
          'NEXT_PUBLIC_SOCIAL_PROOF_HEADLINE',
          siteConfigData.content.socialProof.headline
        ),
        metrics: siteConfigData.content.socialProof.metrics, // Keep as is for now, can be made configurable later
      },
      valueProps: siteConfigData.content.valueProps, // Keep as is
      copyright: getEnvVar('NEXT_PUBLIC_COPYRIGHT', siteConfigData.content.copyright),
      footer: {
        companyName: getEnvVar(
          'NEXT_PUBLIC_FOOTER_COMPANY_NAME',
          siteConfigData.content.footer.companyName
        ),
        year: getEnvVar('NEXT_PUBLIC_FOOTER_YEAR', siteConfigData.content.footer.year),
      },
    },
    contact: {
      supportEmail: getEnvVar('NEXT_PUBLIC_SUPPORT_EMAIL', siteConfigData.contact.supportEmail),
      generalEmail: getEnvVar('NEXT_PUBLIC_GENERAL_EMAIL', siteConfigData.contact.generalEmail),
      salesEmail: getEnvVar('NEXT_PUBLIC_SALES_EMAIL', siteConfigData.contact.salesEmail),
      phone: getEnvVar('NEXT_PUBLIC_PHONE', siteConfigData.contact.phone),
      address: {
        street: getEnvVar('NEXT_PUBLIC_ADDRESS_STREET', siteConfigData.contact.address.street),
        city: getEnvVar('NEXT_PUBLIC_ADDRESS_CITY', siteConfigData.contact.address.city),
        state: getEnvVar('NEXT_PUBLIC_ADDRESS_STATE', siteConfigData.contact.address.state),
        zip: getEnvVar('NEXT_PUBLIC_ADDRESS_ZIP', siteConfigData.contact.address.zip),
        country: getEnvVar('NEXT_PUBLIC_ADDRESS_COUNTRY', siteConfigData.contact.address.country),
      },
      socialMedia: {
        twitter: getEnvVar(
          'NEXT_PUBLIC_SOCIAL_TWITTER',
          siteConfigData.contact.socialMedia.twitter
        ),
        linkedin: getEnvVar(
          'NEXT_PUBLIC_SOCIAL_LINKEDIN',
          siteConfigData.contact.socialMedia.linkedin
        ),
        github: getEnvVar('NEXT_PUBLIC_SOCIAL_GITHUB', siteConfigData.contact.socialMedia.github),
      },
    },
    branding: {
      companyName: getEnvVar(
        'NEXT_PUBLIC_BRANDING_COMPANY_NAME',
        siteConfigData.branding.companyName
      ),
      legalName: getEnvVar('NEXT_PUBLIC_BRANDING_LEGAL_NAME', siteConfigData.branding.legalName),
      foundedYear: parseInt(
        getEnvVar('NEXT_PUBLIC_BRANDING_FOUNDED_YEAR', siteConfigData.branding.foundedYear)
      ),
      industry: getEnvVar('NEXT_PUBLIC_BRANDING_INDUSTRY', siteConfigData.branding.industry),
      mission: getEnvVar('NEXT_PUBLIC_BRANDING_MISSION', siteConfigData.branding.mission),
      vision: getEnvVar('NEXT_PUBLIC_BRANDING_VISION', siteConfigData.branding.vision),
      values: siteConfigData.branding.values, // Keep as is
    },
    technical: siteConfigData.technical, // Keep as is
    features: siteConfigData.features, // Keep as is
    navigation: siteConfigData.navigation, // Keep as is
    seo: {
      keywords: siteConfigData.seo.keywords, // Keep as is
      author: getEnvVar('NEXT_PUBLIC_SEO_AUTHOR', siteConfigData.seo.author),
      robots: getEnvVar('NEXT_PUBLIC_SEO_ROBOTS', siteConfigData.seo.robots),
      ogImage: getEnvVar('NEXT_PUBLIC_SEO_OG_IMAGE', siteConfigData.seo.ogImage),
    },
    build: siteConfigData.build, // Keep as is
  };
};

// Export the built config
const siteConfig: SiteConfig = buildSiteConfig();

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

export const getContent = () => siteConfig.content;

export const getContact = () => siteConfig.contact;

export const getBranding = () => siteConfig.branding;

export const getTechnical = () => siteConfig.technical;

export const getFooterInfo = () => ({
  copyright: `© ${siteConfig.content.footer.year === 'auto' ? new Date().getFullYear() : siteConfig.content.footer.year} ${siteConfig.content.footer.companyName}. ${siteConfig.content.copyright}`,
  companyName: siteConfig.branding.companyName,
  socialMedia: siteConfig.contact.socialMedia,
});

export default siteConfig;
