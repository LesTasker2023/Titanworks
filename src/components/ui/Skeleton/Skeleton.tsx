import { cn } from '@/lib/utils';
import * as React from 'react';

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('animate-pulse rounded-md bg-primary/10', className)} {...props} />
  );
});
Skeleton.displayName = 'Skeleton';

export { Skeleton };
export type { SkeletonProps };
