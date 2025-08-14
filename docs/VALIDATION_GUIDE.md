# 🛠️ Component Quality Validation Script

## Usage
```bash
# Validate a specific component
yarn validate:component Button

# Validate all components  
yarn validate:all

# Quick style check
yarn style:check
```

## What it checks:

### ✅ File Structure (25 points)
- [ ] `index.tsx` - Export file
- [ ] `component-name.tsx` - Main component
- [ ] `Component.stories.tsx` - Storybook stories
- [ ] `Component.test.tsx` - Test suite  
- [ ] `README.md` - Documentation (bonus)

### ✅ Component Interface (20 points)
- [ ] Uses CVA for variants
- [ ] Has `variant` prop with 4 options
- [ ] Has `size` prop with 4 options  
- [ ] Supports `loading`, `disabled`, `className`
- [ ] Uses `forwardRef` for proper refs

### ✅ Required Variants (16 points)
- [ ] Color variants: `default`, `success`, `warning`, `danger`
- [ ] Size variants: `sm`, `default`, `lg`, `xl`

### ✅ State Management (12 points)
- [ ] Loading state with spinner
- [ ] Disabled state with 50% opacity
- [ ] Error state handling

### ✅ Accessibility (12 points)  
- [ ] ARIA attributes present
- [ ] Keyboard navigation support
- [ ] Focus management
- [ ] Screen reader compatibility

### ✅ Testing Coverage (15 points)
- [ ] 5 test categories covered
- [ ] 30+ individual test cases
- [ ] Edge cases tested
- [ ] Accessibility tested

### ✅ Documentation (10 points)
- [ ] Required story types present
- [ ] Interactive examples
- [ ] All variants showcased
- [ ] Loading/disabled states shown

## Quality Gates

| Grade | Score | Status | Action |
|-------|-------|---------|---------|
| A+ | 90-100% | 🏆 Exceptional | Ship immediately |
| A | 80-89% | ✅ Excellent | Ready to ship |  
| B | 70-79% | ⚠️ Good | Minor fixes needed |
| C | 60-69% | 😐 Fair | Major improvements required |
| F | <60% | ❌ Poor | Complete rework needed |

## Manual Validation Checklist

Before running the script, manually verify:

1. **Visual Consistency**
   - [ ] Colors match design tokens exactly
   - [ ] Spacing follows 4px grid system
   - [ ] Typography uses font scale
   - [ ] Shadows and borders consistent

2. **Responsive Design**  
   - [ ] Works on mobile (320px+)
   - [ ] Works on tablet (768px+)  
   - [ ] Works on desktop (1024px+)
   - [ ] No horizontal scroll

3. **Browser Compatibility**
   - [ ] Chrome/Edge latest
   - [ ] Firefox latest
   - [ ] Safari latest
   - [ ] No console errors

4. **Performance**
   - [ ] Bundle size reasonable
   - [ ] Animations smooth (60fps)
   - [ ] No memory leaks
   - [ ] Fast render times

## Common Issues & Fixes

### ❌ "Missing required variant: default"
```tsx
// ❌ Wrong - missing default
const variants = cva("base", {
  variants: {
    variant: {
      success: "bg-green-500",
    }
  }
});

// ✅ Correct - includes default
const variants = cva("base", {
  variants: {
    variant: {
      default: "bg-gray-100",  // Add this
      success: "bg-green-500",
    }
  }
});
```

### ❌ "Missing required state: loading"
```tsx
// ❌ Wrong - no loading prop
interface Props {
  variant?: string;
}

// ✅ Correct - includes loading
interface Props {
  variant?: string;
  loading?: boolean;  // Add this
}

const Component = ({ loading, ...props }) => {
  if (loading) {
    return <div>Loading...</div>;  // Handle loading state
  }
  // ... rest of component
};
```

### ❌ "Missing test category: Accessibility"  
```tsx
// ❌ Wrong - missing a11y tests
describe('Button', () => {
  describe('Rendering', () => {
    it('renders');
  });
});

// ✅ Correct - includes a11y category
describe('Button', () => {
  describe('Rendering', () => {
    it('renders');
  });
  
  describe('Accessibility', () => {  // Add this
    it('has proper ARIA attributes');
    it('supports keyboard navigation');
  });
});
```

## Quick Fixes Script

```bash
# Fix common linting issues
yarn lint --fix

# Format all files  
yarn format

# Type check
yarn type-check

# Test specific component
yarn test Button

# Build to check for errors
yarn build
```

---

**Remember: 80% minimum score required before shipping any component.**
