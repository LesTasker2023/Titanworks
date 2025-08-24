import React, { useState } from 'react';
import { Button } from '../Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../Card';
import { Input } from '../Input';
import { TomTomMap, type Address } from './TomTomMap';

export const TomTomMapDemo: React.FC = () => {
  // You'll need to get a TomTom API key from: https://developer.tomtom.com/
  const TOMTOM_API_KEY = process.env.NEXT_PUBLIC_TOMTOM_API_KEY || 'your-api-key-here';

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      address: 'London, UK',
      label: 'London',
      description: 'Capital of England',
    },
    {
      id: '2',
      address: 'Paris, France',
      label: 'Paris',
      description: 'City of Light',
    },
    {
      id: '3',
      address: 'New York, NY, USA',
      label: 'New York',
      description: 'The Big Apple',
    },
  ]);

  const [newAddress, setNewAddress] = useState('');

  const addAddress = () => {
    if (newAddress.trim()) {
      const newAddr: Address = {
        id: Date.now().toString(),
        address: newAddress.trim(),
        label: newAddress.split(',')[0].trim(),
      };
      setAddresses([...addresses, newAddr]);
      setNewAddress('');
    }
  };

  const removeAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const handleAddressClick = (address: Address) => {
    console.log('Address clicked:', address);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>TomTom Map with Multiple Addresses</CardTitle>
          <CardDescription>
            Interactive map displaying multiple locations with geocoding support. Addresses are
            automatically geocoded and displayed as markers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Add Address Form */}
          <div className="mb-4 flex gap-2">
            <Input
              placeholder="Enter an address (e.g., London, UK)"
              value={newAddress}
              onChange={e => setNewAddress(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && addAddress()}
              className="flex-1"
            />
            <Button onClick={addAddress}>Add Address</Button>
          </div>

          {/* Address List */}
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Current Addresses:</h3>
            <div className="space-y-1">
              {addresses.map(address => (
                <div
                  key={address.id}
                  className="flex items-center justify-between p-2 border rounded text-sm"
                >
                  <div>
                    <span className="font-medium">{address.label || address.address}</span>
                    {address.description && (
                      <span className="text-muted-foreground ml-2">- {address.description}</span>
                    )}
                  </div>
                  <Button variant="outline" size="sm" onClick={() => removeAddress(address.id)}>
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <TomTomMap
            addresses={addresses}
            apiKey={TOMTOM_API_KEY}
            height={500}
            defaultZoom={4}
            onAddressClick={handleAddressClick}
            className="rounded-lg border"
          />

          {/* API Key Notice */}
          {TOMTOM_API_KEY === 'your-api-key-here' && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> To use this map, you need to:
              </p>
              <ol className="text-xs text-yellow-700 mt-1 list-decimal list-inside">
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
                <li>Add it to your environment variables as NEXT_PUBLIC_TOMTOM_API_KEY</li>
                <li>Restart your development server</li>
              </ol>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Usage Example */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Example</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="text-sm bg-muted p-4 rounded-md overflow-x-auto">
            <code>{`import { TomTomMap, type Address } from '@/components/ui/TomTomMap';

const addresses: Address[] = [
  {
    id: '1',
    address: 'London, UK',
    label: 'London',
    description: 'Capital of England',
  },
  {
    id: '2',
    address: 'Paris, France', 
    lat: 48.8566,  // Optional: provide coordinates
    lng: 2.3522,   // to skip geocoding
    label: 'Paris',
  },
];

<TomTomMap
  addresses={addresses}
  apiKey="your-tomtom-api-key"
  height={400}
  defaultZoom={6}
  onAddressClick={(address) => console.log(address)}
/>`}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  );
};

export default TomTomMapDemo;
