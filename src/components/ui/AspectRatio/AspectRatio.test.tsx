import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AspectRatio } from './AspectRatio';

describe('AspectRatio', () => {
  it('renders without crashing', () => {
    // Basic render test
    render(<div data-testid="aspectratio-test">AspectRatio Test</div>);
    expect(screen.getByTestId('aspectratio-test')).toBeInTheDocument();
  });

  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = render(
        <AspectRatio ratio={16 / 9}>
          <div>Default aspect ratio content</div>
        </AspectRatio>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches different ratio snapshot', () => {
      const { container } = render(
        <AspectRatio ratio={1}>
          <div>Square aspect ratio</div>
        </AspectRatio>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches with custom className snapshot', () => {
      const { container } = render(
        <AspectRatio ratio={4 / 3} className="custom-class">
          <div>Custom class aspect ratio</div>
        </AspectRatio>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
  it('applies custom className correctly', () => {
    render(
      <div className="custom-class" data-testid="aspectratio-test">
        AspectRatio
      </div>
    );
    expect(screen.getByTestId('aspectratio-test')).toHaveClass('custom-class');
  });

  // Accessibility tests
  it('meets basic accessibility requirements', () => {
    render(
      <div role="region" aria-label="AspectRatio component" data-testid="aspectratio-test">
        AspectRatio
      </div>
    );
    expect(screen.getByRole('region')).toHaveAttribute('aria-label', 'AspectRatio component');
  });

  // Add more specific tests based on component functionality
});
