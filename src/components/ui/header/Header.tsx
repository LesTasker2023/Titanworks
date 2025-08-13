import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

/**
 * Header Component - Enhanced Navigation Header
 *
 * Following TriggerKings architecture:
 * - CVA variants for type-safe styling
 * - Enhanced SCSS with prominent visual effects
 * - Full accessibility support
 * - AsChild pattern for flexibility
 */

const headerVariants = cva('header', {
  variants: {
    variant: {
      default: 'header--default',
      elevated: 'header--elevated',
      glass: 'header--glass',
      branded: 'header--branded',
    },
    size: {
      sm: 'header--sm',
      md: 'header--md',
      lg: 'header--lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

export interface HeaderProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof headerVariants> {
  /**
   * Render as a child element instead of header
   */
  asChild?: boolean;
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'header';
    return (
      <Comp className={cn(headerVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);

Header.displayName = 'Header';

export { Header, headerVariants };
