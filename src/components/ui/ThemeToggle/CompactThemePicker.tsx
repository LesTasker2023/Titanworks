'use client';

import { Button } from '@/components/ui/Button/button';
import { Card, CardContent } from '@/components/ui/Card/card';
import { Input } from '@/components/ui/Input/input';
import { Label } from '@/components/ui/Label/Label';
import { Check, Palette, RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CompactColorScheme {
  name: string;
  colors: {
    interactive: string;
    surface: string;
    accent: string;
  };
}

const COMPACT_PRESETS: CompactColorScheme[] = [
  {
    name: 'Professional',
    colors: {
      interactive: '#2563eb',
      surface: '#f1f5f9',
      accent: '#10b981',
    },
  },
  {
    name: 'Warm',
    colors: {
      interactive: '#dc2626',
      surface: '#fef3c7',
      accent: '#f59e0b',
    },
  },
  {
    name: 'Modern',
    colors: {
      interactive: '#7c3aed',
      surface: '#f3f4f6',
      accent: '#06b6d4',
    },
  },
  {
    name: 'Nature',
    colors: {
      interactive: '#059669',
      surface: '#f0fdf4',
      accent: '#84cc16',
    },
  },
];

export function CompactThemePicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentScheme, setCurrentScheme] = useState<CompactColorScheme>(COMPACT_PRESETS[0]);
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

  const applyPreset = (scheme: CompactColorScheme) => {
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
    const defaultColors = COMPACT_PRESETS[0].colors;
    setCurrentScheme(COMPACT_PRESETS[0]);
    setCustomColors(defaultColors);
    applyColors(defaultColors);

    // Clear localStorage
    localStorage.removeItem('minimal-theme-colors');
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" disabled>
        <Palette className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
        title="Customize theme colors"
      >
        <Palette className="h-4 w-4" />
        <div className="absolute -bottom-1 -right-1 flex gap-0.5">
          <div
            className="w-1.5 h-1.5 rounded-full border border-white"
            style={{ backgroundColor: customColors.interactive }}
          />
          <div
            className="w-1.5 h-1.5 rounded-full border border-white"
            style={{ backgroundColor: customColors.accent }}
          />
        </div>
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* Dropdown */}
          <Card className="absolute top-full right-0 mt-2 w-80 z-50 shadow-lg">
            <CardContent className="p-4 space-y-4">
              <div>
                <h3 className="font-medium mb-1">Theme Colors</h3>
                <p className="text-xs text-muted-foreground">Research-backed 3-color system</p>
              </div>

              {/* Quick Presets */}
              <div>
                <Label className="text-xs font-medium mb-2 block">Quick Themes</Label>
                <div className="grid grid-cols-2 gap-2">
                  {COMPACT_PRESETS.map(scheme => (
                    <Button
                      key={scheme.name}
                      variant={currentScheme.name === scheme.name ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => applyPreset(scheme)}
                      className="flex items-center gap-2 h-8"
                    >
                      <div className="flex gap-0.5">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: scheme.colors.interactive }}
                        />
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: scheme.colors.accent }}
                        />
                      </div>
                      <span className="text-xs">{scheme.name}</span>
                      {currentScheme.name === scheme.name && <Check className="h-3 w-3" />}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Custom Colors */}
              <div className="space-y-3">
                <Label className="text-xs font-medium">Custom Colors</Label>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label className="text-xs w-16">Interactive</Label>
                    <Input
                      type="color"
                      value={customColors.interactive}
                      onChange={e => updateCustomColor('interactive', e.target.value)}
                      className="w-8 h-6 p-0 border-0"
                    />
                    <Input
                      type="text"
                      value={customColors.interactive}
                      onChange={e => updateCustomColor('interactive', e.target.value)}
                      className="flex-1 h-6 text-xs"
                      placeholder="#2563eb"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Label className="text-xs w-16">Accent</Label>
                    <Input
                      type="color"
                      value={customColors.accent}
                      onChange={e => updateCustomColor('accent', e.target.value)}
                      className="w-8 h-6 p-0 border-0"
                    />
                    <Input
                      type="text"
                      value={customColors.accent}
                      onChange={e => updateCustomColor('accent', e.target.value)}
                      className="flex-1 h-6 text-xs"
                      placeholder="#10b981"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetToDefault}
                  className="flex-1 h-7 text-xs"
                >
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Reset
                </Button>
                <Button
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 h-7 text-xs"
                  style={{
                    backgroundColor: customColors.interactive,
                    color: getContrastColor(customColors.interactive),
                  }}
                >
                  Done
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
