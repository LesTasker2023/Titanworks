import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import Textarea from './textarea';

describe('Textarea Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Textarea placeholder="Test textarea" />);
      const textarea = screen.getByPlaceholderText('Test textarea');
      expect(textarea).toBeInTheDocument();
    });

    describe('Snapshots', () => {
      it('matches default snapshot', () => {
        const { container } = render(<Textarea>Default</Textarea>);
        expect(container.firstChild).toMatchSnapshot();
      });
      it('matches all variants snapshot', () => {
        const { container } = render(
          <div data-testid="variants-container">
            <Textarea variant="default">Default</Textarea>
            <Textarea variant="destructive">Destructive</Textarea>
            <Textarea variant="outline">Outline</Textarea>
            <Textarea variant="secondary">Secondary</Textarea>
          </div>
        );
        expect(container.firstChild).toMatchSnapshot();
      });
      it('matches all sizes snapshot', () => {
        const { container } = render(
          <div data-testid="sizes-container">
            <Textarea size="sm">Small</Textarea>
            <Textarea size="default">Default</Textarea>
            <Textarea size="lg">Large</Textarea>
          </div>
        );
        expect(container.firstChild).toMatchSnapshot();
      });
      it('matches disabled state snapshot', () => {
        const { container } = render(<Textarea disabled>Disabled</Textarea>);
        expect(container.firstChild).toMatchSnapshot();
      });
      it('matches loading state snapshot', () => {
        const { container } = render(<Textarea loading>Loading</Textarea>);
        expect(container.firstChild).toMatchSnapshot();
      });
    });
    it('renders with custom placeholder', () => {
      render(<Textarea placeholder="Custom placeholder" />);
      expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument();
    });

    it('renders as a textarea element', () => {
      render(<Textarea data-testid="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea');
      expect(textarea.tagName).toBe('TEXTAREA');
    });
  });

  // Enhanced features tests
  describe('Enhanced Features', () => {
    it('renders with label when provided', () => {
      render(<Textarea label="Test Label" placeholder="Test textarea" />);
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('renders with error message when provided', () => {
      render(<Textarea error="Test error" placeholder="Test textarea" />);
      expect(screen.getByText('Test error')).toBeInTheDocument();
    });

    it('renders with helper text when provided', () => {
      render(<Textarea helperText="Test helper" placeholder="Test textarea" />);
      expect(screen.getByText('Test helper')).toBeInTheDocument();
    });

    it('shows error instead of helper text when both provided', () => {
      render(
        <Textarea helperText="Helper text" error="Error message" placeholder="Test textarea" />
      );
      expect(screen.getByText('Error message')).toBeInTheDocument();
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    });

    it('renders textarea wrapper when label, error, or helper text provided', () => {
      render(<Textarea label="Test Label" placeholder="Test textarea" />);
      const wrapper = screen.getByText('Test Label').parentElement;
      expect(wrapper).toHaveClass('textarea-wrapper');
    });

    it('returns just textarea when no additional elements needed', () => {
      render(<Textarea placeholder="Test textarea" data-testid="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea');
      expect(textarea.parentElement).not.toHaveClass('textarea-wrapper');
    });

    it('shows required indicator when required', () => {
      render(<Textarea label="Required Field" required placeholder="Test textarea" />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });
  });

  // Character count tests
  describe('Character Count', () => {
    it('displays character count when showCount and maxLength provided', () => {
      render(
        <Textarea maxLength={100} showCount placeholder="Test textarea" defaultValue="test" />
      );
      expect(screen.getByText(/4[\s\/]*100/)).toBeInTheDocument();
    });

    it('updates character count on input change', () => {
      render(
        <Textarea
          maxLength={50}
          showCount
          placeholder="Test textarea"
          data-testid="test-textarea"
        />
      );

      const textarea = screen.getByTestId('test-textarea');
      fireEvent.change(textarea, { target: { value: 'Hello World' } });

      expect(screen.getByText(/11[\s\/]*50/)).toBeInTheDocument();
    });

    it('shows warning state when approaching limit', () => {
      render(
        <Textarea
          maxLength={10}
          showCount
          placeholder="Test textarea"
          defaultValue="123456789" // 9 chars = 90% of 10
        />
      );

      const countElement = screen.getByText(/9[\s\/]*10/);
      expect(countElement).toHaveClass('textarea-count--warning');
    });

    it('shows error state when at limit', () => {
      render(
        <Textarea
          maxLength={10}
          showCount
          placeholder="Test textarea"
          defaultValue="1234567890" // 10 chars = 100% of 10
        />
      );

      const countElement = screen.getByText(/10[\s\/]*10/);
      expect(countElement).toHaveClass('textarea-count--error');
    });

    it('does not show count when showCount is false', () => {
      render(
        <Textarea
          maxLength={100}
          showCount={false}
          placeholder="Test textarea"
          defaultValue="test"
        />
      );
      expect(screen.queryByText('4/100')).not.toBeInTheDocument();
    });

    it('does not show count when maxLength is not provided', () => {
      render(<Textarea showCount placeholder="Test textarea" defaultValue="test" />);
      expect(screen.queryByText(/\/.*$/)).not.toBeInTheDocument();
    });
  });

  // States tests
  describe('States', () => {
    it('applies disabled state correctly', () => {
      render(<Textarea disabled data-testid="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea');
      expect(textarea).toBeDisabled();
    });

    it('applies loading state correctly', () => {
      render(<Textarea loading data-testid="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea');

      expect(textarea).toBeDisabled();
      expect(textarea).toHaveClass('textarea--loading');
    });

    it('disables textarea when loading', () => {
      render(<Textarea loading data-testid="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea');
      expect(textarea).toBeDisabled();
    });

    it('applies error styling when error provided', () => {
      render(<Textarea error="Test error" data-testid="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea');
      expect(textarea).toHaveClass('textarea--error');
    });

    it('applies custom className', () => {
      render(<Textarea className="custom-class" data-testid="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea');
      expect(textarea).toHaveClass('custom-class');
    });

    it('applies base SCSS class for enhancements', () => {
      render(<Textarea data-testid="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea');

      // Should have base SCSS class for enhancements
      expect(textarea).toHaveClass('textarea');

      // Should have Tailwind base classes
      expect(textarea).toHaveClass('flex', 'min-h-[60px]', 'w-full', 'rounded-md');
    });
  });

  // Event handling tests
  describe('Event Handling', () => {
    it('calls onChange handler when value changes', () => {
      const handleChange = vi.fn();
      render(<Textarea onChange={handleChange} data-testid="test-textarea" />);

      const textarea = screen.getByTestId('test-textarea');
      fireEvent.change(textarea, { target: { value: 'test value' } });

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: 'test value' }),
        })
      );
    });

    it('updates character count when onChange called', async () => {
      render(<Textarea maxLength={50} showCount data-testid="test-textarea" />);

      const textarea = screen.getByTestId('test-textarea') as HTMLTextAreaElement;

      // Simulate typing "Hello" - this should update the character count
      fireEvent.change(textarea, { target: { value: 'Hello' } });

      // Verify the DOM value was updated
      expect(textarea.value).toBe('Hello');

      // The character count should show 5/50
      expect(screen.getByText(/5[\s\/]*50/)).toBeInTheDocument();
    });

    it('does not allow user interaction when disabled', () => {
      const handleChange = vi.fn();
      render(<Textarea onChange={handleChange} disabled data-testid="test-textarea" />);

      const textarea = screen.getByTestId('test-textarea');
      // Verify textarea is disabled
      expect(textarea).toBeDisabled();
      expect(textarea).toHaveAttribute('disabled');
    });

    it('handles focus events', () => {
      const handleFocus = vi.fn();
      render(<Textarea onFocus={handleFocus} data-testid="test-textarea" />);

      const textarea = screen.getByTestId('test-textarea');
      fireEvent.focus(textarea);

      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('handles blur events', () => {
      const handleBlur = vi.fn();
      render(<Textarea onBlur={handleBlur} data-testid="test-textarea" />);

      const textarea = screen.getByTestId('test-textarea');
      fireEvent.focus(textarea);
      fireEvent.blur(textarea);

      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  // HTML attributes tests
  describe('HTML Attributes', () => {
    it('passes through textarea attributes', () => {
      render(
        <Textarea
          name="test-textarea"
          defaultValue="test-value"
          rows={5}
          cols={40}
          required
          data-testid="test-textarea"
        />
      );

      const textarea = screen.getByTestId('test-textarea');
      expect(textarea).toHaveAttribute('name', 'test-textarea');
      expect(textarea).toHaveValue('test-value');
      expect(textarea).toHaveAttribute('rows', '5');
      expect(textarea).toHaveAttribute('cols', '40');
      expect(textarea).toHaveAttribute('required');
    });

    it('applies maxLength attribute', () => {
      render(<Textarea maxLength={100} data-testid="test-textarea" />);

      const textarea = screen.getByTestId('test-textarea');
      expect(textarea).toHaveAttribute('maxLength', '100');
    });

    it('has correct display name', () => {
      expect(Textarea.displayName).toBe('Textarea');
    });

    it('supports ref forwarding', () => {
      const ref = React.createRef<HTMLTextAreaElement>();
      render(<Textarea ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
    });
  });

  // Accessibility tests
  describe('Accessibility', () => {
    it('is focusable when enabled', () => {
      render(<Textarea data-testid="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea');
      textarea.focus();
      expect(textarea).toHaveFocus();
    });

    it('is not focusable when disabled', () => {
      render(<Textarea disabled data-testid="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea');
      textarea.focus();
      expect(textarea).not.toHaveFocus();
    });

    it('associates label with textarea correctly', () => {
      render(<Textarea label="Test Label" data-testid="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea');
      const label = screen.getByText('Test Label');

      // In our implementation, label is a sibling in the wrapper
      expect(label.parentElement).toBe(textarea.parentElement);
    });

    it('provides error message accessibility', () => {
      render(<Textarea error="Test error" data-testid="test-textarea" />);
      expect(screen.getByText('Test error')).toHaveClass('textarea-error');
    });

    it('provides helper text accessibility', () => {
      render(<Textarea helperText="Test helper" data-testid="test-textarea" />);
      expect(screen.getByText('Test helper')).toHaveClass('textarea-helper');
    });

    it('provides character count accessibility', () => {
      render(<Textarea maxLength={50} showCount defaultValue="test" data-testid="test-textarea" />);
      expect(screen.getByText(/4[\s\/]*50/)).toHaveClass('textarea-count');
    });
  });

  // Complex scenarios tests
  describe('Complex Scenarios', () => {
    it('handles form submission correctly', () => {
      const handleSubmit = vi.fn(e => e.preventDefault());
      render(
        <form onSubmit={handleSubmit}>
          <Textarea name="test" defaultValue="test value" />
          <button type="submit">Submit</button>
        </form>
      );

      fireEvent.click(screen.getByRole('button'));
      expect(handleSubmit).toHaveBeenCalled();
    });

    it('works with controlled textarea pattern', () => {
      const TestComponent = () => {
        const [value, setValue] = React.useState('');
        return (
          <Textarea
            value={value}
            onChange={e => setValue(e.target.value)}
            data-testid="test-textarea"
          />
        );
      };

      render(<TestComponent />);
      const textarea = screen.getByTestId('test-textarea');

      fireEvent.change(textarea, { target: { value: 'controlled value' } });
      expect(textarea).toHaveValue('controlled value');
    });

    it('handles validation states correctly', () => {
      render(
        <Textarea
          label="Content"
          defaultValue="invalid-content"
          error="Content is not valid"
          data-testid="test-textarea"
          readOnly
        />
      );

      const textarea = screen.getByTestId('test-textarea');
      expect(textarea).toHaveClass('textarea--error');
      expect(screen.getByText('Content is not valid')).toBeInTheDocument();
    });

    it('handles character counting with controlled input', () => {
      const TestComponent = () => {
        const [value, setValue] = React.useState('Initial text');
        return (
          <Textarea
            value={value}
            onChange={e => setValue(e.target.value)}
            maxLength={50}
            showCount
            data-testid="test-textarea"
          />
        );
      };

      render(<TestComponent />);

      // Initial count should show
      expect(screen.getByText('12/50')).toBeInTheDocument();

      // Update and check new count
      const textarea = screen.getByTestId('test-textarea');
      fireEvent.change(textarea, { target: { value: 'New text' } });
      expect(screen.getByText('8/50')).toBeInTheDocument();
    });

    it('handles all features together', () => {
      render(
        <Textarea
          label="Full Featured"
          helperText="This has all features"
          maxLength={100}
          showCount
          required
          defaultValue="Sample content"
          data-testid="test-textarea"
        />
      );

      expect(screen.getByText('Full Featured')).toBeInTheDocument();
      expect(screen.getByText('*')).toBeInTheDocument(); // Required indicator
      expect(screen.getByText('This has all features')).toBeInTheDocument();
      expect(screen.getByText(/14[\s\/]*100/)).toBeInTheDocument();

      const textarea = screen.getByTestId('test-textarea');
      expect(textarea).toHaveClass('textarea');
      expect(textarea).toHaveAttribute('required');
      expect(textarea).toHaveAttribute('maxLength', '100');
    });
  });
});
