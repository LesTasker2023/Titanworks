'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as React from 'react';

export interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  size?: 'sm' | 'default' | 'lg' | 'xl';
  src?: string;
  alt?: string;
  fallback?: string;
  loading?: boolean;
  status?: 'online' | 'offline';
  name?: string; // For generating initials
}

const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  (
    { className, size = 'default', src, alt, fallback, loading = false, status, name, ...props },
    ref
  ) => {
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

    const avatarClassNames = [
      'avatar',
      `avatar--${size}`,
      loading && 'avatar--loading',
      status === 'online' && 'avatar--online',
      status === 'offline' && 'avatar--offline',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <AvatarPrimitive.Root ref={ref} className={avatarClassNames} {...props}>
        {src && (
          <AvatarPrimitive.Image
            src={src}
            alt={alt || name || 'Avatar'}
            className="avatar__image"
          />
        )}
        <AvatarPrimitive.Fallback className="avatar__fallback">
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
  <AvatarPrimitive.Image ref={ref} className={`avatar__image ${className || ''}`} {...props} />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={`avatar__fallback ${className || ''}`}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarFallback, AvatarImage };
