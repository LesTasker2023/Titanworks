const fs = require('fs');
const path = require('path');

const componentsDir = 'src/components/ui';

// Component categories for better organization
const componentCategories = {
  // Data Input
  Button: { category: 'Data Input', description: 'Interactive button controls' },
  Input: { category: 'Data Input', description: 'Text input fields' },
  Textarea: { category: 'Data Input', description: 'Multi-line text inputs' },
  Select: { category: 'Data Input', description: 'Dropdown selection inputs' },
  Checkbox: { category: 'Data Input', description: 'Boolean input controls' },
  RadioGroup: { category: 'Data Input', description: 'Single-choice input groups' },
  Switch: { category: 'Data Input', description: 'Toggle switch controls' },
  Slider: { category: 'Data Input', description: 'Range input controls' },
  DatePicker: { category: 'Data Input', description: 'Date selection component' },
  Calendar: { category: 'Data Input', description: 'Date selection interface' },
  ColorPicker: { category: 'Data Input', description: 'Color selection interface' },
  Combobox: { category: 'Data Input', description: 'Searchable select input' },
  Form: { category: 'Data Input', description: 'Form validation and handling' },
  Label: { category: 'Data Input', description: 'Form field labels' },
  Toggle: { category: 'Data Input', description: 'Toggle button controls' },

  // Data Display
  Badge: { category: 'Data Display', description: 'Small status indicators' },
  Avatar: { category: 'Data Display', description: 'User profile pictures' },
  Table: { category: 'Data Display', description: 'Structured data tables' },
  DataTable: { category: 'Data Display', description: 'Sortable data tables' },
  Carousel: { category: 'Data Display', description: 'Scrollable content gallery' },
  Chart: { category: 'Data Display', description: 'Data visualization charts' },

  // Navigation
  Accordion: { category: 'Navigation', description: 'Collapsible content sections' },
  Breadcrumb: { category: 'Navigation', description: 'Navigation hierarchy' },
  Tabs: { category: 'Navigation', description: 'Tabbed content interfaces' },
  NavigationMenu: { category: 'Navigation', description: 'Site navigation menus' },
  Menubar: { category: 'Navigation', description: 'Application menu bar' },
  Pagination: { category: 'Navigation', description: 'Page navigation controls' },
  Command: { category: 'Navigation', description: 'Command palette interface' },

  // Layout
  Card: { category: 'Layout', description: 'Flexible content containers' },
  Separator: { category: 'Layout', description: 'Visual content separators' },
  AspectRatio: { category: 'Layout', description: 'Maintain consistent aspect ratios' },
  ScrollArea: { category: 'Layout', description: 'Custom scrollable areas' },
  Resizable: { category: 'Layout', description: 'Resizable panel layouts' },
  Collapsible: { category: 'Layout', description: 'Expandable content areas' },

  // Overlay
  Dialog: { category: 'Overlay', description: 'Modal dialog windows' },
  AlertDialog: { category: 'Overlay', description: 'Modal dialogs for critical actions' },
  Sheet: { category: 'Overlay', description: 'Side panels and sheets' },
  Popover: { category: 'Overlay', description: 'Floating content panels' },
  HoverCard: { category: 'Overlay', description: 'Hover-triggered content' },
  Tooltip: { category: 'Overlay', description: 'Informational tooltips' },
  ContextMenu: { category: 'Overlay', description: 'Right-click context menus' },
  DropdownMenu: { category: 'Overlay', description: 'Dropdown menu options' },
  Modal: { category: 'Overlay', description: 'General modal overlays' },

  // Feedback
  Alert: { category: 'Feedback', description: 'Display important messages' },
  Toast: { category: 'Feedback', description: 'Notification messages' },
  Progress: { category: 'Feedback', description: 'Progress indicators' },
  Skeleton: { category: 'Feedback', description: 'Loading state placeholders' },
  Sonner: { category: 'Feedback', description: 'Toast notifications' },

  // Other
  ThemeToggle: { category: 'Utility', description: 'Dark/light theme toggle' },
};

// Generic demo template
function generateDemoContent(componentName) {
  const info = componentCategories[componentName] || {
    category: 'Other',
    description: `${componentName} component demonstration`,
  };

  return `'use client';

import React, { useState } from 'react';
import { ${componentName} } from '.';

export default function ${componentName}Demo() {
  const [state, setState] = useState(false);

  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">${componentName} Component</h1>
        <p className="text-muted-foreground">${info.description}</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Basic Usage</h3>
          <div className="border rounded-lg p-4 bg-background">
            <${componentName}>
              ${componentName} Example
            </${componentName}>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Interactive</h3>
          <div className="border rounded-lg p-4 bg-background space-y-2">
            <${componentName} 
              onClick={() => setState(!state)}
            >
              Click me {state ? '(Active)' : '(Inactive)'}
            </${componentName}>
            <p className="text-sm text-muted-foreground">
              State: {state ? 'Active' : 'Inactive'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}`;
}

// Specialized demo templates for specific components
const specializedDemos = {
  Button: `'use client';

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

  Badge: `'use client';

import React from 'react';
import { Badge } from '.';

export default function BadgeDemo() {
  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Badge Component</h1>
        <p className="text-muted-foreground">Small status indicators and labels</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Variants</h3>
          <div className="border rounded-lg p-4 bg-background flex gap-2 flex-wrap items-center">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Use Cases</h3>
          <div className="border rounded-lg p-4 bg-background space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm">Status:</span>
              <Badge variant="secondary">Active</Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Priority:</span>
              <Badge variant="destructive">High</Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Category:</span>
              <Badge variant="outline">Design</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`,

  Input: `'use client';

import React, { useState } from 'react';
import { Input } from '.';
import { Label } from '@/components/ui/Label';

export default function InputDemo() {
  const [value, setValue] = useState('');

  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Input Component</h1>
        <p className="text-muted-foreground">Text input fields with various configurations</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Basic Input</h3>
          <div className="border rounded-lg p-4 bg-background space-y-2">
            <Label htmlFor="basic">Basic Input</Label>
            <Input 
              id="basic"
              placeholder="Enter some text..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Value: {value}</p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Input Types</h3>
          <div className="border rounded-lg p-4 bg-background space-y-3">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="user@example.com" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="disabled">Disabled</Label>
              <Input id="disabled" placeholder="Disabled input" disabled />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`,
};

// Get all component directories
function getComponentDirectories() {
  try {
    const items = fs.readdirSync(componentsDir, { withFileTypes: true });
    return items
      .filter(item => item.isDirectory() && item.name !== 'index.ts')
      .map(item => item.name)
      .sort();
  } catch (error) {
    console.error('Error reading components directory:', error);
    return [];
  }
}

// Create demo file for a component
function createDemoFile(componentName) {
  const componentDir = path.join(componentsDir, componentName);
  const demoPath = path.join(componentDir, 'demo.tsx');

  // Check if component directory exists
  if (!fs.existsSync(componentDir)) {
    console.log(`❌ Directory not found: ${componentName}`);
    return false;
  }

  // Check if demo already exists
  if (fs.existsSync(demoPath)) {
    console.log(`✅ Demo exists: ${componentName}`);
    return true;
  }

  try {
    // Use specialized demo if available, otherwise generic
    const content = specializedDemos[componentName] || generateDemoContent(componentName);
    fs.writeFileSync(demoPath, content);
    console.log(`✅ Created: ${componentName}/demo.tsx`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to create ${componentName}/demo.tsx:`, error.message);
    return false;
  }
}

// Main execution
console.log('🚀 Generating Component Demos...\n');

const components = getComponentDirectories();
let created = 0;
let existed = 0;
let failed = 0;

components.forEach(componentName => {
  const result = createDemoFile(componentName);
  if (result) {
    if (fs.existsSync(path.join(componentsDir, componentName, 'demo.tsx'))) {
      // Check if it was just created or already existed
      const stats = fs.statSync(path.join(componentsDir, componentName, 'demo.tsx'));
      const now = new Date();
      const fileTime = new Date(stats.mtime);

      if (now - fileTime < 1000) {
        // Created within last second
        created++;
      } else {
        existed++;
      }
    }
  } else {
    failed++;
  }
});

console.log(`
📊 Generation Summary:
   ✅ Created: ${created} demos
   📋 Existed: ${existed} demos  
   ❌ Failed: ${failed} demos
   📦 Total: ${components.length} components processed

🎯 All component demos ready for showcase import!
`);
