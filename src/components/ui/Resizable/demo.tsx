'use client';

import {
  Activity,
  BarChart3,
  Bell,
  Calendar,
  Code,
  Copy,
  Database,
  Edit,
  File,
  FileText,
  Filter,
  Folder,
  GitBranch,
  Grid3X3,
  Image,
  Layers,
  List,
  Maximize2,
  MessageSquare,
  Minimize2,
  MoreHorizontal,
  Package,
  Pause,
  Play,
  PlusCircle,
  Save,
  Search,
  Settings,
  SkipBack,
  SkipForward,
  SortAsc,
  Square,
  Terminal,
  Trash2,
  TrendingUp,
  Users,
  Volume2,
} from 'lucide-react';
import { useState } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '.';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card } from '../Card';

import type { LucideIcon } from 'lucide-react';

interface FileItem {
  name: string;
  type: 'file' | 'folder';
  size?: string;
  modified?: string;
  icon: LucideIcon;
}

interface DashboardWidget {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
}

export default function ResizableDemo() {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [viewMode, setViewMode] = useState('list');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  const fileItems: FileItem[] = [
    { name: 'Documents', type: 'folder', icon: Folder },
    { name: 'Images', type: 'folder', icon: Folder },
    { name: 'src', type: 'folder', icon: Folder },
    { name: 'package.json', type: 'file', size: '2.4 KB', modified: '2 hours ago', icon: Code },
    { name: 'README.md', type: 'file', size: '1.2 KB', modified: '1 day ago', icon: FileText },
    { name: 'component.tsx', type: 'file', size: '5.8 KB', modified: '30 min ago', icon: Code },
    {
      name: 'database.sql',
      type: 'file',
      size: '15.6 KB',
      modified: '3 hours ago',
      icon: Database,
    },
    { name: 'logo.png', type: 'file', size: '245 KB', modified: '1 week ago', icon: Image },
  ];

  const dashboardWidgets: DashboardWidget[] = [
    { id: '1', title: 'Total Users', value: '12,543', change: '+12%', trend: 'up', icon: Users },
    { id: '2', title: 'Revenue', value: '$45,678', change: '+8%', trend: 'up', icon: TrendingUp },
    {
      id: '3',
      title: 'Active Sessions',
      value: '2,847',
      change: '-3%',
      trend: 'down',
      icon: Activity,
    },
    {
      id: '4',
      title: 'Conversion Rate',
      value: '3.2%',
      change: '+0.5%',
      trend: 'up',
      icon: BarChart3,
    },
  ];

  const musicTracks = [
    { title: 'Ambient Focus', artist: 'Coding Sounds', duration: '4:32' },
    { title: 'Deep Work', artist: 'Productivity Beats', duration: '3:45' },
    { title: 'Flow State', artist: 'Concentration', duration: '5:21' },
    { title: 'Algorithm', artist: 'Tech Vibes', duration: '4:12' },
  ];

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Resizable Component</h1>
        <p className="text-muted-foreground text-lg">
          Flexible panel layouts with drag-to-resize functionality for enterprise applications
        </p>
      </div>

      {/* Basic Examples Section */}
      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">Basic Examples</h2>
          <p className="text-muted-foreground">Simple resizable layouts for common use cases</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Horizontal Split</h3>
            <div className="border rounded-lg overflow-hidden h-64">
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={30} minSize={20}>
                  <div className="p-4 h-full bg-muted/50 flex items-center justify-center">
                    <div className="text-center">
                      <Folder className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <h4 className="font-semibold">Sidebar</h4>
                      <p className="text-sm text-muted-foreground">Navigation panel</p>
                    </div>
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={70}>
                  <div className="p-4 h-full flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <h4 className="font-semibold">Main Content</h4>
                      <p className="text-sm text-muted-foreground">Primary workspace</p>
                    </div>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Vertical Split</h3>
            <div className="border rounded-lg overflow-hidden h-64">
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={40} minSize={25}>
                  <div className="p-4 h-full bg-muted/50 flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <h4 className="font-semibold">Header Panel</h4>
                      <p className="text-sm text-muted-foreground">Top section</p>
                    </div>
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={60}>
                  <div className="p-4 h-full flex items-center justify-center">
                    <div className="text-center">
                      <Terminal className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <h4 className="font-semibold">Content Panel</h4>
                      <p className="text-sm text-muted-foreground">Main workspace</p>
                    </div>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Examples Section */}
      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">Advanced Examples</h2>
          <p className="text-muted-foreground">
            Complex layouts for enterprise applications and professional tools
          </p>
        </div>

        {/* File Explorer Layout */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">File Explorer Layout</h3>
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
                <Grid3X3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="border rounded-lg overflow-hidden h-96">
            <ResizablePanelGroup direction="horizontal">
              {/* Sidebar */}
              <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
                <div className="h-full bg-muted/30">
                  {/* Sidebar Header */}
                  <div className="p-3 border-b bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Folder className="h-4 w-4" />
                      <span className="font-semibold text-sm">Explorer</span>
                    </div>
                  </div>
                  {/* File Tree */}
                  <div className="p-2 space-y-1">
                    {fileItems
                      .filter(item => item.type === 'folder')
                      .map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-2 rounded hover:bg-muted cursor-pointer"
                          onClick={() => setSelectedFile(item)}
                        >
                          <item.icon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{item.name}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* Main Content */}
              <ResizablePanel defaultSize={50}>
                <ResizablePanelGroup direction="vertical">
                  {/* File List */}
                  <ResizablePanel defaultSize={70}>
                    <div className="h-full">
                      {/* Toolbar */}
                      <div className="p-3 border-b bg-muted/20 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <PlusCircle className="h-4 w-4 mr-1" />
                            New
                          </Button>
                          <Button variant="outline" size="sm">
                            <Filter className="h-4 w-4 mr-1" />
                            Filter
                          </Button>
                          <Button variant="outline" size="sm">
                            <SortAsc className="h-4 w-4 mr-1" />
                            Sort
                          </Button>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {/* File Grid */}
                      <div className="p-3">
                        <div
                          className={viewMode === 'grid' ? 'grid grid-cols-4 gap-3' : 'space-y-1'}
                        >
                          {fileItems.map((item, index) => (
                            <div
                              key={index}
                              className={`flex items-center gap-3 p-2 rounded hover:bg-muted cursor-pointer ${
                                selectedFile?.name === item.name ? 'bg-accent' : ''
                              } ${viewMode === 'grid' ? 'flex-col text-center' : ''}`}
                              onClick={() => setSelectedFile(item)}
                            >
                              <item.icon
                                className={`h-4 w-4 text-muted-foreground ${viewMode === 'grid' ? 'h-8 w-8' : ''}`}
                              />
                              <div
                                className={`flex-1 min-w-0 ${viewMode === 'grid' ? 'text-center' : ''}`}
                              >
                                <p className="text-sm font-medium truncate">{item.name}</p>
                                {item.size && viewMode === 'list' && (
                                  <p className="text-xs text-muted-foreground">
                                    {item.size} • {item.modified}
                                  </p>
                                )}
                              </div>
                              {viewMode === 'list' && (
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </ResizablePanel>

                  <ResizableHandle withHandle />

                  {/* Preview Panel */}
                  <ResizablePanel defaultSize={30} minSize={20}>
                    <div className="h-full bg-muted/20">
                      <div className="p-3 border-b">
                        <h4 className="font-semibold text-sm">Preview</h4>
                      </div>
                      <div className="p-3">
                        {selectedFile ? (
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <selectedFile.icon className="h-6 w-6" />
                              <div>
                                <p className="font-medium">{selectedFile.name}</p>
                                <p className="text-xs text-muted-foreground">{selectedFile.type}</p>
                              </div>
                            </div>
                            {selectedFile.size && (
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span>Size:</span>
                                  <span>{selectedFile.size}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Modified:</span>
                                  <span>{selectedFile.modified}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">Select a file to preview</p>
                        )}
                      </div>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* Properties Panel */}
              <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
                <div className="h-full bg-muted/30">
                  <div className="p-3 border-b bg-muted/50">
                    <h4 className="font-semibold text-sm">Properties</h4>
                  </div>
                  <div className="p-3 space-y-4">
                    <div>
                      <h5 className="font-medium text-sm mb-2">File Operations</h5>
                      <div className="space-y-1">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Copy className="h-4 w-4 mr-2" />
                          Copy
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Edit className="h-4 w-4 mr-2" />
                          Rename
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium text-sm mb-2">View Options</h5>
                      <div className="space-y-1">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Maximize2 className="h-4 w-4 mr-2" />
                          Expand
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Settings className="h-4 w-4 mr-2" />
                          Settings
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>

        {/* Dashboard Layout */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Analytics Dashboard</h3>
          <div className="border rounded-lg overflow-hidden h-96">
            <ResizablePanelGroup direction="vertical">
              {/* Header */}
              <ResizablePanel defaultSize={20} minSize={15}>
                <div className="h-full bg-muted/20 p-4">
                  <div className="flex items-center justify-between h-full">
                    <div className="flex items-center gap-4">
                      <h3 className="text-lg font-semibold">Analytics Dashboard</h3>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          Last 30 days
                        </Button>
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                      <Button size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </Button>
                    </div>
                  </div>
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* Main Dashboard */}
              <ResizablePanel defaultSize={80}>
                <ResizablePanelGroup direction="horizontal">
                  {/* Metrics Sidebar */}
                  <ResizablePanel defaultSize={30} minSize={25}>
                    <div className="h-full bg-muted/30 p-4">
                      <h4 className="font-semibold mb-4">Key Metrics</h4>
                      <div className="space-y-3">
                        {dashboardWidgets.map(widget => (
                          <Card key={widget.id} className="p-3">
                            <div className="flex items-center justify-between mb-2">
                              <widget.icon className="h-4 w-4 text-muted-foreground" />
                              <Badge variant={widget.trend === 'up' ? 'default' : 'destructive'}>
                                {widget.change}
                              </Badge>
                            </div>
                            <div>
                              <p className="text-2xl font-bold">{widget.value}</p>
                              <p className="text-sm text-muted-foreground">{widget.title}</p>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </ResizablePanel>

                  <ResizableHandle withHandle />

                  {/* Chart Area */}
                  <ResizablePanel defaultSize={70}>
                    <div className="h-full p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold">Performance Overview</h4>
                        <div className="flex items-center gap-2">
                          {['overview', 'revenue', 'users', 'performance'].map(tab => (
                            <Button
                              key={tab}
                              variant={activeTab === tab ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => setActiveTab(tab)}
                            >
                              {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div className="h-full bg-muted/20 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <BarChart3 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                          <p className="text-lg font-medium">Interactive Chart Area</p>
                          <p className="text-sm text-muted-foreground">
                            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} data
                            visualization
                          </p>
                        </div>
                      </div>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>

        {/* Media Player Layout */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Media Player Interface</h3>
          <div className="border rounded-lg overflow-hidden h-80">
            <ResizablePanelGroup direction="horizontal">
              {/* Playlist */}
              <ResizablePanel defaultSize={30} minSize={25} maxSize={50}>
                <div className="h-full bg-muted/30">
                  <div className="p-3 border-b bg-muted/50">
                    <h4 className="font-semibold text-sm">Playlist</h4>
                  </div>
                  <div className="p-2 space-y-1">
                    {musicTracks.map((track, index) => (
                      <div
                        key={index}
                        className={`p-2 rounded hover:bg-muted cursor-pointer ${
                          currentTrack === index ? 'bg-accent' : ''
                        }`}
                        onClick={() => setCurrentTrack(index)}
                      >
                        <p className="text-sm font-medium">{track.title}</p>
                        <p className="text-xs text-muted-foreground">{track.artist}</p>
                        <p className="text-xs text-muted-foreground">{track.duration}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* Player */}
              <ResizablePanel defaultSize={70}>
                <ResizablePanelGroup direction="vertical">
                  {/* Album Art / Visualizer */}
                  <ResizablePanel defaultSize={70}>
                    <div className="h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-32 h-32 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
                          <Volume2 className="h-16 w-16 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold">{musicTracks[currentTrack].title}</h3>
                        <p className="text-muted-foreground">{musicTracks[currentTrack].artist}</p>
                      </div>
                    </div>
                  </ResizablePanel>

                  <ResizableHandle withHandle />

                  {/* Controls */}
                  <ResizablePanel defaultSize={30} minSize={25}>
                    <div className="h-full bg-muted/20 p-4">
                      <div className="flex flex-col items-center justify-center h-full space-y-4">
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full w-1/3"></div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Button variant="outline" size="sm">
                            <SkipBack className="h-4 w-4" />
                          </Button>
                          <Button size="sm" onClick={() => setIsPlaying(!isPlaying)}>
                            {isPlaying ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </Button>
                          <Button variant="outline" size="sm">
                            <SkipForward className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>1:23</span>
                          <span>/</span>
                          <span>{musicTracks[currentTrack].duration}</span>
                        </div>
                      </div>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>

        {/* Complex Multi-Panel Layout */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Development Environment</h3>
          <div className="border rounded-lg overflow-hidden h-96">
            <ResizablePanelGroup direction="vertical">
              {/* Top Bar */}
              <ResizablePanel defaultSize={12} minSize={10}>
                <div className="h-full bg-muted/20 p-2 flex items-center justify-between border-b">
                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    <span className="font-semibold text-sm">VS Code Layout</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm">
                      <Minimize2 className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Maximize2 className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Square className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </ResizablePanel>

              {/* Main IDE Area */}
              <ResizablePanel defaultSize={75}>
                <ResizablePanelGroup direction="horizontal">
                  {/* Sidebar */}
                  <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
                    <div className="h-full bg-muted/30">
                      <div className="p-2 space-y-1">
                        <Button variant="ghost" size="sm" className="w-full justify-start">
                          <File className="h-4 w-4 mr-2" />
                          Explorer
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start">
                          <Search className="h-4 w-4 mr-2" />
                          Search
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start">
                          <GitBranch className="h-4 w-4 mr-2" />
                          Source Control
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start">
                          <Package className="h-4 w-4 mr-2" />
                          Extensions
                        </Button>
                      </div>
                    </div>
                  </ResizablePanel>

                  <ResizableHandle withHandle />

                  {/* Editor Area */}
                  <ResizablePanel defaultSize={60}>
                    <div className="h-full bg-muted/10 p-4">
                      <div className="h-full bg-background rounded border flex items-center justify-center">
                        <div className="text-center">
                          <Code className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                          <p className="font-medium">Code Editor</p>
                          <p className="text-sm text-muted-foreground">Main editing area</p>
                        </div>
                      </div>
                    </div>
                  </ResizablePanel>

                  <ResizableHandle withHandle />

                  {/* Right Panel */}
                  <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
                    <div className="h-full bg-muted/30 p-2">
                      <h4 className="font-semibold text-sm mb-2">Outline</h4>
                      <div className="space-y-1 text-sm">
                        <div className="p-1 hover:bg-muted rounded">
                          <Layers className="h-3 w-3 inline mr-2" />
                          Components
                        </div>
                        <div className="p-1 hover:bg-muted rounded ml-4">
                          <Code className="h-3 w-3 inline mr-2" />
                          Header
                        </div>
                        <div className="p-1 hover:bg-muted rounded ml-4">
                          <Code className="h-3 w-3 inline mr-2" />
                          Main
                        </div>
                        <div className="p-1 hover:bg-muted rounded ml-4">
                          <Code className="h-3 w-3 inline mr-2" />
                          Footer
                        </div>
                      </div>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* Bottom Panel */}
              <ResizablePanel defaultSize={13} minSize={10} maxSize={25}>
                <div className="h-full bg-muted/20 p-2">
                  <div className="flex items-center gap-4 mb-2">
                    <Button variant="ghost" size="sm">
                      <Terminal className="h-4 w-4 mr-1" />
                      Terminal
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Output
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Bell className="h-4 w-4 mr-1" />
                      Problems
                    </Button>
                  </div>
                  <div className="h-full bg-background rounded border p-2 font-mono text-sm">
                    <div className="text-green-500">$ npm run dev</div>
                    <div className="text-muted-foreground">Starting development server...</div>
                    <div className="text-muted-foreground">✓ Ready on http://localhost:3000</div>
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </div>

      {/* Best Practices Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Best Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h4 className="font-semibold mb-2">Performance Optimization</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Set appropriate min/max sizes to prevent unusable layouts</li>
              <li>• Use collapsible panels for secondary content</li>
              <li>• Implement keyboard shortcuts for panel management</li>
              <li>• Save and restore panel configurations</li>
            </ul>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold mb-2">User Experience</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Provide visual handles for better discoverability</li>
              <li>• Use appropriate default sizes for common workflows</li>
              <li>• Include panel headers with clear labels</li>
              <li>• Consider responsive breakpoints for mobile</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
