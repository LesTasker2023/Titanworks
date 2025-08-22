# Intelligence Report System

A comprehensive TypeScript interface and utility system for working with repository intelligence data.

## Overview

This system provides type-safe access to repository intelligence reports, including components analysis, code quality metrics, build pipeline status, and best practices compliance.

## Files Structure

```
src/
├── types/
│   ├── intelligence.ts      # Main TypeScript interfaces
│   └── index.ts            # Type exports
├── utils/
│   └── intelligence.ts     # Utility functions
├── hooks/
│   └── useIntelligence.ts  # React hooks
└── components/examples/
    └── IntelligenceDashboardExample.tsx  # Usage example
```

## Core Types

### `IntelligenceReport`

Main interface representing the complete intelligence report structure.

```typescript
import { IntelligenceReport } from '@/types/intelligence';

const report: IntelligenceReport = {
  metadata: {
    /* scan info */
  },
  repository: {
    /* repo structure */
  },
  components: {
    /* component analysis */
  },
  codebase: {
    /* code metrics */
  },
  bestPractices: {
    /* quality checks */
  },
  recommendations: [
    /* actionable items */
  ],
};
```

### Key Sub-interfaces

- **`ComponentInventoryItem`** - Individual component analysis
- **`PipelineInfo`** - Build pipeline status and metrics
- **`BestPracticesInfo`** - Code quality and compliance
- **`Recommendation`** - Actionable improvement suggestions

## API Integration

### Reading from JSON File

The API route (`/api/data`) automatically reads from `public/intelligence-report.json`:

```typescript
// API route with type safety
export async function GET(): Promise<NextResponse<IntelligenceReport | { error: string }>> {
  const data = JSON.parse(fileContents);

  if (!isIntelligenceReport(data)) {
    return NextResponse.json({ error: 'Invalid structure' }, { status: 500 });
  }

  return NextResponse.json(data);
}
```

## React Hooks

### `useIntelligenceReport()`

Fetch and manage intelligence report data with loading states:

```typescript
import { useIntelligenceReport } from '@/hooks/useIntelligence';

function MyComponent() {
  const { data, loading, error, refetch } = useIntelligenceReport();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;

  return <div>Report loaded with {data.components.metrics.total} components</div>;
}
```

### `useIntelligenceMetrics()`

Get computed metrics from a report:

```typescript
const metrics = useIntelligenceMetrics(report);
// Returns: { overallScore, componentCount, testCoverage, buildStatus, criticalIssues }
```

## Utility Functions

### Component Analysis

```typescript
import {
  getComponentsByComplexity,
  getComponentsByTestQuality,
  getComponentsMissingFeatures,
} from '@/utils/intelligence';

// Get high complexity components
const complexComponents = getComponentsByComplexity(report, 'high');

// Get components with excellent test quality
const wellTested = getComponentsByTestQuality(report, 'excellent');

// Find missing features
const missing = getComponentsMissingFeatures(report);
console.log(`${missing.missingTests.length} components need tests`);
```

### Health Scoring

```typescript
import { calculateOverallHealthScore, getCriticalIssues } from '@/utils/intelligence';

const healthScore = calculateOverallHealthScore(report); // 0-100
const criticalIssues = getCriticalIssues(report); // High priority items
```

### Data Visualization

```typescript
import { getFileTypeDistribution, getComponentStatsSummary } from '@/utils/intelligence';

const fileTypes = getFileTypeDistribution(report);
// Returns: [{ name: 'tsx', value: 272, percentage: 51 }, ...]

const stats = getComponentStatsSummary(report);
// Returns: { total: 50, testCoverage: '98%', excellentQuality: 49 }
```

## Type Guards

Runtime type validation for safe data handling:

```typescript
import { isIntelligenceReport, isComponentInventoryItem } from '@/types/intelligence';

if (isIntelligenceReport(unknownData)) {
  // TypeScript now knows this is IntelligenceReport
  console.log(unknownData.components.metrics.total);
}
```

## Usage Examples

### Basic Dashboard

```typescript
'use client';

import { useIntelligenceReport } from '@/hooks/useIntelligence';
import { getComponentStatsSummary } from '@/utils/intelligence';

export default function Dashboard() {
  const { data: report, loading, error } = useIntelligenceReport();

  if (loading) return <div>Loading intelligence...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!report) return null;

  const stats = getComponentStatsSummary(report);

  return (
    <div>
      <h1>Repository Intelligence</h1>
      <p>Components: {stats.total}</p>
      <p>Test Coverage: {stats.testCoverage}</p>
      <p>Build Status: {report.codebase.pipeline.overall.status}</p>
    </div>
  );
}
```

### Component Quality Report

```typescript
import { getComponentsByTestQuality, getComponentsMissingFeatures } from '@/utils/intelligence';

function ComponentQualityReport({ report }: { report: IntelligenceReport }) {
  const excellentComponents = getComponentsByTestQuality(report, 'excellent');
  const missing = getComponentsMissingFeatures(report);

  return (
    <div>
      <h2>Component Quality</h2>
      <p>{excellentComponents.length} components have excellent test quality</p>
      <p>{missing.missingTests.length} components need tests</p>
      <p>{missing.missingStories.length} components need stories</p>
    </div>
  );
}
```

### Critical Issues Alert

```typescript
import { getCriticalIssues } from '@/utils/intelligence';

function CriticalIssuesAlert({ report }: { report: IntelligenceReport }) {
  const issues = getCriticalIssues(report);

  if (issues.length === 0) {
    return <div className="text-green-600">No critical issues found!</div>;
  }

  return (
    <div className="bg-red-50 border border-red-200 p-4 rounded">
      <h3 className="text-red-800 font-semibold">Critical Issues ({issues.length})</h3>
      {issues.map((issue, index) => (
        <div key={index} className="mt-2">
          <p className="text-red-700">{issue.message}</p>
          {'fix' in issue && (
            <p className="text-red-600 text-sm">Fix: {issue.fix}</p>
          )}
        </div>
      ))}
    </div>
  );
}
```

## Data Source

The intelligence report is generated by scanning the repository and is stored in:

- **Source**: `public/intelligence-report.json`
- **API Endpoint**: `/api/data`
- **Update Frequency**: Generated by repository analysis tools

## Type Safety Benefits

1. **Compile-time validation** - Catch data structure issues early
2. **IntelliSense support** - Full autocomplete in IDEs
3. **Refactoring safety** - Automatic updates when types change
4. **Runtime validation** - Type guards prevent runtime errors
5. **Documentation** - Types serve as living documentation

## Performance Considerations

- **API Route**: Reads file on each request (suitable for development)
- **Caching**: Consider implementing caching for production
- **Large Reports**: Utility functions are optimized for typical report sizes
- **React Hooks**: Use React.memo() for expensive computations

## Best Practices

1. Always use type guards when working with external data
2. Handle loading and error states in React components
3. Use utility functions rather than direct data manipulation
4. Cache computed values when rendering large datasets
5. Validate report freshness using `isReportRecent()`

## Example Component

See `src/components/examples/IntelligenceDashboardExample.tsx` for a complete working example that demonstrates all the key features.
