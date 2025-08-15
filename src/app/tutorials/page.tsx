import Badge from '@/components/ui/Badge/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card/card';
import { BookOpen, CheckCircle, ChevronRight, Rocket } from 'lucide-react';
import Link from 'next/link';

const chapters = [
  {
    slug: '01-repository-setup',
    title: 'Repository Setup & Architecture',
    desc: 'Project structure, Yarn, and best practices for a rock-solid foundation.',
    badge: '01',
    icon: <Rocket className="w-5 h-5 text-primary" />,
  },
  {
    slug: '02-development-workflow',
    title: 'Development Workflow Excellence',
    desc: 'Quality-first dev, Git, and CI/CD for unstoppable velocity.',
    badge: '02',
    icon: <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />,
  },
  {
    slug: '03-cva-patterns',
    title: 'CVA Patterns & Variant Systems',
    desc: 'Master scalable UI with Class-Variance-Authority.',
    badge: '03',
    icon: <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
  },
  {
    slug: '04-typescript-patterns',
    title: 'TypeScript Patterns & Advanced Usage',
    desc: 'Unlock type-safe, scalable code with advanced TS.',
    badge: '04',
    icon: <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
  },
  {
    slug: '05-accessibility-patterns',
    title: 'Accessibility Patterns & Excellence',
    desc: 'Build for everyone. WCAG, a11y, and inclusive design.',
    badge: '05',
    icon: <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />,
  },
  {
    slug: '06-testing-strategy',
    title: 'Testing Strategy & Comprehensive Quality',
    desc: 'Vitest, coverage, and bulletproof reliability.',
    badge: '06',
    icon: <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />,
  },
  {
    slug: '07-performance-optimization',
    title: 'Performance Optimization & Monitoring',
    desc: 'Web Vitals, bundle size, and real-time monitoring.',
    badge: '07',
    icon: <Rocket className="w-5 h-5 text-primary" />,
  },
  {
    slug: '08-storybook-documentation',
    title: 'Storybook Documentation & Visual Testing',
    desc: 'Visual docs, Storybook, and regression testing.',
    badge: '08',
    icon: <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
  },
];

export default function TutorialsHome() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 flex items-center justify-center gap-2">
            <BookOpen className="w-8 h-8 text-primary" />
            Daedalus Tutorials
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Master every aspect of modern React and Daedalus development. Choose a chapter to begin:
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {chapters.map(ch => (
            <Link key={ch.slug} href={`/tutorials/${ch.slug}`} className="group">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center gap-3 pb-2">
                  <Badge size="lg" variant="default">
                    {ch.badge}
                  </Badge>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {ch.icon} {ch.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 pb-4">
                  <CardDescription>{ch.desc}</CardDescription>
                </CardContent>
                <CardFooter className="justify-end pt-0">
                  <span className="inline-flex items-center text-primary font-medium group-hover:underline">
                    Start <ChevronRight className="w-4 h-4 ml-1" />
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
        <section className="bg-muted rounded-xl p-6 text-center">
          <h2 className="text-2xl font-semibold mb-2">Features & Guides</h2>
          <ul className="text-left max-w-xl mx-auto space-y-2 text-base">
            <li>✨ All tutorials use Daedalus UI components for a consistent experience.</li>
            <li>💡 Interactive code examples (CodeBlock/Playground coming soon).</li>
            <li>🪄 Expandable sections (Accordion coming soon).</li>
            <li>🖼️ Rich media support (Image and Video coming soon).</li>
            <li>♿ Accessible navigation and content structure.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
