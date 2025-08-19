import type { Meta, StoryObj } from '@storybook/nextjs';
import { Popover } from './Popover';

const meta: Meta<typeof Popover> = {
  title: 'UI/Popover',
  component: Popover,
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
    children: 'Popover',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Popover variant="default">Default</Popover>
      <Popover variant="destructive">Destructive</Popover>
      <Popover variant="outline">Outline</Popover>
      <Popover variant="secondary">Secondary</Popover>
      <Popover variant="ghost">Ghost</Popover>
      <Popover variant="link">Link</Popover>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Popover size="sm">Small</Popover>
      <Popover size="default">Default</Popover>
      <Popover size="lg">Large</Popover>
      <Popover size="icon">⭐</Popover>
    </div>
  ),
};
