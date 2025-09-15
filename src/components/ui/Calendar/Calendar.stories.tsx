// Using Next.js framework package instead of direct renderer
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Calendar } from './Calendar';
import './Calendar.scss';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'multiple', 'range'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {};

export const WithSelection: Story = {
  args: {
    mode: 'single',
  },
};
