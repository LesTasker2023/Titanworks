/**
 * Example component demonstrating how to use the Intelligence Report types and utilities
 */

'use client';

import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';
import { useIntelligenceMetrics, useIntelligenceReport } from '@/hooks/useIntelligence';
import {
  formatScanMetadata,
  getComponentStatsSummary,
  getCriticalIssues,
} from '@/utils/intelligence';

/**
 * Intelligence Dashboard Example Component
 */
export default function IntelligenceDashboardExample() {
  const { data: report, loading, error, refetch } = useIntelligenceReport();
  const metrics = useIntelligenceMetrics(report);

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">Loading intelligence report...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800">Error Loading Report</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={refetch}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Retry
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!report) {
    return null;
  }

  const componentStats = getComponentStatsSummary(report);
  const criticalIssues = getCriticalIssues(report);
  const scanMetadata = formatScanMetadata(report);

  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Intelligence Dashboard</h1>
        <p className="text-gray-600">
          Last scan: {scanMetadata.scanTime} • Version: {scanMetadata.version}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Overall Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.overallScore}%</div>
            <Progress value={metrics.overallScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Components</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{componentStats.total}</div>
            <p className="text-xs text-gray-500">{componentStats.testCoverage} test coverage</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Build Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge
              variant={metrics.buildStatus === 'pass' ? 'default' : 'destructive'}
              className="text-sm"
            >
              {metrics.buildStatus.toUpperCase()}
            </Badge>
            <p className="text-xs text-gray-500 mt-1">Pipeline status</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Critical Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{metrics.criticalIssues}</div>
            <p className="text-xs text-gray-500">Need attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Critical Issues */}
      {criticalIssues.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800">Critical Issues</CardTitle>
            <CardDescription className="text-red-700">
              Issues that need immediate attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {criticalIssues.map((issue, index) => (
                <div key={index} className="p-3 bg-white rounded border border-red-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="destructive">{issue.severity}</Badge>
                    <span className="text-sm font-medium">{issue.type}</span>
                  </div>
                  <p className="text-sm text-gray-700">{issue.message}</p>
                  {'fix' in issue && (
                    <p className="text-xs text-gray-600 mt-1">
                      <strong>Fix:</strong> {issue.fix}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Component Quality */}
      <Card>
        <CardHeader>
          <CardTitle>Component Quality Overview</CardTitle>
          <CardDescription>
            Quality distribution across {componentStats.total} components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-green-600">
                {componentStats.excellentQuality}
              </div>
              <div className="text-xs text-gray-500">Excellent Quality</div>
              <div className="text-xs text-gray-400">
                {componentStats.excellentQualityPercentage}
              </div>
            </div>

            <div className="text-center">
              <div className="text-lg font-semibold">{componentStats.testCoverage}</div>
              <div className="text-xs text-gray-500">Test Coverage</div>
            </div>

            <div className="text-center">
              <div className="text-lg font-semibold">{componentStats.storyCoverage}</div>
              <div className="text-xs text-gray-500">Story Coverage</div>
            </div>

            <div className="text-center">
              <div className="text-lg font-semibold text-blue-600">
                {report.bestPractices.score}%
              </div>
              <div className="text-xs text-gray-500">Best Practices</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
