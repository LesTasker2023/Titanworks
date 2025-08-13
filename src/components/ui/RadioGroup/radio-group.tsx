'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';
import './RadioGroup.scss';

// Enhanced RadioGroup with additional props
export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  label?: string;
  error?: string;
  helperText?: string;
  loading?: boolean;
  required?: boolean;
}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(
  (
    { className, label, error, helperText, loading = false, required = false, disabled, ...props },
    ref
  ) => {
    // Smart conditional rendering - only wrap when enhanced features are needed
    const radioGroupElement = (
      <RadioGroupPrimitive.Root
        className={cn(
          'grid gap-2',
          loading && 'radiogroup--loading',
          error && 'radiogroup--error',
          className
        )}
        disabled={disabled || loading}
        {...props}
        ref={ref}
      />
    );

    // Return minimal DOM when no enhanced features
    if (!label && !error && !helperText) {
      return radioGroupElement;
    }

    // Enhanced wrapper with label, error, and helper text
    return (
      <div className="radiogroup-wrapper space-y-2">
        {label && (
          <label
            className={cn(
              'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              required && "after:content-['*'] after:ml-0.5 after:text-destructive",
              error && 'text-destructive'
            )}
          >
            {label}
          </label>
        )}
        {radioGroupElement}
        {(error || helperText) && (
          <p className={cn('text-sm', error ? 'text-destructive' : 'text-muted-foreground')}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-3.5 w-3.5 fill-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export default RadioGroup;
export { RadioGroupItem };
