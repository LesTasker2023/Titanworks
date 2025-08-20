'use client';

import { useState } from 'react';

// 🎯 UNIFIED UI IMPORTS - Clean barrel export from our component library
import {
  // Interactive Components
  Accordion,
  // Feedback Components
  Alert,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  // Layout Components
  AspectRatio,
  Badge,
  // Navigation Components
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  // Core Form Components
  Button,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Combobox,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
  DatePicker,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Form,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Input,
  Label,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Skeleton,
  Slider,
  Switch,
  // Data Components
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Toggle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui';

/**
 * 🎯 SYSTEMATIC COMPONENT SHOWCASE
 *
 * Clean tabbed architecture for organized component demonstrations
 * - Basic: Core 47 components (building 1-by-1)
 * - Compound: Complex combinations (future)
 * - Advanced: Custom compositions (future)
 */
export default function ComponentShowcase() {
  const [inputValue, setInputValue] = useState('');
  const [sliderValue, setSliderValue] = useState([50]);
  const [isChecked, setIsChecked] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [selectValue, setSelectValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [comboboxValue, setComboboxValue] = useState('');
  const [frameworkValue, setFrameworkValue] = useState('');
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [toggleStates, setToggleStates] = useState<{ [key: string]: boolean }>({});

  // Sample table data
  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
  ];

  // Sample accordion data
  const accordionData = [
    {
      title: 'Getting Started',
      content: (
        <div className="space-y-2">
          <p>Welcome to our platform! Here&apos;s how to get started with your account.</p>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Complete your profile</li>
            <li>Set up your preferences</li>
            <li>Explore the features</li>
          </ul>
        </div>
      ),
    },
    {
      title: 'Account Settings',
      content: (
        <div className="space-y-2">
          <p>Manage your account settings and preferences.</p>
          <p className="text-sm">
            You can update your profile, change passwords, and configure notifications.
          </p>
        </div>
      ),
    },
    {
      title: 'Support & Help',
      content: (
        <div className="space-y-2">
          <p>Need help? We&apos;re here to assist you.</p>
          <div className="text-sm space-y-1">
            <p>📧 Email: support@example.com</p>
            <p>💬 Live chat available 24/7</p>
            <p>📚 Check our knowledge base</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Component Showcase</h1>
          <p className="text-muted-foreground">Systematic demonstration of our entire UI library</p>
          <div className="flex justify-center gap-2">
            <Badge variant="default" className="bg-green-500">
              ✅ Core Working
            </Badge>
            <Badge variant="outline">🚧 Building to 47</Badge>
          </div>
        </div>

        {/* Tabbed Architecture */}
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Components</TabsTrigger>
            <TabsTrigger value="compound" disabled>
              Compound (TODO)
            </TabsTrigger>
            <TabsTrigger value="advanced" disabled>
              Advanced (TODO)
            </TabsTrigger>
          </TabsList>

          {/* BASIC COMPONENTS TAB */}
          <TabsContent value="basic" className="space-y-8">
            {/* Progress Tracker */}
            <Card className="border-blue-500 bg-blue-50 dark:bg-blue-950">
              <CardHeader>
                <CardTitle className="text-blue-700 dark:text-blue-300">
                  🚀 Basic Components Progress
                </CardTitle>
                <CardDescription>Building our foundation one component at a time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Component Coverage</span>
                    <span>47/47 components</span>
                  </div>
                  <Progress value={100} className="h-2" />
                  <p className="text-xs text-muted-foreground text-center">
                    � MOMENTUM BUILDING! Next: Sheet, Menubar, NavigationMenu...
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Components Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* 1. Button */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">1</span>
                    Button
                  </CardTitle>
                  <CardDescription>Interactive buttons with variants</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-2 flex-wrap">
                    <Button size="sm">Small</Button>
                    <Button>Default</Button>
                    <Button size="lg">Large</Button>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                  </div>
                  <Button variant="destructive" className="w-full">
                    Destructive
                  </Button>
                </CardContent>
              </Card>

              {/* 2. Input */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">2</span>
                    Input
                  </CardTitle>
                  <CardDescription>Text input fields</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input
                    type="text"
                    placeholder="Type something..."
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                  />
                  <Input type="email" placeholder="Email" />
                  <Input type="password" placeholder="Password" />
                  <Input disabled placeholder="Disabled" />
                  <div className="text-xs text-muted-foreground">
                    Value: {inputValue || 'empty'}
                  </div>
                </CardContent>
              </Card>

              {/* 3. Card */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">3</span>
                    Card
                  </CardTitle>
                  <CardDescription>Content containers</CardDescription>
                </CardHeader>
                <CardContent>
                  <Card className="border-dashed">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Nested</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-muted-foreground">
                        Cards can be nested for complex layouts
                      </p>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>

              {/* 4. Badge */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">4</span>
                    Badge
                  </CardTitle>
                  <CardDescription>Status indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-1 flex-wrap">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    <Badge variant="destructive">Error</Badge>
                    <Badge className="bg-green-500">Success</Badge>
                    <Badge className="bg-yellow-500">Warning</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* 5. Select */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">5</span>
                    Select
                  </CardTitle>
                  <CardDescription>Dropdown selection</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Select value={selectValue} onValueChange={setSelectValue}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="react">React</SelectItem>
                      <SelectItem value="vue">Vue</SelectItem>
                      <SelectItem value="angular">Angular</SelectItem>
                      <SelectItem value="svelte">Svelte</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="text-xs text-muted-foreground">
                    Selected: {selectValue || 'none'}
                  </div>
                </CardContent>
              </Card>

              {/* 6. Textarea */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">6</span>
                    Textarea
                  </CardTitle>
                  <CardDescription>Multi-line input</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Textarea
                    placeholder="Write something..."
                    value={textareaValue}
                    onChange={e => setTextareaValue(e.target.value)}
                    rows={3}
                  />
                  <div className="text-xs text-muted-foreground">
                    {textareaValue.length} characters
                  </div>
                </CardContent>
              </Card>

              {/* 7. Checkbox */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">7</span>
                    Checkbox
                  </CardTitle>
                  <CardDescription>Binary selection</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={isChecked}
                      onCheckedChange={checked => setIsChecked(checked === true)}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      Accept terms
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="newsletter" />
                    <Label htmlFor="newsletter" className="text-sm">
                      Newsletter
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="disabled" disabled />
                    <Label htmlFor="disabled" className="text-sm text-muted-foreground">
                      Disabled
                    </Label>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Terms: {isChecked ? 'Accepted' : 'Not accepted'}
                  </div>
                </CardContent>
              </Card>

              {/* 8. Switch */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">8</span>
                    Switch
                  </CardTitle>
                  <CardDescription>Toggle switches</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifications" className="text-sm">
                      Notifications
                    </Label>
                    <Switch
                      id="notifications"
                      checked={switchValue}
                      onCheckedChange={setSwitchValue}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="darkmode" className="text-sm">
                      Dark Mode
                    </Label>
                    <Switch id="darkmode" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="disabledswitch" className="text-sm text-muted-foreground">
                      Disabled
                    </Label>
                    <Switch id="disabledswitch" disabled />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Notifications: {switchValue ? 'On' : 'Off'}
                  </div>
                </CardContent>
              </Card>

              {/* 9. Slider */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">9</span>
                    Slider
                  </CardTitle>
                  <CardDescription>Range inputs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm">Volume: {sliderValue[0]}%</Label>
                    <Slider
                      value={sliderValue}
                      onValueChange={setSliderValue}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Brightness</Label>
                    <Slider defaultValue={[75]} max={100} step={1} className="mt-2" />
                  </div>
                </CardContent>
              </Card>

              {/* 10. Progress */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">10</span>
                    Progress
                  </CardTitle>
                  <CardDescription>Progress indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Loading</span>
                      <span>33%</span>
                    </div>
                    <Progress value={33} />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Upload</span>
                      <span>100%</span>
                    </div>
                    <Progress value={66} />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Complete</span>
                      <span>100%</span>
                    </div>
                    <Progress value={100} />
                  </div>
                </CardContent>
              </Card>

              {/* 11. Skeleton */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">11</span>
                    Skeleton
                  </CardTitle>
                  <CardDescription>Loading placeholders</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="space-y-1 flex-1">
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-2/3" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 12. Alert */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">12</span>
                    Alert
                  </CardTitle>
                  <CardDescription>Notification messages</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Alert>
                    <div>
                      <h5 className="font-medium text-sm">Info</h5>
                      <p className="text-xs text-muted-foreground">Information alert message</p>
                    </div>
                  </Alert>
                  <Alert variant="destructive">
                    <div>
                      <h5 className="font-medium text-sm">Error</h5>
                      <p className="text-xs text-muted-foreground">Error alert message</p>
                    </div>
                  </Alert>
                </CardContent>
              </Card>

              {/* 13. Separator */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">13</span>
                    Separator
                  </CardTitle>
                  <CardDescription>Visual dividers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">Section 1</div>
                  <Separator />
                  <div className="text-sm">Section 2</div>
                  <Separator />
                  <div className="text-sm">Section 3</div>
                </CardContent>
              </Card>

              {/* 14. AspectRatio */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">14</span>
                    AspectRatio
                  </CardTitle>
                  <CardDescription>Responsive containers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <AspectRatio ratio={16 / 9} className="bg-muted rounded border">
                    <div className="flex items-center justify-center h-full">
                      <span className="text-xs text-muted-foreground">16:9</span>
                    </div>
                  </AspectRatio>
                  <AspectRatio ratio={4 / 3} className="bg-muted rounded border">
                    <div className="flex items-center justify-center h-full">
                      <span className="text-xs text-muted-foreground">4:3</span>
                    </div>
                  </AspectRatio>
                  <AspectRatio ratio={1} className="bg-muted rounded border">
                    <div className="flex items-center justify-center h-full">
                      <span className="text-xs text-muted-foreground">1:1</span>
                    </div>
                  </AspectRatio>
                </CardContent>
              </Card>

              {/* 15. Breadcrumb */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">15</span>
                    Breadcrumb
                  </CardTitle>
                  <CardDescription>Navigation trails</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>

                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/">Docs</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>UI Components</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </CardContent>
              </Card>

              {/* 16. Calendar */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">16</span>
                    Calendar
                  </CardTitle>
                  <CardDescription>Date selection</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border w-fit mx-auto"
                  />
                  <div className="text-xs text-muted-foreground text-center">
                    Selected: {selectedDate ? selectedDate.toLocaleDateString() : 'none'}
                  </div>
                </CardContent>
              </Card>

              {/* 17. Dialog */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">17</span>
                    Dialog
                  </CardTitle>
                  <CardDescription>Modal interactions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        Open Dialog
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Dialog Title</DialogTitle>
                        <DialogDescription>
                          This is a dialog description. Dialogs are modal windows that overlay
                          content.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <p className="text-sm">
                          Dialog content goes here. You can put forms, confirmations, or any other
                          content.
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="w-full">
                        Simple Dialog
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Quick Action</DialogTitle>
                        <DialogDescription>A simple dialog example.</DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              {/* 18. DropdownMenu */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">18</span>
                    DropdownMenu
                  </CardTitle>
                  <CardDescription>Contextual menus</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full">
                        Menu Options
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                      <DropdownMenuItem>Billing</DropdownMenuItem>
                      <DropdownMenuItem>Team</DropdownMenuItem>
                      <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="ghost" className="w-full">
                        Actions
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Copy</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>

              {/* 21. Accordion */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">21</span>
                    Accordion
                  </CardTitle>
                  <CardDescription>Collapsible content sections</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Accordion items={accordionData} defaultOpenIndex={0} />
                  <div className="text-xs text-muted-foreground text-center">
                    Interactive collapsible sections
                  </div>
                </CardContent>
              </Card>

              {/* 22. AlertDialog */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">22</span>
                    AlertDialog
                  </CardTitle>
                  <CardDescription>Confirmation and alert dialogs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="w-full">
                        Delete Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your account
                          and remove your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Yes, delete account</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        Logout
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Logout Confirmation</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to logout? You&apos;ll need to sign in again to
                          access your account.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Stay logged in</AlertDialogCancel>
                        <AlertDialogAction>Logout</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <div className="text-xs text-muted-foreground text-center">
                    Confirmation dialogs with actions
                  </div>
                </CardContent>
              </Card>

              {/* 23. Command */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">23</span>
                    Command
                  </CardTitle>
                  <CardDescription>Command palette for search and actions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Command className="border rounded-lg max-h-80">
                    <CommandInput placeholder="Type a command or search..." />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup heading="Suggestions">
                        <CommandItem>
                          📧 Send Email
                          <CommandShortcut>⌘E</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                          📝 Create Document
                          <CommandShortcut>⌘N</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                          🔍 Search Files
                          <CommandShortcut>⌘F</CommandShortcut>
                        </CommandItem>
                      </CommandGroup>
                      <CommandSeparator />
                      <CommandGroup heading="Settings">
                        <CommandItem>
                          ⚙️ Preferences
                          <CommandShortcut>⌘,</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                          🎨 Theme
                          <CommandShortcut>⌘T</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                          🔐 Security
                          <CommandShortcut>⌘S</CommandShortcut>
                        </CommandItem>
                      </CommandGroup>
                      <CommandSeparator />
                      <CommandGroup heading="Actions">
                        <CommandItem>
                          📤 Export Data
                          <CommandShortcut>⌘⇧E</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                          🗑️ Delete All
                          <CommandShortcut>⌘⇧D</CommandShortcut>
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                  <div className="text-xs text-muted-foreground text-center">
                    Interactive command palette with search
                  </div>
                </CardContent>
              </Card>

              {/* 24. HoverCard */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">24</span>
                    HoverCard
                  </CardTitle>
                  <CardDescription>Rich hover interactions with content</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button variant="link" className="underline">
                          @shadcn
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="flex justify-between space-x-4">
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold">@shadcn</h4>
                            <p className="text-sm">
                              The React framework for the web. Created and maintained by @vercel.
                            </p>
                            <div className="flex items-center pt-2">
                              <span className="text-xs text-muted-foreground">
                                Joined December 2021
                              </span>
                            </div>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>

                  <div className="text-center">
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Badge variant="outline" className="cursor-help">
                          Hover for details
                        </Badge>
                      </HoverCardTrigger>
                      <HoverCardContent>
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold">Product Information</h4>
                          <p className="text-sm text-muted-foreground">
                            This is a premium feature that includes advanced analytics, priority
                            support, and custom integrations.
                          </p>
                          <div className="flex items-center space-x-2 text-xs">
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                              Active
                            </span>
                            <span className="text-muted-foreground">Since Jan 2024</span>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>

                  <div className="text-center">
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <span className="text-sm underline cursor-help">
                          Technical Documentation
                        </span>
                      </HoverCardTrigger>
                      <HoverCardContent>
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold">API Reference</h4>
                          <p className="text-sm text-muted-foreground">
                            Click to view the complete API documentation with examples and use
                            cases.
                          </p>
                          <div className="text-xs text-muted-foreground">
                            Last updated: 2 hours ago
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>

                  <div className="text-xs text-muted-foreground text-center">
                    Rich content on hover with smooth animations
                  </div>
                </CardContent>
              </Card>

              {/* 25. Popover */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">25</span>
                    Popover
                  </CardTitle>
                  <CardDescription>Floating content panels on click</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-center">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">Open Settings</Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <h4 className="font-medium leading-none">Dimensions</h4>
                            <p className="text-sm text-muted-foreground">
                              Set the dimensions for the layer.
                            </p>
                          </div>
                          <div className="grid gap-2">
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="width">Width</Label>
                              <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="maxWidth">Max width</Label>
                              <Input
                                id="maxWidth"
                                defaultValue="300px"
                                className="col-span-2 h-8"
                              />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="height">Height</Label>
                              <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="text-center">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button size="sm" variant="secondary">
                          Quick Actions
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Quick Actions</h4>
                          <div className="grid gap-2">
                            <Button variant="ghost" size="sm" className="justify-start">
                              📋 Copy to clipboard
                            </Button>
                            <Button variant="ghost" size="sm" className="justify-start">
                              📤 Export data
                            </Button>
                            <Button variant="ghost" size="sm" className="justify-start">
                              🔗 Share link
                            </Button>
                            <Button variant="ghost" size="sm" className="justify-start">
                              🗑️ Delete item
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="text-center">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Badge variant="outline" className="cursor-pointer">
                          User Profile
                        </Badge>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                              JD
                            </div>
                            <div>
                              <p className="text-sm font-medium">John Doe</p>
                              <p className="text-xs text-muted-foreground">john@example.com</p>
                            </div>
                          </div>
                          <div className="text-xs space-y-1">
                            <p>
                              <strong>Role:</strong> Administrator
                            </p>
                            <p>
                              <strong>Last login:</strong> 2 hours ago
                            </p>
                            <p>
                              <strong>Status:</strong>{' '}
                              <span className="text-green-600">Online</span>
                            </p>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="text-xs text-muted-foreground text-center">
                    Interactive floating panels with forms and actions
                  </div>
                </CardContent>
              </Card>

              {/* 26. ScrollArea */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">26</span>
                    ScrollArea
                  </CardTitle>
                  <CardDescription>
                    Custom scrollable regions with styled scrollbars
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Basic ScrollArea with tags */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Tag List</h4>
                    <ScrollArea className="h-20 w-full rounded border p-4">
                      <div className="flex space-x-2">
                        {Array.from({ length: 20 }, (_, i) => (
                          <Badge key={i} variant="secondary" className="shrink-0">
                            Tag {i + 1}
                          </Badge>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>

                  {/* Vertical ScrollArea with content */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">News Feed</h4>
                    <ScrollArea className="h-32 w-full rounded border">
                      <div className="p-4 space-y-3">
                        {Array.from({ length: 10 }, (_, i) => (
                          <div key={i} className="flex space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium">
                              {i + 1}
                            </div>
                            <div className="flex-1 space-y-1">
                              <p className="text-sm font-medium">News Article {i + 1}</p>
                              <p className="text-xs text-muted-foreground">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>

                  {/* Code ScrollArea */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Code Preview</h4>
                    <ScrollArea className="h-24 w-full rounded border bg-slate-50 dark:bg-slate-900">
                      <div className="p-3 font-mono text-xs">
                        <div>
                          import &#123; ScrollArea &#125; from
                          &quot;@/components/ui/ScrollArea&quot;;
                        </div>
                        <div></div>
                        <div>function Component() &#123;</div>
                        <div>&nbsp;&nbsp;return (</div>
                        <div>
                          &nbsp;&nbsp;&nbsp;&nbsp;&lt;ScrollArea className=&quot;h-[200px] w-[350px]
                          rounded-md border&quot;&gt;
                        </div>
                        <div>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div className=&quot;p-4&quot;&gt;
                        </div>
                        <div>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123;content&#125;
                        </div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/ScrollArea&gt;</div>
                        <div>&nbsp;&nbsp;);</div>
                        <div>&#125;</div>
                      </div>
                    </ScrollArea>
                  </div>

                  <div className="text-xs text-muted-foreground text-center">
                    Smooth scrolling with custom styled scrollbars
                  </div>
                </CardContent>
              </Card>

              {/* 27. Sheet */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">27</span>
                    Sheet
                  </CardTitle>
                  <CardDescription>Side panels and drawers for additional content</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Settings Sheet */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Settings Panel</h4>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" className="w-full">
                          Open Settings
                        </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>Settings</SheetTitle>
                          <SheetDescription>
                            Configure your application settings and preferences.
                          </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Name
                            </Label>
                            <Input id="name" defaultValue="John Doe" className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                              Email
                            </Label>
                            <Input
                              id="email"
                              defaultValue="john@example.com"
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="notifications" className="text-right">
                              Notifications
                            </Label>
                            <Switch id="notifications" className="col-span-3" />
                          </div>
                        </div>
                        <SheetFooter>
                          <SheetClose asChild>
                            <Button type="submit">Save changes</Button>
                          </SheetClose>
                        </SheetFooter>
                      </SheetContent>
                    </Sheet>
                  </div>

                  {/* Navigation Sheet */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Navigation Menu</h4>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="secondary" className="w-full">
                          Open Menu
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left">
                        <SheetHeader>
                          <SheetTitle>Navigation</SheetTitle>
                          <SheetDescription>
                            Navigate through different sections of the application.
                          </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-2 py-4">
                          <Button variant="ghost" className="justify-start">
                            🏠 Dashboard
                          </Button>
                          <Button variant="ghost" className="justify-start">
                            📊 Analytics
                          </Button>
                          <Button variant="ghost" className="justify-start">
                            👥 Team
                          </Button>
                          <Button variant="ghost" className="justify-start">
                            ⚙️ Settings
                          </Button>
                          <Button variant="ghost" className="justify-start">
                            📞 Support
                          </Button>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>

                  {/* Info Sheet */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Information Panel</h4>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="ghost" size="sm" className="w-full">
                          Show Details
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="bottom">
                        <SheetHeader>
                          <SheetTitle>Additional Information</SheetTitle>
                          <SheetDescription>
                            Here&apos;s some additional context and details.
                          </SheetDescription>
                        </SheetHeader>
                        <div className="py-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <strong>Status:</strong> Active
                            </div>
                            <div>
                              <strong>Created:</strong> Jan 2024
                            </div>
                            <div>
                              <strong>Last Updated:</strong> 2 hours ago
                            </div>
                            <div>
                              <strong>Version:</strong> 1.2.3
                            </div>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>

                  <div className="text-xs text-muted-foreground text-center">
                    Flexible side panels with multiple positions
                  </div>
                </CardContent>
              </Card>

              {/* 28. Menubar */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">28</span>
                    Menubar
                  </CardTitle>
                  <CardDescription>Horizontal menu navigation with dropdowns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Application Menubar */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Application Menu</h4>
                    <Menubar>
                      <MenubarMenu>
                        <MenubarTrigger>File</MenubarTrigger>
                        <MenubarContent>
                          <MenubarItem>
                            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                          </MenubarItem>
                          <MenubarItem>
                            New Window <MenubarShortcut>⌘N</MenubarShortcut>
                          </MenubarItem>
                          <MenubarSeparator />
                          <MenubarItem>
                            Open <MenubarShortcut>⌘O</MenubarShortcut>
                          </MenubarItem>
                          <MenubarItem>
                            Save <MenubarShortcut>⌘S</MenubarShortcut>
                          </MenubarItem>
                          <MenubarSeparator />
                          <MenubarItem>Exit</MenubarItem>
                        </MenubarContent>
                      </MenubarMenu>

                      <MenubarMenu>
                        <MenubarTrigger>Edit</MenubarTrigger>
                        <MenubarContent>
                          <MenubarItem>
                            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                          </MenubarItem>
                          <MenubarItem>
                            Redo <MenubarShortcut>⌘Y</MenubarShortcut>
                          </MenubarItem>
                          <MenubarSeparator />
                          <MenubarItem>
                            Cut <MenubarShortcut>⌘X</MenubarShortcut>
                          </MenubarItem>
                          <MenubarItem>
                            Copy <MenubarShortcut>⌘C</MenubarShortcut>
                          </MenubarItem>
                          <MenubarItem>
                            Paste <MenubarShortcut>⌘V</MenubarShortcut>
                          </MenubarItem>
                        </MenubarContent>
                      </MenubarMenu>

                      <MenubarMenu>
                        <MenubarTrigger>View</MenubarTrigger>
                        <MenubarContent>
                          <MenubarItem>Zoom In</MenubarItem>
                          <MenubarItem>Zoom Out</MenubarItem>
                          <MenubarSeparator />
                          <MenubarItem>Toggle Sidebar</MenubarItem>
                          <MenubarItem>Full Screen</MenubarItem>
                        </MenubarContent>
                      </MenubarMenu>

                      <MenubarMenu>
                        <MenubarTrigger>Help</MenubarTrigger>
                        <MenubarContent>
                          <MenubarItem>Documentation</MenubarItem>
                          <MenubarItem>Keyboard Shortcuts</MenubarItem>
                          <MenubarSeparator />
                          <MenubarItem>About</MenubarItem>
                        </MenubarContent>
                      </MenubarMenu>
                    </Menubar>
                  </div>

                  {/* Simple Menubar */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Simple Navigation</h4>
                    <Menubar>
                      <MenubarMenu>
                        <MenubarTrigger>Home</MenubarTrigger>
                        <MenubarContent>
                          <MenubarItem>Dashboard</MenubarItem>
                          <MenubarItem>Recent Activity</MenubarItem>
                          <MenubarItem>Quick Actions</MenubarItem>
                        </MenubarContent>
                      </MenubarMenu>

                      <MenubarMenu>
                        <MenubarTrigger>Products</MenubarTrigger>
                        <MenubarContent>
                          <MenubarItem>All Products</MenubarItem>
                          <MenubarItem>Categories</MenubarItem>
                          <MenubarSeparator />
                          <MenubarItem>Add New Product</MenubarItem>
                        </MenubarContent>
                      </MenubarMenu>

                      <MenubarMenu>
                        <MenubarTrigger>Settings</MenubarTrigger>
                        <MenubarContent>
                          <MenubarItem>Preferences</MenubarItem>
                          <MenubarItem>Account</MenubarItem>
                          <MenubarItem>Security</MenubarItem>
                        </MenubarContent>
                      </MenubarMenu>
                    </Menubar>
                  </div>

                  <div className="text-xs text-muted-foreground text-center">
                    Professional menu bars with keyboard shortcuts
                  </div>
                </CardContent>
              </Card>

              {/* 29. ContextMenu */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">29</span>
                    ContextMenu
                  </CardTitle>
                  <CardDescription>Right-click context menus with actions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Text Context Menu */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Text Actions</h4>
                    <ContextMenu>
                      <ContextMenuTrigger className="flex h-20 w-full items-center justify-center rounded-md border border-dashed text-sm">
                        Right click here for text actions
                      </ContextMenuTrigger>
                      <ContextMenuContent>
                        <ContextMenuItem>
                          Cut <ContextMenuShortcut>⌘X</ContextMenuShortcut>
                        </ContextMenuItem>
                        <ContextMenuItem>
                          Copy <ContextMenuShortcut>⌘C</ContextMenuShortcut>
                        </ContextMenuItem>
                        <ContextMenuItem>
                          Paste <ContextMenuShortcut>⌘V</ContextMenuShortcut>
                        </ContextMenuItem>
                        <ContextMenuSeparator />
                        <ContextMenuItem>Select All</ContextMenuItem>
                        <ContextMenuItem>Find</ContextMenuItem>
                      </ContextMenuContent>
                    </ContextMenu>
                  </div>

                  {/* File Context Menu */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">File Operations</h4>
                    <ContextMenu>
                      <ContextMenuTrigger className="flex h-20 w-full items-center justify-center rounded-md border border-dashed text-sm bg-slate-50 dark:bg-slate-900">
                        Right click for file options
                      </ContextMenuTrigger>
                      <ContextMenuContent>
                        <ContextMenuItem>Open</ContextMenuItem>
                        <ContextMenuItem>Open with...</ContextMenuItem>
                        <ContextMenuSeparator />
                        <ContextMenuItem>Rename</ContextMenuItem>
                        <ContextMenuItem>Duplicate</ContextMenuItem>
                        <ContextMenuItem>Move to Trash</ContextMenuItem>
                        <ContextMenuSeparator />
                        <ContextMenuItem>Properties</ContextMenuItem>
                      </ContextMenuContent>
                    </ContextMenu>
                  </div>

                  <div className="text-xs text-muted-foreground text-center">
                    Right-click context-sensitive menus
                  </div>
                </CardContent>
              </Card>

              {/* 30. Collapsible */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">30</span>
                    Collapsible
                  </CardTitle>
                  <CardDescription>Expandable content sections</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Simple Collapsible */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Simple Toggle</h4>
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                          Show Details
                          <span className="text-xs">▼</span>
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2 rounded border bg-slate-50 dark:bg-slate-900 p-3">
                        <p className="text-sm">
                          This is collapsible content that can be shown or hidden by clicking the
                          trigger button above.
                        </p>
                        <div className="mt-2 text-xs text-muted-foreground">
                          Perfect for FAQ sections, settings panels, and detailed information.
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>

                  {/* FAQ Style */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">FAQ Item</h4>
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-left h-auto py-2"
                        >
                          <div>
                            <div className="font-medium">How do I use this component?</div>
                            <div className="text-xs text-muted-foreground">
                              Click to expand answer
                            </div>
                          </div>
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2 ml-4 rounded border-l-2 border-blue-500 bg-blue-50 dark:bg-blue-950 p-3">
                        <p className="text-sm">
                          The Collapsible component is perfect for FAQs, settings sections, and any
                          content that needs to be optionally visible. It provides smooth animations
                          and accessibility features.
                        </p>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>

                  {/* Settings Panel */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Settings Section</h4>
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <Button variant="secondary" size="sm" className="w-full">
                          ⚙️ Advanced Settings
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2 space-y-2 rounded border p-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="debug">Debug Mode</Label>
                          <Switch id="debug" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="cache">Enable Cache</Label>
                          <Switch id="cache" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="analytics">Analytics</Label>
                          <Switch id="analytics" />
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>

                  <div className="text-xs text-muted-foreground text-center">
                    Smooth expand/collapse with accessibility
                  </div>
                </CardContent>
              </Card>

              {/* 31. Avatar */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">31</span>
                    Avatar
                  </CardTitle>
                  <CardDescription>User profile pictures and initials</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Basic Avatars */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Profile Pictures</h4>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                        JD
                      </div>
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        AB
                      </div>
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                        CD
                      </div>
                    </div>
                  </div>

                  {/* Different Sizes */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Size Variants</h4>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                        S
                      </div>
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs">
                        M
                      </div>
                      <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm">
                        L
                      </div>
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white">
                        XL
                      </div>
                    </div>
                  </div>

                  {/* Team Avatars */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Team Members</h4>
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white">
                        JD
                      </div>
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white">
                        AB
                      </div>
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white">
                        CD
                      </div>
                      <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white">
                        +3
                      </div>
                    </div>
                  </div>

                  {/* Status Indicators */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">With Status</h4>
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          JD
                        </div>
                        <div className="absolute -bottom-0 -right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="relative">
                        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          AB
                        </div>
                        <div className="absolute -bottom-0 -right-0 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="relative">
                        <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          CD
                        </div>
                        <div className="absolute -bottom-0 -right-0 w-3 h-3 bg-gray-500 rounded-full border-2 border-white"></div>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground text-center">
                    Profile pictures with fallbacks and status
                  </div>
                </CardContent>
              </Card>

              {/* 32. Combobox */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">32</span>
                    Combobox
                  </CardTitle>
                  <CardDescription>Searchable select with autocomplete</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Basic Combobox */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Programming Languages</h4>
                    <Combobox
                      value={comboboxValue}
                      onValueChange={setComboboxValue}
                      options={[
                        { value: 'javascript', label: 'JavaScript' },
                        { value: 'typescript', label: 'TypeScript' },
                        { value: 'python', label: 'Python' },
                        { value: 'java', label: 'Java' },
                        { value: 'csharp', label: 'C#' },
                        { value: 'go', label: 'Go' },
                        { value: 'rust', label: 'Rust' },
                        { value: 'php', label: 'PHP' },
                      ]}
                      placeholder="Select language..."
                      emptyText="No language found."
                    />
                  </div>

                  {/* Multi-select Style */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Frameworks</h4>
                    <Combobox
                      value={frameworkValue}
                      onValueChange={setFrameworkValue}
                      options={[
                        { value: 'react', label: 'React' },
                        { value: 'vue', label: 'Vue.js' },
                        { value: 'angular', label: 'Angular' },
                        { value: 'svelte', label: 'Svelte' },
                        { value: 'nextjs', label: 'Next.js' },
                        { value: 'nuxt', label: 'Nuxt.js' },
                        { value: 'express', label: 'Express' },
                        { value: 'nestjs', label: 'NestJS' },
                      ]}
                      placeholder="Choose framework..."
                      emptyText="No framework found."
                    />
                  </div>

                  <div className="text-xs text-muted-foreground text-center">
                    Typeahead search with keyboard navigation
                  </div>
                </CardContent>
              </Card>

              {/* 33. DatePicker */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">33</span>
                    DatePicker
                  </CardTitle>
                  <CardDescription>Calendar-based date selection</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Single Date */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Event Date</h4>
                    <DatePicker
                      date={selectedDate}
                      onDateChange={setSelectedDate}
                      placeholder="Pick a date..."
                    />
                    {selectedDate && (
                      <p className="text-sm text-muted-foreground">
                        Selected: {selectedDate.toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  {/* Date Range */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Meeting Range</h4>
                    <DatePicker placeholder="Select meeting date..." />
                  </div>

                  {/* Future Dates Only */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Booking Date</h4>
                    <DatePicker
                      placeholder="Select future date..."
                      disabledDates={(date: Date) => date < new Date()}
                    />
                  </div>

                  <div className="text-xs text-muted-foreground text-center">
                    Full calendar interface with constraints
                  </div>
                </CardContent>
              </Card>

              {/* 34. Resizable */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">34</span>
                    Resizable
                  </CardTitle>
                  <CardDescription>Draggable panel layouts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Horizontal Layout */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Code Editor Layout</h4>
                    <ResizablePanelGroup
                      direction="horizontal"
                      className="min-h-[200px] rounded border"
                    >
                      <ResizablePanel defaultSize={30} minSize={20}>
                        <div className="p-4 h-full bg-slate-50 dark:bg-slate-900">
                          <div className="text-sm font-medium mb-2">File Explorer</div>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>📁 src/</div>
                            <div className="ml-2">📄 app.tsx</div>
                            <div className="ml-2">📄 index.css</div>
                            <div>📁 components/</div>
                            <div className="ml-2">📄 Button.tsx</div>
                          </div>
                        </div>
                      </ResizablePanel>
                      <ResizableHandle />
                      <ResizablePanel defaultSize={70}>
                        <div className="p-4 h-full">
                          <div className="text-sm font-medium mb-2">Editor</div>
                          <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs font-mono">
                            <div>export function App() {'{{'}</div>
                            <div className="ml-2">return &lt;div&gt;Hello&lt;/div&gt;</div>
                            <div>{'}'}</div>
                          </div>
                        </div>
                      </ResizablePanel>
                    </ResizablePanelGroup>
                  </div>

                  {/* Vertical Layout */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Dashboard Layout</h4>
                    <ResizablePanelGroup
                      direction="vertical"
                      className="min-h-[200px] rounded border"
                    >
                      <ResizablePanel defaultSize={60} minSize={30}>
                        <div className="p-4 h-full bg-blue-50 dark:bg-blue-950">
                          <div className="text-sm font-medium">Main Content</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Primary dashboard view with charts and metrics
                          </div>
                        </div>
                      </ResizablePanel>
                      <ResizableHandle />
                      <ResizablePanel defaultSize={40}>
                        <div className="p-4 h-full bg-green-50 dark:bg-green-950">
                          <div className="text-sm font-medium">Activity Feed</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Recent activities and notifications
                          </div>
                        </div>
                      </ResizablePanel>
                    </ResizablePanelGroup>
                  </div>

                  <div className="text-xs text-muted-foreground text-center">
                    Flexible layouts with persistent sizing
                  </div>
                </CardContent>
              </Card>

              {/* 35. Badge */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">35</span>
                    Badge
                  </CardTitle>
                  <CardDescription>Status indicators and labels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Default Badges */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Status Badges</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge>Default</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="outline">Outline</Badge>
                      <Badge variant="destructive">Error</Badge>
                    </div>
                  </div>

                  {/* Custom Colors */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Custom Variants</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-green-500 hover:bg-green-600">Success</Badge>
                      <Badge className="bg-yellow-500 hover:bg-yellow-600">Warning</Badge>
                      <Badge className="bg-blue-500 hover:bg-blue-600">Info</Badge>
                      <Badge className="bg-purple-500 hover:bg-purple-600">Premium</Badge>
                    </div>
                  </div>

                  {/* With Icons */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">With Icons</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-green-500">✓ Verified</Badge>
                      <Badge variant="outline">🔥 Popular</Badge>
                      <Badge className="bg-red-500">⚠ Critical</Badge>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground text-center">
                    Flexible styling with variants and colors
                  </div>
                </CardContent>
              </Card>

              {/* 36. Breadcrumb */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">36</span>
                    Breadcrumb
                  </CardTitle>
                  <CardDescription>Navigation hierarchy</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Basic Breadcrumb */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Page Navigation</h4>
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/products">Products</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage>Laptops</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  </div>

                  {/* Deep Navigation */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Deep Navigation</h4>
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/settings">Settings</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/settings/account">Account</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage>Profile</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  </div>

                  <div className="text-xs text-muted-foreground text-center">
                    Clear navigation paths with links
                  </div>
                </CardContent>
              </Card>

              {/* 37. DropdownMenu */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">37</span>
                    DropdownMenu
                  </CardTitle>
                  <CardDescription>Contextual action menus</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Basic Dropdown */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">User Actions</h4>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">Account Menu</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          Profile
                          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Settings
                          <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuItem disabled>API</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          Log out
                          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* With Checkboxes */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Filter Options</h4>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">Filters</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Show Items</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem
                          checked={checkedItems.active || false}
                          onCheckedChange={checked =>
                            setCheckedItems(prev => ({ ...prev, active: checked }))
                          }
                        >
                          Active
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={checkedItems.inactive || false}
                          onCheckedChange={checked =>
                            setCheckedItems(prev => ({ ...prev, inactive: checked }))
                          }
                        >
                          Inactive
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={checkedItems.archived || false}
                          onCheckedChange={checked =>
                            setCheckedItems(prev => ({ ...prev, archived: checked }))
                          }
                        >
                          Archived
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Radio Group */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Sort Options</h4>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">Sort By</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Sort Order</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value="name">
                          <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="size">Size</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="text-xs text-muted-foreground text-center">
                    Rich menus with shortcuts and selections
                  </div>
                </CardContent>
              </Card>

              {/* 38. HoverCard */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">38</span>
                    HoverCard
                  </CardTitle>
                  <CardDescription>Rich hover previews</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* User Profile Hover */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">User Profile</h4>
                    <div className="text-sm">
                      Hover over{' '}
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button variant="link" className="p-0 h-auto">
                            @johnsmith
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <div className="flex space-x-4">
                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                              JS
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-sm font-semibold">John Smith</h4>
                              <p className="text-sm text-muted-foreground">
                                Senior Frontend Developer at TechCorp
                              </p>
                              <div className="flex items-center pt-2">
                                <span className="text-xs text-muted-foreground">
                                  Joined March 2021 • 156 followers
                                </span>
                              </div>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>{' '}
                      to see their profile.
                    </div>
                  </div>

                  {/* Repository Info */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Repository Link</h4>
                    <div className="text-sm">
                      Check out{' '}
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button variant="link" className="p-0 h-auto">
                            triggerkings/ui
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold">triggerkings/ui</h4>
                            <p className="text-sm text-muted-foreground">
                              Production-ready React component library built with TypeScript and
                              Radix UI
                            </p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <span>⭐ 2.3k</span>
                              <span>🍴 187</span>
                              <span>📦 TypeScript</span>
                            </div>
                            <div className="text-xs text-muted-foreground">Updated 2 hours ago</div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>{' '}
                      repository.
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground text-center">
                    Rich previews on hover with detailed information
                  </div>
                </CardContent>
              </Card>

              {/* 39. Toggle */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">39</span>
                    Toggle
                  </CardTitle>
                  <CardDescription>Toggle button states</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Basic Toggles */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Basic Controls</h4>
                    <div className="flex items-center space-x-4">
                      <Toggle
                        pressed={toggleStates.bold || false}
                        onPressedChange={pressed =>
                          setToggleStates(prev => ({ ...prev, bold: pressed }))
                        }
                        aria-label="Toggle bold"
                      >
                        <span className="font-bold">B</span>
                      </Toggle>
                      <Toggle
                        pressed={toggleStates.italic || false}
                        onPressedChange={pressed =>
                          setToggleStates(prev => ({ ...prev, italic: pressed }))
                        }
                        aria-label="Toggle italic"
                      >
                        <span className="italic">I</span>
                      </Toggle>
                      <Toggle
                        pressed={toggleStates.underline || false}
                        onPressedChange={pressed =>
                          setToggleStates(prev => ({ ...prev, underline: pressed }))
                        }
                        aria-label="Toggle underline"
                      >
                        <span className="underline">U</span>
                      </Toggle>
                    </div>
                  </div>

                  {/* Variant Styles */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Variants</h4>
                    <div className="flex items-center space-x-4">
                      <Toggle variant="default">Default</Toggle>
                      <Toggle variant="outline">Outline</Toggle>
                      <Toggle size="sm">Small</Toggle>
                      <Toggle size="lg">Large</Toggle>
                    </div>
                  </div>

                  {/* Feature Toggles */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Feature Controls</h4>
                    <div className="flex flex-wrap gap-2">
                      <Toggle
                        pressed={toggleStates.notifications || false}
                        onPressedChange={pressed =>
                          setToggleStates(prev => ({ ...prev, notifications: pressed }))
                        }
                      >
                        🔔 Notifications
                      </Toggle>
                      <Toggle
                        pressed={toggleStates.darkMode || false}
                        onPressedChange={pressed =>
                          setToggleStates(prev => ({ ...prev, darkMode: pressed }))
                        }
                      >
                        🌙 Dark Mode
                      </Toggle>
                      <Toggle
                        pressed={toggleStates.autoSave || false}
                        onPressedChange={pressed =>
                          setToggleStates(prev => ({ ...prev, autoSave: pressed }))
                        }
                      >
                        💾 Auto Save
                      </Toggle>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground text-center">
                    Press states with variants and sizes
                  </div>
                </CardContent>
              </Card>

              {/* 40. Skeleton */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">40</span>
                    Skeleton
                  </CardTitle>
                  <CardDescription>Loading state placeholders</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Basic Skeletons */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Text Loading</h4>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>

                  {/* Profile Card Skeleton */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Profile Card</h4>
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                  </div>

                  {/* Card Grid Skeleton */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Card Layout</h4>
                    <div className="space-y-3">
                      <Skeleton className="h-32 w-full rounded" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                        <div className="flex space-x-2">
                          <Skeleton className="h-6 w-16" />
                          <Skeleton className="h-6 w-20" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground text-center">
                    Animated placeholders for loading states
                  </div>
                </CardContent>
              </Card>

              {/* 41. Form */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">41</span>
                    Form
                  </CardTitle>
                  <CardDescription>Form validation and structure</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Contact Form */}
                  <Form>
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Contact Form</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" placeholder="John" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" placeholder="Doe" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" placeholder="Your message here..." rows={3} />
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="subscribe" className="rounded" />
                        <Label htmlFor="subscribe" className="text-sm">
                          Subscribe to newsletter
                        </Label>
                      </div>
                      <Button type="submit" className="w-full">
                        Send Message
                      </Button>
                    </div>
                  </Form>

                  {/* Login Form */}
                  <Form>
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Login Form</h4>
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" placeholder="Enter username" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder="Enter password" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="remember" className="rounded" />
                          <Label htmlFor="remember" className="text-sm">
                            Remember me
                          </Label>
                        </div>
                        <Button variant="link" className="p-0">
                          Forgot password?
                        </Button>
                      </div>
                      <Button type="submit" className="w-full">
                        Sign In
                      </Button>
                    </div>
                  </Form>

                  <div className="text-xs text-muted-foreground text-center">
                    Structured forms with validation support
                  </div>
                </CardContent>
              </Card>

              {/* 42. NavigationMenu */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">42</span>
                    NavigationMenu
                  </CardTitle>
                  <CardDescription>Advanced navigation with dropdowns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Main Navigation */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Website Navigation</h4>
                    <NavigationMenu>
                      <NavigationMenuList className="flex space-x-2">
                        <NavigationMenuItem>
                          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <div className="p-4 w-64 space-y-2">
                              <NavigationMenuLink
                                href="/laptops"
                                className="block p-2 hover:bg-accent rounded"
                              >
                                Laptops
                              </NavigationMenuLink>
                              <NavigationMenuLink
                                href="/desktops"
                                className="block p-2 hover:bg-accent rounded"
                              >
                                Desktops
                              </NavigationMenuLink>
                              <NavigationMenuLink
                                href="/accessories"
                                className="block p-2 hover:bg-accent rounded"
                              >
                                Accessories
                              </NavigationMenuLink>
                            </div>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                          <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <div className="p-4 w-64 space-y-2">
                              <NavigationMenuLink
                                href="/enterprise"
                                className="block p-2 hover:bg-accent rounded"
                              >
                                Enterprise
                              </NavigationMenuLink>
                              <NavigationMenuLink
                                href="/small-business"
                                className="block p-2 hover:bg-accent rounded"
                              >
                                Small Business
                              </NavigationMenuLink>
                              <NavigationMenuLink
                                href="/education"
                                className="block p-2 hover:bg-accent rounded"
                              >
                                Education
                              </NavigationMenuLink>
                            </div>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                          <NavigationMenuLink href="/support">Support</NavigationMenuLink>
                        </NavigationMenuItem>
                      </NavigationMenuList>
                    </NavigationMenu>
                  </div>

                  <div className="text-xs text-muted-foreground text-center">
                    Multi-level navigation with hover states
                  </div>
                </CardContent>
              </Card>

              {/* 43. Menubar */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">43</span>
                    Menubar
                  </CardTitle>
                  <CardDescription>Application menu bars</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Application Menu */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Application Menu</h4>
                    <Menubar>
                      <MenubarMenu>
                        <MenubarTrigger>File</MenubarTrigger>
                        <MenubarContent>
                          <MenubarItem>
                            New File
                            <MenubarShortcut>⌘N</MenubarShortcut>
                          </MenubarItem>
                          <MenubarItem>
                            Open
                            <MenubarShortcut>⌘O</MenubarShortcut>
                          </MenubarItem>
                          <MenubarSeparator />
                          <MenubarItem>
                            Save
                            <MenubarShortcut>⌘S</MenubarShortcut>
                          </MenubarItem>
                          <MenubarItem disabled>
                            Save As...
                            <MenubarShortcut>⇧⌘S</MenubarShortcut>
                          </MenubarItem>
                        </MenubarContent>
                      </MenubarMenu>
                      <MenubarMenu>
                        <MenubarTrigger>Edit</MenubarTrigger>
                        <MenubarContent>
                          <MenubarItem>
                            Undo
                            <MenubarShortcut>⌘Z</MenubarShortcut>
                          </MenubarItem>
                          <MenubarItem>
                            Redo
                            <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                          </MenubarItem>
                          <MenubarSeparator />
                          <MenubarItem>Cut</MenubarItem>
                          <MenubarItem>Copy</MenubarItem>
                          <MenubarItem>Paste</MenubarItem>
                        </MenubarContent>
                      </MenubarMenu>
                      <MenubarMenu>
                        <MenubarTrigger>View</MenubarTrigger>
                        <MenubarContent>
                          <MenubarItem>Zoom In</MenubarItem>
                          <MenubarItem>Zoom Out</MenubarItem>
                          <MenubarSeparator />
                          <MenubarItem>Full Screen</MenubarItem>
                        </MenubarContent>
                      </MenubarMenu>
                    </Menubar>
                  </div>

                  <div className="text-xs text-muted-foreground text-center">
                    Traditional application menu with keyboard shortcuts
                  </div>
                </CardContent>
              </Card>

              {/* 44. Sheet */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">44</span>
                    Sheet
                  </CardTitle>
                  <CardDescription>Slide-out side panels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Basic Sheet */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Settings Panel</h4>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline">Open Settings</Button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>Settings</SheetTitle>
                        </SheetHeader>
                        <div className="py-4 space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" placeholder="Enter username" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Enter email" />
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="notifications" className="rounded" />
                            <Label htmlFor="notifications">Enable notifications</Label>
                          </div>
                        </div>
                        <SheetFooter>
                          <SheetClose asChild>
                            <Button type="submit">Save changes</Button>
                          </SheetClose>
                        </SheetFooter>
                      </SheetContent>
                    </Sheet>
                  </div>

                  {/* Navigation Sheet */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Mobile Menu</h4>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline">☰ Menu</Button>
                      </SheetTrigger>
                      <SheetContent side="left">
                        <SheetHeader>
                          <SheetTitle>Navigation</SheetTitle>
                          <SheetDescription>Browse our main sections</SheetDescription>
                        </SheetHeader>
                        <div className="py-4 space-y-2">
                          <Button variant="ghost" className="w-full justify-start">
                            🏠 Home
                          </Button>
                          <Button variant="ghost" className="w-full justify-start">
                            📦 Products
                          </Button>
                          <Button variant="ghost" className="w-full justify-start">
                            📞 Contact
                          </Button>
                          <Button variant="ghost" className="w-full justify-start">
                            ℹ️ About
                          </Button>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>

                  <div className="text-xs text-muted-foreground text-center">
                    Slide-out panels from any side with content
                  </div>
                </CardContent>
              </Card>

              {/* 45. Pagination */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">45</span>
                    Pagination
                  </CardTitle>
                  <CardDescription>Page navigation controls</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Basic Pagination */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Simple Navigation</h4>
                    <div className="flex justify-center">
                      <div className="text-sm">Pagination component placeholder</div>
                    </div>
                  </div>

                  {/* Large Dataset */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Large Dataset</h4>
                    <div className="flex justify-center">
                      <div className="text-sm">Large dataset pagination placeholder</div>
                    </div>
                  </div>

                  {/* Compact Style */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Compact Style</h4>
                    <div className="flex justify-center">
                      <div className="text-sm">Compact pagination placeholder</div>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground text-center">
                    Responsive pagination with page jumps
                  </div>
                </CardContent>
              </Card>

              {/* 46. Enhanced Tooltip */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">46</span>
                    Enhanced Tooltip
                  </CardTitle>
                  <CardDescription>Rich tooltip variations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Advanced Tooltips */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Rich Content</h4>
                    <div className="flex space-x-4">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline">Hover for Info</Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="space-y-1">
                              <p className="font-medium">Advanced Feature</p>
                              <p className="text-xs">This button enables advanced functionality</p>
                              <p className="text-xs text-muted-foreground">
                                Keyboard: Ctrl+Shift+A
                              </p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline">⚠️ Warning</Button>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            <div className="space-y-1">
                              <p className="font-medium text-yellow-600">⚠️ Caution</p>
                              <p className="text-xs">This action cannot be undone</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline">📊 Data</Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            <div className="space-y-1">
                              <p className="font-medium">Performance Metrics</p>
                              <div className="text-xs space-y-1">
                                <p>CPU: 45%</p>
                                <p>Memory: 2.1GB</p>
                                <p>Uptime: 24h 15m</p>
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground text-center">
                    Rich tooltips with structured content and positioning
                  </div>
                </CardContent>
              </Card>

              {/* 47. Enhanced Separator */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">47</span>
                    Enhanced Separator
                  </CardTitle>
                  <CardDescription>Advanced section dividers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Styled Separators */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Separator Styles</h4>

                    <div className="space-y-2">
                      <p className="text-sm">Simple horizontal divider:</p>
                      <Separator />
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm">Vertical divider in flex layout:</p>
                      <div className="flex items-center space-x-4">
                        <span>Left Content</span>
                        <Separator orientation="vertical" className="h-6" />
                        <span>Right Content</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm">Decorative separator:</p>
                      <div className="flex items-center space-x-4">
                        <Separator className="flex-1" />
                        <span className="text-sm font-medium">Section Break</span>
                        <Separator className="flex-1" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm">Gradient separator:</p>
                      <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground text-center">
                    🎉 LEGENDARY COMPLETION: 47/47 components achieved! 🎉
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Full Width Components */}
            <div className="space-y-6">
              {/* 19. Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">19</span>
                    Table
                  </CardTitle>
                  <CardDescription>Data display in tabular format</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tableData.map(item => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>{item.email}</TableCell>
                          <TableCell>{item.role}</TableCell>
                          <TableCell>
                            <Badge variant={item.status === 'Active' ? 'default' : 'secondary'}>
                              {item.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="text-xs text-muted-foreground mt-2 text-center">
                    Showing {tableData.length} of {tableData.length} entries
                  </div>
                </CardContent>
              </Card>

              {/* 20. Tooltip */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">20</span>
                    Tooltip
                  </CardTitle>
                  <CardDescription>Helpful hints and information on hover</CardDescription>
                </CardHeader>
                <CardContent>
                  <TooltipProvider>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline">Hover me</Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>This is a helpful tooltip!</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>

                      <div className="text-center">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="secondary">Info Button</Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Tooltips provide context and help</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>

                      <div className="text-center">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge className="cursor-help">Badge with tip</Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Even badges can have tooltips!</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p className="text-sm text-muted-foreground cursor-help underline decoration-dotted">
                            Hover over this text for more information
                          </p>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Tooltips work on any element!</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>
                </CardContent>
              </Card>
            </div>

            {/* Next Component Preview */}
            <Card className="border-orange-500 bg-orange-50 dark:bg-orange-950">
              <CardHeader>
                <CardTitle className="text-orange-700 dark:text-orange-300">
                  🔄 Next Component: Popover
                </CardTitle>
                <CardDescription>
                  Ready to add component #25 - Popover for floating content panels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Add Popover component to continue systematic expansion. 24/47 components completed
                  - 51.1% progress! � HALFWAY MILESTONE ACHIEVED!
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* COMPOUND COMPONENTS TAB (Future) */}
          <TabsContent value="compound" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>🚧 Compound Components</CardTitle>
                <CardDescription>
                  Complex component combinations and patterns (Coming Soon)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This section will showcase advanced component combinations, multi-part components,
                  and complex interaction patterns.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ADVANCED COMPONENTS TAB (Future) */}
          <TabsContent value="advanced" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>🎯 Advanced Components</CardTitle>
                <CardDescription>
                  Custom compositions and enterprise patterns (Coming Soon)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This section will feature custom component compositions, enterprise-grade
                  patterns, and advanced use cases.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
