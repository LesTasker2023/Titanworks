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
      'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
      'select-trigger', // Base SCSS class
      {
        'select-trigger--error': error,
        'select-trigger--loading': loading,
      },
      className
    )}
    disabled={disabled || loading} // Auto-disable when loading
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      {loading ? (
        <div className="select-spinner" />
      ) : (
        <ChevronDown className="h-4 w-4 opacity-50" />
      )}
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
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
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
        className={cn(
          'relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]',
          'select-content',
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        {searchable && (
          <div className="select-search">
            <Search className="h-4 w-4 opacity-50" />
            <input
              type="text"
              placeholder="Search options..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="select-search-input"
              onKeyDown={e => {
                // Prevent select from closing when typing
                e.stopPropagation();
              }}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="select-search-clear"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
        <SelectPrimitive.Viewport
          className={cn(
            'p-1',
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
          )}
        >
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
  <SelectPrimitive.Label
    ref={ref}
    className={cn('px-2 py-1.5 text-sm font-semibold', className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      'select-item',
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
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
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
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
    <div className="select-wrapper">
      {label && (
        <label id={labelId} className="select-label">
          {label}
          {required && <span className="select-required">*</span>}
        </label>
      )}
      <SelectPrimitive.Root {...props}>{enhancedChildren}</SelectPrimitive.Root>
      <div className="select-footer">
        {error && (
          <span id={errorId} className="select-error">
            {error}
          </span>
        )}
        {!error && helperText && (
          <span id={helperId} className="select-helper">
            {helperText}
          </span>
        )}
      </div>
    </div>
  );
};

Select.displayName = 'Select';

export default Select;

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
