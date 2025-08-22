'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';

interface CommandCenterData {
  metadata: {
    version: string;
    scanTime: string;
    duration: number;
  };
  overview: {
    totalComponents: number;
    completionRate: number;
    qualityScore: number;
    fileCount: number;
  };
  dashboard: {
    overallScore: number;
    recommendations: Array<{
      type: 'info' | 'warning' | 'error';
      message: string;
    }>;
  };
  systemHealth: {
    tests: {
      rawOutput: string;
      total: number;
      passed: number;
      failed: number;
    };
  };
  bestPractices: {
    score: number;
    issues: Array<{
      severity: 'low' | 'medium' | 'high';
      type: string;
      message: string;
      fix: string;
    }>;
  };
  components: {
    quality: {
      strengths: string[];
    };
  };
  recommendations: Array<{
    priority: 'low' | 'medium' | 'high';
    category: string;
    issue: string;
    action: string;
    impact: string;
  }>;
}

interface CommandCenterClientProps {
  data: CommandCenterData;
}

export default function CommandCenterClient({ data }: CommandCenterClientProps) {
  const testResults = data.systemHealth?.tests || { total: 0, passed: 0, failed: 0 };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-content-primary mb-2">Command Center</h1>
        <p className="text-content-secondary">
          Real-time intelligence and analytics for your codebase
        </p>
      </div>

      {/* Emergency Notice */}
      <div className="mb-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
          🚨 Emergency Optimization Mode
        </h3>
        <p className="text-yellow-700 dark:text-yellow-300 text-sm">
          Charts have been temporarily disabled to resolve Vercel&apos;s 250MB serverless function
          limit. Basic analytics are still available below. Full visualization will return with
          lightweight alternatives.
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="quality">Quality</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-surface-secondary/40 border-border-default">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-content-secondary">
                  Overall Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-content-primary">
                  {data.dashboard?.overallScore || 0}%
                </div>
                <Progress value={data.dashboard?.overallScore || 0} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="bg-surface-secondary/40 border-border-default">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-content-secondary">
                  Components
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-content-primary">
                  {data.overview?.totalComponents || 0}
                </div>
                <p className="text-xs text-content-tertiary">
                  {data.overview?.completionRate || 0}% complete
                </p>
              </CardContent>
            </Card>

            <Card className="bg-surface-secondary/40 border-border-default">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-content-secondary">
                  Total Tests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-content-primary">{testResults.total}</div>
                <p className="text-xs text-content-tertiary">{testResults.passed} passed</p>
              </CardContent>
            </Card>

            <Card className="bg-surface-secondary/40 border-border-default">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-content-secondary">
                  Test Success Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-content-primary">
                  {testResults.total > 0
                    ? ((testResults.passed / testResults.total) * 100).toFixed(1)
                    : 0}
                  %
                </div>
                <Progress
                  value={testResults.total > 0 ? (testResults.passed / testResults.total) * 100 : 0}
                  className="mt-2"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Quality Tab */}
        <TabsContent value="quality" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-surface-secondary/40 border-border-default">
              <CardHeader>
                <CardTitle className="text-content-primary">Quality Issues</CardTitle>
                <CardDescription className="text-content-secondary">
                  Areas needing attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.bestPractices?.issues?.map((issue, index) => (
                    <div
                      key={index}
                      className="border border-border-default rounded-lg p-4 bg-surface-secondary/20"
                    >
                      <div className="flex items-center gap-2 mb-2">
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
                        <span className="text-content-secondary text-sm">{issue.type}</span>
                      </div>
                      <p className="text-content-primary text-sm mb-2">{issue.message}</p>
                      <p className="text-content-tertiary text-xs">{issue.fix}</p>
                    </div>
                  )) || <p className="text-content-secondary">No quality issues found.</p>}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-surface-secondary/40 border-border-default">
              <CardHeader>
                <CardTitle className="text-content-primary">Quality Strengths</CardTitle>
                <CardDescription className="text-content-secondary">
                  What&apos;s working well
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.components?.quality?.strengths?.map((strength, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-green-900/20 border border-green-500/30 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-100 text-sm">{strength}</span>
                    </div>
                  )) || <p className="text-content-secondary">No strengths data available.</p>}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <Card className="bg-surface-secondary/40 border-border-default">
            <CardHeader>
              <CardTitle className="text-content-primary">Actionable Recommendations</CardTitle>
              <CardDescription className="text-content-secondary">
                Strategic improvements based on intelligence analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.recommendations?.map((rec, index) => (
                  <div
                    key={index}
                    className="border border-border-default rounded-lg p-6 bg-surface-secondary/20"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <Badge
                        variant={
                          rec.priority === 'high'
                            ? 'destructive'
                            : rec.priority === 'medium'
                              ? 'default'
                              : 'secondary'
                        }
                      >
                        {rec.priority} priority
                      </Badge>
                      <Badge variant="outline" className="text-content-secondary">
                        {rec.category}
                      </Badge>
                    </div>
                    <h4 className="text-content-primary font-semibold mb-2">{rec.issue}</h4>
                    <p className="text-content-secondary text-sm mb-3">{rec.action}</p>
                    <p className="text-content-tertiary text-xs italic">Impact: {rec.impact}</p>
                  </div>
                )) || <p className="text-content-secondary">No recommendations available.</p>}
              </div>
            </CardContent>
          </Card>

          {/* Scan Metadata */}
          <Card className="bg-surface-secondary/40 border-border-default">
            <CardHeader>
              <CardTitle className="text-content-primary">Scan Information</CardTitle>
              <CardDescription className="text-content-secondary">
                Intelligence engine metadata
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-surface-secondary rounded-lg border border-border-default">
                  <div className="text-content-primary font-semibold">Scanner Version</div>
                  <div className="text-content-secondary text-sm">
                    {data.metadata?.version || 'Unknown'}
                  </div>
                </div>
                <div className="text-center p-4 bg-surface-secondary rounded-lg border border-border-default">
                  <div className="text-content-primary font-semibold">Scan Duration</div>
                  <div className="text-content-secondary text-sm">
                    {data.metadata?.duration || 0}ms
                  </div>
                </div>
                <div className="text-center p-4 bg-surface-secondary rounded-lg border border-border-default">
                  <div className="text-content-primary font-semibold">Last Scan</div>
                  <div className="text-content-secondary text-sm">
                    {data.metadata?.scanTime
                      ? new Date(data.metadata.scanTime).toLocaleString()
                      : 'Unknown'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
