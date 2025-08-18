import type { Meta, StoryObj } from '@storybook/nextjs';
import { Label } from './Label';

const meta: Meta<typeof Label> = {
  title: 'UI/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'The label text content',
    },
    htmlFor: {
      control: 'text',
      description: 'The id of the form element this label is associated with',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Label',
  },
};

export const WithForm: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="email">Email Address</Label>
      <input
        id="email"
        type="email"
        placeholder="Enter your email"
        className="border rounded px-3 py-2"
      />
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="name">
        Full Name <span className="text-red-500">*</span>
      </Label>
      <input
        id="name"
        type="text"
        placeholder="Enter your full name"
        className="border rounded px-3 py-2"
        required
      />
    </div>
  ),
};
