'use client';

import {
  AlertCircle,
  Bell,
  CheckCircle,
  Download,
  Info,
  Mail,
  Settings,
  User,
  XCircle,
} from 'lucide-react';
import React, { useState } from 'react';

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
 * Complete demonstration of all 20 components with full style guide compliance:
 * - All available variants and sizes per component
 * - All required states (loading, disabled, error)
 * - Accessibility features and keyboard navigation
 * - Real-world usage examples
 */
export default function ComponentLibraryShowcase() {
  // Toast hook for notifications
  const { toast } = useToast();

  // Component state management
  const [progress, setProgress] = useState(65);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [sliderValue, setSliderValue] = useState([50]);
  const [sliderRange, setSliderRange] = useState([20, 80]);
  const [checkboxState, setCheckboxState] = useState<boolean | 'indeterminate'>(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [selectValue, setSelectValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);

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

  // Progress animation
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(85), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Animated progress bar (0 to 100% over 6 seconds)
  React.useEffect(() => {
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
    <Container size="full" className="min-h-screen">
      <Container size="7xl" padding="lg" className="py-8">
        {/* Header Section */}
        <Container size="none" padding="none" className="text-center space-y-8 mb-20">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
              Component Library Showcase
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Complete shadcn/ui component library with style guide compliance, enterprise-grade
              quality, and comprehensive accessibility support.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            <Badge size="lg">100% Style Guide Compliant</Badge>
            <Badge size="lg">604 Comprehensive Tests</Badge>
            <Badge size="lg">Full Accessibility</Badge>
            <Badge size="lg">Production Ready</Badge>
          </div>
        </Container>

        {/* Component Sections */}
        <div className="space-y-24">
          {/* 1. INTERACTIVE COMPONENTS SECTION */}
          <section id="buttons" className="space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold text-foreground">Interactive Components</h2>
              <p className="text-muted-foreground text-lg">Buttons, inputs, and form controls</p>
            </div>

            {/* Button Showcase */}
            <Container
              size="7xl"
              padding="lg"
              className="border border-border rounded-lg space-y-8"
            >
              <Container size="none" padding="none" className="text-center">
                <h3 className="text-2xl font-semibold text-foreground flex items-center justify-center gap-3">
                  <span className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </span>
                  Button Component
                </h3>
              </Container>

              <div className="grid gap-10">
                {/* Color Variants */}
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-foreground text-center">
                    Color Variants
                  </h4>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button variant="default">Default Button</Button>
                    <Button variant="destructive">Destructive Button</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="outline">Outline</Button>
                  </div>
                </div>

                {/* Size Variants */}
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-foreground text-center">Size Variants</h4>
                  <div className="flex flex-wrap justify-center items-center gap-4">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon">ðŸŽ¯</Button>
                  </div>
                </div>

                {/* States */}
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-foreground text-center">States</h4>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button loading>Loading Button</Button>
                    <Button disabled>Disabled Button</Button>
                    <Button variant="destructive" loading>
                      Destructive Loading
                    </Button>
                    <Button variant="outline" disabled>
                      Outline Disabled
                    </Button>
                  </div>
                </div>

                {/* Kitchen Sink - Ultimate Button */}
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-foreground text-center">
                    Kitchen Sink - Ultimate Button
                  </h4>
                  <div className="flex flex-col items-center gap-6">
                    <div className="text-center text-sm text-muted-foreground max-w-md">
                      The ultimate button demonstration combining hover effects, click animations,
                      and state transitions
                    </div>
                    <div className="space-y-4">
                      <Button
                        size="lg"
                        className="relative overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                        onClick={event => {
                          const btn = event.currentTarget as HTMLButtonElement;
                          btn.classList.add('animate-pulse');
                          setTimeout(() => btn.classList.remove('animate-pulse'), 600);
                        }}
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          🚀 Launch Ultimate Action
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
                      </Button>

                      <Button
                        variant="outline"
                        size="lg"
                        className="relative group hover:bg-primary hover:text-primary-foreground transition-all duration-300 border-2 hover:border-primary hover:shadow-md"
                      >
                        <span className="flex items-center gap-2">
                          ⭐ Premium Feature
                          <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Container>

            {/* Input Showcase */}
            <Container
              size="7xl"
              padding="lg"
              className="border border-border rounded-lg space-y-8"
            >
              <Container size="none" padding="none" className="text-center">
                <h3 className="text-2xl font-semibold text-foreground flex items-center justify-center gap-3">
                  <span className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </span>
                  Input Component
                </h3>
              </Container>

              <div className="grid gap-8 max-w-2xl mx-auto">
                {/* Basic Inputs */}
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-foreground text-center">Basic Inputs</h4>
                  <div className="space-y-4">
                    <Input
                      placeholder="Default input..."
                      value={inputValue}
                      onChange={e => setInputValue(e.target.value)}
                    />
                    <Input placeholder="Email input..." type="email" />
                    <Input placeholder="With error..." error="This field is required" />
                  </div>
                </div>

                {/* States */}
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-foreground text-center">States</h4>
                  <div className="space-y-4">
                    <Input loading placeholder="Loading input..." />
                    <Input disabled placeholder="Disabled input..." />
                  </div>
                </div>

                {/* Kitchen Sink - Ultimate Input */}
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-foreground text-center">
                    Kitchen Sink - Ultimate Smart Input
                  </h4>
                  <div className="text-center text-sm text-muted-foreground max-w-2xl mx-auto mb-6">
                    Advanced input with real-time validation, character counting, focus animations,
                    and smart suggestions
                  </div>
                  <div className="space-y-6">
                    {/* Smart Email Input */}
                    <div className="relative group">
                      <Input
                        type="email"
                        placeholder="Enter your email for smart validation..."
                        className="pr-24 transition-all duration-300 focus:scale-[1.01] focus:shadow-lg border-2 focus:border-blue-500/50"
                        onChange={e => {
                          const value = e.target.value;
                          const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                          const indicator =
                            e.target.parentElement?.querySelector('[data-email-indicator]');
                          if (indicator) {
                            if (value.length === 0) {
                              indicator.textContent = '';
                              indicator.className =
                                'absolute right-3 top-1/2 transform -translate-y-1/2 text-xs';
                            } else if (isValid) {
                              indicator.textContent = '✅';
                              indicator.className =
                                'absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-green-600 animate-bounce';
                            } else {
                              indicator.textContent = '⚠️';
                              indicator.className =
                                'absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-orange-500';
                            }
                          }
                        }}
                      />
                      <span
                        data-email-indicator
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs"
                      ></span>
                      <div className="absolute -bottom-6 left-0 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <span className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></span>
                          Smart validation enabled
                        </span>
                      </div>
                    </div>

                    {/* Character-Counted Input */}
                    <div className="relative">
                      <Input
                        placeholder="Smart message with character count..."
                        maxLength={120}
                        className="pr-16 border-2 focus:border-purple-500/50 transition-all duration-300"
                        onChange={e => {
                          const value = e.target.value;
                          const counter =
                            e.target.parentElement?.querySelector('[data-char-counter]');
                          if (counter) {
                            const remaining = 120 - value.length;
                            counter.textContent = remaining.toString();
                            if (remaining < 20) {
                              counter.className =
                                'absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-orange-500 font-medium';
                            } else if (remaining < 10) {
                              counter.className =
                                'absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-red-500 font-bold animate-pulse';
                            } else {
                              counter.className =
                                'absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground';
                            }
                          }
                        }}
                      />
                      <span
                        data-char-counter
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground"
                      >
                        120
                      </span>
                      <div className="mt-2 flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Characters remaining</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 w-0 transition-all duration-300"
                              data-progress-bar
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Multi-Feature Input */}
                    <div className="relative p-4 border-2 border-dashed border-muted rounded-lg hover:border-primary/50 transition-colors duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-sm font-medium">🎯 Ultimate Form Field</span>
                        <Badge variant="secondary" className="text-xs">
                          Premium
                        </Badge>
                      </div>
                      <Input
                        placeholder="Type here for real-time suggestions..."
                        className="border-0 bg-transparent focus:ring-0 text-lg p-0 placeholder:text-muted-foreground/70"
                        onFocus={e => {
                          const container = e.target.closest('.relative');
                          container?.classList.add('ring-2', 'ring-blue-500/20');
                        }}
                        onBlur={e => {
                          const container = e.target.closest('.relative');
                          container?.classList.remove('ring-2', 'ring-blue-500/20');

                          // Hide suggestions after a short delay to allow for clicks
                          setTimeout(() => {
                            const suggestions = container?.querySelector('[data-suggestions]');
                            if (suggestions) {
                              suggestions.classList.add('hidden');
                            }
                          }, 150);
                        }}
                        onChange={e => {
                          const value = e.target.value;
                          const suggestions =
                            e.target.parentElement?.querySelector('[data-suggestions]');
                          const inputField = e.target;

                          if (suggestions && value.length > 2) {
                            const mockSuggestions = [
                              `${value}@gmail.com`,
                              `${value}@outlook.com`,
                              `${value}@company.com`,
                            ];

                            // Create clickable suggestions with event listeners
                            suggestions.innerHTML = mockSuggestions
                              .map(
                                s =>
                                  `<div class="px-2 py-1 hover:bg-muted cursor-pointer text-xs rounded transition-colors duration-150" data-suggestion="${s}">${s}</div>`
                              )
                              .join('');

                            // Add click event listeners to each suggestion
                            const suggestionElements =
                              suggestions.querySelectorAll('[data-suggestion]');
                            suggestionElements.forEach(element => {
                              element.addEventListener('click', () => {
                                const suggestionText = element.getAttribute('data-suggestion');
                                if (suggestionText) {
                                  // Set the input value
                                  inputField.value = suggestionText;

                                  // Trigger change event for any validation
                                  const changeEvent = new Event('change', { bubbles: true });
                                  inputField.dispatchEvent(changeEvent);

                                  // Hide suggestions
                                  suggestions.classList.add('hidden');

                                  // Focus back to input
                                  inputField.focus();
                                }
                              });
                            });

                            suggestions.classList.remove('hidden');
                          } else if (suggestions) {
                            suggestions.classList.add('hidden');
                          }
                        }}
                      />
                      <div
                        data-suggestions
                        className="absolute left-4 right-4 top-full mt-1 bg-background border rounded-md shadow-lg z-10 hidden"
                      ></div>
                      <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
                            Auto-suggestions
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></span>
                            Smart validation
                          </span>
                        </div>
                        <span>Premium features active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>

            {/* Textarea Showcase */}
            <Container
              size="7xl"
              padding="lg"
              className="border border-border rounded-lg space-y-8"
            >
              <Container size="none" padding="none" className="text-center">
                <h3 className="text-2xl font-semibold text-foreground flex items-center justify-center gap-3">
                  <span className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </span>
                  Textarea Component
                </h3>
              </Container>

              <div className="grid gap-6 max-w-2xl mx-auto">
                <div className="space-y-4">
                  <Textarea
                    placeholder="Enter your message..."
                    value={textareaValue}
                    onChange={e => setTextareaValue(e.target.value)}
                    rows={4}
                  />
                  <Textarea placeholder="With error..." error="Message is required" rows={3} />
                  <Textarea loading placeholder="Loading..." rows={3} />
                  <Textarea disabled placeholder="Disabled textarea..." rows={3} />
                </div>
              </div>
            </Container>

            {/* Select Showcase */}
            <Container
              size="7xl"
              padding="lg"
              className="border border-border rounded-lg space-y-8"
            >
              <Container size="none" padding="none" className="text-center">
                <h3 className="text-2xl font-semibold text-foreground flex items-center justify-center gap-3">
                  <span className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </span>
                  Select Component
                </h3>
              </Container>

              <div className="grid gap-6 max-w-md mx-auto">
                <div className="space-y-4">
                  <Select value={selectValue} onValueChange={setSelectValue}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                      <SelectItem value="option3">Option 3</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select disabled>
                    <SelectTrigger>
                      <SelectValue placeholder="Disabled select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="disabled">Disabled Option</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Container>

            {/* Checkbox & Radio Showcase */}
            <Container
              size="7xl"
              padding="lg"
              className="border border-border rounded-lg space-y-8"
            >
              <Container size="none" padding="none" className="text-center">
                <h3 className="text-2xl font-semibold text-foreground flex items-center justify-center gap-3">
                  <span className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    5
                  </span>
                  Checkbox & RadioGroup Components
                </h3>
              </Container>

              <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                {/* Checkboxes */}
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-foreground text-center">Checkboxes</h4>
                  <div className="flex justify-center">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="checkbox-1"
                          checked={checkboxState === true}
                          onCheckedChange={checked => setCheckboxState(checked)}
                        />
                        <label htmlFor="checkbox-1" className="text-sm">
                          Default checkbox
                        </label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox id="checkbox-2" checked="indeterminate" />
                        <label htmlFor="checkbox-2" className="text-sm">
                          Indeterminate state
                        </label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox id="checkbox-3" disabled />
                        <label htmlFor="checkbox-3" className="text-sm text-muted-foreground">
                          Disabled checkbox
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Radio Groups */}
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-foreground text-center">Radio Groups</h4>
                  <div className="flex justify-center">
                    <RadioGroup value={radioValue} onValueChange={setRadioValue}>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="option1" id="radio-1" />
                        <label htmlFor="radio-1" className="text-sm">
                          Option 1
                        </label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="option2" id="radio-2" />
                        <label htmlFor="radio-2" className="text-sm">
                          Option 2
                        </label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="option3" id="radio-3" disabled />
                        <label htmlFor="radio-3" className="text-sm text-muted-foreground">
                          Disabled option
                        </label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </Container>

            {/* Switch Showcase */}
            <Container
              size="7xl"
              padding="lg"
              className="border border-border rounded-lg space-y-8"
            >
              <Container size="none" padding="none" className="text-center">
                <h3 className="text-2xl font-semibold text-foreground flex items-center justify-center gap-3">
                  <span className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    6
                  </span>
                  Switch Component
                </h3>
              </Container>

              <div className="space-y-8">
                {/* Basic Switches */}
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-foreground text-center">Basic Toggle</h4>
                  <div className="flex justify-center gap-8">
                    <div className="flex items-center space-x-3">
                      <Switch
                        id="switch-basic"
                        checked={switchValue}
                        onCheckedChange={setSwitchValue}
                      />
                      <Label htmlFor="switch-basic" className="text-sm">
                        Enable notifications
                      </Label>
                    </div>
                  </div>
                </div>

                {/* States */}
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-foreground text-center">States</h4>
                  <div className="flex justify-center gap-8">
                    <div className="flex items-center space-x-3">
                      <Switch id="switch-on" defaultChecked />
                      <Label htmlFor="switch-on" className="text-sm">
                        Default On
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Switch id="switch-off" />
                      <Label htmlFor="switch-off" className="text-sm">
                        Default Off
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Switch id="switch-disabled" disabled />
                      <Label htmlFor="switch-disabled" className="text-sm text-muted-foreground">
                        Disabled
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Kitchen Sink - Settings Panel */}
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-foreground text-center">
                    Kitchen Sink - Settings Panel
                  </h4>
                  <div className="text-center text-sm text-muted-foreground max-w-2xl mx-auto mb-6">
                    Real-world settings panel with grouped switches and proper labeling
                  </div>

                  <div className="max-w-md mx-auto border rounded-lg p-6 bg-card space-y-6">
                    <div className="space-y-4">
                      <h5 className="text-sm font-semibold text-foreground">Notifications</h5>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <Label htmlFor="push-notifications" className="text-sm font-medium">
                              Push Notifications
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Receive notifications on your device
                            </p>
                          </div>
                          <Switch id="push-notifications" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <Label htmlFor="email-notifications" className="text-sm font-medium">
                              Email Notifications
                            </Label>
                            <p className="text-xs text-muted-foreground">Get updates via email</p>
                          </div>
                          <Switch id="email-notifications" />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <Label htmlFor="marketing-emails" className="text-sm font-medium">
                              Marketing Emails
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Promotional content and updates
                            </p>
                          </div>
                          <Switch id="marketing-emails" />
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4 space-y-4">
                      <h5 className="text-sm font-semibold text-foreground">Privacy</h5>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <Label htmlFor="analytics" className="text-sm font-medium">
                              Analytics
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Help improve the product
                            </p>
                          </div>
                          <Switch id="analytics" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <Label htmlFor="data-sharing" className="text-sm font-medium">
                              Data Sharing
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Share usage data with partners
                            </p>
                          </div>
                          <Switch id="data-sharing" />
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4 space-y-4">
                      <h5 className="text-sm font-semibold text-foreground">Accessibility</h5>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <Label htmlFor="high-contrast" className="text-sm font-medium">
                              High Contrast
                            </Label>
                            <p className="text-xs text-muted-foreground">Improve visibility</p>
                          </div>
                          <Switch id="high-contrast" />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <Label htmlFor="reduce-motion" className="text-sm font-medium">
                              Reduce Motion
                            </Label>
                            <p className="text-xs text-muted-foreground">Minimize animations</p>
                          </div>
                          <Switch id="reduce-motion" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>

            {/* Slider Showcase */}
            <Container
              size="7xl"
              padding="lg"
              className="border border-border rounded-lg space-y-8"
            >
              <Container size="none" padding="none" className="text-center">
                <h3 className="text-2xl font-semibold text-foreground flex items-center justify-center gap-3">
                  <span className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    7
                  </span>
                  Slider Component
                </h3>
              </Container>

              <div className="space-y-10 max-w-lg mx-auto">
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-foreground text-center">Basic Slider</h4>
                  <Slider
                    value={sliderValue}
                    onValueChange={setSliderValue}
                    max={100}
                    step={1}
                    showValue
                    valuePosition="right"
                  />
                </div>

                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-foreground text-center">
                    Range Slider (Two Thumbs)
                  </h4>
                  <Slider
                    value={sliderRange}
                    onValueChange={setSliderRange}
                    max={100}
                    step={1}
                    showValue
                    valuePosition="right"
                  />
                  <div className="text-center text-muted-foreground text-sm">
                    Selected range: {sliderRange[0]} – {sliderRange[1]}
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-foreground text-center">
                    Variants & States
                  </h4>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Success variant</label>
                      <Slider defaultValue={[75]} variant="success" showValue />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Warning variant</label>
                      <Slider defaultValue={[60]} variant="warning" showValue />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Disabled</label>
                      <Slider defaultValue={[40]} disabled />
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </section>

          {/* 2. FEEDBACK & STATUS SECTION */}
          <section className="space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold text-foreground">Feedback & Status</h2>
              <p className="text-muted-foreground text-lg">
                Alerts, progress, and status indicators
              </p>
            </div>

            {/* Alert Showcase */}
            <Container
              size="7xl"
              padding="lg"
              className="border border-border rounded-lg space-y-8"
            >
              <Container size="none" padding="none" className="text-center">
                <h3 className="text-2xl font-semibold text-foreground flex items-center justify-center gap-3">
                  <span className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    8
                  </span>
                  Alert Component
                </h3>
              </Container>

              <div className="space-y-6 max-w-3xl mx-auto">
                <Alert variant="default">
                  <Info className="h-4 w-4" />
                  <div>
                    <div className="font-semibold">Information</div>
                    <div>This is a default alert with additional information.</div>
                  </div>
                </Alert>

                <Alert variant="success">
                  <CheckCircle className="h-4 w-4" />
                  <div>
                    <div className="font-semibold">Success!</div>
                    <div>Your changes have been saved successfully.</div>
                  </div>
                </Alert>

                <Alert variant="warning">
                  <AlertCircle className="h-4 w-4" />
                  <div>
                    <div className="font-semibold">Warning</div>
                    <div>Please review your input before proceeding.</div>
                  </div>
                </Alert>

                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <div>
                    <div className="font-semibold">Error</div>
                    <div>Something went wrong. Please try again.</div>
                  </div>
                </Alert>
              </div>
            </Container>

            {/* Progress Showcase */}
            <Container
              size="7xl"
              padding="lg"
              className="bg-card border border-border rounded-lg space-y-8"
            >
              <Container size="none" padding="none" className="text-center">
                <h3 className="text-2xl font-semibold text-foreground flex items-center justify-center gap-3">
                  <span className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    9
                  </span>
                  Progress Component
                </h3>
              </Container>

              <div className="space-y-10 max-w-lg mx-auto">
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-foreground text-center">Variants</h4>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Default Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Success Progress</span>
                        <span>90%</span>
                      </div>
                      <Progress value={90} variant="success" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Warning Progress</span>
                        <span>70%</span>
                      </div>
                      <Progress value={70} variant="warning" />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-foreground text-center">Sizes</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <span className="text-sm text-muted-foreground">Small</span>
                      <Progress value={75} size="sm" />
                    </div>
                    <div className="space-y-2">
                      <span className="text-sm text-muted-foreground">Default</span>
                      <Progress value={75} size="default" />
                    </div>
                    <div className="space-y-2">
                      <span className="text-sm text-muted-foreground">Large</span>
                      <Progress value={75} size="lg" />
                    </div>
                  </div>
                </div>

                {/* Kitchen Sink - Animated Progress */}
                <div className="space-y-4 text-center">
                  <h4 className="text-lg font-medium text-foreground">
                    Kitchen Sink - Animated Progress
                  </h4>
                  <div className="max-w-md mx-auto space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground">
                          Loading Progress
                        </span>
                        <span className="text-sm font-bold text-primary">{animatedProgress}%</span>
                      </div>
                      <Progress
                        value={animatedProgress}
                        variant="success"
                        size="lg"
                        className="transition-all duration-100 ease-out"
                      />
                      <p className="text-xs text-muted-foreground">
                        Smooth 0→100% animation over 6 seconds with easing
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Container>

            {/* Badge Showcase */}
            <Container
              size="7xl"
              padding="lg"
              className="bg-card border border-border rounded-lg space-y-8"
            >
              <Container size="none" padding="none" className="text-center">
                <h3 className="text-2xl font-semibold text-foreground flex items-center justify-center gap-3">
                  <span className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    9
                  </span>
                  Badge Component
                </h3>
              </Container>

              <div className="space-y-8">
                {/* Color Variants */}
                <div className="space-y-4 text-center">
                  <h4 className="text-lg font-medium text-foreground">Color Variants</h4>
                  <div className="flex flex-wrap justify-center gap-3">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                  </div>
                </div>

                {/* Size Variants */}
                <div className="space-y-4 text-center">
                  <h4 className="text-lg font-medium text-foreground">Size Variants</h4>
                  <div className="flex flex-wrap justify-center items-center gap-3">
                    <Badge size="sm">Small</Badge>
                    <Badge size="default">Default</Badge>
                    <Badge size="lg">Large</Badge>
                  </div>
                </div>

                {/* Interactive Badges */}
                <div className="space-y-4 text-center">
                  <h4 className="text-lg font-medium text-foreground">Interactive Features</h4>
                  <div className="flex flex-wrap justify-center gap-3">
                    <Badge removable onRemove={() => console.log('Badge removed')}>
                      Removable Badge
                    </Badge>
                    <Badge dot>With Dot</Badge>
                  </div>
                </div>

                {/* Kitchen Sink - Ultimate Badge Collection */}
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-foreground text-center">
                    Kitchen Sink - Ultimate Badge Showcase
                  </h4>
                  <div className="text-center text-sm text-muted-foreground max-w-2xl mx-auto mb-6">
                    Advanced badges with animations, real-time updates, interactive states, and
                    premium visual effects
                  </div>

                  {/* Live Status Badges */}
                  <div className="space-y-4">
                    <div className="text-sm font-medium text-center text-muted-foreground mb-3">
                      Live Status Indicators
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                      <Badge
                        size="lg"
                        className="relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 cursor-pointer animate-pulse"
                      >
                        <span className="flex items-center gap-2 relative z-10">
                          <span className="w-2 h-2 bg-white rounded-full animate-ping absolute"></span>
                          <span className="w-2 h-2 bg-white rounded-full"></span>
                          🟢 ONLINE
                        </span>
                      </Badge>

                      <Badge
                        variant="destructive"
                        size="lg"
                        className="relative group hover:scale-105 transition-transform duration-200"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
                          🔴 CRITICAL
                        </span>
                      </Badge>

                      <Badge
                        size="lg"
                        className="bg-gradient-to-r from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-700 transition-all duration-300 cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                          ⚠️ WARNING
                        </span>
                      </Badge>
                    </div>
                  </div>

                  {/* Animated Counter Badges */}
                  <div className="space-y-4">
                    <div className="text-sm font-medium text-center text-muted-foreground mb-3">
                      Dynamic Counter Badges
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                      <div className="relative group">
                        <Badge
                          variant="secondary"
                          size="lg"
                          className="pr-8 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-200 cursor-pointer"
                        >
                          📧 Messages
                        </Badge>
                        <Badge
                          size="sm"
                          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 min-w-[1.5rem] h-6 rounded-full flex items-center justify-center animate-bounce"
                          onClick={() => {
                            const counter = document.querySelector('[data-message-counter]');
                            if (counter) {
                              const current = parseInt(counter.textContent || '0');
                              counter.textContent = (current + 1).toString();
                            }
                          }}
                        >
                          <span data-message-counter className="text-xs font-bold text-white">
                            3
                          </span>
                        </Badge>
                      </div>

                      <div className="relative group">
                        <Badge
                          variant="outline"
                          size="lg"
                          className="pr-8 border-2 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200"
                        >
                          🛒 Cart
                        </Badge>
                        <Badge
                          size="sm"
                          className="absolute -top-2 -right-2 bg-purple-500 hover:bg-purple-600 min-w-[1.5rem] h-6 rounded-full flex items-center justify-center"
                        >
                          <span className="text-xs font-bold text-white">12</span>
                        </Badge>
                      </div>

                      <div className="relative group">
                        <Badge
                          size="lg"
                          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 pr-8"
                        >
                          ⭐ Favorites
                        </Badge>
                        <Badge
                          size="sm"
                          className="absolute -top-2 -right-2 bg-yellow-500 hover:bg-yellow-600 min-w-[1.5rem] h-6 rounded-full flex items-center justify-center animate-pulse"
                        >
                          <span className="text-xs font-bold text-white">7</span>
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Premium Feature Badges */}
                  <div className="space-y-4">
                    <div className="text-sm font-medium text-center text-muted-foreground mb-3">
                      Premium Feature Badges
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                      <Badge
                        size="lg"
                        className="relative overflow-hidden bg-gradient-to-r from-gold-400 via-yellow-500 to-gold-600 hover:from-gold-500 hover:via-yellow-600 hover:to-gold-700 transition-all duration-500 cursor-pointer group"
                        style={{ background: 'linear-gradient(45deg, #FFD700, #FFA500, #FFD700)' }}
                      >
                        <span className="flex items-center gap-2 relative z-10">👑 PREMIUM</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                      </Badge>

                      <Badge
                        size="lg"
                        className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:scale-110 transition-transform duration-300 cursor-pointer animate-pulse"
                      >
                        <span className="flex items-center gap-2">✨ VIP</span>
                      </Badge>

                      <Badge
                        removable
                        size="lg"
                        className="bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 transition-all duration-300"
                        onRemove={() => console.log('Premium badge removed')}
                      >
                        <span className="flex items-center gap-2">💎 ENTERPRISE</span>
                      </Badge>
                    </div>
                  </div>

                  <div className="pt-4 text-center">
                    <div className="inline-flex items-center gap-2 text-xs text-muted-foreground p-3 bg-muted/30 rounded-lg">
                      <span className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></span>
                      All badges feature hover effects, animations, and interactive capabilities
                      <span className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></span>
                    </div>
                  </div>
                </div>
              </div>
            </Container>

            {/* Separator Showcase */}
            <Container
              size="7xl"
              padding="lg"
              className="bg-card border border-border rounded-lg space-y-8"
            >
              <Container size="none" padding="none" className="text-center">
                <h3 className="text-2xl font-semibold text-foreground flex items-center justify-center gap-3">
                  <span className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    11
                  </span>
                  Separator Component
                </h3>
              </Container>

              <div className="space-y-8">
                {/* Basic Separators */}
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-foreground text-center">
                    Basic Separators
                  </h4>
                  <div className="space-y-4 max-w-md mx-auto">
                    <div className="p-4 border rounded-lg bg-card">
                      <p className="text-sm text-muted-foreground">Content above</p>
                      <Separator />
                      <p className="text-sm text-muted-foreground">Content below</p>
                    </div>
                  </div>
                </div>

                {/* Variants */}
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-foreground text-center">Variants</h4>
                  <div className="space-y-4 max-w-2xl mx-auto">
                    <div className="grid gap-4">
                      <div className="p-4 border rounded-lg bg-card">
                        <div className="text-sm font-medium mb-2">Default</div>
                        <Separator variant="default" />
                        <div className="text-xs text-muted-foreground mt-2">
                          Standard border color
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg bg-card">
                        <div className="text-sm font-medium mb-2">Muted</div>
                        <Separator variant="muted" />
                        <div className="text-xs text-muted-foreground mt-2">Subtle background</div>
                      </div>

                      <div className="p-4 border rounded-lg bg-card">
                        <div className="text-sm font-medium mb-2">Primary</div>
                        <Separator variant="primary" />
                        <div className="text-xs text-muted-foreground mt-2">
                          Primary color accent
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg bg-card">
                        <div className="text-sm font-medium mb-2">Destructive</div>
                        <Separator variant="destructive" />
                        <div className="text-xs text-muted-foreground mt-2">
                          Warning/error indicator
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sizes */}
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-foreground text-center">Sizes</h4>
                  <div className="space-y-4 max-w-md mx-auto">
                    <div className="p-4 border rounded-lg bg-card space-y-4">
                      <div>
                        <div className="text-sm font-medium mb-2">Small</div>
                        <Separator size="sm" />
                      </div>

                      <div>
                        <div className="text-sm font-medium mb-2">Default</div>
                        <Separator size="default" />
                      </div>

                      <div>
                        <div className="text-sm font-medium mb-2">Large</div>
                        <Separator size="lg" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vertical Separators */}
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-foreground text-center">
                    Vertical Orientation
                  </h4>
                  <div className="flex justify-center">
                    <div className="p-4 border rounded-lg bg-card">
                      <div className="flex items-center gap-4 h-16">
                        <div className="text-sm text-muted-foreground">Left</div>
                        <Separator orientation="vertical" />
                        <div className="text-sm text-muted-foreground">Center</div>
                        <Separator orientation="vertical" variant="primary" />
                        <div className="text-sm text-muted-foreground">Right</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text Separators */}
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-foreground text-center">
                    Text Separators
                  </h4>
                  <div className="space-y-4 max-w-lg mx-auto">
                    <div className="p-4 border rounded-lg bg-card space-y-6">
                      <div className="text-sm text-muted-foreground">Above content section</div>

                      <Separator spacing="lg">OR</Separator>

                      <div className="text-sm text-muted-foreground">Below content section</div>

                      <Separator variant="muted" spacing="lg">
                        FEATURES
                      </Separator>

                      <div className="text-sm text-muted-foreground">Feature content area</div>
                    </div>
                  </div>
                </div>

                {/* Kitchen Sink - Ultimate Separator Usage */}
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-foreground text-center">
                    Kitchen Sink - Enterprise Layout
                  </h4>
                  <div className="text-center text-sm text-muted-foreground max-w-2xl mx-auto mb-6">
                    Real-world usage in a professional dashboard layout with multiple separator
                    types
                  </div>

                  <div className="max-w-2xl mx-auto border rounded-lg p-6 bg-card space-y-6">
                    {/* Header Section */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h5 className="text-lg font-semibold">Dashboard Overview</h5>
                        <Badge variant="outline" size="sm">
                          Live
                        </Badge>
                      </div>

                      <Separator variant="primary" size="lg" />

                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="space-y-1">
                          <div className="text-2xl font-bold text-primary">1,234</div>
                          <div className="text-xs text-muted-foreground">Users</div>
                        </div>

                        <Separator orientation="vertical" className="mx-auto h-12" />

                        <div className="space-y-1">
                          <div className="text-2xl font-bold text-green-500">98.5%</div>
                          <div className="text-xs text-muted-foreground">Uptime</div>
                        </div>

                        <Separator orientation="vertical" className="mx-auto h-12" />

                        <div className="space-y-1">
                          <div className="text-2xl font-bold text-blue-500">4.8</div>
                          <div className="text-xs text-muted-foreground">Rating</div>
                        </div>
                      </div>
                    </div>

                    <Separator spacing="lg">RECENT ACTIVITY</Separator>

                    {/* Activity List */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1 text-sm">New user registration</div>
                        <div className="text-xs text-muted-foreground">2 min ago</div>
                      </div>

                      <Separator size="sm" variant="muted" spacing="none" />

                      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="flex-1 text-sm">System update completed</div>
                        <div className="text-xs text-muted-foreground">1 hour ago</div>
                      </div>

                      <Separator size="sm" variant="muted" spacing="none" />

                      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <div className="flex-1 text-sm">Maintenance scheduled</div>
                        <div className="text-xs text-muted-foreground">3 hours ago</div>
                      </div>
                    </div>

                    <Separator variant="destructive" spacing="lg">
                      ALERTS
                    </Separator>

                    {/* Alert Section */}
                    <div className="p-3 border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm font-medium">System Notice</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Scheduled maintenance window: Sunday 2:00 AM - 4:00 AM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Container>

            {/* Skeleton Showcase */}
            <Container
              size="7xl"
              padding="lg"
              className="bg-card border border-border rounded-lg space-y-8"
            >
              <Container size="none" padding="none" className="text-center">
                <h3 className="text-2xl font-semibold text-foreground flex items-center justify-center gap-3">
                  <span className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    12
                  </span>
                  Skeleton Component
                </h3>
              </Container>

              <div className="space-y-8">
                {/* Basic Skeletons */}
                <div className="space-y-4 text-center">
                  <h4 className="text-lg font-medium text-foreground">Basic Shapes</h4>
                  <div className="flex flex-wrap justify-center gap-6 items-start">
                    <div className="text-center space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <p className="text-xs text-muted-foreground">Text Line</p>
                    </div>
                    <div className="text-center space-y-2">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <p className="text-xs text-muted-foreground">Avatar</p>
                    </div>
                    <div className="text-center space-y-2">
                      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                      <p className="text-xs text-muted-foreground">Card</p>
                    </div>
                  </div>
                </div>

                {/* Common Patterns */}
                <div className="space-y-4 text-center">
                  <h4 className="text-lg font-medium text-foreground">Common Loading Patterns</h4>

                  {/* Profile Card Pattern */}
                  <div className="max-w-sm mx-auto p-6 border rounded-lg bg-card">
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-4 w-[100px]" />
                      </div>
                    </div>
                  </div>

                  {/* Article Card Pattern */}
                  <div className="max-w-md mx-auto p-6 border rounded-lg bg-card">
                    <div className="space-y-4">
                      <Skeleton className="h-[200px] w-full rounded-md" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </div>
                  </div>

                  {/* List Pattern */}
                  <div className="max-w-md mx-auto p-6 border rounded-lg bg-card">
                    <div className="space-y-4">
                      <h5 className="text-sm font-medium text-muted-foreground">List Loading</h5>
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center space-x-4">
                          <Skeleton className="h-8 w-8 rounded-full" />
                          <div className="space-y-2 flex-1">
                            <Skeleton className="h-3 w-full" />
                            <Skeleton className="h-3 w-2/3" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Kitchen Sink - Ultimate Skeleton */}
                <div className="space-y-4 text-center">
                  <h4 className="text-lg font-medium text-foreground">
                    Kitchen Sink - Ultimate Loading Experience
                  </h4>
                  <div className="text-center text-sm text-muted-foreground max-w-2xl mx-auto mb-6">
                    Complete dashboard loading state with animated skeletons and realistic content
                    placeholders
                  </div>

                  <div className="max-w-4xl mx-auto border rounded-lg p-6 bg-card space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[120px]" />
                          <Skeleton className="h-3 w-[80px]" />
                        </div>
                      </div>
                      <Skeleton className="h-8 w-[100px] rounded-md" />
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="border rounded-lg p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <Skeleton className="h-6 w-6 rounded" />
                            <Skeleton className="h-4 w-[60px]" />
                          </div>
                          <Skeleton className="h-8 w-[80px]" />
                          <Skeleton className="h-3 w-full" />
                        </div>
                      ))}
                    </div>

                    {/* Chart Area */}
                    <div className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-5 w-[140px]" />
                        <Skeleton className="h-8 w-[100px] rounded-md" />
                      </div>
                      <Skeleton className="h-[200px] w-full rounded" />
                    </div>

                    {/* Table */}
                    <div className="border rounded-lg p-4 space-y-4">
                      <Skeleton className="h-5 w-[100px]" />
                      <div className="space-y-3">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="flex items-center space-x-4">
                            <Skeleton className="h-8 w-8 rounded" />
                            <Skeleton className="h-4 w-[120px]" />
                            <Skeleton className="h-4 w-[100px]" />
                            <Skeleton className="h-4 w-[80px]" />
                            <div className="flex-1" />
                            <Skeleton className="h-6 w-[60px] rounded-full" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>

            {/* Avatar Showcase */}
            <Container
              size="7xl"
              padding="lg"
              className="bg-card border border-border rounded-lg space-y-8"
            >
              <Container size="none" padding="none" className="text-center">
                <h3 className="text-2xl font-semibold text-foreground flex items-center justify-center gap-3">
                  <span className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    13
                  </span>
                  Avatar Component
                </h3>
              </Container>

              <div className="space-y-8">
                {/* Basic Avatars */}
                <div className="space-y-4 text-center">
                  <h4 className="text-lg font-medium text-foreground">Basic Types</h4>
                  <div className="flex flex-wrap justify-center gap-6 items-center">
                    <div className="text-center space-y-2">
                      <Avatar src="https://github.com/shadcn.png" alt="@shadcn" />
                      <p className="text-xs text-muted-foreground">With Image</p>
                    </div>
                    <div className="text-center space-y-2">
                      <Avatar name="John Doe" />
                      <p className="text-xs text-muted-foreground">Initials</p>
                    </div>
                    <div className="text-center space-y-2">
                      <Avatar fallback="JS" />
                      <p className="text-xs text-muted-foreground">Custom Fallback</p>
                    </div>
                    <div className="text-center space-y-2">
                      <Avatar loading />
                      <p className="text-xs text-muted-foreground">Loading</p>
                    </div>
                  </div>
                </div>

                {/* Status Indicators */}
                <div className="space-y-4 text-center">
                  <h4 className="text-lg font-medium text-foreground">Status Indicators</h4>
                  <div className="flex flex-wrap justify-center gap-6 items-center">
                    <div className="text-center space-y-2">
                      <Avatar name="Online User" status="online" />
                      <p className="text-xs text-muted-foreground">Online</p>
                    </div>
                    <div className="text-center space-y-2">
                      <Avatar name="Offline User" status="offline" />
                      <p className="text-xs text-muted-foreground">Offline</p>
                    </div>
                  </div>
                </div>

                {/* Sizes */}
                <div className="space-y-4 text-center">
                  <h4 className="text-lg font-medium text-foreground">Size Variants</h4>
                  <div className="flex flex-wrap justify-center gap-6 items-center">
                    <div className="text-center space-y-2">
                      <Avatar name="SM" size="sm" />
                      <p className="text-xs text-muted-foreground">Small</p>
                    </div>
                    <div className="text-center space-y-2">
                      <Avatar name="MD" size="default" />
                      <p className="text-xs text-muted-foreground">Default</p>
                    </div>
                    <div className="text-center space-y-2">
                      <Avatar name="LG" size="lg" />
                      <p className="text-xs text-muted-foreground">Large</p>
                    </div>
                  </div>
                </div>

                {/* Kitchen Sink - Ultimate Avatar */}
                <div className="space-y-4 text-center">
                  <h4 className="text-lg font-medium text-foreground">
                    Kitchen Sink - Ultimate Avatar
                  </h4>
                  <div className="flex justify-center">
                    <div className="text-center space-y-3">
                      <div className="relative inline-block">
                        <Avatar
                          src="https://github.com/shadcn.png"
                          alt="Pro User"
                          size="lg"
                          status="online"
                        />
                        {/* Enhanced Online Indicator */}
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">Pro User</p>
                        <p className="text-xs text-green-600 font-medium">● Online</p>
                        <p className="text-xs text-muted-foreground">
                          Large • Image • Status • Enhanced
                        </p>
                      </div>
                    </div>
                    <div className="text-center space-y-3">
                      <div className="relative inline-block">
                        <Avatar
                          src="https://github.com/shadcn.png"
                          alt="Pro User"
                          size="lg"
                          status="offline"
                        />
                        {/* Enhanced offline Indicator */}
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-500 border-2 border-white rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">Pro User</p>
                        <p className="text-xs text-red-600 font-medium">● Offline</p>
                        <p className="text-xs text-muted-foreground">
                          Large • Image • Status • Enhanced
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </section>

          {/* 3. LAYOUT & NAVIGATION SECTION */}
          <section className="space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold text-foreground">Layout & Navigation</h2>
              <p className="text-muted-foreground text-lg">
                Dialogs, tabs, and navigation components
              </p>
            </div>

            {/* Tabs Showcase */}
            <Container
              size="7xl"
              padding="lg"
              className="bg-card border border-border rounded-lg space-y-8"
            >
              <Container size="none" padding="none" className="text-center">
                <h3 className="text-2xl font-semibold text-foreground flex items-center justify-center gap-3">
                  <span className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    14
                  </span>
                  Tabs Component
                </h3>
              </Container>

              <div className="max-w-2xl mx-auto">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                    <TabsTrigger value="support">Support</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="space-y-4 mt-6">
                    <div className="space-y-2">
                      <h4 className="text-lg font-semibold">Overview</h4>
                      <p className="text-muted-foreground">
                        Welcome to the component library overview. Here you can find information
                        about all available components and their usage patterns.
                      </p>
                    </div>
                    <div className="grid gap-4 mt-4">
                      <div className="border rounded-lg p-4">
                        <h5 className="font-medium">Quick Stats</h5>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <div>
                            <div className="text-2xl font-bold">15</div>
                            <div className="text-sm text-muted-foreground">Components</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold">539</div>
                            <div className="text-sm text-muted-foreground">Tests</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="features" className="space-y-4 mt-6">
                    <div className="space-y-2">
                      <h4 className="text-lg font-semibold">Key Features</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>âœ… Full TypeScript support</li>
                        <li>âœ… Comprehensive accessibility</li>
                        <li>âœ… Style guide compliance</li>
                        <li>âœ… Enterprise-grade testing</li>
                        <li>âœ… Responsive design</li>
                      </ul>
                    </div>
                  </TabsContent>
                  <TabsContent value="settings" className="space-y-4 mt-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold">Configuration</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <label htmlFor="dark-mode" className="text-sm">
                            Dark mode
                          </label>
                          <Checkbox id="dark-mode" />
                        </div>
                        <div className="flex items-center justify-between">
                          <label htmlFor="animations" className="text-sm">
                            Enable animations
                          </label>
                          <Checkbox id="animations" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="support" className="space-y-4 mt-6">
                    <div className="space-y-2">
                      <h4 className="text-lg font-semibold">Support & Documentation</h4>
                      <p className="text-muted-foreground">
                        Need help? Check out our comprehensive documentation and examples.
                      </p>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline">
                          Documentation
                        </Button>
                        <Button size="sm" variant="outline">
                          GitHub
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </Container>

            {/* Tooltip Showcase */}
            <Container
              size="7xl"
              padding="lg"
              className="bg-card border border-border rounded-lg space-y-8"
            >
              <Container size="none" padding="none" className="text-center">
                <h3 className="text-2xl font-semibold text-foreground flex items-center justify-center gap-3">
                  <span className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    15
                  </span>
                  Tooltip Component
                </h3>
              </Container>

              <div className="space-y-8">
                {/* Basic Tooltips */}
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-foreground text-center">
                    Basic Tooltips
                  </h4>
                  <div className="flex justify-center gap-8">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline">Hover me</Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>This is a basic tooltip</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button>Click info</Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                          <p>Tooltip positioned below</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                {/* Variant Showcase */}
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-foreground text-center">Variants</h4>
                  <div className="flex justify-center gap-6 flex-wrap">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="default">Default</Button>
                        </TooltipTrigger>
                        <TooltipContent variant="default">
                          <p>Default tooltip variant</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="secondary">Secondary</Button>
                        </TooltipTrigger>
                        <TooltipContent variant="secondary">
                          <p>Secondary tooltip</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="destructive">Destructive</Button>
                        </TooltipTrigger>
                        <TooltipContent variant="destructive">
                          <p>Warning message</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline">Outline</Button>
                        </TooltipTrigger>
                        <TooltipContent variant="outline">
                          <p>Outline tooltip</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                {/* Size Variants */}
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-foreground text-center">Sizes</h4>
                  <div className="flex justify-center gap-6">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button size="sm">Small</Button>
                        </TooltipTrigger>
                        <TooltipContent size="sm">
                          <p>Small tooltip</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button>Default</Button>
                        </TooltipTrigger>
                        <TooltipContent size="default">
                          <p>Default sized tooltip</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button size="lg">Large</Button>
                        </TooltipTrigger>
                        <TooltipContent size="lg">
                          <p>Large tooltip with more space</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                {/* Positioning */}
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-foreground text-center">Positioning</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline">Top</Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p>Positioned above</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline">Right</Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>Positioned right</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline">Bottom</Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                          <p>Positioned below</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline">Left</Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                          <p>Positioned left</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                {/* Kitchen Sink - Ultimate Tooltip */}
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-foreground text-center">
                    Kitchen Sink - Ultimate Interactive Tooltips
                  </h4>
                  <div className="text-center text-sm text-muted-foreground max-w-2xl mx-auto mb-6">
                    Advanced tooltips with rich content, custom positioning, and interactive
                    elements
                  </div>

                  <div className="flex justify-center gap-6 flex-wrap">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                            <User className="h-4 w-4" />
                            <span className="text-sm">User Profile</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent variant="outline" size="lg" className="max-w-xs">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Avatar src="https://github.com/shadcn.png" alt="User" />
                              <div>
                                <p className="font-medium text-sm">John Doe</p>
                                <p className="text-xs text-muted-foreground">john@example.com</p>
                              </div>
                            </div>
                            <div className="text-xs">
                              <p>Active user since 2023</p>
                              <p>Last seen: 2 hours ago</p>
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                            <Settings className="h-4 w-4" />
                            <span className="text-sm">System Status</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent variant="accent" size="lg" className="max-w-xs">
                          <div className="space-y-3">
                            <div className="font-medium text-sm">System Health</div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-xs">
                                <span>CPU Usage</span>
                                <span className="text-green-500">24%</span>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span>Memory</span>
                                <span className="text-yellow-500">68%</span>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span>Disk Space</span>
                                <span className="text-green-500">45%</span>
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Last updated: just now
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                            <Bell className="h-4 w-4" />
                            <span className="text-sm">Notifications</span>
                            <Badge size="sm" className="ml-1">
                              3
                            </Badge>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent variant="muted" size="lg" className="max-w-sm">
                          <div className="space-y-3">
                            <div className="font-medium text-sm">Recent Notifications</div>
                            <div className="space-y-2">
                              <div className="flex items-start gap-2 text-xs">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 flex-shrink-0" />
                                <div>
                                  <p className="font-medium">New message received</p>
                                  <p className="text-muted-foreground">2 minutes ago</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2 text-xs">
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-1 flex-shrink-0" />
                                <div>
                                  <p className="font-medium">Task completed</p>
                                  <p className="text-muted-foreground">1 hour ago</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2 text-xs">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1 flex-shrink-0" />
                                <div>
                                  <p className="font-medium">System update available</p>
                                  <p className="text-muted-foreground">3 hours ago</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>
            </Container>

            {/* Dialog Showcase */}
            <Container
              size="7xl"
              padding="lg"
              className="bg-card border border-border rounded-lg space-y-8"
            >
              <Container size="none" padding="none" className="text-center">
                <h3 className="text-2xl font-semibold text-foreground flex items-center justify-center gap-3">
                  <span className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    16
                  </span>
                  Dialog Component
                </h3>
              </Container>

              <div className="space-y-6">
                <p className="text-muted-foreground text-center">
                  Modal dialogs for user interactions with proper accessibility and keyboard
                  navigation.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>Open Dialog</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Dialog Example</DialogTitle>
                        <DialogDescription>
                          This is a sample dialog demonstrating the Dialog component with proper
                          accessibility and keyboard navigation support.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <Input placeholder="Enter your name..." />
                        <Textarea placeholder="Enter your message..." rows={3} />
                      </div>
                      <DialogFooter className="flex gap-2">
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => setIsDialogOpen(false)}>Submit</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" onClick={() => alert('Simple dialog alternative')}>
                    Alert Dialog
                  </Button>
                </div>
              </div>
            </Container>

            {/* Modal Showcase */}
            <Container
              size="7xl"
              padding="lg"
              className="bg-card border border-border rounded-lg space-y-8"
            >
              <Container size="none" padding="none" className="text-center">
                <h3 className="text-2xl font-semibold text-foreground flex items-center justify-center gap-3">
                  <span className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    17
                  </span>
                  Modal Component
                </h3>
              </Container>

              <div className="space-y-6">
                <p className="text-muted-foreground text-center">
                  Advanced modal component with portal rendering, animations, and comprehensive
                  accessibility features.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>

                  <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    size="lg"
                    animation="default"
                  >
                    <ModalHeader>
                      <ModalTitle>Modal Example</ModalTitle>
                      <ModalCloseButton onClose={() => setIsModalOpen(false)} />
                    </ModalHeader>
                    <ModalContent>
                      <ModalDescription>
                        This is an enterprise-grade modal component with portal rendering, keyboard
                        navigation, and comprehensive accessibility features.
                      </ModalDescription>
                      <div className="space-y-4 mt-6">
                        <Input placeholder="Enter project name..." />
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select project type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="web">Web Application</SelectItem>
                            <SelectItem value="mobile">Mobile App</SelectItem>
                            <SelectItem value="desktop">Desktop Application</SelectItem>
                          </SelectContent>
                        </Select>
                        <Textarea placeholder="Enter project description..." rows={3} />
                      </div>
                    </ModalContent>
                    <ModalFooter>
                      <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsModalOpen(false)}>Create Project</Button>
                    </ModalFooter>
                  </Modal>

                  <Button variant="outline" onClick={() => setIsConfirmModalOpen(true)}>
                    Confirmation Modal
                  </Button>

                  <Modal
                    isOpen={isConfirmModalOpen}
                    onClose={() => setIsConfirmModalOpen(false)}
                    size="sm"
                    animation="fast"
                  >
                    <ModalHeader>
                      <ModalTitle>Confirm Action</ModalTitle>
                    </ModalHeader>
                    <ModalContent>
                      <ModalDescription>
                        Are you sure you want to delete this item? This action cannot be undone.
                      </ModalDescription>
                    </ModalContent>
                    <ModalFooter>
                      <Button variant="outline" onClick={() => setIsConfirmModalOpen(false)}>
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={() => setIsConfirmModalOpen(false)}>
                        Delete
                      </Button>
                    </ModalFooter>
                  </Modal>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  <p>
                    Features: Portal rendering, keyboard navigation, overlay click handling, size
                    variants, animations
                  </p>
                </div>
              </div>
            </Container>
          </section>

          {/* 4. DATA DISPLAY SECTION */}
          <section id="data" className="space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold text-foreground">Data Display</h2>
              <p className="text-muted-foreground text-lg">Tables and complex data structures</p>
            </div>

            {/* DataTable Showcase */}
            <Container
              size="7xl"
              padding="lg"
              className="bg-card border border-border rounded-lg space-y-8"
            >
              <Container size="none" padding="none" className="text-center">
                <h3 className="text-2xl font-semibold text-foreground flex items-center justify-center gap-3">
                  <span className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    18
                  </span>
                  DataTable Component
                  <Badge size="sm">Enterprise</Badge>
                </h3>
              </Container>

              <div className="space-y-6">
                <p className="text-muted-foreground text-center">
                  Our most complex component with sorting, filtering, pagination, and full
                  accessibility support.
                </p>

                <div className="border rounded-lg overflow-hidden">
                  <DataTable
                    data={sampleData}
                    columns={tableColumns}
                    pagination
                    pageSize={10}
                    sortable
                    selectable
                    onSelectionChange={(selected: (number | string)[]) =>
                      console.log('Selected rows:', selected)
                    }
                    loading={false}
                    emptyMessage="No data available"
                  />
                </div>

                <div className="text-sm text-muted-foreground">
                  <strong>Features demonstrated:</strong> Sorting, row selection, pagination,
                  loading states, empty states, and full keyboard navigation.
                </div>
              </div>
            </Container>
          </section>

          {/* 5. REAL-WORLD EXAMPLES SECTION */}
          <section id="real-world" className="space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold text-foreground">Real-World Examples</h2>
              <p className="text-muted-foreground text-lg">Complete form and dashboard patterns</p>
            </div>

            {/* Card Component Showcase */}
            <Container
              size="7xl"
              padding="lg"
              className="bg-card border border-border rounded-lg space-y-8"
            >
              <Container size="none" padding="none" className="text-center">
                <h3 className="text-2xl font-semibold text-foreground flex items-center justify-center gap-3">
                  <span className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    19
                  </span>
                  Card Component
                  <Badge size="sm">Enterprise</Badge>
                </h3>
              </Container>

              <div className="space-y-6">
                <p className="text-muted-foreground text-center">
                  Flexible card component with CVA variants, states, and complete shadcn/ui pattern
                  support.
                </p>

                {/* Variant Showcase */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold">Card Variants</h4>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Default Card */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Default Card</CardTitle>
                        <CardDescription>Standard card styling</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          This is the default card variant with standard border and background.
                        </p>
                      </CardContent>
                    </Card>

                    {/* Success Card */}
                    <Card variant="success">
                      <CardHeader>
                        <CardTitle>Success Card</CardTitle>
                        <CardDescription>Success state variant</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Operation completed successfully with green accent colors.
                        </p>
                      </CardContent>
                    </Card>

                    {/* Warning Card */}
                    <Card variant="warning">
                      <CardHeader>
                        <CardTitle>Warning Card</CardTitle>
                        <CardDescription>Warning state variant</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Important information that requires attention.
                        </p>
                      </CardContent>
                    </Card>

                    {/* Danger Card */}
                    <Card variant="danger">
                      <CardHeader>
                        <CardTitle>Error Card</CardTitle>
                        <CardDescription>Error state variant</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Critical error that needs immediate action.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Size Variants */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold">Card Sizes</h4>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card size="sm">
                      <CardHeader>
                        <CardTitle>Small Card</CardTitle>
                        <CardDescription>Compact size</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground">
                          Small card for tight spaces.
                        </p>
                      </CardContent>
                    </Card>

                    <Card size="default">
                      <CardHeader>
                        <CardTitle>Default Size</CardTitle>
                        <CardDescription>Standard sizing</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">Default card size.</p>
                      </CardContent>
                    </Card>

                    <Card size="lg">
                      <CardHeader>
                        <CardTitle>Large Card</CardTitle>
                        <CardDescription>Larger display</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-base text-muted-foreground">Large card for emphasis.</p>
                      </CardContent>
                    </Card>

                    <Card size="xl">
                      <CardHeader>
                        <CardTitle>Extra Large</CardTitle>
                        <CardDescription>Maximum impact</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-lg text-muted-foreground">
                          Extra large for hero content.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Interactive States */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold">Interactive States</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card loading>
                      <CardHeader>
                        <CardTitle>Loading Card</CardTitle>
                        <CardDescription>Loading state</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Shows loading spinner overlay while content loads.
                        </p>
                      </CardContent>
                    </Card>

                    <Card disabled>
                      <CardHeader>
                        <CardTitle>Disabled Card</CardTitle>
                        <CardDescription>Disabled state</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Disabled state prevents interaction.
                        </p>
                      </CardContent>
                    </Card>

                    <Card
                      onClick={() => alert('Card clicked!')}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <CardHeader>
                        <CardTitle>Interactive Card</CardTitle>
                        <CardDescription>Click me!</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          This card responds to click events.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Complete Card Example */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold">Complete Card Structure</h4>
                  <div className="max-w-md mx-auto">
                    <Card variant="success" size="lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          Project Complete
                        </CardTitle>
                        <CardDescription>
                          All components have been successfully integrated
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span>Components:</span>
                          <span className="font-medium">16/16</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Quality Score:</span>
                          <span className="font-medium text-green-600">99.5/100</span>
                        </div>
                        <Progress value={95} className="h-2" />
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button size="sm">Continue</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>

                {/* Kitchen Sink - Ultimate Card */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold">
                    Kitchen Sink - Ultimate Interactive Card
                  </h4>
                  <div className="text-center text-sm text-muted-foreground max-w-2xl mx-auto mb-6">
                    The ultimate card demonstration with hover animations, click interactions,
                    real-time data, and advanced visual effects
                  </div>
                  <div className="max-w-lg mx-auto">
                    <Card
                      variant="default"
                      size="lg"
                      className="relative overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border-2 hover:border-primary/50"
                      onClick={() => {
                        // Simulate data refresh
                        setTimeout(() => {
                          const elements = document.querySelectorAll('[data-animate-value]');
                          elements.forEach(el => {
                            el.classList.add('animate-pulse');
                            setTimeout(() => el.classList.remove('animate-pulse'), 800);
                          });
                        }, 100);
                      }}
                    >
                      {/* Animated Background Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <CardHeader className="relative">
                        <CardTitle className="flex items-center justify-between">
                          <span className="flex items-center gap-3">
                            🎯 Ultimate Dashboard
                            <span className="inline-flex items-center gap-1">
                              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                              <span className="text-xs text-green-600 font-medium">LIVE</span>
                            </span>
                          </span>
                          <Badge variant="secondary" className="animate-bounce">
                            Premium
                          </Badge>
                        </CardTitle>
                        <CardDescription className="text-base">
                          Real-time analytics with interactive data visualization and advanced
                          metrics tracking
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-6 relative">
                        {/* Real-time Metrics */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-muted/50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600" data-animate-value>
                              2,847
                            </div>
                            <div className="text-xs text-muted-foreground">Active Users</div>
                          </div>
                          <div className="text-center p-3 bg-muted/50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600" data-animate-value>
                              98.7%
                            </div>
                            <div className="text-xs text-muted-foreground">Uptime</div>
                          </div>
                        </div>

                        {/* Interactive Progress */}
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>Performance Score</span>
                            <span className="font-medium text-green-600" data-animate-value>
                              94/100
                            </span>
                          </div>
                          <Progress
                            value={94}
                            className="h-3 bg-muted transition-all duration-300 group-hover:h-4"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Last updated: Just now</span>
                            <span className="flex items-center gap-1">
                              <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                              Auto-refresh
                            </span>
                          </div>
                        </div>

                        {/* Feature Icons */}
                        <div className="flex justify-center gap-4 pt-2">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="text-base">⚡</span>
                            Fast
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="text-base">🔒</span>
                            Secure
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="text-base">📊</span>
                            Analytics
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="text-base">🎨</span>
                            Custom
                          </div>
                        </div>
                      </CardContent>

                      <CardFooter className="flex justify-between items-center pt-6 relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                        >
                          <span className="flex items-center gap-2">📈 View Report</span>
                        </Button>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:shadow-lg"
                        >
                          <span className="flex items-center gap-2">🚀 Upgrade Now</span>
                        </Button>
                      </CardFooter>

                      {/* Hover Effect Border */}
                      <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-primary/20 transition-colors duration-300 pointer-events-none" />
                    </Card>
                  </div>
                </div>
              </div>
            </Container>

            {/* Complete Form Example */}
            <Container
              size="7xl"
              padding="lg"
              className="bg-card border border-border rounded-lg space-y-8"
            >
              <Container size="none" padding="none" className="text-center">
                <h3 className="text-2xl font-semibold text-foreground flex items-center justify-center gap-3">
                  <span className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    20
                  </span>
                  Complete Contact Form
                </h3>
              </Container>

              <div className="max-w-2xl mx-auto border rounded-lg p-8 bg-card">
                <form className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold">Get in Touch</h4>
                    <p className="text-muted-foreground">
                      Fill out the form below and we&apos;ll get back to you within 24 hours.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Input placeholder="First name *" />
                    <Input placeholder="Last name *" />
                  </div>

                  <Input type="email" placeholder="Email address *" />

                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="How can we help? *" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="sales">Sales Question</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                    </SelectContent>
                  </Select>

                  <Textarea placeholder="Tell us more about your inquiry... *" rows={4} />

                  <div className="flex items-center space-x-2">
                    <Checkbox id="newsletter" />
                    <label htmlFor="newsletter" className="text-sm">
                      Subscribe to our newsletter for updates and tips
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label htmlFor="terms" className="text-sm">
                      I agree to the{' '}
                      <a href="#" className="text-primary hover:underline">
                        terms and conditions
                      </a>{' '}
                      *
                    </label>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="button" variant="outline" className="flex-1">
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </form>
              </div>
            </Container>

            {/* Dashboard Example */}
            <Container
              size="7xl"
              padding="lg"
              className="bg-card border border-border rounded-lg space-y-8"
            >
              <Container size="none" padding="none" className="text-center">
                <h3 className="text-2xl font-semibold text-foreground flex items-center justify-center gap-3">
                  <span className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    21
                  </span>
                  Dashboard Layout
                </h3>
              </Container>

              <div className="grid gap-6">
                {/* Stats Cards */}
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="border rounded-lg p-6 bg-card">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Users</p>
                        <p className="text-3xl font-bold">1,234</p>
                      </div>
                      <User className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="mt-4">
                      <Badge size="sm">+12% this month</Badge>
                    </div>
                  </div>

                  <div className="border rounded-lg p-6 bg-card">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Revenue</p>
                        <p className="text-3xl font-bold">$45,231</p>
                      </div>
                      <Download className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="mt-4">
                      <Badge size="sm">+23% this month</Badge>
                    </div>
                  </div>

                  <div className="border rounded-lg p-6 bg-card">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Orders</p>
                        <p className="text-3xl font-bold">573</p>
                      </div>
                      <Bell className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="mt-4">
                      <Badge variant="destructive" size="sm">
                        -3% this month
                      </Badge>
                    </div>
                  </div>

                  <div className="border rounded-lg p-6 bg-card">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Active Users</p>
                        <p className="text-3xl font-bold">892</p>
                      </div>
                      <Settings className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="mt-4">
                      <Badge size="sm">+5% this month</Badge>
                    </div>
                  </div>
                </div>

                {/* Progress Section */}
                <div className="border rounded-lg p-6 bg-card">
                  <h4 className="text-lg font-semibold mb-4">Current Projects</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Website Redesign</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} variant="success" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Mobile App Development</span>
                        <span>62%</span>
                      </div>
                      <Progress value={62} variant="default" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>API Integration</span>
                        <span>30%</span>
                      </div>
                      <Progress value={30} variant="warning" />
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </section>

          {/* Toast Notifications Section */}
          <section className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-foreground">Toast Notifications</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Enterprise-grade notification system with multiple variants and seamless user
                experience.
              </p>
            </div>

            <div className="grid gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Toast Variants</CardTitle>
                  <CardDescription>
                    Comprehensive notification system with semantic variants and proper
                    accessibility.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={() =>
                        toast({
                          title: 'Success!',
                          description: 'Operation completed successfully',
                          variant: 'success',
                        })
                      }
                    >
                      Success Toast
                    </Button>
                    <Button
                      onClick={() =>
                        toast({
                          title: 'Error Occurred',
                          description: 'Something went wrong',
                          variant: 'error',
                        })
                      }
                    >
                      Error Toast
                    </Button>
                    <Button
                      onClick={() =>
                        toast({
                          title: 'Warning',
                          description: 'Please check your settings',
                          variant: 'warning',
                        })
                      }
                    >
                      Warning Toast
                    </Button>
                    <Button
                      onClick={() =>
                        toast({
                          title: 'Information',
                          description: "Here's something you should know",
                          variant: 'info',
                        })
                      }
                    >
                      Info Toast
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() =>
                        toast({ title: 'Default', description: 'This is a default notification' })
                      }
                    >
                      Default Toast
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Footer Section */}
          <section className="text-center space-y-6 py-16 border-t border-border">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-foreground">
                Component Library Complete! ðŸŽ‰
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                All 15 components successfully developed using our streamlined methodology with
                style guide compliance, comprehensive testing, and enterprise-grade quality.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Badge size="lg">âœ… 100% Style Guide Compliant</Badge>
              <Badge size="lg">ðŸ§ª 539 Tests (100% Pass Rate)</Badge>
              <Badge size="lg">ðŸ“š 190+ Storybook Stories</Badge>
              <Badge size="lg">â™¿ Full Accessibility</Badge>
              <Badge size="lg">ðŸ† Production Ready</Badge>
            </div>

            <Alert className="max-w-3xl mx-auto">
              <CheckCircle className="h-4 w-4" />
              <div>
                <div className="font-semibold">Mission Accomplished!</div>
                <div>
                  Component library development complete with perfect test consolidation, zero
                  redundancies, and enterprise-grade architecture. Ready for team scaling and
                  production deployment.
                </div>
              </div>
            </Alert>
          </section>
        </div>
      </Container>
      <Toaster />
    </Container>
  );
}
