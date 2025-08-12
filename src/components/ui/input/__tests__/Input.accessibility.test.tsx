import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Input } from '../Input';

describe('Input Accessibility', () => {
  it('has proper ARIA attributes when required', () => {
    render(<Input data-testid="input" required aria-label="Required input" />);
    const input = screen.getByTestId('input');

    expect(input).toBeRequired();
    expect(input).toHaveAttribute('aria-label', 'Required input');
  });

  it('associates label with input correctly', () => {
    render(<Input id="test-input" label="Test Label" />);
    const label = screen.getByText('Test Label');
    const input = screen.getByLabelText('Test Label');

    expect(label).toHaveAttribute('for', 'test-input');
    expect(input).toHaveAttribute('id', 'test-input');
  });

  it('displays helper text', () => {
    render(<Input label="Username" helperText="Enter your username" />);
    expect(screen.getByText('Enter your username')).toBeInTheDocument();
  });

  it('displays error message and applies error state', () => {
    render(<Input label="Email" errorMessage="Invalid email format" />);
    const errorMessage = screen.getByText('Invalid email format');
    const input = screen.getByRole('textbox');

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('tk-input__message--error');
    expect(input).toHaveClass('tk-input--error');
  });

  it('displays success message and applies success state', () => {
    render(<Input label="Email" successMessage="Valid email" />);
    const successMessage = screen.getByText('Valid email');
    const input = screen.getByRole('textbox');

    expect(successMessage).toBeInTheDocument();
    expect(successMessage).toHaveClass('tk-input__message--success');
    expect(input).toHaveClass('tk-input--success');
  });

  it('prioritizes error message over success message', () => {
    render(<Input label="Email" errorMessage="Invalid email" successMessage="Valid email" />);

    expect(screen.getByText('Invalid email')).toBeInTheDocument();
    expect(screen.queryByText('Valid email')).not.toBeInTheDocument();
  });

  it('supports ARIA describedby for error messages', () => {
    render(
      <Input
        id="email-input"
        label="Email"
        errorMessage="Invalid email format"
        aria-describedby="email-error"
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-describedby', 'email-error');
  });

  it('supports ARIA invalid attribute', () => {
    render(<Input data-testid="input" aria-invalid="true" />);
    expect(screen.getByTestId('input')).toHaveAttribute('aria-invalid', 'true');
  });

  it('supports autocomplete attribute', () => {
    render(<Input data-testid="input" autoComplete="email" />);
    expect(screen.getByTestId('input')).toHaveAttribute('autocomplete', 'email');
  });

  it('renders with proper role', () => {
    render(<Input type="text" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with proper role for email input', () => {
    render(<Input type="email" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
