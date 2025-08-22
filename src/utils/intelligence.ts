/**
 * Utility functions for working with Intelligence Report data
 */

import {
  ComponentComplexity,
  ComponentInventoryItem,
  IntelligenceReport,
  RecommendationPriority,
  TestQuality,
} from '@/types/intelligence';

/**
 * Get components by complexity level
 */
export function getComponentsByComplexity(
  report: IntelligenceReport,
  complexity: ComponentComplexity
): ComponentInventoryItem[] {
  return Object.values(report.components.inventory).filter(
    component => component.complexity === complexity
  );
}

/**
 * Get components by test quality
 */
export function getComponentsByTestQuality(
  report: IntelligenceReport,
  quality: TestQuality
): ComponentInventoryItem[] {
  return Object.values(report.components.inventory).filter(
    component => component.testQuality === quality
  );
}

/**
 * Get components missing specific features
 */
export function getComponentsMissingFeatures(report: IntelligenceReport) {
  const inventory = report.components.inventory;

  return {
    missingTests: Object.values(inventory).filter(c => !c.hasTest),
    missingStories: Object.values(inventory).filter(c => !c.hasStory),
    missingDemos: Object.values(inventory).filter(c => !c.hasDemo),
    missingIndex: Object.values(inventory).filter(c => !c.hasIndex),
  };
}

/**
 * Get recommendations by priority
 */
export function getRecommendationsByPriority(
  report: IntelligenceReport,
  priority: RecommendationPriority
) {
  return report.recommendations.filter(rec => rec.priority === priority);
}

/**
 * Calculate overall health score
 */
export function calculateOverallHealthScore(report: IntelligenceReport): number {
  const pipelineScore = report.codebase.pipeline.overall.score;
  const componentsScore = report.components.quality.score;
  const bestPracticesScore = report.bestPractices.score;

  // Weighted average: pipeline 40%, components 40%, best practices 20%
  return Math.round(pipelineScore * 0.4 + componentsScore * 0.4 + bestPracticesScore * 0.2);
}

/**
 * Get critical issues that need immediate attention
 */
export function getCriticalIssues(report: IntelligenceReport) {
  const criticalIssues = [];

  // Pipeline failures
  if (report.codebase.pipeline.overall.status === 'fail') {
    criticalIssues.push({
      type: 'pipeline',
      message: 'Build pipeline is failing',
      severity: 'high' as const,
      details: Object.entries(report.codebase.pipeline)
        .filter(
          ([_, stage]) => typeof stage === 'object' && 'status' in stage && stage.status === 'fail'
        )
        .map(([name]) => name),
    });
  }

  // High severity best practice issues
  const highSeverityIssues = report.bestPractices.issues.filter(issue => issue.severity === 'high');

  criticalIssues.push(
    ...highSeverityIssues.map(issue => ({
      type: 'best-practice',
      message: issue.message,
      severity: issue.severity,
      fix: issue.fix,
    }))
  );

  return criticalIssues;
}

/**
 * Get component statistics summary
 */
export function getComponentStatsSummary(report: IntelligenceReport) {
  const metrics = report.components.metrics;

  return {
    total: metrics.total,
    testCoverage: `${metrics.testCoverage}%`,
    storyCoverage: `${metrics.storyCoverage}%`,
    excellentQuality: metrics.testQualityDistribution.excellent,
    excellentQualityPercentage: `${Math.round((metrics.testQualityDistribution.excellent / metrics.total) * 100)}%`,
  };
}

/**
 * Get file type distribution for visualization
 */
export function getFileTypeDistribution(report: IntelligenceReport) {
  const fileTypes = report.repository.metrics.fileTypes;

  return Object.entries(fileTypes)
    .map(([extension, count]) => ({
      name: extension.replace('.', ''),
      value: count,
      percentage: Math.round((count / report.repository.metrics.totalFiles) * 100),
    }))
    .sort((a, b) => b.value - a.value);
}

/**
 * Format scan metadata for display
 */
export function formatScanMetadata(report: IntelligenceReport) {
  return {
    scanTime: new Date(report.metadata.scanTime).toLocaleString(),
    version: report.metadata.version,
    scanner: report.metadata.scanner,
    duration: report.metadata.duration === 0 ? 'Instant' : `${report.metadata.duration}ms`,
  };
}

/**
 * Check if report is recent (within last 24 hours)
 */
export function isReportRecent(report: IntelligenceReport): boolean {
  const scanTime = new Date(report.metadata.scanTime);
  const now = new Date();
  const hoursDiff = (now.getTime() - scanTime.getTime()) / (1000 * 60 * 60);
  return hoursDiff < 24;
}
