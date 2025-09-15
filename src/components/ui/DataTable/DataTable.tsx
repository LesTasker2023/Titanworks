import { cn } from '@/lib/utils';
import { stripTransientProps } from '@/utils/stripTransientProps';
import { ChevronDown, ChevronUp, Loader2, Search } from 'lucide-react';
import React from 'react';

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

// Variant types
export type DataTableVariant = 'default' | 'success' | 'warning' | 'danger';
export type DataTableSize = 'sm' | 'default' | 'lg' | 'xl';

// Style guide compliant interface
export interface DataTableProps<T = Record<string, unknown>>
  extends React.ComponentPropsWithoutRef<'div'> {
  // Data props
  data: T[];
  columns: DataTableColumn<T>[];

  // Style variants
  variant?: DataTableVariant;
  size?: DataTableSize;

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
        <div className="dataTable dataTable--loading">
          <div className="dataTable__loadingContent">
            <Loader2 className="dataTable__spinner" />
            <span className="dataTable__loadingText">Loading table data...</span>
            <span className="dataTable__srOnly" role="status">
              Loading...
            </span>
          </div>
        </div>
      );
    }

    // Error state (AFTER hooks)
    if (error) {
      return (
        <div className={cn('dataTable', `dataTable--${variant}`, 'dataTable--error', className)}>
          <div className="dataTable__errorContent">
            <div className="dataTable__errorTitle">Error</div>
            <div className="dataTable__errorMessage">{error}</div>
          </div>
        </div>
      );
    }

    // Base element with style guide classes
    return (
      <div
        ref={ref}
        className={cn(
          'dataTable',
          `dataTable--${variant}`,
          `dataTable--size${size.charAt(0).toUpperCase() + size.slice(1)}`,
          disabled && 'dataTable--disabled',
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
          <div className="dataTable__filterBar">
            <div className="dataTable__searchContainer">
              <Search className="dataTable__searchIcon" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={internalSearchQuery}
                onChange={e => handleSearch(e.target.value)}
                className="dataTable__searchInput"
                disabled={disabled}
              />
            </div>
          </div>
        )}

        {/* Table container */}
        <div
          className="dataTable__scrollContainer"
          style={{ maxHeight: stickyHeader ? maxHeight : undefined }}
        >
          <table className="dataTable__table" role="table" aria-label={props['aria-label']}>
            {caption && <caption className="dataTable__caption">{caption}</caption>}

            <thead className={cn('dataTable__thead', stickyHeader && 'dataTable__thead--sticky')}>
              <tr>
                {selectable && (
                  <th className="dataTable__th dataTable__th--checkbox">
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
                      className="dataTable__checkbox"
                      aria-label="Select all rows"
                    />
                  </th>
                )}

                {columns.map(column => (
                  <th
                    key={String(column.key)}
                    className={cn(
                      'dataTable__th',
                      sortable && column.sortable && 'dataTable__th--sortable',
                      internalSort?.column === column.key && 'dataTable__th--sorted',
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
                    <div className="dataTable__thContent">
                      <span>{column.header}</span>
                      {sortable && column.sortable && (
                        <div
                          className={cn(
                            'dataTable__sortIndicator',
                            internalSort?.column === column.key &&
                              internalSort.direction === 'asc' &&
                              'dataTable__sortIndicator--ascending',
                            internalSort?.column === column.key &&
                              internalSort.direction === 'desc' &&
                              'dataTable__sortIndicator--descending'
                          )}
                        >
                          <ChevronUp className="dataTable__chevronUp" />
                          <ChevronDown className="dataTable__chevronDown" />
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="dataTable__tbody">
              {paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (selectable ? 1 : 0)}
                    className="dataTable__emptyState"
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
                        'dataTable__row',
                        isSelected && 'dataTable__row--selected',
                        onRowClick && 'dataTable__row--clickable',
                        disabled && 'dataTable__row--disabled'
                      )}
                      onClick={() => !disabled && onRowClick?.(row, index)}
                      onDoubleClick={() => !disabled && onRowDoubleClick?.(row, index)}
                      data-state={isSelected ? 'selected' : undefined}
                      role="row"
                    >
                      {selectable && (
                        <td className="dataTable__td">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleRowSelect(rowId)}
                            disabled={disabled}
                            className="dataTable__checkbox"
                            aria-label={`Select row ${index + 1}`}
                          />
                        </td>
                      )}

                      {columns.map(column => (
                        <td
                          key={String(column.key)}
                          className={cn('dataTable__td', column.className)}
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
          <div className="dataTable__pagination">
            <div className="dataTable__paginationInfo">
              Page {currentPage} of {calculatedTotalPages} ({sortedData.length} total)
            </div>

            <div className="dataTable__paginationControls">
              <button
                onClick={() => onPageChange?.(currentPage - 1)}
                disabled={!hasPrevPage || disabled}
                className="dataTable__paginationButton"
                aria-label="Previous page"
              >
                Previous
              </button>

              <button
                onClick={() => onPageChange?.(currentPage + 1)}
                disabled={!hasNextPage || disabled}
                className="dataTable__paginationButton"
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

export { DataTable };
