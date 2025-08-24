import type { Metadata } from 'next';
import { TomTomMapDemo } from './TomTomMapDemo';

export const metadata: Metadata = {
  title: 'TomTom Map | Daedalus',
  description:
    'Interactive map component showcasing TomTom Maps API integration with geocoding and custom markers.',
};

export default function TomTomMapPage() {
  return (
    <div className="container mx-auto py-10 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">TomTom Map Component</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Interactive mapping with automatic geocoding, custom markers, and responsive design.
            Built with TomTom Maps API and MapLibre GL.
          </p>
        </div>

        {/* Demo Component */}
        <TomTomMapDemo />

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">🗺️ Interactive Maps</h3>
            <p className="text-sm text-muted-foreground">
              Smooth, responsive maps powered by MapLibre GL with pan, zoom, and click interactions.
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">📍 Auto Geocoding</h3>
            <p className="text-sm text-muted-foreground">
              Automatically converts addresses to coordinates using TomTom&apos;s geocoding API.
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">🏷️ Custom Markers</h3>
            <p className="text-sm text-muted-foreground">
              Display locations with custom labels, descriptions, and interactive popups.
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">📱 Responsive</h3>
            <p className="text-sm text-muted-foreground">
              Adapts to any screen size with flexible dimensions and mobile-friendly interactions.
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">♿ Accessible</h3>
            <p className="text-sm text-muted-foreground">
              WCAG compliant with proper ARIA labels, keyboard navigation, and screen reader
              support.
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">⚡ TypeScript</h3>
            <p className="text-sm text-muted-foreground">
              Full type safety with comprehensive interfaces and IntelliSense support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
