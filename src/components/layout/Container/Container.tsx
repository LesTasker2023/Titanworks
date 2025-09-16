'use client';

import React from 'react';
import './Container.scss';

// Simple className utility to replace cn
function classNames(
  ...classes: (string | Record<string, boolean> | undefined | null | false)[]
): string {
  return classes
    .map(cls => {
      if (typeof cls === 'string') return cls;
      if (typeof cls === 'object' && cls !== null) {
        return Object.entries(cls)
          .filter(([_, value]) => value)
          .map(([key]) => key)
          .join(' ');
      }
      return '';
    })
    .filter(Boolean)
    .join(' ');
}

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '7xl' | 'full' | 'content';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  center?: boolean;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    { className, size = 'xl', padding = 'md', center = false, as: Component = 'div', ...props },
    ref
  ) => {
    const containerClasses = classNames(
      'container',
      `container--size-${size}`,
      `container--padding-${padding}`,
      {
        'container--center': center,
      },
      className
    );

    return <Component ref={ref} className={containerClasses} {...props} />;
  }
);

Container.displayName = 'Container';

export { Container };
