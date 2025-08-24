import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import { ArrowRight, Clock, ExternalLink, MapPin, Navigation, Plus, Route, X } from 'lucide-react';
import 'maplibre-gl/dist/maplibre-gl.css';
import React, { useCallback, useEffect, useState } from 'react';
import Map, { Layer, Marker, Popup, Source } from 'react-map-gl/maplibre';

export interface Address {
  id: string;
  address: string;
  postcode?: string;
  houseNumber?: string;
  lat?: number;
  lng?: number;
  label?: string;
  description?: string;
}

interface RouteMatrix {
  travelTimes: number[][];
  distances: number[][];
}

export interface OptimizedRoute {
  order: number[];
  totalDistance: number;
  totalTime: number;
  coordinates: [number, number][];
}

export interface TomTomRouteOptimizerProps {
  initialAddresses?: Address[];
  apiKey: string;
  className?: string;
  height?: string | number;
  width?: string | number;
  defaultZoom?: number;
  defaultCenter?: [number, number];
  onRouteCalculated?: (route: OptimizedRoute) => void;
  showAddressInput?: boolean;
  children?: React.ReactNode;
}

export const TomTomRouteOptimizer: React.FC<TomTomRouteOptimizerProps> = ({
  initialAddresses = [],
  apiKey,
  className,
  height = 500,
  width = '100%',
  defaultZoom = 10,
  defaultCenter = [-0.1276, 51.5074], // London coordinates
  onRouteCalculated,
  showAddressInput = true,
  children,
}) => {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [geocodedAddresses, setGeocodedAddresses] = useState<Address[]>([]);
  const [optimizedRoute, setOptimizedRoute] = useState<OptimizedRoute | null>(null);
  const [routeMatrix, setRouteMatrix] = useState<RouteMatrix | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCalculatingRoute, setIsCalculatingRoute] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newFullAddress, setNewFullAddress] = useState('');
  const [addressSuggestions, setAddressSuggestions] = useState<any[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  // Generate random points for gamification
  const generateRandomPoints = () => {
    const pointValues = [10, 15, 20, 25, 30, 35, 40, 45, 50];
    return pointValues[Math.floor(Math.random() * pointValues.length)];
  };

  // Search for address suggestions using TomTom Geocoding API
  const searchAddresses = useCallback(
    async (query: string) => {
      if (!apiKey || query.length < 3) {
        setAddressSuggestions([]);
        return;
      }

      setIsLoadingSuggestions(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(query.trim())}.json?key=${apiKey}&limit=5&countrySet=GB`
        );

        if (!response.ok) {
          throw new Error('Failed to search addresses');
        }

        const data = await response.json();

        if (data.results && data.results.length > 0) {
          setAddressSuggestions(data.results);
        } else {
          setAddressSuggestions([]);
        }
      } catch (err) {
        console.error('Failed to search addresses:', err);
        setError(err instanceof Error ? err.message : 'Failed to search addresses');
        setAddressSuggestions([]);
      } finally {
        setIsLoadingSuggestions(false);
      }
    },
    [apiKey]
  );

  // Handle address search when input changes
  useEffect(() => {
    if (newFullAddress.length >= 3) {
      const timeoutId = setTimeout(() => {
        searchAddresses(newFullAddress);
      }, 300); // 300ms debounce

      return () => clearTimeout(timeoutId);
    } else {
      setAddressSuggestions([]);
    }
  }, [newFullAddress, searchAddresses]);

  // Geocode addresses using TomTom API
  const geocodeAddresses = useCallback(
    async (addressesToGeocode: Address[]) => {
      if (!apiKey) {
        setError('TomTom API key is required');
        return [];
      }

      const geocoded = await Promise.all(
        addressesToGeocode.map(async addr => {
          // If coordinates are already provided, skip geocoding
          if (addr.lat && addr.lng) {
            return addr;
          }

          try {
            const fullAddress = addr.address;

            const response = await fetch(
              `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(
                fullAddress
              )}.json?key=${apiKey}&limit=1&countrySet=GB`
            );

            if (!response.ok) {
              throw new Error(`Geocoding failed for: ${fullAddress}`);
            }

            const data = await response.json();

            if (data.results && data.results.length > 0) {
              const result = data.results[0];
              return {
                ...addr,
                lat: result.position.lat,
                lng: result.position.lon,
                label: result.address.freeformAddress,
              };
            } else {
              console.warn(`No results found for address: ${fullAddress}`);
              return addr;
            }
          } catch (err) {
            console.error(`Failed to geocode ${addr.address}:`, err);
            return addr;
          }
        })
      );

      return geocoded.filter(addr => addr.lat && addr.lng);
    },
    [apiKey]
  );

  // Calculate route matrix using TomTom API
  const calculateRouteMatrix = useCallback(
    async (locations: Address[]): Promise<RouteMatrix | null> => {
      if (!apiKey || locations.length < 2) {
        return null;
      }

      // First try the simple routing approach for each pair
      try {
        console.log('Calculating route matrix for', locations.length, 'locations');

        const travelTimes: number[][] = [];
        const distances: number[][] = [];

        // Initialize arrays
        for (let i = 0; i < locations.length; i++) {
          travelTimes[i] = [];
          distances[i] = [];
          for (let j = 0; j < locations.length; j++) {
            if (i === j) {
              travelTimes[i][j] = 0;
              distances[i][j] = 0;
            } else {
              travelTimes[i][j] = 0;
              distances[i][j] = 0;
            }
          }
        }

        // Calculate routes between each pair of locations
        for (let i = 0; i < locations.length; i++) {
          for (let j = 0; j < locations.length; j++) {
            if (i !== j) {
              try {
                const from = locations[i];
                const to = locations[j];

                const response = await fetch(
                  `https://api.tomtom.com/routing/1/calculateRoute/${from.lat},${from.lng}:${to.lat},${to.lng}/json?key=${apiKey}&routeType=fastest&traffic=false&travelMode=car`
                );

                if (response.ok) {
                  const data = await response.json();
                  if (data.routes && data.routes.length > 0) {
                    const route = data.routes[0];
                    travelTimes[i][j] = route.summary.travelTimeInSeconds;
                    distances[i][j] = route.summary.lengthInMeters;
                  } else {
                    // Use straight-line distance as fallback
                    const distance = calculateStraightLineDistance(from, to);
                    travelTimes[i][j] = Math.round(distance / 15); // Rough estimate: 15 m/s average speed
                    distances[i][j] = distance;
                  }
                } else {
                  // Use straight-line distance as fallback
                  const distance = calculateStraightLineDistance(from, to);
                  travelTimes[i][j] = Math.round(distance / 15);
                  distances[i][j] = distance;
                }
              } catch (err) {
                console.warn(`Failed to calculate route from ${i} to ${j}:`, err);
                // Use straight-line distance as fallback
                const distance = calculateStraightLineDistance(locations[i], locations[j]);
                travelTimes[i][j] = Math.round(distance / 15);
                distances[i][j] = distance;
              }
            }
          }
        }

        console.log('Route matrix calculated successfully');
        return { travelTimes, distances };
      } catch (err) {
        console.error('Failed to calculate route matrix:', err);
        return null;
      }
    },
    [apiKey]
  );

  // Calculate straight-line distance between two points (Haversine formula)
  const calculateStraightLineDistance = (from: Address, to: Address): number => {
    const R = 6371000; // Earth's radius in meters
    const φ1 = (from.lat! * Math.PI) / 180;
    const φ2 = (to.lat! * Math.PI) / 180;
    const Δφ = ((to.lat! - from.lat!) * Math.PI) / 180;
    const Δλ = ((to.lng! - from.lng!) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  // Solve TSP using nearest neighbor heuristic (simple but effective)
  const solveTSP = useCallback((matrix: RouteMatrix, startIndex: number = 0): number[] => {
    const n = matrix.travelTimes.length;
    const visited = new Array(n).fill(false);
    const tour = [startIndex];
    visited[startIndex] = true;

    let currentCity = startIndex;
    let totalTime = 0;

    for (let i = 1; i < n; i++) {
      let nearestCity = -1;
      let nearestTime = Infinity;

      for (let j = 0; j < n; j++) {
        if (!visited[j] && matrix.travelTimes[currentCity][j] < nearestTime) {
          nearestTime = matrix.travelTimes[currentCity][j];
          nearestCity = j;
        }
      }

      if (nearestCity !== -1) {
        visited[nearestCity] = true;
        tour.push(nearestCity);
        totalTime += nearestTime;
        currentCity = nearestCity;
      }
    }

    return tour;
  }, []);

  // Get route coordinates between waypoints
  const getRouteCoordinates = useCallback(
    async (waypoints: Address[]): Promise<[number, number][]> => {
      if (!apiKey || waypoints.length < 2) {
        return [];
      }

      try {
        const locations = waypoints.map(wp => `${wp.lat},${wp.lng}`).join(':');
        const response = await fetch(
          `https://api.tomtom.com/routing/1/calculateRoute/${locations}/json?key=${apiKey}&routeType=fastest&traffic=false`
        );

        if (!response.ok) {
          throw new Error('Failed to get route coordinates');
        }

        const data = await response.json();

        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0];
          const coordinates: [number, number][] = [];

          route.legs.forEach((leg: any) => {
            leg.points.forEach((point: any) => {
              coordinates.push([point.longitude, point.latitude]);
            });
          });

          return coordinates;
        }

        return [];
      } catch (err) {
        console.error('Failed to get route coordinates:', err);
        return [];
      }
    },
    [apiKey]
  );

  // Add new address from suggestion
  const addAddressFromSuggestion = useCallback((suggestion: any) => {
    const address: Address = {
      id: Date.now().toString(),
      address: suggestion.address.freeformAddress,
      postcode: suggestion.address.postalCode,
      houseNumber: suggestion.address.streetNumber,
      lat: suggestion.position.lat,
      lng: suggestion.position.lon,
      label: suggestion.address.freeformAddress,
    };

    setAddresses(prev => [...prev, address]);
    setNewFullAddress('');
    setAddressSuggestions([]);
    // Clear the optimized route when addresses change
    setOptimizedRoute(null);
    setRouteMatrix(null);
  }, []);

  // Add new address manually (fallback)
  const addAddress = useCallback(() => {
    if (!newFullAddress.trim()) return;

    const address: Address = {
      id: Date.now().toString(),
      address: newFullAddress.trim(),
    };

    setAddresses(prev => [...prev, address]);
    setNewFullAddress('');
    setAddressSuggestions([]);
    // Clear the optimized route when addresses change
    setOptimizedRoute(null);
    setRouteMatrix(null);
  }, [newFullAddress]);

  // Remove address
  const removeAddress = useCallback((id: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
    // Clear the optimized route when addresses change
    setOptimizedRoute(null);
    setRouteMatrix(null);
  }, []);

  // Export route to Google Maps
  const exportToGoogleMaps = useCallback(() => {
    if (!optimizedRoute || geocodedAddresses.length === 0) return;

    const orderedAddresses = optimizedRoute.order.map(index => geocodedAddresses[index]);

    // Create waypoints (excluding origin and destination)
    const waypoints = orderedAddresses
      .slice(1, -1)
      .map(addr => encodeURIComponent(addr.address))
      .join('|');

    // Build Google Maps URL
    const origin = encodeURIComponent(orderedAddresses[0].address);
    const destination = encodeURIComponent(orderedAddresses[orderedAddresses.length - 1].address);

    let url = `https://www.google.com/maps/dir/${origin}`;

    if (waypoints) {
      url += `/${waypoints}`;
    }

    url += `/${destination}`;

    console.log('Generated Google Maps URL:', url);
    console.log(
      'Route order:',
      orderedAddresses.map(addr => addr.address)
    );

    // Open in new tab
    window.open(url, '_blank');
  }, [optimizedRoute, geocodedAddresses]);

  // Calculate optimal route
  const calculateOptimalRoute = useCallback(async () => {
    if (geocodedAddresses.length < 2) {
      setError('At least 2 addresses are required for route optimization');
      return;
    }

    setIsCalculatingRoute(true);
    setError(null);

    try {
      // Get route matrix
      const matrix = await calculateRouteMatrix(geocodedAddresses);
      if (!matrix) {
        throw new Error('Failed to calculate route matrix');
      }

      setRouteMatrix(matrix);

      // Solve TSP to get optimal order
      const optimalOrder = solveTSP(matrix, 0);

      // Calculate total distance and time
      let totalDistance = 0;
      let totalTime = 0;

      for (let i = 0; i < optimalOrder.length - 1; i++) {
        const from = optimalOrder[i];
        const to = optimalOrder[i + 1];
        totalDistance += matrix.distances[from][to];
        totalTime += matrix.travelTimes[from][to];
      }

      // Get route coordinates
      const orderedAddresses = optimalOrder.map(index => geocodedAddresses[index]);
      const coordinates = await getRouteCoordinates(orderedAddresses);

      const route: OptimizedRoute = {
        order: optimalOrder,
        totalDistance,
        totalTime,
        coordinates,
      };

      setOptimizedRoute(route);
      onRouteCalculated?.(route);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to calculate optimal route');
    } finally {
      setIsCalculatingRoute(false);
    }
  }, [geocodedAddresses, calculateRouteMatrix, solveTSP, getRouteCoordinates, onRouteCalculated]);

  // Auto-geocode when addresses change
  useEffect(() => {
    if (addresses.length > 0) {
      setIsLoading(true);
      geocodeAddresses(addresses)
        .then(setGeocodedAddresses)
        .finally(() => setIsLoading(false));
    } else {
      setGeocodedAddresses([]);
    }
  }, [addresses, geocodeAddresses]);

  // Calculate map bounds to fit all markers
  const getMapBounds = useCallback(() => {
    if (geocodedAddresses.length === 0) return null;

    const lats = geocodedAddresses.map(addr => addr.lat!);
    const lngs = geocodedAddresses.map(addr => addr.lng!);

    return {
      minLat: Math.min(...lats),
      maxLat: Math.max(...lats),
      minLng: Math.min(...lngs),
      maxLng: Math.max(...lngs),
    };
  }, [geocodedAddresses]);

  const bounds = getMapBounds();

  // Calculate center from all addresses or use default
  const mapCenter: [number, number] = bounds
    ? [(bounds.minLng + bounds.maxLng) / 2, (bounds.minLat + bounds.maxLat) / 2]
    : defaultCenter;

  const handleMarkerClick = (address: Address) => {
    setSelectedAddress(address);
  };

  // Format time in minutes
  const formatTime = (seconds: number) => {
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  // Format distance in km
  const formatDistance = (meters: number) => {
    const km = meters / 1000;
    return `${km.toFixed(1)}km`;
  };

  // Create route line GeoJSON
  const routeGeoJSON = optimizedRoute?.coordinates.length
    ? {
        type: 'Feature' as const,
        properties: {},
        geometry: {
          type: 'LineString' as const,
          coordinates: optimizedRoute.coordinates,
        },
      }
    : null;

  return (
    <div className={cn('space-y-4', className)}>
      {/* Address Input Section */}
      {showAddressInput && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Address Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Input
                placeholder="Enter full address (e.g., 123 Oxford Street, London W1D 2HX)"
                value={newFullAddress}
                onChange={e => setNewFullAddress(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && addAddress()}
                className="pr-10"
              />
              {isLoadingSuggestions && (
                <div className="absolute right-3 top-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
              )}
            </div>

            {/* Address Suggestions */}
            {addressSuggestions.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Address suggestions:</h4>
                <div className="grid gap-1 max-h-48 overflow-y-auto">
                  {addressSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => addAddressFromSuggestion(suggestion)}
                      className="text-left text-sm p-3 rounded hover:bg-muted transition-colors border border-border flex flex-col"
                    >
                      <span className="font-medium">{suggestion.address.freeformAddress}</span>
                      <span className="text-xs text-muted-foreground">
                        {suggestion.address.municipality}, {suggestion.address.postalCode}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Button onClick={addAddress} disabled={!newFullAddress.trim()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Address Manually
            </Button>

            {/* Address List */}
            {addresses.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Addresses ({addresses.length})</h4>
                <div className="space-y-1">
                  {addresses.map((addr, index) => (
                    <div
                      key={addr.id}
                      className="flex items-center justify-between p-2 bg-muted rounded"
                    >
                      <span className="text-sm">
                        {index + 1}. {addr.address}
                        {addr.postcode && (
                          <span className="text-muted-foreground ml-2">({addr.postcode})</span>
                        )}
                      </span>
                      <Button variant="ghost" size="sm" onClick={() => removeAddress(addr.id)}>
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Route Calculation */}
            <div className="flex gap-2 flex-wrap items-center">
              <Button
                onClick={calculateOptimalRoute}
                disabled={geocodedAddresses.length < 2 || isCalculatingRoute}
                className="flex items-center gap-2"
              >
                <Route className="h-4 w-4" />
                {isCalculatingRoute ? 'Calculating...' : 'Calculate Optimal Route'}
              </Button>

              {optimizedRoute && (
                <Button
                  onClick={exportToGoogleMaps}
                  variant="default"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  <ExternalLink className="h-4 w-4" />
                  Export to Google Maps
                </Button>
              )}

              {optimizedRoute && (
                <div className="flex items-center gap-4 text-sm">
                  <Badge variant="secondary">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatTime(optimizedRoute.totalTime)}
                  </Badge>
                  <Badge variant="secondary">
                    <Navigation className="h-3 w-3 mr-1" />
                    {formatDistance(optimizedRoute.totalDistance)}
                  </Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Route Order Display */}
      {optimizedRoute && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Route className="h-5 w-5" />
              Optimal Route Order
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {optimizedRoute.order
                .map((addressIndex, routeIndex) => {
                  const address = geocodedAddresses[addressIndex];
                  // Skip if address doesn't exist (can happen when addresses are removed)
                  if (!address) return null;

                  return (
                    <div key={address.id} className="flex items-center gap-2">
                      <Badge variant="outline">{routeIndex + 1}</Badge>
                      <span className="text-sm flex-1">
                        {address.address}
                        {address.postcode && (
                          <span className="text-muted-foreground ml-2">({address.postcode})</span>
                        )}
                      </span>
                      {routeIndex < optimizedRoute.order.length - 1 && (
                        <ArrowRight className="h-3 w-3 text-muted-foreground" />
                      )}
                    </div>
                  );
                })
                .filter(Boolean)}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Map Container */}
      <div className={cn('relative overflow-hidden rounded-lg border', className)}>
        {/* Loading and Error States */}
        {(isLoading || isCalculatingRoute) && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80">
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <span className="text-sm">
                {isLoading ? 'Geocoding addresses...' : 'Calculating optimal route...'}
              </span>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute top-2 left-2 z-50 rounded-md bg-destructive px-3 py-2 text-sm text-destructive-foreground">
            {error}
          </div>
        )}

        {/* Map */}
        <div style={{ height, width }}>
          <Map
            mapLib={import('maplibre-gl')}
            initialViewState={{
              longitude: mapCenter[0],
              latitude: mapCenter[1],
              zoom: defaultZoom,
            }}
            style={{ width: '100%', height: '100%' }}
            mapStyle={`https://api.tomtom.com/map/1/style/20.0.0-8/basic_main.json?key=${apiKey}`}
            onError={error => {
              console.error('Map error:', error);
              setError('Failed to load map');
            }}
          >
            {/* Route Line */}
            {routeGeoJSON && (
              <Source id="route" type="geojson" data={routeGeoJSON}>
                <Layer
                  id="route-line"
                  type="line"
                  paint={{
                    'line-color': '#3b82f6',
                    'line-width': 4,
                    'line-opacity': 0.8,
                  }}
                />
              </Source>
            )}

            {/* Address Markers */}
            {geocodedAddresses.map((address, index) => {
              const routeIndex = optimizedRoute?.order.indexOf(index) ?? -1;
              return (
                <Marker
                  key={address.id}
                  longitude={address.lng!}
                  latitude={address.lat!}
                  anchor="bottom"
                  onClick={() => handleMarkerClick(address)}
                >
                  <button
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-full shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 text-xs font-bold text-white',
                      routeIndex === 0
                        ? 'bg-green-600'
                        : routeIndex === (optimizedRoute?.order.length ?? 0) - 1
                          ? 'bg-red-600'
                          : 'bg-primary'
                    )}
                    aria-label={`Location: ${address.label || address.address}`}
                  >
                    {routeIndex >= 0 ? routeIndex + 1 : index + 1}
                  </button>
                </Marker>
              );
            })}

            {/* Popup for selected address */}
            {selectedAddress && selectedAddress.lat && selectedAddress.lng && (
              <Popup
                longitude={selectedAddress.lng}
                latitude={selectedAddress.lat}
                anchor="top"
                onClose={() => setSelectedAddress(null)}
                closeButton={true}
                closeOnClick={false}
                className="z-50"
              >
                <div className="p-2">
                  <h3 className="font-medium">
                    {selectedAddress.label || selectedAddress.address}
                  </h3>
                  {selectedAddress.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedAddress.description}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {selectedAddress.lat?.toFixed(6)}, {selectedAddress.lng?.toFixed(6)}
                  </p>
                </div>
              </Popup>
            )}

            {children}
          </Map>
        </div>
      </div>
    </div>
  );
};

export default TomTomRouteOptimizer;
