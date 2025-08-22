/**
 * 🚀 Advanced shadcn/ui + Next.js Patterns
 *
 * Demonstrates enterprise-grade component composition with:
 * - Type-safe prop drilling
 * - Compound component patterns
 * - Server component optimization
 * - Progressive enhancement
 */
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ComponentProps, useState } from 'react';
// Type-safe component variants using your existing components
type DashboardCardProps = ComponentProps<typeof Card> & {
  title: string;
  value: string | number;
  change?: {
    value: number;
    trend: 'up' | 'down' | 'neutral';
  };
  badge?: {
    text: string;
    variant?: ComponentProps<typeof Badge>['variant'];
  };
};
export function DashboardCard({
  title,
  value,
  change,
  badge,
  className,
  ...props
}: DashboardCardProps) {
  return (
    <Card className={className} {...props}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {badge && (
          <Badge variant={badge.variant || 'secondary'} size="sm">
            {badge.text}
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p
            className={`text-xs ${
              change.trend === 'up'
                ? 'text-green-600'
                : change.trend === 'down'
                  ? 'text-red-600'
                  : 'text-muted-foreground'
            }`}
          >
            {change.trend === 'up' ? '↗' : change.trend === 'down' ? '↘' : '→'}
            {Math.abs(change.value)}% from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
}
// Compound component pattern for advanced form layouts
export function FormSection({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
// Advanced button composition with loading states
type AsyncButtonProps = ComponentProps<typeof Button> & {
  action: () => Promise<void>;
  successMessage?: string;
  errorMessage?: string;
};
export function AsyncButton({
  action,
  successMessage = 'Success!',
  errorMessage = 'Something went wrong',
  children,
  ...props
}: AsyncButtonProps) {
  const [isPending, setIsPending] = useState(false);
  const handleClick = async () => {
    setIsPending(true);
    try {
      await action();
      // You'd use your toast hook here
      // Removed console statement:
    } catch (error) {
      // Removed console statement:
    } finally {
      setIsPending(false);
    }
  };
  return (
    <Button
      {...props}
      loading={isPending}
      disabled={isPending || props.disabled}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}
