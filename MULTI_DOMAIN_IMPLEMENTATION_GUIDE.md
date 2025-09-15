# Multi-Domain Deployment System - Implementation Guide

## Mission

Convert any Next.js repository into a multi-domain platform using environment variables and dynamic component loading.

## Prerequisites

- Next.js 13+ with App Router
- TypeScript support
- Vercel deployment capability

---

## Phase 1: Assessment & Planning (1-2 hours)

### Step 1.1: Analyze Current Repository Structure

- [ ] Identify existing site configuration files
  - Look for: `siteConfig.js`, `config.json`, hardcoded constants
  - Note: Static strings, company names, contact info, branding
- [ ] Map components needing domain variations
  - Primary targets: Hero sections, Navigation, Footer
  - Secondary: About pages, Contact forms, Branding elements
- [ ] Review current environment variable usage
  - Check: `.env.local`, `.env.example`, `next.config.js`
- [ ] Assess build process and deployment setup

### Step 1.2: Define Domain Strategy

- [ ] List target domains/clients (minimum 2-3 for testing)
- [ ] Map domain types to component variations
- [ ] Plan environment variable naming convention
- [ ] Design fallback strategy for missing configurations

---

## Phase 2: Core Infrastructure (3-4 hours)

### Step 2.1: Create Domain Detection System

Create `src/lib/domain.ts`:

```typescript
import React from 'react';

// Define your domain types
export type DomainType = 'default' | 'client1' | 'client2' | 'enterprise' | 'custom';

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
  const envDomain = process.env.NEXT_PUBLIC_DOMAIN_TYPE as DomainType;
  if (envDomain && ['default', 'client1', 'client2', 'enterprise', 'custom'].includes(envDomain)) {
    return envDomain;
  }

  // Fallback to hostname detection (client-side)
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname.toLowerCase();

    if (hostname.includes('client1')) return 'client1';
    if (hostname.includes('client2')) return 'client2';
    if (hostname.includes('enterprise')) return 'enterprise';
  }

  return 'default';
}

// Get domain-specific configuration
export function getDomainConfig(domain: DomainType = getCurrentDomain()): DomainConfig {
  const configs: Record<DomainType, DomainConfig> = {
    default: {
      type: 'default',
      name: 'Default Site',
      features: ['basic-features'],
      layout: 'default',
      theme: 'auto',
      components: {
        hero: 'DefaultHero',
        navigation: 'DefaultNav',
        footer: 'DefaultFooter',
      },
    },
    client1: {
      type: 'client1',
      name: 'Client One',
      features: ['premium-features', 'analytics'],
      layout: 'enterprise',
      theme: 'dark',
      components: {
        hero: 'EnterpriseHero',
        navigation: 'EnterpriseNav',
        footer: 'EnterpriseFooter',
      },
    },
    client2: {
      type: 'client2',
      name: 'Client Two',
      features: ['minimal-features'],
      layout: 'minimal',
      theme: 'light',
      components: {
        hero: 'MinimalHero',
        navigation: 'MinimalNav',
        footer: 'MinimalFooter',
      },
    },
    enterprise: {
      type: 'enterprise',
      name: 'Enterprise',
      features: ['all-features', 'white-label'],
      layout: 'enterprise',
      theme: 'auto',
      components: {
        hero: 'EnterpriseHero',
        navigation: 'EnterpriseNav',
        footer: 'EnterpriseFooter',
      },
    },
    custom: {
      type: 'custom',
      name: process.env.NEXT_PUBLIC_CUSTOM_DOMAIN_NAME || 'Custom Domain',
      features: (process.env.NEXT_PUBLIC_CUSTOM_FEATURES || '').split(',').filter(Boolean),
      layout: (process.env.NEXT_PUBLIC_CUSTOM_LAYOUT as any) || 'default',
      theme: (process.env.NEXT_PUBLIC_CUSTOM_THEME as any) || 'auto',
      components: {
        hero: process.env.NEXT_PUBLIC_CUSTOM_HERO_COMPONENT || 'DefaultHero',
        navigation: process.env.NEXT_PUBLIC_CUSTOM_NAV_COMPONENT || 'DefaultNav',
        footer: process.env.NEXT_PUBLIC_CUSTOM_FOOTER_COMPONENT || 'DefaultFooter',
      },
    },
  };

  return configs[domain];
}

// Check if a feature is enabled for current domain
export function hasFeature(feature: string): boolean {
  const config = getDomainConfig();
  return config.features.includes(feature);
}

// Hook for client-side domain detection
export function useDomain() {
  const [domain, setDomain] = React.useState<DomainType>('default');
  const [config, setConfig] = React.useState<DomainConfig | null>(null);

  React.useEffect(() => {
    const currentDomain = getCurrentDomain();
    setDomain(currentDomain);
    setConfig(getDomainConfig(currentDomain));
  }, []);

  return { domain, config };
}
```

### Step 2.2: Refactor Site Configuration

Update your existing site configuration file (usually `src/lib/siteConfig.ts`):

```typescript
import siteConfigData from '../../data/siteConfig.json'; // Your existing config

// Helper function to get environment variable with fallback
const getEnvVar = (key: string, fallback: string | number | boolean = ''): string => {
  const value = process.env[key];
  return value !== undefined ? value : String(fallback);
};

// Build site config from environment variables with fallbacks
const buildSiteConfig = () => {
  return {
    site: {
      name: getEnvVar('NEXT_PUBLIC_SITE_NAME', siteConfigData.site?.name || 'Default Site'),
      title: getEnvVar('NEXT_PUBLIC_SITE_TITLE', siteConfigData.site?.title || 'Default Title'),
      description: getEnvVar('NEXT_PUBLIC_SITE_DESCRIPTION', siteConfigData.site?.description || 'Default description'),
      url: getEnvVar('NEXT_PUBLIC_SITE_URL', siteConfigData.site?.url || 'https://example.com'),
    },
    branding: {
      displayName: getEnvVar('NEXT_PUBLIC_BRAND_DISPLAY_NAME', siteConfigData.branding?.displayName || 'Brand'),
      tagline: getEnvVar('NEXT_PUBLIC_BRAND_TAGLINE', siteConfigData.branding?.tagline || 'Your tagline'),
      primaryColor: getEnvVar('NEXT_PUBLIC_THEME_PRIMARY_COLOR', '#3b82f6'),
      accentColor: getEnvVar('NEXT_PUBLIC_THEME_ACCENT_COLOR', '#1d4ed8'),
    },
    content: {
      hero: {
        headline: getEnvVar('NEXT_PUBLIC_HERO_HEADLINE', 'Welcome'),
        description: getEnvVar('NEXT_PUBLIC_HERO_DESCRIPTION', 'Default description'),
        primaryCta: {
          text: getEnvVar('NEXT_PUBLIC_HERO_PRIMARY_CTA_TEXT', 'Get Started'),
          href: getEnvVar('NEXT_PUBLIC_HERO_PRIMARY_CTA_HREF', '/get-started'),
        },
        secondaryCta: {
          text: getEnvVar('NEXT_PUBLIC_HERO_SECONDARY_CTA_TEXT', 'Learn More'),
          href: getEnvVar('NEXT_PUBLIC_HERO_SECONDARY_CTA_HREF', '/about'),
        },
      },
    },
    contact: {
      email: getEnvVar('NEXT_PUBLIC_GENERAL_EMAIL', 'hello@example.com'),
      support: getEnvVar('NEXT_PUBLIC_SUPPORT_EMAIL', 'support@example.com'),
      phone: getEnvVar('NEXT_PUBLIC_PHONE', '+1 (555) 123-4567'),
    },
    // Add more sections as needed
  };
};

export const siteConfig = buildSiteConfig();
export default siteConfig;
```

---

## Phase 3: Component System (3-4 hours)

### Step 3.1: Create Domain Component Structure

Create the following directory structure:

```
src/components/domains/
├── index.ts
├── shared/
│   ├── index.ts
│   ├── DefaultHero.tsx
│   ├── DefaultNav.tsx
│   └── DefaultFooter.tsx
├── client1/
│   ├── index.ts
│   ├── EnterpriseHero.tsx
│   ├── EnterpriseNav.tsx
│   └── EnterpriseFooter.tsx
└── client2/
    ├── index.ts
    ├── MinimalHero.tsx
    ├── MinimalNav.tsx
    └── MinimalFooter.tsx
```

### Step 3.2: Build Component Registry

Create `src/components/domains/index.ts`:

```typescript
import dynamic from 'next/dynamic';

// Component registry for domain-specific components
const componentRegistry = {
  // Hero components
  DefaultHero: dynamic(() => import('./shared').then(mod => ({ default: mod.DefaultHero }))),
  EnterpriseHero: dynamic(() => import('./client1').then(mod => ({ default: mod.EnterpriseHero }))),
  MinimalHero: dynamic(() => import('./client2').then(mod => ({ default: mod.MinimalHero }))),

  // Navigation components
  DefaultNav: dynamic(() => import('./shared').then(mod => ({ default: mod.DefaultNav }))),
  EnterpriseNav: dynamic(() => import('./client1').then(mod => ({ default: mod.EnterpriseNav }))),
  MinimalNav: dynamic(() => import('./client2').then(mod => ({ default: mod.MinimalNav }))),

  // Footer components
  DefaultFooter: dynamic(() => import('./shared').then(mod => ({ default: mod.DefaultFooter }))),
  EnterpriseFooter: dynamic(() => import('./client1').then(mod => ({ default: mod.EnterpriseFooter }))),
  MinimalFooter: dynamic(() => import('./client2').then(mod => ({ default: mod.MinimalFooter }))),
};

// Get a domain component dynamically
export function getDomainComponent(componentName: string) {
  const Component = componentRegistry[componentName as keyof typeof componentRegistry];
  return Component || componentRegistry.DefaultHero;
}

// Export all components
export * from './shared';
export * from './client1';
export * from './client2';
```

### Step 3.3: Create Shared Components

Create `src/components/domains/shared/DefaultHero.tsx`:

```typescript
import React from 'react';
import { siteConfig } from '@/lib/siteConfig';

export default function DefaultHero() {
  return (
    <section className="hero-section bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          {siteConfig.content.hero.headline}
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          {siteConfig.content.hero.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={siteConfig.content.hero.primaryCta.href}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            {siteConfig.content.hero.primaryCta.text}
          </a>
          <a
            href={siteConfig.content.hero.secondaryCta.href}
            className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            {siteConfig.content.hero.secondaryCta.text}
          </a>
        </div>
      </div>
    </section>
  );
}
```

Create corresponding navigation and footer components following the same pattern.

### Step 3.4: Create Client-Specific Components

Repeat for each client domain with their specific styling and layouts.

---

## Phase 4: Page Integration (2-3 hours)

### Step 4.1: Update Homepage

Modify your main page (`src/app/page.tsx`) to use dynamic components:

```typescript
'use client';

import { getCurrentDomain, getDomainConfig } from '@/lib/domain';
import { useEffect, useState } from 'react';
import React from 'react';

export default function HomePage() {
  const [HeroComponent, setHeroComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    const loadDomainComponent = async () => {
      const domain = getCurrentDomain();
      const config = getDomainConfig(domain);

      try {
        let component;
        if (config.components.hero === 'DefaultHero') {
          const { DefaultHero } = await import('@/components/domains/shared');
          component = DefaultHero;
        } else if (config.components.hero === 'EnterpriseHero') {
          const { EnterpriseHero } = await import('@/components/domains/client1');
          component = EnterpriseHero;
        } else {
          const { DefaultHero } = await import('@/components/domains/shared');
          component = DefaultHero;
        }

        setHeroComponent(component);
      } catch (error) {
        console.error('Failed to load hero component:', error);
        const { DefaultHero } = await import('@/components/domains/shared');
        setHeroComponent(DefaultHero);
      }
    };

    loadDomainComponent();
  }, []);

  if (!HeroComponent) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <main>
      {React.createElement(HeroComponent)}
      {/* Rest of your shared content */}
    </main>
  );
}
```

### Step 4.2: Update Layout (Optional)

If you need domain-specific layouts, create similar dynamic loading for `src/app/layout.tsx`.

---

## Phase 5: Environment & Documentation (2-3 hours)

### Step 5.1: Create Environment Template

Create `.env.example`:

```bash
# Domain Configuration
NEXT_PUBLIC_DOMAIN_TYPE=default

# Site Configuration
NEXT_PUBLIC_SITE_NAME=Default Site
NEXT_PUBLIC_SITE_TITLE=Default Site - Professional Services
NEXT_PUBLIC_SITE_DESCRIPTION=Professional services and solutions for your business.
NEXT_PUBLIC_SITE_URL=https://example.com

# Branding
NEXT_PUBLIC_BRAND_DISPLAY_NAME=Default Brand
NEXT_PUBLIC_BRAND_TAGLINE=Professional Services
NEXT_PUBLIC_THEME_PRIMARY_COLOR=#3b82f6
NEXT_PUBLIC_THEME_ACCENT_COLOR=#1d4ed8

# Hero Content
NEXT_PUBLIC_HERO_HEADLINE=Welcome to Our Platform
NEXT_PUBLIC_HERO_DESCRIPTION=Professional services and solutions tailored to your needs.
NEXT_PUBLIC_HERO_PRIMARY_CTA_TEXT=Get Started
NEXT_PUBLIC_HERO_PRIMARY_CTA_HREF=/contact
NEXT_PUBLIC_HERO_SECONDARY_CTA_TEXT=Learn More
NEXT_PUBLIC_HERO_SECONDARY_CTA_HREF=/about

# Contact Information
NEXT_PUBLIC_GENERAL_EMAIL=hello@example.com
NEXT_PUBLIC_SUPPORT_EMAIL=support@example.com
NEXT_PUBLIC_PHONE=+1 (555) 123-4567

# Custom Domain Configuration (for custom domain type)
NEXT_PUBLIC_CUSTOM_DOMAIN_NAME=Custom Company
NEXT_PUBLIC_CUSTOM_FEATURES=feature1,feature2
NEXT_PUBLIC_CUSTOM_LAYOUT=default
NEXT_PUBLIC_CUSTOM_THEME=auto
NEXT_PUBLIC_CUSTOM_HERO_COMPONENT=DefaultHero
NEXT_PUBLIC_CUSTOM_NAV_COMPONENT=DefaultNav
NEXT_PUBLIC_CUSTOM_FOOTER_COMPONENT=DefaultFooter
```

### Step 5.2: Create Domain Examples

Create `docs/domain-examples/` with specific configurations:

**client1.env:**

```bash
NEXT_PUBLIC_DOMAIN_TYPE=client1
NEXT_PUBLIC_SITE_NAME=Enterprise Client
NEXT_PUBLIC_HERO_HEADLINE=Enterprise Solutions
NEXT_PUBLIC_THEME_PRIMARY_COLOR=#1a365d
```

**client2.env:**

```bash
NEXT_PUBLIC_DOMAIN_TYPE=client2
NEXT_PUBLIC_SITE_NAME=Minimal Client
NEXT_PUBLIC_HERO_HEADLINE=Simple & Clean
NEXT_PUBLIC_THEME_PRIMARY_COLOR=#e53e3e
```

### Step 5.3: Create Documentation

Create `docs/MULTI_DOMAIN_SETUP.md` with complete setup instructions, including:

- How to create Vercel projects
- Environment variable configuration
- Domain setup process
- Troubleshooting guide

---

## Phase 6: Testing & Validation (2-3 hours)

### Step 6.1: Build Testing

- [ ] Test build with default configuration: `yarn build`
- [ ] Test with each domain example configuration
- [ ] Verify TypeScript compilation passes
- [ ] Check bundle size impact

### Step 6.2: Component Testing

- [ ] Verify dynamic component loading works
- [ ] Test domain detection logic
- [ ] Confirm environment variable reading
- [ ] Validate fallback mechanisms

### Step 6.3: Add Testing Scripts

Update `package.json`:

```json
{
  "scripts": {
    "test:default": "cp docs/domain-examples/default.env .env.local && yarn dev",
    "test:client1": "cp docs/domain-examples/client1.env .env.local && yarn dev",
    "test:client2": "cp docs/domain-examples/client2.env .env.local && yarn dev",
    "build:test": "yarn build && echo 'Multi-domain build successful'"
  }
}
```

---

## Phase 7: Deployment Preparation (1-2 hours)

### Step 7.1: Create Deployment Checklist

Create `docs/DEPLOYMENT_CHECKLIST.md`:

```markdown
## Vercel Deployment Checklist

### For Each New Domain:

- [ ] Create new Vercel project
- [ ] Connect to this GitHub repository
- [ ] Configure environment variables from domain examples
- [ ] Add custom domain (if applicable)
- [ ] Test deployment
- [ ] Verify domain detection works
- [ ] Check component loading and fallbacks

### Environment Variables to Set:

- [ ] NEXT_PUBLIC_DOMAIN_TYPE
- [ ] NEXT_PUBLIC_SITE_NAME
- [ ] NEXT_PUBLIC_SITE_TITLE
- [ ] NEXT_PUBLIC_HERO_HEADLINE
- [ ] NEXT_PUBLIC_THEME_PRIMARY_COLOR
- [ ] All contact and branding variables

### Post-Deployment Testing:

- [ ] Homepage loads correctly
- [ ] Domain-specific components render
- [ ] Environment variables applied
- [ ] No console errors
- [ ] Mobile responsiveness
```

---

## Success Criteria

✅ **Single Repository** supports unlimited domain variations  
✅ **Environment Variables** control all branding and content  
✅ **Dynamic Components** load based on domain configuration  
✅ **Build Process** works with all domain types  
✅ **Documentation** enables easy setup and maintenance  
✅ **Vercel Deployment** ready with configuration templates

---

## Time Estimates

- **Total Implementation**: 11-16 hours
- **Phase 1-2**: 4-6 hours (infrastructure)
- **Phase 3**: 3-4 hours (components)
- **Phase 4**: 2-3 hours (integration)
- **Phase 5**: 2-3 hours (docs/examples)
- **Phase 6-7**: 2-3 hours (testing/deployment)

## Final Deliverable

A production-ready multi-domain platform where:

1. Same codebase deploys to unlimited domains
2. Each domain has unique branding and components
3. Environment variables control all variations
4. One update propagates to all domains
5. Complete documentation and examples included

Execute this guide on any Next.js repository to create a scalable multi-domain platform.
