'use client';

import { Container } from '@/components/layout/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { Github, Heart, Star, Twitter } from 'lucide-react';
import Link from 'next/link';
import './Footer.scss';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface FooterProps {
  className?: string;
  brand?: string;
  description?: string;
  sections?: FooterSection[];
  socialLinks?: SocialLink[];
  legalLinks?: FooterLink[];
  showStats?: boolean;
  stats?: {
    components: number;
    tests: string;
    stories: string;
  };
}

export default function Footer({
  className,
  brand = 'Daedalus',
  description = 'A comprehensive React component library built with Next.js, TypeScript, and Tailwind CSS.',
  sections = [
    {
      title: 'Documentation',
      links: [
        { label: 'Getting Started', href: '/docs/getting-started' },
        { label: 'Components', href: '/component-showcase' },
        { label: 'API Reference', href: '/docs/api' },
        { label: 'Examples', href: '/docs/examples' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Changelog', href: '/changelog' },
        { label: 'Contributing', href: '/contributing' },
        { label: 'License', href: '/license' },
        { label: 'Support', href: '/support' },
      ],
    },
    {
      title: 'Community',
      links: [
        { label: 'GitHub', href: 'https://github.com/LesTasker2023/Daedalus' },
        { label: 'Discord', href: '/discord' },
        { label: 'Twitter', href: '/twitter' },
        { label: 'Blog', href: '/blog' },
      ],
    },
  ],
  socialLinks = [
    { name: 'GitHub', href: 'https://github.com/LesTasker2023/Daedalus', icon: Github },
    { name: 'Twitter', href: '/twitter', icon: Twitter },
  ],
  legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
  showStats = true,
  stats = {
    components: 49,
    tests: '87.8%',
    stories: '85.7%',
  },
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn('footer', className)}>
      <Container size="xl" padding="md">
        {/* Main Footer Content */}
        <div className="footer__content">
          <div className="footer__grid">
            {/* Brand Section */}
            <div className="footer__brand">
              <div className="footer__brand-info">
                <h3 className="footer__brand-title">{brand}</h3>
                <p className="footer__brand-description">{description}</p>
              </div>

              {/* Stats */}
              {showStats && stats && (
                <div className="footer__stats">
                  <h4 className="footer__stats-title">Project Stats</h4>
                  <div className="footer__stats-badges">
                    <Badge variant="secondary">{stats.components} Components</Badge>
                    <Badge variant="secondary">{stats.tests} Test Coverage</Badge>
                    <Badge variant="secondary">{stats.stories} Storybook Coverage</Badge>
                  </div>
                </div>
              )}

              {/* Social Links */}
              <div className="footer__social">
                <h4 className="footer__social-title">Connect</h4>
                <div className="footer__social-links">
                  {socialLinks.map(social => (
                    <Button
                      key={social.name}
                      variant="ghost"
                      size="sm"
                      asChild
                      className="h-8 w-8 p-0"
                    >
                      <Link href={social.href} target="_blank" rel="noopener noreferrer">
                        <social.icon className="h-4 w-4" />
                        <span className="sr-only">{social.name}</span>
                      </Link>
                    </Button>
                  ))}
                  <Button variant="ghost" size="sm" asChild className="h-8 px-3 text-xs">
                    <Link
                      href="https://github.com/LesTasker2023/Daedalus"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Star className="h-3 w-3 mr-1" />
                      Star
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Footer Sections */}
            {sections.map(section => (
              <div key={section.title} className="footer__section">
                <h4 className="footer__section-title">{section.title}</h4>
                <ul className="footer__section-list">
                  {section.links.map(link => (
                    <li key={link.href}>
                      <Link href={link.href} className="footer__section-link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <div className="footer__bottom-content">
            {/* Copyright */}
            <div className="footer__copyright">
              <span>
                © {currentYear} {brand}. All rights reserved.
              </span>
              <div className="footer__made-with">
                <span>Made with</span>
                <Heart className="footer__heart-icon" />
                <span>using React & TypeScript</span>
              </div>
            </div>

            {/* Legal Links */}
            <div className="footer__legal-links">
              {legalLinks.map(link => (
                <Link key={link.href} href={link.href} className="footer__legal-link">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
