'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { stripTransientProps } from '@/utils/stripTransientProps';

// BEM helper functions for size variants
function getTabsListClasses(size: 'sm' | 'default' | 'lg' | 'xl' = 'default'): string {
  return cn('tabs__list', `tabs__list--size-${size}`);
}

function getTabsTriggerClasses(size: 'sm' | 'default' | 'lg' | 'xl' = 'default'): string {
  return cn('tabs__trigger', `tabs__trigger--size-${size}`);
}

interface TabsProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  size?: 'sm' | 'default' | 'lg' | 'xl';
}

interface TabsListProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  size?: 'sm' | 'default' | 'lg' | 'xl';
}

interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  size?: 'sm' | 'default' | 'lg' | 'xl';
  badge?: string | number;
  loading?: boolean;
}

const Tabs = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Root>, TabsProps>(
  ({ className, size, ...props }, ref) => (
    <TabsPrimitive.Root
      ref={ref}
      className={cn('tabs', className)}
      {...stripTransientProps({
        active: undefined,
        hover: undefined,
        loading: undefined,
        error: undefined,
        ...props,
      })}
    />
  )
);
Tabs.displayName = TabsPrimitive.Root.displayName;

const TabsList = React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, TabsListProps>(
  ({ className, size = 'default', ...props }, ref) => (
    <TabsPrimitive.List ref={ref} className={cn(getTabsListClasses(size), className)} {...props} />
  )
);
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, size = 'default', badge, loading, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(getTabsTriggerClasses(size), loading && 'tabs__trigger--loading', className)}
    {...stripTransientProps({ loading, badge, ...props })}
  >
    {props.children}
    {badge !== undefined && badge !== null && badge !== '' && (
      <span className="tabs__trigger-badge">{badge}</span>
    )}
  </TabsPrimitive.Trigger>
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content ref={ref} className={cn('tabs__content', className)} {...props} />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

// Create composite component with sub-components
const TabsComponent = Object.assign(Tabs, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});

export { TabsComponent as Tabs, TabsContent, TabsList, TabsTrigger };
