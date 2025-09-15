import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import './Button.scss';

import { cn } from '@/lib/utils';
import { stripTransientProps } from '@/utils/stripTransientProps';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      asChild = false,
      loading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const isDisabled = disabled || loading;

    const buttonClasses = cn(
      'button',
      `button--${variant}`,
      `button--${size === 'default' ? 'default-size' : size}`,
      {
        'button--loading': loading,
      },
      className
    );

    return (
      <Comp
        className={buttonClasses}
        ref={ref}
        disabled={isDisabled}
        {...stripTransientProps(props)}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
