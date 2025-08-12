import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, expect } from 'vitest';

// Extend Vitest's expect with jest-dom matchers
expect.extend({});

// Cleanup after each test
afterEach(() => {
  cleanup();
});
