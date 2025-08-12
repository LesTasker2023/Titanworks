import type { Meta, StoryObj } from '@storybook/nextjs';
import Link from 'next/link';
import { Badge } from './badge';

// Icons for examples (using simple SVGs)
const CheckIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20,6 9,17 4,12" />
  </svg>
);

const AlertIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const meta: Meta<typeof Badge> = {
  title: 'TriggerKings/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile badge component for displaying status, counts, or categories. Built with enterprise-grade accessibility and design standards.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
      description: 'The visual variant of the badge',
    },
    asChild: {
      control: 'boolean',
      description: 'Render as child component (e.g., link)',
    },
    children: {
      control: 'text',
      description: 'Badge content',
    },
  },
  args: {
    children: 'Badge',
    variant: 'default',
    asChild: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Destructive',
    variant: 'destructive',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

// Badge with Icons
export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="default">
        <CheckIcon />
        Verified
      </Badge>
      <Badge variant="destructive">
        <AlertIcon />
        Error
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges can include icons to provide additional visual context.',
      },
    },
  },
};

// Number/Count Badges
export const NumberBadges: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge data-count="true">5</Badge>
      <Badge variant="destructive" data-count="true">
        99+
      </Badge>
      <Badge variant="outline" data-count="true">
        12
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Circular badges perfect for counts, notifications, or numbers.',
      },
    },
  },
};

// Link Badges (asChild)
export const LinkBadges: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge asChild>
        <Link href="/">Home</Link>
      </Badge>
      <Badge variant="secondary" asChild>
        <Link href="/about">About</Link>
      </Badge>
      <Badge variant="outline" asChild>
        <a href="https://example.com" target="_blank" rel="noopener noreferrer">
          External
        </a>
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges can be rendered as links using the asChild prop.',
      },
    },
  },
};

// All Variants Showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available badge variants in one view.',
      },
    },
  },
};

// Status Badges
export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">
        <CheckIcon />
        Active
      </Badge>
      <Badge variant="secondary">Pending</Badge>
      <Badge variant="destructive">
        <AlertIcon />
        Failed
      </Badge>
      <Badge variant="outline">Draft</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common status indicators using different badge variants.',
      },
    },
  },
};

// Accessibility Example
export const AccessibilityExample: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge aria-label="5 unread messages" data-count="true">
        5
      </Badge>
      <Badge variant="destructive" role="alert" aria-label="Critical error occurred">
        <AlertIcon />
        Critical
      </Badge>
      <Badge variant="default" aria-describedby="badge-description">
        <CheckIcon />
        Verified
      </Badge>
      <div id="badge-description" className="sr-only">
        This item has been verified by our team
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges with proper ARIA labels and semantic meaning for screen readers.',
      },
    },
  },
};

// Custom Styling Example
export const CustomStyling: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge className="bg-blue-500 text-white hover:bg-blue-600">Custom Blue</Badge>
      <Badge className="bg-green-500 text-white hover:bg-green-600">Custom Green</Badge>
      <Badge className="bg-purple-500 text-white hover:bg-purple-600 rounded-full px-3 py-1">
        Custom Rounded
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges with custom styling using CSS classes.',
      },
    },
  },
};

// Interactive States
export const InteractiveStates: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge asChild>
        <button type="button">Clickable Badge</button>
      </Badge>
      <Badge variant="outline" asChild>
        <Link href="/profile">Profile Link</Link>
      </Badge>
      <Badge variant="destructive" asChild>
        <button type="button" onClick={() => alert('Delete action')}>
          Delete
        </button>
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive badges as buttons and links with proper focus states.',
      },
    },
  },
};
