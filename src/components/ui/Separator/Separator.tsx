'use client';

import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as React from 'react';

import { cn } from '@/lib/utils';

// Enhanced separator variants for enterprise usage
interface SeparatorProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>, 'orientation'> {
  decorative?: boolean;
  children?: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'muted' | 'accent' | 'primary' | 'destructive';
  size?: 'sm' | 'default' | 'lg';
  spacing?: 'none' | 'sm' | 'default' | 'lg' | 'xl';
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
      variant = 'default',
      size = 'default',
      spacing = 'default',
      children,
      ...props
    },
    ref
  ) => {
    const separatorClasses = cn(
      'separator',
      `separator--${orientation}`,
      variant !== 'default' && `separator--${variant}`,
      size !== 'default' && `separator--${size}`,
      spacing !== 'none' && `separator--spacing-${spacing}`,
      children && 'separator--with-text',
      className
    );

    if (children) {
      // Text separator variant
      return (
        <div className={separatorClasses} {...props}>
          <span className="separator__text">{children}</span>
        </div>
      );
    }

    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={separatorClasses}
        {...props}
      />
    );
  }
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
export type { SeparatorProps };
