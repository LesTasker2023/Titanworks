import { Badge } from '@/components/ui/Badge';
import Card, {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { ChevronRight, Rocket } from 'lucide-react';
import Link from 'next/link';
// import { Accordion } from "@/components/Accordion"; // TODO: Create Accordion component
// import { CodeBlock } from "@/components/CodeBlock"; // TODO: Create CodeBlock component

export default function RepositorySetup() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-2xl mx-auto px-4">
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <Badge size="lg" variant="default">
              01
            </Badge>
            <CardTitle className="text-xl flex items-center gap-2">
              <Rocket className="w-5 h-5 text-primary" /> Repository Setup & Architecture
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-4">
            <CardDescription>
              Learn how to set up your Daedalus project for success from day one.
            </CardDescription>
            <ul className="list-disc pl-6 mt-4 space-y-1 text-base">
              <li>Project structure best practices</li>
              <li>Development environment optimization</li>
              <li>
                Dependency management with <span className="font-mono">Yarn</span>
              </li>
            </ul>
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Quick Start</h2>
              {/* TODO: Replace with <CodeBlock> component */}
              <pre className="bg-muted rounded p-4 text-sm overflow-x-auto">
                <code>{`git clone https://github.com/LesTasker2023/Daedalus.git
yarn install
yarn dev`}</code>
              </pre>
            </div>
          </CardContent>
          <CardFooter className="justify-end pt-0">
            <Link
              href="/tutorials/02-development-workflow"
              className="inline-flex items-center text-primary font-medium hover:underline"
            >
              Next: Development Workflow <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
