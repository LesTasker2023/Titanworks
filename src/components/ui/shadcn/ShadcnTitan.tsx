import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

/**
 * Shadcn Titan Component - Demonstrates TriggerKings enhancement of shadcn/ui
 *
 * This component showcases how we've enhanced standard shadcn/ui components with:
 * - Enhanced SCSS styling
 * - Better accessibility
 * - Consistent variant system
 * - TriggerKings branding
 */

const shadcnVariants = cva(
  // Base classes - enhanced shadcn foundation
  'shadcn-titan relative overflow-hidden rounded-lg border bg-background p-6 shadow-md transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'border-border bg-card text-card-foreground',
        enhanced: 'border-primary/20 bg-gradient-to-br from-card to-muted/30 text-card-foreground',
        titan: 'border-primary bg-primary/5 text-primary-foreground shadow-lg shadow-primary/25',
        showcase:
          'border-destructive/20 bg-gradient-to-r from-primary/10 via-card to-secondary/20 text-foreground',
      },
      size: {
        sm: 'p-4 text-sm',
        md: 'p-6 text-base',
        lg: 'p-8 text-lg',
      },
      emphasis: {
        subtle: 'shadow-sm',
        moderate: 'shadow-md hover:shadow-lg',
        strong: 'shadow-lg hover:shadow-xl',
        dramatic: 'shadow-xl hover:shadow-2xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      emphasis: 'moderate',
    },
  }
);

export interface ShadcnTitanProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof shadcnVariants> {
  /**
   * Title for the shadcn showcase section
   */
  title?: string;
  /**
   * Description of the enhancement
   */
  description?: string;
  /**
   * Show the TriggerKings enhancement badge
   */
  showTitanBadge?: boolean;
  /**
   * Original shadcn component name being showcased
   */
  originalComponent?: string;
}

const ShadcnTitan = React.forwardRef<HTMLDivElement, ShadcnTitanProps>(
  (
    {
      className,
      variant,
      size,
      emphasis,
      title,
      description,
      showTitanBadge = true,
      originalComponent,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(shadcnVariants({ variant, size, emphasis }), className)}
        ref={ref}
        {...props}
      >
        {/* TriggerKings Enhancement Badge */}
        {showTitanBadge && (
          <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
            Titan Enhanced
          </div>
        )}

        {/* Header Section */}
        {(title || originalComponent) && (
          <div className="mb-4 space-y-2">
            {title && <h3 className="text-lg font-semibold tracking-tight">{title}</h3>}
            {originalComponent && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="rounded bg-muted px-2 py-0.5 font-mono text-xs">
                  shadcn/ui/{originalComponent}
                </span>
                <span>→</span>
                <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs text-primary">
                  TriggerKings/{originalComponent} Titan
                </span>
              </div>
            )}
          </div>
        )}

        {/* Description */}
        {description && (
          <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{description}</p>
        )}

        {/* Content */}
        <div className="space-y-4">{children}</div>

        {/* Enhancement Indicators */}
        <div className="mt-6 flex flex-wrap gap-2 text-xs">
          <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
            Accessibility Enhanced
          </span>
          <span className="flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
            Theme Optimized
          </span>
          <span className="flex items-center gap-1 rounded-full bg-purple-100 px-2 py-1 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
            CVA Powered
          </span>
        </div>
      </div>
    );
  }
);

ShadcnTitan.displayName = 'ShadcnTitan';

export { ShadcnTitan, shadcnVariants };
