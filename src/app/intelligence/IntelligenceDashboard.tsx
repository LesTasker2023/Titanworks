'use client';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import VercelIntegration from '@/components/vercel/VercelIntegration';
import { useIntelligenceMetrics, useIntelligenceReport } from '@/hooks/useIntelligence';
import { ComponentInventoryItem, IntelligenceReport } from '@/types/intelligence';
import {
  formatScanMetadata,
  getComponentsByComplexity,
  getComponentsByTestQuality,
  getComponentsMissingFeatures,
  getComponentStatsSummary,
  getCriticalIssues,
  getFileTypeDistribution,
  getRecommendationsByPriority,
  isReportRecent,
} from '@/utils/intelligence';
import { AlertTriangle, CheckCircle, FileText, RefreshCw, TrendingUp } from 'lucide-react';
import React, { useState } from 'react';

/**
 * Main Intelligence Dashboard Component
 */
export default function IntelligenceDashboard() {
  const { data: report, loading, error, refetch } = useIntelligenceReport();
  const metrics = useIntelligenceMetrics(report);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading intelligence report...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
        <Card className="border-destructive/20 bg-destructive/5 max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Error Loading Intelligence Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive/80 mb-4">{error}</p>
            <Button onClick={handleRefresh} variant="destructive" className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
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
  const isRecent = isReportRecent(report);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Intelligence Dashboard</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Last scan: {scanMetadata.scanTime}</span>
              <span>•</span>
              <span>Version: {scanMetadata.version}</span>
              <span>•</span>
              <span>Duration: {scanMetadata.duration}</span>
              {!isRecent && (
                <Badge variant="secondary" className="ml-2">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Data may be stale
                </Badge>
              )}
            </div>
          </div>
          <Button onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Overall Score"
            value={`${metrics.overallScore}%`}
            progress={metrics.overallScore}
            icon={<TrendingUp className="h-5 w-5" />}
            color={
              metrics.overallScore >= 80 ? 'green' : metrics.overallScore >= 60 ? 'yellow' : 'red'
            }
          />
          <MetricCard
            title="Components"
            value={componentStats.total.toString()}
            subtitle={`${componentStats.testCoverage} test coverage`}
            icon={<FileText className="h-5 w-5" />}
          />
          <MetricCard
            title="Build Status"
            value={metrics.buildStatus.toUpperCase()}
            badge={
              <Badge variant={metrics.buildStatus === 'pass' ? 'default' : 'destructive'}>
                {metrics.buildStatus === 'pass' ? (
                  <CheckCircle className="h-3 w-3 mr-1" />
                ) : (
                  <AlertTriangle className="h-3 w-3 mr-1" />
                )}
                {metrics.buildStatus.toUpperCase()}
              </Badge>
            }
            subtitle="Pipeline status"
          />
          <MetricCard
            title="Critical Issues"
            value={metrics.criticalIssues.toString()}
            subtitle="Need attention"
            color={
              metrics.criticalIssues === 0
                ? 'green'
                : metrics.criticalIssues <= 2
                  ? 'yellow'
                  : 'red'
            }
            icon={<AlertTriangle className="h-5 w-5" />}
          />
        </div>

        {/* Critical Issues Alert */}
        {criticalIssues.length > 0 && (
          <Card className="border-destructive/20 bg-destructive/5">
            <CardHeader>
              <CardTitle className="text-destructive flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Critical Issues ({criticalIssues.length})
              </CardTitle>
              <CardDescription className="text-destructive/80">
                Issues that require immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {criticalIssues.map((issue, index) => (
                  <div key={index} className="p-4 bg-card rounded-lg border border-destructive/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="destructive">{issue.severity}</Badge>
                      <span className="text-sm font-medium capitalize text-foreground">
                        {issue.type}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/80 mb-2">{issue.message}</p>
                    {'fix' in issue && (
                      <p className="text-xs text-muted-foreground bg-muted p-2 rounded">
                        <strong>Fix:</strong> {issue.fix}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="quality">Quality</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="files">File Analysis</TabsTrigger>
            <TabsTrigger value="vercel">Deployments</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <OverviewTab report={report} componentStats={componentStats} />
          </TabsContent>

          <TabsContent value="components" className="space-y-6">
            <ComponentsTab report={report} />
          </TabsContent>

          <TabsContent value="quality" className="space-y-6">
            <QualityTab report={report} />
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <RecommendationsTab report={report} />
          </TabsContent>

          <TabsContent value="files" className="space-y-6">
            <FilesTab report={report} />
          </TabsContent>

          <TabsContent value="vercel" className="space-y-6">
            <VercelIntegration />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  progress?: number;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  color?: 'green' | 'yellow' | 'red';
}

function MetricCard({ title, value, subtitle, progress, icon, badge, color }: MetricCardProps) {
  const colorClasses = {
    green: 'text-green-600 dark:text-green-400',
    yellow: 'text-yellow-600 dark:text-yellow-400',
    red: 'text-red-600 dark:text-red-400',
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {badge ? (
          badge
        ) : (
          <div className={`text-2xl font-bold ${color ? colorClasses[color] : 'text-foreground'}`}>
            {value}
          </div>
        )}
        {progress !== undefined && <Progress value={progress} className="mt-2" />}
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  );
}

function OverviewTab({
  report,
  componentStats,
}: {
  report: IntelligenceReport;
  componentStats: any;
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Component Quality Overview</CardTitle>
            <CardDescription>
              Quality distribution across {componentStats.total} components
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {componentStats.excellentQuality}
                </div>
                <div className="text-sm text-green-700 dark:text-green-300">Excellent Quality</div>
                <div className="text-xs text-green-600 dark:text-green-400">
                  {componentStats.excellentQualityPercentage}
                </div>
              </div>

              <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {componentStats.testCoverage}
                </div>
                <div className="text-sm text-blue-700 dark:text-blue-300">Test Coverage</div>
              </div>

              <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {componentStats.storyCoverage}
                </div>
                <div className="text-sm text-purple-700 dark:text-purple-300">Story Coverage</div>
              </div>

              <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-800">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {report.bestPractices.score}%
                </div>
                <div className="text-sm text-orange-700 dark:text-orange-300">Best Practices</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pipeline Status</CardTitle>
            <CardDescription>Build pipeline health and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(report.codebase.pipeline).map(([stage, info]) => {
                if (stage === 'overall' || typeof info !== 'object' || !('status' in info))
                  return null;

                return (
                  <div
                    key={stage}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${info.status === 'pass' ? 'bg-green-500' : 'bg-red-500'}`}
                      />
                      <span className="font-medium capitalize text-foreground">{stage}</span>
                    </div>
                    <div className="text-right">
                      <Badge variant={info.status === 'pass' ? 'default' : 'destructive'}>
                        {info.status}
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">{info.duration}ms</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vercel Integration Overview */}
      <VercelIntegration />
    </div>
  );
}

function ComponentsTab({ report }: { report: IntelligenceReport }) {
  const missingFeatures = getComponentsMissingFeatures(report);
  const highComplexity = getComponentsByComplexity(report, 'high');
  const excellentQuality = getComponentsByTestQuality(report, 'excellent');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Missing Features</CardTitle>
          <CardDescription>Components that need attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <FeatureMissingItem
              title="Missing Tests"
              count={missingFeatures.missingTests.length}
              components={missingFeatures.missingTests}
            />
            <FeatureMissingItem
              title="Missing Stories"
              count={missingFeatures.missingStories.length}
              components={missingFeatures.missingStories}
            />
            <FeatureMissingItem
              title="Missing Demos"
              count={missingFeatures.missingDemos.length}
              components={missingFeatures.missingDemos}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Component Insights</CardTitle>
          <CardDescription>Analysis by complexity and quality</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
              <div className="text-lg font-semibold text-red-700 dark:text-red-300">
                {highComplexity.length} High Complexity
              </div>
              <div className="text-sm text-red-600 dark:text-red-400">
                Components that may need refactoring
              </div>
              {highComplexity.slice(0, 3).map(comp => (
                <div key={comp.name} className="text-xs text-red-500 dark:text-red-400 mt-1">
                  {comp.name}
                </div>
              ))}
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
              <div className="text-lg font-semibold text-green-700 dark:text-green-300">
                {excellentQuality.length} Excellent Quality
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">
                Well-tested components with great coverage
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function FeatureMissingItem({
  title,
  count,
  components,
}: {
  title: string;
  count: number;
  components: ComponentInventoryItem[];
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border rounded-lg p-3">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="font-medium">{title}</span>
        <Badge variant={count === 0 ? 'default' : 'secondary'}>{count}</Badge>
      </div>
      {expanded && count > 0 && (
        <div className="mt-2 space-y-1">
          {components.slice(0, 5).map(comp => (
            <div key={comp.name} className="text-xs text-muted-foreground pl-2">
              {comp.name}
            </div>
          ))}
          {components.length > 5 && (
            <div className="text-xs text-muted-foreground/70 pl-2">
              ... and {components.length - 5} more
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function QualityTab({ report }: { report: IntelligenceReport }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Best Practices Analysis</CardTitle>
          <CardDescription>Code quality and compliance assessment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(report.bestPractices.categories).map(([category, info]) => (
              <div key={category} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium capitalize">
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <div className="text-right">
                    <div className="text-sm font-semibold">
                      {info.score}/{info.checks}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {Math.round((info.score / info.checks) * 100)}% passed
                    </div>
                  </div>
                </div>
                <Progress value={(info.score / info.checks) * 100} className="mb-2" />
                {info.issues.length > 0 && (
                  <div className="space-y-2">
                    {info.issues.map((issue, index) => (
                      <div key={index} className="text-sm bg-muted p-2 rounded">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            variant={
                              issue.severity === 'high'
                                ? 'destructive'
                                : issue.severity === 'medium'
                                  ? 'default'
                                  : 'secondary'
                            }
                          >
                            {issue.severity}
                          </Badge>
                          <span className="font-medium text-foreground">{issue.type}</span>
                        </div>
                        <p className="text-foreground/80">{issue.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function RecommendationsTab({ report }: { report: IntelligenceReport }) {
  const highPriority = getRecommendationsByPriority(report, 'high');
  const mediumPriority = getRecommendationsByPriority(report, 'medium');
  const lowPriority = getRecommendationsByPriority(report, 'low');

  return (
    <div className="space-y-6">
      {[
        { title: 'High Priority', recommendations: highPriority, variant: 'destructive' as const },
        { title: 'Medium Priority', recommendations: mediumPriority, variant: 'default' as const },
        { title: 'Low Priority', recommendations: lowPriority, variant: 'secondary' as const },
      ].map(
        ({ title, recommendations, variant }) =>
          recommendations.length > 0 && (
            <Card key={title}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {title}
                  <Badge variant={variant}>{recommendations.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {rec.category}
                        </Badge>
                        <Badge variant={variant}>{rec.priority}</Badge>
                      </div>
                      <h4 className="font-semibold mb-2 text-foreground">{rec.issue}</h4>
                      <p className="text-sm text-foreground/80 mb-2">{rec.action}</p>
                      <p className="text-xs text-muted-foreground bg-muted p-2 rounded">
                        <strong>Impact:</strong> {rec.impact}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
      )}
    </div>
  );
}

function FilesTab({ report }: { report: IntelligenceReport }) {
  const fileTypes = getFileTypeDistribution(report);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>File Type Distribution</CardTitle>
          <CardDescription>
            {report.repository.metrics.totalFiles} total files across the repository
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {fileTypes.slice(0, 10).map(fileType => (
              <div key={fileType.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm">.{fileType.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{fileType.value}</span>
                  <span className="text-xs text-muted-foreground">({fileType.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Repository Structure</CardTitle>
          <CardDescription>Directory layout and essential files</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2 text-foreground">
                Directories ({report.repository.structure.directories})
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {report.repository.structure.layout.map(dir => (
                  <div key={dir} className="text-sm bg-muted p-2 rounded font-mono text-foreground">
                    {dir}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2 text-foreground">Essential Files</h4>
              <div className="space-y-2">
                {Object.entries(report.repository.structure.essentials).map(([file, exists]) => (
                  <div key={file} className="flex items-center justify-between">
                    <span className="font-mono text-sm text-foreground">{file}</span>
                    <Badge variant={exists ? 'default' : 'destructive'}>
                      {exists ? (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      ) : (
                        <AlertTriangle className="h-3 w-3 mr-1" />
                      )}
                      {exists ? 'Present' : 'Missing'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
