'use client';

import {
  Activity,
  ArrowUp,
  BarChart3,
  CheckCircle,
  Code,
  GitCommit,
  Package,
  Shield,
  TrendingUp,
  Users,
  XCircle,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';

// Enhanced imports using enterprise patterns
import Container from '@/components/layout/Container/Container';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  TooltipProvider,
} from '@/components/ui';
import { Alert } from '@/components/ui/Alert/alert';
import { Badge } from '@/components/ui/Badge/badge';
import { Button } from '@/components/ui/Button/button';
import { DataTable } from '@/components/ui/DataTable/DataTable';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog/dialog';
import { Progress } from '@/components/ui/Progress/progress';
import { Separator } from '@/components/ui/Separator/Separator';
import { Skeleton } from '@/components/ui/Skeleton/Skeleton';
import { Switch } from '@/components/ui/Switch/Switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs/tabs';
import { Toaster } from '@/components/ui/Toast/toaster';
import { useToast } from '@/components/ui/Toast/use-toast';

/**
 * 🚀 Enterprise Dashboard - August 2025 - v1.28.0
 *
 * Modern dashboard showcasing:
 * - 30 production-ready components (100% coverage)
 * - Next.js 15.4.6 performance patterns
 * - Real-time data visualization
 * - Enterprise-grade architecture
 * - Complete shadcn/ui integration
 */

interface SystemMetrics {
  version: string;
  totalComponents: number;
  buildTime: string;
  testCoverage: number;
  performanceScore: number;
  codeQuality: number;
  lastUpdated: string;
}

interface ComponentStatus {
  name: string;
  status: 'healthy' | 'warning' | 'error';
  tests: number;
  coverage: number;
  lastUpdate: string;
  size: string;
}

interface ActivityLog {
  id: string;
  type: 'build' | 'test' | 'deploy' | 'update';
  message: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error';
  user: string;
}

export default function EnterpriseDashboard() {
  const { toast } = useToast();

  // State management with enterprise patterns
  const [metrics] = useState<SystemMetrics>({
    version: '1.1.0',
    totalComponents: 49,
    buildTime: '1.2s',
    testCoverage: 97.3,
    performanceScore: 98,
    codeQuality: 95,
    lastUpdated: 'August 19, 2025',
  });

  const [loading, setLoading] = useState(true);
  const [realTimeData, setRealTimeData] = useState({
    activeUsers: 1247,
    requests: 84932,
    uptime: '99.9%',
    responseTime: '23ms',
  });

  const [isRealtimeEnabled, setIsRealtimeEnabled] = useState(true);

  // Component health data
  const componentHealth: ComponentStatus[] = [
    {
      name: 'Button',
      status: 'healthy',
      tests: 35,
      coverage: 100,
      lastUpdate: '2h ago',
      size: '12kb',
    },
    {
      name: 'Input',
      status: 'healthy',
      tests: 34,
      coverage: 98,
      lastUpdate: '1h ago',
      size: '8kb',
    },
    {
      name: 'Modal',
      status: 'healthy',
      tests: 35,
      coverage: 100,
      lastUpdate: '3h ago',
      size: '15kb',
    },
    {
      name: 'DataTable',
      status: 'warning',
      tests: 28,
      coverage: 92,
      lastUpdate: '5h ago',
      size: '22kb',
    },
    {
      name: 'Tabs',
      status: 'healthy',
      tests: 52,
      coverage: 99,
      lastUpdate: '1h ago',
      size: '18kb',
    },
    {
      name: 'Select',
      status: 'healthy',
      tests: 54,
      coverage: 100,
      lastUpdate: '2h ago',
      size: '20kb',
    },
    {
      name: 'Progress',
      status: 'healthy',
      tests: 31,
      coverage: 98,
      lastUpdate: '4h ago',
      size: '6kb',
    },
    {
      name: 'Badge',
      status: 'healthy',
      tests: 46,
      coverage: 100,
      lastUpdate: '1h ago',
      size: '4kb',
    },
  ];

  // Activity logs
  const activityLogs: ActivityLog[] = [
    {
      id: '1',
      type: 'update',
      message: 'v1.28.0 Released: Complete component ecosystem enhancement',
      timestamp: '1 minute ago',
      status: 'success',
      user: 'GitHub Copilot',
    },
    {
      id: '2',
      type: 'build',
      message: 'Production build completed with 30 components',
      timestamp: '5 minutes ago',
      status: 'success',
      user: 'CI/CD Pipeline',
    },
    {
      id: '3',
      type: 'test',
      message: 'AspectRatio & Table components added with full test coverage',
      timestamp: '10 minutes ago',
      status: 'success',
      user: 'Test Runner',
    },
    {
      id: '4',
      type: 'deploy',
      message: 'Component registry enhanced: 100% export coverage achieved',
      timestamp: '15 minutes ago',
      status: 'success',
      user: 'Developer',
    },
  ];

  // Simulate real-time updates
  useEffect(() => {
    setLoading(false);

    if (!isRealtimeEnabled) return;

    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10 - 5),
        requests: prev.requests + Math.floor(Math.random() * 100),
        uptime: '99.9%',
        responseTime: Math.floor(Math.random() * 10 + 18) + 'ms',
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [isRealtimeEnabled]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'success':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      case 'error':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'success':
        return <Badge className="bg-green-100 text-green-800">Healthy</Badge>;
      case 'warning':
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-700">
            Warning
          </Badge>
        );
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const [deploymentState, setDeploymentState] = useState<{
    isDeploying: boolean;
    currentStep: number;
    steps: Array<{
      name: string;
      status: 'pending' | 'running' | 'completed' | 'error';
      duration?: string;
      details?: string;
    }>;
  }>({
    isDeploying: false,
    currentStep: 0,
    steps: [],
  });

  const deploymentSteps = [
    {
      name: 'Pre-deployment Checks',
      expectedDuration: 800,
      details: 'Validating environment and dependencies',
    },
    { name: 'Running Tests', expectedDuration: 1200, details: 'Executing 521+ test suite' },
    {
      name: 'TypeScript Build',
      expectedDuration: 900,
      details: 'Compiling TypeScript with strict mode',
    },
    {
      name: 'Component Bundle Analysis',
      expectedDuration: 600,
      details: 'Analyzing 29 components for optimization',
    },
    {
      name: 'Production Build',
      expectedDuration: 1100,
      details: 'Creating optimized production bundle',
    },
    {
      name: 'Security Audit',
      expectedDuration: 700,
      details: 'Running security vulnerability checks',
    },
    {
      name: 'Performance Validation',
      expectedDuration: 500,
      details: 'Lighthouse performance scoring',
    },
    {
      name: 'Deployment to CDN',
      expectedDuration: 1300,
      details: 'Uploading assets to global CDN',
    },
    { name: 'Health Checks', expectedDuration: 400, details: 'Verifying deployment health' },
  ];

  const triggerTestDeploy = async () => {
    // Initialize deployment state
    const initialSteps = deploymentSteps.map(step => ({
      name: step.name,
      status: 'pending' as const,
      details: step.details,
    }));

    setDeploymentState({
      isDeploying: true,
      currentStep: 0,
      steps: initialSteps,
    });

    toast({
      title: '🚀 Demo Deployment Started',
      description: 'Simulating enterprise deployment pipeline...',
    });

    // Execute deployment steps with realistic timing
    for (let i = 0; i < deploymentSteps.length; i++) {
      const step = deploymentSteps[i];

      // Mark current step as running
      setDeploymentState(prev => ({
        ...prev,
        currentStep: i,
        steps: prev.steps.map((s, index) => (index === i ? { ...s, status: 'running' } : s)),
      }));

      // Wait for realistic duration
      await new Promise(resolve => setTimeout(resolve, step.expectedDuration));

      // Mark step as completed with timing
      const duration = `${(step.expectedDuration / 1000).toFixed(1)}s`;
      setDeploymentState(prev => ({
        ...prev,
        steps: prev.steps.map((s, index) =>
          index === i ? { ...s, status: 'completed', duration } : s
        ),
      }));

      // Show progress toasts for key milestones
      if (i === 2) {
        toast({
          title: '✅ Build Complete',
          description: 'TypeScript compilation successful (0 errors)',
        });
      } else if (i === 4) {
        toast({
          title: '� Bundle Ready',
          description: 'Production build optimized (98% performance score)',
        });
      } else if (i === 7) {
        toast({
          title: '🌐 CDN Upload Complete',
          description: 'Assets deployed to global edge locations',
        });
      }
    }

    // Deployment complete
    setDeploymentState(prev => ({
      ...prev,
      isDeploying: false,
    }));

    toast({
      title: '🎉 Demo Deployment Complete!',
      description: `All 29 components "deployed" successfully. (This was a simulation)`,
    });

    // Reset after 10 seconds
    setTimeout(() => {
      setDeploymentState({
        isDeploying: false,
        currentStep: 0,
        steps: [],
      });
    }, 10000);
  };

  if (loading) {
    return (
      <Container size="7xl" padding="lg" className="py-8 space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-12 w-96" />
          <Skeleton className="h-6 w-64" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-16" />
              </CardHeader>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
        </div>
      </Container>
    );
  }

  return (
    <TooltipProvider>
      <Container size="7xl" padding="lg" className="py-8 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground tracking-tight">
              Enterprise Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              v1.28.0 Enterprise System - Real-time monitoring of your{' '}
              <Badge size="lg" className="mx-1">
                {metrics.totalComponents} Components
              </Badge>{' '}
              with 100% export coverage
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-3">
              <Switch
                checked={isRealtimeEnabled}
                onCheckedChange={setIsRealtimeEnabled}
                id="realtime"
              />
              <label htmlFor="realtime" className="text-sm font-medium">
                Real-time Updates
              </label>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button disabled={deploymentState.isDeploying}>
                  {deploymentState.isDeploying ? 'Deploying...' : 'Deploy to Production (Demo)'}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    Deploy to Production
                    <Badge variant="outline" size="sm">
                      Demo Mode
                    </Badge>
                  </DialogTitle>
                  <DialogDescription>
                    This will simulate deploying all {metrics.totalComponents} components to
                    production.
                    <br />
                    <strong>Note:</strong> This is a demonstration - no actual deployment will
                    occur.
                  </DialogDescription>
                </DialogHeader>

                {deploymentState.steps.length > 0 && (
                  <div className="space-y-4 my-4">
                    <div className="text-sm font-medium">Deployment Progress:</div>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {deploymentState.steps.map((step, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 border rounded">
                          <div className="flex-shrink-0">
                            {step.status === 'completed' && (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                            {step.status === 'running' && (
                              <div className="h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                            )}
                            {step.status === 'pending' && (
                              <div className="h-4 w-4 border-2 border-gray-300 rounded-full" />
                            )}
                            {step.status === 'error' && (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">{step.name}</span>
                              {step.duration && (
                                <span className="text-xs text-muted-foreground">
                                  {step.duration}
                                </span>
                              )}
                            </div>
                            {step.details && (
                              <div className="text-xs text-muted-foreground">{step.details}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {deploymentState.isDeploying && (
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Overall Progress</span>
                          <span>
                            {deploymentState.currentStep + 1} of {deploymentSteps.length}
                          </span>
                        </div>
                        <Progress
                          value={((deploymentState.currentStep + 1) / deploymentSteps.length) * 100}
                        />
                      </div>
                    )}
                  </div>
                )}

                <DialogFooter>
                  <Button variant="outline" disabled={deploymentState.isDeploying}>
                    Cancel
                  </Button>
                  <Button onClick={triggerTestDeploy} disabled={deploymentState.isDeploying}>
                    {deploymentState.isDeploying ? 'Deploying...' : 'Start Demo Deployment'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* System Status Alert */}
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <div>
            <div className="font-semibold">v1.28.0 System Status: All Services Operational</div>
            <div className="text-sm">
              Next.js{' '}
              <Badge variant="outline" size="sm">
                15.4.6
              </Badge>{' '}
              • Build Time: {metrics.buildTime} • Test Coverage: {metrics.testCoverage}% • Export
              Coverage: 100%
            </div>
          </div>
        </Alert>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{realTimeData.activeUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +12% from last hour
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">API Requests</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{realTimeData.requests.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <ArrowUp className="inline h-3 w-3 mr-1 text-green-500" />
                Response time: {realTimeData.responseTime}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{realTimeData.uptime}</div>
              <p className="text-xs text-muted-foreground">
                <CheckCircle className="inline h-3 w-3 mr-1 text-green-500" />
                All systems operational
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Performance Score</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.performanceScore}</div>
              <div className="mt-2">
                <Progress value={metrics.performanceScore} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">System Overview</TabsTrigger>
            <TabsTrigger value="components">Component Health</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Component Library Stats
                  </CardTitle>
                  <CardDescription>
                    v1.28.0 - Complete ecosystem with 100% export coverage
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-3xl font-bold text-primary">
                        {metrics.totalComponents}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Components</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-3xl font-bold text-green-600">521+</div>
                      <div className="text-sm text-muted-foreground">Total Tests</div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Test Coverage</span>
                      <span className="text-sm text-muted-foreground">{metrics.testCoverage}%</span>
                    </div>
                    <Progress value={metrics.testCoverage} />

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Code Quality</span>
                      <span className="text-sm text-muted-foreground">{metrics.codeQuality}%</span>
                    </div>
                    <Progress value={metrics.codeQuality} />

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Performance</span>
                      <span className="text-sm text-muted-foreground">
                        {metrics.performanceScore}%
                      </span>
                    </div>
                    <Progress value={metrics.performanceScore} />

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Export Coverage</span>
                      <span className="text-sm text-muted-foreground">100%</span>
                    </div>
                    <Progress value={100} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security & Compliance
                  </CardTitle>
                  <CardDescription>Enterprise security and accessibility standards</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="font-medium">WCAG 2.1 AA Compliant</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Passed</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="font-medium">TypeScript Strict Mode</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="font-medium">ESLint Rules</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">0 Errors</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="font-medium">Security Audit</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Clean</Badge>
                    </div>
                  </div>

                  <Separator />

                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-700">A+</div>
                    <div className="text-sm text-green-600">Security Grade</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Component Health Tab */}
          <TabsContent value="components" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Component Health Dashboard</CardTitle>
                <CardDescription>
                  Real-time monitoring of all {metrics.totalComponents} production components
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={componentHealth.map(comp => ({
                    ...comp,
                    statusBadge: getStatusBadge(comp.status),
                    testCoverage: `${comp.coverage}%`,
                    testCount: `${comp.tests} tests`,
                  }))}
                  columns={[
                    { key: 'name', header: 'Component', sortable: true },
                    { key: 'statusBadge', header: 'Status', sortable: false },
                    { key: 'testCount', header: 'Tests', sortable: true },
                    { key: 'testCoverage', header: 'Coverage', sortable: true },
                    { key: 'size', header: 'Bundle Size', sortable: true },
                    { key: 'lastUpdate', header: 'Last Update', sortable: true },
                  ]}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Log Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitCommit className="h-5 w-5" />
                  System Activity Log
                </CardTitle>
                <CardDescription>Recent builds, deployments, and system updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activityLogs.map(log => (
                    <div key={log.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className={`mt-1 p-1 rounded-full ${getStatusColor(log.status)}`}>
                        {log.type === 'build' && <Code className="h-4 w-4" />}
                        {log.type === 'test' && <CheckCircle className="h-4 w-4" />}
                        {log.type === 'deploy' && <Zap className="h-4 w-4" />}
                        {log.type === 'update' && <ArrowUp className="h-4 w-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{log.message}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">by {log.user}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">{getStatusBadge(log.status)}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Trends</CardTitle>
                  <CardDescription>Build times and performance metrics over time</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 border rounded">
                      <div className="text-2xl font-bold">1.2s</div>
                      <div className="text-xs text-muted-foreground">Avg Build Time</div>
                    </div>
                    <div className="p-3 border rounded">
                      <div className="text-2xl font-bold">98</div>
                      <div className="text-xs text-muted-foreground">Lighthouse Score</div>
                    </div>
                    <div className="p-3 border rounded">
                      <div className="text-2xl font-bold">23ms</div>
                      <div className="text-xs text-muted-foreground">API Response</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Bundle Optimization</span>
                        <span>92%</span>
                      </div>
                      <Progress value={92} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Tree Shaking</span>
                        <span>96%</span>
                      </div>
                      <Progress value={96} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Code Splitting</span>
                        <span>89%</span>
                      </div>
                      <Progress value={89} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Usage Analytics</CardTitle>
                  <CardDescription>Component usage patterns and popularity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Button</span>
                      <div className="flex items-center gap-2">
                        <Progress value={95} className="w-24" />
                        <span className="text-xs text-muted-foreground w-8">95%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Input</span>
                      <div className="flex items-center gap-2">
                        <Progress value={88} className="w-24" />
                        <span className="text-xs text-muted-foreground w-8">88%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Card</span>
                      <div className="flex items-center gap-2">
                        <Progress value={82} className="w-24" />
                        <span className="text-xs text-muted-foreground w-8">82%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Modal</span>
                      <div className="flex items-center gap-2">
                        <Progress value={76} className="w-24" />
                        <span className="text-xs text-muted-foreground w-8">76%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Tabs</span>
                      <div className="flex items-center gap-2">
                        <Progress value={71} className="w-24" />
                        <span className="text-xs text-muted-foreground w-8">71%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">DataTable</span>
                      <div className="flex items-center gap-2">
                        <Progress value={65} className="w-24" />
                        <span className="text-xs text-muted-foreground w-8">65%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer Stats */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{metrics.totalComponents}</div>
                <div className="text-xs text-muted-foreground">Components</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">521+</div>
                <div className="text-xs text-muted-foreground">Tests</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{metrics.testCoverage}%</div>
                <div className="text-xs text-muted-foreground">Coverage</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{metrics.version}</div>
                <div className="text-xs text-muted-foreground">Version</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">15.4.6</div>
                <div className="text-xs text-muted-foreground">Next.js</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-indigo-600">2025</div>
                <div className="text-xs text-muted-foreground">Enterprise</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>
      <Toaster />
    </TooltipProvider>
  );
}
