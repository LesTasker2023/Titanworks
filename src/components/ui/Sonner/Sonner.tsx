'use client';

import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ className, ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className={cn('toaster', className)}
      toastOptions={{
        classNames: {
          toast: 'toast',
          description: 'toast__description',
          actionButton: 'toast__action-button',
          cancelButton: 'toast__cancel-button',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
