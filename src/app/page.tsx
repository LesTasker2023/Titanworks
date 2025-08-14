'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-background to-muted">
      <section className="text-center max-w-2xl">
        <h1 className="text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Daedalus
        </h1>
        <p className="text-2xl text-muted-foreground mb-8">
          The foundation for digital creation. Build, scale, and launch with the most advanced UI
          platform for modern teams.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <span className="inline-block px-4 py-2 rounded-full bg-primary text-primary-foreground font-semibold text-lg shadow">
            Enterprise-Grade
          </span>
          <span className="inline-block px-4 py-2 rounded-full bg-accent text-accent-foreground font-semibold text-lg shadow">
            Accessible
          </span>
          <span className="inline-block px-4 py-2 rounded-full bg-secondary text-secondary-foreground font-semibold text-lg shadow">
            Lightning Fast
          </span>
        </div>
        <Link href="/home">
          <button className="px-8 py-4 rounded-full bg-primary text-primary-foreground text-xl font-bold shadow-lg hover:scale-105 transition-transform">
            Get Started
          </button>
        </Link>
      </section>
      <footer className="mt-20 text-muted-foreground text-sm opacity-80">
        &copy; {new Date().getFullYear()} Daedalus. All rights reserved.
      </footer>
    </main>
  );
}
