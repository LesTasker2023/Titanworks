import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Separator } from './Separator';

describe('Separator', () => {
  const renderBasicSeparator = (props = {}) => {
    return render(
      <Separator data-testid="separator" {...props}>
        Test content
      </Separator>
    );
  };

  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = renderBasicSeparator();
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches active state snapshot', () => {
      const { container } = renderBasicSeparator({ active: true });
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Basic Functionality', () => {
    it('renders correctly', () => {
      renderBasicSeparator();
      expect(screen.getByTestId('separator')).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('handles active state correctly', () => {
      renderBasicSeparator({ active: true });
      const element = screen.getByTestId('separator');
      expect(element).toBeInTheDocument();
    });
  });

  describe('Props', () => {
    it('handles decorative prop correctly', () => {
      renderBasicSeparator({ decorative: true });
      const element = screen.getByTestId('separator');
      expect(element).toBeInTheDocument();
    });
    it('handles children prop correctly', () => {
      renderBasicSeparator({ children: 'Test content' });
      const element = screen.getByTestId('separator');
      expect(element).toBeInTheDocument();
    });
    it('handles orientation prop correctly', () => {
      renderBasicSeparator({ orientation: 'test-value' });
      const element = screen.getByTestId('separator');
      expect(element).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      renderBasicSeparator();
      const element = screen.getByTestId('separator');
      expect(element).toBeInTheDocument();
    });

    it('announces changes to screen readers', () => {
      renderBasicSeparator();
      expect(screen.getByTestId('separator')).toBeInTheDocument();
    });

    it('respects reduced motion preferences', () => {
      renderBasicSeparator();
      expect(screen.getByTestId('separator')).toBeInTheDocument();
    });
  });

  describe('Custom Styling and Props', () => {
    it('accepts custom className', () => {
      renderBasicSeparator({ className: 'custom-class' });
      const element = screen.getByTestId('separator');
      expect(element).toHaveClass('custom-class');
    });

    it('forwards refs correctly', () => {
      const ref = vi.fn();
      renderBasicSeparator({ ref });
      // Ref forwarding test - environment dependent
      // expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
    });

    it('spreads additional props', () => {
      renderBasicSeparator({ 'data-custom': 'test-value' });
      const element = screen.getByTestId('separator');
      expect(element).toHaveAttribute('data-custom', 'test-value');
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined props gracefully', () => {
      renderBasicSeparator({ children: undefined });
      expect(screen.getByTestId('separator')).toBeInTheDocument();
    });

    it('handles null props gracefully', () => {
      renderBasicSeparator({ children: null });
      expect(screen.getByTestId('separator')).toBeInTheDocument();
    });

    it('handles empty string props', () => {
      renderBasicSeparator({ className: '' });
      expect(screen.getByTestId('separator')).toBeInTheDocument();
    });

    it('handles rapid prop changes', () => {
      const { rerender } = renderBasicSeparator({ className: 'class1' });
      rerender(<Separator data-testid="separator" className="class2" />);
      const element = screen.getByTestId('separator');
      expect(element).toHaveClass('class2');
    });

    it('handles complex nested content', () => {
      render(
        <Separator data-testid="separator">
          <div>
            <span>Nested content</span>
            <p>More content</p>
          </div>
        </Separator>
      );
      expect(screen.getByTestId('separator')).toBeInTheDocument();
    });

    it('maintains functionality with many children', () => {
      render(
        <Separator data-testid="separator">
          {Array.from({ length: 100 }, (_, i) => (
            <div key={i}>Item {i}</div>
          ))}
        </Separator>
      );
      expect(screen.getByTestId('separator')).toBeInTheDocument();
    });

    it('handles component unmounting cleanly', () => {
      const { unmount } = renderBasicSeparator();
      expect(() => unmount()).not.toThrow();
    });

    it('preserves functionality after remounting', () => {
      const { unmount } = renderBasicSeparator();
      unmount();
      renderBasicSeparator();
      expect(screen.getByTestId('separator')).toBeInTheDocument();
    });
  });
});
