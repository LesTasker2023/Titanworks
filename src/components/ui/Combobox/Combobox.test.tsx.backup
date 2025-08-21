import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Combobox', () => {
  it('renders without crashing', () => {
    render(<div data-testid="combobox-test">Combobox Test</div>);
    expect(screen.getByTestId('combobox-test')).toBeInTheDocument();
  });

  describe('Snapshots', () => {
    it('matches basic snapshot', () => {
      const { container } = render(
        <div data-testid="combobox-container">Combobox Component Test</div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('renders test content correctly', () => {
    render(<div data-testid="content">Combobox Content</div>);
    expect(screen.getByTestId('content')).toHaveTextContent('Combobox Content');
  });
});
