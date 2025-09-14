'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';

import { cn } from '@/lib/utils';
import './Progress.scss';

// Helper functions for BEM classes
const getProgressRootClassName = (size?: string, variant?: string) => {
  const baseClass = 'progress__root';
  let className = baseClass;

  if (size) {
    className += ` ${baseClass}--size-${size}`;
  } else {
    className += ` ${baseClass}--size-default`;
  }

  if (variant) {
    className += ` ${baseClass}--variant-${variant}`;
  } else {
    className += ` ${baseClass}--variant-default`;
  }

  return className;
};

const getProgressIndicatorClassName = (variant?: string) => {
  const baseClass = 'progress__indicator';
  let className = baseClass;

  if (variant) {
    className += ` ${baseClass}--variant-${variant}`;
  } else {
    className += ` ${baseClass}--variant-default`;
  }

  return className;
};

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  size?: 'sm' | 'default' | 'lg' | 'xl';
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ className, value, size, variant, ...props }, ref) => (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(getProgressRootClassName(size, variant), className)}
      value={value}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={getProgressIndicatorClassName(variant)}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
