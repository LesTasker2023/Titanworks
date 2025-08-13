import type { Meta, StoryObj } from '@storybook/nextjs';
import { Badge } from '../badge';
import { Button } from '../button';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'TriggerKings/Header',
  component: Header,
  parameters: {
    layout: 'fullwidth',
    docs: {
      description: {
        component:
          'Enhanced navigation header component with Card/Button style architecture. Provides flexible styling variants and full accessibility support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'glass', 'branded'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    asChild: {
      control: 'boolean',
      description: 'Render as child element instead of header',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

// Basic Variants
export const Default: Story = {
  args: {
    children: (
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
            TK
          </div>
          <span className="font-bold text-lg">TriggerKings</span>
        </div>
        <Button variant="outline" size="sm">
          Menu
        </Button>
      </div>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <div className="flex items-center justify-between w-full">
        <span className="font-bold text-lg">Elevated Header</span>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            Login
          </Button>
          <Button variant="default" size="sm">
            Sign Up
          </Button>
        </div>
      </div>
    ),
  },
};

export const Glass: Story = {
  args: {
    variant: 'glass',
    children: (
      <div className="flex items-center justify-between w-full">
        <span className="font-bold text-lg">Glass Header</span>
        <Badge variant="outline">Modern</Badge>
      </div>
    ),
  },
  parameters: {
    backgrounds: {
      default: 'gradient',
      values: [
        {
          name: 'gradient',
          value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
      ],
    },
  },
};

export const Branded: Story = {
  args: {
    variant: 'branded',
    children: (
      <div className="flex items-center justify-between w-full">
        <span className="font-bold text-lg text-primary">Branded Header</span>
        <Badge variant="default">Premium</Badge>
      </div>
    ),
  },
};

// Size Variants
export const Small: Story = {
  args: {
    size: 'sm',
    children: (
      <div className="flex items-center justify-between w-full">
        <span className="font-semibold">Small Header</span>
        <Button variant="ghost" size="sm">
          Menu
        </Button>
      </div>
    ),
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    children: (
      <div className="flex items-center justify-between w-full">
        <span className="font-semibold">Medium Header</span>
        <Button variant="ghost" size="sm">
          Menu
        </Button>
      </div>
    ),
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: (
      <div className="flex items-center justify-between w-full">
        <span className="font-bold text-xl">Large Header</span>
        <Button variant="outline">Menu</Button>
      </div>
    ),
  },
};

// Complex Examples
export const CompleteNavigation: Story = {
  args: {
    variant: 'elevated',
    size: 'md',
    children: (
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
            TK
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-none">TriggerKings</span>
            <span className="text-sm text-muted-foreground">Gaming Platform</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Button variant="ghost" size="sm">
            Home
          </Button>
          <Button variant="ghost" size="sm">
            Games
          </Button>
          <Button variant="ghost" size="sm">
            Tournaments
          </Button>
          <Button variant="ghost" size="sm">
            Community
          </Button>
        </nav>

        <div className="flex items-center gap-3">
          <Badge variant="secondary">Beta</Badge>
          <Button variant="outline" size="sm">
            Login
          </Button>
          <Button size="sm">Sign Up</Button>
        </div>
      </div>
    ),
  },
};

export const MobileOptimized: Story = {
  args: {
    variant: 'default',
    size: 'sm',
    children: (
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
            TK
          </div>
          <span className="font-bold">TK</span>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            Live
          </Badge>
          <Button variant="ghost" size="sm" className="md:hidden">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
        </div>
      </div>
    ),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const BrandedShowcase: Story = {
  args: {
    variant: 'branded',
    size: 'lg',
    children: (
      <div className="flex items-center justify-between w-full max-w-6xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg">
            TK
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-2xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              TriggerKings
            </span>
            <span className="text-sm text-muted-foreground font-medium">
              Premium Gaming Experience
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm font-medium text-green-600">Live</span>
          </div>
          <Badge variant="default" className="bg-gradient-to-r from-primary to-primary/80">
            Pro
          </Badge>
          <Button variant="outline" className="border-primary/20 hover:bg-primary/5">
            Dashboard
          </Button>
        </div>
      </div>
    ),
  },
};

// AsChild Pattern Examples
export const AsChildNav: Story = {
  args: {
    asChild: true,
    variant: 'elevated',
    children: (
      <nav className="rounded-lg">
        <div className="flex items-center justify-between w-full">
          <span className="font-semibold">Custom Nav Element</span>
          <Badge variant="secondary">AsChild</Badge>
        </div>
      </nav>
    ),
  },
};

export const AsChildSection: Story = {
  args: {
    asChild: true,
    variant: 'glass',
    children: (
      <section className="rounded-xl border">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded bg-primary/20 flex items-center justify-center">
            <span className="text-xs font-bold text-primary">S</span>
          </div>
          <span className="font-medium">Section Header</span>
          <Badge variant="outline">Custom Element</Badge>
        </div>
      </section>
    ),
  },
};

// Interactive States
export const WithInteractiveElements: Story = {
  args: {
    variant: 'default',
    size: 'md',
    children: (
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <button className="h-8 w-8 rounded bg-primary hover:bg-primary/90 flex items-center justify-center text-primary-foreground text-sm font-bold transition-colors">
            TK
          </button>
          <span className="font-bold text-lg">Interactive Header</span>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-1 text-sm rounded-md hover:bg-muted transition-colors">
            About
          </button>
          <button className="px-3 py-1 text-sm rounded-md hover:bg-muted transition-colors">
            Contact
          </button>
          <Button variant="default" size="sm">
            Get Started
          </Button>
        </div>
      </div>
    ),
  },
};
