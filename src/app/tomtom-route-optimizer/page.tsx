import type { Metadata } from 'next';
import { TomTomRouteOptimizerDemo } from './TomTomRouteOptimizerDemo';

export const metadata: Metadata = {
  title: 'TomTom Route Optimizer - Daedalus',
  description:
    'Optimize delivery routes with intelligent address search and suggestions. Export optimized routes directly to Google Maps for navigation.',
  keywords: [
    'route optimization',
    'delivery routes',
    'TomTom API',
    'address search',
    'autocomplete',
    'Google Maps export',
    'logistics',
  ],
};

export default function TomTomRouteOptimizerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">TomTom Route Optimizer</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Optimize delivery routes with intelligent address search. Type any address to see
            real-time suggestions, calculate the most efficient path, and export directly to Google
            Maps for navigation.
          </p>
        </div>

        {/* Demo Component */}
        <TomTomRouteOptimizerDemo />

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">🗺️ Google Maps Export</h3>
            <p className="text-sm text-muted-foreground">
              Export your optimized route directly to Google Maps with all waypoints for easy
              navigation.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">� Smart Address Search</h3>
            <p className="text-sm text-muted-foreground">
              Type any address to see real-time suggestions with full address details and instant
              selection.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">🚚 Route Optimization</h3>
            <p className="text-sm text-muted-foreground">
              Advanced algorithms calculate the shortest route through all your addresses using the
              Traveling Salesman Problem.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">📍 Intelligent Suggestions</h3>
            <p className="text-sm text-muted-foreground">
              Real-time address suggestions with full details including postcode, municipality, and
              coordinates.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">🏠 UK Address Support</h3>
            <p className="text-sm text-muted-foreground">
              Supports UK postcodes and house numbers with intelligent address formatting and
              geocoding.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">⏱️ Real-time Calculations</h3>
            <p className="text-sm text-muted-foreground">
              Live route calculations with travel time and distance optimization for efficient
              logistics.
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">🗺️ Interactive Visualization</h3>
          <p className="text-sm text-muted-foreground">
            Visual route display with numbered waypoints, optimized path, and detailed route
            information.
          </p>
        </div>
      </div>
    </div>
  );
}
