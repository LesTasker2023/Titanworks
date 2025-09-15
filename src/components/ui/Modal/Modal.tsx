import { cn } from '@/lib/utils';
import { forwardRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

const getModalClassName = (animation?: string) => {
  const baseClass = 'modal';
  if (!animation || animation === 'default') return `${baseClass} ${baseClass}--animation-default`;
  return `${baseClass} ${baseClass}--animation-${animation}`;
};

const getModalContentClassName = (size?: string, padding?: string) => {
  const baseClass = 'modal__content';
  let className = baseClass;

  // Size variant
  if (size) {
    className += ` ${baseClass}--size-${size}`;
  } else {
    className += ` ${baseClass}--size-md`; // default
  }

  // Padding variant
  if (padding) {
    className += ` ${baseClass}--padding-${padding}`;
  } else {
    className += ` ${baseClass}--padding-md`; // default
  }

  return className;
};

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  animation?: 'default' | 'fast' | 'slow' | 'none';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  preventScroll?: boolean;
  portal?: boolean;
  portalContainer?: Element;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      className,
      animation,
      size,
      padding,
      isOpen,
      onClose,
      children,
      closeOnOverlayClick = true,
      closeOnEscape = true,
      preventScroll = true,
      portal = true,
      portalContainer,
      ...props
    },
    ref
  ) => {
    // Handle escape key
    useEffect(() => {
      if (!isOpen || !closeOnEscape) return;

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, closeOnEscape, onClose]);

    // Handle body scroll prevention
    useEffect(() => {
      if (!isOpen || !preventScroll) return;

      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalStyle;
      };
    }, [isOpen, preventScroll]);

    // Handle overlay click
    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnOverlayClick && event.target === event.currentTarget) {
        onClose();
      }
    };

    if (!isOpen) return null;

    const modalContent = (
      <div
        className={cn(getModalClassName(animation), className)}
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...props}
        ref={ref}
      >
        <div className={getModalContentClassName(size, padding)}>{children}</div>
      </div>
    );

    if (portal) {
      const container = portalContainer || document.body;
      return createPortal(modalContent, container);
    }

    return modalContent;
  }
);

Modal.displayName = 'Modal';

// Modal sub-components for better composition
const ModalHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('modal__header', className)} {...props} />
  )
);
ModalHeader.displayName = 'ModalHeader';

const ModalTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} id="modal-title" className={cn('modal__title', className)} {...props} />
  )
);
ModalTitle.displayName = 'ModalTitle';

const ModalDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} id="modal-description" className={cn('modal__description', className)} {...props} />
));
ModalDescription.displayName = 'ModalDescription';

const ModalContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('modal__content-area', className)} {...props} />
  )
);
ModalContent.displayName = 'ModalContent';

const ModalFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('modal__footer', className)} {...props} />
  )
);
ModalFooter.displayName = 'ModalFooter';

const ModalCloseButton = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { onClose: () => void }
>(({ className, onClose, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn('modal__close-button', className)}
    onClick={onClose}
    aria-label="Close modal"
    {...props}
  >
    {children || (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m11.7816 4.03157c.0824-.07446.0824-.19618 0-.27064L11.4885 3.46826c-.0652-.05887-.1569-.05887-.2221 0L7.50002 7.2342 3.73336 3.46826c-.06516-.05887-.15698-.05887-.22214 0L3.21836 3.76093c-.08238.07446-.08238.19618 0 .27064L7.2342 8.00002 3.21836 11.9842c-.08238.0745-.08238.1962 0 .2706l.29286.2927c.06516.0589.15698.0589.22214 0L7.50002 8.7658l3.76664 3.766c.0652.0589.1569.0589.2221 0l.2929-.2927c.0824-.0744.0824-.1961 0-.2706L8.76582 8.00002 11.7816 4.03157Z"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
    )}
  </button>
));
ModalCloseButton.displayName = 'ModalCloseButton';

export {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
};
