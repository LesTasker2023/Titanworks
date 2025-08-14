import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';
import Tabs from './tabs';
import './Tabs.scss';

const meta: Meta<typeof Tabs> = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Enhanced Radix UI Tabs with size variants, loading states, badge indicators, and smooth animations.',
      },
    },
  },
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'The default active tab value',
    },
    value: {
      control: 'text',
      description: 'Controlled active tab value',
    },
    onValueChange: {
      action: 'value-changed',
      description: 'Callback when tab value changes',
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Tab orientation',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// Default tabs
export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <Tabs.List className="grid w-full grid-cols-2">
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="password">Password</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="account" className="mt-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Account Settings</h3>
          <p className="text-sm text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
      </Tabs.Content>
      <Tabs.Content value="password" className="mt-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Password Settings</h3>
          <p className="text-sm text-muted-foreground">
            Change your password and security settings.
          </p>
        </div>
      </Tabs.Content>
    </Tabs>
  ),
};

// All sizes demonstration
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-semibold mb-4">Small Tabs</h3>
        <Tabs defaultValue="tab1" className="w-[300px]">
          <Tabs.List className="grid w-full grid-cols-3 h-8">
            <Tabs.Trigger value="tab1" className="text-xs px-2">
              Tab 1
            </Tabs.Trigger>
            <Tabs.Trigger value="tab2" className="text-xs px-2">
              Tab 2
            </Tabs.Trigger>
            <Tabs.Trigger value="tab3" className="text-xs px-2">
              Tab 3
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1" className="mt-2 p-3 border rounded text-sm">
            Small tab content
          </Tabs.Content>
          <Tabs.Content value="tab2" className="mt-2 p-3 border rounded text-sm">
            Small tab content 2
          </Tabs.Content>
          <Tabs.Content value="tab3" className="mt-2 p-3 border rounded text-sm">
            Small tab content 3
          </Tabs.Content>
        </Tabs>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Default Tabs</h3>
        <Tabs defaultValue="tab1" className="w-[400px]">
          <Tabs.List className="grid w-full grid-cols-3">
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
            <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1" className="mt-4 p-4 border rounded">
            Default tab content
          </Tabs.Content>
          <Tabs.Content value="tab2" className="mt-4 p-4 border rounded">
            Default tab content 2
          </Tabs.Content>
          <Tabs.Content value="tab3" className="mt-4 p-4 border rounded">
            Default tab content 3
          </Tabs.Content>
        </Tabs>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Large Tabs</h3>
        <Tabs defaultValue="tab1" className="w-[500px]">
          <Tabs.List className="grid w-full grid-cols-3 h-12">
            <Tabs.Trigger value="tab1" className="text-lg px-6">
              Tab 1
            </Tabs.Trigger>
            <Tabs.Trigger value="tab2" className="text-lg px-6">
              Tab 2
            </Tabs.Trigger>
            <Tabs.Trigger value="tab3" className="text-lg px-6">
              Tab 3
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1" className="mt-6 p-6 border rounded">
            <h4 className="text-lg font-semibold mb-2">Large Tab Content</h4>
            <p>This is larger tab content with more spacing.</p>
          </Tabs.Content>
          <Tabs.Content value="tab2" className="mt-6 p-6 border rounded">
            <h4 className="text-lg font-semibold mb-2">Large Tab Content 2</h4>
            <p>This is larger tab content with more spacing.</p>
          </Tabs.Content>
          <Tabs.Content value="tab3" className="mt-6 p-6 border rounded">
            <h4 className="text-lg font-semibold mb-2">Large Tab Content 3</h4>
            <p>This is larger tab content with more spacing.</p>
          </Tabs.Content>
        </Tabs>
      </div>
    </div>
  ),
};

// Vertical orientation
export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="account" orientation="vertical" className="flex w-[600px] tabs--vertical">
      <Tabs.List className="flex-col h-auto w-[200px] tabs__list">
        <Tabs.Trigger value="account" className="w-full justify-start tabs__trigger">
          Account
        </Tabs.Trigger>
        <Tabs.Trigger value="password" className="w-full justify-start tabs__trigger">
          Password
        </Tabs.Trigger>
        <Tabs.Trigger value="notifications" className="w-full justify-start tabs__trigger">
          Notifications
        </Tabs.Trigger>
        <Tabs.Trigger value="billing" className="w-full justify-start tabs__trigger">
          Billing
        </Tabs.Trigger>
      </Tabs.List>
      <div className="flex-1 ml-4">
        <Tabs.Content value="account" className="tabs__content">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Account Settings</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Manage your account settings and preferences.
            </p>
            <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm">
              Save Changes
            </button>
          </div>
        </Tabs.Content>
        <Tabs.Content value="password" className="tabs__content">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Password Settings</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Change your password and security settings.
            </p>
            <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm">
              Update Password
            </button>
          </div>
        </Tabs.Content>
        <Tabs.Content value="notifications" className="tabs__content">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Notification Settings</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Configure your notification preferences.
            </p>
            <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm">
              Save Preferences
            </button>
          </div>
        </Tabs.Content>
        <Tabs.Content value="billing" className="tabs__content">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Billing Information</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Manage your billing and subscription details.
            </p>
            <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm">
              Update Billing
            </button>
          </div>
        </Tabs.Content>
      </div>
    </Tabs>
  ),
};

// Enhanced features with badges and loading
export const EnhancedFeatures: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-semibold mb-4">Tabs with Badge Indicators</h3>
        <Tabs defaultValue="messages" className="w-[500px]">
          <Tabs.List className="grid w-full grid-cols-3">
            <Tabs.Trigger
              value="messages"
              className="tabs__trigger tabs__trigger--badge relative"
              data-badge="3"
            >
              Messages
            </Tabs.Trigger>
            <Tabs.Trigger
              value="notifications"
              className="tabs__trigger tabs__trigger--badge relative"
              data-badge="12"
            >
              Notifications
            </Tabs.Trigger>
            <Tabs.Trigger value="settings" className="tabs__trigger">
              Settings
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="messages" className="mt-4 p-4 border rounded">
            <h4 className="font-semibold mb-2">Messages (3 unread)</h4>
            <p className="text-sm text-muted-foreground">You have 3 new messages.</p>
          </Tabs.Content>
          <Tabs.Content value="notifications" className="mt-4 p-4 border rounded">
            <h4 className="font-semibold mb-2">Notifications (12 new)</h4>
            <p className="text-sm text-muted-foreground">You have 12 new notifications.</p>
          </Tabs.Content>
          <Tabs.Content value="settings" className="mt-4 p-4 border rounded">
            <h4 className="font-semibold mb-2">Settings</h4>
            <p className="text-sm text-muted-foreground">Configure your application settings.</p>
          </Tabs.Content>
        </Tabs>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Tabs with Loading States</h3>
        <Tabs defaultValue="dashboard" className="w-[500px]">
          <Tabs.List className="grid w-full grid-cols-3">
            <Tabs.Trigger value="dashboard" className="tabs__trigger">
              Dashboard
            </Tabs.Trigger>
            <Tabs.Trigger value="analytics" className="tabs__trigger tabs__trigger--loading">
              Analytics
            </Tabs.Trigger>
            <Tabs.Trigger value="reports" className="tabs__trigger">
              Reports
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="dashboard" className="mt-4 p-4 border rounded">
            <h4 className="font-semibold mb-2">Dashboard</h4>
            <p className="text-sm text-muted-foreground">Your main dashboard overview.</p>
          </Tabs.Content>
          <Tabs.Content value="analytics" className="mt-4 p-4 border rounded">
            <h4 className="font-semibold mb-2">Analytics</h4>
            <p className="text-sm text-muted-foreground">Loading analytics data...</p>
          </Tabs.Content>
          <Tabs.Content value="reports" className="mt-4 p-4 border rounded">
            <h4 className="font-semibold mb-2">Reports</h4>
            <p className="text-sm text-muted-foreground">Generate and view reports.</p>
          </Tabs.Content>
        </Tabs>
      </div>
    </div>
  ),
};

// Interactive controlled example
export const Interactive: Story = {
  render: function InteractiveDemo() {
    const [activeTab, setActiveTab] = React.useState('overview');

    return (
      <div className="w-[600px]">
        <div className="mb-4 p-3 bg-muted rounded">
          <p className="text-sm">
            Current active tab: <strong>{activeTab}</strong>
          </p>
          <div className="mt-2 space-x-2">
            <button
              onClick={() => setActiveTab('overview')}
              className="px-2 py-1 bg-primary text-primary-foreground rounded text-xs"
            >
              Go to Overview
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className="px-2 py-1 bg-primary text-primary-foreground rounded text-xs"
            >
              Go to Details
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className="px-2 py-1 bg-primary text-primary-foreground rounded text-xs"
            >
              Go to Settings
            </button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <Tabs.List className="grid w-full grid-cols-3">
            <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
            <Tabs.Trigger value="details">Details</Tabs.Trigger>
            <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="overview" className="mt-4 tabs__content">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Overview</h4>
              <p className="text-sm text-muted-foreground mb-3">
                This tab is controlled externally. Use the buttons above to change tabs.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-2 bg-muted rounded">
                  <strong>Total Users:</strong> 1,234
                </div>
                <div className="p-2 bg-muted rounded">
                  <strong>Active Sessions:</strong> 456
                </div>
              </div>
            </div>
          </Tabs.Content>
          <Tabs.Content value="details" className="mt-4 tabs__content">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Detailed Information</h4>
              <p className="text-sm text-muted-foreground mb-3">
                More comprehensive details about your data.
              </p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Feature A: Enabled</li>
                <li>Feature B: Disabled</li>
                <li>Feature C: Beta</li>
                <li>Last updated: 2 hours ago</li>
              </ul>
            </div>
          </Tabs.Content>
          <Tabs.Content value="settings" className="mt-4 tabs__content">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Settings</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Configure your preferences and options.
              </p>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  <span>Enable notifications</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  <span>Auto-save changes</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  <span>Dark mode</span>
                </label>
              </div>
            </div>
          </Tabs.Content>
        </Tabs>
      </div>
    );
  },
};

// Real-world dashboard example
export const RealWorldExample: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Project Dashboard</h2>
        <p className="text-muted-foreground">Manage your project settings and data.</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <Tabs.List className="grid w-full grid-cols-5 lg:w-[600px]">
          <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
          <Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
          <Tabs.Trigger value="users">Users</Tabs.Trigger>
          <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
          <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="overview" className="mt-6 tabs__content">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-3">Project Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Projects:</span>
                  <strong>24</strong>
                </div>
                <div className="flex justify-between">
                  <span>Active:</span>
                  <strong>18</strong>
                </div>
                <div className="flex justify-between">
                  <span>Completed:</span>
                  <strong>6</strong>
                </div>
              </div>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-3">Recent Activity</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Last deployment:</span>
                  <span className="text-muted-foreground">2 hours ago</span>
                </div>
                <div className="flex justify-between">
                  <span>Last commit:</span>
                  <span className="text-muted-foreground">4 hours ago</span>
                </div>
                <div className="flex justify-between">
                  <span>Team members:</span>
                  <strong>12</strong>
                </div>
              </div>
            </div>
          </div>
        </Tabs.Content>

        <Tabs.Content value="analytics" className="mt-6 tabs__content">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-4">Analytics Dashboard</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 bg-muted rounded">
                <div className="text-2xl font-bold">1,234</div>
                <div className="text-sm text-muted-foreground">Page Views</div>
              </div>
              <div className="text-center p-4 bg-muted rounded">
                <div className="text-2xl font-bold">456</div>
                <div className="text-sm text-muted-foreground">Unique Visitors</div>
              </div>
              <div className="text-center p-4 bg-muted rounded">
                <div className="text-2xl font-bold">78%</div>
                <div className="text-sm text-muted-foreground">Bounce Rate</div>
              </div>
            </div>
          </div>
        </Tabs.Content>

        <Tabs.Content value="users" className="mt-6 tabs__content">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-4">User Management</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <div className="font-medium">John Doe</div>
                  <div className="text-sm text-muted-foreground">john@example.com</div>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Admin</span>
              </div>
              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <div className="font-medium">Jane Smith</div>
                  <div className="text-sm text-muted-foreground">jane@example.com</div>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">User</span>
              </div>
              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <div className="font-medium">Bob Johnson</div>
                  <div className="text-sm text-muted-foreground">bob@example.com</div>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">User</span>
              </div>
            </div>
          </div>
        </Tabs.Content>

        <Tabs.Content value="settings" className="mt-6 tabs__content">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-4">Project Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Project Name</label>
                <input
                  type="text"
                  placeholder="My Awesome Project"
                  className="mt-1 w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <textarea
                  placeholder="Project description..."
                  className="mt-1 w-full px-3 py-2 border rounded-md"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Enable notifications</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Auto-deployment</span>
                </label>
              </div>
            </div>
          </div>
        </Tabs.Content>

        <Tabs.Content value="billing" className="mt-6 tabs__content">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-4">Billing Information</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-muted rounded">
                <div>
                  <div className="font-medium">Current Plan</div>
                  <div className="text-sm text-muted-foreground">Pro Plan</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">$29/month</div>
                  <div className="text-sm text-muted-foreground">Next billing: Jan 15</div>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded">
                  Upgrade Plan
                </button>
                <button className="px-4 py-2 border rounded">Download Invoice</button>
              </div>
            </div>
          </div>
        </Tabs.Content>
      </Tabs>
    </div>
  ),
};

// Disabled tabs
export const DisabledTabs: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <Tabs.List className="grid w-full grid-cols-4">
        <Tabs.Trigger value="tab1">Enabled</Tabs.Trigger>
        <Tabs.Trigger value="tab2" disabled>
          Disabled
        </Tabs.Trigger>
        <Tabs.Trigger value="tab3">Enabled</Tabs.Trigger>
        <Tabs.Trigger value="tab4" disabled>
          Disabled
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1" className="mt-4 p-4 border rounded">
        This tab is enabled and accessible.
      </Tabs.Content>
      <Tabs.Content value="tab2" className="mt-4 p-4 border rounded">
        This content will not be shown as the tab is disabled.
      </Tabs.Content>
      <Tabs.Content value="tab3" className="mt-4 p-4 border rounded">
        Another enabled tab with accessible content.
      </Tabs.Content>
      <Tabs.Content value="tab4" className="mt-4 p-4 border rounded">
        This content will not be shown as the tab is disabled.
      </Tabs.Content>
    </Tabs>
  ),
};
