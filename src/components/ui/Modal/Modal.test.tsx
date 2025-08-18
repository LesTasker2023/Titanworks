import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from './Modal';

// Mock createPortal for testing
vi.mock('react-dom', async () => {
  const actual = await vi.importActual('react-dom');
  return {
    ...actual,
    createPortal: (children: React.ReactNode) => children,
  };
});

describe('Modal', () => {
  const mockOnClose = vi.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  afterEach(() => {
    // Reset body overflow style
    document.body.style.overflow = '';
  });

  it('renders without crashing when open', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Modal content</div>
      </Modal>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <Modal isOpen={false} onClose={mockOnClose}>
        <div>Modal content</div>
      </Modal>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls onClose when escape key is pressed', async () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Modal content</div>
      </Modal>
    );

    await user.keyboard('{Escape}');
    expect(mockOnClose).toHaveBeenCalledOnce();
  });

  it('does not call onClose when escape key is pressed and closeOnEscape is false', async () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} closeOnEscape={false}>
        <div>Modal content</div>
      </Modal>
    );

    await user.keyboard('{Escape}');
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('calls onClose when overlay is clicked', async () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Modal content</div>
      </Modal>
    );

    const overlay = screen.getByRole('dialog');
    await user.click(overlay);
    expect(mockOnClose).toHaveBeenCalledOnce();
  });

  it('does not call onClose when overlay is clicked and closeOnOverlayClick is false', async () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} closeOnOverlayClick={false}>
        <div>Modal content</div>
      </Modal>
    );

    const overlay = screen.getByRole('dialog');
    await user.click(overlay);
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('does not call onClose when modal content is clicked', async () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Modal content</div>
      </Modal>
    );

    const content = screen.getByText('Modal content');
    await user.click(content);
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('applies size variants correctly', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={mockOnClose} size="sm">
        <div>Modal content</div>
      </Modal>
    );

    expect(document.querySelector('.max-w-sm')).toBeInTheDocument();

    rerender(
      <Modal isOpen={true} onClose={mockOnClose} size="lg">
        <div>Modal content</div>
      </Modal>
    );

    expect(document.querySelector('.max-w-lg')).toBeInTheDocument();
  });

  it('applies padding variants correctly', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={mockOnClose} padding="sm">
        <div>Modal content</div>
      </Modal>
    );

    expect(document.querySelector('.p-4')).toBeInTheDocument();

    rerender(
      <Modal isOpen={true} onClose={mockOnClose} padding="lg">
        <div>Modal content</div>
      </Modal>
    );

    expect(document.querySelector('.p-8')).toBeInTheDocument();
  });

  it('applies animation variants correctly', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} animation="fast">
        <div>Modal content</div>
      </Modal>
    );

    expect(document.querySelector('.duration-100')).toBeInTheDocument();
  });

  it('prevents body scroll when preventScroll is true', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} preventScroll={true}>
        <div>Modal content</div>
      </Modal>
    );

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('does not prevent body scroll when preventScroll is false', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} preventScroll={false}>
        <div>Modal content</div>
      </Modal>
    );

    expect(document.body.style.overflow).not.toBe('hidden');
  });

  it('restores body scroll when unmounted', () => {
    const { unmount } = render(
      <Modal isOpen={true} onClose={mockOnClose} preventScroll={true}>
        <div>Modal content</div>
      </Modal>
    );

    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).toBe('');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(
      <Modal isOpen={true} onClose={mockOnClose} ref={ref}>
        <div>Modal content</div>
      </Modal>
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  // Accessibility tests
  it('has proper accessibility attributes', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Modal content</div>
      </Modal>
    );

    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(modal).toHaveAttribute('aria-labelledby', 'modal-title');
    expect(modal).toHaveAttribute('aria-describedby', 'modal-description');
  });

  it('traps focus within modal', async () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>
          <button>First button</button>
          <button>Second button</button>
        </div>
      </Modal>
    );

    const firstButton = screen.getByText('First button');
    const secondButton = screen.getByText('Second button');

    firstButton.focus();
    expect(firstButton).toHaveFocus();

    await user.tab();
    expect(secondButton).toHaveFocus();
  });

  describe('Modal sub-components', () => {
    it('renders ModalHeader correctly', () => {
      render(<ModalHeader>Header content</ModalHeader>);
      expect(screen.getByText('Header content')).toBeInTheDocument();
    });

    it('renders ModalTitle correctly', () => {
      render(<ModalTitle>Title content</ModalTitle>);
      const title = screen.getByText('Title content');
      expect(title).toBeInTheDocument();
      expect(title).toHaveAttribute('id', 'modal-title');
      expect(title.tagName).toBe('H2');
    });

    it('renders ModalDescription correctly', () => {
      render(<ModalDescription>Description content</ModalDescription>);
      const description = screen.getByText('Description content');
      expect(description).toBeInTheDocument();
      expect(description).toHaveAttribute('id', 'modal-description');
    });

    it('renders ModalContent correctly', () => {
      render(<ModalContent>Content</ModalContent>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders ModalFooter correctly', () => {
      render(<ModalFooter>Footer content</ModalFooter>);
      expect(screen.getByText('Footer content')).toBeInTheDocument();
    });

    it('renders ModalCloseButton correctly', () => {
      const mockClose = vi.fn();
      render(<ModalCloseButton onClose={mockClose} />);

      const closeButton = screen.getByRole('button', { name: /close modal/i });
      expect(closeButton).toBeInTheDocument();
      expect(closeButton).toHaveAttribute('aria-label', 'Close modal');
    });

    it('calls onClose when ModalCloseButton is clicked', async () => {
      const mockClose = vi.fn();
      render(<ModalCloseButton onClose={mockClose} />);

      const closeButton = screen.getByRole('button', { name: /close modal/i });
      await user.click(closeButton);
      expect(mockClose).toHaveBeenCalledOnce();
    });

    it('renders custom content in ModalCloseButton', () => {
      const mockClose = vi.fn();
      render(<ModalCloseButton onClose={mockClose}>Custom close</ModalCloseButton>);

      expect(screen.getByText('Custom close')).toBeInTheDocument();
    });
  });

  describe('Complete Modal composition', () => {
    it('renders complete modal with all sub-components', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <ModalHeader>
            <ModalTitle>Test Modal</ModalTitle>
            <ModalCloseButton onClose={mockOnClose} />
          </ModalHeader>
          <ModalContent>
            <ModalDescription>This is a test modal description.</ModalDescription>
            <p>Modal body content goes here.</p>
          </ModalContent>
          <ModalFooter>
            <button>Cancel</button>
            <button>Confirm</button>
          </ModalFooter>
        </Modal>
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
      expect(screen.getByText('This is a test modal description.')).toBeInTheDocument();
      expect(screen.getByText('Modal body content goes here.')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Confirm')).toBeInTheDocument();
    });
  });
});
