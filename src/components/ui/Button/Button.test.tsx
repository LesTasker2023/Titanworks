import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Button, { buttonVariants } from './button';

describe('Button Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Button>Test Button</Button>);
      const button = screen.getByRole('button', { name: 'Test Button' });
      expect(button).toBeInTheDocument();
    });

    it('renders with custom text', () => {
      render(<Button>Custom Text</Button>);
      expect(screen.getByText('Custom Text')).toBeInTheDocument();
    });

    it('renders as a button element by default', () => {
      render(<Button>Test</Button>);
      const button = screen.getByRole('button');
      expect(button.tagName).toBe('BUTTON');
    });
  });

  // Variant tests
  describe('Variants', () => {
    it('applies default variant classes', () => {
      render(<Button>Default</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-primary', 'text-primary-foreground');
    });

    it('applies destructive variant classes', () => {
      render(<Button variant="destructive">Delete</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-destructive', 'text-destructive-foreground');
    });

    it('applies outline variant classes', () => {
      render(<Button variant="outline">Outline</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('border', 'border-input', 'bg-background');
    });

    it('applies secondary variant classes', () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-secondary', 'text-secondary-foreground');
    });

    it('applies ghost variant classes', () => {
      render(<Button variant="ghost">Ghost</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('hover:bg-accent', 'hover:text-accent-foreground');
    });

    it('applies link variant classes', () => {
      render(<Button variant="link">Link</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('text-primary', 'underline-offset-4', 'hover:underline');
    });
  });

  // Size tests
  describe('Sizes', () => {
    it('applies default size classes', () => {
      render(<Button>Default Size</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-9', 'px-4', 'py-2');
    });

    it('applies small size classes', () => {
      render(<Button size="sm">Small</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-8', 'px-3', 'text-xs');
    });

    it('applies large size classes', () => {
      render(<Button size="lg">Large</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-10', 'px-8');
    });

    it('applies icon size classes', () => {
      render(<Button size="icon">🎯</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-9', 'w-9');
    });
  });

  // Event handling tests
  describe('Event Handling', () => {
    it('calls onClick handler when clicked', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', () => {
      const handleClick = vi.fn();
      render(
        <Button onClick={handleClick} disabled>
          Disabled
        </Button>
      );

      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('handles mouse events', () => {
      const handleMouseEnter = vi.fn();
      const handleMouseLeave = vi.fn();

      render(
        <Button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          Hover me
        </Button>
      );

      const button = screen.getByRole('button');
      fireEvent.mouseEnter(button);
      expect(handleMouseEnter).toHaveBeenCalledTimes(1);

      fireEvent.mouseLeave(button);
      expect(handleMouseLeave).toHaveBeenCalledTimes(1);
    });
  });

  // State tests
  describe('States', () => {
    it('applies disabled state correctly', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');

      expect(button).toBeDisabled();
      expect(button).toHaveClass('disabled:pointer-events-none', 'disabled:opacity-50');
    });

    it('applies loading state correctly', () => {
      render(<Button loading>Loading</Button>);
      const button = screen.getByRole('button');

      expect(button).toBeDisabled();
      expect(button).toHaveClass('button--loading');
    });

    it('disables button when loading', () => {
      const handleClick = vi.fn();
      render(
        <Button loading onClick={handleClick}>
          Loading
        </Button>
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(handleClick).not.toHaveBeenCalled();
      expect(button).toBeDisabled();
    });

    it('applies custom className', () => {
      render(<Button className="custom-class">Custom</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('applies base SCSS class for enhancements', () => {
      render(
        <Button variant="destructive" size="lg">
          Test
        </Button>
      );
      const button = screen.getByRole('button');

      // Should have base SCSS class for enhancements
      expect(button).toHaveClass('button');

      // Should have Tailwind variant classes (not duplicated SCSS classes)
      expect(button).toHaveClass('bg-destructive', 'text-destructive-foreground');
      expect(button).toHaveClass('h-10', 'px-8'); // Large size classes

      // Should NOT have duplicate variant/size SCSS classes
      expect(button).not.toHaveClass('button--destructive');
      expect(button).not.toHaveClass('button--lg');
    });
  });

  // HTML attributes tests
  describe('HTML Attributes', () => {
    it('passes through button attributes', () => {
      render(
        <Button type="submit" name="test-button" value="test-value" aria-label="Test button">
          Submit
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toHaveAttribute('name', 'test-button');
      expect(button).toHaveAttribute('value', 'test-value');
      expect(button).toHaveAttribute('aria-label', 'Test button');
    });

    it('has correct display name', () => {
      expect(Button.displayName).toBe('Button');
    });
  });

  // asChild prop tests
  describe('asChild Prop', () => {
    it('renders as Slot when asChild is true', () => {
      render(
        <Button asChild>
          <a href="https://example.com">Link Button</a>
        </Button>
      );

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'https://example.com');
      expect(link).toHaveTextContent('Link Button');
    });

    it('applies button classes to child element when asChild is true', () => {
      render(
        <Button asChild variant="destructive" size="lg">
          <a href="https://example.com/delete">Delete Link</a>
        </Button>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveClass('bg-destructive', 'h-10', 'px-8');
    });
  });

  // Complex content tests
  describe('Complex Content', () => {
    it('renders with JSX content', () => {
      render(
        <Button>
          <span>🚀</span>
          <span>Launch</span>
        </Button>
      );

      expect(screen.getByText('🚀')).toBeInTheDocument();
      expect(screen.getByText('Launch')).toBeInTheDocument();
    });

    it('renders with loading state', () => {
      render(
        <Button disabled>
          <span className="animate-spin">⚪</span>
          Loading...
        </Button>
      );

      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.getByText('⚪')).toHaveClass('animate-spin');
    });
  });

  // Accessibility tests
  describe('Accessibility', () => {
    it('is focusable when enabled', () => {
      render(<Button>Focus me</Button>);
      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveFocus();
    });

    it('is not focusable when disabled', () => {
      render(<Button disabled>Cannot focus</Button>);
      const button = screen.getByRole('button');
      button.focus();
      expect(button).not.toHaveFocus();
    });

    it('has proper accessibility attributes', () => {
      render(<Button aria-label="Accessible button">Click</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Accessible button');
      expect(button).not.toHaveAttribute('aria-disabled');
    });

    it('has proper accessibility attributes when disabled', () => {
      render(
        <Button disabled aria-label="Disabled button">
          Disabled
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Disabled button');
      expect(button).toBeDisabled();
    });
  });
});

// Button variants utility tests
describe('buttonVariants', () => {
  it('generates correct default classes', () => {
    const classes = buttonVariants();
    expect(classes).toContain('inline-flex');
    expect(classes).toContain('bg-primary');
    expect(classes).toContain('h-9');
  });

  it('generates correct variant classes', () => {
    const destructive = buttonVariants({ variant: 'destructive' });
    expect(destructive).toContain('bg-destructive');

    const outline = buttonVariants({ variant: 'outline' });
    expect(outline).toContain('border');
  });

  it('generates correct size classes', () => {
    const small = buttonVariants({ size: 'sm' });
    expect(small).toContain('h-8');

    const large = buttonVariants({ size: 'lg' });
    expect(large).toContain('h-10');
  });

  it('combines variant and size classes', () => {
    const classes = buttonVariants({ variant: 'outline', size: 'lg' });
    expect(classes).toContain('border');
    expect(classes).toContain('h-10');
  });
});
