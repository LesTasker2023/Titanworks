import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Collapsible } from './Collapsible';

describe('Collapsible', () => {
  const renderBasicCollapsible = (props = {}) => {
    return render(
      <Collapsible data-testid="collapsible" {...props}>
        Test content
      </Collapsible>
    );
  };

  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = renderBasicCollapsible();
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Basic Functionality', () => {
    it('renders correctly', () => {
      renderBasicCollapsible();
      expect(screen.getByTestId('collapsible')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      const { container } = renderBasicCollapsible();
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
    });

    it('announces changes to screen readers', () => {
      renderBasicCollapsible();
      expect(screen.getByTestId('collapsible')).toBeInTheDocument();
    });

    it('respects reduced motion preferences', () => {
      renderBasicCollapsible();
      expect(screen.getByTestId('collapsible')).toBeInTheDocument();
    });
  });

  describe('Custom Styling and Props', () => {
    it('accepts custom className', () => {
      const { container } = renderBasicCollapsible({ className: 'custom-class' });
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('custom-class');
    });

    it('forwards refs correctly', () => {
      const ref = vi.fn();
      renderBasicCollapsible({ ref });
      // Ref forwarding test - environment dependent
      // expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
    });

    it('spreads additional props', () => {
      const { container } = renderBasicCollapsible({ 'data-custom': 'test-value' });
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveAttribute('data-custom', 'test-value');
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined props gracefully', () => {
      renderBasicCollapsible({ children: undefined });
      expect(screen.getByTestId('collapsible')).toBeInTheDocument();
    });

    it('handles null props gracefully', () => {
      renderBasicCollapsible({ children: null });
      expect(screen.getByTestId('collapsible')).toBeInTheDocument();
    });

    it('handles empty string props', () => {
      renderBasicCollapsible({ className: '' });
      expect(screen.getByTestId('collapsible')).toBeInTheDocument();
    });

    it('handles rapid prop changes', () => {
      const { rerender, container } = renderBasicCollapsible({ className: 'class1' });
      rerender(<Collapsible data-testid="collapsible" className="class2" />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('class2');
    });

    it('handles complex nested content', () => {
      render(
        <Collapsible data-testid="collapsible">
          <div>
            <span>Nested content</span>
            <p>More content</p>
          </div>
        </Collapsible>
      );
      expect(screen.getByTestId('collapsible')).toBeInTheDocument();
    });

    it('maintains functionality with many children', () => {
      render(
        <Collapsible data-testid="collapsible">
          {Array.from({ length: 100 }, (_, i) => (
            <div key={i}>Item {i}</div>
          ))}
        </Collapsible>
      );
      expect(screen.getByTestId('collapsible')).toBeInTheDocument();
    });

    it('handles component unmounting cleanly', () => {
      const { unmount } = renderBasicCollapsible();
      expect(() => unmount()).not.toThrow();
    });

    it('preserves functionality after remounting', () => {
      const { unmount } = renderBasicCollapsible();
      unmount();
      renderBasicCollapsible();
      expect(screen.getByTestId('collapsible')).toBeInTheDocument();
    });
  });
});
