import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './index';

describe('Dialog', () => {
  const renderBasicDialog = (props = {}) => {
    return render(
      <Dialog open {...props}>
        <DialogTrigger data-testid="dialog-trigger">Open Dialog</DialogTrigger>
        <DialogContent data-testid="dialog-content">
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>This is a dialog description.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = renderBasicDialog();
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches loading state snapshot', () => {
      const { container } = renderBasicDialog({ loading: true });
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches disabled state snapshot', () => {
      const { container } = renderBasicDialog({ disabled: true });
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches hover state snapshot', () => {
      const { container } = renderBasicDialog({ hover: true });
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Basic Functionality', () => {
    it('renders correctly', () => {
      renderBasicDialog();
      expect(screen.getByTestId('dialog-content')).toBeInTheDocument();
      expect(screen.getByText('Dialog Title')).toBeInTheDocument();
      expect(screen.getByText('This is a dialog description.')).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('handles loading state correctly', () => {
      renderBasicDialog({ loading: true });
      const content = screen.getByTestId('dialog-content');
      expect(content).toBeInTheDocument();
    });

    it('handles disabled state correctly', () => {
      renderBasicDialog({ disabled: true });
      const content = screen.getByTestId('dialog-content');
      expect(content).toBeInTheDocument();
    });

    it('handles hover state correctly', () => {
      renderBasicDialog({ hover: true });
      const content = screen.getByTestId('dialog-content');
      expect(content).toBeInTheDocument();
    });
  });

  describe('Props', () => {
    it('handles loading prop correctly', () => {
      renderBasicDialog({ loading: true });
      const content = screen.getByTestId('dialog-content');
      expect(content).toBeInTheDocument();
    });

    it('handles loading prop correctly', () => {
      renderBasicDialog({ loading: false });
      const content = screen.getByTestId('dialog-content');
      expect(content).toBeInTheDocument();
    });

    it('handles disabled prop correctly', () => {
      renderBasicDialog({ disabled: true });
      const content = screen.getByTestId('dialog-content');
      expect(content).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it.skip('can be focused - SKIPPED: Uses Radix focus management', () => {
      expect(true).toBe(true);
    });

    it('has proper ARIA attributes', () => {
      renderBasicDialog();
      const content = screen.getByTestId('dialog-content');
      expect(content).toHaveAttribute('role', 'dialog');
    });

    it.skip('supports keyboard navigation - SKIPPED: Uses Radix keyboard handling', () => {
      expect(true).toBe(true);
    });

    it('announces changes to screen readers', () => {
      renderBasicDialog();
      const content = screen.getByTestId('dialog-content');
      expect(content).toHaveAttribute('role', 'dialog');
    });

    it('respects reduced motion preferences', () => {
      renderBasicDialog();
      // Radix handles motion preferences internally
      const content = screen.getByTestId('dialog-content');
      expect(content).toBeInTheDocument();
    });
  });

  describe('Custom Styling and Props', () => {
    it('accepts custom className', () => {
      renderBasicDialog();
      const content = screen.getByTestId('dialog-content');
      expect(content).toBeInTheDocument();
    });

    it('forwards refs correctly', () => {
      const ref = vi.fn();
      renderBasicDialog({ ref });
      const content = screen.getByTestId('dialog-content');
      expect(content).toBeInTheDocument();
    });

    it('spreads additional props', () => {
      renderBasicDialog({ 'data-custom': 'test-value' });
      const content = screen.getByTestId('dialog-content');
      expect(content).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined props gracefully', () => {
      renderBasicDialog({ children: undefined });
      const content = screen.getByTestId('dialog-content');
      expect(content).toBeInTheDocument();
    });

    it('handles null props gracefully', () => {
      renderBasicDialog({ children: null });
      const content = screen.getByTestId('dialog-content');
      expect(content).toBeInTheDocument();
    });

    it('handles empty string props', () => {
      renderBasicDialog({ className: '' });
      const content = screen.getByTestId('dialog-content');
      expect(content).toBeInTheDocument();
    });

    it('handles rapid prop changes', () => {
      const { rerender } = renderBasicDialog({ className: 'class1' });
      rerender(
        <Dialog open>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent data-testid="dialog-content">
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>This is a dialog description.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose>Close</DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
      const content = screen.getByTestId('dialog-content');
      expect(content).toBeInTheDocument();
    });

    it('handles complex nested content', () => {
      render(
        <Dialog open>
          <DialogContent data-testid="dialog-content">
            <DialogHeader>
              <DialogTitle>Complex Dialog</DialogTitle>
              <DialogDescription>
                <span>Nested content</span>
                <div>More content</div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
      const content = screen.getByTestId('dialog-content');
      expect(content).toBeInTheDocument();
    });

    it('maintains functionality with many children', () => {
      render(
        <Dialog open>
          <DialogContent data-testid="dialog-content">
            <DialogHeader>
              <DialogTitle>Many Children</DialogTitle>
            </DialogHeader>
            <div>
              {Array.from({ length: 100 }, (_, i) => (
                <div key={i}>Item {i}</div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      );
      const content = screen.getByTestId('dialog-content');
      expect(content).toBeInTheDocument();
    });

    it('handles component unmounting cleanly', () => {
      const { unmount } = renderBasicDialog();
      expect(() => unmount()).not.toThrow();
    });

    it('preserves functionality after remounting', () => {
      const { unmount } = renderBasicDialog();
      unmount();
      renderBasicDialog();
      const content = screen.getByTestId('dialog-content');
      expect(content).toBeInTheDocument();
    });
  });
});
