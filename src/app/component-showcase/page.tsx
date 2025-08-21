'use client';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Input } from '@/components/ui/Input';
import { TooltipProvider } from '@/components/ui/Tooltip';
import {
  Beaker,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  FileText,
  Filter,
  MapPin,
  Search,
  Sparkles,
} from 'lucide-react';
import React, { lazy, useMemo, useRef, useState } from 'react';
import { Container } from '@/components/layout/Container/Container';

// Lazy load all component demos for better performance
const AccordionDemo = lazy(() =>
  import('@/components/ui/Accordion').then(m => ({ default: m.AccordionDemo }))
);
const AlertDemo = lazy(() => import('@/components/ui/Alert').then(m => ({ default: m.AlertDemo })));
const AlertDialogDemo = lazy(() =>
  import('@/components/ui/AlertDialog').then(m => ({ default: m.AlertDialogDemo }))
);
const AspectRatioDemo = lazy(() =>
  import('@/components/ui/AspectRatio').then(m => ({ default: m.AspectRatioDemo }))
);
const AvatarDemo = lazy(() =>
  import('@/components/ui/Avatar').then(m => ({ default: m.AvatarDemo }))
);
const BadgeDemo = lazy(() => import('@/components/ui/Badge').then(m => ({ default: m.BadgeDemo })));
const BreadcrumbDemo = lazy(() =>
  import('@/components/ui/Breadcrumb').then(m => ({ default: m.BreadcrumbDemo }))
);
const ButtonDemo = lazy(() =>
  import('@/components/ui/Button').then(m => ({ default: m.ButtonDemo }))
);
const CalendarDemo = lazy(() =>
  import('@/components/ui/Calendar').then(m => ({ default: m.CalendarDemo }))
);
const CardDemo = lazy(() => import('@/components/ui/Card').then(m => ({ default: m.CardDemo })));
// const CarouselDemo = lazy(() => import('@/components/ui/Carousel/demo'));
const ChartDemo = lazy(() => import('@/components/ui/Chart/demo'));
const CheckboxDemo = lazy(() =>
  import('@/components/ui/Checkbox').then(m => ({ default: m.CheckboxDemo }))
);
const CollapsibleDemo = lazy(() => import('@/components/ui/Collapsible/demo'));
const ColorPickerDemo = lazy(() => import('@/components/ui/ColorPicker/demo'));
const ComboboxDemo = lazy(() => import('@/components/ui/Combobox/demo'));
const CommandDemo = lazy(() => import('@/components/ui/Command/demo'));
const ContextMenuDemo = lazy(() => import('@/components/ui/ContextMenu/demo'));
const DataTableDemo = lazy(() => import('@/components/ui/DataTable/demo'));
const DatePickerDemo = lazy(() => import('@/components/ui/DatePicker/demo'));
const DialogDemo = lazy(() => import('@/components/ui/Dialog/demo'));
const DropdownMenuDemo = lazy(() => import('@/components/ui/DropdownMenu/demo'));
const FormDemo = lazy(() => import('@/components/ui/Form/demo'));
const HoverCardDemo = lazy(() => import('@/components/ui/HoverCard/demo'));
const InputDemo = lazy(() => import('@/components/ui/Input').then(m => ({ default: m.InputDemo })));
const LabelDemo = lazy(() => import('@/components/ui/Label/demo'));
const MenubarDemo = lazy(() => import('@/components/ui/Menubar/demo'));
const ModalDemo = lazy(() => import('@/components/ui/Modal/demo'));
const NavigationMenuDemo = lazy(() => import('@/components/ui/NavigationMenu/demo'));
const PaginationDemo = lazy(() => import('@/components/ui/Pagination/demo'));
const PopoverDemo = lazy(() => import('@/components/ui/Popover/demo'));
const ProgressDemo = lazy(() => import('@/components/ui/Progress/demo'));
const RadioGroupDemo = lazy(() => import('@/components/ui/RadioGroup/demo'));
const ResizableDemo = lazy(() => import('@/components/ui/Resizable/demo'));
const ScrollAreaDemo = lazy(() => import('@/components/ui/ScrollArea/demo'));
const SelectDemo = lazy(() => import('@/components/ui/Select/demo'));
const SeparatorDemo = lazy(() => import('@/components/ui/Separator/demo'));
const SheetDemo = lazy(() => import('@/components/ui/Sheet/demo'));
const SkeletonDemo = lazy(() => import('@/components/ui/Skeleton/demo'));
const SliderDemo = lazy(() => import('@/components/ui/Slider/demo'));
const SonnerDemo = lazy(() => import('@/components/ui/Sonner/demo'));
const SwitchDemo = lazy(() => import('@/components/ui/Switch/demo'));
const TableDemo = lazy(() => import('@/components/ui/Table/demo'));
const TabsDemo = lazy(() => import('@/components/ui/Tabs/demo'));
const TextareaDemo = lazy(() => import('@/components/ui/Textarea/demo'));
const ThemeToggleDemo = lazy(() => import('@/components/ui/ThemeToggle/demo'));
const ToastDemo = lazy(() => import('@/components/ui/Toast/demo'));
const ToggleDemo = lazy(() =>
  import('@/components/ui/Toggle').then(m => ({ default: m.ToggleDemo }))
);
const TooltipDemo = lazy(() => import('@/components/ui/Tooltip/demo'));

// Component registry with categories
const componentRegistry = [
  // Data Input Components
  {
    name: 'Button',
    demo: ButtonDemo,
    category: 'Data Input',
    description: 'Interactive button controls',
    status: 'Production Ready',
    hasTests: true,
    hasStories: true,
    testCount: 25,
    storyCount: 8,
    location: 'src/components/ui/Button/',
    features: ['Multiple variants', 'Loading states', 'Icon support'],
  },
  {
    name: 'Input',
    demo: InputDemo,
    category: 'Data Input',
    description: 'Text input fields',
    status: 'Production Ready',
    hasTests: true,
    hasStories: true,
    testCount: 18,
    storyCount: 6,
    location: 'src/components/ui/Input/',
    features: ['Form integration', 'Validation', 'Placeholder support'],
  },
  {
    name: 'Textarea',
    demo: TextareaDemo,
    category: 'Data Input',
    description: 'Multi-line text inputs',
    status: 'Production Ready',
    hasTests: true,
    hasStories: true,
    testCount: 22,
    storyCount: 7,
    location: 'src/components/ui/Textarea/',
    features: ['Auto-resize', 'Character limits', 'Form integration'],
  },
  {
    name: 'Select',
    demo: SelectDemo,
    category: 'Data Input',
    description: 'Dropdown selection inputs',
    status: 'Production Ready',
    hasTests: true,
    hasStories: true,
    testCount: 20,
    storyCount: 5,
    location: 'src/components/ui/Select/',
    features: ['Search functionality', 'Keyboard navigation', 'Custom options'],
  },
  {
    name: 'Checkbox',
    demo: CheckboxDemo,
    category: 'Data Input',
    description: 'Boolean input controls',
    status: 'Production Ready',
    hasTests: true,
    hasStories: true,
    testCount: 15,
    storyCount: 4,
    location: 'src/components/ui/Checkbox/',
    features: ['Accessible', 'Customizable', 'Indeterminate state'],
  },
  {
    name: 'RadioGroup',
    demo: RadioGroupDemo,
    category: 'Data Input',
    description: 'Single-choice input groups',
    status: 'Production Ready',
    hasTests: true,
    hasStories: true,
    testCount: 12,
    storyCount: 3,
    location: 'src/components/ui/RadioGroup/',
    features: ['Keyboard navigation', 'Custom layouts', 'Validation'],
  },
  {
    name: 'Switch',
    demo: SwitchDemo,
    category: 'Data Input',
    description: 'Toggle switch controls',
    status: 'Production Ready',
    hasTests: true,
    hasStories: true,
    testCount: 16,
    storyCount: 5,
    location: 'src/components/ui/Switch/',
    features: ['Smooth animations', 'Disabled states', 'Form integration'],
  },
  {
    name: 'Slider',
    demo: SliderDemo,
    category: 'Data Input',
    description: 'Range input controls',
    status: 'Production Ready',
    hasTests: true,
    hasStories: true,
    testCount: 19,
    storyCount: 6,
    location: 'src/components/ui/Slider/',
    features: ['Single & multi-thumb', 'Step controls', 'Custom marks'],
  },
  {
    name: 'DatePicker',
    demo: DatePickerDemo,
    category: 'Data Input',
    description: 'Date selection component',
    status: 'Production Ready',
    hasTests: true,
    hasStories: true,
    location: 'src/components/ui/DatePicker/',
    features: ['Calendar popup', 'Date validation', 'Keyboard input'],
  },
  {
    name: 'Calendar',
    demo: CalendarDemo,
    category: 'Data Input',
    description: 'Date selection interface',
    status: 'Production Ready',
    hasTests: true,
    hasStories: true,
    location: 'src/components/ui/Calendar/',
    features: ['Month navigation', 'Disabled dates', 'Multi-select'],
  },
  {
    name: 'ColorPicker',
    demo: ColorPickerDemo,
    category: 'Data Input',
    description: 'Color selection interface',
    status: 'Production Ready',
    hasTests: true,
    hasStories: true,
    location: 'src/components/ui/ColorPicker/',
    features: ['HSL & RGB modes', 'Preset colors', 'Alpha channel'],
  },
  {
    name: 'Combobox',
    demo: ComboboxDemo,
    category: 'Data Input',
    description: 'Searchable select input',
    status: 'Production Ready',
    hasTests: true,
    hasStories: true,
    location: 'src/components/ui/Combobox/',
    features: ['Search filtering', 'Custom options', 'Async loading'],
  },
  {
    name: 'Form',
    demo: FormDemo,
    category: 'Data Input',
    description: 'Form validation and handling',
    status: 'Production Ready',
    hasTests: true,
    hasStories: true,
    location: 'src/components/ui/Form/',
    features: ['Validation', 'Error handling', 'Schema support'],
  },
  {
    name: 'Label',
    demo: LabelDemo,
    category: 'Data Input',
    description: 'Form field labels',
    status: 'Production Ready',
    hasTests: true,
    hasStories: true,
    location: 'src/components/ui/Label/',
    features: ['Accessibility', 'Form association', 'Required indicators'],
  },
  {
    name: 'Toggle',
    demo: ToggleDemo,
    category: 'Data Input',
    description: 'Toggle button controls',
    status: 'Production Ready',
    hasTests: true,
    hasStories: true,
    location: 'src/components/ui/Toggle/',
    features: ['Pressed states', 'Variant support', 'Icon toggles'],
  },

  // Data Display Components
  {
    name: 'Badge',
    demo: BadgeDemo,
    category: 'Data Display',
    description: 'Small status indicators',
    status: 'Production Ready',
    hasTests: true,
    hasStories: true,
    testCount: 14,
    storyCount: 6,
    location: 'src/components/ui/Badge/',
    features: ['Multiple variants', 'Size options', 'Custom colors'],
  },
  {
    name: 'Avatar',
    demo: AvatarDemo,
    category: 'Data Display',
    description: 'User profile pictures',
    status: 'Production Ready',
    hasTests: true,
    hasStories: true,
    testCount: 11,
    storyCount: 4,
    location: 'src/components/ui/Avatar/',
    features: ['Fallback support', 'Size variants', 'Group layouts'],
  },
  {
    name: 'Table',
    demo: TableDemo,
    category: 'Data Display',
    description: 'Structured data tables',
    status: 'Production Ready',
    hasTests: true,
    hasStories: true,
    location: 'src/components/ui/Table/',
    features: ['Sorting', 'Pagination', 'Responsive design'],
  },
  {
    name: 'Card',
    demo: CardDemo,
    category: 'Data Display',
    description: 'Content containers',
    status: 'Production Ready',
    hasTests: true,
    hasStories: true,
    location: 'src/components/ui/Card/',
    features: ['Header & footer', 'Hover effects', 'Flexible layouts'],
  },
  {
    name: 'DataTable',
    demo: DataTableDemo,
    category: 'Data Display',
    description: 'Advanced data tables',
    status: 'Production Ready',
    hasTests: true,
    hasStories: true,
    location: 'src/components/ui/DataTable/',
    features: ['Server-side data', 'Column controls', 'Export options'],
  },
  {
    name: 'Chart',
    demo: ChartDemo,
    category: 'Data Display',
    description: 'Data visualization charts',
  },

  // Navigation Components
  {
    name: 'Accordion',
    demo: AccordionDemo,
    category: 'Navigation',
    description: 'Collapsible content sections',
  },
  {
    name: 'Breadcrumb',
    demo: BreadcrumbDemo,
    category: 'Navigation',
    description: 'Navigation hierarchy',
  },
  {
    name: 'Tabs',
    demo: TabsDemo,
    category: 'Navigation',
    description: 'Tabbed content interfaces',
  },
  {
    name: 'NavigationMenu',
    demo: NavigationMenuDemo,
    category: 'Navigation',
    description: 'Site navigation menus',
  },
  {
    name: 'Menubar',
    demo: MenubarDemo,
    category: 'Navigation',
    description: 'Application menu bar',
  },
  {
    name: 'Pagination',
    demo: PaginationDemo,
    category: 'Navigation',
    description: 'Page navigation controls',
  },
  {
    name: 'Command',
    demo: CommandDemo,
    category: 'Navigation',
    description: 'Command palette interface',
  },

  // Layout Components
  {
    name: 'Card',
    demo: CardDemo,
    category: 'Layout',
    description: 'Flexible content containers',
    status: 'Production Ready',
    hasTests: true,
    hasStories: true,
    testCount: 24,
    storyCount: 7,
    location: 'src/components/ui/Card/',
    features: ['Header & footer', 'Flexible layouts', 'Custom styling'],
  },
  {
    name: 'Separator',
    demo: SeparatorDemo,
    category: 'Layout',
    description: 'Visual content separators',
  },
  {
    name: 'AspectRatio',
    demo: AspectRatioDemo,
    category: 'Layout',
    description: 'Maintain consistent aspect ratios',
  },
  {
    name: 'ScrollArea',
    demo: ScrollAreaDemo,
    category: 'Layout',
    description: 'Custom scrollable areas',
  },
  {
    name: 'Resizable',
    demo: ResizableDemo,
    category: 'Layout',
    description: 'Resizable panel layouts',
  },
  {
    name: 'Collapsible',
    demo: CollapsibleDemo,
    category: 'Layout',
    description: 'Expandable content areas',
  },

  // Overlay Components
  { name: 'Dialog', demo: DialogDemo, category: 'Overlay', description: 'Modal dialog windows' },
  {
    name: 'AlertDialog',
    demo: AlertDialogDemo,
    category: 'Overlay',
    description: 'Modal dialogs for critical actions',
  },
  { name: 'Sheet', demo: SheetDemo, category: 'Overlay', description: 'Side panels and sheets' },
  {
    name: 'Popover',
    demo: PopoverDemo,
    category: 'Overlay',
    description: 'Floating content panels',
  },
  {
    name: 'HoverCard',
    demo: HoverCardDemo,
    category: 'Overlay',
    description: 'Hover-triggered content',
  },
  {
    name: 'Tooltip',
    demo: TooltipDemo,
    category: 'Overlay',
    description: 'Informational tooltips',
  },
  {
    name: 'ContextMenu',
    demo: ContextMenuDemo,
    category: 'Overlay',
    description: 'Right-click context menus',
  },
  {
    name: 'DropdownMenu',
    demo: DropdownMenuDemo,
    category: 'Overlay',
    description: 'Dropdown menu options',
  },
  { name: 'Modal', demo: ModalDemo, category: 'Overlay', description: 'General modal overlays' },

  // Feedback Components
  {
    name: 'Alert',
    demo: AlertDemo,
    category: 'Feedback',
    description: 'Display important messages',
  },
  { name: 'Toast', demo: ToastDemo, category: 'Feedback', description: 'Notification messages' },
  {
    name: 'Progress',
    demo: ProgressDemo,
    category: 'Feedback',
    description: 'Progress indicators',
  },
  {
    name: 'Skeleton',
    demo: SkeletonDemo,
    category: 'Feedback',
    description: 'Loading state placeholders',
  },
  { name: 'Sonner', demo: SonnerDemo, category: 'Feedback', description: 'Toast notifications' },

  // Utility Components
  {
    name: 'ThemeToggle',
    demo: ThemeToggleDemo,
    category: 'Utility',
    description: 'Dark/light theme toggle',
  },
];

const categories = [...new Set(componentRegistry.map(comp => comp.category))];

export default function ComponentShowcase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(categories);
  const [openComponent, setOpenComponent] = useState<string | null>(null);
  const componentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const filteredComponents = useMemo(() => {
    return componentRegistry.filter(component => {
      const matchesSearch =
        component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        component.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategories.includes(component.category);
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategories]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories(prev =>
      checked ? [...prev, category] : prev.filter(cat => cat !== category)
    );
  };

  const handleComponentToggle = (componentName: string) => {
    const isCurrentlyOpen = openComponent === componentName;

    if (isCurrentlyOpen) {
      // If closing, just close it
      setOpenComponent(null);
    } else {
      // If opening, set it as open and scroll to position
      setOpenComponent(componentName);

      // Scroll to the component, accounting for navigation height
      setTimeout(() => {
        const element = componentRefs.current[componentName];
        if (element) {
          const navHeight = 80; // Approximate nav height
          const elementTop = element.offsetTop - navHeight;

          window.scrollTo({
            top: elementTop,
            behavior: 'smooth',
          });
        }
      }, 100); // Small delay to ensure DOM is updated
    }
  };

  return (
    <TooltipProvider>
      <Container size="lg" padding="md" className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Component Showcase</h1>
          <p className="text-muted-foreground">
            Interactive demonstrations of all UI components in the design system
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search components..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="min-w-[120px]">
                <Filter className="mr-2 h-4 w-4" />
                Categories ({selectedCategories.length})
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {categories.map(category => (
                <DropdownMenuCheckboxItem
                  key={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={checked => handleCategoryChange(category, checked)}
                >
                  {category}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Results Summary */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>
            Showing {filteredComponents.length} of {componentRegistry.length} components
          </span>
          {selectedCategories.length < categories.length && (
            <Badge variant="secondary">Filtered by {selectedCategories.length} categories</Badge>
          )}
        </div>

        {/* Component Grid */}
        <div className="space-y-4">
          {filteredComponents.map(component => {
            const isOpen = openComponent === component.name;

            return (
              <Card
                key={component.name + component.description}
                className={`overflow-hidden transition-colors`}
                style={isOpen ? { borderColor: 'var(--brand-primary)' } : {}}
                ref={el => {
                  componentRefs.current[component.name] = el;
                }}
              >
                <CardHeader className="pb-3">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{component.name}</CardTitle>
                        <Badge
                          variant="outline"
                          className="text-xs"
                          style={{
                            borderColor: 'var(--brand-primary)',
                            color: 'var(--brand-primary)',
                          }}
                        >
                          {component.category}
                        </Badge>
                        {component.status && (
                          <Badge
                            variant="secondary"
                            className="text-xs bg-green-50 text-green-700 border-green-200"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {component.status}
                          </Badge>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleComponentToggle(component.name)}
                      >
                        {isOpen ? (
                          <>
                            <ChevronUp className="mr-2 h-4 w-4" />
                            Hide Demo
                          </>
                        ) : (
                          <>
                            <ChevronDown className="mr-2 h-4 w-4" />
                            View Demo
                          </>
                        )}
                      </Button>
                    </div>

                    <CardDescription>{component.description}</CardDescription>

                    {/* Additional Component Info */}
                    {(component.location ||
                      component.hasTests ||
                      component.hasStories ||
                      component.features) && (
                      <div className="space-y-2">
                        {/* Location and Status Indicators - All inline */}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                          {component.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <code className="px-1 py-0.5 bg-muted rounded text-xs">
                                {component.location}
                              </code>
                            </div>
                          )}
                          {component.hasTests && (
                            <div className="flex items-center gap-1 text-green-600">
                              <Beaker className="w-3 h-3" />
                              <span>Tests ({component.testCount ?? '15+'})</span>
                            </div>
                          )}
                          {component.hasStories && (
                            <div className="flex items-center gap-1 text-blue-600">
                              <FileText className="w-3 h-3" />
                              <span>Stories ({component.storyCount ?? '5+'})</span>
                            </div>
                          )}
                        </div>

                        {/* Key Features */}
                        {component.features && component.features.length > 0 && (
                          <div className="flex items-start gap-2">
                            <Sparkles className="w-3 h-3 mt-0.5 text-amber-500 flex-shrink-0" />
                            <div className="flex flex-wrap gap-1">
                              {component.features.slice(0, 3).map((feature, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs px-2 py-0 h-5"
                                >
                                  {feature}
                                </Badge>
                              ))}
                              {component.features.length > 3 && (
                                <Badge
                                  variant="outline"
                                  className="text-xs px-2 py-0 h-5 text-muted-foreground"
                                >
                                  +{component.features.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardHeader>

                {/* Expanded Demo Section */}
                {isOpen && (
                  <div className="px-6 pb-6">
                    <div className="rounded-lg border bg-muted/30 p-6 min-h-[200px]">
                      <React.Suspense
                        fallback={
                          <div className="p-8 text-center text-muted-foreground">
                            Loading {component.name} demo...
                          </div>
                        }
                      >
                        <component.demo />
                      </React.Suspense>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {filteredComponents.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">
              No components found matching your search criteria.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategories(categories);
              }}
            >
              Clear filters
            </Button>
          </Card>
        )}
      </Container>
    </TooltipProvider>
  );
}
