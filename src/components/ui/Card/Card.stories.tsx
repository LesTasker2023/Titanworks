import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Card } from './Card';
import './Card.scss';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Card>Simple Card</Card>,
};
