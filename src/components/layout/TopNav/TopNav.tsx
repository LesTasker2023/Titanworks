import ThemeToggle from '@/components/layout/ThemeToggle';
import Badge from '@/components/ui/Badge';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/NavigationMenu/navigation-menu';
import Image from 'next/image';
import Link from 'next/link';

export default function TopNav() {
  const version = 'v1.0.0';
  const grade = 'A+';
  const lastUpdated = '2025-08-14';
  return (
    <nav
      style={{
        width: '100%',
        borderBottom: '1px solid var(--border-color, #eaeaea)',
        background: 'var(--nav-bg)',
        color: 'var(--nav-fg)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        padding: 0,
        transition: 'background 0.2s, color 0.2s',
      }}
    >
      <style>{`
        :root {
          --nav-bg: #fff;
          --nav-fg: #18181b;
        }
        body.dark {
          --nav-bg: #18181b;
          --nav-fg: #fafafa;
        }
        .tk-nav-inner, .tk-nav-row, .tk-nav-brand, .tk-nav-links, .tk-nav-badges {
          transition: background 0.2s, color 0.2s;
        }
        @media (max-width: 900px) {
          .tk-nav-inner {
            flex-direction: column;
            align-items: stretch;
            gap: 0 !important;
            padding: 0.5rem 0.5rem;
          }
          .tk-nav-row {
            flex-direction: column;
            align-items: stretch;
            gap: 0 !important;
          }
          .tk-nav-brand {
            margin-bottom: 0.5rem;
            font-size: 1.25rem !important;
          }
          .tk-nav-links {
            flex-wrap: wrap;
            gap: 8px !important;
            margin-bottom: 0.5rem;
          }
          .tk-nav-badges {
            flex-wrap: wrap;
            gap: 8px !important;
            margin-bottom: 0.5rem;
          }
        }
        @media (min-width: 901px) {
          .tk-nav-inner {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 1rem 2rem;
            gap: 0;
          }
          .tk-nav-row {
            flex-direction: row;
            align-items: center;
            gap: 24px;
          }
          .tk-nav-brand {
            font-size: 20px;
          }
          .tk-nav-links {
            gap: 12px;
          }
          .tk-nav-badges {
            gap: 16px;
          }
        }
      `}</style>
      <div
        className="tk-nav-inner"
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div className="tk-nav-row" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <Link
            href="/"
            className="tk-nav-brand flex items-center"
            style={{ fontWeight: 700, textDecoration: 'none', color: 'inherit' }}
          >
            <Image
              src="/daedalus.png"
              alt="Daedalus Logo"
              width={10}
              height={10}
              className="w-10 h-10"
              priority
            />
            Daedalus
          </Link>
          <div className="tk-nav-badges" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Badge variant="outline">Version: {version}</Badge>
            <Badge variant={grade === 'A+' ? 'default' : 'secondary'}>Grade: {grade}</Badge>
            <Badge variant="outline">Last Updated: {lastUpdated}</Badge>
          </div>
        </div>
        <div className="tk-nav-row" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[500px] grid-cols-2">
                    <NavigationMenuLink asChild>
                      <Link
                        href="/component-showcase"
                        className="block cursor-pointer rounded px-2 py-1 hover:bg-muted focus:bg-muted focus:outline-none"
                      >
                        <div className="text-sm font-medium">Showcase</div>
                        <div className="text-xs text-muted-foreground">All UI components</div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/dashboard"
                        className="block cursor-pointer rounded px-2 py-1 hover:bg-muted focus:bg-muted focus:outline-none"
                      >
                        <div className="text-sm font-medium">Quality Dashboard</div>
                        <div className="text-xs text-muted-foreground">Test coverage, metrics</div>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Tests</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-6 w-[400px]">
                    <NavigationMenuLink asChild href="/quality-report.json" target="_blank">
                      <div>
                        <div className="text-sm font-medium">Raw Quality Report</div>
                        <div className="text-xs text-muted-foreground">JSON, all results</div>
                      </div>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild href="/dashboard">
                      <div>
                        <div className="text-sm font-medium">Dashboard</div>
                        <div className="text-xs text-muted-foreground">Visual test results</div>
                      </div>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Tutorials</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[500px] grid-cols-2">
                    {/* Nested submenu for Tutorial 1 */}
                    <div className="relative group">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/tutorials/01-repository-setup"
                          className="block cursor-pointer rounded px-2 py-1 hover:bg-muted focus:bg-muted focus:outline-none group-hover:bg-muted"
                        >
                          <div className="text-sm font-medium flex items-center justify-between">
                            01. Repository Setup
                            <span className="ml-2 text-xs text-muted-foreground">▶</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Project structure, Yarn
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      {/* Nested layer: appears on hover */}
                      <div className="absolute left-full top-0 mt-0 ml-2 min-w-[220px] bg-popover border border-border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-auto transition-opacity z-50">
                        <div className="flex flex-col p-2">
                          <NavigationMenuLink asChild>
                            <Link
                              href="/tutorials/01-repository-setup/intro"
                              className="block px-3 py-2 rounded hover:bg-muted focus:bg-muted focus:outline-none text-sm"
                            >
                              Intro & Philosophy
                            </Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/tutorials/01-repository-setup/structure"
                              className="block px-3 py-2 rounded hover:bg-muted focus:bg-muted focus:outline-none text-sm"
                            >
                              Project Structure
                            </Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/tutorials/01-repository-setup/yarn"
                              className="block px-3 py-2 rounded hover:bg-muted focus:bg-muted focus:outline-none text-sm"
                            >
                              Yarn & Dependency Management
                            </Link>
                          </NavigationMenuLink>
                        </div>
                      </div>
                    </div>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/tutorials/02-development-workflow"
                        className="block cursor-pointer rounded px-2 py-1 hover:bg-muted focus:bg-muted focus:outline-none"
                      >
                        <div className="text-sm font-medium">02. Development Workflow</div>
                        <div className="text-xs text-muted-foreground">Quality, CI/CD, Git</div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/tutorials/03-cva-patterns"
                        className="block cursor-pointer rounded px-2 py-1 hover:bg-muted focus:bg-muted focus:outline-none"
                      >
                        <div className="text-sm font-medium">03. CVA Patterns</div>
                        <div className="text-xs text-muted-foreground">Variants, scalable UI</div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/tutorials/04-typescript-patterns"
                        className="block cursor-pointer rounded px-2 py-1 hover:bg-muted focus:bg-muted focus:outline-none"
                      >
                        <div className="text-sm font-medium">04. TypeScript Patterns</div>
                        <div className="text-xs text-muted-foreground">Generics, type safety</div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/tutorials/05-accessibility-patterns"
                        className="block cursor-pointer rounded px-2 py-1 hover:bg-muted focus:bg-muted focus:outline-none"
                      >
                        <div className="text-sm font-medium">05. Accessibility</div>
                        <div className="text-xs text-muted-foreground">WCAG, inclusive design</div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/tutorials/06-testing-strategy"
                        className="block cursor-pointer rounded px-2 py-1 hover:bg-muted focus:bg-muted focus:outline-none"
                      >
                        <div className="text-sm font-medium">06. Testing Strategy</div>
                        <div className="text-xs text-muted-foreground">Vitest, a11y, coverage</div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/tutorials/07-performance-optimization"
                        className="block cursor-pointer rounded px-2 py-1 hover:bg-muted focus:bg-muted focus:outline-none"
                      >
                        <div className="text-sm font-medium">07. Performance</div>
                        <div className="text-xs text-muted-foreground">Web Vitals, monitoring</div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/tutorials/08-storybook-documentation"
                        className="block cursor-pointer rounded px-2 py-1 hover:bg-muted focus:bg-muted focus:outline-none"
                      >
                        <div className="text-sm font-medium">08. Storybook Docs</div>
                        <div className="text-xs text-muted-foreground">Visual docs, Storybook</div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/tutorials"
                        className="block cursor-pointer rounded px-2 py-1 hover:bg-muted focus:bg-muted focus:outline-none"
                      >
                        <div className="text-sm font-medium">Tutorials Home</div>
                        <div className="text-xs text-muted-foreground">All learning paths</div>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild href="/dashboard">
                  <span className="text-base font-medium px-4 py-2">Dashboard</span>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
