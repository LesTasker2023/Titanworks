# 🎨 CVA Patterns & Component Variants

_Master Class-Variance-Authority: Build consistent, scalable component variants like a pro_

---

## 🎯 What You'll Learn

- CVA fundamentals and philosophy
- TriggerKings variant system architecture
- Advanced CVA patterns and techniques
- Type-safe variant composition
- Performance optimization with CVA

---

## 🚀 CVA Philosophy at TriggerKings

CVA (Class-Variance-Authority) is our **secret weapon** for consistent, scalable component design:

```typescript
// Before CVA: Chaos and inconsistency
const getButtonClass = (variant, size, disabled) => {
  let classes = 'btn';
  if (variant === 'primary') classes += ' btn-primary';
  else if (variant === 'secondary') classes += ' btn-secondary';
  if (size === 'lg') classes += ' btn-lg';
  if (disabled) classes += ' opacity-50';
  return classes;
}; // 😵 Hard to maintain, error-prone

// With CVA: Clean, consistent, type-safe
const buttonVariants = cva('btn', {
  variants: {
    variant: { primary: 'btn-primary', secondary: 'btn-secondary' },
    size: { sm: 'btn-sm', lg: 'btn-lg' },
    disabled: { true: 'opacity-50' },
  },
}); // ✨ Beautiful, scalable, bulletproof
```

---

## 🏗️ TriggerKings CVA Architecture

### **The Standard Variant System**

Every TriggerKings component follows this exact pattern:

```typescript
const componentVariants = cva(
  // 1. Base styles (always applied)
  'base-class-1 base-class-2',
  {
    variants: {
      // 2. Required variants (semantic meanings)
      variant: {
        default: 'neutral-styles',
        success: 'success-styles',
        warning: 'warning-styles',
        danger: 'danger-styles',
      },

      // 3. Required sizes (visual hierarchy)
      size: {
        sm: 'small-styles',
        default: 'default-styles',
        lg: 'large-styles',
        xl: 'extra-large-styles',
      },

      // 4. Optional states (behavioral)
      loading: {
        true: 'loading-styles',
      },
      disabled: {
        true: 'disabled-styles',
      },
    },

    // 5. Sensible defaults
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },

    // 6. Complex interactions (advanced)
    compoundVariants: [
      {
        variant: 'danger',
        size: 'lg',
        className: 'extra-emphasis-styles',
      },
    ],
  }
);
```

### **Real-World Example: Button CVA**

```typescript
// src/components/ui/Button/button.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base: Common styles for all buttons
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        success: 'bg-green-600 text-white hover:bg-green-700 border-green-500',
        warning: 'bg-yellow-600 text-white hover:bg-yellow-700 border-yellow-500',
        danger: 'bg-red-600 text-white hover:bg-red-700 border-red-500',
      },
      size: {
        sm: 'h-9 px-3 text-xs',
        default: 'h-10 px-4 py-2',
        lg: 'h-11 px-8 text-base',
        xl: 'h-12 px-10 text-lg',
      },
      loading: {
        true: 'cursor-not-allowed',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
    compoundVariants: [
      // Large danger buttons get extra visual weight
      {
        variant: 'danger',
        size: ['lg', 'xl'],
        className: 'shadow-lg shadow-red-500/25',
      },
      // Loading state affects all variants
      {
        loading: true,
        className: 'relative overflow-hidden',
      }
    ],
  }
);

// Type-safe props interface
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

// Component implementation
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, disabled, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, loading, disabled }), className)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-inherit">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
          </div>
        )}
        <span className={loading ? 'opacity-0' : ''}>{children}</span>
      </button>
    );
  }
);
```

---

## 🎨 Color System Integration

### **Semantic Color Mapping**

```typescript
// tailwind.config.js - Semantic color system
module.exports = {
  theme: {
    extend: {
      colors: {
        // Semantic colors for CVA variants
        success: {
          DEFAULT: 'hsl(142, 76%, 36%)', // Green-600
          foreground: 'hsl(0, 0%, 100%)', // White text
          50: 'hsl(138, 76%, 97%)', // Very light green
          500: 'hsl(142, 76%, 36%)', // Main green
          600: 'hsl(142, 72%, 29%)', // Darker green
        },
        warning: {
          DEFAULT: 'hsl(32, 95%, 44%)', // Orange-600
          foreground: 'hsl(0, 0%, 100%)',
          50: 'hsl(33, 100%, 96%)',
          500: 'hsl(32, 95%, 44%)',
          600: 'hsl(32, 95%, 37%)',
        },
        destructive: {
          DEFAULT: 'hsl(0, 84%, 60%)', // Red-500
          foreground: 'hsl(0, 0%, 100%)',
          50: 'hsl(0, 86%, 97%)',
          500: 'hsl(0, 84%, 60%)',
          600: 'hsl(0, 84%, 54%)',
        },
      },
    },
  },
};
```

### **CVA Color Patterns**

```typescript
// Consistent color usage across components
const colorVariants = {
  variant: {
    default: 'border-border bg-background text-foreground',
    success: 'border-success/20 bg-success/5 text-success-foreground',
    warning: 'border-warning/20 bg-warning/5 text-warning-foreground',
    danger: 'border-destructive/20 bg-destructive/5 text-destructive-foreground',
  },
};

// Usage in Alert component
const alertVariants = cva('relative w-full rounded-lg border p-4', { variants: colorVariants });

// Usage in Dialog component
const dialogVariants = cva(
  'fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg',
  { variants: colorVariants }
);
```

---

## 🧩 Advanced CVA Patterns

### **Compound Variants: Complex Interactions**

```typescript
const advancedButtonVariants = cva('base-button-styles', {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground',
      outline: 'border border-input bg-background',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
    },
    size: {
      sm: 'h-9 px-3 text-xs',
      default: 'h-10 px-4 py-2',
      lg: 'h-11 px-8',
    },
    intent: {
      primary: 'font-semibold',
      secondary: 'font-medium',
      subtle: 'font-normal',
    },
  },
  compoundVariants: [
    // Outline variant with different sizes needs different borders
    {
      variant: 'outline',
      size: 'sm',
      className: 'border-1',
    },
    {
      variant: 'outline',
      size: ['default', 'lg'],
      className: 'border-2',
    },

    // Primary intent with ghost variant needs special treatment
    {
      variant: 'ghost',
      intent: 'primary',
      className: 'text-primary hover:bg-primary/10',
    },

    // Subtle intent should never be used with outline (design system rule)
    {
      variant: 'outline',
      intent: 'subtle',
      className: 'font-medium', // Override to prevent too-subtle text
    },
  ],
});
```

### **Conditional Variants: Smart Defaults**

```typescript
const smartInputVariants = cva('flex h-10 w-full rounded-md border px-3 py-2 text-sm transition-colors', {
  variants: {
    variant: {
      default: 'border-input bg-background',
      success: 'border-success bg-success/5',
      warning: 'border-warning bg-warning/5',
      danger: 'border-destructive bg-destructive/5',
    },
    size: {
      sm: 'h-8 px-2 text-xs',
      default: 'h-10 px-3 text-sm',
      lg: 'h-12 px-4 text-base',
    },
    state: {
      default: '',
      focused: 'ring-2 ring-ring ring-offset-2',
      error: 'ring-2 ring-destructive ring-offset-2',
      disabled: 'cursor-not-allowed opacity-50',
    },
  },
  compoundVariants: [
    // Error state overrides variant colors
    {
      state: 'error',
      className: 'border-destructive bg-destructive/5',
    },
    // Focus state adapts to current variant
    {
      variant: 'success',
      state: 'focused',
      className: 'ring-success',
    },
    {
      variant: 'warning',
      state: 'focused',
      className: 'ring-warning',
    },
  ],
});
```

### **Dynamic Variants: Runtime Configuration**

```typescript
// Advanced: Generate variants dynamically
const createThemeVariants = (theme: 'light' | 'dark') => {
  const baseColors = theme === 'dark'
    ? { bg: 'bg-slate-800', text: 'text-slate-100' }
    : { bg: 'bg-white', text: 'text-slate-900' };

  return cva(`${baseColors.bg} ${baseColors.text}`, {
    variants: {
      variant: {
        default: theme === 'dark' ? 'border-slate-700' : 'border-slate-200',
        success: theme === 'dark' ? 'border-green-400' : 'border-green-600',
        // ... other variants
      },
    },
  });
};

// Usage in component
const ThemeAwareComponent = ({ theme, ...props }) => {
  const variants = React.useMemo(() => createThemeVariants(theme), [theme]);
  return <div className={variants(props)} />;
};
```

---

## 🎯 Component Composition Patterns

### **Base + Variant Pattern**

```typescript
// Create base component variants
const baseCardVariants = cva(
  'rounded-lg border bg-card text-card-foreground shadow-sm',
  {
    variants: {
      variant: {
        default: 'border-border',
        elevated: 'shadow-lg border-transparent',
        outlined: 'border-2',
      },
      size: {
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8',
      },
    },
  }
);

// Compose with specific use cases
const productCardVariants = cva('', {
  variants: {
    featured: {
      true: 'ring-2 ring-primary ring-offset-2',
    },
    soldOut: {
      true: 'opacity-75 grayscale',
    },
  },
});

// Combine in component
const ProductCard = ({ featured, soldOut, variant, size, ...props }) => {
  return (
    <div
      className={cn(
        baseCardVariants({ variant, size }),
        productCardVariants({ featured, soldOut })
      )}
      {...props}
    />
  );
};
```

### **Slot-Based Composition**

```typescript
// Complex component with multiple styled areas
const dialogVariants = {
  overlay: cva('fixed inset-0 z-50 bg-black/80'),

  content: cva(
    'fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg',
    {
      variants: {
        size: {
          sm: 'max-w-sm',
          default: 'max-w-lg',
          lg: 'max-w-2xl',
          xl: 'max-w-4xl',
        },
      },
    }
  ),

  header: cva('flex flex-col space-y-1.5 text-center sm:text-left'),

  footer: cva('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2'),
};

// Component using slot variants
const Dialog = ({ size, children }) => (
  <div className={dialogVariants.overlay()}>
    <div className={dialogVariants.content({ size })}>
      {children}
    </div>
  </div>
);

Dialog.Header = ({ children }) => (
  <div className={dialogVariants.header()}>{children}</div>
);

Dialog.Footer = ({ children }) => (
  <div className={dialogVariants.footer()}>{children}</div>
);
```

---

## 🚀 Performance Optimization

### **CVA Class Memoization**

```typescript
// Optimize expensive CVA calculations
const ExpensiveComponent = ({ variant, size, ...props }) => {
  // Memoize CVA result to prevent recalculation
  const className = React.useMemo(
    () => componentVariants({ variant, size }),
    [variant, size]
  );

  return <div className={className} {...props} />;
};

// Custom hook for CVA optimization
const useCVAMemo = (variants, dependencies) => {
  return React.useMemo(() => variants(dependencies), dependencies);
};

// Usage
const OptimizedButton = (props) => {
  const className = useCVAMemo(buttonVariants, {
    variant: props.variant,
    size: props.size,
    loading: props.loading,
  });

  return <button className={className} {...props} />;
};
```

### **Tree Shaking Optimization**

```typescript
// Separate variant definitions for better tree shaking
export const buttonBaseVariants = cva('base-button-styles');

export const buttonSizeVariants = {
  sm: 'h-9 px-3 text-xs',
  default: 'h-10 px-4 py-2',
  lg: 'h-11 px-8 text-base',
  xl: 'h-12 px-10 text-lg',
};

export const buttonColorVariants = {
  default: 'bg-primary text-primary-foreground',
  success: 'bg-success text-success-foreground',
  warning: 'bg-warning text-warning-foreground',
  danger: 'bg-destructive text-destructive-foreground',
};

// Compose as needed (only imports what's used)
const createButtonVariants = ({ includeColors = true, includeSizes = true }) => {
  return cva('base-styles', {
    variants: {
      ...(includeColors && { variant: buttonColorVariants }),
      ...(includeSizes && { size: buttonSizeVariants }),
    },
  });
};
```

---

## 🧪 Testing CVA Components

### **Variant Testing Patterns**

```typescript
// Test all variant combinations efficiently
describe('Button Variants', () => {
  const variants = ['default', 'success', 'warning', 'danger'] as const;
  const sizes = ['sm', 'default', 'lg', 'xl'] as const;

  // Test each variant
  variants.forEach(variant => {
    it(`renders ${variant} variant`, () => {
      render(<Button variant={variant}>Test</Button>);
      expect(screen.getByRole('button')).toHaveClass(`button--${variant}`);
    });
  });

  // Test each size
  sizes.forEach(size => {
    it(`renders ${size} size`, () => {
      render(<Button size={size}>Test</Button>);
      expect(screen.getByRole('button')).toHaveClass(`button--size-${size}`);
    });
  });

  // Test combinations
  it('combines variant and size correctly', () => {
    render(<Button variant="success" size="lg">Test</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('button--success', 'button--size-lg');
  });

  // Test compound variants
  it('applies compound variant styles', () => {
    render(<Button variant="danger" size="xl">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('shadow-lg');
  });
});
```

### **CVA Class Generation Testing**

```typescript
// Test the CVA function directly
describe('buttonVariants', () => {
  it('generates correct base classes', () => {
    expect(buttonVariants()).toContain('inline-flex items-center');
  });

  it('applies variant classes correctly', () => {
    expect(buttonVariants({ variant: 'success' })).toContain('bg-green-600');
  });

  it('combines multiple variants', () => {
    const result = buttonVariants({ variant: 'danger', size: 'lg' });
    expect(result).toContain('bg-red-600');
    expect(result).toContain('h-11 px-8');
  });

  it('handles compound variants', () => {
    const result = buttonVariants({ variant: 'danger', size: 'xl' });
    expect(result).toContain('shadow-lg shadow-red-500/25');
  });
});
```

---

## 🎨 Design System Integration

### **CVA + Design Tokens**

```typescript
// design-tokens.ts
export const tokens = {
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
  },
} as const;

// Use tokens in CVA
const tokenAwareVariants = cva('base-styles', {
  variants: {
    size: {
      sm: `p-[${tokens.spacing.sm}] text-[${tokens.fontSize.xs}] rounded-[${tokens.borderRadius.sm}]`,
      default: `p-[${tokens.spacing.md}] text-[${tokens.fontSize.sm}] rounded-[${tokens.borderRadius.md}]`,
      lg: `p-[${tokens.spacing.lg}] text-[${tokens.fontSize.base}] rounded-[${tokens.borderRadius.lg}]`,
    },
  },
});
```

### **Documentation Generation**

```typescript
// Generate variant documentation automatically
type ExtractVariants<T> = T extends cva<infer V> ? V : never;
type ButtonVariants = ExtractVariants<typeof buttonVariants>;

// Auto-generate Storybook controls
export const buttonArgTypes: ArgTypes<ButtonVariants> = {
  variant: {
    control: 'select',
    options: ['default', 'success', 'warning', 'danger'],
    description: 'Visual variant of the button',
  },
  size: {
    control: 'select',
    options: ['sm', 'default', 'lg', 'xl'],
    description: 'Size of the button',
  },
};
```

---

## 🎯 Best Practices & Guidelines

### **CVA Do's and Don'ts**

**✅ DO:**

- Use consistent variant names across components (`default`, `success`, `warning`, `danger`)
- Always provide sensible `defaultVariants`
- Group related styles into compound variants
- Use TypeScript for type safety
- Test all variant combinations

**❌ DON'T:**

- Mix styling approaches (stick to CVA throughout)
- Create too many variant options (cognitive overload)
- Forget to handle edge cases in compound variants
- Skip default variants (breaks when props are undefined)
- Ignore accessibility in variant styles

### **Naming Conventions**

```typescript
// Component variant naming
const componentVariants = cva(/* ... */);

// Slot variant naming
const componentSlotVariants = {
  header: cva(/* ... */),
  content: cva(/* ... */),
  footer: cva(/* ... */),
};

// Utility variant naming
const utilityVariants = {
  spacing: {
    /* ... */
  },
  colors: {
    /* ... */
  },
};
```

### **Migration Strategy**

```typescript
// Gradual migration from manual classes to CVA
const LegacyButton = ({ variant, className, ...props }) => {
  // Phase 1: Keep existing logic but prepare CVA
  const legacyClasses = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

  // Phase 2: Add CVA alongside (A/B test)
  const cvaClasses = buttonVariants({ variant });

  // Phase 3: Switch based on feature flag
  const finalClasses = useFeatureFlag('use-cva') ? cvaClasses : legacyClasses;

  return <button className={cn(finalClasses, className)} {...props} />;
};
```

---

## 🚀 Next Steps

Now that you've mastered CVA patterns, dive deeper into:

1. **🧪 [Testing Strategies](./06-testing-strategy.md)** - Test your CVA components thoroughly
2. **📖 [Storybook Documentation](./08-storybook-documentation.md)** - Document your variants beautifully
3. **♿ [Accessibility](./05-accessibility-patterns.md)** - Make variants accessible to everyone
4. **⚡ [Performance](./07-performance-optimization.md)** - Optimize CVA for production

---

## 💡 Pro Tips

- **Start simple**: Begin with basic variants, add complexity gradually
- **Think systems**: CVA variants should work across multiple components
- **Test combinations**: Compound variants can have unexpected interactions
- **Document decisions**: Explain why certain variant combinations exist
- **Performance matters**: Large CVA strings can impact bundle size

---

_CVA mastery unlocked! Ready to create bulletproof component variants that scale._ 🎨✨
