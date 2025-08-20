'use client';

import { Eye, Monitor, Moon, Paintbrush, Palette, Sun, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ColorPicker } from '.';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card } from '../Card';

export default function ColorPickerDemo() {
  const [primaryColor, setPrimaryColor] = useState('#3B82F6');
  const [brandColors, setBrandColors] = useState({
    primary: '#3B82F6',
    secondary: '#EF4444',
    accent: '#10B981',
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
  });
  const [previewMode, setPreviewMode] = useState<'light' | 'dark'>('light');

  // Update brand colors when individual colors change
  useEffect(() => {
    setBrandColors(prev => ({ ...prev, primary: primaryColor }));
  }, [primaryColor]);

  const updateBrandColor = (key: keyof typeof brandColors, color: string) => {
    setBrandColors(prev => ({ ...prev, [key]: color }));
  };

  const brandPalettes = [
    {
      name: 'Tech Startup',
      colors: { primary: '#6366F1', secondary: '#EC4899', accent: '#14B8A6' },
    },
    {
      name: 'Corporate Blue',
      colors: { primary: '#1E40AF', secondary: '#059669', accent: '#DC2626' },
    },
    {
      name: 'Creative Agency',
      colors: { primary: '#7C3AED', secondary: '#F59E0B', accent: '#EF4444' },
    },
    { name: 'E-commerce', colors: { primary: '#EA580C', secondary: '#8B5CF6', accent: '#06B6D4' } },
  ];

  const applyPalette = (palette: (typeof brandPalettes)[0]) => {
    setPrimaryColor(palette.colors.primary);
    setBrandColors(prev => ({ ...prev, ...palette.colors }));
  };

  return (
    <div className="space-y-6 p-6 max-w-6xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">ColorPicker Component</h1>
        <p className="text-muted-foreground">
          Enterprise brand color management with real-time theming and accessibility
        </p>
      </div>

      {/* Basic Usage */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Basic Usage</h3>
          <p className="text-sm text-muted-foreground">
            Simple color picker with preset and custom color support
          </p>

          <div className="flex items-center gap-4">
            <ColorPicker defaultColor={primaryColor} onColorChange={setPrimaryColor} />
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg border-2 border-border"
                style={{ backgroundColor: primaryColor }}
              />
              <span className="text-sm font-mono">{primaryColor}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Brand Palette Builder */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold">Brand Palette Builder</h3>
            <p className="text-sm text-muted-foreground">
              Create and manage your complete brand color system
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Color Controls */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Paintbrush className="h-4 w-4" />
                Color Controls
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Primary</label>
                  <div className="flex items-center gap-2">
                    <ColorPicker
                      defaultColor={brandColors.primary}
                      onColorChange={color => updateBrandColor('primary', color)}
                    />
                    <div
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: brandColors.primary }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Secondary</label>
                  <div className="flex items-center gap-2">
                    <ColorPicker
                      defaultColor={brandColors.secondary}
                      onColorChange={color => updateBrandColor('secondary', color)}
                    />
                    <div
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: brandColors.secondary }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Success</label>
                  <div className="flex items-center gap-2">
                    <ColorPicker
                      defaultColor={brandColors.success}
                      onColorChange={color => updateBrandColor('success', color)}
                    />
                    <div
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: brandColors.success }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Warning</label>
                  <div className="flex items-center gap-2">
                    <ColorPicker
                      defaultColor={brandColors.warning}
                      onColorChange={color => updateBrandColor('warning', color)}
                    />
                    <div
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: brandColors.warning }}
                    />
                  </div>
                </div>
              </div>

              {/* Preset Palettes */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Preset Palettes</label>
                <div className="grid grid-cols-2 gap-2">
                  {brandPalettes.map(palette => (
                    <Button
                      key={palette.name}
                      variant="outline"
                      size="sm"
                      onClick={() => applyPalette(palette)}
                      className="flex items-center gap-2 justify-start"
                    >
                      <div className="flex gap-1">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: palette.colors.primary }}
                        />
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: palette.colors.secondary }}
                        />
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: palette.colors.accent }}
                        />
                      </div>
                      <span className="text-xs">{palette.name}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Preview */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Live Preview
                </h4>
                <div className="flex items-center gap-1">
                  <Button
                    variant={previewMode === 'light' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPreviewMode('light')}
                    className="p-2"
                  >
                    <Sun className="h-3 w-3" />
                  </Button>
                  <Button
                    variant={previewMode === 'dark' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPreviewMode('dark')}
                    className="p-2"
                  >
                    <Moon className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div
                className={`border rounded-lg p-4 space-y-4 ${previewMode === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white'}`}
              >
                <div className="space-y-2">
                  <h5
                    className={`font-medium ${previewMode === 'dark' ? 'text-white' : 'text-black'}`}
                  >
                    Component Preview
                  </h5>
                  <div className="flex gap-2">
                    <Button
                      style={{ backgroundColor: brandColors.primary, color: 'white' }}
                      size="sm"
                    >
                      Primary Action
                    </Button>
                    <Button
                      variant="outline"
                      style={{ borderColor: brandColors.secondary, color: brandColors.secondary }}
                      size="sm"
                    >
                      Secondary
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Badge style={{ backgroundColor: brandColors.success, color: 'white' }}>
                      Success
                    </Badge>
                    <Badge style={{ backgroundColor: brandColors.warning, color: 'white' }}>
                      Warning
                    </Badge>
                    <Badge style={{ backgroundColor: brandColors.danger, color: 'white' }}>
                      Error
                    </Badge>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: brandColors.primary }}
                    />
                    <span
                      className={`text-sm ${previewMode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
                    >
                      Link Color
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ backgroundColor: brandColors.primary, width: '65%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Advanced Features */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold">Advanced Features</h3>
            <p className="text-sm text-muted-foreground">
              Enterprise-grade color management with accessibility and persistence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                <h4 className="font-medium">Real-time Theming</h4>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Instant visual feedback across entire application</p>
                <p>• CSS custom properties integration</p>
                <p>• Dark/light mode automatic adjustment</p>
                <p>• Component-level color inheritance</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Monitor className="h-5 w-5 text-blue-500" />
                <h4 className="font-medium">Accessibility</h4>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• WCAG contrast ratio calculations</p>
                <p>• Automatic foreground color selection</p>
                <p>• Color blind friendly palette suggestions</p>
                <p>• Screen reader compatible labels</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-purple-500" />
                <h4 className="font-medium">Brand Management</h4>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Persistent color storage</p>
                <p>• Brand palette presets</p>
                <p>• Export to design systems</p>
                <p>• Multi-brand support</p>
              </div>
            </div>
          </div>

          {/* Color Palette Display */}
          <div className="space-y-4">
            <h4 className="font-medium">Current Brand Palette</h4>
            <div className="grid grid-cols-6 gap-4">
              {Object.entries(brandColors).map(([name, color]) => (
                <div key={name} className="text-center space-y-2">
                  <div
                    className="w-full h-16 rounded-lg border-2 border-border"
                    style={{ backgroundColor: color }}
                  />
                  <div className="space-y-1">
                    <p className="text-xs font-medium capitalize">{name}</p>
                    <p className="text-xs font-mono text-muted-foreground">{color}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Real-World Use Cases */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Enterprise Use Cases</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium">Multi-tenant SaaS</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Per-tenant brand customization</p>
                <p>• White-label application theming</p>
                <p>• Dynamic brand asset loading</p>
                <p>• Brand compliance enforcement</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Design Systems</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Color token generation</p>
                <p>• Design-to-code synchronization</p>
                <p>• Semantic color naming</p>
                <p>• Cross-platform consistency</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">User Personalization</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• User preference storage</p>
                <p>• Accessibility customization</p>
                <p>• Theme marketplace integration</p>
                <p>• Corporate brand guidelines</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
