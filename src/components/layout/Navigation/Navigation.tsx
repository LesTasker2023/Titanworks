'use client';

import { Container } from '@/components/layout/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/NavigationMenu';
import { ThemePickerSheet, ThemeToggle } from '@/components/ui/ThemeToggle';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface NavigationItem {
  label: string;
  href?: string;
  items?: Array<{
    title: string;
    href: string;
    description: string;
  }>;
}

interface NavigationProps {
  className?: string;
  brand?: {
    name: string;
    logo?: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
  };
  navigation?: NavigationItem[];
  version?: string;
  lastUpdated?: string;
}

export function Navigation({
  className,
  brand = {
    name: 'Daedalus',
    logo: {
      src: '/daedalus.png',
      alt: 'Daedalus Logo',
      width: 40,
      height: 40,
    },
  },
  navigation = [
    {
      label: 'Components',
      href: '/component-showcase',
    },
    {
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      label: 'Command Center',
      href: '/command-center',
    },
  ],
  version = '1.36.0',
  lastUpdated = 'August 2025',
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        className
      )}
    >
      <Container size="xl" padding="md">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 font-bold text-xl hover:text-interactive transition-colors"
          >
            {brand.logo && (
              <Image
                src={brand.logo.src}
                alt={brand.logo.alt}
                width={brand.logo.width}
                height={brand.logo.height}
                className="h-10 w-10"
                priority
              />
            )}
            {brand.name}
          </Link>

          {/* Version Info - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-3">
            <Badge variant="outline">v{version}</Badge>
            <Badge variant="outline">Updated: {lastUpdated}</Badge>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList>
                {navigation.map(item => (
                  <NavigationMenuItem key={item.label}>
                    {item.href ? (
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:[background-color:hsl(var(--surface-interactive)/0.1)!important] focus:[background-color:hsl(var(--surface-interactive)/0.1)!important] focus:outline-none disabled:pointer-events-none disabled:opacity-50 hover:[color:hsl(var(--surface-interactive))!important]"
                        >
                          {item.label}
                        </Link>
                      </NavigationMenuLink>
                    ) : (
                      <>
                        <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="grid gap-3 p-6 w-[500px] grid-cols-1">
                            {item.items?.map(subItem => (
                              <NavigationMenuLink key={subItem.href} asChild>
                                <Link
                                  href={subItem.href}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:[background-color:hsl(var(--surface-interactive)/0.1)!important] focus:[background-color:hsl(var(--surface-interactive)/0.1)!important] hover:[color:hsl(var(--surface-interactive))!important] focus:[color:hsl(var(--surface-interactive))!important]"
                                >
                                  <div className="text-sm font-medium leading-none">
                                    {subItem.title}
                                  </div>
                                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                    {subItem.description}
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </NavigationMenuContent>
                      </>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Theme Controls */}
            <div className="flex items-center gap-2">
              <ThemePickerSheet />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t pt-4 pb-4 space-y-4">
            {/* Version Info for mobile */}
            <div className="flex items-center gap-2 pb-2 border-b">
              <Badge variant="outline" className="text-xs">
                v{version}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {lastUpdated}
              </Badge>
            </div>

            {navigation.map(item => (
              <div key={item.label} className="space-y-2">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="block py-2 text-sm font-medium transition-colors hover:[color:hsl(var(--surface-interactive))!important]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <div className="py-2 text-sm font-medium text-muted-foreground">
                      {item.label}
                    </div>
                    <div className="pl-4 space-y-2">
                      {item.items?.map(subItem => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block py-1 text-sm transition-colors hover:[color:hsl(var(--surface-interactive))!important]"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}

            {/* Mobile Theme Controls */}
            <div className="flex items-center gap-4 pt-4 border-t">
              <ThemePickerSheet />
              <ThemeToggle />
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}
