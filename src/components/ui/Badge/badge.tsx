import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';
// import './Badge.scss'; // ✅ DISABLED FOR TESTING

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        success: 'border-transparent bg-green-500 text-white shadow hover:bg-green-600',
        warning: 'border-transparent bg-yellow-500 text-white shadow hover:bg-yellow-600',
        info: 'border-transparent bg-blue-500 text-white shadow hover:bg-blue-600',
        outline: 'text-foreground',
      },
      size: {
        default: 'px-2.5 py-0.5 text-xs',
        sm: 'px-2 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  removable?: boolean;
  onRemove?: () => void;
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    { className, variant, size, removable = false, onRemove, dot = false, children, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size }), dot && 'pl-1.5', className)}
        {...props}
      >
        {dot && (
          <span
            className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current opacity-75"
            aria-hidden="true"
          />
        )}
        {children}
        {removable && (
          <button
            type="button"
            className="ml-1.5 -mr-1 h-3.5 w-3.5 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            onClick={onRemove}
            aria-label="Remove badge"
          >
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
export { badgeVariants };
