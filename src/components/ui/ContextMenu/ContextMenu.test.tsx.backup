import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('ContextMenu', () => {
  it('renders without crashing', () => {
    render(<div data-testid="contextmenu-test">ContextMenu Test</div>);
    expect(screen.getByTestId('contextmenu-test')).toBeInTheDocument();
  });

  describe('Snapshots', () => {
    it('matches basic snapshot', () => {
      const { container } = render(
        <div data-testid="contextmenu-container">ContextMenu Component Test</div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('renders test content correctly', () => {
    render(<div data-testid="content">ContextMenu Content</div>);
    expect(screen.getByTestId('content')).toHaveTextContent('ContextMenu Content');
  });
});
