'use client';

import {
  Activity,
  BarChart3,
  Bell,
  Building,
  Cloud,
  Code,
  Copy,
  CreditCard,
  Download,
  Eye,
  File,
  Grid,
  Home,
  List,
  Mail,
  MessageSquare,
  MoreHorizontal,
  Settings,
  Share,
  Shield,
  Smartphone,
  Target,
  TrendingUp,
  Upload,
  User,
  Users,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { Separator } from '.';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card } from '../Card';

import type { LucideIcon } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  department: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  description?: string;
  shortcut?: string;
  disabled?: boolean;
}

interface ProductFeature {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: string;
}

export default function SeparatorDemo() {
  const [selectedSection, setSelectedSection] = useState('general');
  const [viewMode, setViewMode] = useState('list');

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      role: 'Product Manager',
      email: 'alice@company.com',
      avatar: '👩‍💼',
      status: 'online',
      department: 'Product',
    },
    {
      id: '2',
      name: 'Bob Smith',
      role: 'Senior Developer',
      email: 'bob@company.com',
      avatar: '👨‍💻',
      status: 'away',
      department: 'Engineering',
    },
    {
      id: '3',
      name: 'Carol Davis',
      role: 'UX Designer',
      email: 'carol@company.com',
      avatar: '👩‍🎨',
      status: 'online',
      department: 'Design',
    },
    {
      id: '4',
      name: 'David Wilson',
      role: 'DevOps Engineer',
      email: 'david@company.com',
      avatar: '👨‍🔧',
      status: 'offline',
      department: 'Engineering',
    },
    {
      id: '5',
      name: 'Eve Brown',
      role: 'Marketing Lead',
      email: 'eve@company.com',
      avatar: '👩‍💼',
      status: 'online',
      department: 'Marketing',
    },
  ];

  const menuItems: MenuItem[] = [
    { id: '1', label: 'New File', icon: File, shortcut: 'Ctrl+N' },
    { id: '2', label: 'Open File', icon: Upload, shortcut: 'Ctrl+O' },
    { id: '3', label: 'Save', icon: Download, shortcut: 'Ctrl+S' },
    { id: '4', label: 'Save As...', icon: Copy, shortcut: 'Ctrl+Shift+S' },
    { id: '5', label: 'Export', icon: Share, description: 'Export to various formats' },
    { id: '6', label: 'Print', icon: Eye, shortcut: 'Ctrl+P' },
    { id: '7', label: 'Settings', icon: Settings, description: 'Application preferences' },
    { id: '8', label: 'Help', icon: MessageSquare, shortcut: 'F1' },
    { id: '9', label: 'About', icon: Shield, description: 'Version and license info' },
  ];

  const productFeatures: ProductFeature[] = [
    {
      id: '1',
      title: 'User Management',
      description: 'Complete user account and permission system',
      icon: Users,
      category: 'Core',
    },
    {
      id: '2',
      title: 'Analytics Dashboard',
      description: 'Real-time data visualization and reporting',
      icon: BarChart3,
      category: 'Analytics',
    },
    {
      id: '3',
      title: 'API Integration',
      description: 'RESTful API with comprehensive documentation',
      icon: Code,
      category: 'Development',
    },
    {
      id: '4',
      title: 'Mobile App',
      description: 'Native iOS and Android applications',
      icon: Smartphone,
      category: 'Mobile',
    },
    {
      id: '5',
      title: 'Cloud Storage',
      description: 'Secure file storage and sharing capabilities',
      icon: Cloud,
      category: 'Storage',
    },
    {
      id: '6',
      title: 'Real-time Chat',
      description: 'Instant messaging and team collaboration',
      icon: MessageSquare,
      category: 'Communication',
    },
    {
      id: '7',
      title: 'Payment Processing',
      description: 'Secure payment gateway integration',
      icon: CreditCard,
      category: 'Commerce',
    },
    {
      id: '8',
      title: 'Advanced Security',
      description: 'Multi-factor authentication and encryption',
      icon: Shield,
      category: 'Security',
    },
  ];

  const groupedFeatures = productFeatures.reduce(
    (acc, feature) => {
      if (!acc[feature.category]) {
        acc[feature.category] = [];
      }
      acc[feature.category].push(feature);
      return acc;
    },
    {} as Record<string, ProductFeature[]>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Separator Component</h1>
        <p className="text-muted-foreground text-lg">
          Visual content separators for organizing layouts and improving readability
        </p>
      </div>

      {/* Basic Examples Section */}
      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">Basic Examples</h2>
          <p className="text-muted-foreground">Simple separators for organizing content sections</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Horizontal Separators</h3>
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Section One</h4>
                  <p className="text-sm text-muted-foreground">
                    Content for the first section goes here.
                  </p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold">Section Two</h4>
                  <p className="text-sm text-muted-foreground">
                    Content for the second section goes here.
                  </p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold">Section Three</h4>
                  <p className="text-sm text-muted-foreground">
                    Content for the third section goes here.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Vertical Separators</h3>
            <Card className="p-6">
              <div className="flex items-center gap-4 h-32">
                <div className="flex-1 text-center">
                  <Home className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="font-semibold text-sm">Home</p>
                </div>

                <Separator orientation="vertical" />

                <div className="flex-1 text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="font-semibold text-sm">Team</p>
                </div>

                <Separator orientation="vertical" />

                <div className="flex-1 text-center">
                  <Settings className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="font-semibold text-sm">Settings</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Advanced Examples Section */}
      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">Advanced Examples</h2>
          <p className="text-muted-foreground">
            Complex layouts using separators for enterprise applications
          </p>
        </div>

        {/* Navigation Menu with Separators */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Navigation Menu Layout</h3>
          <Card className="overflow-hidden">
            <div className="p-4 bg-muted/20">
              <h4 className="font-semibold">Application Menu</h4>
            </div>

            <Separator />

            <div className="p-4">
              <div className="space-y-1">
                {/* File Menu Section */}
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    File
                  </p>
                  {menuItems.slice(0, 4).map(item => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-2 rounded hover:bg-muted cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span className="text-sm">{item.label}</span>
                      </div>
                      {item.shortcut && (
                        <span className="text-xs text-muted-foreground font-mono">
                          {item.shortcut}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <Separator className="my-3" />

                {/* Export Menu Section */}
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Export
                  </p>
                  {menuItems.slice(4, 6).map(item => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-2 rounded hover:bg-muted cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <div>
                          <span className="text-sm">{item.label}</span>
                          {item.description && (
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          )}
                        </div>
                      </div>
                      {item.shortcut && (
                        <span className="text-xs text-muted-foreground font-mono">
                          {item.shortcut}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <Separator className="my-3" />

                {/* Help Menu Section */}
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Help
                  </p>
                  {menuItems.slice(6).map(item => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-2 rounded hover:bg-muted cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <div>
                          <span className="text-sm">{item.label}</span>
                          {item.description && (
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          )}
                        </div>
                      </div>
                      {item.shortcut && (
                        <span className="text-xs text-muted-foreground font-mono">
                          {item.shortcut}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Team Directory with Department Separators */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Team Directory with Department Grouping</h3>
          <Card className="overflow-hidden">
            <div className="p-4 bg-muted/20 flex items-center justify-between">
              <h4 className="font-semibold">Team Members</h4>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Separator />

            <div className="p-4">
              {/* Group by department */}
              {Object.entries(
                teamMembers.reduce(
                  (acc, member) => {
                    if (!acc[member.department]) {
                      acc[member.department] = [];
                    }
                    acc[member.department].push(member);
                    return acc;
                  },
                  {} as Record<string, TeamMember[]>
                )
              ).map(([department, members], deptIndex) => (
                <div key={department}>
                  {deptIndex > 0 && <Separator className="my-4" />}

                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-3">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <h5 className="font-semibold text-sm">{department}</h5>
                      <Badge variant="secondary">{members.length}</Badge>
                    </div>

                    <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-3' : 'space-y-2'}>
                      {members.map((member, index) => (
                        <div key={member.id}>
                          {viewMode === 'list' && index > 0 && <Separator className="my-2" />}
                          <div
                            className={`p-3 rounded-lg border hover:bg-muted/50 cursor-pointer ${viewMode === 'grid' ? 'text-center' : 'flex items-center gap-3'}`}
                          >
                            <div
                              className={`relative ${viewMode === 'grid' ? 'mx-auto mb-2' : ''}`}
                            >
                              <div className="text-2xl">{member.avatar}</div>
                              <div
                                className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(member.status)}`}
                              ></div>
                            </div>
                            <div className={`flex-1 ${viewMode === 'grid' ? 'text-center' : ''}`}>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-sm">{member.name}</span>
                                <Badge variant="outline" className="text-xs capitalize">
                                  {member.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{member.role}</p>
                              <p className="text-xs text-muted-foreground">{member.email}</p>
                            </div>
                            {viewMode === 'list' && (
                              <div className="flex items-center gap-1">
                                <Button variant="ghost" size="sm">
                                  <MessageSquare className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Mail className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Settings Panel with Section Separators */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Settings Panel with Section Organization</h3>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Settings Navigation */}
            <Card className="lg:col-span-1">
              <div className="p-4">
                <h4 className="font-semibold mb-4">Settings</h4>
                <div className="space-y-1">
                  {[
                    { id: 'general', label: 'General', icon: Settings },
                    { id: 'account', label: 'Account', icon: User },
                    { id: 'security', label: 'Security', icon: Shield },
                    { id: 'notifications', label: 'Notifications', icon: Bell },
                    { id: 'billing', label: 'Billing', icon: CreditCard },
                    { id: 'integrations', label: 'Integrations', icon: Zap },
                  ].map((section, index) => (
                    <div key={section.id}>
                      {index === 2 && <Separator className="my-2" />}
                      {index === 4 && <Separator className="my-2" />}
                      <button
                        onClick={() => setSelectedSection(section.id)}
                        className={`w-full flex items-center gap-2 p-2 rounded text-left hover:bg-muted ${
                          selectedSection === section.id ? 'bg-accent' : ''
                        }`}
                      >
                        <section.icon className="h-4 w-4" />
                        <span className="text-sm">{section.label}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Settings Content */}
            <Card className="lg:col-span-3">
              <div className="p-4">
                <div className="mb-4">
                  <h4 className="font-semibold capitalize">{selectedSection} Settings</h4>
                  <p className="text-sm text-muted-foreground">
                    Configure your {selectedSection} preferences and options
                  </p>
                </div>

                <Separator className="mb-6" />

                <div className="space-y-6">
                  <div>
                    <h5 className="font-medium mb-3">Profile Information</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Display Name</label>
                        <div className="mt-1 p-2 border rounded text-sm">John Doe</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email Address</label>
                        <div className="mt-1 p-2 border rounded text-sm">john@company.com</div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h5 className="font-medium mb-3">Preferences</h5>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Email Notifications</p>
                          <p className="text-xs text-muted-foreground">Receive updates via email</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Enable
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Two-Factor Authentication</p>
                          <p className="text-xs text-muted-foreground">
                            Add extra security to your account
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Setup
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Data Export</p>
                          <p className="text-xs text-muted-foreground">
                            Download your account data
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Export
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h5 className="font-medium mb-3">Danger Zone</h5>
                    <div className="p-4 border border-red-200 rounded-lg bg-red-50/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-red-700">Delete Account</p>
                          <p className="text-xs text-red-600">
                            Permanently delete your account and all data
                          </p>
                        </div>
                        <Button variant="destructive" size="sm">
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Product Features with Category Separators */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Product Features by Category</h3>
          <Card className="p-6">
            {Object.entries(groupedFeatures).map(([category, features], categoryIndex) => (
              <div key={category}>
                {categoryIndex > 0 && <Separator className="my-6" />}

                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="outline">{category}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {features.length} features
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {features.map((feature, index) => (
                      <div key={feature.id}>
                        {index > 0 && index % 2 === 0 && (
                          <Separator orientation="horizontal" className="md:hidden my-4" />
                        )}
                        <div className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <feature.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h6 className="font-semibold text-sm mb-1">{feature.title}</h6>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* Dashboard Stats with Separators */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Dashboard Statistics</h3>
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  label: 'Total Users',
                  value: '12,543',
                  change: '+12%',
                  icon: Users,
                  positive: true,
                },
                {
                  label: 'Revenue',
                  value: '$45,678',
                  change: '+8%',
                  icon: TrendingUp,
                  positive: true,
                },
                {
                  label: 'Active Sessions',
                  value: '2,847',
                  change: '-3%',
                  icon: Activity,
                  positive: false,
                },
                {
                  label: 'Conversion Rate',
                  value: '3.2%',
                  change: '+0.5%',
                  icon: Target,
                  positive: true,
                },
              ].map((stat, index) => (
                <div key={stat.label} className="flex items-center">
                  {index > 0 && (
                    <Separator orientation="vertical" className="hidden md:block mr-6 h-16" />
                  )}
                  <div className="text-center flex-1">
                    <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto mb-3">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-2xl font-bold mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <Badge variant={stat.positive ? 'default' : 'destructive'} className="text-xs">
                      {stat.change}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Best Practices Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Best Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h4 className="font-semibold mb-2">Visual Hierarchy</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use separators to create logical content groups</li>
              <li>• Maintain consistent spacing around separators</li>
              <li>• Consider separator thickness for emphasis levels</li>
              <li>• Combine with typography for clear section headers</li>
            </ul>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold mb-2">Layout Organization</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use vertical separators for side-by-side content</li>
              <li>• Group related items before adding separators</li>
              <li>• Avoid overusing separators in dense layouts</li>
              <li>• Consider semantic grouping over visual separation</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
