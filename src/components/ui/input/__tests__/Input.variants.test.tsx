import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Input } from '../Input';

describe('Input Variants', () => {
  it('renders default variant', () => {
    render(<Input data-testid="input" variant="default" />);
    expect(screen.getByTestId('input')).toHaveClass('tk-input--default');
  });

  it('renders outline variant', () => {
    render(<Input data-testid="input" variant="outline" />);
    expect(screen.getByTestId('input')).toHaveClass('tk-input--outline');
  });

  it('renders filled variant', () => {
    render(<Input data-testid="input" variant="filled" />);
    expect(screen.getByTestId('input')).toHaveClass('tk-input--filled');
  });

  it('renders ghost variant', () => {
    render(<Input data-testid="input" variant="ghost" />);
    expect(screen.getByTestId('input')).toHaveClass('tk-input--ghost');
  });

  it('renders small size', () => {
    render(<Input data-testid="input" size="sm" />);
    expect(screen.getByTestId('input')).toHaveClass('tk-input--sm');
  });

  it('renders default size', () => {
    render(<Input data-testid="input" size="default" />);
    expect(screen.getByTestId('input')).toHaveClass('tk-input--default-size');
  });

  it('renders large size', () => {
    render(<Input data-testid="input" size="lg" />);
    expect(screen.getByTestId('input')).toHaveClass('tk-input--lg');
  });

  it('renders error state', () => {
    render(<Input data-testid="input" state="error" />);
    expect(screen.getByTestId('input')).toHaveClass('tk-input--error');
  });

  it('renders success state', () => {
    render(<Input data-testid="input" state="success" />);
    expect(screen.getByTestId('input')).toHaveClass('tk-input--success');
  });

  it('renders warning state', () => {
    render(<Input data-testid="input" state="warning" />);
    expect(screen.getByTestId('input')).toHaveClass('tk-input--warning');
  });

  it('combines variants correctly', () => {
    render(<Input data-testid="input" variant="outline" size="lg" state="success" />);

    const input = screen.getByTestId('input');
    expect(input).toHaveClass('tk-input--outline');
    expect(input).toHaveClass('tk-input--lg');
    expect(input).toHaveClass('tk-input--success');
  });
});
