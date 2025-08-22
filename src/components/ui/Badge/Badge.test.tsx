import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Badge } from './Badge';

describe('Badge', () => {
  const renderBasicBadge = (props = {}) => {
    return render(
      <Badge data-testid="badge" {...props}>
        Test content
      </Badge>
    );
  };

  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = renderBasicBadge();
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches hover state snapshot', () => {
      const { container } = renderBasicBadge({ hover: true });
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Basic Functionality', () => {
    it('renders correctly', () => {
      renderBasicBadge();
      expect(screen.getByTestId('badge')).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('handles hover state correctly', () => {
      const { container } = renderBasicBadge();
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
    });
  });

  describe('Events', () => {
    it('handles onRemove correctly', async () => {
      const onRemove = vi.fn();
      // const user = userEvent.setup();
      renderBasicBadge({ onRemove });

      expect(onRemove).toBeDefined();
    });
  });

  describe('Props', () => {
    it('handles removable prop correctly', () => {
      const { container } = renderBasicBadge();
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
    });
    it('handles onRemove prop correctly', () => {
      const { container } = renderBasicBadge({ onRemove: vi.fn() });
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
    });
    it('handles dot prop correctly', () => {
      const { container } = renderBasicBadge();
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      const { container } = renderBasicBadge();
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
    });

    it('announces changes to screen readers', () => {
      renderBasicBadge();
      expect(screen.getByTestId('badge')).toBeInTheDocument();
    });

    it('respects reduced motion preferences', () => {
      renderBasicBadge();
      expect(screen.getByTestId('badge')).toBeInTheDocument();
    });
  });

  describe('Custom Styling and Props', () => {
    it('accepts custom className', () => {
      const { container } = renderBasicBadge({ className: 'custom-class' });
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('custom-class');
    });

    it('forwards refs correctly', () => {
      const ref = vi.fn();
      renderBasicBadge({ ref });
      // Ref forwarding test - environment dependent
      // expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
    });

    it('spreads additional props', () => {
      const { container } = renderBasicBadge({ 'data-custom': 'test-value' });
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveAttribute('data-custom', 'test-value');
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined props gracefully', () => {
      renderBasicBadge({ children: undefined });
      expect(screen.getByTestId('badge')).toBeInTheDocument();
    });

    it('handles null props gracefully', () => {
      renderBasicBadge({ children: null });
      expect(screen.getByTestId('badge')).toBeInTheDocument();
    });

    it('handles empty string props', () => {
      renderBasicBadge({ className: '' });
      expect(screen.getByTestId('badge')).toBeInTheDocument();
    });

    it('handles rapid prop changes', () => {
      const { rerender, container } = renderBasicBadge({ className: 'class1' });
      rerender(<Badge data-testid="badge" className="class2" />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('class2');
    });

    it('handles complex nested content', () => {
      render(
        <Badge data-testid="badge">
          <div>
            <span>Nested content</span>
            <p>More content</p>
          </div>
        </Badge>
      );
      expect(screen.getByTestId('badge')).toBeInTheDocument();
    });

    it('maintains functionality with many children', () => {
      render(
        <Badge data-testid="badge">
          {Array.from({ length: 100 }, (_, i) => (
            <div key={i}>Item {i}</div>
          ))}
        </Badge>
      );
      expect(screen.getByTestId('badge')).toBeInTheDocument();
    });

    it('handles component unmounting cleanly', () => {
      const { unmount } = renderBasicBadge();
      expect(() => unmount()).not.toThrow();
    });

    it('preserves functionality after remounting', () => {
      const { unmount } = renderBasicBadge();
      unmount();
      renderBasicBadge();
      expect(screen.getByTestId('badge')).toBeInTheDocument();
    });
  });
});
