'use client';

import { Palette } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '../Button';
import './ColorPicker.scss';

interface ColorPickerProps {
  defaultColor?: string;
  onColorChange?: (color: string) => void;
  className?: string;
  disabled?: boolean;
  'aria-label'?: string;
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
  disabled = false,
  'aria-label': ariaLabel = 'Color picker',
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
      <Button variant="outline" size="sm" className="colorPicker__trigger" disabled>
        <div className="colorPicker__colorSwatch" style={{ backgroundColor: defaultColor }} />
        <Palette className="colorPicker__icon" />
        <span className="colorPicker__label">Brand Color</span>
      </Button>
    );
  }

  return (
    <div className={`color-picker ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="colorPicker__trigger"
        aria-label={ariaLabel}
        disabled={disabled}
      >
        <div className="colorPicker__colorSwatch" style={{ backgroundColor: selectedColor }} />
        <Palette className="colorPicker__icon" />
        <span className="colorPicker__label">Brand Color</span>
      </Button>

      {isOpen && (
        <div className="colorPicker__dropdown">
          <div className="colorPicker__content">
            <div className="colorPicker__header">
              <h3>Choose Brand Color</h3>
              <p>See your brand colors applied instantly across the entire site.</p>
            </div>

            {/* Preset Colors */}
            <div>
              <label className="colorPicker__section-label">Preset Colors</label>
              <div className="colorPicker__presetGrid">
                {PRESET_COLORS.map(color => (
                  <button
                    key={color}
                    onClick={() => handleColorSelect(color)}
                    className={`colorPicker__presetColor ${
                      selectedColor === color ? 'colorPicker__presetColor--selected' : ''
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Custom Color */}
            <div>
              <label className="colorPicker__section-label">Custom Color</label>
              <div className="colorPicker__customInputs">
                <input
                  type="color"
                  value={customColor}
                  onChange={handleCustomColorChange}
                  className="colorPicker__colorInput"
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
                  className="colorPicker__textInput"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="colorPicker__actions">
              <Button
                size="sm"
                variant="outline"
                onClick={resetToDefault}
                className="colorPicker__action-button"
              >
                Reset
              </Button>
              <Button
                size="sm"
                onClick={() => setIsOpen(false)}
                className="colorPicker__action-button"
              >
                Apply
              </Button>
            </div>

            <p className="colorPicker__hint">
              💡 Colors are automatically adjusted for proper contrast across light and dark themes
            </p>

            {/* Contrast Preview */}
            <div className="colorPicker__preview">
              <div className="colorPicker__preview-title">Contrast Preview:</div>
              <div className="colorPicker__preview-grid">
                <div
                  className="colorPicker__preview-item"
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
                  className="colorPicker__preview-item colorPicker__preview-item--outline"
                  style={{
                    borderColor: selectedColor,
                    color: selectedColor,
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
