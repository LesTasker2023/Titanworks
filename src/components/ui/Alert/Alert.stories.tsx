import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { AlertTriangle, CheckCircle, Info as InfoIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './Alert';
import './Alert.scss';

const meta = {
  title: 'UI/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Enhanced Alert component with dismissible, auto-hide, and multiple variant support.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'warning', 'success', 'info'],
      description: 'Visual style variant of the alert',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the alert can be dismissed',
    },
    autoHide: {
      control: 'boolean',
      description: 'Whether the alert auto-hides after a delay',
    },
    autoHideDelay: {
      control: { type: 'number', min: 1000, max: 10000, step: 500 },
      description: 'Delay in milliseconds before auto-hiding',
    },
    onDismiss: {
      action: 'dismissed',
      description: 'Callback function when alert is dismissed',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>This is a default alert with basic information.</AlertDescription>
      </>
    ),
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: (
      <>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
      </>
    ),
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: (
      <>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          Your storage is almost full. Consider upgrading your plan.
        </AlertDescription>
      </>
    ),
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: (
      <>
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Your account has been created successfully!</AlertDescription>
      </>
    ),
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: (
      <>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          New features are available. Check out our latest updates.
        </AlertDescription>
      </>
    ),
  },
};

export const Dismissible: Story = {
  args: {
    variant: 'info',
    dismissible: true,
    children: (
      <>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Dismissible Alert</AlertTitle>
        <AlertDescription>You can close this alert by clicking the X button.</AlertDescription>
      </>
    ),
  },
};

export const AutoHide: Story = {
  args: {
    variant: 'success',
    autoHide: true,
    autoHideDelay: 3000,
    children: (
      <>
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Auto-Hide Alert</AlertTitle>
        <AlertDescription>This alert will automatically disappear in 3 seconds.</AlertDescription>
      </>
    ),
  },
};

export const DismissibleAndAutoHide: Story = {
  args: {
    variant: 'warning',
    dismissible: true,
    autoHide: true,
    autoHideDelay: 5000,
    children: (
      <>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Combined Features</AlertTitle>
        <AlertDescription>
          This alert can be dismissed manually or will auto-hide in 5 seconds.
        </AlertDescription>
      </>
    ),
  },
};

export const WithoutTitle: Story = {
  args: {
    variant: 'default',
    children: (
      <>
        <InfoIcon className="h-4 w-4" />
        <AlertDescription>Simple alert with just a description and icon.</AlertDescription>
      </>
    ),
  },
};

export const WithoutIcon: Story = {
  args: {
    variant: 'default',
    children: (
      <>
        <AlertTitle>No Icon Alert</AlertTitle>
        <AlertDescription>
          This alert doesn&apos;t have an icon, just text content.
        </AlertDescription>
      </>
    ),
  },
};

export const LongContent: Story = {
  args: {
    variant: 'info',
    dismissible: true,
    children: (
      <>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Detailed Information</AlertTitle>
        <AlertDescription>
          This is a longer alert with more detailed information. It demonstrates how the alert
          component handles longer content gracefully. The text should wrap appropriately and
          maintain good readability. You can include multiple sentences and even break into
          paragraphs if needed. The dismiss button should remain accessible and properly positioned
          regardless of content length.
        </AlertDescription>
      </>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert>
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>Default alert variant</AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Destructive alert variant</AlertDescription>
      </Alert>

      <Alert variant="warning">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Warning alert variant</AlertDescription>
      </Alert>

      <Alert variant="success">
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Success alert variant</AlertDescription>
      </Alert>

      <Alert variant="info">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>Info alert variant</AlertDescription>
      </Alert>
    </div>
  ),
};

export const EnhancedFeatures: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="success" dismissible>
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Dismissible Alert</AlertTitle>
        <AlertDescription>This alert can be manually dismissed.</AlertDescription>
      </Alert>

      <Alert variant="info" autoHide autoHideDelay={4000}>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Auto-Hide Alert</AlertTitle>
        <AlertDescription>This alert will disappear automatically in 4 seconds.</AlertDescription>
      </Alert>

      <Alert variant="warning" dismissible autoHide autoHideDelay={6000}>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Combined Features</AlertTitle>
        <AlertDescription>Dismissible AND auto-hide functionality together.</AlertDescription>
      </Alert>
    </div>
  ),
};
