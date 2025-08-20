import type { Meta, StoryObj } from '@storybook/nextjs';
import React, { useState } from 'react';
import { Textarea } from './textarea';

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
    showCount: {
      control: { type: 'boolean' },
    },
    maxLength: {
      control: { type: 'number', min: 10, max: 1000, step: 10 },
    },
    rows: {
      control: { type: 'number', min: 2, max: 10, step: 1 },
    },
    cols: {
      control: { type: 'number', min: 20, max: 80, step: 5 },
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Stories
export const Default: Story = {
  args: {
    placeholder: 'Type your message here...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Message',
    placeholder: 'Enter your message...',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Description',
    placeholder: 'Describe your project...',
    helperText: 'Provide a brief description of what you are working on.',
  },
};

export const WithError: Story = {
  args: {
    label: 'Comments',
    placeholder: 'Add your comments...',
    error: 'This field is required',
    value: '',
  },
};

export const Required: Story = {
  args: {
    label: 'Required Field',
    placeholder: 'This field is required...',
    required: true,
    helperText: 'This field must be completed before submitting.',
  },
};

// States
export const Disabled: Story = {
  args: {
    label: 'Disabled Textarea',
    placeholder: 'This textarea is disabled',
    disabled: true,
    value: 'This content cannot be edited.',
    helperText: 'This field is currently disabled.',
  },
};

export const Loading: Story = {
  args: {
    label: 'Loading Textarea',
    placeholder: 'Loading...',
    loading: true,
    helperText: 'Content is being processed...',
  },
};

// Character Count Features
export const WithCharacterCount: Story = {
  args: {
    label: 'Tweet',
    placeholder: "What's happening?",
    maxLength: 280,
    showCount: true,
    helperText: 'Share your thoughts with the world.',
  },
};

export const CharacterCountWarning: Story = {
  args: {
    label: 'Short Message',
    placeholder: 'Keep it brief...',
    maxLength: 50,
    showCount: true,
    value:
      'This message is getting close to the limit and will show a warning when it reaches 90% of the maximum length.',
    helperText: 'Try to keep your message under 50 characters.',
  },
};

export const CharacterCountError: Story = {
  args: {
    label: 'Limited Text',
    placeholder: 'Very short limit...',
    maxLength: 25,
    showCount: true,
    value: 'This text exceeds the limit',
    error: 'Text exceeds maximum length',
  },
};

// Size Variations
export const SmallTextarea: Story = {
  args: {
    label: 'Small Note',
    placeholder: 'Quick note...',
    rows: 2,
    helperText: 'Perfect for short notes or comments.',
  },
};

export const LargeTextarea: Story = {
  args: {
    label: 'Essay',
    placeholder: 'Write your essay here...',
    rows: 8,
    helperText: 'Ideal for longer content like articles or essays.',
  },
};

// Interactive Examples
export const ControlledTextarea: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-80">
        <Textarea
          label="Controlled Input"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Type something..."
          helperText={`You have typed: ${value.length} characters`}
        />
        <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
          <strong>Current value:</strong> {value || '(empty)'}
        </div>
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      feedback: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors: Record<string, string> = {};

      if (!formData.title.trim()) {
        newErrors.title = 'Title is required';
      }
      if (!formData.description.trim()) {
        newErrors.description = 'Description is required';
      }
      if (formData.description.length > 500) {
        newErrors.description = 'Description must be under 500 characters';
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        alert('Form submitted successfully!');
      }
    };

    return (
      <form onSubmit={handleSubmit} className="w-96 space-y-4">
        <Textarea
          label="Title"
          value={formData.title}
          onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
          error={errors.title}
          placeholder="Enter project title..."
          required
          rows={2}
        />

        <Textarea
          label="Description"
          value={formData.description}
          onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
          error={errors.description}
          placeholder="Describe your project in detail..."
          helperText="Provide a comprehensive description of your project goals and requirements."
          maxLength={500}
          showCount
          required
          rows={4}
        />

        <Textarea
          label="Additional Feedback (Optional)"
          value={formData.feedback}
          onChange={e => setFormData(prev => ({ ...prev, feedback: e.target.value }))}
          placeholder="Any additional comments or feedback..."
          helperText="Share any extra thoughts or suggestions."
          rows={3}
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit Form
        </button>
      </form>
    );
  },
};

// Enhanced Features Showcase
export const EnhancedFeatures: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-6 p-4">
      <div>
        <h3 className="text-lg font-semibold mb-4">Loading States</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Textarea
            label="Processing"
            loading
            placeholder="Content is being processed..."
            helperText="Please wait while we save your content."
          />
          <Textarea
            label="Auto-save Active"
            loading
            defaultValue="This content is being automatically saved..."
            helperText="Changes are saved automatically."
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Character Count Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Textarea
            label="Normal Count"
            maxLength={100}
            showCount
            placeholder="Type up to 100 characters..."
            defaultValue="This shows normal character counting."
          />
          <Textarea
            label="Warning State"
            maxLength={50}
            showCount
            placeholder="Almost at limit..."
            defaultValue="This text is approaching the character limit and will show warning styling."
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Error and Validation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Textarea
            label="Validation Error"
            error="This field contains invalid content"
            defaultValue="Some invalid content here"
            placeholder="Fix the content..."
          />
          <Textarea
            label="Required Field"
            required
            error="This field is required"
            placeholder="Please fill this field..."
            helperText="This information is mandatory."
          />
        </div>
      </div>
    </div>
  ),
};

// Kitchen Sink - All Features
export const KitchenSink: Story = {
  render: () => {
    const [value, setValue] = useState(
      'This textarea demonstrates all features: labels, character counting, validation, and responsive behavior. Try editing this text to see the character counter update in real-time!'
    );
    const [error, setError] = useState('');

    React.useEffect(() => {
      if (value.length > 300) {
        setError('Content is too long! Please keep it under 300 characters.');
      } else if (value.length < 10) {
        setError('Content is too short! Please write at least 10 characters.');
      } else {
        setError('');
      }
    }, [value]);

    return (
      <div className="w-96">
        <Textarea
          label="Full-Featured Textarea"
          value={value}
          onChange={e => setValue(e.target.value)}
          error={error}
          helperText={
            !error ? 'This textarea shows all available features working together.' : undefined
          }
          placeholder="Type your content here..."
          maxLength={400}
          showCount
          required
          rows={6}
        />
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
        <Textarea
          label="Accessible Textarea"
          placeholder="This textarea is optimized for screen readers..."
          helperText="Uses proper labeling and ARIA attributes for accessibility."
          required
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">High Contrast Support</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Textarea
            label="Normal State"
            placeholder="Standard styling..."
            helperText="Adapts to high contrast mode when enabled."
          />
          <Textarea
            label="Focus State"
            placeholder="Enhanced focus indicators..."
            helperText="Clear focus indicators for keyboard navigation."
            autoFocus
          />
        </div>
      </div>
    </div>
  ),
};
