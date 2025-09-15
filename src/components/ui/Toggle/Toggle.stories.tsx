import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Bold, Italic, Underline } from 'lucide-react';
import { Toggle } from './Toggle';
import './Toggle.scss';

const meta: Meta<typeof Toggle> = {
  title: 'UI/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline'],
      description: 'The visual variant of the toggle',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'The size of the toggle',
    },
    pressed: {
      control: 'boolean',
      description: 'Whether the toggle is pressed',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the toggle is disabled',
    },
    onPressedChange: {
      action: 'onPressedChange',
      description: 'Callback when pressed state changes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: args => (
    <Toggle {...args}>
      <Bold className="h-4 w-4" />
    </Toggle>
  ),
};

export const WithText: Story = {
  render: () => <Toggle>Bold</Toggle>,
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle size="sm">
        <Bold className="h-3 w-3" />
      </Toggle>
      <Toggle size="default">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle size="lg">
        <Bold className="h-5 w-5" />
      </Toggle>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle variant="default">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle variant="outline">
        <Bold className="h-4 w-4" />
      </Toggle>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle>
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle pressed>
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle disabled>
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle pressed disabled>
        <Bold className="h-4 w-4" />
      </Toggle>
    </div>
  ),
};

export const ToolbarExample: Story = {
  render: () => (
    <div className="flex items-center space-x-1 border rounded-md p-1">
      <Toggle size="sm">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm">
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm">
        <Underline className="h-4 w-4" />
      </Toggle>
    </div>
  ),
};
