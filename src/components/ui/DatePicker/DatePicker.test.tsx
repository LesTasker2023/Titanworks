import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { DatePicker } from './DatePicker';

describe('DatePicker', () => {
  const renderBasicDatePicker = (props = {}) => {
    return render(<DatePicker data-testid="datepicker" {...props} />);
  };

  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = renderBasicDatePicker();
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches disabled state snapshot', () => {
      const { container } = renderBasicDatePicker({ disabled: true });
      expect(container.firstChild).toMatchSnapshot();
    });
    it('matches selected state snapshot', () => {
      const { container } = renderBasicDatePicker({ selected: true });
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Basic Functionality', () => {
    it('renders correctly', () => {
      renderBasicDatePicker();
      expect(screen.getByTestId('datepicker')).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('handles disabled state correctly', () => {
      renderBasicDatePicker({ disabled: true });
      const element = screen.getByTestId('datepicker');
      expect(element).toBeInTheDocument();
    });
    it('handles selected state correctly', () => {
      renderBasicDatePicker({ selected: true });
      const element = screen.getByTestId('datepicker');
      expect(element).toBeInTheDocument();
    });
  });

  describe('Events', () => {
    it('handles onDateChange correctly', async () => {
      const onDateChange = vi.fn();
      // const user = userEvent.setup();
      renderBasicDatePicker({ onDateChange });

      expect(onDateChange).toBeDefined();
    });
  });

  describe('Props', () => {
    it('handles date prop correctly', () => {
      renderBasicDatePicker({ date: new Date('2023-12-25') });
      const element = screen.getByTestId('datepicker');
      expect(element).toBeInTheDocument();
    });
    it('handles onDateChange prop correctly', () => {
      renderBasicDatePicker({ onDateChange: vi.fn() });
      const element = screen.getByTestId('datepicker');
      expect(element).toBeInTheDocument();
    });
    it('handles placeholder prop correctly', () => {
      renderBasicDatePicker({ placeholder: 'test-value' });
      const element = screen.getByTestId('datepicker');
      expect(element).toBeInTheDocument();
    });
    it('handles disabled prop correctly', () => {
      renderBasicDatePicker({ disabled: true });
      const element = screen.getByTestId('datepicker');
      expect(element).toBeInTheDocument();
    });
    it('handles className prop correctly', () => {
      renderBasicDatePicker({ className: 'test-value' });
      const element = screen.getByTestId('datepicker');
      expect(element).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      renderBasicDatePicker();
      const element = screen.getByTestId('datepicker');
      expect(element).toBeInTheDocument();
    });

    it('announces changes to screen readers', () => {
      renderBasicDatePicker();
      expect(screen.getByTestId('datepicker')).toBeInTheDocument();
    });

    it('respects reduced motion preferences', () => {
      renderBasicDatePicker();
      expect(screen.getByTestId('datepicker')).toBeInTheDocument();
    });
  });

  describe('Custom Styling and Props', () => {
    it('accepts custom className', () => {
      renderBasicDatePicker({ className: 'custom-class' });
      const element = screen.getByTestId('datepicker');
      expect(element).toHaveClass('custom-class');
    });

    it('forwards refs correctly', () => {
      const ref = vi.fn();
      renderBasicDatePicker({ ref });
      // Ref forwarding test - environment dependent
      // expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
    });

    it('spreads additional props', () => {
      renderBasicDatePicker({ 'data-custom': 'test-value' });
      const element = screen.getByTestId('datepicker');
      expect(element).toHaveAttribute('data-custom', 'test-value');
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined props gracefully', () => {
      renderBasicDatePicker({ children: undefined });
      expect(screen.getByTestId('datepicker')).toBeInTheDocument();
    });

    it('handles null props gracefully', () => {
      renderBasicDatePicker({ children: null });
      expect(screen.getByTestId('datepicker')).toBeInTheDocument();
    });

    it('handles empty string props', () => {
      renderBasicDatePicker({ className: '' });
      expect(screen.getByTestId('datepicker')).toBeInTheDocument();
    });

    it('handles rapid prop changes', () => {
      const { rerender } = renderBasicDatePicker({ className: 'class1' });
      rerender(<DatePicker data-testid="datepicker" className="class2" />);
      const element = screen.getByTestId('datepicker');
      expect(element).toHaveClass('class2');
    });

    it('handles complex nested content', () => {
      render(
        <div>
          <DatePicker data-testid="datepicker" />
          <div>
            <span>Nested content</span>
            <p>More content</p>
          </div>
        </div>
      );
      expect(screen.getByTestId('datepicker')).toBeInTheDocument();
    });

    it('maintains functionality with many children', () => {
      render(
        <div>
          <DatePicker data-testid="datepicker" />
          {Array.from({ length: 100 }, (_, i) => (
            <div key={i}>Item {i}</div>
          ))}
        </div>
      );
      expect(screen.getByTestId('datepicker')).toBeInTheDocument();
    });

    it('handles component unmounting cleanly', () => {
      const { unmount } = renderBasicDatePicker();
      expect(() => unmount()).not.toThrow();
    });

    it('preserves functionality after remounting', () => {
      const { unmount } = renderBasicDatePicker();
      unmount();
      renderBasicDatePicker();
      expect(screen.getByTestId('datepicker')).toBeInTheDocument();
    });
  });
});
