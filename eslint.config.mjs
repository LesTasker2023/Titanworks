import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'out/**',
      'build/**',
      'dist/**',
      '.turbo/**',
      'storybook-static/**',
      '**/*.d.ts',
      'scripts/**',
    ],
  },
  ...compat.extends('next/core-web-vitals'),
  ...compat.extends('plugin:storybook/recommended'),
  {
    rules: {
      // Disable problematic rules for our use case
      'react-hooks/exhaustive-deps': 'off',
      'react-hooks/rules-of-hooks': 'off',
      'jsx-a11y/alt-text': 'off',
      'storybook/no-renderer-packages': 'off',
    },
  },
];
