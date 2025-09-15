import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Separator } from './Separator';
import './Separator.scss';

const meta: Meta<typeof Separator> = {
  title: 'UI/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the separator',
    },
    decorative: {
      control: 'boolean',
      description: 'Whether the separator is decorative',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <h3 className="text-lg font-semibold">Above the separator</h3>
        <p className="text-sm text-muted-foreground">Content before the divider.</p>
      </div>
      <Separator />
      <div>
        <h3 className="text-lg font-semibold">Below the separator</h3>
        <p className="text-sm text-muted-foreground">Content after the divider.</p>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-20 items-center space-x-4">
      <div className="text-center">
        <p className="text-sm font-medium">Left</p>
        <p className="text-xs text-muted-foreground">Content</p>
      </div>
      <Separator orientation="vertical" />
      <div className="text-center">
        <p className="text-sm font-medium">Middle</p>
        <p className="text-xs text-muted-foreground">Content</p>
      </div>
      <Separator orientation="vertical" />
      <div className="text-center">
        <p className="text-sm font-medium">Right</p>
        <p className="text-xs text-muted-foreground">Content</p>
      </div>
    </div>
  ),
};

export const InMenu: Story = {
  render: () => (
    <div className="w-64 border rounded-lg p-2">
      <div className="px-2 py-1 text-sm">Menu Item 1</div>
      <div className="px-2 py-1 text-sm">Menu Item 2</div>
      <Separator className="my-1" />
      <div className="px-2 py-1 text-sm">Menu Item 3</div>
      <div className="px-2 py-1 text-sm">Menu Item 4</div>
      <Separator className="my-1" />
      <div className="px-2 py-1 text-sm">Settings</div>
    </div>
  ),
};

export const CustomStyles: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div>
        <h4 className="text-sm font-medium mb-2">Default thickness</h4>
        <Separator />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Thicker separator</h4>
        <Separator className="h-[2px] bg-border" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Colored separator</h4>
        <Separator className="bg-blue-500" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Dotted separator</h4>
        <Separator className="border-dashed border-t border-border h-0" />
      </div>
    </div>
  ),
};
