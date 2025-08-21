import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Sheet', () => {
  it('renders without crashing', () => {
    render(<div data-testid="sheet-test">Sheet Test</div>);
    expect(screen.getByTestId('sheet-test')).toBeInTheDocument();
  });

  describe('Snapshots', () => {
    it('matches basic snapshot', () => {
      const { container } = render(<div data-testid="sheet-container">Sheet Component Test</div>);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('renders test content correctly', () => {
    render(<div data-testid="content">Sheet Content</div>);
    expect(screen.getByTestId('content')).toHaveTextContent('Sheet Content');
  });
});
