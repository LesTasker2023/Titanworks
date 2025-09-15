'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

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
    { className, label, error, helperText, loading, required, disabled, children, ...props },
    ref
  ) => {
    const groupId = React.useId();

    return (
      <div className="radioGroup__container">
        {label && (
          <label
            htmlFor={groupId}
            className={cn(
              'radioGroup__label',
              required && 'radioGroup__label--required',
              error && 'radioGroup__label--error',
              (disabled || loading) && 'radioGroup__label--disabled'
            )}
          >
            {label}
          </label>
        )}
        <RadioGroupPrimitive.Root
          id={groupId}
          className={cn('radioGroup__root', className)}
          disabled={disabled || loading}
          ref={ref}
          {...props}
        >
          {children}
        </RadioGroupPrimitive.Root>
        {helperText && !error && <p className="radioGroup__helper-text">{helperText}</p>}
        {error && <p className="radioGroup__error-text">{error}</p>}
        {loading && <p className="radioGroup__loading-text">Loading...</p>}
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
    <RadioGroupPrimitive.Item ref={ref} className={cn('radioGroup__item', className)} {...props}>
      <RadioGroupPrimitive.Indicator className="radioGroup__indicator">
        <Circle />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});

RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
