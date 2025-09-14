import * as React from 'react';

import { stripTransientProps } from '@/utils/stripTransientProps';
import './Badge.scss';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'success' | 'warning' | 'info' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  removable?: boolean;
  onRemove?: () => void;
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      removable = false,
      onRemove,
      dot = false,
      children,
      ...props
    },
    ref
  ) => {
    const badgeClassNames = [
      'badge',
      `badge--${variant}`,
      `badge--${size}`,
      dot && 'badge--dot',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={badgeClassNames} {...stripTransientProps(props)}>
        {dot && <span className="badge__dot" aria-hidden="true" />}
        {children}
        {removable && (
          <button
            type="button"
            className="badge__remove-button"
            onClick={onRemove}
            aria-label="Remove badge"
          >
            <svg
              className="badge__remove-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
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

export { Badge };
