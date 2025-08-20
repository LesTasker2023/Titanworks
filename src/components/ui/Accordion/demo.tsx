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

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Interactive Example</h3>
          <div className="border rounded-lg p-4 bg-background">
            <Accordion items={accordionItems} defaultOpenIndex={0} />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Disabled Example</h3>
          <div className="border rounded-lg p-4 bg-background">
            <Accordion
              items={[
                { title: 'Enabled Section', content: 'This section is interactive.' },
                { title: 'Disabled Section', content: 'This section is disabled.', disabled: true },
                { title: 'Another Enabled Section', content: 'This section works normally.' },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
