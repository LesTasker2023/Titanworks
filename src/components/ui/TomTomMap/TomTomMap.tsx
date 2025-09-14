import { cn } from '@/lib/utils';
import { MapPin, Navigation } from 'lucide-react';
import 'maplibre-gl/dist/maplibre-gl.css';
import React, { useCallback, useEffect, useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl/maplibre';

import './TomTomMap.scss';

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
    <div className={cn('tomtom-map', className)}>
      {/* Loading and Error States */}
      {isLoading && <div className="tomtom-map__loading">Geocoding addresses...</div>}

      {error && <div className="tomtom-map__error">{error}</div>}

      {/* Controls */}
      {showGeocodeButton && (
        <div className="tomtom-map__controls">
          <button
            onClick={geocodeAddresses}
            disabled={isLoading}
            className="tomtom-map__refresh-button"
          >
            <Navigation />
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
                className="tomtom-map__marker"
                aria-label={`Location: ${address.label || address.address}`}
              >
                <MapPin />
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
              className="tomtom-map__popup"
            >
              <div className="tomtom-map__popup-content">
                <h3 className="tomtom-map__popup-title">{selectedAddress.label || 'Location'}</h3>
                <p className="tomtom-map__popup-address">{selectedAddress.address}</p>
                {selectedAddress.description && (
                  <p className="tomtom-map__popup-description">{selectedAddress.description}</p>
                )}
              </div>
            </Popup>
          )}

          {children}
        </Map>
      </div>

      {/* Address List */}
      {geocodedAddresses.length > 0 && (
        <div className="tomtom-map__address-list">
          <div className="tomtom-map__address-list-container">
            {geocodedAddresses.map(address => (
              <button
                key={address.id}
                onClick={() => handleMarkerClick(address)}
                className="tomtom-map__address-list-item"
              >
                <div className="tomtom-map__address-list-label">
                  {address.label || address.address}
                </div>
                {address.description && (
                  <div className="tomtom-map__address-list-description">{address.description}</div>
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
