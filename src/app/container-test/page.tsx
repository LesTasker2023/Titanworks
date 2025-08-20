/**
 * 🚀 Container Component Test Page
 *
 * Testing the enhanced Container component with:
 * - Inherent padding and spacing
 * - Auto-centered children
 * - Layout variants for common patterns
 * - Responsive spacing controls
 */

import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

export default function ContainerTestPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Container size="7xl" padding="lg" layout="flex" spacing="md">
        <h1 className="text-4xl font-bold text-center">Container Component Showcase</h1>
        <p className="text-lg text-muted-foreground text-center max-w-2xl">
          Demonstrating enhanced Container component with automatic padding, spacing, and layout
          control
        </p>
      </Container>

      {/* Layout Examples */}
      <Container size="7xl" padding="xl" layout="flex" spacing="xl">
        {/* Default Flex Layout */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Default Flex Layout</CardTitle>
              <CardDescription>
                layout=&quot;flex&quot; with spacing=&quot;md&quot; - Children are automatically
                spaced and centered
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Container
                size="md"
                padding="lg"
                layout="flex"
                spacing="md"
                className="border border-dashed border-muted"
              >
                <Button variant="default">Button 1</Button>
                <Button variant="secondary">Button 2</Button>
                <Button variant="outline">Button 3</Button>
              </Container>
            </CardContent>
          </Card>
        </section>

        {/* Flex Row Layout */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Flex Row Layout</CardTitle>
              <CardDescription>
                layout=&quot;flex-row&quot; with align=&quot;center&quot; - Horizontal layout with
                centered alignment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Container
                size="md"
                padding="lg"
                layout="flex-row"
                spacing="md"
                align="center"
                className="border border-dashed border-muted gap-4"
              >
                <Button variant="default">Left</Button>
                <Button variant="secondary">Center</Button>
                <Button variant="outline">Right</Button>
              </Container>
            </CardContent>
          </Card>
        </section>

        {/* Centered Layout */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Perfect Center Layout</CardTitle>
              <CardDescription>
                layout=&quot;flex-center&quot; - All children perfectly centered both horizontally
                and vertically
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Container
                size="md"
                padding="2xl"
                layout="flex-center"
                spacing="lg"
                className="border border-dashed border-muted min-h-[200px]"
              >
                <h3 className="text-xl font-semibold">Perfectly Centered</h3>
                <p className="text-muted-foreground text-center">
                  This content is centered in all directions
                </p>
                <Button>Action Button</Button>
              </Container>
            </CardContent>
          </Card>
        </section>

        {/* Space Between Layout */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Space Between Layout</CardTitle>
              <CardDescription>
                layout=&quot;flex-between&quot; - Children are distributed with space between them
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Container
                size="md"
                padding="lg"
                layout="flex-between"
                className="border border-dashed border-muted min-h-[200px]"
              >
                <div className="text-center">
                  <h4 className="font-medium">Top Item</h4>
                  <p className="text-sm text-muted-foreground">Positioned at top</p>
                </div>

                <div className="text-center">
                  <h4 className="font-medium">Middle Item</h4>
                  <p className="text-sm text-muted-foreground">Centered vertically</p>
                </div>

                <div className="text-center">
                  <h4 className="font-medium">Bottom Item</h4>
                  <p className="text-sm text-muted-foreground">Positioned at bottom</p>
                </div>
              </Container>
            </CardContent>
          </Card>
        </section>

        {/* Spacing Variants */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Spacing Variants</CardTitle>
              <CardDescription>Different spacing options: sm, md, lg, xl, 2xl</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Small Spacing */}
              <div>
                <h4 className="text-sm font-medium mb-2">Small Spacing (spacing=&quot;sm&quot;)</h4>
                <Container
                  size="sm"
                  padding="md"
                  layout="flex"
                  spacing="sm"
                  className="border border-dashed border-muted"
                >
                  <div className="h-8 bg-primary/10 rounded px-3 flex items-center text-sm">
                    Item 1
                  </div>
                  <div className="h-8 bg-primary/10 rounded px-3 flex items-center text-sm">
                    Item 2
                  </div>
                  <div className="h-8 bg-primary/10 rounded px-3 flex items-center text-sm">
                    Item 3
                  </div>
                </Container>
              </div>

              {/* Large Spacing */}
              <div>
                <h4 className="text-sm font-medium mb-2">Large Spacing (spacing=&quot;xl&quot;)</h4>
                <Container
                  size="sm"
                  padding="md"
                  layout="flex"
                  spacing="xl"
                  className="border border-dashed border-muted"
                >
                  <div className="h-8 bg-secondary/20 rounded px-3 flex items-center text-sm">
                    Item 1
                  </div>
                  <div className="h-8 bg-secondary/20 rounded px-3 flex items-center text-sm">
                    Item 2
                  </div>
                  <div className="h-8 bg-secondary/20 rounded px-3 flex items-center text-sm">
                    Item 3
                  </div>
                </Container>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Real-world Example */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Real-world Hero Section</CardTitle>
              <CardDescription>
                Example of using Container for a typical hero section layout
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Container
                size="lg"
                padding="2xl"
                layout="flex-center"
                spacing="lg"
                className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg"
              >
                <h2 className="text-3xl font-bold text-center">Welcome to Our Platform</h2>
                <p className="text-lg text-muted-foreground text-center max-w-2xl">
                  Experience the power of perfectly aligned and spaced components with our enhanced
                  Container system.
                </p>
                <Container layout="flex-row" spacing="none" className="gap-4">
                  <Button size="lg">Get Started</Button>
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </Container>
              </Container>
            </CardContent>
          </Card>
        </section>
      </Container>
    </div>
  );
}
