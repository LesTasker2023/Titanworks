# 🎨 TriggerKings Design System & Style Guide

## Overview

This is your complete design system and style guide for building consistent, accessible, and high-quality components in the TriggerKings project. Every component should be built using this system to ensure uniformity.

## 📁 File Structure

```
docs/
├── COMPONENT_STYLE_GUIDE.md      # 📖 Complete style guide (main document)
├── STYLE_GUIDE_QUICK_REFERENCE.md # ⚡ Quick reference for developers  
├── STYLE_GUIDE_CARD.txt          # 🃏 ASCII card to keep beside you
├── VALIDATION_GUIDE.md           # ✅ How to validate components

src/styles/
├── design-system.css             # 🎯 Main import file (use this)
├── design-tokens.css             # 🎨 All design tokens and variables
├── component-system.css          # 🧩 Standard component classes  
├── themes/
│   ├── light.css                # ☀️ Light theme (default)
│   └── dark.css                 # 🌙 Dark theme (optional)

scripts/
└── validate-component.js         # 🔍 Component validation tool
```

## 🚀 Quick Start

### 1. Read the Essential Docs (5 minutes)

1. **Print and keep nearby:** [`STYLE_GUIDE_CARD.txt`](./STYLE_GUIDE_CARD.txt)
2. **Reference guide:** [`STYLE_GUIDE_QUICK_REFERENCE.md`](./STYLE_GUIDE_QUICK_REFERENCE.md)  
3. **Full documentation:** [`COMPONENT_STYLE_GUIDE.md`](./COMPONENT_STYLE_GUIDE.md)

### 2. Import the Design System

```tsx
// In your component CSS file
@import '../../styles/design-system.css';

// Or import specific parts
@import '../../styles/design-tokens.css';
@import '../../styles/component-system.css';
```

### 3. Use the Component Template

Copy this template for every new component:

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../lib/utils";

const componentVariants = cva(
  "component-base", // Base classes from component-system.css
  {
    variants: {
      variant: {
        default: "variant-default",
        success: "variant-success", 
        warning: "variant-warning",
        danger: "variant-danger",
      },
      size: {
        sm: "size-sm",
        default: "size-default",
        lg: "size-lg", 
        xl: "size-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ComponentProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof componentVariants> {
  loading?: boolean;
  disabled?: boolean;
  error?: string;
  children?: React.ReactNode;
}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ 
    className,
    variant = "default",
    size = "default", 
    loading = false,
    disabled = false,
    children,
    ...props 
  }, ref) => {
    
    if (loading) {
      return (
        <div className="state-loading">
          <div className="spinner" />
          <span className="sr-only">Loading...</span>
        </div>
      );
    }
    
    return (
      <div
        ref={ref}
        className={cn(componentVariants({ variant, size, className }))}
        aria-disabled={disabled}
        data-loading={loading}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Component.displayName = "Component";

export default Component;
export { componentVariants };
```

### 4. Validate Before Shipping

```bash
# Validate your component
node scripts/validate-component.js src/components/ui/YourComponent

# Run tests
yarn test YourComponent  

# Check linting
yarn lint --fix

# Build check
yarn build
```

## 🎯 Key Design Principles

### **Consistency First**
- Every component uses the same color variants: `default`, `success`, `warning`, `danger`
- Every component supports the same sizes: `sm`, `default`, `lg`, `xl`
- All spacing follows the 4px grid system
- All animations use standard timing functions

### **Accessibility Excellence**  
- WCAG 2.1 AA compliance minimum
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Reduced motion support

### **Performance Optimized**
- CSS custom properties for efficient theming
- Minimal bundle impact
- Efficient animations (60fps)
- Mobile-first responsive design

## 🎨 Design Token Usage

### Colors
```css
/* Use HSL color functions with our tokens */
background-color: hsl(var(--color-primary));
color: hsl(var(--color-primary-foreground));

/* Available color tokens: */
--color-primary
--color-success  
--color-warning
--color-danger
--color-background
--color-foreground
--color-muted
--color-border
--color-ring
```

### Spacing
```css
/* Use spacing tokens for consistent layout */
padding: var(--spacing-4) var(--spacing-6);
margin: var(--spacing-2);
gap: var(--spacing-3);

/* Available spacing: 1, 2, 3, 4, 5, 6, 8, 10, 12, 16 */
```

### Typography
```css
/* Use typography scale */
font-size: var(--text-base);
line-height: var(--leading-normal);
font-family: var(--font-family-base);

/* Available sizes: xs, sm, base, lg, xl, 2xl */
```

### Component Sizes
```css
/* Use standard component heights */
height: var(--height-default);

/* Available: --height-sm, --height-default, --height-lg, --height-xl */
```

## 🧩 Pre-built CSS Classes

Use these classes from `component-system.css`:

### Base Classes
```css
.component-base      /* Standard component foundation */
.form-element       /* Standard form element styling */
.interactive        /* Hover/focus/active states */
```

### Size Classes
```css
.size-sm           /* Small component (32px height) */
.size-default      /* Default component (40px height) */  
.size-lg           /* Large component (44px height) */
.size-xl           /* Extra large component (48px height) */
```

### Variant Classes  
```css
.variant-default   /* Default gray styling */
.variant-success   /* Green styling */
.variant-warning   /* Orange styling */
.variant-danger    /* Red styling */
```

### State Classes
```css
.state-loading     /* Loading with spinner */
.state-error      /* Error styling */
.state-success    /* Success styling */
```

### Utility Classes
```css
.fade-in          /* Fade in animation */
.slide-in         /* Slide in animation */  
.scale-in         /* Scale in animation */
.sr-only          /* Screen reader only */
```

## 🌓 Theme System

### Light Theme (Default)
```tsx
// Automatically applied - no setup needed
```

### Dark Theme (Optional)  
```tsx
// Option 1: Automatic based on system preference
// (Already configured in dark.css)

// Option 2: Manual toggle
document.documentElement.classList.add('theme-dark');
```

## ✅ Quality Checklist

Before shipping ANY component:

### **Visual Design**
- [ ] Uses only colors from design token palette
- [ ] Follows 4px spacing grid system
- [ ] Implements all 4 size variants (sm, default, lg, xl)
- [ ] Implements all 4 color variants (default, success, warning, danger)
- [ ] Proper border radius and shadows applied
- [ ] Responsive on all screen sizes (320px to 2560px+)

### **Functionality**
- [ ] Loading state with spinner implemented
- [ ] Disabled state with proper styling and behavior
- [ ] Error handling and display
- [ ] Keyboard navigation working
- [ ] Focus management correct

### **Code Quality**
- [ ] Uses CVA for variant management
- [ ] TypeScript interfaces complete and proper
- [ ] Proper prop forwarding and ref handling
- [ ] No console errors or warnings
- [ ] ESLint and Prettier passing

### **Testing & Documentation**
- [ ] 30+ comprehensive tests written and passing
- [ ] All test categories covered (Rendering, Variants, Events, Features, Edge Cases, A11y)
- [ ] 10+ Storybook stories created
- [ ] Component README written
- [ ] Props and usage documented

### **Accessibility**
- [ ] ARIA attributes present and correct
- [ ] Keyboard navigation fully functional  
- [ ] Screen reader tested and working
- [ ] High contrast mode supported
- [ ] Focus indicators visible
- [ ] Reduced motion respected

### **Performance**
- [ ] Bundle size impact minimal
- [ ] Animations smooth (60fps)
- [ ] No memory leaks detected
- [ ] Fast render times (<100ms)

## 🔍 Validation Commands

```bash
# Validate component against style guide
node scripts/validate-component.js src/components/ui/ComponentName

# Run component tests
yarn test ComponentName

# Lint and format
yarn lint --fix
yarn format

# Type checking
yarn type-check

# Build verification
yarn build

# Storybook validation
yarn storybook
```

## 🎓 Learning Path

### **Day 1: Foundation**
1. Read [`STYLE_GUIDE_QUICK_REFERENCE.md`](./STYLE_GUIDE_QUICK_REFERENCE.md)
2. Print [`STYLE_GUIDE_CARD.txt`](./STYLE_GUIDE_CARD.txt) and keep beside you
3. Build your first component using the template above

### **Day 2: Deep Dive**
1. Study [`COMPONENT_STYLE_GUIDE.md`](./COMPONENT_STYLE_GUIDE.md) thoroughly
2. Review existing component implementations for patterns
3. Practice with the validation tool

### **Day 3: Mastery**  
1. Read [`VALIDATION_GUIDE.md`](./VALIDATION_GUIDE.md)
2. Build a complex component from scratch
3. Achieve 90%+ validation score

## 🤝 Contributing

### Adding New Design Tokens
1. Add tokens to `src/styles/design-tokens.css`
2. Update quick reference docs
3. Update component template if needed
4. Test across all existing components

### Improving the System
1. Propose changes via discussion first
2. Update documentation alongside code changes
3. Ensure backward compatibility
4. Run validation on all components

## 📞 Support

- **Style Guide Issues:** Check [`COMPONENT_STYLE_GUIDE.md`](./COMPONENT_STYLE_GUIDE.md)
- **Quick Questions:** Use [`STYLE_GUIDE_QUICK_REFERENCE.md`](./STYLE_GUIDE_QUICK_REFERENCE.md)
- **Component Validation:** Run validation script or check [`VALIDATION_GUIDE.md`](./VALIDATION_GUIDE.md)

---

**🎯 Remember: Consistency is king. Every component should feel like it belongs to the same family.**

**🏆 Goal: Any developer should be able to create components that feel native to our system just by following this guide.**
