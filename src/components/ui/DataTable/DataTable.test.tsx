import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DataTable } from './DataTable';

const mockData = [
  { id: 1, name: 'John', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob', email: 'bob@example.com', role: 'User' },
];

const mockColumns = [
  { key: 'name' as const, header: 'Name', sortable: true },
  { key: 'email' as const, header: 'Email', sortable: true },
  { key: 'role' as const, header: 'Role', sortable: false },
];

describe('DataTable', () => {
  describe('Basic Functionality', () => {
    it('renders with data', () => {
      render(<DataTable data={mockData} columns={mockColumns} data-testid="datatable" />);
      expect(screen.getByTestId('datatable')).toBeInTheDocument();
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    });

    it('renders empty state when no data', () => {
      render(<DataTable data={[]} columns={mockColumns} emptyMessage="No data found" />);
      expect(screen.getByText('No data found')).toBeInTheDocument();
    });

    it('shows loading state', () => {
      render(<DataTable data={mockData} columns={mockColumns} loading />);
      // Look for the loading state by text content
      expect(screen.getByText('Loading table data...')).toBeInTheDocument();
      // Or by the spinner element
      const spinner = document.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('handles disabled state', () => {
      render(<DataTable data={mockData} columns={mockColumns} disabled />);
      const container = screen.getByTestId('datatable-component');
      expect(container).toHaveClass('disabled:opacity-50', 'disabled:pointer-events-none');
    });
  });

  describe('Variants', () => {
    it('renders default variant correctly', () => {
      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          variant="default"
          data-testid="table-container"
        />
      );
      const container = screen.getByTestId('table-container');
      expect(container).toHaveClass('datatable--default');
      expect(container).toHaveClass('border-border');
    });

    it('renders success variant correctly', () => {
      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          variant="success"
          data-testid="table-container"
        />
      );
      const container = screen.getByTestId('table-container');
      expect(container).toHaveClass('datatable--success');
      expect(container).toHaveClass('border-success/20');
      expect(container).toHaveClass('bg-success/5');
    });

    it('renders warning variant correctly', () => {
      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          variant="warning"
          data-testid="table-container"
        />
      );
      const container = screen.getByTestId('table-container');
      expect(container).toHaveClass('datatable--warning');
      expect(container).toHaveClass('border-warning/20');
      expect(container).toHaveClass('bg-warning/5');
    });

    it('renders danger variant correctly', () => {
      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          variant="danger"
          data-testid="table-container"
        />
      );
      const container = screen.getByTestId('table-container');
      expect(container).toHaveClass('datatable--danger');
      expect(container).toHaveClass('border-destructive/20');
      expect(container).toHaveClass('bg-destructive/5');
    });
  });

  describe('Sizes', () => {
    it('renders small size correctly', () => {
      render(
        <DataTable data={mockData} columns={mockColumns} size="sm" data-testid="table-container" />
      );
      const container = screen.getByTestId('table-container');
      expect(container).toHaveClass('datatable--size-sm');
      expect(container).toHaveClass('text-xs');
    });

    it('renders default size correctly', () => {
      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          size="default"
          data-testid="table-container"
        />
      );
      const container = screen.getByTestId('table-container');
      expect(container).toHaveClass('datatable--size-default');
      expect(container).toHaveClass('text-sm');
    });

    it('renders large size correctly', () => {
      render(
        <DataTable data={mockData} columns={mockColumns} size="lg" data-testid="table-container" />
      );
      const container = screen.getByTestId('table-container');
      expect(container).toHaveClass('datatable--size-lg');
      expect(container).toHaveClass('text-base');
    });

    it('renders extra large size correctly', () => {
      render(
        <DataTable data={mockData} columns={mockColumns} size="xl" data-testid="table-container" />
      );
      const container = screen.getByTestId('table-container');
      expect(container).toHaveClass('datatable--size-xl');
      expect(container).toHaveClass('text-lg');
    });
  });

  describe('Interactive Features', () => {
    it('handles sorting when sortable', () => {
      const onSort = vi.fn();
      render(<DataTable data={mockData} columns={mockColumns} sortable onSort={onSort} />);

      const nameHeader = screen.getByText('Name');
      fireEvent.click(nameHeader);

      expect(onSort).toHaveBeenCalledWith('name', 'asc');
    });

    it('handles row selection when selectable', () => {
      const onSelectionChange = vi.fn();
      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          selectable
          onSelectionChange={onSelectionChange}
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[1]); // First data row checkbox

      expect(onSelectionChange).toHaveBeenCalled();
    });

    it('handles filtering when filterable', () => {
      const onFilter = vi.fn();
      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          filterable
          onFilter={onFilter}
          searchPlaceholder="Search users..."
        />
      );

      const searchInput = screen.getByPlaceholderText('Search users...');
      fireEvent.change(searchInput, { target: { value: 'John' } });

      expect(onFilter).toHaveBeenCalledWith('John');
    });

    it('handles pagination when enabled', () => {
      const onPageChange = vi.fn();
      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          pagination
          currentPage={1}
          totalPages={3}
          onPageChange={onPageChange}
        />
      );

      const nextButton = screen.getByText('Next');
      fireEvent.click(nextButton);

      expect(onPageChange).toHaveBeenCalledWith(2);
    });

    it('handles row clicks when callback provided', () => {
      const onRowClick = vi.fn();
      render(<DataTable data={mockData} columns={mockColumns} onRowClick={onRowClick} />);

      const firstRow = screen.getByText('John').closest('tr');
      if (firstRow) fireEvent.click(firstRow);

      expect(onRowClick).toHaveBeenCalledWith(mockData[0], 0);
    });
  });

  describe('Accessibility & Display', () => {
    it('renders with caption when provided', () => {
      render(<DataTable data={mockData} columns={mockColumns} caption="User management table" />);

      expect(screen.getByText('User management table')).toBeInTheDocument();
    });

    it('applies sticky header when enabled', () => {
      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          data-testid="table-container"
          stickyHeader
        />
      );

      const thead = screen.getByRole('table').querySelector('thead');
      expect(thead).toHaveClass('sticky', 'top-0', 'bg-background', 'z-10');
    });

    it('applies custom max height', () => {
      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          stickyHeader
          maxHeight="400px"
          data-testid="table-container"
        />
      );

      const scrollContainer = screen
        .getByTestId('table-container')
        .querySelector('.datatable__scroll-container');
      expect(scrollContainer).toHaveStyle('max-height: 400px');
    });

    it('shows error message when provided', () => {
      render(<DataTable data={mockData} columns={mockColumns} error="Failed to load data" />);

      expect(screen.getByText('Failed to load data')).toBeInTheDocument();
    });
  });

  describe('Snapshots', () => {
    it('matches default data table snapshot', () => {
      const { container } = render(
        <DataTable data={mockData} columns={mockColumns} data-testid="default-table" />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches all variants snapshot', () => {
      const { container } = render(
        <div>
          <DataTable
            data={mockData}
            columns={mockColumns}
            variant="default"
            data-testid="variant-default"
          />
          <DataTable
            data={mockData}
            columns={mockColumns}
            variant="success"
            data-testid="variant-success"
          />
          <DataTable
            data={mockData}
            columns={mockColumns}
            variant="warning"
            data-testid="variant-warning"
          />
          <DataTable
            data={mockData}
            columns={mockColumns}
            variant="danger"
            data-testid="variant-danger"
          />
        </div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches all sizes snapshot', () => {
      const { container } = render(
        <div>
          <DataTable data={mockData} columns={mockColumns} size="sm" data-testid="size-small" />
          <DataTable
            data={mockData}
            columns={mockColumns}
            size="default"
            data-testid="size-default"
          />
          <DataTable data={mockData} columns={mockColumns} size="lg" data-testid="size-large" />
          <DataTable
            data={mockData}
            columns={mockColumns}
            size="xl"
            data-testid="size-extra-large"
          />
        </div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches empty state snapshot', () => {
      const { container } = render(
        <DataTable data={[]} columns={mockColumns} emptyMessage="No data available" />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches loading state snapshot', () => {
      const { container } = render(
        <DataTable data={mockData} columns={mockColumns} loading={true} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches disabled state snapshot', () => {
      const { container } = render(
        <DataTable data={mockData} columns={mockColumns} disabled={true} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches error state snapshot', () => {
      const { container } = render(
        <DataTable data={mockData} columns={mockColumns} error="Something went wrong" />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
