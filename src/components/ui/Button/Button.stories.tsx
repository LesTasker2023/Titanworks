import type { Meta, StoryObj } from '@storybook/nextjs';
import Button from './button';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
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
    asChild: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default button story
export const Default: Story = {
  args: {
    children: 'Button',
  },
};

// All variants
export const Primary: Story = {
  args: {
    variant: 'default',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link Button',
  },
};

// Different sizes
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

export const Icon: Story = {
  args: {
    size: 'icon',
    children: '🚀',
  },
};

// States
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
};

// Interactive examples
export const WithOnClick: Story = {
  args: {
    children: 'Click me!',
    onClick: () => alert('Button clicked!'),
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">🎯</Button>
    </div>
  ),
};

// Real-world examples
export const ActionButtons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>Save Changes</Button>
      <Button variant="outline">Cancel</Button>
      <Button variant="destructive">Delete Item</Button>
    </div>
  ),
};

// SCSS Enhanced Features
export const EnhancedFeatures: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Loading States</h3>
        <div className="flex gap-4">
          <Button loading>Saving...</Button>
          <Button variant="outline" loading>
            Processing...
          </Button>
          <Button variant="destructive" loading>
            Deleting...
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Enhanced Hover Effects</h3>
        <div className="flex gap-4">
          <Button>Hover me!</Button>
          <Button variant="destructive">Destructive with gradient</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Button Groups</h3>
        <div className="button-group">
          <Button variant="outline">Group 1</Button>
          <Button variant="outline">Group 2</Button>
          <Button variant="outline">Group 3</Button>
        </div>
      </div>
    </div>
  ),
};

export const FormButtons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <Button type="submit" className="w-full">
        Submit Form
      </Button>
      <Button type="button" variant="secondary" className="w-full">
        Reset Form
      </Button>
    </div>
  ),
};
