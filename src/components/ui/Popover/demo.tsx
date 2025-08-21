'use client';

import {
  Bell,
  Calendar,
  Clock,
  Copy,
  Download,
  Edit,
  Eye,
  FileText,
  Filter,
  HelpCircle,
  Image,
  Info,
  Linkedin,
  Lock,
  Mail,
  MessageSquare,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Send,
  Settings,
  Share,
  Shield,
  Target,
  Twitter,
  Upload,
  User,
  Users,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '.';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card } from '../Card';
import { Checkbox } from '../Checkbox';
import { Input } from '../Input';
import { Label } from '../Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../Select';
import { Separator } from '../Separator';
import { Switch } from '../Switch';
import { Textarea } from '../Textarea';

export default function PopoverDemo() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [username, setUsername] = useState('johndoe');
  const [email, setEmail] = useState('john@example.com');
  const [bio, setBio] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [recentActions, setRecentActions] = useState<string[]>([]);

  const addRecentAction = (action: string) => {
    setRecentActions(prev => [action, ...prev.slice(0, 4)]);
  };

  const colorPalette = [
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Green', value: '#10B981' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Orange', value: '#F59E0B' },
    { name: 'Pink', value: '#EC4899' },
  ];

  const teamMembers = [
    { id: 1, name: 'Alice Johnson', role: 'Designer', avatar: 'AJ', status: 'online' },
    { id: 2, name: 'Bob Smith', role: 'Developer', avatar: 'BS', status: 'away' },
    { id: 3, name: 'Carol Davis', role: 'Manager', avatar: 'CD', status: 'busy' },
    { id: 4, name: 'David Wilson', role: 'Developer', avatar: 'DW', status: 'offline' },
  ];

  const notifications_list = [
    {
      id: 1,
      type: 'mention',
      message: 'Alice mentioned you in a comment',
      time: '2 min ago',
      read: false,
    },
    {
      id: 2,
      type: 'task',
      message: 'Task "Review design" was assigned to you',
      time: '1 hour ago',
      read: false,
    },
    {
      id: 3,
      type: 'update',
      message: 'Project timeline has been updated',
      time: '3 hours ago',
      read: true,
    },
    { id: 4, type: 'comment', message: 'New comment on your post', time: '1 day ago', read: true },
  ];

  const quickActions = [
    { icon: FileText, label: 'New Document', action: 'Create Document' },
    { icon: Users, label: 'Invite Team', action: 'Invite Members' },
    { icon: Calendar, label: 'Schedule Meeting', action: 'Schedule Event' },
    { icon: Upload, label: 'Upload File', action: 'File Upload' },
  ];

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Popover Component</h1>
        <p className="text-muted-foreground">
          Click-triggered content overlays with rich interactive content and smart positioning
        </p>
      </div>

      {/* Recent Actions */}
      {recentActions.length > 0 && (
        <Card className="p-4 bg-muted/50">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">Recent Popover Actions:</span>
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

      {/* Basic Popover Examples */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Basic Popover Types</h3>
            <p className="text-sm text-muted-foreground">
              Simple popover variations with different content types
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" onClick={() => addRecentAction('Info Popover')}>
                  <Info className="mr-2 h-4 w-4" />
                  Info
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-500" />
                    <h4 className="font-semibold">Information</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This is an informational popover that provides additional context or help text
                    to users.
                  </p>
                  <div className="flex justify-end">
                    <Button size="sm">Got it</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" onClick={() => addRecentAction('Quick Actions')}>
                  <Zap className="mr-2 h-4 w-4" />
                  Actions
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-60">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Quick Actions</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action, index) => {
                      const Icon = action.icon;
                      return (
                        <Button
                          key={index}
                          variant="ghost"
                          size="sm"
                          className="h-16 flex-col gap-1"
                          onClick={() => addRecentAction(action.action)}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="text-xs">{action.label}</span>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" onClick={() => addRecentAction('Share Options')}>
                  <Share className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-semibold">Share this item</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Input placeholder="Enter email address" className="flex-1" />
                      <Button size="sm">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Link
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                    <div className="flex gap-2 pt-2 border-t">
                      <Button variant="ghost" size="sm">
                        <Twitter className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" onClick={() => addRecentAction('Profile Menu')}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full w-full rounded-full flex items-center justify-center text-white font-semibold">
                        JD
                      </div>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">John Doe</h4>
                      <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                      <Badge variant="secondary" className="text-xs mt-1">
                        Premium User
                      </Badge>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start">
                      <User className="mr-2 h-4 w-4" />
                      Profile Settings
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Preferences
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Help & Support
                    </Button>
                    <Separator />
                    <Button variant="ghost" className="w-full justify-start text-red-600">
                      <Lock className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </Card>

      {/* Advanced Interactive Popovers */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Advanced Interactive Popovers</h3>
            <p className="text-sm text-muted-foreground">
              Complex forms, settings panels, and multi-step interactions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Settings Popover */}
            <div className="space-y-4">
              <h4 className="font-medium">Settings Panel</h4>
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="w-full" onClick={() => addRecentAction('Settings Panel')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Application Settings
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Preferences</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="notifications">Notifications</Label>
                          <p className="text-xs text-muted-foreground">
                            Receive push notifications
                          </p>
                        </div>
                        <Switch
                          id="notifications"
                          checked={notifications}
                          onCheckedChange={setNotifications}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="dark-mode">Dark Mode</Label>
                          <p className="text-xs text-muted-foreground">Use dark color scheme</p>
                        </div>
                        <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="auto-save">Auto-save</Label>
                          <p className="text-xs text-muted-foreground">
                            Automatically save changes
                          </p>
                        </div>
                        <Switch id="auto-save" checked={autoSave} onCheckedChange={setAutoSave} />
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">
                        Reset
                      </Button>
                      <Button size="sm" onClick={() => addRecentAction('Settings Saved')}>
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Color Picker Popover */}
            <div className="space-y-4">
              <h4 className="font-medium">Color Picker</h4>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => addRecentAction('Color Picker')}
                  >
                    <div
                      className="w-4 h-4 rounded mr-2"
                      style={{ backgroundColor: selectedColor }}
                    />
                    Choose Color
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Select Color</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {colorPalette.map((color, index) => (
                        <button
                          key={index}
                          className="aspect-square rounded-md border-2 hover:scale-110 transition-transform"
                          style={{
                            backgroundColor: color.value,
                            borderColor: selectedColor === color.value ? '#000' : 'transparent',
                          }}
                          onClick={() => {
                            setSelectedColor(color.value);
                            addRecentAction(`Selected ${color.name}`);
                          }}
                          title={color.name}
                        />
                      ))}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="custom-color">Custom Color</Label>
                      <Input
                        id="custom-color"
                        type="color"
                        value={selectedColor}
                        onChange={e => setSelectedColor(e.target.value)}
                        className="h-10"
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">Selected: {selectedColor}</div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Profile Edit Popover */}
            <div className="space-y-4">
              <h4 className="font-medium">Quick Edit Profile</h4>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => addRecentAction('Profile Edit')}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Edit Profile</h4>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          value={username}
                          onChange={e => setUsername(e.target.value)}
                          placeholder="Enter username"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="Enter email"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={bio}
                          onChange={e => setBio(e.target.value)}
                          placeholder="Tell us about yourself..."
                          rows={3}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        Cancel
                      </Button>
                      <Button size="sm" onClick={() => addRecentAction('Profile Updated')}>
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </Card>

      {/* Context-Specific Popovers */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Context-Specific Popovers</h3>
            <p className="text-sm text-muted-foreground">
              Popovers tailored for specific use cases and workflows
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Notifications Popover */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications Center
              </h4>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="relative"
                    onClick={() => addRecentAction('Notifications')}
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs">
                      {notifications_list.filter(n => !n.read).length}
                    </Badge>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-96">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Notifications</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addRecentAction('Mark All Read')}
                      >
                        Mark all read
                      </Button>
                    </div>
                    <div className="space-y-2 max-h-80 overflow-auto">
                      {notifications_list.map(notification => (
                        <div
                          key={notification.id}
                          className={`p-3 rounded-md border ${
                            notification.read ? 'bg-muted/50' : 'bg-background'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-2 h-2 rounded-full mt-2 ${
                                notification.read ? 'bg-muted' : 'bg-blue-500'
                              }`}
                            />
                            <div className="flex-1">
                              <p className="text-sm">{notification.message}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Separator />
                    <Button variant="outline" className="w-full">
                      View All Notifications
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Team Members Popover */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Users className="h-4 w-4" />
                Team Directory
              </h4>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" onClick={() => addRecentAction('Team Directory')}>
                    <Users className="mr-2 h-4 w-4" />
                    View Team ({teamMembers.length})
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Team Members</h4>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Invite
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {teamMembers.map(member => (
                        <div
                          key={member.id}
                          className="flex items-center gap-3 p-2 rounded-md hover:bg-muted"
                        >
                          <div className="relative">
                            <Avatar className="h-8 w-8">
                              <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-full w-full rounded-full flex items-center justify-center text-white text-xs font-medium">
                                {member.avatar}
                              </div>
                            </Avatar>
                            <div
                              className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${
                                member.status === 'online'
                                  ? 'bg-green-500'
                                  : member.status === 'away'
                                    ? 'bg-yellow-500'
                                    : member.status === 'busy'
                                      ? 'bg-red-500'
                                      : 'bg-gray-500'
                              }`}
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.role}</p>
                          </div>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-48" side="left">
                              <div className="space-y-1">
                                <Button variant="ghost" size="sm" className="w-full justify-start">
                                  <MessageSquare className="mr-2 h-4 w-4" />
                                  Send Message
                                </Button>
                                <Button variant="ghost" size="sm" className="w-full justify-start">
                                  <Phone className="mr-2 h-4 w-4" />
                                  Call
                                </Button>
                                <Button variant="ghost" size="sm" className="w-full justify-start">
                                  <User className="mr-2 h-4 w-4" />
                                  View Profile
                                </Button>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </Card>

      {/* Filter and Search Popovers */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Filter & Search Popovers</h3>
            <p className="text-sm text-muted-foreground">
              Advanced filtering and search interfaces
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Advanced Filter Popover */}
            <div className="space-y-4">
              <h4 className="font-medium">Advanced Filters</h4>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" onClick={() => addRecentAction('Advanced Filters')}>
                    <Filter className="mr-2 h-4 w-4" />
                    Advanced Filters
                    {filterStatus !== 'all' && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        1
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Filter Options</h4>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label>Status</Label>
                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Items</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Tags</Label>
                        <Select value={selectedTag} onValueChange={setSelectedTag}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select tag" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="urgent">Urgent</SelectItem>
                            <SelectItem value="important">Important</SelectItem>
                            <SelectItem value="low-priority">Low Priority</SelectItem>
                            <SelectItem value="review">Under Review</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Date Range</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <Input type="date" className="text-xs" />
                          <Input type="date" className="text-xs" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Quick Filters</Label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="my-items" />
                            <Label htmlFor="my-items" className="text-sm">
                              My Items Only
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="favorites" />
                            <Label htmlFor="favorites" className="text-sm">
                              Favorites
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="recent" />
                            <Label htmlFor="recent" className="text-sm">
                              Recently Modified
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setFilterStatus('all');
                          setSelectedTag('');
                          addRecentAction('Filters Cleared');
                        }}
                      >
                        Clear All
                      </Button>
                      <Button size="sm" onClick={() => addRecentAction('Filters Applied')}>
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Smart Search Popover */}
            <div className="space-y-4">
              <h4 className="font-medium">Smart Search</h4>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" onClick={() => addRecentAction('Smart Search')}>
                    <Search className="mr-2 h-4 w-4" />
                    Search Everything
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-96">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search projects, files, people..." className="pl-9" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h5 className="text-sm font-medium text-muted-foreground mb-2">
                          Recent Searches
                        </h5>
                        <div className="space-y-1">
                          {['project timeline', 'team meeting notes', 'budget report'].map(
                            (search, index) => (
                              <Button
                                key={index}
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start"
                              >
                                <Clock className="mr-2 h-4 w-4" />
                                {search}
                              </Button>
                            )
                          )}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h5 className="text-sm font-medium text-muted-foreground mb-2">
                          Quick Filters
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                            <FileText className="mr-1 h-3 w-3" />
                            Documents
                          </Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                            <Users className="mr-1 h-3 w-3" />
                            People
                          </Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                            <Calendar className="mr-1 h-3 w-3" />
                            Events
                          </Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                            <Image className="mr-1 h-3 w-3" />
                            Media
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Use quotes for exact matches, + for required terms
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </Card>

      {/* Popover Positioning Examples */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Positioning & Alignment</h3>
            <p className="text-sm text-muted-foreground">
              Different popover positions and alignment options
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Top</Button>
              </PopoverTrigger>
              <PopoverContent side="top" className="w-60">
                <div className="text-center">
                  <p className="text-sm">Popover positioned above</p>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Right</Button>
              </PopoverTrigger>
              <PopoverContent side="right" className="w-60">
                <div className="text-center">
                  <p className="text-sm">Popover positioned to the right</p>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Bottom</Button>
              </PopoverTrigger>
              <PopoverContent side="bottom" className="w-60">
                <div className="text-center">
                  <p className="text-sm">Popover positioned below</p>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Left</Button>
              </PopoverTrigger>
              <PopoverContent side="left" className="w-60">
                <div className="text-center">
                  <p className="text-sm">Popover positioned to the left</p>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Align Start</Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-60">
                <div className="text-sm">Aligned to start of trigger</div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Align Center</Button>
              </PopoverTrigger>
              <PopoverContent align="center" className="w-60">
                <div className="text-sm">Centered with trigger</div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Align End</Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-60">
                <div className="text-sm">Aligned to end of trigger</div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </Card>

      {/* Best Practices */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Popover Best Practices</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-500" />
                <h4 className="font-medium">Content Strategy</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Keep content focused and actionable</p>
                <p>• Use clear headings and sections</p>
                <p>• Provide escape routes (close buttons)</p>
                <p>• Avoid nesting too many popovers</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-green-500" />
                <h4 className="font-medium">User Experience</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Smart positioning and collision detection</p>
                <p>• Consistent trigger patterns</p>
                <p>• Appropriate sizing for content</p>
                <p>• Clear visual hierarchy</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-purple-500" />
                <h4 className="font-medium">Accessibility</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Keyboard navigation support</p>
                <p>• Focus management and trapping</p>
                <p>• ARIA labels and descriptions</p>
                <p>• Screen reader announcements</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
