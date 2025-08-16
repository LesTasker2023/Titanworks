import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ThemeToggle } from './ThemeToggle';

describe('ThemeToggle', () => {
  it('renders with default icon and label', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
    expect(button.textContent).toMatch(/🌞|🌙/);
  });

  it('toggles theme on click', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    const initial = button.textContent;
    fireEvent.click(button);
    expect(button.textContent).not.toBe(initial);
  });

  it('accepts custom icon and label', () => {
    render(<ThemeToggle icon={<span>icon</span>} label="Switch theme" />);
    const button = screen.getByRole('button', { name: /switch theme/i });
    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe('icon');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<ThemeToggle ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
