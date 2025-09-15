import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import './Button.scss';
import { Button } from './index';

/**
 * 📋 Button Component Stories
 *
 * Comprehensive examples of the Button component demonstrating:
 * - All variant states (default, destructive, outline, secondary, ghost, link)
 * - Size variants (sm, default, lg, icon)
 * - Loading and disabled states
 * - Accessibility features
 * - Real-world usage patterns
 *
 * Style Guide Compliance: ✅
 * - CVA variant system implementation
 * - Loading state with spinner animation
 * - Disabled state handling
 * - Proper accessibility attributes
 */

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**Button** - Enterprise-grade button component with comprehensive variants and states.

Features:
- **Multiple variants** for different contexts and hierarchies
- **Size options** from small to large including icon-only
- **Loading states** with built-in spinner animations
- **Full accessibility** with proper ARIA attributes and keyboard support
- **Flexible composition** with asChild prop for custom elements

Perfect for: Primary actions, form submissions, navigation, destructive actions
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Comprehensive Overview
export const AllVariants: Story = {
  name: '📋 All Variants Overview',
  render: () => (
    <div className="space-y-12 p-8">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Button Component Variants</h3>
        <p className="text-sm text-muted-foreground">
          Complete showcase of all button styles and states
        </p>
      </div>

      {/* Color Variants */}
      <div className="space-y-6">
        <h4 className="text-center text-md font-medium">Color Variants</h4>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="default">Default Button</Button>
          <Button variant="destructive">Destructive Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="link">Link Button</Button>
        </div>
      </div>

      {/* Size Variants */}
      <div className="space-y-6">
        <h4 className="text-center text-md font-medium">Size Variants</h4>
        <div className="flex flex-wrap justify-center items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">🎯</Button>
        </div>
      </div>

      {/* States */}
      <div className="space-y-6">
        <h4 className="text-center text-md font-medium">States</h4>
        <div className="flex flex-wrap justify-center gap-4">
          <Button loading>Loading Button</Button>
          <Button disabled>Disabled Button</Button>
          <Button variant="destructive" loading>
            Destructive Loading
          </Button>
          <Button variant="outline" disabled>
            Outline Disabled
          </Button>
        </div>
      </div>
    </div>
  ),
};

// Individual Variants
export const Default: Story = {
  name: '🔴 Default',
  args: {
    children: 'Default Button',
    variant: 'default',
  },
};

export const Destructive: Story = {
  name: '🔥 Destructive',
  args: {
    variant: 'destructive',
    children: 'Delete Item',
  },
};

export const Secondary: Story = {
  name: '⚪ Secondary',
  args: {
    variant: 'secondary',
    children: 'Secondary Action',
  },
};

export const Ghost: Story = {
  name: '👻 Ghost',
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const Outline: Story = {
  name: '🔲 Outline',
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
};

export const Link: Story = {
  name: '🔗 Link',
  args: {
    variant: 'link',
    children: 'Link Button',
  },
};

// Size Stories
export const Small: Story = {
  name: '📏 Small Size',
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

export const Large: Story = {
  name: '📐 Large Size',
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

export const IconOnly: Story = {
  name: '🎯 Icon Only',
  args: {
    size: 'icon',
    children: '🚀',
  },
};

// State Stories
export const LoadingState: Story = {
  name: '⏳ Loading State',
  args: {
    loading: true,
    children: 'Loading...',
  },
};

export const DisabledState: Story = {
  name: '🚫 Disabled State',
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

// Interactive Examples
export const ClickHandler: Story = {
  name: '🖱️ With Click Handler',
  args: {
    children: 'Click me!',
    onClick: () => alert('Button clicked!'),
  },
};

export const RealWorldExample: Story = {
  name: '🌍 Real-world Form',
  render: () => (
    <div className="space-y-6 p-6 max-w-md mx-auto bg-card border rounded-lg">
      <h3 className="text-lg font-semibold">Contact Form</h3>
      <div className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email..."
          className="w-full px-3 py-2 border rounded-md"
        />
        <textarea
          placeholder="Your message..."
          rows={3}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1">
          Cancel
        </Button>
        <Button className="flex-1">Send Message</Button>
      </div>
    </div>
  ),
};
