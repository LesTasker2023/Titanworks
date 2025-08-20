import type { Meta, StoryObj } from '@storybook/nextjs';
import { Badge } from './badge';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Enhanced Badge component with removable functionality, status dots, and multiple variants.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'success', 'warning', 'info', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    removable: {
      control: 'boolean',
    },
    dot: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

// 2. All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Badge size="sm">Small</Badge>
      <Badge size="default">Default</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

// 3. Interactive Example
export const InteractiveExample: Story = {
  args: {
    children: 'Interactive Badge',
    variant: 'default',
    size: 'default',
    removable: false,
    dot: false,
  },
};

// 4. Enhanced Features
export const EnhancedFeatures: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Removable Badges</h4>
        <div className="flex gap-2">
          <Badge
            variant="default"
            removable
            onRemove={() => () => {
              /*  */
            }}
          >
            Removable
          </Badge>
          <Badge
            variant="success"
            removable
            onRemove={() => () => {
              /*  */
            }}
          >
            Tag
          </Badge>
          <Badge
            variant="warning"
            removable
            onRemove={() => () => {
              /*  */
            }}
          >
            Label
          </Badge>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Status Dots</h4>
        <div className="flex gap-2">
          <Badge dot variant="success">
            Online
          </Badge>
          <Badge dot variant="warning">
            Away
          </Badge>
          <Badge dot variant="destructive">
            Offline
          </Badge>
          <Badge dot variant="info">
            Busy
          </Badge>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Combined Features</h4>
        <div className="flex gap-2">
          <Badge
            dot
            removable
            variant="success"
            onRemove={() => () => {
              /*  */
            }}
          >
            Online
          </Badge>
          <Badge
            dot
            removable
            variant="warning"
            onRemove={() => () => {
              /*  */
            }}
          >
            Away
          </Badge>
        </div>
      </div>
    </div>
  ),
};

// 5. Real-world Usage
export const StatusIndicators: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">User Status</h4>
        <div className="flex gap-2">
          <Badge dot variant="success">
            Active
          </Badge>
          <Badge dot variant="warning">
            Pending
          </Badge>
          <Badge dot variant="destructive">
            Suspended
          </Badge>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Priority Levels</h4>
        <div className="flex gap-2">
          <Badge variant="destructive" size="sm">
            High
          </Badge>
          <Badge variant="warning" size="sm">
            Medium
          </Badge>
          <Badge variant="success" size="sm">
            Low
          </Badge>
        </div>
      </div>
    </div>
  ),
};

// 6. Tags and Labels
export const TagsAndLabels: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Removable Tags</h4>
        <div className="flex flex-wrap gap-2">
          <Badge
            removable
            variant="outline"
            onRemove={() => () => {
              /*  */
            }}
          >
            React
          </Badge>
          <Badge
            removable
            variant="outline"
            onRemove={() => () => {
              /*  */
            }}
          >
            TypeScript
          </Badge>
          <Badge
            removable
            variant="outline"
            onRemove={() => () => {
              /*  */
            }}
          >
            Next.js
          </Badge>
          <Badge
            removable
            variant="outline"
            onRemove={() => () => {
              /*  */
            }}
          >
            Tailwind CSS
          </Badge>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Category Labels</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">Frontend</Badge>
          <Badge variant="info">Backend</Badge>
          <Badge variant="success">DevOps</Badge>
          <Badge variant="warning">Design</Badge>
        </div>
      </div>
    </div>
  ),
};

// 7. Notification Badges
export const NotificationBadges: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Count Badges</h4>
        <div className="flex gap-4">
          <div className="relative">
            <button className="p-2 border rounded-md">Messages</button>
            <Badge
              variant="destructive"
              size="sm"
              className="absolute -top-1 -right-1 px-1.5 py-0 text-xs"
            >
              3
            </Badge>
          </div>

          <div className="relative">
            <button className="p-2 border rounded-md">Notifications</button>
            <Badge
              variant="warning"
              size="sm"
              className="absolute -top-1 -right-1 px-1.5 py-0 text-xs"
            >
              12
            </Badge>
          </div>
        </div>
      </div>
    </div>
  ),
};

// 8. Size Comparison
export const SizeComparison: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div>
          <Badge size="sm" variant="success">
            Small Success
          </Badge>
        </div>
        <div>
          <Badge size="default" variant="success">
            Default Success
          </Badge>
        </div>
        <div>
          <Badge size="lg" variant="success">
            Large Success
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div>
          <Badge size="sm" variant="warning" removable>
            Small Tag
          </Badge>
        </div>
        <div>
          <Badge size="default" variant="warning" removable>
            Default Tag
          </Badge>
        </div>
        <div>
          <Badge size="lg" variant="warning" removable>
            Large Tag
          </Badge>
        </div>
      </div>
    </div>
  ),
};

// 9. Accessibility Focus States
export const AccessibilityStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Focusable Badges (Removable)</h4>
        <div className="flex gap-2">
          <Badge
            removable
            variant="default"
            onRemove={() => () => {
              /*  */
            }}
          >
            Focus me with Tab
          </Badge>
          <Badge
            removable
            variant="success"
            onRemove={() => () => {
              /*  */
            }}
          >
            Then focus me
          </Badge>
          <Badge
            removable
            variant="warning"
            onRemove={() => () => {
              /*  */
            }}
          >
            And me too
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Use Tab to focus the remove buttons, Enter/Space to activate
        </p>
      </div>
    </div>
  ),
};

// 10. Edge Cases
export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Long Text</h4>
        <div className="flex flex-wrap gap-2 max-w-md">
          <Badge>Very Long Badge Text That Might Wrap</Badge>
          <Badge removable>Long Removable Badge Text</Badge>
          <Badge dot>Long Status Badge With Dot Indicator</Badge>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Empty and Special Cases</h4>
        <div className="flex gap-2">
          <Badge>1</Badge>
          <Badge dot></Badge>
          <Badge removable>X</Badge>
        </div>
      </div>
    </div>
  ),
};
