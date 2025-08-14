# 🎨 Design Token Reference

## Quick Reference Card
*Keep this next to you while building any component*

---

## **Colors** 🎨
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

---

## **Spacing** 📐
```scss
$spacing-1: 0.25rem  // 4px
$spacing-2: 0.5rem   // 8px
$spacing-3: 0.75rem  // 12px
$spacing-4: 1rem     // 16px
$spacing-5: 1.25rem  // 20px
$spacing-6: 1.5rem   // 24px
$spacing-8: 2rem     // 32px
```

---

## **Sizes** 📏
```scss
// Component Heights
sm: 2rem (32px)
default: 2.5rem (40px)
lg: 2.75rem (44px) 
xl: 3rem (48px)

// Font Sizes
$text-xs: 0.75rem    // 12px
$text-sm: 0.875rem   // 14px
$text-base: 1rem     // 16px
$text-lg: 1.125rem   // 18px
$text-xl: 1.25rem    // 20px
```

---

## **Variants** 🎭
**Every component MUST support:**
- `default` - Muted background
- `success` - Green background  
- `warning` - Orange background
- `danger` - Red background

---

## **States** 🚦
**Every component MUST handle:**
- `loading` - Show spinner, disable interaction
- `disabled` - 50% opacity, no pointer events
- `error` - Red border and text
- `success` - Green border (if applicable)

---

## **Animation** ⚡
```scss
$transition-fast: 150ms      // Hover, focus
$transition-default: 200ms   // Standard  
$transition-slow: 300ms      // Complex
$ease-out: cubic-bezier(0.4, 0, 0.2, 1)
```

---

## **Focus Ring** 🎯
```scss
&:focus-visible {
  outline: 2px solid $ring;
  outline-offset: 2px;
}
```

---

## **Required Props Interface** ⚙️
```tsx
interface ComponentProps extends 
  React.ComponentPropsWithoutRef<"div">,
  VariantProps<typeof variants> {
  
  variant?: 'default' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'default' | 'lg' | 'xl'
  loading?: boolean
  disabled?: boolean
  error?: string
  children?: React.ReactNode
}
```

---

## **Accessibility Checklist** ♿
- [ ] Proper ARIA attributes
- [ ] Keyboard navigation
- [ ] Focus management  
- [ ] Screen reader support
- [ ] High contrast mode
- [ ] Reduced motion support

---

## **File Structure** 📁
```
ComponentName/
├── component-name.tsx          # Main component
├── ComponentName.stories.tsx   # 10+ stories
├── ComponentName.test.tsx      # 30+ tests
└── index.tsx                   # Export
```

---

## **CVA Pattern** 🏗️
```tsx
const variants = cva("base-classes", {
  variants: {
    variant: {
      default: "bg-muted text-muted-foreground",
      success: "bg-success text-success-foreground", 
      warning: "bg-warning text-warning-foreground",
      danger: "bg-danger text-danger-foreground",
    },
    size: {
      sm: "h-8 px-3 text-sm",
      default: "h-10 px-4 text-base",
      lg: "h-11 px-5 text-lg", 
      xl: "h-12 px-6 text-xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})
```

---

## **Quality Gates** ✅

**Before shipping, verify:**
1. Colors match palette exactly
2. All 4 size variants work
3. All 4 color variants work  
4. Loading state implemented
5. Disabled state works
6. Accessibility tested
7. 30+ tests written
8. 10+ stories created
9. Responsive on all screens
10. No console errors

---

**🎯 If it doesn't match this card, it's not ready to ship.**
