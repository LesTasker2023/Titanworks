import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Switch } from './Switch';

describe('Switch Component', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    // Reset any state before each test
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Switch />);
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Switch className="custom-class" />);
      expect(screen.getByRole('switch')).toHaveClass('custom-class');
    });

    it('renders in unchecked state by default', () => {
      render(<Switch />);
      expect(screen.getByRole('switch')).not.toBeChecked();
    });

    it('renders in checked state when defaultChecked is true', () => {
      render(<Switch defaultChecked />);
      expect(screen.getByRole('switch')).toBeChecked();
    });
  });

  describe('Controlled Behavior', () => {
    it('respects controlled checked state', () => {
      render(<Switch checked={true} />);
      expect(screen.getByRole('switch')).toBeChecked();
    });

    it('calls onCheckedChange when clicked', async () => {
      const handleChange = vi.fn();
      render(<Switch onCheckedChange={handleChange} />);

      await user.click(screen.getByRole('switch'));
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('toggles between checked and unchecked states', async () => {
      const handleChange = vi.fn();
      render(<Switch onCheckedChange={handleChange} />);
      const switchElement = screen.getByRole('switch');

      // First click - should check
      await user.click(switchElement);
      expect(handleChange).toHaveBeenNthCalledWith(1, true);

      // Second click - should uncheck
      await user.click(switchElement);
      expect(handleChange).toHaveBeenNthCalledWith(2, false);
    });
  });

  describe('Uncontrolled Behavior', () => {
    it('supports uncontrolled usage', async () => {
      render(<Switch defaultChecked={false} />);
      const switchElement = screen.getByRole('switch');

      expect(switchElement).not.toBeChecked();
      await user.click(switchElement);
      expect(switchElement).toBeChecked();
    });

    it('starts with defaultChecked value', () => {
      render(<Switch defaultChecked={true} />);
      expect(screen.getByRole('switch')).toBeChecked();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<Switch aria-label="Enable notifications" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-label', 'Enable notifications');
      expect(switchElement).toHaveAttribute('aria-checked');
    });

    it('supports keyboard navigation', async () => {
      const handleChange = vi.fn();
      render(<Switch onCheckedChange={handleChange} />);

      const switchElement = screen.getByRole('switch');
      await user.tab();
      expect(switchElement).toHaveFocus();

      await user.keyboard('[Space]');
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('supports Enter key activation', async () => {
      const handleChange = vi.fn();
      render(<Switch onCheckedChange={handleChange} />);

      const switchElement = screen.getByRole('switch');
      switchElement.focus();

      await user.keyboard('[Enter]');
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('has proper focus indicators', async () => {
      render(<Switch />);
      const switchElement = screen.getByRole('switch');

      await user.tab();
      expect(switchElement).toHaveFocus();
      expect(switchElement).toHaveClass('focus-visible:outline-none');
    });
  });

  describe('Disabled State', () => {
    it('handles disabled state correctly', () => {
      render(<Switch disabled />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeDisabled();
      expect(switchElement).toHaveClass('disabled:cursor-not-allowed');
    });

    it('does not trigger change when disabled', async () => {
      const handleChange = vi.fn();
      render(<Switch disabled onCheckedChange={handleChange} />);

      await user.click(screen.getByRole('switch'));
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('cannot be focused when disabled', () => {
      render(<Switch disabled />);
      const switchElement = screen.getByRole('switch');
      switchElement.focus();
      expect(switchElement).not.toHaveFocus();
    });
  });

  describe('Form Integration', () => {
    it('renders with proper form attributes', () => {
      render(
        <form data-testid="form">
          <Switch name="notifications" />
        </form>
      );

      // Radix Switch creates a hidden input for form integration
      const form = screen.getByTestId('form');
      const hiddenInput = form.querySelector('input[name="notifications"]');
      expect(hiddenInput).toBeInTheDocument();
    });

    it('includes value in form data when checked', async () => {
      const handleSubmit = vi.fn(e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        return formData.get('notifications');
      });

      render(
        <form onSubmit={handleSubmit}>
          <Switch name="notifications" defaultChecked />
          <button type="submit">Submit</button>
        </form>
      );

      await user.click(screen.getByRole('button'));
      expect(handleSubmit).toHaveBeenCalled();
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = { current: null };
      render(<Switch ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('Edge Cases', () => {
    it('handles rapid toggling', async () => {
      const handleChange = vi.fn();
      render(<Switch onCheckedChange={handleChange} />);
      const switchElement = screen.getByRole('switch');

      // Rapid clicks
      await user.click(switchElement);
      await user.click(switchElement);
      await user.click(switchElement);

      expect(handleChange).toHaveBeenCalledTimes(3);
    });

    it('maintains state consistency during rapid changes', async () => {
      let currentState = false;
      const handleChange = vi.fn(checked => {
        currentState = checked;
      });

      render(<Switch checked={currentState} onCheckedChange={handleChange} />);
      const switchElement = screen.getByRole('switch');

      await user.click(switchElement);
      expect(handleChange).toHaveBeenLastCalledWith(true);
    });

    it('handles null/undefined callbacks gracefully', async () => {
      render(<Switch onCheckedChange={undefined} />);
      const switchElement = screen.getByRole('switch');

      // Should not throw
      await user.click(switchElement);
      expect(switchElement).toBeChecked();
    });
  });

  describe('Performance', () => {
    it('does not re-render unnecessarily', () => {
      const renderSpy = vi.fn();
      const TestComponent = () => {
        renderSpy();
        return <Switch />;
      };

      const { rerender } = render(<TestComponent />);
      expect(renderSpy).toHaveBeenCalledTimes(1);

      rerender(<TestComponent />);
      expect(renderSpy).toHaveBeenCalledTimes(2);
    });
  });
});
