import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';
import { Checkbox } from './checkbox';

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      description: 'The checked state of the checkbox',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the checkbox is disabled',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Whether the checkbox is in loading state',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the checkbox is required (shows asterisk)',
    },
    indeterminate: {
      control: { type: 'boolean' },
      description: 'Whether the checkbox is in indeterminate state',
    },
    label: {
      control: { type: 'text' },
      description: 'Label text for the checkbox',
    },
    error: {
      control: { type: 'text' },
      description: 'Error message to display',
    },
    helperText: {
      control: { type: 'text' },
      description: 'Helper text to display',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Stories
export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    label: 'Checked checkbox',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled checkbox',
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
    label: 'Disabled checked checkbox',
  },
};

// Enhanced Features Stories
export const WithHelperText: Story = {
  args: {
    label: 'Subscribe to newsletter',
    helperText: 'You can unsubscribe at any time',
  },
};

export const WithError: Story = {
  args: {
    label: 'Accept terms and conditions',
    error: 'You must accept the terms to continue',
  },
};

export const Required: Story = {
  args: {
    label: 'I agree to the terms of service',
    required: true,
    helperText: 'This field is required',
  },
};

export const Loading: Story = {
  args: {
    label: 'Saving preferences...',
    loading: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Select all items',
    indeterminate: true,
    helperText: 'Some items are selected',
  },
};

// Complex Examples
export const ErrorWithRequired: Story = {
  args: {
    label: 'I have read and accept the privacy policy',
    required: true,
    error: 'You must accept the privacy policy to proceed',
  },
};

export const LoadingWithHelperText: Story = {
  args: {
    label: 'Enable notifications',
    loading: true,
    helperText: 'Updating notification preferences...',
  },
};

// Showcase Stories
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic States</h3>
        <div className="flex flex-col gap-3">
          <Checkbox label="Unchecked" />
          <Checkbox label="Checked" checked />
          <Checkbox label="Disabled" disabled />
          <Checkbox label="Disabled Checked" disabled checked />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Enhanced Features</h3>
        <div className="flex flex-col gap-3">
          <Checkbox label="With Helper Text" helperText="Additional context information" />
          <Checkbox label="Required Field" required helperText="This field is mandatory" />
          <Checkbox label="Error State" error="Please check this box to continue" />
          <Checkbox label="Loading State" loading />
          <Checkbox label="Indeterminate State" indeterminate />
        </div>
      </div>
    </div>
  ),
};

export const FormExamples: Story = {
  render: () => (
    <div className="max-w-md mx-auto p-6 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Registration Form</h3>
      <div className="space-y-4">
        <Checkbox
          label="I agree to the Terms of Service"
          required
          helperText="Please read our terms before continuing"
        />
        <Checkbox
          label="Subscribe to marketing emails"
          helperText="Get updates about new features and promotions"
        />
        <Checkbox label="I am over 18 years old" required />
        <Checkbox
          label="Enable two-factor authentication"
          helperText="Recommended for enhanced security"
        />
      </div>
    </div>
  ),
};

export const GroupManagement: Story = {
  render: () => (
    <div className="max-w-sm mx-auto p-6 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Permissions</h3>
      <div className="space-y-3">
        <Checkbox
          label="All permissions"
          indeterminate
          helperText="Some permissions are selected"
        />
        <div className="ml-6 space-y-2">
          <Checkbox label="Read access" checked />
          <Checkbox label="Write access" />
          <Checkbox label="Delete access" />
          <Checkbox label="Admin access" checked />
        </div>
      </div>
    </div>
  ),
};

export const LoadingStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      <h3 className="text-lg font-semibold mb-2">Loading States</h3>
      <div className="space-y-3">
        <Checkbox
          label="Saving user preferences..."
          loading
          helperText="Please wait while we update your settings"
        />
        <Checkbox label="Connecting to server..." loading />
        <Checkbox label="Processing payment..." loading helperText="This may take a few seconds" />
      </div>
    </div>
  ),
};

export const ErrorValidation: Story = {
  render: () => (
    <div className="max-w-md mx-auto p-6 border border-destructive/20 rounded-lg">
      <h3 className="text-lg font-semibold mb-4 text-destructive">Form Validation Errors</h3>
      <div className="space-y-4">
        <Checkbox
          label="I accept the terms and conditions"
          required
          error="You must accept the terms to continue"
        />
        <Checkbox
          label="I am at least 18 years old"
          required
          error="You must be 18 or older to register"
        />
        <Checkbox
          label="I want to receive email notifications"
          error="Please select your email preferences"
        />
      </div>
    </div>
  ),
};

export const InteractiveDemo: Story = {
  render: () => {
    const [settings, setSettings] = React.useState({
      notifications: false,
      marketing: false,
      security: true,
      analytics: false,
    });

    const handleChange = (key: keyof typeof settings) => (checked: boolean) => {
      setSettings(prev => ({ ...prev, [key]: checked }));
    };

    return (
      <div className="max-w-md mx-auto p-6 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
        <div className="space-y-4">
          <Checkbox
            label="Email notifications"
            checked={settings.notifications}
            onCheckedChange={handleChange('notifications')}
            helperText="Receive updates about your account"
          />
          <Checkbox
            label="Marketing communications"
            checked={settings.marketing}
            onCheckedChange={handleChange('marketing')}
            helperText="Get news about products and features"
          />
          <Checkbox
            label="Enhanced security"
            checked={settings.security}
            onCheckedChange={handleChange('security')}
            helperText="Enable additional security features"
            required
          />
          <Checkbox
            label="Usage analytics"
            checked={settings.analytics}
            onCheckedChange={handleChange('analytics')}
            helperText="Help us improve the product"
          />
        </div>

        <div className="mt-6 p-3 bg-muted rounded text-sm">
          <strong>Current Settings:</strong>
          <pre className="mt-2 text-xs">{JSON.stringify(settings, null, 2)}</pre>
        </div>
      </div>
    );
  },
};

export const AccessibilityDemo: Story = {
  render: () => (
    <div className="max-w-lg mx-auto p-6 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Accessibility Features</h3>
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 rounded border-l-4 border-blue-400">
          <p className="text-sm text-blue-700 mb-3">
            <strong>Keyboard Navigation:</strong> Use Tab to navigate, Space to toggle
          </p>
          <Checkbox label="Focus me with Tab key" helperText="Try navigating with keyboard" />
        </div>

        <div className="p-4 bg-green-50 rounded border-l-4 border-green-400">
          <p className="text-sm text-green-700 mb-3">
            <strong>Screen Reader Support:</strong> Proper labels and descriptions
          </p>
          <Checkbox
            label="Screen reader friendly"
            helperText="This checkbox has proper ARIA attributes"
            required
          />
        </div>

        <div className="p-4 bg-purple-50 rounded border-l-4 border-purple-400">
          <p className="text-sm text-purple-700 mb-3">
            <strong>High Contrast Support:</strong> Visible in high contrast mode
          </p>
          <Checkbox
            label="High contrast compatible"
            helperText="Visible with accessibility settings"
          />
        </div>
      </div>
    </div>
  ),
};
