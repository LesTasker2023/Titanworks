import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  staticDirs: ['..\\public'],
  viteFinal: async config => {
    // Ensure PostCSS config is used from postcss.config.js
    config.css = config.css || {};
    config.css.postcss = '../postcss.config.js';
    return config;
  },
};
export default config;
