'use client';

import { useState } from 'react';
import { ColorPicker } from '.';

export default function ColorPickerDemo() {
  const [color, setColor] = useState('#3B82F6');
  const [secondColor, setSecondColor] = useState('#EF4444');

  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">ColorPicker Component</h1>
        <p className="text-muted-foreground">Color selection interface</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Basic Usage</h3>
          <div className="border rounded-lg p-4 bg-background">
            <ColorPicker defaultColor={color} onColorChange={setColor} />
            <p className="text-sm text-muted-foreground mt-2">Selected: {color}</p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Different Color</h3>
          <div className="border rounded-lg p-4 bg-background space-y-2">
            <ColorPicker defaultColor={secondColor} onColorChange={setSecondColor} />
            <p className="text-sm text-muted-foreground">Selected: {secondColor}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
