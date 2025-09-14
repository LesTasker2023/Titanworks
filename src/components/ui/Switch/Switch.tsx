'use client';

import * as SwitchPrimitives from '@radix-ui/react-switch';
import * as React from 'react';
import './Switch.scss';

import { cn } from '@/lib/utils';

type SwitchProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>;

const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, SwitchProps>(
  ({ className, ...props }, ref) => (
    <SwitchPrimitives.Root className={cn('switch', className)} {...props} ref={ref}>
      <SwitchPrimitives.Thumb className="switch__thumb" />
    </SwitchPrimitives.Root>
  )
);
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
export type { SwitchProps };
