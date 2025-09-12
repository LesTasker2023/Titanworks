import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { stripTransientProps } from '@/utils/stripTransientProps';
// import './Alert.scss'; // ✅ DISABLED FOR TESTING

const alertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive:
          'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
        warning:
          'border-yellow-500/50 text-yellow-900 dark:border-yellow-500 dark:text-yellow-50 [&>svg]:text-yellow-900 dark:[&>svg]:text-yellow-50',
        success:
          'border-green-500/50 text-green-900 dark:border-green-500 dark:text-green-50 [&>svg]:text-green-900 dark:[&>svg]:text-green-50',
        info: 'border-blue-500/50 text-blue-900 dark:border-blue-500 dark:text-blue-50 [&>svg]:text-blue-900 dark:[&>svg]:text-blue-50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  dismissible?: boolean;
  onDismiss?: () => void;
  autoHide?: boolean;
  autoHideDelay?: number;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant,
      dismissible = false,
      onDismiss,
      autoHide = false,
      autoHideDelay = 5000,
      children,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(true);
    const timerRef = React.useRef<NodeJS.Timeout | null>(null);

    React.useEffect(() => {
      if (autoHide && autoHideDelay > 0) {
        timerRef.current = setTimeout(() => {
          setIsVisible(false);
          onDismiss?.();
        }, autoHideDelay);

        return () => {
          if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
          }
        };
      }
    }, [autoHide, autoHideDelay, onDismiss]);

    const handleDismiss = () => {
      // Clear the auto-hide timer if it exists
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      setIsVisible(false);
      onDismiss?.();
    };

    if (!isVisible) return null;

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          alertVariants({ variant }),
          'alert',
          {
            'alert--dismissible': dismissible,
            'alert--auto-hide': autoHide,
          },
          className
        )}
        style={
          autoHide
            ? ({ '--auto-hide-delay': `${autoHideDelay}ms` } as React.CSSProperties)
            : undefined
        }
        {...stripTransientProps(props)}
      >
        {children}
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="alert-dismiss absolute right-2 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label="Dismiss alert"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        )}
      </div>
    );
  }
);
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn('mb-1 font-medium leading-none tracking-tight', className)}
      {...stripTransientProps(props)}
    />
  )
);
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...stripTransientProps(props)}
  />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertDescription, AlertTitle, alertVariants };
