'use client';

import {
  Archive,
  Bookmark,
  ClipboardPaste,
  Clock,
  Copy,
  Download,
  Edit,
  Eye,
  FileEdit,
  FileText,
  Folder,
  Heart,
  Image,
  Info,
  MoreHorizontal,
  Move,
  Scissors,
  Settings,
  Share,
  Star,
  Tag,
  Trash2,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '.';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card } from '../Card';

// Sample data for different context menu scenarios
const fileItems = [
  { id: 1, name: 'Project Proposal.pdf', type: 'pdf', size: '2.4 MB', starred: false },
  { id: 2, name: 'Design Assets', type: 'folder', size: '156 items', starred: true },
  { id: 3, name: 'Screenshot_2024.png', type: 'image', size: '890 KB', starred: false },
  { id: 4, name: 'Meeting Notes.md', type: 'text', size: '12 KB', starred: true },
];

const teamMembers = [
  { id: 1, name: 'John Smith', role: 'Manager', status: 'online' },
  { id: 2, name: 'Sarah Chen', role: 'Designer', status: 'away' },
  { id: 3, name: 'Mike Johnson', role: 'Developer', status: 'offline' },
  { id: 4, name: 'Emma Davis', role: 'Product Owner', status: 'online' },
];

export default function ContextMenuDemo() {
  const [fileStates, setFileStates] = useState(
    fileItems.reduce(
      (acc, item) => ({ ...acc, [item.id]: { starred: item.starred, archived: false } }),
      {} as Record<number, { starred: boolean; archived: boolean }>
    )
  );
  const [selectedAction, setSelectedAction] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size'>('name');

  const toggleStar = (id: number) => {
    setFileStates(prev => ({
      ...prev,
      [id]: { ...prev[id], starred: !prev[id].starred },
    }));
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'folder':
        return Folder;
      case 'image':
        return Image;
      case 'pdf':
        return FileText;
      default:
        return FileText;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-6xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">ContextMenu Component</h1>
        <p className="text-muted-foreground">
          Powerful right-click context menus with enterprise features and accessibility
        </p>
      </div>

      {/* Action Feedback */}
      {selectedAction && (
        <Card className="p-4 bg-muted/50">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-blue-500" />
            <span className="text-sm">
              Last action: <strong>{selectedAction}</strong>
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedAction('')}
              className="ml-auto h-6 w-6 p-0"
            >
              ×
            </Button>
          </div>
        </Card>
      )}

      {/* Basic Usage */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Basic Usage</h3>
          <p className="text-sm text-muted-foreground">Simple context menu with common actions</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ContextMenu>
              <ContextMenuTrigger className="flex h-32 w-full items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 text-sm text-muted-foreground hover:border-muted-foreground/50 transition-colors">
                Right-click for basic menu
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem onSelect={() => setSelectedAction('Copy')}>
                  <Copy className="h-4 w-4" />
                  Copy
                  <ContextMenuShortcut>⌘C</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem onSelect={() => setSelectedAction('Cut')}>
                  <Scissors className="h-4 w-4" />
                  Cut
                  <ContextMenuShortcut>⌘X</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem onSelect={() => setSelectedAction('Paste')}>
                  <ClipboardPaste className="h-4 w-4" />
                  Paste
                  <ContextMenuShortcut>⌘V</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem onSelect={() => setSelectedAction('Delete')}>
                  <Trash2 className="h-4 w-4" />
                  Delete
                  <ContextMenuShortcut>⌫</ContextMenuShortcut>
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>

            <ContextMenu>
              <ContextMenuTrigger className="flex h-32 w-full items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 text-sm text-muted-foreground hover:border-muted-foreground/50 transition-colors">
                Right-click for advanced menu
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuLabel>Quick Actions</ContextMenuLabel>
                <ContextMenuItem onSelect={() => setSelectedAction('Download')}>
                  <Download className="h-4 w-4" />
                  Download
                </ContextMenuItem>
                <ContextMenuItem onSelect={() => setSelectedAction('Share')}>
                  <Share className="h-4 w-4" />
                  Share
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuSub>
                  <ContextMenuSubTrigger>
                    <Settings className="h-4 w-4" />
                    More Options
                  </ContextMenuSubTrigger>
                  <ContextMenuSubContent>
                    <ContextMenuItem onSelect={() => setSelectedAction('Rename')}>
                      <FileEdit className="h-4 w-4" />
                      Rename
                    </ContextMenuItem>
                    <ContextMenuItem onSelect={() => setSelectedAction('Move')}>
                      <Move className="h-4 w-4" />
                      Move to Folder
                    </ContextMenuItem>
                    <ContextMenuItem onSelect={() => setSelectedAction('Archive')}>
                      <Archive className="h-4 w-4" />
                      Archive
                    </ContextMenuItem>
                  </ContextMenuSubContent>
                </ContextMenuSub>
              </ContextMenuContent>
            </ContextMenu>
          </div>
        </div>
      </Card>

      {/* File Manager Demo */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">File Manager Interface</h3>
              <p className="text-sm text-muted-foreground">
                Right-click on files for contextual actions
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">View: {viewMode}</Badge>
              <Badge variant="outline">Sort: {sortBy}</Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {fileItems.map(file => {
              const IconComponent = getFileIcon(file.type);
              const isStarred = fileStates[file.id]?.starred;
              const isArchived = fileStates[file.id]?.archived;

              return (
                <ContextMenu key={file.id}>
                  <ContextMenuTrigger className="group">
                    <Card
                      className={`p-4 cursor-pointer transition-all hover:shadow-md ${isArchived ? 'opacity-50' : ''}`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <IconComponent className="h-8 w-8 text-muted-foreground" />
                          {isStarred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                        </div>
                        <div>
                          <p className="font-medium text-sm truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{file.size}</p>
                        </div>
                      </div>
                    </Card>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem onSelect={() => setSelectedAction(`Open ${file.name}`)}>
                      <Eye className="h-4 w-4" />
                      Open
                    </ContextMenuItem>
                    <ContextMenuItem onSelect={() => setSelectedAction(`Edit ${file.name}`)}>
                      <Edit className="h-4 w-4" />
                      Edit
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuCheckboxItem
                      checked={isStarred}
                      onCheckedChange={() => toggleStar(file.id)}
                    >
                      <Star className="h-4 w-4" />
                      Star
                    </ContextMenuCheckboxItem>
                    <ContextMenuItem onSelect={() => setSelectedAction(`Download ${file.name}`)}>
                      <Download className="h-4 w-4" />
                      Download
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuSub>
                      <ContextMenuSubTrigger>
                        <Share className="h-4 w-4" />
                        Share
                      </ContextMenuSubTrigger>
                      <ContextMenuSubContent>
                        <ContextMenuItem
                          onSelect={() => setSelectedAction(`Share ${file.name} via Email`)}
                        >
                          Email Link
                        </ContextMenuItem>
                        <ContextMenuItem
                          onSelect={() => setSelectedAction(`Copy ${file.name} Link`)}
                        >
                          Copy Link
                        </ContextMenuItem>
                        <ContextMenuItem
                          onSelect={() => setSelectedAction(`Generate ${file.name} QR Code`)}
                        >
                          Generate QR Code
                        </ContextMenuItem>
                      </ContextMenuSubContent>
                    </ContextMenuSub>
                    <ContextMenuSub>
                      <ContextMenuSubTrigger>
                        <Tag className="h-4 w-4" />
                        Add to Collection
                      </ContextMenuSubTrigger>
                      <ContextMenuSubContent>
                        <ContextMenuItem
                          onSelect={() => setSelectedAction(`Add ${file.name} to Favorites`)}
                        >
                          Favorites
                        </ContextMenuItem>
                        <ContextMenuItem
                          onSelect={() => setSelectedAction(`Add ${file.name} to Recent`)}
                        >
                          Recent Files
                        </ContextMenuItem>
                        <ContextMenuItem
                          onSelect={() => setSelectedAction(`Add ${file.name} to Archive`)}
                        >
                          Archive
                        </ContextMenuItem>
                      </ContextMenuSubContent>
                    </ContextMenuSub>
                    <ContextMenuSeparator />
                    <ContextMenuItem
                      onSelect={() => setSelectedAction(`Delete ${file.name}`)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                      <ContextMenuShortcut>⌫</ContextMenuShortcut>
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Team Management Demo */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold">Team Management</h3>
            <p className="text-sm text-muted-foreground">
              Context menus with checkbox items and radio groups
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teamMembers.map(member => (
              <ContextMenu key={member.id}>
                <ContextMenuTrigger className="group">
                  <Card className="p-4 cursor-pointer transition-all hover:shadow-md">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          {member.name
                            .split(' ')
                            .map(n => n[0])
                            .join('')}
                        </div>
                        <div
                          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(member.status)}`}
                        />
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                  </Card>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuLabel>Team Actions</ContextMenuLabel>
                  <ContextMenuItem onSelect={() => setSelectedAction(`Message ${member.name}`)}>
                    <Edit className="h-4 w-4" />
                    Send Message
                  </ContextMenuItem>
                  <ContextMenuItem
                    onSelect={() => setSelectedAction(`View ${member.name} Profile`)}
                  >
                    <Eye className="h-4 w-4" />
                    View Profile
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuSub>
                    <ContextMenuSubTrigger>
                      <Settings className="h-4 w-4" />
                      Change Role
                    </ContextMenuSubTrigger>
                    <ContextMenuSubContent>
                      <ContextMenuRadioGroup value={member.role}>
                        <ContextMenuRadioItem value="Manager">Manager</ContextMenuRadioItem>
                        <ContextMenuRadioItem value="Developer">Developer</ContextMenuRadioItem>
                        <ContextMenuRadioItem value="Designer">Designer</ContextMenuRadioItem>
                        <ContextMenuRadioItem value="Product Owner">
                          Product Owner
                        </ContextMenuRadioItem>
                      </ContextMenuRadioGroup>
                    </ContextMenuSubContent>
                  </ContextMenuSub>
                  <ContextMenuSeparator />
                  <ContextMenuCheckboxItem defaultChecked>
                    <Bookmark className="h-4 w-4" />
                    Notify on Status Change
                  </ContextMenuCheckboxItem>
                  <ContextMenuCheckboxItem>
                    <Heart className="h-4 w-4" />
                    Add to Favorites
                  </ContextMenuCheckboxItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem onSelect={() => setSelectedAction(`Remove ${member.name}`)}>
                    <Trash2 className="h-4 w-4" />
                    Remove from Team
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            ))}
          </div>
        </div>
      </Card>

      {/* View Options Demo */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold">View Customization</h3>
            <p className="text-sm text-muted-foreground">
              Radio groups and checkboxes for settings management
            </p>
          </div>

          <ContextMenu>
            <ContextMenuTrigger>
              <Card className="p-8 cursor-pointer transition-all hover:shadow-md border-2 border-dashed">
                <div className="text-center space-y-2">
                  <Settings className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="font-medium">Right-click to customize view</p>
                  <div className="flex gap-2 justify-center">
                    <Badge variant="outline">View: {viewMode}</Badge>
                    <Badge variant="outline">Sort: {sortBy}</Badge>
                  </div>
                </div>
              </Card>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuLabel>View Options</ContextMenuLabel>
              <ContextMenuSub>
                <ContextMenuSubTrigger>
                  <Eye className="h-4 w-4" />
                  View Mode
                </ContextMenuSubTrigger>
                <ContextMenuSubContent>
                  <ContextMenuRadioGroup
                    value={viewMode}
                    onValueChange={value => setViewMode(value as 'grid' | 'list')}
                  >
                    <ContextMenuRadioItem value="grid">Grid View</ContextMenuRadioItem>
                    <ContextMenuRadioItem value="list">List View</ContextMenuRadioItem>
                  </ContextMenuRadioGroup>
                </ContextMenuSubContent>
              </ContextMenuSub>
              <ContextMenuSub>
                <ContextMenuSubTrigger>
                  <MoreHorizontal className="h-4 w-4" />
                  Sort By
                </ContextMenuSubTrigger>
                <ContextMenuSubContent>
                  <ContextMenuRadioGroup
                    value={sortBy}
                    onValueChange={value => setSortBy(value as 'name' | 'date' | 'size')}
                  >
                    <ContextMenuRadioItem value="name">Name</ContextMenuRadioItem>
                    <ContextMenuRadioItem value="date">Date Modified</ContextMenuRadioItem>
                    <ContextMenuRadioItem value="size">File Size</ContextMenuRadioItem>
                  </ContextMenuRadioGroup>
                </ContextMenuSubContent>
              </ContextMenuSub>
              <ContextMenuSeparator />
              <ContextMenuCheckboxItem defaultChecked>
                <Clock className="h-4 w-4" />
                Show Timestamps
              </ContextMenuCheckboxItem>
              <ContextMenuCheckboxItem defaultChecked>
                <Info className="h-4 w-4" />
                Show File Sizes
              </ContextMenuCheckboxItem>
              <ContextMenuCheckboxItem>
                <Archive className="h-4 w-4" />
                Show Hidden Files
              </ContextMenuCheckboxItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>
      </Card>

      {/* Real-World Use Cases */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Enterprise Use Cases</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-500" />
                <h4 className="font-medium">Document Management</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• File operations and metadata</p>
                <p>• Version control actions</p>
                <p>• Collaboration workflows</p>
                <p>• Approval and review processes</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-green-500" />
                <h4 className="font-medium">Admin Interfaces</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• User management actions</p>
                <p>• Permission and role changes</p>
                <p>• Bulk operations</p>
                <p>• System configuration</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <h4 className="font-medium">Productivity Tools</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Quick actions and shortcuts</p>
                <p>• Context-sensitive operations</p>
                <p>• Workspace customization</p>
                <p>• Automation triggers</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-medium mb-2">Key Features</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
              <div>• Nested submenus</div>
              <div>• Keyboard shortcuts</div>
              <div>• Checkbox items</div>
              <div>• Radio button groups</div>
              <div>• Disabled states</div>
              <div>• Custom icons</div>
              <div>• Accessibility support</div>
              <div>• Conditional rendering</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
