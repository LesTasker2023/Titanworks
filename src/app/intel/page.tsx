'use client';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { useVercelDeploymentStatus, useVercelIntegration } from '@/hooks/useVercel';
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
  RefreshCw,
  TestTube,
  TrendingUp,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface IntelData {
  buildTime: string;
  tests: {
    total: number;
    passed: number;
    failed: number;
    coverage: number;
  };
  components: {
    total: number;
    withTests: number;
    withStories: number;
  };
  codebase: {
    files: number;
    lines: number;
    languages: Record<string, number>;
  };
  buildInfo: {
    nodeVersion: string;
    nextVersion: string;
    buildDuration: number;
  };
}

/**
 * Intel Dashboard - Real-time deployment intelligence + build-time analysis
 */
export default function IntelPage() {
  const [intelData, setIntelData] = useState<IntelData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Vercel integration for real-time deployment data
  const {
    data: vercelData,
    loading: vercelLoading,
    error: vercelError,
    refetch: refetchVercel,
  } = useVercelIntegration({
    enabled: true,
    refreshInterval: 30000,
  });

  const deploymentStats = useVercelDeploymentStatus({
    deployments: vercelData?.deployments || [],
  });

  // Fetch build-time intel data
  const fetchIntelData = async () => {
    try {
      const response = await fetch('/intel-data.json');
      if (response.ok) {
        const data = await response.json();
        setIntelData(data);
      }
    } catch (error) {
      console.warn('Intel data not available - run build to generate');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchVercel(), fetchIntelData()]);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchIntelData();
  }, []);

  if (loading && vercelLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading intel dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Intel Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Real-time deployment intelligence • Last updated: {new Date().toLocaleString()}
            </p>
          </div>
          <Button onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Live Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Deployment Health"
            value={`${vercelData?.healthScore || 0}%`}
            progress={vercelData?.healthScore || 0}
            icon={<TrendingUp className="h-5 w-5" />}
            color={
              (vercelData?.healthScore || 0) >= 80
                ? 'green'
                : (vercelData?.healthScore || 0) >= 60
                  ? 'yellow'
                  : 'red'
            }
            subtitle="Live production health"
          />

          <MetricCard
            title="Build Status"
            value={vercelData?.latestDeployment?.state || 'UNKNOWN'}
            icon={
              vercelData?.latestDeployment?.state === 'READY' ? (
                <CheckCircle className="h-5 w-5" />
              ) : vercelData?.latestDeployment?.state === 'BUILDING' ? (
                <RefreshCw className="h-5 w-5 animate-spin" />
              ) : vercelData?.latestDeployment?.state === 'ERROR' ? (
                <AlertTriangle className="h-5 w-5" />
              ) : (
                <Clock className="h-5 w-5" />
              )
            }
            color={
              vercelData?.latestDeployment?.state === 'READY'
                ? 'green'
                : vercelData?.latestDeployment?.state === 'BUILDING'
                  ? 'yellow'
                  : vercelData?.latestDeployment?.state === 'ERROR'
                    ? 'red'
                    : 'gray'
            }
            subtitle="Current deployment"
          />

          <MetricCard
            title="Active Builds"
            value={deploymentStats?.activeDeployments.toString() || '0'}
            icon={<Activity className="h-5 w-5" />}
            subtitle={`${deploymentStats?.successRate || 0}% success rate`}
          />

          <MetricCard
            title="Test Coverage"
            value={`${intelData?.tests.coverage || 0}%`}
            progress={intelData?.tests.coverage || 0}
            icon={<TestTube className="h-5 w-5" />}
            subtitle={`${intelData?.tests.passed || 0}/${intelData?.tests.total || 0} tests`}
            color={
              (intelData?.tests.coverage || 0) >= 80
                ? 'green'
                : (intelData?.tests.coverage || 0) >= 60
                  ? 'yellow'
                  : 'red'
            }
          />
        </div>

        {/* Detailed Tabs */}
        <Tabs defaultValue="deployments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="deployments">Deployments</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="codebase">Codebase</TabsTrigger>
            <TabsTrigger value="tests">Tests</TabsTrigger>
          </TabsList>

          <TabsContent value="deployments" className="space-y-6">
            <DeploymentTab
              vercelData={vercelData}
              deploymentStats={deploymentStats}
              vercelLoading={vercelLoading}
              vercelError={vercelError}
            />
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <PerformanceTab vercelData={vercelData} />
          </TabsContent>

          <TabsContent value="codebase" className="space-y-6">
            <CodebaseTab intelData={intelData} />
          </TabsContent>

          <TabsContent value="tests" className="space-y-6">
            <TestsTab intelData={intelData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Metric Card Component
interface MetricCardProps {
  title: string;
  value: string;
  progress?: number;
  icon: React.ReactNode;
  color?: 'green' | 'yellow' | 'red' | 'gray';
  subtitle?: string;
}

function MetricCard({ title, value, progress, icon, color = 'gray', subtitle }: MetricCardProps) {
  const colorClasses = {
    green: 'text-green-600 dark:text-green-400 border-green-200 dark:border-green-800',
    yellow: 'text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
    red: 'text-red-600 dark:text-red-400 border-red-200 dark:border-red-800',
    gray: 'text-muted-foreground border-border',
  };

  return (
    <Card className={`${colorClasses[color]}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <span className="text-sm font-medium text-muted-foreground">{title}</span>
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-bold text-foreground">{value}</div>
          {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
          {progress !== undefined && <Progress value={progress} className="mt-3 h-2" />}
        </div>
      </CardContent>
    </Card>
  );
}

// Tab Components
function DeploymentTab({ vercelData, deploymentStats, vercelLoading, vercelError }: any) {
  if (vercelLoading) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading Vercel deployment data...</p>
        </CardContent>
      </Card>
    );
  }

  if (vercelError) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Vercel integration error: {vercelError}</p>
          <p className="text-xs mt-2">Check your API credentials in .env.local</p>
        </CardContent>
      </Card>
    );
  }

  if (!vercelData) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          <Globe className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No Vercel data available</p>
          <p className="text-xs mt-2">Ensure VERCEL_API_TOKEN and VERCEL_PROJECT_ID are set</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Latest Deployment</CardTitle>
          <CardDescription>Current production status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {vercelData.latestDeployment ? (
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge
                  variant={
                    vercelData.latestDeployment.state === 'READY'
                      ? 'default'
                      : vercelData.latestDeployment.state === 'ERROR'
                        ? 'destructive'
                        : 'secondary'
                  }
                >
                  {vercelData.latestDeployment.state}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">URL</span>
                <a
                  href={`https://${vercelData.latestDeployment.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  {vercelData.latestDeployment.url}
                </a>
              </div>
              {vercelData.latestDeployment.meta.githubCommitMessage && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Commit</span>
                  <span className="text-sm text-foreground font-mono">
                    {vercelData.latestDeployment.meta.githubCommitMessage.slice(0, 50)}...
                  </span>
                </div>
              )}
            </>
          ) : (
            <p className="text-muted-foreground">No deployments found</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Deployment Stats</CardTitle>
          <CardDescription>Performance metrics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-foreground">
                {deploymentStats?.successRate || 0}%
              </div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">
                {vercelData.buildTimes?.average || 0}s
              </div>
              <div className="text-sm text-muted-foreground">Avg Build Time</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function PerformanceTab({ vercelData }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
        <CardDescription>Real-time application performance</CardDescription>
      </CardHeader>
      <CardContent>
        {vercelData?.stats ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {vercelData.stats.performance.avgResponseTime}ms
              </div>
              <div className="text-sm text-muted-foreground">Avg Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {vercelData.stats.performance.p95}ms
              </div>
              <div className="text-sm text-muted-foreground">95th Percentile</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {vercelData.stats.analytics.pageViews.total}
              </div>
              <div className="text-sm text-muted-foreground">Page Views</div>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground text-center">Performance data not available</p>
        )}
      </CardContent>
    </Card>
  );
}

function CodebaseTab({ intelData }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Codebase Overview</CardTitle>
        <CardDescription>Project structure and metrics</CardDescription>
      </CardHeader>
      <CardContent>
        {intelData ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{intelData.codebase.files}</div>
              <div className="text-sm text-muted-foreground">Files</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{intelData.codebase.lines}</div>
              <div className="text-sm text-muted-foreground">Lines of Code</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{intelData.components.total}</div>
              <div className="text-sm text-muted-foreground">Components</div>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground text-center">
            Run build to generate codebase metrics
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function TestsTab({ intelData }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Results</CardTitle>
        <CardDescription>Latest test execution results</CardDescription>
      </CardHeader>
      <CardContent>
        {intelData?.tests ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {intelData.tests.passed}
                </div>
                <div className="text-sm text-green-700 dark:text-green-300">Passed</div>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {intelData.tests.failed}
                </div>
                <div className="text-sm text-red-700 dark:text-red-300">Failed</div>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {intelData.tests.coverage}%
                </div>
                <div className="text-sm text-blue-700 dark:text-blue-300">Coverage</div>
              </div>
            </div>
            <Progress value={intelData.tests.coverage} className="h-3" />
          </div>
        ) : (
          <p className="text-muted-foreground text-center">Run tests to generate coverage data</p>
        )}
      </CardContent>
    </Card>
  );
}
