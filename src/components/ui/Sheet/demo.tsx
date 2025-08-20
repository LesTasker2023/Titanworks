'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '.';
import { Button } from '../Button';

export default function SheetDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Sheet Component</h1>
        <p className="text-muted-foreground">Side panels and sheets</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Basic Usage</h3>
          <div className="border rounded-lg p-4 bg-background">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Open Sheet</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Sheet Title</SheetTitle>
                  <SheetDescription>This is a basic sheet with content.</SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <p>Sheet content goes here.</p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Interactive</h3>
          <div className="border rounded-lg p-4 bg-background">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button>Controlled Sheet</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Controlled Sheet</SheetTitle>
                  <SheetDescription>State: {isOpen ? 'Open' : 'Closed'}</SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <p>This sheet is controlled externally.</p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
}
