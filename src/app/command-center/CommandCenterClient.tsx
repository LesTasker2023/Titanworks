'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Progress } from '@/components/ui/Progress';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/Chart';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from 'recharts';

interface QualityIssue {
  type: string;
  message: string;
  file?: string;
  line?: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface ComponentInfo {
  path: string;
  hasTest: boolean;
  hasStory: boolean;
  hasIndex: boolean;
  testCount: number;
  storyCount: number;
  complexity: number;
}

interface IntelligenceData {
  metadata: {
    scanTime: string;
    version: string;
    scanner: string;
    duration: number;
  };
  repository: {
    structure: {
      directories: number;
      layout: string[];
      essentials: Record<string, boolean>;
    };
    metrics: {
      totalFiles: number;
      fileTypes: Record<string, number>;
    };
    cleanup: {
      emptyFiles: {
        found: number;
        deleted: number;
        skipped: number;
      };
      issues: QualityIssue[];
    };
  };
  components: {
    inventory: Record<string, ComponentInfo>;
    metrics: {
      total: number;
      withTests: number;
      withStories: number;
      withIndex: number;
      testCoverage: number;
      storyCoverage: number;
      indexCoverage: number;
      qualityTestCoverage: number;
      testQualityDistribution: Record<string, number>;
    };
    quality: {
      score: number;
      issues: string[];
      strengths: string[];
    };
  };
  codebase: {
    files: {
      typescript: number;
      tests: number;
      stories: number;
      testRatio: number;
    };
    dependencies: {
      production: number;
      development: number;
      scripts: number;
    };
    pipeline: {
      typescript: { status: string; duration: number; errors: string[] };
      linting: { status: string; duration: number; errors: string[] };
      testing: { status: string; duration: number; errors: string[] };
      building: { status: string; duration: number; errors: string[] };
      overall: { status: string; score: number };
    };
  };
  bestPractices: {
    score: number;
    issues: Array<{
      severity: string;
      type: string;
      message: string;
      fix: string;
    }>;
    categories: Record<
      string,
      {
        score: number;
        issues: QualityIssue[];
        checks: number;
      }
    >;
  };
  recommendations: Array<{
    priority: string;
    category: string;
    issue: string;
    action: string;
    impact: string;
  }>;
}

export default function CommandCenterClient() {
  const [data, setData] = useState<IntelligenceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadIntelligenceData = async () => {
      try {
        const response = await fetch('/intelligence-report.json');
        const intelligenceData = await response.json();
        setData(intelligenceData);
      } catch (error) {
        // Silently handle error - production systems shouldn't log to console
        // Error state handled by loading/data state management
      } finally {
        setLoading(false);
      }
    };

    loadIntelligenceData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-content-primary text-lg">Initializing Command Center...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-status-error text-lg">Failed to load intelligence data</p>
        </div>
      </div>
    );
  }

  // Transform data for charts
  const componentMetrics = [
    {
      name: 'Tests',
      value: data.components.metrics.withTests,
      total: data.components.metrics.total,
    },
    {
      name: 'Stories',
      value: data.components.metrics.withStories,
      total: data.components.metrics.total,
    },
    {
      name: 'Index Files',
      value: data.components.metrics.withIndex,
      total: data.components.metrics.total,
    },
  ];

  // Extract actual test results from pipeline data
  const testResultsMatch = data.codebase.pipeline.testing.errors?.[
    data.codebase.pipeline.testing.errors.length - 1
  ]?.match(/(\d+) failed.*?(\d+) passed.*?(\d+) skipped.*?\((\d+)\)/);
  const testResults = testResultsMatch
    ? {
        failed: parseInt(testResultsMatch[1]),
        passed: parseInt(testResultsMatch[2]),
        skipped: parseInt(testResultsMatch[3]),
        total: parseInt(testResultsMatch[4]),
      }
    : { failed: 0, passed: 0, skipped: 0, total: 0 };

  const testDistribution = [
    { name: 'Passed', value: testResults.passed, color: 'hsl(var(--status-success))' },
    { name: 'Failed', value: testResults.failed, color: 'hsl(var(--status-error))' },
    { name: 'Skipped', value: testResults.skipped, color: 'hsl(var(--status-warning))' },
  ];

  const qualityDistribution = Object.entries(data.components.metrics.testQualityDistribution).map(
    ([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value,
      color:
        key === 'excellent'
          ? 'hsl(var(--status-success))'
          : key === 'pass'
            ? 'hsl(var(--status-warning))'
            : key === 'fail'
              ? 'hsl(var(--status-error))'
              : 'hsl(var(--content-secondary))',
    })
  );

  const fileTypeData = Object.entries(data.repository.metrics.fileTypes)
    .filter(([, count]) => count > 5) // Only show significant file types
    .map(([type, count]) => ({ name: type, value: count }));

  const pipelineData = [
    {
      name: 'TypeScript',
      duration: data.codebase.pipeline.typescript.duration,
      status: data.codebase.pipeline.typescript.status,
    },
    {
      name: 'Linting',
      duration: data.codebase.pipeline.linting.duration,
      status: data.codebase.pipeline.linting.status,
    },
    {
      name: 'Testing',
      duration: data.codebase.pipeline.testing.duration,
      status: data.codebase.pipeline.testing.status,
    },
  ];

  const bestPracticesData = Object.entries(data.bestPractices.categories).map(
    ([category, info]) => ({
      name: category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
      score: (info.score / info.checks) * 100,
      issues: info.issues.length,
    })
  );

  const dependencyData = [
    {
      name: 'Production',
      count: data.codebase.dependencies.production,
      color: 'hsl(var(--status-success))',
    },
    {
      name: 'Development',
      count: data.codebase.dependencies.development,
      color: 'hsl(var(--surface-interactive))',
    },
    {
      name: 'Scripts',
      count: data.codebase.dependencies.scripts,
      color: 'hsl(var(--status-warning))',
    },
  ];

  const chartConfig = {
    tests: { label: 'Tests', color: 'hsl(var(--status-success))' },
    stories: { label: 'Stories', color: 'hsl(var(--surface-interactive))' },
    indexes: { label: 'Index Files', color: 'hsl(var(--status-warning))' },
    quality: { label: 'Quality', color: 'hsl(var(--surface-accent))' },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border-default bg-surface-accent/10 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-content-primary mb-2">⚡ Command Center</h1>
              <p className="text-content-secondary text-lg">
                Intelligence Dashboard • Scanned {new Date(data.metadata.scanTime).toLocaleString()}
              </p>
            </div>
            <div className="flex gap-4">
              <Badge
                variant={
                  data.codebase.pipeline.overall.status === 'pass' ? 'default' : 'destructive'
                }
                className="text-sm px-4 py-2"
              >
                Pipeline: {data.codebase.pipeline.overall.status.toUpperCase()}
              </Badge>
              <Badge variant="secondary" className="text-sm px-4 py-2">
                Quality Score: {data.components.quality.score}%
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 bg-surface-secondary/40 border border-border-default">
            <TabsTrigger value="overview" className="data-[state=active]:bg-brand-primary">
              Overview
            </TabsTrigger>
            <TabsTrigger value="components" className="data-[state=active]:bg-brand-primary">
              Components
            </TabsTrigger>
            <TabsTrigger value="codebase" className="data-[state=active]:bg-brand-primary">
              Codebase
            </TabsTrigger>
            <TabsTrigger value="quality" className="data-[state=active]:bg-brand-primary">
              Quality
            </TabsTrigger>
            <TabsTrigger value="insights" className="data-[state=active]:bg-brand-primary">
              Insights
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Card className="bg-surface-secondary/40 border-border-default">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-content-secondary">
                    Total Files
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-content-primary">
                    {data.repository.metrics.totalFiles}
                  </div>
                  <p className="text-xs text-content-tertiary">
                    Across {data.repository.structure.directories} directories
                  </p>
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
                    {data.components.metrics.total}
                  </div>
                  <p className="text-xs text-content-tertiary">
                    {data.components.metrics.testCoverage}% test coverage
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
                  <p className="text-xs text-content-tertiary">
                    {testResults.passed} passed, {testResults.failed} failed
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-surface-secondary/40 border-border-default">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-content-secondary">
                    Quality Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-content-primary">
                    {data.components.quality.score}%
                  </div>
                  <Progress value={data.components.quality.score} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="bg-surface-secondary/40 border-border-default">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-content-secondary">
                    Best Practices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-content-primary">
                    {data.bestPractices.score}%
                  </div>
                  <p className="text-xs text-content-tertiary">
                    {data.bestPractices.issues.length} issues to resolve
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Repository Structure */}
            <Card className="bg-surface-secondary/40 border-border-default">
              <CardHeader>
                <CardTitle className="text-content-primary">Repository Health</CardTitle>
                <CardDescription className="text-content-secondary">
                  File distribution and structure analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full overflow-hidden">
                  <ChartContainer config={chartConfig} className="h-full w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={fileTypeData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border-default))" />
                        <XAxis
                          dataKey="name"
                          stroke="hsl(var(--content-secondary))"
                          fontSize={12}
                        />
                        <YAxis stroke="hsl(var(--content-secondary))" fontSize={12} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="value" fill="hsl(var(--surface-accent))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Components Tab */}
          <TabsContent value="components" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-surface-secondary/40 border-border-default">
                <CardHeader>
                  <CardTitle className="text-content-primary">Component Coverage</CardTitle>
                  <CardDescription className="text-content-secondary">
                    Test, story, and index file coverage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full overflow-hidden">
                    <ChartContainer config={chartConfig} className="h-full w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={componentMetrics}
                          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="hsl(var(--border-default))"
                          />
                          <XAxis
                            dataKey="name"
                            stroke="hsl(var(--content-secondary))"
                            fontSize={12}
                          />
                          <YAxis stroke="hsl(var(--content-secondary))" fontSize={12} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="value" fill="hsl(var(--surface-accent))" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-surface-secondary/40 border-border-default">
                <CardHeader>
                  <CardTitle className="text-content-primary">Test Quality Distribution</CardTitle>
                  <CardDescription className="text-content-secondary">
                    Quality assessment of test suites
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full overflow-hidden">
                    <ChartContainer config={chartConfig} className="h-full w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                          <Pie
                            data={qualityDistribution}
                            cx="50%"
                            cy="50%"
                            outerRadius={60}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}`}
                            labelLine={false}
                          >
                            {qualityDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Component Quality Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-surface-secondary/40 border-border-default">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-content-secondary">
                    Test Coverage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-content-primary">
                    {data.components.metrics.testCoverage}%
                  </div>
                  <Progress value={data.components.metrics.testCoverage} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="bg-surface-secondary/40 border-border-default">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-content-secondary">
                    Story Coverage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-content-primary">
                    {data.components.metrics.storyCoverage}%
                  </div>
                  <Progress value={data.components.metrics.storyCoverage} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="bg-surface-secondary/40 border-border-default">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-content-secondary">
                    Index Coverage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-content-primary">
                    {data.components.metrics.indexCoverage}%
                  </div>
                  <Progress value={data.components.metrics.indexCoverage} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            {/* Test Results Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-surface-secondary/40 border-border-default">
                <CardHeader>
                  <CardTitle className="text-content-primary">Test Results Distribution</CardTitle>
                  <CardDescription className="text-content-secondary">
                    {testResults.total} total tests • {testResults.passed} passed •{' '}
                    {testResults.failed} failed • {testResults.skipped} skipped
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full overflow-hidden">
                    <ChartContainer config={chartConfig} className="h-full w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                          <Pie
                            data={testDistribution}
                            cx="50%"
                            cy="50%"
                            outerRadius={60}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}`}
                            labelLine={false}
                          >
                            {testDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-surface-secondary/40 border-border-default">
                <CardHeader>
                  <CardTitle className="text-content-primary">Test Statistics</CardTitle>
                  <CardDescription className="text-content-secondary">
                    Comprehensive test execution metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                      <span className="text-green-100 font-semibold">Passed Tests</span>
                      <span className="text-green-100 text-lg font-bold">{testResults.passed}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                      <span className="text-red-100 font-semibold">Failed Tests</span>
                      <span className="text-red-100 text-lg font-bold">{testResults.failed}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                      <span className="text-yellow-100 font-semibold">Skipped Tests</span>
                      <span className="text-yellow-100 text-lg font-bold">
                        {testResults.skipped}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                      <span className="text-blue-100 font-semibold">Total Tests</span>
                      <span className="text-blue-100 text-lg font-bold">{testResults.total}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-surface-accent/20 border border-border-default rounded-lg">
                      <span className="text-content-primary font-semibold">Success Rate</span>
                      <span className="text-content-primary text-lg font-bold">
                        {((testResults.passed / testResults.total) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Codebase Tab */}
          <TabsContent value="codebase" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-surface-secondary/40 border-border-default">
                <CardHeader>
                  <CardTitle className="text-content-primary">Pipeline Performance</CardTitle>
                  <CardDescription className="text-content-secondary">
                    Build and validation timings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full overflow-hidden">
                    <ChartContainer config={chartConfig} className="h-full w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={pipelineData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="hsl(var(--border-default))"
                          />
                          <XAxis
                            dataKey="name"
                            stroke="hsl(var(--content-secondary))"
                            fontSize={12}
                          />
                          <YAxis stroke="hsl(var(--content-secondary))" fontSize={12} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="duration" fill="hsl(var(--surface-accent))" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-surface-secondary/40 border-border-default">
                <CardHeader>
                  <CardTitle className="text-content-primary">Dependencies</CardTitle>
                  <CardDescription className="text-content-secondary">
                    Package distribution breakdown
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full overflow-hidden">
                    <ChartContainer config={chartConfig} className="h-full w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                          <Pie
                            data={dependencyData}
                            cx="50%"
                            cy="50%"
                            outerRadius={60}
                            fill="#8884d8"
                            dataKey="count"
                            label={({ name, count }) => `${name}: ${count}`}
                            labelLine={false}
                          >
                            {dependencyData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Codebase Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <Card className="bg-surface-secondary/40 border-border-default">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-content-secondary">
                    TypeScript Files
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-content-primary">
                    {data.codebase.files.typescript}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-surface-secondary/40 border-border-default">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-content-secondary">
                    Test Files
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-content-primary">
                    {data.codebase.files.tests}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-surface-secondary/40 border-border-default">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-content-secondary">
                    Story Files
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-content-primary">
                    {data.codebase.files.stories}
                  </div>
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
                    {((testResults.passed / testResults.total) * 100).toFixed(1)}%
                  </div>
                  <Progress
                    value={(testResults.passed / testResults.total) * 100}
                    className="mt-2"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Quality Tab */}
          <TabsContent value="quality" className="space-y-6">
            <Card className="bg-surface-secondary/40 border-border-default">
              <CardHeader>
                <CardTitle className="text-content-primary">Best Practices Assessment</CardTitle>
                <CardDescription className="text-content-secondary">
                  Category-wise quality evaluation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full overflow-hidden">
                  <ChartContainer config={chartConfig} className="h-full w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={bestPracticesData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border-default))" />
                        <XAxis
                          dataKey="name"
                          stroke="hsl(var(--content-secondary))"
                          fontSize={12}
                        />
                        <YAxis stroke="hsl(var(--content-secondary))" fontSize={12} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="score" fill="hsl(var(--surface-accent))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            {/* Quality Issues */}
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
                    {data.bestPractices.issues.map((issue, index) => (
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
                    ))}
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
                    {data.components.quality.strengths.map((strength, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-green-900/20 border border-green-500/30 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-green-100 text-sm">{strength}</span>
                      </div>
                    ))}
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
                  {data.recommendations.map((rec, index) => (
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
                  ))}
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
                    <div className="text-content-secondary text-sm">{data.metadata.version}</div>
                  </div>
                  <div className="text-center p-4 bg-surface-secondary rounded-lg border border-border-default">
                    <div className="text-content-primary font-semibold">Scan Duration</div>
                    <div className="text-content-secondary text-sm">{data.metadata.duration}ms</div>
                  </div>
                  <div className="text-center p-4 bg-surface-secondary rounded-lg border border-border-default">
                    <div className="text-content-primary font-semibold">Last Scan</div>
                    <div className="text-content-secondary text-sm">
                      {new Date(data.metadata.scanTime).toLocaleString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
