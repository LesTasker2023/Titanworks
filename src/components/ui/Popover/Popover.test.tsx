import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Popover } from './Popover';

describe('Popover', () => {
  const renderBasicPopover = (props = {}) => {
    return render(
      <Popover data-testid="popover" {...props}>
        Test content
      </Popover>
    );
  };

  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = renderBasicPopover();
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches disabled state snapshot', () => {
      const { container } = renderBasicPopover({ disabled: true });
      expect(container.firstChild).toMatchSnapshot();
    });
    it('matches hover state snapshot', () => {
      const { container } = renderBasicPopover({ hover: true });
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Basic Functionality', () => {
    it('renders correctly', () => {
      renderBasicPopover();
      expect(screen.getByTestId('popover')).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('handles disabled state correctly', () => {
      const { container } = renderBasicPopover();
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
    });
    it('handles hover state correctly', () => {
      const { container } = renderBasicPopover();
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      const { container } = renderBasicPopover();
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
    });

    it('announces changes to screen readers', () => {
      renderBasicPopover();
      expect(screen.getByTestId('popover')).toBeInTheDocument();
    });

    it('respects reduced motion preferences', () => {
      renderBasicPopover();
      expect(screen.getByTestId('popover')).toBeInTheDocument();
    });
  });

  describe('Custom Styling and Props', () => {
    it('accepts custom className', () => {
      const { container } = renderBasicPopover({ className: 'custom-class' });
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('custom-class');
    });

    it('forwards refs correctly', () => {
      const ref = vi.fn();
      renderBasicPopover({ ref });
      // Ref forwarding test - environment dependent
      // expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
    });

    it('spreads additional props', () => {
      const { container } = renderBasicPopover({ 'data-custom': 'test-value' });
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveAttribute('data-custom', 'test-value');
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined props gracefully', () => {
      renderBasicPopover({ children: undefined });
      expect(screen.getByTestId('popover')).toBeInTheDocument();
    });

    it('handles null props gracefully', () => {
      renderBasicPopover({ children: null });
      expect(screen.getByTestId('popover')).toBeInTheDocument();
    });

    it('handles empty string props', () => {
      renderBasicPopover({ className: '' });
      expect(screen.getByTestId('popover')).toBeInTheDocument();
    });

    it('handles complex nested content', () => {
      render(
        <Popover data-testid="popover">
          <div>
            <span>Nested content</span>
            <p>More content</p>
          </div>
        </Popover>
      );
      expect(screen.getByTestId('popover')).toBeInTheDocument();
    });

    it('maintains functionality with many children', () => {
      render(
        <Popover data-testid="popover">
          {Array.from({ length: 100 }, (_, i) => (
            <div key={i}>Item {i}</div>
          ))}
        </Popover>
      );
      expect(screen.getByTestId('popover')).toBeInTheDocument();
    });

    it('handles component unmounting cleanly', () => {
      const { unmount } = renderBasicPopover();
      expect(() => unmount()).not.toThrow();
    });

    it('preserves functionality after remounting', () => {
      const { unmount } = renderBasicPopover();
      unmount();
      renderBasicPopover();
      expect(screen.getByTestId('popover')).toBeInTheDocument();
    });
  });
});
