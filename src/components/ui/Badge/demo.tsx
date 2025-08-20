'use client';

import React, { useState } from 'react';
import { Badge } from '.';

export default function BadgeDemo() {
  const [clickedBadge, setClickedBadge] = useState('');

  const variants = [
    'default',
    'secondary',
    'destructive',
    'success',
    'warning',
    'info',
    'outline',
  ] as const;

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Badge Component</h1>
        <p className="text-muted-foreground">
          Status and category indicators with multiple variants
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Variants</h3>
          <div className="border rounded-lg p-4 bg-background">
            <div className="flex gap-2 flex-wrap">
              {variants.map(variant => (
                <Badge
                  key={variant}
                  variant={variant}
                  className="cursor-pointer"
                  onClick={() => setClickedBadge(variant)}
                >
                  {variant}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Use Cases</h3>
          <div className="border rounded-lg p-4 bg-background space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Status Indicators</h4>
              <div className="flex gap-2">
                <Badge variant="success">✅ Active</Badge>
                <Badge variant="warning">⚠️ Pending</Badge>
                <Badge variant="destructive">❌ Error</Badge>
                <Badge variant="info">ℹ️ Info</Badge>
              </div>
            </div>
          </div>
        </div>

        {clickedBadge && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Interactive Feedback</h3>
            <div className="border rounded-lg p-4 bg-muted">
              <p className="text-sm">
                Last clicked: <Badge variant="outline">{clickedBadge}</Badge>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
