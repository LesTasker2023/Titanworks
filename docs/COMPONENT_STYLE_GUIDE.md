# 🎨 TriggerKings Component Style Guide

## 📋 **Overview**

This style guide ensures consistent design, behavior, and user experience across all components in the TriggerKings component library. Use this as the single source of truth for all styling decisions.

---

## 🎯 **Design Principles**

### **1. Consistency First**
- All components share the same visual language
- Predictable spacing, typography, and color usage
- Uniform behavior patterns across similar components

### **2. Accessibility Excellence**
- WCAG 2.1 AA compliance minimum
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support

### **3. Performance Optimized**
- Minimal CSS footprint
- Efficient animations
- Responsive by default

### **4. Developer Experience**
- Intuitive prop naming
- Comprehensive TypeScript support
- Clear error messages

---

## 🎨 **Visual Design System**

### **Color Palette**

```scss
// Primary Brand Colors
$primary: hsl(220, 14%, 96%);      // Main brand color
$primary-foreground: hsl(220, 9%, 46%);

// Semantic Colors
$success: hsl(142, 76%, 36%);      // Green for success states
$success-foreground: hsl(355, 7%, 97%);

$warning: hsl(32, 95%, 44%);       // Orange for warning states  
$warning-foreground: hsl(355, 7%, 97%);

$danger: hsl(0, 84%, 60%);         // Red for error/destructive states
$danger-foreground: hsl(355, 7%, 97%);

// Neutral System
$background: hsl(0, 0%, 100%);     // Page background
$foreground: hsl(224, 71%, 4%);   // Primary text

$muted: hsl(220, 14%, 96%);       // Subtle backgrounds
$muted-foreground: hsl(220, 9%, 46%); // Secondary text

$border: hsl(220, 13%, 91%);      // Component borders
$input: hsl(220, 13%, 91%);       // Input backgrounds
$ring: hsl(221, 83%, 53%);        // Focus rings
```

### **Typography Scale**

```scss
// Font Families
$font-family-base: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
$font-family-mono: ui-monospace, SFMono-Regular, "SF Mono", Consolas, monospace;

// Font Sizes (using rem for scalability)
$text-xs: 0.75rem;    // 12px - Captions, labels
$text-sm: 0.875rem;   // 14px - Small text, secondary info
$text-base: 1rem;     // 16px - Body text, default
$text-lg: 1.125rem;   // 18px - Emphasized text
$text-xl: 1.25rem;    // 20px - Headings
$text-2xl: 1.5rem;    // 24px - Large headings

// Line Heights
$leading-tight: 1.25;  // Headings
$leading-normal: 1.5;  // Body text
$leading-relaxed: 1.625; // Comfortable reading
```

### **Spacing System**

```scss
// Consistent spacing scale (based on 4px grid)
$spacing-0: 0;
$spacing-1: 0.25rem;  // 4px
$spacing-2: 0.5rem;   // 8px
$spacing-3: 0.75rem;  // 12px
$spacing-4: 1rem;     // 16px
$spacing-5: 1.25rem;  // 20px
$spacing-6: 1.5rem;   // 24px
$spacing-8: 2rem;     // 32px
$spacing-10: 2.5rem;  // 40px
$spacing-12: 3rem;    // 48px
$spacing-16: 4rem;    // 64px

// Component-specific spacing
$component-padding-sm: $spacing-2 $spacing-3;    // Small components
$component-padding-md: $spacing-3 $spacing-4;    // Default components  
$component-padding-lg: $spacing-4 $spacing-6;    // Large components
$component-padding-xl: $spacing-5 $spacing-8;    // Extra large components
```

### **Border Radius Scale**

```scss
$radius-none: 0;
$radius-sm: 0.125rem;    // 2px - Small elements
$radius-default: 0.375rem; // 6px - Default for most components
$radius-md: 0.5rem;      // 8px - Medium components
$radius-lg: 0.75rem;     // 12px - Large components
$radius-full: 9999px;    // Pills, avatars
```

### **Shadow System**

```scss
$shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);           // Subtle
$shadow-default: 0 1px 3px 0 rgba(0, 0, 0, 0.1),       // Default
                 0 1px 2px 0 rgba(0, 0, 0, 0.06);
$shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1),         // Medium
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
$shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1),       // Large
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
$shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1),       // Extra large
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
```

---

## 📐 **Component Sizing Standards**

### **Size Variants (Apply to ALL components)**

```tsx
// Standard size prop interface
interface SizeVariant {
  size?: 'sm' | 'default' | 'lg' | 'xl';
}

// Height standards per size
sm: height: 2rem (32px)
default: height: 2.5rem (40px)  
lg: height: 2.75rem (44px)
xl: height: 3rem (48px)

// Padding adjustments per size
sm: padding: $spacing-2 $spacing-3 (8px 12px)
default: padding: $spacing-3 $spacing-4 (12px 16px)
lg: padding: $spacing-4 $spacing-5 (16px 20px) 
xl: padding: $spacing-5 $spacing-6 (20px 24px)

// Font size adjustments per size  
sm: font-size: $text-sm (14px)
default: font-size: $text-base (16px)
lg: font-size: $text-lg (18px)
xl: font-size: $text-xl (20px)
```

---

## 🎭 **Variant Standards**

### **Standard Variant Colors (Apply to ALL components)**

```scss
// Every component should support these variants
.variant-default {
  background: $muted;
  color: $muted-foreground;
  border: 1px solid $border;
  
  &:hover {
    background: lighten($muted, 2%);
  }
}

.variant-success {
  background: $success;
  color: $success-foreground;
  border: 1px solid $success;
  
  &:hover {
    background: darken($success, 5%);
  }
}

.variant-warning {
  background: $warning;
  color: $warning-foreground; 
  border: 1px solid $warning;
  
  &:hover {
    background: darken($warning, 5%);
  }
}

.variant-danger {
  background: $danger;
  color: $danger-foreground;
  border: 1px solid $danger;
  
  &:hover {
    background: darken($danger, 5%);
  }
}

// Outline variants (secondary style)
.variant-outline {
  background: transparent;
  color: $foreground;
  border: 1px solid $border;
  
  &:hover {
    background: $muted;
  }
}
```

---

## 🔄 **Animation Standards**

### **Transition Durations**

```scss
$transition-fast: 150ms;      // Quick interactions (hover, focus)
$transition-default: 200ms;   // Standard transitions
$transition-slow: 300ms;      // Complex animations
$transition-slower: 500ms;    // Loading states, major changes

// Easing curves
$ease-out: cubic-bezier(0.4, 0, 0.2, 1);    // Default for most animations
$ease-in: cubic-bezier(0.4, 0, 1, 1);       // Entering animations
$ease-in-out: cubic-bezier(0.4, 0, 0.2, 1); // Reversible animations
```

### **Standard Animations**

```scss
// Fade transitions
.fade-in {
  animation: fadeIn $transition-default $ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

// Slide transitions
.slide-in-from-top {
  animation: slideInFromTop $transition-default $ease-out;
}

@keyframes slideInFromTop {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Scale transitions
.scale-in {
  animation: scaleIn $transition-fast $ease-out;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

// Loading spinner (standardized across all components)
.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

---

## ♿ **Accessibility Standards**

### **Focus Management**

```scss
// Standard focus ring (apply to ALL interactive elements)
.focus-ring {
  outline: none;
  
  &:focus-visible {
    outline: 2px solid $ring;
    outline-offset: 2px;
    border-radius: $radius-default;
  }
}

// High contrast mode support
@media (prefers-contrast: high) {
  .component {
    border-width: 2px;
    outline-width: 3px;
  }
}

// Reduced motion support
@media (prefers-reduced-motion: reduce) {
  .component * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### **ARIA Requirements**

```tsx
// Every interactive component must include:
interface AccessibilityProps {
  'aria-label'?: string;        // Descriptive label
  'aria-describedby'?: string;  // Additional description
  'aria-invalid'?: boolean;     // Error state
  'aria-disabled'?: boolean;    // Disabled state
  role?: string;                // Semantic role
  tabIndex?: number;            // Tab order
}

// Form components additional requirements:
interface FormAccessibilityProps extends AccessibilityProps {
  'aria-required'?: boolean;    // Required fields
  'aria-expanded'?: boolean;    // Expandable components
  'aria-haspopup'?: boolean;    // Dropdown/menu components
}
```

---

## 🚦 **State Management Standards**

### **Component State Classes**

```scss
// Standard state classes (apply to ALL components)
.component {
  // Default state
  transition: all $transition-default $ease-out;
  
  // Hover state
  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: $shadow-md;
  }
  
  // Focus state  
  &:focus-visible {
    outline: 2px solid $ring;
    outline-offset: 2px;
  }
  
  // Active state
  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: $shadow-sm;
  }
  
  // Disabled state
  &:disabled,
  &[aria-disabled="true"] {
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
  }
  
  // Loading state
  &[data-loading="true"] {
    position: relative;
    color: transparent;
    
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 16px;
      height: 16px;
      border: 2px solid currentColor;
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  }
  
  // Error state
  &[data-error="true"] {
    border-color: $danger;
    color: $danger;
  }
  
  // Success state
  &[data-success="true"] {
    border-color: $success;
    color: $success;
  }
}
```

---

## 📱 **Responsive Design Standards**

### **Breakpoint System**

```scss
// Consistent breakpoints across all components
$breakpoint-sm: 640px;   // Small devices
$breakpoint-md: 768px;   // Medium devices  
$breakpoint-lg: 1024px;  // Large devices
$breakpoint-xl: 1280px;  // Extra large devices
$breakpoint-2xl: 1536px; // 2X large devices

// Mixins for consistent responsive behavior
@mixin responsive-sm {
  @media (min-width: $breakpoint-sm) {
    @content;
  }
}

@mixin responsive-md {
  @media (min-width: $breakpoint-md) {
    @content;
  }
}

@mixin responsive-lg {
  @media (min-width: $breakpoint-lg) {
    @content;
  }
}

// Mobile-first component sizing
.component {
  // Mobile default (320px+)
  padding: $spacing-2 $spacing-3;
  font-size: $text-sm;
  
  @include responsive-sm {
    // Small screens (640px+)  
    padding: $spacing-3 $spacing-4;
    font-size: $text-base;
  }
  
  @include responsive-md {
    // Medium screens (768px+)
    padding: $spacing-4 $spacing-5;
  }
  
  @include responsive-lg {
    // Large screens (1024px+)
    padding: $spacing-5 $spacing-6;
    font-size: $text-lg;
  }
}
```

---

## 🔧 **Component Architecture Standards**

### **File Structure (Every component must follow)**

```
ComponentName/
├── component-name.tsx          # Main component file
├── ComponentName.stories.tsx   # Storybook documentation
├── ComponentName.test.tsx      # Comprehensive tests
├── ComponentName.scss          # SCSS enhancements (optional)
├── README.md                   # Component documentation
└── index.tsx                   # Export file
```

### **Component Interface Pattern**

```tsx
// Standard interface pattern for ALL components
import { cva, type VariantProps } from "class-variance-authority";

// 1. Define variants with CVA
const componentVariants = cva(
  "base-classes-here",
  {
    variants: {
      variant: {
        default: "default-classes",
        success: "success-classes", 
        warning: "warning-classes",
        danger: "danger-classes",
      },
      size: {
        sm: "small-classes",
        default: "default-classes",
        lg: "large-classes",
        xl: "xl-classes",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// 2. Component props interface
export interface ComponentProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof componentVariants> {
  // Standard enhancement props (use as applicable)
  loading?: boolean;           // Loading state
  disabled?: boolean;          // Disabled state  
  error?: string;             // Error message
  success?: boolean;          // Success state
  
  // Component-specific props
  // ... add your specific props here
}

// 3. Component implementation
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
    
    // 4. Handle loading state (if applicable)
    if (loading) {
      return (
        <div className="loading-state">
          <div className="spinner" />
          <span className="loading-text">Loading...</span>
        </div>
      );
    }
    
    // 5. Render component
    return (
      <div
        ref={ref}
        className={cn(componentVariants({ variant, size, className }))}
        data-disabled={disabled}
        aria-disabled={disabled}
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

---

## 🧪 **Testing Standards**

### **Required Test Categories**

```tsx
// Every component must have these test categories
describe('ComponentName', () => {
  // 1. Rendering Tests (5-8 tests)
  describe('Rendering', () => {
    it('renders without errors');
    it('renders with default props');
    it('renders with custom className');
    it('renders children correctly');
    it('forwards ref correctly');
  });

  // 2. Variants & Sizes (8-12 tests) 
  describe('Variants & Sizes', () => {
    it('renders default variant');
    it('renders success variant');
    it('renders warning variant'); 
    it('renders danger variant');
    it('renders small size');
    it('renders default size');
    it('renders large size');
    it('renders extra large size');
  });

  // 3. Events & Props (8-12 tests)
  describe('Events & Props', () => {
    it('handles click events');
    it('handles keyboard events');
    it('calls event handlers correctly');
    it('prevents events when disabled');
  });

  // 4. Enhanced Features (5-10 tests)
  describe('Enhanced Features', () => {
    it('shows loading state correctly');
    it('displays error state');
    it('handles disabled state');
    it('supports custom formatting');
  });

  // 5. Edge Cases (3-5 tests)
  describe('Edge Cases', () => {
    it('handles empty props gracefully');
    it('handles invalid props');
    it('maintains accessibility');
  });

  // 6. Accessibility (5+ tests)
  describe('Accessibility', () => {
    it('has proper ARIA attributes');
    it('supports keyboard navigation');  
    it('announces changes to screen readers');
    it('maintains focus management');
    it('works with high contrast mode');
  });
});
```

---

## 📚 **Documentation Standards**

### **Storybook Story Requirements**

```tsx
// Every component must have these story categories
export default {
  title: 'UI/ComponentName',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger'],
    },
    size: {
      control: 'select', 
      options: ['sm', 'default', 'lg', 'xl'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

// Required story types:
export const Default = { args: {} };
export const AllVariants = { /* showcase all variants */ };
export const AllSizes = { /* showcase all sizes */ };
export const LoadingState = { args: { loading: true } };
export const DisabledState = { args: { disabled: true } };
export const InteractiveExample = { /* real-world usage */ };
export const AccessibilityDemo = { /* a11y features */ };
```

---

## 🎯 **Quality Checklist**

### **Before Shipping Any Component**

**✅ Visual Design**
- [ ] Follows color palette exactly
- [ ] Uses consistent spacing scale
- [ ] Implements all size variants (sm, default, lg, xl)
- [ ] Implements all color variants (default, success, warning, danger)
- [ ] Proper border radius and shadows applied
- [ ] Responsive design working on all breakpoints

**✅ Functionality**
- [ ] Loading state implemented
- [ ] Disabled state implemented  
- [ ] Error handling implemented
- [ ] Success state implemented (if applicable)
- [ ] Keyboard navigation working
- [ ] Focus management correct

**✅ Accessibility**
- [ ] ARIA attributes present
- [ ] Screen reader tested
- [ ] High contrast mode working
- [ ] Reduced motion respected
- [ ] Focus indicators visible
- [ ] Semantic HTML used

**✅ Code Quality**
- [ ] TypeScript interfaces complete
- [ ] CVA variants implemented
- [ ] Proper prop forwarding
- [ ] Ref forwarding working
- [ ] No console errors/warnings

**✅ Testing**
- [ ] 30+ comprehensive tests written
- [ ] All test categories covered
- [ ] 100% test pass rate
- [ ] Edge cases tested
- [ ] Accessibility tested

**✅ Documentation**
- [ ] 10+ Storybook stories written
- [ ] Interactive examples included
- [ ] README.md complete
- [ ] Props documented
- [ ] Usage examples provided

---

## 🚀 **Implementation Workflow**

### **1. Setup Phase**
1. Create component folder structure
2. Install shadcn base component (if available)
3. Setup CVA variants following color/size standards
4. Implement base component structure

### **2. Enhancement Phase**  
1. Add loading state support
2. Add disabled state support
3. Add error/success states
4. Implement responsive behavior
5. Add SCSS enhancements (if needed)

### **3. Testing Phase**
1. Write comprehensive test suite (30+ tests)
2. Test all variants and sizes
3. Test accessibility features
4. Test keyboard navigation
5. Test edge cases

### **4. Documentation Phase**
1. Create Storybook stories (10+ stories)
2. Write component README
3. Add usage examples
4. Document props and variants

### **5. Quality Gate**
1. Run full test suite
2. Run accessibility audit  
3. Test responsive behavior
4. Verify style guide compliance
5. Performance check

---

## 🔍 **Style Guide Validation**

### **Quick Validation Checklist**

When creating or reviewing any component, ask:

1. **Colors**: Does it use only colors from our palette?
2. **Sizing**: Does it support all 4 size variants consistently?
3. **Spacing**: Does it follow our 4px grid spacing system?
4. **Typography**: Does it use our font scale and line heights?
5. **Animations**: Does it respect motion preferences and use our timing?
6. **Accessibility**: Can it be used by keyboard and screen reader users?
7. **States**: Does it handle loading, disabled, error, and success states?
8. **Responsiveness**: Does it work on all device sizes?

**If any answer is "No", the component needs revision before shipping.**

---

This style guide should be treated as a living document. Update it when we discover better patterns or when the design system evolves. Every component should be measured against these standards for consistency and quality.

**🎯 Goal: Any developer should be able to create a new component that feels native to our system by following this guide.**
