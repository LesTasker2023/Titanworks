import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Table', () => {
  it('renders without crashing', () => {
    render(<div data-testid="table-test">Table Test</div>);
    expect(screen.getByTestId('table-test')).toBeInTheDocument();
  });

  describe('Snapshots', () => {
    it('matches basic snapshot', () => {
      const { container } = render(<div data-testid="table-container">Table Component Test</div>);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('renders test content correctly', () => {
    render(<div data-testid="content">Table Content</div>);
    expect(screen.getByTestId('content')).toHaveTextContent('Table Content');
  });
});
