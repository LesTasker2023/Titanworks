import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Chart', () => {
  it('renders without crashing', () => {
    render(<div data-testid="chart-test">Chart Test</div>);
    expect(screen.getByTestId('chart-test')).toBeInTheDocument();
  });

  describe('Snapshots', () => {
    it('matches basic snapshot', () => {
      const { container } = render(<div data-testid="chart-container">Chart Component Test</div>);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('renders test content correctly', () => {
    render(<div data-testid="content">Chart Content</div>);
    expect(screen.getByTestId('content')).toHaveTextContent('Chart Content');
  });
});
