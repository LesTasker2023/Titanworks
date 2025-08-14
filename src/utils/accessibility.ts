/**
 * Daedalus Accessibility Utilities
 * Contrast ratio calculations and validation helpers
 */

/**
 * Calculate relative luminance of a color
 * @param r Red component (0-255)
 * @param g Green component (0-255)
 * @param b Blue component (0-255)
 * @returns Relative luminance (0-1)
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * @param color1 First color [r, g, b]
 * @param color2 Second color [r, g, b]
 * @returns Contrast ratio (1-21)
 */
export function getContrastRatio(
  color1: [number, number, number],
  color2: [number, number, number]
): number {
  const lum1 = getLuminance(...color1);
  const lum2 = getLuminance(...color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Check if contrast ratio meets WCAG standards
 * @param ratio Contrast ratio
 * @param level 'AA' or 'AAA'
 * @param size 'normal' or 'large'
 * @returns Whether the ratio meets the standard
 */
export function meetsWCAGStandards(
  ratio: number,
  level: 'AA' | 'AAA' = 'AA',
  size: 'normal' | 'large' = 'normal'
): boolean {
  if (level === 'AA') {
    return size === 'large' ? ratio >= 3 : ratio >= 4.5;
  }
  // AAA standards
  return size === 'large' ? ratio >= 4.5 : ratio >= 7;
}

/**
 * Convert hex color to RGB
 * @param hex Hex color string
 * @returns RGB array
 */
export function hexToRgb(hex: string): [number, number, number] | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : null;
}

/**
 * Daedalus color palette with accessibility info
 */
export const TK_COLORS = {
  // Primary palette
  primary: { hex: '#ef4444', rgb: [239, 68, 68] as [number, number, number] },
  primaryForeground: { hex: '#ffffff', rgb: [255, 255, 255] as [number, number, number] },

  // Neutral palette
  neutral50: { hex: '#f9fafb', rgb: [249, 250, 251] as [number, number, number] },
  neutral900: { hex: '#111827', rgb: [17, 24, 39] as [number, number, number] },
  neutral800: { hex: '#1f2937', rgb: [31, 41, 55] as [number, number, number] },
  neutral400: { hex: '#9ca3af', rgb: [156, 163, 175] as [number, number, number] },
} as const;

/**
 * Test common Daedalus color combinations
 */
export function auditDaedalusColors(): void {
  const combinations = [
    {
      name: 'Primary on White',
      fg: TK_COLORS.primary.rgb,
      bg: [255, 255, 255] as [number, number, number],
    },
    {
      name: 'White on Primary',
      fg: [255, 255, 255] as [number, number, number],
      bg: TK_COLORS.primary.rgb,
    },
    { name: 'Dark text on Light', fg: TK_COLORS.neutral900.rgb, bg: TK_COLORS.neutral50.rgb },
    { name: 'Light text on Dark', fg: TK_COLORS.neutral50.rgb, bg: TK_COLORS.neutral900.rgb },
    { name: 'Muted on Dark', fg: TK_COLORS.neutral400.rgb, bg: TK_COLORS.neutral800.rgb },
  ];

  console.group('🎨 Daedalus Color Accessibility Audit');

  combinations.forEach(({ name, fg, bg }) => {
    const ratio = getContrastRatio(fg, bg);
    const aa = meetsWCAGStandards(ratio, 'AA');
    const aaa = meetsWCAGStandards(ratio, 'AAA');

    // Development audit logging (removed in production)
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `${name}: ${ratio.toFixed(2)}:1 ${aa ? '✅ AA' : '❌ AA'} ${aaa ? '✅ AAA' : '❌ AAA'}`
      );
    }
  });

  console.groupEnd();
}

// Run audit in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // auditDaedalusColors();
}
