'use client';
import React from 'react';

// Simple dark/light theme toggle using localStorage and document.body.classList
export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = React.useState(false);

  // Only run after component mounts to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    setTheme(savedTheme);
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(savedTheme);
  }, []);

  React.useEffect(() => {
    if (mounted) {
      document.body.classList.remove('light', 'dark');
      document.body.classList.add(theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(t => (t === 'light' ? 'dark' : 'light'));
  };

  // Render a neutral state until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <button
        aria-label="Toggle dark/light theme"
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
        <span role="img" aria-label="Theme toggle">
          🌓
        </span>
        <span style={{ fontWeight: 600 }}>Theme</span>
      </button>
    );
  }

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
