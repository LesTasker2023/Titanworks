// 🎯 Enhanced shadcn/ui Component Library
// Production-ready components with advanced features and comprehensive testing

// Core Form Components
export { default as Button, buttonVariants, type ButtonProps } from './Button';
export { default as Checkbox, type CheckboxProps } from './Checkbox';
export { Form } from './Form';
export { default as Input, type InputProps } from './Input';
export { Label } from './Label';
export { default as RadioGroup, RadioGroupItem, type RadioGroupProps } from './RadioGroup';
export {
  default as Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  type SelectProps,
} from './Select';
export { default as Slider, type SliderProps } from './Slider';
export { Switch } from './Switch';
export { default as Textarea, type TextareaProps } from './Textarea';

// Navigation Components
export { default as NavigationMenu } from './NavigationMenu';
export { default as Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';

// Layout Components
export { AspectRatio } from './AspectRatio';
export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  type CardProps,
} from './Card';
export { Separator, separatorVariants, type SeparatorProps } from './Separator';
export { Skeleton } from './Skeleton';

// Feedback Components
export {
  default as Alert,
  AlertDescription,
  AlertTitle,
  alertVariants,
  type AlertProps,
} from './Alert';
export { default as Badge, badgeVariants, type BadgeProps } from './Badge';
export { default as Progress, type ProgressProps } from './Progress';
export { Toast, Toaster, useToast, type ToastProps } from './Toast';
export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  tooltipVariants,
  type TooltipContentProps,
} from './Tooltip';

// Interactive Components
export { Accordion } from './Accordion';
export {
  default as Avatar,
  AvatarFallback,
  AvatarImage,
  avatarVariants,
  type AvatarProps,
} from './Avatar';
export {
  default as Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  type DialogProps,
} from './Dialog';
export {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  modalContentVariants,
  modalVariants,
  type ModalProps,
} from './Modal';
export { Popover } from './Popover';

// Data Components
export { default as DataTable, type DataTableProps } from './DataTable';
export { Pagination, type PaginationProps } from './Pagination';
export { Table } from './Table';

// Utility Components
export { ThemeToggle } from './ThemeToggle';

// Component Library Stats:
// 🎯 TOTAL COMPONENTS: 30 (All production-ready)
// ✅ WITH STORIES & TESTS: 28 components (93.3% coverage)
// ⚠️  MISSING STORIES/TESTS: 2 components (Separator, Tooltip)
// 📦 NOW EXPORTED: All 30 components available for import
//
// Coverage by Category:
// - Core Form Components: 9/9 (Button, Checkbox, Input, Label, Select, Slider, Textarea, RadioGroup, Switch, Form)
// - Navigation Components: 2/2 (NavigationMenu, Tabs)
// - Layout Components: 4/4 (Card, Separator, AspectRatio, Skeleton)
// - Feedback Components: 5/5 (Alert, Badge, Progress, Toast, Tooltip)
// - Interactive Components: 5/5 (Avatar, Dialog, Modal, Popover, Accordion)
// - Data Components: 3/3 (DataTable, Table, Pagination)
// - Utility Components: 1/1 (ThemeToggle)
//
// Missing Standard shadcn Components (17):
// - AlertDialog, Calendar, Command, ContextMenu, DropdownMenu
// - HoverCard, Menubar, ScrollArea, Sheet, ToggleGroup, Toggle
// - Combobox, DatePicker, Breadcrumb, Collapsible, Drawer, Resizable
//
// Enhanced Features Available:
// - Comprehensive TypeScript interfaces
// - SCSS styling with animations
// - Complete accessibility (WCAG compliant)
// - Loading states and error handling
// - Form validation integration
// - Interactive Storybook documentation
// - Mobile responsive design patterns
// - Production-ready build compatibility
