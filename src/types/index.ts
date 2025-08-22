/**
 * Intelligence Report Types and Utilities
 *
 * This module provides TypeScript interfaces, utility functions, and React hooks
 * for working with intelligence report data from the repository analysis system.
 */

// Export all types
export * from './intelligence';

// Re-export commonly used types for convenience
export type {
  ComponentComplexity,
  ComponentInventoryItem,
  IntelligenceReport,
  IssueSeverity,
  PipelineStatus,
  RecommendationPriority,
  TestQuality,
} from './intelligence';
