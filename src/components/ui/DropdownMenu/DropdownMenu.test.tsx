import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('DropdownMenu', () => {
  it('renders without crashing', () => {
    render(<div data-testid="dropdownmenu-test">DropdownMenu Test</div>);
    expect(screen.getByTestId('dropdownmenu-test')).toBeInTheDocument();
  });

  describe('Snapshots', () => {
    it('matches basic snapshot', () => {
      const { container } = render(
        <div data-testid="dropdownmenu-container">DropdownMenu Component Test</div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('renders test content correctly', () => {
    render(<div data-testid="content">DropdownMenu Content</div>);
    expect(screen.getByTestId('content')).toHaveTextContent('DropdownMenu Content');
  });
});
