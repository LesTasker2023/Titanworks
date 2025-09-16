/**
 * DesignTokenProvider - Injects environment variables as CSS custom properties
 * This allows SCSS/CSS to use values from .env files
 */
'use client';

import { useEffect } from 'react';

export interface DesignTokens {
  // Surface tokens
  surfacePrimary: string;
  surfaceSecondary: string;
  surfaceSecondaryButton: string;
  surfaceNeutral: string;
  surfaceInteractive: string;
  surfaceAccent: string;

  // Content tokens
  contentPrimary: string;
  contentSecondary: string;
  contentInverse: string;
  contentMuted: string;

  // Border tokens
  borderDefault: string;
  borderInteractive: string;
  borderMuted: string;

  // Status tokens
  statusSuccess: string;
  statusWarning: string;
  statusError: string;
  statusInfo: string;

  // Typography tokens
  fontFamilyBase: string;
  fontFamilyMono: string;
  fontSizeSm: string;
  fontSizeBase: string;
  fontSizeLg: string;
  fontSizeXl: string;
  fontSize2xl: string;
  fontSize3xl: string;
  fontSize4xl: string;
  fontWeightNormal: string;
  fontWeightMedium: string;
  fontWeightSemibold: string;
  fontWeightBold: string;

  // Spacing tokens
  spacingUnit: string;
  spacingXs: string;
  spacingSm: string;
  spacingMd: string;
  spacingLg: string;
  spacingXl: string;
  spacing2xl: string;

  // Border radius tokens
  borderRadiusSm: string;
  borderRadiusMd: string;
  borderRadiusLg: string;
  radiusSm: string;
  radiusMd: string;
  radiusLg: string;
  radiusXl: string;
  radiusXs: string;

  // Border width tokens
  borderWidthThin: string;
  borderWidthDefault: string;
  borderWidthThick: string;
}

const getDesignTokensFromEnv = (): DesignTokens => ({
  // Surface tokens
  surfacePrimary: process.env.NEXT_PUBLIC_SURFACE_PRIMARY || '0 0% 100%',
  surfaceSecondary: process.env.NEXT_PUBLIC_SURFACE_SECONDARY || '220 14% 96%',
  surfaceSecondaryButton: process.env.NEXT_PUBLIC_SURFACE_SECONDARY_BUTTON || '215 25% 92%',
  surfaceNeutral: process.env.NEXT_PUBLIC_SURFACE_NEUTRAL || '220 14% 96%',
  surfaceInteractive: process.env.NEXT_PUBLIC_SURFACE_INTERACTIVE || '221 83% 53%',
  surfaceAccent: process.env.NEXT_PUBLIC_SURFACE_ACCENT || '142 76% 36%',

  // Content tokens
  contentPrimary: process.env.NEXT_PUBLIC_CONTENT_PRIMARY || '224 71% 4%',
  contentSecondary: process.env.NEXT_PUBLIC_CONTENT_SECONDARY || '220 9% 46%',
  contentInverse: process.env.NEXT_PUBLIC_CONTENT_INVERSE || '0 0% 98%',
  contentMuted: process.env.NEXT_PUBLIC_CONTENT_MUTED || '220 14% 96%',

  // Border tokens
  borderDefault: process.env.NEXT_PUBLIC_BORDER_DEFAULT || '220 13% 91%',
  borderInteractive: process.env.NEXT_PUBLIC_BORDER_INTERACTIVE || '221 83% 53%',
  borderMuted: process.env.NEXT_PUBLIC_BORDER_MUTED || '220 14% 96%',

  // Status tokens
  statusSuccess: process.env.NEXT_PUBLIC_STATUS_SUCCESS || '142 76% 36%',
  statusWarning: process.env.NEXT_PUBLIC_STATUS_WARNING || '32 95% 44%',
  statusError: process.env.NEXT_PUBLIC_STATUS_ERROR || '0 84% 60%',
  statusInfo: process.env.NEXT_PUBLIC_STATUS_INFO || '221 83% 53%',

  // Typography tokens
  fontFamilyBase: process.env.NEXT_PUBLIC_FONT_FAMILY_BASE || '"Inter", system-ui, sans-serif',
  fontFamilyMono:
    process.env.NEXT_PUBLIC_FONT_FAMILY_MONO || '"JetBrains Mono", Monaco, Consolas, monospace',
  fontSizeSm: process.env.NEXT_PUBLIC_FONT_SIZE_SM || '0.875rem',
  fontSizeBase: process.env.NEXT_PUBLIC_FONT_SIZE_BASE || '1rem',
  fontSizeLg: process.env.NEXT_PUBLIC_FONT_SIZE_LG || '1.125rem',
  fontSizeXl: process.env.NEXT_PUBLIC_FONT_SIZE_XL || '1.25rem',
  fontSize2xl: process.env.NEXT_PUBLIC_FONT_SIZE_2XL || '1.5rem',
  fontSize3xl: process.env.NEXT_PUBLIC_FONT_SIZE_3XL || '1.875rem',
  fontSize4xl: process.env.NEXT_PUBLIC_FONT_SIZE_4XL || '2.25rem',
  fontWeightNormal: process.env.NEXT_PUBLIC_FONT_WEIGHT_NORMAL || '400',
  fontWeightMedium: process.env.NEXT_PUBLIC_FONT_WEIGHT_MEDIUM || '500',
  fontWeightSemibold: process.env.NEXT_PUBLIC_FONT_WEIGHT_SEMIBOLD || '600',
  fontWeightBold: process.env.NEXT_PUBLIC_FONT_WEIGHT_BOLD || '700',

  // Spacing tokens
  spacingUnit: process.env.NEXT_PUBLIC_SPACING_UNIT || '0.25rem',
  spacingXs: process.env.NEXT_PUBLIC_SPACING_XS || '0.25rem',
  spacingSm: process.env.NEXT_PUBLIC_SPACING_SM || '0.5rem',
  spacingMd: process.env.NEXT_PUBLIC_SPACING_MD || '1rem',
  spacingLg: process.env.NEXT_PUBLIC_SPACING_LG || '1.5rem',
  spacingXl: process.env.NEXT_PUBLIC_SPACING_XL || '2rem',
  spacing2xl: process.env.NEXT_PUBLIC_SPACING_2XL || '3rem',

  // Border radius tokens
  borderRadiusSm: process.env.NEXT_PUBLIC_BORDER_RADIUS_SM || '0.25rem',
  borderRadiusMd: process.env.NEXT_PUBLIC_BORDER_RADIUS_MD || '0.375rem',
  borderRadiusLg: process.env.NEXT_PUBLIC_BORDER_RADIUS_LG || '0.5rem',
  radiusSm: process.env.NEXT_PUBLIC_RADIUS_SM || '0.25rem',
  radiusMd: process.env.NEXT_PUBLIC_RADIUS_MD || '0.5rem',
  radiusLg: process.env.NEXT_PUBLIC_RADIUS_LG || '0.75rem',
  radiusXl: process.env.NEXT_PUBLIC_RADIUS_XL || '1rem',
  radiusXs: process.env.NEXT_PUBLIC_RADIUS_XS || '0.125rem',

  // Border width tokens
  borderWidthThin: process.env.NEXT_PUBLIC_BORDER_WIDTH_THIN || '1px',
  borderWidthDefault: process.env.NEXT_PUBLIC_BORDER_WIDTH_DEFAULT || '1px',
  borderWidthThick: process.env.NEXT_PUBLIC_BORDER_WIDTH_THICK || '2px',
});

export function DesignTokenProvider() {
  useEffect(() => {
    const tokens = getDesignTokensFromEnv();
    const root = document.documentElement;

    // Inject tokens as CSS custom properties
    Object.entries(tokens).forEach(([key, value]) => {
      // Convert camelCase to kebab-case with token prefix
      const cssVar = `--token-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      root.style.setProperty(cssVar, value);
    });

    // Also set them without token prefix for backward compatibility
    root.style.setProperty('--surface-primary', tokens.surfacePrimary);
    root.style.setProperty('--surface-secondary', tokens.surfaceSecondary);
    root.style.setProperty('--surface-secondary-button', tokens.surfaceSecondaryButton);
    root.style.setProperty('--surface-neutral', tokens.surfaceNeutral);
    root.style.setProperty('--surface-interactive', tokens.surfaceInteractive);
    root.style.setProperty('--surface-accent', tokens.surfaceAccent);
    root.style.setProperty('--content-primary', tokens.contentPrimary);
    root.style.setProperty('--content-secondary', tokens.contentSecondary);
    root.style.setProperty('--content-inverse', tokens.contentInverse);
    root.style.setProperty('--content-muted', tokens.contentMuted);
    root.style.setProperty('--border-default', tokens.borderDefault);
    root.style.setProperty('--border-interactive', tokens.borderInteractive);
    root.style.setProperty('--border-muted', tokens.borderMuted);
    root.style.setProperty('--status-success', tokens.statusSuccess);
    root.style.setProperty('--status-warning', tokens.statusWarning);
    root.style.setProperty('--status-error', tokens.statusError);
    root.style.setProperty('--status-info', tokens.statusInfo);
    root.style.setProperty('--font-family-base', tokens.fontFamilyBase);
    root.style.setProperty('--font-family-mono', tokens.fontFamilyMono);
    root.style.setProperty('--font-size-sm', tokens.fontSizeSm);
    root.style.setProperty('--font-size-base', tokens.fontSizeBase);
    root.style.setProperty('--font-size-lg', tokens.fontSizeLg);
    root.style.setProperty('--font-size-xl', tokens.fontSizeXl);
    root.style.setProperty('--font-size-2xl', tokens.fontSize2xl);
    root.style.setProperty('--font-size-3xl', tokens.fontSize3xl);
    root.style.setProperty('--font-size-4xl', tokens.fontSize4xl);
    root.style.setProperty('--font-weight-normal', tokens.fontWeightNormal);
    root.style.setProperty('--font-weight-medium', tokens.fontWeightMedium);
    root.style.setProperty('--font-weight-semibold', tokens.fontWeightSemibold);
    root.style.setProperty('--font-weight-bold', tokens.fontWeightBold);
    root.style.setProperty('--spacing-unit', tokens.spacingUnit);
    root.style.setProperty('--spacing-xs', tokens.spacingXs);
    root.style.setProperty('--spacing-sm', tokens.spacingSm);
    root.style.setProperty('--spacing-md', tokens.spacingMd);
    root.style.setProperty('--spacing-lg', tokens.spacingLg);
    root.style.setProperty('--spacing-xl', tokens.spacingXl);
    root.style.setProperty('--spacing-2xl', tokens.spacing2xl);
    root.style.setProperty('--border-radius-sm', tokens.borderRadiusSm);
    root.style.setProperty('--border-radius-md', tokens.borderRadiusMd);
    root.style.setProperty('--border-radius-lg', tokens.borderRadiusLg);
    root.style.setProperty('--radius-sm', tokens.radiusSm);
    root.style.setProperty('--radius-md', tokens.radiusMd);
    root.style.setProperty('--radius-lg', tokens.radiusLg);
    root.style.setProperty('--radius-xl', tokens.radiusXl);
    root.style.setProperty('--radius-xs', tokens.radiusXs);
    root.style.setProperty('--border-width-thin', tokens.borderWidthThin);
    root.style.setProperty('--border-width-default', tokens.borderWidthDefault);
    root.style.setProperty('--border-width-thick', tokens.borderWidthThick);
  }, []);

  return null; // This component only sets CSS variables
}

// Hook to get design tokens in components
export function useDesignTokens(): DesignTokens {
  return getDesignTokensFromEnv();
}
