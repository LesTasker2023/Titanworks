import * as React from 'react';

import { cn } from '@/lib/utils';
// import './Input.scss'; // ✅ DISABLED FOR TESTING

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
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'input', // Base SCSS class for enhancements
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
        {label && (
          <label className="input-label text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
        {inputElement}
        {error && <p className="input-error text-sm text-destructive mt-1">{error}</p>}
        {helperText && !error && (
          <p className="input-helper text-sm text-muted-foreground mt-1">{helperText}</p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export default Input;
