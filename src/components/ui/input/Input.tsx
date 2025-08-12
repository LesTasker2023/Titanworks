import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import './Input.scss';

const inputVariants = cva('tk-input', {
  variants: {
    variant: {
      default: 'tk-input--default',
      outline: 'tk-input--outline',
      filled: 'tk-input--filled',
      ghost: 'tk-input--ghost',
    },
    size: {
      sm: 'tk-input--sm',
      default: 'tk-input--default-size',
      lg: 'tk-input--lg',
    },
    state: {
      default: '',
      error: 'tk-input--error',
      success: 'tk-input--success',
      warning: 'tk-input--warning',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    state: 'default',
  },
});

export interface InputProps
  extends Omit<React.ComponentProps<'input'>, 'size'>,
    VariantProps<typeof inputVariants> {
  asChild?: boolean;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      state,
      asChild = false,
      label,
      helperText,
      errorMessage,
      successMessage,
      leftIcon,
      rightIcon,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'input';

    // Determine current state based on props
    const currentState = errorMessage ? 'error' : successMessage ? 'success' : state;
    const statusMessage = errorMessage || successMessage || helperText;

    const inputElement = (
      <div className="tk-input-wrapper">
        {leftIcon && <div className="tk-input__left-icon">{leftIcon}</div>}
        <Comp
          type={type}
          className={cn(inputVariants({ variant, size, state: currentState }), className)}
          ref={ref}
          {...props}
        />
        {rightIcon && <div className="tk-input__right-icon">{rightIcon}</div>}
      </div>
    );

    if (label || statusMessage) {
      return (
        <div className="tk-input-container">
          {label && (
            <label className="tk-input__label" htmlFor={props.id}>
              {label}
            </label>
          )}
          {inputElement}
          {statusMessage && (
            <div
              className={cn('tk-input__message', {
                'tk-input__message--error': errorMessage,
                'tk-input__message--success': successMessage,
              })}
            >
              {statusMessage}
            </div>
          )}
        </div>
      );
    }

    return inputElement;
  }
);

Input.displayName = 'Input';

export { Input, inputVariants };
