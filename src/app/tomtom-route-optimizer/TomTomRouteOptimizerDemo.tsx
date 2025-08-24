'use client';

import { Alert, AlertDescription } from '@/components/ui/Alert';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { TomTomRouteOptimizer, type Address } from '@/components/ui/TomTomMap';
import { Copy, ExternalLink, Info } from 'lucide-react';
import React, { useState } from 'react';

export const TomTomRouteOptimizerDemo: React.FC = () => {
  const TOMTOM_API_KEY = process.env.NEXT_PUBLIC_TOMTOM_API_KEY || 'your-api-key-here';

  const [currentRoute, setCurrentRoute] = useState<any>(null);

  // Sample UK addresses for demonstration
  const sampleAddresses: Address[] = [
    {
      id: '1',
      address: '123 Oxford Street',
      houseNumber: '123',
      postcode: 'W1D 2HX',
      label: 'Oxford Street Store',
      lat: 51.5147,
      lng: -0.1415,
    },
    {
      id: '2',
      address: '221B Baker Street',
      houseNumber: '221B',
      postcode: 'NW1 6XE',
      label: 'Baker Street Office',
      lat: 51.5238,
      lng: -0.1586,
    },
    {
      id: '3',
      address: '3 Abbey Road',
      houseNumber: '3',
      postcode: 'NW8 9AY',
      label: 'Abbey Road Studios',
      lat: 51.5319,
      lng: -0.181,
    },
    {
      id: '4',
      address: '142 Portobello Road',
      houseNumber: '142',
      postcode: 'W11 2DZ',
      label: 'Portobello Market',
      lat: 51.5158,
      lng: -0.2062,
    },
  ];

  const handleRouteCalculated = (route: any) => {
    setCurrentRoute(route);
    console.log('Optimized route calculated:', route);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) {
      return `${minutes} minutes`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hours ${remainingMinutes} minutes`;
  };

  const formatDistance = (meters: number) => {
    const km = meters / 1000;
    return `${km.toFixed(1)} km`;
  };

  return (
    <div className="space-y-6">
      {/* API Key Warning */}
      {TOMTOM_API_KEY === 'your-api-key-here' && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Setup Required:</strong> To use the route optimizer, you need a TomTom API key.
            <br />
            <ol className="list-decimal list-inside mt-2 space-y-1 text-sm">
              <li>
                Get a free API key from{' '}
                <a
                  href="https://developer.tomtom.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  TomTom Developer Portal
                </a>
              </li>
              <li>Add it to your .env.local file as NEXT_PUBLIC_TOMTOM_API_KEY</li>
              <li>Restart your development server</li>
            </ol>
          </AlertDescription>
        </Alert>
      )}

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">1</Badge>
                <h4 className="font-medium">Add Addresses</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Enter any full address and select from intelligent suggestions, or use the
                pre-loaded sample addresses below.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">2</Badge>
                <h4 className="font-medium">Calculate Route</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Click &quot;Calculate Optimal Route&quot; to find the best path through all
                addresses.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">3</Badge>
                <h4 className="font-medium">Export to Google Maps</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                After calculation, a blue &quot;Export to Google Maps&quot; button will appear for
                navigation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Route Optimizer Demo</CardTitle>
          <p className="text-sm text-muted-foreground">
            Add multiple UK addresses using intelligent address search. Enter any address to see
            real-time suggestions, then calculate the optimal delivery route.
          </p>
        </CardHeader>
        <CardContent>
          <TomTomRouteOptimizer
            initialAddresses={sampleAddresses}
            apiKey={TOMTOM_API_KEY}
            height={600}
            onRouteCalculated={handleRouteCalculated}
            defaultCenter={[-0.1276, 51.5074]} // London
            defaultZoom={11}
          />
        </CardContent>
      </Card>

      {/* Route Statistics */}
      {currentRoute && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Route Statistics
              <Badge variant="outline" className="text-xs">
                Export to Google Maps Available
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <ExternalLink className="h-4 w-4" />
              <AlertDescription>
                Once you have calculated an optimal route, you can export it directly to Google Maps
                with all waypoints preserved. This opens Google Maps in a new tab with your
                optimized route ready for navigation.
              </AlertDescription>
            </Alert>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{currentRoute.order.length}</div>
                <div className="text-sm text-muted-foreground">Waypoints</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {formatDistance(currentRoute.totalDistance)}
                </div>
                <div className="text-sm text-muted-foreground">Total Distance</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {formatTime(currentRoute.totalTime)}
                </div>
                <div className="text-sm text-muted-foreground">Total Travel Time</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Usage Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Basic Implementation</h4>
            <div className="relative">
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                <code>{`import { TomTomRouteOptimizer } from '@/components/ui/TomTomMap';

const MyComponent = () => {
  const addresses = [
    {
      id: '1',
      address: 'Oxford Street',
      houseNumber: '123',
      postcode: 'W1D 2HX',
    },
    {
      id: '2',
      address: 'Baker Street', 
      houseNumber: '221B',
      postcode: 'NW1 6XE',
    },
  ];

  const handleRouteCalculated = (route) => {
    console.log('Optimal route:', route);
  };

  return (
    <TomTomRouteOptimizer
      initialAddresses={addresses}
      apiKey={process.env.NEXT_PUBLIC_TOMTOM_API_KEY}
      onRouteCalculated={handleRouteCalculated}
      height={500}
    />
  );
};`}</code>
              </pre>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() =>
                  copyToClipboard(`import { TomTomRouteOptimizer } from '@/components/ui/TomTomMap';

const MyComponent = () => {
  const addresses = [
    {
      id: '1',
      address: 'Oxford Street',
      houseNumber: '123',
      postcode: 'W1D 2HX',
    },
    {
      id: '2',
      address: 'Baker Street', 
      houseNumber: '221B',
      postcode: 'NW1 6XE',
    },
  ];

  const handleRouteCalculated = (route) => {
    console.log('Optimal route:', route);
  };

  return (
    <TomTomRouteOptimizer
      initialAddresses={addresses}
      apiKey={process.env.NEXT_PUBLIC_TOMTOM_API_KEY}
      onRouteCalculated={handleRouteCalculated}
      height={500}
    />
  );
};`)
                }
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">API Features</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-medium">Route Matrix Calculation</h5>
                <p className="text-xs text-muted-foreground">
                  Uses TomTom&apos;s Route Matrix API to calculate travel times and distances
                  between all address pairs.
                </p>
              </div>
              <div>
                <h5 className="text-sm font-medium">TSP Optimization</h5>
                <p className="text-xs text-muted-foreground">
                  Implements Traveling Salesman Problem algorithms to find the most efficient route
                  order.
                </p>
              </div>
              <div>
                <h5 className="text-sm font-medium">UK Address Support</h5>
                <p className="text-xs text-muted-foreground">
                  Optimized for UK addresses with postcode validation and house number parsing.
                </p>
              </div>
              <div>
                <h5 className="text-sm font-medium">Real-time Routing</h5>
                <p className="text-xs text-muted-foreground">
                  Calculates actual route coordinates for visual path display on the map.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Links */}
      <Card>
        <CardHeader>
          <CardTitle>Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <ExternalLink className="h-3 w-3" />
              <a
                href="https://developer.tomtom.com/routing-api/documentation"
                target="_blank"
                rel="noopener noreferrer"
              >
                TomTom Routing API
              </a>
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <ExternalLink className="h-3 w-3" />
              <a
                href="https://developer.tomtom.com/routing-api/documentation/matrix-routing/calculate-matrix"
                target="_blank"
                rel="noopener noreferrer"
              >
                Route Matrix Documentation
              </a>
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <ExternalLink className="h-3 w-3" />
              <a
                href="https://en.wikipedia.org/wiki/Travelling_salesman_problem"
                target="_blank"
                rel="noopener noreferrer"
              >
                Traveling Salesman Problem
              </a>
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TomTomRouteOptimizerDemo;
