import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, expect } from 'vitest';

// Mock ResizeObserver for Radix UI
global.ResizeObserver = class ResizeObserver {
  constructor(_callback: ResizeObserverCallback) {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock IntersectionObserver for Radix UI  
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: class IntersectionObserver {
    constructor(_callback: IntersectionObserverCallback) {}
    observe() {}
    unobserve() {}
    disconnect() {}
  }
});

// Extend Vitest's expect with jest-dom matchers
expect.extend({});

// Cleanup after each test
afterEach(() => {
  cleanup();
});
