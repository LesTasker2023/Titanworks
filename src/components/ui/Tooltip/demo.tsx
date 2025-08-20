'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from '.';
import { Button } from '../Button';

export default function TooltipDemo() {
  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Tooltip Component</h1>
        <p className="text-muted-foreground">Helpful tooltips and hints</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Basic Usage</h3>
          <div className="border rounded-lg p-4 bg-background">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover for tooltip</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>This is a helpful tooltip!</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Different Positions</h3>
          <div className="border rounded-lg p-4 bg-background space-x-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button>Top</Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Tooltip on top</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Bottom</Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Tooltip on bottom</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
