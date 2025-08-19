import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Popover } from './Popover';

describe('Popover', () => {
  it('renders without crashing', () => {
    render(<Popover>Test</Popover>);
    expect(screen.getByRole('button')).toBeInTheDocument();
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
