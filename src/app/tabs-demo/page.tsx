'use client';

import Tabs from '@/components/ui/Tabs';
import { useState } from 'react';

export default function TabsDemo() {
  const [currentTab, setCurrentTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Tabs Component Showcase</h1>
          <p className="text-lg text-muted-foreground">
            Enhanced Tabs component with size variants, badge indicators, loading states, and
            vertical orientation.
          </p>
        </div>

        {/* Basic Example */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Basic Tabs</h2>
          <Tabs defaultValue="account" className="w-full">
            <Tabs.List>
              <Tabs.Trigger value="account">Account</Tabs.Trigger>
              <Tabs.Trigger value="password">Password</Tabs.Trigger>
              <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="account" className="mt-4">
              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-medium mb-2">Account Settings</h3>
                <p className="text-muted-foreground">
                  Make changes to your account here. Click save when you&apos;re done.
                </p>
              </div>
            </Tabs.Content>
            <Tabs.Content value="password" className="mt-4">
              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-medium mb-2">Password Settings</h3>
                <p className="text-muted-foreground">
                  Change your password here. After saving, you&apos;ll be logged out.
                </p>
              </div>
            </Tabs.Content>
            <Tabs.Content value="settings" className="mt-4">
              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-medium mb-2">General Settings</h3>
                <p className="text-muted-foreground">
                  Configure your general preferences and settings here.
                </p>
              </div>
            </Tabs.Content>
          </Tabs>
        </section>

        {/* Size Variants */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Size Variants</h2>
          <div className="space-y-8">
            {/* Small */}
            <div>
              <h3 className="text-lg font-medium mb-2">Small Size</h3>
              <Tabs defaultValue="tab1" size="sm">
                <Tabs.List>
                  <Tabs.Trigger value="tab1">Small Tab 1</Tabs.Trigger>
                  <Tabs.Trigger value="tab2">Small Tab 2</Tabs.Trigger>
                  <Tabs.Trigger value="tab3">Small Tab 3</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="tab1" className="mt-4">
                  <div className="p-3 border rounded">Small content area</div>
                </Tabs.Content>
                <Tabs.Content value="tab2" className="mt-4">
                  <div className="p-3 border rounded">Second small tab</div>
                </Tabs.Content>
                <Tabs.Content value="tab3" className="mt-4">
                  <div className="p-3 border rounded">Third small tab</div>
                </Tabs.Content>
              </Tabs>
            </div>

            {/* Large */}
            <div>
              <h3 className="text-lg font-medium mb-2">Large Size</h3>
              <Tabs defaultValue="tab1" size="lg">
                <Tabs.List>
                  <Tabs.Trigger value="tab1">Large Tab 1</Tabs.Trigger>
                  <Tabs.Trigger value="tab2">Large Tab 2</Tabs.Trigger>
                  <Tabs.Trigger value="tab3">Large Tab 3</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="tab1" className="mt-4">
                  <div className="p-6 border rounded">Large content area with more spacing</div>
                </Tabs.Content>
                <Tabs.Content value="tab2" className="mt-4">
                  <div className="p-6 border rounded">Second large tab with spacious layout</div>
                </Tabs.Content>
                <Tabs.Content value="tab3" className="mt-4">
                  <div className="p-6 border rounded">Third large tab with generous padding</div>
                </Tabs.Content>
              </Tabs>
            </div>

            {/* Extra Large */}
            <div>
              <h3 className="text-lg font-medium mb-2">Extra Large Size</h3>
              <Tabs defaultValue="tab1" size="xl">
                <Tabs.List>
                  <Tabs.Trigger value="tab1">XL Tab 1</Tabs.Trigger>
                  <Tabs.Trigger value="tab2">XL Tab 2</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="tab1" className="mt-4">
                  <div className="p-8 border rounded">
                    <h4 className="text-xl font-semibold mb-4">Extra Large Content</h4>
                    <p>Maximum size tabs for prominent UI sections.</p>
                  </div>
                </Tabs.Content>
                <Tabs.Content value="tab2" className="mt-4">
                  <div className="p-8 border rounded">
                    <h4 className="text-xl font-semibold mb-4">Second XL Tab</h4>
                    <p>Perfect for dashboard sections or main navigation.</p>
                  </div>
                </Tabs.Content>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Badge Indicators */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Badge Indicators</h2>
          <Tabs defaultValue="notifications" className="w-full">
            <Tabs.List>
              <Tabs.Trigger value="notifications" badge="3">
                Notifications
              </Tabs.Trigger>
              <Tabs.Trigger value="messages" badge="12">
                Messages
              </Tabs.Trigger>
              <Tabs.Trigger value="tasks" badge="7">
                Tasks
              </Tabs.Trigger>
              <Tabs.Trigger value="completed" badge="">
                Completed
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="notifications" className="mt-4">
              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-medium mb-2">Notifications (3)</h3>
                <ul className="space-y-2">
                  <li className="p-2 bg-blue-50 rounded">New comment on your post</li>
                  <li className="p-2 bg-blue-50 rounded">User followed you</li>
                  <li className="p-2 bg-blue-50 rounded">System maintenance notice</li>
                </ul>
              </div>
            </Tabs.Content>
            <Tabs.Content value="messages" className="mt-4">
              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-medium mb-2">Messages (12)</h3>
                <p className="text-muted-foreground">You have 12 unread messages.</p>
              </div>
            </Tabs.Content>
            <Tabs.Content value="tasks" className="mt-4">
              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-medium mb-2">Pending Tasks (7)</h3>
                <p className="text-muted-foreground">7 tasks need your attention.</p>
              </div>
            </Tabs.Content>
            <Tabs.Content value="completed" className="mt-4">
              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-medium mb-2">Completed</h3>
                <p className="text-muted-foreground">All tasks completed! Good job.</p>
              </div>
            </Tabs.Content>
          </Tabs>
        </section>

        {/* Loading States */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Loading States</h2>
          <Tabs defaultValue="data" className="w-full">
            <Tabs.List>
              <Tabs.Trigger value="data" loading>
                Loading Data
              </Tabs.Trigger>
              <Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
              <Tabs.Trigger value="reports" loading>
                Reports
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="data" className="mt-4">
              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-medium mb-2">Data Loading...</h3>
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </Tabs.Content>
            <Tabs.Content value="analytics" className="mt-4">
              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-medium mb-2">Analytics Dashboard</h3>
                <p className="text-muted-foreground">Your analytics data is ready to view.</p>
              </div>
            </Tabs.Content>
            <Tabs.Content value="reports" className="mt-4">
              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-medium mb-2">Reports Loading...</h3>
                <p className="text-muted-foreground">Generating your reports...</p>
              </div>
            </Tabs.Content>
          </Tabs>
        </section>

        {/* Vertical Orientation */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Vertical Orientation</h2>
          <Tabs defaultValue="profile" orientation="vertical" className="w-full">
            <div className="flex gap-6">
              <Tabs.List className="flex-col h-fit">
                <Tabs.Trigger value="profile" className="w-full justify-start">
                  Profile
                </Tabs.Trigger>
                <Tabs.Trigger value="security" className="w-full justify-start">
                  Security
                </Tabs.Trigger>
                <Tabs.Trigger value="preferences" className="w-full justify-start">
                  Preferences
                </Tabs.Trigger>
                <Tabs.Trigger value="billing" className="w-full justify-start" badge="2">
                  Billing
                </Tabs.Trigger>
              </Tabs.List>
              <div className="flex-1">
                <Tabs.Content value="profile" className="mt-0">
                  <div className="p-6 border rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Profile Settings</h3>
                    <p className="text-muted-foreground mb-4">
                      Update your personal information and profile details.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Full Name</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                          type="email"
                          className="w-full p-2 border rounded"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                  </div>
                </Tabs.Content>
                <Tabs.Content value="security" className="mt-0">
                  <div className="p-6 border rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Security Settings</h3>
                    <p className="text-muted-foreground mb-4">
                      Manage your account security and authentication.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Current Password</label>
                        <input type="password" className="w-full p-2 border rounded" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">New Password</label>
                        <input type="password" className="w-full p-2 border rounded" />
                      </div>
                    </div>
                  </div>
                </Tabs.Content>
                <Tabs.Content value="preferences" className="mt-0">
                  <div className="p-6 border rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Preferences</h3>
                    <p className="text-muted-foreground mb-4">
                      Customize your experience and notification settings.
                    </p>
                    <div className="space-y-4">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span>Email notifications</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span>Push notifications</span>
                      </label>
                    </div>
                  </div>
                </Tabs.Content>
                <Tabs.Content value="billing" className="mt-0">
                  <div className="p-6 border rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Billing & Subscription</h3>
                    <p className="text-muted-foreground mb-4">
                      Manage your billing information and subscription plan.
                    </p>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-yellow-800">
                        <strong>Notice:</strong> You have 2 pending invoices that require attention.
                      </p>
                    </div>
                  </div>
                </Tabs.Content>
              </div>
            </div>
          </Tabs>
        </section>

        {/* Controlled Tabs */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Controlled Tabs</h2>
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">
              Current tab: <code className="bg-gray-100 px-2 py-1 rounded">{currentTab}</code>
            </p>
            <div className="space-x-2">
              <button
                onClick={() => setCurrentTab('overview')}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
              >
                Switch to Overview
              </button>
              <button
                onClick={() => setCurrentTab('details')}
                className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200"
              >
                Switch to Details
              </button>
            </div>
          </div>
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <Tabs.List>
              <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
              <Tabs.Trigger value="details">Details</Tabs.Trigger>
              <Tabs.Trigger value="advanced">Advanced</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="overview" className="mt-4">
              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-medium mb-2">Overview</h3>
                <p className="text-muted-foreground">
                  This tab is controlled by React state. Use the buttons above to change tabs
                  programmatically.
                </p>
              </div>
            </Tabs.Content>
            <Tabs.Content value="details" className="mt-4">
              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-medium mb-2">Details</h3>
                <p className="text-muted-foreground">
                  You can control tabs externally using the value and onValueChange props.
                </p>
              </div>
            </Tabs.Content>
            <Tabs.Content value="advanced" className="mt-4">
              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-medium mb-2">Advanced</h3>
                <p className="text-muted-foreground">
                  This enables complex interaction patterns and state synchronization.
                </p>
              </div>
            </Tabs.Content>
          </Tabs>
        </section>

        {/* Feature Summary */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Features Demonstrated</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">✅ Size Variants</h3>
              <p className="text-sm text-muted-foreground">
                sm, default, lg, xl sizes for different UI contexts
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">✅ Badge Indicators</h3>
              <p className="text-sm text-muted-foreground">
                Show counts, notifications, or status indicators
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">✅ Loading States</h3>
              <p className="text-sm text-muted-foreground">Visual feedback during data loading</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">✅ Vertical Orientation</h3>
              <p className="text-sm text-muted-foreground">
                Perfect for settings panels and sidebars
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">✅ Controlled/Uncontrolled</h3>
              <p className="text-sm text-muted-foreground">Flexible state management options</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">✅ Full Accessibility</h3>
              <p className="text-sm text-muted-foreground">
                Keyboard navigation, ARIA labels, screen reader support
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
