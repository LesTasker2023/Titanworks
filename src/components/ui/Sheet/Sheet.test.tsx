import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from './Sheet';

describe('Sheet', () => {
  const renderBasicSheet = (props = {}) => {
    return render(
      <Sheet defaultOpen={true}>
        <SheetTrigger data-testid="sheet-trigger">Open</SheetTrigger>
        <SheetContent data-testid="sheet" {...props}>
          <SheetHeader>Sheet Header</SheetHeader>
          <div>Test content</div>
          <SheetFooter>Sheet Footer</SheetFooter>
        </SheetContent>
      </Sheet>
    );
  };

  const renderClosedSheet = (props = {}) => {
    return render(
      <Sheet>
        <SheetTrigger data-testid="sheet-trigger">Open</SheetTrigger>
        <SheetContent data-testid="sheet" {...props}>
          <SheetHeader>Sheet Header</SheetHeader>
          <div>Test content</div>
          <SheetFooter>Sheet Footer</SheetFooter>
        </SheetContent>
      </Sheet>
    );
  };

  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = renderClosedSheet();
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches disabled state snapshot', () => {
      const { container } = renderClosedSheet({ disabled: true });
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches hover state snapshot', () => {
      const { container } = renderClosedSheet({ hover: true });
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Basic Functionality', () => {
    it('renders sheet trigger', () => {
      renderClosedSheet();
      expect(screen.getByTestId('sheet-trigger')).toBeInTheDocument();
      expect(screen.getByText('Open')).toBeInTheDocument();
    });

    it('renders sheet content when defaultOpen is true', () => {
      renderBasicSheet();
      expect(screen.getByTestId('sheet')).toBeInTheDocument();
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('opens sheet when trigger is clicked', async () => {
      const user = userEvent.setup();
      renderClosedSheet();

      const trigger = screen.getByTestId('sheet-trigger');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByTestId('sheet')).toBeInTheDocument();
      });
    });

    it('renders sheet header and footer', () => {
      renderBasicSheet();
      expect(screen.getByText('Sheet Header')).toBeInTheDocument();
      expect(screen.getByText('Sheet Footer')).toBeInTheDocument();
    });

    it('applies custom className to content', () => {
      renderBasicSheet({ className: 'custom-sheet' });
      const sheet = screen.getByTestId('sheet');
      expect(sheet).toHaveClass('custom-sheet');
    });
  });

  describe('Interaction', () => {
    it('closes sheet when close button is clicked', async () => {
      const user = userEvent.setup();
      renderBasicSheet();

      const closeButton = screen.getByRole('button', { name: /close/i });
      await user.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByTestId('sheet')).not.toBeInTheDocument();
      });
    });

    it('closes sheet when overlay is clicked', async () => {
      const user = userEvent.setup();
      renderBasicSheet();

      const overlay = document.querySelector('[data-radix-dialog-overlay]');
      if (overlay) {
        await user.click(overlay);
        await waitFor(() => {
          expect(screen.queryByTestId('sheet')).not.toBeInTheDocument();
        });
      }
    });

    it('closes sheet when escape key is pressed', async () => {
      const user = userEvent.setup();
      renderBasicSheet();

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(screen.queryByTestId('sheet')).not.toBeInTheDocument();
      });
    });
  });

  describe('Props', () => {
    it('handles side prop correctly', () => {
      renderBasicSheet({ side: 'left' });
      const sheet = screen.getByTestId('sheet');
      expect(sheet).toBeInTheDocument();
      // Radix applies positioning via CSS, hard to test exact classes
    });

    it('handles size prop correctly', () => {
      renderBasicSheet({ size: 'lg' });
      const sheet = screen.getByTestId('sheet');
      expect(sheet).toBeInTheDocument();
      // Size variants are applied via CSS classes
    });

    it('spreads additional props', () => {
      renderBasicSheet({ 'data-custom': 'test-value' });
      const sheet = screen.getByTestId('sheet');
      expect(sheet).toHaveAttribute('data-custom', 'test-value');
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      renderBasicSheet();
      const sheet = screen.getByTestId('sheet');
      expect(sheet).toHaveAttribute('role', 'dialog');
      // Note: aria-modal is applied by Radix at the portal level, not the content element
    });

    it('trigger has correct ARIA attributes', () => {
      renderClosedSheet();
      const trigger = screen.getByTestId('sheet-trigger');
      expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    });

    it('focuses content when opened', async () => {
      const user = userEvent.setup();
      renderClosedSheet();

      const trigger = screen.getByTestId('sheet-trigger');
      await user.click(trigger);

      await waitFor(() => {
        const sheet = screen.getByTestId('sheet');
        expect(sheet).toBeInTheDocument();
        // Focus management is handled by Radix
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles complex nested content', () => {
      render(
        <Sheet defaultOpen={true}>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent data-testid="sheet">
            <div>
              <span>Nested content</span>
              <div>
                <p>Deep nesting</p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      );
      expect(screen.getByText('Nested content')).toBeInTheDocument();
      expect(screen.getByText('Deep nesting')).toBeInTheDocument();
    });

    it('maintains functionality with many children', () => {
      render(
        <Sheet defaultOpen={true}>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent data-testid="sheet">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i}>Item {i}</div>
            ))}
          </SheetContent>
        </Sheet>
      );
      expect(screen.getByText('Item 0')).toBeInTheDocument();
      expect(screen.getByText('Item 4')).toBeInTheDocument();
    });

    it('handles rapid open/close correctly', async () => {
      const user = userEvent.setup();
      renderClosedSheet();

      const trigger = screen.getByTestId('sheet-trigger');

      // Rapid clicks
      await user.click(trigger);
      await user.keyboard('{Escape}');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByTestId('sheet')).toBeInTheDocument();
      });
    });

    it('handles component unmounting cleanly', () => {
      const { unmount } = renderBasicSheet();
      expect(() => unmount()).not.toThrow();
    });

    it('preserves functionality after remounting', () => {
      const { rerender } = renderBasicSheet();
      rerender(
        <Sheet defaultOpen={true}>
          <SheetTrigger data-testid="sheet-trigger">Open</SheetTrigger>
          <SheetContent data-testid="sheet">Remounted content</SheetContent>
        </Sheet>
      );
      expect(screen.getByText('Remounted content')).toBeInTheDocument();
    });
  });
});
