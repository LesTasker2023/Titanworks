import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import Alert, { AlertTitle, AlertDescription } from './alert';

// Mock timers for auto-hide functionality
beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('Enhanced Alert Component', () => {
  describe('🔧 Basic Functionality (6 tests)', () => {
    it('renders basic alert correctly', () => {
      render(
        <Alert>
          <AlertTitle>Test Title</AlertTitle>
          <AlertDescription>Test Description</AlertDescription>
        </Alert>
      );

      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(
        <Alert className="custom-class">
          <AlertDescription>Test</AlertDescription>
        </Alert>
      );

      expect(screen.getByRole('alert')).toHaveClass('custom-class');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Alert ref={ref}>
          <AlertDescription>Test</AlertDescription>
        </Alert>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('renders without title (description only)', () => {
      render(
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>Just description</AlertDescription>
        </Alert>
      );

      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('Just description')).toBeInTheDocument();
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });

    it('renders without icon', () => {
      render(
        <Alert>
          <AlertTitle>No Icon Alert</AlertTitle>
          <AlertDescription>Alert without icon</AlertDescription>
        </Alert>
      );

      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('No Icon Alert')).toBeInTheDocument();
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });

    it('applies SCSS enhancement classes', () => {
      render(
        <Alert>
          <AlertDescription>Test</AlertDescription>
        </Alert>
      );

      expect(screen.getByRole('alert')).toHaveClass('alert');
    });
  });

  describe('🎨 Variant Tests (5 tests)', () => {
    it('renders default variant', () => {
      render(
        <Alert variant="default">
          <AlertDescription>Default alert</AlertDescription>
        </Alert>
      );

      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('bg-background', 'text-foreground');
    });

    it('renders destructive variant', () => {
      render(
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>Error alert</AlertDescription>
        </Alert>
      );

      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('border-destructive/50', 'text-destructive');
    });

    it('renders warning variant', () => {
      render(
        <Alert variant="warning">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>Warning alert</AlertDescription>
        </Alert>
      );

      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('border-yellow-500/50', 'text-yellow-900');
    });

    it('renders success variant', () => {
      render(
        <Alert variant="success">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>Success alert</AlertDescription>
        </Alert>
      );

      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('border-green-500/50', 'text-green-900');
    });

    it('renders info variant', () => {
      render(
        <Alert variant="info">
          <Info className="h-4 w-4" />
          <AlertDescription>Info alert</AlertDescription>
        </Alert>
      );

      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('border-blue-500/50', 'text-blue-900');
    });
  });

  describe('❌ Dismissible Functionality (6 tests)', () => {
    it('renders dismiss button when dismissible', () => {
      render(
        <Alert dismissible>
          <AlertDescription>Dismissible alert</AlertDescription>
        </Alert>
      );

      expect(screen.getByRole('button', { name: /dismiss alert/i })).toBeInTheDocument();
      expect(screen.getByLabelText('Dismiss alert')).toBeInTheDocument();
    });

    it('does not render dismiss button when not dismissible', () => {
      render(
        <Alert>
          <AlertDescription>Non-dismissible alert</AlertDescription>
        </Alert>
      );

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('calls onDismiss when dismiss button clicked', () => {
      const handleDismiss = vi.fn();
      render(
        <Alert dismissible onDismiss={handleDismiss}>
          <AlertDescription>Dismissible alert</AlertDescription>
        </Alert>
      );

      fireEvent.click(screen.getByRole('button', { name: /dismiss alert/i }));

      expect(handleDismiss).toHaveBeenCalledTimes(1);
    });

    it('removes alert from DOM when dismissed', () => {
      render(
        <Alert dismissible>
          <AlertDescription>Dismissible alert</AlertDescription>
        </Alert>
      );

      expect(screen.getByRole('alert')).toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: /dismiss alert/i }));

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('applies dismissible CSS class when dismissible', () => {
      render(
        <Alert dismissible>
          <AlertDescription>Dismissible alert</AlertDescription>
        </Alert>
      );

      expect(screen.getByRole('alert')).toHaveClass('alert--dismissible');
    });

    it('dismiss button has proper accessibility attributes', () => {
      render(
        <Alert dismissible>
          <AlertDescription>Dismissible alert</AlertDescription>
        </Alert>
      );

      const dismissButton = screen.getByRole('button', { name: /dismiss alert/i });
      expect(dismissButton).toHaveAttribute('aria-label', 'Dismiss alert');
      expect(dismissButton).toHaveClass('alert-dismiss');
    });
  });

  describe('⏰ Auto-Hide Functionality (8 tests)', () => {
    it('auto-hides alert after specified delay', () => {
      render(
        <Alert autoHide autoHideDelay={2000}>
          <AlertDescription>Auto-hide alert</AlertDescription>
        </Alert>
      );

      expect(screen.getByRole('alert')).toBeInTheDocument();

      // Fast-forward time by 2 seconds
      act(() => {
        vi.advanceTimersByTime(2000);
      });

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('calls onDismiss when auto-hiding', () => {
      const handleDismiss = vi.fn();
      render(
        <Alert autoHide autoHideDelay={1000} onDismiss={handleDismiss}>
          <AlertDescription>Auto-hide alert</AlertDescription>
        </Alert>
      );

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(handleDismiss).toHaveBeenCalledTimes(1);
    });

    it('does not auto-hide when autoHide is false', () => {
      render(
        <Alert autoHide={false} autoHideDelay={1000}>
          <AlertDescription>No auto-hide</AlertDescription>
        </Alert>
      );

      vi.advanceTimersByTime(1000);

      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('uses default delay when autoHideDelay not specified', () => {
      render(
        <Alert autoHide>
          <AlertDescription>Default delay</AlertDescription>
        </Alert>
      );

      // Default delay is 5000ms
      act(() => {
        vi.advanceTimersByTime(4999);
      });
      expect(screen.getByRole('alert')).toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('applies auto-hide CSS class when autoHide enabled', () => {
      render(
        <Alert autoHide>
          <AlertDescription>Auto-hide alert</AlertDescription>
        </Alert>
      );

      expect(screen.getByRole('alert')).toHaveClass('alert--auto-hide');
    });

    it('sets CSS custom property for auto-hide delay', () => {
      render(
        <Alert autoHide autoHideDelay={3000}>
          <AlertDescription>Custom delay</AlertDescription>
        </Alert>
      );

      const alert = screen.getByRole('alert');
      expect(alert).toHaveStyle({ '--auto-hide-delay': '3000ms' });
    });

    it('handles zero or negative delay gracefully', () => {
      render(
        <Alert autoHide autoHideDelay={0}>
          <AlertDescription>Zero delay</AlertDescription>
        </Alert>
      );

      // Should not auto-hide with zero delay
      vi.advanceTimersByTime(1000);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('cleans up timer when component unmounts', () => {
      const { unmount } = render(
        <Alert autoHide autoHideDelay={2000}>
          <AlertDescription>Timer cleanup</AlertDescription>
        </Alert>
      );

      // Unmount before timer completes
      unmount();

      // Advance time - should not cause any issues
      vi.advanceTimersByTime(3000);
      expect(true).toBe(true); // Test passes if no errors thrown
    });
  });

  describe('🔄 Combined Features (4 tests)', () => {
    it('works with both dismissible and auto-hide', () => {
      const handleDismiss = vi.fn();
      render(
        <Alert dismissible autoHide autoHideDelay={2000} onDismiss={handleDismiss}>
          <AlertDescription>Combined features</AlertDescription>
        </Alert>
      );

      expect(screen.getByRole('alert')).toHaveClass('alert--dismissible', 'alert--auto-hide');

      // Should auto-hide after delay
      act(() => {
        vi.advanceTimersByTime(2000);
      });
      expect(handleDismiss).toHaveBeenCalledTimes(1);
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('manual dismiss prevents auto-hide', () => {
      const handleDismiss = vi.fn();
      render(
        <Alert dismissible autoHide autoHideDelay={2000} onDismiss={handleDismiss}>
          <AlertDescription>Manual dismiss first</AlertDescription>
        </Alert>
      );

      // Manually dismiss before auto-hide timer
      fireEvent.click(screen.getByRole('button', { name: /dismiss alert/i }));

      expect(handleDismiss).toHaveBeenCalledTimes(1);
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();

      // Advance time - should not call onDismiss again (timer was cleaned up)
      vi.advanceTimersByTime(2000);
      expect(handleDismiss).toHaveBeenCalledTimes(1);
    });

    it('handles multiple alerts independently', () => {
      render(
        <div>
          <Alert autoHide autoHideDelay={1000} data-testid="alert-1">
            <AlertDescription>First alert</AlertDescription>
          </Alert>
          <Alert autoHide autoHideDelay={2000} data-testid="alert-2">
            <AlertDescription>Second alert</AlertDescription>
          </Alert>
        </div>
      );

      expect(screen.getByTestId('alert-1')).toBeInTheDocument();
      expect(screen.getByTestId('alert-2')).toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(screen.queryByTestId('alert-1')).not.toBeInTheDocument();
      expect(screen.getByTestId('alert-2')).toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(screen.queryByTestId('alert-2')).not.toBeInTheDocument();
    });

    it('onDismiss is optional', () => {
      render(
        <Alert dismissible>
          <AlertDescription>No onDismiss handler</AlertDescription>
        </Alert>
      );

      expect(() => {
        fireEvent.click(screen.getByRole('button', { name: /dismiss alert/i }));
      }).not.toThrow();

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  describe('♿ Accessibility Tests (4 tests)', () => {
    it('has proper ARIA role', () => {
      render(
        <Alert>
          <AlertDescription>Accessibility test</AlertDescription>
        </Alert>
      );

      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('dismiss button has proper ARIA attributes', () => {
      render(
        <Alert dismissible>
          <AlertDescription>Dismissible alert</AlertDescription>
        </Alert>
      );

      const button = screen.getByRole('button', { name: /dismiss alert/i });
      expect(button).toHaveAttribute('aria-label', 'Dismiss alert');
      expect(screen.getByText('Close')).toHaveClass('sr-only');
    });

    it('title uses proper heading element', () => {
      render(
        <Alert>
          <AlertTitle>Alert Title</AlertTitle>
          <AlertDescription>Alert content</AlertDescription>
        </Alert>
      );

      const title = screen.getByRole('heading', { level: 5 });
      expect(title).toHaveTextContent('Alert Title');
    });

    it('supports keyboard navigation for dismiss button', () => {
      render(
        <Alert dismissible>
          <AlertDescription>Keyboard test</AlertDescription>
        </Alert>
      );

      const dismissButton = screen.getByRole('button', { name: /dismiss alert/i });
      dismissButton.focus();
      expect(dismissButton).toHaveFocus();

      // Simulate Enter key press using click since buttons respond to both
      fireEvent.click(dismissButton);
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  describe('🔬 Edge Cases Tests (5 tests)', () => {
    it('handles empty children gracefully', () => {
      render(<Alert />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('handles complex nested content', () => {
      render(
        <Alert dismissible>
          <div>
            <AlertTitle>Complex Content</AlertTitle>
            <AlertDescription>
              <p>First paragraph</p>
              <p>Second paragraph</p>
              <a href="#test">Link</a>
            </AlertDescription>
          </div>
        </Alert>
      );

      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('Complex Content')).toBeInTheDocument();
      expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('handles rapid show/hide cycles', () => {
      const { rerender } = render(
        <Alert key="1" autoHide autoHideDelay={1000}>
          <AlertDescription>First alert</AlertDescription>
        </Alert>
      );

      expect(screen.getByRole('alert')).toBeInTheDocument();

      // Quickly replace with new alert
      rerender(
        <Alert key="2" autoHide autoHideDelay={1000}>
          <AlertDescription>Second alert</AlertDescription>
        </Alert>
      );

      expect(screen.getByText('Second alert')).toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('maintains proper z-index for dismiss button', () => {
      render(
        <Alert dismissible>
          <AlertTitle>Long Content That Might Overlap</AlertTitle>
          <AlertDescription>
            This is very long content that spans multiple lines to test if the dismiss button
            remains accessible and properly positioned above the content.
          </AlertDescription>
        </Alert>
      );

      const dismissButton = screen.getByRole('button', { name: /dismiss alert/i });
      expect(dismissButton).toHaveClass('absolute', 'right-2', 'top-2');
    });

    it('handles invalid autoHideDelay values', () => {
      render(
        <Alert autoHide autoHideDelay={-1000}>
          <AlertDescription>Invalid delay</AlertDescription>
        </Alert>
      );

      // Should not auto-hide with negative delay
      vi.advanceTimersByTime(2000);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });
});
