'use client';

import {
  Activity,
  AlertTriangle,
  Archive,
  BarChart3,
  Bell,
  CheckCircle,
  Code,
  Database,
  Download,
  FileText,
  Filter,
  Folder,
  Grid3X3 as Grid,
  Image,
  Info,
  List,
  Mail,
  MessageSquare,
  MoreHorizontal,
  Music,
  Phone,
  Plus,
  Search,
  Send,
  Settings,
  Share,
  Upload,
  Users,
  Video,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { ScrollArea, ScrollBar } from '.';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card } from '../Card';

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: string;
  avatar: string;
  type: 'message' | 'system' | 'notification';
}

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
}

interface FileItem {
  id: string;
  name: string;
  type: string;
  size: string;
  modified: string;
  folder?: boolean;
}

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  service: string;
  message: string;
  details?: string;
}

interface ContactItem {
  id: string;
  name: string;
  role: string;
  company: string;
  email: string;
  phone: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
}

export default function ScrollAreaDemo() {
  const [selectedNotification, setSelectedNotification] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [logFilter, setLogFilter] = useState<string>('all');
  const [contactSearch, setContactSearch] = useState('');
  const [showSystemLogs, setShowSystemLogs] = useState(true);

  const chatMessages: ChatMessage[] = [
    {
      id: '1',
      user: 'Alice Johnson',
      message: 'Hey team! Just pushed the latest changes to the main branch.',
      timestamp: '10:30 AM',
      avatar: '👩‍💼',
      type: 'message',
    },
    {
      id: '2',
      user: 'Bob Smith',
      message: "Great work! I'll review the PR shortly.",
      timestamp: '10:32 AM',
      avatar: '👨‍💻',
      type: 'message',
    },
    {
      id: '3',
      user: 'System',
      message: 'Build #1245 completed successfully',
      timestamp: '10:35 AM',
      avatar: '🤖',
      type: 'system',
    },
    {
      id: '4',
      user: 'Carol Davis',
      message: 'The new dashboard looks amazing! 🎉',
      timestamp: '10:40 AM',
      avatar: '👩‍🎨',
      type: 'message',
    },
    {
      id: '5',
      user: 'David Wilson',
      message: 'Can we schedule a quick sync for tomorrow?',
      timestamp: '10:45 AM',
      avatar: '👨‍💼',
      type: 'message',
    },
    {
      id: '6',
      user: 'System',
      message: 'Deployment to staging environment initiated',
      timestamp: '10:50 AM',
      avatar: '🤖',
      type: 'system',
    },
    {
      id: '7',
      user: 'Eve Brown',
      message: "I've updated the documentation with the new API endpoints.",
      timestamp: '11:00 AM',
      avatar: '👩‍🔬',
      type: 'message',
    },
    {
      id: '8',
      user: 'Frank Miller',
      message: 'Security scan completed - no vulnerabilities found!',
      timestamp: '11:15 AM',
      avatar: '👨‍🔒',
      type: 'message',
    },
    {
      id: '9',
      user: 'Grace Lee',
      message: 'Marketing team wants to preview the new features.',
      timestamp: '11:30 AM',
      avatar: '👩‍💻',
      type: 'message',
    },
    {
      id: '10',
      user: 'System',
      message: 'Database backup completed successfully',
      timestamp: '11:45 AM',
      avatar: '🤖',
      type: 'system',
    },
    {
      id: '11',
      user: 'Henry Taylor',
      message: 'Performance improvements are looking great! 🚀',
      timestamp: '12:00 PM',
      avatar: '👨‍🚀',
      type: 'message',
    },
    {
      id: '12',
      user: 'Ivy Chen',
      message: 'QA testing for release v2.1.0 is complete.',
      timestamp: '12:15 PM',
      avatar: '👩‍🔬',
      type: 'message',
    },
  ];

  const notifications: NotificationItem[] = [
    {
      id: '1',
      title: 'Build Completed',
      description: 'Production build #1245 finished successfully',
      timestamp: '2 min ago',
      type: 'success',
      read: false,
    },
    {
      id: '2',
      title: 'Security Alert',
      description: 'Unusual login attempt detected from new location',
      timestamp: '5 min ago',
      type: 'warning',
      read: false,
    },
    {
      id: '3',
      title: 'System Update',
      description: 'Scheduled maintenance will begin at 2:00 AM UTC',
      timestamp: '10 min ago',
      type: 'info',
      read: true,
    },
    {
      id: '4',
      title: 'Error Detected',
      description: 'Payment processing service experiencing issues',
      timestamp: '15 min ago',
      type: 'error',
      read: false,
    },
    {
      id: '5',
      title: 'New Team Member',
      description: 'Sarah Johnson has joined the development team',
      timestamp: '1 hour ago',
      type: 'info',
      read: true,
    },
    {
      id: '6',
      title: 'Deployment Ready',
      description: 'Version 2.1.0 is ready for production deployment',
      timestamp: '2 hours ago',
      type: 'success',
      read: true,
    },
    {
      id: '7',
      title: 'Storage Warning',
      description: 'Database storage is at 85% capacity',
      timestamp: '3 hours ago',
      type: 'warning',
      read: false,
    },
    {
      id: '8',
      title: 'Backup Completed',
      description: 'Daily backup process finished without errors',
      timestamp: '4 hours ago',
      type: 'success',
      read: true,
    },
    {
      id: '9',
      title: 'API Rate Limit',
      description: 'Third-party service API usage approaching limit',
      timestamp: '5 hours ago',
      type: 'warning',
      read: true,
    },
    {
      id: '10',
      title: 'Performance Report',
      description: 'Weekly performance metrics are now available',
      timestamp: '6 hours ago',
      type: 'info',
      read: true,
    },
  ];

  const fileItems: FileItem[] = [
    {
      id: '1',
      name: 'project-docs',
      type: 'folder',
      size: '—',
      modified: '2 hours ago',
      folder: true,
    },
    { id: '2', name: 'src', type: 'folder', size: '—', modified: '1 hour ago', folder: true },
    { id: '3', name: 'package.json', type: 'json', size: '2.4 KB', modified: '30 min ago' },
    { id: '4', name: 'README.md', type: 'markdown', size: '5.2 KB', modified: '45 min ago' },
    { id: '5', name: 'tsconfig.json', type: 'json', size: '1.8 KB', modified: '1 hour ago' },
    { id: '6', name: 'next.config.js', type: 'javascript', size: '892 B', modified: '2 hours ago' },
    {
      id: '7',
      name: 'tailwind.config.js',
      type: 'javascript',
      size: '1.2 KB',
      modified: '3 hours ago',
    },
    { id: '8', name: 'components.json', type: 'json', size: '456 B', modified: '4 hours ago' },
    { id: '9', name: '.env.local', type: 'env', size: '312 B', modified: '1 day ago' },
    { id: '10', name: '.gitignore', type: 'git', size: '789 B', modified: '2 days ago' },
    { id: '11', name: 'yarn.lock', type: 'lock', size: '234 KB', modified: '3 days ago' },
    { id: '12', name: 'docker-compose.yml', type: 'yml', size: '1.5 KB', modified: '1 week ago' },
    { id: '13', name: 'Dockerfile', type: 'docker', size: '678 B', modified: '1 week ago' },
    { id: '14', name: 'LICENSE', type: 'license', size: '1.1 KB', modified: '2 weeks ago' },
    { id: '15', name: 'CHANGELOG.md', type: 'markdown', size: '8.7 KB', modified: '3 days ago' },
  ];

  const logEntries: LogEntry[] = [
    {
      id: '1',
      timestamp: '12:30:45',
      level: 'info',
      service: 'API',
      message: 'User authentication successful',
      details: 'User ID: 12345, IP: 192.168.1.100',
    },
    {
      id: '2',
      timestamp: '12:30:50',
      level: 'warn',
      service: 'DB',
      message: 'Connection pool approaching limit',
      details: 'Current: 18/20 connections',
    },
    {
      id: '3',
      timestamp: '12:31:02',
      level: 'error',
      service: 'Payment',
      message: 'Payment processing failed',
      details: 'Transaction ID: TXN789, Error: Invalid card number',
    },
    {
      id: '4',
      timestamp: '12:31:15',
      level: 'info',
      service: 'Cache',
      message: 'Cache invalidation completed',
      details: 'Affected keys: user_sessions, product_catalog',
    },
    {
      id: '5',
      timestamp: '12:31:28',
      level: 'debug',
      service: 'Search',
      message: 'Search query executed',
      details: 'Query: "enterprise software", Results: 245, Time: 42ms',
    },
    {
      id: '6',
      timestamp: '12:31:35',
      level: 'error',
      service: 'Email',
      message: 'SMTP server connection timeout',
      details: 'Server: smtp.company.com:587, Timeout: 30s',
    },
    {
      id: '7',
      timestamp: '12:31:42',
      level: 'info',
      service: 'Backup',
      message: 'Incremental backup started',
      details: 'Target: s3://backup-bucket/daily/',
    },
    {
      id: '8',
      timestamp: '12:31:58',
      level: 'warn',
      service: 'Monitor',
      message: 'High CPU usage detected',
      details: 'Server: web-01, CPU: 89%, Threshold: 80%',
    },
    {
      id: '9',
      timestamp: '12:32:10',
      level: 'info',
      service: 'API',
      message: 'Rate limit reset',
      details: 'Client: api_client_456, Limit: 1000/hour',
    },
    {
      id: '10',
      timestamp: '12:32:25',
      level: 'error',
      service: 'Storage',
      message: 'Disk space critical',
      details: 'Partition: /var/log, Used: 95%, Available: 2.1GB',
    },
  ];

  const contacts: ContactItem[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      role: 'Product Manager',
      company: 'TechCorp',
      email: 'alice@techcorp.com',
      phone: '+1 555-0101',
      avatar: '👩‍💼',
      status: 'online',
    },
    {
      id: '2',
      name: 'Bob Smith',
      role: 'Senior Developer',
      company: 'DevStudio',
      email: 'bob@devstudio.com',
      phone: '+1 555-0102',
      avatar: '👨‍💻',
      status: 'away',
    },
    {
      id: '3',
      name: 'Carol Davis',
      role: 'UX Designer',
      company: 'DesignLab',
      email: 'carol@designlab.com',
      phone: '+1 555-0103',
      avatar: '👩‍🎨',
      status: 'online',
    },
    {
      id: '4',
      name: 'David Wilson',
      role: 'DevOps Engineer',
      company: 'CloudOps',
      email: 'david@cloudops.com',
      phone: '+1 555-0104',
      avatar: '👨‍💼',
      status: 'offline',
    },
    {
      id: '5',
      name: 'Eve Brown',
      role: 'Technical Writer',
      company: 'DocuTech',
      email: 'eve@docutech.com',
      phone: '+1 555-0105',
      avatar: '👩‍🔬',
      status: 'online',
    },
    {
      id: '6',
      name: 'Frank Miller',
      role: 'Security Specialist',
      company: 'SecureIT',
      email: 'frank@secureit.com',
      phone: '+1 555-0106',
      avatar: '👨‍🔒',
      status: 'away',
    },
    {
      id: '7',
      name: 'Grace Lee',
      role: 'Marketing Director',
      company: 'MarketPro',
      email: 'grace@marketpro.com',
      phone: '+1 555-0107',
      avatar: '👩‍💻',
      status: 'online',
    },
    {
      id: '8',
      name: 'Henry Taylor',
      role: 'Performance Engineer',
      company: 'SpeedTech',
      email: 'henry@speedtech.com',
      phone: '+1 555-0108',
      avatar: '👨‍🚀',
      status: 'offline',
    },
    {
      id: '9',
      name: 'Ivy Chen',
      role: 'QA Manager',
      company: 'QualityFirst',
      email: 'ivy@qualityfirst.com',
      phone: '+1 555-0109',
      avatar: '👩‍🔬',
      status: 'online',
    },
    {
      id: '10',
      name: 'Jack Robinson',
      role: 'Sales Director',
      company: 'SalesForce',
      email: 'jack@salesforce.com',
      phone: '+1 555-0110',
      avatar: '👨‍💼',
      status: 'away',
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return CheckCircle;
      case 'warning':
        return AlertTriangle;
      case 'error':
        return X;
      case 'info':
        return Info;
      default:
        return Info;
    }
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'error':
        return 'text-red-500';
      case 'warn':
        return 'text-yellow-500';
      case 'info':
        return 'text-blue-500';
      case 'debug':
        return 'text-gray-500';
      default:
        return 'text-gray-500';
    }
  };

  const getFileIcon = (type: string, folder?: boolean) => {
    if (folder) return Folder;
    switch (type) {
      case 'javascript':
      case 'typescript':
      case 'json':
        return Code;
      case 'markdown':
        return FileText;
      case 'image':
        return Image;
      case 'video':
        return Video;
      case 'audio':
        return Music;
      case 'archive':
        return Archive;
      case 'database':
        return Database;
      default:
        return FileText;
    }
  };

  const filteredLogs = logEntries.filter(log => logFilter === 'all' || log.level === logFilter);

  const filteredContacts = contacts.filter(
    contact =>
      contact.name.toLowerCase().includes(contactSearch.toLowerCase()) ||
      contact.company.toLowerCase().includes(contactSearch.toLowerCase()) ||
      contact.role.toLowerCase().includes(contactSearch.toLowerCase())
  );

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">ScrollArea Component</h1>
        <p className="text-muted-foreground text-lg">
          Custom scrollable areas with styled scrollbars for enterprise applications
        </p>
      </div>

      {/* Basic Examples Section */}
      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">Basic Examples</h2>
          <p className="text-muted-foreground">
            Simple scrollable content areas with custom styling
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Vertical Scrolling</h3>
            <Card className="p-0 overflow-hidden">
              <div className="p-4 border-b bg-muted/20">
                <h4 className="font-semibold">Content List</h4>
              </div>
              <ScrollArea className="h-64 p-4">
                <div className="space-y-2">
                  {Array.from({ length: 20 }, (_, i) => (
                    <div key={i} className="p-3 bg-muted/30 rounded border">
                      <p className="font-medium">List Item {i + 1}</p>
                      <p className="text-sm text-muted-foreground">
                        This is a sample content item that demonstrates vertical scrolling behavior.
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Horizontal Scrolling</h3>
            <Card className="p-0 overflow-hidden">
              <div className="p-4 border-b bg-muted/20">
                <h4 className="font-semibold">Wide Content</h4>
              </div>
              <ScrollArea className="h-64">
                <div className="p-4 min-w-[800px]">
                  <div className="grid grid-cols-6 gap-4">
                    {Array.from({ length: 12 }, (_, i) => (
                      <Card key={i} className="p-4 min-w-[120px]">
                        <div className="text-center">
                          <BarChart3 className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="font-medium text-sm">Card {i + 1}</p>
                          <p className="text-xs text-muted-foreground">Sample data</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </Card>
          </div>
        </div>
      </div>

      {/* Advanced Examples Section */}
      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">Advanced Examples</h2>
          <p className="text-muted-foreground">
            Enterprise-level scrollable interfaces for real-world applications
          </p>
        </div>

        {/* Chat Interface */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Team Chat Interface</h3>
          <Card className="overflow-hidden">
            <div className="p-4 border-b bg-muted/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                <h4 className="font-semibold"># general</h4>
                <Badge variant="secondary">24 members</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <ScrollArea className="h-96 p-4">
              <div className="space-y-4">
                {chatMessages.map(msg => (
                  <div key={msg.id} className="flex gap-3">
                    <div className="text-2xl">{msg.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">{msg.user}</span>
                        <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                        {msg.type === 'system' && (
                          <Badge variant="outline" className="text-xs">
                            System
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm leading-relaxed">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t bg-muted/10">
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-background border rounded-lg px-3 py-2">
                  <p className="text-sm text-muted-foreground">Type a message...</p>
                </div>
                <Button size="sm">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Notification Center */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Notification Center</h3>
          <Card className="overflow-hidden">
            <div className="p-4 border-b bg-muted/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <h4 className="font-semibold">Notifications</h4>
                <Badge variant="destructive">{notifications.filter(n => !n.read).length}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Mark All Read
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <ScrollArea className="h-80">
              <div className="divide-y">
                {notifications.map(notification => {
                  const IconComponent = getNotificationIcon(notification.type);
                  return (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors ${
                        !notification.read ? 'bg-accent/20' : ''
                      } ${selectedNotification === notification.id ? 'bg-accent/40' : ''}`}
                      onClick={() => setSelectedNotification(notification.id)}
                    >
                      <div className="flex gap-3">
                        <div
                          className={`mt-1 ${
                            notification.type === 'success'
                              ? 'text-green-500'
                              : notification.type === 'warning'
                                ? 'text-yellow-500'
                                : notification.type === 'error'
                                  ? 'text-red-500'
                                  : 'text-blue-500'
                          }`}
                        >
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-semibold text-sm">{notification.title}</p>
                            <span className="text-xs text-muted-foreground">
                              {notification.timestamp}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {notification.description}
                          </p>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </Card>
        </div>

        {/* File Browser */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">File Browser</h3>
          <Card className="overflow-hidden">
            <div className="p-4 border-b bg-muted/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Folder className="h-5 w-5" />
                <h4 className="font-semibold">Project Files</h4>
                <Badge variant="outline">{fileItems.length} items</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New
                </Button>
                <Button variant="ghost" size="sm">
                  <Grid className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <ScrollArea className="h-80">
              <div className="p-2">
                <div className="space-y-1">
                  {fileItems.map(file => {
                    const IconComponent = getFileIcon(file.type, file.folder);
                    return (
                      <div
                        key={file.id}
                        className={`flex items-center gap-3 p-2 rounded hover:bg-muted cursor-pointer ${
                          selectedFile === file.id ? 'bg-accent' : ''
                        }`}
                        onClick={() => setSelectedFile(file.id)}
                      >
                        <IconComponent
                          className={`h-4 w-4 ${
                            file.folder ? 'text-blue-500' : 'text-muted-foreground'
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{file.name}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{file.size}</span>
                            <span>{file.modified}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollArea>
          </Card>
        </div>

        {/* System Logs */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">System Logs</h3>
          <Card className="overflow-hidden">
            <div className="p-4 border-b bg-muted/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  <h4 className="font-semibold">Live Logs</h4>
                  <Badge variant="outline" className="text-green-500">
                    ● Active
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={showSystemLogs ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setShowSystemLogs(!showSystemLogs)}
                  >
                    Auto-scroll
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={logFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setLogFilter('all')}
                >
                  All
                </Button>
                <Button
                  variant={logFilter === 'error' ? 'destructive' : 'outline'}
                  size="sm"
                  onClick={() => setLogFilter('error')}
                >
                  Errors
                </Button>
                <Button
                  variant={logFilter === 'warn' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setLogFilter('warn')}
                >
                  Warnings
                </Button>
                <Button
                  variant={logFilter === 'info' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setLogFilter('info')}
                >
                  Info
                </Button>
                <Button
                  variant={logFilter === 'debug' ? 'outline' : 'outline'}
                  size="sm"
                  onClick={() => setLogFilter('debug')}
                >
                  Debug
                </Button>
              </div>
            </div>
            <ScrollArea className="h-80 font-mono">
              <div className="p-4 space-y-1">
                {filteredLogs.map(log => (
                  <div
                    key={log.id}
                    className="flex items-start gap-3 py-1 hover:bg-muted/30 rounded px-2"
                  >
                    <span className="text-xs text-muted-foreground w-20 flex-shrink-0">
                      {log.timestamp}
                    </span>
                    <span
                      className={`text-xs font-bold w-12 flex-shrink-0 ${getLogLevelColor(log.level)}`}
                    >
                      {log.level.toUpperCase()}
                    </span>
                    <span className="text-xs text-muted-foreground w-16 flex-shrink-0">
                      {log.service}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs">{log.message}</p>
                      {log.details && (
                        <p className="text-xs text-muted-foreground mt-1">{log.details}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>

        {/* Contact Directory */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Contact Directory</h3>
          <Card className="overflow-hidden">
            <div className="p-4 border-b bg-muted/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <h4 className="font-semibold">Team Directory</h4>
                  <Badge variant="outline">{filteredContacts.length} contacts</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Contact
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={contactSearch}
                  onChange={e => setContactSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg bg-background"
                />
              </div>
            </div>
            <ScrollArea className="h-80">
              <div className="p-2 space-y-1">
                {filteredContacts.map(contact => (
                  <div key={contact.id} className="p-3 hover:bg-muted/50 rounded cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="text-2xl">{contact.avatar}</div>
                        <div
                          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                            contact.status === 'online'
                              ? 'bg-green-500'
                              : contact.status === 'away'
                                ? 'bg-yellow-500'
                                : 'bg-gray-400'
                          }`}
                        ></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-sm">{contact.name}</p>
                          <Badge variant="outline" className="text-xs capitalize">
                            {contact.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{contact.role}</p>
                        <p className="text-xs text-muted-foreground">{contact.company}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{contact.email}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{contact.phone}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>

      {/* Best Practices Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Best Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h4 className="font-semibold mb-2">Performance Optimization</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use virtualization for large datasets (1000+ items)</li>
              <li>• Implement lazy loading for content-heavy areas</li>
              <li>• Set appropriate max-height to prevent layout shifts</li>
              <li>• Consider intersection observers for infinite scroll</li>
            </ul>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold mb-2">User Experience</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Always provide visual feedback for scroll position</li>
              <li>• Use consistent scrollbar styling across the app</li>
              <li>• Implement keyboard navigation for accessibility</li>
              <li>• Consider scroll-to-top buttons for long content</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
