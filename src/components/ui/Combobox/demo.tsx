'use client';

import { useState } from 'react';
import { Combobox } from '.';

export default function ComboboxDemo() {
  const [value, setValue] = useState('');

  const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'date', label: 'Date' },
  ];

  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Combobox Component</h1>
        <p className="text-muted-foreground">Searchable select input</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Basic Usage</h3>
          <div className="border rounded-lg p-4 bg-background">
            <Combobox
              options={options}
              value={value}
              onValueChange={setValue}
              placeholder="Select a fruit..."
            />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Interactive</h3>
          <div className="border rounded-lg p-4 bg-background space-y-2">
            <Combobox
              options={options}
              value={value}
              onValueChange={setValue}
              placeholder="Choose an option..."
            />
            <p className="text-sm text-muted-foreground">Selected: {value || 'None'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
