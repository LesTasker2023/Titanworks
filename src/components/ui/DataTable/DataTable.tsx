import { cn } from '@/lib/utils';
import { stripTransientProps } from '@/utils/stripTransientProps';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronDown, ChevronUp, Loader2, Search } from 'lucide-react';
import React from 'react';

// Style guide compliant CVA system
const dataTableVariants = cva(
  'datatable w-full relative', // Base class from component-system.css
  {
    variants: {
      variant: {
        default: 'datatable--default border border-border',
        success: 'datatable--success border border-success/20 bg-success/5',
        warning: 'datatable--warning border border-warning/20 bg-warning/5',
        danger: 'datatable--danger border border-destructive/20 bg-destructive/5',
      },
      size: {
        sm: 'datatable--size-sm text-xs',
        default: 'datatable--size-default text-sm',
        lg: 'datatable--size-lg text-base',
        xl: 'datatable--size-xl text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// Column definition interface
export interface DataTableColumn<T = Record<string, unknown>> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  width?: string;
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
  className?: string;
}

// Sort configuration
export interface SortConfig {
  column: string;
  direction: 'asc' | 'desc';
}

// Style guide compliant interface
export interface DataTableProps<T = Record<string, unknown>>
  extends React.ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof dataTableVariants> {
  // Data props
  data: T[];
  columns: DataTableColumn<T>[];

  // Style guide required props
  loading?: boolean; // Universal enhancement (REQUIRED)
  disabled?: boolean; // Universal enhancement (REQUIRED)
  error?: string; // Form components

  // Enhanced features
  sortable?: boolean;
  currentSort?: SortConfig;
  onSort?: (column: string, direction: 'asc' | 'desc') => void;

  selectable?: boolean;
  selectedRows?: number[] | string[];
  onSelectionChange?: (selectedIds: (number | string)[]) => void;

  filterable?: boolean;
  searchQuery?: string;
  onFilter?: (query: string) => void;
  searchPlaceholder?: string;

  pagination?: boolean;
  currentPage?: number;
  pageSize?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;

  // Row interactions
  onRowClick?: (row: T, index: number) => void;
  onRowDoubleClick?: (row: T, index: number) => void;

  // Accessibility & Display
  caption?: string;
  stickyHeader?: boolean;
  maxHeight?: string;
  emptyMessage?: string;
  children?: React.ReactNode;
}

const DataTable = React.forwardRef<HTMLDivElement, DataTableProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      loading = false,
      disabled = false,
      error,
      data = [],
      columns = [],
      sortable = false,
      currentSort,
      onSort,
      selectable = false,
      selectedRows = [],
      onSelectionChange,
      filterable = false,
      searchQuery = '',
      onFilter,
      searchPlaceholder = 'Search...',
      pagination = false,
      currentPage = 1,
      pageSize = 10,
      totalPages,
      onPageChange,
      onRowClick,
      onRowDoubleClick,
      caption,
      stickyHeader = false,
      maxHeight = '500px',
      emptyMessage = 'No data available',
      children,
      ...props
    },
    ref
  ) => {
    // Internal state management (MUST be before early returns)
    const [internalSearchQuery, setInternalSearchQuery] = React.useState(searchQuery);
    const [internalSelectedRows, setInternalSelectedRows] =
      React.useState<(number | string)[]>(selectedRows);
    const [internalSort, setInternalSort] = React.useState<SortConfig | undefined>(currentSort);

    // Data processing (MUST be before early returns)
    const filteredData = React.useMemo(() => {
      if (!filterable || !internalSearchQuery.trim()) return data;

      return data.filter(row =>
        columns.some(column => {
          const value = row[column.key];
          return String(value).toLowerCase().includes(internalSearchQuery.toLowerCase());
        })
      );
    }, [data, columns, internalSearchQuery, filterable]);

    const sortedData = React.useMemo(() => {
      if (!sortable || !internalSort) return filteredData;

      return [...filteredData].sort((a, b) => {
        const aValue = a[internalSort.column as keyof typeof a];
        const bValue = b[internalSort.column as keyof typeof b];

        // Safe comparison for unknown types
        const aStr = String(aValue || '');
        const bStr = String(bValue || '');

        if (aStr < bStr) return internalSort.direction === 'asc' ? -1 : 1;
        if (aStr > bStr) return internalSort.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }, [filteredData, internalSort, sortable]);

    const paginatedData = React.useMemo(() => {
      if (!pagination) return sortedData;

      const startIndex = (currentPage - 1) * pageSize;
      return sortedData.slice(startIndex, startIndex + pageSize);
    }, [sortedData, pagination, currentPage, pageSize]);

    // Event handlers (MUST be before early returns)
    const handleSort = React.useCallback(
      (column: string) => {
        if (!sortable || disabled) return;

        const newDirection: 'asc' | 'desc' =
          internalSort?.column === column && internalSort?.direction === 'asc' ? 'desc' : 'asc';
        const newSort = { column, direction: newDirection };

        setInternalSort(newSort);
        onSort?.(column, newDirection);
      },
      [sortable, disabled, internalSort, onSort]
    );

    const handleSelectAll = React.useCallback(() => {
      if (!selectable || disabled) return;

      const allIds = paginatedData.map(
        (row, index) => ((row as Record<string, unknown>).id as number | string) || index
      );
      const allSelected = allIds.every(id => internalSelectedRows.includes(id));

      const newSelection = allSelected ? [] : allIds;
      setInternalSelectedRows(newSelection);
      onSelectionChange?.(newSelection);
    }, [selectable, disabled, paginatedData, internalSelectedRows, onSelectionChange]);

    const handleRowSelect = React.useCallback(
      (rowId: number | string) => {
        if (!selectable || disabled) return;

        const newSelection = internalSelectedRows.includes(rowId)
          ? internalSelectedRows.filter(id => id !== rowId)
          : [...internalSelectedRows, rowId];

        setInternalSelectedRows(newSelection);
        onSelectionChange?.(newSelection);
      },
      [selectable, disabled, internalSelectedRows, onSelectionChange]
    );

    const handleSearch = React.useCallback(
      (query: string) => {
        setInternalSearchQuery(query);
        onFilter?.(query);
      },
      [onFilter]
    );

    // Calculate pagination info
    const calculatedTotalPages = totalPages || Math.ceil(sortedData.length / pageSize);
    const hasNextPage = currentPage < calculatedTotalPages;
    const hasPrevPage = currentPage > 1;

    // Style guide REQUIRED: Loading state handling (AFTER hooks)
    if (loading) {
      return (
        <div className="datatable state-loading flex items-center justify-center p-8 min-h-[200px]">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin spinner" />
            <span className="text-muted-foreground">Loading table data...</span>
            <span className="sr-only" role="status">
              Loading...
            </span>
          </div>
        </div>
      );
    }

    // Error state (AFTER hooks)
    if (error) {
      return (
        <div className={cn(dataTableVariants({ variant, size }), 'state-error', className)}>
          <div className="p-4 text-center">
            <div className="text-destructive font-medium mb-2">Error</div>
            <div className="error-message text-sm text-muted-foreground">{error}</div>
          </div>
        </div>
      );
    }

    // Base element with style guide classes
    return (
      <div
        ref={ref}
        className={cn(
          dataTableVariants({ variant, size }),
          disabled && 'disabled:opacity-50 disabled:pointer-events-none',
          className
        )}
        aria-disabled={disabled}
        data-loading={loading}
        data-error={!!error}
        data-testid="datatable-component"
        {...stripTransientProps(props)}
      >
        {/* Filter bar */}
        {filterable && (
          <div className="datatable__filter-bar p-4 border-b bg-muted/30">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={internalSearchQuery}
                onChange={e => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                disabled={disabled}
              />
            </div>
          </div>
        )}

        {/* Table container */}
        <div
          className="datatable__scroll-container overflow-auto"
          style={{ maxHeight: stickyHeader ? maxHeight : undefined }}
        >
          <table
            className="w-full caption-bottom text-sm"
            role="table"
            aria-label={props['aria-label']}
          >
            {caption && <caption className="mt-4 text-sm text-muted-foreground">{caption}</caption>}

            <thead
              className={cn('[&_tr]:border-b', stickyHeader && 'sticky top-0 bg-background z-10')}
            >
              <tr>
                {selectable && (
                  <th className="h-10 px-2 w-12">
                    <input
                      type="checkbox"
                      checked={
                        paginatedData.length > 0 &&
                        paginatedData.every((row, index) =>
                          internalSelectedRows.includes(
                            ((row as Record<string, unknown>).id as number | string) || index
                          )
                        )
                      }
                      onChange={handleSelectAll}
                      disabled={disabled || paginatedData.length === 0}
                      className="rounded border-border"
                      aria-label="Select all rows"
                    />
                  </th>
                )}

                {columns.map(column => (
                  <th
                    key={String(column.key)}
                    className={cn(
                      'h-10 px-2 text-left align-middle font-medium text-muted-foreground',
                      sortable && column.sortable && 'cursor-pointer hover:bg-muted/50 select-none',
                      internalSort?.column === column.key && 'sorted bg-muted/30',
                      column.className
                    )}
                    style={{ width: column.width }}
                    onClick={() => column.sortable && handleSort(String(column.key))}
                    onKeyDown={e => {
                      if ((e.key === 'Enter' || e.key === ' ') && column.sortable) {
                        e.preventDefault();
                        handleSort(String(column.key));
                      }
                    }}
                    tabIndex={sortable && column.sortable ? 0 : -1}
                    role="columnheader"
                    aria-sort={
                      internalSort?.column === column.key
                        ? internalSort?.direction === 'asc'
                          ? 'ascending'
                          : 'descending'
                        : undefined
                    }
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.header}</span>
                      {sortable && column.sortable && (
                        <div className="datatable__sort-indicator flex flex-col">
                          <ChevronUp
                            className={cn(
                              'h-3 w-3 -mb-1',
                              internalSort?.column === column.key &&
                                internalSort.direction === 'asc'
                                ? 'text-foreground datatable__sort-indicator--ascending'
                                : 'text-muted-foreground'
                            )}
                          />
                          <ChevronDown
                            className={cn(
                              'h-3 w-3',
                              internalSort?.column === column.key &&
                                internalSort.direction === 'desc'
                                ? 'text-foreground datatable__sort-indicator--descending'
                                : 'text-muted-foreground'
                            )}
                          />
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="[&_tr:last-child]:border-0">
              {paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (selectable ? 1 : 0)}
                    className="p-8 text-center text-muted-foreground"
                    role="status"
                  >
                    {internalSearchQuery ? 'No results found' : emptyMessage}
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, index) => {
                  const rowId = ((row as Record<string, unknown>).id as number | string) || index;
                  const isSelected = internalSelectedRows.includes(rowId);

                  return (
                    <tr
                      key={rowId}
                      className={cn(
                        'datatable__row border-b transition-colors hover:bg-muted/50',
                        isSelected && 'datatable__row--selected bg-accent/10 border-ring',
                        onRowClick && 'cursor-pointer',
                        disabled && 'pointer-events-none'
                      )}
                      onClick={() => !disabled && onRowClick?.(row, index)}
                      onDoubleClick={() => !disabled && onRowDoubleClick?.(row, index)}
                      data-state={isSelected ? 'selected' : undefined}
                      role="row"
                    >
                      {selectable && (
                        <td className="p-2 align-middle">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleRowSelect(rowId)}
                            disabled={disabled}
                            className="rounded border-border"
                            aria-label={`Select row ${index + 1}`}
                          />
                        </td>
                      )}

                      {columns.map(column => (
                        <td
                          key={String(column.key)}
                          className={cn('p-2 align-middle', column.className)}
                          role="cell"
                        >
                          {column.render
                            ? column.render(row[column.key], row, index)
                            : String(row[column.key] || '')}
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && (
          <div className="datatable__pagination flex items-center justify-between p-4 border-t bg-muted/30">
            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {calculatedTotalPages} ({sortedData.length} total)
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => onPageChange?.(currentPage - 1)}
                disabled={!hasPrevPage || disabled}
                className="px-3 py-1 border border-border rounded hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous page"
              >
                Previous
              </button>

              <button
                onClick={() => onPageChange?.(currentPage + 1)}
                disabled={!hasNextPage || disabled}
                className="px-3 py-1 border border-border rounded hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next page"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {children}
      </div>
    );
  }
);

DataTable.displayName = 'DataTable';

export { DataTable, dataTableVariants };
