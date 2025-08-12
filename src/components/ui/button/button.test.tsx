import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Link from 'next/link';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './button';

describe('Button Component', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Button>Click me</Button>);

      const button = screen.getByRole('button', { name: 'Click me' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('button', 'button--default', 'button--default-size');
    });

    it('renders with custom className', () => {
      render(<Button className="custom-class">Button</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('renders as child component when asChild is true', () => {
      render(
        <Button asChild>
          <Link href="/test">Link Button</Link>
        </Button>
      );

      const link = screen.getByRole('link', { name: 'Link Button' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/test');
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      render(<Button variant="default">Default</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('button--default');
    });

    it('renders destructive variant', () => {
      render(<Button variant="destructive">Delete</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('button--destructive');
    });

    it('renders outline variant', () => {
      render(<Button variant="outline">Outline</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('button--outline');
    });

    it('renders secondary variant', () => {
      render(<Button variant="secondary">Secondary</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('button--secondary');
    });

    it('renders ghost variant', () => {
      render(<Button variant="ghost">Ghost</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('button--ghost');
    });

    it('renders link variant', () => {
      render(<Button variant="link">Link</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('button--link');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<Button size="sm">Small</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('button--sm');
    });

    it('renders default size', () => {
      render(<Button size="default">Default</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('button--default-size');
    });

    it('renders large size', () => {
      render(<Button size="lg">Large</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('button--lg');
    });

    it('renders icon size', () => {
      render(<Button size="icon">🚀</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('button--icon');
    });
  });

  describe('Interactions', () => {
    it('handles click events', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole('button');
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('is disabled when disabled prop is true', () => {
      render(<Button disabled>Disabled</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('does not trigger click when disabled', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>
      );

      const button = screen.getByRole('button');
      await user.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has correct role', () => {
      render(<Button>Accessible</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('supports aria-label', () => {
      render(<Button aria-label="Close dialog">×</Button>);

      const button = screen.getByRole('button', { name: 'Close dialog' });
      expect(button).toBeInTheDocument();
    });

    it('supports aria-describedby', () => {
      render(
        <>
          <Button aria-describedby="help-text">Submit</Button>
          <div id="help-text">This will submit the form</div>
        </>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-describedby', 'help-text');
    });

    it('has proper focus management', async () => {
      const user = userEvent.setup();

      render(<Button>Focusable</Button>);

      const button = screen.getByRole('button');
      await user.tab();

      expect(button).toHaveFocus();
    });
  });

  describe('Type attribute', () => {
    it('defaults to button type', () => {
      render(<Button>Default Type</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('can be set to submit', () => {
      render(<Button type="submit">Submit</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('can be set to reset', () => {
      render(<Button type="reset">Reset</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'reset');
    });
  });
});
