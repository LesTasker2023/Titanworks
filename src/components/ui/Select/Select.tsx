'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp, Search, X } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';
import './Select.scss';

// Re-export base primitives
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

// Enhanced Select root with additional props
export interface SelectProps extends React.ComponentProps<typeof SelectPrimitive.Root> {
  label?: string;
  error?: string;
  helperText?: string;
  loading?: boolean;
  required?: boolean;
  placeholder?: string;
  searchable?: boolean;
  clearable?: boolean;
}

// Enhanced Select Trigger with loading and error states
const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    error?: boolean;
    loading?: boolean;
  }
>(({ className, children, error, loading, disabled, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'select__trigger',
      {
        'select__trigger--error': error,
        'select__trigger--loading': loading,
      },
      className
    )}
    disabled={disabled || loading} // Auto-disable when loading
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      {loading ? <div className="select__spinner" /> : <ChevronDown className="select__icon" />}
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn('select__scroll-button select__scroll-button--up', className)}
    {...props}
  >
    <ChevronUp className="select__icon" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn('select__scroll-button select__scroll-button--down', className)}
    {...props}
  >
    <ChevronDown className="select__icon" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

// Enhanced Select Content with search functionality
const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
    searchable?: boolean;
  }
>(({ className, children, position = 'popper', searchable, ...props }, ref) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  // For now, we'll implement basic search without complex filtering
  // This can be enhanced in future iterations
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn('select__content', className)}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        {searchable && (
          <div className="select__search">
            <Search className="select__search__icon" />
            <input
              type="text"
              placeholder="Search options..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="select__search__input"
              onKeyDown={e => {
                // Prevent select from closing when typing
                e.stopPropagation();
              }}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="select__search__clear"
              >
                <X className="select__icon" />
              </button>
            )}
          </div>
        )}
        <SelectPrimitive.Viewport className={cn('select__viewport', className)}>
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label ref={ref} className={cn('select__dropdown-label', className)} {...props} />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item ref={ref} className={cn('select__item', className)} {...props}>
    <span className="select__item__indicator">
      <SelectPrimitive.ItemIndicator>
        <Check className="select__icon" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={cn('select__separator', className)} {...props} />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

// Enhanced Select Component with wrapper functionality
const Select: React.FC<SelectProps> = ({
  label,
  error,
  helperText,
  required = false,
  children,
  ...props
}) => {
  // Generate unique IDs for accessibility
  const labelId = React.useId();
  const errorId = React.useId();
  const helperId = React.useId();

  // If no label, error, or helper text, return basic Select
  if (!label && !error && !helperText) {
    return <SelectPrimitive.Root {...props}>{children}</SelectPrimitive.Root>;
  }

  // Clone and enhance the SelectTrigger with accessibility attributes
  const enhancedChildren = React.Children.map(children, child => {
    if (React.isValidElement(child) && child.type === SelectTrigger) {
      return React.cloneElement(
        child as React.ReactElement<React.ComponentProps<typeof SelectTrigger>>,
        {
          'aria-labelledby': label ? labelId : undefined,
          'aria-describedby': error ? errorId : helperText ? helperId : undefined,
          'aria-invalid': error ? 'true' : undefined,
          'aria-required': required ? 'true' : undefined,
        }
      );
    }
    return child;
  });

  return (
    <div className="select__container">
      {label && (
        <label
          id={labelId}
          className={cn('select__label', { 'select__label--required': required })}
        >
          {label}
        </label>
      )}
      <SelectPrimitive.Root {...props}>{enhancedChildren}</SelectPrimitive.Root>
      <div className="select__footer">
        {error && (
          <span id={errorId} className="select__error">
            {error}
          </span>
        )}
        {!error && helperText && (
          <span id={helperId} className="select__helper">
            {helperText}
          </span>
        )}
      </div>
    </div>
  );
};

Select.displayName = 'Select';

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
