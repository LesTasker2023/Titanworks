# 🔄 Development Workflow & Best Practices

_Master the TriggerKings development cycle: From idea to production-ready component_

---

## 🎯 What You'll Learn

- Complete component development lifecycle
- Quality-first development approach
- Git workflow and commit conventions
- Continuous integration practices
- Performance optimization techniques

---

## 🚀 The TriggerKings Development Philosophy

We follow **"Quality Gate Driven Development"** - every component must achieve 100/100 quality score before merging.

```typescript
// The TriggerKings Way
const DEVELOPMENT_CYCLE = [
  '📝 Plan & Design',
  '🧪 Test-Driven Development',
  '🎨 CVA Implementation',
  '📖 Story Documentation',
  '🔍 Quality Validation',
  '🚀 Integration & Deploy',
] as const;
```

---

## 🏗️ Component Development Lifecycle

### **Phase 1: Planning & Design** 📝

Before writing any code, plan your component thoroughly:

```bash
# 1. Create component branch
git checkout -b feat/add-tooltip-component

# 2. Create component folder
mkdir src/components/ui/Tooltip
cd src/components/ui/Tooltip
```

**Design Questions Checklist:**

- [ ] What variants does this component need? (default, success, warning, danger)
- [ ] What sizes should it support? (sm, default, lg, xl)
- [ ] What states are required? (loading, disabled, error)
- [ ] What accessibility features are needed?
- [ ] How will it integrate with existing components?

### **Phase 2: Test-Driven Development** 🧪

Start with tests to define the component API:

```typescript
// Tooltip.test.tsx - Define the API first
describe('Tooltip', () => {
  describe('Variants', () => {
    it('renders default variant', () => {
      render(<Tooltip variant="default">Test</Tooltip>);
      expect(screen.getByRole('tooltip')).toHaveClass('tooltip--default');
    });

    it('renders success variant', () => {
      render(<Tooltip variant="success">Test</Tooltip>);
      expect(screen.getByRole('tooltip')).toHaveClass('tooltip--success');
    });
    // ... other variants
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<Tooltip size="sm">Test</Tooltip>);
      expect(screen.getByRole('tooltip')).toHaveClass('tooltip--size-sm');
    });
    // ... other sizes
  });

  describe('Positioning', () => {
    it('supports top position', () => {
      render(<Tooltip position="top">Test</Tooltip>);
      expect(screen.getByRole('tooltip')).toHaveClass('tooltip--position-top');
    });
    // ... other positions
  });
});
```

### **Phase 3: CVA Implementation** 🎨

Implement the component using our CVA pattern:

```typescript
// tooltip.tsx - CVA-first implementation
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

const tooltipVariants = cva(
  // Base styles
  'absolute z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95',
  {
    variants: {
      variant: {
        default: 'border-border bg-popover',
        success: 'border-success/20 bg-success/5 text-success-foreground',
        warning: 'border-warning/20 bg-warning/5 text-warning-foreground',
        danger: 'border-destructive/20 bg-destructive/5 text-destructive-foreground',
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        default: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base',
        xl: 'px-5 py-2.5 text-lg',
      },
      position: {
        top: 'data-[state=delayed-open]:slide-in-from-bottom-2',
        bottom: 'data-[state=delayed-open]:slide-in-from-top-2',
        left: 'data-[state=delayed-open]:slide-in-from-right-2',
        right: 'data-[state=delayed-open]:slide-in-from-left-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      position: 'top',
    },
  }
);

export interface TooltipProps
  extends React.ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof tooltipVariants> {
  loading?: boolean;
  disabled?: boolean;
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ className, variant, size, position, loading, disabled, children, ...props }, ref) => {
    if (disabled) return null;

    return (
      <div
        ref={ref}
        className={cn(tooltipVariants({ variant, size, position }), className)}
        role="tooltip"
        {...props}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current" />
            Loading...
          </div>
        ) : (
          children
        )}
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';
export default Tooltip;
```

### **Phase 4: Story Documentation** 📖

Document all variants and use cases:

```typescript
// Tooltip.stories.tsx - Complete documentation
import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from './tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'UI/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Essential Stories
export const Default: Story = {
  args: { children: 'Default tooltip' },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip variant="default">Default</Tooltip>
      <Tooltip variant="success">Success</Tooltip>
      <Tooltip variant="warning">Warning</Tooltip>
      <Tooltip variant="danger">Danger</Tooltip>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Tooltip size="sm">Small</Tooltip>
      <Tooltip size="default">Default</Tooltip>
      <Tooltip size="lg">Large</Tooltip>
      <Tooltip size="xl">Extra Large</Tooltip>
    </div>
  ),
};

export const LoadingState: Story = {
  args: { loading: true, children: 'Loading tooltip' },
};

export const DisabledState: Story = {
  args: { disabled: true, children: 'This won\'t render' },
};

// Additional comprehensive stories...
export const AllPositions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-8">
      <Tooltip position="top">Top position</Tooltip>
      <Tooltip position="bottom">Bottom position</Tooltip>
      <Tooltip position="left">Left position</Tooltip>
      <Tooltip position="right">Right position</Tooltip>
    </div>
  ),
};
```

### **Phase 5: Quality Validation** 🔍

Continuously validate quality during development:

```bash
# Run tests while developing
yarn test Tooltip.test.tsx --watch

# Check stories render correctly
yarn storybook

# Validate quality score
yarn quality-audit

# Should show something like:
# Tooltip: 95/100 - Missing: Edge case tests (5 pts)
```

### **Phase 6: Integration & Showcase** 🚀

Add your component to the showcase:

```typescript
// src/app/component-showcase/page.tsx
import Tooltip from '@/components/ui/Tooltip/tooltip';

// Add to the appropriate section
<div className="bg-card border border-border rounded-lg p-8 space-y-8">
  <div className="text-center">
    <h3 className="text-xl font-semibold text-foreground mb-2">Tooltip</h3>
    <p className="text-muted-foreground">Interactive tooltips with variants</p>
  </div>

  <div className="space-y-6">
    {/* All variants showcase */}
    <div className="text-center space-y-3">
      <h4 className="text-lg font-medium text-foreground">All Variants</h4>
      <div className="flex justify-center gap-4">
        <Tooltip variant="default">Default</Tooltip>
        <Tooltip variant="success">Success</Tooltip>
        <Tooltip variant="warning">Warning</Tooltip>
        <Tooltip variant="danger">Danger</Tooltip>
      </div>
    </div>

    {/* All sizes showcase */}
    <div className="text-center space-y-3">
      <h4 className="text-lg font-medium text-foreground">All Sizes</h4>
      <div className="flex justify-center gap-4 items-center">
        <Tooltip size="sm">Small</Tooltip>
        <Tooltip size="default">Default</Tooltip>
        <Tooltip size="lg">Large</Tooltip>
        <Tooltip size="xl">Extra Large</Tooltip>
      </div>
    </div>
  </div>
</div>
```

---

## 🎯 Quality Gates & Validation

### **Continuous Quality Checks**

```bash
# Before each commit
yarn build          # Must pass
yarn lint --fix     # Must pass
yarn test           # Must pass
yarn quality-audit  # Must be 100/100
```

### **Quality Audit Interpretation**

```bash
# Example output
Quick Style Guide Validation for Tooltip
==================================================

File Structure (25/25):
  ✅ [OK] index.tsx exists
  ✅ [OK] tooltip.tsx exists
  ✅ [OK] Tooltip.stories.tsx exists
  ✅ [OK] Tooltip.test.tsx exists

Component Interface (20/20):
  ✅ [OK] Uses CVA for variants
  ✅ [OK] Has variant prop with 4 options
  ✅ [OK] Has size prop with 4 options
  ✅ [OK] Supports loading, disabled, className props

Variants (16/16):
  ✅ [OK] default variant implemented
  ✅ [OK] success variant implemented
  ✅ [OK] warning variant implemented
  ✅ [OK] danger variant implemented

Sizes (16/16):
  ✅ [OK] sm size implemented
  ✅ [OK] default size implemented
  ✅ [OK] lg size implemented
  ✅ [OK] xl size implemented

States (12/12):
  ✅ [OK] Loading state with spinner
  ✅ [OK] Disabled state handling
  ✅ [OK] Error state support

Testing (15/15):
  ✅ [OK] 35+ test cases
  ✅ [OK] All test categories covered
  ✅ [OK] Edge cases tested

Stories (12/12):
  ✅ [OK] 12+ stories
  ✅ [OK] Required stories present

Build & Quality (8/8):
  ✅ [OK] Build passes
  ✅ [OK] Lint passes

==================================================
TOTAL: 104/104 (100%) ✅ PERFECT SCORE
```

---

## 🔄 Git Workflow

### **Commit Conventions**

We follow [Conventional Commits](https://conventionalcommits.org/):

```bash
# Feature commits
git commit -m "feat(tooltip): add CVA implementation with all variants"
git commit -m "feat(tooltip): add comprehensive test suite"
git commit -m "feat(tooltip): add Storybook documentation"

# Fix commits
git commit -m "fix(tooltip): correct positioning in mobile viewport"
git commit -m "fix(tooltip): improve accessibility with proper ARIA"

# Documentation
git commit -m "docs(tooltip): add usage examples and API reference"

# Quality improvements
git commit -m "test(tooltip): add edge case coverage for empty content"
git commit -m "refactor(tooltip): optimize CVA class generation"

# Final integration
git commit -m "feat(tooltip): integrate component with 100/100 quality score

✨ Features:
- Complete CVA implementation (default/success/warning/danger)
- All size variants (sm/default/lg/xl)
- Loading and disabled states
- Comprehensive test suite (35+ tests)
- Full Storybook documentation (12+ stories)
- Perfect accessibility support

📊 Quality metrics:
- Tests: 35/35 passing
- Coverage: 100%
- Quality score: 100/100
- Build: ✅ | Lint: ✅ | Types: ✅"
```

### **Branch Strategy**

```bash
# Feature branches
feat/add-tooltip-component
feat/enhance-button-animations
fix/dialog-scroll-issue

# Release branches
release/v1.2.0

# Hotfix branches
hotfix/critical-accessibility-fix
```

### **Pull Request Process**

1. **Create PR with comprehensive description:**

```markdown
## 🎯 Feature: Add Tooltip Component

### 📋 Changes

- ✅ Complete CVA implementation with 4 variants × 4 sizes
- ✅ Comprehensive test suite (35 tests, 100% coverage)
- ✅ Full Storybook documentation (12 stories)
- ✅ Integration with component showcase
- ✅ Perfect accessibility (ARIA, keyboard navigation)

### 🧪 Quality Gates

- ✅ Build: Passes
- ✅ Tests: 35/35 passing
- ✅ Lint: No issues
- ✅ TypeScript: No errors
- ✅ Quality Score: 100/100

### 📸 Screenshots

[Component variants, sizes, and states]

### 🔗 Related Issues

Closes #123 - Add tooltip component to UI library
```

2. **Automated checks must pass:**
   - Build successful
   - All tests pass
   - Linting clean
   - Quality audit: 100/100

3. **Manual review focuses on:**
   - Code quality and patterns
   - Test coverage and edge cases
   - Accessibility compliance
   - Performance implications

---

## ⚡ Performance Optimization

### **Bundle Size Monitoring**

```bash
# Check bundle impact
yarn build
yarn analyze  # If configured

# Monitor component size
echo "Tooltip bundle impact:"
du -h .next/static/chunks/pages/component-showcase*
```

### **Optimization Techniques**

```typescript
// 1. Lazy loading for heavy components
const DataTable = React.lazy(() => import('./DataTable'));

// 2. Memoization for expensive calculations
const TooltipContent = React.memo(({ children, variant }) => {
  const computedStyles = React.useMemo(() =>
    computeComplexStyles(variant), [variant]
  );

  return <div style={computedStyles}>{children}</div>;
});

// 3. Tree-shaking friendly exports
export { default as Tooltip } from './tooltip';
export type { TooltipProps } from './tooltip';

// 4. Conditional CSS loading
const tooltipStyles = React.lazy(() => import('./tooltip.css'));
```

### **Performance Monitoring**

```typescript
// Add performance measurements
const TooltipWithMetrics = React.forwardRef<HTMLDivElement, TooltipProps>(
  (props, ref) => {
    React.useEffect(() => {
      performance.mark('tooltip-render-start');
      return () => {
        performance.mark('tooltip-render-end');
        performance.measure('tooltip-render', 'tooltip-render-start', 'tooltip-render-end');
      };
    }, []);

    return <Tooltip ref={ref} {...props} />;
  }
);
```

---

## 🛠️ Debugging & Troubleshooting

### **Common Development Issues**

**1. Tests Failing:**

```bash
# Run specific test file
yarn test Tooltip.test.tsx

# Debug with verbose output
yarn test Tooltip.test.tsx --verbose

# Run with UI for visual debugging
yarn test --ui
```

**2. Storybook Issues:**

```bash
# Clear Storybook cache
yarn storybook --no-manager-cache

# Debug Storybook build
yarn build-storybook --debug-webpack
```

**3. Quality Score Issues:**

```bash
# Run detailed validation
powershell scripts/validate-quick.ps1 -ComponentPath "src/components/ui/Tooltip"

# Check specific issues
yarn quality-audit | grep -A 10 "Tooltip"
```

### **Debugging Tools**

```typescript
// Add debug props for development
interface TooltipProps extends BaseProps {
  _debug?: boolean; // Only in development
}

const Tooltip = ({ _debug, ...props }) => {
  if (process.env.NODE_ENV === 'development' && _debug) {
    console.log('Tooltip props:', props);
    console.log('Tooltip computed classes:', tooltipVariants(props));
  }

  return <TooltipComponent {...props} />;
};
```

---

## 🎉 Continuous Improvement

### **Code Review Checklist**

- [ ] Component follows CVA pattern consistently
- [ ] All 4 variants implemented (default, success, warning, danger)
- [ ] All 4 sizes implemented (sm, default, lg, xl)
- [ ] Loading and disabled states work correctly
- [ ] Tests cover all variants, sizes, and edge cases
- [ ] Stories document all use cases
- [ ] Accessibility is properly implemented
- [ ] Performance impact is minimal
- [ ] Quality audit shows 100/100

### **Refactoring Opportunities**

```typescript
// Extract common patterns
const useComponentVariants = (variant, size) => {
  return React.useMemo(() => getVariantClasses(variant, size), [variant, size]);
};

// Shared accessibility hooks
const useAccessibilityProps = (role, labelledBy) => {
  return {
    role,
    'aria-labelledby': labelledBy,
    'aria-describedby': `${labelledBy}-description`,
  };
};
```

### **Documentation Updates**

Keep documentation current:

- Update component README when API changes
- Add new examples to Storybook
- Update tutorial series with new patterns
- Refresh quality guidelines as standards evolve

---

## 🚀 Next Steps

Master these advanced topics:

1. **🎨 [CVA Mastery](./03-cva-patterns.md)** - Deep dive into variant patterns
2. **🧪 [Testing Strategy](./06-testing-strategy.md)** - Advanced testing techniques
3. **📖 [Storybook Guide](./08-storybook-documentation.md)** - Professional documentation
4. **♿ [Accessibility](./05-accessibility-patterns.md)** - WCAG compliance patterns

---

## 💡 Pro Tips

- **Start with tests**: They define the perfect API
- **Use quality audit**: It catches issues before they become technical debt
- **Document everything**: Future you will thank present you
- **Think in variants**: CVA patterns scale beautifully
- **Measure performance**: Bundle size matters at scale

---

_Ready to build your first component? Check out the [First Component Tutorial](./04-first-component.md)!_ 🎯
