# 🎨 TriggerKings Style Guide

_Single source of truth for all styling decisions_

---

## **🎯 Design Principles**

1. **Consistency First** - Shared visual language, predictable patterns
2. **Accessibility Excellence** - WCAG 2.1 AA minimum, keyboard navigation, screen readers
3. **Performance Optimized** - Minimal CSS, efficient animations, responsive by default
4. **Developer Experience** - Intuitive props, TypeScript support, clear errors

---

## **🎨 Design Tokens**

### **Colors**

```scss
// Brand
$primary: hsl(220, 14%, 96%)
$primary-foreground: hsl(220, 9%, 46%)

// States
$success: hsl(142, 76%, 36%)    // Green
$warning: hsl(32, 95%, 44%)     // Orange
$danger: hsl(0, 84%, 60%)       // Red

// Neutrals
$background: hsl(0, 0%, 100%)   // White
$foreground: hsl(224, 71%, 4%)  // Dark text
$muted: hsl(220, 14%, 96%)      // Light gray
$border: hsl(220, 13%, 91%)     // Border gray
$ring: hsl(221, 83%, 53%)       // Focus blue
```

### **Spacing Scale**

```scss
$spacing-1: 0.25rem  // 4px
$spacing-2: 0.5rem   // 8px
$spacing-3: 0.75rem  // 12px
$spacing-4: 1rem     // 16px
$spacing-5: 1.25rem  // 20px
$spacing-6: 1.5rem   // 24px
$spacing-8: 2rem     // 32px
$spacing-12: 3rem    // 48px
```

### **Component Sizes**

```scss
sm:      height: 2rem (32px),    text: text-sm
default: height: 2.5rem (40px),  text: text-base
lg:      height: 2.75rem (44px), text: text-lg
xl:      height: 3rem (48px),    text: text-xl
```

### **Typography**

```scss
$font-family: "Inter", sans-serif
$font-weight-normal: 400
$font-weight-medium: 500
$font-weight-semibold: 600

text-sm: 0.875rem (14px), line-height: 1.25
text-base: 1rem (16px), line-height: 1.5
text-lg: 1.125rem (18px), line-height: 1.75
text-xl: 1.25rem (20px), line-height: 1.75
```

### **Animations**

```scss
$transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1)    // hover, focus
$transition-default: 200ms cubic-bezier(0.4, 0, 0.2, 1) // standard
$transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1)    // complex
```

---

## **🎭 Required Component Patterns**

### **Mandatory Variants**

Every component MUST support these variants:

```typescript
variant: 'default' | 'success' | 'warning' | 'danger';
size: 'sm' | 'default' | 'lg' | 'xl';
```

### **Mandatory States**

```typescript
loading?: boolean    // Show spinner, disable interaction
disabled?: boolean   // 50% opacity, no pointer events
className?: string   // Allow custom styling
```

### **Component Template**

```typescript
const componentVariants = cva('base-styles', {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground',
      success: 'bg-success text-success-foreground',
      warning: 'bg-warning text-warning-foreground',
      danger: 'bg-danger text-danger-foreground',
    },
    size: {
      sm: 'h-8 px-3 text-sm',
      default: 'h-10 px-4 text-base',
      lg: 'h-11 px-6 text-lg',
      xl: 'h-12 px-8 text-xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});
```

---

## **♿ Accessibility Standards**

### **Required ARIA**

- `aria-label` or `aria-labelledby` for all interactive elements
- `aria-disabled="true"` when disabled
- `aria-busy="true"` when loading
- `role` attributes where needed

### **Keyboard Navigation**

- `Tab` to focus, `Shift+Tab` to reverse
- `Enter` or `Space` to activate
- `Escape` to close/cancel
- Arrow keys for lists/menus

### **Focus Management**

- Visible focus ring using `$ring` color
- Logical tab order
- Focus trapping in modals
- Return focus after interactions

---

## **📁 File Structure Standard**

```
ComponentName/
├── component-name.tsx          # Main component
├── ComponentName.stories.tsx   # Storybook stories (10+ required)
├── ComponentName.test.tsx      # Tests (30+ required)
└── index.tsx                   # Export file
```

---

## **🧪 Quality Gates**

- **Style Guide Compliance**: 80%+ validation score required
- **Test Coverage**: 30+ test cases minimum
- **Story Coverage**: 10+ stories minimum
- **Build**: Must pass `yarn build` without errors
- **Lint**: Must pass `yarn lint` without errors
- **Accessibility**: Must pass automated accessibility tests

---

## **🚀 Quick Reference Card**

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                    🎨 TRIGGERKINGS STYLE GUIDE CARD                      ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

COLORS              SPACING              SIZES                STATES
Primary: 220,14%,96% 1: 4px   5: 20px    sm: 32px  text-sm   loading: spinner
Success: 142,76%,36% 2: 8px   6: 24px    def: 40px text-base disabled: 50% opacity
Warning: 32,95%,44%  3: 12px  8: 32px    lg: 44px  text-lg   error: red border
Danger:  0,84%,60%   4: 16px  12: 48px   xl: 48px  text-xl   success: green

REQUIRED VARIANTS: variant(default,success,warning,danger) + size(sm,default,lg,xl)
ACCESSIBILITY: ARIA labels, keyboard nav, focus management, screen reader support
```

Print this card and keep it next to you while coding!
