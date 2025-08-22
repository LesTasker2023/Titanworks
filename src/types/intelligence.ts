/**
 * TypeScript interfaces for Intelligence Report JSON structure
 * Generated from intelligence-report.json schema
 */

export interface IntelligenceReport {
  metadata: ReportMetadata;
  repository: RepositoryInfo;
  components: ComponentsInfo;
  codebase: CodebaseInfo;
  bestPractices: BestPracticesInfo;
  recommendations: Recommendation[];
}

export interface ReportMetadata {
  scanTime: string;
  version: string;
  scanner: string;
  duration: number;
}

export interface RepositoryInfo {
  structure: RepositoryStructure;
  metrics: RepositoryMetrics;
  health: Record<string, any>; // Empty object in current schema
  cleanup: CleanupInfo;
}

export interface RepositoryStructure {
  directories: number;
  layout: string[];
  essentials: Record<string, boolean>;
}

export interface RepositoryMetrics {
  totalFiles: number;
  fileTypes: Record<string, number>;
}

export interface CleanupInfo {
  emptyFiles: {
    found: number;
    deleted: number;
    skipped: number;
  };
  issues: IssueItem[];
}

export interface ComponentInventoryItem {
  name: string;
  path: string;
  hasComponent: boolean;
  hasTest: boolean;
  hasStory: boolean;
  complexity: 'simple' | 'moderate' | 'complex';
  testQuality: 'poor' | 'fair' | 'good' | 'excellent';
  linesOfCode: number;
}

export interface ComponentsInfo {
  inventory: Record<string, ComponentInventoryItem>;
  metrics: ComponentMetrics;
  quality: ComponentQuality;
  architecture: Record<string, any>; // Empty object in current schema
}

interface IssueItem {
  type: string;
  message: string;
  file?: string;
  line?: number;
}

interface WarningItem {
  type: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
}

interface PassedItem {
  test: string;
  description: string;
  score: number;
}

export interface ComponentReport {
  component: string;
  path: string;
  health: 'excellent' | 'good' | 'warning' | 'critical';
  score: number;
  issues: IssueItem[];
  lastUpdated: string;
}

export interface ComponentMetrics {
  total: number;
  withTests: number;
  withStories: number;
  withIndex: number;
  withDemo: number;
  indexExtensionIssues: number;
  testQualityDistribution: {
    none: number;
    fail: number;
    pass: number;
    excellent: number;
  };
  testCoverage: number;
  storyCoverage: number;
  indexCoverage: number;
  qualityTestCoverage: number;
}

export interface ComponentQuality {
  score: number;
  issues: string[];
  strengths: string[];
  metrics: {
    componentCompleteness: {
      tests: number;
      stories: number;
      indexes: number;
    };
  };
}

export interface CodebaseInfo {
  files: CodebaseFiles;
  dependencies: CodebaseDependencies;
  tests: Record<string, any>; // Empty object in current schema
  coverage: Record<string, any>; // Empty object in current schema
  pipeline: PipelineInfo;
}

export interface CodebaseFiles {
  typescript: number;
  tests: number;
  stories: number;
  testRatio: number;
}

export interface CodebaseDependencies {
  production: number;
  development: number;
  scripts: number;
}

export interface PipelineInfo {
  typescript: PipelineStage;
  linting: PipelineStage;
  testing: PipelineStage;
  building: PipelineStage;
  overall: {
    status: PipelineStatus;
    score: number;
  };
}

export interface PipelineStage {
  status: PipelineStatus;
  duration: number;
  errors: string[];
}

export type PipelineStatus = 'pass' | 'fail';

export interface BestPracticesInfo {
  score: number;
  issues: BestPracticeIssue[];
  warnings: WarningItem[];
  passed: PassedItem[];
  categories: Record<string, BestPracticeCategory>;
}

export interface BestPracticeIssue {
  severity: 'low' | 'medium' | 'high';
  type: string;
  message: string;
  fix: string;
}

export interface BestPracticeCategory {
  score: number;
  issues: BestPracticeIssue[];
  checks: number;
}

export interface Recommendation {
  priority: 'low' | 'medium' | 'high';
  category: string;
  issue: string;
  action: string;
  impact: string;
}

// Utility types for specific use cases
export type ComponentName = keyof ComponentsInfo['inventory'];
export type ComponentComplexity = ComponentInventoryItem['complexity'];
export type TestQuality = ComponentInventoryItem['testQuality'];
export type IssueSeverity = BestPracticeIssue['severity'];
export type RecommendationPriority = Recommendation['priority'];

// Type guards for runtime type checking
export function isIntelligenceReport(obj: unknown): obj is IntelligenceReport {
  return (
    !!obj &&
    typeof obj === 'object' &&
    'metadata' in obj &&
    'repository' in obj &&
    'components' in obj &&
    'codebase' in obj &&
    'bestPractices' in obj &&
    'recommendations' in obj
  );
}

export function isComponentInventoryItem(obj: unknown): obj is ComponentInventoryItem {
  return (
    !!obj &&
    typeof obj === 'object' &&
    'name' in obj &&
    'path' in obj &&
    'hasComponent' in obj &&
    'complexity' in obj &&
    'testQuality' in obj
  );
}
