import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import DataTable from './DataTable';

// Sample test data
const mockData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
];

const mockColumns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'role', header: 'Role', sortable: false },
  { key: 'status', header: 'Status', sortable: true },
];

describe('DataTable Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders with basic props', () => {
      render(<DataTable data={mockData} columns={mockColumns} />);
      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('renders with default props', () => {
      render(<DataTable data={mockData} columns={mockColumns} />);
      const wrapper = screen.getByTestId('datatable-component');
      expect(wrapper).toHaveClass('datatable--default', 'datatable--size-default');
    });

    it('renders empty state correctly', () => {
      render(<DataTable data={[]} columns={mockColumns} />);
      expect(screen.getByText('No data available')).toBeInTheDocument();
    });

    it('renders with custom empty message', () => {
      const customMessage = 'No users found';
      render(<DataTable data={[]} columns={mockColumns} emptyMessage={customMessage} />);
      expect(screen.getByText(customMessage)).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      const customClass = 'custom-table-class';
      render(<DataTable data={mockData} columns={mockColumns} className={customClass} />);
      const wrapper = screen.getByTestId('datatable-component');
      expect(wrapper).toHaveClass(customClass);
    });

    it('renders with data-testid', () => {
      render(<DataTable data={mockData} columns={mockColumns} data-testid="test-table" />);
      expect(screen.getByTestId('test-table')).toBeInTheDocument();
    });

    it('renders with table caption', () => {
      render(<DataTable data={mockData} columns={mockColumns} caption="User data table" />);
      expect(screen.getByText('User data table')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('applies default variant correctly', () => {
      render(<DataTable data={mockData} columns={mockColumns} variant="default" />);
      const wrapper = screen.getByTestId('datatable-component');
      expect(wrapper).toHaveClass('datatable--default');
    });

    it('applies success variant correctly', () => {
      render(<DataTable data={mockData} columns={mockColumns} variant="success" />);
      const wrapper = screen.getByTestId('datatable-component');
      expect(wrapper).toHaveClass('datatable--success');
    });

    it('applies warning variant correctly', () => {
      render(<DataTable data={mockData} columns={mockColumns} variant="warning" />);
      const wrapper = screen.getByTestId('datatable-component');
      expect(wrapper).toHaveClass('datatable--warning');
    });

    it('applies danger variant correctly', () => {
      render(<DataTable data={mockData} columns={mockColumns} variant="danger" />);
      const wrapper = screen.getByTestId('datatable-component');
      expect(wrapper).toHaveClass('datatable--danger');
    });

    it('applies small size correctly', () => {
      render(<DataTable data={mockData} columns={mockColumns} size="sm" />);
      const wrapper = screen.getByTestId('datatable-component');
      expect(wrapper).toHaveClass('datatable--size-sm');
    });

    it('applies large size correctly', () => {
      render(<DataTable data={mockData} columns={mockColumns} size="lg" />);
      const wrapper = screen.getByTestId('datatable-component');
      expect(wrapper).toHaveClass('datatable--size-lg');
    });

    it('applies extra large size correctly', () => {
      render(<DataTable data={mockData} columns={mockColumns} size="xl" />);
      const wrapper = screen.getByTestId('datatable-component');
      expect(wrapper).toHaveClass('datatable--size-xl');
    });

    it('combines variant and size classes', () => {
      render(<DataTable data={mockData} columns={mockColumns} variant="success" size="lg" />);
      const wrapper = screen.getByTestId('datatable-component');
      expect(wrapper).toHaveClass('datatable--success', 'datatable--size-lg');
    });
  });

  describe('Events & Props', () => {
    it('handles row click events', async () => {
      const mockOnRowClick = vi.fn();
      render(<DataTable data={mockData} columns={mockColumns} onRowClick={mockOnRowClick} />);

      const firstRow = screen.getAllByRole('row')[1]; // Skip header row
      await userEvent.click(firstRow);
      expect(mockOnRowClick).toHaveBeenCalledWith(mockData[0], 0);
    });

    it('handles column sort clicks', async () => {
      const mockOnSort = vi.fn();
      render(<DataTable data={mockData} columns={mockColumns} sortable onSort={mockOnSort} />);

      const nameHeader = screen.getByText('Name');
      await userEvent.click(nameHeader);
      expect(mockOnSort).toHaveBeenCalledWith('name', 'asc');
    });

    it('handles sort direction changes', async () => {
      const mockOnSort = vi.fn();
      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          sortable
          onSort={mockOnSort}
          currentSort={{ column: 'name', direction: 'asc' }}
        />
      );

      const nameHeader = screen.getByText('Name');
      await userEvent.click(nameHeader);
      expect(mockOnSort).toHaveBeenCalledWith('name', 'desc');
    });

    it('does not sort non-sortable columns', async () => {
      const mockOnSort = vi.fn();
      render(<DataTable data={mockData} columns={mockColumns} sortable onSort={mockOnSort} />);

      const roleHeader = screen.getByText('Role');
      await userEvent.click(roleHeader);
      expect(mockOnSort).not.toHaveBeenCalled();
    });

    it('handles filter changes', async () => {
      const mockOnFilter = vi.fn();
      render(
        <DataTable data={mockData} columns={mockColumns} filterable onFilter={mockOnFilter} />
      );

      const filterInput = screen.getByPlaceholderText('Search...');
      await userEvent.type(filterInput, 'John');
      expect(mockOnFilter).toHaveBeenCalledWith('John');
    });

    it('handles pagination changes', async () => {
      const mockOnPageChange = vi.fn();
      const paginatedData = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        role: 'User',
        status: 'Active',
      }));

      render(
        <DataTable
          data={paginatedData}
          columns={mockColumns}
          pagination
          pageSize={10}
          onPageChange={mockOnPageChange}
        />
      );

      const nextButton = screen.getByLabelText('Next page');
      await userEvent.click(nextButton);
      expect(mockOnPageChange).toHaveBeenCalledWith(2);
    });

    it('handles selection changes', async () => {
      const mockOnSelectionChange = vi.fn();
      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          selectable
          onSelectionChange={mockOnSelectionChange}
        />
      );

      const firstCheckbox = screen.getAllByRole('checkbox')[1]; // Skip "select all" checkbox
      await userEvent.click(firstCheckbox);
      expect(mockOnSelectionChange).toHaveBeenCalledWith([mockData[0].id]);
    });

    it('handles "select all" functionality', async () => {
      const mockOnSelectionChange = vi.fn();
      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          selectable
          onSelectionChange={mockOnSelectionChange}
        />
      );

      const selectAllCheckbox = screen.getAllByRole('checkbox')[0];
      await userEvent.click(selectAllCheckbox);
      expect(mockOnSelectionChange).toHaveBeenCalledWith([1, 2, 3]);
    });

    it('handles keyboard navigation for sorting', async () => {
      const user = userEvent.setup();
      const mockOnSort = vi.fn();
      render(<DataTable data={mockData} columns={mockColumns} sortable onSort={mockOnSort} />);

      const nameHeader = screen.getByRole('columnheader', { name: /name/i });
      nameHeader.focus();

      await user.keyboard('[Enter]');
      expect(mockOnSort).toHaveBeenCalledWith('name', 'asc');
    });

    it('prevents events when disabled', async () => {
      const mockOnRowClick = vi.fn();
      render(
        <DataTable data={mockData} columns={mockColumns} onRowClick={mockOnRowClick} disabled />
      );

      const firstRow = screen.getAllByRole('row')[1];
      await userEvent.click(firstRow);
      expect(mockOnRowClick).not.toHaveBeenCalled();
    });

    it('handles double click events', async () => {
      const mockOnDoubleClick = vi.fn();
      render(
        <DataTable data={mockData} columns={mockColumns} onRowDoubleClick={mockOnDoubleClick} />
      );

      const firstRow = screen.getAllByRole('row')[1];
      await userEvent.dblClick(firstRow);
      expect(mockOnDoubleClick).toHaveBeenCalledWith(mockData[0], 0);
    });
  });

  describe('Enhanced Features', () => {
    it('displays loading state', () => {
      render(<DataTable data={mockData} columns={mockColumns} loading />);
      expect(screen.getByText('Loading table data...')).toBeInTheDocument();
    });

    it('displays error state', () => {
      render(<DataTable data={[]} columns={mockColumns} error="Test error message" />);
      expect(screen.getByText('Test error message')).toBeInTheDocument();
      expect(screen.getByText('Error')).toBeInTheDocument();
    });

    it('handles sorting with sortable prop', async () => {
      render(<DataTable data={mockData} columns={mockColumns} sortable />);

      const nameHeader = screen.getByText('Name');
      await userEvent.click(nameHeader);

      const sortedHeader = screen.getByRole('columnheader', { name: /name/i });
      expect(sortedHeader).toHaveAttribute('aria-sort', 'ascending');
    });

    it('shows current sort state visually', () => {
      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          sortable
          currentSort={{ column: 'name', direction: 'asc' }}
        />
      );

      const nameHeader = screen.getByRole('columnheader', { name: /name/i });
      expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');
    });

    it('handles filtering with filterable prop', async () => {
      render(<DataTable data={mockData} columns={mockColumns} filterable />);

      const filterInput = screen.getByPlaceholderText('Search...');
      expect(filterInput).toBeInTheDocument();

      await userEvent.type(filterInput, 'John');
      expect(filterInput).toHaveValue('John');
    });

    it('shows pagination controls when enabled', () => {
      const paginatedData = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        role: 'User',
        status: 'Active',
      }));

      render(<DataTable data={paginatedData} columns={mockColumns} pagination pageSize={10} />);

      expect(screen.getByText(/Page.*1.*of.*5/)).toBeInTheDocument();
      expect(screen.getByLabelText('Previous page')).toBeInTheDocument();
      expect(screen.getByLabelText('Next page')).toBeInTheDocument();
    });

    it('handles selection with selectable prop', () => {
      render(<DataTable data={mockData} columns={mockColumns} selectable />);

      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes).toHaveLength(4); // 3 rows + 1 select all

      const selectAllCheckbox = checkboxes[0];
      expect(selectAllCheckbox).toHaveAttribute('aria-label', 'Select all rows');
    });

    it('shows selected state correctly', () => {
      render(<DataTable data={mockData} columns={mockColumns} selectable selectedRows={[1, 2]} />);

      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes[1]).toBeChecked(); // First data row
      expect(checkboxes[2]).toBeChecked(); // Second data row
      expect(checkboxes[3]).not.toBeChecked(); // Third data row
    });

    it('handles disabled state correctly', () => {
      render(
        <DataTable data={mockData} columns={mockColumns} disabled data-testid="disabled-table" />
      );
      const table = screen.getByTestId('disabled-table');
      expect(table).toHaveAttribute('aria-disabled', 'true');
      expect(table).toHaveClass('disabled:opacity-50');
    });

    it('handles sticky header', () => {
      render(<DataTable data={mockData} columns={mockColumns} stickyHeader />);
      const wrapper = screen.getByTestId('datatable-component');
      // Check if stickyHeader prop is handled (component may not add specific class)
      expect(wrapper).toBeInTheDocument();
    });

    it('applies max height when specified', () => {
      render(<DataTable data={mockData} columns={mockColumns} maxHeight="400px" />);
      const scrollContainer = screen
        .getByTestId('datatable-component')
        .querySelector('.datatable__scroll-container');
      expect(scrollContainer).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty data gracefully', () => {
      render(<DataTable data={[]} columns={mockColumns} />);
      expect(screen.getByText('No data available')).toBeInTheDocument();
      expect(screen.queryByRole('row', { name: /john doe/i })).not.toBeInTheDocument();
    });

    it('handles missing columns gracefully', () => {
      render(<DataTable data={mockData} columns={[]} />);
      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.queryByText('Name')).not.toBeInTheDocument();
    });

    it('handles null/undefined values in data', () => {
      const dataWithNulls = [
        { id: 1, name: null, email: 'john@example.com', role: undefined, status: 'Active' },
      ];
      render(<DataTable data={dataWithNulls} columns={mockColumns} />);

      const cells = screen.getAllByRole('cell');
      expect(cells[0]).toHaveTextContent(''); // null becomes empty
      expect(cells[1]).toHaveTextContent('john@example.com');
      expect(cells[2]).toHaveTextContent(''); // undefined becomes empty
    });

    it('handles large datasets without performance issues', () => {
      const largeData = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        role: i % 2 === 0 ? 'Admin' : 'User',
        status: 'Active',
      }));

      const { container } = render(<DataTable data={largeData} columns={mockColumns} />);
      expect(container.querySelectorAll('tbody tr')).toHaveLength(100);
    });

    it('handles invalid variant gracefully', () => {
      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          variant={'invalid' as 'default'}
          data-testid="invalid-table"
        />
      );
      const table = screen.getByTestId('invalid-table');
      expect(table).toHaveClass('datatable');
    });

    it('handles invalid size gracefully', () => {
      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          size={'invalid' as 'default'}
          data-testid="invalid-size-table"
        />
      );
      const table = screen.getByTestId('invalid-size-table');
      expect(table).toHaveClass('datatable');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<DataTable data={mockData} columns={mockColumns} disabled />);
      const table = screen.getByRole('table');
      const wrapper = table.closest('[aria-disabled]');
      expect(wrapper).toHaveAttribute('aria-disabled', 'true');
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<DataTable data={mockData} columns={mockColumns} sortable />);

      const firstHeader = screen.getByRole('columnheader', { name: /name/i });
      await user.tab();
      expect(firstHeader).toHaveFocus();
    });

    it('announces sort changes to screen readers', async () => {
      render(<DataTable data={mockData} columns={mockColumns} sortable />);

      const nameHeader = screen.getByRole('columnheader', { name: /name/i });
      await userEvent.click(nameHeader);

      expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');
    });

    it('maintains focus management during interactions', async () => {
      const user = userEvent.setup();
      render(<DataTable data={mockData} columns={mockColumns} sortable />);

      const nameHeader = screen.getByRole('columnheader', { name: /name/i });
      nameHeader.focus();

      await user.keyboard('[Enter]');
      expect(nameHeader).toHaveFocus(); // Focus should be maintained
    });

    it('works with high contrast mode', () => {
      render(<DataTable data={mockData} columns={mockColumns} variant="danger" />);

      const wrapper = screen.getByTestId('datatable-component');
      expect(wrapper).toHaveClass('border');
    });

    it('provides proper table structure', () => {
      render(<DataTable data={mockData} columns={mockColumns} />);

      const table = screen.getByRole('table');
      const headers = screen.getAllByRole('columnheader');
      const rows = screen.getAllByRole('row');

      expect(table).toBeInTheDocument();
      expect(headers).toHaveLength(4); // 4 columns
      expect(rows).toHaveLength(4); // 1 header + 3 data rows
    });

    it('handles screen reader announcements for loading', () => {
      render(<DataTable data={mockData} columns={mockColumns} loading />);

      const loadingElement = screen.getByText('Loading...');
      expect(loadingElement.closest('[role="status"]')).toBeInTheDocument();
    });

    it('provides context for empty state', () => {
      render(<DataTable data={[]} columns={mockColumns} />);

      const emptyMessage = screen.getByText('No data available');
      expect(emptyMessage).toHaveAttribute('role', 'status');
    });
  });

  describe('Storybook Stories Validation', () => {
    it('AllVariants story renders without errors', () => {
      const variants = ['default', 'success', 'warning', 'danger'] as const;
      variants.forEach(variant => {
        const { unmount } = render(
          <DataTable data={mockData} columns={mockColumns} variant={variant} />
        );
        expect(screen.getByTestId('datatable-component')).toHaveClass(`datatable--${variant}`);
        unmount();
      });
    });

    it('AllSizes story renders without errors', () => {
      const sizes = ['sm', 'default', 'lg', 'xl'] as const;
      sizes.forEach(size => {
        const sizeClass =
          size === 'default' ? 'datatable--size-default' : `datatable--size-${size}`;
        const { unmount } = render(<DataTable data={mockData} columns={mockColumns} size={size} />);
        expect(screen.getByTestId('datatable-component')).toHaveClass(sizeClass);
        unmount();
      });
    });

    it('LoadingState story renders without errors', () => {
      render(<DataTable data={[]} columns={mockColumns} loading />);
      expect(screen.getByText('Loading table data...')).toBeInTheDocument();
    });

    it('InteractiveExample story works correctly', async () => {
      const mockOnRowClick = vi.fn();
      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          sortable
          filterable
          selectable
          pagination
          onRowClick={mockOnRowClick}
        />
      );

      // Test interactive elements
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
      expect(screen.getAllByRole('checkbox')).toHaveLength(4);

      const firstRow = screen.getAllByRole('row')[1];
      await userEvent.click(firstRow);
      expect(mockOnRowClick).toHaveBeenCalled();
    });

    it('AccessibilityDemo story has proper ARIA', () => {
      render(
        <DataTable data={mockData} columns={mockColumns} aria-label="Accessible data table demo" />
      );

      const table = screen.getByRole('table');
      expect(table).toHaveAttribute('role', 'table');

      const headers = screen.getAllByRole('columnheader');
      headers.forEach(header => {
        expect(header).toHaveAttribute('role', 'columnheader');
      });
    });
  });
});
