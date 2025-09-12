import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock ResizeObserver which is used by Chart components
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock matchMedia which is used by Sonner components
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
  root: Element | null = null;
  rootMargin: string = '';
  thresholds: ReadonlyArray<number> = [];
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
} as any;

// Mock DOM APIs needed for MapLibre GL
Object.defineProperty(window, 'URL', {
  writable: true,
  value: {
    createObjectURL: vi.fn(() => 'mock-object-url'),
    revokeObjectURL: vi.fn(),
  },
});

// Mock Blob constructor for MapLibre GL worker
global.Blob = class Blob {
  constructor(parts?: BlobPart[], options?: BlobPropertyBag) {
    // Mock implementation
  }
  size = 0;
  type = '';
  arrayBuffer = vi.fn().mockResolvedValue(new ArrayBuffer(0));
  slice = vi.fn().mockReturnValue(this);
  stream = vi.fn();
  text = vi.fn().mockResolvedValue('');
} as any;
