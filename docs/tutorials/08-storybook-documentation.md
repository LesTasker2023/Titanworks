# 📖 Storybook Documentation Guide

_Master component documentation: Create professional, interactive component libraries with Storybook_

---

## 🎯 What You'll Learn

- Storybook setup and configuration mastery
- Story writing patterns and best practices
- Interactive documentation techniques
- Advanced addons and customization
- Documentation generation and deployment
- Quality assurance through visual testing

---

## 🚀 Storybook Philosophy at Daedalus

Storybook is our **component documentation powerhouse** - creating living, interactive documentation that serves developers, designers, and stakeholders:

```typescript
// The Daedalus Documentation Strategy
const STORYBOOK_GOALS = {
  showcase: 'Demonstrate all component variants and states',
  playground: 'Interactive testing environment for developers',
  documentation: 'Self-documenting API with examples',
  testing: 'Visual regression and interaction testing',
  collaboration: 'Bridge between design and development',
} as const;

// Quality Standards
const STORY_REQUIREMENTS = {
  coverage: 'All variants, sizes, and states',
  interactivity: 'Controls for all props',
  accessibility: 'A11y addon integration',
  documentation: 'Comprehensive prop descriptions',
  examples: 'Real-world usage scenarios',
} as const;
```

---

## ⚙️ Storybook Configuration

### **Main Configuration**

```typescript
// .storybook/main.ts - Complete configuration
import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';

const config: StorybookConfig = {
  // Story discovery
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)', '../docs/**/*.stories.@(js|jsx|ts|tsx|mdx)'],

  // Essential addons
  addons: [
    '@storybook/addon-essentials', // Core functionality
    '@storybook/addon-a11y', // Accessibility testing
    '@storybook/addon-interactions', // Interactive testing
    '@storybook/addon-coverage', // Test coverage
    '@storybook/addon-design-tokens', // Design system integration
    '@storybook/addon-docs', // Auto-generated documentation
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  // TypeScript configuration
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },

  // Vite configuration
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
        },
      },
      define: {
        'process.env.NODE_ENV': JSON.stringify(configType.toLowerCase()),
      },
    });
  },

  // Documentation features
  docs: {
    autodocs: 'tag',
    defaultName: 'Documentation',
  },
};

export default config;
```

### **Preview Configuration**

```typescript
// .storybook/preview.ts - Global story settings
import type { Preview } from '@storybook/react';
import { withThemeByClassName } from '@storybook/addon-themes';
import '../src/app/globals.css'; // Import Tailwind

const preview: Preview = {
  parameters: {
    // Action addon
    actions: { argTypesRegex: '^on[A-Z].*' },

    // Controls addon
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    // Documentation
    docs: {
      theme: 'light',
      source: {
        state: 'open',
        type: 'dynamic',
      },
    },

    // Accessibility addon
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'focus-trap',
            enabled: true,
          },
        ],
      },
    },

    // Viewport addon
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '667px' },
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1200px', height: '800px' },
        },
      },
    },

    // Layout
    layout: 'centered',

    // Background
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
        { name: 'gray', value: '#f5f5f5' },
      ],
    },
  },

  // Global decorators
  decorators: [
    // Theme switcher
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),

    // Padding decorator for better component display
    (Story) => (
      <div style={{ padding: '20px' }}>
        <Story />
      </div>
    ),
  ],

  // Global arg types
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: { category: 'Styling' },
    },
    children: {
      control: 'text',
      description: 'Content to be rendered inside the component',
      table: { category: 'Content' },
    },
  },

  tags: ['autodocs'],
};

export default preview;
```

---

## 🎨 Story Writing Patterns

### **Complete Button Story Example**

```typescript
// Button.stories.tsx - Comprehensive story implementation
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { expect, within, userEvent } from '@storybook/test';
import Button from './button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,

  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The Button component is the foundation of interactive elements in Daedalus.
It supports multiple variants, sizes, and states while maintaining full accessibility compliance.

## Features
- 🎨 **4 Variants**: default, success, warning, danger
- 📏 **4 Sizes**: sm, default, lg, xl
- 🔄 **States**: loading, disabled
- ♿ **Accessible**: Full WCAG 2.1 AA compliance
- 🎯 **CVA Powered**: Consistent variant system

## Usage
\`\`\`tsx
import Button from '@/components/ui/Button';

<Button variant="success" size="lg" onClick={handleClick}>
  Click me!
</Button>
\`\`\`
        `,
      },
    },
  },

  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger'],
      description: 'Visual variant of the button',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
      description: 'Size of the button',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'default' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading spinner and disables interaction',
      table: { category: 'State' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button and reduces opacity',
      table: { category: 'State' },
    },
    children: {
      control: 'text',
      description: 'Button content (text, icons, etc.)',
      table: { category: 'Content' },
    },
    onClick: {
      action: 'clicked',
      description: 'Called when button is clicked',
      table: { category: 'Events' },
    },
  },

  args: {
    onClick: fn(),
    children: 'Button',
  },

  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ===== ESSENTIAL STORIES =====

export const Default: Story = {
  args: {
    children: 'Default Button',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button variant="default">Default</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button variants side by side for visual comparison.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button sizes demonstrating the scaling system.',
      },
    },
  },
};

export const LoadingState: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button in loading state with spinner animation.',
      },
    },
  },
};

export const DisabledState: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button in disabled state - cannot be interacted with.',
      },
    },
  },
};

// ===== VARIANT STORIES =====

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success Action',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning Action',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Destructive Action',
  },
};

// ===== SIZE STORIES =====

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    children: 'Extra Large Button',
  },
};

// ===== ADVANCED STORIES =====

export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button>
        <span className="mr-2">🚀</span>
        Launch
      </Button>
      <Button variant="success">
        <span className="mr-2">✅</span>
        Confirm
      </Button>
      <Button variant="danger">
        <span className="mr-2">🗑️</span>
        Delete
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with icons for enhanced visual communication.',
      },
    },
  },
};

export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      {/* Form buttons */}
      <div className="space-y-2">
        <h3 className="font-medium">Form Actions</h3>
        <div className="flex gap-2">
          <Button variant="success">Save Changes</Button>
          <Button variant="default">Cancel</Button>
        </div>
      </div>

      {/* Alert actions */}
      <div className="space-y-2">
        <h3 className="font-medium">Alert Actions</h3>
        <div className="flex gap-2">
          <Button variant="danger" size="sm">Delete Account</Button>
          <Button variant="default" size="sm">Keep Account</Button>
        </div>
      </div>

      {/* Loading states */}
      <div className="space-y-2">
        <h3 className="font-medium">Async Actions</h3>
        <div className="flex gap-2">
          <Button loading>Saving...</Button>
          <Button variant="success" disabled>Saved ✓</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world usage examples showing buttons in context.',
      },
    },
  },
};

// ===== INTERACTIVE STORIES =====

export const InteractivePlayground: Story = {
  args: {
    variant: 'default',
    size: 'default',
    loading: false,
    disabled: false,
    children: 'Interactive Button',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    // Test initial state
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveTextContent('Interactive Button');

    // Test interaction
    await userEvent.click(button);
    await expect(button).toHaveFocus();
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground with automated testing. Try changing the controls!',
      },
    },
  },
};

// ===== ACCESSIBILITY STORIES =====

export const AccessibilityDemo: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium mb-2">Focus Management</h3>
        <div className="flex gap-2">
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">ARIA Labels</h3>
        <div className="flex gap-2">
          <Button aria-label="Close dialog">×</Button>
          <Button aria-describedby="help-text">Help</Button>
        </div>
        <p id="help-text" className="text-sm text-gray-600 mt-1">
          This button provides help information
        </p>
      </div>

      <div>
        <h3 className="font-medium mb-2">Keyboard Navigation</h3>
        <p className="text-sm text-gray-600 mb-2">
          Use Tab to navigate, Enter/Space to activate
        </p>
        <div className="flex gap-2">
          <Button>Tab 1</Button>
          <Button>Tab 2</Button>
          <Button disabled>Disabled (Skipped)</Button>
          <Button>Tab 3</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accessibility features demonstration including focus management, ARIA attributes, and keyboard navigation.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'focus-trap', enabled: true },
          { id: 'keyboard', enabled: true },
        ],
      },
    },
  },
};

// ===== COMPOUND VARIANT STORIES =====

export const CompoundVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium mb-2">Danger + Large (Extra Shadow)</h3>
        <Button variant="danger" size="lg">Destructive Action</Button>
      </div>

      <div>
        <h3 className="font-medium mb-2">Success + Extra Large</h3>
        <Button variant="success" size="xl">Major Success</Button>
      </div>

      <div>
        <h3 className="font-medium mb-2">Loading + Variants</h3>
        <div className="flex gap-2">
          <Button variant="default" loading>Loading Default</Button>
          <Button variant="success" loading>Loading Success</Button>
          <Button variant="danger" loading>Loading Danger</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Compound variant combinations showing how CVA handles complex interactions.',
      },
    },
  },
};
```

---

## 🎯 Advanced Story Patterns

### **Multi-Component Stories**

```typescript
// Dialog.stories.tsx - Complex component stories
export const CompleteDialogWorkflow: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>
          Open Dialog
        </Button>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent variant="success" size="lg">
            <DialogHeader>
              <DialogTitle>Success Dialog</DialogTitle>
              <DialogDescription>
                This dialog demonstrates a complete workflow with multiple components working together.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <Input placeholder="Enter your name" />
              <Textarea placeholder="Tell us about yourself" />
              <div className="flex items-center space-x-2">
                <Checkbox id="agree" />
                <label htmlFor="agree">I agree to the terms</label>
              </div>
            </div>

            <DialogFooter>
              <Button variant="default" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="success" onClick={() => setIsOpen(false)}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete dialog workflow showing component composition and interaction.',
      },
    },
  },
};
```

### **Interactive Test Stories**

```typescript
// Interactive testing with play functions
export const AutomatedInteractionTest: Story = {
  args: {
    variant: 'success',
    children: 'Test Button',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    // Initial state verification
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveTextContent('Test Button');
    await expect(button).toHaveClass('bg-green-600');

    // Interaction testing
    await userEvent.hover(button);
    await expect(button).toHaveClass('hover:bg-green-700');

    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);

    // Keyboard testing
    await userEvent.keyboard('{Tab}');
    await expect(button).toHaveFocus();

    await userEvent.keyboard('{Enter}');
    await expect(args.onClick).toHaveBeenCalledTimes(2);
  },
};
```

### **Responsive Stories**

```typescript
// Responsive behavior stories
export const ResponsiveBehavior: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="block sm:hidden">
        <Button size="sm" className="w-full">Mobile Button</Button>
      </div>
      <div className="hidden sm:block lg:hidden">
        <Button size="default" className="w-auto">Tablet Button</Button>
      </div>
      <div className="hidden lg:block">
        <Button size="lg" className="w-auto">Desktop Button</Button>
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
    docs: {
      description: {
        story: 'Responsive button behavior across different screen sizes. Change the viewport to see the effect.',
      },
    },
  },
};
```

---

## 📚 Documentation Generation

### **Auto-Generated API Documentation**

````typescript
// Enhanced component with comprehensive JSDoc
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Visual variant of the button
   * @default "default"
   */
  variant?: 'default' | 'success' | 'warning' | 'danger';

  /**
   * Size of the button
   * @default "default"
   */
  size?: 'sm' | 'default' | 'lg' | 'xl';

  /**
   * Shows loading spinner and disables interaction
   * @default false
   */
  loading?: boolean;

  /**
   * Disables the button and reduces opacity
   * @default false
   */
  disabled?: boolean;

  /**
   * Content to be rendered inside the button
   */
  children?: React.ReactNode;

  /**
   * Additional CSS classes to apply
   */
  className?: string;
}

/**
 * Button component - The foundation of interactive elements
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Button onClick={() => console.log('clicked')}>
 *   Click me
 * </Button>
 *
 * // With variant and size
 * <Button variant="success" size="lg">
 *   Large Success Button
 * </Button>
 *
 * // Loading state
 * <Button loading>
 *   Saving...
 * </Button>
 * ```
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(...);
````

### **Custom Documentation Pages**

````mdx
<!-- Button.mdx - Custom documentation page -->

import { Meta, Story, Canvas, Controls, Description } from '@storybook/addon-docs';
import Button from './button';

<Meta title="UI/Button" component={Button} />

# Button Component

<Description of={Button} />

## Overview

The Button component is the cornerstone of user interactions in Daedalus. Built with accessibility-first principles and powered by CVA for consistent variants.

### Key Features

- **🎨 Semantic Variants**: Success, warning, danger states
- **📏 Flexible Sizing**: From compact to extra large
- **♿ Accessible**: WCAG 2.1 AA compliant
- **🔄 States**: Loading and disabled support
- **⚡ Performance**: Optimized with CVA

## Quick Start

```tsx
import Button from '@/components/ui/Button';

function MyComponent() {
  return (
    <Button variant="success" onClick={handleClick}>
      Get Started
    </Button>
  );
}
```
````

## Examples

### Basic Usage

<Canvas>
  <Story id="ui-button--default" />
</Canvas>

### All Variants

<Canvas>
  <Story id="ui-button--all-variants" />
</Canvas>

### Interactive Controls

<Canvas>
  <Story id="ui-button--interactive-playground" />
</Canvas>

<Controls />

## Best Practices

### ✅ Do

- Use semantic variants (success for positive actions, danger for destructive)
- Provide loading states for async operations
- Include proper ARIA labels for icon-only buttons
- Test with keyboard navigation

### ❌ Don't

- Mix multiple variants on the same button
- Use tiny buttons for touch interfaces
- Forget to disable during loading states
- Skip accessibility testing

## Accessibility Guidelines

The Button component follows WCAG 2.1 AA guidelines:

- **Keyboard Navigation**: Fully operable with Tab, Enter, and Space keys
- **Focus Management**: Clear focus indicators and logical tab order
- **Screen Reader Support**: Proper semantic markup and ARIA attributes
- **Color Contrast**: All variants meet AA contrast requirements

## Technical Details

### CVA Implementation

The Button uses Class-Variance-Authority for consistent styling:

```tsx
const buttonVariants = cva('inline-flex items-center justify-center rounded-md font-medium transition-colors', {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      success: 'bg-green-600 text-white hover:bg-green-700',
      // ... other variants
    },
    size: {
      sm: 'h-9 px-3 text-xs',
      default: 'h-10 px-4 py-2',
      // ... other sizes
    },
  },
});
```

### Performance Considerations

- **Bundle Size**: ~2.3KB gzipped
- **Runtime**: Optimized re-render performance
- **Tree Shaking**: Import only what you need

## Related Components

- **[Icon Button](/?path=/docs/ui-iconbutton--docs)** - For icon-only actions
- **[Button Group](/?path=/docs/ui-buttongroup--docs)** - For related actions
- **[Loading Button](/?path=/docs/ui-loadingbutton--docs)** - Specialized loading states

````

---

## 🎨 Visual Testing & Quality

### **Chromatic Integration**

```typescript
// .storybook/test-runner.ts - Visual testing configuration
import type { TestRunnerConfig } from '@storybook/test-runner';
import { checkA11y, injectAxe } from 'axe-playwright';

const config: TestRunnerConfig = {
  setup() {
    // Setup global test configuration
  },

  async preRender(page) {
    // Inject axe for accessibility testing
    await injectAxe(page);
  },

  async postRender(page) {
    // Run accessibility tests
    await checkA11y(page, '#storybook-root', {
      detailedReport: true,
      detailedReportOptions: { html: true },
    });
  },
};

export default config;
````

### **Visual Regression Testing**

```typescript
// .storybook/main.ts - Chromatic configuration
const config: StorybookConfig = {
  // ... other config

  // Chromatic configuration for visual testing
  features: {
    buildStoriesJson: true,
  },

  env: (config) => ({
    ...config,
    CHROMATIC_PROJECT_TOKEN: process.env.CHROMATIC_PROJECT_TOKEN,
  }),
};

// chromatic.config.json
{
  "projectToken": "your-project-token",
  "buildScriptName": "build-storybook",
  "exitZeroOnChanges": true,
  "ignoreLastBuildOnBranch": "main",
  "skip": [
    "**/node_modules/**",
    "**/*.test.*"
  ],
  "externals": [
    "public/**"
  ]
}
```

---

## 🚀 Advanced Customization

### **Custom Addons**

```typescript
// .storybook/addons/design-system-addon.ts
import { addons, types } from '@storybook/manager-api';
import { AddonPanel } from '@storybook/components';
import React from 'react';

const ADDON_ID = 'design-system';
const PANEL_ID = `${ADDON_ID}/panel`;

// Design system panel component
const DesignSystemPanel = () => {
  return (
    <AddonPanel>
      <div style={{ padding: '20px' }}>
        <h2>Design System Info</h2>
        <div>
          <h3>Colors</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ width: '50px', height: '50px', backgroundColor: '#3b82f6' }} />
            <div style={{ width: '50px', height: '50px', backgroundColor: '#10b981' }} />
            <div style={{ width: '50px', height: '50px', backgroundColor: '#f59e0b' }} />
            <div style={{ width: '50px', height: '50px', backgroundColor: '#ef4444' }} />
          </div>
        </div>

        <div>
          <h3>Typography</h3>
          <div style={{ fontFamily: 'Inter, sans-serif' }}>
            <p style={{ fontSize: '12px' }}>Small (12px)</p>
            <p style={{ fontSize: '14px' }}>Default (14px)</p>
            <p style={{ fontSize: '16px' }}>Large (16px)</p>
            <p style={{ fontSize: '18px' }}>Extra Large (18px)</p>
          </div>
        </div>
      </div>
    </AddonPanel>
  );
};

// Register the addon
addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Design System',
    render: ({ active, key }) => (
      <DesignSystemPanel key={key} />
    ),
  });
});
```

### **Custom Decorators**

```typescript
// .storybook/decorators.tsx - Advanced decorators
import React from 'react';
import { DecoratorFn } from '@storybook/react';

// Layout decorator with multiple options
export const withLayout: DecoratorFn = (Story, context) => {
  const layout = context.parameters.layout || 'centered';

  const layouts = {
    centered: 'flex items-center justify-center min-h-screen p-4',
    fullscreen: 'w-full h-screen',
    padded: 'p-8',
    grid: 'grid grid-cols-3 gap-4 p-8',
  };

  return (
    <div className={layouts[layout]}>
      <Story />
    </div>
  );
};

// Performance monitoring decorator
export const withPerformance: DecoratorFn = (Story, context) => {
  React.useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      console.log(`Story "${context.name}" render time: ${endTime - startTime}ms`);
    };
  }, [context.name]);

  return <Story />;
};

// Mock data provider decorator
export const withMockData: DecoratorFn = (Story, context) => {
  const mockData = context.parameters.mockData || {};

  return (
    <MockDataProvider data={mockData}>
      <Story />
    </MockDataProvider>
  );
};
```

---

## 📊 Analytics & Insights

### **Story Usage Analytics**

```typescript
// .storybook/analytics.ts - Track story usage
import { addons } from '@storybook/manager-api';
import { STORY_CHANGED } from '@storybook/core-events';

// Track which stories are viewed most
const storyViewCounts = new Map();

addons.getChannel().on(STORY_CHANGED, data => {
  const storyId = data.storyId;
  const currentCount = storyViewCounts.get(storyId) || 0;
  storyViewCounts.set(storyId, currentCount + 1);

  // Send to analytics service
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'story_view', {
      story_id: storyId,
      story_name: data.name,
    });
  }
});

// Export usage data
export const getStoryAnalytics = () => {
  return Array.from(storyViewCounts.entries())
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10); // Top 10 most viewed stories
};
```

### **Component Coverage Report**

```typescript
// scripts/story-coverage.ts - Generate coverage report
import fs from 'fs';
import path from 'path';
import glob from 'glob';

interface CoverageReport {
  component: string;
  storiesCount: number;
  variantsCovered: string[];
  sizesCovered: string[];
  statesCovered: string[];
  completionPercentage: number;
}

const generateCoverageReport = (): CoverageReport[] => {
  const componentPaths = glob.sync('src/components/ui/**/*.tsx');
  const storyPaths = glob.sync('src/components/ui/**/*.stories.tsx');

  return componentPaths
    .filter(path => !path.includes('.test.') && !path.includes('.stories.'))
    .map(componentPath => {
      const componentName = path.basename(componentPath, '.tsx');
      const storyPath = storyPaths.find(p => p.includes(componentName));

      if (!storyPath) {
        return {
          component: componentName,
          storiesCount: 0,
          variantsCovered: [],
          sizesCovered: [],
          statesCovered: [],
          completionPercentage: 0,
        };
      }

      const storyContent = fs.readFileSync(storyPath, 'utf-8');

      // Analyze story content for coverage
      const storiesCount = (storyContent.match(/export const \w+: Story/g) || []).length;
      const variantsCovered = ['default', 'success', 'warning', 'danger'].filter(variant =>
        storyContent.includes(`variant="${variant}"`)
      );
      const sizesCovered = ['sm', 'default', 'lg', 'xl'].filter(size => storyContent.includes(`size="${size}"`));
      const statesCovered = ['loading', 'disabled'].filter(state => storyContent.includes(`${state}={true}`));

      const expectedStories = 10; // Minimum expected stories per component
      const completionPercentage = Math.min(100, (storiesCount / expectedStories) * 100);

      return {
        component: componentName,
        storiesCount,
        variantsCovered,
        sizesCovered,
        statesCovered,
        completionPercentage,
      };
    });
};

// Generate and save report
const report = generateCoverageReport();
fs.writeFileSync('reports/story-coverage.json', JSON.stringify(report, null, 2));

console.log('📊 Story Coverage Report Generated:');
report.forEach(item => {
  const status = item.completionPercentage >= 80 ? '✅' : '⚠️';
  console.log(`${status} ${item.component}: ${item.completionPercentage.toFixed(1)}% (${item.storiesCount} stories)`);
});
```

---

## 🚀 Deployment & Publishing

### **Build & Deploy Configuration**

```typescript
// package.json - Storybook scripts
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "storybook:test": "test-storybook",
    "storybook:test:ci": "concurrently -k -s first \"npm run build-storybook && npx http-server storybook-static --port 6006\" \"wait-on tcp:6006 && npm run storybook:test\"",
    "chromatic": "chromatic --exit-zero-on-changes",
    "deploy-storybook": "storybook-to-ghpages"
  }
}

// GitHub Actions deployment
name: Deploy Storybook

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout
      uses: actions/checkout@v4
      with:
        fetch-depth: 0

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'yarn'

    - name: Install dependencies
      run: yarn install --frozen-lockfile

    - name: Build Storybook
      run: yarn build-storybook

    - name: Run visual tests
      run: yarn chromatic --project-token=${{ secrets.CHROMATIC_PROJECT_TOKEN }}

    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./storybook-static
```

---

## 💡 Best Practices Summary

### **Story Writing Guidelines**

**✅ DO:**

- Write comprehensive examples for all variants and states
- Include real-world usage scenarios
- Add interactive controls for all props
- Document accessibility features
- Use descriptive story names
- Include automated testing with play functions
- Provide proper JSDoc comments

**❌ DON'T:**

- Skip edge cases and error states
- Write overly complex stories that are hard to understand
- Forget to test responsive behavior
- Ignore accessibility requirements
- Use magic numbers without explanation
- Skip visual regression testing

### **Documentation Standards**

- **Completeness**: Cover all props, variants, and use cases
- **Clarity**: Use clear, concise descriptions
- **Examples**: Provide multiple real-world examples
- **Accessibility**: Document A11y features and requirements
- **Performance**: Include bundle size and performance notes
- **Migration**: Document any breaking changes or migration paths

---

## 🎯 Next Steps

Enhance your Storybook mastery with:

1. **♿ [Accessibility Integration](./05-accessibility-patterns.md)** - Deep A11y testing in Storybook
2. **⚡ [Performance Monitoring](./07-performance-optimization.md)** - Bundle analysis and optimization
3. **🔄 [Design System Integration](./11-design-system.md)** - Connect with design tools
4. **🚀 [Advanced Deployment](./12-deployment.md)** - Production deployment strategies

---

## 💫 Pro Tips

- **Story-driven development**: Write stories before implementing components
- **Visual regression**: Use Chromatic for automated visual testing
- **Interactive documentation**: Stories should be playgrounds, not just galleries
- **Performance monitoring**: Track story load times and bundle sizes
- **Real data**: Use realistic data in your examples
- **Accessibility first**: Test with screen readers and keyboard navigation
- **Mobile-first**: Test stories on mobile viewports

---

_Storybook mastery achieved! Your components now have world-class documentation._ 📖✨
