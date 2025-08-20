'use client';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '.';
import { Button } from '../Button';

export default function HoverCardDemo() {
  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">HoverCard Component</h1>
        <p className="text-muted-foreground">Hover-triggered content</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Basic Usage</h3>
          <div className="border rounded-lg p-4 bg-background">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link">Hover me</Button>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="p-2">
                  <h4 className="font-semibold">Hover Card</h4>
                  <p className="text-sm text-muted-foreground">This content appears on hover.</p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Interactive</h3>
          <div className="border rounded-lg p-4 bg-background">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="outline">Profile Info</Button>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="p-4">
                  <h4 className="font-semibold">User Profile</h4>
                  <p className="text-sm text-muted-foreground">
                    Hover for additional user information.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </div>
    </div>
  );
}
