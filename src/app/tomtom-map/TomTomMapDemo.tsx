'use client';

import { TomTomMap, type Address } from '@/components/ui';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { MapPin, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

const initialAddresses: Address[] = [
  {
    id: '1',
    address: 'London, UK',
    label: 'London',
    description: 'Capital of England and the United Kingdom',
  },
  {
    id: '2',
    address: 'Paris, France',
    label: 'Paris',
    description: 'The City of Light and capital of France',
  },
  {
    id: '3',
    address: 'Berlin, Germany',
    label: 'Berlin',
    description: 'Capital and largest city of Germany',
  },
  {
    id: '4',
    address: 'Madrid, Spain',
    lat: 40.4168,
    lng: -3.7038,
    label: 'Madrid',
    description: 'Capital and most populous city of Spain',
  },
];

export function TomTomMapDemo() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [newAddress, setNewAddress] = useState('');
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  // Get API key from environment variables
  const apiKey = process.env.NEXT_PUBLIC_TOMTOM_API_KEY || '';

  const addAddress = () => {
    if (newAddress.trim()) {
      const newId = Date.now().toString();
      setAddresses([
        ...addresses,
        {
          id: newId,
          address: newAddress.trim(),
          label: newAddress.trim().split(',')[0],
        },
      ]);
      setNewAddress('');
    }
  };

  const removeAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const handleAddressClick = (address: Address) => {
    setSelectedAddress(address);
  };

  if (!apiKey) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-red-600">API Key Required</CardTitle>
          <CardDescription>
            To use the TomTom Map component, you need to set up your TomTom API key.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">Setup Instructions:</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-yellow-700">
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
              <li>
                Add it to your <code className="bg-yellow-100 px-1 rounded">.env.local</code> file:
              </li>
              <li>
                <code className="bg-yellow-100 px-2 py-1 rounded block mt-1">
                  NEXT_PUBLIC_TOMTOM_API_KEY=your_api_key_here
                </code>
              </li>
              <li>Restart your development server</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Map Display */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Interactive Map
          </CardTitle>
          <CardDescription>
            Click markers to view details, use the refresh button to re-geocode addresses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TomTomMap
            addresses={addresses}
            apiKey={apiKey}
            height={500}
            defaultZoom={4}
            defaultCenter={[4.9041, 52.3676]} // Europe center
            showGeocodeButton={true}
            onAddressClick={handleAddressClick}
            className="rounded-lg shadow-lg"
          />
        </CardContent>
      </Card>

      {/* Controls */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Add Address */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Add New Address</CardTitle>
            <CardDescription>
              Enter any address to add it to the map. It will be automatically geocoded.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-address">Address</Label>
              <Input
                id="new-address"
                placeholder="e.g., Rome, Italy"
                value={newAddress}
                onChange={e => setNewAddress(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && addAddress()}
              />
            </div>
            <Button onClick={addAddress} className="w-full" disabled={!newAddress.trim()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Address
            </Button>
          </CardContent>
        </Card>

        {/* Selected Address Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Selected Location</CardTitle>
            <CardDescription>
              Click on any marker to view detailed information here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedAddress ? (
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-lg">
                    {selectedAddress.label || selectedAddress.address}
                  </h4>
                  <p className="text-sm text-muted-foreground">{selectedAddress.address}</p>
                </div>
                {selectedAddress.description && (
                  <p className="text-sm">{selectedAddress.description}</p>
                )}
                <div className="flex gap-2">
                  {selectedAddress.lat && selectedAddress.lng ? (
                    <Badge variant="secondary">
                      Coordinates: {selectedAddress.lat.toFixed(4)},{' '}
                      {selectedAddress.lng.toFixed(4)}
                    </Badge>
                  ) : (
                    <Badge variant="outline">Geocoding required</Badge>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                No location selected. Click on a marker to view details.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Address List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Current Addresses ({addresses.length})</CardTitle>
          <CardDescription>Manage the addresses displayed on the map.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {addresses.map(address => (
              <div
                key={address.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
              >
                <div className="flex-1">
                  <div className="font-medium">{address.label || address.address}</div>
                  <div className="text-sm text-muted-foreground">{address.address}</div>
                  {address.lat && address.lng && (
                    <div className="text-xs text-muted-foreground">
                      {address.lat.toFixed(4)}, {address.lng.toFixed(4)}
                    </div>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeAddress(address.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Code Example */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Usage Example</CardTitle>
          <CardDescription>
            Here&apos;s how you can use the TomTomMap component in your own code.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
            <code>{`import { TomTomMap } from '@/components/ui';

const addresses = [
  {
    id: '1',
    address: 'London, UK',
    label: 'London',
    description: 'Capital of England',
  },
  {
    id: '2',
    address: 'Paris, France',
    lat: 48.8566,
    lng: 2.3522,
    label: 'Paris',
    description: 'City of Light',
  },
];

function MyMap() {
  return (
    <TomTomMap
      addresses={addresses}
      apiKey={process.env.NEXT_PUBLIC_TOMTOM_API_KEY!}
      height={400}
      defaultZoom={5}
      showGeocodeButton={true}
      onAddressClick={(address) => console.log('Clicked:', address)}
    />
  );
}`}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
