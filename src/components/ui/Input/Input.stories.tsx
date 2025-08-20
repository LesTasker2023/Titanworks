import type { Meta, StoryObj } from '@storybook/nextjs';
import { Input } from './input';

/**
 * 📋 Input Component Stories
 *
 * Comprehensive examples of the Input component demonstrating:
 * - Various input types (text, email, password, etc.)
 * - Loading and disabled states
 * - Error handling and validation
 * - Label and helper text integration
 * - Accessibility features
 * - Real-world usage patterns
 *
 * Style Guide Compliance: ✅
 * - CVA variant system implementation
 * - Loading state with spinner animation
 * - Error state handling
 * - Proper accessibility attributes
 */

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**Input** - Enterprise-grade input component with comprehensive validation and states.

Features:
- **Multiple input types** for various data collection needs
- **Loading states** with visual feedback during async operations
- **Error handling** with clear validation messages
- **Full accessibility** with proper ARIA attributes and screen reader support
- **Flexible composition** with labels and helper text

Perfect for: Forms, search interfaces, data entry, user registration
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url', 'file'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    label: {
      control: { type: 'text' },
    },
    error: {
      control: { type: 'text' },
    },
    helperText: {
      control: { type: 'text' },
    },
    placeholder: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Comprehensive Overview
export const AllVariants: Story = {
  name: '📋 All Variants Overview',
  render: () => {
    return (
      <div className="space-y-12 p-8 max-w-2xl mx-auto">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Input Component Variants</h3>
          <p className="text-sm text-muted-foreground">
            Complete showcase of input types, states, and validation
          </p>
        </div>

        {/* Basic Inputs */}
        <div className="space-y-6">
          <h4 className="text-center text-md font-medium">Basic Inputs</h4>
          <div className="space-y-4">
            <Input placeholder="Default input..." />
            <Input placeholder="Email input..." type="email" />
            <Input placeholder="Password input..." type="password" />
            <Input placeholder="Search input..." type="search" />
          </div>
        </div>

        {/* States */}
        <div className="space-y-6">
          <h4 className="text-center text-md font-medium">States</h4>
          <div className="space-y-4">
            <Input loading placeholder="Loading input..." />
            <Input disabled placeholder="Disabled input..." />
            <Input placeholder="Input with error..." error="This field is required" />
            <Input
              placeholder="Input with helper text..."
              helperText="This is helpful information"
            />
          </div>
        </div>

        {/* With Labels */}
        <div className="space-y-6">
          <h4 className="text-center text-md font-medium">With Labels</h4>
          <div className="space-y-4">
            <Input label="Full Name" placeholder="Enter your full name..." />
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              helperText="We'll never share your email"
            />
            <Input
              label="Password"
              type="password"
              placeholder="Create a strong password"
              error="Password must be at least 8 characters"
            />
          </div>
        </div>
      </div>
    );
  },
};

// Individual Stories
export const Default: Story = {
  name: '📝 Default',
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  name: '🏷️ With Label',
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name...',
  },
};

export const Email: Story = {
  name: '📧 Email Type',
  args: {
    type: 'email',
    label: 'Email Address',
    placeholder: 'you@example.com',
    helperText: "We'll never share your email",
  },
};

export const Password: Story = {
  name: '🔒 Password Type',
  args: {
    type: 'password',
    label: 'Password',
    placeholder: 'Create a strong password',
  },
};

export const WithError: Story = {
  name: '❌ Error State',
  args: {
    label: 'Username',
    placeholder: 'Enter username...',
    error: 'This username is already taken',
  },
};

export const LoadingState: Story = {
  name: '⏳ Loading State',
  args: {
    label: 'Checking availability...',
    placeholder: 'Enter username...',
    loading: true,
  },
};

export const DisabledState: Story = {
  name: '🚫 Disabled State',
  args: {
    label: 'Read Only Field',
    placeholder: 'This field is disabled',
    disabled: true,
  },
};

export const RealWorldForm: Story = {
  name: '🌍 Real-world Registration Form',
  render: () => (
    <div className="space-y-6 p-6 max-w-md mx-auto bg-card border rounded-lg">
      <h3 className="text-lg font-semibold">Create Account</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="First Name" placeholder="John" />
          <Input label="Last Name" placeholder="Doe" />
        </div>

        <Input
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          helperText="We'll send a verification email"
        />

        <Input label="Password" type="password" placeholder="Create a strong password" />

        <Input label="Confirm Password" type="password" placeholder="Confirm your password" />
      </div>
    </div>
  ),
};
