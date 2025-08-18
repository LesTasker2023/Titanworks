import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('renders without crashing', () => {
    render(<Pagination>Test</Pagination>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    render(<Pagination variant="destructive">Test</Pagination>);
    expect(screen.getByRole('button')).toHaveClass('bg-destructive');
  });

  it('applies size classes correctly', () => {
    render(<Pagination size="lg">Test</Pagination>);
    expect(screen.getByRole('button')).toHaveClass('h-11');
  });

  it('handles custom className', () => {
    render(<Pagination className="custom-class">Test</Pagination>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Pagination ref={ref}>Test</Pagination>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  // Accessibility tests
  it('has proper accessibility attributes', () => {
    render(<Pagination aria-label="Test button">Test</Pagination>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Test button');
  });

  it('handles keyboard navigation', () => {
    render(<Pagination>Test</Pagination>);
    const button = screen.getByRole('button');
    button.focus();
    expect(button).toHaveFocus();
  });
});
