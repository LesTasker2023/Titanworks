'use client';

import { useState } from 'react';
import { Button } from '../Button';

export default function ToastDemo() {
  const [toastCount, setToastCount] = useState(0);

  const showToast = () => {
    setToastCount(prev => prev + 1);
    // In a real app, this would trigger a toast notification
    console.log(`Toast triggered: ${toastCount + 1}`);
  };

  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Toast Component</h1>
        <p className="text-muted-foreground">Notification messages</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Basic Usage</h3>
          <div className="border rounded-lg p-4 bg-background">
            <Button onClick={showToast}>Show Toast ({toastCount} triggered)</Button>
            <p className="text-sm text-muted-foreground mt-2">Check console for toast messages</p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Interactive</h3>
          <div className="border rounded-lg p-4 bg-background space-y-2">
            <Button onClick={showToast} variant="outline">
              Trigger Another Toast
            </Button>
            <p className="text-sm text-muted-foreground">Total toasts triggered: {toastCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
