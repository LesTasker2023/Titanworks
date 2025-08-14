import type { Meta, StoryObj } from '@storybook/nextjs';
import Progress from './progress';

const meta = {
  title: 'UI/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Enhanced Progress component with variants, sizes, labels, and animations.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
    },
    showLabel: {
      control: 'boolean',
    },
    labelPosition: {
      control: 'select',
      options: ['inside', 'outside'],
    },
    animated: {
      control: 'boolean',
    },
    striped: {
      control: 'boolean',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <h4 className="text-sm font-medium mb-2">Default</h4>
        <Progress value={65} variant="default" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Success</h4>
        <Progress value={85} variant="success" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Warning</h4>
        <Progress value={45} variant="warning" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Danger</h4>
        <Progress value={25} variant="danger" />
      </div>
    </div>
  ),
};

// 2. All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <h4 className="text-sm font-medium mb-2">Small</h4>
        <Progress value={75} size="sm" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Default</h4>
        <Progress value={75} size="default" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Large</h4>
        <Progress value={75} size="lg" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Extra Large</h4>
        <Progress value={75} size="xl" />
      </div>
    </div>
  ),
};

// 3. Interactive Example
export const InteractiveExample: Story = {
  args: {
    value: 60,
    variant: 'default',
    size: 'default',
    showLabel: false,
    labelPosition: 'outside',
    animated: false,
    striped: false,
  },
  render: args => (
    <div className="w-80">
      <Progress {...args} />
    </div>
  ),
};

// 4. Enhanced Features
export const EnhancedFeatures: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div>
        <h4 className="text-sm font-medium mb-2">With Outside Labels</h4>
        <div className="space-y-2">
          <Progress value={25} variant="danger" showLabel labelPosition="outside" />
          <Progress value={60} variant="warning" showLabel labelPosition="outside" />
          <Progress value={85} variant="success" showLabel labelPosition="outside" />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">With Inside Labels</h4>
        <div className="space-y-2">
          <Progress value={45} variant="default" size="lg" showLabel labelPosition="inside" />
          <Progress value={70} variant="success" size="lg" showLabel labelPosition="inside" />
          <Progress value={90} variant="warning" size="lg" showLabel labelPosition="inside" />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Striped Progress</h4>
        <div className="space-y-2">
          <Progress value={40} variant="default" striped />
          <Progress value={65} variant="success" striped />
          <Progress value={85} variant="warning" striped />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Animated Stripes</h4>
        <div className="space-y-2">
          <Progress value={50} variant="default" striped animated />
          <Progress value={75} variant="success" striped animated />
        </div>
      </div>
    </div>
  ),
};

// 5. Real-world Usage
export const ProgressStates: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div>
        <h4 className="text-sm font-medium mb-2">File Upload Progress</h4>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>document.pdf</span>
              <span>45%</span>
            </div>
            <Progress value={45} variant="default" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>image.jpg</span>
              <span>Complete</span>
            </div>
            <Progress value={100} variant="success" />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">System Resources</h4>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>CPU Usage</span>
              <span>72%</span>
            </div>
            <Progress value={72} variant="warning" size="sm" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Memory</span>
              <span>89%</span>
            </div>
            <Progress value={89} variant="danger" size="sm" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Storage</span>
              <span>34%</span>
            </div>
            <Progress value={34} variant="success" size="sm" />
          </div>
        </div>
      </div>
    </div>
  ),
};

// 6. Progress Steps
export const ProgressSteps: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div>
        <h4 className="text-sm font-medium mb-2">Multi-Step Process</h4>
        <div className="space-y-3">
          <div>
            <div className="text-sm mb-1">Step 1: Account Setup</div>
            <Progress value={100} variant="success" size="sm" />
          </div>
          <div>
            <div className="text-sm mb-1">Step 2: Profile Information</div>
            <Progress value={100} variant="success" size="sm" />
          </div>
          <div>
            <div className="text-sm mb-1">Step 3: Payment Details</div>
            <Progress value={60} variant="default" size="sm" />
          </div>
          <div>
            <div className="text-sm mb-1 text-muted-foreground">Step 4: Confirmation</div>
            <Progress value={0} variant="default" size="sm" />
          </div>
        </div>
      </div>
    </div>
  ),
};

// 7. Size and Variant Matrix
export const SizeVariantMatrix: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      {(['sm', 'default', 'lg', 'xl'] as const).map(size => (
        <div key={size}>
          <h4 className="text-sm font-medium mb-2 capitalize">{size} Size</h4>
          <div className="space-y-2">
            <Progress value={65} variant="default" size={size} />
            <Progress value={75} variant="success" size={size} />
            <Progress value={45} variant="warning" size={size} />
            <Progress value={25} variant="danger" size={size} />
          </div>
        </div>
      ))}
    </div>
  ),
};

// 8. Loading States
export const LoadingStates: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div>
        <h4 className="text-sm font-medium mb-2">Loading Animation</h4>
        <Progress value={45} variant="default" striped animated showLabel labelPosition="outside" />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Success State</h4>
        <Progress value={100} variant="success" showLabel labelPosition="outside" />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Error State</h4>
        <Progress value={30} variant="danger" showLabel labelPosition="outside" />
      </div>
    </div>
  ),
};

// 9. Accessibility States
export const AccessibilityStates: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div>
        <h4 className="text-sm font-medium mb-2">With ARIA Labels</h4>
        <Progress
          value={65}
          variant="default"
          showLabel
          labelPosition="outside"
          aria-label="Download progress"
          aria-describedby="progress-description"
        />
        <p id="progress-description" className="text-xs text-muted-foreground mt-1">
          Downloading file: 65% complete
        </p>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">High Contrast Mode</h4>
        <div className="space-y-2 p-3 border rounded" style={{ filter: 'contrast(150%)' }}>
          <Progress value={40} variant="default" />
          <Progress value={70} variant="success" />
          <Progress value={50} variant="warning" />
        </div>
      </div>
    </div>
  ),
};

// 10. Edge Cases
export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div>
        <h4 className="text-sm font-medium mb-2">Boundary Values</h4>
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">0% Progress</div>
          <Progress value={0} variant="default" showLabel labelPosition="outside" />

          <div className="text-xs text-muted-foreground">100% Progress</div>
          <Progress value={100} variant="success" showLabel labelPosition="outside" />

          <div className="text-xs text-muted-foreground">Undefined Value</div>
          <Progress variant="default" showLabel labelPosition="outside" />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Extreme Sizes</h4>
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">Very Narrow</div>
          <div className="w-20">
            <Progress value={75} variant="default" showLabel labelPosition="outside" />
          </div>

          <div className="text-xs text-muted-foreground">Very Wide</div>
          <div className="w-full max-w-2xl">
            <Progress value={45} variant="warning" showLabel labelPosition="inside" size="lg" />
          </div>
        </div>
      </div>
    </div>
  ),
};
