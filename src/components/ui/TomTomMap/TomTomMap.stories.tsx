import type { Meta, StoryObj } from '@storybook/react';
import { TomTomMap } from './TomTomMap';

const meta: Meta<typeof TomTomMap> = {
  title: 'UI/TomTomMap',
  component: TomTomMap,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Interactive map component using TomTom Maps API with support for multiple addresses and automatic geocoding.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    addresses: {
      description: 'Array of addresses to display on the map',
      control: { type: 'object' },
    },
    apiKey: {
      description: 'TomTom API key',
      control: { type: 'text' },
    },
    height: {
      description: 'Map height',
      control: { type: 'number' },
    },
    defaultZoom: {
      description: 'Default zoom level',
      control: { type: 'range', min: 1, max: 20, step: 1 },
    },
    showGeocodeButton: {
      description: 'Show refresh/geocode button',
      control: { type: 'boolean' },
    },
    onAddressClick: {
      description: 'Callback when an address marker is clicked',
      action: 'address-clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TomTomMap>;

const sampleAddresses = [
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
    address: 'Berlin, Germany',
    label: 'Berlin',
    description: 'German Capital',
  },
];

const sampleWithCoordinates = [
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

export const Default: Story = {
  args: {
    addresses: sampleAddresses,
    apiKey: 'demo-key-replace-with-real-key',
    height: 400,
    defaultZoom: 4,
    showGeocodeButton: true,
  },
};

export const WithCoordinates: Story = {
  args: {
    addresses: sampleWithCoordinates,
    apiKey: 'demo-key-replace-with-real-key',
    height: 400,
    defaultZoom: 4,
    defaultCenter: [-95.7129, 37.0902], // Center of USA
  },
};

export const SingleLocation: Story = {
  args: {
    addresses: [
      {
        id: '1',
        address: 'Times Square, New York, NY',
        label: 'Times Square',
        description: 'The Crossroads of the World',
      },
    ],
    apiKey: 'demo-key-replace-with-real-key',
    height: 400,
    defaultZoom: 15,
  },
};

export const CustomSized: Story = {
  args: {
    addresses: sampleAddresses,
    apiKey: 'demo-key-replace-with-real-key',
    height: 300,
    width: 600,
    defaultZoom: 3,
    className: 'shadow-lg',
  },
};

export const WithoutControls: Story = {
  args: {
    addresses: sampleAddresses,
    apiKey: 'demo-key-replace-with-real-key',
    height: 400,
    showGeocodeButton: false,
  },
};

export const EmptyState: Story = {
  args: {
    addresses: [],
    apiKey: 'demo-key-replace-with-real-key',
    height: 400,
    defaultZoom: 2,
  },
};
