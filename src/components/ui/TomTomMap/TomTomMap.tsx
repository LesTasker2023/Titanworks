import { cn } from '@/lib/utils';
import { MapPin, Navigation } from 'lucide-react';
import 'maplibre-gl/dist/maplibre-gl.css';
import React, { useCallback, useEffect, useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl/maplibre';

export interface Address {
  id: string;
  address: string;
  lat?: number;
  lng?: number;
  label?: string;
  description?: string;
}

export interface TomTomMapProps {
  addresses: Address[];
  apiKey: string;
  className?: string;
  height?: string | number;
  width?: string | number;
  defaultZoom?: number;
  defaultCenter?: [number, number];
  onAddressClick?: (address: Address) => void;
  showGeocodeButton?: boolean;
  children?: React.ReactNode;
}

export const TomTomMap: React.FC<TomTomMapProps> = ({
  addresses = [],
  apiKey,
  className,
  height = 400,
  width = '100%',
  defaultZoom = 10,
  defaultCenter = [-0.1276, 51.5074], // London coordinates
  onAddressClick,
  showGeocodeButton = true,
  children,
}) => {
  const [geocodedAddresses, setGeocodedAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Geocode addresses using TomTom API
  const geocodeAddresses = useCallback(async () => {
    if (!apiKey) {
      setError('TomTom API key is required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const geocoded = await Promise.all(
        addresses.map(async addr => {
          // If coordinates are already provided, skip geocoding
          if (addr.lat && addr.lng) {
            return addr;
          }

          try {
            const response = await fetch(
              `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(
                addr.address
              )}.json?key=${apiKey}&limit=1`
            );

            if (!response.ok) {
              throw new Error(`Geocoding failed for: ${addr.address}`);
            }

            const data = await response.json();

            if (data.results && data.results.length > 0) {
              const result = data.results[0];
              return {
                ...addr,
                lat: result.position.lat,
                lng: result.position.lon,
              };
            } else {
              console.warn(`No results found for address: ${addr.address}`);
              return addr;
            }
          } catch (err) {
            console.error(`Failed to geocode ${addr.address}:`, err);
            return addr;
          }
        })
      );

      setGeocodedAddresses(geocoded.filter(addr => addr.lat && addr.lng));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to geocode addresses');
    } finally {
      setIsLoading(false);
    }
  }, [addresses, apiKey]);

  // Auto-geocode when addresses change
  useEffect(() => {
    if (addresses.length > 0) {
      geocodeAddresses();
    }
  }, [geocodeAddresses]);

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
    onAddressClick?.(address);
  };

  return (
    <div className={cn('relative overflow-hidden rounded-lg border', className)}>
      {/* Loading and Error States */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <span className="text-sm">Geocoding addresses...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute top-2 left-2 z-50 rounded-md bg-destructive px-3 py-2 text-sm text-destructive-foreground">
          {error}
        </div>
      )}

      {/* Controls */}
      {showGeocodeButton && (
        <div className="absolute top-2 right-2 z-50">
          <button
            onClick={geocodeAddresses}
            disabled={isLoading}
            className="flex items-center space-x-1 rounded-md bg-primary px-3 py-1 text-sm text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            <Navigation className="h-3 w-3" />
            <span>Refresh</span>
          </button>
        </div>
      )}

      {/* Map Container */}
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
          {/* Address Markers */}
          {geocodedAddresses.map(address => (
            <Marker
              key={address.id}
              longitude={address.lng!}
              latitude={address.lat!}
              anchor="bottom"
              onClick={() => handleMarkerClick(address)}
            >
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label={`Location: ${address.label || address.address}`}
              >
                <MapPin className="h-4 w-4" />
              </button>
            </Marker>
          ))}

          {/* Selected Address Popup */}
          {selectedAddress && selectedAddress.lat && selectedAddress.lng && (
            <Popup
              longitude={selectedAddress.lng}
              latitude={selectedAddress.lat}
              anchor="top"
              onClose={() => setSelectedAddress(null)}
              closeButton={true}
              closeOnClick={false}
              className="max-w-xs"
            >
              <div className="p-3">
                <h3 className="font-semibold text-sm">{selectedAddress.label || 'Location'}</h3>
                <p className="text-xs text-muted-foreground mt-1">{selectedAddress.address}</p>
                {selectedAddress.description && (
                  <p className="text-xs mt-2">{selectedAddress.description}</p>
                )}
              </div>
            </Popup>
          )}

          {children}
        </Map>
      </div>

      {/* Address List */}
      {geocodedAddresses.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 z-40 max-h-32 overflow-y-auto bg-background/95 backdrop-blur-sm">
          <div className="p-2 space-y-1">
            {geocodedAddresses.map(address => (
              <button
                key={address.id}
                onClick={() => handleMarkerClick(address)}
                className="w-full text-left p-2 text-xs rounded hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <div className="font-medium truncate">{address.label || address.address}</div>
                {address.description && (
                  <div className="text-muted-foreground truncate">{address.description}</div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TomTomMap;
