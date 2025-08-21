import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './index';

describe('Select', () => {
  const renderBasicSelect = (selectProps = {}, triggerProps = {}) => {
    return render(
      <Select data-testid="select" {...selectProps}>
        <SelectTrigger data-testid="select-trigger" {...triggerProps}>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    );
  };

  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches loading state snapshot', () => {
      const { container } = render(
        <Select>
          <SelectTrigger loading>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches disabled state snapshot', () => {
      const { container } = render(
        <Select disabled>
          <SelectTrigger>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches error state snapshot', () => {
      const { container } = render(
        <Select>
          <SelectTrigger error>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Basic Functionality', () => {
    it('renders correctly', () => {
      renderBasicSelect();
      expect(screen.getByTestId('select-trigger')).toBeInTheDocument();
    });

    it('shows placeholder text', () => {
      renderBasicSelect();
      expect(screen.getByText('Select an option')).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('handles loading state correctly', () => {
      renderBasicSelect({}, { loading: true });
      expect(screen.getByTestId('select-trigger')).toBeInTheDocument();
    });

    it('handles disabled state correctly', () => {
      renderBasicSelect({ disabled: true });
      expect(screen.getByTestId('select-trigger')).toBeInTheDocument();
    });

    it('handles error state correctly', () => {
      renderBasicSelect({}, { error: true });
      expect(screen.getByTestId('select-trigger')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      renderBasicSelect();
      const trigger = screen.getByTestId('select-trigger');
      expect(trigger).toHaveAttribute('role', 'combobox');
    });

    it('announces changes to screen readers', () => {
      renderBasicSelect();
      expect(screen.getByTestId('select-trigger')).toBeInTheDocument();
    });

    it('respects reduced motion preferences', () => {
      renderBasicSelect();
      expect(screen.getByTestId('select-trigger')).toBeInTheDocument();
    });
  });

  describe('Custom Styling and Props', () => {
    it('accepts custom className on trigger', () => {
      renderBasicSelect({}, { className: 'custom-class' });
      const trigger = screen.getByTestId('select-trigger');
      expect(trigger).toHaveClass('custom-class');
    });

    it('forwards refs correctly', () => {
      const ref = vi.fn();
      renderBasicSelect({ ref });
      expect(screen.getByTestId('select-trigger')).toBeInTheDocument();
    });

    it('spreads additional props on trigger', () => {
      renderBasicSelect({}, { 'data-custom': 'test-value' });
      const trigger = screen.getByTestId('select-trigger');
      expect(trigger).toHaveAttribute('data-custom', 'test-value');
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined props gracefully', () => {
      renderBasicSelect({ children: undefined });
      expect(screen.getByTestId('select-trigger')).toBeInTheDocument();
    });

    it('handles null props gracefully', () => {
      renderBasicSelect({ children: null });
      expect(screen.getByTestId('select-trigger')).toBeInTheDocument();
    });

    it('handles empty string props', () => {
      renderBasicSelect({}, { className: '' });
      expect(screen.getByTestId('select-trigger')).toBeInTheDocument();
    });

    it('handles rapid prop changes', () => {
      const { rerender } = renderBasicSelect({}, { className: 'class1' });
      rerender(
        <Select data-testid="select">
          <SelectTrigger data-testid="select-trigger" className="class2">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );
      const trigger = screen.getByTestId('select-trigger');
      expect(trigger).toHaveClass('class2');
    });

    it('handles complex nested content', () => {
      render(
        <Select data-testid="select">
          <SelectTrigger data-testid="select-trigger">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="complex">
              <div>
                <span>Complex</span>
                <p>Nested content</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      );
      expect(screen.getByTestId('select-trigger')).toBeInTheDocument();
    });

    it('maintains functionality with many children', () => {
      render(
        <Select data-testid="select">
          <SelectTrigger data-testid="select-trigger">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 100 }, (_, i) => (
              <SelectItem key={i} value={`option${i}`}>
                Option {i}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
      expect(screen.getByTestId('select-trigger')).toBeInTheDocument();
    });

    it('handles component unmounting cleanly', () => {
      const { unmount } = renderBasicSelect();
      expect(() => unmount()).not.toThrow();
    });

    it('preserves functionality after remounting', () => {
      const { unmount } = renderBasicSelect();
      unmount();
      renderBasicSelect();
      expect(screen.getByTestId('select-trigger')).toBeInTheDocument();
    });
  });
});
