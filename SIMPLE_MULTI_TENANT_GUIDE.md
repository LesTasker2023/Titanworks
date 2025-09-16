# Simple Multi-Tenant Deployment Guide

## Overview

This repository supports simple multi-tenant deployments where **only site metadata** changes between domains. All functionality and components remain identical - only the branding and SEO information differs.

## How It Works

The system uses Next.js environment variables to override site metadata at build time:

- Same codebase deployed to multiple Vercel projects
- Each project has different `NEXT_PUBLIC_SITE_*` environment variables
- Title, description, and branding change dynamically
- All other functionality remains identical

## Required Environment Variables

For each domain, you need to set these **4 core variables** in Vercel:

```bash
NEXT_PUBLIC_SITE_NAME=YourBrandName
NEXT_PUBLIC_SITE_TITLE=Your Brand - Your Tagline
NEXT_PUBLIC_SITE_DESCRIPTION=Your SEO-optimized description for meta tags.
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Optional Brand Customization

```bash
NEXT_PUBLIC_BRAND_DISPLAY_NAME=Your Brand
NEXT_PUBLIC_BRAND_TAGLINE=Your Brand Tagline
```

## Domain Examples

### Daedalus (Default/Fallback)

```bash
NEXT_PUBLIC_SITE_NAME=Daedalus
NEXT_PUBLIC_SITE_TITLE=Daedalus - Unified Engineering & AI Operations
NEXT_PUBLIC_SITE_DESCRIPTION=Scalable Next.js platform with TypeScript-first rigor and comprehensive component ecosystem.
NEXT_PUBLIC_SITE_URL=https://daedalus.dev
```

### Titanworks

```bash
NEXT_PUBLIC_SITE_NAME=Titanworks
NEXT_PUBLIC_SITE_TITLE=Titanworks - Engineering Excellence & Innovation
NEXT_PUBLIC_SITE_DESCRIPTION=Advanced engineering solutions with cutting-edge technology and innovative development practices.
NEXT_PUBLIC_SITE_URL=https://titanworks.dev
```

### TitanDigital

```bash
NEXT_PUBLIC_SITE_NAME=TitanDigital
NEXT_PUBLIC_SITE_TITLE=TitanDigital - Digital Marketing & Web Solutions
NEXT_PUBLIC_SITE_DESCRIPTION=Professional digital marketing services, web development, and brand strategy for modern businesses.
NEXT_PUBLIC_SITE_URL=https://titandigital.com
```

### TitanLabs

```bash
NEXT_PUBLIC_SITE_NAME=TitanLabs
NEXT_PUBLIC_SITE_TITLE=TitanLabs - Research & Development Innovation
NEXT_PUBLIC_SITE_DESCRIPTION=Cutting-edge research and development laboratory specializing in emerging technologies and breakthrough solutions.
NEXT_PUBLIC_SITE_URL=https://titanlabs.tech
```

## Vercel Deployment Steps

### 1. Create Vercel Projects

For each domain, create a separate Vercel project:

- Project 1: `daedalus-main` → daedalus.dev
- Project 2: `titanworks` → titanworks.dev
- Project 3: `titandigital` → titandigital.com
- Project 4: `titanlabs` → titanlabs.tech

### 2. Connect Same Repository

All projects connect to the same GitHub repository (`LesTasker2023/Titanworks`)

### 3. Set Environment Variables

In each Vercel project's Settings → Environment Variables:

**For Titanworks project:**

```
NEXT_PUBLIC_SITE_NAME = Titanworks
NEXT_PUBLIC_SITE_TITLE = Titanworks - Engineering Excellence & Innovation
NEXT_PUBLIC_SITE_DESCRIPTION = Advanced engineering solutions with cutting-edge technology and innovative development practices.
NEXT_PUBLIC_SITE_URL = https://titanworks.dev
NEXT_PUBLIC_BRAND_DISPLAY_NAME = Titanworks
NEXT_PUBLIC_BRAND_TAGLINE = Engineering the Future
```

**For TitanDigital project:**

```
NEXT_PUBLIC_SITE_NAME = TitanDigital
NEXT_PUBLIC_SITE_TITLE = TitanDigital - Digital Marketing & Web Solutions
NEXT_PUBLIC_SITE_DESCRIPTION = Professional digital marketing services, web development, and brand strategy for modern businesses.
NEXT_PUBLIC_SITE_URL = https://titandigital.com
NEXT_PUBLIC_BRAND_DISPLAY_NAME = TitanDigital
NEXT_PUBLIC_BRAND_TAGLINE = Digital Excellence Delivered
```

_(Repeat for each domain)_

### 4. Deploy

- Push to `main` branch
- All Vercel projects will automatically deploy
- Each will have different metadata but identical functionality

## Testing Changes

1. **Local Testing**: Copy variables from `.env.{domain}.example` to `.env.local`
2. **Run**: `yarn dev`
3. **Verify**: Check browser title, hero section, and page source
4. **Switch**: Change to different domain variables and test again

## Key Benefits

✅ **Single Codebase**: One repository, multiple brands  
✅ **Simple Setup**: Only 4-6 environment variables per domain  
✅ **SEO Optimized**: Proper meta tags for each brand  
✅ **No Code Changes**: Deploy new domains without code modifications  
✅ **Easy Maintenance**: Update functionality once, deploys everywhere

## What Changes Per Domain

- Browser title (`<title>` tag)
- Meta description for SEO
- Hero section heading and description
- Brand display name in UI
- Open Graph metadata for social sharing

## What Stays Identical

- All UI components and functionality
- Navigation and routing
- API endpoints and backend logic
- Styling and design system
- Performance optimizations

## Troubleshooting

**Problem**: Site shows default "Daedalus" branding
**Solution**: Check that environment variables are set in Vercel and redeploy

**Problem**: Environment changes not reflected
**Solution**: Environment variables are build-time only - trigger a new deployment

**Problem**: Missing meta tags  
**Solution**: Verify `NEXT_PUBLIC_SITE_TITLE` and `NEXT_PUBLIC_SITE_DESCRIPTION` are set

## Example .env Files

Ready-to-copy environment configurations are available:

- `.env.daedalus.example`
- `.env.titanworks.example`
- `.env.titandigital.example`
- `.env.titanlabs.example`
