// TriggerKings Button Component - Production Ready (shadcn API + Pure SCSS)
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import './button.scss';

const buttonVariants = cva(
  'button', // Base class
  {
    variants: {
      variant: {
        default: 'button--default',
        destructive: 'button--destructive',
        outline: 'button--outline',
        secondary: 'button--secondary',
        ghost: 'button--ghost',
        link: 'button--link',
      },
      size: {
        default: 'button--default-size',
        sm: 'button--sm',
        lg: 'button--lg',
        icon: 'button--icon',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, type = 'button', ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        type={asChild ? undefined : type}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
