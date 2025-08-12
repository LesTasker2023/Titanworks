import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Input } from '../Input';

describe('Input', () => {
  it('renders correctly', () => {
    render(<Input data-testid="input" />);
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });

  it('accepts and displays a value', () => {
    render(<Input data-testid="input" value="test value" readOnly />);
    expect(screen.getByDisplayValue('test value')).toBeInTheDocument();
  });

  it('handles onChange events', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Input data-testid="input" onChange={handleChange} />);

    const input = screen.getByTestId('input');
    await user.type(input, 'hello');

    expect(handleChange).toHaveBeenCalledTimes(5);
  });

  it('displays placeholder text', () => {
    render(<Input placeholder="Enter text here" />);
    expect(screen.getByPlaceholderText('Enter text here')).toBeInTheDocument();
  });

  it('can be disabled', () => {
    render(<Input data-testid="input" disabled />);
    expect(screen.getByTestId('input')).toBeDisabled();
  });

  it('can be required', () => {
    render(<Input data-testid="input" required />);
    expect(screen.getByTestId('input')).toBeRequired();
  });

  it('handles different input types', () => {
    render(<Input data-testid="email-input" type="email" />);
    expect(screen.getByTestId('email-input')).toHaveAttribute('type', 'email');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Input ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<Input data-testid="input" className="custom-class" />);
    expect(screen.getByTestId('input')).toHaveClass('custom-class');
  });

  it('handles focus and blur events', async () => {
    const user = userEvent.setup();
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();

    render(<Input data-testid="input" onFocus={handleFocus} onBlur={handleBlur} />);

    const input = screen.getByTestId('input');
    await user.click(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);

    await user.tab();
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });
});
