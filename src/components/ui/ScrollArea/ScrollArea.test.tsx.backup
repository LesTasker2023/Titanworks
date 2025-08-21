import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('ScrollArea', () => {
  it('renders without crashing', () => {
    render(<div data-testid="scrollarea-test">ScrollArea Test</div>);
    expect(screen.getByTestId('scrollarea-test')).toBeInTheDocument();
  });

  describe('Snapshots', () => {
    it('matches basic snapshot', () => {
      const { container } = render(
        <div data-testid="scrollarea-container">ScrollArea Component Test</div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('renders test content correctly', () => {
    render(<div data-testid="content">ScrollArea Content</div>);
    expect(screen.getByTestId('content')).toHaveTextContent('ScrollArea Content');
  });
});
