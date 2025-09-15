import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ColorPicker } from './ColorPicker';
import './ColorPicker.scss';

const meta: Meta<typeof ColorPicker> = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
