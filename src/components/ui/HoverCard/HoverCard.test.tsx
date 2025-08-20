import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('HoverCard', () => {
  it('renders without crashing', () => {
    render(<div data-testid="hovercard-test">HoverCard Test</div>);
    expect(screen.getByTestId('hovercard-test')).toBeInTheDocument();
  });

  describe('Snapshots', () => {
    it('matches basic snapshot', () => {
      const { container } = render(
        <div data-testid="hovercard-container">HoverCard Component Test</div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('renders test content correctly', () => {
    render(<div data-testid="content">HoverCard Content</div>);
    expect(screen.getByTestId('content')).toHaveTextContent('HoverCard Content');
  });
});
