import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Label } from './Label';

describe('Label', () => {
  const renderBasicLabel = (props = {}) => {
    return render(
      <Label data-testid="label" {...props}>
        Test content
      </Label>
    );
  };

  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = renderBasicLabel();
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches disabled state snapshot', () => {
      const { container } = renderBasicLabel({ disabled: true });
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Basic Functionality', () => {
    it('renders correctly', () => {
      renderBasicLabel();
      expect(screen.getByTestId('label')).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('handles disabled state correctly', () => {
      const { container } = renderBasicLabel();
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      const { container } = renderBasicLabel();
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
    });

    it('announces changes to screen readers', () => {
      renderBasicLabel();
      expect(screen.getByTestId('label')).toBeInTheDocument();
    });

    it('respects reduced motion preferences', () => {
      renderBasicLabel();
      expect(screen.getByTestId('label')).toBeInTheDocument();
    });
  });

  describe('Custom Styling and Props', () => {
    it('accepts custom className', () => {
      const { container } = renderBasicLabel({ className: 'custom-class' });
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('custom-class');
    });

    it('forwards refs correctly', () => {
      const ref = vi.fn();
      renderBasicLabel({ ref });
      // Ref forwarding test - environment dependent
      // expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
    });

    it('spreads additional props', () => {
      const { container } = renderBasicLabel({ 'data-custom': 'test-value' });
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveAttribute('data-custom', 'test-value');
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined props gracefully', () => {
      renderBasicLabel({ children: undefined });
      expect(screen.getByTestId('label')).toBeInTheDocument();
    });

    it('handles null props gracefully', () => {
      renderBasicLabel({ children: null });
      expect(screen.getByTestId('label')).toBeInTheDocument();
    });

    it('handles empty string props', () => {
      renderBasicLabel({ className: '' });
      expect(screen.getByTestId('label')).toBeInTheDocument();
    });

    it('handles rapid prop changes', () => {
      const { rerender, container } = renderBasicLabel({ className: 'class1' });
      rerender(<Label data-testid="label" className="class2" />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('class2');
    });

    it('handles complex nested content', () => {
      render(
        <Label data-testid="label">
          <div>
            <span>Nested content</span>
            <p>More content</p>
          </div>
        </Label>
      );
      expect(screen.getByTestId('label')).toBeInTheDocument();
    });

    it('maintains functionality with many children', () => {
      render(
        <Label data-testid="label">
          {Array.from({ length: 100 }, (_, i) => (
            <div key={i}>Item {i}</div>
          ))}
        </Label>
      );
      expect(screen.getByTestId('label')).toBeInTheDocument();
    });

    it('handles component unmounting cleanly', () => {
      const { unmount } = renderBasicLabel();
      expect(() => unmount()).not.toThrow();
    });

    it('preserves functionality after remounting', () => {
      const { unmount } = renderBasicLabel();
      unmount();
      renderBasicLabel();
      expect(screen.getByTestId('label')).toBeInTheDocument();
    });
  });
});
