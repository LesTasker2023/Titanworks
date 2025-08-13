import { Button } from '@/components/ui';

export default function ButtonTestPage() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Button Titan Component</h1>
        <p className="text-lg text-muted-foreground">
          Comprehensive button component with variants and sizes
        </p>
      </div>

      {/* Variants */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Variants</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Sizes</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">🚀</Button>
        </div>
      </section>

      {/* States */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">States</h2>
        <div className="flex flex-wrap gap-4">
          <Button>Normal</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>
    </div>
  );
}
