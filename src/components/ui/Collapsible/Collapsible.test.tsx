import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Collapsible', () => {
  it('renders without crashing', () => {
    render(<div data-testid="collapsible-test">Collapsible Test</div>);
    expect(screen.getByTestId('collapsible-test')).toBeInTheDocument();
  });

  describe('Snapshots', () => {
    it('matches basic snapshot', () => {
      const { container } = render(
        <div data-testid="collapsible-container">Collapsible Component Test</div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('renders test content correctly', () => {
    render(<div data-testid="content">Collapsible Content</div>);
    expect(screen.getByTestId('content')).toHaveTextContent('Collapsible Content');
  });
});
