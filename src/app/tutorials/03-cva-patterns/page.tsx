import { Badge } from '@/components/ui/Badge';
import Card, {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { BookOpen, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function CVAPatterns() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-2xl mx-auto px-4">
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <Badge size="lg" variant="default">
              03
            </Badge>
            <CardTitle className="text-xl flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" /> CVA Patterns &
              Variant Systems
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-4">
            <CardDescription>
              Master scalable component design with Class-Variance-Authority (CVA).
            </CardDescription>
            <ul className="list-disc pl-6 mt-4 space-y-1 text-base">
              <li>Class-Variance-Authority mastery</li>
              <li>Scalable component design</li>
              <li>Performance-optimized variants</li>
            </ul>
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Guides</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>How to use CVA for flexible styling</li>
                <li>Best practices for variant systems</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="justify-end pt-0">
            <Link
              href="/tutorials/04-typescript-patterns"
              className="inline-flex items-center text-primary font-medium hover:underline"
            >
              Next: TypeScript Patterns <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
