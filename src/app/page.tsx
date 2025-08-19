'use client';

import Badge from '@/components/ui/Badge';
import Card, {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { BookOpen, LayoutDashboard, Rocket, Star, Users } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-background to-muted overflow-hidden mt-10 md:mt-16">
      <span className="inline-block mb-4 px-4 py-2 rounded-full bg-accent text-accent-foreground font-semibold text-base tracking-wide shadow-lg border border-border/40 backdrop-blur-sm animate-fade-in">
        The Next Evolution in UI Platforms
      </span>
      <h1 className="text-7xl md:text-8xl font-extrabold tracking-tight mb-10 text-foreground drop-shadow-xl px-2 sm:px-0">
        Build Without Limits
      </h1>

      {/* VALUE PROPS */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 w-full ">
        <Card className="bg-gradient-to-br ">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <Rocket className="w-6 h-6 text-primary" />
            <CardTitle className="text-lg">Launch Fast</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-4">
            <CardDescription>
              Go from idea to production in hours, not weeks. Daedalus is engineered for speed and
              iteration.
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-accent/10 to-background border-accent/30">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <BookOpen className="w-6 h-6 text-accent" />
            <CardTitle className="text-lg">Learn & Grow</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-4">
            <CardDescription>
              Tutorials, docs, and a component showcase—everything you need to master modern UI.
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-secondary/10 to-background border-secondary/30">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <LayoutDashboard className="w-6 h-6 text-secondary" />
            <CardTitle className="text-lg">Enterprise-Grade</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-4">
            <CardDescription>
              Built for scale, accessibility, and reliability. Daedalus is trusted by teams who
              demand the best.
            </CardDescription>
          </CardContent>
        </Card>
      </section>

      {/* QUICK LINKS */}
      <section className="max-w-4xl mx-auto w-full mb-20 animate-fade-in">
        <h2 className="text-2xl font-bold mb-6 text-center">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link href="/tutorials" className="group">
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <BookOpen className="w-5 h-5 text-accent" />
                <CardTitle className="text-base">Tutorials</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 pb-4">
                <CardDescription>Step-by-step guides to master Daedalus.</CardDescription>
              </CardContent>
              <CardFooter className="justify-end pt-0">
                <Badge variant="default">Start Learning</Badge>
              </CardFooter>
            </Card>
          </Link>
          <Link href="/component-showcase" className="group">
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <LayoutDashboard className="w-5 h-5 text-secondary" />
                <CardTitle className="text-base">Component Showcase</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 pb-4">
                <CardDescription>Explore every UI component, variant, and pattern.</CardDescription>
              </CardContent>
              <CardFooter className="justify-end pt-0">
                <Badge variant="secondary">See All</Badge>
              </CardFooter>
            </Card>
          </Link>
          <Link href="/dashboard" className="group">
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <Users className="w-5 h-5 text-primary" />
                <CardTitle className="text-base">Quality Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 pb-4">
                <CardDescription>Metrics, coverage, and test results at a glance.</CardDescription>
              </CardContent>
              <CardFooter className="justify-end pt-0">
                <Badge variant="outline">View Metrics</Badge>
              </CardFooter>
            </Card>
          </Link>
        </div>
      </section>

      {/* TESTIMONIAL / ENDORSEMENT */}
      <section className="max-w-2xl mx-auto w-full mb-24 animate-fade-in">
        <Card className="bg-gradient-to-br from-primary/20 to-background border-primary/30 shadow-xl">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <Star className="w-6 h-6 text-yellow-400" />
            <CardTitle className="text-lg">Built for Visionaries</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-4">
            <CardDescription>
              &quot;Daedalus is the platform I wish existed 10 years ago. It lets you move at the
              speed of thought, with zero compromise on quality or creativity. If you want to build
              the future, start here.&quot;
            </CardDescription>
          </CardContent>
          <CardFooter className="justify-end pt-0">
            <span className="text-sm text-muted-foreground">— The Daedalus Team</span>
          </CardFooter>
        </Card>
      </section>

      {/* Footer */}
      <footer className="relative z-10 mt-24 text-muted-foreground text-sm opacity-80">
        &copy; {new Date().getFullYear()} Daedalus. All rights reserved.
      </footer>
    </main>
  );
}
