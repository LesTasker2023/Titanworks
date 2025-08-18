'use client';

import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

// Enhanced separator variants for enterprise usage
const separatorVariants = cva('shrink-0 bg-border transition-colors duration-200', {
  variants: {
    orientation: {
      horizontal: 'h-[1px] w-full',
      vertical: 'h-full w-[1px]',
    },
    variant: {
      default: 'bg-border',
      muted: 'bg-muted',
      accent: 'bg-accent',
      primary: 'bg-primary/20',
      destructive: 'bg-destructive/20',
    },
    size: {
      sm: 'data-[orientation=horizontal]:h-[0.5px] data-[orientation=vertical]:w-[0.5px]',
      default: 'data-[orientation=horizontal]:h-[1px] data-[orientation=vertical]:w-[1px]',
      lg: 'data-[orientation=horizontal]:h-[2px] data-[orientation=vertical]:w-[2px]',
    },
    spacing: {
      none: '',
      sm: 'data-[orientation=horizontal]:my-2 data-[orientation=vertical]:mx-2',
      default: 'data-[orientation=horizontal]:my-4 data-[orientation=vertical]:mx-4',
      lg: 'data-[orientation=horizontal]:my-6 data-[orientation=vertical]:mx-6',
      xl: 'data-[orientation=horizontal]:my-8 data-[orientation=vertical]:mx-8',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    variant: 'default',
    size: 'default',
    spacing: 'default',
  },
});

interface SeparatorProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>, 'orientation'>,
    VariantProps<typeof separatorVariants> {
  decorative?: boolean;
  children?: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
}

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    {
      className,
      orientation = 'horizontal',
      decorative = true,
      variant,
      size,
      spacing,
      children,
      ...props
    },
    ref
  ) => {
    if (children) {
      // Text separator variant
      return (
        <div
          className={cn(
            'flex items-center',
            orientation === 'horizontal' ? 'w-full' : 'flex-col h-full',
            spacing === 'sm' && 'my-2',
            spacing === 'default' && 'my-4',
            spacing === 'lg' && 'my-6',
            spacing === 'xl' && 'my-8'
          )}
        >
          <SeparatorPrimitive.Root
            ref={ref}
            decorative={decorative}
            orientation={orientation}
            className={cn(
              separatorVariants({ orientation, variant, size, spacing: 'none' }),
              orientation === 'horizontal' ? 'flex-1' : 'flex-1',
              className
            )}
            {...props}
          />
          <div
            className={cn(
              'flex items-center justify-center text-xs text-muted-foreground font-medium',
              orientation === 'horizontal' ? 'px-3' : 'py-3'
            )}
          >
            {children}
          </div>
          <SeparatorPrimitive.Root
            decorative={decorative}
            orientation={orientation}
            className={cn(
              separatorVariants({ orientation, variant, size, spacing: 'none' }),
              orientation === 'horizontal' ? 'flex-1' : 'flex-1'
            )}
          />
        </div>
      );
    }

    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(separatorVariants({ orientation, variant, size, spacing }), className)}
        {...props}
      />
    );
  }
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator, separatorVariants };
export type { SeparatorProps };
