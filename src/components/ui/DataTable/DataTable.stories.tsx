import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';
import DataTable from './DataTable';

// Sample data for stories
const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Moderator', status: 'Active' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'Pending' },
];

const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'role', header: 'Role', sortable: true },
  { key: 'status', header: 'Status', sortable: true },
];

const meta: Meta<typeof DataTable> = {
  title: 'UI/DataTable',
  component: DataTable,
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
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Required story types per style guide
export const Default: Story = {
  args: {
    data: sampleData,
    columns: columns,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8 w-full">
      <div>
        <h3 className="font-medium mb-2">Default Variant</h3>
        <DataTable variant="default" data={sampleData.slice(0, 3)} columns={columns} />
      </div>
      <div>
        <h3 className="font-medium mb-2">Success Variant</h3>
        <DataTable variant="success" data={sampleData.slice(0, 3)} columns={columns} />
      </div>
      <div>
        <h3 className="font-medium mb-2">Warning Variant</h3>
        <DataTable variant="warning" data={sampleData.slice(0, 3)} columns={columns} />
      </div>
      <div>
        <h3 className="font-medium mb-2">Danger Variant</h3>
        <DataTable variant="danger" data={sampleData.slice(0, 3)} columns={columns} />
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-8 w-full">
      <div>
        <h3 className="font-medium mb-2">Small Size</h3>
        <DataTable size="sm" data={sampleData.slice(0, 3)} columns={columns} />
      </div>
      <div>
        <h3 className="font-medium mb-2">Default Size</h3>
        <DataTable size="default" data={sampleData.slice(0, 3)} columns={columns} />
      </div>
      <div>
        <h3 className="font-medium mb-2">Large Size</h3>
        <DataTable size="lg" data={sampleData.slice(0, 3)} columns={columns} />
      </div>
      <div>
        <h3 className="font-medium mb-2">Extra Large Size</h3>
        <DataTable size="xl" data={sampleData.slice(0, 3)} columns={columns} />
      </div>
    </div>
  ),
};

export const LoadingState: Story = {
  args: {
    data: sampleData,
    columns: columns,
    loading: true,
  },
};

export const DisabledState: Story = {
  args: {
    data: sampleData,
    columns: columns,
    disabled: true,
  },
};

export const ErrorState: Story = {
  args: {
    data: sampleData,
    columns: columns,
    error: 'Failed to load data from server',
  },
};

export const InteractiveExample: Story = {
  render: () => {
    const [sortColumn, setSortColumn] = React.useState<string>('');
    const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');

    return (
      <div className="w-full">
        <div className="mb-4 p-4 border rounded-lg bg-muted/30">
          <h3 className="font-medium mb-2">Interactive DataTable</h3>
          <p className="text-sm text-muted-foreground">
            Click column headers to sort. Current sort: {sortColumn || 'None'} ({sortDirection})
          </p>
        </div>
        <DataTable
          data={sampleData}
          columns={columns}
          sortable
          onSort={(column: string, direction: 'asc' | 'desc') => {
            setSortColumn(column);
            setSortDirection(direction);
          }}
          currentSort={{ column: sortColumn, direction: sortDirection }}
        />
      </div>
    );
  },
};

export const AccessibilityDemo: Story = {
  render: () => (
    <div className="w-full space-y-4">
      <div className="p-4 border rounded-lg bg-blue-50/50 dark:bg-blue-950/20">
        <h3 className="font-medium mb-2">♿ Accessibility Features</h3>
        <ul className="text-sm space-y-1 text-muted-foreground">
          <li>• Keyboard navigation with Tab/Arrow keys</li>
          <li>• Screen reader announcements for sorting</li>
          <li>• ARIA table structure with proper roles</li>
          <li>• Focus management and high contrast support</li>
        </ul>
      </div>
      <DataTable
        data={sampleData}
        columns={columns}
        sortable
        aria-label="User management table"
        caption="List of users with their roles and status"
      />
    </div>
  ),
};

// Additional enterprise stories
export const WithPagination: Story = {
  args: {
    data: Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: ['Admin', 'User', 'Moderator'][i % 3],
      status: ['Active', 'Inactive', 'Pending'][i % 3],
    })),
    columns: columns,
    pagination: true,
    pageSize: 10,
  },
};

export const WithSelection: Story = {
  args: {
    data: sampleData,
    columns: columns,
    selectable: true,
    onSelectionChange: (selectedIds: (number | string)[]) => {
      // In real app, handle selection change
      // setSelectedRows(selectedIds);
      if (process.env.NODE_ENV === 'development') {
        console.log('Selected rows:', selectedIds);
      }
    },
  },
};

export const WithFiltering: Story = {
  args: {
    data: sampleData,
    columns: columns,
    filterable: true,
    searchPlaceholder: 'Search users...',
  },
};
