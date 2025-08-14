'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';
// import './Progress.scss'; // ✅ DISABLED FOR TESTING

const progressVariants = cva('relative w-full overflow-hidden rounded-full bg-primary/20', {
  variants: {
    size: {
      sm: 'h-1',
      default: 'h-2',
      lg: 'h-3',
      xl: 'h-4',
    },
    variant: {
      default: 'bg-primary/20',
      success: 'bg-green-100 dark:bg-green-900/20',
      warning: 'bg-yellow-100 dark:bg-yellow-900/20',
      danger: 'bg-red-100 dark:bg-red-900/20',
    },
  },
  defaultVariants: {
    size: 'default',
    variant: 'default',
  },
});

const indicatorVariants = cva('h-full w-full flex-1 transition-all duration-300 ease-in-out', {
  variants: {
    variant: {
      default: 'bg-primary',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      danger: 'bg-red-500',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  showLabel?: boolean;
  labelPosition?: 'inside' | 'outside';
  animated?: boolean;
  striped?: boolean;
}

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  (
    {
      className,
      value,
      size,
      variant,
      showLabel = false,
      labelPosition = 'outside',
      animated = false,
      striped = false,
      ...props
    },
    ref
  ) => {
    const progressValue = value || 0;

    const progressElement = (
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          progressVariants({ size, variant }),
          animated && 'progress--animated',
          striped && 'progress--striped',
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            indicatorVariants({ variant }),
            animated && 'progress__indicator--animated'
          )}
          style={{ transform: `translateX(-${100 - progressValue}%)` }}
        >
          {showLabel && labelPosition === 'inside' && (
            <span className="progress__label progress__label--inside">
              {Math.round(progressValue)}%
            </span>
          )}
        </ProgressPrimitive.Indicator>
      </ProgressPrimitive.Root>
    );

    if (showLabel && labelPosition === 'outside') {
      return (
        <div className="progress-wrapper">
          {progressElement}
          <span className="progress__label progress__label--outside">
            {Math.round(progressValue)}%
          </span>
        </div>
      );
    }

    return progressElement;
  }
);

Progress.displayName = ProgressPrimitive.Root.displayName;

export default Progress;
