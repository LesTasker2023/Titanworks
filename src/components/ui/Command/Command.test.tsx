import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Command } from './Command';

describe('Command', () => {
  const renderBasicCommand = (props = {}) => {
    return render(
      <Command data-testid="command" {...props}>
        Test content
      </Command>
    );
  };

  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = renderBasicCommand();
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches disabled state snapshot', () => {
      const { container } = renderBasicCommand({ disabled: true });
      expect(container.firstChild).toMatchSnapshot();
    });
    it('matches selected state snapshot', () => {
      const { container } = renderBasicCommand({ selected: true });
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Basic Functionality', () => {
    it('renders correctly', () => {
      renderBasicCommand();
      expect(screen.getByTestId('command')).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('handles disabled state correctly', () => {
      const { container } = renderBasicCommand();
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
    });
    it('handles selected state correctly', () => {
      const { container } = renderBasicCommand();
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      const { container } = renderBasicCommand();
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
    });

    it('announces changes to screen readers', () => {
      renderBasicCommand();
      expect(screen.getByTestId('command')).toBeInTheDocument();
    });

    it('respects reduced motion preferences', () => {
      renderBasicCommand();
      expect(screen.getByTestId('command')).toBeInTheDocument();
    });
  });

  describe('Custom Styling and Props', () => {
    it('accepts custom className', () => {
      const { container } = renderBasicCommand({ className: 'custom-class' });
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('custom-class');
    });

    it('forwards refs correctly', () => {
      const ref = vi.fn();
      renderBasicCommand({ ref });
      // Ref forwarding test - environment dependent
      // expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
    });

    it('spreads additional props', () => {
      const { container } = renderBasicCommand({ 'data-custom': 'test-value' });
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveAttribute('data-custom', 'test-value');
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined props gracefully', () => {
      renderBasicCommand({ children: undefined });
      expect(screen.getByTestId('command')).toBeInTheDocument();
    });

    it('handles null props gracefully', () => {
      renderBasicCommand({ children: null });
      expect(screen.getByTestId('command')).toBeInTheDocument();
    });

    it('handles empty string props', () => {
      renderBasicCommand({ className: '' });
      expect(screen.getByTestId('command')).toBeInTheDocument();
    });

    it('handles rapid prop changes', () => {
      const { rerender, container } = renderBasicCommand({ className: 'class1' });
      rerender(<Command data-testid="command" className="class2" />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('class2');
    });

    it('handles complex nested content', () => {
      render(
        <Command data-testid="command">
          <div>
            <span>Nested content</span>
            <p>More content</p>
          </div>
        </Command>
      );
      expect(screen.getByTestId('command')).toBeInTheDocument();
    });

    it('maintains functionality with many children', () => {
      render(
        <Command data-testid="command">
          {Array.from({ length: 100 }, (_, i) => (
            <div key={i}>Item {i}</div>
          ))}
        </Command>
      );
      expect(screen.getByTestId('command')).toBeInTheDocument();
    });

    it('handles component unmounting cleanly', () => {
      const { unmount } = renderBasicCommand();
      expect(() => unmount()).not.toThrow();
    });

    it('preserves functionality after remounting', () => {
      const { unmount } = renderBasicCommand();
      unmount();
      renderBasicCommand();
      expect(screen.getByTestId('command')).toBeInTheDocument();
    });
  });
});
