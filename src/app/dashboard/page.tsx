'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import Alert from '@/components/ui/Alert';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';
import Input from '@/components/ui/Input';
import Progress from '@/components/ui/Progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { useEffect, useState } from 'react';

interface QualityReport {
  metadata: {
    reportType: string;
    version: string;
    timestamp: string;
    totalComponents: number;
    passingComponents: number;
    overallScore: number;
    grade: string;
  };
  systemHealth: {
    build: { status: string; passed: boolean };
    typescript: { status: string; passed: boolean };
    linting: { status: string; passed: boolean };
    tests: { passed: number; failed: number; total: number; passRate: number };
  };
  components: Record<
    string,
    {
      score: number;
      status: string;
      context: string;
      issues: string[] | string;
      passing: boolean;
      lastUpdated: string;
    }
  >;
  commonIssues: Array<{
    type: string;
    description: string;
    count: number;
    affectedComponents: string[];
  }>;
  history: Array<{
    version: string;
    timestamp: string;
    overallScore: number;
    passingComponents: number;
    totalComponents: number;
  }>;
}

export default function QualityDashboard() {
  const [qualityData, setQualityData] = useState<QualityReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Load quality report data
    const loadQualityData = async () => {
      try {
        const response = await fetch('/quality-report.json');
        const data = await response.json();
        setQualityData(data);
      } catch (error) {
        console.error('Failed to load quality data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadQualityData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-8 space-y-6">
        <div className="text-center">
          <Progress value={33} className="w-64 mx-auto mb-4" />
          <p className="text-gray-600">Loading quality dashboard...</p>
        </div>
      </div>
    );
  }

  if (!qualityData) {
    return (
      <div className="container mx-auto p-8">
        <Alert variant="destructive">
          <h4>Unable to load quality data</h4>
          <p>
            The quality report JSON file could not be loaded. Please ensure the audit has been run.
          </p>
        </Alert>
      </div>
    );
  }

  // Process component data for filtering
  const componentEntries = Object.entries(qualityData.components);
  const filteredComponents = componentEntries.filter(([name, comp]) => {
    const matchesFilter =
      filterStatus === 'all' ||
      (filterStatus === 'passing' && comp.passing) ||
      (filterStatus === 'failing' && !comp.passing);

    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.context.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // System health indicators
  const systemHealthItems = [
    {
      label: 'Build',
      status: qualityData.systemHealth.build.status,
      passed: qualityData.systemHealth.build.passed,
    },
    {
      label: 'TypeScript',
      status: qualityData.systemHealth.typescript.status,
      passed: qualityData.systemHealth.typescript.passed,
    },
    {
      label: 'Linting',
      status: qualityData.systemHealth.linting.status,
      passed: qualityData.systemHealth.linting.passed,
    },
    {
      label: 'Tests',
      status: `${qualityData.systemHealth.tests.passed}/${qualityData.systemHealth.tests.total}`,
      passed: qualityData.systemHealth.tests.failed === 0,
    },
  ];

  return (
    <div className="container mx-auto p-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          TriggerKings Quality Dashboard
        </h1>
        <p className="text-xl text-gray-600">
          Real-time component quality monitoring and system health
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Badge variant="outline">Version: {qualityData.metadata.version}</Badge>
          <Badge variant={qualityData.metadata.grade === 'A+' ? 'default' : 'secondary'}>
            Grade: {qualityData.metadata.grade}
          </Badge>
          <Badge variant="outline">
            Last Updated: {new Date(qualityData.metadata.timestamp).toLocaleDateString()}
          </Badge>
        </div>
      </div>

      {/* Overall Score */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Overall Quality Score</CardTitle>
          <CardDescription>
            Deductive scoring system - start at 100, lose points for issues
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl font-bold text-green-600 mb-2">
              {qualityData.metadata.overallScore}/100
            </div>
            <Progress value={qualityData.metadata.overallScore} className="w-96 mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {qualityData.metadata.passingComponents}
              </div>
              <div className="text-sm text-gray-600">Components Passing</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {qualityData.metadata.totalComponents}
              </div>
              <div className="text-sm text-gray-600">Total Components</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {qualityData.systemHealth.tests.passRate}%
              </div>
              <div className="text-sm text-gray-600">Test Pass Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {qualityData.commonIssues.length}
              </div>
              <div className="text-sm text-gray-600">Issue Types</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle>System Health Status</CardTitle>
          <CardDescription>Build, TypeScript, Linting, and Test validation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {systemHealthItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-4 rounded-lg border">
                <div
                  className={`w-3 h-3 rounded-full ${item.passed ? 'bg-green-500' : 'bg-red-500'}`}
                />
                <div>
                  <div className="font-medium">{item.label}</div>
                  <div className="text-sm text-gray-600">{item.status}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different views */}
      <Tabs defaultValue="components" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="components">Component Analysis</TabsTrigger>
          <TabsTrigger value="issues">Common Issues</TabsTrigger>
          <TabsTrigger value="history">Quality History</TabsTrigger>
        </TabsList>

        {/* Components Tab */}
        <TabsContent value="components" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <CardTitle>Component Quality Analysis</CardTitle>
                  <CardDescription>Individual component scores and status</CardDescription>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <Input
                    placeholder="Search components..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full md:w-64"
                  />
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={filterStatus === 'passing'}
                      onChange={checked => setFilterStatus(checked ? 'passing' : 'all')}
                    />
                    <label className="text-sm">Passing Only</label>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {filteredComponents.map(([name, data]) => (
                  <Card key={name} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar src="" alt={name} size="sm" fallback={name[0]} />
                        <div>
                          <h3 className="font-semibold">{name}</h3>
                          <p className="text-sm text-gray-600">{data.context}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <Progress value={data.score} className="w-20" />
                            <span className="text-sm font-medium">{data.score}/100</span>
                          </div>
                          <Badge
                            variant={data.status === 'PASS' ? 'default' : 'destructive'}
                            className="text-xs mt-1"
                          >
                            {data.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {data.issues &&
                      ((Array.isArray(data.issues) && data.issues.length > 0) ||
                        (typeof data.issues === 'string' && data.issues.trim() !== '')) && (
                        <div className="mt-4 pt-4 border-t">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">
                            Issues to Address:
                          </h4>
                          <div className="space-y-1">
                            {(Array.isArray(data.issues) ? data.issues : [data.issues]).map(
                              (issue, index) => (
                                <div
                                  key={index}
                                  className="text-sm text-red-600 bg-red-50 px-2 py-1 rounded"
                                >
                                  • {issue}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Issues Tab */}
        <TabsContent value="issues" className="space-y-6">
          <div className="grid gap-4">
            {qualityData.commonIssues.map((issue, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Badge
                          variant={
                            issue.type === 'NEEDS_CVA'
                              ? 'destructive'
                              : issue.type === 'MISSING_TESTS'
                                ? 'secondary'
                                : 'outline'
                          }
                        >
                          {issue.type}
                        </Badge>
                        <span className="text-lg">{issue.description}</span>
                      </CardTitle>
                      <CardDescription>
                        Affects {issue.count} component{issue.count > 1 ? 's' : ''}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">{issue.count}x</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {issue.affectedComponents.map(comp => (
                      <Badge key={comp} variant="secondary">
                        {comp}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quality Score History</CardTitle>
              <CardDescription>Track improvement over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {qualityData.history
                  .slice(-10)
                  .reverse()
                  .map((entry, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border"
                    >
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">v{entry.version}</Badge>
                        <span className="text-sm text-gray-600">
                          {new Date(entry.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-medium">{entry.overallScore}/100</div>
                          <div className="text-sm text-gray-600">
                            {entry.passingComponents}/{entry.totalComponents} passing
                          </div>
                        </div>
                        <Progress value={entry.overallScore} className="w-24" />
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Interactive Component Showcase */}
      <Card>
        <CardHeader>
          <CardTitle>Live Component Showcase</CardTitle>
          <CardDescription>
            All components used in this dashboard are from your UI library
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Button & Badge Variants</h3>
              <div className="space-y-2">
                <Button variant="default" size="sm">
                  Default Button
                </Button>
                <Button variant="secondary" size="sm">
                  Secondary Button
                </Button>
                <Button variant="outline" size="sm">
                  Outline Button
                </Button>
                <div className="flex gap-2 flex-wrap">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-lg">Progress & Data Display</h3>
              <div className="space-y-3">
                <Progress value={95} />
                <Progress value={70} />
                <Progress value={45} />
                <div className="flex items-center gap-2">
                  <Avatar src="" alt="User" size="sm" fallback="U" />
                  <span className="text-sm">Avatar component</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-lg">Form Controls</h3>
              <div className="space-y-3">
                <Input placeholder="Search or filter..." />
                <div className="flex items-center gap-2">
                  <Checkbox />
                  <label className="text-sm">Enable notifications</label>
                </div>
                <Alert variant="info">
                  <p className="text-sm">All components are live and functional!</p>
                </Alert>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Raw JSON Data Viewer */}
      <Card>
        <CardHeader>
          <CardTitle>Raw JSON Data</CardTitle>
          <CardDescription>Complete audit data for development and integration</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-64 text-xs">
            {JSON.stringify(qualityData, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
