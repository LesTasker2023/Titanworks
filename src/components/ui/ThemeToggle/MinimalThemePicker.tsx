'use client';

import { Badge } from '@/components/ui/Badge/badge';
import { Button } from '@/components/ui/Button/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card/card';
import { Input } from '@/components/ui/Input/input';
import { Label } from '@/components/ui/Label/Label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs/tabs';
import { Check, Palette, RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';

interface MinimalColorScheme {
  name: string;
  description: string;
  colors: {
    interactive: string; // Buttons, links, primary actions
    surface: string; // Card backgrounds, secondary surfaces
    accent: string; // Highlights, badges, success states
  };
}

const PRESET_SCHEMES: MinimalColorScheme[] = [
  {
    name: 'Professional',
    description: 'Clean business aesthetic',
    colors: {
      interactive: '#2563eb', // Blue-600
      surface: '#f1f5f9', // Slate-100
      accent: '#10b981', // Emerald-500
    },
  },
  {
    name: 'GitHub Dark',
    description: 'Sophisticated developer aesthetic',
    colors: {
      interactive: '#58a6ff', // GitHub blue
      surface: '#21262d', // GitHub dark surface
      accent: '#7ee787', // GitHub green
    },
  },
  {
    name: 'Stripe',
    description: 'Elegant fintech colors',
    colors: {
      interactive: '#635bff', // Stripe purple
      surface: '#f7f9fc', // Stripe light gray
      accent: '#00d924', // Stripe green
    },
  },
  {
    name: 'Vercel',
    description: 'Monochromatic elegance',
    colors: {
      interactive: '#000000', // Pure black
      surface: '#fafafa', // Near white
      accent: '#ff0080', // Vercel pink
    },
  },
  {
    name: 'Tailwind',
    description: 'Utility-first design colors',
    colors: {
      interactive: '#0f172a', // Slate-900
      surface: '#f8fafc', // Slate-50
      accent: '#06b6d4', // Cyan-500
    },
  },
  {
    name: 'Shopify',
    description: 'E-commerce focused palette',
    colors: {
      interactive: '#00a652', // Shopify green
      surface: '#f8f8f8', // Light gray
      accent: '#5c6ac4', // Shopify purple
    },
  },
  {
    name: 'Discord',
    description: 'Gaming and community focused',
    colors: {
      interactive: '#5865f2', // Discord blurple
      surface: '#36393f', // Discord dark
      accent: '#ed4245', // Discord red
    },
  },
  {
    name: 'Linear',
    description: 'Minimal productivity aesthetic',
    colors: {
      interactive: '#5e6ad2', // Linear purple
      surface: '#fcfcfc', // Almost white
      accent: '#f26522', // Linear orange
    },
  },
  {
    name: 'Notion',
    description: 'Warm and approachable',
    colors: {
      interactive: '#2383e2', // Notion blue
      surface: '#f7f6f3', // Notion cream
      accent: '#ff5757', // Notion red
    },
  },
  {
    name: 'Retro Wave',
    description: 'Synthwave inspired electric colors',
    colors: {
      interactive: '#ff0080', // Hot pink
      surface: '#0f0f23', // Dark purple
      accent: '#00ffff', // Cyan
    },
  },
];

export function MinimalThemePicker() {
  const [mounted, setMounted] = useState(false);
  const [currentScheme, setCurrentScheme] = useState<MinimalColorScheme>(PRESET_SCHEMES[0]);
  const [customColors, setCustomColors] = useState({
    interactive: '#2563eb',
    surface: '#f1f5f9',
    accent: '#10b981',
  });

  useEffect(() => {
    const loadColors = (colors: typeof customColors) => {
      const root = document.documentElement;

      // Apply semantic color variables
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
    };

    setMounted(true);
    // Load saved colors from localStorage
    const saved = localStorage.getItem('minimal-theme-colors');
    if (saved) {
      try {
        const colors = JSON.parse(saved);
        setCustomColors(colors);
        loadColors(colors);
      } catch {
        console.warn('Failed to load saved theme colors');
      }
    }
  }, []);

  const applyColors = (colors: typeof customColors) => {
    const root = document.documentElement;

    // Apply semantic color variables
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
  };

  const getContrastColor = (bgColor: string): string => {
    // Convert hex to RGB
    const hex = bgColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return black or white based on luminance
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

  const applyPreset = (scheme: MinimalColorScheme) => {
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
  };

  const resetToDefault = () => {
    const defaultColors = PRESET_SCHEMES[0].colors;
    setCurrentScheme(PRESET_SCHEMES[0]);
    setCustomColors(defaultColors);
    applyColors(defaultColors);

    // Clear localStorage
    localStorage.removeItem('minimal-theme-colors');
  };

  if (!mounted) {
    return null;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Palette className="h-5 w-5" />
          Minimal Theme Picker
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Research-backed 3-color system for optimal usability
        </p>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="presets" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="presets">Quick Themes</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
            <TabsTrigger value="info">Why Less?</TabsTrigger>
          </TabsList>

          <TabsContent value="presets" className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {PRESET_SCHEMES.map(scheme => (
                <Card
                  key={scheme.name}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    currentScheme.name === scheme.name ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => applyPreset(scheme)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{scheme.name}</h4>
                      {currentScheme.name === scheme.name && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground mb-3">{scheme.description}</p>

                    <div className="flex gap-2">
                      <div
                        className="h-6 w-6 rounded border-2 border-white shadow-sm"
                        style={{ backgroundColor: scheme.colors.interactive }}
                        title="Interactive"
                      />
                      <div
                        className="h-6 w-6 rounded border-2 border-white shadow-sm"
                        style={{ backgroundColor: scheme.colors.surface }}
                        title="Surface"
                      />
                      <div
                        className="h-6 w-6 rounded border-2 border-white shadow-sm"
                        style={{ backgroundColor: scheme.colors.accent }}
                        title="Accent"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="pt-4 border-t">
              <div className="flex gap-2 mb-4">
                <Badge
                  style={{
                    backgroundColor: customColors.interactive,
                    color: getContrastColor(customColors.interactive),
                  }}
                >
                  Interactive (Buttons, Links)
                </Badge>
                <Badge
                  style={{
                    backgroundColor: customColors.surface,
                    color: getContrastColor(customColors.surface),
                  }}
                >
                  Surface (Cards, Backgrounds)
                </Badge>
                <Badge
                  style={{
                    backgroundColor: customColors.accent,
                    color: getContrastColor(customColors.accent),
                  }}
                >
                  Accent (Highlights, Success)
                </Badge>
              </div>

              <Button variant="outline" size="sm" onClick={resetToDefault} className="w-full">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset to Professional
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="custom" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="interactive" className="text-sm font-medium">
                  Interactive Color (Buttons, Links, Primary Actions)
                </Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="interactive"
                    type="color"
                    value={customColors.interactive}
                    onChange={e => updateCustomColor('interactive', e.target.value)}
                    className="w-16 h-10 p-1 border-2"
                  />
                  <Input
                    type="text"
                    value={customColors.interactive}
                    onChange={e => updateCustomColor('interactive', e.target.value)}
                    className="flex-1"
                    placeholder="#2563eb"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="surface" className="text-sm font-medium">
                  Surface Color (Cards, Secondary Backgrounds)
                </Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="surface"
                    type="color"
                    value={customColors.surface}
                    onChange={e => updateCustomColor('surface', e.target.value)}
                    className="w-16 h-10 p-1 border-2"
                  />
                  <Input
                    type="text"
                    value={customColors.surface}
                    onChange={e => updateCustomColor('surface', e.target.value)}
                    className="flex-1"
                    placeholder="#f1f5f9"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="accent" className="text-sm font-medium">
                  Accent Color (Highlights, Success States)
                </Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="accent"
                    type="color"
                    value={customColors.accent}
                    onChange={e => updateCustomColor('accent', e.target.value)}
                    className="w-16 h-10 p-1 border-2"
                  />
                  <Input
                    type="text"
                    value={customColors.accent}
                    onChange={e => updateCustomColor('accent', e.target.value)}
                    className="flex-1"
                    placeholder="#10b981"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Live Preview</h4>
              <div className="space-y-2">
                <Button
                  style={{
                    backgroundColor: customColors.interactive,
                    color: getContrastColor(customColors.interactive),
                  }}
                  className="w-full"
                >
                  Interactive Button
                </Button>
                <div
                  className="p-4 rounded-lg border"
                  style={{
                    backgroundColor: customColors.surface,
                    color: getContrastColor(customColors.surface),
                  }}
                >
                  Surface Card Background
                </div>
                <Badge
                  style={{
                    backgroundColor: customColors.accent,
                    color: getContrastColor(customColors.accent),
                  }}
                >
                  Accent Badge
                </Badge>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="info" className="space-y-4">
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">🧠 Why Only 3 Colors?</h4>
                <p className="text-muted-foreground">
                  Research from Google Material Design, Adobe Spectrum, and cognitive psychology
                  shows that <strong>3-5 colors is optimal</strong> for user interfaces.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">🎯 Semantic Over Arbitrary</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>
                    • <strong>Interactive:</strong> What users can click/tap
                  </li>
                  <li>
                    • <strong>Surface:</strong> What content sits on
                  </li>
                  <li>
                    • <strong>Accent:</strong> What draws attention
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">♿ Accessibility Benefits</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Easier to maintain WCAG contrast ratios</li>
                  <li>• Reduced cognitive load for all users</li>
                  <li>• Better for colorblind accessibility</li>
                  <li>• Consistent experience across devices</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">🏢 Industry Standards</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>
                    • <strong>Google:</strong> Primary + Secondary + Error (3 colors)
                  </li>
                  <li>
                    • <strong>Apple:</strong> System colors with semantic meaning
                  </li>
                  <li>
                    • <strong>Microsoft:</strong> Fluent Design uses accent + neutrals
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t">
                <p className="text-xs text-muted-foreground italic">
                  &ldquo;Perfection is achieved not when there is nothing more to add, but when
                  there is nothing left to take away.&rdquo; - Antoine de Saint-Exupéry
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
