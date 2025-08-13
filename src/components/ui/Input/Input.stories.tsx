import type { Meta, StoryObj } from '@storybook/nextjs';
import * as React from 'react';
import Input from './input';

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
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
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default input story
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

// Input types
export const Text: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter your name',
    label: 'Name',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter your email',
    label: 'Email Address',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter your password',
    label: 'Password',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: 'Enter a number',
    label: 'Age',
    min: 0,
    max: 120,
  },
};

export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
    label: 'Search',
  },
};

// States
export const WithLabel: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    helperText: 'Must be at least 8 characters long',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    type: 'email',
    value: 'invalid-email',
    error: 'Please enter a valid email address',
  },
};

export const Loading: Story = {
  args: {
    label: 'Username',
    placeholder: 'Checking availability...',
    loading: true,
    value: 'john_doe',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    placeholder: 'This field is disabled',
    disabled: true,
    value: 'Cannot edit this',
  },
};

// File input
export const FileUpload: Story = {
  args: {
    type: 'file',
    label: 'Upload File',
    accept: '.pdf,.doc,.docx',
  },
};

// Interactive examples
export const WithValidation: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);

      if (newValue.length < 3) {
        setError('Must be at least 3 characters');
      } else {
        setError('');
      }
    };

    return (
      <Input
        label="Username"
        placeholder="Enter username"
        value={value}
        onChange={handleChange}
        error={error}
        helperText={!error ? 'Choose a unique username' : undefined}
      />
    );
  },
};

// All input types showcase
export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <Input type="text" label="Text Input" placeholder="Enter text" />
      <Input type="email" label="Email Input" placeholder="Enter email" />
      <Input type="password" label="Password Input" placeholder="Enter password" />
      <Input type="number" label="Number Input" placeholder="Enter number" />
      <Input type="search" label="Search Input" placeholder="Search..." />
      <Input type="tel" label="Phone Input" placeholder="Enter phone" />
      <Input type="url" label="URL Input" placeholder="Enter URL" />
    </div>
  ),
};

// Input states showcase
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <Input label="Normal" placeholder="Normal input" />
      <Input label="With Helper" placeholder="With helper text" helperText="This is helper text" />
      <Input label="With Error" placeholder="With error" error="This field is required" />
      <Input label="Loading" placeholder="Loading..." loading />
      <Input label="Disabled" placeholder="Disabled" disabled />
    </div>
  ),
};

// Enhanced features showcase
export const EnhancedFeatures: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-4 w-96">
      <div>
        <h3 className="text-lg font-semibold mb-4">Enhanced Interactions</h3>
        <div className="flex flex-col gap-4">
          <Input
            label="Hover Effects"
            placeholder="Hover over this input"
            helperText="Notice the enhanced hover styling"
          />
          <Input
            label="Focus Enhancement"
            placeholder="Focus on this input"
            helperText="Enhanced focus ring for better accessibility"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Loading States</h3>
        <div className="flex flex-col gap-4">
          <Input label="Checking..." placeholder="Validating input..." loading />
          <Input label="Processing" placeholder="Saving data..." loading value="Processing..." />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Error States</h3>
        <div className="flex flex-col gap-4">
          <Input
            label="Email Validation"
            type="email"
            value="invalid-email"
            error="Please enter a valid email address"
          />
          <Input
            label="Required Field"
            placeholder="This field is required"
            error="This field cannot be empty"
          />
        </div>
      </div>
    </div>
  ),
};

// Form examples
export const FormExample: Story = {
  render: () => (
    <form className="flex flex-col gap-4 w-80 p-6 border rounded-lg">
      <h3 className="text-lg font-semibold mb-2">User Registration</h3>
      <Input
        label="Full Name"
        placeholder="Enter your full name"
        helperText="As it appears on official documents"
      />
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        helperText="We'll never share your email"
      />
      <Input
        label="Password"
        type="password"
        placeholder="Create a password"
        helperText="Must be at least 8 characters with numbers and symbols"
      />
      <Input label="Confirm Password" type="password" placeholder="Confirm your password" />
    </form>
  ),
};
