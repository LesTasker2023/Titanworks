/**
 * React hooks for working with Intelligence Report data
 */

import { IntelligenceReport, isIntelligenceReport } from '@/types/intelligence';
import { useEffect, useMemo, useState } from 'react';

export interface UseIntelligenceReportReturn {
  data: IntelligenceReport | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook to fetch and manage intelligence report data
 */
export function useIntelligenceReport(): UseIntelligenceReportReturn {
  const [data, setData] = useState<IntelligenceReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/data');

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();

      // Check for API error response
      if (result.error) {
        throw new Error(result.error);
      }

      // Validate the data structure
      if (!isIntelligenceReport(result)) {
        throw new Error('Invalid intelligence report structure received from API');
      }

      setData(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Failed to fetch intelligence report:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

/**
 * Hook to get components filtered by specific criteria
 */
export function useFilteredComponents(
  report: IntelligenceReport | null,
  filters: {
    hasTest?: boolean;
    hasStory?: boolean;
    hasDemo?: boolean;
    complexity?: 'low' | 'medium' | 'high';
    testQuality?: 'none' | 'fail' | 'pass' | 'excellent';
  } = {}
) {
  return useState(() => {
    if (!report) return [];

    return Object.values(report.components.inventory).filter(component => {
      if (filters.hasTest !== undefined && component.hasTest !== filters.hasTest) {
        return false;
      }
      if (filters.hasStory !== undefined && component.hasStory !== filters.hasStory) {
        return false;
      }
      if (filters.hasDemo !== undefined && component.hasDemo !== filters.hasDemo) {
        return false;
      }
      if (filters.complexity && component.complexity !== filters.complexity) {
        return false;
      }
      if (filters.testQuality && component.testQuality !== filters.testQuality) {
        return false;
      }
      return true;
    });
  })[0];
}

/**
 * Hook to get real-time intelligence metrics
 */
export function useIntelligenceMetrics(report: IntelligenceReport | null) {
  return useMemo(() => {
    if (!report) {
      return {
        overallScore: 0,
        componentCount: 0,
        testCoverage: 0,
        buildStatus: 'unknown' as const,
        criticalIssues: 0,
      };
    }

    const pipelineScore = report.codebase.pipeline.overall.score;
    const componentScore = report.components.quality.score;
    const bestPracticesScore = report.bestPractices.score;

    // Calculate weighted overall score
    const overallScore = Math.round(
      pipelineScore * 0.4 + componentScore * 0.4 + bestPracticesScore * 0.2
    );

    const criticalIssues = report.bestPractices.issues.filter(
      issue => issue.severity === 'high'
    ).length;

    return {
      overallScore,
      componentCount: report.components.metrics.total,
      testCoverage: report.components.metrics.testCoverage,
      buildStatus: report.codebase.pipeline.overall.status,
      criticalIssues,
    };
  }, [report]);
}
