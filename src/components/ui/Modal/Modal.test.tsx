import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Modal, ModalContent, ModalHeader, ModalFooter } from './Modal';

describe('Modal', () => {
  // Helper component that disables portal for testing
  const BasicModal = ({ isOpen = true, portal = false, ...props }) => (
    <Modal isOpen={isOpen} onClose={() => {}} data-testid="modal" portal={portal} {...props}>
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <div>Custom content</div>
        <ModalFooter>Modal Footer</ModalFooter>
      </ModalContent>
    </Modal>
  );

  // Portal version for testing actual portal behavior
  const PortalModal = ({ isOpen = true, ...props }) => (
    <Modal isOpen={isOpen} onClose={() => {}} data-testid="modal" portal={true} {...props}>
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <div>Custom content</div>
        <ModalFooter>Modal Footer</ModalFooter>
      </ModalContent>
    </Modal>
  );

  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = render(<BasicModal />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches disabled state snapshot', () => {
      const { container } = render(<BasicModal disabled />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches different size snapshot', () => {
      const { container } = render(<BasicModal size="lg" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches different padding snapshot', () => {
      const { container } = render(<BasicModal padding="lg" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches different animation snapshot', () => {
      const { container } = render(<BasicModal animation="fast" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Rendering', () => {
    it('renders when open', () => {
      render(<BasicModal />);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Custom content')).toBeInTheDocument();
    });

    it('does not render when closed', () => {
      render(<BasicModal isOpen={false} />);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders with custom content', () => {
      render(
        <Modal isOpen onClose={() => {}} portal={false}>
          <div>Custom content</div>
        </Modal>
      );
      expect(screen.getByText('Custom content')).toBeInTheDocument();
    });

    it('renders modal header and footer', () => {
      render(<BasicModal />);
      expect(screen.getByText('Modal Title')).toBeInTheDocument();
      expect(screen.getByText('Modal Footer')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<BasicModal className="custom-modal" />);
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveClass('custom-modal');
    });
  });

  describe('Portal Rendering', () => {
    it('renders in portal by default', () => {
      const { container } = render(<PortalModal />);
      // When using portal, container.firstChild is null
      expect(container.firstChild).toBeNull();
      // But modal is rendered in document.body
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('renders without portal when disabled', () => {
      const { container } = render(<BasicModal portal={false} />);
      expect(container.firstChild).not.toBeNull();
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  describe('Interaction', () => {
    it('calls onClose when overlay is clicked', () => {
      const onClose = vi.fn();
      render(<BasicModal onClose={onClose} />);

      const overlay = screen.getByRole('dialog');
      fireEvent.click(overlay);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when content is clicked', () => {
      const onClose = vi.fn();
      render(<BasicModal onClose={onClose} />);

      const content = screen.getByText('Custom content');
      fireEvent.click(content);
      expect(onClose).not.toHaveBeenCalled();
    });

    it('calls onClose when escape key is pressed', () => {
      const onClose = vi.fn();
      render(<BasicModal onClose={onClose} />);

      fireEvent.keyDown(document, { key: 'Escape' });
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose on escape when closeOnEscape is false', () => {
      const onClose = vi.fn();
      render(<BasicModal onClose={onClose} closeOnEscape={false} />);

      fireEvent.keyDown(document, { key: 'Escape' });
      expect(onClose).not.toHaveBeenCalled();
    });

    it('does not call onClose on overlay click when closeOnOverlayClick is false', () => {
      const onClose = vi.fn();
      render(<BasicModal onClose={onClose} closeOnOverlayClick={false} />);

      const overlay = screen.getByRole('dialog');
      fireEvent.click(overlay);
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      render(<BasicModal />);
      const modal = screen.getByRole('dialog');

      expect(modal).toHaveAttribute('aria-modal', 'true');
      expect(modal).toHaveAttribute('aria-labelledby', 'modal-title');
      expect(modal).toHaveAttribute('aria-describedby', 'modal-description');
    });

    it('has dialog role', () => {
      render(<BasicModal />);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('applies size variants correctly', () => {
      const { rerender } = render(<BasicModal size="sm" />);
      let modal = screen.getByRole('dialog');
      expect(modal.firstChild).toHaveClass('max-w-sm');

      rerender(<BasicModal size="lg" />);
      modal = screen.getByRole('dialog');
      expect(modal.firstChild).toHaveClass('max-w-lg');
    });

    it('applies padding variants correctly', () => {
      const { rerender } = render(<BasicModal padding="sm" />);
      let modal = screen.getByRole('dialog');
      expect(modal.firstChild).toHaveClass('p-4');

      rerender(<BasicModal padding="lg" />);
      modal = screen.getByRole('dialog');
      expect(modal.firstChild).toHaveClass('p-8');
    });

    it('applies animation variants correctly', () => {
      const { rerender } = render(<BasicModal animation="fast" />);
      let modal = screen.getByRole('dialog');
      expect(modal).toHaveClass('duration-100');

      rerender(<BasicModal animation="slow" />);
      modal = screen.getByRole('dialog');
      expect(modal).toHaveClass('duration-300');

      rerender(<BasicModal animation="none" />);
      modal = screen.getByRole('dialog');
      expect(modal).not.toHaveClass('animate-in');
    });
  });

  describe('Edge Cases', () => {
    it('handles missing onClose gracefully', () => {
      // Should not throw
      expect(() => {
        render(
          <Modal isOpen onClose={undefined as never} portal={false}>
            <div>Content</div>
          </Modal>
        );
      }).not.toThrow();
    });

    it('handles empty children', () => {
      render(
        <Modal isOpen onClose={() => {}} portal={false}>
          {null}
        </Modal>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('handles multiple children', () => {
      render(
        <Modal isOpen onClose={() => {}} portal={false}>
          <div>First child</div>
          <div>Second child</div>
        </Modal>
      );
      expect(screen.getByText('First child')).toBeInTheDocument();
      expect(screen.getByText('Second child')).toBeInTheDocument();
    });
  });
});
