import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Dialog, { DialogContent, DialogDescription, DialogTitle, DialogTrigger } from './dialog';

describe('Dialog', () => {
  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
            <DialogDescription>Test description</DialogDescription>
            Dialog Content
          </DialogContent>
        </Dialog>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Functionality', () => {
    it('renders correctly', () => {
      render(
        <Dialog>
          <DialogTrigger data-testid="dialog-trigger">Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
            <DialogDescription>Test description</DialogDescription>
            Dialog Content
          </DialogContent>
        </Dialog>
      );
      expect(screen.getByTestId('dialog-trigger')).toBeInTheDocument();
    });

    it('opens when trigger is clicked', async () => {
      render(
        <Dialog>
          <DialogTrigger data-testid="dialog-trigger">Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
            <DialogDescription>Test description</DialogDescription>
            Dialog Content
          </DialogContent>
        </Dialog>
      );

      fireEvent.click(screen.getByTestId('dialog-trigger'));
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });
  });

  describe('Variants', () => {
    it('renders default variant', async () => {
      render(
        <Dialog defaultOpen>
          <DialogContent variant="default" data-testid="dialog-content">
            <DialogTitle>Default Dialog</DialogTitle>
            <DialogDescription>Default description</DialogDescription>
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        const dialogContent = screen.getByTestId('dialog-content');
        expect(dialogContent).toHaveClass('border-border');
      });
    });

    it('renders success variant', async () => {
      render(
        <Dialog defaultOpen>
          <DialogContent variant="success" data-testid="dialog-content">
            <DialogTitle>Success Dialog</DialogTitle>
            <DialogDescription>Success description</DialogDescription>
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        const dialogContent = screen.getByTestId('dialog-content');
        expect(dialogContent).toHaveClass('border-success/20', 'bg-success/5');
      });
    });

    it('renders warning variant', async () => {
      render(
        <Dialog defaultOpen>
          <DialogContent variant="warning" data-testid="dialog-content">
            <DialogTitle>Warning Dialog</DialogTitle>
            <DialogDescription>Warning description</DialogDescription>
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        const dialogContent = screen.getByTestId('dialog-content');
        expect(dialogContent).toHaveClass('border-warning/20', 'bg-warning/5');
      });
    });

    it('renders danger variant', async () => {
      render(
        <Dialog defaultOpen>
          <DialogContent variant="danger" data-testid="dialog-content">
            <DialogTitle>Danger Dialog</DialogTitle>
            <DialogDescription>Danger description</DialogDescription>
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        const dialogContent = screen.getByTestId('dialog-content');
        expect(dialogContent).toHaveClass('border-destructive/20', 'bg-destructive/5');
      });
    });
  });

  describe('Sizes', () => {
    it('renders sm size', async () => {
      render(
        <Dialog defaultOpen>
          <DialogContent size="sm" data-testid="dialog-content">
            <DialogTitle>Small Dialog</DialogTitle>
            <DialogDescription>Small description</DialogDescription>
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        const dialogContent = screen.getByTestId('dialog-content');
        expect(dialogContent).toHaveClass('max-w-sm');
      });
    });

    it('renders md size', async () => {
      render(
        <Dialog defaultOpen>
          <DialogContent size="md" data-testid="dialog-content">
            <DialogTitle>Medium Dialog</DialogTitle>
            <DialogDescription>Medium description</DialogDescription>
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        const dialogContent = screen.getByTestId('dialog-content');
        expect(dialogContent).toHaveClass('max-w-lg');
      });
    });

    it('renders lg size', async () => {
      render(
        <Dialog defaultOpen>
          <DialogContent size="lg" data-testid="dialog-content">
            <DialogTitle>Large Dialog</DialogTitle>
            <DialogDescription>Large description</DialogDescription>
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        const dialogContent = screen.getByTestId('dialog-content');
        expect(dialogContent).toHaveClass('max-w-2xl');
      });
    });

    it('renders xl size', async () => {
      render(
        <Dialog defaultOpen>
          <DialogContent size="xl" data-testid="dialog-content">
            <DialogTitle>Extra Large Dialog</DialogTitle>
            <DialogDescription>Extra large description</DialogDescription>
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        const dialogContent = screen.getByTestId('dialog-content');
        expect(dialogContent).toHaveClass('max-w-4xl');
      });
    });
  });

  describe('Loading State', () => {
    it('shows loading overlay when loading', async () => {
      render(
        <Dialog defaultOpen>
          <DialogContent loading data-testid="dialog-content">
            <DialogTitle>Loading Dialog</DialogTitle>
            <DialogDescription>Loading description</DialogDescription>
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        // Look for the loading spinner element
        const spinner = document.querySelector('.animate-spin');
        expect(spinner).toBeInTheDocument();
      });
    });

    it('hides loading overlay when not loading', async () => {
      render(
        <Dialog defaultOpen>
          <DialogContent data-testid="dialog-content">
            <DialogTitle>Normal Dialog</DialogTitle>
            <DialogDescription>Normal description</DialogDescription>
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        const spinner = document.querySelector('.animate-spin');
        expect(spinner).not.toBeInTheDocument();
      });
    });
  });

  describe('Disabled State', () => {
    it('prevents opening when disabled', () => {
      const onOpenChangeMock = vi.fn();
      render(
        <Dialog disabled onOpenChange={onOpenChangeMock}>
          <DialogTrigger data-testid="dialog-trigger">Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
            <DialogDescription>Test description</DialogDescription>
            Dialog Content
          </DialogContent>
        </Dialog>
      );

      fireEvent.click(screen.getByTestId('dialog-trigger'));
      // Should not call onOpenChange with true when disabled
      expect(onOpenChangeMock).not.toHaveBeenCalledWith(true);
    });
  });

  describe('Accessibility', () => {
    it('has proper aria attributes', async () => {
      render(
        <Dialog defaultOpen>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
            <DialogDescription>Test description</DialogDescription>
            Dialog Content
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveAttribute('role', 'dialog');
      });
    });
  });

  describe('Combined Variants and Sizes', () => {
    it('renders success variant with lg size', async () => {
      render(
        <Dialog defaultOpen>
          <DialogContent variant="success" size="lg" data-testid="dialog-content">
            <DialogTitle>Success Large Dialog</DialogTitle>
            <DialogDescription>Success large description</DialogDescription>
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        const dialogContent = screen.getByTestId('dialog-content');
        expect(dialogContent).toHaveClass('border-success/20', 'bg-success/5', 'max-w-2xl');
      });
    });

    it('renders warning variant with sm size', async () => {
      render(
        <Dialog defaultOpen>
          <DialogContent variant="warning" size="sm" data-testid="dialog-content">
            <DialogTitle>Warning Small Dialog</DialogTitle>
            <DialogDescription>Warning small description</DialogDescription>
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        const dialogContent = screen.getByTestId('dialog-content');
        expect(dialogContent).toHaveClass('border-warning/20', 'bg-warning/5', 'max-w-sm');
      });
    });
  });
});
