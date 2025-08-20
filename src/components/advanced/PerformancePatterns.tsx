/**
 * 🏆 ELITE: Performance-Optimized Component Islands
 *
 * Next.js 15 + shadcn/ui pattern for maximum performance:
 * - Server components by default
 * - Client components only when needed
 * - Optimistic updates
 * - Streaming with Suspense
 */

import { Button } from '@/components/ui/Button';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { unstable_cache } from 'next/cache';
import { Suspense } from 'react';

// Server component with cached data
async function DashboardStats() {
  const getStats = unstable_cache(
    async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        users: 1234,
        revenue: '$45,678',
        orders: 89,
        growth: 12.5,
      };
    },
    ['dashboard-stats'],
    { revalidate: 300 } // 5 minutes
  );

  const stats = await getStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Object.entries(stats).map(([key, value]) => (
        <Card key={key}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium capitalize">{key}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Skeleton for loading state
function DashboardStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="pb-2">
            <Skeleton className="h-4 w-16" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-20" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

import { useState } from 'react';

function InteractiveDashboard() {
  const [view, setView] = useState<'cards' | 'table'>('cards');

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Button variant={view === 'cards' ? 'default' : 'outline'} onClick={() => setView('cards')}>
          Card View
        </Button>
        <Button variant={view === 'table' ? 'default' : 'outline'} onClick={() => setView('table')}>
          Table View
        </Button>
      </div>

      {view === 'cards' && (
        <Suspense fallback={<DashboardStatsSkeleton />}>
          <DashboardStats />
        </Suspense>
      )}

      {view === 'table' && (
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-muted-foreground">Table view would go here...</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export { DashboardStats, DashboardStatsSkeleton, InteractiveDashboard };
