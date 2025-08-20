'use client';

import { useTheme } from 'next-themes';
import * as React from 'react';

export interface ThemeToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  label?: string;
}

export const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ icon, label = 'Toggle theme', ...props }, ref) => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // Ensure component is mounted to prevent hydration mismatch
    React.useEffect(() => {
      setMounted(true);
    }, []);

    const toggleTheme = React.useCallback(() => {
      setTheme(theme === 'light' ? 'dark' : 'light');
    }, [theme, setTheme]);

    // Show a neutral icon until hydrated to prevent mismatch
    if (!mounted) {
      return (
        <button ref={ref} aria-label={label} title={label} {...props}>
          {icon || '🌓'}
        </button>
      );
    }

    return (
      <button ref={ref} aria-label={label} title={label} onClick={toggleTheme} {...props}>
        {icon ? icon : theme === 'light' ? '🌞' : '🌙'}
      </button>
    );
  }
);
ThemeToggle.displayName = 'ThemeToggle';
