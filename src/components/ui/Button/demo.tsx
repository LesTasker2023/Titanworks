'use client';

import React, { useState } from 'react';
import { Button } from '.';

export default function ButtonDemo() {
  const [clickCount, setClickCount] = useState(0);

  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Button Component</h1>
        <p className="text-muted-foreground">Interactive buttons with variants and sizes</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Variants</h3>
          <div className="border rounded-lg p-4 bg-background flex gap-2 flex-wrap">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Sizes</h3>
          <div className="border rounded-lg p-4 bg-background flex gap-2 items-center">
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Interactive</h3>
          <div className="border rounded-lg p-4 bg-background space-y-2">
            <Button onClick={() => setClickCount(prev => prev + 1)}>
              Clicked {clickCount} times
            </Button>
            <Button onClick={() => setClickCount(0)} variant="outline" size="sm">
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
