import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Form } from './Form';
import './Form.scss';

const meta: Meta<typeof Form> = {
  title: 'UI/Form',
  component: Form,
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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Form',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <Form variant="default">
        <div className="space-y-2">
          <label htmlFor="default-input">Default Form</label>
          <input
            id="default-input"
            type="text"
            placeholder="Enter text..."
            className="w-full p-2 border rounded"
          />
        </div>
      </Form>
      <Form variant="card">
        <div className="space-y-2">
          <label htmlFor="card-input">Card Form</label>
          <input
            id="card-input"
            type="text"
            placeholder="Enter text..."
            className="w-full p-2 border rounded"
          />
        </div>
      </Form>
      <Form variant="inline">
        <label htmlFor="inline-input">Inline Form:</label>
        <input
          id="inline-input"
          type="text"
          placeholder="Enter text..."
          className="p-2 border rounded"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </Form>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Form size="sm">
        <div className="space-y-1">
          <label htmlFor="sm-input">Small Spacing</label>
          <input
            id="sm-input"
            type="text"
            placeholder="Compact form..."
            className="w-full p-2 border rounded"
          />
        </div>
      </Form>
      <Form size="default">
        <div className="space-y-2">
          <label htmlFor="default-input">Default Spacing</label>
          <input
            id="default-input"
            type="text"
            placeholder="Normal form..."
            className="w-full p-2 border rounded"
          />
        </div>
      </Form>
      <Form size="lg">
        <div className="space-y-3">
          <label htmlFor="lg-input">Large Spacing</label>
          <input
            id="lg-input"
            type="text"
            placeholder="Spacious form..."
            className="w-full p-2 border rounded"
          />
        </div>
      </Form>
      <Form size="compact">
        <div className="space-y-0.5">
          <label htmlFor="compact-input">Compact</label>
          <input
            id="compact-input"
            type="text"
            placeholder="Minimal spacing..."
            className="w-full p-1 border rounded text-sm"
          />
        </div>
      </Form>
    </div>
  ),
};
