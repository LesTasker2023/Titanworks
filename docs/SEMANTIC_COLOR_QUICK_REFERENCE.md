# 🚀 Semantic Color System - Quick Reference

## 🎯 The 3-Color Rule

Only customize these 3 colors for maximum impact:

1. **Interactive** - Buttons, links, primary actions
2. **Surface** - Cards, panels, secondary backgrounds
3. **Accent** - Success states, highlights, badges

## 🛠️ Developer Cheat Sheet

### Component Development

```css
/* ✅ Use semantic tokens */
.my-button {
  background-color: hsl(var(--surface-interactive));
  color: hsl(var(--content-inverse));
  border: 1px solid hsl(var(--border-interactive));
}

.my-card {
  background-color: hsl(var(--surface-primary));
  color: hsl(var(--content-primary));
  border: 1px solid hsl(var(--border-default));
}
```

### Status Colors

```css
.success {
  background-color: hsl(var(--status-success));
}
.warning {
  background-color: hsl(var(--status-warning));
}
.error {
  background-color: hsl(var(--status-error));
}
.info {
  background-color: hsl(var(--status-info));
}
```

### Utility Classes (Tailwind-style)

```html
<!-- Interactive elements -->
<button class="bg-interactive text-content-inverse">Click me</button>

<!-- Surface elements -->
<div class="bg-surface-secondary content-primary">Card content</div>

<!-- Status feedback -->
<div class="bg-success text-content-inverse">Success message</div>
```

### Component Base Classes

```css
/* Pre-built patterns */
.component-interactive  /* Button-like elements */
.component-surface      /* Card-like elements */
.content-primary        /* Main text */
.content-secondary      /* Supporting text */
```

## 🎨 Token Categories

### SURFACE (what things sit on)

- `--surface-primary` - Main backgrounds
- `--surface-secondary` - Cards, panels
- `--surface-interactive` - Buttons (customizable)
- `--surface-accent` - Success highlights

### CONTENT (what sits on surfaces)

- `--content-primary` - Main text
- `--content-secondary` - Supporting text
- `--content-inverse` - Text on colored backgrounds
- `--content-muted` - Disabled text

### BORDER (what separates things)

- `--border-default` - Normal borders
- `--border-interactive` - Focus rings
- `--border-muted` - Subtle separation

### STATUS (what tells users about state)

- `--status-success` - Green (positive)
- `--status-warning` - Orange (caution)
- `--status-error` - Red (negative)
- `--status-info` - Blue (information)

## ♿ Accessibility Built-in

- **4.5:1** text contrast minimum
- **3:1** UI element contrast minimum
- **Automatic** dark mode calculations
- **WCAG AA** compliant by default

## 🔄 Migration from Old System

```css
/* OLD → NEW */
--primary     → --surface-interactive
--secondary   → --surface-secondary
--background  → --surface-primary
--foreground  → --content-primary
--muted       → --content-secondary
--accent      → --surface-accent
```

## 🚫 Anti-Patterns to Avoid

```css
/* ❌ Don't use hardcoded colors */
color: #ff0000;

/* ❌ Don't create arbitrary color names */
--my-special-blue: #1234ff;

/* ❌ Don't bypass the semantic system */
--random-color: hsl(180 50% 50%);
```

## ✅ Best Practices

```css
/* ✅ Use semantic tokens */
color: hsl(var(--content-primary));

/* ✅ Use status colors for feedback */
background-color: hsl(var(--status-success));

/* ✅ Let the system handle contrast */
/* (automatic via semantic tokens) */
```

---

**Remember: Semantic = meaningful to users, not just developers!**
