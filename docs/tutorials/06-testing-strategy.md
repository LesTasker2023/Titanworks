# 🧪 Testing Strategy & Excellence

_Master comprehensive testing patterns that ensure bulletproof components and 100% confidence in production_

---

## 🎯 What You'll Learn

- **Testing Philosophy**: Why we test and what makes great tests
- **Testing Stack**: Vitest, React Testing Library, and advanced patterns
- **Test Categories**: The 7 essential types of component tests
- **Quality Metrics**: Coverage, performance, and accessibility testing
- **Advanced Patterns**: Mocking, async testing, and edge cases

---

## 🏆 Testing Philosophy

> **"Tests are not about proving your code works - they're about proving your code works the way users expect"**

### **Our Testing Principles**

```typescript
const TESTING_PRINCIPLES = {
  userFocused: 'Test behavior, not implementation',
  comprehensive: 'Cover all user interaction paths',
  maintainable: 'Tests should be easy to read and update',
  fast: 'Sub-second feedback loop',
  reliable: 'No flaky tests, ever',
  accessible: 'Include accessibility in every test',
} as const;
```

### **The Testing Pyramid**

```
        🔺 E2E Tests (Few)
       Integration Tests (Some)
    📊 Unit Tests (Many) 🧩 Component Tests
```

**For component libraries, we focus heavily on:**

- **Component Tests** (70%): User interaction simulation
- **Unit Tests** (25%): Pure function logic
- **Integration Tests** (5%): Component composition

---

## ⚡ Testing Stack

### **🚀 Vitest - The Fast Test Runner**

```typescript
// vitest.config.ts - Optimized for speed and DX
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom', // DOM simulation
    globals: true, // No need to import expect/describe
    setupFiles: './src/test-setup.ts',
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test-setup.ts'],
    },
    // Performance optimizations
    isolate: false, // Faster test execution
    pool: 'threads', // Use worker threads
    poolOptions: {
      threads: { singleThread: true },
    },
  },
});
```

**Why Vitest over Jest?**

- ⚡ **10x faster**: Native ES modules, no transpilation
- 🎯 **Better DX**: Built-in TypeScript support
- 🔄 **Watch mode**: Instant feedback on changes
- 📊 **Coverage**: Built-in, no additional setup

### **🎭 React Testing Library - User-Centric Testing**

```typescript
// Our testing approach focuses on user behavior
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { expect } from 'vitest';

// ❌ Testing implementation details
expect(component.state.isOpen).toBe(true);

// ✅ Testing user behavior
expect(screen.getByRole('dialog')).toBeInTheDocument();
```

**Key Principles:**

- **Query by role/label**: How users interact with elements
- **Fire real events**: Click, type, focus - like real users
- **Assert on behavior**: What users see and experience

---

## 🧪 The 7 Essential Test Categories

Every TriggerKings component follows this comprehensive testing pattern:

### **1. 🎨 Rendering Tests**

```typescript
describe('Button - Rendering', () => {
  it('renders without crashing', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('displays correct content', () => {
    render(<Button>Save Changes</Button>);
    expect(screen.getByRole('button', { name: 'Save Changes' })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Button className="custom-btn">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-btn');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Test</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
```

**Why These Tests Matter:**

- Prevents basic regression bugs
- Ensures component contract is maintained
- Validates React patterns (ref forwarding)

### **2. 🎨 Variant Tests**

```typescript
describe('Button - Variants', () => {
  it('renders default variant', () => {
    render(<Button variant="default">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-primary', 'text-primary-foreground');
  });

  it('renders success variant', () => {
    render(<Button variant="success">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-green-600', 'text-white');
  });

  it('renders warning variant', () => {
    render(<Button variant="warning">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-yellow-600', 'text-white');
  });

  it('renders danger variant', () => {
    render(<Button variant="danger">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-red-600', 'text-white');
  });
});
```

**CVA Testing Pattern:**

```typescript
// Test all variant combinations systematically
const variants = ['default', 'success', 'warning', 'danger'] as const;
const sizes = ['sm', 'default', 'lg', 'xl'] as const;

variants.forEach(variant => {
  sizes.forEach(size => {
    it(`renders ${variant} variant with ${size} size`, () => {
      render(<Button variant={variant} size={size}>Test</Button>);
      // Assert correct classes are applied
    });
  });
});
```

### **3. 📏 Size Tests**

```typescript
describe('Button - Sizes', () => {
  it('renders small size', () => {
    render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-8', 'px-3', 'text-xs');
  });

  it('renders large size', () => {
    render(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-12', 'px-8', 'text-base');
  });
});
```

### **4. 🖱️ Event Tests**

```typescript
describe('Button - Events', () => {
  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('handles keyboard events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Press me</Button>);

    const button = screen.getByRole('button');
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('prevents events when disabled', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} disabled>Disabled</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
```

### **5. ⚙️ Enhanced Features Tests**

```typescript
describe('Button - Enhanced Features', () => {
  it('shows loading spinner', () => {
    render(<Button loading>Loading...</Button>);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    // Button should still be clickable but show loading state
  });

  it('applies disabled state', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50');
  });

  it('handles loading and disabled together', () => {
    render(<Button loading disabled>Complex State</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
});
```

### **6. 🚧 Edge Cases Tests**

```typescript
describe('Button - Edge Cases', () => {
  it('handles empty props gracefully', () => {
    render(<Button />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles invalid variant gracefully', () => {
    // @ts-expect-error Testing runtime behavior
    render(<Button variant="invalid">Test</Button>);
    // Should fallback to default variant
    expect(screen.getByRole('button')).toHaveClass('bg-primary');
  });

  it('handles extremely long content', () => {
    const longText = 'A'.repeat(1000);
    render(<Button>{longText}</Button>);
    expect(screen.getByRole('button')).toHaveTextContent(longText);
  });

  it('handles rapid state changes', async () => {
    const TestComponent = () => {
      const [loading, setLoading] = React.useState(false);
      return (
        <div>
          <Button
            loading={loading}
            onClick={() => setLoading(!loading)}
          >
            Toggle Loading
          </Button>
        </div>
      );
    };

    render(<TestComponent />);
    const button = screen.getByRole('button');

    // Rapidly toggle loading state
    for (let i = 0; i < 10; i++) {
      fireEvent.click(button);
      await waitFor(() => {
        // Should handle rapid state changes without errors
      });
    }
  });
});
```

### **7. ♿ Accessibility Tests**

```typescript
describe('Button - Accessibility', () => {
  it('has proper ARIA attributes', () => {
    render(<Button aria-label="Save document">Save</Button>);
    expect(screen.getByRole('button', { name: 'Save document' })).toBeInTheDocument();
  });

  it('supports keyboard navigation', () => {
    render(<Button>Accessible Button</Button>);
    const button = screen.getByRole('button');

    button.focus();
    expect(button).toHaveFocus();

    fireEvent.keyDown(button, { key: 'Tab' });
    // Should follow natural tab order
  });

  it('maintains focus management', async () => {
    render(
      <div>
        <Button>First</Button>
        <Button>Second</Button>
      </div>
    );

    const firstButton = screen.getByRole('button', { name: 'First' });
    const secondButton = screen.getByRole('button', { name: 'Second' });

    firstButton.focus();
    expect(firstButton).toHaveFocus();

    fireEvent.keyDown(firstButton, { key: 'Tab' });
    expect(secondButton).toHaveFocus();
  });

  it('works with screen readers', () => {
    render(
      <Button
        disabled
        aria-describedby="help-text"
        aria-label="Submit form (currently disabled)"
      >
        Submit
      </Button>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Submit form (currently disabled)');
    expect(button).toHaveAttribute('aria-describedby', 'help-text');
    expect(button).toBeDisabled();
  });
});
```

---

## 📊 Advanced Testing Patterns

### **🎭 Mocking External Dependencies**

```typescript
// Mock expensive operations
vi.mock('@/lib/api', () => ({
  fetchUserData: vi.fn().mockResolvedValue({ name: 'John Doe' })
}));

// Mock Radix UI components for isolated testing
vi.mock('@radix-ui/react-dialog', () => ({
  Root: ({ children }: { children: React.ReactNode }) => <div data-testid="dialog-root">{children}</div>,
  Trigger: ({ children }: { children: React.ReactNode }) => <button data-testid="dialog-trigger">{children}</button>,
  Content: ({ children }: { children: React.ReactNode }) => <div data-testid="dialog-content">{children}</div>
}));
```

### **⏱️ Async Testing Patterns**

```typescript
describe('Dialog - Async Behavior', () => {
  it('handles async open/close transitions', async () => {
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Async Dialog</DialogTitle>
          <DialogDescription>Loading content...</DialogDescription>
        </DialogContent>
      </Dialog>
    );

    // Trigger dialog opening
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));

    // Wait for dialog to appear
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    }, { timeout: 2000 });

    // Test dialog content
    expect(screen.getByText('Async Dialog')).toBeInTheDocument();
  });

  it('handles loading states correctly', async () => {
    const AsyncButton = () => {
      const [loading, setLoading] = React.useState(false);

      const handleClick = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 100));
        setLoading(false);
      };

      return <Button loading={loading} onClick={handleClick}>Submit</Button>;
    };

    render(<AsyncButton />);
    const button = screen.getByRole('button');

    // Should start not loading
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();

    // Click and verify loading state
    fireEvent.click(button);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });
  });
});
```

### **🎯 Custom Testing Utilities**

```typescript
// src/test-utils.tsx - Enhanced testing utilities
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';

// Wrapper with common providers
function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="test-environment">
      {/* Add any global providers here */}
      {children}
    </div>
  );
}

// Custom render function
function render(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return rtlRender(ui, { wrapper: TestWrapper, ...options });
}

// Helper for testing component variants
export function testAllVariants<T extends Record<string, any>>(
  Component: React.ComponentType<T>,
  baseProps: T,
  variants: Record<keyof T, any[]>
) {
  Object.entries(variants).forEach(([propName, values]) => {
    values.forEach(value => {
      it(`renders with ${propName}="${value}"`, () => {
        render(<Component {...baseProps} {[propName]: value} />);
        // Add assertions based on expected behavior
      });
    });
  });
}

// Export everything
export * from '@testing-library/react';
export { render };
```

---

## 🎯 Quality Metrics & Coverage

### **📊 Coverage Requirements**

```typescript
// vitest.config.ts - Quality gates
export default defineConfig({
  test: {
    coverage: {
      threshold: {
        global: {
          statements: 80, // 80% of statements tested
          branches: 80, // 80% of code branches tested
          functions: 80, // 80% of functions tested
          lines: 80, // 80% of lines tested
        },
      },
      include: ['src/components/**/*.{ts,tsx}'],
      exclude: ['src/components/**/*.stories.tsx', 'src/components/**/index.tsx', 'src/test-utils.tsx'],
    },
  },
});
```

### **🎯 Component Quality Score**

Our quality audit system scores components based on:

```typescript
interface ComponentQuality {
  testCount: number; // 30+ tests required
  testCategories: TestCategory[]; // All 7 categories covered
  coverage: {
    statements: number; // >80%
    branches: number; // >80%
    functions: number; // >80%
    lines: number; // >80%
  };
  accessibility: boolean; // A11y tests present
  edgeCases: boolean; // Edge case coverage
  performance: boolean; // No performance regressions
}

// Quality scoring algorithm
function calculateQualityScore(quality: ComponentQuality): number {
  const scores = {
    testCount: quality.testCount >= 30 ? 20 : (quality.testCount / 30) * 20,
    categories: quality.testCategories.length >= 7 ? 25 : (quality.testCategories.length / 7) * 25,
    coverage: (Math.min(quality.coverage.statements, quality.coverage.branches) / 100) * 25,
    accessibility: quality.accessibility ? 15 : 0,
    edgeCases: quality.edgeCases ? 10 : 0,
    performance: quality.performance ? 5 : 0,
  };

  return Object.values(scores).reduce((sum, score) => sum + score, 0);
}
```

---

## 🚀 Running Tests

### **📝 Daily Development**

```bash
# Run all tests
yarn test

# Watch mode (recommended during development)
yarn test --watch

# Run specific test file
yarn test Button.test.tsx

# Run tests for changed files only
yarn test --changed

# Run with coverage
yarn test --coverage

# Run tests in UI mode (great for debugging)
yarn test --ui
```

### **🎯 Debugging Tests**

```typescript
describe('Button - Debug Mode', () => {
  it('debugs component state', () => {
    render(<Button variant="success">Debug Me</Button>);

    // Debug DOM structure
    screen.debug();

    // Debug specific element
    screen.debug(screen.getByRole('button'));

    // Use debugger breakpoint
    // debugger;

    // Check all queries
    screen.logTestingPlaygroundURL();
  });
});
```

### **⚡ Performance Testing**

```typescript
import { performance } from 'perf_hooks';

describe('Button - Performance', () => {
  it('renders quickly under load', () => {
    const start = performance.now();

    // Render many buttons
    render(
      <div>
        {Array.from({ length: 1000 }, (_, i) => (
          <Button key={i} variant={i % 2 === 0 ? 'default' : 'success'}>
            Button {i}
          </Button>
        ))}
      </div>
    );

    const end = performance.now();
    const renderTime = end - start;

    // Should render 1000 buttons in under 100ms
    expect(renderTime).toBeLessThan(100);
  });
});
```

---

## 🎉 Best Practices & Pro Tips

### **✅ Do's**

- **Test user behavior**, not implementation details
- **Use descriptive test names** that explain the expected behavior
- **Group related tests** with consistent describe blocks
- **Test error states** and edge cases thoroughly
- **Keep tests simple** - one assertion per test when possible
- **Use real user interactions** (click, type, focus)
- **Test accessibility** in every component

### **❌ Don'ts**

- Don't test internal component state directly
- Don't test CSS classes unless they affect behavior
- Don't write tests that break when you refactor
- Don't mock everything - test as close to production as possible
- Don't skip edge cases and error conditions
- Don't forget to test keyboard navigation
- Don't ignore accessibility testing

### **🎯 Pro Tips**

```typescript
// ✅ Good: Test behavior
expect(screen.getByRole('button')).toBeDisabled();

// ❌ Bad: Test implementation
expect(component.props.disabled).toBe(true);

// ✅ Good: Descriptive test names
it('disables button and shows loading spinner when submitting form');

// ❌ Bad: Generic test names
it('works correctly');

// ✅ Good: User-focused queries
screen.getByRole('button', { name: 'Save changes' });

// ❌ Bad: Implementation-focused queries
screen.getByTestId('save-btn');
```

---

## 🔗 Next Steps

Now that you understand our testing philosophy:

1. **Practice**: Try writing tests for a simple component
2. **Explore**: Check out [Component Testing Patterns](./10-component-testing.md)
3. **Master**: Learn [Accessibility Testing](./11-accessibility-testing.md)
4. **Integrate**: Set up [Continuous Integration](./22-continuous-integration.md)

---

## 📚 Additional Resources

- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Vitest Documentation](https://vitest.dev/)
- [Accessibility Testing Guide](https://web.dev/accessibility/)

---

_Testing is not about catching bugs - it's about building confidence. With these patterns, you'll ship components knowing they work exactly as users expect._ 🎯
