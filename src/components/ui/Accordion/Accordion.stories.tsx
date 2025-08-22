import type { Meta, StoryObj } from '@storybook/nextjs';
import { Accordion } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { title: 'Section 1', content: 'Content for section 1.' },
  { title: 'Section 2', content: 'Content for section 2.' },
  { title: 'Section 3', content: 'Content for section 3.' },
];

export const Default: Story = {
  args: { items },
};

export const OpenFirst: Story = {
  args: { items, defaultOpenIndex: 0 },
};

export const OpenSecond: Story = {
  args: { items, defaultOpenIndex: 1 },
};

export const AllClosed: Story = {
  args: { items, defaultOpenIndex: -1 },
};

export const CustomContent: Story = {
  args: {
    items: [
      {
        title: 'Custom',
        content: (
          <div>
            <b>Bold</b> and <i>italic</i> content.
          </div>
        ),
      },
    ],
  },
};
