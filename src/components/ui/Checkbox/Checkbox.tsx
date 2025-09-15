'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string; // ✅ Accessible labeling
  error?: string; // ✅ Validation error display
  helperText?: string; // ✅ Contextual help text
  loading?: boolean; // ✅ Loading state management
  required?: boolean; // ✅ Required field indicator
  indeterminate?: boolean; // ✅ Indeterminate state (tri-state)
}

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      loading = false,
      required = false,
      disabled,
      indeterminate = false,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const checkboxElement = (
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
          'checkbox',
          {
            'checkbox--loading': loading,
            'checkbox--error': error,
            'checkbox--indeterminate': indeterminate,
          },
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="checkbox__indicator">
          {indeterminate ? (
            <div className="checkbox__indeterminate-indicator" />
          ) : (
            <Check className="checkbox__check-icon" />
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );

    // Smart return: wrapper only when enhanced features are needed
    if (!label && !error && !helperText) {
      return checkboxElement;
    }

    return (
      <div className="checkbox-wrapper">
        <div className="checkbox-wrapper__content">
          {checkboxElement}
          <div className="checkbox-wrapper__text">
            {label && (
              <label
                className={cn(
                  'checkbox-wrapper__label',
                  required && 'checkbox-wrapper__label--required'
                )}
              >
                {label}
              </label>
            )}
            {helperText && !error && <p className="checkbox-wrapper__helper-text">{helperText}</p>}
            {error && <p className="checkbox-wrapper__error-text">{error}</p>}
          </div>
        </div>
      </div>
    );
  }
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
