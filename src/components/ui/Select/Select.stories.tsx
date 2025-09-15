import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './Select';
import './Select.scss';

const meta = {
  title: 'UI/Select',
  component: Select,
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
    searchable: {
      control: { type: 'boolean' },
    },
    clearable: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Stories
export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
        <SelectItem value="grape">Grape</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <Select label="Choose Fruit" helperText="Select your favorite fruit">
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
        <SelectItem value="grape">Grape</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithError: Story = {
  render: () => (
    <Select label="Required Field" error="This field is required" required>
      <SelectTrigger className="w-[250px]" error>
        <SelectValue placeholder="Please select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Required: Story = {
  render: () => (
    <Select label="Required Selection" required helperText="This field must be completed">
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="important">Important Option</SelectItem>
        <SelectItem value="urgent">Urgent Option</SelectItem>
        <SelectItem value="normal">Normal Option</SelectItem>
      </SelectContent>
    </Select>
  ),
};

// States
export const Loading: Story = {
  render: () => (
    <Select label="Loading Options" helperText="Options are being loaded...">
      <SelectTrigger className="w-[250px]" loading>
        <SelectValue placeholder="Loading..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="loading1">Loading Option 1</SelectItem>
        <SelectItem value="loading2">Loading Option 2</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select label="Disabled Select" helperText="This select is currently disabled" disabled>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Cannot select" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="disabled1">Disabled Option 1</SelectItem>
        <SelectItem value="disabled2">Disabled Option 2</SelectItem>
      </SelectContent>
    </Select>
  ),
};

// Advanced Features
export const WithGroups: Story = {
  render: () => (
    <Select label="Select Framework" helperText="Choose your preferred development framework">
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a framework" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Frontend Frameworks</SelectLabel>
          <SelectItem value="react">React</SelectItem>
          <SelectItem value="vue">Vue.js</SelectItem>
          <SelectItem value="angular">Angular</SelectItem>
          <SelectItem value="svelte">Svelte</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Backend Frameworks</SelectLabel>
          <SelectItem value="express">Express.js</SelectItem>
          <SelectItem value="fastify">Fastify</SelectItem>
          <SelectItem value="koa">Koa.js</SelectItem>
          <SelectItem value="nest">NestJS</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Full Stack</SelectLabel>
          <SelectItem value="nextjs">Next.js</SelectItem>
          <SelectItem value="nuxt">Nuxt.js</SelectItem>
          <SelectItem value="remix">Remix</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const WithSearch: Story = {
  render: () => (
    <Select label="Searchable Countries" helperText="Type to search for a country">
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Search countries..." />
      </SelectTrigger>
      <SelectContent searchable>
        <SelectItem value="us">United States</SelectItem>
        <SelectItem value="ca">Canada</SelectItem>
        <SelectItem value="uk">United Kingdom</SelectItem>
        <SelectItem value="de">Germany</SelectItem>
        <SelectItem value="fr">France</SelectItem>
        <SelectItem value="jp">Japan</SelectItem>
        <SelectItem value="au">Australia</SelectItem>
        <SelectItem value="br">Brazil</SelectItem>
        <SelectItem value="in">India</SelectItem>
        <SelectItem value="cn">China</SelectItem>
        <SelectItem value="mx">Mexico</SelectItem>
        <SelectItem value="es">Spain</SelectItem>
        <SelectItem value="it">Italy</SelectItem>
        <SelectItem value="nl">Netherlands</SelectItem>
        <SelectItem value="se">Sweden</SelectItem>
        <SelectItem value="no">Norway</SelectItem>
        <SelectItem value="dk">Denmark</SelectItem>
        <SelectItem value="fi">Finland</SelectItem>
        <SelectItem value="ch">Switzerland</SelectItem>
        <SelectItem value="at">Austria</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithDisabledOptions: Story = {
  render: () => (
    <Select label="Select Plan" helperText="Some plans may not be available">
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Choose your plan" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="free">Free Plan</SelectItem>
        <SelectItem value="basic">Basic Plan - $9/month</SelectItem>
        <SelectItem value="pro">Pro Plan - $29/month</SelectItem>
        <SelectItem value="enterprise" disabled>
          Enterprise Plan - Contact Sales
        </SelectItem>
        <SelectItem value="custom" disabled>
          Custom Plan - Coming Soon
        </SelectItem>
      </SelectContent>
    </Select>
  ),
};

// Interactive Examples
export const ControlledSelect: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-80">
        <Select
          value={value}
          onValueChange={setValue}
          label="Controlled Selection"
          helperText={`Current value: ${value || '(none)'}`}
        >
          <SelectTrigger>
            <SelectValue placeholder="Make a selection..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">First Option</SelectItem>
            <SelectItem value="option2">Second Option</SelectItem>
            <SelectItem value="option3">Third Option</SelectItem>
            <SelectItem value="option4">Fourth Option</SelectItem>
          </SelectContent>
        </Select>

        <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
          <strong>Selected Value:</strong> {value || '(none selected)'}
          <br />
          <button
            className="mt-2 px-3 py-1 [background-color:hsl(var(--surface-interactive))] [color:hsl(var(--content-inverse))] rounded text-xs hover:[background-color:hsl(var(--surface-interactive)/0.9)]"
            onClick={() => setValue('')}
          >
            Clear Selection
          </button>
        </div>
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      priority: '',
      category: '',
      assignee: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors: Record<string, string> = {};

      if (!formData.priority) {
        newErrors.priority = 'Priority is required';
      }
      if (!formData.category) {
        newErrors.category = 'Category is required';
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        alert('Form submitted successfully!\n' + JSON.stringify(formData, null, 2));
      }
    };

    return (
      <form onSubmit={handleSubmit} className="w-96 space-y-6">
        <Select
          value={formData.priority}
          onValueChange={(value: string) => setFormData(prev => ({ ...prev, priority: value }))}
          label="Priority"
          error={errors.priority}
          required
        >
          <SelectTrigger error={!!errors.priority}>
            <SelectValue placeholder="Select priority level..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="critical">🔴 Critical</SelectItem>
            <SelectItem value="high">🟠 High</SelectItem>
            <SelectItem value="medium">🟡 Medium</SelectItem>
            <SelectItem value="low">🟢 Low</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={formData.category}
          onValueChange={(value: string) => setFormData(prev => ({ ...prev, category: value }))}
          label="Category"
          error={errors.category}
          helperText="Choose the most relevant category"
          required
        >
          <SelectTrigger error={!!errors.category}>
            <SelectValue placeholder="Select category..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Development</SelectLabel>
              <SelectItem value="bug">Bug Fix</SelectItem>
              <SelectItem value="feature">New Feature</SelectItem>
              <SelectItem value="improvement">Improvement</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Operations</SelectLabel>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="deployment">Deployment</SelectItem>
              <SelectItem value="monitoring">Monitoring</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={formData.assignee}
          onValueChange={(value: string) => setFormData(prev => ({ ...prev, assignee: value }))}
          label="Assignee (Optional)"
          helperText="Leave empty for automatic assignment"
        >
          <SelectTrigger>
            <SelectValue placeholder="Select assignee..." />
          </SelectTrigger>
          <SelectContent searchable>
            <SelectItem value="alice">Alice Johnson (Frontend)</SelectItem>
            <SelectItem value="bob">Bob Smith (Backend)</SelectItem>
            <SelectItem value="charlie">Charlie Brown (Full Stack)</SelectItem>
            <SelectItem value="diana">Diana Prince (DevOps)</SelectItem>
            <SelectItem value="eve">Eve Wilson (QA)</SelectItem>
            <SelectItem value="frank">Frank Miller (Design)</SelectItem>
          </SelectContent>
        </Select>

        <button
          type="submit"
          className="w-full px-4 py-2 [background-color:hsl(var(--surface-interactive))] [color:hsl(var(--content-inverse))] rounded hover:[background-color:hsl(var(--surface-interactive)/0.9)]"
        >
          Create Task
        </button>
      </form>
    );
  },
};

// Size Variations
export const SizeVariations: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div>
        <h3 className="text-lg font-semibold mb-4">Different Widths</h3>
        <div className="space-y-4">
          <Select label="Compact (150px)">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Small" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="s">Small</SelectItem>
              <SelectItem value="m">Medium</SelectItem>
              <SelectItem value="l">Large</SelectItem>
            </SelectContent>
          </Select>

          <Select label="Standard (250px)">
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Standard width" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Standard Option 1</SelectItem>
              <SelectItem value="option2">Standard Option 2</SelectItem>
              <SelectItem value="option3">Standard Option 3</SelectItem>
            </SelectContent>
          </Select>

          <Select label="Wide (350px)">
            <SelectTrigger className="w-[350px]">
              <SelectValue placeholder="Wide selection field" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wide1">Wide Option with Longer Text</SelectItem>
              <SelectItem value="wide2">Another Wide Option Description</SelectItem>
              <SelectItem value="wide3">Extended Wide Option Label</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  ),
};

// Enhanced Features Showcase
export const EnhancedFeatures: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-8 p-4">
      <div>
        <h3 className="text-lg font-semibold mb-4">Loading States</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select label="Data Loading">
            <SelectTrigger loading>
              <SelectValue placeholder="Loading data..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="data1">Data Option 1</SelectItem>
              <SelectItem value="data2">Data Option 2</SelectItem>
            </SelectContent>
          </Select>

          <Select label="Processing Selection" helperText="Please wait...">
            <SelectTrigger loading>
              <SelectValue placeholder="Processing..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="process1">Process Option 1</SelectItem>
              <SelectItem value="process2">Process Option 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Error States</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select label="Validation Error" error="Selection is required">
            <SelectTrigger error>
              <SelectValue placeholder="Please select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="valid1">Valid Option 1</SelectItem>
              <SelectItem value="valid2">Valid Option 2</SelectItem>
            </SelectContent>
          </Select>

          <Select label="Custom Error" error="This option is not available in your region">
            <SelectTrigger error>
              <SelectValue placeholder="Restricted selection" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="restricted1">Restricted Option 1</SelectItem>
              <SelectItem value="restricted2">Restricted Option 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Advanced Interactions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select label="Searchable Options" helperText="Type to filter options">
            <SelectTrigger>
              <SelectValue placeholder="Search programming languages..." />
            </SelectTrigger>
            <SelectContent searchable>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="typescript">TypeScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="csharp">C#</SelectItem>
              <SelectItem value="go">Go</SelectItem>
              <SelectItem value="rust">Rust</SelectItem>
              <SelectItem value="kotlin">Kotlin</SelectItem>
              <SelectItem value="swift">Swift</SelectItem>
              <SelectItem value="php">PHP</SelectItem>
            </SelectContent>
          </Select>

          <Select label="Mixed States" helperText="Some options disabled">
            <SelectTrigger>
              <SelectValue placeholder="Select availability..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">✅ Available</SelectItem>
              <SelectItem value="limited">⚠️ Limited Availability</SelectItem>
              <SelectItem value="waitlist" disabled>
                📋 Waitlist Only
              </SelectItem>
              <SelectItem value="soldout" disabled>
                ❌ Sold Out
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  ),
};

// Kitchen Sink - All Features
export const KitchenSink: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    React.useEffect(() => {
      if (value && value === 'error') {
        setError('This option triggers an error state');
      } else if (value && value === 'warning') {
        setError('Warning: This option requires additional confirmation');
      } else {
        setError('');
      }
    }, [value]);

    return (
      <div className="w-96">
        <Select
          value={value}
          onValueChange={setValue}
          label="Full-Featured Select"
          error={error}
          helperText={
            !error ? 'This select demonstrates all available features working together.' : undefined
          }
          required
        >
          <SelectTrigger error={!!error}>
            <SelectValue placeholder="Explore all features..." />
          </SelectTrigger>
          <SelectContent searchable>
            <SelectGroup>
              <SelectLabel>Normal Options</SelectLabel>
              <SelectItem value="good">✅ Good Option</SelectItem>
              <SelectItem value="better">⭐ Better Option</SelectItem>
              <SelectItem value="best">🏆 Best Option</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Special States</SelectLabel>
              <SelectItem value="warning">⚠️ Triggers Warning</SelectItem>
              <SelectItem value="error">❌ Triggers Error</SelectItem>
              <SelectItem value="disabled" disabled>
                🚫 Disabled Option
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    );
  },
};

// Accessibility Demo
export const AccessibilityShowcase: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-6 p-4">
      <div>
        <h3 className="text-lg font-semibold mb-4">Screen Reader Friendly</h3>
        <Select
          label="Accessible Select"
          helperText="This select is optimized for screen readers with proper labeling and ARIA attributes."
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose an accessible option..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Screen Reader Friendly Option 1</SelectItem>
            <SelectItem value="option2">Screen Reader Friendly Option 2</SelectItem>
            <SelectItem value="option3">Screen Reader Friendly Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Keyboard Navigation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Tab Navigation"
            helperText="Use Tab to focus, Enter/Space to open, Arrow keys to navigate"
          >
            <SelectTrigger>
              <SelectValue placeholder="Navigate with keyboard..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nav1">Keyboard Navigation 1</SelectItem>
              <SelectItem value="nav2">Keyboard Navigation 2</SelectItem>
              <SelectItem value="nav3">Keyboard Navigation 3</SelectItem>
              <SelectItem value="nav4">Keyboard Navigation 4</SelectItem>
            </SelectContent>
          </Select>

          <Select label="Focus Indicators" helperText="Clear focus indicators for keyboard users">
            <SelectTrigger>
              <SelectValue placeholder="Focus visibility..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="focus1">Focus Indicator 1</SelectItem>
              <SelectItem value="focus2">Focus Indicator 2</SelectItem>
              <SelectItem value="focus3">Focus Indicator 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  ),
};
