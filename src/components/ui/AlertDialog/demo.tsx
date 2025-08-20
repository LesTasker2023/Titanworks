'use client';

import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '.';

export default function AlertDialogDemo() {
  const [state, setState] = useState(false);

  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">AlertDialog Component</h1>
        <p className="text-muted-foreground">Modal dialogs for critical actions</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Basic Usage</h3>
          <div className="border rounded-lg p-4 bg-background">
            <AlertDialog>AlertDialog Example</AlertDialog>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Interactive</h3>
          <div className="border rounded-lg p-4 bg-background space-y-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="px-4 py-2 bg-destructive text-destructive-foreground rounded">
                  Delete Item
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => setState(!state)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <p className="text-sm text-muted-foreground">
              State: {state ? 'Deleted' : 'Not deleted'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
