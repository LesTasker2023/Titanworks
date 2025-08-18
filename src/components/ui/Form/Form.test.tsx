import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Form } from './Form';

describe('Form', () => {
  it('renders without crashing', () => {
    render(<Form>Test</Form>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    render(<Form variant="destructive">Test</Form>);
    expect(screen.getByRole('button')).toHaveClass('bg-destructive');
  });

  it('applies size classes correctly', () => {
    render(<Form size="lg">Test</Form>);
    expect(screen.getByRole('button')).toHaveClass('h-11');
  });

  it('handles custom className', () => {
    render(<Form className="custom-class">Test</Form>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Form ref={ref}>Test</Form>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  // Accessibility tests
  it('has proper accessibility attributes', () => {
    render(<Form aria-label="Test button">Test</Form>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Test button');
  });

  it('handles keyboard navigation', () => {
    render(<Form>Test</Form>);
    const button = screen.getByRole('button');
    button.focus();
    expect(button).toHaveFocus();
  });
});
