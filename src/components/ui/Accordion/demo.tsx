'use client';

import { Accordion } from '.';

export default function AccordionDemo() {
  const accordionItems = [
    {
      title: 'Getting Started',
      content: (
        <div className="space-y-2">
          <p>
            Welcome to our component library. This accordion shows how to organize content in
            collapsible sections.
          </p>
          <p>Click on any section to expand or collapse it.</p>
        </div>
      ),
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
      ),
    },
    {
      title: 'Advanced Usage',
      content: (
        <div>
          <p>Advanced configuration options and integration patterns.</p>
          <code className="block mt-2 p-2 bg-muted rounded text-sm">
            &lt;Accordion defaultValue=&quot;item-1&quot;&gt;...&lt;/Accordion&gt;
          </code>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Accordion Component</h1>
        <p className="text-muted-foreground">
          Collapsible content sections with keyboard navigation
        </p>
      </div>

      <div className="space-y-8">
        {/* Basic Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Basic Usage</h3>
            <p className="text-sm text-muted-foreground">
              Simple accordion with default behavior and single item expansion
            </p>
          </div>
          <div className="border rounded-lg p-4 bg-background">
            <Accordion
              items={[
                {
                  title: 'What is this component?',
                  content:
                    'A collapsible accordion that organizes content into expandable sections.',
                },
                {
                  title: 'How do I use it?',
                  content: 'Click on any section header to expand or collapse the content.',
                },
                {
                  title: 'Is it accessible?',
                  content: 'Yes, it includes keyboard navigation and screen reader support.',
                },
              ]}
              defaultOpenIndex={0}
            />
          </div>
        </div>

        {/* Advanced Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Advanced Usage</h3>
            <p className="text-sm text-muted-foreground">
              Complex content with multiple states, rich formatting, and interactive elements
            </p>
          </div>
          <div className="border rounded-lg p-4 bg-background space-y-4">
            <Accordion items={accordionItems} defaultOpenIndex={0} />

            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">With Mixed States</h4>
              <Accordion
                items={[
                  {
                    title: '📊 Dashboard Overview',
                    content: (
                      <div className="space-y-3">
                        <p>Access your analytics and key metrics.</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="p-2 bg-muted rounded">Users: 1,234</div>
                          <div className="p-2 bg-muted rounded">Sessions: 5,678</div>
                        </div>
                      </div>
                    ),
                  },
                  {
                    title: '🔧 Settings Panel',
                    content: 'Configure your preferences and account settings here.',
                    disabled: true,
                  },
                  {
                    title: '📋 Recent Activity',
                    content: (
                      <ul className="space-y-1 text-sm">
                        <li>• User logged in at 2:30 PM</li>
                        <li>• New report generated</li>
                        <li>• Settings updated</li>
                      </ul>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
