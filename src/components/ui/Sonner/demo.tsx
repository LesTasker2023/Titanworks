'use client';

import { useState } from 'react';
import { Toaster } from '.';

export default function SonnerDemo() {
  const [state, setState] = useState(false);

  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Sonner Component</h1>
        <p className="text-muted-foreground">Toast notifications</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Basic Usage</h3>
          <div className="border rounded-lg p-4 bg-background">
            <Toaster />
            <p className="text-sm text-muted-foreground">Toast notifications will appear here</p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Interactive</h3>
          <div className="border rounded-lg p-4 bg-background space-y-2">
            <Toaster />
            <button
              onClick={() => setState(!state)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded"
            >
              Show Toast {state ? '(Active)' : '(Inactive)'}
            </button>
            <p className="text-sm text-muted-foreground">State: {state ? 'Active' : 'Inactive'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
