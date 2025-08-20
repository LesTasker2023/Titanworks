'use client';

import { Alert, AlertDescription } from '@/components/ui/Alert/alert';
import { Badge } from '@/components/ui/Badge/badge';
import { Button } from '@/components/ui/Button/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card/card';
import { Input } from '@/components/ui/Input/input';
import { Label } from '@/components/ui/Label/Label';
import { Separator } from '@/components/ui/Separator/Separator';
import { Switch } from '@/components/ui/Switch/Switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs/tabs';
import {
  Download,
  Eye,
  Monitor,
  Moon,
  Paintbrush,
  Palette,
  RotateCcw,
  Save,
  Sun,
  Upload,
  Zap,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface ColorScheme {
  name: string;
  light: {
    background: string;
    foreground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    accent: string;
    accentForeground: string;
    muted: string;
    mutedForeground: string;
    card: string;
    cardForeground: string;
    border: string;
    destructive: string;
    destructiveForeground: string;
  };
  dark: {
    background: string;
    foreground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    accent: string;
    accentForeground: string;
    muted: string;
    mutedForeground: string;
    card: string;
    cardForeground: string;
    border: string;
    destructive: string;
    destructiveForeground: string;
  };
}

const defaultSchemes: ColorScheme[] = [
  {
    name: 'Default',
    light: {
      background: '0 0% 100%',
      foreground: '0 0% 3.9%',
      primary: '0 0% 9%',
      primaryForeground: '0 0% 98%',
      secondary: '0 0% 96.1%',
      secondaryForeground: '0 0% 9%',
      accent: '0 0% 96.1%',
      accentForeground: '0 0% 9%',
      muted: '0 0% 96.1%',
      mutedForeground: '0 0% 45.1%',
      card: '0 0% 100%',
      cardForeground: '0 0% 3.9%',
      border: '0 0% 89.8%',
      destructive: '0 84.2% 60.2%',
      destructiveForeground: '0 0% 98%',
    },
    dark: {
      background: '0 0% 3.9%',
      foreground: '0 0% 98%',
      primary: '0 0% 98%',
      primaryForeground: '0 0% 9%',
      secondary: '0 0% 14.9%',
      secondaryForeground: '0 0% 98%',
      accent: '0 0% 14.9%',
      accentForeground: '0 0% 98%',
      muted: '0 0% 14.9%',
      mutedForeground: '0 0% 63.9%',
      card: '0 0% 3.9%',
      cardForeground: '0 0% 98%',
      border: '0 0% 14.9%',
      destructive: '0 62.8% 30.6%',
      destructiveForeground: '0 0% 98%',
    },
  },
  {
    name: 'Blue',
    light: {
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      primary: '221.2 83.2% 53.3%',
      primaryForeground: '210 40% 98%',
      secondary: '210 40% 96%',
      secondaryForeground: '222.2 84% 4.9%',
      accent: '210 40% 96%',
      accentForeground: '222.2 84% 4.9%',
      muted: '210 40% 96%',
      mutedForeground: '215.4 16.3% 46.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      border: '214.3 31.8% 91.4%',
      destructive: '0 84.2% 60.2%',
      destructiveForeground: '210 40% 98%',
    },
    dark: {
      background: '222.2 84% 4.9%',
      foreground: '210 40% 98%',
      primary: '217.2 91.2% 59.8%',
      primaryForeground: '222.2 84% 4.9%',
      secondary: '217.2 32.6% 17.5%',
      secondaryForeground: '210 40% 98%',
      accent: '217.2 32.6% 17.5%',
      accentForeground: '210 40% 98%',
      muted: '217.2 32.6% 17.5%',
      mutedForeground: '215 20.2% 65.1%',
      card: '222.2 84% 4.9%',
      cardForeground: '210 40% 98%',
      border: '217.2 32.6% 17.5%',
      destructive: '0 62.8% 30.6%',
      destructiveForeground: '210 40% 98%',
    },
  },
  {
    name: 'Green',
    light: {
      background: '0 0% 100%',
      foreground: '240 10% 3.9%',
      primary: '142.1 76.2% 36.3%',
      primaryForeground: '355.7 100% 97.3%',
      secondary: '142.1 70% 95%',
      secondaryForeground: '240 10% 3.9%',
      accent: '142.1 70% 95%',
      accentForeground: '240 10% 3.9%',
      muted: '142.1 70% 95%',
      mutedForeground: '240 3.8% 46.1%',
      card: '0 0% 100%',
      cardForeground: '240 10% 3.9%',
      border: '142.1 70% 91%',
      destructive: '0 84.2% 60.2%',
      destructiveForeground: '355.7 100% 97.3%',
    },
    dark: {
      background: '240 10% 3.9%',
      foreground: '0 0% 98%',
      primary: '142.1 70.6% 45.3%',
      primaryForeground: '144.9 80.4% 10%',
      secondary: '240 3.7% 15.9%',
      secondaryForeground: '0 0% 98%',
      accent: '240 3.7% 15.9%',
      accentForeground: '0 0% 98%',
      muted: '240 3.7% 15.9%',
      mutedForeground: '240 5% 64.9%',
      card: '240 10% 3.9%',
      cardForeground: '0 0% 98%',
      border: '240 3.7% 15.9%',
      destructive: '0 62.8% 30.6%',
      destructiveForeground: '0 0% 98%',
    },
  },
  {
    name: 'Purple',
    light: {
      background: '0 0% 100%',
      foreground: '224 71.4% 4.1%',
      primary: '262.1 83.3% 57.8%',
      primaryForeground: '210 20% 98%',
      secondary: '270 20% 96%',
      secondaryForeground: '224 71.4% 4.1%',
      accent: '270 20% 96%',
      accentForeground: '224 71.4% 4.1%',
      muted: '270 20% 96%',
      mutedForeground: '215.4 16.3% 46.9%',
      card: '0 0% 100%',
      cardForeground: '224 71.4% 4.1%',
      border: '270 20% 91%',
      destructive: '0 84.2% 60.2%',
      destructiveForeground: '210 20% 98%',
    },
    dark: {
      background: '224 71.4% 4.1%',
      foreground: '210 20% 98%',
      primary: '263.4 70% 50.4%',
      primaryForeground: '210 20% 98%',
      secondary: '262.1 83.3% 14%',
      secondaryForeground: '210 20% 98%',
      accent: '262.1 83.3% 14%',
      accentForeground: '210 20% 98%',
      muted: '262.1 83.3% 14%',
      mutedForeground: '264.4 15.3% 56.8%',
      card: '224 71.4% 4.1%',
      cardForeground: '210 20% 98%',
      border: '262.1 83.3% 14%',
      destructive: '0 62.8% 30.6%',
      destructiveForeground: '210 20% 98%',
    },
  },
];

export function AdvancedThemePicker() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState<ColorScheme>(defaultSchemes[0]);
  const [customScheme, setCustomScheme] = useState<ColorScheme>(defaultSchemes[0]);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const applyColorScheme = (scheme: ColorScheme) => {
    const root = document.documentElement;
    const colors = theme === 'dark' ? scheme.dark : scheme.light;

    Object.entries(colors).forEach(([key, value]) => {
      const cssVarName = key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
      root.style.setProperty(`--${cssVarName}`, value);
    });
  };

  const resetToDefaults = () => {
    const root = document.documentElement;
    // Remove custom properties to restore defaults
    const defaultColors = theme === 'dark' ? defaultSchemes[0].dark : defaultSchemes[0].light;
    Object.keys(defaultColors).forEach(key => {
      const cssVarName = key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
      root.style.removeProperty(`--${cssVarName}`);
    });
    setSelectedScheme(defaultSchemes[0]);
    setCustomScheme(defaultSchemes[0]);
  };

  const exportTheme = () => {
    const themeData = {
      name: selectedScheme.name,
      scheme: selectedScheme,
      timestamp: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(themeData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `theme-${selectedScheme.name.toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const updateCustomColor = (mode: 'light' | 'dark', property: string, value: string) => {
    setCustomScheme(prev => ({
      ...prev,
      [mode]: {
        ...prev[mode],
        [property]: value,
      },
    }));
  };

  if (!mounted) {
    return null;
  }

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Palette className="h-5 w-5" />
          <span>Advanced Theme Customizer</span>
          <Badge variant="secondary">Pro</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Customize all theme colors for both light and dark modes
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="quick" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="quick">Quick Themes</TabsTrigger>
            <TabsTrigger value="custom">Custom Colors</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="quick" className="space-y-6">
            {/* Theme Mode Selection */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Theme Mode</Label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { mode: 'light', icon: Sun, label: 'Light' },
                  { mode: 'dark', icon: Moon, label: 'Dark' },
                  { mode: 'system', icon: Monitor, label: 'System' },
                ].map(({ mode, icon: Icon, label }) => (
                  <Button
                    key={mode}
                    variant={theme === mode ? 'default' : 'outline'}
                    onClick={() => setTheme(mode)}
                    className="flex items-center space-x-2 h-12"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Preset Color Schemes */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Color Schemes</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {defaultSchemes.map(scheme => (
                  <Card
                    key={scheme.name}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedScheme.name === scheme.name ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => {
                      setSelectedScheme(scheme);
                      applyColorScheme(scheme);
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="font-medium text-sm">{scheme.name}</div>
                        <div className="flex space-x-1">
                          {/* Color preview dots */}
                          <div
                            className="w-4 h-4 rounded-full border"
                            style={{ backgroundColor: `hsl(${scheme.light.primary})` }}
                          />
                          <div
                            className="w-4 h-4 rounded-full border"
                            style={{ backgroundColor: `hsl(${scheme.light.secondary})` }}
                          />
                          <div
                            className="w-4 h-4 rounded-full border"
                            style={{ backgroundColor: `hsl(${scheme.light.accent})` }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Preview Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4" />
                <Label>Live Preview</Label>
              </div>
              <Switch checked={previewMode} onCheckedChange={setPreviewMode} />
            </div>
          </TabsContent>

          <TabsContent value="custom" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Light Mode Colors */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <Sun className="h-4 w-4" />
                    <span>Light Mode Colors</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(customScheme.light).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <Label className="text-sm capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </Label>
                      <div className="flex space-x-2">
                        <div
                          className="w-8 h-8 rounded border"
                          style={{ backgroundColor: `hsl(${value})` }}
                        />
                        <Input
                          value={value}
                          onChange={e => updateCustomColor('light', key, e.target.value)}
                          placeholder="0 0% 100%"
                          className="font-mono text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Dark Mode Colors */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <Moon className="h-4 w-4" />
                    <span>Dark Mode Colors</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(customScheme.dark).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <Label className="text-sm capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </Label>
                      <div className="flex space-x-2">
                        <div
                          className="w-8 h-8 rounded border"
                          style={{ backgroundColor: `hsl(${value})` }}
                        />
                        <Input
                          value={value}
                          onChange={e => updateCustomColor('dark', key, e.target.value)}
                          placeholder="0 0% 3.9%"
                          className="font-mono text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="flex space-x-2">
              <Button onClick={() => applyColorScheme(customScheme)}>
                <Paintbrush className="h-4 w-4 mr-2" />
                Apply Custom Colors
              </Button>
              <Button variant="outline" onClick={() => setCustomScheme(selectedScheme)}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset to Selected
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <Alert>
              <Zap className="h-4 w-4" />
              <AlertDescription>
                Advanced settings for power users. Changes apply immediately.
              </AlertDescription>
            </Alert>

            {/* Import/Export */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <h4 className="font-semibold mb-3">Export Theme</h4>
                <Button onClick={exportTheme} className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Theme JSON
                </Button>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold mb-3">Import Theme</h4>
                <Button variant="outline" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Theme File
                </Button>
              </Card>
            </div>

            {/* System Integration */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">System Integration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-save Changes</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically save theme changes to localStorage
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Sync Across Devices</Label>
                    <p className="text-sm text-muted-foreground">
                      Sync theme settings across your devices
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>High Contrast Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Increase contrast for better accessibility
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            {/* Reset Options */}
            <div className="flex space-x-2">
              <Button variant="outline" onClick={resetToDefaults}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset to Defaults
              </Button>
              <Button variant="outline">
                <Save className="h-4 w-4 mr-2" />
                Save as Preset
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
