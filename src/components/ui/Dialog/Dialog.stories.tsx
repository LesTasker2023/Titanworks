import type { Meta, StoryObj } from '@storybook/nextjs';
import Button from '../Button/button';
import Dialog, {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';

const meta: Meta<typeof Dialog> = {
  title: 'UI/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A modal dialog component built on top of Radix UI Dialog with enhanced features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic dialog example
export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a basic dialog with a title and description.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm">
            This is the main content area of the dialog. You can put any content here.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Size variants
export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            Small Dialog
          </Button>
        </DialogTrigger>
        <DialogContent size="sm">
          <DialogHeader>
            <DialogTitle>Small Dialog</DialogTitle>
            <DialogDescription>This is a small dialog.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm">Compact content area.</p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Medium Dialog</Button>
        </DialogTrigger>
        <DialogContent size="md">
          <DialogHeader>
            <DialogTitle>Medium Dialog</DialogTitle>
            <DialogDescription>This is a medium dialog (default size).</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm">Standard content area with comfortable spacing.</p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Large Dialog</Button>
        </DialogTrigger>
        <DialogContent size="lg">
          <DialogHeader>
            <DialogTitle>Large Dialog</DialogTitle>
            <DialogDescription>This is a large dialog for more content.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm">
              Large content area suitable for forms, detailed information, or complex interactions.
              This size works well when you need more space for user input or displaying data.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Extra Large</Button>
        </DialogTrigger>
        <DialogContent size="xl">
          <DialogHeader>
            <DialogTitle>Extra Large Dialog</DialogTitle>
            <DialogDescription>Maximum size dialog for complex content.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm">
              Extra large dialog suitable for complex forms, data tables, or rich content that needs
              maximum screen real estate. Perfect for admin interfaces or detailed editing forms.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  ),
};

// Confirmation dialog pattern
export const ConfirmationDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Item</Button>
      </DialogTrigger>
      <DialogContent size="sm">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this item? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Form dialog pattern
export const FormDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Account</DialogTitle>
          <DialogDescription>Enter your details to create a new account.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              placeholder="Enter your name"
              className="col-span-3 px-3 py-2 border border-input rounded-md"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="email" className="text-right text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="col-span-3 px-3 py-2 border border-input rounded-md"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="password" className="text-right text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              className="col-span-3 px-3 py-2 border border-input rounded-md"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Create Account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Alert dialog pattern
export const AlertDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Show Alert</Button>
      </DialogTrigger>
      <DialogContent size="sm">
        <DialogHeader>
          <DialogTitle>⚠️ Important Notice</DialogTitle>
          <DialogDescription>
            Your session will expire in 5 minutes due to inactivity. Please save your work to avoid
            losing any changes.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Understood</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Success dialog pattern
export const SuccessDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Complete Action</Button>
      </DialogTrigger>
      <DialogContent size="sm">
        <DialogHeader>
          <DialogTitle>✅ Success!</DialogTitle>
          <DialogDescription>
            Your account has been created successfully. You can now start using the application.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Get Started</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Complex content dialog
export const ComplexContentDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Details</Button>
      </DialogTrigger>
      <DialogContent size="lg">
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
          <DialogDescription>Complete information about this product.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Specifications</h4>
              <ul className="text-sm space-y-1">
                <li>• Weight: 2.5 kg</li>
                <li>• Dimensions: 30 x 20 x 10 cm</li>
                <li>• Material: Aluminum</li>
                <li>• Color: Space Gray</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Features</h4>
              <ul className="text-sm space-y-1">
                <li>• Waterproof design</li>
                <li>• 2-year warranty</li>
                <li>• Free shipping</li>
                <li>• 30-day returns</li>
              </ul>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Description</h4>
            <p className="text-sm text-muted-foreground">
              This premium product combines functionality with style. Built with high-quality
              materials and attention to detail, it&apos;s designed to meet the needs of demanding
              users while maintaining an elegant appearance that fits any environment.
            </p>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button>Add to Cart</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Multiple dialogs demonstration
export const MultipleDialogs: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">
        Demonstration of multiple dialog patterns working together:
      </p>
      <div className="flex flex-wrap gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Info Dialog</Button>
          </DialogTrigger>
          <DialogContent size="sm">
            <DialogHeader>
              <DialogTitle>ℹ️ Information</DialogTitle>
              <DialogDescription>This is an informational dialog.</DialogDescription>
            </DialogHeader>
            <div className="py-2">
              <p className="text-sm">Here&apos;s some helpful information for you.</p>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary">Settings</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>⚙️ Settings</DialogTitle>
              <DialogDescription>Configure your preferences.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Enable notifications</label>
                <input type="checkbox" className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Dark mode</label>
                <input type="checkbox" className="rounded" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Contact Us</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>📧 Contact Us</DialogTitle>
              <DialogDescription>
                Send us a message and we&apos;ll get back to you.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  id="subject"
                  placeholder="How can we help?"
                  className="w-full px-3 py-2 border border-input rounded-md"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell us more about your question or concern..."
                  className="w-full px-3 py-2 border border-input rounded-md resize-none"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button>Send Message</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  ),
};

// Accessibility showcase
export const AccessibilityShowcase: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">
        Dialog with enhanced accessibility features:
      </p>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Accessible Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>♿ Accessibility Features</DialogTitle>
            <DialogDescription>
              This dialog demonstrates proper accessibility implementation.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <div className="p-3 bg-muted rounded-md">
              <h4 className="font-medium mb-2">Keyboard Navigation</h4>
              <ul className="text-sm space-y-1">
                <li>
                  • <kbd>Tab</kbd> - Navigate forward
                </li>
                <li>
                  • <kbd>Shift + Tab</kbd> - Navigate backward
                </li>
                <li>
                  • <kbd>Escape</kbd> - Close dialog
                </li>
                <li>
                  • <kbd>Enter/Space</kbd> - Activate buttons
                </li>
              </ul>
            </div>
            <div className="p-3 bg-muted rounded-md">
              <h4 className="font-medium mb-2">Screen Reader Support</h4>
              <ul className="text-sm space-y-1">
                <li>• Proper ARIA labels and descriptions</li>
                <li>• Focus management and trapping</li>
                <li>• Semantic HTML structure</li>
                <li>• Live region announcements</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <Button>Learn More</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  ),
};
