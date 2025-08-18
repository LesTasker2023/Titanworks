import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalVariants = cva(
  // Base styles for overlay
  'fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4',
  {
    variants: {
      animation: {
        default: 'animate-in fade-in-0 duration-200',
        fast: 'animate-in fade-in-0 duration-100',
        slow: 'animate-in fade-in-0 duration-300',
        none: '',
      },
    },
    defaultVariants: {
      animation: 'default',
    },
  }
);

const modalContentVariants = cva(
  // Base styles for modal content
  'relative bg-background border rounded-lg shadow-lg w-full max-h-[80vh] overflow-auto',
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        full: 'max-w-[95vw]',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      size: 'md',
      padding: 'md',
    },
  }
);

export interface ModalProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modalVariants> {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: VariantProps<typeof modalContentVariants>['size'];
  padding?: VariantProps<typeof modalContentVariants>['padding'];
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
        className={cn(modalVariants({ animation, className }))}
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...props}
        ref={ref}
      >
        <div className={cn(modalContentVariants({ size, padding }))}>{children}</div>
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
    <div
      ref={ref}
      className={cn('flex items-center justify-between p-6 pb-0', className)}
      {...props}
    />
  )
);
ModalHeader.displayName = 'ModalHeader';

const ModalTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      id="modal-title"
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
);
ModalTitle.displayName = 'ModalTitle';

const ModalDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    id="modal-description"
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
ModalDescription.displayName = 'ModalDescription';

const ModalContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);
ModalContent.displayName = 'ModalContent';

const ModalFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6 pt-0',
        className
      )}
      {...props}
    />
  )
);
ModalFooter.displayName = 'ModalFooter';

const ModalCloseButton = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { onClose: () => void }
>(({ className, onClose, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none',
      className
    )}
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
        className="h-4 w-4"
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
  modalContentVariants,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  modalVariants,
};
