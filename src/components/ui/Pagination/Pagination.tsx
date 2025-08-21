import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { forwardRef, useMemo } from 'react';

/**
 * 🎯 Enterprise Pagination Component
 *
 * Complete pagination solution with:
 * - Page number display with smart truncation
 * - Previous/Next navigation
 * - First/Last page quick access
 * - Responsive behavior and mobile optimization
 * - Loading states and accessibility
 * - Perfect complement to DataTable component
 */

// Base pagination container styles
const paginationContainerVariants = cva('flex items-center justify-center space-x-1', {
  variants: {
    size: {
      sm: 'text-sm',
      default: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

// Individual pagination item styles
const paginationItemVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'hover:bg-accent hover:text-accent-foreground',
        active: 'bg-primary text-primary-foreground hover:bg-primary/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        sm: 'h-8 w-8 text-xs',
        default: 'h-9 w-9 text-sm',
        lg: 'h-10 w-10 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// Navigation button styles (prev/next)
const paginationNavVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none gap-1',
  {
    variants: {
      variant: {
        default: 'hover:bg-accent hover:text-accent-foreground',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        sm: 'h-8 px-2 text-xs',
        default: 'h-9 px-3 text-sm',
        lg: 'h-10 px-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface PaginationProps extends VariantProps<typeof paginationContainerVariants> {
  /** Current page (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Maximum number of visible page numbers */
  siblingCount?: number;
  /** Show previous/next buttons */
  showNavigation?: boolean;
  /** Show first/last page buttons */
  showFirstLast?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Custom className */
  className?: string;
  /** Show page info text */
  showPageInfo?: boolean;
  /** Total number of items (for page info) */
  totalItems?: number;
  /** Items per page (for page info) */
  itemsPerPage?: number;
}

/**
 * Generate array of page numbers to display
 * Handles smart truncation with ellipsis
 */
function usePaginationRange(currentPage: number, totalPages: number, siblingCount: number = 1) {
  return useMemo(() => {
    // Total page numbers to show (current + siblings + first + last + 2 ellipsis)
    const totalPageNumbers = siblingCount + 5;

    // If total pages is less than total numbers, show all
    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    // Case 1: No left dots, show right dots
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, '...', totalPages];
    }

    // Case 2: Show left dots, no right dots
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [firstPageIndex, '...', ...rightRange];
    }

    // Case 3: Show both dots
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
    }

    return [];
  }, [currentPage, totalPages, siblingCount]);
}

const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      currentPage,
      totalPages,
      onPageChange,
      siblingCount = 1,
      showNavigation = true,
      showFirstLast = true,
      loading = false,
      disabled = false,
      className,
      size,
      showPageInfo = false,
      totalItems,
      itemsPerPage,
      ...props
    },
    ref
  ) => {
    const paginationRange = usePaginationRange(currentPage, totalPages, siblingCount);

    // Calculate page info
    const pageInfo = useMemo(() => {
      if (!showPageInfo || !totalItems || !itemsPerPage) return null;

      const start = (currentPage - 1) * itemsPerPage + 1;
      const end = Math.min(currentPage * itemsPerPage, totalItems);

      return `Showing ${start}-${end} of ${totalItems} results`;
    }, [currentPage, totalItems, itemsPerPage, showPageInfo]);

    // Don't render if only one page
    if (totalPages <= 1) return null;

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    const handlePageChange = (page: number) => {
      if (loading || disabled || page === currentPage) return;
      if (page >= 1 && page <= totalPages) {
        onPageChange(page);
      }
    };

    return (
      <div className={cn('flex flex-col items-center space-y-3', className)} ref={ref} {...props}>
        <nav className={cn(paginationContainerVariants({ size }))} aria-label="Pagination">
          {/* First page button */}
          {showFirstLast && !isFirstPage && (
            <button
              onClick={() => handlePageChange(1)}
              disabled={loading || disabled}
              className={cn(paginationNavVariants({ size }))}
              aria-label="Go to first page"
            >
              <span className="hidden sm:inline">First</span>
              <span className="sm:hidden">1</span>
            </button>
          )}

          {/* Previous button */}
          {showNavigation && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={isFirstPage || loading || disabled}
              className={cn(paginationNavVariants({ size }))}
              aria-label="Go to previous page"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>
          )}

          {/* Page numbers */}
          {paginationRange.map((pageNumber, index) => {
            // Ellipsis
            if (pageNumber === '...') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className={cn(paginationItemVariants({ size }), 'cursor-default')}
                  aria-hidden="true"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </span>
              );
            }

            const page = pageNumber as number;
            const isActive = page === currentPage;

            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                disabled={loading || disabled}
                className={cn(
                  paginationItemVariants({
                    variant: isActive ? 'active' : 'default',
                    size,
                  })
                )}
                aria-label={`Go to page ${page}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {loading && isActive ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                  page
                )}
              </button>
            );
          })}

          {/* Next button */}
          {showNavigation && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={isLastPage || loading || disabled}
              className={cn(paginationNavVariants({ size }))}
              aria-label="Go to next page"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          )}

          {/* Last page button */}
          {showFirstLast && !isLastPage && (
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={loading || disabled}
              className={cn(paginationNavVariants({ size }))}
              aria-label="Go to last page"
            >
              <span className="hidden sm:inline">Last</span>
              <span className="sm:hidden">{totalPages}</span>
            </button>
          )}
        </nav>

        {/* Page info text */}
        {pageInfo && <div className="text-sm text-muted-foreground">{pageInfo}</div>}
      </div>
    );
  }
);

Pagination.displayName = 'Pagination';

export { Pagination, paginationContainerVariants, paginationItemVariants, paginationNavVariants };
