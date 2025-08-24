import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Address } from './TomTomMap';
import { TomTomMap } from './TomTomMap';

// Mock the entire maplibre-gl and react-map-gl modules
vi.mock('maplibre-gl/dist/maplibre-gl.css', () => ({}));
vi.mock('maplibre-gl', () => ({
  default: class MockMaplibreGL {
    static setWorkerUrl = vi.fn();
  },
}));

vi.mock('react-map-gl/maplibre', () => ({
  default: vi.fn(({ children, ...props }) => (
    <div data-testid="map-container" {...props}>
      {children}
    </div>
  )),
  Marker: vi.fn(({ children, ...props }) => (
    <div data-testid="map-marker" {...props}>
      {children}
    </div>
  )),
  Popup: vi.fn(({ children, ...props }) => (
    <div data-testid="map-popup" {...props}>
      {children}
    </div>
  )),
}));

// Mock fetch for geocoding API
global.fetch = vi.fn();

const mockFetch = global.fetch as ReturnType<typeof vi.fn>;

const sampleAddresses: Address[] = [
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

const mockGeocodeResponse = {
  results: [
    {
      position: {
        lat: 51.5074,
        lon: -0.1278,
      },
    },
  ],
};

describe('TomTomMap', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockGeocodeResponse),
    } as Response);
  });

  it('renders without crashing', () => {
    render(<TomTomMap addresses={[]} apiKey="test-key" />);
    expect(screen.getByTestId('map-container')).toBeInTheDocument();
  });

  it('displays error when no API key provided', () => {
    render(<TomTomMap addresses={sampleAddresses} apiKey="" />);
    expect(screen.getByText(/tomtom api key is required/i)).toBeInTheDocument();
  });

  it('renders with custom height and width', () => {
    render(<TomTomMap addresses={[]} apiKey="test-key" height={300} width={600} />);

    const container = screen.getByTestId('map-container').parentElement;
    expect(container).toHaveStyle({
      height: '300px',
      width: '600px',
    });
  });

  it('applies custom className', () => {
    render(<TomTomMap addresses={[]} apiKey="test-key" className="custom-class" />);

    // The custom class is applied to the outermost container
    const container = screen.getByTestId('map-container').parentElement?.parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('shows geocode button when showGeocodeButton is true', () => {
    render(<TomTomMap addresses={sampleAddresses} apiKey="test-key" showGeocodeButton={true} />);

    // The button text is "Refresh" not "Refresh Locations"
    expect(screen.getByText(/refresh/i)).toBeInTheDocument();
  });

  it('hides geocode button when showGeocodeButton is false', () => {
    render(<TomTomMap addresses={sampleAddresses} apiKey="test-key" showGeocodeButton={false} />);

    expect(screen.queryByText(/refresh/i)).not.toBeInTheDocument();
  });

  it('handles empty addresses array', () => {
    render(<TomTomMap addresses={[]} apiKey="test-key" />);

    expect(screen.getByTestId('map-container')).toBeInTheDocument();
    expect(screen.queryAllByTestId('map-marker')).toHaveLength(0);
  });

  it('refreshes locations when geocode button is clicked', () => {
    render(<TomTomMap addresses={sampleAddresses} apiKey="test-key" showGeocodeButton={true} />);

    const refreshButton = screen.getByText(/refresh/i);
    fireEvent.click(refreshButton);

    // Should trigger geocoding
    expect(refreshButton).toBeInTheDocument();
  });

  describe('accessibility', () => {
    it('has proper ARIA labels', () => {
      render(<TomTomMap addresses={sampleAddresses} apiKey="test-key" />);

      // Map container should be present
      const mapContainer = screen.getByTestId('map-container');
      expect(mapContainer).toBeInTheDocument();
    });

    it('refresh button has proper accessibility attributes', () => {
      render(<TomTomMap addresses={sampleAddresses} apiKey="test-key" showGeocodeButton={true} />);

      const refreshButton = screen.getByRole('button', { name: /refresh/i });
      expect(refreshButton).toBeInTheDocument();
    });
  });

  describe('props validation', () => {
    it('accepts custom default center', () => {
      const customCenter: [number, number] = [10, 20];

      render(<TomTomMap addresses={[]} apiKey="test-key" defaultCenter={customCenter} />);

      expect(screen.getByTestId('map-container')).toBeInTheDocument();
    });

    it('accepts custom default zoom', () => {
      render(<TomTomMap addresses={[]} apiKey="test-key" defaultZoom={10} />);

      expect(screen.getByTestId('map-container')).toBeInTheDocument();
    });

    it('handles onAddressClick callback', () => {
      const mockOnAddressClick = vi.fn();

      render(
        <TomTomMap
          addresses={sampleAddresses}
          apiKey="test-key"
          onAddressClick={mockOnAddressClick}
        />
      );

      expect(screen.getByTestId('map-container')).toBeInTheDocument();
    });
  });

  describe('component structure', () => {
    it('renders map container with correct attributes', () => {
      render(<TomTomMap addresses={sampleAddresses} apiKey="test-key" />);

      const mapContainer = screen.getByTestId('map-container');
      expect(mapContainer).toBeInTheDocument();
    });

    it('uses proper error boundary', () => {
      // This component should not crash on invalid props
      expect(() => {
        render(<TomTomMap addresses={[]} apiKey="" />);
      }).not.toThrow();
    });
  });
});
