import { cn } from '@/lib/utils';
import * as React from 'react';
import './Skeleton.scss';

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn('skeleton', className)} {...props} />;
});
Skeleton.displayName = 'Skeleton';

export { Skeleton };
export type { SkeletonProps };
