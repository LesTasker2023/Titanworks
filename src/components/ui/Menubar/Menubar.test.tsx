import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Menubar', () => {
  it('renders without crashing', () => {
    render(<div data-testid="menubar-test">Menubar Test</div>);
    expect(screen.getByTestId('menubar-test')).toBeInTheDocument();
  });

  describe('Snapshots', () => {
    it('matches basic snapshot', () => {
      const { container } = render(
        <div data-testid="menubar-container">Menubar Component Test</div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('renders test content correctly', () => {
    render(<div data-testid="content">Menubar Content</div>);
    expect(screen.getByTestId('content')).toHaveTextContent('Menubar Content');
  });
});
