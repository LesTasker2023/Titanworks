import type { Preview } from '@storybook/nextjs-vite';
import React from 'react';
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

    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#0a0a0a',
        },
      ],
    },

    layout: 'centered',

    docs: {
      theme: 'light',
    },

    a11y: {
      test: 'todo',
    },
  },

  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light Theme' },
          { value: 'dark', title: 'Dark Theme' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';

      // Apply theme to document root
      if (typeof document !== 'undefined') {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        if (theme === 'dark') {
          root.classList.add('dark');
        }
        root.setAttribute('data-theme', theme);

        // Force CSS variables on the root element
        if (theme === 'dark') {
          root.style.setProperty('--background', '0 0% 3.9%');
          root.style.setProperty('--foreground', '0 0% 98%');
          root.style.setProperty('--border', '0 0% 14.9%');
          root.style.setProperty('--input', '0 0% 14.9%');
          root.style.setProperty('--ring', '0 0% 83.1%');
          root.style.setProperty('--muted-foreground', '0 0% 63.9%');
        } else {
          root.style.setProperty('--background', '0 0% 100%');
          root.style.setProperty('--foreground', '0 0% 3.9%');
          root.style.setProperty('--border', '0 0% 89.8%');
          root.style.setProperty('--input', '0 0% 89.8%');
          root.style.setProperty('--ring', '0 0% 3.9%');
          root.style.setProperty('--muted-foreground', '0 0% 45.1%');
        }
      }

      return React.createElement(
        'div',
        {
          className: `storybook-wrapper ${theme}`,
          'data-theme': theme,
          style: {
            minHeight: '100vh',
            padding: '1rem',
            backgroundColor: theme === 'dark' ? '#0a0a0a' : '#ffffff',
            color: theme === 'dark' ? '#fafafa' : '#0a0a0a',
            // Ensure CSS variables are available inline as fallback
            '--background': theme === 'dark' ? '0 0% 3.9%' : '0 0% 100%',
            '--foreground': theme === 'dark' ? '0 0% 98%' : '0 0% 3.9%',
            '--border': theme === 'dark' ? '0 0% 14.9%' : '0 0% 89.8%',
            '--input': theme === 'dark' ? '0 0% 14.9%' : '0 0% 89.8%',
            '--ring': theme === 'dark' ? '0 0% 83.1%' : '0 0% 3.9%',
            '--muted-foreground': theme === 'dark' ? '0 0% 63.9%' : '0 0% 45.1%',
          } as React.CSSProperties,
        },
        React.createElement(Story)
      );
    },
  ],
};

export default preview;
