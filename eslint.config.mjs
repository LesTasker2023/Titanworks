import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import nextEslint from 'eslint-config-next';
import storybook from 'eslint-plugin-storybook';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
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
    ],
  },
  ...compat.extends('next/core-web-vitals'),
  ...compat.extends('plugin:storybook/recommended'),
  {
    plugins: {
      storybook,
    },
    rules: {
      // Disable problematic rules for development
      'react-hooks/rules-of-hooks': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
      '@next/next/no-img-element': 'warn',
      'prefer-const': 'warn',
      'no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      
      // Storybook specific rules
      'storybook/no-renderer-packages': 'off',
    },
  },
];
