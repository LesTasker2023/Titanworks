'use client';

import { useState } from 'react';
import { DatePicker } from '.';

export default function DatePickerDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [secondDate, setSecondDate] = useState<Date | undefined>();

  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">DatePicker Component</h1>
        <p className="text-muted-foreground">Date selection component</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Basic Usage</h3>
          <div className="border rounded-lg p-4 bg-background">
            <DatePicker date={date} onDateChange={setDate} />
            <p className="text-sm text-muted-foreground mt-2">
              Selected: {date?.toLocaleDateString() || 'None'}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Without Default Date</h3>
          <div className="border rounded-lg p-4 bg-background space-y-2">
            <DatePicker date={secondDate} onDateChange={setSecondDate} placeholder="Pick a date" />
            <p className="text-sm text-muted-foreground">
              Selected: {secondDate?.toLocaleDateString() || 'None'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
