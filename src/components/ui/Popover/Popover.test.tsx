import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Popover } from './Popover';

describe('Popover', () => {
  it('renders without crashing', () => {
    render(<Popover>Test</Popover>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = render(<Popover>Default</Popover>);
      expect(container.firstChild).toMatchSnapshot();
    });
    it('matches all variants snapshot', () => {
      const { container } = render(
        <div data-testid="variants-container">
          <Popover variant="default">Default</Popover>
          <Popover variant="destructive">Destructive</Popover>
          <Popover variant="outline">Outline</Popover>
          <Popover variant="secondary">Secondary</Popover>
        </div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
    it('matches all sizes snapshot', () => {
      const { container } = render(
        <div data-testid="sizes-container">
          <Popover size="sm">Small</Popover>
          <Popover size="default">Default</Popover>
          <Popover size="lg">Large</Popover>
        </div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
    it('matches disabled state snapshot', () => {
      const { container } = render(<Popover disabled>Disabled</Popover>);
      expect(container.firstChild).toMatchSnapshot();
    });
    it('matches loading state snapshot', () => {
      const { container } = render(<Popover loading>Loading</Popover>);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
  it('applies variant classes correctly', () => {
    render(<Popover variant="destructive">Test</Popover>);
    expect(screen.getByRole('button')).toHaveClass('bg-destructive');
  });

  it('applies size classes correctly', () => {
    render(<Popover size="lg">Test</Popover>);
    expect(screen.getByRole('button')).toHaveClass('h-11');
  });

  it('handles custom className', () => {
    render(<Popover className="custom-class">Test</Popover>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Popover ref={ref}>Test</Popover>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  // Accessibility tests
  it('has proper accessibility attributes', () => {
    render(<Popover aria-label="Test button">Test</Popover>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Test button');
  });

  it('handles keyboard navigation', () => {
    render(<Popover>Test</Popover>);
    const button = screen.getByRole('button');
    button.focus();
    expect(button).toHaveFocus();
  });
});
