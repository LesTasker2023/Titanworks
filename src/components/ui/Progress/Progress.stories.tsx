import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Progress } from './Progress';
import './Progress.scss';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: 'Progress' } };
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Progress variant="default">Default</Progress>
      <Progress variant="success">Success</Progress>
      <Progress variant="warning">Warning</Progress>
      <Progress variant="danger">Danger</Progress>
    </div>
  ),
};
export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-2 items-center">
      <Progress size="sm">Small</Progress>
      <Progress size="default">Default</Progress>
      <Progress size="lg">Large</Progress>
      <Progress size="xl">Extra Large</Progress>
    </div>
  ),
};
export const LoadingState: Story = { args: { value: 50 } };
export const DisabledState: Story = { args: { value: 30 } };
export const Success: Story = { args: { variant: 'success', children: 'Success' } };
export const Warning: Story = { args: { variant: 'warning', children: 'Warning' } };
export const Danger: Story = { args: { variant: 'danger', children: 'Danger' } };
export const Small: Story = { args: { size: 'sm', children: 'Small' } };
export const Large: Story = { args: { size: 'lg', children: 'Large' } };
export const ExtraLarge: Story = { args: { size: 'xl', children: 'Extra Large' } };
