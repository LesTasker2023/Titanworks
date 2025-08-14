'use client';
import React from 'react';

// Simple dark/light theme toggle using localStorage and document.body.classList
export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    }
    return 'light';
  });

  React.useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => (t === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      aria-label="Toggle dark/light theme"
      onClick={toggleTheme}
      style={{
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        padding: 8,
        borderRadius: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 18,
      }}
    >
      <span role="img" aria-label={theme === 'dark' ? 'Dark mode' : 'Light mode'}>
        {theme === 'dark' ? '🌙' : '☀️'}
      </span>
      <span style={{ fontWeight: 600 }}>{theme === 'dark' ? 'Dark' : 'Light'}</span>
    </button>
  );
};

export default ThemeToggle;
