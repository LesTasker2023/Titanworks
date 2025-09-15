import { X } from 'lucide-react';
import * as React from 'react';

import { stripTransientProps } from '@/utils/stripTransientProps';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive' | 'warning' | 'success' | 'info';
  dismissible?: boolean;
  onDismiss?: () => void;
  autoHide?: boolean;
  autoHideDelay?: number;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = 'default',
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

    const alertClassNames = [
      'alert',
      `alert--${variant}`,
      dismissible && 'alert--dismissible',
      autoHide && 'alert--auto-hide',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        role="alert"
        className={alertClassNames}
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
            className="alert__dismiss-button"
            aria-label="Dismiss alert"
          >
            <X className="alert__dismiss-icon" />
            <span className="alert__dismiss-text">Close</span>
          </button>
        )}
      </div>
    );
  }
);
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={`alert__title ${className || ''}`} {...stripTransientProps(props)} />
  )
);
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`alert__description ${className || ''}`}
    {...stripTransientProps(props)}
  />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertDescription, AlertTitle };
