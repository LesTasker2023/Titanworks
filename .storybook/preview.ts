import type { Preview } from '@storybook/nextjs-vite';
// Import your global styles for Storybook (match layout.tsx exactly)
import '../src/app/globals.css';
import '../src/styles/globals.scss';
// Import Storybook-specific overrides
import './storybook.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    // Background options for Storybook
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#111827',
        },
        {
          name: 'gray',
          value: '#f3f4f6',
        },
      ],
    },

    // Layout and viewport settings
    layout: 'centered',

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
