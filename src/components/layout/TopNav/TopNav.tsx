import ThemeToggle from '@/components/layout/ThemeToggle';
import { Badge } from '@/components/ui/Badge';
import { ColorPicker } from '@/components/ui/ColorPicker';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/NavigationMenu';
import { getBrandInfo, getNavigation, getProjectInfo } from '@/lib/siteConfig';
import Image from 'next/image';
import Link from 'next/link';

export default function TopNav() {
  const projectInfo = getProjectInfo();
  const brandInfo = getBrandInfo();
  const navigation = getNavigation();

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
              src={brandInfo.logo.path}
              alt={brandInfo.logo.alt}
              width={brandInfo.logo.width}
              height={brandInfo.logo.height}
              className="w-10 h-10"
              priority
            />
            {brandInfo.name}
          </Link>
          <div className="tk-nav-badges" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Badge variant="outline">Version: {projectInfo.version}</Badge>
            <Badge variant="outline">Last Updated: {projectInfo.lastUpdated}</Badge>
          </div>
        </div>
        <div className="tk-nav-row" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <NavigationMenu>
            <NavigationMenuList>
              {/* Direct Component Showcase Link */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/component-showcase"
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    Components
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Existing Dropdown Menus */}
              {navigation.mainMenu.map(menu => (
                <NavigationMenuItem key={menu.label}>
                  <NavigationMenuTrigger>{menu.label}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[500px] grid-cols-2">
                      {menu.items.map(item => (
                        <NavigationMenuLink key={item.href} asChild>
                          <Link
                            href={item.href}
                            className="block cursor-pointer rounded px-2 py-1 hover:bg-muted focus:bg-muted focus:outline-none"
                          >
                            <div className="text-sm font-medium">{item.title}</div>
                            <div className="text-xs text-muted-foreground">{item.description}</div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <ColorPicker defaultColor="#18181b" />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
