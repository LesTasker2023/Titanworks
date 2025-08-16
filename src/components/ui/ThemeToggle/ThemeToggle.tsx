import * as React from 'react';

export interface ThemeToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  label?: string;
}

export const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ icon, label = 'Toggle theme', ...props }, ref) => {
    const [theme, setTheme] = React.useState<'light' | 'dark'>(
      typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    );

    React.useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

    return (
      <button ref={ref} aria-label={label} title={label} onClick={toggleTheme} {...props}>
        {icon ? icon : theme === 'light' ? '🌞' : '🌙'}
      </button>
    );
  }
);
ThemeToggle.displayName = 'ThemeToggle';
