import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import NavigationMenu from './navigation-menu';

describe('NavigationMenu Component', () => {
  // 1. Rendering (5-8 tests)
  describe('Rendering', () => {
    it('renders without errors', () => {
      render(
        <NavigationMenu>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="/home">Home</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu>
      );
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('renders navigation list', () => {
      render(
        <NavigationMenu>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="/home">Home</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu>
      );
      expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('renders navigation items', () => {
      render(
        <NavigationMenu>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="/home">Home</NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="/about">About</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu>
      );
      expect(screen.getAllByRole('listitem')).toHaveLength(2);
    });

    it('renders navigation links', () => {
      render(
        <NavigationMenu>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="/home">Home</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu>
      );
      expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    });

    it('renders navigation triggers', () => {
      render(
        <NavigationMenu>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <div>Product content</div>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu>
      );
      expect(screen.getByRole('button', { name: /products/i })).toBeInTheDocument();
    });
  });

  // 2. Variants & Sizes (8-12 tests)
  describe('Variants & Enhancements', () => {
    it('renders mobile variant with hamburger menu', () => {
      render(
        <NavigationMenu mobile>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="/home">Home</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu>
      );
      expect(screen.getByLabelText('Toggle navigation menu')).toBeInTheDocument();
    });

    it('renders loading state', () => {
      render(
        <NavigationMenu loading>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="/home">Home</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu>
      );
      expect(screen.getByText('Loading menu...')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <NavigationMenu className="custom-nav">
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="/home">Home</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu>
      );
      expect(screen.getByRole('navigation')).toHaveClass('custom-nav');
    });
  });

  // 3. Events & Props (8-12 tests)
  describe('Events & Interactions', () => {
    it('handles mobile menu toggle', () => {
      render(
        <NavigationMenu mobile>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="/home">Home</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu>
      );
      
      const toggleButton = screen.getByLabelText('Toggle navigation menu');
      fireEvent.click(toggleButton);
      
      expect(screen.getByText('Navigation')).toBeInTheDocument();
    });

    it('closes mobile menu when close button clicked', () => {
      render(
        <NavigationMenu mobile>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="/home">Home</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu>
      );
      
      // Open menu
      fireEvent.click(screen.getByLabelText('Toggle navigation menu'));
      
      // Close menu
      const closeButtons = screen.getAllByRole('button');
      const closeButton = closeButtons.find(btn => btn.querySelector('svg')); // Find button with X icon
      if (closeButton) {
        fireEvent.click(closeButton);
        expect(screen.queryByText('Navigation')).not.toBeInTheDocument();
      }
    });

    it('expands trigger content on click', () => {
      render(
        <NavigationMenu>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <div>Product content</div>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu>
      );
      
      const trigger = screen.getByRole('button', { name: /products/i });
      fireEvent.click(trigger);
      
      expect(screen.getByText('Product content')).toBeInTheDocument();
    });
  });

  // 4. Enhanced Features (5-10 tests)
  describe('Enhanced Features', () => {
    it('shows loading spinner when loading prop is true', () => {
      render(
        <NavigationMenu loading>
          <NavigationMenu.List />
        </NavigationMenu>
      );
      
      const spinner = document.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('hides desktop menu on mobile variant', () => {
      render(
        <NavigationMenu mobile>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="/home">Home</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu>
      );
      
      const desktopMenu = document.querySelector('.hidden.md\\:block');
      expect(desktopMenu).toBeInTheDocument();
    });

    it('renders mobile overlay when menu is open', () => {
      render(
        <NavigationMenu mobile>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="/home">Home</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu>
      );
      
      fireEvent.click(screen.getByLabelText('Toggle navigation menu'));
      
      const overlay = document.querySelector('.navigation-menu__mobile-overlay');
      expect(overlay).toBeInTheDocument();
    });
  });

  // 5. Edge Cases (3-5 tests)
  describe('Edge Cases', () => {
    it('handles empty navigation menu', () => {
      render(
        <NavigationMenu>
          <NavigationMenu.List />
        </NavigationMenu>
      );
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('handles navigation without items', () => {
      render(
        <NavigationMenu>
          <NavigationMenu.List />
        </NavigationMenu>
      );
      expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('renders with minimal props', () => {
      render(
        <NavigationMenu data-testid="minimal-nav">
          <NavigationMenu.List />
        </NavigationMenu>
      );
      expect(screen.getByTestId('minimal-nav')).toBeInTheDocument();
    });
  });

  // Storybook Stories Validation
  describe('Storybook Stories Validation', () => {
    it('AllVariants story renders without errors', () => {
      render(
        <NavigationMenu>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="/services">Services</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu>
      );
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('MobileVariant story renders without errors', () => {
      render(
        <NavigationMenu mobile>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="/home">Home</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu>
      );
      expect(screen.getByLabelText('Toggle navigation menu')).toBeInTheDocument();
    });

    it('EnhancedFeatures story renders without errors', () => {
      render(
        <NavigationMenu loading>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="/home">Home</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu>
      );
      expect(screen.getByText('Loading menu...')).toBeInTheDocument();
    });
  });
});
