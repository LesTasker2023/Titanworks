# TomTomMap Component

A comprehensive React map component built with TomTom Maps API, MapLibre GL, and React Map GL. This component provides interactive mapping capabilities with automatic geocoding, markers, popups, and address management.

## Features

- 🗺️ **Interactive Map**: Built on MapLibre GL for smooth performance
- 📍 **Automatic Geocoding**: Converts addresses to coordinates using TomTom API
- 🏷️ **Custom Markers**: Display locations with custom labels and descriptions
- 💬 **Interactive Popups**: Click markers to view detailed information
- 🔄 **Refresh Functionality**: Manual geocoding refresh button
- 📱 **Responsive Design**: Adapts to different screen sizes
- ♿ **Accessible**: WCAG compliant with proper ARIA labels
- 🎨 **Customizable**: Flexible styling and configuration options
- ⚡ **TypeScript**: Full type safety and IntelliSense support

## Installation

```bash
yarn add maplibre-gl react-map-gl
```

## Environment Variables

Add your TomTom API key to your environment variables:

```env
NEXT_PUBLIC_TOMTOM_API_KEY=your_tomtom_api_key_here
```

[Get your free TomTom API key here](https://developer.tomtom.com/)

## Basic Usage

```tsx
import { TomTomMap } from '@/components/ui';

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
      showGeocodeButton={true}
    />
  );
}
```

## Advanced Usage

```tsx
import { TomTomMap, type Address } from '@/components/ui';

const addressesWithCoordinates: Address[] = [
  {
    id: '1',
    address: 'New York, NY',
    lat: 40.7128,
    lng: -74.006,
    label: 'New York',
    description: 'The Big Apple',
  },
  {
    id: '2',
    address: 'Los Angeles, CA',
    lat: 34.0522,
    lng: -118.2437,
    label: 'Los Angeles',
    description: 'City of Angels',
  },
];

function AdvancedMap() {
  const handleAddressClick = (address: Address) => {
    console.log('Address clicked:', address);
  };

  return (
    <TomTomMap
      addresses={addressesWithCoordinates}
      apiKey={process.env.NEXT_PUBLIC_TOMTOM_API_KEY!}
      height={500}
      width={800}
      defaultZoom={4}
      defaultCenter={[-95.7129, 37.0902]} // Center of USA
      showGeocodeButton={true}
      className="shadow-lg rounded-xl"
      onAddressClick={handleAddressClick}
    />
  );
}
```

## Props

### Required Props

| Prop        | Type        | Description                                |
| ----------- | ----------- | ------------------------------------------ |
| `addresses` | `Address[]` | Array of addresses to display on the map   |
| `apiKey`    | `string`    | TomTom API key for geocoding and map tiles |

### Optional Props

| Prop                | Type                         | Default     | Description                                |
| ------------------- | ---------------------------- | ----------- | ------------------------------------------ |
| `height`            | `number`                     | `400`       | Map height in pixels                       |
| `width`             | `number \| string`           | `"100%"`    | Map width in pixels or percentage          |
| `defaultZoom`       | `number`                     | `2`         | Initial zoom level (1-20)                  |
| `defaultCenter`     | `[number, number]`           | `[0, 0]`    | Initial map center [longitude, latitude]   |
| `showGeocodeButton` | `boolean`                    | `true`      | Show/hide the refresh geocoding button     |
| `className`         | `string`                     | `""`        | Additional CSS classes for the container   |
| `onAddressClick`    | `(address: Address) => void` | `undefined` | Callback when an address marker is clicked |

## Address Interface

```tsx
interface Address {
  id: string;
  address: string;
  lat?: number;
  lng?: number;
  label?: string;
  description?: string;
}
```

### Address Properties

| Property      | Type     | Required | Description                                          |
| ------------- | -------- | -------- | ---------------------------------------------------- |
| `id`          | `string` | ✅       | Unique identifier for the address                    |
| `address`     | `string` | ✅       | Human-readable address string                        |
| `lat`         | `number` | ❌       | Latitude coordinate (auto-geocoded if not provided)  |
| `lng`         | `number` | ❌       | Longitude coordinate (auto-geocoded if not provided) |
| `label`       | `string` | ❌       | Display label for the marker                         |
| `description` | `string` | ❌       | Additional description shown in popup                |

## Examples

### Simple Location Display

```tsx
<TomTomMap
  addresses={[
    {
      id: '1',
      address: 'Times Square, New York, NY',
      label: 'Times Square',
    },
  ]}
  apiKey={process.env.NEXT_PUBLIC_TOMTOM_API_KEY!}
  defaultZoom={15}
/>
```

### Multiple Cities with Custom Styling

```tsx
<TomTomMap
  addresses={[
    { id: '1', address: 'Tokyo, Japan', label: 'Tokyo' },
    { id: '2', address: 'London, UK', label: 'London' },
    { id: '3', address: 'New York, USA', label: 'New York' },
  ]}
  apiKey={process.env.NEXT_PUBLIC_TOMTOM_API_KEY!}
  height={600}
  defaultZoom={3}
  className="border-2 border-gray-300 rounded-lg shadow-xl"
  showGeocodeButton={false}
/>
```

### With Click Handlers

```tsx
function InteractiveMap() {
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  return (
    <div>
      <TomTomMap
        addresses={addresses}
        apiKey={process.env.NEXT_PUBLIC_TOMTOM_API_KEY!}
        onAddressClick={setSelectedAddress}
      />
      {selectedAddress && (
        <div className="mt-4 p-4 border rounded">
          <h3>{selectedAddress.label}</h3>
          <p>{selectedAddress.description}</p>
        </div>
      )}
    </div>
  );
}
```

## Geocoding

The component automatically geocodes addresses that don't have coordinates:

1. **Automatic**: Addresses without `lat`/`lng` are geocoded on mount
2. **Manual**: Click the refresh button to re-geocode all addresses
3. **Efficient**: Addresses with coordinates are not re-geocoded
4. **Error Handling**: Failed geocoding requests are handled gracefully

## Styling

The component uses Tailwind CSS classes and can be customized:

```tsx
<TomTomMap addresses={addresses} apiKey={apiKey} className="custom-map-container" height={400} />
```

Custom CSS:

```css
.custom-map-container {
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
```

## Performance Tips

1. **Provide Coordinates**: Include `lat`/`lng` to avoid geocoding API calls
2. **Limit Addresses**: Large numbers of markers may impact performance
3. **Debounced Updates**: The component debounces rapid address changes
4. **Lazy Loading**: Consider lazy loading for maps not immediately visible

## Error Handling

The component handles various error scenarios:

- **Missing API Key**: Shows error message
- **Geocoding Failures**: Continues without crashing
- **Network Issues**: Graceful fallback behavior
- **Invalid Coordinates**: Validates coordinate ranges

## Accessibility

- Keyboard navigation support
- Screen reader friendly
- ARIA labels and roles
- Focus management
- Color contrast compliance

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## API References

- [TomTom Maps API](https://developer.tomtom.com/maps-api/maps-api-documentation)
- [MapLibre GL JS](https://maplibre.org/maplibre-gl-js-docs/)
- [React Map GL](https://visgl.github.io/react-map-gl/)

## Troubleshooting

### Map Not Loading

- Verify your TomTom API key is valid
- Check console for network errors
- Ensure API key has proper permissions

### Geocoding Not Working

- Confirm API key includes geocoding services
- Check address format (should be human-readable)
- Verify network connectivity

### Performance Issues

- Reduce number of markers
- Provide coordinates instead of addresses
- Consider map clustering for many points

## License

This component is part of the Daedalus UI component library.
