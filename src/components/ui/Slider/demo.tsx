'use client';

import React, { useState } from 'react';
import { Slider } from '.';

export default function SliderDemo() {
  const [state, setState] = useState(false);

  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Slider Component</h1>
        <p className="text-muted-foreground">Range input controls</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Basic Usage</h3>
          <div className="border rounded-lg p-4 bg-background">
            <Slider>Slider Example</Slider>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Interactive</h3>
          <div className="border rounded-lg p-4 bg-background space-y-2">
            <Slider onClick={() => setState(!state)}>
              Click me {state ? '(Active)' : '(Inactive)'}
            </Slider>
            <p className="text-sm text-muted-foreground">State: {state ? 'Active' : 'Inactive'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
