import type { Meta, StoryObj } from '@storybook/react';

import { SimpleChart } from './SimpleChart';

const meta: Meta<typeof SimpleChart> = {
  title: 'UI/SimpleChart',
  component: SimpleChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A lightweight chart component for simple data visualization without external dependencies.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['bar', 'pie', 'line'],
      description: 'The type of chart to render',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const sampleData = [
  { name: 'Components', value: 172, color: '#3b82f6' },
  { name: 'Tests', value: 1097, color: '#10b981' },
  { name: 'Stories', value: 49, color: '#f59e0b' },
  { name: 'Files', value: 314, color: '#8b5cf6' },
];

const performanceData = [
  { name: 'Build Time', value: 84, color: '#ef4444' },
  { name: 'Bundle Size', value: 2400, color: '#f97316' },
  { name: 'Load Speed', value: 95, color: '#10b981' },
  { name: 'Lighthouse', value: 88, color: '#3b82f6' },
];

const deploymentData = [
  { name: 'Success', value: 94, color: '#10b981' },
  { name: 'Failed', value: 6, color: '#ef4444' },
];

export const BarChart: Story = {
  args: {
    data: sampleData,
    type: 'bar',
  },
};

export const PieChart: Story = {
  args: {
    data: deploymentData,
    type: 'pie',
  },
};

export const LineChart: Story = {
  args: {
    data: performanceData,
    type: 'line',
  },
};

export const PerformanceMetrics: Story = {
  args: {
    data: performanceData,
    type: 'bar',
    className: 'w-96',
  },
  parameters: {
    docs: {
      description: {
        story: 'Performance metrics visualization with custom styling.',
      },
    },
  },
};

export const EmptyData: Story = {
  args: {
    data: [],
    type: 'bar',
  },
  parameters: {
    docs: {
      description: {
        story: 'Chart handles empty data gracefully.',
      },
    },
  },
};

export const SingleDataPoint: Story = {
  args: {
    data: [{ name: 'Single Item', value: 100, color: '#8b5cf6' }],
    type: 'bar',
  },
  parameters: {
    docs: {
      description: {
        story: 'Chart with a single data point.',
      },
    },
  },
};
