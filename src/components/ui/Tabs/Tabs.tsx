'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { stripTransientProps } from '@/utils/stripTransientProps';

// Enhanced Tabs with size variants and features
const tabsVariants = cva('', {
  variants: {
    size: {
      sm: '',
      default: '',
      lg: '',
      xl: '',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

const tabsListVariants = cva(
  'inline-flex items-center justify-center rounded-lg bg-neutral p-1 text-muted-foreground border border-border',
  {
    variants: {
      size: {
        sm: 'h-8 text-xs',
        default: 'h-9 text-sm',
        lg: 'h-10 text-base',
        xl: 'h-12 text-lg',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

const tabsTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow',
  {
    variants: {
      size: {
        sm: 'px-2 py-1 text-xs',
        default: 'px-3 py-1 text-sm',
        lg: 'px-4 py-2 text-base',
        xl: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

interface TabsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>,
    VariantProps<typeof tabsVariants> {}

interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {
  badge?: string | number;
  loading?: boolean;
}

const Tabs = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Root>, TabsProps>(
  ({ className, size, ...props }, ref) => (
    <TabsPrimitive.Root
      ref={ref}
      className={cn(tabsVariants({ size }), className)}
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
  ({ className, size, ...props }, ref) => (
    <TabsPrimitive.List
      ref={ref}
      className={cn(tabsListVariants({ size }), className)}
      {...props}
    />
  )
);
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, size, badge, loading, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      tabsTriggerVariants({ size }),
      loading && 'tabs__trigger--loading',
      badge !== undefined && badge !== null && badge !== '' && 'tabs__trigger--badge',
      className
    )}
    data-badge={badge}
    {...stripTransientProps({ loading, badge, ...props })}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

// Create composite component with sub-components
const TabsComponent = Object.assign(Tabs, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});

export { TabsComponent as Tabs, TabsContent, TabsList, TabsTrigger };
