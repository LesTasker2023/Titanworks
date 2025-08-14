import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import Slider from './slider';

const meta: Meta<typeof Slider> = {
  title: 'UI/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    valuePosition: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    showValue: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    min: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
    step: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Core Stories
export const Default: Story = {
  args: {
    defaultValue: [50],
    min: 0,
    max: 100,
    step: 1,
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: [75],
    showValue: true,
    min: 0,
    max: 100,
    step: 1,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    defaultValue: [50],
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: [25],
    disabled: true,
    showValue: true,
  },
};

// Variant Stories
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div>
        <h3 className="text-sm font-medium mb-2">Default</h3>
        <Slider variant="default" defaultValue={[40]} showValue />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Success</h3>
        <Slider variant="success" defaultValue={[65]} showValue />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Warning</h3>
        <Slider variant="warning" defaultValue={[80]} showValue />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Danger</h3>
        <Slider variant="danger" defaultValue={[90]} showValue />
      </div>
    </div>
  ),
};

// Size Stories
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div>
        <h3 className="text-sm font-medium mb-2">Small</h3>
        <Slider size="sm" defaultValue={[30]} showValue />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Default</h3>
        <Slider size="default" defaultValue={[50]} showValue />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Large</h3>
        <Slider size="lg" defaultValue={[70]} showValue />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Extra Large</h3>
        <Slider size="xl" defaultValue={[90]} showValue />
      </div>
    </div>
  ),
};

// Orientation Stories
export const Vertical: Story = {
  render: () => (
    <div className="flex items-center space-x-8 h-60">
      <div>
        <h3 className="text-sm font-medium mb-4">Basic Vertical</h3>
        <Slider orientation="vertical" defaultValue={[40]} className="h-40" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-4">With Value (Right)</h3>
        <Slider
          orientation="vertical"
          defaultValue={[70]}
          showValue
          valuePosition="right"
          className="h-40"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-4">With Value (Left)</h3>
        <Slider
          orientation="vertical"
          defaultValue={[85]}
          showValue
          valuePosition="left"
          variant="success"
          className="h-40"
        />
      </div>
    </div>
  ),
};

// Value Position Stories
export const ValuePositions: Story = {
  render: () => (
    <div className="space-y-8 w-80">
      <div>
        <h3 className="text-sm font-medium mb-2">Value on Top</h3>
        <Slider defaultValue={[45]} showValue valuePosition="top" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Value on Bottom</h3>
        <Slider defaultValue={[65]} showValue valuePosition="bottom" variant="success" />
      </div>
    </div>
  ),
};

// Interactive Examples
export const InteractiveExample: Story = {
  render: () => {
    const [value, setValue] = useState([50]);
    const [range, setRange] = useState([20, 80]);

    return (
      <div className="space-y-8 w-96">
        <div>
          <h3 className="text-lg font-semibold mb-4">Volume Control</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Volume</span>
              <span>{value[0]}%</span>
            </div>
            <Slider
              value={value}
              onValueChange={setValue}
              max={100}
              step={1}
              variant={value[0] > 80 ? 'warning' : value[0] > 60 ? 'success' : 'default'}
              size="lg"
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Price Range</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Price Range</span>
              <span>
                ${range[0]} - ${range[1]}
              </span>
            </div>
            <Slider value={range} onValueChange={setRange} max={100} step={1} variant="success" />
          </div>
        </div>
      </div>
    );
  },
};

// Enhanced Features Stories
export const EnhancedFeatures: Story = {
  render: () => {
    const [temperature, setTemperature] = useState([22]);

    return (
      <div className="space-y-8 w-80">
        <div>
          <h3 className="text-sm font-medium mb-2">Custom Formatter</h3>
          <Slider
            value={temperature}
            onValueChange={setTemperature}
            min={10}
            max={35}
            step={0.5}
            showValue
            formatValue={val => `${val}°C`}
            variant={temperature[0] > 28 ? 'danger' : temperature[0] > 24 ? 'warning' : 'success'}
          />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Loading State</h3>
          <Slider loading />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Disabled State</h3>
          <Slider defaultValue={[75]} disabled showValue formatValue={val => `${val}% locked`} />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Custom Step & Range</h3>
          <Slider
            defaultValue={[500]}
            min={0}
            max={1000}
            step={50}
            showValue
            formatValue={val => `$${val.toLocaleString()}`}
            variant="success"
            size="lg"
          />
        </div>
      </div>
    );
  },
};

// Real-world Use Cases
export const FormIntegration: Story = {
  render: () => {
    const [brightness, setBrightness] = useState([75]);
    const [contrast, setContrast] = useState([50]);
    const [saturation, setSaturation] = useState([60]);

    return (
      <div className="p-6 border rounded-lg space-y-6 w-96">
        <h3 className="text-lg font-semibold">Display Settings</h3>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-2">Brightness: {brightness[0]}%</label>
            <Slider value={brightness} onValueChange={setBrightness} max={100} variant="default" />
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">Contrast: {contrast[0]}%</label>
            <Slider value={contrast} onValueChange={setContrast} max={100} variant="success" />
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">Saturation: {saturation[0]}%</label>
            <Slider value={saturation} onValueChange={setSaturation} max={100} variant="warning" />
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="text-xs text-muted-foreground">
            Preview values: B:{brightness[0]}% C:{contrast[0]}% S:{saturation[0]}%
          </div>
        </div>
      </div>
    );
  },
};
