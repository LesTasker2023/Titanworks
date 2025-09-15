import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from './RadioGroup';
import './RadioGroup.scss';

const meta = {
  title: 'UI/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
    },
    required: {
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
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="option1" />
        <label htmlFor="option1">Option 1</label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="option2" />
        <label htmlFor="option2">Option 2</label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option3" id="option3" />
        <label htmlFor="option3">Option 3</label>
      </div>
    </RadioGroup>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <RadioGroup label="Choose your preference" defaultValue="option1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="pref1" />
        <label htmlFor="pref1">Option 1</label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="pref2" />
        <label htmlFor="pref2">Option 2</label>
      </div>
    </RadioGroup>
  ),
};

export const WithError: Story = {
  render: () => (
    <RadioGroup label="Required selection" error="Please select an option">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="err1" />
        <label htmlFor="err1">Option 1</label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="err2" />
        <label htmlFor="err2">Option 2</label>
      </div>
    </RadioGroup>
  ),
};

export const Required: Story = {
  render: () => (
    <RadioGroup label="Required selection" required>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="req1" />
        <label htmlFor="req1">Option 1</label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="req2" />
        <label htmlFor="req2">Option 2</label>
      </div>
    </RadioGroup>
  ),
};

export const Loading: Story = {
  render: () => (
    <RadioGroup label="Loading state" loading>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="load1" />
        <label htmlFor="load1">Option 1</label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="load2" />
        <label htmlFor="load2">Option 2</label>
      </div>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup label="Disabled state" disabled defaultValue="option1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="dis1" />
        <label htmlFor="dis1">Option 1 (Selected)</label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="dis2" />
        <label htmlFor="dis2">Option 2</label>
      </div>
    </RadioGroup>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <RadioGroup label="Choose your plan" helperText="You can change this later in settings">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="basic" id="basic" />
        <label htmlFor="basic">Basic Plan</label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="pro" id="pro" />
        <label htmlFor="pro">Pro Plan</label>
      </div>
    </RadioGroup>
  ),
};

export const ControlledRadioGroup: Story = {
  render: () => {
    const [value, setValue] = useState('option2');

    return (
      <div className="space-y-4">
        <RadioGroup
          label="Controlled Radio Group"
          value={value}
          onValueChange={setValue}
          helperText={`Selected: ${value}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option1" id="ctrl1" />
            <label htmlFor="ctrl1">Option 1</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option2" id="ctrl2" />
            <label htmlFor="ctrl2">Option 2</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option3" id="ctrl3" />
            <label htmlFor="ctrl3">Option 3</label>
          </div>
        </RadioGroup>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 text-xs bg-blue-500 text-white rounded"
            onClick={() => setValue('option1')}
          >
            Select Option 1
          </button>
          <button
            className="px-3 py-1 text-xs bg-blue-500 text-white rounded"
            onClick={() => setValue('option3')}
          >
            Select Option 3
          </button>
        </div>
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      theme: 'light',
      notifications: 'email',
    });

    return (
      <div className="space-y-6 max-w-md">
        <h3 className="text-lg font-semibold">Settings</h3>

        <RadioGroup
          label="Theme Preference"
          value={formData.theme}
          onValueChange={value => setFormData({ ...formData, theme: value })}
          required
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="light" id="light" />
            <label htmlFor="light">Light Mode</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dark" id="dark" />
            <label htmlFor="dark">Dark Mode</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="system" id="system" />
            <label htmlFor="system">System Default</label>
          </div>
        </RadioGroup>

        <RadioGroup
          label="Notification Preference"
          value={formData.notifications}
          onValueChange={value => setFormData({ ...formData, notifications: value })}
          helperText="Choose how you'd like to receive updates"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="email" id="email" />
            <label htmlFor="email">Email Only</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="push" id="push" />
            <label htmlFor="push">Push Notifications</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="both" id="both" />
            <label htmlFor="both">Both Email & Push</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="none" id="none" />
            <label htmlFor="none">No Notifications</label>
          </div>
        </RadioGroup>

        <div className="p-4 bg-gray-50 rounded text-sm">
          <strong>Selected:</strong>
          <br />
          Theme: {formData.theme}
          <br />
          Notifications: {formData.notifications}
        </div>
      </div>
    );
  },
};

export const EnhancedFeatures: Story = {
  render: () => (
    <div className="space-y-8">
      <RadioGroup label="Required with Error" required error="This field is required">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="yes" id="enhanced1" />
          <label htmlFor="enhanced1">Yes</label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="no" id="enhanced2" />
          <label htmlFor="enhanced2">No</label>
        </div>
      </RadioGroup>

      <RadioGroup label="Loading State" loading helperText="Please wait...">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option1" id="enhanced3" />
          <label htmlFor="enhanced3">Option 1</label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option2" id="enhanced4" />
          <label htmlFor="enhanced4">Option 2</label>
        </div>
      </RadioGroup>
    </div>
  ),
};

export const AccessibilityShowcase: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Accessibility Features</h3>
        <ul className="text-sm text-gray-600 mb-6 space-y-1">
          <li>• Keyboard navigation with arrow keys</li>
          <li>• Proper ARIA attributes and roles</li>
          <li>• Screen reader friendly labels</li>
          <li>• High contrast mode support</li>
          <li>• Reduced motion support</li>
        </ul>
      </div>

      <RadioGroup
        label="Accessible Radio Group"
        helperText="Use arrow keys to navigate, space to select"
        required
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="accessibility" id="a11y1" />
          <label htmlFor="a11y1">High Contrast Mode</label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="keyboard" id="a11y2" />
          <label htmlFor="a11y2">Keyboard Navigation</label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="screen-reader" id="a11y3" />
          <label htmlFor="a11y3">Screen Reader Support</label>
        </div>
      </RadioGroup>
    </div>
  ),
};
