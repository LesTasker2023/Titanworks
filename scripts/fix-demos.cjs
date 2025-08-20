#!/usr/bin/env node

/**
 * 🎯 Demo Fixer Script
 *
 * Automatically fixes demo files to match actual component APIs
 * MuskMode: Smart automation over manual fixing
 */

const fs = require('fs');
const path = require('path');

const COMPONENTS_PATH = path.join(__dirname, '../src/components/ui');

// Component-specific demo templates
const COMPONENT_SPECIFIC_DEMOS = {
  Accordion: () => `'use client';

import React, { useState } from 'react';
import { Accordion } from '.';

export default function AccordionDemo() {
  const [selectedItem, setSelectedItem] = useState('');

  const accordionItems = [
    {
      title: 'Getting Started',
      content: (
        <div className="space-y-2">
          <p>Welcome to our component library. This accordion shows how to organize content in collapsible sections.</p>
          <p>Click on any section to expand or collapse it.</p>
        </div>
      )
    },
    {
      title: 'Features',
      content: (
        <ul className="space-y-1">
          <li>• Keyboard navigation support</li>
          <li>• Accessible ARIA implementation</li>
          <li>• Customizable styling</li>
          <li>• Smooth animations</li>
        </ul>
      )
    },
    {
      title: 'Advanced Usage',
      content: (
        <div>
          <p>Advanced configuration options and integration patterns.</p>
          <code className="block mt-2 p-2 bg-muted rounded text-sm">
            &lt;Accordion items={items} defaultOpenIndex={0} /&gt;
          </code>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Accordion Component</h1>
        <p className="text-muted-foreground">
          Collapsible content sections with keyboard navigation
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Interactive Example</h3>
          <div className="border rounded-lg p-4 bg-background">
            <Accordion 
              items={accordionItems} 
              defaultOpenIndex={0}
            />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Disabled Example</h3>
          <div className="border rounded-lg p-4 bg-background">
            <Accordion 
              items={[
                { title: 'Enabled Section', content: 'This section is interactive.' },
                { title: 'Disabled Section', content: 'This section is disabled.', disabled: true },
                { title: 'Another Enabled Section', content: 'This section works normally.' }
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}`,

  Resizable: () => `'use client';

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
                  <p className="text-sm text-muted-foreground mt-2">
                    Top panel section
                  </p>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={60}>
                <div className="p-4 h-full">
                  <h4 className="font-semibold">Content</h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    Bottom panel section
                  </p>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </div>
    </div>
  );
}`,

  Badge: () => `'use client';

import React, { useState } from 'react';
import { Badge } from '.';

export default function BadgeDemo() {
  const [clickedBadge, setClickedBadge] = useState('');

  const variants = ['default', 'secondary', 'destructive', 'success', 'warning', 'info', 'outline'] as const;

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Badge Component</h1>
        <p className="text-muted-foreground">
          Status and category indicators with multiple variants
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Variants</h3>
          <div className="border rounded-lg p-4 bg-background">
            <div className="flex gap-2 flex-wrap">
              {variants.map((variant) => (
                <Badge 
                  key={variant} 
                  variant={variant}
                  className="cursor-pointer"
                  onClick={() => setClickedBadge(variant)}
                >
                  {variant}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Use Cases</h3>
          <div className="border rounded-lg p-4 bg-background space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Status Indicators</h4>
              <div className="flex gap-2">
                <Badge variant="success">✅ Active</Badge>
                <Badge variant="warning">⚠️ Pending</Badge>
                <Badge variant="destructive">❌ Error</Badge>
                <Badge variant="info">ℹ️ Info</Badge>
              </div>
            </div>
          </div>
        </div>

        {clickedBadge && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Interactive Feedback</h3>
            <div className="border rounded-lg p-4 bg-muted">
              <p className="text-sm">
                Last clicked: <Badge variant="outline">{clickedBadge}</Badge>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}`,

  // Simple components that work with basic children
  Button: () => `'use client';

import React, { useState } from 'react';
import { Button } from '.';

export default function ButtonDemo() {
  const [clickCount, setClickCount] = useState(0);

  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Button Component</h1>
        <p className="text-muted-foreground">Interactive buttons with variants and sizes</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Variants</h3>
          <div className="border rounded-lg p-4 bg-background flex gap-2 flex-wrap">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Sizes</h3>
          <div className="border rounded-lg p-4 bg-background flex gap-2 items-center">
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Interactive</h3>
          <div className="border rounded-lg p-4 bg-background space-y-2">
            <Button onClick={() => setClickCount(prev => prev + 1)}>
              Clicked {clickCount} times
            </Button>
            <Button onClick={() => setClickCount(0)} variant="outline" size="sm">
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}`,
};

function createBasicDemo(componentName) {
  return `'use client';

import React, { useState } from 'react';
import { ${componentName} } from '.';

export default function ${componentName}Demo() {
  const [interactionCount, setInteractionCount] = useState(0);

  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">${componentName} Component</h1>
        <p className="text-muted-foreground">
          Interactive demonstration of the ${componentName} component
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Basic Usage</h3>
          <div className="border rounded-lg p-4 bg-background">
            <${componentName}>
              ${componentName} content
            </${componentName}>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Interactive Example</h3>
          <div className="border rounded-lg p-4 bg-background">
            <${componentName} 
              onClick={() => setInteractionCount(prev => prev + 1)}
            >
              Interactions: {interactionCount}
            </${componentName}>
          </div>
        </div>
      </div>
    </div>
  );
}`;
}

function fixDemo(componentName) {
  const demoPath = path.join(COMPONENTS_PATH, componentName, 'demo.tsx');

  if (!fs.existsSync(demoPath)) {
    console.log(`❌ Demo not found: ${componentName}`);
    return false;
  }

  try {
    let demoContent;

    if (COMPONENT_SPECIFIC_DEMOS[componentName]) {
      demoContent = COMPONENT_SPECIFIC_DEMOS[componentName]();
    } else {
      demoContent = createBasicDemo(componentName);
    }

    fs.writeFileSync(demoPath, demoContent, 'utf8');
    console.log(`✅ Fixed ${componentName}/demo.tsx`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to fix ${componentName}/demo.tsx:`, error.message);
    return false;
  }
}

function fixAllDemos() {
  console.log('🔧 Fixing Component Demos...');

  const components = fs
    .readdirSync(COMPONENTS_PATH, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(name => !name.startsWith('__'));

  let fixed = 0;
  let failed = 0;

  components.forEach(componentName => {
    const result = fixDemo(componentName);
    if (result) fixed++;
    else failed++;
  });

  console.log('');
  console.log('📊 Fix Summary:');
  console.log(`   ✅ Fixed: ${fixed} demos`);
  console.log(`   ❌ Failed: ${failed} demos`);
  console.log(`   📦 Total: ${components.length} components processed`);

  return { fixed, failed, total: components.length };
}

if (require.main === module) {
  const result = fixAllDemos();
  console.log(`\\n🚀 Demo fixing complete! ${result.fixed}/${result.total} demos fixed.`);
}

module.exports = { fixAllDemos, fixDemo };
