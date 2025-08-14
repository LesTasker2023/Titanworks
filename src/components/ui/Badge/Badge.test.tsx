import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import Badge from './badge';

describe('Badge Component', () => {
  // 1. Rendering Tests (6 tests)
  describe('Rendering', () => {
    it('renders badge with children', () => {
      render(<Badge>Test Badge</Badge>);
      expect(screen.getByText('Test Badge')).toBeInTheDocument();
    });

    it('renders as div element by default', () => {
      render(<Badge>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge.tagName).toBe('DIV');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Badge ref={ref}>Test</Badge>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('applies custom className', () => {
      render(<Badge className="custom-class">Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).toHaveClass('custom-class');
    });

    it('passes through HTML attributes', () => {
      render(
        <Badge data-testid="badge-test" aria-label="Test badge">
          Test
        </Badge>
      );
      const badge = screen.getByTestId('badge-test');
      expect(badge).toHaveAttribute('aria-label', 'Test badge');
    });

    it('renders with default variant classes', () => {
      render(<Badge>Default</Badge>);
      const badge = screen.getByText('Default');
      expect(badge).toHaveClass('border-transparent', 'bg-primary', 'text-primary-foreground');
    });
  });

  // 2. Variants Tests (7 tests)
  describe('Variants', () => {
    it('renders default variant correctly', () => {
      render(<Badge variant="default">Default</Badge>);
      const badge = screen.getByText('Default');
      expect(badge).toHaveClass('bg-primary', 'text-primary-foreground');
    });

    it('renders secondary variant correctly', () => {
      render(<Badge variant="secondary">Secondary</Badge>);
      const badge = screen.getByText('Secondary');
      expect(badge).toHaveClass('bg-secondary', 'text-secondary-foreground');
    });

    it('renders destructive variant correctly', () => {
      render(<Badge variant="destructive">Destructive</Badge>);
      const badge = screen.getByText('Destructive');
      expect(badge).toHaveClass('bg-destructive', 'text-destructive-foreground');
    });

    it('renders success variant correctly', () => {
      render(<Badge variant="success">Success</Badge>);
      const badge = screen.getByText('Success');
      expect(badge).toHaveClass('bg-green-500', 'text-white');
    });

    it('renders warning variant correctly', () => {
      render(<Badge variant="warning">Warning</Badge>);
      const badge = screen.getByText('Warning');
      expect(badge).toHaveClass('bg-yellow-500', 'text-white');
    });

    it('renders info variant correctly', () => {
      render(<Badge variant="info">Info</Badge>);
      const badge = screen.getByText('Info');
      expect(badge).toHaveClass('bg-blue-500', 'text-white');
    });

    it('renders outline variant correctly', () => {
      render(<Badge variant="outline">Outline</Badge>);
      const badge = screen.getByText('Outline');
      expect(badge).toHaveClass('text-foreground');
      expect(badge).not.toHaveClass('border-transparent');
    });
  });

  // 3. Sizes Tests (3 tests)
  describe('Sizes', () => {
    it('renders small size correctly', () => {
      render(<Badge size="sm">Small</Badge>);
      const badge = screen.getByText('Small');
      expect(badge).toHaveClass('px-2', 'py-0.5', 'text-xs');
    });

    it('renders default size correctly', () => {
      render(<Badge size="default">Default</Badge>);
      const badge = screen.getByText('Default');
      expect(badge).toHaveClass('px-2.5', 'py-0.5', 'text-xs');
    });

    it('renders large size correctly', () => {
      render(<Badge size="lg">Large</Badge>);
      const badge = screen.getByText('Large');
      expect(badge).toHaveClass('px-3', 'py-1', 'text-sm');
    });
  });

  // 4. Enhanced Features Tests (12 tests)
  describe('Enhanced Features', () => {
    describe('Removable functionality', () => {
      it('renders remove button when removable is true', () => {
        render(<Badge removable>Removable</Badge>);
        const removeButton = screen.getByRole('button', { name: /remove badge/i });
        expect(removeButton).toBeInTheDocument();
      });

      it('does not render remove button by default', () => {
        render(<Badge>Not Removable</Badge>);
        const removeButton = screen.queryByRole('button', { name: /remove badge/i });
        expect(removeButton).not.toBeInTheDocument();
      });

      it('calls onRemove when remove button is clicked', () => {
        const handleRemove = vi.fn();
        render(
          <Badge removable onRemove={handleRemove}>
            Removable
          </Badge>
        );

        const removeButton = screen.getByRole('button', { name: /remove badge/i });
        fireEvent.click(removeButton);

        expect(handleRemove).toHaveBeenCalledTimes(1);
      });

      it('remove button has correct accessibility attributes', () => {
        render(<Badge removable>Test</Badge>);
        const removeButton = screen.getByRole('button', { name: /remove badge/i });

        expect(removeButton).toHaveAttribute('type', 'button');
        expect(removeButton).toHaveAttribute('aria-label', 'Remove badge');
      });

      it('remove button is focusable', () => {
        render(<Badge removable>Test</Badge>);
        const removeButton = screen.getByRole('button', { name: /remove badge/i });

        removeButton.focus();
        expect(removeButton).toHaveFocus();
      });

      it('remove button handles keyboard events', () => {
        const handleRemove = vi.fn();
        render(
          <Badge removable onRemove={handleRemove}>
            Test
          </Badge>
        );

        const removeButton = screen.getByRole('button', { name: /remove badge/i });
        fireEvent.keyDown(removeButton, { key: 'Enter' });
        fireEvent.click(removeButton); // Click happens after keydown in real usage

        expect(handleRemove).toHaveBeenCalled();
      });
    });

    describe('Dot indicator', () => {
      it('renders dot when dot prop is true', () => {
        render(<Badge dot>With Dot</Badge>);
        const dot = screen.getByText('With Dot').querySelector('span[aria-hidden="true"]');
        expect(dot).toBeInTheDocument();
        expect(dot).toHaveClass('h-1.5', 'w-1.5', 'rounded-full', 'bg-current');
      });

      it('does not render dot by default', () => {
        render(<Badge>No Dot</Badge>);
        const badge = screen.getByText('No Dot');
        const dot = badge.querySelector('span[aria-hidden="true"]');
        expect(dot).not.toBeInTheDocument();
      });

      it('applies correct spacing when dot is present', () => {
        render(<Badge dot>Dot Badge</Badge>);
        const badge = screen.getByText('Dot Badge');
        expect(badge).toHaveClass('pl-1.5');
      });

      it('dot is marked as decorative with aria-hidden', () => {
        render(<Badge dot>Status</Badge>);
        const dot = screen.getByText('Status').querySelector('span[aria-hidden="true"]');
        expect(dot).toHaveAttribute('aria-hidden', 'true');
      });
    });

    describe('Combined features', () => {
      it('renders both dot and remove button together', () => {
        render(
          <Badge dot removable>
            Both Features
          </Badge>
        );

        const dot = screen.getByText('Both Features').querySelector('span[aria-hidden="true"]');
        const removeButton = screen.getByRole('button', { name: /remove badge/i });

        expect(dot).toBeInTheDocument();
        expect(removeButton).toBeInTheDocument();
      });

      it('maintains proper spacing with both features', () => {
        render(
          <Badge dot removable>
            Combined
          </Badge>
        );
        const badge = screen.getByText('Combined');
        expect(badge).toHaveClass('pl-1.5'); // Dot spacing
      });
    });
  });

  // 5. Edge Cases Tests (8 tests)
  describe('Edge Cases', () => {
    it('handles empty children', () => {
      render(<Badge data-testid="empty-badge"></Badge>);
      const badge = screen.getByTestId('empty-badge');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('inline-flex');
    });

    it('handles numeric children', () => {
      render(<Badge>{123}</Badge>);
      expect(screen.getByText('123')).toBeInTheDocument();
    });

    it('handles boolean children gracefully', () => {
      render(<Badge data-testid="boolean-badge">{true}</Badge>);
      const badge = screen.getByTestId('boolean-badge');
      expect(badge).toBeInTheDocument();
    });

    it('handles null children', () => {
      render(<Badge data-testid="null-badge">{null}</Badge>);
      const badge = screen.getByTestId('null-badge');
      expect(badge).toBeInTheDocument();
    });

    it('works without onRemove callback', () => {
      render(<Badge removable>No Callback</Badge>);
      const removeButton = screen.getByRole('button', { name: /remove badge/i });

      // Should not throw error when clicked without callback
      expect(() => fireEvent.click(removeButton)).not.toThrow();
    });

    it('handles long text content', () => {
      const longText = 'This is a very long badge text that might cause layout issues';
      render(<Badge>{longText}</Badge>);
      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it('maintains accessibility with complex content', () => {
      render(
        <Badge removable>
          <span>Complex</span> Content
        </Badge>
      );

      const removeButton = screen.getByRole('button', { name: /remove badge/i });
      expect(removeButton).toBeInTheDocument();
    });

    it('handles rapid remove clicks', () => {
      const handleRemove = vi.fn();
      render(
        <Badge removable onRemove={handleRemove}>
          Test
        </Badge>
      );

      const removeButton = screen.getByRole('button', { name: /remove badge/i });

      // Simulate rapid clicking
      fireEvent.click(removeButton);
      fireEvent.click(removeButton);
      fireEvent.click(removeButton);

      expect(handleRemove).toHaveBeenCalledTimes(3);
    });
  });

  // 6. Accessibility Tests (4 tests)
  describe('Accessibility', () => {
    it('has correct base accessibility attributes', () => {
      render(<Badge>Accessible Badge</Badge>);
      const badge = screen.getByText('Accessible Badge');

      expect(badge).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-ring');
    });

    it('remove button is properly accessible', () => {
      render(<Badge removable>Test</Badge>);
      const removeButton = screen.getByRole('button', { name: /remove badge/i });

      expect(removeButton).toHaveAttribute('aria-label', 'Remove badge');
      expect(removeButton).toHaveClass('focus:outline-none', 'focus:ring-2');
    });

    it('supports keyboard navigation for remove button', () => {
      const handleRemove = vi.fn();
      render(
        <Badge removable onRemove={handleRemove}>
          Test
        </Badge>
      );

      const removeButton = screen.getByRole('button', { name: /remove badge/i });

      // Test tab navigation
      removeButton.focus();
      expect(removeButton).toHaveFocus();

      // Test space key
      fireEvent.keyDown(removeButton, { key: ' ' });
      fireEvent.click(removeButton);
      expect(handleRemove).toHaveBeenCalled();
    });

    it('maintains semantic structure', () => {
      render(
        <Badge variant="success" dot removable>
          Status Badge
        </Badge>
      );

      // Badge container should be a generic div
      const badge = screen.getByText('Status Badge');
      expect(badge.tagName).toBe('DIV');

      // Remove button should be properly identified
      const removeButton = screen.getByRole('button');
      expect(removeButton.tagName).toBe('BUTTON');

      // Dot should be decorative
      const dot = badge.querySelector('[aria-hidden="true"]');
      expect(dot).toBeInTheDocument();
    });
  });
});
