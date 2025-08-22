import * as React from 'react';

import { cn } from '@/lib/utils';
// import './Textarea.scss'; // ✅ DISABLED FOR TESTING

export interface TextareaProps extends React.ComponentProps<'textarea'> {
  label?: string;
  error?: string;
  helperText?: string;
  loading?: boolean;
  maxLength?: number;
  showCount?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      loading = false,
      disabled,
      maxLength,
      showCount = false,
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const [currentLength, setCurrentLength] = React.useState(() => {
      // Initialize with proper value
      if (value && typeof value === 'string') {
        return value.length;
      }
      if (defaultValue && typeof defaultValue === 'string') {
        return defaultValue.length;
      }
      return 0;
    });

    // Track character count for controlled and uncontrolled components
    React.useEffect(() => {
      if (value && typeof value === 'string') {
        setCurrentLength(value.length);
      }
    }, [value]);

    const textareaElement = (
      <textarea
        className={cn(
          'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'textarea', // Base SCSS class for enhancements
          {
            'textarea--error': error,
            'textarea--loading': loading,
          },
          className
        )}
        ref={ref}
        disabled={isDisabled}
        maxLength={maxLength}
        value={value}
        defaultValue={defaultValue}
        onChange={e => {
          setCurrentLength(e.target.value.length);
          props.onChange?.(e);
        }}
        {...props}
      />
    );

    // If no label, error, helper text, or character count, return just the textarea
    if (!label && !error && !helperText && !showCount) {
      return textareaElement;
    }

    return (
      <div className="textarea-wrapper">
        {label && (
          <label className="textarea-label">
            {label}
            {props.required && <span className="textarea-required">*</span>}
          </label>
        )}
        {textareaElement}
        <div className="textarea-footer">
          {error && <span className="textarea-error">{error}</span>}
          {!error && helperText && <span className="textarea-helper">{helperText}</span>}
          {showCount && maxLength && (
            <span
              className={cn('textarea-count', {
                'textarea-count--warning': currentLength >= maxLength * 0.9,
                'textarea-count--error': currentLength >= maxLength,
              })}
            >
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
