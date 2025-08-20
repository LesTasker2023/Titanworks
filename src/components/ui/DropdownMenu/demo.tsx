'use client';

import {
  Archive,
  BarChart,
  Bell,
  Bookmark,
  Briefcase,
  Building,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Copy,
  CreditCard,
  DollarSign,
  Download,
  Edit,
  Eye,
  FileText,
  Filter,
  Globe,
  Lightbulb,
  LogOut,
  Mail,
  MessageSquare,
  MoreVertical,
  Move,
  Phone,
  PieChart,
  PlayCircle,
  Plus,
  Settings,
  Share,
  Shield,
  SortAsc,
  Star,
  Target,
  Trash2,
  TrendingUp,
  Upload,
  User,
  UserPlus,
  Video,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '.';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card } from '../Card';

export default function DropdownMenuDemo() {
  // User preference states
  const [showActivity, setShowActivity] = useState(true);
  const [showPanel, setShowPanel] = useState(false);
  const [showStatusBar, setShowStatusBar] = useState(true);

  // View states
  const [sortOrder, setSortOrder] = useState('name');
  const [filterStatus, setFilterStatus] = useState('all');

  // Notification states
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);

  // Theme states
  const [theme, setTheme] = useState('system');

  // Feedback state
  const [feedback, setFeedback] = useState<string>('');

  const handleAction = (action: string) => {
    setFeedback(`Action: ${action}`);
    setTimeout(() => setFeedback(''), 3000);
  };

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">DropdownMenu Component</h1>
        <p className="text-muted-foreground">
          Comprehensive dropdown menus for navigation, actions, and enterprise workflows
        </p>
      </div>

      {/* Feedback */}
      {feedback && (
        <Card className="p-4 bg-muted/50">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span className="text-sm">
              Feedback: <strong>{feedback}</strong>
            </span>
          </div>
        </Card>
      )}

      {/* Basic Usage */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Basic Usage</h3>
          <p className="text-sm text-muted-foreground">Simple dropdown menus for common actions</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">User Actions</h4>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <span className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Profile
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleAction('View Profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAction('Settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAction('Billing')}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleAction('Logout')}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">File Operations</h4>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <span className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Actions
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuLabel>File Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleAction('New File')}>
                    <Plus className="mr-2 h-4 w-4" />
                    <span>New File</span>
                    <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAction('Open')}>
                    <Upload className="mr-2 h-4 w-4" />
                    <span>Open</span>
                    <DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAction('Save')}>
                    <Download className="mr-2 h-4 w-4" />
                    <span>Save</span>
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleAction('Share')}>
                    <Share className="mr-2 h-4 w-4" />
                    <span>Share</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Quick Actions</h4>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="w-full justify-between">
                    <span className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Quick Actions
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuItem onClick={() => handleAction('Edit')}>
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAction('Copy')}>
                    <Copy className="mr-2 h-4 w-4" />
                    <span>Copy</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAction('Move')}>
                    <Move className="mr-2 h-4 w-4" />
                    <span>Move</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleAction('Delete')}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </Card>

      {/* Advanced Features */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Settings className="h-5 w-5 text-purple-500" />
            <div>
              <h3 className="text-xl font-semibold">Advanced Features</h3>
              <p className="text-sm text-muted-foreground">
                Submenus, checkboxes, radio groups, and complex navigation
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">View Preferences</h4>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <span className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      View Options
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>View Settings</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={showStatusBar}
                    onCheckedChange={setShowStatusBar}
                  >
                    Status Bar
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={showActivity}
                    onCheckedChange={setShowActivity}
                  >
                    Activity Bar
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
                    Side Panel
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <SortAsc className="mr-2 h-4 w-4" />
                      <span>Sort by</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuRadioGroup value={sortOrder} onValueChange={setSortOrder}>
                        <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="size">Size</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="type">Type</DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Theme & Display</h4>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <span className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Theme
                    </span>
                    <Badge variant="secondary">{theme}</Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                    <DropdownMenuRadioItem value="light">
                      <span>Light</span>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="dark">
                      <span>Dark</span>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="system">
                      <span>System</span>
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Filter className="mr-2 h-4 w-4" />
                      <span>Filter</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuRadioGroup value={filterStatus} onValueChange={setFilterStatus}>
                        <DropdownMenuRadioItem value="all">All Items</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="active">Active</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="inactive">Inactive</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="pending">Pending</DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>Status Bar: {showStatusBar ? 'On' : 'Off'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span>Activity: {showActivity ? 'On' : 'Off'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span>Panel: {showPanel ? 'On' : 'Off'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
              <span>Sort: {sortOrder}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Business Applications */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Briefcase className="h-5 w-5 text-blue-500" />
            <div>
              <h3 className="text-xl font-semibold">Business Applications</h3>
              <p className="text-sm text-muted-foreground">
                Enterprise workflows and team collaboration
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">Project Management</h4>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <span className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Project Actions
                    </span>
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64">
                  <DropdownMenuLabel>Project Management</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => handleAction('Create Task')}>
                      <Plus className="mr-2 h-4 w-4" />
                      <span>Create Task</span>
                      <DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAction('Assign Members')}>
                      <UserPlus className="mr-2 h-4 w-4" />
                      <span>Assign Members</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAction('Set Deadline')}>
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Set Deadline</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <BarChart className="mr-2 h-4 w-4" />
                      <span>Reports</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem onClick={() => handleAction('Progress Report')}>
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Progress Report
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction('Time Tracking')}>
                        <Clock className="mr-2 h-4 w-4" />
                        Time Tracking
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction('Budget Analysis')}>
                        <DollarSign className="mr-2 h-4 w-4" />
                        Budget Analysis
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Communication Hub</h4>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <span className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Communications
                    </span>
                    <Badge variant="destructive">3</Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64">
                  <DropdownMenuLabel>Communication Center</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => handleAction('Send Message')}>
                      <Mail className="mr-2 h-4 w-4" />
                      <span>Send Message</span>
                      <Badge variant="outline" className="ml-auto">
                        12
                      </Badge>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAction('Video Call')}>
                      <Video className="mr-2 h-4 w-4" />
                      <span>Video Call</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAction('Phone Call')}>
                      <Phone className="mr-2 h-4 w-4" />
                      <span>Phone Call</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Email Notifications
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Push Notifications
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={smsNotifications}
                    onCheckedChange={setSmsNotifications}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    SMS Notifications
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Content Management</h4>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <span className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Content Actions
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64">
                  <DropdownMenuLabel>Content Management</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Plus className="mr-2 h-4 w-4" />
                      <span>Create Content</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem onClick={() => handleAction('New Document')}>
                        <FileText className="mr-2 h-4 w-4" />
                        Document
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction('New Presentation')}>
                        <PlayCircle className="mr-2 h-4 w-4" />
                        Presentation
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction('New Spreadsheet')}>
                        <PieChart className="mr-2 h-4 w-4" />
                        Spreadsheet
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleAction('Upload Media')}>
                    <Upload className="mr-2 h-4 w-4" />
                    <span>Upload Media</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAction('Organize Files')}>
                    <Archive className="mr-2 h-4 w-4" />
                    <span>Organize Files</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAction('Manage Tags')}>
                    <Bookmark className="mr-2 h-4 w-4" />
                    <span>Manage Tags</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </Card>

      {/* Context Menus */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <MoreVertical className="h-5 w-5 text-orange-500" />
            <div>
              <h3 className="text-xl font-semibold">Context Menus</h3>
              <p className="text-sm text-muted-foreground">
                Right-click style menus for specific item actions
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">User Profile Card</h4>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <div className="w-full h-full bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                        JD
                      </div>
                    </Avatar>
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-muted-foreground">Senior Developer</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleAction('View Profile')}>
                        <User className="mr-2 h-4 w-4" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction('Send Message')}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Send Message
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction('Start Video Call')}>
                        <Video className="mr-2 h-4 w-4" />
                        Video Call
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleAction('Add to Favorites')}>
                        <Star className="mr-2 h-4 w-4" />
                        Add to Favorites
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction('Block User')}>
                        <Shield className="mr-2 h-4 w-4" />
                        Block User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </Card>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Document Item</h4>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Project_Report.pdf</p>
                      <p className="text-sm text-muted-foreground">Updated 2 hours ago</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleAction('Open')}>
                        <Eye className="mr-2 h-4 w-4" />
                        Open
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction('Download')}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction('Share')}>
                        <Share className="mr-2 h-4 w-4" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleAction('Rename')}>
                        <Edit className="mr-2 h-4 w-4" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction('Move to Folder')}>
                        <Move className="mr-2 h-4 w-4" />
                        Move to Folder
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleAction('Delete')}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Card>

      {/* Real-World Use Cases */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Enterprise Use Cases</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-blue-500" />
                <h4 className="font-medium">Administration</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• User management and permissions</p>
                <p>• System configuration options</p>
                <p>• Bulk operations and batch processing</p>
                <p>• Audit logs and compliance tools</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-green-500" />
                <h4 className="font-medium">Productivity</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Quick action shortcuts</p>
                <p>• Context-sensitive operations</p>
                <p>• Workflow automation triggers</p>
                <p>• Smart suggestions and recommendations</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-purple-500" />
                <h4 className="font-medium">User Experience</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Personalized menu preferences</p>
                <p>• Adaptive interface layouts</p>
                <p>• Keyboard shortcut integration</p>
                <p>• Accessibility features</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-medium mb-2">Advanced Features</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
              <div>• Nested submenus</div>
              <div>• Checkbox states</div>
              <div>• Radio button groups</div>
              <div>• Keyboard shortcuts</div>
              <div>• Icon integration</div>
              <div>• Badge notifications</div>
              <div>• Conditional visibility</div>
              <div>• Touch-friendly design</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
