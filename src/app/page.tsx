'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-background to-muted overflow-hidden">
      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center max-w-3xl py-32">
        <span className="inline-block mb-4 px-4 py-2 rounded-full bg-accent text-accent-foreground font-semibold text-base tracking-wide shadow-lg border border-border/40 backdrop-blur-sm">
          The Next Evolution in UI Platforms
        </span>
        <h1 className="text-7xl md:text-8xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent drop-shadow-xl">
          Build Without Limits
        </h1>
        <p className="text-2xl md:text-3xl text-muted-foreground mb-10 font-medium max-w-2xl mx-auto">
          Daedalus empowers you to design, launch, and scale digital products at the speed of
          thought. <span className="text-primary font-bold">Enterprise-grade</span> foundations,{' '}
          <span className="text-accent font-bold">developer joy</span>, and{' '}
          <span className="text-secondary-foreground font-bold">limitless creativity</span>—all in
          one platform.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <span className="inline-block px-5 py-2 rounded-full bg-primary text-primary-foreground font-semibold text-lg shadow">
            Production Ready
          </span>
          <span className="inline-block px-5 py-2 rounded-full bg-accent text-accent-foreground font-semibold text-lg shadow">
            Accessible by Design
          </span>
          <span className="inline-block px-5 py-2 rounded-full bg-secondary text-secondary-foreground font-semibold text-lg shadow">
            Blazing Fast
          </span>
          <span className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold text-lg shadow">
            AI-Enabled
          </span>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/home">
            <button className="px-10 py-4 rounded-full bg-primary text-primary-foreground text-2xl font-bold shadow-xl hover:scale-105 transition-transform focus:outline-none focus:ring-4 focus:ring-accent/40">
              Get Started
            </button>
          </Link>
          <Link href="/component-showcase">
            <button className="px-10 py-4 rounded-full bg-accent text-accent-foreground text-2xl font-bold shadow-xl hover:scale-105 transition-transform border border-border focus:outline-none focus:ring-4 focus:ring-primary/30">
              See Components
            </button>
          </Link>
        </div>
      </section>

      {/* Hero Visual Flair */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <svg
          className="absolute left-1/2 top-0 -translate-x-1/2 blur-2xl opacity-30"
          width="1200"
          height="600"
          viewBox="0 0 1200 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="600" cy="200" rx="500" ry="120" fill="url(#paint0_radial)" />
          <defs>
            <radialGradient
              id="paint0_radial"
              cx="0"
              cy="0"
              r="1"
              gradientTransform="translate(600 200) scale(500 120)"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#60A5FA" />
              <stop offset="1" stopColor="#818CF8" stopOpacity="0.2" />
            </radialGradient>
          </defs>
        </svg>
        <svg
          className="absolute right-0 bottom-0 blur-3xl opacity-20"
          width="600"
          height="400"
          viewBox="0 0 600 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="300" cy="200" rx="250" ry="80" fill="url(#paint1_radial)" />
          <defs>
            <radialGradient
              id="paint1_radial"
              cx="0"
              cy="0"
              r="1"
              gradientTransform="translate(300 200) scale(250 80)"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#34D399" />
              <stop offset="1" stopColor="#60A5FA" stopOpacity="0.1" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-24 text-muted-foreground text-sm opacity-80">
        &copy; {new Date().getFullYear()} Daedalus. All rights reserved.
      </footer>
    </main>
  );
}
