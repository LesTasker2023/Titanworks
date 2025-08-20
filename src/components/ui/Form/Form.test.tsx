import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Form } from './Form';

describe('Form', () => {
  it('renders without crashing', () => {
    const { container } = render(<Form>Test Content</Form>);
    expect(container.querySelector('form')).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('applies variant classes correctly', () => {
    const { container } = render(<Form variant="card">Test Content</Form>);
    const form = container.querySelector('form');
    expect(form).toHaveClass('bg-card', 'border', 'border-border', 'rounded-lg', 'p-6');
    expect(container.firstChild).toMatchSnapshot();
  });

  it('applies size classes correctly', () => {
    const { container } = render(<Form size="lg">Test Content</Form>);
    const form = container.querySelector('form');
    expect(form).toHaveClass('space-y-6');
  });

  it('handles custom className', () => {
    const { container } = render(<Form className="custom-class">Test Content</Form>);
    const form = container.querySelector('form');
    expect(form).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Form ref={ref}>Test Content</Form>);
    expect(ref.current).toBeInstanceOf(HTMLFormElement);
  });

  // Accessibility tests
  it('has proper accessibility attributes', () => {
    const { container } = render(<Form aria-label="Test form">Test Content</Form>);
    const form = container.querySelector('form');
    expect(form).toHaveAttribute('aria-label', 'Test form');
  });

  it('handles form submission', () => {
    const handleSubmit = vi.fn();
    const { container } = render(<Form onSubmit={handleSubmit}>Test Content</Form>);
    const form = container.querySelector('form');
    fireEvent.submit(form!);
    expect(handleSubmit).toHaveBeenCalled();
  });
});
