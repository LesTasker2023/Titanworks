# Daedalus Design System

This design system provides a comprehensive set of styles, components, and patterns for building consistent user interfaces across Daedalus applications.

## Table of Contents

- [Design Tokens](#design-tokens)
- [Typography](#typography)
- [Colors](#colors)
- [Spacing](#spacing)
- [Components](#components)
- [Utilities](#utilities)
- [Best Practices](#best-practices)

## Design Tokens

Design tokens are the foundational building blocks of our design system. They are stored as CSS custom properties (variables) and can be easily modified to create new themes.

### Usage

```scss
.my-element {
  color: var(--color-primary);
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
}
```

## Typography

Our typography system uses a modular scale with responsive sizing.

### Font Families

- Sans Serif: `var(--font-sans)`
- Monospace: `var(--font-mono)`
- Display: `var(--font-display)`

### Font Sizes

```scss
--text-xs: 0.75rem // 12px
  --text-sm: 0.875rem // 14px
  --text-base: 1rem // 16px
  --text-lg: 1.125rem // 18px
  --text-xl: 1.25rem // 20px
  --text-2xl: 1.5rem // 24px
  --text-3xl: 1.875rem // 30px
  --text-4xl: 2.25rem // 36px
  --text-5xl: 3rem; // 48px
```

### Font Weights

```scss
--font-thin: 100 --font-light: 300 --font-normal: 400 --font-medium: 500 --font-semibold: 600 --font-bold: 700
  --font-extrabold: 800;
```

## Colors

Our color system is built around a primary red color with dynamic shades and semantic colors.

### Primary Colors

```scss
--color-primary-50: // Lightest shade
  --color-primary-100: --color-primary-200: --color-primary-300: --color-primary-400: --color-primary:
  // Base color (#ff3b3b)
  --color-primary-600: --color-primary-700: --color-primary-800: --color-primary-900: ; // Darkest shade
```

### Semantic Colors

```scss
--color-success: #10b981 --color-warning: #f59e0b --color-error: #ef4444 --color-info: #3b82f6;
```

### Neutral Colors

```scss
--color-neutral-50: #f9fafb --color-neutral-900: #111827;
```

## Spacing

Our spacing system uses a consistent scale based on 0.25rem units.

```scss
--spacing-0: 0 --spacing-1: 0.25rem --spacing-2: 0.5rem --spacing-3: 0.75rem --spacing-4: 1rem --spacing-5: 1.25rem
  --spacing-6: 1.5rem --spacing-8: 2rem --spacing-10: 2.5rem --spacing-12: 3rem --spacing-16: 4rem;
```

## Components

### Button

The button component comes with several variants and states:

```jsx
<button class="button">Default Button</button>
<button class="button button--outline">Outline Button</button>
<button class="button button--ghost">Ghost Button</button>
<button class="button button--link">Link Button</button>
```

Modifiers:

- `button--sm`: Small button
- `button--lg`: Large button
- `button--loading`: Loading state
- `button--disabled`: Disabled state

### Card

Cards are used to group related content:

```jsx
<div class="card">
  <div class="card__header">Header</div>
  <div class="card__content">Content</div>
  <div class="card__footer">Footer</div>
</div>
```

Modifiers:

- `card--hover`: Adds hover effect
- `card--bordered`: Adds border
- `card--flat`: Removes shadow

## Utilities

### Layout Utilities

- `.container`: Centered container with max-width
- `.grid`: CSS Grid layout system
- `.flex`: Flexbox utilities
- `.stack`: Vertical spacing between children

### Spacing Utilities

- `.m-*`: Margin
- `.p-*`: Padding
- `.mx-*`: Horizontal margin
- `.py-*`: Vertical padding

### Typography Utilities

- `.text-left`, `.text-center`, `.text-right`
- `.font-bold`, `.font-normal`, etc.
- `.text-primary`, `.text-muted`, etc.

## Best Practices

1. **Use Design Tokens**

   ```scss
   // ❌ Bad
   .element {
     color: #ff3b3b;
   }

   // ✅ Good
   .element {
     color: var(--color-primary);
   }
   ```

2. **Responsive Design**

   ```scss
   // Use the respond-to mixin
   @include respond-to('md') {
     // Styles for medium screens and up
   }
   ```

3. **Component Structure**

   ```scss
   .component {
     &__element {
     }
     &--modifier {
     }
   }
   ```

4. **Utility Classes**
   - Use utility classes for one-off styles
   - Combine utilities to create unique layouts
   - Use components for repeated patterns

## Theming

To create a new theme:

1. Create a new theme file in `styles/themes/`
2. Override CSS custom properties
3. Apply theme class to root element

```scss
.theme-dark {
  --color-background: var(--color-neutral-900);
  --color-text: var(--color-neutral-50);
}
```
