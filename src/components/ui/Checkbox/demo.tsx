'use client';

import { useState } from 'react';
import { Checkbox } from '.';
import { Button } from '../Button';

export default function CheckboxDemo() {
  const [singleCheck, setSingleCheck] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // For demonstrating indeterminate state
  const allNotificationsChecked = Object.values(notifications).every(Boolean);
  const someNotificationsChecked = Object.values(notifications).some(Boolean);
  const indeterminateState = someNotificationsChecked && !allNotificationsChecked;

  const handleSelectAll = (checked: boolean) => {
    setNotifications({
      email: checked,
      sms: checked,
      push: checked,
    });
  };

  const handleSubmit = async () => {
    setFormErrors({});

    if (!agreeTerms) {
      setFormErrors({ terms: 'You must agree to the terms and conditions' });
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);

    // Simulate success
    alert('Form submitted successfully!');
  };

  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Checkbox Component</h1>
        <p className="text-muted-foreground">
          Boolean input controls with labels, validation, and states
        </p>
      </div>

      <div className="space-y-8">
        {/* Basic Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Basic Usage</h3>
            <p className="text-sm text-muted-foreground">
              Simple checkbox controls for binary choices
            </p>
          </div>
          <div className="border rounded-lg p-4 bg-background space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="basic1" />
                <label htmlFor="basic1" className="text-sm font-medium">
                  Simple checkbox
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="basic2"
                  checked={singleCheck}
                  onCheckedChange={checked => setSingleCheck(checked as boolean)}
                />
                <label htmlFor="basic2" className="text-sm font-medium">
                  Controlled checkbox ({singleCheck ? 'Checked' : 'Unchecked'})
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="basic3" disabled />
                <label htmlFor="basic3" className="text-sm font-medium text-muted-foreground">
                  Disabled checkbox
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="basic4" disabled checked />
                <label htmlFor="basic4" className="text-sm font-medium text-muted-foreground">
                  Disabled checked
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Advanced Usage</h3>
            <p className="text-sm text-muted-foreground">
              Complex checkbox scenarios with validation, grouping, and real-world applications
            </p>
          </div>
          <div className="border rounded-lg p-4 bg-background space-y-6">
            {/* Form with Validation */}
            <div>
              <h4 className="font-medium mb-3">Form with Validation</h4>
              <div className="space-y-4 p-4 border rounded-lg bg-gray-50/50">
                <Checkbox
                  label="I agree to the terms and conditions"
                  required
                  checked={agreeTerms}
                  onCheckedChange={checked => setAgreeTerms(checked as boolean)}
                  error={formErrors.terms}
                  helperText="Please read our terms and conditions before proceeding"
                />

                <Checkbox
                  label="Subscribe to our newsletter"
                  checked={newsletter}
                  onCheckedChange={checked => setNewsletter(checked as boolean)}
                  helperText="Get updates about new features and promotions"
                />

                <Button onClick={handleSubmit} disabled={isLoading} className="w-full">
                  {isLoading ? 'Submitting...' : 'Submit Form'}
                </Button>
              </div>
            </div>

            {/* Indeterminate State Demo */}
            <div>
              <h4 className="font-medium mb-3">Select All with Indeterminate State</h4>
              <div className="space-y-3 p-4 border rounded-lg bg-gray-50/50">
                <Checkbox
                  label="Select all notifications"
                  checked={allNotificationsChecked}
                  indeterminate={indeterminateState}
                  onCheckedChange={handleSelectAll}
                  className="font-medium"
                />

                <div className="ml-6 space-y-2">
                  <Checkbox
                    label="Email notifications"
                    checked={notifications.email}
                    onCheckedChange={checked =>
                      setNotifications(prev => ({ ...prev, email: checked as boolean }))
                    }
                    helperText="Receive important updates via email"
                  />

                  <Checkbox
                    label="SMS notifications"
                    checked={notifications.sms}
                    onCheckedChange={checked =>
                      setNotifications(prev => ({ ...prev, sms: checked as boolean }))
                    }
                    helperText="Urgent alerts sent to your phone"
                  />

                  <Checkbox
                    label="Push notifications"
                    checked={notifications.push}
                    onCheckedChange={checked =>
                      setNotifications(prev => ({ ...prev, push: checked as boolean }))
                    }
                    helperText="Browser and app notifications"
                  />
                </div>

                <div className="text-sm text-muted-foreground mt-2">
                  Selected: {Object.values(notifications).filter(Boolean).length} of{' '}
                  {Object.keys(notifications).length}
                </div>
              </div>
            </div>

            {/* Loading State */}
            <div>
              <h4 className="font-medium mb-3">Loading State</h4>
              <div className="space-y-3 p-4 border rounded-lg bg-gray-50/50">
                <Checkbox
                  label="Processing your request..."
                  loading={true}
                  helperText="Please wait while we process your selection"
                />

                <Checkbox
                  label="This action requires confirmation"
                  loading={isLoading}
                  helperText="Click submit form above to see loading state"
                />
              </div>
            </div>

            {/* Feature Selection Use Case */}
            <div>
              <h4 className="font-medium mb-3">Feature Selection</h4>
              <div className="space-y-3 p-4 border rounded-lg bg-gray-50/50">
                <div className="text-sm text-muted-foreground mb-2">
                  Select the features you&apos;d like to enable:
                </div>

                <Checkbox
                  label="Dark mode"
                  helperText="Switch between light and dark themes"
                  defaultChecked
                />

                <Checkbox
                  label="Auto-save"
                  helperText="Automatically save your work every 30 seconds"
                  defaultChecked
                />

                <Checkbox
                  label="Collaboration features"
                  helperText="Enable real-time collaboration and sharing"
                />

                <Checkbox
                  label="Advanced analytics"
                  helperText="Get detailed insights and reports (Premium feature)"
                  disabled
                />
              </div>
            </div>

            {/* Checkbox with Error States */}
            <div>
              <h4 className="font-medium mb-3">Error Handling</h4>
              <div className="space-y-3 p-4 border rounded-lg bg-gray-50/50">
                <Checkbox
                  label="I understand the risks"
                  required
                  error="This field is required to proceed"
                />

                <Checkbox
                  label="Enable advanced features"
                  error="This feature is temporarily unavailable"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
