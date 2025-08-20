'use client';

import {
  AlertTriangle,
  BarChart,
  Bell,
  Bookmark,
  Briefcase,
  Bug,
  Calendar,
  CheckCircle,
  Clipboard,
  Clock,
  Cloud,
  Code,
  Copy,
  Database,
  Download,
  Eye,
  EyeOff,
  File,
  Folder,
  GitBranch,
  Github,
  Globe,
  Grid,
  Heart,
  HelpCircle,
  Home,
  Info,
  Key,
  Languages,
  Layout,
  List,
  Lock,
  Mail,
  Maximize,
  MessageSquare,
  Minimize,
  Monitor,
  Moon,
  Palette,
  Phone,
  Plus,
  Printer,
  Redo,
  Replace,
  Save,
  Scissors,
  Search,
  Settings,
  Share,
  Shield,
  SortAsc,
  Star,
  Sun,
  Tag,
  Target,
  Terminal,
  Trash,
  TrendingUp,
  Undo,
  Upload,
  User,
  Users,
  Wrench,
  XCircle,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '.';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card } from '../Card';

export default function MenubarDemo() {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [showHidden, setShowHidden] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [wordWrap, setWordWrap] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [recentActions, setRecentActions] = useState<string[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const addRecentAction = (action: string) => {
    setRecentActions(prev => [action, ...prev.slice(0, 4)]);
  };

  const handleFileAction = (action: string) => {
    addRecentAction(`File: ${action}`);
  };

  const handleEditAction = (action: string) => {
    addRecentAction(`Edit: ${action}`);
  };

  const handleViewAction = (action: string) => {
    addRecentAction(`View: ${action}`);
  };

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Menubar Component</h1>
        <p className="text-muted-foreground">
          Professional application menu bars with nested menus, shortcuts, and interactive states
        </p>
      </div>

      {/* Recent Actions Display */}
      {recentActions.length > 0 && (
        <Card className="p-4 bg-muted/50">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">Recent Actions:</span>
            <div className="flex gap-2">
              {recentActions.map((action, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {action}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Basic Application Menubar */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Application Menubar</h3>
          <p className="text-sm text-muted-foreground">
            Complete desktop application menu with File, Edit, View, and Help menus
          </p>

          <div className="border rounded-lg p-4 bg-background">
            <Menubar className="border-0 bg-transparent">
              <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onClick={() => handleFileAction('New File')}>
                    <File className="mr-2 h-4 w-4" />
                    New File <MenubarShortcut>⌘N</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem onClick={() => handleFileAction('New Folder')}>
                    <Folder className="mr-2 h-4 w-4" />
                    New Folder <MenubarShortcut>⌘⇧N</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <Plus className="mr-2 h-4 w-4" />
                      Recent Files
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={() => handleFileAction('project.tsx')}>
                        <Code className="mr-2 h-4 w-4" />
                        project.tsx
                      </MenubarItem>
                      <MenubarItem onClick={() => handleFileAction('README.md')}>
                        <File className="mr-2 h-4 w-4" />
                        README.md
                      </MenubarItem>
                      <MenubarItem onClick={() => handleFileAction('package.json')}>
                        <Settings className="mr-2 h-4 w-4" />
                        package.json
                      </MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem>
                        <Trash className="mr-2 h-4 w-4" />
                        Clear Recent
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSeparator />
                  <MenubarItem onClick={() => handleFileAction('Save')}>
                    <Save className="mr-2 h-4 w-4" />
                    Save <MenubarShortcut>⌘S</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem onClick={() => handleFileAction('Save As')}>
                    <Save className="mr-2 h-4 w-4" />
                    Save As... <MenubarShortcut>⌘⇧S</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem onClick={() => handleFileAction('Import')}>
                    <Upload className="mr-2 h-4 w-4" />
                    Import
                  </MenubarItem>
                  <MenubarItem onClick={() => handleFileAction('Export')}>
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem onClick={() => handleFileAction('Print')}>
                    <Printer className="mr-2 h-4 w-4" />
                    Print <MenubarShortcut>⌘P</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger>Edit</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onClick={() => handleEditAction('Undo')}>
                    <Undo className="mr-2 h-4 w-4" />
                    Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem onClick={() => handleEditAction('Redo')}>
                    <Redo className="mr-2 h-4 w-4" />
                    Redo <MenubarShortcut>⌘⇧Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem onClick={() => handleEditAction('Cut')}>
                    <Scissors className="mr-2 h-4 w-4" />
                    Cut <MenubarShortcut>⌘X</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem onClick={() => handleEditAction('Copy')}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy <MenubarShortcut>⌘C</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem onClick={() => handleEditAction('Paste')}>
                    <Clipboard className="mr-2 h-4 w-4" />
                    Paste <MenubarShortcut>⌘V</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem onClick={() => handleEditAction('Find')}>
                    <Search className="mr-2 h-4 w-4" />
                    Find <MenubarShortcut>⌘F</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem onClick={() => handleEditAction('Replace')}>
                    <Replace className="mr-2 h-4 w-4" />
                    Replace <MenubarShortcut>⌘H</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <Code className="mr-2 h-4 w-4" />
                      Code Actions
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem>
                        <Wrench className="mr-2 h-4 w-4" />
                        Format Document
                      </MenubarItem>
                      <MenubarItem>
                        <Bug className="mr-2 h-4 w-4" />
                        Quick Fix
                      </MenubarItem>
                      <MenubarItem>
                        <GitBranch className="mr-2 h-4 w-4" />
                        Refactor
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger>View</MenubarTrigger>
                <MenubarContent>
                  <MenubarLabel>Appearance</MenubarLabel>
                  <MenubarRadioGroup value={currentTheme} onValueChange={setCurrentTheme}>
                    <MenubarRadioItem value="light" onClick={() => handleViewAction('Light Theme')}>
                      <Sun className="mr-2 h-4 w-4" />
                      Light Theme
                    </MenubarRadioItem>
                    <MenubarRadioItem value="dark" onClick={() => handleViewAction('Dark Theme')}>
                      <Moon className="mr-2 h-4 w-4" />
                      Dark Theme
                    </MenubarRadioItem>
                    <MenubarRadioItem
                      value="system"
                      onClick={() => handleViewAction('System Theme')}
                    >
                      <Monitor className="mr-2 h-4 w-4" />
                      System Theme
                    </MenubarRadioItem>
                  </MenubarRadioGroup>
                  <MenubarSeparator />
                  <MenubarLabel>Layout</MenubarLabel>
                  <MenubarRadioGroup value={viewMode} onValueChange={setViewMode}>
                    <MenubarRadioItem value="grid" onClick={() => handleViewAction('Grid View')}>
                      <Grid className="mr-2 h-4 w-4" />
                      Grid View
                    </MenubarRadioItem>
                    <MenubarRadioItem value="list" onClick={() => handleViewAction('List View')}>
                      <List className="mr-2 h-4 w-4" />
                      List View
                    </MenubarRadioItem>
                  </MenubarRadioGroup>
                  <MenubarSeparator />
                  <MenubarCheckboxItem
                    checked={isFullscreen}
                    onCheckedChange={setIsFullscreen}
                    onClick={() => handleViewAction('Toggle Fullscreen')}
                  >
                    <Maximize className="mr-2 h-4 w-4" />
                    Fullscreen
                  </MenubarCheckboxItem>
                  <MenubarCheckboxItem
                    checked={showHidden}
                    onCheckedChange={setShowHidden}
                    onClick={() => handleViewAction('Toggle Hidden Files')}
                  >
                    <EyeOff className="mr-2 h-4 w-4" />
                    Show Hidden Files
                  </MenubarCheckboxItem>
                  <MenubarSeparator />
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <SortAsc className="mr-2 h-4 w-4" />
                      Sort By
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarRadioGroup value={sortBy} onValueChange={setSortBy}>
                        <MenubarRadioItem value="name">Name</MenubarRadioItem>
                        <MenubarRadioItem value="date">Date Modified</MenubarRadioItem>
                        <MenubarRadioItem value="size">File Size</MenubarRadioItem>
                        <MenubarRadioItem value="type">File Type</MenubarRadioItem>
                      </MenubarRadioGroup>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger>Tools</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    <Terminal className="mr-2 h-4 w-4" />
                    Terminal <MenubarShortcut>⌘T</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>
                    <Github className="mr-2 h-4 w-4" />
                    Git Integration
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <Languages className="mr-2 h-4 w-4" />
                      Language
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarRadioGroup
                        value={selectedLanguage}
                        onValueChange={setSelectedLanguage}
                      >
                        <MenubarRadioItem value="javascript">JavaScript</MenubarRadioItem>
                        <MenubarRadioItem value="typescript">TypeScript</MenubarRadioItem>
                        <MenubarRadioItem value="python">Python</MenubarRadioItem>
                        <MenubarRadioItem value="rust">Rust</MenubarRadioItem>
                        <MenubarRadioItem value="go">Go</MenubarRadioItem>
                      </MenubarRadioGroup>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSeparator />
                  <MenubarCheckboxItem
                    checked={showLineNumbers}
                    onCheckedChange={setShowLineNumbers}
                  >
                    Line Numbers
                  </MenubarCheckboxItem>
                  <MenubarCheckboxItem checked={wordWrap} onCheckedChange={setWordWrap}>
                    Word Wrap
                  </MenubarCheckboxItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Preferences <MenubarShortcut>⌘,</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger>Help</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Documentation
                  </MenubarItem>
                  <MenubarItem>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Community Forum
                  </MenubarItem>
                  <MenubarItem>
                    <Github className="mr-2 h-4 w-4" />
                    GitHub Repository
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <Bug className="mr-2 h-4 w-4" />
                    Report Bug
                  </MenubarItem>
                  <MenubarItem>
                    <Star className="mr-2 h-4 w-4" />
                    Request Feature
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <Info className="mr-2 h-4 w-4" />
                    About
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
            <div>
              Theme: <Badge variant="outline">{currentTheme}</Badge>
            </div>
            <div>
              View: <Badge variant="outline">{viewMode}</Badge>
            </div>
            <div>
              Sort: <Badge variant="outline">{sortBy}</Badge>
            </div>
            <div>
              Language: <Badge variant="outline">{selectedLanguage}</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Enterprise Dashboard Menubar */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Enterprise Dashboard Menubar</h3>
          <p className="text-sm text-muted-foreground">
            Business application menu with analytics, user management, and system controls
          </p>

          <div className="border rounded-lg p-4 bg-background">
            <Menubar className="border-0 bg-transparent">
              <MenubarMenu>
                <MenubarTrigger>
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    <BarChart className="mr-2 h-4 w-4" />
                    Analytics Overview
                  </MenubarItem>
                  <MenubarItem>
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Performance Metrics
                  </MenubarItem>
                  <MenubarItem>
                    <Target className="mr-2 h-4 w-4" />
                    KPI Dashboard
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <Calendar className="mr-2 h-4 w-4" />
                      Time Range
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem>Last 24 Hours</MenubarItem>
                      <MenubarItem>Last 7 Days</MenubarItem>
                      <MenubarItem>Last 30 Days</MenubarItem>
                      <MenubarItem>Last Quarter</MenubarItem>
                      <MenubarItem>Custom Range...</MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSeparator />
                  <MenubarItem>
                    <Download className="mr-2 h-4 w-4" />
                    Export Report
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger>
                  <Users className="mr-2 h-4 w-4" />
                  Users
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    <User className="mr-2 h-4 w-4" />
                    All Users
                  </MenubarItem>
                  <MenubarItem>
                    <Users className="mr-2 h-4 w-4" />
                    Teams
                  </MenubarItem>
                  <MenubarItem>
                    <Shield className="mr-2 h-4 w-4" />
                    Roles & Permissions
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <Plus className="mr-2 h-4 w-4" />
                      Add New
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem>
                        <User className="mr-2 h-4 w-4" />
                        New User
                      </MenubarItem>
                      <MenubarItem>
                        <Users className="mr-2 h-4 w-4" />
                        New Team
                      </MenubarItem>
                      <MenubarItem>
                        <Key className="mr-2 h-4 w-4" />
                        New Role
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSeparator />
                  <MenubarItem>
                    <Mail className="mr-2 h-4 w-4" />
                    Invite Users
                  </MenubarItem>
                  <MenubarItem>
                    <Upload className="mr-2 h-4 w-4" />
                    Import from CSV
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger>
                  <Database className="mr-2 h-4 w-4" />
                  Data
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    <Database className="mr-2 h-4 w-4" />
                    Database Status
                  </MenubarItem>
                  <MenubarItem>
                    <Cloud className="mr-2 h-4 w-4" />
                    Cloud Storage
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <Download className="mr-2 h-4 w-4" />
                      Backup
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem>Create Backup</MenubarItem>
                      <MenubarItem>Scheduled Backups</MenubarItem>
                      <MenubarItem>Restore from Backup</MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem>Backup Settings</MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <Share className="mr-2 h-4 w-4" />
                      Import/Export
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem>Import Data</MenubarItem>
                      <MenubarItem>Export Data</MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem>Data Templates</MenubarItem>
                      <MenubarItem>Migration Tools</MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSeparator />
                  <MenubarItem>
                    <Search className="mr-2 h-4 w-4" />
                    Data Query Tool
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger>
                  <Settings className="mr-2 h-4 w-4" />
                  System
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    <Settings className="mr-2 h-4 w-4" />
                    General Settings
                  </MenubarItem>
                  <MenubarItem>
                    <Shield className="mr-2 h-4 w-4" />
                    Security Settings
                  </MenubarItem>
                  <MenubarItem>
                    <Bell className="mr-2 h-4 w-4" />
                    Notification Settings
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarCheckboxItem checked={autoSave} onCheckedChange={setAutoSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Auto-save
                  </MenubarCheckboxItem>
                  <MenubarCheckboxItem checked={notifications} onCheckedChange={setNotifications}>
                    <Bell className="mr-2 h-4 w-4" />
                    Push Notifications
                  </MenubarCheckboxItem>
                  <MenubarSeparator />
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <Globe className="mr-2 h-4 w-4" />
                      Integration
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem>
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </MenubarItem>
                      <MenubarItem>
                        <Mail className="mr-2 h-4 w-4" />
                        Email Service
                      </MenubarItem>
                      <MenubarItem>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Slack
                      </MenubarItem>
                      <MenubarItem>
                        <Phone className="mr-2 h-4 w-4" />
                        SMS Gateway
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSeparator />
                  <MenubarItem>
                    <Lock className="mr-2 h-4 w-4" />
                    API Keys
                  </MenubarItem>
                  <MenubarItem>
                    <Zap className="mr-2 h-4 w-4" />
                    Webhooks
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </Card>

      {/* Creative Menu Patterns */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Palette className="h-5 w-5 text-purple-500" />
            <div>
              <h3 className="text-xl font-semibold">Creative Menu Patterns</h3>
              <p className="text-sm text-muted-foreground">
                Specialized menus for different application types
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Design Tools Menu</h4>
              <div className="border rounded-lg p-4 bg-background">
                <Menubar className="border-0 bg-transparent">
                  <MenubarMenu>
                    <MenubarTrigger>
                      <Palette className="mr-2 h-4 w-4" />
                      Colors
                    </MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>
                        <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                        Primary Red
                      </MenubarItem>
                      <MenubarItem>
                        <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                        Primary Blue
                      </MenubarItem>
                      <MenubarItem>
                        <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                        Success Green
                      </MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem>
                        <Plus className="mr-2 h-4 w-4" />
                        Custom Color...
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>

                  <MenubarMenu>
                    <MenubarTrigger>
                      <Layout className="mr-2 h-4 w-4" />
                      Layout
                    </MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>
                        <Grid className="mr-2 h-4 w-4" />
                        Grid Layout
                      </MenubarItem>
                      <MenubarItem>
                        <List className="mr-2 h-4 w-4" />
                        Flex Layout
                      </MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem>
                        <Maximize className="mr-2 h-4 w-4" />
                        Full Width
                      </MenubarItem>
                      <MenubarItem>
                        <Minimize className="mr-2 h-4 w-4" />
                        Centered
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Project Management Menu</h4>
              <div className="border rounded-lg p-4 bg-background">
                <Menubar className="border-0 bg-transparent">
                  <MenubarMenu>
                    <MenubarTrigger>
                      <Briefcase className="mr-2 h-4 w-4" />
                      Projects
                    </MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        Active Projects
                      </MenubarItem>
                      <MenubarItem>
                        <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                        Pending Review
                      </MenubarItem>
                      <MenubarItem>
                        <XCircle className="mr-2 h-4 w-4 text-red-500" />
                        Blocked
                      </MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem>
                        <Plus className="mr-2 h-4 w-4" />
                        New Project
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>

                  <MenubarMenu>
                    <MenubarTrigger>
                      <Tag className="mr-2 h-4 w-4" />
                      Tags
                    </MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>
                        <Star className="mr-2 h-4 w-4 text-yellow-500" />
                        High Priority
                      </MenubarItem>
                      <MenubarItem>
                        <AlertTriangle className="mr-2 h-4 w-4 text-orange-500" />
                        Urgent
                      </MenubarItem>
                      <MenubarItem>
                        <Heart className="mr-2 h-4 w-4 text-pink-500" />
                        Favorite
                      </MenubarItem>
                      <MenubarItem>
                        <Bookmark className="mr-2 h-4 w-4 text-blue-500" />
                        Bookmarked
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Menu State Display */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Current Menu States</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium">Preferences</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Auto-save:</span>
                  <Badge variant={autoSave ? 'default' : 'secondary'}>
                    {autoSave ? 'Enabled' : 'Disabled'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Notifications:</span>
                  <Badge variant={notifications ? 'default' : 'secondary'}>
                    {notifications ? 'On' : 'Off'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Line Numbers:</span>
                  <Badge variant={showLineNumbers ? 'default' : 'secondary'}>
                    {showLineNumbers ? 'Visible' : 'Hidden'}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Display Options</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Hidden Files:</span>
                  <Badge variant={showHidden ? 'default' : 'secondary'}>
                    {showHidden ? 'Shown' : 'Hidden'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Word Wrap:</span>
                  <Badge variant={wordWrap ? 'default' : 'secondary'}>
                    {wordWrap ? 'On' : 'Off'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Fullscreen:</span>
                  <Badge variant={isFullscreen ? 'default' : 'secondary'}>
                    {isFullscreen ? 'Active' : 'Windowed'}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Quick Actions</h4>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Reset All Settings
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Export Configuration
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Upload className="mr-2 h-4 w-4" />
                  Import Configuration
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Best Practices */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Menubar Best Practices</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-blue-500" />
                <h4 className="font-medium">Visual Design</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Consistent icon usage across menus</p>
                <p>• Clear visual hierarchy with separators</p>
                <p>• Keyboard shortcuts for common actions</p>
                <p>• Proper spacing and alignment</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-green-500" />
                <h4 className="font-medium">User Experience</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Logical menu organization</p>
                <p>• Nested menus for complex actions</p>
                <p>• State indicators for toggles</p>
                <p>• Contextual menu items</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-purple-500" />
                <h4 className="font-medium">Accessibility</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Keyboard navigation support</p>
                <p>• Screen reader compatibility</p>
                <p>• Focus management</p>
                <p>• ARIA labels and descriptions</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
