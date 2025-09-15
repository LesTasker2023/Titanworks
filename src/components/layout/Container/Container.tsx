'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import './Container.scss';

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
    const containerClasses = cn(
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
