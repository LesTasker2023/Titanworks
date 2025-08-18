import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

const containerVariants = cva('mx-auto w-full', {
  variants: {
    size: {
      sm: 'max-w-screen-sm px-4',
      md: 'max-w-screen-md px-6',
      lg: 'max-w-screen-lg px-6',
      xl: 'max-w-screen-xl px-8',
      '2xl': 'max-w-screen-2xl px-8',
      '7xl': 'max-w-7xl px-4 sm:px-6 lg:px-8',
      full: 'max-w-full px-4',
      none: 'max-w-none px-0',
    },
    padding: {
      none: 'p-0',
      sm: 'py-4',
      md: 'py-6',
      lg: 'py-8',
      xl: 'py-12',
      '2xl': 'py-16',
    },
    center: {
      true: 'mx-auto',
      false: '',
    },
  },
  defaultVariants: {
    size: '7xl',
    padding: 'lg',
    center: true,
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: React.ElementType;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, center, as: Component = 'div', children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(containerVariants({ size, padding, center, className }))}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = 'Container';

export default Container;
