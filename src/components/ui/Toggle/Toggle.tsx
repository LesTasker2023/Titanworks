'use client';

import { cn } from '@/lib/utils';
import { stripTransientProps } from '@/utils/stripTransientProps';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import * as React from 'react';

// Helper function for toggle classes
const getToggleClasses = (variant?: 'default' | 'outline', size?: 'default' | 'sm' | 'lg') => {
  const baseClass = 'toggle';
  const variantClass = variant && variant !== 'default' ? `toggle--${variant}` : 'toggle--default';
  const sizeClass = size && size !== 'default' ? `toggle--size-${size}` : 'toggle--size-default';

  return `${baseClass} ${variantClass} ${sizeClass}`;
};

export interface ToggleProps extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> {
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
}

const Toggle = React.forwardRef<React.ElementRef<typeof TogglePrimitive.Root>, ToggleProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => (
    <TogglePrimitive.Root
      ref={ref}
      className={cn(getToggleClasses(variant, size), className)}
      {...stripTransientProps(props)}
    />
  )
);

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle };
