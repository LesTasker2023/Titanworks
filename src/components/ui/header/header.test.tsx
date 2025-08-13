import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Header } from './Header';

describe('Header', () => {
  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<Header>Header Content</Header>);

      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass('header');
      expect(header).toHaveClass('header--default');
      expect(header).toHaveClass('header--md');
    });

    it('renders children correctly', () => {
      render(
        <Header>
          <div data-testid="header-content">Test Content</div>
        </Header>
      );

      expect(screen.getByTestId('header-content')).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Header className="custom-header">Content</Header>);

      const header = screen.getByRole('banner');
      expect(header).toHaveClass('custom-header');
      expect(header).toHaveClass('header');
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      render(<Header variant="default">Content</Header>);

      const header = screen.getByRole('banner');
      expect(header).toHaveClass('header--default');
    });

    it('renders elevated variant', () => {
      render(<Header variant="elevated">Content</Header>);

      const header = screen.getByRole('banner');
      expect(header).toHaveClass('header--elevated');
    });

    it('renders glass variant', () => {
      render(<Header variant="glass">Content</Header>);

      const header = screen.getByRole('banner');
      expect(header).toHaveClass('header--glass');
    });

    it('renders branded variant', () => {
      render(<Header variant="branded">Content</Header>);

      const header = screen.getByRole('banner');
      expect(header).toHaveClass('header--branded');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<Header size="sm">Content</Header>);

      const header = screen.getByRole('banner');
      expect(header).toHaveClass('header--sm');
    });

    it('renders medium size (default)', () => {
      render(<Header size="md">Content</Header>);

      const header = screen.getByRole('banner');
      expect(header).toHaveClass('header--md');
    });

    it('renders large size', () => {
      render(<Header size="lg">Content</Header>);

      const header = screen.getByRole('banner');
      expect(header).toHaveClass('header--lg');
    });
  });

  describe('AsChild Behavior', () => {
    it('renders as header by default', () => {
      render(<Header>Content</Header>);

      const element = screen.getByRole('banner');
      expect(element.tagName).toBe('HEADER');
    });

    it('supports asChild prop', () => {
      render(
        <Header asChild>
          <div data-testid="custom-element">Custom Content</div>
        </Header>
      );

      const element = screen.getByTestId('custom-element');
      expect(element).toBeInTheDocument();
      expect(element).toHaveClass('header');
      expect(element.tagName).toBe('DIV');
    });
  });

  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      render(<Header>Navigation Content</Header>);

      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
    });

    it('supports keyboard navigation', () => {
      render(
        <Header>
          <button>Focusable Button</button>
        </Header>
      );

      const button = screen.getByRole('button', { name: 'Focusable Button' });
      button.focus();
      expect(button).toHaveFocus();
    });
  });

  describe('Custom Props', () => {
    it('forwards additional props to header element', () => {
      render(
        <Header data-testid="custom-header" id="main-header" role="banner">
          Content
        </Header>
      );

      const header = screen.getByTestId('custom-header');
      expect(header).toHaveAttribute('id', 'main-header');
      expect(header).toHaveAttribute('role', 'banner');
    });
  });

  describe('Variant + Size Combinations', () => {
    it('applies both variant and size classes', () => {
      render(
        <Header variant="branded" size="lg">
          Content
        </Header>
      );

      const header = screen.getByRole('banner');
      expect(header).toHaveClass('header--branded');
      expect(header).toHaveClass('header--lg');
    });

    it('handles all variant-size combinations correctly', () => {
      const variants = ['default', 'elevated', 'glass', 'branded'] as const;
      const sizes = ['sm', 'md', 'lg'] as const;

      variants.forEach(variant => {
        sizes.forEach(size => {
          const { unmount } = render(
            <Header variant={variant} size={size}>
              {variant} {size}
            </Header>
          );

          const header = screen.getByRole('banner');
          expect(header).toHaveClass(`header--${variant}`);
          expect(header).toHaveClass(`header--${size}`);

          unmount();
        });
      });
    });
  });
});
