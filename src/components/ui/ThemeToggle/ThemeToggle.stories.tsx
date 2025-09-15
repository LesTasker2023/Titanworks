import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ThemeToggle } from './ThemeToggle';
import './ThemeToggle.scss';

const meta: Meta<typeof ThemeToggle> = {
  title: 'UI/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {
  render: () => <ThemeToggle />,
};

export const WithCustomIcon: Story = {
  render: () => <ThemeToggle icon={<span>🦄</span>} label="Switch theme" />,
};
