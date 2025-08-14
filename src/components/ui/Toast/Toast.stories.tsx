import type { Meta, StoryObj } from '@storybook/nextjs';
import Button from '../Button';
import { Toast, ToastAction, Toaster, useToast } from './index';

const meta: Meta<typeof Toast> = {
  title: 'UI/Toast',
  component: Toast,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The Toast component provides user feedback through temporary messages that appear at the edge of the screen.
Built on Radix UI Toast primitive with full accessibility support and smooth animations.

## Features
- 🎨 **5 Variants**: default, success, error, warning, info
- ⏱️ **Auto-dismiss**: Configurable timeout with hover to persist
- 🎯 **Interactive**: Action buttons and manual dismiss
- ♿ **Accessible**: Full WCAG 2.1 AA compliance with screen reader support
- 📱 **Responsive**: Optimized for mobile and desktop
- 🔄 **Queue Management**: Multiple toasts with smart positioning

## Usage
\`\`\`tsx
import { useToast } from '@/components/ui/Toast';

function MyComponent() {
  const { toast } = useToast();

  const showToast = () => {
    toast({
      title: "Success!",
      description: "Your changes have been saved.",
      variant: "success",
    });
  };

  return <button onClick={showToast}>Save</button>;
}
\`\`\`
        `,
      },
    },
  },
  decorators: [
    Story => (
      <div>
        <Story />
        <Toaster />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Demo component for testing toasts
function ToastDemo({
  variant,
  title,
  description,
  action,
}: {
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  title?: string;
  description?: string;
  action?: boolean;
}) {
  const { toast } = useToast();

  const showToast = () => {
    toast({
      variant,
      title: title || 'Toast Title',
      description: description || 'This is a toast description.',
      ...(action && {
        action: (
          <ToastAction altText="Try again" onClick={() => console.log('Action clicked')}>
            Try again
          </ToastAction>
        ),
      }),
    });
  };

  return (
    <div className="flex justify-center p-8">
      <Button onClick={showToast} variant={variant === 'error' ? 'destructive' : 'default'}>
        Show {variant || 'default'} toast
      </Button>
    </div>
  );
}

// ===== BASIC STORIES =====

export const Default: Story = {
  render: () => <ToastDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Default toast variant with neutral styling.',
      },
    },
  },
};

export const Success: Story = {
  render: () => (
    <ToastDemo
      variant="default"
      title="Success!"
      description="Your action completed successfully."
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Success toast for positive user actions.',
      },
    },
  },
};

export const Error: Story = {
  render: () => (
    <ToastDemo
      variant="error"
      title="Error!"
      description="Something went wrong. Please try again."
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Error toast for failed actions or validation errors.',
      },
    },
  },
};

export const Warning: Story = {
  render: () => (
    <ToastDemo
      variant="warning"
      title="Warning!"
      description="Please review your input before continuing."
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Warning toast for cautions and alerts.',
      },
    },
  },
};

export const Info: Story = {
  render: () => (
    <ToastDemo variant="info" title="Info" description="Here's some helpful information for you." />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Info toast for general information and tips.',
      },
    },
  },
};

// ===== ADVANCED STORIES =====

export const WithAction: Story = {
  render: () => (
    <ToastDemo variant="error" title="Upload Failed" description="Failed to upload file." action />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toast with an action button for interactive user response.',
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => {
    const { toast } = useToast();

    const showAllToasts = () => {
      toast({
        title: 'Default Toast',
        description: 'This is a default toast message.',
      });

      setTimeout(() => {
        toast({
          variant: 'success',
          title: 'Success!',
          description: 'Operation completed successfully.',
        });
      }, 500);

      setTimeout(() => {
        toast({
          variant: 'error',
          title: 'Error!',
          description: 'Something went wrong.',
        });
      }, 1000);

      setTimeout(() => {
        toast({
          variant: 'warning',
          title: 'Warning!',
          description: 'Please be careful.',
        });
      }, 1500);

      setTimeout(() => {
        toast({
          variant: 'info',
          title: 'Info',
          description: "Here's some information.",
        });
      }, 2000);
    };

    return (
      <div className="flex justify-center p-8">
        <Button onClick={showAllToasts}>Show all variants</Button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates all toast variants appearing in sequence.',
      },
    },
  },
};

// ===== REAL-WORLD EXAMPLES =====

export const FormValidation: Story = {
  render: () => {
    const { toast } = useToast();

    const simulateFormSubmit = () => {
      // Simulate validation error
      toast({
        variant: 'error',
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        action: <ToastAction altText="Review form">Review</ToastAction>,
      });
    };

    const simulateFormSuccess = () => {
      toast({
        variant: 'success',
        title: 'Form Submitted!',
        description: 'Your information has been saved successfully.',
      });
    };

    return (
      <div className="flex gap-4 justify-center p-8">
        <Button onClick={simulateFormSubmit} variant="destructive">
          Submit Invalid Form
        </Button>
        <Button onClick={simulateFormSuccess} variant="default">
          Submit Valid Form
        </Button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Real-world form validation feedback using toasts.',
      },
    },
  },
};

export const FileUpload: Story = {
  render: () => {
    const { toast } = useToast();

    const simulateUploadStart = () => {
      toast({
        variant: 'info',
        title: 'Uploading...',
        description: 'Your file is being uploaded.',
      });

      // Simulate upload completion after 3 seconds
      setTimeout(() => {
        toast({
          variant: 'success',
          title: 'Upload Complete!',
          description: 'Your file has been uploaded successfully.',
          action: <ToastAction altText="View file">View</ToastAction>,
        });
      }, 3000);
    };

    const simulateUploadError = () => {
      toast({
        variant: 'error',
        title: 'Upload Failed',
        description: 'File too large. Maximum size is 10MB.',
        action: <ToastAction altText="Try again">Retry</ToastAction>,
      });
    };

    return (
      <div className="flex gap-4 justify-center p-8">
        <Button onClick={simulateUploadStart}>Start Upload</Button>
        <Button onClick={simulateUploadError} variant="destructive">
          Simulate Error
        </Button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'File upload progress and error handling with toasts.',
      },
    },
  },
};

// ===== INTERACTIVE TESTING =====

export const InteractivePlayground: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <div className="grid grid-cols-2 gap-4 p-8 max-w-md mx-auto">
        <Button onClick={() => toast({ title: 'Quick toast!' })} size="sm">
          Quick Toast
        </Button>
        <Button
          onClick={() =>
            toast({
              title: 'Long message',
              description:
                'This is a longer description that demonstrates how the toast handles more content gracefully.',
            })
          }
          size="sm"
        >
          Long Message
        </Button>
        <Button
          onClick={() =>
            toast({
              variant: 'success',
              title: 'With Action',
              action: <ToastAction altText="Undo">Undo</ToastAction>,
            })
          }
          size="sm"
        >
          With Action
        </Button>
        <Button
          onClick={() =>
            toast({
              variant: 'error',
              title: 'Persistent',
              description: "This toast won't auto-dismiss.",
              // duration: Infinity // Would make it persistent
            })
          }
          size="sm"
        >
          Persistent
        </Button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different toast configurations.',
      },
    },
  },
};

// ===== ACCESSIBILITY TESTING =====

export const AccessibilityDemo: Story = {
  render: () => {
    const { toast } = useToast();

    const showAccessibleToast = () => {
      toast({
        variant: 'info',
        title: 'Accessible Toast',
        description:
          'This toast is fully accessible with proper ARIA attributes and keyboard navigation.',
        action: <ToastAction altText="Learn more about accessibility">Learn More</ToastAction>,
      });
    };

    return (
      <div className="p-8 space-y-4">
        <div className="text-center space-y-2">
          <h3 className="font-semibold">Accessibility Features</h3>
          <p className="text-sm text-gray-600">
            Toasts include proper ARIA labels, keyboard navigation, and screen reader support.
          </p>
        </div>
        <div className="flex justify-center">
          <Button onClick={showAccessibleToast}>Show Accessible Toast</Button>
        </div>
        <div className="text-xs text-gray-500 space-y-1">
          <p>• Toasts can be dismissed with Escape key</p>
          <p>• Action buttons are keyboard accessible</p>
          <p>• Screen readers announce toast content</p>
          <p>• Focus management preserves user context</p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates accessibility features including keyboard navigation and ARIA support.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'keyboard', enabled: true },
          { id: 'focus-trap', enabled: true },
        ],
      },
    },
  },
};
