'use client';

import {
  ChevronDown,
  Download,
  ExternalLink,
  Loader2,
  Mail,
  Plus,
  Search,
  Settings,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '.';

export default function ButtonDemo() {
  const [clickCount, setClickCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleAsyncAction = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setClickCount(prev => prev + 1);
  };

  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Button Component</h1>
        <p className="text-muted-foreground">Interactive buttons with variants and sizes</p>
      </div>

      <div className="space-y-8">
        {/* Basic Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Basic Usage</h3>
            <p className="text-sm text-muted-foreground">
              Standard button variants and sizes for common interface patterns
            </p>
          </div>
          <div className="border rounded-lg p-4 bg-background space-y-4">
            <div>
              <h4 className="font-medium mb-2">Variants</h4>
              <div className="flex gap-2 flex-wrap">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Sizes</h4>
              <div className="flex gap-2 items-center">
                <Button size="sm">Small</Button>
                <Button>Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Advanced Usage</h3>
            <p className="text-sm text-muted-foreground">
              Complex buttons with icons, loading states, and interactive behaviors
            </p>
          </div>
          <div className="border rounded-lg p-4 bg-background space-y-6">
            <div>
              <h4 className="font-medium mb-2">With Icons</h4>
              <div className="flex gap-2 flex-wrap">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button variant="secondary">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="mr-2 h-3 w-3" />
                  Open
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Loading States</h4>
              <div className="flex gap-2 items-center">
                <Button onClick={handleAsyncAction} disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? 'Processing...' : 'Start Process'}
                </Button>
                <Button variant="outline" onClick={() => setIsLoading(!isLoading)}>
                  Toggle Loading
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Interactive States</h4>
              <div className="space-y-2">
                <div className="flex gap-2 items-center">
                  <Button
                    variant={isSubscribed ? 'secondary' : 'default'}
                    onClick={() => setIsSubscribed(!isSubscribed)}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    {isSubscribed ? 'Subscribed' : 'Subscribe'}
                  </Button>
                  <Button onClick={() => setClickCount(prev => prev + 1)}>
                    Clicked {clickCount} times
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setClickCount(0)}>
                    Reset Counter
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setIsSubscribed(false)}>
                    Reset Subscription
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Button Groups</h4>
              <div className="flex">
                <Button variant="outline" className="rounded-r-none border-r-0">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
                <Button variant="outline" className="rounded-none border-r-0">
                  Filter
                </Button>
                <Button variant="outline" className="rounded-l-none">
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
