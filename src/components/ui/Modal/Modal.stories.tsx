import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  type ModalProps,
} from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile modal component with accessibility features, animations, and composable sub-components.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: { type: 'boolean' },
      description: 'Controls whether the modal is open or closed',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'],
      description: 'Size of the modal content',
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Padding inside the modal content',
    },
    animation: {
      control: { type: 'select' },
      options: ['default', 'fast', 'slow', 'none'],
      description: 'Animation speed for modal appearance',
    },
    closeOnOverlayClick: {
      control: { type: 'boolean' },
      description: 'Whether clicking the overlay closes the modal',
    },
    closeOnEscape: {
      control: { type: 'boolean' },
      description: 'Whether pressing Escape closes the modal',
    },
    preventScroll: {
      control: { type: 'boolean' },
      description: 'Whether to prevent body scroll when modal is open',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper for stories
const InteractiveModal = (args: Partial<ModalProps> & { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
      >
        Open Modal
      </button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {args.children}
      </Modal>
    </div>
  );
};

export const Default: Story = {
  render: args => <InteractiveModal {...args} />,
  args: {
    children: (
      <>
        <ModalHeader>
          <ModalTitle>Default Modal</ModalTitle>
          <ModalCloseButton onClose={() => {}} />
        </ModalHeader>
        <ModalContent>
          <ModalDescription>
            This is a default modal with standard styling and behavior.
          </ModalDescription>
          <p className="mt-4">
            You can add any content here. The modal is fully accessible and responsive by default.
          </p>
        </ModalContent>
        <ModalFooter>
          <button className="px-4 py-2 border rounded-md hover:bg-accent">Cancel</button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 ml-2">
            Confirm
          </button>
        </ModalFooter>
      </>
    ),
  },
};

export const Sizes: Story = {
  render: () => {
    const [openModal, setOpenModal] = useState<string | null>(null);

    const sizes = ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const;

    return (
      <div className="flex flex-wrap gap-4">
        {sizes.map(size => (
          <div key={size}>
            <button
              onClick={() => setOpenModal(size)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              {size.toUpperCase()} Modal
            </button>
            <Modal isOpen={openModal === size} onClose={() => setOpenModal(null)} size={size}>
              <ModalHeader>
                <ModalTitle>{size.toUpperCase()} Modal</ModalTitle>
                <ModalCloseButton onClose={() => setOpenModal(null)} />
              </ModalHeader>
              <ModalContent>
                <ModalDescription>
                  This is a {size} sized modal demonstrating different size variants.
                </ModalDescription>
                <p className="mt-4">
                  Modal size: <strong>{size}</strong>
                </p>
              </ModalContent>
            </Modal>
          </div>
        ))}
      </div>
    );
  },
};

export const Animations: Story = {
  render: () => {
    const [openModal, setOpenModal] = useState<string | null>(null);

    const animations = ['fast', 'default', 'slow', 'none'] as const;

    return (
      <div className="flex flex-wrap gap-4">
        {animations.map(animation => (
          <div key={animation}>
            <button
              onClick={() => setOpenModal(animation)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              {animation} Animation
            </button>
            <Modal
              isOpen={openModal === animation}
              onClose={() => setOpenModal(null)}
              animation={animation}
            >
              <ModalHeader>
                <ModalTitle>{animation} Animation</ModalTitle>
                <ModalCloseButton onClose={() => setOpenModal(null)} />
              </ModalHeader>
              <ModalContent>
                <ModalDescription>This modal uses {animation} animation timing.</ModalDescription>
              </ModalContent>
            </Modal>
          </div>
        ))}
      </div>
    );
  },
};

export const CustomPadding: Story = {
  render: () => {
    const [openModal, setOpenModal] = useState<string | null>(null);

    const paddings = ['none', 'sm', 'md', 'lg'] as const;

    return (
      <div className="flex flex-wrap gap-4">
        {paddings.map(padding => (
          <div key={padding}>
            <button
              onClick={() => setOpenModal(padding)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              {padding} Padding
            </button>
            <Modal
              isOpen={openModal === padding}
              onClose={() => setOpenModal(null)}
              padding={padding}
            >
              <ModalHeader>
                <ModalTitle>{padding} Padding</ModalTitle>
                <ModalCloseButton onClose={() => setOpenModal(null)} />
              </ModalHeader>
              <ModalContent>
                <ModalDescription>This modal uses {padding} padding variant.</ModalDescription>
                <div className="mt-4 p-4 bg-accent rounded">
                  Notice the different padding around this content area.
                </div>
              </ModalContent>
            </Modal>
          </div>
        ))}
      </div>
    );
  },
};

export const ConfirmationDialog: Story = {
  render: args => <InteractiveModal {...args} />,
  args: {
    size: 'sm',
    children: (
      <>
        <ModalHeader>
          <ModalTitle>Confirm Action</ModalTitle>
        </ModalHeader>
        <ModalContent>
          <ModalDescription>
            Are you sure you want to delete this item? This action cannot be undone.
          </ModalDescription>
        </ModalContent>
        <ModalFooter>
          <button className="px-4 py-2 border rounded-md hover:bg-accent">Cancel</button>
          <button className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 ml-2">
            Delete
          </button>
        </ModalFooter>
      </>
    ),
  },
};

export const FormDialog: Story = {
  render: args => <InteractiveModal {...args} />,
  args: {
    size: 'lg',
    children: (
      <>
        <ModalHeader>
          <ModalTitle>Create New Project</ModalTitle>
          <ModalCloseButton onClose={() => {}} />
        </ModalHeader>
        <ModalContent>
          <ModalDescription>Fill out the form below to create a new project.</ModalDescription>
          <form className="mt-6 space-y-4">
            <div>
              <label htmlFor="project-name" className="block text-sm font-medium mb-1">
                Project Name
              </label>
              <input
                id="project-name"
                type="text"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Enter project name"
              />
            </div>
            <div>
              <label htmlFor="project-description" className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                id="project-description"
                rows={3}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Enter project description"
              />
            </div>
            <div>
              <label htmlFor="project-type" className="block text-sm font-medium mb-1">
                Project Type
              </label>
              <select
                id="project-type"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option>Web Application</option>
                <option>Mobile App</option>
                <option>Desktop Application</option>
                <option>API Service</option>
              </select>
            </div>
          </form>
        </ModalContent>
        <ModalFooter>
          <button className="px-4 py-2 border rounded-md hover:bg-accent">Cancel</button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 ml-2">
            Create Project
          </button>
        </ModalFooter>
      </>
    ),
  },
};

export const CustomBehavior: Story = {
  render: args => <InteractiveModal {...args} />,
  args: {
    closeOnOverlayClick: false,
    closeOnEscape: false,
    children: (
      <>
        <ModalHeader>
          <ModalTitle>Custom Behavior</ModalTitle>
          <ModalCloseButton onClose={() => {}} />
        </ModalHeader>
        <ModalContent>
          <ModalDescription>
            This modal cannot be closed by clicking the overlay or pressing Escape. You must use the
            close button or footer buttons.
          </ModalDescription>
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Overlay click and Escape key are disabled for this modal.
            </p>
          </div>
        </ModalContent>
        <ModalFooter>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
            Close Modal
          </button>
        </ModalFooter>
      </>
    ),
  },
};

export const NestedContent: Story = {
  render: args => <InteractiveModal {...args} />,
  args: {
    size: '2xl',
    children: (
      <>
        <ModalHeader>
          <ModalTitle>Rich Content Modal</ModalTitle>
          <ModalCloseButton onClose={() => {}} />
        </ModalHeader>
        <ModalContent>
          <ModalDescription>
            This modal demonstrates rich content with various UI elements.
          </ModalDescription>

          <div className="mt-6 space-y-6">
            {/* Tabs example */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Project Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">General Info</h4>
                  <p className="text-sm text-muted-foreground">Project name: React Dashboard</p>
                  <p className="text-sm text-muted-foreground">Created: Jan 15, 2024</p>
                  <p className="text-sm text-muted-foreground">Status: Active</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Statistics</h4>
                  <p className="text-sm text-muted-foreground">Files: 156</p>
                  <p className="text-sm text-muted-foreground">Contributors: 8</p>
                  <p className="text-sm text-muted-foreground">Last updated: 2 hours ago</p>
                </div>
              </div>
            </div>

            {/* Progress bars */}
            <div>
              <h4 className="font-medium mb-3">Project Progress</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Frontend Development</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Backend API</span>
                    <span>60%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Testing</span>
                    <span>30%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalContent>
        <ModalFooter>
          <button className="px-4 py-2 border rounded-md hover:bg-accent">Export Report</button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 ml-2">
            Save Changes
          </button>
        </ModalFooter>
      </>
    ),
  },
};
