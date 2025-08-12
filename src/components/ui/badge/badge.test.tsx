import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Link from 'next/link';
import { describe, expect, it, vi } from 'vitest';
import { Badge } from './badge';

describe('Badge Component', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Badge data-testid="badge">Badge content</Badge>);

      const badge = screen.getByTestId('badge');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('badge', 'badge--default');
      expect(badge).toHaveTextContent('Badge content');
    });

    it('renders with custom className', () => {
      render(
        <Badge className="custom-badge" data-testid="badge">
          Badge
        </Badge>
      );

      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass('badge', 'badge--default', 'custom-badge');
    });

    it('renders as child component when asChild is true', () => {
      render(
        <Badge asChild data-testid="custom-badge">
          <span>Custom badge element</span>
        </Badge>
      );

      const badge = screen.getByTestId('custom-badge');
      expect(badge.tagName).toBe('SPAN');
      expect(badge).toHaveClass('badge', 'badge--default');
    });

    it('forwards ref correctly', () => {
      const ref = { current: null };
      render(
        <Badge ref={ref} data-testid="badge">
          Badge
        </Badge>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      render(
        <Badge variant="default" data-testid="badge">
          Default
        </Badge>
      );

      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass('badge--default');
    });

    it('renders secondary variant', () => {
      render(
        <Badge variant="secondary" data-testid="badge">
          Secondary
        </Badge>
      );

      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass('badge--secondary');
    });

    it('renders destructive variant', () => {
      render(
        <Badge variant="destructive" data-testid="badge">
          Destructive
        </Badge>
      );

      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass('badge--destructive');
    });

    it('renders outline variant', () => {
      render(
        <Badge variant="outline" data-testid="badge">
          Outline
        </Badge>
      );

      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass('badge--outline');
    });
  });

  describe('AsChild Functionality', () => {
    it('renders as Link when asChild is true', () => {
      render(
        <Badge asChild data-testid="badge-link">
          <Link href="/test">Link Badge</Link>
        </Badge>
      );

      const badge = screen.getByTestId('badge-link');
      expect(badge.tagName).toBe('A');
      expect(badge).toHaveClass('badge', 'badge--default');
      expect(badge).toHaveAttribute('href', '/test');
    });

    it('renders as button when asChild is true', () => {
      render(
        <Badge asChild data-testid="badge-button">
          <button type="button">Button Badge</button>
        </Badge>
      );

      const badge = screen.getByTestId('badge-button');
      expect(badge.tagName).toBe('BUTTON');
      expect(badge).toHaveClass('badge', 'badge--default');
      expect(badge).toHaveAttribute('type', 'button');
    });

    it('preserves variant classes when asChild is true', () => {
      render(
        <Badge asChild variant="destructive" data-testid="badge-link">
          <Link href="/delete">Delete Link</Link>
        </Badge>
      );

      const badge = screen.getByTestId('badge-link');
      expect(badge).toHaveClass('badge', 'badge--destructive');
    });
  });

  describe('Content and Children', () => {
    it('renders text content', () => {
      render(<Badge>Simple text</Badge>);

      expect(screen.getByText('Simple text')).toBeInTheDocument();
    });

    it('renders with SVG icons', () => {
      render(
        <Badge data-testid="badge-with-icon">
          <svg data-testid="icon">
            <circle cx="12" cy="12" r="10" />
          </svg>
          With Icon
        </Badge>
      );

      expect(screen.getByTestId('badge-with-icon')).toBeInTheDocument();
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByText('With Icon')).toBeInTheDocument();
    });

    it('renders complex nested content', () => {
      render(
        <Badge data-testid="complex-badge">
          <span>Nested</span>
          <strong>Content</strong>
        </Badge>
      );

      const badge = screen.getByTestId('complex-badge');
      expect(badge).toBeInTheDocument();
      expect(screen.getByText('Nested')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('handles empty content gracefully', () => {
      render(<Badge data-testid="empty-badge"></Badge>);

      const badge = screen.getByTestId('empty-badge');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('badge', 'badge--default');
    });
  });

  describe('Interactions', () => {
    it('handles click events when rendered as button', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Badge asChild>
          <button onClick={handleClick} data-testid="clickable-badge">
            Click me
          </button>
        </Badge>
      );

      const badge = screen.getByTestId('clickable-badge');
      await user.click(badge);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard events when rendered as button', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Badge asChild>
          <button onClick={handleClick} data-testid="keyboard-badge">
            Press me
          </button>
        </Badge>
      );

      const badge = screen.getByTestId('keyboard-badge');
      badge.focus();
      await user.keyboard('{Enter}');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('navigates when rendered as Link', () => {
      render(
        <Badge asChild data-testid="nav-badge">
          <Link href="/navigation">Navigate</Link>
        </Badge>
      );

      const badge = screen.getByTestId('nav-badge');
      expect(badge).toHaveAttribute('href', '/navigation');
    });
  });

  describe('Accessibility', () => {
    it('has correct role when rendered as div', () => {
      render(<Badge data-testid="badge">Default badge</Badge>);

      const badge = screen.getByTestId('badge');
      // div elements don't have implicit roles, which is correct for badges
      expect(badge).not.toHaveAttribute('role');
    });

    it('supports aria-label', () => {
      render(
        <Badge aria-label="5 unread messages" data-testid="badge">
          5
        </Badge>
      );

      const badge = screen.getByTestId('badge');
      expect(badge).toHaveAttribute('aria-label', '5 unread messages');
    });

    it('supports aria-describedby', () => {
      render(
        <div>
          <Badge aria-describedby="description" data-testid="badge">
            Status
          </Badge>
          <div id="description">Current status indicator</div>
        </div>
      );

      const badge = screen.getByTestId('badge');
      expect(badge).toHaveAttribute('aria-describedby', 'description');
    });

    it('supports role attribute for semantic meaning', () => {
      render(
        <Badge role="status" data-testid="badge">
          Loading
        </Badge>
      );

      const badge = screen.getByTestId('badge');
      expect(badge).toHaveAttribute('role', 'status');
    });

    it('maintains accessibility when asChild is true', () => {
      render(
        <Badge asChild>
          <button aria-label="Delete item" data-testid="accessible-button">
            Delete
          </button>
        </Badge>
      );

      const badge = screen.getByTestId('accessible-button');
      expect(badge).toHaveAttribute('aria-label', 'Delete item');
      // Button elements have implicit role="button", no need to test explicit role
      expect(badge.tagName).toBe('BUTTON');
    });
  });

  describe('HTML Attributes', () => {
    it('spreads additional props', () => {
      render(
        <Badge data-testid="badge" data-custom="value" title="Tooltip text" id="custom-id">
          Badge
        </Badge>
      );

      const badge = screen.getByTestId('badge');
      expect(badge).toHaveAttribute('data-custom', 'value');
      expect(badge).toHaveAttribute('title', 'Tooltip text');
      expect(badge).toHaveAttribute('id', 'custom-id');
    });

    it('supports data-count attribute for styling', () => {
      render(
        <Badge data-count="true" data-testid="count-badge">
          42
        </Badge>
      );

      const badge = screen.getByTestId('count-badge');
      expect(badge).toHaveAttribute('data-count', 'true');
    });
  });

  describe('Badge Variants Integration', () => {
    it('renders all variants with different content types', () => {
      render(
        <div>
          <Badge variant="default" data-testid="default-text">
            Default Text
          </Badge>
          <Badge variant="secondary" data-testid="secondary-number">
            42
          </Badge>
          <Badge variant="destructive" data-testid="destructive-icon">
            <svg data-testid="alert-icon">
              <circle cx="12" cy="12" r="10" />
            </svg>
            Error
          </Badge>
          <Badge variant="outline" data-testid="outline-mixed">
            <span>Mixed</span> Content
          </Badge>
        </div>
      );

      expect(screen.getByTestId('default-text')).toHaveClass('badge--default');
      expect(screen.getByTestId('secondary-number')).toHaveClass('badge--secondary');
      expect(screen.getByTestId('destructive-icon')).toHaveClass('badge--destructive');
      expect(screen.getByTestId('outline-mixed')).toHaveClass('badge--outline');

      expect(screen.getByText('Default Text')).toBeInTheDocument();
      expect(screen.getByText('42')).toBeInTheDocument();
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.getByText('Mixed')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('Custom Styling', () => {
    it('combines custom classes with variant classes', () => {
      render(
        <Badge
          variant="destructive"
          className="custom-class another-class"
          data-testid="styled-badge"
        >
          Styled
        </Badge>
      );

      const badge = screen.getByTestId('styled-badge');
      expect(badge).toHaveClass('badge', 'badge--destructive', 'custom-class', 'another-class');
    });

    it('maintains base badge class with custom styling', () => {
      render(
        <Badge className="bg-blue-500 text-white" data-testid="custom-styled">
          Custom Blue
        </Badge>
      );

      const badge = screen.getByTestId('custom-styled');
      expect(badge).toHaveClass('badge', 'badge--default', 'bg-blue-500', 'text-white');
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined variant gracefully', () => {
      render(
        <Badge variant={undefined} data-testid="undefined-variant">
          Test
        </Badge>
      );

      const badge = screen.getByTestId('undefined-variant');
      expect(badge).toHaveClass('badge', 'badge--default');
    });

    it('handles null children gracefully', () => {
      render(<Badge data-testid="null-children">{null}</Badge>);

      const badge = screen.getByTestId('null-children');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('badge', 'badge--default');
    });

    it('handles boolean children gracefully', () => {
      render(<Badge data-testid="boolean-children">{true}</Badge>);

      const badge = screen.getByTestId('boolean-children');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('badge', 'badge--default');
    });

    it('handles zero as valid content', () => {
      render(<Badge data-testid="zero-content">{0}</Badge>);

      const badge = screen.getByTestId('zero-content');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveTextContent('0');
    });
  });
});
