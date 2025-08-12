// TriggerKings Badge Component - Production Ready (shadcn API + Pure SCSS)
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import './badge.scss';

const badgeVariants = cva(
  'badge', // Base class
  {
    variants: {
      variant: {
        default: 'badge--default',
        secondary: 'badge--secondary',
        destructive: 'badge--destructive',
        outline: 'badge--outline',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return <Comp className={cn(badgeVariants({ variant, className }))} ref={ref} {...props} />;
  }
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };
