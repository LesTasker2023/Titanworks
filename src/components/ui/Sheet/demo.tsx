'use client';

import {
  AlertTriangle,
  BarChart3,
  Bell,
  Calendar,
  CheckCircle,
  Filter,
  Folder,
  Info,
  LucideIcon,
  Mail,
  Menu,
  MessageSquare,
  Palette,
  Plus,
  Save,
  Search,
  Send,
  Settings,
  Shield,
  User,
  Users,
  XCircle,
} from 'lucide-react';
import React, { useState } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '.';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card } from '../Card';
import { Input } from '../Input';
import { Label } from '../Label';
import { ScrollArea } from '../ScrollArea';
import { Separator } from '../Separator';
import { Textarea } from '../Textarea';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  avatar?: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  email: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'paused';
  progress: number;
  team: string[];
  dueDate: string;
}

interface SettingsSection {
  id: string;
  title: string;
  icon: LucideIcon;
  settings: {
    key: string;
    label: string;
    type: 'toggle' | 'select' | 'input';
    value: string | boolean;
    options?: string[];
  }[];
}

export default function SheetDemo() {
  const [basicSheetOpen, setBasicSheetOpen] = useState(false);
  const [notificationSheetOpen, setNotificationSheetOpen] = useState(false);
  const [settingsSheetOpen, setSettingsSheetOpen] = useState(false);
  const [teamSheetOpen, setTeamSheetOpen] = useState(false);
  const [projectSheetOpen, setProjectSheetOpen] = useState(false);
  const [formSheetOpen, setFormSheetOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    priority: 'medium',
    category: 'general',
  });

  const notifications: NotificationItem[] = [
    {
      id: '1',
      title: 'New Message',
      message: 'You have received a new message from Alice Johnson',
      timestamp: '2 min ago',
      type: 'info',
      read: false,
      avatar: '👩‍💼',
    },
    {
      id: '2',
      title: 'System Update',
      message: 'System maintenance will begin at 2:00 AM UTC',
      timestamp: '1 hour ago',
      type: 'warning',
      read: false,
    },
    {
      id: '3',
      title: 'Build Completed',
      message: 'Production build #1245 finished successfully',
      timestamp: '2 hours ago',
      type: 'success',
      read: true,
    },
    {
      id: '4',
      title: 'Error Alert',
      message: 'Payment processing service experiencing issues',
      timestamp: '3 hours ago',
      type: 'error',
      read: false,
    },
    {
      id: '5',
      title: 'Team Invitation',
      message: 'You have been invited to join the Design Team',
      timestamp: '1 day ago',
      type: 'info',
      read: true,
      avatar: '👨‍🎨',
    },
    {
      id: '6',
      title: 'Storage Warning',
      message: 'Database storage is at 85% capacity',
      timestamp: '2 days ago',
      type: 'warning',
      read: true,
    },
    {
      id: '7',
      title: 'Backup Complete',
      message: 'Daily backup process finished without errors',
      timestamp: '3 days ago',
      type: 'success',
      read: true,
    },
    {
      id: '8',
      title: 'Security Alert',
      message: 'New login detected from unknown device',
      timestamp: '1 week ago',
      type: 'error',
      read: true,
    },
  ];

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      role: 'Product Manager',
      avatar: '👩‍💼',
      status: 'online',
      email: 'alice@company.com',
    },
    {
      id: '2',
      name: 'Bob Smith',
      role: 'Senior Developer',
      avatar: '👨‍💻',
      status: 'away',
      email: 'bob@company.com',
    },
    {
      id: '3',
      name: 'Carol Davis',
      role: 'UX Designer',
      avatar: '👩‍🎨',
      status: 'online',
      email: 'carol@company.com',
    },
    {
      id: '4',
      name: 'David Wilson',
      role: 'DevOps Engineer',
      avatar: '👨‍🔧',
      status: 'offline',
      email: 'david@company.com',
    },
    {
      id: '5',
      name: 'Eve Brown',
      role: 'Marketing Lead',
      avatar: '👩‍💼',
      status: 'online',
      email: 'eve@company.com',
    },
    {
      id: '6',
      name: 'Frank Miller',
      role: 'QA Engineer',
      avatar: '👨‍🔬',
      status: 'away',
      email: 'frank@company.com',
    },
    {
      id: '7',
      name: 'Grace Lee',
      role: 'Sales Manager',
      avatar: '👩‍💼',
      status: 'online',
      email: 'grace@company.com',
    },
    {
      id: '8',
      name: 'Henry Taylor',
      role: 'Data Analyst',
      avatar: '👨‍💻',
      status: 'offline',
      email: 'henry@company.com',
    },
  ];

  const projects: Project[] = [
    {
      id: '1',
      name: 'Mobile App Redesign',
      description: 'Complete overhaul of the mobile application user interface',
      status: 'active',
      progress: 75,
      team: ['1', '3', '5'],
      dueDate: '2024-12-15',
    },
    {
      id: '2',
      name: 'API Documentation',
      description: 'Comprehensive documentation for all API endpoints',
      status: 'active',
      progress: 60,
      team: ['2', '6'],
      dueDate: '2024-11-30',
    },
    {
      id: '3',
      name: 'Security Audit',
      description: 'Full security assessment and vulnerability testing',
      status: 'paused',
      progress: 30,
      team: ['4', '6'],
      dueDate: '2025-01-20',
    },
    {
      id: '4',
      name: 'Marketing Campaign',
      description: 'Q4 product launch marketing campaign',
      status: 'completed',
      progress: 100,
      team: ['5', '7'],
      dueDate: '2024-10-31',
    },
    {
      id: '5',
      name: 'Data Migration',
      description: 'Legacy system data migration to new platform',
      status: 'active',
      progress: 85,
      team: ['2', '4', '8'],
      dueDate: '2024-12-01',
    },
  ];

  const settingsSections: SettingsSection[] = [
    {
      id: 'account',
      title: 'Account Settings',
      icon: User,
      settings: [
        { key: 'emailNotifications', label: 'Email Notifications', type: 'toggle', value: true },
        { key: 'twoFactor', label: 'Two-Factor Authentication', type: 'toggle', value: false },
        {
          key: 'language',
          label: 'Language',
          type: 'select',
          value: 'english',
          options: ['english', 'spanish', 'french', 'german'],
        },
      ],
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: Shield,
      settings: [
        {
          key: 'profileVisibility',
          label: 'Profile Visibility',
          type: 'select',
          value: 'public',
          options: ['public', 'private', 'team'],
        },
        { key: 'dataSharing', label: 'Data Sharing', type: 'toggle', value: false },
        { key: 'sessionTimeout', label: 'Session Timeout (minutes)', type: 'input', value: '30' },
      ],
    },
    {
      id: 'appearance',
      title: 'Appearance',
      icon: Palette,
      settings: [
        {
          key: 'theme',
          label: 'Theme',
          type: 'select',
          value: 'system',
          options: ['light', 'dark', 'system'],
        },
        {
          key: 'fontSize',
          label: 'Font Size',
          type: 'select',
          value: 'medium',
          options: ['small', 'medium', 'large'],
        },
        { key: 'animations', label: 'Animations', type: 'toggle', value: true },
      ],
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return CheckCircle;
      case 'warning':
        return AlertTriangle;
      case 'error':
        return XCircle;
      case 'info':
        return Info;
      default:
        return Info;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      case 'error':
        return 'text-red-500';
      case 'info':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

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

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'completed':
        return 'bg-blue-500';
      case 'paused':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-400';
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormSheetOpen(false);
    setFormData({ name: '', email: '', message: '', priority: 'medium', category: 'general' });
  };

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Sheet Component</h1>
        <p className="text-muted-foreground text-lg">
          Side panels and drawer interfaces for enterprise applications
        </p>
      </div>

      {/* Basic Examples Section */}
      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">Basic Examples</h2>
          <p className="text-muted-foreground">Simple sheet implementations for common use cases</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Basic Sheet</h3>
            <Card className="p-4">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Open a basic sheet with header and content
                </p>
                <Sheet open={basicSheetOpen} onOpenChange={setBasicSheetOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline">
                      <Menu className="h-4 w-4 mr-2" />
                      Open Basic Sheet
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Basic Sheet Example</SheetTitle>
                      <SheetDescription>
                        This is a basic sheet with header, content, and footer sections.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="py-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Sample Content</h4>
                          <p className="text-sm text-muted-foreground">
                            This sheet can contain any type of content including forms, lists,
                            images, or complex layouts. It provides a focused workspace that slides
                            in from the side of the screen.
                          </p>
                        </div>
                        <Separator />
                        <div>
                          <h4 className="font-semibold mb-2">Key Features</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Slides in from the right side</li>
                            <li>• Overlay backdrop dims main content</li>
                            <li>• Keyboard and click-outside dismissal</li>
                            <li>• Customizable width and positioning</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <SheetFooter>
                      <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                      </SheetClose>
                      <Button>Save Changes</Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>
            </Card>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Contact Form Sheet</h3>
            <Card className="p-4">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Form-based sheet with validation and submission
                </p>
                <Sheet open={formSheetOpen} onOpenChange={setFormSheetOpen}>
                  <SheetTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Contact Us
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="sm:max-w-md">
                    <SheetHeader>
                      <SheetTitle>Contact Form</SheetTitle>
                      <SheetDescription>
                        Send us a message and we&apos;ll get back to you as soon as possible.
                      </SheetDescription>
                    </SheetHeader>
                    <form onSubmit={handleFormSubmit} className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority</Label>
                        <select
                          id="priority"
                          value={formData.priority}
                          onChange={e =>
                            setFormData(prev => ({ ...prev, priority: e.target.value }))
                          }
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="urgent">Urgent</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={e =>
                            setFormData(prev => ({ ...prev, message: e.target.value }))
                          }
                          placeholder="Describe your inquiry or issue..."
                          rows={4}
                          required
                        />
                      </div>
                      <SheetFooter>
                        <SheetClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </SheetClose>
                        <Button type="submit">
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </Button>
                      </SheetFooter>
                    </form>
                  </SheetContent>
                </Sheet>
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
            Complex sheet implementations for enterprise workflows
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Notifications Sheet */}
          <Card className="p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <h3 className="font-semibold">Notifications</h3>
                <Badge variant="destructive">{notifications.filter(n => !n.read).length}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">View and manage system notifications</p>
              <Sheet open={notificationSheetOpen} onOpenChange={setNotificationSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    View Notifications
                  </Button>
                </SheetTrigger>
                <SheetContent className="sm:max-w-md">
                  <SheetHeader>
                    <SheetTitle>Notifications</SheetTitle>
                    <SheetDescription>
                      Stay updated with the latest system alerts and messages
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium">
                        {notifications.filter(n => !n.read).length} unread
                      </span>
                      <Button variant="ghost" size="sm">
                        Mark all read
                      </Button>
                    </div>
                    <ScrollArea className="h-96">
                      <div className="space-y-3">
                        {notifications.map(notification => {
                          const IconComponent = getNotificationIcon(notification.type);
                          return (
                            <div
                              key={notification.id}
                              className={`p-3 rounded-lg border cursor-pointer hover:bg-muted/50 ${
                                !notification.read ? 'bg-accent/20' : ''
                              }`}
                            >
                              <div className="flex gap-3">
                                {notification.avatar ? (
                                  <div className="text-xl">{notification.avatar}</div>
                                ) : (
                                  <IconComponent
                                    className={`h-5 w-5 mt-0.5 ${getNotificationColor(notification.type)}`}
                                  />
                                )}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between mb-1">
                                    <p className="font-semibold text-sm">{notification.title}</p>
                                    {!notification.read && (
                                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground leading-relaxed">
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {notification.timestamp}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </ScrollArea>
                  </div>
                  <SheetFooter>
                    <Button variant="outline" className="w-full">
                      <Settings className="h-4 w-4 mr-2" />
                      Notification Settings
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </Card>

          {/* Team Directory Sheet */}
          <Card className="p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <h3 className="font-semibold">Team</h3>
                <Badge variant="outline">{teamMembers.length}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Browse team members and contacts</p>
              <Sheet open={teamSheetOpen} onOpenChange={setTeamSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    View Team
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Team Directory</SheetTitle>
                    <SheetDescription>Find and connect with your team members</SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <div className="mb-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search team members..." className="pl-10" />
                      </div>
                    </div>
                    <ScrollArea className="h-96">
                      <div className="space-y-3">
                        {teamMembers.map(member => (
                          <div
                            key={member.id}
                            className="p-3 rounded-lg border hover:bg-muted/50 cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <div className="text-2xl">{member.avatar}</div>
                                <div
                                  className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(member.status)}`}
                                ></div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <p className="font-semibold text-sm">{member.name}</p>
                                  <Badge variant="outline" className="text-xs capitalize">
                                    {member.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{member.role}</p>
                                <p className="text-xs text-muted-foreground">{member.email}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button variant="ghost" size="sm">
                                  <MessageSquare className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Mail className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                  <SheetFooter>
                    <Button variant="outline" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Invite Team Member
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </Card>

          {/* Projects Sheet */}
          <Card className="p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Folder className="h-5 w-5" />
                <h3 className="font-semibold">Projects</h3>
                <Badge variant="outline">{projects.length}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Manage projects and track progress</p>
              <Sheet open={projectSheetOpen} onOpenChange={setProjectSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    View Projects
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Project Dashboard</SheetTitle>
                    <SheetDescription>Monitor project status and team assignments</SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-1" />
                        Filter
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="h-4 w-4 mr-1" />
                        Analytics
                      </Button>
                    </div>
                    <ScrollArea className="h-96">
                      <div className="space-y-3">
                        {projects.map(project => (
                          <div
                            key={project.id}
                            className="p-4 rounded-lg border hover:bg-muted/50 cursor-pointer"
                          >
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold">{project.name}</h4>
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`w-2 h-2 rounded-full ${getProjectStatusColor(project.status)}`}
                                  ></div>
                                  <span className="text-xs text-muted-foreground capitalize">
                                    {project.status}
                                  </span>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground">{project.description}</p>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span>Progress</span>
                                  <span>{project.progress}%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                  <div
                                    className="bg-primary h-2 rounded-full"
                                    style={{ width: `${project.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  <span>{project.team.length} members</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{project.dueDate}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                  <SheetFooter>
                    <Button variant="outline" className="flex-1">
                      <Plus className="h-4 w-4 mr-2" />
                      New Project
                    </Button>
                    <Button className="flex-1">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Reports
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </Card>

          {/* Settings Sheet */}
          <Card className="p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                <h3 className="font-semibold">Settings</h3>
              </div>
              <p className="text-sm text-muted-foreground">Configure application preferences</p>
              <Sheet open={settingsSheetOpen} onOpenChange={setSettingsSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Open Settings
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Application Settings</SheetTitle>
                    <SheetDescription>
                      Customize your application experience and preferences
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <ScrollArea className="h-96">
                      <div className="space-y-6">
                        {settingsSections.map((section, sectionIndex) => (
                          <div key={section.id}>
                            {sectionIndex > 0 && <Separator className="my-4" />}
                            <div className="space-y-4">
                              <div className="flex items-center gap-2">
                                <section.icon className="h-5 w-5" />
                                <h4 className="font-semibold">{section.title}</h4>
                              </div>
                              <div className="space-y-3">
                                {section.settings.map(setting => (
                                  <div
                                    key={setting.key}
                                    className="flex items-center justify-between"
                                  >
                                    <div className="space-y-1">
                                      <p className="text-sm font-medium">{setting.label}</p>
                                    </div>
                                    <div className="w-32">
                                      {setting.type === 'toggle' ? (
                                        <Button variant="outline" size="sm">
                                          {setting.value ? 'On' : 'Off'}
                                        </Button>
                                      ) : setting.type === 'select' ? (
                                        <select
                                          value={String(setting.value)}
                                          className="w-full p-1 text-xs border rounded"
                                        >
                                          {setting.options?.map(option => (
                                            <option key={option} value={option}>
                                              {option.charAt(0).toUpperCase() + option.slice(1)}
                                            </option>
                                          ))}
                                        </select>
                                      ) : (
                                        <Input
                                          value={String(setting.value)}
                                          className="h-8 text-xs"
                                        />
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </SheetClose>
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      Save Settings
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </Card>
        </div>
      </div>

      {/* Best Practices Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Best Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h4 className="font-semibold mb-2">User Experience</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use sheets for focused tasks and detailed views</li>
              <li>• Include clear headers with titles and descriptions</li>
              <li>• Provide appropriate actions in the footer</li>
              <li>• Consider mobile responsiveness and width constraints</li>
            </ul>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold mb-2">Performance</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Implement lazy loading for sheet content when possible</li>
              <li>• Use ScrollArea for long content lists</li>
              <li>• Minimize sheet content to improve load times</li>
              <li>• Consider virtualization for very large datasets</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
