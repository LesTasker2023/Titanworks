'use client';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/Sheet';
import { Check, Lightbulb, Palette, RotateCcw } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
interface ColorScheme {
  name: string;
  colors: {
    interactive: string;
    surface: string;
    accent: string;
  };
  description: string;
}
const THEME_PRESETS: ColorScheme[] = [
  {
    name: 'Professional',
    description: 'Clean, corporate blue with subtle grays for business applications',
    colors: {
      interactive: '#2563eb', // Blue-600
      surface: '#f1f5f9', // Slate-100
      accent: '#10b981', // Emerald-500
    },
  },
  {
    name: 'GitHub Dark',
    description: "Inspired by GitHub's dark theme - sophisticated developer aesthetic",
    colors: {
      interactive: '#58a6ff', // GitHub blue
      surface: '#21262d', // GitHub dark surface
      accent: '#7ee787', // GitHub green
    },
  },
  {
    name: 'Stripe',
    description: "Stripe's elegant purple and blue - trusted fintech colors",
    colors: {
      interactive: '#635bff', // Stripe purple
      surface: '#f7f9fc', // Stripe light gray
      accent: '#00d924', // Stripe green
    },
  },
  {
    name: 'Vercel',
    description: 'Monochromatic elegance with high contrast for modern apps',
    colors: {
      interactive: '#000000', // Pure black
      surface: '#fafafa', // Near white
      accent: '#ff0080', // Vercel pink
    },
  },
  {
    name: 'Tailwind',
    description: 'Tailwind CSS brand colors - perfect for utility-first design',
    colors: {
      interactive: '#0f172a', // Slate-900
      surface: '#f8fafc', // Slate-50
      accent: '#06b6d4', // Cyan-500
    },
  },
  {
    name: 'Shopify',
    description: 'E-commerce focused green and purple - commerce-optimized',
    colors: {
      interactive: '#00a652', // Shopify green
      surface: '#f8f8f8', // Light gray
      accent: '#5c6ac4', // Shopify purple
    },
  },
  {
    name: 'Discord',
    description: 'Gaming and community focused - vibrant and engaging',
    colors: {
      interactive: '#5865f2', // Discord blurple
      surface: '#36393f', // Discord dark
      accent: '#ed4245', // Discord red
    },
  },
  {
    name: 'Linear',
    description: 'Minimal productivity app aesthetic - clean and focused',
    colors: {
      interactive: '#5e6ad2', // Linear purple
      surface: '#fcfcfc', // Almost white
      accent: '#f26522', // Linear orange
    },
  },
  {
    name: 'Notion',
    description: 'Warm and approachable - perfect for content and documentation',
    colors: {
      interactive: '#2383e2', // Notion blue
      surface: '#f7f6f3', // Notion cream
      accent: '#ff5757', // Notion red
    },
  },
  {
    name: 'Retro Wave',
    description: 'Synthwave inspired - electric colors for creative projects',
    colors: {
      interactive: '#ff0080', // Hot pink
      surface: '#0f0f23', // Dark purple
      accent: '#00ffff', // Cyan
    },
  },
];
export function ThemePickerSheet() {
  const [currentScheme, setCurrentScheme] = useState<ColorScheme>(THEME_PRESETS[0]);
  const [customColors, setCustomColors] = useState({
    interactive: '#2563eb',
    surface: '#f1f5f9',
    accent: '#10b981',
  });
  const [isOpen, setIsOpen] = useState(false);
  const getContrastColor = useCallback((bgColor: string): string => {
    // Convert hex to RGB
    const hex = bgColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    // Return black or white based on luminance
    return luminance > 0.5 ? '#000000' : '#ffffff';
  }, []);
  const hexToHsl = useCallback((hex: string): string => {
    // Convert hex to RGB
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return '0 0% 0%';
    const r = parseInt(result[1], 16) / 255;
    const g = parseInt(result[2], 16) / 255;
    const b = parseInt(result[3], 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    let h: number, s: number;
    if (max === min) {
      h = s = 0; // achromatic
    } else {
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
        default:
          h = 0;
      }
      h /= 6;
    }
    // Convert to HSL format expected by CSS (e.g., "221 83% 53%")
    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  }, []);
  const applyColors = useCallback(
    (colors: typeof customColors) => {
      const root = document.documentElement;
      // Apply semantic color variables - convert hex to HSL
      const interactiveHSL = hexToHsl(colors.interactive);
      const surfaceHSL = hexToHsl(colors.surface);
      const accentHSL = hexToHsl(colors.accent);
      root.style.setProperty('--surface-interactive', interactiveHSL);
      root.style.setProperty('--surface-secondary', surfaceHSL);
      root.style.setProperty('--surface-accent', accentHSL);
      // Also set the legacy color variables for compatibility
      root.style.setProperty('--color-interactive', colors.interactive);
      root.style.setProperty('--color-surface', colors.surface);
      root.style.setProperty('--color-accent', colors.accent);
      // Update primary colors to interactive color
      root.style.setProperty('--brand-primary', colors.interactive);
      // Calculate contrasting foreground colors
      const interactiveFg = getContrastColor(colors.interactive);
      const surfaceFg = getContrastColor(colors.surface);
      const accentFg = getContrastColor(colors.accent);
      root.style.setProperty('--color-interactive-foreground', interactiveFg);
      root.style.setProperty('--color-surface-foreground', surfaceFg);
      root.style.setProperty('--color-accent-foreground', accentFg);
      root.style.setProperty('--brand-primary-foreground', interactiveFg);
    },
    [getContrastColor, hexToHsl]
  );
  useEffect(() => {
    // Load saved colors from localStorage
    const savedColors = localStorage.getItem('minimal-theme-colors');
    if (savedColors) {
      try {
        const parsedColors = JSON.parse(savedColors);
        setCustomColors(parsedColors);
        applyColors(parsedColors);
        // Try to match with a preset
        const matchingPreset = THEME_PRESETS.find(
          preset =>
            preset.colors.interactive === parsedColors.interactive &&
            preset.colors.surface === parsedColors.surface &&
            preset.colors.accent === parsedColors.accent
        );
        if (matchingPreset) {
          setCurrentScheme(matchingPreset);
        } else {
          // Create custom scheme object
          setCurrentScheme({
            name: 'Custom',
            description: 'Your personalized color combination',
            colors: parsedColors,
          });
        }
      } catch (error) {
        // Removed console statement:
      }
    }
  }, [applyColors]);
  const applyPreset = (scheme: ColorScheme) => {
    setCurrentScheme(scheme);
    setCustomColors(scheme.colors);
    applyColors(scheme.colors);
    // Save to localStorage
    localStorage.setItem('minimal-theme-colors', JSON.stringify(scheme.colors));
  };
  const updateCustomColor = (colorType: keyof typeof customColors, value: string) => {
    const newColors = { ...customColors, [colorType]: value };
    setCustomColors(newColors);
    applyColors(newColors);
    // Save to localStorage
    localStorage.setItem('minimal-theme-colors', JSON.stringify(newColors));
    // Update current scheme to custom
    setCurrentScheme({
      name: 'Custom',
      description: 'Your personalized color combination',
      colors: newColors,
    });
  };
  const resetToDefault = () => {
    const defaultScheme = THEME_PRESETS[0];
    applyPreset(defaultScheme);
  };
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 relative">
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              <div
                className="w-2.5 h-2.5 rounded-full border border-white/30 shadow-sm"
                style={{ backgroundColor: customColors.interactive }}
                title="Interactive Color"
              />
              <div
                className="w-2.5 h-2.5 rounded-full border border-white/30 shadow-sm"
                style={{ backgroundColor: customColors.surface }}
                title="Surface Color"
              />
              <div
                className="w-2.5 h-2.5 rounded-full border border-white/30 shadow-sm"
                style={{ backgroundColor: customColors.accent }}
                title="Accent Color"
              />
            </div>
            <span className="hidden sm:inline text-sm">Themes</span>
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Theme Customization
          </SheetTitle>
          <SheetDescription>
            Customize your site&apos;s colors with our research-backed 3-color system. Based on
            cognitive psychology principles for optimal user experience.
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-6 pb-6">
          {/* Research Context */}
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="space-y-2">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100">Why 3 Colors?</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Following Miller&apos;s &ldquo;5±2 Rule&rdquo; from cognitive psychology, we
                    limit customization to 3 semantic colors: <strong>Interactive</strong> (buttons,
                    links),
                    <strong>Surface</strong> (backgrounds), and <strong>Accent</strong>{' '}
                    (highlights).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Current Theme Display */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Current Theme</Label>
            <Card className="border-2">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-medium">{currentScheme.name}</h3>
                    <p className="text-sm text-muted-foreground">{currentScheme.description}</p>
                  </div>
                  {currentScheme.name !== 'Custom' && <Check className="h-5 w-5 text-green-600" />}
                </div>
                {/* Color Preview */}
                <div className="flex gap-2">
                  <div className="flex-1 space-y-1">
                    <div
                      className="h-8 rounded-md border flex items-center justify-center"
                      style={{
                        backgroundColor: customColors.interactive,
                        color: getContrastColor(customColors.interactive),
                      }}
                    >
                      <span className="text-xs font-medium">Interactive</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div
                      className="h-8 rounded-md border flex items-center justify-center"
                      style={{
                        backgroundColor: customColors.surface,
                        color: getContrastColor(customColors.surface),
                      }}
                    >
                      <span className="text-xs font-medium">Surface</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div
                      className="h-8 rounded-md border flex items-center justify-center"
                      style={{
                        backgroundColor: customColors.accent,
                        color: getContrastColor(customColors.accent),
                      }}
                    >
                      <span className="text-xs font-medium">Accent</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Preset Themes */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Quick Themes</Label>
            <div className="space-y-2">
              {THEME_PRESETS.map(scheme => (
                <Card
                  key={scheme.name}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    currentScheme.name === scheme.name
                      ? 'ring-2 ring-primary shadow-md'
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => applyPreset(scheme)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-sm">{scheme.name}</h4>
                        <p className="text-xs text-muted-foreground">{scheme.description}</p>
                      </div>
                      {currentScheme.name === scheme.name && (
                        <Check className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    {/* Mini Color Preview */}
                    <div className="flex gap-1">
                      <div
                        className="h-4 flex-1 rounded-sm border"
                        style={{ backgroundColor: scheme.colors.interactive }}
                        title="Interactive"
                      />
                      <div
                        className="h-4 flex-1 rounded-sm border"
                        style={{ backgroundColor: scheme.colors.surface }}
                        title="Surface"
                      />
                      <div
                        className="h-4 flex-1 rounded-sm border"
                        style={{ backgroundColor: scheme.colors.accent }}
                        title="Accent"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          {/* Custom Color Controls */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Custom Colors</Label>
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">
                      Interactive Color
                      <span className="text-xs text-muted-foreground ml-1">
                        (buttons, links, primary actions)
                      </span>
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={customColors.interactive}
                        onChange={e => updateCustomColor('interactive', e.target.value)}
                        className="w-12 h-10 p-1 border-2"
                      />
                      <Input
                        type="text"
                        value={customColors.interactive}
                        onChange={e => updateCustomColor('interactive', e.target.value)}
                        placeholder="#2563eb"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">
                      Surface Color
                      <span className="text-xs text-muted-foreground ml-1">
                        (backgrounds, cards, panels)
                      </span>
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={customColors.surface}
                        onChange={e => updateCustomColor('surface', e.target.value)}
                        className="w-12 h-10 p-1 border-2"
                      />
                      <Input
                        type="text"
                        value={customColors.surface}
                        onChange={e => updateCustomColor('surface', e.target.value)}
                        placeholder="#f1f5f9"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">
                      Accent Color
                      <span className="text-xs text-muted-foreground ml-1">
                        (highlights, emphasis, calls-to-action)
                      </span>
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={customColors.accent}
                        onChange={e => updateCustomColor('accent', e.target.value)}
                        className="w-12 h-10 p-1 border-2"
                      />
                      <Input
                        type="text"
                        value={customColors.accent}
                        onChange={e => updateCustomColor('accent', e.target.value)}
                        placeholder="#10b981"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetToDefault}
                  className="w-full gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset to Professional
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
