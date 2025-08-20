'use client';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Input } from '@/components/ui/Input';
import { Separator } from '@/components/ui/Separator';
import { TooltipProvider } from '@/components/ui/Tooltip';
import { Filter, Search } from 'lucide-react';
import React, { useMemo, useState } from 'react';

// Import component demos - New centralized pattern
import { AccordionDemo } from '@/components/ui/Accordion';
import { AlertDemo } from '@/components/ui/Alert';
import { AlertDialogDemo } from '@/components/ui/AlertDialog';
import { AspectRatioDemo } from '@/components/ui/AspectRatio';
import { AvatarDemo } from '@/components/ui/Avatar';
import { BadgeDemo } from '@/components/ui/Badge';
import { BreadcrumbDemo } from '@/components/ui/Breadcrumb';
import { ButtonDemo } from '@/components/ui/Button';
import { CalendarDemo } from '@/components/ui/Calendar';
import { CardDemo } from '@/components/ui/Card';
import CarouselDemo from '@/components/ui/Carousel/demo';
import ChartDemo from '@/components/ui/Chart/demo';
import { CheckboxDemo } from '@/components/ui/Checkbox';
import CollapsibleDemo from '@/components/ui/Collapsible/demo';
import ColorPickerDemo from '@/components/ui/ColorPicker/demo';
import ComboboxDemo from '@/components/ui/Combobox/demo';
import CommandDemo from '@/components/ui/Command/demo';
import ContextMenuDemo from '@/components/ui/ContextMenu/demo';
import DataTableDemo from '@/components/ui/DataTable/demo';
import DatePickerDemo from '@/components/ui/DatePicker/demo';
import DialogDemo from '@/components/ui/Dialog/demo';
import DropdownMenuDemo from '@/components/ui/DropdownMenu/demo';
import FormDemo from '@/components/ui/Form/demo';
import HoverCardDemo from '@/components/ui/HoverCard/demo';
import { InputDemo } from '@/components/ui/Input';
import LabelDemo from '@/components/ui/Label/demo';
import MenubarDemo from '@/components/ui/Menubar/demo';
import ModalDemo from '@/components/ui/Modal/demo';
import NavigationMenuDemo from '@/components/ui/NavigationMenu/demo';
import PaginationDemo from '@/components/ui/Pagination/demo';
import PopoverDemo from '@/components/ui/Popover/demo';
import ProgressDemo from '@/components/ui/Progress/demo';
import RadioGroupDemo from '@/components/ui/RadioGroup/demo';
import ResizableDemo from '@/components/ui/Resizable/demo';
import ScrollAreaDemo from '@/components/ui/ScrollArea/demo';
import SelectDemo from '@/components/ui/Select/demo';
import SeparatorDemo from '@/components/ui/Separator/demo';
import SheetDemo from '@/components/ui/Sheet/demo';
import SkeletonDemo from '@/components/ui/Skeleton/demo';
import SliderDemo from '@/components/ui/Slider/demo';
import SonnerDemo from '@/components/ui/Sonner/demo';
import SwitchDemo from '@/components/ui/Switch/demo';
import TableDemo from '@/components/ui/Table/demo';
import TabsDemo from '@/components/ui/Tabs/demo';
import TextareaDemo from '@/components/ui/Textarea/demo';
import ThemeToggleDemo from '@/components/ui/ThemeToggle/demo';
import ToastDemo from '@/components/ui/Toast/demo';
import { ToggleDemo } from '@/components/ui/Toggle';
import TooltipDemo from '@/components/ui/Tooltip/demo';

// Component registry with categories
const componentRegistry = [
  // Data Input Components
  {
    name: 'Button',
    demo: ButtonDemo,
    category: 'Data Input',
    description: 'Interactive button controls',
  },
  { name: 'Input', demo: InputDemo, category: 'Data Input', description: 'Text input fields' },
  {
    name: 'Textarea',
    demo: TextareaDemo,
    category: 'Data Input',
    description: 'Multi-line text inputs',
  },
  {
    name: 'Select',
    demo: SelectDemo,
    category: 'Data Input',
    description: 'Dropdown selection inputs',
  },
  {
    name: 'Checkbox',
    demo: CheckboxDemo,
    category: 'Data Input',
    description: 'Boolean input controls',
  },
  {
    name: 'RadioGroup',
    demo: RadioGroupDemo,
    category: 'Data Input',
    description: 'Single-choice input groups',
  },
  {
    name: 'Switch',
    demo: SwitchDemo,
    category: 'Data Input',
    description: 'Toggle switch controls',
  },
  { name: 'Slider', demo: SliderDemo, category: 'Data Input', description: 'Range input controls' },
  {
    name: 'DatePicker',
    demo: DatePickerDemo,
    category: 'Data Input',
    description: 'Date selection component',
  },
  {
    name: 'Calendar',
    demo: CalendarDemo,
    category: 'Data Input',
    description: 'Date selection interface',
  },
  {
    name: 'ColorPicker',
    demo: ColorPickerDemo,
    category: 'Data Input',
    description: 'Color selection interface',
  },
  {
    name: 'Combobox',
    demo: ComboboxDemo,
    category: 'Data Input',
    description: 'Searchable select input',
  },
  {
    name: 'Form',
    demo: FormDemo,
    category: 'Data Input',
    description: 'Form validation and handling',
  },
  { name: 'Label', demo: LabelDemo, category: 'Data Input', description: 'Form field labels' },
  {
    name: 'Toggle',
    demo: ToggleDemo,
    category: 'Data Input',
    description: 'Toggle button controls',
  },

  // Data Display Components
  {
    name: 'Badge',
    demo: BadgeDemo,
    category: 'Data Display',
    description: 'Small status indicators',
  },
  {
    name: 'Avatar',
    demo: AvatarDemo,
    category: 'Data Display',
    description: 'User profile pictures',
  },
  {
    name: 'Table',
    demo: TableDemo,
    category: 'Data Display',
    description: 'Structured data tables',
  },
  {
    name: 'DataTable',
    demo: DataTableDemo,
    category: 'Data Display',
    description: 'Sortable data tables',
  },
  {
    name: 'Carousel',
    demo: CarouselDemo,
    category: 'Data Display',
    description: 'Scrollable content gallery',
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
  { name: 'Card', demo: CardDemo, category: 'Layout', description: 'Flexible content containers' },
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

  return (
    <TooltipProvider>
      <div className="container mx-auto p-6 space-y-6">
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
            const DemoComponent = component.demo;

            return (
              <Card key={component.name} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{component.name}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {component.category}
                      </Badge>
                    </div>
                    <CardDescription>{component.description}</CardDescription>
                  </div>
                </CardHeader>

                <Separator />
                <CardContent className="pt-6">
                  <div className="rounded-lg border bg-muted/50 overflow-hidden">
                    <React.Suspense
                      fallback={
                        <div className="p-8 text-center text-muted-foreground">
                          Loading {component.name} demo...
                        </div>
                      }
                    >
                      <DemoComponent />
                    </React.Suspense>
                  </div>
                </CardContent>
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
      </div>
    </TooltipProvider>
  );
}
