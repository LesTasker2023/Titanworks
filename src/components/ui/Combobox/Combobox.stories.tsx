import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { Combobox } from './Combobox';

const meta: Meta<typeof Combobox> = {
  title: 'UI/Combobox',
  component: Combobox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample options
const frameworks = [
  { value: 'next', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <div className="w-[300px]">
        <Combobox
          value={value}
          onValueChange={setValue}
          options={frameworks}
          placeholder="Select framework..."
          searchPlaceholder="Search frameworks..."
        />
      </div>
    );
  },
};

export const WithPreselection: Story = {
  render: () => {
    const [value, setValue] = useState('next');

    return (
      <div className="w-[300px]">
        <Combobox
          value={value}
          onValueChange={setValue}
          options={frameworks}
          placeholder="Select framework..."
          searchPlaceholder="Search frameworks..."
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[300px]">
      <Combobox
        disabled
        options={frameworks}
        placeholder="Select framework..."
        searchPlaceholder="Search frameworks..."
      />
    </div>
  ),
};
