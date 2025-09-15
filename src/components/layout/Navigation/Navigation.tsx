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
import Link from 'next/link';
import { useState } from 'react';
import './Navigation.scss';

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
      label: 'Demo',
      items: [
        {
          href: '/component-showcase',
          title: 'Components',
          description: 'Showcase of all available UI components and patterns',
        },
        {
          href: '/youtube',
          title: 'YouTube Platform',
          description: 'Video content management and creator dashboard',
        },
        {
          href: '/product',
          title: 'E-Commerce',
          description: 'Product catalog and shopping experience',
        },
        {
          href: '/restaurant',
          title: 'Restaurant',
          description: 'Fine dining menu and reservation system',
        },
        {
          href: '/saas',
          title: 'SaaS Dashboard',
          description: 'Business analytics and management platform',
        },
        {
          href: '/wedding',
          title: 'Wedding Planner',
          description: 'Event planning and wedding coordination',
        },
        {
          href: '/analytics',
          title: 'Analytics',
          description: 'Data visualization and insights dashboard',
        },
        {
          href: '/intel',
          title: 'Intelligence',
          description: 'AI-powered business intelligence platform',
        },
        {
          href: '/tomtom-map',
          title: 'TomTom Maps',
          description: 'Interactive mapping with geocoding and custom markers',
        },
        {
          href: '/tomtom-route-optimizer',
          title: 'Route Optimizer',
          description: 'Optimize delivery routes with TomTom Route Matrix API',
        },
      ],
    },
  ],
  version = '1.36.0',
  lastUpdated = 'August 2025',
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className={cn('navigation', className)}>
      <Container size="xl" padding="md">
        <div className="navigation__container">
          {/* Brand */}
          <Link href="/" className="navigation__brand">
            {/* {brand.logo && (
              <Image
                src={brand.logo.src}
                alt={brand.logo.alt}
                width={brand.logo.width}
                height={brand.logo.height}
                className="h-10 w-10"
                priority
              />
            )} */}
            {brand.name}
          </Link>

          {/* Version Info - Hidden on mobile */}
          <div className="navigation__version-info">
            <Badge variant="outline">v{version}</Badge>
            <Badge variant="outline">Updated: {lastUpdated}</Badge>
          </div>

          {/* Desktop Navigation */}
          <div className="navigation__desktop-nav">
            <NavigationMenu>
              <NavigationMenuList>
                {navigation.map(item => (
                  <NavigationMenuItem key={item.label}>
                    {item.href ? (
                      <NavigationMenuLink asChild>
                        <Link href={item.href} className="navigation__nav-link">
                          {item.label}
                        </Link>
                      </NavigationMenuLink>
                    ) : (
                      <>
                        <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="navigation__dropdown-content">
                            {item.items?.map(subItem => (
                              <NavigationMenuLink key={subItem.href} asChild>
                                <Link href={subItem.href} className="navigation__dropdown-link">
                                  <div className="navigation__dropdown-title">{subItem.title}</div>
                                  <p className="navigation__dropdown-description">
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

            {/* Theme Controls & User Profile */}
            <div className="navigation__theme-controls">
              <ThemePickerSheet />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="navigation__mobile-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="navigation__mobile-menu">
            {/* Version Info for mobile */}
            <div className="navigation__mobile-menu-version">
              <Badge variant="outline" className="text-xs">
                v{version}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {lastUpdated}
              </Badge>
            </div>

            {navigation.map(item => (
              <div key={item.label} className="navigation__mobile-menu-section">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="navigation__mobile-menu-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <div className="navigation__mobile-menu-label">{item.label}</div>
                    <div className="navigation__mobile-menu-sublinks">
                      {item.items?.map(subItem => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="navigation__mobile-menu-sublink"
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
            <div className="navigation__mobile-menu-theme-controls">
              <ThemePickerSheet />
              <ThemeToggle />
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}
