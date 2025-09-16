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
NEXT_PUBLIC_THEME_PRIMARY_COLOR=#your-primary-color
NEXT_PUBLIC_THEME_ACCENT_COLOR=#your-accent-color
NEXT_PUBLIC_THEME_TEXT_COLOR=#your-text-color
NEXT_PUBLIC_THEME_BACKGROUND_COLOR=#your-background-color
NEXT_PUBLIC_THEME_BORDER_COLOR=#your-border-color
```

## Color Palettes by Domain

Each domain has a unique color scheme that matches its business nature:

- **Till Death**: Gothic purple & rose gold (`#6b21a8`, `#e879f9`)
- **Les Tasker**: Professional blue & silver (`#1e40af`, `#3b82f6`)
- **BBC WOIRA**: BBC red & corporate gray (`#bb1919`, `#dc2626`)
- **Titanworks**: Industrial orange & steel (`#ea580c`, `#fb923c`)
- **Trigger Kings**: Military green & camo (`#166534`, `#22c55e`)
- **Olympus Comps**: Luxury gold & royal purple (`#7c2d92`, `#a855f7`)
- **Strong Salts**: Fitness red & power black (`#dc2626`, `#ef4444`)
- **Project Snatch**: Stealth gray & cyan (`#374151`, `#06b6d4`)

## Domain Examples

### Till Death - Alternative Weddings (till-death.co.uk)

```bash
NEXT_PUBLIC_SITE_NAME=Till Death
NEXT_PUBLIC_SITE_TITLE=Till Death - Alternative Weddings & Events
NEXT_PUBLIC_SITE_DESCRIPTION=Unique and alternative wedding planning services for couples who want something extraordinary and unconventional.
NEXT_PUBLIC_SITE_URL=https://till-death.co.uk
NEXT_PUBLIC_THEME_PRIMARY_COLOR=#6b21a8
NEXT_PUBLIC_THEME_ACCENT_COLOR=#e879f9
```

### Les Tasker Portfolio (lestasker.co.uk)

```bash
NEXT_PUBLIC_SITE_NAME=Les Tasker
NEXT_PUBLIC_SITE_TITLE=Les Tasker - Full Stack Developer & Digital Creator
NEXT_PUBLIC_SITE_DESCRIPTION=Professional portfolio showcasing full stack development, 3D printing, and digital innovation projects.
NEXT_PUBLIC_SITE_URL=https://lestasker.co.uk
NEXT_PUBLIC_THEME_PRIMARY_COLOR=#1e40af
NEXT_PUBLIC_THEME_ACCENT_COLOR=#3b82f6
```

### BBC WOIRA Knowledge Base (bbcwoira.co.uk)

```bash
NEXT_PUBLIC_SITE_NAME=BBC WOIRA
NEXT_PUBLIC_SITE_TITLE=BBC WOIRA - Knowledge Base & Documentation
NEXT_PUBLIC_SITE_DESCRIPTION=Comprehensive knowledge base and documentation system for BBC WOIRA operations and procedures.
NEXT_PUBLIC_SITE_URL=https://bbcwoira.co.uk
NEXT_PUBLIC_THEME_PRIMARY_COLOR=#bb1919
NEXT_PUBLIC_THEME_ACCENT_COLOR=#dc2626
```

### Titanworks 3D Printing (titanworks.uk)

```bash
NEXT_PUBLIC_SITE_NAME=Titanworks
NEXT_PUBLIC_SITE_TITLE=Titanworks - Professional 3D Printing Services
NEXT_PUBLIC_SITE_DESCRIPTION=Premium 3D printing services, prototyping, and manufacturing solutions for businesses and individuals.
NEXT_PUBLIC_SITE_URL=https://titanworks.uk
NEXT_PUBLIC_THEME_PRIMARY_COLOR=#ea580c
NEXT_PUBLIC_THEME_ACCENT_COLOR=#fb923c
```

### Trigger Kings Paintball (triggerkings.co.uk)

```bash
NEXT_PUBLIC_SITE_NAME=Trigger Kings
NEXT_PUBLIC_SITE_TITLE=Trigger Kings - Mobile Paintball Shooting Range
NEXT_PUBLIC_SITE_DESCRIPTION=Professional mobile paintball shooting range services for events, parties, and team building activities.
NEXT_PUBLIC_SITE_URL=https://triggerkings.co.uk
NEXT_PUBLIC_THEME_PRIMARY_COLOR=#166534
NEXT_PUBLIC_THEME_ACCENT_COLOR=#22c55e
```

### Olympus Competitions (olympuscomps.co.uk)

```bash
NEXT_PUBLIC_SITE_NAME=Olympus Competitions
NEXT_PUBLIC_SITE_TITLE=Olympus Competitions - Premium Raffles & Draws
NEXT_PUBLIC_SITE_DESCRIPTION=Exclusive competitions, premium raffles, and exciting prize draws with luxury rewards and experiences.
NEXT_PUBLIC_SITE_URL=https://olympuscomps.co.uk
NEXT_PUBLIC_THEME_PRIMARY_COLOR=#7c2d92
NEXT_PUBLIC_THEME_ACCENT_COLOR=#a855f7
```

### Strong Salts Supplements (strongsalts.co.uk)

```bash
NEXT_PUBLIC_SITE_NAME=Strong Salts
NEXT_PUBLIC_SITE_TITLE=Strong Salts - Premium Gym Supplements & Smelling Salts
NEXT_PUBLIC_SITE_DESCRIPTION=High-performance gym supplements featuring our flagship smelling salts for maximum workout intensity and focus.
NEXT_PUBLIC_SITE_URL=https://strongsalts.co.uk
NEXT_PUBLIC_THEME_PRIMARY_COLOR=#dc2626
NEXT_PUBLIC_THEME_ACCENT_COLOR=#ef4444
```

### Project Snatch R&D (compralo.co.uk)

```bash
NEXT_PUBLIC_SITE_NAME=Project Snatch
NEXT_PUBLIC_SITE_TITLE=Project Snatch - Private Research & Development
NEXT_PUBLIC_SITE_DESCRIPTION=Confidential research and development workspace for innovative projects and experimental technologies.
NEXT_PUBLIC_SITE_URL=https://compralo.co.uk
NEXT_PUBLIC_THEME_PRIMARY_COLOR=#374151
NEXT_PUBLIC_THEME_ACCENT_COLOR=#06b6d4
```

## Vercel Deployment Steps

### 1. Create Vercel Projects

For each domain, create a separate Vercel project:

- Project 1: `till-death` → till-death.co.uk
- Project 2: `lestasker-portfolio` → lestasker.co.uk
- Project 3: `bbcwoira-kb` → bbcwoira.co.uk
- Project 4: `titanworks-3d` → titanworks.uk
- Project 5: `triggerkings-paintball` → triggerkings.co.uk
- Project 6: `olympuscomps` → olympuscomps.co.uk
- Project 7: `strongsalts` → strongsalts.co.uk
- Project 8: `project-snatch` → compralo.co.uk

### 2. Connect Same Repository

All projects connect to the same GitHub repository (`LesTasker2023/Titanworks`)

### 3. Set Environment Variables

In each Vercel project's Settings → Environment Variables:

**For Titanworks 3D Printing project:**

```
NEXT_PUBLIC_SITE_NAME = Titanworks
NEXT_PUBLIC_SITE_TITLE = Titanworks - Professional 3D Printing Services
NEXT_PUBLIC_SITE_DESCRIPTION = Premium 3D printing services, prototyping, and manufacturing solutions for businesses and individuals.
NEXT_PUBLIC_SITE_URL = https://titanworks.uk
NEXT_PUBLIC_BRAND_DISPLAY_NAME = Titanworks
NEXT_PUBLIC_BRAND_TAGLINE = Professional 3D Printing Services
NEXT_PUBLIC_THEME_PRIMARY_COLOR = #ea580c
NEXT_PUBLIC_THEME_ACCENT_COLOR = #fb923c
```

**For Strong Salts Supplements project:**

```
NEXT_PUBLIC_SITE_NAME = Strong Salts
NEXT_PUBLIC_SITE_TITLE = Strong Salts - Premium Gym Supplements & Smelling Salts
NEXT_PUBLIC_SITE_DESCRIPTION = High-performance gym supplements featuring our flagship smelling salts for maximum workout intensity and focus.
NEXT_PUBLIC_SITE_URL = https://strongsalts.co.uk
NEXT_PUBLIC_BRAND_DISPLAY_NAME = Strong Salts
NEXT_PUBLIC_BRAND_TAGLINE = Premium Gym Supplements & Smelling Salts
NEXT_PUBLIC_THEME_PRIMARY_COLOR = #dc2626
NEXT_PUBLIC_THEME_ACCENT_COLOR = #ef4444
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

- `.env.till-death.example` - Alternative weddings (Gothic purple theme)
- `.env.lestasker.example` - Personal portfolio (Professional blue theme)
- `.env.bbcwoira.example` - Knowledge base (BBC red theme)
- `.env.titanworks.example` - 3D printing business (Industrial orange theme)
- `.env.triggerkings.example` - Mobile paintball (Military green theme)
- `.env.olympuscomps.example` - Raffles & draws (Luxury purple theme)
- `.env.strongsalts.example` - Gym supplements (Fitness red theme)
- `.env.project-snatch.example` - Private R&D (Stealth gray theme)
