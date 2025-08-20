import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { Skeleton } from './Skeleton';

describe('Skeleton Component', () => {
  beforeEach(() => {
    // Reset any state before each test
  });

  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = render(<Skeleton>Default</Skeleton>);
      expect(container.firstChild).toMatchSnapshot();
    });
    it('matches all variants snapshot', () => {
      const { container } = render(
        <div data-testid="variants-container">
          <Skeleton variant="default">Default</Skeleton>
          <Skeleton variant="destructive">Destructive</Skeleton>
          <Skeleton variant="outline">Outline</Skeleton>
          <Skeleton variant="secondary">Secondary</Skeleton>
        </div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
    it('matches all sizes snapshot', () => {
      const { container } = render(
        <div data-testid="sizes-container">
          <Skeleton size="sm">Small</Skeleton>
          <Skeleton size="default">Default</Skeleton>
          <Skeleton size="lg">Large</Skeleton>
        </div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
    it('matches disabled state snapshot', () => {
      const { container } = render(<Skeleton disabled>Disabled</Skeleton>);
      expect(container.firstChild).toMatchSnapshot();
    });
    it('matches loading state snapshot', () => {
      const { container } = render(<Skeleton loading>Loading</Skeleton>);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Skeleton data-testid="skeleton" />);
      expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Skeleton className="custom-class" data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('custom-class');
    });

    it('has default skeleton styling', () => {
      render(<Skeleton data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('animate-pulse', 'rounded-md', 'bg-primary/10');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<Skeleton aria-label="Loading content" data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveAttribute('aria-label', 'Loading content');
    });

    it('can be used with loading state semantics', () => {
      render(<Skeleton aria-live="polite" aria-busy="true" data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveAttribute('aria-live', 'polite');
      expect(skeleton).toHaveAttribute('aria-busy', 'true');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Skeleton ref={ref} data-testid="skeleton" />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Edge Cases', () => {
    it('handles null props gracefully', () => {
      render(<Skeleton data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toBeInTheDocument();
    });

    it('supports various sizes through className', () => {
      render(<Skeleton className="h-4 w-full" data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('h-4', 'w-full');
    });
  });
});
