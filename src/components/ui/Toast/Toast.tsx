'use client';

import { cn } from '@/lib/utils';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import * as React from 'react';

// Toast Provider - manages toast state
const ToastProvider = ToastPrimitive.Provider;

// Toast Viewport - container for all toasts
const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn(
      'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitive.Viewport.displayName;

// Toast variant configuration with CVA
const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'border bg-background text-foreground',
        success:
          '[border-color:hsl(var(--status-success))] [background-color:hsl(var(--status-success)/0.1)] [color:hsl(var(--status-success))] dark:[border-color:hsl(var(--status-success))] dark:[background-color:hsl(var(--status-success)/0.1)] dark:[color:hsl(var(--status-success))]',
        error:
          '[border-color:hsl(var(--status-error))] [background-color:hsl(var(--status-error)/0.1)] [color:hsl(var(--status-error))] dark:[border-color:hsl(var(--status-error))] dark:[background-color:hsl(var(--status-error)/0.1)] dark:[color:hsl(var(--status-error))]',
        warning:
          '[border-color:hsl(var(--status-warning))] [background-color:hsl(var(--status-warning)/0.1)] [color:hsl(var(--status-warning))] dark:[border-color:hsl(var(--status-warning))] dark:[background-color:hsl(var(--status-warning)/0.1)] dark:[color:hsl(var(--status-warning))]',
        info: 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-900 dark:text-blue-100',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Main Toast Component
const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitive.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  );
});
Toast.displayName = ToastPrimitive.Root.displayName;

// Toast Action - for interactive buttons
const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Action
    ref={ref}
    className={cn(
      'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-xs font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.success]:[border-color:hsl(var(--status-success))] group-[.success]:hover:[border-color:hsl(var(--status-success))] group-[.success]:hover:[background-color:hsl(var(--status-success)/0.2)] group-[.error]:[border-color:hsl(var(--status-error))] group-[.error]:hover:[border-color:hsl(var(--status-error))] group-[.error]:hover:[background-color:hsl(var(--status-error)/0.1)]',
      className
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitive.Action.displayName;

// Toast Close Button
const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    className={cn(
      'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.success]:[color:hsl(var(--status-success))] group-[.error]:[color:hsl(var(--status-error))] group-[.warning]:[color:hsl(var(--status-warning))] group-[.info]:[color:hsl(var(--status-info))]',
      className
    )}
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
  <ToastPrimitive.Title ref={ref} className={cn('text-sm font-semibold', className)} {...props} />
));
ToastTitle.displayName = ToastPrimitive.Title.displayName;

// Toast Description
const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    className={cn('text-sm opacity-90', className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitive.Description.displayName;

// Toast props type for exports
type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

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
