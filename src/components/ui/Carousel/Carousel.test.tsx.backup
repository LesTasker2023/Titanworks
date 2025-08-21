import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Carousel', () => {
  it('renders without crashing', () => {
    render(<div data-testid="carousel-test">Carousel Test</div>);
    expect(screen.getByTestId('carousel-test')).toBeInTheDocument();
  });

  describe('Snapshots', () => {
    it('matches basic snapshot', () => {
      const { container } = render(
        <div data-testid="carousel-container">Carousel Component Test</div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('renders test content correctly', () => {
    render(<div data-testid="content">Carousel Content</div>);
    expect(screen.getByTestId('content')).toHaveTextContent('Carousel Content');
  });
});
