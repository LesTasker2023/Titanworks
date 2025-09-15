// Domain detection and configuration utilities
import React from 'react';

export type DomainType =
  | 'daedalus'
  | 'airpods'
  | 'titandigital'
  | 'titanforge'
  | 'titanlabs'
  | 'titanmedia'
  | 'titanworks'
  | 'custom';

// Domain configuration interface
export interface DomainConfig {
  type: DomainType;
  name: string;
  features: string[];
  layout: 'default' | 'minimal' | 'enterprise';
  theme: 'light' | 'dark' | 'auto';
  components: {
    hero: string;
    navigation: string;
    footer: string;
  };
}

// Get current domain type from environment or hostname
export function getCurrentDomain(): DomainType {
  // Check environment variable first
  const envDomain = process.env.NEXT_PUBLIC_DOMAIN_TYPE as DomainType;
  if (
    envDomain &&
    [
      'daedalus',
      'airpods',
      'titandigital',
      'titanforge',
      'titanlabs',
      'titanmedia',
      'titanworks',
      'custom',
    ].includes(envDomain)
  ) {
    return envDomain;
  }

  // Fallback to hostname detection (client-side)
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname.toLowerCase();

    if (hostname.includes('airpods')) return 'airpods';
    if (hostname.includes('titandigital')) return 'titandigital';
    if (hostname.includes('titanforge')) return 'titanforge';
    if (hostname.includes('titanlabs')) return 'titanlabs';
    if (hostname.includes('titanmedia')) return 'titanmedia';
    if (hostname.includes('titanworks')) return 'titanworks';
    if (hostname.includes('daedalus')) return 'daedalus';
  }

  return 'daedalus'; // Default fallback
}

// Get configuration for a specific domain
export function getDomainConfig(domain?: DomainType): DomainConfig {
  if (!domain) {
    domain = getCurrentDomain();
  }

  const configs: Record<DomainType, DomainConfig> = {
    daedalus: {
      type: 'daedalus',
      name: 'Daedalus',
      features: ['component-showcase', 'documentation', 'enterprise-features'],
      layout: 'enterprise',
      theme: 'auto',
      components: {
        hero: 'EnterpriseHero',
        navigation: 'EnterpriseNav',
        footer: 'EnterpriseFooter',
      },
    },
    airpods: {
      type: 'airpods',
      name: 'AirPods',
      features: ['product-showcase', 'audio-features'],
      layout: 'minimal',
      theme: 'light',
      components: {
        hero: 'ProductHero',
        navigation: 'MinimalNav',
        footer: 'MinimalFooter',
      },
    },
    titandigital: {
      type: 'titandigital',
      name: 'Titan Digital',
      features: ['digital-services', 'portfolio'],
      layout: 'default',
      theme: 'dark',
      components: {
        hero: 'DefaultHero',
        navigation: 'DefaultNav',
        footer: 'DefaultFooter',
      },
    },
    titanforge: {
      type: 'titanforge',
      name: 'Titan Forge',
      features: ['development-tools', 'api-showcase'],
      layout: 'default',
      theme: 'auto',
      components: {
        hero: 'DefaultHero',
        navigation: 'DefaultNav',
        footer: 'DefaultFooter',
      },
    },
    titanlabs: {
      type: 'titanlabs',
      name: 'Titan Labs',
      features: ['research', 'innovation'],
      layout: 'minimal',
      theme: 'light',
      components: {
        hero: 'DefaultHero',
        navigation: 'DefaultNav',
        footer: 'DefaultFooter',
      },
    },
    titanmedia: {
      type: 'titanmedia',
      name: 'Titan Media',
      features: ['media-production', 'content-creation'],
      layout: 'default',
      theme: 'dark',
      components: {
        hero: 'DefaultHero',
        navigation: 'DefaultNav',
        footer: 'DefaultFooter',
      },
    },
    titanworks: {
      type: 'titanworks',
      name: 'Titan Works',
      features: ['portfolio', 'case-studies'],
      layout: 'enterprise',
      theme: 'auto',
      components: {
        hero: 'DefaultHero',
        navigation: 'DefaultNav',
        footer: 'DefaultFooter',
      },
    },
    custom: {
      type: 'custom',
      name: process.env.NEXT_PUBLIC_CUSTOM_DOMAIN_NAME || 'Custom Domain',
      features: (process.env.NEXT_PUBLIC_CUSTOM_FEATURES || '').split(',').filter(Boolean),
      layout:
        (process.env.NEXT_PUBLIC_CUSTOM_LAYOUT as 'default' | 'minimal' | 'enterprise') ||
        'default',
      theme: (process.env.NEXT_PUBLIC_CUSTOM_THEME as 'light' | 'dark' | 'auto') || 'auto',
      components: {
        hero: process.env.NEXT_PUBLIC_CUSTOM_HERO_COMPONENT || 'DefaultHero',
        navigation: process.env.NEXT_PUBLIC_CUSTOM_NAV_COMPONENT || 'DefaultNav',
        footer: process.env.NEXT_PUBLIC_CUSTOM_FOOTER_COMPONENT || 'DefaultFooter',
      },
    },
  };

  // Return the config if it exists, otherwise return a default safe config
  return configs[domain] || configs.daedalus;
}

// Check if a feature is enabled for current domain
export function hasFeature(feature: string): boolean {
  const config = getDomainConfig();
  return config.features.includes(feature);
}

// Get domain-specific component name
export function getDomainComponent(componentType: keyof DomainConfig['components']): string {
  const config = getDomainConfig();
  return config.components[componentType];
}

// Hook for client-side domain detection
export function useDomain() {
  const [domain, setDomain] = React.useState<DomainType>('daedalus');
  const [config, setConfig] = React.useState<DomainConfig | null>(null);

  React.useEffect(() => {
    const currentDomain = getCurrentDomain();
    setDomain(currentDomain);
    setConfig(getDomainConfig(currentDomain));
  }, []);

  return { domain, config };
}
