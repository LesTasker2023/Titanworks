# 🎨 Theme System Documentation

## Overview

Clean, conflict-free theme system with single source of truth for all styling.

## Architecture

### Core Files

- **`src/app/globals.css`** - Main theme definitions, light/dark modes
- **`src/styles/design-tokens.css`** - Design tokens (typography, spacing, etc.)
- **`src/styles/component-system.css`** - Component base classes and variants

### Removed Conflicts

❌ Removed: `src/styles/dynamic-colors.css`
❌ Removed: `src/styles/design-system.css`
❌ Removed: `src/styles/themes/` directory

## Theme Variables

### Brand Colors

```css
--brand-primary: hsl(221 83% 53%) /* Main brand color */ --brand-primary-foreground: hsl(210 40% 98%);
```

### Light Mode Base

```css
--background: hsl(0 0% 100%) --foreground: hsl(224 71% 4%) --muted: hsl(220 14% 96%) --border: hsl(220 13% 91%);
```

### Dark Mode Base

```css
--background: hsl(224 71% 4%) --foreground: hsl(210 40% 98%) --muted: hsl(215 28% 17%) --border: hsl(217 33% 17%);
```

## Color Picker Integration

### How It Works

1. Color picker updates `--brand-primary` CSS variable
2. All brand-colored elements automatically update
3. WCAG AA contrast ratios maintained
4. Real-time preview across entire site

### Usage in Components

```jsx
// Button with brand color
<button className="bg-brand text-brand-foreground">
  Brand Button
</button>

// Manual brand color usage
<div style={{ color: 'hsl(var(--brand-primary))' }}>
  Custom brand text
</div>
```

## Key Features

### ✅ Single Source of Truth

- All themes defined in `globals.css`
- No conflicting CSS imports
- Clean dependency chain

### ✅ High Contrast

- WCAG AA compliant base colors
- Proper contrast ratios in both themes
- Accessible by default

### ✅ Real-time Customization

- Live brand color changes
- Instant preview
- Persistent across sessions

### ✅ Performance Optimized

- Minimal CSS payload
- No runtime theme switching overhead
- CSS custom properties for efficiency

## Development Guidelines

### Adding New Components

1. Use design tokens from `design-tokens.css`
2. Extend `.component-base` for consistency
3. Reference theme colors via CSS variables
4. Test in both light and dark modes

### Color Usage

```css
/* ✅ Correct - use theme variables */
background-color: hsl(var(--background));
color: hsl(var(--foreground));

/* ❌ Avoid - hardcoded colors */
background-color: #ffffff;
color: #000000;
```

### Brand Color Integration

```css
/* ✅ Use brand variables for customizable elements */
border-color: hsl(var(--brand-primary));

/* ✅ Use semantic colors for fixed elements */
border-color: hsl(var(--border));
```

## Build Performance

### Before Cleanup

- 18+ conflicting CSS files
- Complex import chains
- Duplicate color definitions
- Poor contrast ratios

### After Cleanup

- 3 core CSS files
- Clean dependency chain
- Single theme source
- WCAG AA compliant

**Build Time**: ~4.0s (optimized)
**Bundle Size**: Minimal CSS payload
**Theme Switching**: Instant via CSS variables

## Testing Checklist

- [ ] Light mode renders correctly
- [ ] Dark mode renders correctly
- [ ] Color picker updates brand colors
- [ ] High contrast maintained
- [ ] Build completes successfully
- [ ] No CSS conflicts in dev tools
- [ ] Accessible focus states work
- [ ] Mobile responsive design intact

## Future Enhancements

### Possible Additions

- Multiple brand color variants
- Seasonal theme presets
- Advanced contrast adjustment
- Color blind friendly modes
- Export/import color schemes

### Maintain Simplicity

- Keep single source of truth approach
- Avoid reintroducing CSS conflicts
- Preserve performance optimizations
- Maintain accessibility standards

---

_Last Updated: Theme system v2.0 - Clean architecture with real-time customization_
