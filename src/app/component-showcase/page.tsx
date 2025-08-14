'use client';

import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Info, XCircle, Mail } from 'lucide-react';

// Import all components
import Button from '@/components/ui/Button/button';
import Input from '@/components/ui/Input/input';
import Badge from '@/components/ui/Badge/badge';
import Alert from '@/components/ui/Alert/alert';
import Checkbox from '@/components/ui/Checkbox/checkbox';
import RadioGroup, { RadioGroupItem } from '@/components/ui/RadioGroup/radio-group';
import Dialog, {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog/dialog';
import Progress from '@/components/ui/Progress/progress';
import Textarea from '@/components/ui/Textarea/textarea';
import Select, {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select/select';
import Avatar from '@/components/ui/Avatar/avatar';

export default function ComponentShowcase() {
  const [progress, setProgress] = useState(33);
  const [checkboxState, setCheckboxState] = useState<boolean | 'indeterminate'>(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [selectValue, setSelectValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">TriggerKings Component Showcase</h1>
          <p className="text-lg text-muted-foreground">
            Complete shadcn/ui component library with all default examples
          </p>
        </div>

        {/* Avatar Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">
            Avatars
          </h2>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="text-center">
              <Avatar src="https://github.com/shadcn.png" alt="@shadcn" />
              <p className="text-xs mt-2">With Image</p>
            </div>
            <div className="text-center">
              <Avatar name="John Doe" />
              <p className="text-xs mt-2">Initials</p>
            </div>
            <div className="text-center">
              <Avatar fallback="JS" />
              <p className="text-xs mt-2">Custom Fallback</p>
            </div>
            <div className="text-center">
              <Avatar status="online" name="Online User" />
              <p className="text-xs mt-2">Online Status</p>
            </div>
            <div className="text-center">
              <Avatar status="offline" name="Offline User" />
              <p className="text-xs mt-2">Offline Status</p>
            </div>
            <div className="text-center">
              <Avatar loading name="Loading" />
              <p className="text-xs mt-2">Loading</p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="text-center">
              <Avatar size="sm" name="Small" />
              <p className="text-xs mt-2">Small</p>
            </div>
            <div className="text-center">
              <Avatar size="default" name="Default" />
              <p className="text-xs mt-2">Default</p>
            </div>
            <div className="text-center">
              <Avatar size="lg" name="Large" />
              <p className="text-xs mt-2">Large</p>
            </div>
            <div className="text-center">
              <Avatar size="xl" name="Extra Large" />
              <p className="text-xs mt-2">Extra Large</p>
            </div>
          </div>
        </section>

        {/* Button Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">
            Buttons
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="flex gap-4 items-center">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <Mail className="h-4 w-4" />
            </Button>
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>

        {/* Badge Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">
            Badges
          </h2>
          <div className="flex flex-wrap gap-4">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          <div className="flex flex-wrap gap-4">
            <Badge size="sm">Small</Badge>
            <Badge size="default">Default</Badge>
            <Badge size="lg">Large</Badge>
            <Badge dot>With Dot</Badge>
            <Badge removable onRemove={() => console.log('Removed')}>
              Removable
            </Badge>
          </div>
        </section>

        {/* Input Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">
            Inputs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              placeholder="Default input"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
            />
            <Input
              label="With Label"
              placeholder="Enter your name"
              helperText="This is helper text"
            />
            <Input label="Email" type="email" placeholder="john@example.com" required />
            <Input label="With Error" error="This field is required" placeholder="Error state" />
            <Input disabled placeholder="Disabled input" label="Disabled" />
            <Input loading placeholder="Loading..." label="Loading State" />
          </div>
        </section>

        {/* Textarea Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">
            Textarea
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Textarea
              placeholder="Default textarea"
              value={textareaValue}
              onChange={e => setTextareaValue(e.target.value)}
            />
            <Textarea
              label="With Label"
              placeholder="Enter your message"
              helperText="Maximum 500 characters"
              maxLength={500}
              showCount
            />
            <Textarea label="With Error" error="Message is too short" placeholder="Error state" />
            <Textarea disabled placeholder="Disabled textarea" label="Disabled" />
          </div>
        </section>

        {/* Select Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">
            Select
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <Select label="With Label" helperText="Choose your preference">
              <SelectTrigger>
                <SelectValue placeholder="Select preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
              </SelectContent>
            </Select>

            <Select label="With Error" error="Selection is required">
              <SelectTrigger>
                <SelectValue placeholder="Error state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="opt1">Option A</SelectItem>
                <SelectItem value="opt2">Option B</SelectItem>
              </SelectContent>
            </Select>

            <Select disabled label="Disabled">
              <SelectTrigger>
                <SelectValue placeholder="Disabled select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="disabled">Disabled Option</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* Checkbox Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">
            Checkboxes
          </h2>
          <div className="space-y-4">
            <Checkbox
              checked={checkboxState}
              onCheckedChange={setCheckboxState}
              label="Default checkbox"
            />
            <Checkbox label="With helper text" helperText="This is additional information" />
            <Checkbox required label="Required checkbox" />
            <Checkbox error="This field is required" label="With error state" />
            <Checkbox indeterminate label="Indeterminate state" />
            <Checkbox disabled label="Disabled checkbox" />
            <Checkbox loading label="Loading state" />
          </div>
        </section>

        {/* RadioGroup Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">
            Radio Groups
          </h2>
          <div className="space-y-6">
            <RadioGroup value={radioValue} onValueChange={setRadioValue} label="Choose an option">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option1" id="r1" />
                <label
                  htmlFor="r1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Option 1
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option2" id="r2" />
                <label
                  htmlFor="r2"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Option 2
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option3" id="r3" />
                <label
                  htmlFor="r3"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Option 3
                </label>
              </div>
            </RadioGroup>

            <RadioGroup
              label="With Error"
              error="Please select an option"
              helperText="This selection is required"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="err1" id="e1" />
                <label htmlFor="e1" className="text-sm font-medium leading-none">
                  Error Option 1
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="err2" id="e2" />
                <label htmlFor="e2" className="text-sm font-medium leading-none">
                  Error Option 2
                </label>
              </div>
            </RadioGroup>

            <RadioGroup disabled label="Disabled Radio Group">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dis1" id="d1" />
                <label
                  htmlFor="d1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Disabled 1
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dis2" id="d2" />
                <label
                  htmlFor="d2"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Disabled 2
                </label>
              </div>
            </RadioGroup>
          </div>
        </section>

        {/* Progress Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">
            Progress
          </h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Default Progress</label>
              <Progress value={progress} className="w-full" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Success Progress</label>
              <Progress value={75} variant="success" className="w-full" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Warning Progress</label>
              <Progress value={50} variant="warning" className="w-full" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Danger Progress</label>
              <Progress value={25} variant="danger" className="w-full" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Small</label>
                <Progress value={60} size="sm" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Default</label>
                <Progress value={60} size="default" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Large</label>
                <Progress value={60} size="lg" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Extra Large</label>
                <Progress value={60} size="xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Alert Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">
            Alerts
          </h2>
          <div className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <div>
                <h4 className="font-semibold">Default Alert</h4>
                <p className="text-sm">This is a default alert message.</p>
              </div>
            </Alert>

            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <div>
                <h4 className="font-semibold">Error Alert</h4>
                <p className="text-sm">Something went wrong. Please try again.</p>
              </div>
            </Alert>

            <Alert variant="warning">
              <AlertCircle className="h-4 w-4" />
              <div>
                <h4 className="font-semibold">Warning Alert</h4>
                <p className="text-sm">Please review this information carefully.</p>
              </div>
            </Alert>

            <Alert variant="success">
              <CheckCircle className="h-4 w-4" />
              <div>
                <h4 className="font-semibold">Success Alert</h4>
                <p className="text-sm">Your action was completed successfully!</p>
              </div>
            </Alert>

            <Alert variant="info">
              <Info className="h-4 w-4" />
              <div>
                <h4 className="font-semibold">Info Alert</h4>
                <p className="text-sm">Here&apos;s some helpful information for you.</p>
              </div>
            </Alert>

            <Alert dismissible onDismiss={() => console.log('Alert dismissed')}>
              <Info className="h-4 w-4" />
              <div>
                <h4 className="font-semibold">Dismissible Alert</h4>
                <p className="text-sm">This alert can be dismissed by clicking the X button.</p>
              </div>
            </Alert>
          </div>
        </section>

        {/* Dialog Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">
            Dialogs
          </h2>
          <div className="flex gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Open Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Dialog Title</DialogTitle>
                  <DialogDescription>
                    This is a description of what this dialog does. It provides context for the
                    user.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground">
                    Dialog content goes here. You can include forms, text, or any other components.
                  </p>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Small Dialog</Button>
              </DialogTrigger>
              <DialogContent size="sm">
                <DialogHeader>
                  <DialogTitle>Small Dialog</DialogTitle>
                  <DialogDescription>This is a smaller dialog size.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button>OK</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary">Large Dialog</Button>
              </DialogTrigger>
              <DialogContent size="lg">
                <DialogHeader>
                  <DialogTitle>Large Dialog</DialogTitle>
                  <DialogDescription>
                    This is a larger dialog with more space for content.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                  <Input label="Name" placeholder="Enter your name" />
                  <Input label="Email" type="email" placeholder="Enter your email" />
                  <Textarea label="Message" placeholder="Enter your message" />
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Submit</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-border">
          <p className="text-muted-foreground">
            🎨 TriggerKings Component Library - shadcn/ui styled components
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            All components properly themed with CSS custom properties
          </p>
        </footer>
      </div>
    </div>
  );
}
