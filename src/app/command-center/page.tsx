'use client';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import {
  AlertTriangle,
  BarChart3,
  Book,
  CheckCircle,
  Code,
  Database,
  FileText,
  FolderOpen,
  GitBranch,
  Monitor,
  Package,
  PlayCircle,
  Settings,
  Sparkles,
  Terminal,
  Wrench,
  Zap,
} from 'lucide-react';
import { useState } from 'react';

// Script Categories and Registry
const scriptRegistry = {
  automation: [
    {
      name: 'Pre-commit Automation',
      file: 'pre-commit-automation.ps1',
      description: 'Automated quality checks and formatting before commits',
      category: 'CI/CD',
      lastRun: '2025-08-21',
      status: 'active',
    },
    {
      name: 'Component Automation',
      file: 'component-automation.ps1',
      description: 'Automated component generation and scaffolding',
      category: 'Development',
      lastRun: '2025-08-20',
      status: 'active',
    },
    {
      name: 'Manual Release',
      file: 'manual-release.ps1',
      description: 'Streamlined release process with version bumping',
      category: 'Release',
      lastRun: '2025-08-19',
      status: 'active',
    },
  ],
  maintenance: [
    {
      name: 'Container Cleanup',
      file: 'container-cleanup.ps1',
      description: 'Clean up unused container components and styling',
      category: 'Cleanup',
      lastRun: '2025-08-18',
      status: 'deprecated',
    },
    {
      name: 'Fix Component Tests',
      file: 'fix-component-tests.ps1',
      description: 'Batch fix test imports and configurations',
      category: 'Testing',
      lastRun: '2025-08-17',
      status: 'maintenance',
    },
    {
      name: 'Mass Fix Imports',
      file: 'mass-fix-imports.ps1',
      description: 'Update import statements across the codebase',
      category: 'Refactoring',
      lastRun: '2025-08-16',
      status: 'maintenance',
    },
  ],
  analysis: [
    {
      name: 'Shadcn Analyzer',
      file: 'shadcn-analyzer.js',
      description: 'Analyze shadcn component implementation and coverage',
      category: 'Analysis',
      lastRun: '2025-08-15',
      status: 'active',
    },
    {
      name: 'Deductive Audit',
      file: 'deductive-audit.ps1',
      description: 'Comprehensive codebase audit and health check',
      category: 'Quality',
      lastRun: '2025-08-14',
      status: 'active',
    },
    {
      name: 'Config Viewer',
      file: 'config-viewer.ps1',
      description: 'View and validate project configuration files',
      category: 'Configuration',
      lastRun: '2025-08-13',
      status: 'active',
    },
  ],
  generators: [
    {
      name: 'Generate All Demos',
      file: 'generate-all-demos.cjs',
      description: 'Generate demo files for all components',
      category: 'Generation',
      lastRun: '2025-08-12',
      status: 'active',
    },
    {
      name: 'Alphabetical Components',
      file: 'alphabetical-components.js',
      description: 'Organize components in alphabetical order',
      category: 'Organization',
      lastRun: '2025-08-11',
      status: 'active',
    },
    {
      name: 'Shorthand Processor',
      file: 'shorthand-processor.js',
      description: 'Process shorthand commands and expand them',
      category: 'Utilities',
      lastRun: '2025-08-10',
      status: 'active',
    },
  ],
};

const documentationRegistry = [
  {
    title: 'Component Registry',
    file: 'COMPONENT_REGISTRY.md',
    description: 'Complete component inventory with status and metadata',
    category: 'Components',
    type: 'registry',
    lastUpdated: '2025-08-21',
  },
  {
    title: 'Semantic Color System',
    file: 'docs/SEMANTIC_COLOR_SYSTEM.md',
    description: 'Design token system and color management',
    category: 'Design System',
    type: 'specification',
    lastUpdated: '2025-08-20',
  },
  {
    title: 'Component Development Guide',
    file: 'docs/COMPONENT_DEVELOPMENT.md',
    description: 'Standards and patterns for component development',
    category: 'Development',
    type: 'guide',
    lastUpdated: '2025-08-19',
  },
  {
    title: 'Theme System',
    file: 'docs/THEME_SYSTEM.md',
    description: 'Theme architecture and customization guide',
    category: 'Design System',
    type: 'specification',
    lastUpdated: '2025-08-18',
  },
  {
    title: 'Quick Reference',
    file: 'QUICK_REFERENCE.md',
    description: 'Essential commands and shortcuts',
    category: 'Reference',
    type: 'reference',
    lastUpdated: '2025-08-17',
  },
  {
    title: 'Shorthand Commands',
    file: 'SHORTHAND_COMMANDS.md',
    description: 'Available shorthand commands and aliases',
    category: 'Reference',
    type: 'reference',
    lastUpdated: '2025-08-16',
  },
];

const systemMetrics = {
  components: {
    total: 30,
    withTests: 28,
    withStories: 28,
    productionReady: 28,
  },
  codebase: {
    linesOfCode: '~15,000',
    testCoverage: '87.8%',
    buildTime: '4.2s',
    bundleSize: '245KB',
  },
  quality: {
    eslintIssues: 0,
    typeErrors: 0,
    deprecatedAPIs: 2,
    securityVulns: 0,
  },
};

export default function CommandCenter() {
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'maintenance':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'deprecated':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'maintenance':
        return <AlertTriangle className="w-4 h-4" />;
      case 'deprecated':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Settings className="w-4 h-4" />;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Command Center</h1>
        <p className="text-muted-foreground">
          Unified control panel for scripts, documentation, and system management
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">
            <Monitor className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="scripts">
            <Terminal className="w-4 h-4 mr-2" />
            Scripts
          </TabsTrigger>
          <TabsTrigger value="documentation">
            <Book className="w-4 h-4 mr-2" />
            Documentation
          </TabsTrigger>
          <TabsTrigger value="components">
            <Package className="w-4 h-4 mr-2" />
            Components
          </TabsTrigger>
          <TabsTrigger value="system">
            <BarChart3 className="w-4 h-4 mr-2" />
            System
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Components
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Components</span>
                    <Badge variant="secondary">{systemMetrics.components.total}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Production Ready</span>
                    <Badge variant="secondary">{systemMetrics.components.productionReady}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Test Coverage</span>
                    <Badge className="bg-green-100 text-green-800">
                      {(
                        (systemMetrics.components.withTests / systemMetrics.components.total) *
                        100
                      ).toFixed(1)}
                      %
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="w-5 h-5" />
                  Automation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Active Scripts</span>
                    <Badge variant="secondary">
                      {
                        Object.values(scriptRegistry)
                          .flat()
                          .filter(s => s.status === 'active').length
                      }
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Scripts</span>
                    <Badge variant="secondary">{Object.values(scriptRegistry).flat().length}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Automation</span>
                    <Badge className="bg-blue-100 text-blue-800">Today</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Build Status</span>
                    <Badge className="bg-green-100 text-green-800">Passing</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Type Safety</span>
                    <Badge className="bg-green-100 text-green-800">Clean</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Lint Status</span>
                    <Badge className="bg-green-100 text-green-800">Clean</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="w-5 h-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest changes and automations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Enhanced component demo headers</p>
                    <p className="text-xs text-muted-foreground">
                      Added status indicators and metadata
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    2 min ago
                  </Badge>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Navigation border animation</p>
                    <p className="text-xs text-muted-foreground">
                      Added theme-aware page load animation
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    1 hour ago
                  </Badge>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Component showcase improvements</p>
                    <p className="text-xs text-muted-foreground">
                      Scroll-to-position and theme integration
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    3 hours ago
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scripts" className="space-y-6">
          {Object.entries(scriptRegistry).map(([category, scripts]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="capitalize flex items-center gap-2">
                  <Wrench className="w-5 h-5" />
                  {category} Scripts
                </CardTitle>
                <CardDescription>
                  {category === 'automation' && 'Automated workflows and CI/CD processes'}
                  {category === 'maintenance' && 'Code maintenance and cleanup utilities'}
                  {category === 'analysis' && 'Codebase analysis and quality tools'}
                  {category === 'generators' && 'Code and documentation generators'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scripts.map((script, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{script.name}</h4>
                          <Badge
                            variant="outline"
                            className={`text-xs ${getStatusColor(script.status)}`}
                          >
                            {getStatusIcon(script.status)}
                            {script.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {script.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{script.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>
                            File: <code className="px-1 bg-muted rounded">{script.file}</code>
                          </span>
                          <span>Last run: {script.lastRun}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <PlayCircle className="w-4 h-4 mr-1" />
                          Run
                        </Button>
                        <Button variant="ghost" size="sm">
                          <FileText className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="documentation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="w-5 h-5" />
                Documentation Registry
              </CardTitle>
              <CardDescription>All documentation files, guides, and references</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documentationRegistry.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{doc.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {doc.category}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {doc.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{doc.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>
                          File: <code className="px-1 bg-muted rounded">{doc.file}</code>
                        </span>
                        <span>Updated: {doc.lastUpdated}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <FolderOpen className="w-4 h-4 mr-1" />
                        Open
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Code className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="components" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Component Status Overview
              </CardTitle>
              <CardDescription>Quick overview of component library status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {systemMetrics.components.total}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Components</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {systemMetrics.components.withTests}
                  </div>
                  <div className="text-sm text-muted-foreground">With Tests</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {systemMetrics.components.withStories}
                  </div>
                  <div className="text-sm text-muted-foreground">With Stories</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-amber-600">
                    {systemMetrics.components.productionReady}
                  </div>
                  <div className="text-sm text-muted-foreground">Production Ready</div>
                </div>
              </div>

              <div className="mt-6">
                <Button className="w-full">
                  <FolderOpen className="w-4 h-4 mr-2" />
                  View Component Showcase
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Codebase Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Lines of Code</span>
                    <Badge variant="secondary">{systemMetrics.codebase.linesOfCode}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Test Coverage</span>
                    <Badge className="bg-green-100 text-green-800">
                      {systemMetrics.codebase.testCoverage}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Build Time</span>
                    <Badge variant="secondary">{systemMetrics.codebase.buildTime}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Bundle Size</span>
                    <Badge variant="secondary">{systemMetrics.codebase.bundleSize}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quality Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>ESLint Issues</span>
                    <Badge className="bg-green-100 text-green-800">
                      {systemMetrics.quality.eslintIssues}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Type Errors</span>
                    <Badge className="bg-green-100 text-green-800">
                      {systemMetrics.quality.typeErrors}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Deprecated APIs</span>
                    <Badge className="bg-amber-100 text-amber-800">
                      {systemMetrics.quality.deprecatedAPIs}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Security Vulnerabilities</span>
                    <Badge className="bg-green-100 text-green-800">
                      {systemMetrics.quality.securityVulns}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common development and maintenance tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                  <Terminal className="w-6 h-6" />
                  <span className="text-sm">Run Tests</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                  <Zap className="w-6 h-6" />
                  <span className="text-sm">Build Project</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                  <BarChart3 className="w-6 h-6" />
                  <span className="text-sm">Generate Report</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                  <Database className="w-6 h-6" />
                  <span className="text-sm">Clean Cache</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
