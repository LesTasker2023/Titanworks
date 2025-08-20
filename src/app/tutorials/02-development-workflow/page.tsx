import { Badge } from '@/components/ui/Badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { CheckCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function DevelopmentWorkflow() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-2xl mx-auto px-4">
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <Badge size="lg" variant="default">
              02
            </Badge>
            <CardTitle className="text-xl flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" /> Development
              Workflow Excellence
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-4">
            <CardDescription>
              Establish a quality-first workflow for Daedalus development.
            </CardDescription>
            <ul className="list-disc pl-6 mt-4 space-y-1 text-base">
              <li>Quality-first development processes</li>
              <li>Git workflows and automation</li>
              <li>CI/CD pipeline integration</li>
            </ul>
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Guides</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  How to use <span className="font-mono">yarn</span> for dependency management
                </li>
                <li>Recommended Git branching strategies</li>
                <li>Setting up CI with GitHub Actions</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="justify-end pt-0">
            <Link
              href="/tutorials/03-cva-patterns"
              className="inline-flex items-center text-primary font-medium hover:underline"
            >
              Next: CVA Patterns <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
