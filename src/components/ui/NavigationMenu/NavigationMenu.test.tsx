import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './navigation-menu';

describe('NavigationMenu Component', () => {
  it('renders basic navigation menu correctly', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/home">Home</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = render(<NavigationMenu>Default</NavigationMenu>);
      expect(container.firstChild).toMatchSnapshot();
    });
    it('matches all variants snapshot', () => {
      const { container } = render(
        <div data-testid="variants-container">
          <NavigationMenu variant="default">Default</NavigationMenu>
          <NavigationMenu variant="destructive">Destructive</NavigationMenu>
          <NavigationMenu variant="outline">Outline</NavigationMenu>
          <NavigationMenu variant="secondary">Secondary</NavigationMenu>
        </div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
    it('matches all sizes snapshot', () => {
      const { container } = render(
        <div data-testid="sizes-container">
          <NavigationMenu size="sm">Small</NavigationMenu>
          <NavigationMenu size="default">Default</NavigationMenu>
          <NavigationMenu size="lg">Large</NavigationMenu>
        </div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
    it('matches disabled state snapshot', () => {
      const { container } = render(<NavigationMenu disabled>Disabled</NavigationMenu>);
      expect(container.firstChild).toMatchSnapshot();
    });
    it('matches loading state snapshot', () => {
      const { container } = render(<NavigationMenu loading>Loading</NavigationMenu>);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
  it('renders with proper accessibility attributes', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/home">Home</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );

    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('renders dropdown menu with trigger and content', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/home">Home</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/about">About</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div>
                <NavigationMenuLink href="/product1">Product 1</NavigationMenuLink>
                <NavigationMenuLink href="/product2">Product 2</NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    const { container } = render(
      <NavigationMenu className="custom-nav-class">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/home">Home</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );

    expect(container.firstChild).toHaveClass('custom-nav-class');
  });

  it('handles multiple navigation items', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/home">Home</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/services">Services</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/contact">Contact</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders navigation trigger button correctly', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Dropdown Menu</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="/item1">Item 1</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );

    const trigger = screen.getByText('Dropdown Menu');
    expect(trigger).toBeInTheDocument();
    expect(trigger.tagName).toBe('BUTTON');
  });

  it('supports nested content structure', async () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Complex Menu</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid grid-cols-2 gap-4 p-4">
                <div>
                  <h4>Category 1</h4>
                  <NavigationMenuLink href="/cat1-item1">Item 1</NavigationMenuLink>
                </div>
                <div>
                  <h4>Category 2</h4>
                  <NavigationMenuLink href="/cat2-item1">Item 1</NavigationMenuLink>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );

    expect(screen.getByText('Complex Menu')).toBeInTheDocument();

    // The content is part of the dropdown structure, even if not visible initially
    // Test that the trigger is properly set up and accessible
    const trigger = screen.getByText('Complex Menu');
    expect(trigger.tagName).toBe('BUTTON');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('maintains proper HTML structure', () => {
    const { container } = render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/test">Test Link</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );

    // Check for proper semantic structure
    const nav = container.querySelector('nav');
    expect(nav).toBeInTheDocument();

    const link = screen.getByRole('link', { name: 'Test Link' });
    expect(link).toHaveAttribute('href', '/test');
  });

  it('handles empty navigation gracefully', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>{/* Empty list */}</NavigationMenuList>
      </NavigationMenu>
    );

    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('supports external links', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="https://external.com">External Link</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );

    const link = screen.getByRole('link', { name: 'External Link' });
    expect(link).toHaveAttribute('href', 'https://external.com');
  });
});
