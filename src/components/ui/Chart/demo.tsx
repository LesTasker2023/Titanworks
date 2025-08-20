'use client';

import { ChartContainer } from '.';

export default function ChartDemo() {
  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Chart Component</h1>
        <p className="text-muted-foreground">Data visualization charts</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Basic Usage</h3>
          <div className="border rounded-lg p-4 bg-background">
            <ChartContainer config={{}}>
              <div className="p-8 text-center text-muted-foreground">Chart placeholder</div>
            </ChartContainer>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Interactive</h3>
          <div className="border rounded-lg p-4 bg-background space-y-2">
            <ChartContainer config={{}}>
              <div className="p-8 text-center text-muted-foreground">
                Interactive chart placeholder
              </div>
            </ChartContainer>
            <p className="text-sm text-muted-foreground">Chart component for data visualization</p>
          </div>
        </div>
      </div>
    </div>
  );
}
