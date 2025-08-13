'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Header } from '@/components/ui/header';
import Link from 'next/link';

/**
 * Header Test Page - Card/Button Style
 * Clean, focused component showcase
 */

const HeaderTestPage = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Page Header */}
        <div className="flex items-center gap-2 mb-8">
          <h1 className="text-3xl font-bold">Header</h1>
          <Badge variant="secondary">Component Test</Badge>
        </div>

        {/* Header Variants Showcase */}
        <div className="space-y-6">
          {/* Default */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Default Variant</h2>
            <Header variant="default" size="md">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                    TK
                  </div>
                  <span className="font-bold text-lg">TriggerKings</span>
                </div>
                <Button variant="outline" size="sm">
                  Menu
                </Button>
              </div>
            </Header>
          </Card>

          {/* Elevated */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Elevated Variant</h2>
            <Header variant="elevated" size="md">
              <div className="flex items-center justify-between w-full">
                <span className="font-bold text-lg">Elevated Header</span>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                  <Button variant="default" size="sm">
                    Sign Up
                  </Button>
                </div>
              </div>
            </Header>
          </Card>

          {/* Glass */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Glass Variant</h2>
            <Header variant="glass" size="md">
              <div className="flex items-center justify-between w-full">
                <span className="font-bold text-lg">Glass Header</span>
                <Badge variant="outline">Modern</Badge>
              </div>
            </Header>
          </Card>

          {/* Branded */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Branded Variant</h2>
            <Header variant="branded" size="md">
              <div className="flex items-center justify-between w-full">
                <span className="font-bold text-lg text-primary">Branded Header</span>
                <Badge variant="default">Premium</Badge>
              </div>
            </Header>
          </Card>
        </div>

        {/* Size Variants */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Size Variants</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2 text-muted-foreground">Small (sm)</h3>
              <Header variant="default" size="sm">
                <span className="font-semibold">Small Header</span>
              </Header>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2 text-muted-foreground">
                Medium (md) - Default
              </h3>
              <Header variant="default" size="md">
                <span className="font-semibold">Medium Header</span>
              </Header>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2 text-muted-foreground">Large (lg)</h3>
              <Header variant="default" size="lg">
                <span className="font-semibold">Large Header</span>
              </Header>
            </div>
          </div>
        </Card>

        {/* AsChild Example */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">AsChild Pattern</h2>
          <Header asChild variant="elevated">
            <nav className="rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Custom Nav Element</span>
                <Badge variant="secondary">AsChild</Badge>
              </div>
            </nav>
          </Header>
        </Card>

        {/* Usage Example */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Usage Example</h3>
          <pre className="text-sm overflow-x-auto p-4 bg-muted rounded">
            {`<Header variant="elevated" size="md">
  <div className="flex items-center justify-between w-full">
    <span className="font-bold">Brand Name</span>
    <Button variant="outline">Menu</Button>
  </div>
</Header>`}
          </pre>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-6 border-t">
          <Link href="/" className="text-primary hover:underline">
            ← Back to Home
          </Link>
          <Badge variant="outline">Header Complete</Badge>
        </div>
      </div>
    </div>
  );
};

export default HeaderTestPage;
