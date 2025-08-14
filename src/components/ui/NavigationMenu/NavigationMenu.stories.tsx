import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './navigation-menu';

/**
 * 📋 NavigationMenu Component Stories
 *
 * Comprehensive examples of the NavigationMenu component demonstrating:
 * - All variant states (default, mobile)
 * - Interactive triggers and dropdowns
 * - Accessibility features
 * - Responsive design patterns
 * - Real-world navigation patterns
 *
 * Style Guide Compliance: ✅
 * - CVA variant system implementation
 * - Semantic HTML structure
 * - ARIA attributes for screen readers
 * - Keyboard navigation support
 * - Focus management
 */

const meta: Meta<typeof NavigationMenu> = {
  title: 'UI/NavigationMenu',
  component: NavigationMenu,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**NavigationMenu** - Enterprise-grade navigation component with dropdown support.

Features:
- **Multi-level navigation** with dropdown menus
- **Keyboard navigation** with arrow keys and Enter/Space
- **Screen reader support** with proper ARIA labels
- **Responsive design** with mobile-first approach
- **Smooth animations** for enhanced user experience

Perfect for: Main site navigation, complex menu structures, dropdown interfaces
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      description: 'Additional CSS classes',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Create 4 core story categories:
export const AllVariants: Story = {
  name: '📋 All Variants Overview',
  render: () => (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">NavigationMenu Component Variants</h3>
        <p className="text-sm text-muted-foreground">
          Complete showcase of navigation patterns and interactions
        </p>
      </div>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                <div className="grid grid-cols-2 gap-4">
                  <NavigationMenuLink href="/web-dev">
                    <div>
                      <h4 className="font-medium leading-none mb-2">Web Development</h4>
                      <p className="text-sm text-muted-foreground">Modern web solutions</p>
                    </div>
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/mobile-apps">
                    <div>
                      <h4 className="font-medium leading-none mb-2">Mobile Apps</h4>
                      <p className="text-sm text-muted-foreground">Native and cross-platform</p>
                    </div>
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/ecommerce">
                    <div>
                      <h4 className="font-medium leading-none mb-2">E-commerce</h4>
                      <p className="text-sm text-muted-foreground">Online stores & platforms</p>
                    </div>
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/consulting">
                    <div>
                      <h4 className="font-medium leading-none mb-2">Consulting</h4>
                      <p className="text-sm text-muted-foreground">Strategy & planning</p>
                    </div>
                  </NavigationMenuLink>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/services">Services</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/about">About</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/contact">Contact</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  ),
};

export const BasicNavigation: Story = {
  name: '🔗 Basic Navigation',
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/">Home</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/products">Products</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/services">Services</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/about">About</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/contact">Contact</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const DropdownNavigation: Story = {
  name: '📂 Dropdown Navigation',
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-6 w-[500px] grid-cols-2">
              <NavigationMenuLink href="/web-design">
                <div>
                  <div className="text-base font-medium">Web Design</div>
                  <div className="text-sm text-muted-foreground">
                    Create stunning websites that convert visitors into customers.
                  </div>
                </div>
              </NavigationMenuLink>
              <NavigationMenuLink href="/app-development">
                <div>
                  <div className="text-base font-medium">App Development</div>
                  <div className="text-sm text-muted-foreground">
                    Build powerful mobile and web applications.
                  </div>
                </div>
              </NavigationMenuLink>
              <NavigationMenuLink href="/ecommerce">
                <div>
                  <div className="text-base font-medium">E-commerce</div>
                  <div className="text-sm text-muted-foreground">
                    Launch your online store with our platform.
                  </div>
                </div>
              </NavigationMenuLink>
              <NavigationMenuLink href="/consulting">
                <div>
                  <div className="text-base font-medium">Consulting</div>
                  <div className="text-sm text-muted-foreground">
                    Get expert advice on your digital strategy.
                  </div>
                </div>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-6 w-[400px]">
              <div className="space-y-3">
                <NavigationMenuLink href="/enterprise">
                  <div>
                    <div className="text-base font-medium">Enterprise</div>
                    <div className="text-sm text-muted-foreground">
                      Solutions for large organizations
                    </div>
                  </div>
                </NavigationMenuLink>
                <NavigationMenuLink href="/startup">
                  <div>
                    <div className="text-base font-medium">Startup</div>
                    <div className="text-sm text-muted-foreground">Tools for growing companies</div>
                  </div>
                </NavigationMenuLink>
                <NavigationMenuLink href="/freelancer">
                  <div>
                    <div className="text-base font-medium">Freelancer</div>
                    <div className="text-sm text-muted-foreground">
                      Resources for independent professionals
                    </div>
                  </div>
                </NavigationMenuLink>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/pricing">Pricing</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/support">Support</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const AccessibilityDemo: Story = {
  name: '♿ Accessibility Features',
  render: () => (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground max-w-2xl">
        <strong>Accessibility features demonstrated:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Keyboard navigation with Tab, Enter, Space, and Arrow keys</li>
          <li>Screen reader support with proper ARIA labels</li>
          <li>Focus management and visual indicators</li>
          <li>Semantic HTML structure</li>
        </ul>
        <p className="mt-2">
          <strong>Try it:</strong> Use Tab to navigate, Enter/Space to activate, Arrow keys to move
          between menu items.
        </p>
      </div>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Accessible Menu</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-6 w-[400px]">
                <NavigationMenuLink href="/accessibility">
                  <div>
                    <div className="text-base font-medium">Accessibility Guide</div>
                    <div className="text-sm text-muted-foreground">
                      Learn about web accessibility best practices
                    </div>
                  </div>
                </NavigationMenuLink>
                <NavigationMenuLink href="/wcag">
                  <div>
                    <div className="text-base font-medium">WCAG Compliance</div>
                    <div className="text-sm text-muted-foreground">
                      Understanding WCAG 2.1 AA standards
                    </div>
                  </div>
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/tools">Accessibility Tools</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  ),
};
