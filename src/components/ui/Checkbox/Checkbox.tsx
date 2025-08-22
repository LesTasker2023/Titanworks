'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';
// import './Checkbox.scss'; // ✅ DISABLED FOR TESTING

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
          'peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
          'checkbox', // Base SCSS class for enhancements
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
        <CheckboxPrimitive.Indicator
          className={cn('flex items-center justify-center text-current')}
        >
          {indeterminate ? (
            <div className="h-2 w-2 bg-current rounded-sm" />
          ) : (
            <Check className="h-4 w-4" />
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
        <div className="flex items-start space-x-2">
          {checkboxElement}
          <div className="grid gap-1.5 leading-none">
            {label && (
              <label
                className={cn(
                  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                  {
                    'after:content-["*"] after:ml-0.5 after:text-destructive': required,
                  }
                )}
              >
                {label}
              </label>
            )}
            {helperText && !error && <p className="text-xs text-muted-foreground">{helperText}</p>}
            {error && <p className="text-xs text-destructive">{error}</p>}
          </div>
        </div>
      </div>
    );
  }
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
