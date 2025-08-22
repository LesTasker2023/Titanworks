'use client';

import { cn } from '@/lib/utils';
import {
  Archive,
  BarChart,
  Bell,
  Briefcase,
  Building,
  Calendar,
  Clock,
  Code,
  Copy,
  CreditCard,
  Database,
  DollarSign,
  Eye,
  FileText,
  Globe,
  GraduationCap,
  Heart,
  HelpCircle,
  Home,
  LineChart,
  Lock,
  Mail,
  Menu,
  MessageSquare,
  Monitor,
  Package,
  PieChart,
  Search,
  Settings,
  Share,
  Shield,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Star,
  Tablet,
  Tag,
  Target,
  TrendingUp,
  User,
  Users,
  X,
  Zap,
} from 'lucide-react';
import React, { useState } from 'react';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card } from '../Card';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './NavigationMenu';

export default function NavigationMenuDemo() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [recentActions, setRecentActions] = useState<string[]>([]);
  const [notifications] = useState(3);
  const [cartItems] = useState(5);

  const addRecentAction = (action: string) => {
    setRecentActions(prev => [action, ...prev.slice(0, 4)]);
  };

  const handleNavigation = (item: string) => {
    addRecentAction(`Navigated to ${item}`);
    setSelectedCategory(item);
  };

  // Sample data for different navigation sections
  const productCategories = [
    {
      name: 'Electronics',
      icon: Smartphone,
      items: ['Phones', 'Laptops', 'Tablets', 'Headphones'],
    },
    { name: 'Clothing', icon: Package, items: ['Men', 'Women', 'Kids', 'Accessories'] },
    { name: 'Home & Garden', icon: Home, items: ['Furniture', 'Decor', 'Garden', 'Kitchen'] },
    { name: 'Sports', icon: Target, items: ['Fitness', 'Outdoor', 'Team Sports', 'Equipment'] },
  ];

  const companyInfo = [
    { title: 'About Us', description: 'Learn about our company history and mission' },
    { title: 'Careers', description: 'Join our growing team' },
    { title: 'Press', description: 'Latest news and press releases' },
    { title: 'Contact', description: 'Get in touch with our team' },
  ];

  const resources = [
    { title: 'Documentation', description: 'Complete API and integration guides', icon: FileText },
    { title: 'Tutorials', description: 'Step-by-step learning materials', icon: GraduationCap },
    { title: 'Community', description: 'Connect with other developers', icon: Users },
    { title: 'Support', description: '24/7 customer support', icon: HelpCircle },
  ];

  const ListItem = React.forwardRef<
    React.ElementRef<'a'>,
    React.ComponentPropsWithoutRef<'a'> & {
      title: string;
      children: React.ReactNode;
      icon?: React.ElementType;
    }
  >(({ className, title, children, icon: Icon, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className
            )}
            {...props}
            onClick={() => handleNavigation(title)}
          >
            <div className="flex items-center gap-2">
              {Icon && <Icon className="h-4 w-4" />}
              <div className="text-sm font-medium leading-none">{title}</div>
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  });
  ListItem.displayName = 'ListItem';

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">NavigationMenu Component</h1>
        <p className="text-muted-foreground">
          Professional site navigation with mega menus, dropdowns, and mobile responsiveness
        </p>
      </div>

      {/* Recent Actions */}
      {recentActions.length > 0 && (
        <Card className="p-4 bg-muted/50">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">Recent Navigation:</span>
            <div className="flex gap-2">
              {recentActions.map((action, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {action}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* E-commerce Navigation */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">E-commerce Navigation</h3>
          <p className="text-sm text-muted-foreground">
            Complete storefront navigation with product categories and user actions
          </p>

          <div className="border rounded-lg p-4 bg-background">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold">ShopMart</h2>
                <NavigationMenu className="hidden md:flex">
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                          <div className="row-span-3">
                            <NavigationMenuLink asChild>
                              <button
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md text-left"
                                onClick={() => handleNavigation('Featured Products')}
                              >
                                <Star className="h-6 w-6" />
                                <div className="mb-2 mt-4 text-lg font-medium">
                                  Featured Products
                                </div>
                                <p className="text-sm leading-tight text-muted-foreground">
                                  Discover our best-selling and trending items
                                </p>
                              </button>
                            </NavigationMenuLink>
                          </div>
                          <div className="grid gap-1">
                            {productCategories.map(category => {
                              const Icon = category.icon;
                              return (
                                <ListItem key={category.name} title={category.name} icon={Icon}>
                                  {category.items.join(', ')}
                                </ListItem>
                              );
                            })}
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Deals</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-3 p-6 md:w-[400px]">
                          <div className="grid gap-1">
                            <ListItem title="Flash Sales" icon={Zap}>
                              Limited time offers with up to 50% off
                            </ListItem>
                            <ListItem title="Clearance" icon={Tag}>
                              Last chance items at amazing prices
                            </ListItem>
                            <ListItem title="Bundle Deals" icon={Package}>
                              Save more when you buy together
                            </ListItem>
                            <ListItem title="Daily Specials" icon={Calendar}>
                              New deals every day of the week
                            </ListItem>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuLink
                        className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                        href="/about"
                        onClick={() => handleNavigation('About')}
                      >
                        About
                      </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuLink
                        className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                        href="/contact"
                        onClick={() => handleNavigation('Contact')}
                      >
                        Contact
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>

              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="relative">
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  {notifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs">
                      {notifications}
                    </Badge>
                  )}
                  <span className="sr-only">Notifications</span>
                </Button>
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="h-4 w-4" />
                  {cartItems > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs">
                      {cartItems}
                    </Badge>
                  )}
                  <span className="sr-only">Cart</span>
                </Button>
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4" />
                  <span className="sr-only">Account</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </div>
            </div>

            {mobileMenuOpen && (
              <div className="md:hidden border-t pt-4">
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <Package className="mr-2 h-4 w-4" />
                    Products
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Tag className="mr-2 h-4 w-4" />
                    Deals
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Building className="mr-2 h-4 w-4" />
                    About
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="text-sm text-muted-foreground">
            Selected: <Badge variant="outline">{selectedCategory || 'None'}</Badge>
          </div>
        </div>
      </Card>

      {/* Corporate Website Navigation */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Corporate Website Navigation</h3>
          <p className="text-sm text-muted-foreground">
            Professional business website navigation with comprehensive sections
          </p>

          <div className="border rounded-lg p-4 bg-background">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    AC
                  </div>
                  <span className="font-semibold">Acme Corp</span>
                </div>

                <NavigationMenu className="hidden lg:flex">
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-3 p-6 md:w-[500px] lg:w-[600px] lg:grid-cols-2">
                          <div className="space-y-3">
                            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
                              By Industry
                            </h4>
                            <div className="grid gap-1">
                              <ListItem title="Healthcare" icon={Heart}>
                                Secure solutions for medical professionals
                              </ListItem>
                              <ListItem title="Finance" icon={DollarSign}>
                                Banking and fintech applications
                              </ListItem>
                              <ListItem title="Education" icon={GraduationCap}>
                                Learning management systems
                              </ListItem>
                              <ListItem title="Retail" icon={ShoppingBag}>
                                E-commerce and point-of-sale solutions
                              </ListItem>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
                              By Technology
                            </h4>
                            <div className="grid gap-1">
                              <ListItem title="Cloud Computing" icon={Globe}>
                                Scalable cloud infrastructure
                              </ListItem>
                              <ListItem title="AI & Machine Learning" icon={Zap}>
                                Intelligent automation solutions
                              </ListItem>
                              <ListItem title="Data Analytics" icon={BarChart}>
                                Business intelligence and insights
                              </ListItem>
                              <ListItem title="Cybersecurity" icon={Shield}>
                                Enterprise security solutions
                              </ListItem>
                            </div>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-3 p-6 md:w-[400px]">
                          <div className="grid gap-1">
                            <ListItem title="Enterprise Platform" icon={Database}>
                              Comprehensive business management suite
                            </ListItem>
                            <ListItem title="Mobile Apps" icon={Smartphone}>
                              iOS and Android applications
                            </ListItem>
                            <ListItem title="API Suite" icon={Code}>
                              Developer tools and integrations
                            </ListItem>
                            <ListItem title="Analytics Dashboard" icon={PieChart}>
                              Real-time business intelligence
                            </ListItem>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-3 p-6 md:w-[500px] lg:grid-cols-2">
                          {resources.map(resource => {
                            const Icon = resource.icon;
                            return (
                              <ListItem key={resource.title} title={resource.title} icon={Icon}>
                                {resource.description}
                              </ListItem>
                            );
                          })}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Company</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-3 p-6 md:w-[400px]">
                          <div className="grid gap-1">
                            {companyInfo.map(item => (
                              <ListItem key={item.title} title={item.title}>
                                {item.description}
                              </ListItem>
                            ))}
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuLink
                        className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                        href="/pricing"
                        onClick={() => handleNavigation('Pricing')}
                      >
                        Pricing
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
                <Button size="sm">Get Started</Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Dashboard Navigation */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Dashboard Navigation</h3>
          <p className="text-sm text-muted-foreground">
            Application dashboard navigation with user context and quick actions
          </p>

          <div className="border rounded-lg p-4 bg-background">
            <div className="flex items-center justify-between mb-4">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      <Home className="mr-2 h-4 w-4" />
                      Dashboard
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-6 md:w-[400px]">
                        <div className="grid gap-1">
                          <ListItem title="Overview" icon={BarChart}>
                            Key metrics and performance indicators
                          </ListItem>
                          <ListItem title="Analytics" icon={LineChart}>
                            Detailed data analysis and trends
                          </ListItem>
                          <ListItem title="Reports" icon={FileText}>
                            Generate and download reports
                          </ListItem>
                          <ListItem title="Real-time Monitoring" icon={TrendingUp}>
                            Live system status and alerts
                          </ListItem>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      <Users className="mr-2 h-4 w-4" />
                      Workspace
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-6 md:w-[500px] lg:grid-cols-2">
                        <div className="space-y-3">
                          <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
                            Projects
                          </h4>
                          <div className="grid gap-1">
                            <ListItem title="Active Projects" icon={Briefcase}>
                              Currently in progress
                            </ListItem>
                            <ListItem title="Templates" icon={Copy}>
                              Project templates and starters
                            </ListItem>
                            <ListItem title="Archive" icon={Archive}>
                              Completed and archived projects
                            </ListItem>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
                            Collaboration
                          </h4>
                          <div className="grid gap-1">
                            <ListItem title="Team Members" icon={Users}>
                              Manage workspace users
                            </ListItem>
                            <ListItem title="Shared Files" icon={Share}>
                              Documents and resources
                            </ListItem>
                            <ListItem title="Discussions" icon={MessageSquare}>
                              Team conversations
                            </ListItem>
                          </div>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-6 md:w-[400px]">
                        <div className="grid gap-1">
                          <ListItem title="Account Settings" icon={User}>
                            Profile and personal preferences
                          </ListItem>
                          <ListItem title="Workspace Settings" icon={Building}>
                            Team and organization settings
                          </ListItem>
                          <ListItem title="Integrations" icon={Zap}>
                            Third-party app connections
                          </ListItem>
                          <ListItem title="Security" icon={Lock}>
                            Password and authentication settings
                          </ListItem>
                          <ListItem title="Billing" icon={CreditCard}>
                            Subscription and payment details
                          </ListItem>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm">
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs">2</Badge>
                  <span className="sr-only">Notifications</span>
                </Button>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-full w-full rounded-full flex items-center justify-center text-white text-sm font-medium">
                      JD
                    </div>
                  </Avatar>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">Premium User</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Responsive Behavior */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Responsive Navigation Patterns</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Monitor className="h-4 w-4 text-blue-500" />
                <h4 className="font-medium">Desktop (lg+)</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Full horizontal navigation</p>
                <p>• Mega menu dropdowns</p>
                <p>• Hover and focus states</p>
                <p>• Keyboard navigation</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Tablet className="h-4 w-4 text-green-500" />
                <h4 className="font-medium">Tablet (md)</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Condensed navigation</p>
                <p>• Simplified dropdowns</p>
                <p>• Touch-friendly targets</p>
                <p>• Icon with label display</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-purple-500" />
                <h4 className="font-medium">Mobile (sm)</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Hamburger menu toggle</p>
                <p>• Collapsible navigation</p>
                <p>• Full-width menu items</p>
                <p>• Gesture-friendly design</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Best Practices */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Navigation Best Practices</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-blue-500" />
                <h4 className="font-medium">Visual Hierarchy</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Clear navigation structure</p>
                <p>• Consistent visual patterns</p>
                <p>• Active state indicators</p>
                <p>• Logical content grouping</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-green-500" />
                <h4 className="font-medium">User Experience</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Intuitive navigation paths</p>
                <p>• Quick access to key features</p>
                <p>• Breadcrumb navigation</p>
                <p>• Search functionality</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-purple-500" />
                <h4 className="font-medium">Accessibility</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Keyboard navigation support</p>
                <p>• Screen reader compatibility</p>
                <p>• Focus management</p>
                <p>• ARIA labels and landmarks</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
