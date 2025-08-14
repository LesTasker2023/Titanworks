'use client';

import Progress from '@/components/ui/Progress';
import { useEffect, useState } from 'react';

export default function ProgressDemoPage() {
  const [progress, setProgress] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    if (isAnimated) {
      const timer = setTimeout(() => setProgress(66), 500);
      return () => clearTimeout(timer);
    }
  }, [isAnimated]);

  return (
    <div className="container mx-auto py-10 space-y-8 max-w-4xl">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Progress Component Demo</h1>
        <p className="text-lg text-muted-foreground">
          Enhanced progress bars with variants, sizes, labels, and animations
        </p>
      </div>

      {/* Interactive Demo */}
      <div className="bg-card p-6 rounded-lg border space-y-4">
        <h2 className="text-2xl font-semibold">Interactive Demo</h2>
        <div className="space-y-4">
          <div className="flex gap-4 items-center">
            <label className="font-medium min-w-20">Progress:</label>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={e => setProgress(Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm font-mono min-w-12">{progress}%</span>
          </div>
          <Progress
            value={progress}
            showLabel
            labelPosition="outside"
            animated
            striped
            className="w-full"
          />
          <button
            onClick={() => setIsAnimated(!isAnimated)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
          >
            {isAnimated ? 'Stop' : 'Start'} Auto Animation
          </button>
        </div>
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Variants</h2>
        <div className="grid gap-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Default</p>
            <Progress value={60} showLabel labelPosition="outside" />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Success</p>
            <Progress value={85} variant="success" showLabel labelPosition="outside" />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Warning</p>
            <Progress value={45} variant="warning" showLabel labelPosition="outside" />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Danger</p>
            <Progress value={25} variant="danger" showLabel labelPosition="outside" />
          </div>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Sizes</h2>
        <div className="grid gap-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Small</p>
            <Progress value={70} size="sm" showLabel labelPosition="outside" />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Default</p>
            <Progress value={70} size="default" showLabel labelPosition="outside" />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Large</p>
            <Progress value={70} size="lg" showLabel labelPosition="outside" />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Extra Large</p>
            <Progress value={70} size="xl" showLabel labelPosition="outside" />
          </div>
        </div>
      </div>

      {/* Enhanced Features */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Enhanced Features</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Label Positions</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Outside Label</p>
                <Progress value={75} showLabel labelPosition="outside" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Inside Label</p>
                <Progress value={75} showLabel labelPosition="inside" size="lg" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Animations</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Animated</p>
                <Progress value={60} animated showLabel labelPosition="outside" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Striped</p>
                <Progress value={60} striped showLabel labelPosition="outside" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Animated + Striped</p>
                <Progress value={60} animated striped showLabel labelPosition="outside" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-world Examples */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Real-world Examples</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">File Upload</h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Uploading document.pdf...</p>
              <Progress
                value={78}
                variant="success"
                size="lg"
                animated
                showLabel
                labelPosition="outside"
                aria-label="File upload progress"
              />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">System Resources</h3>
            <div className="space-y-3">
              <div className="space-y-1">
                <p className="text-sm font-medium">CPU Usage</p>
                <Progress value={42} size="sm" showLabel labelPosition="outside" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Memory</p>
                <Progress
                  value={78}
                  variant="warning"
                  size="sm"
                  showLabel
                  labelPosition="outside"
                />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Disk Space</p>
                <Progress value={92} variant="danger" size="sm" showLabel labelPosition="outside" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Examples */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage Examples</h2>
        <div className="bg-muted p-4 rounded-lg">
          <pre className="text-sm overflow-x-auto">
            <code>{`// Basic usage
<Progress value={60} />

// With label and variants
<Progress 
  value={85} 
  variant="success" 
  showLabel 
  labelPosition="outside" 
/>

// Animated with stripes
<Progress 
  value={75} 
  size="lg" 
  animated 
  striped 
  showLabel 
  labelPosition="inside" 
/>

// Real-world file upload
<Progress 
  value={progress}
  variant="success"
  animated
  showLabel
  aria-label="File upload progress"
/>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
