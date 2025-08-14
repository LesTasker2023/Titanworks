# 🛠️ Component Validation Guide

_Complete quality assurance and testing guide_

---

## **🚀 Quick Commands**

```bash
# Validate single component
.\scripts\validate-quick.ps1 -ComponentPath "src\components\ui\Button"

# Full validation
node scripts\validate-component.js src\components\ui\Button

# Run deductive audit (outputs to reports/ folder)
powershell scripts\deductive-audit.ps1

# Build test
yarn build

# Lint check
yarn lint --fix
```

---

## **📊 Validation Scoring System**

**Target Score: 80%+ required for shipping**

### **File Structure (25 points)**

- ✅ `index.tsx` exists (5 pts)
- ✅ `component-name.tsx` exists (5 pts)
- ✅ `ComponentName.stories.tsx` exists (5 pts)
- ✅ `ComponentName.test.tsx` exists (5 pts)
- ✅ Proper folder structure (5 pts)

### **Component Interface (20 points)**

- ✅ Uses CVA for variants (5 pts)
- ✅ Has `variant` prop with 4 options (5 pts)
- ✅ Has `size` prop with 4 options (5 pts)
- ✅ Supports `loading`, `disabled`, `className` props (5 pts)

### **Required Variants (16 points)**

- ✅ `default` variant implemented (4 pts)
- ✅ `success` variant implemented (4 pts)
- ✅ `warning` variant implemented (4 pts)
- ✅ `danger` variant implemented (4 pts)

### **Size Variants (16 points)**

- ✅ `sm` size implemented (4 pts)
- ✅ `default` size implemented (4 pts)
- ✅ `lg` size implemented (4 pts)
- ✅ `xl` size implemented (4 pts)

### **State Management (12 points)**

- ✅ Loading state with spinner (4 pts)
- ✅ Disabled state with 50% opacity (4 pts)
- ✅ Error state handling (4 pts)

### **Testing Coverage (15 points)**

- ✅ 30+ test cases (5 pts)
- ✅ All test categories covered (5 pts)
  - Rendering tests
  - Variant tests
  - Event tests
  - Enhanced features tests
  - Edge case tests
  - Accessibility tests
- ✅ Edge cases tested (5 pts)

### **Story Coverage (12 points)**

- ✅ 10+ stories (4 pts)
- ✅ All required stories (8 pts)
  - AllVariants story
  - AllSizes story
  - LoadingState story
  - DisabledState story

### **Build & Quality (8 points)**

- ✅ Build passes without errors (4 pts)
- ✅ Lint passes without errors (4 pts)

---

## **🧪 Test Categories Required**

### **1. Rendering Tests**

```typescript
describe('Rendering', () => {
  it('renders without crashing');
  it('displays correct content');
  it('applies custom className');
  it('forwards ref correctly');
});
```

### **2. Variant Tests**

```typescript
describe('Variants', () => {
  it('renders default variant');
  it('renders success variant');
  it('renders warning variant');
  it('renders danger variant');
});
```

### **3. Size Tests**

```typescript
describe('Sizes', () => {
  it('renders sm size');
  it('renders default size');
  it('renders lg size');
  it('renders xl size');
});
```

### **4. Event Tests**

```typescript
describe('Events', () => {
  it('handles click events');
  it('handles keyboard events');
  it('prevents events when disabled');
});
```

### **5. Enhanced Features**

```typescript
describe('Enhanced Features', () => {
  it('shows loading spinner');
  it('applies disabled state');
  it('handles loading and disabled together');
});
```

### **6. Edge Cases**

```typescript
describe('Edge Cases', () => {
  it('handles empty props');
  it('handles invalid variant');
  it('handles extremely long content');
});
```

### **7. Accessibility**

```typescript
describe('Accessibility', () => {
  it('has proper ARIA attributes');
  it('supports keyboard navigation');
  it('maintains focus management');
  it('works with screen readers');
});
```

---

## **📚 Story Categories Required**

### **Essential Stories (minimum 10)**

```typescript
export const Default: Story = { args: {} }

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Component variant="default" />
      <Component variant="success" />
      <Component variant="warning" />
      <Component variant="danger" />
    </div>
  )
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-2 items-center">
      <Component size="sm" />
      <Component size="default" />
      <Component size="lg" />
      <Component size="xl" />
    </div>
  )
}

export const LoadingState: Story = {
  args: { loading: true }
}

export const DisabledState: Story = {
  args: { disabled: true }
}

// Additional stories for comprehensive coverage
export const SuccessState: Story = { args: { variant: "success" } }
export const WarningState: Story = { args: { variant: "warning" } }
export const DangerState: Story = { args: { variant: "danger" } }
export const SmallSize: Story = { args: { size: "sm" } }
export const LargeSize: Story = { args: { size: "lg" } }
export const ExtraLargeSize: Story = { args: { size: "xl" } }
```

---

## **🚦 Quality Checklist**

Before marking a component complete, verify:

### **Development Checklist**

- [ ] Component follows CVA pattern
- [ ] All 4 variants implemented (default, success, warning, danger)
- [ ] All 4 sizes implemented (sm, default, lg, xl)
- [ ] Loading state with spinner
- [ ] Disabled state with visual feedback
- [ ] Proper TypeScript interfaces
- [ ] forwardRef implementation

### **Testing Checklist**

- [ ] 30+ test cases written
- [ ] All 7 test categories covered
- [ ] Edge cases tested
- [ ] Accessibility tests pass
- [ ] All tests pass with `yarn test`

### **Story Checklist**

- [ ] 10+ stories created
- [ ] AllVariants story shows all 4 variants
- [ ] AllSizes story shows all 4 sizes
- [ ] LoadingState and DisabledState stories
- [ ] Stories render without errors

### **Quality Gates**

- [ ] `yarn build` passes without errors
- [ ] `yarn lint` passes without errors
- [ ] Validation script shows 80%+ score
- [ ] No console warnings or errors
- [ ] Component works in component showcase

---

## **🏆 Validation Script Output**

When you run validation, you should see:

```
Quick Style Guide Validation for ComponentName
==================================================

Checking file structure...
  [OK] index.tsx exists
  [OK] ComponentName.stories.tsx exists
  [OK] ComponentName.test.tsx exists

Checking required variants...
  [OK] default variant found
  [OK] success variant found
  [OK] warning variant found
  [OK] danger variant found
  [OK] sm size found
  [OK] default size found
  [OK] lg size found
  [OK] xl size found
  [OK] loading prop found
  [OK] disabled prop found

Checking test coverage...
  Found 35 test cases
  [OK] Test count meets requirement (30 or more)
  [OK] Rendering test category found
  [OK] Variants test category found
  [OK] Events test category found
  [OK] Enhanced Features test category found
  [OK] Edge Cases test category found
  [OK] Accessibility test category found

Checking story coverage...
  Found 14 stories
  [OK] Story count meets requirement (10 or more)
  [OK] AllVariants story found
  [OK] AllSizes story found
  [OK] LoadingState story found
  [OK] DisabledState story found

Running quick validation tests...
  [OK] Build passes
  [OK] Lint passes

==================================================
Quick validation complete!
```

**Target: All [OK] indicators, 80%+ overall score**
