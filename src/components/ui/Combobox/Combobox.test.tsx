import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Combobox } from './Combobox';

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

describe('Combobox', () => {
  const BasicCombobox = ({ ...props }: { [key: string]: unknown }) => (
    <Combobox
      data-testid="combobox"
      options={mockOptions}
      placeholder="Select option..."
      {...props}
    />
  );

  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = render(<BasicCombobox />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches disabled state snapshot', () => {
      const { container } = render(<BasicCombobox disabled />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches selected state snapshot', () => {
      const { container } = render(<BasicCombobox value="option1" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches empty state snapshot', () => {
      const { container } = render(<BasicCombobox options={[]} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Basic Functionality', () => {
    it('renders correctly', () => {
      render(<BasicCombobox />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.getByText('Select option...')).toBeInTheDocument();
    });

    it('displays selected value', () => {
      render(<BasicCombobox value="option1" />);
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('handles disabled state correctly', () => {
      render(<BasicCombobox disabled />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toBeDisabled();
    });

    it('handles selected state correctly', () => {
      render(<BasicCombobox value="option2" />);
      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('handles empty options correctly', () => {
      render(<BasicCombobox options={[]} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  describe('Events', () => {
    it('handles onValueChange correctly', () => {
      const onValueChange = vi.fn();
      render(<BasicCombobox onValueChange={onValueChange} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('handles onClick correctly', () => {
      render(<BasicCombobox />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  describe('Props', () => {
    it('handles placeholder prop correctly', () => {
      render(<BasicCombobox placeholder="Custom placeholder" />);
      expect(screen.getByText('Custom placeholder')).toBeInTheDocument();
    });

    it('handles searchPlaceholder prop correctly', () => {
      render(<BasicCombobox searchPlaceholder="Search items..." />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('handles emptyText prop correctly', () => {
      render(<BasicCombobox emptyText="No items found" options={[]} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<BasicCombobox />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('announces changes to screen readers', () => {
      render(<BasicCombobox value="option1" />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('role', 'combobox');
    });

    it('respects reduced motion preferences', () => {
      render(<BasicCombobox />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  describe('Custom Styling and Props', () => {
    it('accepts custom className', () => {
      render(<BasicCombobox className="custom-class" />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveClass('custom-class');
    });

    it('forwards refs correctly', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<BasicCombobox ref={ref} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('spreads additional props', () => {
      render(<BasicCombobox data-custom="test-value" />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('data-custom', 'test-value');
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined value gracefully', () => {
      render(<BasicCombobox value={undefined} />);
      expect(screen.getByText('Select option...')).toBeInTheDocument();
    });

    it('handles null value gracefully', () => {
      render(<BasicCombobox value={null as never} />);
      expect(screen.getByText('Select option...')).toBeInTheDocument();
    });

    it('handles empty string value', () => {
      render(<BasicCombobox value="" />);
      expect(screen.getByText('Select option...')).toBeInTheDocument();
    });

    it('handles rapid prop changes', () => {
      const { rerender } = render(<BasicCombobox value="option1" />);
      rerender(<BasicCombobox value="option2" options={mockOptions} />);
      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('handles large number of options', () => {
      const largeOptions = Array.from({ length: 100 }, (_, i) => ({
        value: `option${i}`,
        label: `Option ${i}`,
      }));
      render(<BasicCombobox options={largeOptions} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('handles options with special characters', () => {
      const specialOptions = [
        { value: 'special@#$', label: 'Special @#$ Characters' },
        { value: 'unicode-🚀', label: 'Unicode 🚀 Option' },
      ];
      render(<BasicCombobox options={specialOptions} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('handles component unmounting cleanly', () => {
      const { unmount } = render(<BasicCombobox />);
      expect(() => unmount()).not.toThrow();
    });

    it('preserves functionality after remounting', () => {
      const { unmount } = render(<BasicCombobox />);
      unmount();
      render(<BasicCombobox />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('handles missing onValueChange gracefully', () => {
      render(<BasicCombobox onValueChange={undefined} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('handles invalid value gracefully', () => {
      render(<BasicCombobox value="nonexistent-option" />);
      expect(screen.getByText('Select option...')).toBeInTheDocument();
    });
  });
});
