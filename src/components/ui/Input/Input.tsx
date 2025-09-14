import * as React from 'react';

import { cn } from '@/lib/utils';
import './Input.scss';

export interface InputProps extends React.ComponentProps<'input'> {
  label?: string;
  error?: string;
  helperText?: string;
  loading?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helperText, loading = false, disabled, ...props }, ref) => {
    const isDisabled = disabled || loading;

    const inputElement = (
      <input
        type={type}
        className={cn(
          'input',
          {
            'input--error': error,
            'input--loading': loading,
          },
          className
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      />
    );

    // If no label, error, or helper text, return just the input
    if (!label && !error && !helperText) {
      return inputElement;
    }

    // Return wrapped input with additional elements
    return (
      <div className="input-wrapper">
        {label && <label className="input-label">{label}</label>}
        {inputElement}
        {error && <p className="input-error">{error}</p>}
        {helperText && !error && <p className="input-helper">{helperText}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
