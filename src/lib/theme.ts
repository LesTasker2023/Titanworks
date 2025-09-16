/**
 * Theme utility for applying dynamic colors from environment variables
 */

import { getSiteMetadata } from './siteConfig';

export interface ThemeColors {
  primaryColor: string;
  accentColor: string;
  textColor: string;
  backgroundColor: string;
  borderColor: string;
}

export const getThemeColors = (): ThemeColors => {
  const config = getSiteMetadata();
  return {
    primaryColor: process.env.NEXT_PUBLIC_THEME_PRIMARY_COLOR || '#18181b',
    accentColor: process.env.NEXT_PUBLIC_THEME_ACCENT_COLOR || '#3b82f6',
    textColor: process.env.NEXT_PUBLIC_THEME_TEXT_COLOR || '#1f2937',
    backgroundColor: process.env.NEXT_PUBLIC_THEME_BACKGROUND_COLOR || '#ffffff',
    borderColor: process.env.NEXT_PUBLIC_THEME_BORDER_COLOR || '#e5e7eb',
  };
};

export const generateThemeCss = (): string => {
  const colors = getThemeColors();

  // Convert hex to HSL for the design system
  const hexToHsl = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return '0 0% 0%';

    const r = parseInt(result[1], 16) / 255;
    const g = parseInt(result[2], 16) / 255;
    const b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  };

  return `
    :root {
      /* Theme color custom properties */
      --theme-primary: ${colors.primaryColor};
      --theme-accent: ${colors.accentColor};
      --theme-text: ${colors.textColor};
      --theme-background: ${colors.backgroundColor};
      --theme-border: ${colors.borderColor};
      
      /* Map theme colors to design system */
      --primary: ${hexToHsl(colors.primaryColor)};
      --primary-foreground: ${hexToHsl('#ffffff')};
      --accent: ${hexToHsl(colors.accentColor)};
      --accent-foreground: ${hexToHsl('#ffffff')};
      --background: ${hexToHsl(colors.backgroundColor)};
      --foreground: ${hexToHsl(colors.textColor)};
      --border: ${hexToHsl(colors.borderColor)};
    }
  `;
};

export const applyThemeColors = () => {
  if (typeof window === 'undefined') return;

  const colors = getThemeColors();
  const root = document.documentElement;

  root.style.setProperty('--theme-primary', colors.primaryColor);
  root.style.setProperty('--theme-accent', colors.accentColor);
  root.style.setProperty('--theme-text', colors.textColor);
  root.style.setProperty('--theme-background', colors.backgroundColor);
  root.style.setProperty('--theme-border', colors.borderColor);
};
