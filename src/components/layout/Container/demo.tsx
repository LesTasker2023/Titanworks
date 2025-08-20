'use client';

import { Card } from '@/components/ui/Card';
import { Container } from '../Container';

export default function ContainerDemo() {
  return (
    <div className="space-y-8 p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Container Component</h1>
        <p className="text-muted-foreground">
          Responsive container component with configurable sizes, padding, and alignment.
        </p>
      </div>

      {/* Size Variants */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Container Sizes</h3>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Small (max-w-2xl)</p>
              <div className="bg-muted rounded-lg p-1">
                <Container size="sm" className="bg-background border rounded p-4">
                  <p className="text-center text-sm">Small Container</p>
                </Container>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Medium (max-w-4xl)</p>
              <div className="bg-muted rounded-lg p-1">
                <Container size="md" className="bg-background border rounded p-4">
                  <p className="text-center text-sm">Medium Container</p>
                </Container>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Large (max-w-6xl)</p>
              <div className="bg-muted rounded-lg p-1">
                <Container size="lg" className="bg-background border rounded p-4">
                  <p className="text-center text-sm">Large Container</p>
                </Container>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Extra Large (max-w-7xl) - Default
              </p>
              <div className="bg-muted rounded-lg p-1">
                <Container size="xl" className="bg-background border rounded p-4">
                  <p className="text-center text-sm">Extra Large Container</p>
                </Container>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Content (max-w-prose)</p>
              <div className="bg-muted rounded-lg p-1">
                <Container size="content" className="bg-background border rounded p-4">
                  <p className="text-center text-sm">Content Container (optimized for reading)</p>
                </Container>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Padding Variants */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Padding Options</h3>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">No Padding</p>
              <div className="bg-muted rounded-lg">
                <Container size="md" padding="none" className="bg-background border rounded">
                  <div className="bg-primary/10 p-4">
                    <p className="text-center text-sm">Container with no padding</p>
                  </div>
                </Container>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Small Padding</p>
              <div className="bg-muted rounded-lg p-1">
                <Container size="md" padding="sm" className="bg-background border rounded">
                  <div className="bg-primary/10 rounded">
                    <p className="text-center text-sm p-4">Container with small padding</p>
                  </div>
                </Container>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Medium Padding (Default)</p>
              <div className="bg-muted rounded-lg p-1">
                <Container size="md" padding="md" className="bg-background border rounded">
                  <div className="bg-primary/10 rounded">
                    <p className="text-center text-sm p-4">Container with medium padding</p>
                  </div>
                </Container>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Large Padding</p>
              <div className="bg-muted rounded-lg p-1">
                <Container size="md" padding="lg" className="bg-background border rounded">
                  <div className="bg-primary/10 rounded">
                    <p className="text-center text-sm p-4">Container with large padding</p>
                  </div>
                </Container>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* As Prop Demo */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Semantic Elements</h3>
          <p className="text-sm text-muted-foreground">
            Use the `as` prop to render different HTML elements while maintaining container styling.
          </p>

          <div className="space-y-4">
            <Container as="section" size="md" className="bg-background border rounded p-4">
              <p className="text-center text-sm">Rendered as &lt;section&gt;</p>
            </Container>

            <Container as="article" size="md" className="bg-background border rounded p-4">
              <p className="text-center text-sm">Rendered as &lt;article&gt;</p>
            </Container>

            <Container as="header" size="md" className="bg-background border rounded p-4">
              <p className="text-center text-sm">Rendered as &lt;header&gt;</p>
            </Container>
          </div>
        </div>
      </Card>

      {/* Center Alignment */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Center Alignment</h3>

          <Container size="md" center className="bg-background border rounded p-6">
            <h4 className="text-lg font-semibold">Centered Content</h4>
            <p className="text-muted-foreground">
              This container has center alignment applied to all text content.
            </p>
          </Container>
        </div>
      </Card>

      {/* Usage Example */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Usage Example</h3>
          <div className="bg-muted rounded-lg p-4">
            <pre className="text-sm">
              {`<Container size="lg" padding="md" className="space-y-6">
  <h1>Page Title</h1>
  <p>Page content with proper spacing and constraints.</p>
</Container>`}
            </pre>
          </div>
        </div>
      </Card>
    </div>
  );
}
