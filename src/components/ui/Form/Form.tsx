import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import './Form.scss';

// Variant types
export type FormVariant = 'default' | 'card' | 'inline';
export type FormSize = 'default' | 'sm' | 'lg' | 'compact';

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  variant?: FormVariant;
  size?: FormSize;
}

const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const formClassName = cn('form', `form--variant-${variant}`, `form--size-${size}`, className);

    return <form className={formClassName} ref={ref} {...props} />;
  }
);

Form.displayName = 'Form';

export { Form };
