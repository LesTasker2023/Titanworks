import type { Meta, StoryObj } from '@storybook/nextjs';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile input component with multiple variants, sizes, states, and enhanced accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'filled', 'ghost'],
      description: 'The visual style variant of the input',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'The size of the input',
    },
    state: {
      control: 'select',
      options: ['default', 'error', 'success', 'warning'],
      description: 'The validation state of the input',
    },
    asChild: {
      control: 'boolean',
      description: 'When true, the component will render as a Slot',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    label: {
      control: 'text',
      description: 'Label text for the input',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the input',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message (overrides helperText and sets error state)',
    },
    successMessage: {
      control: 'text',
      description: 'Success message (overrides helperText and sets success state)',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'HTML input type',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    placeholder: 'Enter text...',
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    placeholder: 'Enter text...',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    placeholder: 'Enter text...',
  },
};

// Sizes
export const Small: Story = {
  args: {
    size: 'sm',
    placeholder: 'Small input...',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    placeholder: 'Large input...',
  },
};

// States
export const Error: Story = {
  args: {
    state: 'error',
    placeholder: 'Enter text...',
    defaultValue: 'invalid@email',
  },
};

export const Success: Story = {
  args: {
    state: 'success',
    placeholder: 'Enter text...',
    defaultValue: 'valid@email.com',
  },
};

export const Warning: Story = {
  args: {
    state: 'warning',
    placeholder: 'Enter text...',
    defaultValue: 'warning@email.com',
  },
};

// With labels and messages
export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email...',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    helperText: 'Must be at least 3 characters long',
    placeholder: 'Enter username...',
  },
};

export const WithErrorMessage: Story = {
  args: {
    label: 'Email',
    errorMessage: 'Please enter a valid email address',
    placeholder: 'Enter email...',
    defaultValue: 'invalid-email',
  },
};

export const WithSuccessMessage: Story = {
  args: {
    label: 'Email',
    successMessage: 'Email address is valid',
    placeholder: 'Enter email...',
    defaultValue: 'user@example.com',
  },
};

// Input types
export const EmailInput: Story = {
  args: {
    type: 'email',
    label: 'Email',
    placeholder: 'user@example.com',
  },
};

export const PasswordInput: Story = {
  args: {
    type: 'password',
    label: 'Password',
    placeholder: 'Enter password...',
  },
};

export const NumberInput: Story = {
  args: {
    type: 'number',
    label: 'Age',
    placeholder: '25',
  },
};

export const SearchInput: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
    variant: 'filled',
  },
};

// With icons
export const WithLeftIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    leftIcon: '🔍',
  },
};

export const WithRightIcon: Story = {
  args: {
    label: 'Status',
    placeholder: 'Enter status...',
    rightIcon: '✓',
    state: 'success',
  },
};

export const WithBothIcons: Story = {
  args: {
    label: 'Search with status',
    placeholder: 'Search...',
    leftIcon: '🔍',
    rightIcon: '✓',
  },
};

// States
export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot edit...',
    disabled: true,
    defaultValue: 'Disabled value',
  },
};

export const Required: Story = {
  args: {
    label: 'Required Field',
    placeholder: 'This field is required...',
    required: true,
    helperText: 'This field is required',
  },
};

// Complex example
export const ComplexForm: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <Input label="Full Name" placeholder="John Doe" required />
      <Input
        type="email"
        label="Email Address"
        placeholder="john@example.com"
        helperText="We'll never share your email"
        required
      />
      <Input
        type="password"
        label="Password"
        placeholder="Enter password"
        helperText="At least 8 characters"
        required
      />
      <Input type="tel" label="Phone Number" placeholder="+1 (555) 123-4567" variant="outline" />
      <Input label="Website" type="url" placeholder="https://example.com" variant="filled" />
    </div>
  ),
};

// Variant combinations
export const VariantShowcase: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <Input variant="default" placeholder="Default variant" />
      <Input variant="outline" placeholder="Outline variant" />
      <Input variant="filled" placeholder="Filled variant" />
      <Input variant="ghost" placeholder="Ghost variant" />
    </div>
  ),
};

export const SizeShowcase: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <Input size="sm" placeholder="Small size" />
      <Input size="default" placeholder="Default size" />
      <Input size="lg" placeholder="Large size" />
    </div>
  ),
};

export const StateShowcase: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <Input placeholder="Default state" />
      <Input state="error" placeholder="Error state" defaultValue="invalid input" />
      <Input state="success" placeholder="Success state" defaultValue="valid input" />
      <Input state="warning" placeholder="Warning state" defaultValue="warning input" />
    </div>
  ),
};
