# Multi-Domain Deployment Setup

This guide explains how to deploy the same Titanworks repository to multiple domains while maintaining each domain's unique identity through environment variables.

## Overview

The application is configured to use environment variables for domain-specific settings like branding, contact information, and content. This allows you to:

- Deploy the same codebase to multiple domains
- Update the master repository and automatically update all domains
- Maintain unique branding and content for each domain

## Prerequisites

- Vercel account with access to multiple projects
- Custom domains configured in Vercel
- Environment variables set up for each domain

## Setup Process

### 1. Repository Configuration

The repository has been configured to use environment variables for domain-specific settings. Key files:

- `src/lib/siteConfig.ts` - Uses env vars with fallbacks to default values
- `.env.example` - Template with all available environment variables
- `vercel.json` - Deployment configuration (no changes needed)

### 2. Create Vercel Projects

For each domain you want to deploy:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your Titanworks repository
4. Configure the project:
   - **Project Name**: Choose a descriptive name (e.g., `titanworks-domain1`)
   - **Framework Preset**: Next.js
   - **Root Directory**: Leave empty (deploys from root)
   - **Build Command**: `next build` (default)
   - **Output Directory**: `.next` (default)

### 3. Configure Domains

For each Vercel project:

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed by Vercel

### 4. Set Environment Variables

For each Vercel project, set the domain-specific environment variables:

1. Go to Project Settings → Environment Variables
2. Add variables from `.env.example` with your domain's values

**Example variables for a domain:**

```bash
# Site Identity
NEXT_PUBLIC_SITE_NAME=MyCompany Platform
NEXT_PUBLIC_SITE_TITLE=MyCompany - Professional Services
NEXT_PUBLIC_SITE_URL=https://mycompany.com

# Branding
NEXT_PUBLIC_BRAND_DISPLAY_NAME=MyCompany
NEXT_PUBLIC_THEME_PRIMARY_COLOR=#0066cc
NEXT_PUBLIC_THEME_ACCENT_COLOR=#ff6600

# Contact
NEXT_PUBLIC_GENERAL_EMAIL=hello@mycompany.com
NEXT_PUBLIC_SUPPORT_EMAIL=support@mycompany.com

# Social Media
NEXT_PUBLIC_SOCIAL_TWITTER=https://twitter.com/mycompany
NEXT_PUBLIC_SOCIAL_LINKEDIN=https://linkedin.com/company/mycompany
```

### 5. Deploy

1. Push changes to the `main` branch of your repository
2. Vercel will automatically redeploy all connected projects
3. Each domain will use its own environment variables

## Environment Variables Reference

### Required Variables

- `NEXT_PUBLIC_SITE_NAME` - Site display name
- `NEXT_PUBLIC_SITE_URL` - Full domain URL
- `NEXT_PUBLIC_BRAND_DISPLAY_NAME` - Brand name for headers
- `NEXT_PUBLIC_GENERAL_EMAIL` - Primary contact email

### Optional Variables

See `.env.example` for all available variables. Most have sensible defaults.

### Variable Naming Convention

- `NEXT_PUBLIC_*` - Available in browser and server
- Use descriptive names like `NEXT_PUBLIC_BRAND_*` for branding
- Use `NEXT_PUBLIC_CONTACT_*` for contact information

## Updating All Domains

When you update the master repository:

1. Push changes to `main` branch
2. All Vercel projects will automatically redeploy
3. Each domain maintains its unique configuration via env vars

## Best Practices

### Environment Variable Management

- Keep `.env.example` updated with new variables
- Use consistent naming across domains
- Document domain-specific requirements

### Deployment Strategy

- Enable auto-deployment for all projects
- Use preview deployments for testing
- Monitor deployment status across all domains

### Content Management

- Use environment variables for text content
- Keep shared assets in `/public`
- Domain-specific assets can be loaded via env vars

## Troubleshooting

### Common Issues

1. **Environment variables not updating**
   - Redeploy the Vercel project after changing env vars
   - Check variable names match exactly

2. **Domain not showing custom branding**
   - Verify `NEXT_PUBLIC_SITE_URL` matches the domain
   - Check browser cache

3. **Build failures**
   - Ensure all required env vars are set
   - Check Vercel build logs

### Support

- Check Vercel documentation for deployment issues
- Review environment variable configuration
- Test locally with `.env.local` file

## Example Domain Configurations

### Domain 1: Tech Startup

```bash
NEXT_PUBLIC_SITE_NAME=TechCorp
NEXT_PUBLIC_BRAND_DISPLAY_NAME=TechCorp Platform
NEXT_PUBLIC_THEME_PRIMARY_COLOR=#00d4aa
NEXT_PUBLIC_GENERAL_EMAIL=hello@techcorp.com
```

### Domain 2: Enterprise Client

```bash
NEXT_PUBLIC_SITE_NAME=EnterpriseSuite
NEXT_PUBLIC_BRAND_DISPLAY_NAME=Enterprise Solutions
NEXT_PUBLIC_THEME_PRIMARY_COLOR=#1a365d
NEXT_PUBLIC_GENERAL_EMAIL=contact@enterprise.com
```

This setup allows you to maintain one codebase while serving multiple branded experiences.
