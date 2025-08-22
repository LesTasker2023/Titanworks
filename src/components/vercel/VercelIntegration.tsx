/**
 * Vercel Integration Component
 * Displays real-time Vercel deployment data within the intelligence dashboard
 */

'use client';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Progress } from '@/components/ui/Progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import {
  formatDeploymentDuration,
  getDeploymentStatusColor,
  useVercelConfiguration,
  useVercelDeploymentStatus,
  useVercelIntegration,
} from '@/hooks/useVercel';
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  ExternalLink,
  GitBranch,
  Globe,
  RefreshCw,
  Settings,
  TrendingUp,
} from 'lucide-react';
import React, { useState } from 'react';

interface VercelIntegrationProps {
  className?: string;
}

export default function VercelIntegration({ className }: VercelIntegrationProps) {
  const { configuration, saveConfiguration, testConnection, saving } = useVercelConfiguration();
  const [showConfig, setShowConfig] = useState(!configuration);
  const [configForm, setConfigForm] = useState({
    projectId: configuration?.projectId || '',
    apiToken: configuration?.apiToken || '',
    teamId: configuration?.teamId || '',
  });

  const {
    data: vercelData,
    loading,
    error,
    refetch,
    lastUpdated,
  } = useVercelIntegration({
    projectId: configuration?.projectId,
    apiToken: configuration?.apiToken,
    teamId: configuration?.teamId,
    enabled: true, // Always try to fetch (will use env vars if no config)
    refreshInterval: 30000, // 30 seconds
  });

  const deploymentStats = useVercelDeploymentStatus({
    deployments: vercelData?.deployments || [],
  });

  const handleConfigSave = async () => {
    try {
      await saveConfiguration(configForm);
      setShowConfig(false);
    } catch (error) {
      console.error('Failed to save Vercel configuration:', error);
    }
  };

  const handleRefresh = async () => {
    await refetch();
  };

  // Show configuration only if explicitly requested and no data is loading
  if (showConfig || (!configuration && !loading && !vercelData)) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Vercel Configuration
          </CardTitle>
          <CardDescription>
            Connect your Vercel project to display real-time deployment data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="projectId">Project ID</Label>
            <Input
              id="projectId"
              placeholder="prj_abc123..."
              value={configForm.projectId}
              onChange={e => setConfigForm(prev => ({ ...prev, projectId: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="apiToken">API Token</Label>
            <Input
              id="apiToken"
              type="password"
              placeholder="Your Vercel API token"
              value={configForm.apiToken}
              onChange={e => setConfigForm(prev => ({ ...prev, apiToken: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="teamId">Team ID (Optional)</Label>
            <Input
              id="teamId"
              placeholder="team_abc123..."
              value={configForm.teamId}
              onChange={e => setConfigForm(prev => ({ ...prev, teamId: e.target.value }))}
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleConfigSave}
              disabled={!configForm.projectId || !configForm.apiToken || saving}
              className="flex-1"
            >
              {saving ? 'Connecting...' : 'Connect Vercel'}
            </Button>
            {configuration && (
              <Button variant="outline" onClick={() => setShowConfig(false)}>
                Cancel
              </Button>
            )}
          </div>

          <div className="text-xs text-muted-foreground">
            <p>To get your API token:</p>
            <ol className="list-decimal list-inside space-y-1 mt-1">
              <li>Go to Vercel Dashboard → Settings → Tokens</li>
              <li>Create a new token with appropriate permissions</li>
              <li>Copy the token and paste it above</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (loading && !vercelData) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Vercel Deployments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <div className="text-center space-y-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
              <p className="text-sm text-muted-foreground">Loading Vercel data...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Vercel Deployments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4 p-8">
            <AlertTriangle className="h-8 w-8 text-destructive mx-auto" />
            <div>
              <h3 className="font-semibold text-destructive">Connection Failed</h3>
              <p className="text-sm text-muted-foreground mt-1">{error}</p>
            </div>
            <div className="flex gap-2 justify-center">
              <Button onClick={handleRefresh} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </Button>
              <Button onClick={() => setShowConfig(true)} variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!vercelData) {
    return null;
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Vercel Deployments
            </CardTitle>
            <CardDescription>
              {vercelData.project.name} • Health Score: {vercelData.healthScore}%
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {lastUpdated && (
              <span className="text-xs text-muted-foreground">
                Updated {new Date(lastUpdated).toLocaleTimeString()}
              </span>
            )}
            <Button onClick={handleRefresh} variant="outline" size="sm" disabled={loading}>
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
            <Button onClick={() => setShowConfig(true)} variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="deployments">Deployments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <OverviewTab vercelData={vercelData} deploymentStats={deploymentStats} />
          </TabsContent>

          <TabsContent value="deployments" className="space-y-6">
            <DeploymentsTab deployments={vercelData.deployments} />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsTab vercelData={vercelData} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function OverviewTab({ vercelData, deploymentStats }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Health Score"
        value={`${vercelData.healthScore}%`}
        progress={vercelData.healthScore}
        icon={<TrendingUp className="h-4 w-4" />}
        color={
          vercelData.healthScore >= 80 ? 'green' : vercelData.healthScore >= 60 ? 'yellow' : 'red'
        }
      />

      <MetricCard
        title="Active Deployments"
        value={deploymentStats.activeDeployments.toString()}
        icon={<Activity className="h-4 w-4" />}
        subtitle="Currently building"
      />

      <MetricCard
        title="Success Rate"
        value={`${deploymentStats.successRate}%`}
        progress={deploymentStats.successRate}
        icon={<CheckCircle className="h-4 w-4" />}
        color={
          deploymentStats.successRate >= 90
            ? 'green'
            : deploymentStats.successRate >= 70
              ? 'yellow'
              : 'red'
        }
      />

      <MetricCard
        title="Avg Build Time"
        value={`${deploymentStats.averageBuildTime}s`}
        icon={<Clock className="h-4 w-4" />}
        subtitle={`${deploymentStats.deploymentsToday} today`}
      />

      {vercelData.latestDeployment && (
        <div className="md:col-span-2 lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Latest Deployment</CardTitle>
            </CardHeader>
            <CardContent>
              <DeploymentItem deployment={vercelData.latestDeployment} showDetails />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

function DeploymentsTab({ deployments }: any) {
  return (
    <div className="space-y-4">
      {deployments.slice(0, 10).map((deployment: any) => (
        <DeploymentItem key={deployment.uid} deployment={deployment} />
      ))}
    </div>
  );
}

function AnalyticsTab({ vercelData }: any) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Build Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-lg font-semibold">
                {Math.round(vercelData.buildTimes.average / 1000)}s
              </div>
              <div className="text-xs text-muted-foreground">Average</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-lg font-semibold">
                {Math.round(vercelData.buildTimes.fastest / 1000)}s
              </div>
              <div className="text-xs text-muted-foreground">Fastest</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>P95 Response Time</span>
              <span>{vercelData.stats.performance.p95}ms</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>P99 Response Time</span>
              <span>{vercelData.stats.performance.p99}ms</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Average Response Time</span>
              <span>{vercelData.stats.performance.avgResponseTime}ms</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Traffic Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-lg font-semibold">
                {vercelData.stats.analytics.pageViews.total.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Page Views</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-lg font-semibold">
                {vercelData.stats.analytics.visitors.total.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Visitors</div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Top Pages</h4>
            <div className="space-y-2">
              {vercelData.stats.analytics.topPages.map((page: any, index: number) => (
                <div key={page.page} className="flex justify-between text-sm">
                  <span className="font-mono text-xs">{page.page}</span>
                  <span>{page.visits.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DeploymentItem({ deployment, showDetails = false }: any) {
  const statusColor = getDeploymentStatusColor(deployment.state);
  const duration =
    deployment.buildingAt && deployment.ready
      ? formatDeploymentDuration(deployment.buildingAt, deployment.ready)
      : null;

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Badge
            variant={
              statusColor === 'green'
                ? 'default'
                : statusColor === 'red'
                  ? 'destructive'
                  : 'secondary'
            }
          >
            {deployment.state}
          </Badge>
          <div>
            <div className="font-medium">{deployment.url}</div>
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <GitBranch className="h-3 w-3" />
              {deployment.meta.githubCommitRef || 'main'}
              {deployment.meta.githubCommitSha && (
                <code className="text-xs bg-muted px-1 rounded">
                  {deployment.meta.githubCommitSha.slice(0, 7)}
                </code>
              )}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">
            {new Date(deployment.created).toLocaleString()}
          </div>
          {duration && <div className="text-xs text-muted-foreground">{duration}</div>}
        </div>
      </div>

      {showDetails && deployment.meta.githubCommitMessage && (
        <div className="pt-2 border-t">
          <p className="text-sm">{deployment.meta.githubCommitMessage}</p>
          {deployment.meta.githubCommitAuthorName && (
            <p className="text-xs text-muted-foreground mt-1">
              by {deployment.meta.githubCommitAuthorName}
            </p>
          )}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {deployment.target && (
            <Badge variant="outline" className="text-xs">
              {deployment.target}
            </Badge>
          )}
          {deployment.regions && deployment.regions.length > 0 && (
            <span className="text-xs text-muted-foreground">
              {deployment.regions.length} region{deployment.regions.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        <Button variant="ghost" size="sm" asChild>
          <a href={`https://${deployment.url}`} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-3 w-3" />
          </a>
        </Button>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  subtitle,
  progress,
  icon,
  color,
}: {
  title: string;
  value: string;
  subtitle?: string;
  progress?: number;
  icon?: React.ReactNode;
  color?: 'green' | 'yellow' | 'red';
}) {
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
        <div className={`text-2xl font-bold ${color ? colorClasses[color] : 'text-foreground'}`}>
          {value}
        </div>
        {progress !== undefined && <Progress value={progress} className="mt-2" />}
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  );
}
