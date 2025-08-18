import type { Meta, StoryObj } from '@storybook/nextjs';
import { Form } from './Form';

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
    <div className="flex gap-4">
      <Form variant="default">Default</Form>
      <Form variant="destructive">Destructive</Form>
      <Form variant="outline">Outline</Form>
      <Form variant="secondary">Secondary</Form>
      <Form variant="ghost">Ghost</Form>
      <Form variant="link">Link</Form>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Form size="sm">Small</Form>
      <Form size="default">Default</Form>
      <Form size="lg">Large</Form>
      <Form size="icon">⭐</Form>
    </div>
  ),
};
