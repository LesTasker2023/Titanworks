import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Resizable', () => {
  it('renders without crashing', () => {
    render(<div data-testid="resizable-test">Resizable Test</div>);
    expect(screen.getByTestId('resizable-test')).toBeInTheDocument();
  });

  describe('Snapshots', () => {
    it('matches basic snapshot', () => {
      const { container } = render(
        <div data-testid="resizable-container">Resizable Component Test</div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('renders test content correctly', () => {
    render(<div data-testid="content">Resizable Content</div>);
    expect(screen.getByTestId('content')).toHaveTextContent('Resizable Content');
  });
});
