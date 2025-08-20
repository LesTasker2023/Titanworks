import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'UI/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    dateFormat: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();

    return (
      <div className="w-[300px]">
        <DatePicker date={date} onDateChange={setDate} placeholder="Select a date" />
      </div>
    );
  },
};

export const WithPreselection: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
      <div className="w-[300px]">
        <DatePicker date={date} onDateChange={setDate} placeholder="Select a date" />
      </div>
    );
  },
};

export const CustomFormat: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();

    return (
      <div className="w-[300px]">
        <DatePicker
          date={date}
          onDateChange={setDate}
          placeholder="Select a date"
          dateFormat="dd/MM/yyyy"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[300px]">
      <DatePicker disabled placeholder="Select a date" />
    </div>
  ),
};
