'use client';

import { Palette } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '../Button';

interface ColorPickerProps {
  defaultColor?: string;
  onColorChange?: (color: string) => void;
  className?: string;
}

const PRESET_COLORS = [
  '#18181b', // Default Zinc - excellent contrast
  '#dc2626', // Red - good contrast
  '#ea580c', // Orange - good contrast
  '#ca8a04', // Yellow - moderate contrast
  '#16a34a', // Green - good contrast
  '#0891b2', // Cyan - good contrast
  '#2563eb', // Blue - excellent contrast
  '#7c3aed', // Violet - good contrast
  '#c026d3', // Fuchsia - good contrast
  '#e11d48', // Rose - good contrast
  '#1f2937', // Dark Gray - excellent contrast
  '#4f46e5', // Indigo - excellent contrast
];

function ColorPicker({
  defaultColor = '#18181b',
  onColorChange,
  className = '',
}: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const [customColor, setCustomColor] = useState(defaultColor);
  const [mounted, setMounted] = useState(false);

  // Function to update dark mode CSS variables dynamically
  const updateDarkModeColors = (color: string, foregroundColor: string) => {
    // Check if a dynamic dark mode style tag already exists
    let styleTag = document.getElementById('dynamic-dark-colors');

    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'dynamic-dark-colors';
      document.head.appendChild(styleTag);
    }

    // Create CSS rule for dark mode brand colors
    styleTag.textContent = `
      .dark {
        --brand-primary: ${color} !important;
        --brand-primary-foreground: ${foregroundColor} !important;
      }
    `;
  };

  // Function to apply color to document and localStorage
  const applyColorToDocument = useCallback((color: string) => {
    // Update CSS variables for light mode
    document.documentElement.style.setProperty('--brand-primary', color);

    // Calculate proper contrast for foreground
    const rgb = hexToRgb(color);
    if (rgb) {
      const luminance = getLuminance(rgb);
      const foregroundColor = luminance > 0.5 ? '#000000' : '#ffffff';
      document.documentElement.style.setProperty('--brand-primary-foreground', foregroundColor);

      // Update dark mode versions
      updateDarkModeColors(color, foregroundColor);
    }

    // Save to localStorage for persistence
    localStorage.setItem('brand-color', color);
  }, []);

  // Initialize colors from localStorage on mount
  useEffect(() => {
    setMounted(true);
    // Load saved color from localStorage or use default
    const savedColor = localStorage.getItem('brand-color') || defaultColor;
    setSelectedColor(savedColor);
    setCustomColor(savedColor);

    // Apply the saved/default color to both light and dark modes
    applyColorToDocument(savedColor);
  }, [defaultColor, applyColorToDocument]); // Include dependencies

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setCustomColor(color);
    onColorChange?.(color);

    // Apply color changes to document and save to localStorage
    applyColorToDocument(color);
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setCustomColor(color);
    handleColorSelect(color);
  };

  const resetToDefault = () => {
    handleColorSelect(defaultColor);
  };

  // Render neutral state until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <Button variant="outline" size="sm" className="flex items-center gap-2" disabled>
        <div
          className="w-4 h-4 rounded-full border border-border"
          style={{ backgroundColor: defaultColor }}
        />
        <Palette className="w-4 h-4" />
        <span className="hidden sm:inline">Brand Color</span>
      </Button>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <div
          className="w-4 h-4 rounded-full border border-border"
          style={{ backgroundColor: selectedColor }}
        />
        <Palette className="w-4 h-4" />
        <span className="hidden sm:inline">Brand Color</span>
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 p-4 bg-background border border-border rounded-lg shadow-lg z-50 min-w-[280px]">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Choose Brand Color</h3>
              <p className="text-xs text-muted-foreground mb-3">
                See your brand colors applied instantly across the entire site.
              </p>
            </div>

            {/* Preset Colors */}
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">
                Preset Colors
              </label>
              <div className="grid grid-cols-6 gap-2">
                {PRESET_COLORS.map(color => (
                  <button
                    key={color}
                    onClick={() => handleColorSelect(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                      selectedColor === color
                        ? 'border-foreground ring-2 ring-offset-2 ring-offset-background ring-foreground/20'
                        : 'border-border hover:border-foreground/50'
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Custom Color */}
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">
                Custom Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={customColor}
                  onChange={handleCustomColorChange}
                  className="w-12 h-8 rounded border border-border cursor-pointer"
                />
                <input
                  type="text"
                  value={customColor}
                  onChange={e => {
                    setCustomColor(e.target.value);
                    if (isValidHexColor(e.target.value)) {
                      handleColorSelect(e.target.value);
                    }
                  }}
                  placeholder="#000000"
                  className="flex-1 px-2 py-1 text-sm border border-border rounded bg-background"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2 border-t border-border">
              <Button size="sm" variant="outline" onClick={resetToDefault} className="flex-1">
                Reset
              </Button>
              <Button size="sm" onClick={() => setIsOpen(false)} className="flex-1">
                Apply
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              💡 Colors are automatically adjusted for proper contrast across light and dark themes
            </p>

            {/* Contrast Preview */}
            <div className="border border-border rounded p-2">
              <div className="text-xs font-medium mb-2">Contrast Preview:</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div
                  className="p-2 rounded text-center"
                  style={{
                    backgroundColor: selectedColor,
                    color:
                      hexToRgb(selectedColor) && getLuminance(hexToRgb(selectedColor)!) > 0.5
                        ? '#000000'
                        : '#ffffff',
                  }}
                >
                  Primary Button
                </div>
                <div
                  className="p-2 rounded text-center border"
                  style={{
                    borderColor: selectedColor,
                    color: selectedColor,
                    backgroundColor: 'transparent',
                  }}
                >
                  Outline Button
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper functions
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function getLuminance(rgb: { r: number; g: number; b: number }) {
  // Convert RGB to relative luminance using WCAG formula
  const rsRGB = rgb.r / 255;
  const gsRGB = rgb.g / 255;
  const bsRGB = rgb.b / 255;

  const r = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const g = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const b = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function isValidHexColor(hex: string) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
}

export { ColorPicker };
export type { ColorPickerProps };
