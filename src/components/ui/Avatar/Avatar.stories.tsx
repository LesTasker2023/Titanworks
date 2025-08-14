import type { Meta, StoryObj } from '@storybook/nextjs';
import Avatar from './avatar';

const meta = {
  title: 'UI/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg', 'xl'],
    },
    status: {
      control: { type: 'select' },
      options: [undefined, 'online', 'offline'],
    },
    loading: {
      control: 'boolean',
    },
    name: {
      control: 'text',
    },
    src: {
      control: 'text',
    },
    fallback: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ACTION 8: Core Story Categories
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap items-center">
      <div className="text-center">
        <Avatar src="https://github.com/shadcn.png" alt="@shadcn" />
        <p className="text-xs mt-2">With Image</p>
      </div>
      <div className="text-center">
        <Avatar name="John Doe" />
        <p className="text-xs mt-2">Initials</p>
      </div>
      <div className="text-center">
        <Avatar fallback="JS" />
        <p className="text-xs mt-2">Custom Fallback</p>
      </div>
      <div className="text-center">
        <Avatar status="online" name="Online User" />
        <p className="text-xs mt-2">Online Status</p>
      </div>
      <div className="text-center">
        <Avatar status="offline" name="Offline User" />
        <p className="text-xs mt-2">Offline Status</p>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <div className="text-center">
        <Avatar size="sm" name="Small" />
        <p className="text-xs mt-2">Small</p>
      </div>
      <div className="text-center">
        <Avatar size="default" name="Default" />
        <p className="text-xs mt-2">Default</p>
      </div>
      <div className="text-center">
        <Avatar size="lg" name="Large" />
        <p className="text-xs mt-2">Large</p>
      </div>
      <div className="text-center">
        <Avatar size="xl" name="Extra Large" />
        <p className="text-xs mt-2">Extra Large</p>
      </div>
    </div>
  ),
};

export const InteractiveExample: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Team Members</h3>
      <div className="flex gap-2">
        <Avatar src="https://github.com/shadcn.png" alt="Team Lead" size="lg" status="online" />
        <Avatar name="Sarah Wilson" size="lg" status="online" />
        <Avatar name="Mike Johnson" size="lg" status="offline" />
        <Avatar fallback="+3" size="lg" className="bg-gray-200 text-gray-600" />
      </div>
    </div>
  ),
};

export const EnhancedFeatures: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-2">
        <h4 className="font-medium">Loading State</h4>
        <Avatar loading name="Loading User" />
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">Status Indicators</h4>
        <div className="flex gap-2">
          <Avatar status="online" name="Online" size="lg" />
          <Avatar status="offline" name="Offline" size="lg" />
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">Auto Initials</h4>
        <div className="flex gap-2">
          <Avatar name="John Doe" />
          <Avatar name="Sarah Wilson Smith" />
          <Avatar name="M" />
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">Broken Images</h4>
        <Avatar src="https://broken-url.jpg" name="Fallback User" alt="Will fallback to initials" />
      </div>
    </div>
  ),
};

// Additional stories for comprehensive coverage
export const Default: Story = {
  args: {
    name: 'John Doe',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://github.com/shadcn.png',
    alt: 'Avatar with image',
  },
};

export const WithStatus: Story = {
  args: {
    name: 'Online User',
    status: 'online',
    size: 'lg',
  },
};

export const Loading: Story = {
  args: {
    name: 'Loading User',
    loading: true,
  },
};

export const CustomFallback: Story = {
  args: {
    fallback: '🎯',
    size: 'lg',
  },
};

export const LargeWithImage: Story = {
  args: {
    src: 'https://github.com/shadcn.png',
    alt: 'Large avatar',
    size: 'xl',
    status: 'online',
  },
};
