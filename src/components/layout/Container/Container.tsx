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
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-12',
      '2xl': 'p-16',
    },
    center: {
      true: 'mx-auto',
      false: '',
    },
    layout: {
      default: '',
      flex: 'flex flex-col',
      'flex-row': 'flex flex-row',
      'flex-center': 'flex flex-col items-center justify-center',
      'flex-between': 'flex flex-col items-center justify-between',
      'flex-around': 'flex flex-col items-center justify-around',
      grid: 'grid place-items-center',
    },
    spacing: {
      none: '',
      sm: '[&>*+*]:mt-2',
      md: '[&>*+*]:mt-4',
      lg: '[&>*+*]:mt-6',
      xl: '[&>*+*]:mt-8',
      '2xl': '[&>*+*]:mt-12',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
  },
  defaultVariants: {
    size: '7xl',
    padding: 'lg',
    center: true,
    layout: 'default',
    spacing: 'none',
    align: 'center',
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: React.ElementType;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      className,
      size,
      padding,
      center,
      layout,
      spacing,
      align,
      as: Component = 'div',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          containerVariants({ size, padding, center, layout, spacing, align, className })
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = 'Container';

export default Container;
