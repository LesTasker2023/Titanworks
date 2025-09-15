import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import './AspectRatio.scss';

const meta: Meta = {
  title: 'UI/AspectRatio',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4">AspectRatio Component</h3>
      <p className="text-muted-foreground">
        AspectRatio component is now available in the component library. Check the component
        showcase for interactive examples.
      </p>
    </div>
  ),
};

export const Showcase: Story = {
  render: () => (
    <div className="p-6 space-y-4">
      <h3 className="text-lg font-semibold">AspectRatio Variants</h3>
      <p className="text-muted-foreground">
        Visit the component showcase to see all available variants and examples.
      </p>
    </div>
  ),
};
