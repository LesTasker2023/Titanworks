'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { stripTransientProps } from '@/utils/stripTransientProps';

// Helper function for tooltip classes
const getTooltipClasses = (
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'muted' | 'accent',
  size?: 'sm' | 'default' | 'lg'
) => {
  const baseClass = 'tooltip';
  const variantClass =
    variant && variant !== 'default' ? `tooltip--${variant}` : 'tooltip--default';
  const sizeClass = size && size !== 'default' ? `tooltip--size-${size}` : 'tooltip--size-default';

  return `${baseClass} ${variantClass} ${sizeClass}`;
};

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'muted' | 'accent';
  size?: 'sm' | 'default' | 'lg';
  sideOffset?: number;
}

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, sideOffset = 4, variant = 'default', size = 'default', ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(getTooltipClasses(variant, size), className)}
    {...stripTransientProps(props)}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
