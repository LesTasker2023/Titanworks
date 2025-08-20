'use client';

import { useState } from 'react';
import { Calendar } from '.';

export default function CalendarDemo() {
  const [state, setState] = useState(false);

  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Calendar Component</h1>
        <p className="text-muted-foreground">Date selection interface</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Basic Usage</h3>
          <div className="border rounded-lg p-4 bg-background flex justify-center">
            <Calendar />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Interactive</h3>
          <div className="border rounded-lg p-4 bg-background space-y-2">
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={state ? new Date() : undefined}
                onSelect={() => setState(!state)}
              />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              State: {state ? 'Date Selected' : 'No Date Selected'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
