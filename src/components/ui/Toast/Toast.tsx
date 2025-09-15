'use client';

import { cn } from '@/lib/utils';
import { stripTransientProps } from '@/utils/stripTransientProps';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { X } from 'lucide-react';
import * as React from 'react';

// Toast Provider - manages toast state
const ToastProvider = ToastPrimitive.Provider;

// Toast Viewport - container for all toasts
const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport ref={ref} className={cn('toast-viewport', className)} {...props} />
));
ToastViewport.displayName = ToastPrimitive.Viewport.displayName;

// Helper function for toast variant classes
const getToastClasses = (variant?: 'default' | 'success' | 'error' | 'warning' | 'info') => {
  const baseClasses = 'toast';
  const variantClass = variant && variant !== 'default' ? `toast--${variant}` : 'toast--default';
  return `${baseClasses} ${variantClass}`;
};

// Main Toast Component with variant prop
interface ToastComponentProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> {
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
}

const Toast = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Root>, ToastComponentProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <ToastPrimitive.Root
        ref={ref}
        className={cn(getToastClasses(variant), className)}
        {...stripTransientProps(props)}
      />
    );
  }
);
Toast.displayName = ToastPrimitive.Root.displayName;

// Toast Action - for interactive buttons
const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Action ref={ref} className={cn('toast-action', className)} {...props} />
));
ToastAction.displayName = ToastPrimitive.Action.displayName;

// Toast Close Button
const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    className={cn('toast-close', className)}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitive.Close>
));
ToastClose.displayName = ToastPrimitive.Close.displayName;

// Toast Title
const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title ref={ref} className={cn('toast-title', className)} {...props} />
));
ToastTitle.displayName = ToastPrimitive.Title.displayName;

// Toast Description
const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description ref={ref} className={cn('toast-description', className)} {...props} />
));
ToastDescription.displayName = ToastPrimitive.Description.displayName;

// Toast props type for exports
type ToastProps = ToastComponentProps;

// Toast action type for exports
type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  type ToastActionElement,
  type ToastProps,
};
