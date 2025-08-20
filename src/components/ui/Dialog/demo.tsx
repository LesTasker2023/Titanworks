'use client';

import {
  AlertTriangle,
  Briefcase,
  CheckCircle,
  CreditCard,
  Database,
  DollarSign,
  Download,
  Edit,
  Eye,
  EyeOff,
  FileText,
  Lock,
  MessageSquare,
  Plus,
  Save,
  Settings,
  Shield,
  Trash2,
  User,
  UserPlus,
} from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '.';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card } from '../Card';
import { Input } from '../Input';
import { Label } from '../Label';
import { Separator } from '../Separator';
import { Textarea } from '../Textarea';

export default function DialogDemo() {
  // Basic dialog states
  const [isControlledOpen, setIsControlledOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // User management states
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    role: 'Senior Developer',
    department: 'Engineering',
  });

  // Settings states
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: false,
    darkMode: true,
    autoSave: true,
  });

  // Financial states
  const [isBillingOpen, setIsBillingOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [billingInfo] = useState({
    plan: 'Enterprise',
    amount: '$299/month',
    nextBilling: '2024-02-15',
    paymentMethod: '•••• 4242',
  });

  // Document states
  const [isDocumentOpen, setIsDocumentOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [documentForm, setDocumentForm] = useState({
    title: '',
    description: '',
    category: 'General',
  });

  // Security states
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Feedback states
  const [feedback, setFeedback] = useState<string>('');

  const handleUserUpdate = () => {
    setFeedback('User profile updated successfully');
    setIsUserProfileOpen(false);
    setTimeout(() => setFeedback(''), 3000);
  };

  const handleSettingsUpdate = () => {
    setFeedback('Settings saved successfully');
    setIsSettingsOpen(false);
    setTimeout(() => setFeedback(''), 3000);
  };

  const handleDocumentCreate = () => {
    if (documentForm.title) {
      setFeedback(`Document "${documentForm.title}" created successfully`);
      setDocumentForm({ title: '', description: '', category: 'General' });
      setIsDocumentOpen(false);
      setTimeout(() => setFeedback(''), 3000);
    }
  };

  const handlePasswordUpdate = () => {
    if (securityForm.newPassword === securityForm.confirmPassword) {
      setFeedback('Password updated successfully');
      setSecurityForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setIsSecurityOpen(false);
      setTimeout(() => setFeedback(''), 3000);
    } else {
      setFeedback('Passwords do not match');
      setTimeout(() => setFeedback(''), 3000);
    }
  };

  const handleDelete = () => {
    setFeedback('Item deleted successfully');
    setIsConfirmOpen(false);
    setTimeout(() => setFeedback(''), 3000);
  };

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Dialog Component</h1>
        <p className="text-muted-foreground">
          Modal dialogs for user interactions, forms, and enterprise workflows
        </p>
      </div>

      {/* Feedback */}
      {feedback && (
        <Card className="p-4 bg-muted/50">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
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
          <p className="text-sm text-muted-foreground">
            Simple dialog patterns for common interactions
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Basic Dialog
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Basic Dialog</DialogTitle>
                  <DialogDescription>
                    This is a simple dialog with basic content and actions.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground">
                    Use basic dialogs for simple confirmations, information display, or quick
                    actions.
                  </p>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isControlledOpen} onOpenChange={setIsControlledOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Controlled Dialog
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Controlled Dialog</DialogTitle>
                  <DialogDescription>This dialog state is managed externally.</DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-3">
                  <p className="text-sm">
                    Dialog state: <Badge>{isControlledOpen ? 'Open' : 'Closed'}</Badge>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Controlled dialogs allow external state management for complex workflows.
                  </p>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsControlledOpen(false)}>
                    Close
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Confirmation
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    Confirm Deletion
                  </DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete the selected item.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Card className="p-4 bg-destructive/10 border-destructive/20">
                    <p className="text-sm font-medium">Item to be deleted:</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Project Report - Q4 2023.pdf
                    </p>
                  </Card>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleDelete}>
                    Delete Permanently
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Card>

      {/* User Management */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-blue-500" />
            <div>
              <h3 className="text-xl font-semibold">User Management</h3>
              <p className="text-sm text-muted-foreground">
                User profiles, registration, and account management
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Dialog open={isUserProfileOpen} onOpenChange={setIsUserProfileOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Edit User Profile</DialogTitle>
                  <DialogDescription>
                    Update user information and contact details.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={userData.name}
                        onChange={e => setUserData({ ...userData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input
                        id="role"
                        value={userData.role}
                        onChange={e => setUserData({ ...userData, role: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userData.email}
                        onChange={e => setUserData({ ...userData, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={userData.phone}
                        onChange={e => setUserData({ ...userData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={userData.department}
                      onChange={e => setUserData({ ...userData, department: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsUserProfileOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleUserUpdate}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isUserFormOpen} onOpenChange={setIsUserFormOpen}>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add New User
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                    Create a new user account with role assignments.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <Input placeholder="Enter first name" />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <Input placeholder="Enter last name" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input type="email" placeholder="user@company.com" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Role</Label>
                      <select className="w-full p-2 border rounded">
                        <option>Developer</option>
                        <option>Designer</option>
                        <option>Manager</option>
                        <option>Admin</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Department</Label>
                      <select className="w-full p-2 border rounded">
                        <option>Engineering</option>
                        <option>Design</option>
                        <option>Marketing</option>
                        <option>Sales</option>
                      </select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsUserFormOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsUserFormOpen(false)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create User
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Card>

      {/* Settings & Configuration */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Settings className="h-5 w-5 text-purple-500" />
            <div>
              <h3 className="text-xl font-semibold">Settings & Configuration</h3>
              <p className="text-sm text-muted-foreground">
                Application preferences and system configuration
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Application Settings
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Application Settings</DialogTitle>
                  <DialogDescription>
                    Configure your application preferences and notifications.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Push Notifications</Label>
                        <p className="text-xs text-muted-foreground">Receive updates and alerts</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.notifications}
                        onChange={e =>
                          setSettings({ ...settings, notifications: e.target.checked })
                        }
                        className="scale-125"
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Email Updates</Label>
                        <p className="text-xs text-muted-foreground">Weekly digest emails</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.emailUpdates}
                        onChange={e => setSettings({ ...settings, emailUpdates: e.target.checked })}
                        className="scale-125"
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Dark Mode</Label>
                        <p className="text-xs text-muted-foreground">Use dark theme</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.darkMode}
                        onChange={e => setSettings({ ...settings, darkMode: e.target.checked })}
                        className="scale-125"
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Auto Save</Label>
                        <p className="text-xs text-muted-foreground">Automatically save changes</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.autoSave}
                        onChange={e => setSettings({ ...settings, autoSave: e.target.checked })}
                        className="scale-125"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSettingsUpdate}>Save Settings</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isSecurityOpen} onOpenChange={setIsSecurityOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Shield className="h-4 w-4 mr-2" />
                  Security Settings
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Security Settings</DialogTitle>
                  <DialogDescription>
                    Update your password and security preferences.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Current Password</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        value={securityForm.currentPassword}
                        onChange={e =>
                          setSecurityForm({ ...securityForm, currentPassword: e.target.value })
                        }
                        placeholder="Enter current password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>New Password</Label>
                    <Input
                      type="password"
                      value={securityForm.newPassword}
                      onChange={e =>
                        setSecurityForm({ ...securityForm, newPassword: e.target.value })
                      }
                      placeholder="Enter new password"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Confirm New Password</Label>
                    <Input
                      type="password"
                      value={securityForm.confirmPassword}
                      onChange={e =>
                        setSecurityForm({ ...securityForm, confirmPassword: e.target.value })
                      }
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsSecurityOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handlePasswordUpdate}>
                    <Lock className="h-4 w-4 mr-2" />
                    Update Password
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Card>

      {/* Financial & Billing */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-green-500" />
            <div>
              <h3 className="text-xl font-semibold">Financial & Billing</h3>
              <p className="text-sm text-muted-foreground">
                Payment processing, billing information, and subscriptions
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Dialog open={isBillingOpen} onOpenChange={setIsBillingOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Billing Information
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Billing Information</DialogTitle>
                  <DialogDescription>
                    View and manage your subscription and billing details.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">Current Plan</Label>
                      <p className="font-medium">{billingInfo.plan}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Amount</Label>
                      <p className="font-medium">{billingInfo.amount}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">Next Billing</Label>
                      <p className="font-medium">{billingInfo.nextBilling}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Payment Method</Label>
                      <p className="font-medium">{billingInfo.paymentMethod}</p>
                    </div>
                  </div>

                  <Card className="p-3 bg-muted/30">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Account in good standing</span>
                    </div>
                  </Card>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsBillingOpen(false)}>
                    Close
                  </Button>
                  <Button>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Update Payment
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Process Payment
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Process Payment</DialogTitle>
                  <DialogDescription>
                    Enter payment details for invoice processing.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Card Number</Label>
                    <Input placeholder="1234 5678 9012 3456" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Expiry Date</Label>
                      <Input placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label>CVV</Label>
                      <Input placeholder="123" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Cardholder Name</Label>
                    <Input placeholder="John Doe" />
                  </div>

                  <div className="space-y-2">
                    <Label>Amount</Label>
                    <Input placeholder="$299.00" readOnly />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsPaymentOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsPaymentOpen(false)}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Process Payment
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Card>

      {/* Document Management */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-orange-500" />
            <div>
              <h3 className="text-xl font-semibold">Document Management</h3>
              <p className="text-sm text-muted-foreground">
                Document creation, reports, and file management
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Dialog open={isDocumentOpen} onOpenChange={setIsDocumentOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Document
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Document</DialogTitle>
                  <DialogDescription>
                    Create a new document with title and description.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Document Title</Label>
                    <Input
                      value={documentForm.title}
                      onChange={e => setDocumentForm({ ...documentForm, title: e.target.value })}
                      placeholder="Enter document title..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Category</Label>
                    <select
                      className="w-full p-2 border rounded"
                      value={documentForm.category}
                      onChange={e => setDocumentForm({ ...documentForm, category: e.target.value })}
                    >
                      <option value="General">General</option>
                      <option value="Reports">Reports</option>
                      <option value="Policies">Policies</option>
                      <option value="Procedures">Procedures</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={documentForm.description}
                      onChange={e =>
                        setDocumentForm({ ...documentForm, description: e.target.value })
                      }
                      placeholder="Enter document description..."
                      rows={4}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDocumentOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleDocumentCreate}>
                    <FileText className="h-4 w-4 mr-2" />
                    Create Document
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <Database className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Generate Report</DialogTitle>
                  <DialogDescription>
                    Configure and generate custom business reports.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Report Type</Label>
                      <select className="w-full p-2 border rounded">
                        <option>Sales Report</option>
                        <option>User Analytics</option>
                        <option>Financial Summary</option>
                        <option>Performance Metrics</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Date Range</Label>
                      <select className="w-full p-2 border rounded">
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                        <option>Last quarter</option>
                        <option>Custom range</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Report Format</Label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input type="radio" name="format" value="pdf" defaultChecked />
                        <span className="text-sm">PDF</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="format" value="excel" />
                        <span className="text-sm">Excel</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="format" value="csv" />
                        <span className="text-sm">CSV</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Include Sections</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">Executive Summary</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">Data Analysis</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" />
                        <span className="text-sm">Charts & Graphs</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" />
                        <span className="text-sm">Recommendations</span>
                      </label>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsReportOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsReportOpen(false)}>
                    <Download className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
                <Briefcase className="h-4 w-4 text-blue-500" />
                <h4 className="font-medium">Business Operations</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Employee onboarding forms</p>
                <p>• Performance review dialogs</p>
                <p>• Approval workflows</p>
                <p>• Resource allocation</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-green-500" />
                <h4 className="font-medium">Data Management</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Record creation/editing</p>
                <p>• Bulk operations confirmation</p>
                <p>• Data import/export</p>
                <p>• Configuration management</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-purple-500" />
                <h4 className="font-medium">Security & Compliance</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Access control forms</p>
                <p>• Audit trail confirmations</p>
                <p>• Security settings</p>
                <p>• Compliance reporting</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-medium mb-2">Advanced Features</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
              <div>• Form validation</div>
              <div>• Multi-step wizards</div>
              <div>• Conditional content</div>
              <div>• File upload support</div>
              <div>• Auto-save drafts</div>
              <div>• Keyboard navigation</div>
              <div>• Screen reader support</div>
              <div>• Mobile responsive</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
