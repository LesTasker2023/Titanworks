'use client';

import React from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '.';

export default function ResizableDemo() {
  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Resizable Component</h1>
        <p className="text-muted-foreground">
          Flexible panel layouts with drag-to-resize functionality
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Horizontal Layout</h3>
          <div className="border rounded-lg overflow-hidden h-64">
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={30} minSize={20}>
                <div className="p-4 h-full bg-muted">
                  <h4 className="font-semibold">Sidebar</h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    Resize by dragging the handle
                  </p>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={70}>
                <div className="p-4 h-full">
                  <h4 className="font-semibold">Main Content</h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    This panel takes up the remaining space
                  </p>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Vertical Layout</h3>
          <div className="border rounded-lg overflow-hidden h-64">
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={40}>
                <div className="p-4 h-full bg-muted">
                  <h4 className="font-semibold">Header</h4>
                  <p className="text-sm text-muted-foreground mt-2">Top panel section</p>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={60}>
                <div className="p-4 h-full">
                  <h4 className="font-semibold">Content</h4>
                  <p className="text-sm text-muted-foreground mt-2">Bottom panel section</p>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
