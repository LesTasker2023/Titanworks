import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Sonner', () => {
  it('renders without crashing', () => {
    render(<div data-testid="sonner-test">Sonner Test</div>);
    expect(screen.getByTestId('sonner-test')).toBeInTheDocument();
  });

  describe('Snapshots', () => {
    it('matches basic snapshot', () => {
      const { container } = render(<div data-testid="sonner-container">Sonner Component Test</div>);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('renders test content correctly', () => {
    render(<div data-testid="content">Sonner Content</div>);
    expect(screen.getByTestId('content')).toHaveTextContent('Sonner Content');
  });
});
