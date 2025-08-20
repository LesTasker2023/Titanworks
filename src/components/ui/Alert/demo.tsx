'use client';

import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '.';
import { Button } from '../Button';

export default function AlertDemo() {
  const [dismissibleAlert, setDismissibleAlert] = useState(true);
  const [actionAlert, setActionAlert] = useState(true);

  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Alert Component</h1>
        <p className="text-muted-foreground">Display important messages</p>
      </div>

      <div className="space-y-8">
        {/* Basic Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Basic Usage</h3>
            <p className="text-sm text-muted-foreground">
              Simple alerts for different message types and states
            </p>
          </div>
          <div className="border rounded-lg p-4 bg-background space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>This is a basic informational alert message.</AlertDescription>
            </Alert>

            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Something went wrong. Please try again.</AlertDescription>
            </Alert>

            <Alert className="border-green-200 bg-green-50 text-green-800">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Your action was completed successfully!</AlertDescription>
            </Alert>
          </div>
        </div>

        {/* Advanced Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Advanced Usage</h3>
            <p className="text-sm text-muted-foreground">
              Interactive alerts with actions, dismissible behavior, and custom content
            </p>
          </div>
          <div className="border rounded-lg p-4 bg-background space-y-4">
            {dismissibleAlert && (
              <Alert className="relative">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  Your session will expire in 5 minutes. Save your work to avoid losing changes.
                </AlertDescription>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 h-6 w-6 p-0"
                  onClick={() => setDismissibleAlert(false)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Alert>
            )}

            {actionAlert && (
              <Alert className="border-blue-200 bg-blue-50 text-blue-800">
                <Info className="h-4 w-4" />
                <AlertTitle>Update Available</AlertTitle>
                <AlertDescription className="mt-2">
                  A new version of the application is available.
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="h-8">
                      Update Now
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8"
                      onClick={() => setActionAlert(false)}
                    >
                      Dismiss
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>System Maintenance</AlertTitle>
              <AlertDescription>
                <div className="space-y-2">
                  <p>
                    Scheduled maintenance will occur on{' '}
                    <strong>Sunday, Aug 25th from 2:00-4:00 AM EST</strong>.
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>All services will be temporarily unavailable</li>
                    <li>Data will be preserved during the maintenance</li>
                    <li>Email notifications will be sent when complete</li>
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
}
