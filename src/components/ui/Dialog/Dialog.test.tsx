import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Button from '../Button/button';
import Dialog, {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';

// Test component wrapper for consistent testing
const TestDialog = ({
  size = 'md',
  children,
  triggerText = 'Open Dialog',
  ...props
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children?: React.ReactNode;
  triggerText?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}) => (
  <Dialog {...props}>
    <DialogTrigger asChild>
      <Button>{triggerText}</Button>
    </DialogTrigger>
    <DialogContent size={size}>
      <DialogHeader>
        <DialogTitle>Test Dialog</DialogTitle>
        <DialogDescription>This is a test dialog</DialogDescription>
      </DialogHeader>
      <div className="py-4">{children || <p>Test content</p>}</div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button>Confirm</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

describe('Dialog Component', () => {
  describe('Basic Functionality', () => {
    it('renders dialog trigger correctly', () => {
      render(<TestDialog />);

      expect(screen.getByRole('button', { name: 'Open Dialog' })).toBeInTheDocument();
    });

    describe('Snapshots', () => {
      it('matches default snapshot', () => {
        const { container } = render(<Dialog>Default</Dialog>);
        expect(container.firstChild).toMatchSnapshot();
      });
      it('matches all variants snapshot', () => {
        const { container } = render(
          <div data-testid="variants-container">
            <Dialog variant="default">Default</Dialog>
            <Dialog variant="destructive">Destructive</Dialog>
            <Dialog variant="outline">Outline</Dialog>
            <Dialog variant="secondary">Secondary</Dialog>
          </div>
        );
        expect(container.firstChild).toMatchSnapshot();
      });
      it('matches all sizes snapshot', () => {
        const { container } = render(
          <div data-testid="sizes-container">
            <Dialog size="sm">Small</Dialog>
            <Dialog size="default">Default</Dialog>
            <Dialog size="lg">Large</Dialog>
          </div>
        );
        expect(container.firstChild).toMatchSnapshot();
      });
      it('matches disabled state snapshot', () => {
        const { container } = render(<Dialog disabled>Disabled</Dialog>);
        expect(container.firstChild).toMatchSnapshot();
      });
      it('matches loading state snapshot', () => {
        const { container } = render(<Dialog loading>Loading</Dialog>);
        expect(container.firstChild).toMatchSnapshot();
      });
    });
    it('opens dialog when trigger is clicked', async () => {
      const user = userEvent.setup();
      render(<TestDialog />);

      const trigger = screen.getByRole('button', { name: 'Open Dialog' });
      await user.click(trigger);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Test Dialog')).toBeInTheDocument();
    });

    it('closes dialog when close button is clicked', async () => {
      const user = userEvent.setup();
      render(<TestDialog />);

      // Open dialog
      await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
      expect(screen.getByRole('dialog')).toBeInTheDocument();

      // Close dialog
      await user.click(screen.getByRole('button', { name: 'Cancel' }));

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('closes dialog when escape key is pressed', async () => {
      const user = userEvent.setup();
      render(<TestDialog />);

      // Open dialog
      await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
      expect(screen.getByRole('dialog')).toBeInTheDocument();

      // Press escape
      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });
  });

  describe('Size Variants', () => {
    const sizes = ['sm', 'md', 'lg', 'xl'] as const;
    const expectedClasses = {
      sm: 'max-w-sm',
      md: 'max-w-lg',
      lg: 'max-w-2xl',
      xl: 'max-w-4xl',
    };

    sizes.forEach(size => {
      it(`renders ${size} size correctly`, async () => {
        const user = userEvent.setup();
        render(<TestDialog size={size} />);

        await user.click(screen.getByRole('button', { name: 'Open Dialog' }));

        const dialogContent = screen.getByRole('dialog');
        expect(dialogContent).toHaveClass(expectedClasses[size]);
      });
    });

    it('defaults to medium size when no size is specified', async () => {
      const user = userEvent.setup();
      render(<TestDialog />);

      await user.click(screen.getByRole('button', { name: 'Open Dialog' }));

      const dialogContent = screen.getByRole('dialog');
      expect(dialogContent).toHaveClass('max-w-lg');
    });
  });

  describe('Compound Components', () => {
    it('renders DialogHeader correctly', async () => {
      const user = userEvent.setup();
      render(<TestDialog />);

      await user.click(screen.getByRole('button', { name: 'Open Dialog' }));

      const title = screen.getByRole('heading', { level: 2 });
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Test Dialog');
    });

    it('renders DialogDescription correctly', async () => {
      const user = userEvent.setup();
      render(<TestDialog />);

      await user.click(screen.getByRole('button', { name: 'Open Dialog' }));

      expect(screen.getByText('This is a test dialog')).toBeInTheDocument();
    });

    it('renders DialogFooter with buttons correctly', async () => {
      const user = userEvent.setup();
      render(<TestDialog />);

      await user.click(screen.getByRole('button', { name: 'Open Dialog' }));

      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
    });
  });

  describe('Event Handling', () => {
    it('calls onOpenChange when dialog opens', async () => {
      const mockOpenChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Dialog onOpenChange={mockOpenChange}>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByRole('button', { name: 'Open Dialog' }));

      expect(mockOpenChange).toHaveBeenCalledWith(true);
    });

    it('calls onOpenChange when dialog closes via escape', async () => {
      const mockOpenChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Dialog onOpenChange={mockOpenChange}>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
      await user.keyboard('{Escape}');

      expect(mockOpenChange).toHaveBeenLastCalledWith(false);
    });
  });

  describe('Controlled State', () => {
    it('works as controlled component', async () => {
      const user = userEvent.setup();
      let isOpen = false;
      const setIsOpen = vi.fn((open: boolean) => {
        isOpen = open;
      });

      const { rerender } = render(
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Controlled Dialog</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
      expect(setIsOpen).toHaveBeenCalledWith(true);

      // Simulate state update
      isOpen = true;
      rerender(
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Controlled Dialog</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', async () => {
      const user = userEvent.setup();
      render(<TestDialog />);

      await user.click(screen.getByRole('button', { name: 'Open Dialog' }));

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-labelledby');
      expect(dialog).toHaveAttribute('aria-describedby');
    });

    it('has correct role', async () => {
      const user = userEvent.setup();
      render(<TestDialog />);

      await user.click(screen.getByRole('button', { name: 'Open Dialog' }));

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  describe('Custom Content', () => {
    it('renders custom content correctly', async () => {
      const user = userEvent.setup();
      const customContent = (
        <div>
          <p>Custom paragraph</p>
          <button type="button">Custom button</button>
        </div>
      );

      render(<TestDialog>{customContent}</TestDialog>);

      await user.click(screen.getByRole('button', { name: 'Open Dialog' }));

      expect(screen.getByText('Custom paragraph')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Custom button' })).toBeInTheDocument();
    });

    it('handles forms correctly', async () => {
      const user = userEvent.setup();
      const handleSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());

      render(
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Form</Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Form Dialog</DialogTitle>
              </DialogHeader>
              <div>
                <label htmlFor="test-input">
                  Test Input
                  <input id="test-input" type="text" />
                </label>
              </div>
              <DialogFooter>
                <Button type="submit">Submit</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByRole('button', { name: 'Open Form' }));

      const input = screen.getByLabelText('Test Input');
      await user.type(input, 'test value');

      await user.click(screen.getByRole('button', { name: 'Submit' }));

      expect(handleSubmit).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('handles rapid open/close correctly', async () => {
      const user = userEvent.setup();
      render(<TestDialog />);

      const trigger = screen.getByRole('button', { name: 'Open Dialog' });

      // Rapidly open and close
      await user.click(trigger);
      await user.keyboard('{Escape}');
      await user.click(trigger);
      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('handles multiple dialogs correctly', () => {
      render(
        <div>
          <TestDialog triggerText="Dialog 1" />
          <TestDialog triggerText="Dialog 2" />
        </div>
      );

      expect(screen.getByRole('button', { name: 'Dialog 1' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Dialog 2' })).toBeInTheDocument();
    });

    it('preserves dialog state when trigger rerenders', async () => {
      const user = userEvent.setup();
      let triggerText = 'Initial Text';

      const { rerender } = render(<TestDialog triggerText={triggerText} />);

      await user.click(screen.getByRole('button', { name: 'Initial Text' }));
      expect(screen.getByRole('dialog')).toBeInTheDocument();

      // Rerender with new trigger text
      triggerText = 'Updated Text';
      rerender(<TestDialog triggerText={triggerText} />);

      // Dialog should still be open
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  describe('Error Boundaries', () => {
    it('handles errors in dialog content gracefully', () => {
      const ThrowError = () => {
        throw new Error('Test error');
      };

      // Suppress console error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(
          <TestDialog>
            <ThrowError />
          </TestDialog>
        );
      }).not.toThrow();

      consoleSpy.mockRestore();
    });
  });
});
