import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

const formVariants = cva(
  // Base styles for form container
  'space-y-4 w-full',
  {
    variants: {
      variant: {
        default: 'bg-background',
        card: 'bg-card border border-border rounded-lg p-6',
        inline: 'flex flex-row space-y-0 space-x-4 items-end',
      },
      size: {
        default: 'space-y-4',
        sm: 'space-y-2',
        lg: 'space-y-6',
        compact: 'space-y-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface FormProps
  extends React.FormHTMLAttributes<HTMLFormElement>,
    VariantProps<typeof formVariants> {}

const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ className, variant, size, ...props }, ref) => {
    return <form className={cn(formVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);

Form.displayName = 'Form';

export { Form, formVariants };
