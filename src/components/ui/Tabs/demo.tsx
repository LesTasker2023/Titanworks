'use client';

import React, { useState } from 'react';
import { Tabs } from '.';

export default function TabsDemo() {
  const [state, setState] = useState(false);

  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Tabs Component</h1>
        <p className="text-muted-foreground">Tabbed content interfaces</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Basic Usage</h3>
          <div className="border rounded-lg p-4 bg-background">
            <Tabs>Tabs Example</Tabs>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Interactive</h3>
          <div className="border rounded-lg p-4 bg-background space-y-2">
            <Tabs onClick={() => setState(!state)}>
              Click me {state ? '(Active)' : '(Inactive)'}
            </Tabs>
            <p className="text-sm text-muted-foreground">State: {state ? 'Active' : 'Inactive'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
