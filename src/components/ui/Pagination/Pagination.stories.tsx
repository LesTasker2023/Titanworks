import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Pagination } from './Pagination';
import './Pagination.scss';

const meta: Meta<typeof Pagination> = {
  title: 'UI/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
    },
    currentPage: {
      control: { type: 'number' },
    },
    totalPages: {
      control: { type: 'number' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: () => {},
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Pagination currentPage={3} totalPages={10} onPageChange={() => {}} />
      <Pagination
        currentPage={5}
        totalPages={50}
        onPageChange={() => {}}
        showPageInfo={true}
        totalItems={2500}
        itemsPerPage={50}
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Pagination size="sm" currentPage={1} totalPages={5} onPageChange={() => {}} />
      <Pagination size="default" currentPage={1} totalPages={5} onPageChange={() => {}} />
      <Pagination size="lg" currentPage={1} totalPages={5} onPageChange={() => {}} />
    </div>
  ),
};
