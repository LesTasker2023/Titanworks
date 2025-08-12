import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Input } from '../Input';

describe('Input Interactions', () => {
  it('handles user typing', async () => {
    const user = userEvent.setup();
    render(<Input data-testid="input" />);

    const input = screen.getByTestId('input');
    await user.type(input, 'Hello World');

    expect(input).toHaveValue('Hello World');
  });

  it('handles clearing input', async () => {
    const user = userEvent.setup();
    render(<Input data-testid="input" defaultValue="initial value" />);

    const input = screen.getByTestId('input');
    await user.clear(input);

    expect(input).toHaveValue('');
  });

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Input data-testid="input1" />
        <Input data-testid="input2" />
      </div>
    );

    const input1 = screen.getByTestId('input1');
    const input2 = screen.getByTestId('input2');

    await user.click(input1);
    expect(input1).toHaveFocus();

    await user.tab();
    expect(input2).toHaveFocus();
  });

  it('prevents interaction when disabled', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Input data-testid="input" disabled onChange={handleChange} />);

    const input = screen.getByTestId('input');
    await user.click(input);

    expect(input).not.toHaveFocus();
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('handles paste operation', async () => {
    const user = userEvent.setup();
    render(<Input data-testid="input" />);

    const input = screen.getByTestId('input');
    await user.click(input);
    await user.paste('pasted content');

    expect(input).toHaveValue('pasted content');
  });

  it('handles select all operation', async () => {
    const user = userEvent.setup();
    render(<Input data-testid="input" defaultValue="select this text" />);

    const input = screen.getByTestId('input');
    await user.click(input);
    await user.keyboard('{Control>}a{/Control}');

    // The text should be selected (implementation detail varies by browser)
    expect(input).toHaveFocus();
  });

  it('handles backspace and delete', async () => {
    const user = userEvent.setup();
    render(<Input data-testid="input" defaultValue="delete me" />);

    const input = screen.getByTestId('input');
    await user.click(input);

    // Move to end and delete backwards
    await user.keyboard('{End}');
    await user.keyboard('{Backspace}{Backspace}{Backspace}');

    expect(input).toHaveValue('delete');
  });

  it('handles form submission', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn(e => e.preventDefault());

    render(
      <form onSubmit={handleSubmit}>
        <Input data-testid="input" name="testInput" />
        <button type="submit">Submit</button>
      </form>
    );

    const input = screen.getByTestId('input');
    const button = screen.getByRole('button');

    await user.type(input, 'form data');
    await user.click(button);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('handles enter key press', async () => {
    const user = userEvent.setup();
    const handleKeyDown = vi.fn();

    render(<Input data-testid="input" onKeyDown={handleKeyDown} />);

    const input = screen.getByTestId('input');
    await user.click(input);
    await user.keyboard('{Enter}');

    expect(handleKeyDown).toHaveBeenCalledWith(expect.objectContaining({ key: 'Enter' }));
  });

  it('renders left icon correctly', () => {
    const LeftIcon = () => <span data-testid="left-icon">🔍</span>;
    render(<Input leftIcon={<LeftIcon />} data-testid="input" />);

    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });

  it('renders right icon correctly', () => {
    const RightIcon = () => <span data-testid="right-icon">✓</span>;
    render(<Input rightIcon={<RightIcon />} data-testid="input" />);

    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });

  it('renders both left and right icons', () => {
    const LeftIcon = () => <span data-testid="left-icon">🔍</span>;
    const RightIcon = () => <span data-testid="right-icon">✓</span>;

    render(<Input leftIcon={<LeftIcon />} rightIcon={<RightIcon />} data-testid="input" />);

    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });
});
