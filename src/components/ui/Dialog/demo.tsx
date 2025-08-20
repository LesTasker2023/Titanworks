'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '.';
import { Button } from '../Button';

export default function DialogDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Dialog Component</h1>
        <p className="text-muted-foreground">Modal dialogs with overlay</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Basic Usage</h3>
          <div className="border rounded-lg p-4 bg-background">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Open Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Dialog Title</DialogTitle>
                  <DialogDescription>
                    This is a basic dialog with some sample content.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p>Dialog content goes here.</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Controlled Dialog</h3>
          <div className="border rounded-lg p-4 bg-background space-y-2">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button>Controlled Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Controlled Dialog</DialogTitle>
                  <DialogDescription>This dialog is controlled externally.</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p>You can control this dialog with state.</p>
                </div>
              </DialogContent>
            </Dialog>
            <p className="text-sm text-muted-foreground">State: {isOpen ? 'Open' : 'Closed'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
