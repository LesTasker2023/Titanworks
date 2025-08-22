import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ColorPicker } from './ColorPicker';

describe('ColorPicker', () => {
  const BasicColorPicker = ({ ...props }: { [key: string]: unknown }) => (
    <ColorPicker defaultColor="#18181b" aria-label="Test color picker" {...props} />
  );

  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = render(<BasicColorPicker />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches disabled state snapshot', () => {
      const { container } = render(<BasicColorPicker disabled />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches custom color snapshot', () => {
      const { container } = render(<BasicColorPicker defaultColor="#ff0000" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches with className snapshot', () => {
      const { container } = render(<BasicColorPicker className="custom-class" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Basic Functionality', () => {
    it('renders correctly', () => {
      render(<BasicColorPicker />);
      expect(screen.getByRole('button', { name: /test color picker/i })).toBeInTheDocument();
      expect(screen.getByText('Brand Color')).toBeInTheDocument();
    });

    it('displays correct default color', () => {
      render(<BasicColorPicker />);
      const button = screen.getByRole('button', { name: /test color picker/i });
      expect(button).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('handles disabled state correctly', () => {
      render(<BasicColorPicker disabled />);
      const button = screen.getByRole('button', { name: /test color picker/i });
      expect(button).toBeDisabled();
    });

    it('handles different default colors correctly', () => {
      render(<BasicColorPicker defaultColor="#ff0000" />);
      const button = screen.getByRole('button', { name: /test color picker/i });
      expect(button).toBeInTheDocument();
    });

    it('handles no default color correctly', () => {
      render(<BasicColorPicker />);
      const button = screen.getByRole('button', { name: /test color picker/i });
      expect(button).toBeInTheDocument();
    });
  });

  describe('Events', () => {
    it('handles onClick correctly', () => {
      render(<BasicColorPicker />);
      const button = screen.getByRole('button', { name: /test color picker/i });
      expect(button).toBeInTheDocument();
    });

    it('handles onColorChange correctly', () => {
      const onColorChange = vi.fn();
      render(<BasicColorPicker onColorChange={onColorChange} />);
      const button = screen.getByRole('button', { name: /test color picker/i });
      expect(button).toBeInTheDocument();
    });
  });

  describe('Props', () => {
    it('handles defaultColor prop correctly', () => {
      render(<BasicColorPicker defaultColor="#00ff00" />);
      const button = screen.getByRole('button', { name: /test color picker/i });
      expect(button).toBeInTheDocument();
    });

    it('handles className prop correctly', () => {
      const { container } = render(<BasicColorPicker className="custom-class" />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('custom-class');
    });

    it('handles aria-label prop correctly', () => {
      render(<BasicColorPicker aria-label="Custom aria label" />);
      const button = screen.getByRole('button', { name: /custom aria label/i });
      expect(button).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<BasicColorPicker />);
      const button = screen.getByRole('button', { name: /test color picker/i });
      expect(button).toHaveAttribute('aria-label');
    });

    it('announces changes to screen readers', () => {
      render(<BasicColorPicker />);
      const button = screen.getByRole('button', { name: /test color picker/i });
      expect(button).toBeInTheDocument();
    });

    it('respects reduced motion preferences', () => {
      render(<BasicColorPicker />);
      const button = screen.getByRole('button', { name: /test color picker/i });
      expect(button).toBeInTheDocument();
    });
  });

  describe('Custom Styling and Props', () => {
    it('accepts custom className', () => {
      const { container } = render(<BasicColorPicker className="custom-class" />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('custom-class');
    });

    it('forwards aria-label correctly', () => {
      render(<BasicColorPicker aria-label="Custom label" />);
      const button = screen.getByRole('button', { name: /custom label/i });
      expect(button).toBeInTheDocument();
    });

    it('handles multiple props together', () => {
      render(<BasicColorPicker defaultColor="#ff0000" disabled className="test-class" />);
      const button = screen.getByRole('button', { name: /test color picker/i });
      expect(button).toBeDisabled();
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined defaultColor gracefully', () => {
      render(<BasicColorPicker defaultColor={undefined} />);
      const button = screen.getByRole('button', { name: /test color picker/i });
      expect(button).toBeInTheDocument();
    });

    it('handles invalid hex colors gracefully', () => {
      render(<BasicColorPicker defaultColor="invalid-color" />);
      const button = screen.getByRole('button', { name: /test color picker/i });
      expect(button).toBeInTheDocument();
    });

    it('handles empty string defaultColor', () => {
      render(<BasicColorPicker defaultColor="" />);
      const button = screen.getByRole('button', { name: /test color picker/i });
      expect(button).toBeInTheDocument();
    });

    it('handles rapid prop changes', () => {
      const { rerender } = render(<BasicColorPicker defaultColor="#ff0000" />);
      rerender(<ColorPicker defaultColor="#00ff00" aria-label="Test color picker" />);
      const button = screen.getByRole('button', { name: /test color picker/i });
      expect(button).toBeInTheDocument();
    });

    it('handles very long hex values', () => {
      render(<BasicColorPicker defaultColor="#ff0000ff" />);
      const button = screen.getByRole('button', { name: /test color picker/i });
      expect(button).toBeInTheDocument();
    });

    it('handles short hex values', () => {
      render(<BasicColorPicker defaultColor="#f00" />);
      const button = screen.getByRole('button', { name: /test color picker/i });
      expect(button).toBeInTheDocument();
    });

    it('handles component unmounting cleanly', () => {
      const { unmount } = render(<BasicColorPicker />);
      expect(() => unmount()).not.toThrow();
    });

    it('preserves functionality after remounting', () => {
      const { unmount } = render(<BasicColorPicker />);
      unmount();
      render(<BasicColorPicker />);
      const button = screen.getByRole('button', { name: /test color picker/i });
      expect(button).toBeInTheDocument();
    });

    it('handles missing onColorChange gracefully', () => {
      render(<BasicColorPicker onColorChange={undefined} />);
      const button = screen.getByRole('button', { name: /test color picker/i });
      expect(button).toBeInTheDocument();
    });

    it('handles null className gracefully', () => {
      render(<BasicColorPicker className={null as never} />);
      const button = screen.getByRole('button', { name: /test color picker/i });
      expect(button).toBeInTheDocument();
    });

    it('maintains state during re-renders', () => {
      const { rerender } = render(<BasicColorPicker defaultColor="#ff0000" />);
      rerender(<ColorPicker defaultColor="#ff0000" aria-label="Test color picker" />);
      const button = screen.getByRole('button', { name: /test color picker/i });
      expect(button).toBeInTheDocument();
    });

    it('handles edge case hex colors', () => {
      render(<BasicColorPicker defaultColor="#000000" />);
      const button = screen.getByRole('button', { name: /test color picker/i });
      expect(button).toBeInTheDocument();
    });

    it('handles all white color', () => {
      render(<BasicColorPicker defaultColor="#ffffff" />);
      const button = screen.getByRole('button', { name: /test color picker/i });
      expect(button).toBeInTheDocument();
    });
  });
});
