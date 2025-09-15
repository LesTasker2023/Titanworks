# Domain-Specific Environment Examples

## 1. AirPods Domain (.env.local for airpods domain)

```bash
NEXT_PUBLIC_DOMAIN_TYPE=airpods
NEXT_PUBLIC_SITE_NAME=AirPods Pro
NEXT_PUBLIC_SITE_TITLE=AirPods Pro - Premium Audio Experience
NEXT_PUBLIC_SITE_DESCRIPTION=Experience crystal-clear audio with advanced noise cancellation and seamless Apple integration.
NEXT_PUBLIC_SITE_URL=https://airpods-demo.com

NEXT_PUBLIC_BRAND_DISPLAY_NAME=AirPods Pro
NEXT_PUBLIC_BRAND_TAGLINE=Premium Audio Experience
NEXT_PUBLIC_THEME_PRIMARY_COLOR=#000000
NEXT_PUBLIC_THEME_ACCENT_COLOR=#007AFF

NEXT_PUBLIC_HERO_HEADLINE=Immerse Yourself in Sound
NEXT_PUBLIC_HERO_TAGLINE=AirPods Pro
NEXT_PUBLIC_HERO_DESCRIPTION=Premium audio with adaptive transparency, spatial audio, and all-day comfort.
NEXT_PUBLIC_HERO_PRIMARY_CTA_TEXT=Shop Now
NEXT_PUBLIC_HERO_PRIMARY_CTA_HREF=/shop
NEXT_PUBLIC_HERO_SECONDARY_CTA_TEXT=Learn More
NEXT_PUBLIC_HERO_SECONDARY_CTA_HREF=/features

NEXT_PUBLIC_GENERAL_EMAIL=hello@airpods-demo.com
NEXT_PUBLIC_SUPPORT_EMAIL=support@airpods-demo.com
```

## 2. TitanForge Domain (.env.local for titanforge domain)

```bash
NEXT_PUBLIC_DOMAIN_TYPE=titanforge
NEXT_PUBLIC_SITE_NAME=TitanForge
NEXT_PUBLIC_SITE_TITLE=TitanForge - Development Platform
NEXT_PUBLIC_SITE_DESCRIPTION=Powerful development tools and APIs for modern applications.
NEXT_PUBLIC_SITE_URL=https://titanforge.dev

NEXT_PUBLIC_BRAND_DISPLAY_NAME=TitanForge
NEXT_PUBLIC_BRAND_TAGLINE=Development Platform
NEXT_PUBLIC_THEME_PRIMARY_COLOR=#FF6B35
NEXT_PUBLIC_THEME_ACCENT_COLOR=#F7931E

NEXT_PUBLIC_HERO_HEADLINE=Build Better, Deploy Faster
NEXT_PUBLIC_HERO_TAGLINE=Development Platform
NEXT_PUBLIC_HERO_DESCRIPTION=Comprehensive development tools, APIs, and infrastructure for modern applications.
NEXT_PUBLIC_HERO_PRIMARY_CTA_TEXT=Get Started
NEXT_PUBLIC_HERO_PRIMARY_CTA_HREF=/docs
NEXT_PUBLIC_HERO_SECONDARY_CTA_TEXT=View APIs
NEXT_PUBLIC_HERO_SECONDARY_CTA_HREF=/api

NEXT_PUBLIC_GENERAL_EMAIL=hello@titanforge.dev
NEXT_PUBLIC_SUPPORT_EMAIL=support@titanforge.dev
```

## 3. Custom Domain (.env.local for custom domain)

```bash
NEXT_PUBLIC_DOMAIN_TYPE=custom
NEXT_PUBLIC_SITE_NAME=MyCompany
NEXT_PUBLIC_SITE_TITLE=MyCompany - Professional Services
NEXT_PUBLIC_SITE_DESCRIPTION=Professional services and consulting for your business needs.
NEXT_PUBLIC_SITE_URL=https://mycompany.com

NEXT_PUBLIC_BRAND_DISPLAY_NAME=MyCompany
NEXT_PUBLIC_BRAND_TAGLINE=Professional Services
NEXT_PUBLIC_THEME_PRIMARY_COLOR=#2563EB
NEXT_PUBLIC_THEME_ACCENT_COLOR=#7C3AED

# Custom domain specific
NEXT_PUBLIC_CUSTOM_DOMAIN_NAME=MyCompany
NEXT_PUBLIC_CUSTOM_FEATURES=consulting,support,training
NEXT_PUBLIC_CUSTOM_LAYOUT=enterprise
NEXT_PUBLIC_CUSTOM_THEME=auto
NEXT_PUBLIC_CUSTOM_HERO_COMPONENT=DefaultHero
NEXT_PUBLIC_CUSTOM_NAV_COMPONENT=DefaultNav
NEXT_PUBLIC_CUSTOM_FOOTER_COMPONENT=DefaultFooter

NEXT_PUBLIC_HERO_HEADLINE=Your Success, Our Mission
NEXT_PUBLIC_HERO_TAGLINE=Professional Services
NEXT_PUBLIC_HERO_DESCRIPTION=Expert consulting and professional services tailored to your business needs.
NEXT_PUBLIC_HERO_PRIMARY_CTA_TEXT=Get Quote
NEXT_PUBLIC_HERO_PRIMARY_CTA_HREF=/contact
NEXT_PUBLIC_HERO_SECONDARY_CTA_TEXT=Our Services
NEXT_PUBLIC_HERO_SECONDARY_CTA_HREF=/services

NEXT_PUBLIC_GENERAL_EMAIL=hello@mycompany.com
NEXT_PUBLIC_SUPPORT_EMAIL=support@mycompany.com
```

## Setting Up Domain-Specific Deployments

### 1. Vercel Projects

- Create separate Vercel projects for each domain
- Import the same Titanworks repository for each project
- Configure domain-specific environment variables

### 2. Environment Variables

- Use the examples above as templates
- Set `NEXT_PUBLIC_DOMAIN_TYPE` to control which components load
- Customize branding, content, and contact information

### 3. Testing Locally

```bash
# Test AirPods domain
cp domain-examples/airpods.env .env.local
yarn dev

# Test TitanForge domain
cp domain-examples/titanforge.env .env.local
yarn dev

# Test custom domain
cp domain-examples/custom.env .env.local
yarn dev
```

### 4. Deployment Flow

1. Push changes to main branch
2. All Vercel projects automatically redeploy
3. Each domain uses its own environment variables
4. Unique branding and components per domain
