'use client';

import React, { useState } from 'react';
import { Input } from '.';
import { Label } from '@/components/ui/Label';

export default function InputDemo() {
  const [value, setValue] = useState('');

  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Input Component</h1>
        <p className="text-muted-foreground">Text input fields with various configurations</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Basic Input</h3>
          <div className="border rounded-lg p-4 bg-background space-y-2">
            <Label htmlFor="basic">Basic Input</Label>
            <Input
              id="basic"
              placeholder="Enter some text..."
              value={value}
              onChange={e => setValue(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Value: {value}</p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Input Types</h3>
          <div className="border rounded-lg p-4 bg-background space-y-3">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="user@example.com" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="disabled">Disabled</Label>
              <Input id="disabled" placeholder="Disabled input" disabled />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
