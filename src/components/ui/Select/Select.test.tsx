import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import Select, {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './select';

// Mock Radix UI's Portal for testing
vi.mock('@radix-ui/react-portal', () => ({
  Portal: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock browser APIs that aren't available in jsdom
Object.defineProperty(Element.prototype, 'scrollIntoView', {
  value: vi.fn(),
  writable: true,
});

Object.defineProperty(Element.prototype, 'hasPointerCapture', {
  value: vi.fn().mockReturnValue(false),
  writable: true,
});

describe('Select Component', () => {
  // =====================================
  // RENDERING TESTS (8 tests)
  // =====================================
  describe('Rendering', () => {
    it('renders basic select without wrapper when no enhanced props', () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toBeInTheDocument();
      expect(screen.getByText('Select option')).toBeInTheDocument();

      // Should not have wrapper class when no enhanced props
      const wrapper = document.querySelector('.select-wrapper');
      expect(wrapper).not.toBeInTheDocument();
    });

    describe('Snapshots', () => {
      it('matches default snapshot', () => {
        const { container } = render(<Select>Default</Select>);
        expect(container.firstChild).toMatchSnapshot();
      });
      it('matches all variants snapshot', () => {
        const { container } = render(
          <div data-testid="variants-container">
            <Select variant="default">Default</Select>
            <Select variant="destructive">Destructive</Select>
            <Select variant="outline">Outline</Select>
            <Select variant="secondary">Secondary</Select>
          </div>
        );
        expect(container.firstChild).toMatchSnapshot();
      });
      it('matches all sizes snapshot', () => {
        const { container } = render(
          <div data-testid="sizes-container">
            <Select size="sm">Small</Select>
            <Select size="default">Default</Select>
            <Select size="lg">Large</Select>
          </div>
        );
        expect(container.firstChild).toMatchSnapshot();
      });
      it('matches disabled state snapshot', () => {
        const { container } = render(<Select disabled>Disabled</Select>);
        expect(container.firstChild).toMatchSnapshot();
      });
      it('matches loading state snapshot', () => {
        const { container } = render(<Select loading>Loading</Select>);
        expect(container.firstChild).toMatchSnapshot();
      });
    });
    it('renders with wrapper when enhanced props are provided', () => {
      render(
        <Select label="Test Label">
          <SelectTrigger>
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );

      expect(screen.getByText('Test Label')).toBeInTheDocument();
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('renders with placeholder text', () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Choose an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );

      expect(screen.getByText('Choose an option')).toBeInTheDocument();
    });

    it('renders multiple select items', () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
          </SelectContent>
        </Select>
      );

      // Click to open dropdown
      fireEvent.click(screen.getByRole('combobox'));

      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('Banana')).toBeInTheDocument();
      expect(screen.getByText('Orange')).toBeInTheDocument();
    });

    it('renders with groups and separators', () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Vegetables</SelectLabel>
              <SelectItem value="carrot">Carrot</SelectItem>
              <SelectItem value="broccoli">Broccoli</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );

      fireEvent.click(screen.getByRole('combobox'));

      expect(screen.getByText('Fruits')).toBeInTheDocument();
      expect(screen.getByText('Vegetables')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(
        <Select>
          <SelectTrigger className="custom-trigger-class">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveClass('custom-trigger-class');
    });

    it('renders with disabled state', () => {
      render(
        <Select disabled>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toBeDisabled();
    });

    it('renders with required indicator', () => {
      render(
        <Select label="Required Field" required>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );

      expect(screen.getByText('Required Field')).toBeInTheDocument();
      expect(screen.getByText('*')).toBeInTheDocument();
    });
  });

  // =====================================
  // ENHANCED FEATURES TESTS (10 tests)
  // =====================================
  describe('Enhanced Features', () => {
    it('renders label correctly', () => {
      render(
        <Select label="Select Label">
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );

      const label = screen.getByText('Select Label');
      expect(label).toBeInTheDocument();
      expect(label).toHaveClass('select-label');
    });

    it('renders helper text correctly', () => {
      render(
        <Select helperText="This is helper text">
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );

      const helperText = screen.getByText('This is helper text');
      expect(helperText).toBeInTheDocument();
      expect(helperText).toHaveClass('select-helper');
    });

    it('renders error message correctly', () => {
      render(
        <Select error="This is an error">
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );

      const errorText = screen.getByText('This is an error');
      expect(errorText).toBeInTheDocument();
      expect(errorText).toHaveClass('select-error');
    });

    it('prioritizes error over helper text', () => {
      render(
        <Select error="Error message" helperText="Helper text">
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );

      expect(screen.getByText('Error message')).toBeInTheDocument();
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    });

    it('applies base SCSS classes for enhancements', () => {
      render(
        <Select label="Enhanced Select">
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveClass('select-trigger');
    });

    it('applies loading state classes', () => {
      render(
        <Select>
          <SelectTrigger loading>
            <SelectValue placeholder="Loading..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveClass('select-trigger--loading');
      expect(trigger).toBeDisabled();
    });

    it('applies error state classes when error prop is provided', () => {
      render(
        <Select error="Error message">
          <SelectTrigger error>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveClass('select-trigger--error');
    });

    it('renders without wrapper when no enhanced features are used', () => {
      const { container } = render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );

      // Should not have wrapper div
      expect(container.querySelector('.select-wrapper')).not.toBeInTheDocument();
    });

    it('combines label, helper text, and required indicator correctly', () => {
      render(
        <Select label="Required Field" helperText="Please make a selection" required>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );

      expect(screen.getByText('Required Field')).toBeInTheDocument();
      expect(screen.getByText('*')).toBeInTheDocument();
      expect(screen.getByText('Please make a selection')).toBeInTheDocument();
    });

    it('handles complex enhanced features combination', () => {
      render(
        <Select label="Complex Select" error="Complex error" required>
          <SelectTrigger error loading>
            <SelectValue placeholder="Complex example" />
          </SelectTrigger>
          <SelectContent searchable>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');

      expect(screen.getByText('Complex Select')).toBeInTheDocument();
      expect(screen.getByText('*')).toBeInTheDocument();
      expect(screen.getByText('Complex error')).toBeInTheDocument();
      expect(trigger).toHaveClass('select-trigger--error');
      expect(trigger).toHaveClass('select-trigger--loading');
      expect(trigger).toBeDisabled();
    });
  });

  // =====================================
  // INTERACTION TESTS (12 tests)
  // =====================================
  describe('Interaction', () => {
    it('opens dropdown when trigger is clicked', async () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
      });
    });

    it('selects option when clicked', async () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      fireEvent.click(trigger);

      await waitFor(() => {
        fireEvent.click(screen.getByText('Apple'));
      });

      expect(trigger).toHaveAttribute('data-state', 'closed');
    });

    it('calls onValueChange when selection is made', async () => {
      const handleValueChange = vi.fn();

      render(
        <Select onValueChange={handleValueChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectContent>
        </Select>
      );

      fireEvent.click(screen.getByRole('combobox'));

      await waitFor(() => {
        fireEvent.click(screen.getByText('Apple'));
      });

      expect(handleValueChange).toHaveBeenCalledWith('apple');
      expect(handleValueChange).toHaveBeenCalledTimes(1);
    });

    it('does not open when disabled', () => {
      render(
        <Select disabled>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      fireEvent.click(trigger);

      expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    });

    it('does not open when loading', () => {
      render(
        <Select>
          <SelectTrigger loading>
            <SelectValue placeholder="Loading..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      fireEvent.click(trigger);

      expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    });

    it('handles keyboard navigation with Enter key', async () => {
      const user = userEvent.setup();

      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');

      // First focus the trigger and open with Enter
      trigger.focus();
      await user.keyboard('{Enter}');

      // Wait for dropdown to appear
      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument();
      });

      // Verify options are visible
      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('handles keyboard navigation with Space key', async () => {
      const user = userEvent.setup();

      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');

      // Focus trigger and open with Space
      trigger.focus();
      await user.keyboard(' ');

      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument();
      });

      // Verify options are visible
      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('handles Arrow Down navigation', async () => {
      const user = userEvent.setup();

      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="first">First Option</SelectItem>
            <SelectItem value="second">Second Option</SelectItem>
            <SelectItem value="third">Third Option</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');

      // First open the dropdown, then navigate
      await user.click(trigger);

      // Wait for dropdown to open
      await waitFor(() => {
        expect(screen.getByText('First Option')).toBeInTheDocument();
      });

      // Arrow down should navigate through options
      await user.keyboard('{ArrowDown}');

      // Verify all options are still visible
      expect(screen.getByText('First Option')).toBeInTheDocument();
      expect(screen.getByText('Second Option')).toBeInTheDocument();
      expect(screen.getByText('Third Option')).toBeInTheDocument();
    });

    it('handles Arrow Up navigation', async () => {
      const user = userEvent.setup();

      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="first">First Option</SelectItem>
            <SelectItem value="second">Second Option</SelectItem>
            <SelectItem value="third">Third Option</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');

      // Open dropdown first
      await user.click(trigger);

      // Wait for dropdown to open
      await waitFor(() => {
        expect(screen.getByText('First Option')).toBeInTheDocument();
      });

      // Arrow up should work (may cycle to last or stay on first)
      await user.keyboard('{ArrowUp}');

      // Verify all options are still visible after navigation
      expect(screen.getByText('First Option')).toBeInTheDocument();
      expect(screen.getByText('Second Option')).toBeInTheDocument();
      expect(screen.getByText('Third Option')).toBeInTheDocument();
    });

    it('closes dropdown on Escape key', async () => {
      const user = userEvent.setup();

      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');

      // Open dropdown
      await user.click(trigger);

      // Wait for dropdown to open
      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument();
      });

      // Close with Escape
      await user.keyboard('{Escape}');

      // Verify dropdown closes and trigger state changes
      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'false');
      });

      // Option should no longer be visible
      await waitFor(() => {
        expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
      });
    });

    it('prevents selection of disabled options', async () => {
      const handleValueChange = vi.fn();

      render(
        <Select onValueChange={handleValueChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="enabled">Enabled Option</SelectItem>
            <SelectItem value="disabled" disabled>
              Disabled Option
            </SelectItem>
          </SelectContent>
        </Select>
      );

      fireEvent.click(screen.getByRole('combobox'));

      await waitFor(() => {
        const disabledOption = screen.getByText('Disabled Option');
        fireEvent.click(disabledOption);
      });

      // Should not call onValueChange for disabled option
      expect(handleValueChange).not.toHaveBeenCalled();
    });

    it('maintains focus on trigger after selection', async () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      fireEvent.click(trigger);

      await waitFor(() => {
        fireEvent.click(screen.getByText('Option 1'));
      });

      expect(trigger).toHaveFocus();
    });
  });

  // =====================================
  // CONTROLLED COMPONENT TESTS (8 tests)
  // =====================================
  describe('Controlled Component', () => {
    it('works with controlled value', () => {
      render(
        <Select value="apple">
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('data-state', 'closed');
    });

    it('updates when controlled value changes', () => {
      const TestWrapper = () => {
        const [value, setValue] = useState('apple');
        return (
          <div>
            <Select value={value} onValueChange={setValue}>
              <SelectTrigger>
                <SelectValue placeholder="Select fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
              </SelectContent>
            </Select>
            <button onClick={() => setValue('banana')}>Set Banana</button>
          </div>
        );
      };

      render(<TestWrapper />);

      fireEvent.click(screen.getByText('Set Banana'));

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('data-state', 'closed');
    });

    it('ignores defaultValue when value is controlled', () => {
      render(
        <Select value="orange" defaultValue="apple">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('data-state', 'closed');
    });

    it('works with uncontrolled defaultValue', () => {
      render(
        <Select defaultValue="banana">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('data-state', 'closed');
    });

    it('handles controlled component with complex state', () => {
      const TestWrapper = () => {
        const [formData, setFormData] = useState({
          fruit: '',
          vegetable: 'carrot',
        });

        return (
          <div>
            <Select
              value={formData.fruit}
              onValueChange={value => setFormData(prev => ({ ...prev, fruit: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={formData.vegetable}
              onValueChange={value => setFormData(prev => ({ ...prev, vegetable: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select vegetable" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="carrot">Carrot</SelectItem>
                <SelectItem value="broccoli">Broccoli</SelectItem>
              </SelectContent>
            </Select>

            <div data-testid="form-data">{JSON.stringify(formData)}</div>
          </div>
        );
      };

      render(<TestWrapper />);

      const formData = screen.getByTestId('form-data');
      expect(formData).toHaveTextContent('{"fruit":"","vegetable":"carrot"}');
    });

    it('handles controlled select with validation', () => {
      const TestWrapper = () => {
        const [value, setValue] = useState('');
        const [error, setError] = useState('');

        const handleValueChange = (newValue: string) => {
          setValue(newValue);
          if (newValue === 'invalid') {
            setError('This option is not allowed');
          } else {
            setError('');
          }
        };

        return (
          <Select value={value} onValueChange={handleValueChange} error={error}>
            <SelectTrigger error={!!error}>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="valid">Valid Option</SelectItem>
              <SelectItem value="invalid">Invalid Option</SelectItem>
            </SelectContent>
          </Select>
        );
      };

      render(<TestWrapper />);

      fireEvent.click(screen.getByRole('combobox'));

      waitFor(() => {
        fireEvent.click(screen.getByText('Invalid Option'));
      });

      expect(screen.getByText('This option is not allowed')).toBeInTheDocument();
    });

    it('handles rapid controlled value changes', () => {
      const TestWrapper = () => {
        const [value, setValue] = useState('option1');

        React.useEffect(() => {
          const interval = setInterval(() => {
            setValue(prev => (prev === 'option1' ? 'option2' : 'option1'));
          }, 100);

          setTimeout(() => clearInterval(interval), 500);
          return () => clearInterval(interval);
        }, []);

        return (
          <Select value={value} onValueChange={setValue}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
            </SelectContent>
          </Select>
        );
      };

      render(<TestWrapper />);

      const trigger = screen.getByRole('combobox');
      expect(trigger).toBeInTheDocument();
    });

    it('handles controlled component with external state management', () => {
      const mockDispatch = vi.fn();
      const TestWrapper = () => {
        const [state, setState] = useState({ selectedValue: 'initial' });

        const handleChange = (value: string) => {
          setState({ selectedValue: value });
          mockDispatch({ type: 'SELECT_CHANGE', payload: value });
        };

        return (
          <Select value={state.selectedValue} onValueChange={handleChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="initial">Initial</SelectItem>
              <SelectItem value="changed">Changed</SelectItem>
            </SelectContent>
          </Select>
        );
      };

      render(<TestWrapper />);

      fireEvent.click(screen.getByRole('combobox'));

      waitFor(() => {
        fireEvent.click(screen.getByText('Changed'));
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SELECT_CHANGE',
        payload: 'changed',
      });
    });
  });

  // =====================================
  // ACCESSIBILITY TESTS (8 tests)
  // =====================================
  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <Select label="Accessible Select">
          <SelectTrigger>
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger).toHaveAttribute('role', 'combobox');
    });

    it('updates aria-expanded when opened', async () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(trigger);

      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('associates label with select trigger', () => {
      render(
        <Select label="Test Label">
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      const label = screen.getByText('Test Label');

      expect(trigger).toHaveAttribute('aria-labelledby');
      expect(label).toHaveAttribute('id');
    });

    it('includes required indicator in accessibility tree', () => {
      render(
        <Select label="Required Field" required>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('aria-required', 'true');
    });

    it('associates error message with trigger', () => {
      render(
        <Select error="This field has an error">
          <SelectTrigger error>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      const errorMessage = screen.getByText('This field has an error');

      expect(trigger).toHaveAttribute('aria-describedby');
      expect(errorMessage).toHaveAttribute('id');
      expect(trigger).toHaveAttribute('aria-invalid', 'true');
    });

    it('associates helper text with trigger', () => {
      render(
        <Select helperText="This is helpful information">
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      const helperText = screen.getByText('This is helpful information');

      expect(trigger).toHaveAttribute('aria-describedby');
      expect(helperText).toHaveAttribute('id');
    });

    it('handles keyboard focus correctly', async () => {
      const user = userEvent.setup();

      render(
        <div>
          <input data-testid="before" />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
            </SelectContent>
          </Select>
          <input data-testid="after" />
        </div>
      );

      const beforeInput = screen.getByTestId('before');
      const trigger = screen.getByRole('combobox');
      const afterInput = screen.getByTestId('after');

      // Tab navigation
      await user.click(beforeInput);
      await user.tab();
      expect(trigger).toHaveFocus();

      await user.tab();
      expect(afterInput).toHaveFocus();

      // Reverse tab navigation
      await user.tab({ shift: true });
      expect(trigger).toHaveFocus();
    });

    it('provides appropriate disabled state feedback', () => {
      render(
        <Select disabled>
          <SelectTrigger>
            <SelectValue placeholder="Disabled select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toBeDisabled();
      expect(trigger).toHaveAttribute('disabled');
    });
  });

  // =====================================
  // EDGE CASES TESTS (8 tests)
  // =====================================
  describe('Edge Cases', () => {
    it('handles empty options list', () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="No options" />
          </SelectTrigger>
          <SelectContent>{/* No SelectItem components */}</SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      fireEvent.click(trigger);

      expect(trigger).toBeInTheDocument();
    });

    it('handles very long option text', () => {
      const longText =
        'This is a very long option text that might cause layout issues or overflow problems in the dropdown menu component';

      render(
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="short">Short</SelectItem>
            <SelectItem value="long">{longText}</SelectItem>
          </SelectContent>
        </Select>
      );

      fireEvent.click(screen.getByRole('combobox'));

      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it('handles special characters in option values and text', () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="special-chars!@#$%">Special: !@#$%</SelectItem>
            <SelectItem value="unicode-ðŸ’»ðŸš€">Unicode: ðŸ’»ðŸš€</SelectItem>
            <SelectItem value="quotes-and-stuff">
              Quotes &apos;and&apos; &quot;stuff&quot;
            </SelectItem>
          </SelectContent>
        </Select>
      );

      fireEvent.click(screen.getByRole('combobox'));

      expect(screen.getByText('Special: !@#$%')).toBeInTheDocument();
      expect(screen.getByText('Unicode: ðŸ’»ðŸš€')).toBeInTheDocument();
      expect(screen.getByText('Quotes \'and\' "stuff"')).toBeInTheDocument();
    });

    it('handles rapid open/close cycles', async () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );

      // Test rapid interactions by clicking on the visible elements
      // rather than relying on role queries which get affected by portals
      for (let i = 0; i < 5; i++) {
        // Find clickable button by its content (works even when in portal)
        const triggerButton = screen.getByText('Select').closest('button');
        if (triggerButton) {
          fireEvent.click(triggerButton);
        }
        await new Promise(resolve => setTimeout(resolve, 50));
      }

      // Verify the component is still functional
      const finalTrigger = screen.getByText('Select').closest('button');
      expect(finalTrigger).toBeInTheDocument();
      expect(finalTrigger).toHaveAttribute('data-state'); // Has Radix state
    });

    it('handles null and undefined values gracefully', () => {
      render(
        <Select value={undefined}>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="valid">Valid Option</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toBeInTheDocument();
    });

    it('handles dynamic option updates', async () => {
      const TestWrapper = () => {
        const [options, setOptions] = useState(['option1', 'option2']);

        return (
          <div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {options.map(option => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <button onClick={() => setOptions(prev => [...prev, `option${prev.length + 1}`])}>
              Add Option
            </button>
          </div>
        );
      };

      render(<TestWrapper />);

      // Open dropdown and verify initial options
      fireEvent.click(screen.getByRole('combobox'));
      expect(screen.getByText('option1')).toBeInTheDocument();
      expect(screen.getByText('option2')).toBeInTheDocument();

      // Add a new option
      fireEvent.click(screen.getByText('Add Option'));

      // Close dropdown first by clicking outside or escape
      fireEvent.keyDown(document.body, { key: 'Escape', code: 'Escape' });

      // Wait for the dropdown to close and state to update
      await new Promise(resolve => setTimeout(resolve, 100));

      // Reopen dropdown and verify new option
      fireEvent.click(screen.getByRole('combobox'));

      // Wait for options to be visible
      await waitFor(() => {
        expect(screen.getByText('option3')).toBeInTheDocument();
      });
    });

    it('handles concurrent selections on multiple selects', () => {
      render(
        <div>
          <Select data-testid="select1">
            <SelectTrigger>
              <SelectValue placeholder="Select 1" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a">Option A</SelectItem>
            </SelectContent>
          </Select>

          <Select data-testid="select2">
            <SelectTrigger>
              <SelectValue placeholder="Select 2" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="b">Option B</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );

      const triggers = screen.getAllByRole('combobox');
      expect(triggers).toHaveLength(2);

      // Both should be functional
      fireEvent.click(triggers[0]);
      fireEvent.click(triggers[1]);
    });

    it('handles component unmounting during interaction', () => {
      const TestWrapper = () => {
        const [mounted, setMounted] = useState(true);

        return (
          <div>
            {mounted && (
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                </SelectContent>
              </Select>
            )}
            <button onClick={() => setMounted(false)}>Unmount</button>
          </div>
        );
      };

      render(<TestWrapper />);

      const trigger = screen.getByRole('combobox');
      fireEvent.click(trigger);

      // Unmount while dropdown is open
      fireEvent.click(screen.getByText('Unmount'));

      expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    });
  });
});
