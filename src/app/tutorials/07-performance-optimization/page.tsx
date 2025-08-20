import { Badge } from '@/components/ui/Badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { ChevronRight, Rocket } from 'lucide-react';
import Link from 'next/link';

export default function PerformanceOptimization() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-2xl mx-auto px-4">
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <Badge size="lg" variant="default">
              07
            </Badge>
            <CardTitle className="text-xl flex items-center gap-2">
              <Rocket className="w-5 h-5 text-primary" /> Performance Optimization & Monitoring
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-4">
            <CardDescription>
              Optimize your Daedalus apps for speed, scale, and reliability.
            </CardDescription>
            <ul className="list-disc pl-6 mt-4 space-y-1 text-base">
              <li>Bundle optimization techniques</li>
              <li>Core Web Vitals mastery</li>
              <li>Real-time performance monitoring</li>
            </ul>
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Guides</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>How to analyze and reduce bundle size</li>
                <li>Monitoring performance in production</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="justify-end pt-0">
            <Link
              href="/tutorials/08-storybook-documentation"
              className="inline-flex items-center text-primary font-medium hover:underline"
            >
              Next: Storybook Docs <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
