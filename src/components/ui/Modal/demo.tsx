'use client';

import {
  AlertTriangle,
  Bell,
  Building,
  Calendar,
  CheckCircle,
  Clock,
  Code,
  Copy,
  Database,
  Download,
  Edit,
  ExternalLink,
  Eye,
  Filter,
  Info,
  Mail,
  MapPin,
  Plus,
  Save,
  Search,
  Send,
  Settings,
  Share,
  Shield,
  Star,
  Trash,
  User,
  Zap,
} from 'lucide-react';
import React, { useState } from 'react';
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '.';
import { Alert, AlertDescription } from '../Alert';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card } from '../Card';
import { Checkbox } from '../Checkbox';
import { Input } from '../Input';
import { Label } from '../Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../Select';
import { Textarea } from '../Textarea';

export default function ModalDemo() {
  const [basicModal, setBasicModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);
  const [dataModal, setDataModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [secondNestedModal, setSecondNestedModal] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    priority: '',
    category: '',
    attachFile: false,
  });

  // Settings state
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: false,
    darkMode: false,
    autoSave: true,
    showTips: true,
  });

  // Data for various modals
  const [actionHistory, setActionHistory] = useState([
    { action: 'Modal opened', time: new Date().toLocaleTimeString() },
  ]);

  const addToHistory = (action: string) => {
    setActionHistory(prev => [
      { action, time: new Date().toLocaleTimeString() },
      ...prev.slice(0, 4),
    ]);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToHistory(`Form submitted: ${formData.name}`);
    setFormModal(false);
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      message: '',
      priority: '',
      category: '',
      attachFile: false,
    });
  };

  const handleDelete = () => {
    addToHistory('Delete action confirmed');
    setConfirmModal(false);
  };

  const handleSettingsSave = () => {
    addToHistory('Settings saved');
    setSettingsModal(false);
  };

  const sampleUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Inactive' },
  ];

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Modal Component</h1>
        <p className="text-muted-foreground">
          Professional modal overlays with advanced features and flexible composition
        </p>
      </div>

      {/* Action History */}
      {actionHistory.length > 1 && (
        <Card className="p-4 bg-muted/50">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">Recent Actions:</span>
            <div className="flex gap-2">
              {actionHistory.slice(0, 3).map((item, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {item.action} ({item.time})
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Basic Modal Examples */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Basic Modal Types</h3>
          <p className="text-sm text-muted-foreground">
            Simple modal variations with different content and purposes
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button onClick={() => setBasicModal(true)} variant="outline">
              <Info className="mr-2 h-4 w-4" />
              Basic Modal
            </Button>

            <Button onClick={() => setConfirmModal(true)} variant="outline">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Confirmation
            </Button>

            <Button onClick={() => setNotificationModal(true)} variant="outline">
              <Bell className="mr-2 h-4 w-4" />
              Notification
            </Button>

            <Button onClick={() => setProfileModal(true)} variant="outline">
              <User className="mr-2 h-4 w-4" />
              User Profile
            </Button>
          </div>

          {/* Basic Information Modal */}
          <Modal isOpen={basicModal} onClose={() => setBasicModal(false)} size="md">
            <ModalHeader>
              <ModalTitle>Welcome to Our Platform</ModalTitle>
              <ModalCloseButton onClose={() => setBasicModal(false)} />
            </ModalHeader>
            <ModalContent>
              <ModalDescription className="mb-4">
                Thank you for joining our platform! Here&apos;s what you can expect from our
                service.
              </ModalDescription>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Access to all premium features</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>24/7 customer support</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Regular feature updates</span>
                </div>
              </div>
            </ModalContent>
            <ModalFooter>
              <Button onClick={() => setBasicModal(false)}>Got it, thanks!</Button>
            </ModalFooter>
          </Modal>

          {/* Confirmation Modal */}
          <Modal isOpen={confirmModal} onClose={() => setConfirmModal(false)} size="sm">
            <ModalHeader>
              <ModalTitle className="text-red-600">Confirm Deletion</ModalTitle>
              <ModalCloseButton onClose={() => setConfirmModal(false)} />
            </ModalHeader>
            <ModalContent>
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-12 w-12 text-red-500" />
                <div>
                  <p className="font-medium">This action cannot be undone</p>
                  <p className="text-sm text-muted-foreground">
                    Are you sure you want to delete this item? All associated data will be
                    permanently removed.
                  </p>
                </div>
              </div>
            </ModalContent>
            <ModalFooter>
              <Button variant="outline" onClick={() => setConfirmModal(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </ModalFooter>
          </Modal>

          {/* Notification Modal */}
          <Modal isOpen={notificationModal} onClose={() => setNotificationModal(false)} size="md">
            <ModalHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-blue-500" />
                <ModalTitle>System Notification</ModalTitle>
              </div>
              <ModalCloseButton onClose={() => setNotificationModal(false)} />
            </ModalHeader>
            <ModalContent>
              <Alert className="mb-4">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Your account has been successfully upgraded to Premium. You now have access to all
                  advanced features.
                </AlertDescription>
              </Alert>
              <div className="space-y-3">
                <h4 className="font-medium">New Features Available:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    Advanced analytics dashboard
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-blue-500" />
                    Priority support access
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    Enhanced security features
                  </li>
                </ul>
              </div>
            </ModalContent>
            <ModalFooter>
              <Button onClick={() => setNotificationModal(false)}>Explore Features</Button>
            </ModalFooter>
          </Modal>

          {/* User Profile Modal */}
          <Modal isOpen={profileModal} onClose={() => setProfileModal(false)} size="lg">
            <ModalHeader>
              <ModalTitle>User Profile</ModalTitle>
              <ModalCloseButton onClose={() => setProfileModal(false)} />
            </ModalHeader>
            <ModalContent>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-xl">
                    JD
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">John Doe</h3>
                    <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                    <Badge variant="outline" className="mt-1">
                      Premium User
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Company
                    </h4>
                    <p className="text-sm text-muted-foreground">Acme Corporation</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Location
                    </h4>
                    <p className="text-sm text-muted-foreground">San Francisco, CA</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Joined
                    </h4>
                    <p className="text-sm text-muted-foreground">January 2024</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Last Active
                    </h4>
                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              </div>
            </ModalContent>
            <ModalFooter>
              <Button variant="outline" onClick={() => setProfileModal(false)}>
                Close
              </Button>
              <Button>
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </Card>

      {/* Advanced Modal Examples */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Advanced Modal Features</h3>
          <p className="text-sm text-muted-foreground">
            Complex modals with forms, data displays, and interactive content
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button onClick={() => setFormModal(true)} variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Contact Form
            </Button>

            <Button onClick={() => setSettingsModal(true)} variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Settings Panel
            </Button>

            <Button onClick={() => setDataModal(true)} variant="outline">
              <Database className="mr-2 h-4 w-4" />
              Data Browser
            </Button>

            <Button onClick={() => setNestedModal(true)} variant="outline">
              <Share className="mr-2 h-4 w-4" />
              Nested Modals
            </Button>
          </div>

          {/* Contact Form Modal */}
          <Modal isOpen={formModal} onClose={() => setFormModal(false)} size="lg">
            <ModalHeader>
              <ModalTitle>Contact Support</ModalTitle>
              <ModalDescription>
                Send us a message and we&apos;ll get back to you as soon as possible.
              </ModalDescription>
              <ModalCloseButton onClose={() => setFormModal(false)} />
            </ModalHeader>
            <form onSubmit={handleFormSubmit}>
              <ModalContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      placeholder="Your company name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority Level</Label>
                      <Select
                        value={formData.priority}
                        onValueChange={value => setFormData(prev => ({ ...prev, priority: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={value => setFormData(prev => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="billing">Billing Question</SelectItem>
                          <SelectItem value="feature">Feature Request</SelectItem>
                          <SelectItem value="bug">Bug Report</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Describe your issue or question in detail..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="attach"
                      checked={formData.attachFile}
                      onCheckedChange={checked =>
                        setFormData(prev => ({ ...prev, attachFile: !!checked }))
                      }
                    />
                    <Label htmlFor="attach" className="text-sm">
                      I would like to attach files (screenshots, logs, etc.)
                    </Label>
                  </div>
                </div>
              </ModalContent>
              <ModalFooter>
                <Button type="button" variant="outline" onClick={() => setFormModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </ModalFooter>
            </form>
          </Modal>

          {/* Settings Modal */}
          <Modal isOpen={settingsModal} onClose={() => setSettingsModal(false)} size="2xl">
            <ModalHeader>
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                <ModalTitle>Application Settings</ModalTitle>
              </div>
              <ModalCloseButton onClose={() => setSettingsModal(false)} />
            </ModalHeader>
            <ModalContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    Notifications
                  </h4>
                  <div className="space-y-3 pl-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notifications">Push Notifications</Label>
                        <p className="text-xs text-muted-foreground">
                          Receive notifications about important updates
                        </p>
                      </div>
                      <Checkbox
                        id="notifications"
                        checked={settings.notifications}
                        onCheckedChange={checked =>
                          setSettings(prev => ({ ...prev, notifications: !!checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-updates">Email Updates</Label>
                        <p className="text-xs text-muted-foreground">Get weekly digest emails</p>
                      </div>
                      <Checkbox
                        id="email-updates"
                        checked={settings.emailUpdates}
                        onCheckedChange={checked =>
                          setSettings(prev => ({ ...prev, emailUpdates: !!checked }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Appearance
                  </h4>
                  <div className="space-y-3 pl-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="dark-mode">Dark Mode</Label>
                        <p className="text-xs text-muted-foreground">Use dark color scheme</p>
                      </div>
                      <Checkbox
                        id="dark-mode"
                        checked={settings.darkMode}
                        onCheckedChange={checked =>
                          setSettings(prev => ({ ...prev, darkMode: !!checked }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Productivity
                  </h4>
                  <div className="space-y-3 pl-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="auto-save">Auto-save</Label>
                        <p className="text-xs text-muted-foreground">Automatically save changes</p>
                      </div>
                      <Checkbox
                        id="auto-save"
                        checked={settings.autoSave}
                        onCheckedChange={checked =>
                          setSettings(prev => ({ ...prev, autoSave: !!checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="show-tips">Show Tips</Label>
                        <p className="text-xs text-muted-foreground">
                          Display helpful tips and shortcuts
                        </p>
                      </div>
                      <Checkbox
                        id="show-tips"
                        checked={settings.showTips}
                        onCheckedChange={checked =>
                          setSettings(prev => ({ ...prev, showTips: !!checked }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </ModalContent>
            <ModalFooter>
              <Button variant="outline" onClick={() => setSettingsModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSettingsSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </ModalFooter>
          </Modal>

          {/* Data Browser Modal */}
          <Modal isOpen={dataModal} onClose={() => setDataModal(false)} size="4xl">
            <ModalHeader>
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                <ModalTitle>User Database</ModalTitle>
              </div>
              <ModalCloseButton onClose={() => setDataModal(false)} />
            </ModalHeader>
            <ModalContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-9" placeholder="Search users..." />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add User
                  </Button>
                </div>

                <div className="border rounded-lg">
                  <div className="grid grid-cols-4 gap-4 p-3 bg-muted font-medium text-sm">
                    <div>Name</div>
                    <div>Email</div>
                    <div>Role</div>
                    <div>Status</div>
                  </div>
                  <div className="divide-y">
                    {sampleUsers.map(user => (
                      <div
                        key={user.id}
                        className="grid grid-cols-4 gap-4 p-3 text-sm hover:bg-muted/50 cursor-pointer"
                      >
                        <div className="font-medium">{user.name}</div>
                        <div className="text-muted-foreground">{user.email}</div>
                        <div>
                          <Badge variant="outline">{user.role}</Badge>
                        </div>
                        <div>
                          <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                            {user.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div>Showing 3 of 156 users</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </ModalContent>
            <ModalFooter>
              <Button variant="outline" onClick={() => setDataModal(false)}>
                Close
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
            </ModalFooter>
          </Modal>

          {/* Nested Modal */}
          <Modal isOpen={nestedModal} onClose={() => setNestedModal(false)} size="lg">
            <ModalHeader>
              <ModalTitle>Share Content</ModalTitle>
              <ModalCloseButton onClose={() => setNestedModal(false)} />
            </ModalHeader>
            <ModalContent>
              <div className="space-y-4">
                <p>Choose how you&apos;d like to share this content:</p>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex-col">
                    <Mail className="h-6 w-6 mb-2" />
                    Email
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Copy className="h-6 w-6 mb-2" />
                    Copy Link
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <ExternalLink className="h-6 w-6 mb-2" />
                    External Share
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col"
                    onClick={() => setSecondNestedModal(true)}
                  >
                    <Settings className="h-6 w-6 mb-2" />
                    Advanced Options
                  </Button>
                </div>
              </div>
            </ModalContent>
            <ModalFooter>
              <Button variant="outline" onClick={() => setNestedModal(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>

          {/* Second Nested Modal */}
          <Modal isOpen={secondNestedModal} onClose={() => setSecondNestedModal(false)} size="md">
            <ModalHeader>
              <ModalTitle>Advanced Sharing Options</ModalTitle>
              <ModalCloseButton onClose={() => setSecondNestedModal(false)} />
            </ModalHeader>
            <ModalContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Expiration</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select expiration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1hour">1 Hour</SelectItem>
                      <SelectItem value="1day">1 Day</SelectItem>
                      <SelectItem value="1week">1 Week</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Access Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select access level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="view">View Only</SelectItem>
                      <SelectItem value="edit">Can Edit</SelectItem>
                      <SelectItem value="admin">Full Access</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="require-password" />
                  <Label htmlFor="require-password">Require password</Label>
                </div>
              </div>
            </ModalContent>
            <ModalFooter>
              <Button variant="outline" onClick={() => setSecondNestedModal(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setSecondNestedModal(false);
                  addToHistory('Advanced sharing options configured');
                }}
              >
                Apply Settings
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </Card>

      {/* Modal Size Variants */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Modal Sizes & Animations</h3>
          <p className="text-sm text-muted-foreground">
            Different modal sizes and animation options
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Sizes Available:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• sm (384px)</li>
                <li>• md (448px)</li>
                <li>• lg (512px)</li>
                <li>• xl (576px)</li>
                <li>• 2xl (672px)</li>
                <li>• 3xl (768px)</li>
                <li>• 4xl (896px)</li>
                <li>• full (95vw)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Animation Options:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• default (200ms)</li>
                <li>• fast (100ms)</li>
                <li>• slow (300ms)</li>
                <li>• none</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Padding Variants:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• none (0px)</li>
                <li>• sm (16px)</li>
                <li>• md (24px)</li>
                <li>• lg (32px)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Behavior Options:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• closeOnOverlayClick</li>
                <li>• closeOnEscape</li>
                <li>• preventScroll</li>
                <li>• portal rendering</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* Best Practices */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Modal Best Practices</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <h4 className="font-medium">User Experience</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Use clear, descriptive titles</p>
                <p>• Provide easy close options</p>
                <p>• Keep content focused and concise</p>
                <p>• Use appropriate modal sizes</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-500" />
                <h4 className="font-medium">Accessibility</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Proper ARIA labels and roles</p>
                <p>• Keyboard navigation support</p>
                <p>• Focus management</p>
                <p>• Screen reader compatibility</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4 text-purple-500" />
                <h4 className="font-medium">Implementation</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Use portal rendering for z-index</p>
                <p>• Handle escape key properly</p>
                <p>• Prevent body scroll when open</p>
                <p>• Compose with sub-components</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
