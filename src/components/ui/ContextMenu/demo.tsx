'use client';

import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '.';

export default function ContextMenuDemo() {
  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">ContextMenu Component</h1>
        <p className="text-muted-foreground">Right-click context menus</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Basic Usage</h3>
          <div className="border rounded-lg p-4 bg-background">
            <ContextMenu>
              <ContextMenuTrigger className="flex h-150px w-300px items-center justify-center rounded-md border border-dashed text-sm">
                Right click here
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>Back</ContextMenuItem>
                <ContextMenuItem>Forward</ContextMenuItem>
                <ContextMenuItem>Reload</ContextMenuItem>
                <ContextMenuItem disabled>Save As...</ContextMenuItem>
                <ContextMenuItem>View Source</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Interactive</h3>
          <div className="border rounded-lg p-4 bg-background">
            <ContextMenu>
              <ContextMenuTrigger className="flex h-100px w-200px items-center justify-center rounded-md bg-muted text-sm">
                Right click for options
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>Edit</ContextMenuItem>
                <ContextMenuItem>Copy</ContextMenuItem>
                <ContextMenuItem>Cut</ContextMenuItem>
                <ContextMenuItem>Delete</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
