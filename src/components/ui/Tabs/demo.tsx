'use client';

import {
  Activity,
  BarChart3,
  Bell,
  Calendar,
  Download,
  Edit,
  Eye,
  FileText,
  Filter,
  Mail,
  Palette,
  Plus,
  Search,
  Settings,
  Share2,
  Shield,
  Upload,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '.';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card, CardContent, CardHeader, CardTitle } from '../Card';
import { Input } from '../Input';
import { Label } from '../Label';

interface ProjectStats {
  tasks: number;
  completed: number;
  pending: number;
  overdue: number;
}

interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  desktop: boolean;
}

export default function TabsDemo() {
  const [projectStats] = useState<ProjectStats>({
    tasks: 45,
    completed: 28,
    pending: 12,
    overdue: 5,
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: true,
    push: true,
    sms: false,
    desktop: true,
  });

  const [activeProjects] = useState([
    { id: 1, name: 'Website Redesign', progress: 75, team: 8, deadline: '2024-02-15' },
    { id: 2, name: 'Mobile App', progress: 45, team: 12, deadline: '2024-03-01' },
    { id: 3, name: 'API Integration', progress: 90, team: 5, deadline: '2024-01-30' },
    { id: 4, name: 'Database Migration', progress: 20, team: 6, deadline: '2024-04-15' },
  ]);

  const [recentActivity] = useState([
    {
      id: 1,
      user: 'Alice Johnson',
      action: 'completed task',
      target: 'Login Component',
      time: '2 minutes ago',
    },
    {
      id: 2,
      user: 'Bob Smith',
      action: 'updated',
      target: 'API Documentation',
      time: '15 minutes ago',
    },
    { id: 3, user: 'Carol Davis', action: 'created', target: 'Design System', time: '1 hour ago' },
    {
      id: 4,
      user: 'David Wilson',
      action: 'deployed',
      target: 'Production Release',
      time: '2 hours ago',
    },
  ]);

  const [analytics] = useState({
    visitors: 12845,
    pageViews: 35690,
    bounceRate: 23.4,
    avgSession: '4m 32s',
    conversion: 3.2,
    revenue: '$24,567',
  });

  const updateNotificationSetting = (key: keyof NotificationSettings) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-8 p-6 max-w-6xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Tabs Component</h1>
        <p className="text-muted-foreground text-lg">
          Organize content into distinct sections with tabbed navigation
        </p>
      </div>

      {/* Basic Tabs */}
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold">Basic Tabs</h2>
          <p className="text-muted-foreground">Simple tab navigation</p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Account Information</h3>
                <p className="text-muted-foreground">
                  Manage your account details and preferences.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="password" className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Password Settings</h3>
                <p className="text-muted-foreground">Change your password and security settings.</p>
              </div>
            </TabsContent>
            <TabsContent value="settings" className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">General Settings</h3>
                <p className="text-muted-foreground">Configure application preferences.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Advanced Dashboard Tabs */}
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold">Project Dashboard</h2>
          <p className="text-muted-foreground">Comprehensive project management interface</p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="team" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Team
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Activity
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{projectStats.tasks}</div>
                    <p className="text-xs text-muted-foreground">Across all projects</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completed</CardTitle>
                    <Badge className="bg-green-100 text-green-800">{projectStats.completed}</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      {projectStats.completed}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {Math.round((projectStats.completed / projectStats.tasks) * 100)}% completion
                      rate
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending</CardTitle>
                    <Badge className="bg-yellow-100 text-yellow-800">{projectStats.pending}</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-yellow-600">{projectStats.pending}</div>
                    <p className="text-xs text-muted-foreground">Awaiting completion</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Overdue</CardTitle>
                    <Badge className="bg-red-100 text-red-800">{projectStats.overdue}</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">{projectStats.overdue}</div>
                    <p className="text-xs text-muted-foreground">Need immediate attention</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Quick Actions</h3>
                <div className="flex gap-3 flex-wrap">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Project
                  </Button>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Import Data
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Active Projects</h3>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Button>
              </div>

              <div className="space-y-4">
                {activeProjects.map(project => (
                  <Card key={project.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{project.team} members</Badge>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Due: {project.deadline}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {project.team} team members
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="team" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Team Management</h3>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Member
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    name: 'Alice Johnson',
                    role: 'Product Manager',
                    avatar: '👩‍💼',
                    status: 'Online',
                  },
                  { name: 'Bob Smith', role: 'Senior Developer', avatar: '👨‍💻', status: 'Online' },
                  { name: 'Carol Davis', role: 'UX Designer', avatar: '👩‍🎨', status: 'Away' },
                  {
                    name: 'David Wilson',
                    role: 'DevOps Engineer',
                    avatar: '👨‍🔧',
                    status: 'Offline',
                  },
                  { name: 'Eve Brown', role: 'QA Engineer', avatar: '👩‍🔬', status: 'Online' },
                  { name: 'Frank Miller', role: 'Data Analyst', avatar: '👨‍💼', status: 'Away' },
                ].map((member, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">{member.avatar}</div>
                        <div className="flex-1 space-y-1">
                          <h4 className="font-semibold">{member.name}</h4>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                member.status === 'Online'
                                  ? 'bg-green-500'
                                  : member.status === 'Away'
                                    ? 'bg-yellow-500'
                                    : 'bg-gray-400'
                              }`}
                            />
                            <span className="text-xs text-muted-foreground">{member.status}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Mail className="h-3 w-3 mr-1" />
                          Message
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Recent Activity</h3>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>

              <div className="space-y-4">
                {recentActivity.map(activity => (
                  <Card key={activity.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <div>
                            <p className="text-sm">
                              <span className="font-medium">{activity.user}</span>
                              <span className="text-muted-foreground"> {activity.action} </span>
                              <span className="font-medium">{activity.target}</span>
                            </p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button variant="outline">Load More Activity</Button>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <h3 className="text-lg font-semibold">Analytics Dashboard</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Visitors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics.visitors.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">+12% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Page Views</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics.pageViews.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">+8% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Bounce Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics.bounceRate}%</div>
                    <p className="text-xs text-muted-foreground">-2% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Avg. Session</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics.avgSession}</div>
                    <p className="text-xs text-muted-foreground">+15s from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Conversion Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics.conversion}%</div>
                    <p className="text-xs text-muted-foreground">+0.3% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics.revenue}</div>
                    <p className="text-xs text-muted-foreground">+18% from last month</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Settings Tabs */}
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold">Application Settings</h2>
          <p className="text-muted-foreground">
            Manage your application preferences and configurations
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                General
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Appearance
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">General Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="app-name">Application Name</Label>
                    <Input id="app-name" defaultValue="My Application" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input id="timezone" defaultValue="UTC-5 (Eastern Time)" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Input id="language" defaultValue="English (US)" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Input id="currency" defaultValue="USD ($)" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Security Settings</h3>
                <div className="space-y-4">
                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Two-Factor Authentication</h4>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Button variant="outline">Enable</Button>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Session Management</h4>
                        <p className="text-sm text-muted-foreground">
                          Manage active sessions and login locations
                        </p>
                      </div>
                      <Button variant="outline">Manage</Button>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">API Keys</h4>
                        <p className="text-sm text-muted-foreground">
                          Create and manage API access keys
                        </p>
                      </div>
                      <Button variant="outline">Configure</Button>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Notification Preferences</h3>
                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <Card key={key} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium capitalize">{key} Notifications</h4>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications via {key}
                          </p>
                        </div>
                        <Button
                          variant={value ? 'default' : 'outline'}
                          onClick={() =>
                            updateNotificationSetting(key as keyof NotificationSettings)
                          }
                        >
                          {value ? 'Enabled' : 'Disabled'}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Appearance Settings</h3>
                <div className="space-y-4">
                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Theme</h4>
                        <p className="text-sm text-muted-foreground">
                          Choose your preferred color theme
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Light
                        </Button>
                        <Button variant="outline" size="sm">
                          Dark
                        </Button>
                        <Button size="sm">Auto</Button>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Font Size</h4>
                        <p className="text-sm text-muted-foreground">
                          Adjust the text size for better readability
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Small
                        </Button>
                        <Button size="sm">Medium</Button>
                        <Button variant="outline" size="sm">
                          Large
                        </Button>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Compact Mode</h4>
                        <p className="text-sm text-muted-foreground">
                          Reduce spacing for more content on screen
                        </p>
                      </div>
                      <Button variant="outline">Enable</Button>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Best Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h4 className="font-semibold mb-2">Content Organization</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Group related content logically</li>
              <li>• Use clear, descriptive tab labels</li>
              <li>• Consider tab order based on user workflow</li>
              <li>• Limit tabs to 5-7 for optimal usability</li>
            </ul>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold mb-2">Accessibility</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Ensure keyboard navigation works properly</li>
              <li>• Use ARIA labels for screen readers</li>
              <li>• Maintain sufficient color contrast</li>
              <li>• Provide focus indicators for all tabs</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
