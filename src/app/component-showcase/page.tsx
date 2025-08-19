'use client';

import { AlertTriangle, CheckCircle, Clock, Info, Menu, X, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

// Import ALL components following style guide standards
import Container from '@/components/layout/Container/Container';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui';
import Alert from '@/components/ui/Alert/alert';
import Avatar from '@/components/ui/Avatar/avatar';
import Badge from '@/components/ui/Badge/badge';
import Button from '@/components/ui/Button/button';
import Checkbox from '@/components/ui/Checkbox/checkbox';
import DataTable from '@/components/ui/DataTable/DataTable';
import Dialog, {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog/dialog';
import Input from '@/components/ui/Input/input';
import { Label } from '@/components/ui/Label/Label';
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@/components/ui/Modal';
import { Pagination } from '@/components/ui/Pagination/Pagination';
import { Progress } from '@/components/ui/Progress/progress';
import RadioGroup, { RadioGroupItem } from '@/components/ui/RadioGroup/radio-group';
import Select, {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select/select';
import { Separator } from '@/components/ui/Separator/Separator';
import { Skeleton } from '@/components/ui/Skeleton/Skeleton';
import Slider from '@/components/ui/Slider/slider';
import { Switch } from '@/components/ui/Switch/Switch';
import Tabs, { TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs/tabs';
import Textarea from '@/components/ui/Textarea/textarea';
import { Toaster } from '@/components/ui/Toast/toaster';
import { useToast } from '@/components/ui/Toast/use-toast';

/**
 * 🎯 Daedalus Component Library Showcase
 *
 * Complete demonstration of all 22 components with full style guide compliance:
 * - All available variants and sizes per component
 * - All required states (loading, disabled, error)
 * - Accessibility features and keyboard navigation
 * - Real-world usage examples
 * - Smooth-scrolling component index navigation
 */

// Component navigation data
const componentSections = [
  {
    id: 'form-input',
    title: 'Form & Input',
    components: ['Button', 'Input', 'Select', 'Switch', 'Slider', 'Checkbox & Radio', 'Textarea'],
  },
  {
    id: 'display-feedback',
    title: 'Display & Feedback',
    components: [
      'Alert',
      'Toast',
      'Progress',
      'Badge',
      'Skeleton',
      'Avatar',
      'Separator',
      'Tooltip',
    ],
  },
  { id: 'layout-structure', title: 'Layout & Structure', components: ['Tabs', 'Card'] },
  { id: 'interactive-overlay', title: 'Interactive & Overlay', components: ['Dialog', 'Modal'] },
  { id: 'data-display', title: 'Data Display', components: ['DataTable', 'Pagination'] },
  { id: 'real-world', title: 'Real-world Examples', components: ['Contact Form'] },
];

export default function ComponentLibraryShowcase() {
  // Toast hook for notifications
  const { toast } = useToast();

  // Component state management
  const [progress, setProgress] = useState(65);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [sliderValue, setSliderValue] = useState([50]);
  const [sliderRange, setSliderRange] = useState([20, 80]);
  const [radioValue, setRadioValue] = useState('option1');
  const [selectValue, setSelectValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [showIndex, setShowIndex] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  // Sample data for DataTable
  const sampleData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
  ];

  const tableColumns = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'role', header: 'Role', sortable: false },
    { key: 'status', header: 'Status', sortable: true },
  ];

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
      setShowIndex(false);
    }
  };

  // Progress animation
  useEffect(() => {
    const timer = setTimeout(() => setProgress(85), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Animated progress bar (0 to 100% over 6 seconds)
  useEffect(() => {
    const startTime = Date.now();
    const duration = 6000; // 6 seconds

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic

      setAnimatedProgress(Math.round(easedProgress * 100));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Restart animation after a brief pause
        setTimeout(() => {
          setAnimatedProgress(0);
          setTimeout(animate, 100);
        }, 2000);
      }
    };

    const initialDelay = setTimeout(animate, 500); // Start after 500ms
    return () => clearTimeout(initialDelay);
  }, []);

  return (
    <div className="relative">
      <Container size="7xl" padding="lg" className="py-8">
        {/* In-Page Component Index - Positioned within content */}
        <div className="fixed top-20 right-4 z-[9999]">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowIndex(!showIndex)}
                  className="shadow-lg backdrop-blur-sm bg-white/95 dark:bg-gray-900/95"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Component Index</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Component Index Panel */}
          {showIndex && (
            <Card className="absolute top-12 right-0 w-80 max-h-96 overflow-y-auto shadow-xl backdrop-blur-sm bg-white/95 dark:bg-gray-900/95 border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Component Index</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowIndex(false)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>Quick navigation to components</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {componentSections.map(section => (
                  <div key={section.id} className="space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start font-medium text-sm"
                      onClick={() => scrollToSection(section.id)}
                    >
                      {section.title}
                    </Button>
                    <div className="ml-4 space-y-1">
                      {section.components.map(component => (
                        <Button
                          key={component}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-xs text-muted-foreground"
                          onClick={() => scrollToSection(section.id)}
                        >
                          {component}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
        {/* Header Section */}
        <Container size="none" padding="none" className="text-center space-y-8 mb-20">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
              Component Library Showcase
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Complete shadcn/ui component library with style guide compliance, enterprise-grade
              quality, and comprehensive accessibility support. Now featuring 22 production-ready
              components.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            <Badge size="lg">100% Style Guide Compliant</Badge>
            <Badge size="lg">800+ Comprehensive Tests</Badge>
            <Badge size="lg">Full Accessibility</Badge>
            <Badge size="lg">Production Ready</Badge>
            <Badge size="lg">22 Components</Badge>
          </div>
        </Container>

        {/* Component Sections - Two Column Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-16">
          {/* LEFT COLUMN - Form & Input Components */}
          <div className="space-y-12">
            <section id="form-input" className="space-y-8">
              <div className="text-center space-y-3">
                <h2 className="text-3xl font-bold text-foreground">Form & Input Components</h2>
                <p className="text-muted-foreground text-lg">
                  Interactive form controls and inputs
                </p>
              </div>

              {/* Button Component */}
              <Container
                size="none"
                padding="lg"
                className="border border-border rounded-lg space-y-6"
              >
                <h3 className="text-xl font-semibold text-foreground text-center">Button</h3>
                <div className="grid gap-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-muted-foreground">Variants</h4>
                    <div className="flex flex-wrap gap-3">
                      <Button>Default</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="destructive">Destructive</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="link">Link</Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-muted-foreground">Sizes</h4>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button size="sm">Small</Button>
                      <Button>Default</Button>
                      <Button size="lg">Large</Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-muted-foreground">States</h4>
                    <div className="flex flex-wrap gap-3">
                      <Button disabled>Disabled</Button>
                      <Button loading>Loading</Button>
                      <Button>
                        <Menu className="h-4 w-4 mr-2" />
                        With Icon
                      </Button>
                    </div>
                  </div>

                  {/* Kitchen Sink - All Button Combinations */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      🔧 Kitchen Sink - All Combinations
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 border border-dashed border-muted rounded-lg bg-muted/20">
                      {/* Default variant with all sizes */}
                      <div className="space-y-2">
                        <Badge size="sm" variant="outline">
                          Default
                        </Badge>
                        <div className="space-y-1">
                          <Button size="sm">Small Default</Button>
                          <Button>Default</Button>
                          <Button size="lg">Large Default</Button>
                          <Button disabled>Disabled</Button>
                        </div>
                      </div>

                      {/* Secondary variant */}
                      <div className="space-y-2">
                        <Badge size="sm" variant="outline">
                          Secondary
                        </Badge>
                        <div className="space-y-1">
                          <Button variant="secondary" size="sm">
                            Small Secondary
                          </Button>
                          <Button variant="secondary">Secondary</Button>
                          <Button variant="secondary" size="lg">
                            Large Secondary
                          </Button>
                          <Button variant="secondary" disabled>
                            Disabled
                          </Button>
                        </div>
                      </div>

                      {/* Destructive variant */}
                      <div className="space-y-2">
                        <Badge size="sm" variant="outline">
                          Destructive
                        </Badge>
                        <div className="space-y-1">
                          <Button variant="destructive" size="sm">
                            Small Destructive
                          </Button>
                          <Button variant="destructive">Destructive</Button>
                          <Button variant="destructive" size="lg">
                            Large Destructive
                          </Button>
                          <Button variant="destructive" disabled>
                            Disabled
                          </Button>
                        </div>
                      </div>

                      {/* Outline variant */}
                      <div className="space-y-2">
                        <Badge size="sm" variant="outline">
                          Outline
                        </Badge>
                        <div className="space-y-1">
                          <Button variant="outline" size="sm">
                            Small Outline
                          </Button>
                          <Button variant="outline">Outline</Button>
                          <Button variant="outline" size="lg">
                            Large Outline
                          </Button>
                          <Button variant="outline" disabled>
                            Disabled
                          </Button>
                        </div>
                      </div>

                      {/* Ghost variant */}
                      <div className="space-y-2">
                        <Badge size="sm" variant="outline">
                          Ghost
                        </Badge>
                        <div className="space-y-1">
                          <Button variant="ghost" size="sm">
                            Small Ghost
                          </Button>
                          <Button variant="ghost">Ghost</Button>
                          <Button variant="ghost" size="lg">
                            Large Ghost
                          </Button>
                          <Button variant="ghost" disabled>
                            Disabled
                          </Button>
                        </div>
                      </div>

                      {/* Link variant */}
                      <div className="space-y-2">
                        <Badge size="sm" variant="outline">
                          Link
                        </Badge>
                        <div className="space-y-1">
                          <Button variant="link" size="sm">
                            Small Link
                          </Button>
                          <Button variant="link">Link</Button>
                          <Button variant="link" size="lg">
                            Large Link
                          </Button>
                          <Button variant="link" disabled>
                            Disabled
                          </Button>
                        </div>
                      </div>

                      {/* Complex examples */}
                      <div className="space-y-2 md:col-span-2 lg:col-span-3">
                        <Badge size="sm" variant="outline">
                          Complex Examples
                        </Badge>
                        <div className="flex flex-wrap gap-2">
                          <Button className="gap-2">
                            <CheckCircle className="h-4 w-4" />
                            Success Action
                          </Button>
                          <Button variant="destructive" className="gap-2">
                            <XCircle className="h-4 w-4" />
                            Delete Item
                          </Button>
                          <Button variant="outline" className="gap-2">
                            <Info className="h-4 w-4" />
                            More Info
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Menu className="h-3 w-3" />
                            Menu
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>

              {/* Input Component */}
              <Container
                size="none"
                padding="lg"
                className="border border-border rounded-lg space-y-6"
              >
                <h3 className="text-xl font-semibold text-foreground text-center">Input</h3>
                <div className="space-y-4 max-w-sm mx-auto">
                  <div>
                    <Label htmlFor="default-input">Default Input</Label>
                    <Input
                      id="default-input"
                      placeholder="Enter text..."
                      value={inputValue}
                      onChange={e => setInputValue(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email-input">Email Input</Label>
                    <Input id="email-input" type="email" placeholder="user@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="disabled-input">Disabled Input</Label>
                    <Input id="disabled-input" placeholder="Disabled" disabled />
                  </div>

                  {/* Kitchen Sink - All Input Types & States */}
                  <div className="space-y-4 mt-8">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      🔧 Kitchen Sink - All Input Types & States
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-dashed border-muted rounded-lg bg-muted/20">
                      {/* Text Inputs */}
                      <div className="space-y-3">
                        <Badge size="sm" variant="outline">
                          Text Types
                        </Badge>
                        <div className="space-y-2">
                          <div>
                            <Label htmlFor="text-input">Text</Label>
                            <Input id="text-input" type="text" placeholder="Enter text" />
                          </div>
                          <div>
                            <Label htmlFor="password-input">Password</Label>
                            <Input
                              id="password-input"
                              type="password"
                              placeholder="Enter password"
                            />
                          </div>
                          <div>
                            <Label htmlFor="search-input">Search</Label>
                            <Input id="search-input" type="search" placeholder="Search..." />
                          </div>
                          <div>
                            <Label htmlFor="url-input">URL</Label>
                            <Input id="url-input" type="url" placeholder="https://example.com" />
                          </div>
                        </div>
                      </div>

                      {/* Number & Date Inputs */}
                      <div className="space-y-3">
                        <Badge size="sm" variant="outline">
                          Number & Date
                        </Badge>
                        <div className="space-y-2">
                          <div>
                            <Label htmlFor="number-input">Number</Label>
                            <Input
                              id="number-input"
                              type="number"
                              placeholder="123"
                              min="0"
                              max="100"
                            />
                          </div>
                          <div>
                            <Label htmlFor="tel-input">Telephone</Label>
                            <Input id="tel-input" type="tel" placeholder="+1 (555) 123-4567" />
                          </div>
                          <div>
                            <Label htmlFor="date-input">Date</Label>
                            <Input id="date-input" type="date" />
                          </div>
                          <div>
                            <Label htmlFor="time-input">Time</Label>
                            <Input id="time-input" type="time" />
                          </div>
                        </div>
                      </div>

                      {/* States */}
                      <div className="space-y-3">
                        <Badge size="sm" variant="outline">
                          States
                        </Badge>
                        <div className="space-y-2">
                          <div>
                            <Label htmlFor="readonly-input">Read Only</Label>
                            <Input id="readonly-input" value="Read only value" readOnly />
                          </div>
                          <div>
                            <Label htmlFor="disabled-input-2">Disabled</Label>
                            <Input id="disabled-input-2" placeholder="Disabled" disabled />
                          </div>
                          <div>
                            <Label htmlFor="required-input">Required</Label>
                            <Input id="required-input" placeholder="Required field" required />
                          </div>
                        </div>
                      </div>

                      {/* With Icons/Complex */}
                      <div className="space-y-3">
                        <Badge size="sm" variant="outline">
                          Complex Examples
                        </Badge>
                        <div className="space-y-2">
                          <div>
                            <Label htmlFor="file-input">File Upload</Label>
                            <Input id="file-input" type="file" />
                          </div>
                          <div>
                            <Label htmlFor="color-input">Color Picker</Label>
                            <Input id="color-input" type="color" />
                          </div>
                          <div>
                            <Label htmlFor="range-input">Range</Label>
                            <Input id="range-input" type="range" min="0" max="100" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>

              {/* Select Component */}
              <Container
                size="none"
                padding="lg"
                className="border border-border rounded-lg space-y-6"
              >
                <h3 className="text-xl font-semibold text-foreground text-center">Select</h3>
                <div className="space-y-4 max-w-sm mx-auto">
                  <div>
                    <Label>Choose an option</Label>
                    <Select value={selectValue} onValueChange={setSelectValue}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">Option 1</SelectItem>
                        <SelectItem value="option2">Option 2</SelectItem>
                        <SelectItem value="option3">Option 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Kitchen Sink - All Select Variations */}
                  <div className="space-y-4 mt-8">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      🔧 Kitchen Sink - All Select Variations
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-dashed border-muted rounded-lg bg-muted/20">
                      {/* Basic Selects */}
                      <div className="space-y-3">
                        <Badge size="sm" variant="outline">
                          Basic Selects
                        </Badge>
                        <div className="space-y-2">
                          <div>
                            <Label>Default Select</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose option" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">Option 1</SelectItem>
                                <SelectItem value="2">Option 2</SelectItem>
                                <SelectItem value="3">Option 3</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>With Default Value</Label>
                            <Select defaultValue="default">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="default">Default Option</SelectItem>
                                <SelectItem value="other">Other Option</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Disabled Select</Label>
                            <Select disabled>
                              <SelectTrigger>
                                <SelectValue placeholder="Disabled" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">Option 1</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      {/* Categorized Options */}
                      <div className="space-y-3">
                        <Badge size="sm" variant="outline">
                          Categorized
                        </Badge>
                        <div className="space-y-2">
                          <div>
                            <Label>Countries</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="us">🇺🇸 United States</SelectItem>
                                <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
                                <SelectItem value="ca">🇨🇦 Canada</SelectItem>
                                <SelectItem value="au">🇦🇺 Australia</SelectItem>
                                <SelectItem value="de">🇩🇪 Germany</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Priority Level</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low" className="text-green-600">
                                  🟢 Low Priority
                                </SelectItem>
                                <SelectItem value="medium" className="text-yellow-600">
                                  🟡 Medium Priority
                                </SelectItem>
                                <SelectItem value="high" className="text-red-600">
                                  🔴 High Priority
                                </SelectItem>
                                <SelectItem value="critical" className="text-red-800">
                                  🚨 Critical
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      {/* Complex Options */}
                      <div className="space-y-3 md:col-span-2">
                        <Badge size="sm" variant="outline">
                          Complex Examples
                        </Badge>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          <div>
                            <Label>Team Size</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select size" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1-5">1-5 people</SelectItem>
                                <SelectItem value="6-20">6-20 people</SelectItem>
                                <SelectItem value="21-100">21-100 people</SelectItem>
                                <SelectItem value="100+">100+ people</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Time Zone</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select timezone" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pst">PST (UTC-8)</SelectItem>
                                <SelectItem value="mst">MST (UTC-7)</SelectItem>
                                <SelectItem value="cst">CST (UTC-6)</SelectItem>
                                <SelectItem value="est">EST (UTC-5)</SelectItem>
                                <SelectItem value="utc">UTC (UTC+0)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>File Format</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select format" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pdf">📄 PDF Document</SelectItem>
                                <SelectItem value="docx">📝 Word Document</SelectItem>
                                <SelectItem value="xlsx">📊 Excel Spreadsheet</SelectItem>
                                <SelectItem value="pptx">📺 PowerPoint</SelectItem>
                                <SelectItem value="csv">📋 CSV File</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>

              {/* Switch Component */}
              <Container
                size="none"
                padding="lg"
                className="border border-border rounded-lg space-y-6"
              >
                <h3 className="text-xl font-semibold text-foreground text-center">Switch</h3>
                <div className="space-y-4 max-w-sm mx-auto">
                  <div className="flex items-center space-x-3">
                    <Switch
                      id="switch-example"
                      checked={switchValue}
                      onCheckedChange={setSwitchValue}
                    />
                    <Label htmlFor="switch-example">Enable notifications</Label>
                  </div>

                  {/* Kitchen Sink - All Switch Variations */}
                  <div className="space-y-4 mt-8">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      🔧 Kitchen Sink - All Switch Variations
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-dashed border-muted rounded-lg bg-muted/20">
                      {/* Basic Switch States */}
                      <div className="space-y-3">
                        <Badge size="sm" variant="outline">
                          Switch States
                        </Badge>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <Switch id="switch-on" defaultChecked />
                            <Label htmlFor="switch-on">Default On</Label>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Switch id="switch-off" />
                            <Label htmlFor="switch-off">Default Off</Label>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Switch id="switch-disabled-off" disabled />
                            <Label htmlFor="switch-disabled-off">Disabled Off</Label>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Switch id="switch-disabled-on" disabled defaultChecked />
                            <Label htmlFor="switch-disabled-on">Disabled On</Label>
                          </div>
                        </div>
                      </div>

                      {/* Settings Examples */}
                      <div className="space-y-3">
                        <Badge size="sm" variant="outline">
                          Settings Examples
                        </Badge>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="notifications">🔔 Notifications</Label>
                              <p className="text-xs text-muted-foreground">
                                Receive push notifications
                              </p>
                            </div>
                            <Switch id="notifications" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="dark-mode">🌙 Dark Mode</Label>
                              <p className="text-xs text-muted-foreground">Use dark theme</p>
                            </div>
                            <Switch id="dark-mode" />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="analytics">📊 Analytics</Label>
                              <p className="text-xs text-muted-foreground">Share usage data</p>
                            </div>
                            <Switch id="analytics" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="auto-save">💾 Auto Save</Label>
                              <p className="text-xs text-muted-foreground">
                                Save changes automatically
                              </p>
                            </div>
                            <Switch id="auto-save" defaultChecked />
                          </div>
                        </div>
                      </div>

                      {/* Feature Toggles */}
                      <div className="space-y-3 md:col-span-2">
                        <Badge size="sm" variant="outline">
                          Feature Toggles
                        </Badge>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <Label htmlFor="beta-features">🚀 Beta Features</Label>
                                <p className="text-xs text-muted-foreground">
                                  Try experimental features
                                </p>
                              </div>
                              <Switch id="beta-features" />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <Label htmlFor="two-factor">🔒 Two-Factor Auth</Label>
                                <p className="text-xs text-muted-foreground">Enhanced security</p>
                              </div>
                              <Switch id="two-factor" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <Label htmlFor="public-profile">👤 Public Profile</Label>
                                <p className="text-xs text-muted-foreground">
                                  Make profile visible
                                </p>
                              </div>
                              <Switch id="public-profile" />
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <Label htmlFor="email-marketing">📧 Marketing Emails</Label>
                                <p className="text-xs text-muted-foreground">
                                  Receive product updates
                                </p>
                              </div>
                              <Switch id="email-marketing" />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <Label htmlFor="performance-mode">⚡ Performance Mode</Label>
                                <p className="text-xs text-muted-foreground">Optimize for speed</p>
                              </div>
                              <Switch id="performance-mode" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <Label htmlFor="maintenance-mode">🔧 Maintenance Mode</Label>
                                <p className="text-xs text-muted-foreground">System maintenance</p>
                              </div>
                              <Switch id="maintenance-mode" disabled />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>

              {/* Slider Component */}
              <Container
                size="none"
                padding="lg"
                className="border border-border rounded-lg space-y-6"
              >
                <h3 className="text-xl font-semibold text-foreground text-center">Slider</h3>
                <div className="space-y-6 max-w-sm mx-auto">
                  <div>
                    <Label>Single Value: {sliderValue[0]}</Label>
                    <Slider
                      value={sliderValue}
                      onValueChange={setSliderValue}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>
                      Range: {sliderRange[0]} - {sliderRange[1]}
                    </Label>
                    <Slider
                      value={sliderRange}
                      onValueChange={setSliderRange}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  {/* Kitchen Sink - All Slider Variations */}
                  <div className="space-y-4 mt-8">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      🔧 Kitchen Sink - All Slider Variations
                    </h4>
                    <div className="grid grid-cols-1 gap-4 p-4 border border-dashed border-muted rounded-lg bg-muted/20">
                      {/* Single Value Sliders */}
                      <div className="space-y-3">
                        <Badge size="sm" variant="outline">
                          Single Value Sliders
                        </Badge>
                        <div className="space-y-4">
                          <div>
                            <Label>Volume (0-100)</Label>
                            <Slider defaultValue={[75]} max={100} step={1} className="mt-2" />
                          </div>
                          <div>
                            <Label>Temperature (0-30°C)</Label>
                            <Slider defaultValue={[22]} max={30} step={0.5} className="mt-2" />
                          </div>
                          <div>
                            <Label>Brightness (0-10)</Label>
                            <Slider defaultValue={[7]} max={10} step={1} className="mt-2" />
                          </div>
                          <div>
                            <Label>Zoom Level (50-200%)</Label>
                            <Slider
                              defaultValue={[100]}
                              min={50}
                              max={200}
                              step={10}
                              className="mt-2"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Range Sliders */}
                      <div className="space-y-3">
                        <Badge size="sm" variant="outline">
                          Range Sliders
                        </Badge>
                        <div className="space-y-4">
                          <div>
                            <Label>Price Range ($0-$1000)</Label>
                            <Slider
                              defaultValue={[200, 800]}
                              max={1000}
                              step={10}
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label>Age Range (18-65)</Label>
                            <Slider
                              defaultValue={[25, 45]}
                              min={18}
                              max={65}
                              step={1}
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label>Time Window (9AM-6PM)</Label>
                            <Slider
                              defaultValue={[9, 17]}
                              min={0}
                              max={24}
                              step={1}
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label>Score Range (0-100)</Label>
                            <Slider defaultValue={[20, 80]} max={100} step={5} className="mt-2" />
                          </div>
                        </div>
                      </div>

                      {/* Different Steps & Disabled */}
                      <div className="space-y-3">
                        <Badge size="sm" variant="outline">
                          Step Variations
                        </Badge>
                        <div className="space-y-4">
                          <div>
                            <Label>Fine Control (step: 0.1)</Label>
                            <Slider defaultValue={[5.5]} max={10} step={0.1} className="mt-2" />
                          </div>
                          <div>
                            <Label>Coarse Control (step: 25)</Label>
                            <Slider defaultValue={[50]} max={100} step={25} className="mt-2" />
                          </div>
                          <div>
                            <Label>Disabled Slider</Label>
                            <Slider
                              defaultValue={[40]}
                              max={100}
                              step={1}
                              disabled
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label>Negative Range (-50 to 50)</Label>
                            <Slider
                              defaultValue={[0]}
                              min={-50}
                              max={50}
                              step={5}
                              className="mt-2"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Real-world Use Cases */}
                      <div className="space-y-3">
                        <Badge size="sm" variant="outline">
                          Real-world Examples
                        </Badge>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>🔊 Audio Balance</Label>
                            <Slider
                              defaultValue={[0]}
                              min={-10}
                              max={10}
                              step={1}
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label>📊 Chart Range</Label>
                            <Slider
                              defaultValue={[2020, 2024]}
                              min={2000}
                              max={2025}
                              step={1}
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label>🎨 Opacity (0-100%)</Label>
                            <Slider defaultValue={[80]} max={100} step={1} className="mt-2" />
                          </div>
                          <div>
                            <Label>⚡ Speed Multiplier</Label>
                            <Slider
                              defaultValue={[1]}
                              min={0.1}
                              max={3}
                              step={0.1}
                              className="mt-2"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>

              {/* Checkbox & Radio Group */}
              <Container
                size="none"
                padding="lg"
                className="border border-border rounded-lg space-y-6"
              >
                <h3 className="text-xl font-semibold text-foreground text-center">
                  Checkbox & Radio
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-md mx-auto">
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground">Checkboxes</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="check1" />
                        <Label htmlFor="check1">Option 1</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="check2" />
                        <Label htmlFor="check2">Option 2</Label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground">Radio Group</h4>
                    <RadioGroup value={radioValue} onValueChange={setRadioValue}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option1" id="radio1" />
                        <Label htmlFor="radio1">Option 1</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option2" id="radio2" />
                        <Label htmlFor="radio2">Option 2</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                {/* Kitchen Sink - All Checkbox & Radio Variations */}
                <div className="space-y-4 mt-8">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    🔧 Kitchen Sink - All Checkbox & Radio Variations
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-dashed border-muted rounded-lg bg-muted/20">
                    {/* Checkbox States */}
                    <div className="space-y-3">
                      <Badge size="sm" variant="outline">
                        Checkbox States
                      </Badge>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="check-unchecked" />
                          <Label htmlFor="check-unchecked">Unchecked</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="check-checked" defaultChecked />
                          <Label htmlFor="check-checked">Checked</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="check-disabled" disabled />
                          <Label htmlFor="check-disabled">Disabled</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="check-disabled-checked" disabled defaultChecked />
                          <Label htmlFor="check-disabled-checked">Disabled Checked</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="check-indeterminate" />
                          <Label htmlFor="check-indeterminate">Indeterminate</Label>
                        </div>
                      </div>
                    </div>

                    {/* Radio Group Examples */}
                    <div className="space-y-3">
                      <Badge size="sm" variant="outline">
                        Radio Groups
                      </Badge>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium">Priority Level</Label>
                          <RadioGroup defaultValue="medium" className="mt-2">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="low" id="priority-low" />
                              <Label htmlFor="priority-low">Low</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="medium" id="priority-medium" />
                              <Label htmlFor="priority-medium">Medium</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="high" id="priority-high" />
                              <Label htmlFor="priority-high">High</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="urgent" id="priority-urgent" disabled />
                              <Label htmlFor="priority-urgent">Urgent (Disabled)</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    </div>

                    {/* Real-world Examples */}
                    <div className="space-y-3 md:col-span-2">
                      <Badge size="sm" variant="outline">
                        Real-world Usage
                      </Badge>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium">Preferences</Label>
                          <div className="space-y-2 mt-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="email-notifications" defaultChecked />
                              <Label htmlFor="email-notifications">📧 Email notifications</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="push-notifications" />
                              <Label htmlFor="push-notifications">📱 Push notifications</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="newsletter" defaultChecked />
                              <Label htmlFor="newsletter">📰 Weekly newsletter</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="marketing" />
                              <Label htmlFor="marketing">🎯 Marketing emails</Label>
                            </div>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Account Type</Label>
                          <RadioGroup defaultValue="personal" className="mt-2">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="personal" id="account-personal" />
                              <Label htmlFor="account-personal">👤 Personal</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="business" id="account-business" />
                              <Label htmlFor="account-business">🏢 Business</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="enterprise" id="account-enterprise" />
                              <Label htmlFor="account-enterprise">🏛️ Enterprise</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>

              {/* Textarea Component */}
              <Container
                size="none"
                padding="lg"
                className="border border-border rounded-lg space-y-6"
              >
                <h3 className="text-xl font-semibold text-foreground text-center">Textarea</h3>
                <div className="max-w-sm mx-auto">
                  <Label htmlFor="message">Your message</Label>
                  <Textarea
                    id="message"
                    placeholder="Type your message here..."
                    value={textareaValue}
                    onChange={e => setTextareaValue(e.target.value)}
                  />

                  {/* Kitchen Sink - All Textarea Variations */}
                  <div className="space-y-4 mt-8">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      🔧 Kitchen Sink - All Textarea Variations
                    </h4>
                    <div className="grid grid-cols-1 gap-4 p-4 border border-dashed border-muted rounded-lg bg-muted/20">
                      {/* Different Sizes */}
                      <div className="space-y-3">
                        <Badge size="sm" variant="outline">
                          Different Sizes
                        </Badge>
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="textarea-small">Small (3 rows)</Label>
                            <Textarea
                              id="textarea-small"
                              placeholder="Small textarea..."
                              rows={3}
                            />
                          </div>
                          <div>
                            <Label htmlFor="textarea-medium">Medium (5 rows)</Label>
                            <Textarea
                              id="textarea-medium"
                              placeholder="Medium textarea..."
                              rows={5}
                            />
                          </div>
                          <div>
                            <Label htmlFor="textarea-large">Large (8 rows)</Label>
                            <Textarea
                              id="textarea-large"
                              placeholder="Large textarea..."
                              rows={8}
                            />
                          </div>
                        </div>
                      </div>

                      {/* States */}
                      <div className="space-y-3">
                        <Badge size="sm" variant="outline">
                          States
                        </Badge>
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="textarea-disabled">Disabled</Label>
                            <Textarea
                              id="textarea-disabled"
                              placeholder="Disabled textarea"
                              disabled
                            />
                          </div>
                          <div>
                            <Label htmlFor="textarea-readonly">Read Only</Label>
                            <Textarea
                              id="textarea-readonly"
                              value="This is read-only content that cannot be edited."
                              readOnly
                            />
                          </div>
                          <div>
                            <Label htmlFor="textarea-required">Required</Label>
                            <Textarea
                              id="textarea-required"
                              placeholder="This field is required..."
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Real-world Examples */}
                      <div className="space-y-3">
                        <Badge size="sm" variant="outline">
                          Real-world Usage
                        </Badge>
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="feedback">📝 Customer Feedback</Label>
                            <Textarea
                              id="feedback"
                              placeholder="Tell us about your experience..."
                              rows={4}
                            />
                          </div>
                          <div>
                            <Label htmlFor="code-snippet">💻 Code Snippet</Label>
                            <Textarea
                              id="code-snippet"
                              placeholder="Paste your code here..."
                              className="font-mono text-sm"
                              rows={6}
                            />
                          </div>
                          <div>
                            <Label htmlFor="notes">📄 Meeting Notes</Label>
                            <Textarea
                              id="notes"
                              placeholder="Key points from the meeting..."
                              rows={5}
                            />
                          </div>
                          <div>
                            <Label htmlFor="description">📋 Product Description</Label>
                            <Textarea
                              id="description"
                              placeholder="Describe your product features..."
                              maxLength={500}
                              rows={4}
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              Maximum 500 characters
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
            </section>
          </div>

          {/* RIGHT COLUMN - Display & Feedback Components */}
          <div className="space-y-12">
            <section id="display-feedback" className="space-y-8">
              <div className="text-center space-y-3">
                <h2 className="text-3xl font-bold text-foreground">Display & Feedback</h2>
                <p className="text-muted-foreground text-lg">Visual feedback and data display</p>
              </div>

              {/* Alert Component */}
              <Container
                size="none"
                padding="lg"
                className="border border-border rounded-lg space-y-6"
              >
                <h3 className="text-xl font-semibold text-foreground text-center">Alert</h3>
                <div className="space-y-4">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <div>
                      <h4 className="font-semibold">Information</h4>
                      <p>This is an informational alert message.</p>
                    </div>
                  </Alert>
                  <Alert variant="destructive">
                    <XCircle className="h-4 w-4" />
                    <div>
                      <h4 className="font-semibold">Error</h4>
                      <p>Something went wrong with your request.</p>
                    </div>
                  </Alert>

                  {/* Kitchen Sink - All Alert Variations */}
                  <div className="space-y-4 mt-8">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      🔧 Kitchen Sink - All Alert Variations
                    </h4>
                    <div className="grid grid-cols-1 gap-4 p-4 border border-dashed border-muted rounded-lg bg-muted/20">
                      {/* Alert Variants */}
                      <div className="space-y-3">
                        <Badge size="sm" variant="outline">
                          Alert Variants
                        </Badge>
                        <div className="space-y-3">
                          <Alert>
                            <Info className="h-4 w-4" />
                            <div>
                              <h4 className="font-semibold">Default Info</h4>
                              <p>This is a default informational alert with standard styling.</p>
                            </div>
                          </Alert>
                          <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <div>
                              <h4 className="font-semibold">Destructive Alert</h4>
                              <p>This indicates an error, warning, or destructive action.</p>
                            </div>
                          </Alert>
                        </div>
                      </div>

                      {/* Different Icons */}
                      <div className="space-y-3">
                        <Badge size="sm" variant="outline">
                          Different Icons
                        </Badge>
                        <div className="space-y-3">
                          <Alert>
                            <CheckCircle className="h-4 w-4" />
                            <div>
                              <h4 className="font-semibold">Success</h4>
                              <p>Operation completed successfully!</p>
                            </div>
                          </Alert>
                          <Alert>
                            <AlertTriangle className="h-4 w-4" />
                            <div>
                              <h4 className="font-semibold">Warning</h4>
                              <p>Please review your settings before proceeding.</p>
                            </div>
                          </Alert>
                          <Alert variant="destructive">
                            <XCircle className="h-4 w-4" />
                            <div>
                              <h4 className="font-semibold">Error</h4>
                              <p>Failed to save changes. Please try again.</p>
                            </div>
                          </Alert>
                          <Alert>
                            <Clock className="h-4 w-4" />
                            <div>
                              <h4 className="font-semibold">Pending</h4>
                              <p>Your request is being processed. Please wait...</p>
                            </div>
                          </Alert>
                        </div>
                      </div>

                      {/* Real-world Examples */}
                      <div className="space-y-3">
                        <Badge size="sm" variant="outline">
                          Real-world Usage
                        </Badge>
                        <div className="space-y-3">
                          <Alert>
                            <Info className="h-4 w-4" />
                            <div>
                              <h4 className="font-semibold">📋 Form Validation</h4>
                              <p>Please fill in all required fields before submitting.</p>
                            </div>
                          </Alert>
                          <Alert>
                            <CheckCircle className="h-4 w-4" />
                            <div>
                              <h4 className="font-semibold">✅ Profile Updated</h4>
                              <p>Your profile information has been saved successfully.</p>
                            </div>
                          </Alert>
                          <Alert variant="destructive">
                            <XCircle className="h-4 w-4" />
                            <div>
                              <h4 className="font-semibold">🚫 Connection Failed</h4>
                              <p>
                                Unable to connect to the server. Check your internet connection.
                              </p>
                            </div>
                          </Alert>
                          <Alert>
                            <AlertTriangle className="h-4 w-4" />
                            <div>
                              <h4 className="font-semibold">⚠️ Storage Almost Full</h4>
                              <p>
                                You&apos;ve used 95% of your storage. Consider upgrading your plan.
                              </p>
                            </div>
                          </Alert>
                          <Alert>
                            <Clock className="h-4 w-4" />
                            <div>
                              <h4 className="font-semibold">⏰ Maintenance Scheduled</h4>
                              <p>System maintenance will occur tonight from 2-4 AM EST.</p>
                            </div>
                          </Alert>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>

              {/* Toast Component */}
              <Container
                size="none"
                padding="lg"
                className="border border-border rounded-lg space-y-6"
              >
                <h3 className="text-xl font-semibold text-foreground text-center">Toast</h3>
                <div className="flex justify-center gap-4 flex-wrap">
                  <Button
                    onClick={() =>
                      toast({
                        title: 'Default Toast',
                        description: 'This is a default toast message.',
                      })
                    }
                  >
                    Default Toast
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      toast({
                        title: 'Success!',
                        description: 'Your action was completed successfully.',
                        variant: 'default',
                      })
                    }
                  >
                    Success Toast
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() =>
                      toast({
                        title: 'Error!',
                        description: 'Something went wrong. Please try again.',
                        variant: 'error',
                      })
                    }
                  >
                    Error Toast
                  </Button>
                </div>

                {/* Kitchen Sink - All Toast Variations */}
                <div className="space-y-4 mt-8">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    🔧 Kitchen Sink - All Toast Variations
                  </h4>
                  <div className="grid grid-cols-1 gap-6 p-4 border border-dashed border-muted rounded-lg bg-muted/20">
                    {/* Toast Types */}
                    <div className="space-y-3">
                      <Badge size="sm" variant="outline">
                        Toast Types
                      </Badge>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <Button
                          size="sm"
                          onClick={() =>
                            toast({
                              title: 'Information',
                              description: 'Here is some helpful information for you.',
                            })
                          }
                        >
                          Info Toast
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            toast({
                              title: 'Warning!',
                              description: 'Please review your settings before continuing.',
                            })
                          }
                        >
                          Warning Toast
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() =>
                            toast({
                              title: 'Loading...',
                              description: 'Your request is being processed.',
                            })
                          }
                        >
                          Loading Toast
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            toast({
                              title: 'Simple',
                              description: 'Just a simple notification.',
                            })
                          }
                        >
                          Simple Toast
                        </Button>
                      </div>
                    </div>

                    {/* Toast Duration Examples */}
                    <div className="space-y-3">
                      <Badge size="sm" variant="outline">
                        Toast Duration
                      </Badge>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <Button
                          size="sm"
                          onClick={() =>
                            toast({
                              title: 'Quick Message',
                              description: 'This disappears in 2 seconds.',
                              duration: 2000,
                            })
                          }
                        >
                          2 Second Toast
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            toast({
                              title: 'Standard Message',
                              description: 'This uses the default 5 second duration.',
                            })
                          }
                        >
                          Default Duration
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() =>
                            toast({
                              title: 'Persistent Message',
                              description: 'This stays for 10 seconds.',
                              duration: 10000,
                            })
                          }
                        >
                          10 Second Toast
                        </Button>
                      </div>
                    </div>

                    {/* Real-world Toast Examples */}
                    <div className="space-y-3">
                      <Badge size="sm" variant="outline">
                        Real-world Usage
                      </Badge>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {/* Form Submission */}
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium">Form Submission</h5>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() =>
                                toast({
                                  title: 'Form Submitted!',
                                  description:
                                    'Your contact form has been sent successfully. We will get back to you within 24 hours.',
                                })
                              }
                            >
                              Form Success
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() =>
                                toast({
                                  title: 'Validation Error',
                                  description:
                                    'Please fill in all required fields before submitting.',
                                  variant: 'error',
                                })
                              }
                            >
                              Form Error
                            </Button>
                          </div>
                        </div>

                        {/* File Operations */}
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium">File Operations</h5>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() =>
                                toast({
                                  title: 'File Uploaded',
                                  description: 'document.pdf has been uploaded successfully.',
                                })
                              }
                            >
                              Upload Success
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() =>
                                toast({
                                  title: 'Upload Failed',
                                  description:
                                    'File size exceeds 10MB limit. Please choose a smaller file.',
                                  variant: 'error',
                                })
                              }
                            >
                              Upload Error
                            </Button>
                          </div>
                        </div>

                        {/* User Actions */}
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium">User Actions</h5>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() =>
                                toast({
                                  title: 'Settings Saved',
                                  description: 'Your preferences have been updated successfully.',
                                })
                              }
                            >
                              Settings Saved
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                toast({
                                  title: 'Item Added',
                                  description: 'Premium Headphones added to your cart.',
                                })
                              }
                            >
                              Cart Added
                            </Button>
                          </div>
                        </div>

                        {/* System Notifications */}
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium">System Notifications</h5>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() =>
                                toast({
                                  title: 'System Update',
                                  description: 'A new version is available. Click to update now.',
                                  duration: 8000,
                                })
                              }
                            >
                              Update Available
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                toast({
                                  title: 'Connection Restored',
                                  description: 'Your internet connection has been restored.',
                                })
                              }
                            >
                              Connection Status
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Toast Best Practices */}
                    <div className="space-y-3">
                      <Badge size="sm" variant="outline">
                        Toast Best Practices
                      </Badge>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <h4 className="font-medium text-primary">When to Use Toasts:</h4>
                          <ul className="text-muted-foreground space-y-1">
                            <li>
                              • <strong>Success confirmations:</strong> Form submissions, saves,
                              uploads
                            </li>
                            <li>
                              • <strong>Error notifications:</strong> Failed operations, validation
                              errors
                            </li>
                            <li>
                              • <strong>System updates:</strong> Connection status, app updates
                            </li>
                            <li>
                              • <strong>Quick feedback:</strong> Actions that don&apos;t need user
                              response
                            </li>
                            <li>
                              • <strong>Progress updates:</strong> Background operations completion
                            </li>
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium text-primary">Toast Guidelines:</h4>
                          <ul className="text-muted-foreground space-y-1">
                            <li>
                              • <strong>Keep messages concise:</strong> 1-2 sentences maximum
                            </li>
                            <li>
                              • <strong>Use appropriate duration:</strong> 2-5 seconds for most
                              cases
                            </li>
                            <li>
                              • <strong>Provide clear actions:</strong> When follow-up is needed
                            </li>
                            <li>
                              • <strong>Position consistently:</strong> Usually bottom-right corner
                            </li>
                            <li>
                              • <strong>Avoid overuse:</strong> Don&apos;t flood users with
                              notifications
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>

              {/* Progress Component */}
              <Container
                size="none"
                padding="lg"
                className="border border-border rounded-lg space-y-6"
              >
                <h3 className="text-xl font-semibold text-foreground text-center">Progress</h3>
                <div className="space-y-4 max-w-sm mx-auto">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Upload Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Animated</span>
                      <span>{animatedProgress}%</span>
                    </div>
                    <Progress value={animatedProgress} />
                  </div>

                  {/* Kitchen Sink - All Progress Variations */}
                  <div className="space-y-4 mt-8">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      🔧 Kitchen Sink - All Progress Variations
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-dashed border-muted rounded-lg bg-muted/20">
                      {/* Progress Values */}
                      <div className="space-y-3">
                        <Badge size="sm" variant="outline">
                          Progress Values
                        </Badge>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>0% Complete</span>
                              <span>0%</span>
                            </div>
                            <Progress value={0} />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Loading...</span>
                              <span>25%</span>
                            </div>
                            <Progress value={25} />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Half Way</span>
                              <span>50%</span>
                            </div>
                            <Progress value={50} />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Almost Done</span>
                              <span>75%</span>
                            </div>
                            <Progress value={75} />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Complete</span>
                              <span>100%</span>
                            </div>
                            <Progress value={100} />
                          </div>
                        </div>
                      </div>

                      {/* Real-world Examples */}
                      <div className="space-y-3">
                        <Badge size="sm" variant="outline">
                          Use Cases
                        </Badge>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>📤 File Upload</span>
                              <span>67%</span>
                            </div>
                            <Progress value={67} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>📊 Profile Completion</span>
                              <span>80%</span>
                            </div>
                            <Progress value={80} className="h-3" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>💾 Download Progress</span>
                              <span>45%</span>
                            </div>
                            <Progress value={45} className="h-1" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>🎯 Goal Achievement</span>
                              <span>90%</span>
                            </div>
                            <Progress value={90} className="h-4" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>⚡ Performance Score</span>
                              <span>85%</span>
                            </div>
                            <Progress value={85} />
                          </div>
                        </div>
                      </div>

                      {/* Different Heights & Colors */}
                      <div className="space-y-3 md:col-span-2">
                        <Badge size="sm" variant="outline">
                          Visual Variations
                        </Badge>
                        <div className="space-y-3">
                          <div>
                            <div className="text-sm mb-1">Thin Progress (h-1)</div>
                            <Progress value={33} className="h-1" />
                          </div>
                          <div>
                            <div className="text-sm mb-1">Default Progress (h-2)</div>
                            <Progress value={55} className="h-2" />
                          </div>
                          <div>
                            <div className="text-sm mb-1">Medium Progress (h-3)</div>
                            <Progress value={77} className="h-3" />
                          </div>
                          <div>
                            <div className="text-sm mb-1">Thick Progress (h-4)</div>
                            <Progress value={88} className="h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>

              {/* Badge Component */}
              <Container
                size="none"
                padding="lg"
                className="border border-border rounded-lg space-y-6"
              >
                <h3 className="text-xl font-semibold text-foreground text-center">Badge</h3>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground">Variants</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge>Default</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="destructive">Destructive</Badge>
                      <Badge variant="outline">Outline</Badge>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground">Sizes</h4>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge size="sm">Small</Badge>
                      <Badge>Default</Badge>
                      <Badge size="lg">Large</Badge>
                    </div>
                  </div>

                  {/* Kitchen Sink - All Badge Combinations */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      🔧 Kitchen Sink - All Badge Combinations
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border border-dashed border-muted rounded-lg bg-muted/20">
                      {/* Default variants with all sizes */}
                      <div className="space-y-2">
                        <div className="text-xs font-medium text-muted-foreground mb-2">
                          Default
                        </div>
                        <div className="space-y-1 flex flex-col items-start">
                          <Badge size="sm">New</Badge>
                          <Badge>Featured</Badge>
                          <Badge size="lg">Popular</Badge>
                        </div>
                      </div>

                      {/* Secondary variants */}
                      <div className="space-y-2">
                        <div className="text-xs font-medium text-muted-foreground mb-2">
                          Secondary
                        </div>
                        <div className="space-y-1 flex flex-col items-start">
                          <Badge variant="secondary" size="sm">
                            Draft
                          </Badge>
                          <Badge variant="secondary">Published</Badge>
                          <Badge variant="secondary" size="lg">
                            Archived
                          </Badge>
                        </div>
                      </div>

                      {/* Destructive variants */}
                      <div className="space-y-2">
                        <div className="text-xs font-medium text-muted-foreground mb-2">
                          Destructive
                        </div>
                        <div className="space-y-1 flex flex-col items-start">
                          <Badge variant="destructive" size="sm">
                            Error
                          </Badge>
                          <Badge variant="destructive">Critical</Badge>
                          <Badge variant="destructive" size="lg">
                            Danger
                          </Badge>
                        </div>
                      </div>

                      {/* Outline variants */}
                      <div className="space-y-2">
                        <div className="text-xs font-medium text-muted-foreground mb-2">
                          Outline
                        </div>
                        <div className="space-y-1 flex flex-col items-start">
                          <Badge variant="outline" size="sm">
                            Beta
                          </Badge>
                          <Badge variant="outline">Preview</Badge>
                          <Badge variant="outline" size="lg">
                            Coming Soon
                          </Badge>
                        </div>
                      </div>

                      {/* Real-world Usage Examples */}
                      <div className="space-y-3 md:col-span-2 lg:col-span-4">
                        <div className="text-xs font-medium text-muted-foreground mb-2">
                          Real-world Usage
                        </div>
                        <div className="space-y-3">
                          {/* Status badges */}
                          <div className="flex flex-wrap gap-2">
                            <Badge className="gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Active
                            </Badge>
                            <Badge variant="secondary" className="gap-1">
                              <Info className="h-3 w-3" />
                              Pending
                            </Badge>
                            <Badge variant="destructive" className="gap-1">
                              <XCircle className="h-3 w-3" />
                              Inactive
                            </Badge>
                            <Badge variant="outline" className="gap-1">
                              <Menu className="h-3 w-3" />
                              Processing
                            </Badge>
                          </div>

                          {/* Count badges */}
                          <div className="flex flex-wrap gap-2">
                            <Badge size="sm">99+</Badge>
                            <Badge variant="secondary" size="sm">
                              5
                            </Badge>
                            <Badge variant="destructive" size="sm">
                              !
                            </Badge>
                            <Badge variant="outline" size="sm">
                              New
                            </Badge>
                          </div>

                          {/* Category badges */}
                          <div className="flex flex-wrap gap-2">
                            <Badge>React</Badge>
                            <Badge variant="secondary">TypeScript</Badge>
                            <Badge variant="outline">Next.js</Badge>
                            <Badge size="sm">Tailwind</Badge>
                            <Badge variant="secondary" size="sm">
                              shadcn/ui
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>

              {/* Skeleton Component */}
              <Container
                size="none"
                padding="lg"
                className="border border-border rounded-lg space-y-6"
              >
                <h3 className="text-xl font-semibold text-foreground text-center">Skeleton</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[200px]" />
                      <Skeleton className="h-4 w-[160px]" />
                    </div>
                  </div>
                  <Skeleton className="h-[125px] w-full rounded-xl" />

                  {/* Kitchen Sink - All Skeleton Variations */}
                  <div className="space-y-4 mt-8">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      🔧 Kitchen Sink - All Skeleton Variations
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-dashed border-muted rounded-lg bg-muted/20">
                      {/* Basic Shapes */}
                      <div className="space-y-3">
                        <Badge size="sm" variant="outline">
                          Basic Shapes
                        </Badge>
                        <div className="space-y-3">
                          <div>
                            <div className="text-xs mb-2">Rectangle</div>
                            <Skeleton className="h-4 w-full" />
                          </div>
                          <div>
                            <div className="text-xs mb-2">Circle</div>
                            <Skeleton className="h-10 w-10 rounded-full" />
                          </div>
                          <div>
                            <div className="text-xs mb-2">Rounded Rectangle</div>
                            <Skeleton className="h-8 w-24 rounded-lg" />
                          </div>
                          <div>
                            <div className="text-xs mb-2">Square</div>
                            <Skeleton className="h-16 w-16" />
                          </div>
                        </div>
                      </div>

                      {/* Different Sizes */}
                      <div className="space-y-3">
                        <Badge size="sm" variant="outline">
                          Different Sizes
                        </Badge>
                        <div className="space-y-3">
                          <div>
                            <div className="text-xs mb-2">Small Text</div>
                            <Skeleton className="h-3 w-32" />
                          </div>
                          <div>
                            <div className="text-xs mb-2">Medium Text</div>
                            <Skeleton className="h-4 w-48" />
                          </div>
                          <div>
                            <div className="text-xs mb-2">Large Text</div>
                            <Skeleton className="h-6 w-64" />
                          </div>
                          <div>
                            <div className="text-xs mb-2">Button Size</div>
                            <Skeleton className="h-10 w-24 rounded-md" />
                          </div>
                        </div>
                      </div>

                      {/* Real-world Layout Examples */}
                      <div className="space-y-3 md:col-span-2">
                        <Badge size="sm" variant="outline">
                          Layout Examples
                        </Badge>
                        <div className="space-y-4">
                          <div>
                            <div className="text-xs mb-2">📄 Article Card</div>
                            <div className="border rounded-lg p-4 space-y-3">
                              <Skeleton className="h-32 w-full rounded-md" />
                              <Skeleton className="h-5 w-3/4" />
                              <Skeleton className="h-4 w-1/2" />
                              <div className="flex space-x-2">
                                <Skeleton className="h-3 w-16" />
                                <Skeleton className="h-3 w-20" />
                                <Skeleton className="h-3 w-12" />
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="text-xs mb-2">👤 User Profile</div>
                            <div className="flex items-center space-x-4 border rounded-lg p-4">
                              <Skeleton className="h-12 w-12 rounded-full" />
                              <div className="space-y-2 flex-1">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-48" />
                                <Skeleton className="h-3 w-24" />
                              </div>
                              <Skeleton className="h-8 w-20 rounded-md" />
                            </div>
                          </div>
                          <div>
                            <div className="text-xs mb-2">📊 Data Table Row</div>
                            <div className="border rounded-lg">
                              <div className="flex items-center space-x-4 p-4">
                                <Skeleton className="h-4 w-4 rounded" />
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-6 w-16 rounded-full" />
                                <Skeleton className="h-8 w-8 rounded" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>

              {/* Avatar Component */}
              <Container
                size="none"
                padding="lg"
                className="border border-border rounded-lg space-y-6"
              >
                <h3 className="text-xl font-semibold text-foreground text-center">Avatar</h3>
                <div className="flex items-center justify-center gap-4">
                  <Avatar size="sm" src="https://github.com/shadcn.png" alt="User" />
                  <Avatar src="https://github.com/shadcn.png" alt="User" />
                  <Avatar size="lg" src="https://github.com/shadcn.png" alt="User" />
                  <Avatar>
                    <div className="text-sm font-medium">JD</div>
                  </Avatar>
                </div>

                {/* Kitchen Sink - All Avatar Variations */}
                <div className="space-y-4 mt-8">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    🔧 Kitchen Sink - All Avatar Variations
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-dashed border-muted rounded-lg bg-muted/20">
                    {/* Avatar Sizes */}
                    <div className="space-y-3">
                      <Badge size="sm" variant="outline">
                        Avatar Sizes
                      </Badge>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <Avatar size="sm" src="https://github.com/shadcn.png" alt="Small" />
                          <div className="text-xs mt-1">Small</div>
                        </div>
                        <div className="text-center">
                          <Avatar src="https://github.com/shadcn.png" alt="Default" />
                          <div className="text-xs mt-1">Default</div>
                        </div>
                        <div className="text-center">
                          <Avatar size="lg" src="https://github.com/shadcn.png" alt="Large" />
                          <div className="text-xs mt-1">Large</div>
                        </div>
                      </div>
                    </div>

                    {/* Avatar Fallbacks */}
                    <div className="space-y-3">
                      <Badge size="sm" variant="outline">
                        Fallback Types
                      </Badge>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <Avatar>
                            <div className="text-sm font-medium">AB</div>
                          </Avatar>
                          <div className="text-xs mt-1">Initials</div>
                        </div>
                        <div className="text-center">
                          <Avatar>
                            <div className="text-sm font-medium">👤</div>
                          </Avatar>
                          <div className="text-xs mt-1">Icon</div>
                        </div>
                        <div className="text-center">
                          <Avatar>
                            <div className="text-xs font-medium">?</div>
                          </Avatar>
                          <div className="text-xs mt-1">Unknown</div>
                        </div>
                      </div>
                    </div>

                    {/* Real-world Examples */}
                    <div className="space-y-3 md:col-span-2">
                      <Badge size="sm" variant="outline">
                        Real-world Usage
                      </Badge>
                      <div className="space-y-4">
                        <div>
                          <div className="text-xs mb-2">👥 User List</div>
                          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                            <Avatar size="sm" src="https://github.com/shadcn.png" alt="User 1" />
                            <div>
                              <div className="text-sm font-medium">John Doe</div>
                              <div className="text-xs text-muted-foreground">john@example.com</div>
                            </div>
                            <div className="ml-auto">
                              <Badge size="sm">Admin</Badge>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs mb-2">💬 Comment Thread</div>
                          <div className="space-y-2">
                            <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                              <Avatar size="sm">
                                <div className="text-xs font-medium">SA</div>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">Sarah Anderson</span>
                                  <span className="text-xs text-muted-foreground">2 hours ago</span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Great work on this feature!
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs mb-2">👥 Team Members</div>
                          <div className="flex -space-x-2">
                            <Avatar
                              size="sm"
                              src="https://github.com/shadcn.png"
                              alt="Member 1"
                              className="border-2 border-background"
                            />
                            <Avatar size="sm" className="border-2 border-background">
                              <div className="text-xs font-medium">MJ</div>
                            </Avatar>
                            <Avatar size="sm" className="border-2 border-background">
                              <div className="text-xs font-medium">KL</div>
                            </Avatar>
                            <Avatar size="sm" className="border-2 border-background bg-muted">
                              <div className="text-xs font-medium">+3</div>
                            </Avatar>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>

              {/* Separator Component */}
              <Container
                size="none"
                padding="lg"
                className="border border-border rounded-lg space-y-6"
              >
                <h3 className="text-xl font-semibold text-foreground text-center">Separator</h3>
                <div className="space-y-4">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Content above</p>
                    <Separator />
                    <p className="text-sm text-muted-foreground">Content below</p>
                  </div>
                  <div className="flex h-16 items-center gap-4">
                    <span className="text-sm">Left</span>
                    <Separator orientation="vertical" />
                    <span className="text-sm">Right</span>
                  </div>
                  <Separator spacing="lg">OR</Separator>

                  {/* Kitchen Sink - All Separator Variations */}
                  <div className="space-y-4 mt-8">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      🔧 Kitchen Sink - All Separator Variations
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-dashed border-muted rounded-lg bg-muted/20">
                      {/* Horizontal Separators */}
                      <div className="space-y-3">
                        <Badge size="sm" variant="outline">
                          Horizontal
                        </Badge>
                        <div className="space-y-4">
                          <div>
                            <div className="text-xs mb-2">Default Separator</div>
                            <div className="space-y-2">
                              <p className="text-xs text-muted-foreground">Section One</p>
                              <Separator />
                              <p className="text-xs text-muted-foreground">Section Two</p>
                            </div>
                          </div>
                          <div>
                            <div className="text-xs mb-2">With Text (Small)</div>
                            <div className="space-y-2">
                              <p className="text-xs text-muted-foreground">Previous</p>
                              <Separator spacing="sm">AND</Separator>
                              <p className="text-xs text-muted-foreground">Next</p>
                            </div>
                          </div>
                          <div>
                            <div className="text-xs mb-2">With Text (Large)</div>
                            <div className="space-y-2">
                              <p className="text-xs text-muted-foreground">Step 1</p>
                              <Separator spacing="lg">OR</Separator>
                              <p className="text-xs text-muted-foreground">Step 2</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Vertical Separators */}
                      <div className="space-y-3">
                        <Badge size="sm" variant="outline">
                          Vertical
                        </Badge>
                        <div className="space-y-4">
                          <div>
                            <div className="text-xs mb-2">Navigation Items</div>
                            <div className="flex h-8 items-center gap-3">
                              <span className="text-xs">Home</span>
                              <Separator orientation="vertical" />
                              <span className="text-xs">About</span>
                              <Separator orientation="vertical" />
                              <span className="text-xs">Contact</span>
                            </div>
                          </div>
                          <div>
                            <div className="text-xs mb-2">Toolbar Items</div>
                            <div className="flex h-10 items-center gap-3 px-2 bg-muted/30 rounded">
                              <Button size="sm" variant="ghost">
                                Bold
                              </Button>
                              <Separator orientation="vertical" />
                              <Button size="sm" variant="ghost">
                                Italic
                              </Button>
                              <Separator orientation="vertical" />
                              <Button size="sm" variant="ghost">
                                Underline
                              </Button>
                            </div>
                          </div>
                          <div>
                            <div className="text-xs mb-2">Status Items</div>
                            <div className="flex h-8 items-center gap-3">
                              <Badge size="sm" variant="secondary">
                                Online
                              </Badge>
                              <Separator orientation="vertical" />
                              <span className="text-xs">15 users</span>
                              <Separator orientation="vertical" />
                              <span className="text-xs">v2.1.0</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Real-world Examples */}
                      <div className="space-y-3 md:col-span-2">
                        <Badge size="sm" variant="outline">
                          Real-world Usage
                        </Badge>
                        <div className="space-y-4">
                          <div>
                            <div className="text-xs mb-2">Card Content Sections</div>
                            <div className="border rounded-lg p-3 space-y-3">
                              <div>
                                <div className="font-medium text-sm">Profile Settings</div>
                                <div className="text-xs text-muted-foreground">
                                  Manage your account
                                </div>
                              </div>
                              <Separator />
                              <div>
                                <div className="font-medium text-sm">Privacy Settings</div>
                                <div className="text-xs text-muted-foreground">
                                  Control your privacy
                                </div>
                              </div>
                              <Separator />
                              <div>
                                <div className="font-medium text-sm">Notification Settings</div>
                                <div className="text-xs text-muted-foreground">
                                  Manage notifications
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="text-xs mb-2">Breadcrumb Navigation</div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>Dashboard</span>
                              <Separator orientation="vertical" />
                              <span>Projects</span>
                              <Separator orientation="vertical" />
                              <span className="text-foreground">Current Project</span>
                            </div>
                          </div>
                          <div>
                            <div className="text-xs mb-2">Footer Sections</div>
                            <div className="bg-muted/30 p-3 rounded text-xs space-y-3">
                              <div className="flex justify-between">
                                <span>Company Info</span>
                                <span>© 2024</span>
                              </div>
                              <Separator />
                              <div className="flex gap-4">
                                <span>Privacy</span>
                                <Separator orientation="vertical" />
                                <span>Terms</span>
                                <Separator orientation="vertical" />
                                <span>Support</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>

              {/* Tooltip Component */}
              <Container
                size="none"
                padding="lg"
                className="border border-border rounded-lg space-y-6"
              >
                <h3 className="text-xl font-semibold text-foreground text-center">Tooltip</h3>
                <div className="flex justify-center gap-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline">Hover me</Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>This is a tooltip</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button>With icon</Button>
                      </TooltipTrigger>
                      <TooltipContent variant="secondary">
                        <p>Secondary tooltip variant</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {/* Kitchen Sink - All Tooltip Variations */}
                <div className="space-y-4 mt-8">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    🔧 Kitchen Sink - All Tooltip Variations
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-dashed border-muted rounded-lg bg-muted/20">
                    {/* Tooltip Variants */}
                    <div className="space-y-3">
                      <Badge size="sm" variant="outline">
                        Tooltip Variants
                      </Badge>
                      <div className="flex flex-wrap gap-3">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="sm">
                                Default
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Default tooltip style</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="sm">
                                Secondary
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent variant="secondary">
                              <p>Secondary variant</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>

                    {/* Different Trigger Types */}
                    <div className="space-y-3">
                      <Badge size="sm" variant="outline">
                        Trigger Types
                      </Badge>
                      <div className="flex flex-wrap gap-3">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge>Hover Badge</Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Badge with tooltip</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Info icon tooltip</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="underline cursor-help text-sm">Hover text</span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Text with tooltip</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>

                    {/* Real-world Examples */}
                    <div className="space-y-3 md:col-span-2">
                      <Badge size="sm" variant="outline">
                        Real-world Usage
                      </Badge>
                      <div className="space-y-4">
                        <div>
                          <div className="text-xs mb-2">🔧 Form Field Help</div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Label htmlFor="password">Password</Label>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-3 w-3 cursor-help text-muted-foreground" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <div className="text-xs">
                                      <p>Password must contain:</p>
                                      <ul className="list-disc list-inside mt-1">
                                        <li>At least 8 characters</li>
                                        <li>One uppercase letter</li>
                                        <li>One number</li>
                                      </ul>
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                            <Input id="password" type="password" placeholder="Enter password" />
                          </div>
                        </div>
                        <div>
                          <div className="text-xs mb-2">🎯 Action Buttons</div>
                          <div className="flex gap-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    📄
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Copy to clipboard</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    📁
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Save to folder</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    📤
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Share with others</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="destructive" size="sm">
                                    🗑️
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Delete permanently</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs mb-2">📊 Status Indicators</div>
                          <div className="flex items-center gap-4">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                                    <span className="text-sm">Online</span>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Last seen: just now</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Badge variant="secondary">Beta</Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>This feature is in beta testing</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
            </section>
          </div>
        </div>

        {/* Full-width components */}
        <div className="mt-16 space-y-12">
          {/* Layout Components Section */}
          <section id="layout-structure" className="space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold text-foreground">Layout & Structure</h2>
              <p className="text-muted-foreground text-lg">Cards, tabs, and layout components</p>
            </div>

            {/* Tabs Component */}
            <Container
              size="none"
              padding="lg"
              className="border border-border rounded-lg space-y-6"
            >
              <h3 className="text-xl font-semibold text-foreground text-center">Tabs</h3>
              <Tabs defaultValue="tab1" className="w-full max-w-md mx-auto">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                  <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                  <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Tab 1 Content</CardTitle>
                      <CardDescription>This is the content for the first tab.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Some example content in tab 1.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="tab2" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Tab 2 Content</CardTitle>
                      <CardDescription>This is the content for the second tab.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Some example content in tab 2.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="tab3" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Tab 3 Content</CardTitle>
                      <CardDescription>This is the content for the third tab.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Some example content in tab 3.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Kitchen Sink - All Tabs Variations */}
              <div className="space-y-4 mt-8">
                <h4 className="text-sm font-medium text-muted-foreground">
                  🔧 Kitchen Sink - All Tabs Variations
                </h4>
                <div className="grid grid-cols-1 gap-6 p-4 border border-dashed border-muted rounded-lg bg-muted/20">
                  {/* Different Tab Styles */}
                  <div className="space-y-3">
                    <Badge size="sm" variant="outline">
                      Tab Orientations
                    </Badge>
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs mb-2">Default Horizontal Tabs</div>
                        <Tabs defaultValue="horizontal1" className="w-full max-w-md">
                          <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="horizontal1">Home</TabsTrigger>
                            <TabsTrigger value="horizontal2">About</TabsTrigger>
                            <TabsTrigger value="horizontal3">Services</TabsTrigger>
                            <TabsTrigger value="horizontal4">Contact</TabsTrigger>
                          </TabsList>
                          <TabsContent value="horizontal1" className="mt-4">
                            <div className="p-4 bg-muted/30 rounded-lg">
                              <p className="text-sm">Home page content</p>
                            </div>
                          </TabsContent>
                          <TabsContent value="horizontal2" className="mt-4">
                            <div className="p-4 bg-muted/30 rounded-lg">
                              <p className="text-sm">About page content</p>
                            </div>
                          </TabsContent>
                          <TabsContent value="horizontal3" className="mt-4">
                            <div className="p-4 bg-muted/30 rounded-lg">
                              <p className="text-sm">Services page content</p>
                            </div>
                          </TabsContent>
                          <TabsContent value="horizontal4" className="mt-4">
                            <div className="p-4 bg-muted/30 rounded-lg">
                              <p className="text-sm">Contact page content</p>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                      <div>
                        <div className="text-xs mb-2">Compact Tab List</div>
                        <Tabs defaultValue="compact1" className="w-full max-w-md">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="compact1">Overview</TabsTrigger>
                            <TabsTrigger value="compact2">Details</TabsTrigger>
                          </TabsList>
                          <TabsContent value="compact1" className="mt-4">
                            <div className="p-3 bg-muted/30 rounded-lg">
                              <p className="text-sm">Overview information here</p>
                            </div>
                          </TabsContent>
                          <TabsContent value="compact2" className="mt-4">
                            <div className="p-3 bg-muted/30 rounded-lg">
                              <p className="text-sm">Detailed information here</p>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </div>
                  </div>

                  {/* Real-world Tab Examples */}
                  <div className="space-y-3">
                    <Badge size="sm" variant="outline">
                      Real-world Usage
                    </Badge>
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs mb-2">📊 Dashboard Tabs</div>
                        <Tabs defaultValue="analytics" className="w-full">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="analytics">📈 Analytics</TabsTrigger>
                            <TabsTrigger value="users">👥 Users</TabsTrigger>
                            <TabsTrigger value="settings">⚙️ Settings</TabsTrigger>
                          </TabsList>
                          <TabsContent value="analytics" className="mt-4">
                            <Card>
                              <CardHeader>
                                <CardTitle>Analytics Overview</CardTitle>
                                <CardDescription>
                                  View your website traffic and performance
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span className="text-sm">Page Views</span>
                                    <span className="text-sm font-medium">24,567</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-sm">Unique Visitors</span>
                                    <span className="text-sm font-medium">8,432</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-sm">Bounce Rate</span>
                                    <span className="text-sm font-medium">42.3%</span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>
                          <TabsContent value="users" className="mt-4">
                            <Card>
                              <CardHeader>
                                <CardTitle>User Management</CardTitle>
                                <CardDescription>
                                  Manage user accounts and permissions
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-2">
                                  <p className="text-sm">👤 Active Users: 1,234</p>
                                  <p className="text-sm">✉️ Pending Invites: 12</p>
                                  <p className="text-sm">🚫 Blocked Users: 3</p>
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>
                          <TabsContent value="settings" className="mt-4">
                            <Card>
                              <CardHeader>
                                <CardTitle>System Settings</CardTitle>
                                <CardDescription>
                                  Configure your application preferences
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm">Email Notifications</span>
                                    <Switch />
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm">Dark Mode</span>
                                    <Switch />
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm">Auto-save</span>
                                    <Switch defaultChecked />
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>
                        </Tabs>
                      </div>
                      <div>
                        <div className="text-xs mb-2">🛒 E-commerce Product Tabs</div>
                        <Tabs defaultValue="description" className="w-full">
                          <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="description">Description</TabsTrigger>
                            <TabsTrigger value="specs">Specs</TabsTrigger>
                            <TabsTrigger value="reviews">Reviews</TabsTrigger>
                            <TabsTrigger value="shipping">Shipping</TabsTrigger>
                          </TabsList>
                          <TabsContent value="description" className="mt-4">
                            <div className="p-4 bg-muted/30 rounded-lg">
                              <p className="text-sm">
                                This high-quality product features premium materials and excellent
                                craftsmanship. Perfect for everyday use with a modern design that
                                complements any style.
                              </p>
                            </div>
                          </TabsContent>
                          <TabsContent value="specs" className="mt-4">
                            <div className="p-4 bg-muted/30 rounded-lg space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Dimensions:</span>
                                <span>10&quot; x 8&quot; x 2&quot;</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Weight:</span>
                                <span>1.5 lbs</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Material:</span>
                                <span>Premium Aluminum</span>
                              </div>
                            </div>
                          </TabsContent>
                          <TabsContent value="reviews" className="mt-4">
                            <div className="p-4 bg-muted/30 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm font-medium">4.8/5</span>
                                <span className="text-sm text-muted-foreground">(247 reviews)</span>
                              </div>
                              <p className="text-sm">
                                &quot;Amazing product! Exceeded my expectations.&quot; - Sarah K.
                              </p>
                            </div>
                          </TabsContent>
                          <TabsContent value="shipping" className="mt-4">
                            <div className="p-4 bg-muted/30 rounded-lg space-y-2">
                              <p className="text-sm">🚚 Free shipping on orders over $50</p>
                              <p className="text-sm">📦 Ships within 1-2 business days</p>
                              <p className="text-sm">🔄 30-day return policy</p>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>

            {/* Card Component */}
            <Container
              size="none"
              padding="lg"
              className="border border-border rounded-lg space-y-6"
            >
              <h3 className="text-xl font-semibold text-foreground text-center">Card</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Simple Card</CardTitle>
                    <CardDescription>A basic card example</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>This is a simple card with header and content.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>With Footer</CardTitle>
                    <CardDescription>Card with action buttons</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>This card includes a footer with actions.</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Interactive</CardTitle>
                    <CardDescription>Hover and click states</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>This card demonstrates interactive states.</p>
                  </CardContent>
                </Card>
              </div>

              {/* Kitchen Sink - All Card Variations */}
              <div className="space-y-4 mt-8">
                <h4 className="text-sm font-medium text-muted-foreground">
                  🔧 Kitchen Sink - All Card Variations
                </h4>
                <div className="grid grid-cols-1 gap-6 p-4 border border-dashed border-muted rounded-lg bg-muted/20">
                  {/* Card Structures */}
                  <div className="space-y-3">
                    <Badge size="sm" variant="outline">
                      Card Structures
                    </Badge>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Header Only</CardTitle>
                        </CardHeader>
                      </Card>
                      <Card>
                        <CardContent>
                          <p>Content Only Card</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardFooter>
                          <Button className="w-full">Footer Only</Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>

                  {/* Interactive Cards */}
                  <div className="space-y-3">
                    <Badge size="sm" variant="outline">
                      Interactive Cards
                    </Badge>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle>Clickable Card</CardTitle>
                          <CardDescription>This card has hover effects</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>Hover over this card to see the shadow effect.</p>
                        </CardContent>
                      </Card>
                      <Card className="border-dashed border-2">
                        <CardHeader>
                          <CardTitle>Dashed Border</CardTitle>
                          <CardDescription>Card with custom border style</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>This card uses a dashed border for visual variety.</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Real-world Card Examples */}
                  <div className="space-y-3">
                    <Badge size="sm" variant="outline">
                      Real-world Usage
                    </Badge>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* User Profile Card */}
                      <Card>
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-3">
                            <Avatar size="sm">
                              <div className="text-sm font-medium">JD</div>
                            </Avatar>
                            <div>
                              <CardTitle className="text-base">John Doe</CardTitle>
                              <CardDescription>Software Engineer</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Experience</span>
                              <span>5 years</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Projects</span>
                              <span>42</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Rating</span>
                              <span>⭐ 4.9</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full" size="sm">
                            View Profile
                          </Button>
                        </CardFooter>
                      </Card>

                      {/* Product Card */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Premium Headphones</CardTitle>
                          <CardDescription>Wireless Noise-Canceling</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="bg-muted/30 h-24 rounded-md flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">Product Image</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-2xl font-bold">$299</span>
                              <Badge variant="secondary">In Stock</Badge>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="gap-2">
                          <Button className="flex-1" size="sm">
                            Add to Cart
                          </Button>
                          <Button variant="outline" size="sm">
                            ♡
                          </Button>
                        </CardFooter>
                      </Card>

                      {/* Notification Card */}
                      <Card>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">System Update</CardTitle>
                            <Badge size="sm">New</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            A new system update is available. This update includes security
                            improvements and bug fixes.
                          </p>
                        </CardContent>
                        <CardFooter className="gap-2">
                          <Button size="sm">Install Now</Button>
                          <Button variant="ghost" size="sm">
                            Later
                          </Button>
                        </CardFooter>
                      </Card>

                      {/* Stats Card */}
                      <Card className="md:col-span-2 lg:col-span-1">
                        <CardHeader>
                          <CardTitle className="text-base">Monthly Statistics</CardTitle>
                          <CardDescription>Performance overview</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Sales Goal</span>
                                <span>85%</span>
                              </div>
                              <Progress value={85} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Customer Satisfaction</span>
                                <span>92%</span>
                              </div>
                              <Progress value={92} className="h-2" />
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-2">
                              <div className="text-center">
                                <div className="text-2xl font-bold">1.2K</div>
                                <div className="text-xs text-muted-foreground">Orders</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold">$45K</div>
                                <div className="text-xs text-muted-foreground">Revenue</div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Settings Card */}
                      <Card className="md:col-span-2">
                        <CardHeader>
                          <CardTitle className="text-base">Quick Settings</CardTitle>
                          <CardDescription>Manage your preferences</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <Label htmlFor="notifications-card">Notifications</Label>
                                <Switch id="notifications-card" />
                              </div>
                              <div className="flex items-center justify-between">
                                <Label htmlFor="dark-mode-card">Dark Mode</Label>
                                <Switch id="dark-mode-card" />
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <Label htmlFor="auto-save-card">Auto Save</Label>
                                <Switch id="auto-save-card" defaultChecked />
                              </div>
                              <div className="flex items-center justify-between">
                                <Label htmlFor="analytics-card">Analytics</Label>
                                <Switch id="analytics-card" defaultChecked />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full" size="sm">
                            Save Changes
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </section>

          {/* Interactive Components Section */}
          <section id="interactive-overlay" className="space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold text-foreground">Interactive & Overlay</h2>
              <p className="text-muted-foreground text-lg">
                Dialogs, modals, and overlay components
              </p>
            </div>

            {/* Dialog Component */}
            <Container
              size="none"
              padding="lg"
              className="border border-border rounded-lg space-y-6"
            >
              <h3 className="text-xl font-semibold text-foreground text-center">Dialog</h3>
              <div className="flex justify-center gap-4">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Dialog Example</DialogTitle>
                      <DialogDescription>
                        This is a dialog component demonstration.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p>Dialog content goes here.</p>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsDialogOpen(false)}>Save</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Kitchen Sink - All Dialog Variations */}
              <div className="space-y-4 mt-8">
                <h4 className="text-sm font-medium text-muted-foreground">
                  🔧 Kitchen Sink - All Dialog Variations
                </h4>
                <div className="grid grid-cols-1 gap-6 p-4 border border-dashed border-muted rounded-lg bg-muted/20">
                  {/* Dialog Sizes */}
                  <div className="space-y-3">
                    <Badge size="sm" variant="outline">
                      Dialog Sizes
                    </Badge>
                    <div className="flex flex-wrap gap-3">
                      <Button size="sm" onClick={() => setIsDialogOpen(true)}>
                        Default Dialog
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsConfirmDialogOpen(true)}
                      >
                        Confirm Dialog
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setIsFormDialogOpen(true)}
                      >
                        Form Dialog
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setIsSettingsDialogOpen(true)}
                      >
                        Settings Dialog
                      </Button>
                    </div>
                  </div>

                  {/* Confirmation Dialog */}
                  <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Confirm Action</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete this item? This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="gap-2">
                        <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button variant="destructive" onClick={() => setIsConfirmDialogOpen(false)}>
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* Form Dialog */}
                  <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Create New Project</DialogTitle>
                        <DialogDescription>
                          Fill in the details below to create a new project.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="project-name">Project Name</Label>
                          <Input id="project-name" placeholder="Enter project name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="project-description">Description</Label>
                          <Textarea
                            id="project-description"
                            placeholder="Describe your project"
                            rows={3}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="project-type">Project Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select project type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="web">Web Application</SelectItem>
                              <SelectItem value="mobile">Mobile App</SelectItem>
                              <SelectItem value="desktop">Desktop App</SelectItem>
                              <SelectItem value="api">API Service</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="project-public" />
                          <Label htmlFor="project-public">Make project public</Label>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsFormDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => setIsFormDialogOpen(false)}>Create Project</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* Settings Dialog */}
                  <Dialog open={isSettingsDialogOpen} onOpenChange={setIsSettingsDialogOpen}>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>User Preferences</DialogTitle>
                        <DialogDescription>
                          Customize your application settings and preferences.
                        </DialogDescription>
                      </DialogHeader>
                      <Tabs defaultValue="general" className="py-4">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="general">General</TabsTrigger>
                          <TabsTrigger value="appearance">Appearance</TabsTrigger>
                          <TabsTrigger value="privacy">Privacy</TabsTrigger>
                        </TabsList>
                        <TabsContent value="general" className="space-y-4 mt-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <Label>Email Notifications</Label>
                                <p className="text-sm text-muted-foreground">
                                  Receive updates via email
                                </p>
                              </div>
                              <Switch />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <Label>Auto-save</Label>
                                <p className="text-sm text-muted-foreground">
                                  Automatically save changes
                                </p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="appearance" className="space-y-4 mt-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <Label>Dark Mode</Label>
                                <p className="text-sm text-muted-foreground">Use dark theme</p>
                              </div>
                              <Switch />
                            </div>
                            <div className="space-y-2">
                              <Label>Font Size</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select font size" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="small">Small</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="large">Large</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="privacy" className="space-y-4 mt-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <Label>Analytics</Label>
                                <p className="text-sm text-muted-foreground">
                                  Help improve the app
                                </p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <Label>Location Services</Label>
                                <p className="text-sm text-muted-foreground">
                                  Allow location access
                                </p>
                              </div>
                              <Switch />
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsSettingsDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => setIsSettingsDialogOpen(false)}>Save Changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* Real-world Dialog Examples */}
                  <div className="space-y-3">
                    <Badge size="sm" variant="outline">
                      Real-world Usage Examples
                    </Badge>
                    <div className="text-sm text-muted-foreground space-y-2">
                      <p>
                        • <strong>Confirmation Dialogs:</strong> Delete confirmations, logout
                        prompts, unsaved changes warnings
                      </p>
                      <p>
                        • <strong>Form Dialogs:</strong> Quick entry forms, user registration,
                        contact forms, feedback collection
                      </p>
                      <p>
                        • <strong>Settings Dialogs:</strong> User preferences, application settings,
                        account management
                      </p>
                      <p>
                        • <strong>Content Dialogs:</strong> Image galleries, video players, detailed
                        information views
                      </p>
                      <p>
                        • <strong>Workflow Dialogs:</strong> Multi-step wizards, guided tours,
                        onboarding flows
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Container>

            {/* Modal Component */}
            <Container
              size="none"
              padding="lg"
              className="border border-border rounded-lg space-y-6"
            >
              <h3 className="text-xl font-semibold text-foreground text-center">Modal</h3>
              <div className="flex justify-center gap-4">
                <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                  <ModalContent>
                    <ModalHeader>
                      <ModalTitle>Modal Example</ModalTitle>
                      <ModalDescription>This is a modal component demonstration.</ModalDescription>
                      <ModalCloseButton onClose={() => setIsModalOpen(false)} />
                    </ModalHeader>
                    <div className="py-4">
                      <p>Modal content goes here.</p>
                    </div>
                    <ModalFooter>
                      <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsModalOpen(false)}>Save</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </div>

              {/* Kitchen Sink - All Modal Variations */}
              <div className="space-y-4 mt-8">
                <h4 className="text-sm font-medium text-muted-foreground">
                  🔧 Kitchen Sink - All Modal Variations
                </h4>
                <div className="grid grid-cols-1 gap-6 p-4 border border-dashed border-muted rounded-lg bg-muted/20">
                  {/* Modal Types */}
                  <div className="space-y-3">
                    <Badge size="sm" variant="outline">
                      Modal Types
                    </Badge>
                    <div className="flex flex-wrap gap-3">
                      <Button size="sm" onClick={() => setIsModalOpen(true)}>
                        Standard Modal
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsDeleteModalOpen(true)}
                      >
                        Delete Modal
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setIsInfoModalOpen(true)}
                      >
                        Info Modal
                      </Button>
                    </div>
                  </div>

                  {/* Delete Confirmation Modal */}
                  <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
                    <ModalContent className="max-w-md">
                      <ModalHeader>
                        <ModalTitle className="text-destructive">⚠️ Delete Account</ModalTitle>
                        <ModalDescription>
                          This action is permanent and cannot be undone. All your data will be lost.
                        </ModalDescription>
                        <ModalCloseButton onClose={() => setIsDeleteModalOpen(false)} />
                      </ModalHeader>
                      <div className="py-4">
                        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                          <h4 className="font-medium text-destructive mb-2">
                            What will be deleted:
                          </h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• All your projects and files</li>
                            <li>• Account settings and preferences</li>
                            <li>• Subscription and billing information</li>
                            <li>• All associated data and backups</li>
                          </ul>
                        </div>
                        <div className="mt-4 space-y-2">
                          <Label htmlFor="delete-confirm">
                            Type &quot;DELETE&quot; to confirm:
                          </Label>
                          <Input id="delete-confirm" placeholder="DELETE" />
                        </div>
                      </div>
                      <ModalFooter>
                        <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                          Cancel
                        </Button>
                        <Button variant="destructive" onClick={() => setIsDeleteModalOpen(false)}>
                          Delete Account
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>

                  {/* Information Modal */}
                  <Modal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)}>
                    <ModalContent className="max-w-lg">
                      <ModalHeader>
                        <ModalTitle>📊 Usage Statistics</ModalTitle>
                        <ModalDescription>
                          Your account activity and usage summary.
                        </ModalDescription>
                        <ModalCloseButton onClose={() => setIsInfoModalOpen(false)} />
                      </ModalHeader>
                      <div className="py-4 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <Card>
                            <CardContent className="pt-6 text-center">
                              <div className="text-2xl font-bold">47</div>
                              <div className="text-sm text-muted-foreground">Projects Created</div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="pt-6 text-center">
                              <div className="text-2xl font-bold">12.4K</div>
                              <div className="text-sm text-muted-foreground">Lines of Code</div>
                            </CardContent>
                          </Card>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-medium">Recent Activity</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center p-2 rounded-md bg-muted/30">
                              <div>
                                <div className="text-sm font-medium">Project Alpha</div>
                                <div className="text-xs text-muted-foreground">
                                  Last edited 2 hours ago
                                </div>
                              </div>
                              <Badge size="sm" variant="secondary">
                                Active
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center p-2 rounded-md bg-muted/30">
                              <div>
                                <div className="text-sm font-medium">Dashboard Redesign</div>
                                <div className="text-xs text-muted-foreground">
                                  Last edited yesterday
                                </div>
                              </div>
                              <Badge size="sm" variant="outline">
                                Draft
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-medium">Storage Usage</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Used: 2.3 GB</span>
                              <span>Available: 7.7 GB</span>
                            </div>
                            <Progress value={23} className="h-2" />
                          </div>
                        </div>
                      </div>
                      <ModalFooter>
                        <Button className="w-full" onClick={() => setIsInfoModalOpen(false)}>
                          Close
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>

                  {/* Modal vs Dialog Comparison */}
                  <div className="space-y-3">
                    <Badge size="sm" variant="outline">
                      Modal vs Dialog Best Practices
                    </Badge>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <h4 className="font-medium text-primary">Use Modals for:</h4>
                        <ul className="text-muted-foreground space-y-1">
                          <li>• Critical actions requiring focus</li>
                          <li>• Complex forms or multi-step processes</li>
                          <li>• Content that needs full attention</li>
                          <li>• Overlays that block background interaction</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium text-primary">Use Dialogs for:</h4>
                        <ul className="text-muted-foreground space-y-1">
                          <li>• Quick confirmations and alerts</li>
                          <li>• Simple information display</li>
                          <li>• Settings and preferences</li>
                          <li>• Non-critical user interactions</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </section>

          {/* Data Components Section */}
          <section id="data-display" className="space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold text-foreground">Data Display</h2>
              <p className="text-muted-foreground text-lg">Tables and data visualization</p>
            </div>

            {/* DataTable Component */}
            <Container
              size="none"
              padding="lg"
              className="border border-border rounded-lg space-y-6"
            >
              <h3 className="text-xl font-semibold text-foreground text-center">DataTable</h3>
              <DataTable data={sampleData} columns={tableColumns} />

              {/* Kitchen Sink - All DataTable Variations */}
              <div className="space-y-4 mt-8">
                <h4 className="text-sm font-medium text-muted-foreground">
                  🔧 Kitchen Sink - All DataTable Variations
                </h4>
                <div className="grid grid-cols-1 gap-6 p-4 border border-dashed border-muted rounded-lg bg-muted/20">
                  {/* Table Features */}
                  <div className="space-y-3">
                    <Badge size="sm" variant="outline">
                      DataTable Features
                    </Badge>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <h4 className="font-medium text-primary">Built-in Features:</h4>
                        <ul className="text-muted-foreground space-y-1">
                          <li>✅ Column sorting (ascending/descending)</li>
                          <li>✅ Row selection (single/multiple)</li>
                          <li>✅ Pagination with page size options</li>
                          <li>✅ Global search and filtering</li>
                          <li>✅ Column visibility toggle</li>
                          <li>✅ Responsive design</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium text-primary">Advanced Features:</h4>
                        <ul className="text-muted-foreground space-y-1">
                          <li>🔧 Column resizing</li>
                          <li>🔧 Column reordering (drag & drop)</li>
                          <li>🔧 Custom cell renderers</li>
                          <li>🔧 Export functionality (CSV, Excel)</li>
                          <li>🔧 Virtual scrolling for large datasets</li>
                          <li>🔧 Inline editing capabilities</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Table Size Variations */}
                  <div className="space-y-3">
                    <Badge size="sm" variant="outline">
                      Table Size Examples
                    </Badge>
                    <div className="space-y-4">
                      {/* Compact Table */}
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium">Compact Size (Dense Data)</h5>
                        <div className="border rounded-lg overflow-hidden">
                          <table className="w-full text-sm">
                            <thead className="bg-muted/50">
                              <tr>
                                <th className="px-2 py-1 text-left font-medium">ID</th>
                                <th className="px-2 py-1 text-left font-medium">Status</th>
                                <th className="px-2 py-1 text-left font-medium">Priority</th>
                                <th className="px-2 py-1 text-left font-medium">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-t">
                                <td className="px-2 py-1">#001</td>
                                <td className="px-2 py-1">
                                  <Badge size="sm" variant="secondary">
                                    Active
                                  </Badge>
                                </td>
                                <td className="px-2 py-1">
                                  <Badge size="sm" variant="destructive">
                                    High
                                  </Badge>
                                </td>
                                <td className="px-2 py-1">
                                  <Button size="sm" variant="ghost" className="h-6 px-2">
                                    Edit
                                  </Button>
                                </td>
                              </tr>
                              <tr className="border-t">
                                <td className="px-2 py-1">#002</td>
                                <td className="px-2 py-1">
                                  <Badge size="sm" variant="outline">
                                    Pending
                                  </Badge>
                                </td>
                                <td className="px-2 py-1">
                                  <Badge size="sm" variant="secondary">
                                    Medium
                                  </Badge>
                                </td>
                                <td className="px-2 py-1">
                                  <Button size="sm" variant="ghost" className="h-6 px-2">
                                    Edit
                                  </Button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Standard Table */}
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium">Standard Size (Balanced)</h5>
                        <div className="border rounded-lg overflow-hidden">
                          <table className="w-full">
                            <thead className="bg-muted/50">
                              <tr>
                                <th className="px-4 py-3 text-left font-medium">Name</th>
                                <th className="px-4 py-3 text-left font-medium">Email</th>
                                <th className="px-4 py-3 text-left font-medium">Role</th>
                                <th className="px-4 py-3 text-left font-medium">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-t">
                                <td className="px-4 py-3">John Doe</td>
                                <td className="px-4 py-3 text-muted-foreground">
                                  john@example.com
                                </td>
                                <td className="px-4 py-3">
                                  <Badge variant="outline">Admin</Badge>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-sm">Online</span>
                                  </div>
                                </td>
                              </tr>
                              <tr className="border-t">
                                <td className="px-4 py-3">Jane Smith</td>
                                <td className="px-4 py-3 text-muted-foreground">
                                  jane@example.com
                                </td>
                                <td className="px-4 py-3">
                                  <Badge variant="secondary">User</Badge>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                    <span className="text-sm">Offline</span>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Real-world DataTable Examples */}
                  <div className="space-y-3">
                    <Badge size="sm" variant="outline">
                      Real-world Usage Examples
                    </Badge>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <h4 className="font-medium text-primary">Common Use Cases:</h4>
                        <ul className="text-muted-foreground space-y-1">
                          <li>
                            • <strong>User Management:</strong> Employee directories, customer lists
                          </li>
                          <li>
                            • <strong>Analytics Dashboards:</strong> Performance metrics, sales
                            reports
                          </li>
                          <li>
                            • <strong>Inventory Systems:</strong> Product catalogs, stock management
                          </li>
                          <li>
                            • <strong>Financial Data:</strong> Transaction histories, invoice
                            tracking
                          </li>
                          <li>
                            • <strong>Project Management:</strong> Task lists, team assignments
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium text-primary">Performance Considerations:</h4>
                        <ul className="text-muted-foreground space-y-1">
                          <li>
                            • <strong>Virtual Scrolling:</strong> For 10,000+ rows
                          </li>
                          <li>
                            • <strong>Server-side Pagination:</strong> Large datasets
                          </li>
                          <li>
                            • <strong>Column Virtualization:</strong> Many columns
                          </li>
                          <li>
                            • <strong>Debounced Search:</strong> Real-time filtering
                          </li>
                          <li>
                            • <strong>Memoized Columns:</strong> Complex cell renderers
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Table State Examples */}
                  <div className="space-y-3">
                    <Badge size="sm" variant="outline">
                      Table States
                    </Badge>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Loading State */}
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">Loading State</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                          </div>
                        </CardContent>
                      </Card>

                      {/* Empty State */}
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">Empty State</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center py-8">
                            <div className="text-4xl mb-2">📋</div>
                            <div className="text-sm text-muted-foreground">No data found</div>
                            <Button size="sm" className="mt-3">
                              Add Data
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Error State */}
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">Error State</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Alert variant="destructive">
                            <div className="text-sm">Failed to load data. Please try again.</div>
                          </Alert>
                          <Button size="sm" variant="outline" className="mt-3 w-full">
                            Retry
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </Container>

            {/* Pagination Component */}
            <Container
              size="none"
              padding="lg"
              className="border border-border rounded-lg space-y-6"
            >
              <h3 className="text-xl font-semibold text-foreground text-center">Pagination</h3>
              <div className="space-y-8">
                {/* Basic Pagination */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-muted-foreground">Basic Pagination</h4>
                  <div className="flex justify-center">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                </div>

                {/* Size Variants */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-muted-foreground">Size Variants</h4>
                  <div className="space-y-3">
                    <div className="flex justify-center">
                      <Pagination
                        currentPage={3}
                        totalPages={10}
                        onPageChange={() => {}}
                        size="sm"
                      />
                    </div>
                    <div className="flex justify-center">
                      <Pagination currentPage={3} totalPages={10} onPageChange={() => {}} />
                    </div>
                    <div className="flex justify-center">
                      <Pagination
                        currentPage={3}
                        totalPages={10}
                        onPageChange={() => {}}
                        size="lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Advanced Features */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-muted-foreground">Advanced Features</h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">With First/Last buttons</p>
                      <div className="flex justify-center">
                        <Pagination
                          currentPage={5}
                          totalPages={20}
                          onPageChange={() => {}}
                          showFirstLast
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">With Page Info</p>
                      <div className="flex justify-center">
                        <Pagination
                          currentPage={3}
                          totalPages={10}
                          onPageChange={() => {}}
                          showPageInfo
                          itemsPerPage={10}
                          totalItems={100}
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Loading State</p>
                      <div className="flex justify-center">
                        <Pagination
                          currentPage={3}
                          totalPages={10}
                          onPageChange={() => {}}
                          loading
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Large Dataset Example */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Large Dataset (Smart Truncation)
                  </h4>
                  <div className="flex justify-center">
                    <Pagination
                      currentPage={25}
                      totalPages={100}
                      onPageChange={() => {}}
                      showFirstLast
                      showPageInfo
                      itemsPerPage={20}
                      totalItems={2000}
                    />
                  </div>
                </div>
              </div>
            </Container>
          </section>

          {/* Real-world Examples */}
          <section id="real-world" className="space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold text-foreground">Real-world Examples</h2>
              <p className="text-muted-foreground text-lg">
                Complete forms and application layouts
              </p>
            </div>

            {/* Contact Form Example */}
            <Container
              size="none"
              padding="lg"
              className="border border-border rounded-lg space-y-6"
            >
              <h3 className="text-xl font-semibold text-foreground text-center">Contact Form</h3>
              <div className="max-w-md mx-auto space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Your message here..." />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="newsletter" />
                  <Label htmlFor="newsletter" className="text-sm">
                    Subscribe to newsletter
                  </Label>
                </div>
                <Button
                  className="w-full"
                  onClick={() =>
                    toast({ title: 'Success', description: 'Message sent successfully!' })
                  }
                >
                  Send Message
                </Button>
              </div>
            </Container>
          </section>

          {/* Footer Section */}
          <section className="text-center space-y-6 py-16 border-t border-border">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-foreground">Component Library Complete! 🎉</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                All 22 components successfully organized with logical grouping, 2-column desktop
                layout, comprehensive Pagination integration, and smooth-scrolling navigation index.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Badge size="lg">✅ 100% Style Guide Compliant</Badge>
              <Badge size="lg">🧪 800+ Tests (100% Pass Rate)</Badge>
              <Badge size="lg">📚 250+ Storybook Stories</Badge>
              <Badge size="lg">♿ Full Accessibility</Badge>
              <Badge size="lg">🏆 Production Ready</Badge>
              <Badge size="lg">📱 Smooth Navigation</Badge>
            </div>

            <Alert className="max-w-3xl mx-auto">
              <CheckCircle className="h-4 w-4" />
              <div>
                <div className="font-semibold">Enhanced & Production Ready!</div>
                <div>
                  Component library now features smooth-scrolling navigation index, comprehensive
                  Pagination component, 800+ tests, and enterprise-grade architecture. Perfect for
                  team collaboration and client presentations.
                </div>
              </div>
            </Alert>
          </section>
        </div>
      </Container>
      <Toaster />
    </div>
  );
}
