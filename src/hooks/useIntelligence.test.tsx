import type { IntelligenceReport } from '@/types/intelligence';
import { act, renderHook, waitFor } from '@testing-library/react';
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  useFilteredComponents,
  useIntelligenceMetrics,
  useIntelligenceReport,
} from './useIntelligence';

// Minimal valid IntelligenceReport fixture
function buildReport(overrides: Partial<IntelligenceReport> = {}): IntelligenceReport {
  return {
    metadata: {
      scanTime: new Date().toISOString(),
      version: '1.0.0',
      scanner: 'test',
      duration: 123,
    },
    repository: {
      structure: { directories: 1, layout: [], essentials: {} },
      metrics: { totalFiles: 1, fileTypes: { ts: 1 } },
      health: {},
      cleanup: { emptyFiles: { found: 0, deleted: 0, skipped: 0 }, issues: [] },
    },
    components: {
      inventory: {
        Button: {
          name: 'Button',
          path: './src/components/ui/Button',
          hasComponent: true,
          hasTest: true,
          hasStory: false,
          hasDemo: false,
          hasIndex: true,
          complexity: 'simple',
          testQuality: 'good',
          linesOfCode: 10,
        },
        Card: {
          name: 'Card',
          path: './src/components/ui/Card',
          hasComponent: true,
          hasTest: false,
          hasStory: true,
          hasDemo: false,
          hasIndex: true,
          complexity: 'moderate',
          testQuality: 'poor',
          linesOfCode: 25,
        },
      },
      metrics: {
        total: 2,
        withTests: 1,
        withStories: 1,
        withIndex: 2,
        withDemo: 0,
        indexExtensionIssues: 0,
        testQualityDistribution: { none: 0, fail: 1, pass: 1, excellent: 0 },
        testCoverage: 50,
        storyCoverage: 50,
        indexCoverage: 100,
        qualityTestCoverage: 50,
      },
      quality: {
        score: 70,
        issues: ['Card missing tests'],
        strengths: ['Button has tests'],
        metrics: { componentCompleteness: { tests: 50, stories: 50, indexes: 100 } },
      },
      architecture: {},
    },
    codebase: {
      files: { typescript: 1, tests: 1, stories: 1, testRatio: 1 },
      dependencies: { production: 1, development: 1, scripts: 1 },
      tests: {},
      coverage: {},
      pipeline: {
        typescript: { status: 'pass', duration: 1, errors: [] },
        linting: { status: 'pass', duration: 1, errors: [] },
        testing: { status: 'pass', duration: 1, errors: [] },
        building: { status: 'pass', duration: 1, errors: [] },
        overall: { status: 'pass', score: 90 },
      },
    },
    bestPractices: { score: 80, issues: [], warnings: [], passed: [], categories: {} },
    recommendations: [],
    ...overrides,
  } as IntelligenceReport;
}

// Mock global fetch
const originalFetch = global.fetch;

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('useIntelligenceReport', () => {
  it('fetches and returns data successfully', async () => {
    const mockReport = buildReport();
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => mockReport });

    const { result } = renderHook(() => useIntelligenceReport());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeNull();
    expect(result.current.data).toEqual(mockReport);
    expect(global.fetch).toHaveBeenCalledWith('/api/data');
  });

  it('handles non-ok HTTP responses', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValue({ ok: false, status: 500, statusText: 'Server Error' });

    const { result } = renderHook(() => useIntelligenceReport());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toContain('HTTP 500');
    expect(result.current.data).toBeNull();
  });

  it('handles invalid structure', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ not: 'a report' }) });

    const { result } = renderHook(() => useIntelligenceReport());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toContain('Invalid intelligence report structure');
    expect(result.current.data).toBeNull();
  });

  it('supports refetch', async () => {
    const mockReport = buildReport();
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => mockReport });

    const { result } = renderHook(() => useIntelligenceReport());

    await waitFor(() => expect(result.current.loading).toBe(false));

    // Change mocked data for second call
    const secondReport = buildReport({ metadata: { ...mockReport.metadata, version: '1.0.1' } });
    (global.fetch as any).mockResolvedValueOnce({ ok: true, json: async () => secondReport });

    await act(async () => {
      await result.current.refetch();
    });

    expect(result.current.data?.metadata.version).toBe('1.0.1');
  });
});

describe('useFilteredComponents', () => {
  it('filters by hasTest and complexity', () => {
    const report = buildReport();
    const { result: reportHook } = renderHook(() => report);
    const { result } = renderHook(() =>
      useFilteredComponents(reportHook.current, { hasTest: true, complexity: 'simple' })
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0].name).toBe('Button');
  });
});

describe('useIntelligenceMetrics', () => {
  it('returns zeroed metrics when report null', () => {
    const { result } = renderHook(() => useIntelligenceMetrics(null));
    expect(result.current.componentCount).toBe(0);
    expect(result.current.overallScore).toBe(0);
  });

  it('computes weighted overall score', () => {
    const report = buildReport();
    const { result } = renderHook(() => useIntelligenceMetrics(report));
    expect(result.current.overallScore).toBeGreaterThan(0);
    expect(result.current.buildStatus).toBe('pass');
  });
});

afterAll(() => {
  global.fetch = originalFetch;
});
