'use client';

import {
  Activity,
  AlertTriangle,
  Bookmark,
  Calendar,
  CheckCircle,
  Clock,
  Copy,
  Database,
  Download,
  Edit,
  Eye,
  Filter,
  Heart,
  HelpCircle,
  Info,
  Mail,
  MapPin,
  Package,
  Phone,
  Search,
  Settings,
  Share2,
  Shield,
  Star,
  Trash2,
  User,
  Zap,
} from 'lucide-react';
import React, { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '.';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card, CardContent, CardHeader } from '../Card';

interface TooltipExample {
  id: string;
  trigger: React.ReactNode;
  content: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  delay?: number;
  category: string;
}

export default function TooltipDemo() {
  const [hoveredTooltip, setHoveredTooltip] = useState<string | null>(null);
  const [tooltipStats, setTooltipStats] = useState({
    totalShown: 0,
    topSide: 0,
    rightSide: 0,
    bottomSide: 0,
    leftSide: 0,
  });

  const handleTooltipOpen = (side: string, id: string) => {
    setHoveredTooltip(id);
    setTooltipStats(prev => ({
      ...prev,
      totalShown: prev.totalShown + 1,
      [`${side}Side`]: prev[`${side}Side` as keyof typeof prev] + 1,
    }));
  };

  const tooltipExamples: TooltipExample[] = [
    // Basic Information
    {
      id: 'info',
      trigger: <Info className="h-4 w-4" />,
      content: 'Additional information about this feature',
      side: 'top',
      category: 'Information',
    },
    {
      id: 'help',
      trigger: <HelpCircle className="h-4 w-4" />,
      content: 'Click here to get help and support',
      side: 'right',
      category: 'Information',
    },
    {
      id: 'warning',
      trigger: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
      content: 'Warning: This action cannot be undone',
      side: 'bottom',
      category: 'Information',
    },
    {
      id: 'success',
      trigger: <CheckCircle className="h-4 w-4 text-green-500" />,
      content: 'Operation completed successfully',
      side: 'left',
      category: 'Information',
    },

    // Actions
    {
      id: 'edit',
      trigger: <Edit className="h-4 w-4" />,
      content: 'Edit this item (Ctrl+E)',
      side: 'top',
      category: 'Actions',
    },
    {
      id: 'delete',
      trigger: <Trash2 className="h-4 w-4 text-red-500" />,
      content: 'Delete permanently - this cannot be undone',
      side: 'top',
      category: 'Actions',
    },
    {
      id: 'view',
      trigger: <Eye className="h-4 w-4" />,
      content: 'View details in a new window',
      side: 'right',
      category: 'Actions',
    },
    {
      id: 'copy',
      trigger: <Copy className="h-4 w-4" />,
      content: 'Copy to clipboard (Ctrl+C)',
      side: 'bottom',
      category: 'Actions',
    },
    {
      id: 'download',
      trigger: <Download className="h-4 w-4" />,
      content: 'Download file to your device',
      side: 'left',
      category: 'Actions',
    },
    {
      id: 'share',
      trigger: <Share2 className="h-4 w-4" />,
      content: 'Share with others via email or link',
      side: 'top',
      category: 'Actions',
    },

    // Social
    {
      id: 'like',
      trigger: <Heart className="h-4 w-4" />,
      content: 'Like this post',
      side: 'top',
      category: 'Social',
    },
    {
      id: 'star',
      trigger: <Star className="h-4 w-4" />,
      content: 'Add to favorites',
      side: 'right',
      category: 'Social',
    },
    {
      id: 'bookmark',
      trigger: <Bookmark className="h-4 w-4" />,
      content: 'Bookmark for later reading',
      side: 'bottom',
      category: 'Social',
    },

    // Settings
    {
      id: 'settings',
      trigger: <Settings className="h-4 w-4" />,
      content: 'Open application settings',
      side: 'top',
      category: 'Settings',
    },
    {
      id: 'filter',
      trigger: <Filter className="h-4 w-4" />,
      content: 'Filter results by criteria',
      side: 'right',
      category: 'Settings',
    },
    {
      id: 'search',
      trigger: <Search className="h-4 w-4" />,
      content: 'Search through all content',
      side: 'bottom',
      category: 'Settings',
    },

    // System
    {
      id: 'security',
      trigger: <Shield className="h-4 w-4" />,
      content: 'Security settings and permissions',
      side: 'top',
      category: 'System',
    },
    {
      id: 'database',
      trigger: <Database className="h-4 w-4" />,
      content: 'Database connection and sync status',
      side: 'left',
      category: 'System',
    },
  ];

  const groupedTooltips = tooltipExamples.reduce(
    (groups, tooltip) => {
      const category = tooltip.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(tooltip);
      return groups;
    },
    {} as Record<string, TooltipExample[]>
  );

  const complexTooltipContent = (
    <div className="space-y-2">
      <div className="font-semibold">Advanced Tooltip</div>
      <div className="text-sm">This tooltip contains:</div>
      <ul className="text-sm space-y-1">
        <li>• Multiple lines of content</li>
        <li>• Rich formatting options</li>
        <li>• Interactive elements</li>
      </ul>
      <div className="flex gap-2 mt-2">
        <Badge variant="secondary" className="text-xs">
          Pro Tip
        </Badge>
        <Badge variant="outline" className="text-xs">
          Beta
        </Badge>
      </div>
    </div>
  );

  return (
    <TooltipProvider delayDuration={300}>
      <div className="space-y-8 p-6 max-w-5xl mx-auto">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Tooltip Component</h1>
          <p className="text-muted-foreground text-lg">
            Contextual information and help text that appears on hover or focus
          </p>
        </div>

        {/* Basic Tooltips */}
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold">Basic Tooltips</h2>
            <p className="text-muted-foreground">Simple tooltips with different positions</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center space-y-3">
                <div className="text-sm font-medium">Top</div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Info className="h-4 w-4 mr-2" />
                      Hover me
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>This tooltip appears on top</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              <div className="text-center space-y-3">
                <div className="text-sm font-medium">Right</div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Hover me
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>This tooltip appears on the right</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              <div className="text-center space-y-3">
                <div className="text-sm font-medium">Bottom</div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Hover me
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>This tooltip appears at the bottom</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              <div className="text-center space-y-3">
                <div className="text-sm font-medium">Left</div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Hover me
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>This tooltip appears on the left</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tooltip Categories */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Tooltip Categories</h2>
                <p className="text-muted-foreground">Organized tooltips by functionality</p>
              </div>
              <div className="text-sm text-muted-foreground">
                Hovered: {hoveredTooltip ? `#${hoveredTooltip}` : 'None'}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            {Object.entries(groupedTooltips).map(([category, tooltips]) => (
              <div key={category} className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  {category}
                  <Badge variant="outline" className="text-xs">
                    {tooltips.length} items
                  </Badge>
                </h3>
                <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-3">
                  {tooltips.map(tooltip => (
                    <Tooltip key={tooltip.id}>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-10 w-10 p-0"
                          onMouseEnter={() => handleTooltipOpen(tooltip.side || 'top', tooltip.id)}
                          onMouseLeave={() => setHoveredTooltip(null)}
                        >
                          {tooltip.trigger}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side={tooltip.side} sideOffset={8}>
                        <p className="max-w-48">{tooltip.content}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Advanced Tooltips */}
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold">Advanced Tooltips</h2>
            <p className="text-muted-foreground">Rich content and interactive tooltips</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Rich Content Tooltip */}
            <div className="space-y-3">
              <h4 className="font-semibold">Rich Content Tooltips</h4>
              <div className="flex gap-4 flex-wrap">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">
                      <Package className="h-4 w-4 mr-2" />
                      Rich Content
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-80">{complexTooltipContent}</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">
                      <User className="h-4 w-4 mr-2" />
                      User Info
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-2">
                      <div className="font-semibold">John Doe</div>
                      <div className="text-sm space-y-1">
                        <div className="flex items-center gap-2">
                          <Mail className="h-3 w-3" />
                          john.doe@example.com
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-3 w-3" />
                          +1 (555) 123-4567
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3" />
                          San Francisco, CA
                        </div>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">
                      <Activity className="h-4 w-4 mr-2" />
                      Performance
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-2">
                      <div className="font-semibold">System Performance</div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>CPU: 45%</div>
                        <div>Memory: 62%</div>
                        <div>Disk: 78%</div>
                        <div>Network: 23%</div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Last updated: 2 seconds ago
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* Delayed Tooltips */}
            <div className="space-y-3">
              <h4 className="font-semibold">Custom Delay Tooltips</h4>
              <div className="flex gap-4 flex-wrap">
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Zap className="h-4 w-4 mr-2" />
                        Instant (0ms)
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This tooltip appears instantly</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider delayDuration={500}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Clock className="h-4 w-4 mr-2" />
                        Slow (500ms)
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This tooltip has a 500ms delay</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider delayDuration={1000}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        Very Slow (1000ms)
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This tooltip has a 1 second delay</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            {/* Status Tooltips */}
            <div className="space-y-3">
              <h4 className="font-semibold">Status & State Tooltips</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2 p-2 border rounded-lg cursor-help">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Online</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Service is running normally</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2 p-2 border rounded-lg cursor-help">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">Warning</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Service has minor issues</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2 p-2 border rounded-lg cursor-help">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm">Offline</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Service is currently unavailable</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2 p-2 border rounded-lg cursor-help">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-sm">Syncing</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Synchronizing data with server</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tooltip Usage Statistics */}
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold">Tooltip Statistics</h2>
            <p className="text-muted-foreground">Track tooltip interactions and usage patterns</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold">{tooltipStats.totalShown}</div>
                <div className="text-sm text-muted-foreground">Total Shown</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold">{tooltipStats.topSide}</div>
                <div className="text-sm text-muted-foreground">Top Position</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold">{tooltipStats.rightSide}</div>
                <div className="text-sm text-muted-foreground">Right Position</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold">{tooltipStats.bottomSide}</div>
                <div className="text-sm text-muted-foreground">Bottom Position</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold">{tooltipStats.leftSide}</div>
                <div className="text-sm text-muted-foreground">Left Position</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Best Practices */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <h4 className="font-semibold mb-2">Content Guidelines</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Keep tooltip text concise and helpful</li>
                <li>• Use tooltips for additional context, not essential info</li>
                <li>• Include keyboard shortcuts when applicable</li>
                <li>• Avoid tooltips on mobile touch interfaces</li>
              </ul>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold mb-2">Positioning & Timing</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Position tooltips to avoid covering important content</li>
                <li>• Use appropriate delays (300-500ms typically)</li>
                <li>• Ensure tooltips disappear when cursor moves away</li>
                <li>• Consider screen edges for automatic repositioning</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
