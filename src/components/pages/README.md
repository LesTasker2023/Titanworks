# Homepage Components Usage

This document explains how to use the Homepage1 and Homepage2 components created in the project.

## Components Created

### Homepage1

- **Location**: `src/components/pages/Homepage1/`
- **Style**: Modern card-based layout with feature grid
- **Features**:
  - Centered hero section
  - Three-column feature grid (responsive)
  - Hover animations
  - Full environment-controlled theming

### Homepage2

- **Location**: `src/components/pages/Homepage2/`
- **Style**: Sidebar navigation with content sections
- **Features**:
  - Sticky sidebar navigation
  - Multiple content sections
  - Responsive design (sidebar collapses on mobile)
  - Full environment-controlled theming

## Current Implementation

The main page (`src/app/page.tsx`) includes both components with a switcher:

```tsx
import { Homepage1, Homepage2 } from '@/components/pages';

// Toggle between Homepage1 and Homepage2 with buttons
const [currentHomepage, setCurrentHomepage] = useState<1 | 2>(1);
```

## Environment-Controlled Theming

Both homepage components use the design token system that pulls values from environment variables:

**`.env.local` controls all styling:**

```env
NEXT_PUBLIC_SURFACE_PRIMARY=#ffffff
NEXT_PUBLIC_CONTENT_PRIMARY=#1a1a1a
NEXT_PUBLIC_SPACING_LG=2rem
# ... and many more tokens
```

## Usage Examples

### Option 1: Import Individual Components

```tsx
import { Homepage1 } from '@/components/pages/Homepage1';
import { Homepage2 } from '@/components/pages/Homepage2';

export default function MyPage() {
  return <Homepage1 />;
}
```

### Option 2: Import from Index

```tsx
import { Homepage1, Homepage2 } from '@/components/pages';

export default function MyPage() {
  return <Homepage2 />;
}
```

### Option 3: Conditional Rendering (Current Implementation)

```tsx
import { useState } from 'react';
import { Homepage1, Homepage2 } from '@/components/pages';

export default function HomePage() {
  const [currentHomepage, setCurrentHomepage] = useState<1 | 2>(1);
  return currentHomepage === 1 ? <Homepage1 /> : <Homepage2 />;
}
```

## Customization

### Theme Changes

Modify values in `.env.local` and restart the development server:

```env
# Change to dark theme
NEXT_PUBLIC_SURFACE_PRIMARY=#1a1a1a
NEXT_PUBLIC_CONTENT_PRIMARY=#ffffff

# Change spacing
NEXT_PUBLIC_SPACING_LG=3rem
```

### Content Changes

Edit the component files directly:

- `src/components/pages/Homepage1/Homepage1.tsx` - Update content, text, structure
- `src/components/pages/Homepage1/Homepage1.scss` - Update component-specific styles

### Add More Homepage Variants

1. Create new folder: `src/components/pages/Homepage3/`
2. Create: `Homepage3.tsx`, `Homepage3.scss`, `index.tsx`
3. Add to `src/components/pages/index.tsx`
4. Import and use in your pages

## File Structure

```
src/components/pages/
├── Homepage1/
│   ├── Homepage1.tsx       # Component logic
│   ├── Homepage1.scss      # BEM-style SCSS with design tokens
│   └── index.tsx          # Export
├── Homepage2/
│   ├── Homepage2.tsx
│   ├── Homepage2.scss
│   └── index.tsx
└── index.tsx              # Barrel export for all pages
```

## Design Token Integration

Both components use the comprehensive design token system:

- **Surface tokens**: Background colors (`@include surface-primary`)
- **Content tokens**: Text colors (`@include content-primary`)
- **Border tokens**: Border styles (`@include border-subtle`)
- **Spacing tokens**: Margins and padding (`$spacing-lg`)
- **Typography tokens**: Font sizes and weights (`$font-size-xl`)

This ensures consistent theming across all components and easy customization through environment variables.
