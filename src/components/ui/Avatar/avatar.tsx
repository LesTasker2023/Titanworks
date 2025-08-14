'use client';

import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
// import './Avatar.scss'; // ✅ DISABLED FOR TESTING

const avatarVariants = cva('relative flex shrink-0 overflow-hidden rounded-full', {
  variants: {
    size: {
      sm: 'h-8 w-8',
      default: 'h-10 w-10',
      lg: 'h-12 w-12',
      xl: 'h-16 w-16',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
  loading?: boolean;
  status?: 'online' | 'offline';
  name?: string; // For generating initials
}

const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  ({ className, size, src, alt, fallback, loading = false, status, name, ...props }, ref) => {
    // Generate initials from name
    const getInitials = (fullName: string) => {
      return fullName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    };

    const displayFallback = fallback || (name ? getInitials(name) : 'U');

    return (
      <AvatarPrimitive.Root
        ref={ref}
        className={cn(
          avatarVariants({ size }),
          'avatar', // Base SCSS class for enhancements
          {
            'avatar--loading': loading,
            'avatar--online': status === 'online',
            'avatar--offline': status === 'offline',
          },
          className
        )}
        {...props}
      >
        {src && (
          <AvatarPrimitive.Image
            src={src}
            alt={alt || name || 'Avatar'}
            className="aspect-square h-full w-full avatar-image"
          />
        )}
        <AvatarPrimitive.Fallback className="flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground font-medium">
          {displayFallback}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
    );
  }
);
Avatar.displayName = 'Avatar';

// Legacy exports for compatibility
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full', className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted',
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export default Avatar;
export { AvatarImage, AvatarFallback, avatarVariants };
