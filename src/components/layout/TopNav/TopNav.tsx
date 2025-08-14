'use client';

import ThemeToggle from '@/components/layout/ThemeToggle';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';
import { useState } from 'react';

export default function TopNav() {
  // These would ideally come from a global context or API, but for now, hardcode or use placeholders
  const version = 'v1.0.0';
  const grade = 'A+';
  const lastUpdated = '2025-08-14';
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const handleMenu = (menu: string) => setOpenMenu(openMenu === menu ? null : menu);
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
        {/* Left: Logo and Data Badges */}
        <div className="tk-nav-row" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <Link
            href="/"
            className="tk-nav-brand"
            style={{ fontWeight: 700, textDecoration: 'none', color: 'inherit' }}
          >
            Daedalus
          </Link>
          <div className="tk-nav-badges" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Badge variant="outline">Version: {version}</Badge>
            <Badge variant={grade === 'A+' ? 'default' : 'secondary'}>Grade: {grade}</Badge>
            <Badge variant="outline">Last Updated: {lastUpdated}</Badge>
          </div>
        </div>
        {/* Right: Nav Links and Menus */}
        <div
          className="tk-nav-row"
          style={{ display: 'flex', alignItems: 'center', gap: 24, position: 'relative' }}
        >
          <div style={{ position: 'relative' }}>
            <button
              style={{
                background: 'none',
                border: 'none',
                color: 'inherit',
                fontWeight: 500,
                cursor: 'pointer',
                padding: 8,
                fontSize: 16,
              }}
              onClick={() => handleMenu('components')}
            >
              Components ▾
            </button>
            {openMenu === 'components' && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '100%',
                  background: 'var(--nav-bg)',
                  color: 'var(--nav-fg)',
                  border: '1px solid var(--border-color, #eaeaea)',
                  borderRadius: 8,
                  minWidth: 220,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                  zIndex: 1001,
                  padding: 16,
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: 8 }}>Component Library</div>
                <div style={{ fontSize: 14, marginBottom: 8 }}>
                  15+ UI components, CVA, Radix, enterprise patterns.
                </div>
                <Link
                  href="/component-showcase"
                  style={{
                    display: 'block',
                    color: 'inherit',
                    textDecoration: 'none',
                    marginBottom: 6,
                  }}
                >
                  Showcase
                </Link>
                <Link
                  href="/dashboard"
                  style={{
                    display: 'block',
                    color: 'inherit',
                    textDecoration: 'none',
                    marginBottom: 6,
                  }}
                >
                  Quality Dashboard
                </Link>
                <Link
                  href="/home"
                  style={{ display: 'block', color: 'inherit', textDecoration: 'none' }}
                >
                  Home
                </Link>
              </div>
            )}
          </div>
          <div style={{ position: 'relative' }}>
            <button
              style={{
                background: 'none',
                border: 'none',
                color: 'inherit',
                fontWeight: 500,
                cursor: 'pointer',
                padding: 8,
                fontSize: 16,
              }}
              onClick={() => handleMenu('tests')}
            >
              Tests ▾
            </button>
            {openMenu === 'tests' && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '100%',
                  background: 'var(--nav-bg)',
                  color: 'var(--nav-fg)',
                  border: '1px solid var(--border-color, #eaeaea)',
                  borderRadius: 8,
                  minWidth: 220,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                  zIndex: 1001,
                  padding: 16,
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: 8 }}>Test Suite</div>
                <div style={{ fontSize: 14, marginBottom: 8 }}>
                  539 tests, 100% pass rate, snapshot & logic separation.
                </div>
                <div style={{ fontSize: 13, color: 'var(--footer-fg, #888)', marginBottom: 8 }}>
                  Vitest, PowerShell audit, enterprise coverage.
                </div>
                <a
                  href="/quality-report.json"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    color: 'inherit',
                    textDecoration: 'none',
                    marginBottom: 6,
                  }}
                >
                  Raw Quality Report
                </a>
                <Link
                  href="/dashboard"
                  style={{ display: 'block', color: 'inherit', textDecoration: 'none' }}
                >
                  Dashboard
                </Link>
              </div>
            )}
          </div>
          <Link
            href="/dashboard"
            style={{ textDecoration: 'none', color: 'inherit', fontWeight: 500 }}
          >
            Dashboard
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
