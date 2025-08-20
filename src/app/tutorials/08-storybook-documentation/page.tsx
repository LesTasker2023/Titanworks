import { Badge } from '@/components/ui/Badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { BookOpen, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function StorybookDocumentation() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-2xl mx-auto px-4">
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <Badge size="lg" variant="default">
              08
            </Badge>
            <CardTitle className="text-xl flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" /> Storybook
              Documentation & Visual Testing
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-4">
            <CardDescription>
              Document and visually test your components for maximum reliability.
            </CardDescription>
            <ul className="list-disc pl-6 mt-4 space-y-1 text-base">
              <li>Interactive component documentation</li>
              <li>Visual testing strategies</li>
              <li>Advanced Storybook patterns</li>
            </ul>
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Guides</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>How to write and organize stories</li>
                <li>Integrating visual regression testing</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="justify-end pt-0">
            <Link
              href="/tutorials"
              className="inline-flex items-center text-primary font-medium hover:underline"
            >
              Back to Tutorials Home <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
