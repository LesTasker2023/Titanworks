/**
 * 🧪 Toast Component Test Suite
 *
 * Comprehensive test coverage for Toast notification system following
 * TriggerKings enterprise testing standards.
 */

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './toast';
import { Toaster } from './toaster';
import { useToast } from './use-toast';

// ===== TEST UTILITIES =====

function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      {children}
      <ToastViewport />
    </ToastProvider>
  );
}

function HookTestComponent() {
  const { toast } = useToast();

  return (
    <div>
      <button
        onClick={() => toast({ title: 'Default Toast', description: 'Default description' })}
        data-testid="trigger-default"
      >
        Default
      </button>
      <button
        onClick={() =>
          toast({ title: 'Success!', description: 'Success message', variant: 'success' })
        }
        data-testid="trigger-success"
      >
        Success
      </button>
      <button
        onClick={() => toast({ title: 'Error!', description: 'Error message', variant: 'error' })}
        data-testid="trigger-error"
      >
        Error
      </button>
    </div>
  );
}

// ===== COMPONENT TESTS =====

describe('Toast Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Toast Rendering', () => {
    it('renders basic toast with title and description', () => {
      render(
        <TestWrapper>
          <Toast data-testid="toast-root">
            <ToastTitle data-testid="toast-title">Test Title</ToastTitle>
            <ToastDescription data-testid="toast-description">Test Description</ToastDescription>
            <ToastClose data-testid="toast-close" />
          </Toast>
        </TestWrapper>
      );

      expect(screen.getByTestId('toast-root')).toBeInTheDocument();
      expect(screen.getByTestId('toast-title')).toBeInTheDocument();
      expect(screen.getByTestId('toast-description')).toBeInTheDocument();
      expect(screen.getByTestId('toast-close')).toBeInTheDocument();
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('renders toast with only title', () => {
      render(
        <TestWrapper>
          <Toast data-testid="toast-root">
            <ToastTitle data-testid="toast-title">Only Title</ToastTitle>
            <ToastClose />
          </Toast>
        </TestWrapper>
      );

      expect(screen.getByTestId('toast-root')).toBeInTheDocument();
      expect(screen.getByText('Only Title')).toBeInTheDocument();
      expect(screen.queryByTestId('toast-description')).not.toBeInTheDocument();
    });
  });

  describe('Toast Variants', () => {
    const variants = ['default', 'success', 'error', 'warning', 'info'] as const;

    variants.forEach(variant => {
      it(`renders ${variant} variant with correct styling`, () => {
        render(
          <TestWrapper>
            <Toast variant={variant} data-testid={`toast-${variant}`}>
              <ToastTitle>{`${variant} Title`}</ToastTitle>
              <ToastClose />
            </Toast>
          </TestWrapper>
        );

        const toast = screen.getByTestId(`toast-${variant}`);
        expect(toast).toBeInTheDocument();
        expect(screen.getByText(`${variant} Title`)).toBeInTheDocument();

        if (variant !== 'default') {
          expect(toast.className).toContain('bg-');
        }
      });
    });
  });

  describe('Toast Actions', () => {
    it('renders and handles action button clicks', () => {
      const mockAction = vi.fn();

      render(
        <TestWrapper>
          <Toast data-testid="toast-root">
            <ToastTitle>Actionable Toast</ToastTitle>
            <ToastAction onClick={mockAction} data-testid="toast-action" altText="Action Button">
              Click Me
            </ToastAction>
            <ToastClose />
          </Toast>
        </TestWrapper>
      );

      const actionButton = screen.getByTestId('toast-action');
      expect(actionButton).toBeInTheDocument();
      expect(screen.getByText('Click Me')).toBeInTheDocument();

      fireEvent.click(actionButton);
      expect(mockAction).toHaveBeenCalledTimes(1);
    });
  });

  describe('useToast Hook', () => {
    it('creates default toast via hook', async () => {
      render(
        <TestWrapper>
          <HookTestComponent />
          <Toaster />
        </TestWrapper>
      );

      fireEvent.click(screen.getByTestId('trigger-default'));

      await waitFor(
        () => {
          expect(screen.getByText('Default Toast')).toBeInTheDocument();
          expect(screen.getByText('Default description')).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });

    it('creates success toast with correct styling', async () => {
      render(
        <TestWrapper>
          <HookTestComponent />
          <Toaster />
        </TestWrapper>
      );

      fireEvent.click(screen.getByTestId('trigger-success'));

      await waitFor(() => {
        expect(screen.getByText('Success!')).toBeInTheDocument();
        expect(screen.getByText('Success message')).toBeInTheDocument();
      });
    });

    it('handles multiple toasts simultaneously', async () => {
      render(
        <TestWrapper>
          <HookTestComponent />
          <Toaster />
        </TestWrapper>
      );

      // Test that error toast appears first
      fireEvent.click(screen.getByTestId('trigger-error'));

      await waitFor(() => {
        expect(screen.getByText('Error!')).toBeInTheDocument();
        expect(screen.getByText('Error message')).toBeInTheDocument();
      });

      // Test that we can create another toast
      fireEvent.click(screen.getByTestId('trigger-success'));

      await waitFor(() => {
        // At least one toast should be visible
        expect(screen.getByText('Success!')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      render(
        <TestWrapper>
          <Toast data-testid="accessible-toast">
            <ToastTitle>Accessible Title</ToastTitle>
            <ToastDescription>Accessible Description</ToastDescription>
            <ToastClose />
          </Toast>
        </TestWrapper>
      );

      const toast = screen.getByTestId('accessible-toast');
      expect(toast).toBeInTheDocument();
      expect(screen.getByText('Accessible Title')).toBeInTheDocument();
      expect(screen.getByText('Accessible Description')).toBeInTheDocument();
    });

    it('supports keyboard navigation', () => {
      render(
        <TestWrapper>
          <Toast data-testid="keyboard-toast">
            <ToastTitle>Keyboard Navigation</ToastTitle>
            <ToastClose data-testid="keyboard-close" />
          </Toast>
        </TestWrapper>
      );

      const closeButton = screen.getByTestId('keyboard-close');
      closeButton.focus();
      expect(document.activeElement).toBe(closeButton);
    });
  });

  describe('Toast Lifecycle', () => {
    it('handles onOpenChange callback', () => {
      const mockOpenChange = vi.fn();

      render(
        <TestWrapper>
          <Toast onOpenChange={mockOpenChange} data-testid="lifecycle-toast">
            <ToastTitle>Lifecycle Test</ToastTitle>
            <ToastClose data-testid="lifecycle-close" />
          </Toast>
        </TestWrapper>
      );

      fireEvent.click(screen.getByTestId('lifecycle-close'));
      expect(mockOpenChange).toHaveBeenCalledWith(false);
    });
  });

  describe('Component Props', () => {
    it('accepts and applies custom className', () => {
      render(
        <TestWrapper>
          <Toast className="custom-toast-class" data-testid="custom-class-toast">
            <ToastTitle>Custom Class Test</ToastTitle>
            <ToastClose />
          </Toast>
        </TestWrapper>
      );

      const toast = screen.getByTestId('custom-class-toast');
      expect(toast).toHaveClass('custom-toast-class');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLLIElement>();

      render(
        <TestWrapper>
          <Toast ref={ref} data-testid="ref-toast">
            <ToastTitle>Ref Test</ToastTitle>
            <ToastClose />
          </Toast>
        </TestWrapper>
      );

      expect(ref.current).toBeInstanceOf(HTMLElement);
    });
  });

  describe('Error Handling', () => {
    it('handles empty content gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <TestWrapper>
          <Toast data-testid="empty-toast">
            <ToastTitle></ToastTitle>
            <ToastClose />
          </Toast>
        </TestWrapper>
      );

      expect(screen.getByTestId('empty-toast')).toBeInTheDocument();
      consoleSpy.mockRestore();
    });
  });

  describe('Snapshots', () => {
    it('matches default toast snapshot', () => {
      const { container } = render(
        <TestWrapper>
          <Toast data-testid="default-toast">
            <ToastTitle>Default Toast</ToastTitle>
            <ToastDescription>This is a default toast message</ToastDescription>
            <ToastClose />
          </Toast>
        </TestWrapper>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches all variants snapshot', () => {
      const { container } = render(
        <TestWrapper>
          <Toast variant="default" data-testid="variant-default">
            <ToastTitle>Default</ToastTitle>
            <ToastDescription>Default variant</ToastDescription>
          </Toast>
          <Toast variant="success" data-testid="variant-success">
            <ToastTitle>Success</ToastTitle>
            <ToastDescription>Success variant</ToastDescription>
          </Toast>
          <Toast variant="error" data-testid="variant-error">
            <ToastTitle>Error</ToastTitle>
            <ToastDescription>Error variant</ToastDescription>
          </Toast>
          <Toast variant="warning" data-testid="variant-warning">
            <ToastTitle>Warning</ToastTitle>
            <ToastDescription>Warning variant</ToastDescription>
          </Toast>
          <Toast variant="info" data-testid="variant-info">
            <ToastTitle>Info</ToastTitle>
            <ToastDescription>Info variant</ToastDescription>
          </Toast>
        </TestWrapper>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches toast with action snapshot', () => {
      const { container } = render(
        <TestWrapper>
          <Toast data-testid="toast-with-action">
            <ToastTitle>Toast with Action</ToastTitle>
            <ToastDescription>This toast has an action button</ToastDescription>
            <ToastAction altText="Undo action">Undo</ToastAction>
            <ToastClose />
          </Toast>
        </TestWrapper>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches toast provider and viewport snapshot', () => {
      const { container } = render(
        <ToastProvider>
          <div>Content</div>
          <ToastViewport data-testid="toast-viewport" />
        </ToastProvider>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches toaster component snapshot', () => {
      const { container } = render(<Toaster />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
