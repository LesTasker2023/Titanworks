'use client';

import { Popover, PopoverContent, PopoverTrigger } from '.';
import { Button } from '../Button';

export default function PopoverDemo() {
  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Popover Component</h1>
        <p className="text-muted-foreground">Click-triggered content overlay</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Basic Usage</h3>
          <div className="border rounded-lg p-4 bg-background">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Open Popover</Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="p-2">
                  <h4 className="font-semibold">Popover Content</h4>
                  <p className="text-sm text-muted-foreground">
                    This content appears in a popover.
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Interactive</h3>
          <div className="border rounded-lg p-4 bg-background">
            <Popover>
              <PopoverTrigger asChild>
                <Button>Settings</Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="p-4">
                  <h4 className="font-semibold">Settings Panel</h4>
                  <p className="text-sm text-muted-foreground">Configure your preferences here.</p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}
