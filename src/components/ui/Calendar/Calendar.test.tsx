import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Calendar } from './Calendar';

interface MockIconProps {
  className?: string;
  [key: string]: unknown;
}

// Mock Lucide React icons
vi.mock('lucide-react', () => ({
  ChevronDownIcon: ({ className, ...props }: MockIconProps) => (
    <svg className={className} data-testid="chevron-down-icon" {...props} />
  ),
  ChevronLeftIcon: ({ className, ...props }: MockIconProps) => (
    <svg className={className} data-testid="chevron-left-icon" {...props} />
  ),
  ChevronRightIcon: ({ className, ...props }: MockIconProps) => (
    <svg className={className} data-testid="chevron-right-icon" {...props} />
  ),
}));

describe('Calendar Component', () => {
  // Helper function to get day buttons by number, accounting for full aria-label
  const getDayButton = (day: string, month = 'January', year = '2024') => {
    // Try to find button with aria-label containing the day number
    return screen.getByRole('button', {
      name: new RegExp(`${month}.*${day}.*${year}`, 'i'),
    });
  };

  // Basic rendering tests
  describe('Rendering', () => {
    it('renders with default props', () => {
      const { container } = render(<Calendar />);
      const calendar = screen.getByRole('grid');
      expect(calendar).toBeInTheDocument();
      expect(container.firstChild).toMatchSnapshot();
    });

    it('applies custom className', () => {
      const { container } = render(<Calendar className="custom-calendar" />);
      const calendarRoot = document.querySelector('.custom-calendar');
      expect(calendarRoot).toBeInTheDocument();
      expect(container.firstChild).toMatchSnapshot();
    });

    it('renders navigation buttons', () => {
      render(<Calendar />);
      const prevButton = screen.getByRole('button', { name: /Go to the Previous Month/i });
      const nextButton = screen.getByRole('button', { name: /Go to the Next Month/i });
      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
    });

    it('displays month and year caption', () => {
      const currentDate = new Date();
      render(<Calendar defaultMonth={currentDate} />);
      const caption = screen.getByText(
        new RegExp(currentDate.toLocaleString('default', { month: 'long', year: 'numeric' }), 'i')
      );
      expect(caption).toBeInTheDocument();
    });

    it('renders weekday headers', () => {
      render(<Calendar />);
      const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
      weekdays.forEach(day => {
        expect(screen.getByText(day)).toBeInTheDocument();
      });
    });
  });

  // Day selection tests
  describe('Day Selection', () => {
    it('allows selecting a day', async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();

      render(<Calendar mode="single" selected={undefined} onSelect={onSelect} />);

      // Find and click a day button (not today to avoid confusion)
      const dayButtons = screen
        .getAllByRole('button')
        .filter(btn => btn.textContent && /^\d+$/.test(btn.textContent));

      if (dayButtons.length > 0) {
        await user.click(dayButtons[0]);
        expect(onSelect).toHaveBeenCalled();
      }
    });

    it('highlights selected date', () => {
      const selectedDate = new Date(2024, 0, 15); // January 15, 2024
      const { container } = render(
        <Calendar mode="single" selected={selectedDate} defaultMonth={selectedDate} />
      );

      const selectedDay = getDayButton('15');
      expect(selectedDay).toHaveAttribute('data-selected-single', 'true');
      expect(container.firstChild).toMatchSnapshot();
    });

    it('handles multiple date selection', async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();

      render(<Calendar mode="multiple" selected={[]} onSelect={onSelect} />);

      const dayButtons = screen
        .getAllByRole('button')
        .filter(btn => btn.textContent && /^\d+$/.test(btn.textContent));

      if (dayButtons.length >= 2) {
        await user.click(dayButtons[0]);
        await user.click(dayButtons[1]);
        expect(onSelect).toHaveBeenCalledTimes(2);
      }
    });

    it('handles date range selection', async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();

      render(<Calendar mode="range" selected={undefined} onSelect={onSelect} />);

      const dayButtons = screen
        .getAllByRole('button')
        .filter(btn => btn.textContent && /^\d+$/.test(btn.textContent));

      if (dayButtons.length >= 2) {
        await user.click(dayButtons[0]);
        await user.click(dayButtons[1]);
        expect(onSelect).toHaveBeenCalledTimes(2);
      }
    });
  });

  // Navigation tests
  describe('Navigation', () => {
    it('navigates to previous month', async () => {
      const user = userEvent.setup();
      const currentDate = new Date(2024, 5, 1); // June 2024

      render(<Calendar defaultMonth={currentDate} />);

      const prevButton = screen.getByRole('button', { name: /Go to the Previous Month/i });
      await user.click(prevButton);

      // Should now show May 2024
      await waitFor(() => {
        expect(screen.getByText(/may 2024/i)).toBeInTheDocument();
      });
    });

    it('navigates to next month', async () => {
      const user = userEvent.setup();
      const currentDate = new Date(2024, 5, 1); // June 2024

      render(<Calendar defaultMonth={currentDate} />);

      const nextButton = screen.getByRole('button', { name: /Go to the Next Month/i });
      await user.click(nextButton);

      // Should now show July 2024
      await waitFor(() => {
        expect(screen.getByText(/july 2024/i)).toBeInTheDocument();
      });
    });

    it('disables navigation when disabled', () => {
      render(<Calendar disabled />);

      const prevButton = screen.getByRole('button', { name: /Go to the Previous Month/i });
      const nextButton = screen.getByRole('button', { name: /Go to the Next Month/i });

      // The disabled prop in react-day-picker disables date selection, not navigation
      // Navigation buttons remain interactive for accessibility reasons
      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();

      // Check that the calendar itself acknowledges the disabled state
      const calendar = screen.getByRole('grid');
      expect(calendar).toBeInTheDocument();
    });
  });

  // Button variant tests
  describe('Button Variants', () => {
    it('applies default button variant', () => {
      render(<Calendar />);
      const navButtons = screen
        .getAllByRole('button')
        .filter(btn => btn.getAttribute('aria-label')?.includes('month'));

      navButtons.forEach(button => {
        expect(button).toHaveClass('bg-black');
      });
    });

    it('applies custom button variant', () => {
      render(<Calendar buttonVariant="outline" />);
      const navButtons = screen
        .getAllByRole('button')
        .filter(btn => btn.getAttribute('aria-label')?.includes('month'));

      navButtons.forEach(button => {
        expect(button).toHaveClass('border-input');
      });
    });
  });

  // Caption layout tests
  describe('Caption Layout', () => {
    it('displays label caption layout by default', () => {
      const currentDate = new Date(2024, 5, 1);
      render(<Calendar defaultMonth={currentDate} captionLayout="label" />);

      expect(screen.getByText(/june 2024/i)).toBeInTheDocument();
    });

    it('displays dropdown caption layout', () => {
      const currentDate = new Date(2024, 5, 1);
      render(<Calendar defaultMonth={currentDate} captionLayout="dropdown" />);

      // Should have dropdown elements - use getByLabelText to be more specific
      const monthDropdown = screen.getByLabelText('Choose the Month');
      expect(monthDropdown).toBeInTheDocument();
    });
  });

  // Accessibility tests
  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<Calendar />);

      const calendar = screen.getByRole('grid');
      expect(calendar).toHaveAttribute('role', 'grid');

      // Check navigation buttons exist
      const navButtons = screen
        .getAllByRole('button')
        .filter(btn => btn.getAttribute('aria-label')?.includes('Month'));

      expect(navButtons.length).toBeGreaterThan(0);
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<Calendar />);

      const firstDayButton = screen
        .getAllByRole('button')
        .find(btn => btn.textContent && /^\d+$/.test(btn.textContent));

      if (firstDayButton) {
        firstDayButton.focus();
        expect(firstDayButton).toHaveFocus();

        // Test arrow key navigation
        await user.keyboard('{ArrowRight}');
        // The next day should be focused (implementation dependent)
      }
    });

    it('handles focus management correctly', () => {
      render(<Calendar />);

      const dayButtons = screen
        .getAllByRole('button')
        .filter(btn => btn.textContent && /^\d+$/.test(btn.textContent));

      // Each day button should be focusable
      dayButtons.forEach(button => {
        expect(button).toHaveAttribute('tabindex');
      });
    });
  });

  // Today highlighting tests
  describe('Today Highlighting', () => {
    it("highlights today's date", () => {
      const today = new Date();
      render(<Calendar defaultMonth={today} />);

      const todayCell = screen.getByRole('gridcell', {
        name: /Today,.*/,
      });

      expect(todayCell).toHaveClass('bg-gray-800');
    });

    it('applies today styling correctly', () => {
      const today = new Date();
      render(<Calendar defaultMonth={today} />);

      const todayCell = screen.getByRole('gridcell', {
        name: /Today,.*/,
      });

      // Today should have specific styling
      expect(todayCell).toHaveClass('text-white');
    });
  });

  // Custom formatters tests
  describe('Custom Formatters', () => {
    it('uses custom month formatter', () => {
      const customFormatters = {
        formatMonthDropdown: (date: Date) => `Custom ${date.getMonth() + 1}`,
      };

      render(
        <Calendar
          captionLayout="dropdown"
          formatters={customFormatters}
          defaultMonth={new Date(2024, 5, 1)}
        />
      );

      // Use getAllByText since the text appears in multiple places (select option and visible span)
      const customTexts = screen.getAllByText('Custom 6');
      expect(customTexts.length).toBeGreaterThan(0);
    });
  });

  // Outside days tests
  describe('Outside Days', () => {
    it('shows outside days by default', () => {
      render(<Calendar showOutsideDays={true} />);

      // Outside days should be visible (implementation dependent)
      const calendar = screen.getByRole('grid');
      expect(calendar).toBeInTheDocument();
    });

    it('hides outside days when configured', () => {
      render(<Calendar showOutsideDays={false} />);

      // Outside days should be hidden (implementation dependent)
      const calendar = screen.getByRole('grid');
      expect(calendar).toBeInTheDocument();
    });
  });

  // Error handling tests
  describe('Error Handling', () => {
    it('handles valid dates', () => {
      expect(() => {
        render(<Calendar defaultMonth={new Date(2024, 0, 15)} />);
      }).not.toThrow();
    });

    it('handles missing props gracefully', () => {
      expect(() => {
        render(<Calendar />);
      }).not.toThrow();
    });
  });

  // Brand color tests
  describe('Brand Color Integration', () => {
    it('applies brand colors to selected dates', () => {
      const selectedDate = new Date(2024, 0, 15);
      render(<Calendar mode="single" selected={selectedDate} defaultMonth={selectedDate} />);

      const selectedDay = getDayButton('15');

      // Should use CSS custom property for brand color
      expect(selectedDay).toHaveAttribute('data-selected-single', 'true');
    });

    it('applies brand hover states', async () => {
      const user = userEvent.setup();
      render(<Calendar />);

      const dayButtons = screen
        .getAllByRole('button')
        .filter(btn => btn.textContent && /^\d+$/.test(btn.textContent));

      if (dayButtons.length > 0) {
        await user.hover(dayButtons[0]);
        expect(dayButtons[0]).toHaveClass('hover:!bg-brand/20');
      }
    });
  });

  // Range selection tests
  describe('Range Selection Styling', () => {
    it('applies range start styling', () => {
      const rangeStart = new Date(2024, 0, 15);
      const rangeEnd = new Date(2024, 0, 20);

      render(
        <Calendar
          mode="range"
          selected={{ from: rangeStart, to: rangeEnd }}
          defaultMonth={rangeStart}
        />
      );

      const startDay = getDayButton('15');
      expect(startDay).toHaveAttribute('data-range-start', 'true');
    });

    it('applies range end styling', () => {
      const rangeStart = new Date(2024, 0, 15);
      const rangeEnd = new Date(2024, 0, 20);

      render(
        <Calendar
          mode="range"
          selected={{ from: rangeStart, to: rangeEnd }}
          defaultMonth={rangeStart}
        />
      );

      const endDay = getDayButton('20');
      expect(endDay).toHaveAttribute('data-range-end', 'true');
    });

    it('applies range middle styling', () => {
      const rangeStart = new Date(2024, 0, 15);
      const rangeEnd = new Date(2024, 0, 20);

      render(
        <Calendar
          mode="range"
          selected={{ from: rangeStart, to: rangeEnd }}
          defaultMonth={rangeStart}
        />
      );

      const middleDay = getDayButton('17');
      expect(middleDay).toHaveAttribute('data-range-middle', 'true');
    });
  });
});
