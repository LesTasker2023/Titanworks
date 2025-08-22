import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Badge } from './badge';

describe('Badge', () => {
  it('renders children correctly', () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = render(<Badge>Default</Badge>);
      expect(container.firstChild).toMatchSnapshot();
    });
    it('matches all variants snapshot', () => {
      const { container } = render(
        <div data-testid="variants-container">
          <Badge variant="default">Default</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="secondary">Secondary</Badge>
        </div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
    it('matches all sizes snapshot', () => {
      const { container } = render(
        <div data-testid="sizes-container">
          <Badge size="sm">Small</Badge>
          <Badge size="default">Default</Badge>
          <Badge size="lg">Large</Badge>
        </div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
    it('matches removable state snapshot', () => {
      const mockOnRemove = vi.fn();
      const { container } = render(
        <Badge removable onRemove={mockOnRemove}>
          Removable
        </Badge>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
    it('matches dot indicator snapshot', () => {
      const { container } = render(<Badge dot>With Dot</Badge>);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('applies variant classes correctly', () => {
    render(<Badge variant="secondary">Secondary Badge</Badge>);
    const badge = screen.getByText('Secondary Badge');
    expect(badge).toHaveClass('bg-secondary');
  });

  it('supports custom className', () => {
    render(<Badge className="custom-class">Custom Badge</Badge>);
    const badge = screen.getByText('Custom Badge');
    expect(badge).toHaveClass('custom-class');
  });
});
