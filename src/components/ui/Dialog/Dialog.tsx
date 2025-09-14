'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';
import './Dialog.scss';

// Variant types
export type DialogVariant = 'default' | 'success' | 'warning' | 'danger';
export type DialogSize = 'sm' | 'md' | 'lg' | 'xl';

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay ref={ref} className={cn('dialog__overlay', className)} {...props} />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  variant?: DialogVariant;
  size?: DialogSize;
  loading?: boolean;
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, variant = 'default', size = 'md', loading = false, ...props }, ref) => {
  const dialogClassName = cn(
    'dialog__content',
    `dialog__content--variant-${variant}`,
    `dialog__content--size-${size}`,
    className
  );

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content ref={ref} className={dialogClassName} {...props}>
        {loading && (
          <div className="dialog__loading-overlay">
            <div className="dialog__spinner" />
          </div>
        )}
        {children}
        <DialogPrimitive.Close className="dialog__close-button">
          <X className="dialog__close-icon" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('dialog__header', className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('dialog__footer', className)} {...props} />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title ref={ref} className={cn('dialog__title', className)} {...props} />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('dialog__description', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export interface DialogProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root> {
  loading?: boolean;
  disabled?: boolean;
}

// Enhanced Dialog with custom features and CVA support
const Dialog = ({ disabled = false, ...props }: DialogProps) => {
  return (
    <DialogPrimitive.Root
      {...props}
      // Disable opening when disabled
      {...(disabled && {
        onOpenChange: open => {
          if (!open || !disabled) {
            props.onOpenChange?.(open);
          }
        },
      })}
    />
  );
};
Dialog.displayName = 'Dialog';

// Export Dialog as default and compound components as named exports
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
