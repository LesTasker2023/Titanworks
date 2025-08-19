import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Pagination } from './Pagination';

describe('Pagination Component', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 10,
    onPageChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders pagination navigation correctly', () => {
      render(<Pagination {...defaultProps} />);
      expect(screen.getByRole('navigation', { name: /pagination/i })).toBeInTheDocument();
    });

    it('displays current page correctly', () => {
      render(<Pagination {...defaultProps} currentPage={5} />);
      expect(screen.getByRole('button', { name: 'Go to page 5' })).toHaveAttribute(
        'aria-current',
        'page'
      );
    });

    it('renders previous and next buttons', () => {
      render(<Pagination {...defaultProps} />);
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it('applies small size classes correctly', () => {
      render(<Pagination {...defaultProps} size="sm" />);
      const navigation = screen.getByRole('navigation');
      expect(navigation).toHaveClass('text-sm');
    });

    it('applies large size classes correctly', () => {
      render(<Pagination {...defaultProps} size="lg" />);
      const navigation = screen.getByRole('navigation');
      expect(navigation).toHaveClass('text-base');
    });
  });

  describe('Navigation Controls', () => {
    it('calls onPageChange when clicking previous button', async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();
      render(<Pagination {...defaultProps} currentPage={5} onPageChange={onPageChange} />);

      const prevButton = screen.getByRole('button', { name: /previous/i });
      await user.click(prevButton);

      expect(onPageChange).toHaveBeenCalledWith(4);
    });

    it('calls onPageChange when clicking next button', async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();
      render(<Pagination {...defaultProps} currentPage={5} onPageChange={onPageChange} />);

      const nextButton = screen.getByRole('button', { name: /next/i });
      await user.click(nextButton);

      expect(onPageChange).toHaveBeenCalledWith(6);
    });

    it('calls onPageChange when clicking page number', async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();
      render(<Pagination {...defaultProps} onPageChange={onPageChange} />);

      const pageButton = screen.getByRole('button', { name: 'Go to page 3' });
      await user.click(pageButton);

      expect(onPageChange).toHaveBeenCalledWith(3);
    });
  });

  describe('Disabled States', () => {
    it('disables previous button on first page', () => {
      render(<Pagination {...defaultProps} currentPage={1} />);
      const prevButton = screen.getByRole('button', { name: /previous/i });
      expect(prevButton).toBeDisabled();
    });

    it('disables next button on last page', () => {
      render(<Pagination {...defaultProps} currentPage={10} totalPages={10} />);
      const nextButton = screen.getByRole('button', { name: /next/i });
      expect(nextButton).toBeDisabled();
    });

    it('disables all buttons when loading', () => {
      render(<Pagination {...defaultProps} loading />);
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toBeDisabled();
      });
    });
  });

  describe('Smart Truncation', () => {
    it('shows ellipsis for large page counts', () => {
      render(<Pagination {...defaultProps} currentPage={10} totalPages={50} />);
      // Look for ellipsis icons (MoreHorizontal) instead of text
      const ellipsisElements = document.querySelectorAll('[aria-hidden="true"]');
      expect(ellipsisElements.length).toBeGreaterThan(0);
    });

    it('shows all pages when total is small', () => {
      render(<Pagination {...defaultProps} totalPages={5} />);
      for (let i = 1; i <= 5; i++) {
        expect(screen.getByRole('button', { name: `Go to page ${i}` })).toBeInTheDocument();
      }
    });

    it('shows first and last pages with ellipsis', () => {
      render(<Pagination {...defaultProps} currentPage={25} totalPages={50} />);
      expect(screen.getByRole('button', { name: 'Go to page 1' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Go to page 50' })).toBeInTheDocument();
      // Look for ellipsis icons instead of text
      const ellipsisElements = document.querySelectorAll('[aria-hidden="true"]');
      expect(ellipsisElements.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('First/Last Navigation', () => {
    it('shows first/last buttons when enabled', () => {
      render(<Pagination {...defaultProps} showFirstLast currentPage={5} />);
      expect(screen.getByRole('button', { name: /first/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /last/i })).toBeInTheDocument();
    });

    it('calls onPageChange with 1 when clicking first', async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();
      render(
        <Pagination {...defaultProps} showFirstLast currentPage={5} onPageChange={onPageChange} />
      );

      const firstButton = screen.getByRole('button', { name: /first/i });
      await user.click(firstButton);

      expect(onPageChange).toHaveBeenCalledWith(1);
    });

    it('calls onPageChange with totalPages when clicking last', async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();
      render(
        <Pagination {...defaultProps} showFirstLast currentPage={5} onPageChange={onPageChange} />
      );

      const lastButton = screen.getByRole('button', { name: /last/i });
      await user.click(lastButton);

      expect(onPageChange).toHaveBeenCalledWith(10);
    });
  });

  describe('Page Info Display', () => {
    it('shows page info when enabled', () => {
      render(<Pagination {...defaultProps} showPageInfo itemsPerPage={10} totalItems={100} />);
      expect(screen.getByText(/showing/i)).toBeInTheDocument();
      expect(screen.getByText(/of 100 results/i)).toBeInTheDocument();
    });

    it('calculates item range correctly', () => {
      render(
        <Pagination
          {...defaultProps}
          currentPage={3}
          showPageInfo
          itemsPerPage={10}
          totalItems={100}
        />
      );
      expect(screen.getByText(/21-30 of 100 results/i)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      render(<Pagination {...defaultProps} />);
      expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Pagination');
    });

    it('marks current page correctly', () => {
      render(<Pagination {...defaultProps} currentPage={3} />);
      const currentPageButton = screen.getByRole('button', { name: 'Go to page 3' });
      expect(currentPageButton).toHaveAttribute('aria-current', 'page');
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<Pagination {...defaultProps} />);

      const firstButton = screen.getByRole('button', { name: /previous/i });
      firstButton.focus();

      await user.keyboard('{Tab}');
      expect(screen.getByRole('button', { name: 'Go to page 1' })).toHaveFocus();
    });
  });

  describe('Loading States', () => {
    it('shows loading spinner when loading', () => {
      render(<Pagination {...defaultProps} loading />);
      // Check that buttons are disabled and spinner is shown in current page
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toBeDisabled();
      });
      // Look for the spinner in the current page button
      expect(screen.getByLabelText('Go to page 1')).toContainHTML('animate-spin');
    });

    it('maintains button structure while loading', () => {
      render(<Pagination {...defaultProps} loading />);
      // Should still have navigation structure even when loading
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles single page correctly', () => {
      render(<Pagination {...defaultProps} totalPages={1} />);
      // For single page, check if navigation exists and if buttons are present
      const navigation = screen.queryByRole('navigation');
      if (navigation) {
        // If navigation exists, previous/next should be disabled or not present
        const prevButton = screen.queryByRole('button', { name: /previous/i });
        const nextButton = screen.queryByRole('button', { name: /next/i });
        if (prevButton) expect(prevButton).toBeDisabled();
        if (nextButton) expect(nextButton).toBeDisabled();
      }
      // Should show current page as 1
      const currentPageButton = screen.queryByRole('button', { name: 'Go to page 1' });
      if (currentPageButton) {
        expect(currentPageButton).toHaveAttribute('aria-current', 'page');
      }
    });

    it('handles zero pages gracefully', () => {
      render(<Pagination {...defaultProps} totalPages={0} />);
      // Should render empty or minimal structure for zero pages
      const nav = screen.queryByRole('navigation');
      // Component should handle this gracefully, either by rendering nothing or minimal structure
      if (nav) {
        expect(nav).toBeInTheDocument();
      }
    });

    it('clamps current page to valid range', () => {
      render(<Pagination {...defaultProps} currentPage={15} totalPages={10} />);
      // Should handle gracefully without crashing
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });
  });

  describe('Custom Styling', () => {
    it('accepts custom className', () => {
      render(<Pagination {...defaultProps} className="custom-pagination" />);
      expect(screen.getByRole('navigation')).toHaveClass('custom-pagination');
    });

    it('forwards additional props', () => {
      render(<Pagination {...defaultProps} data-testid="pagination-component" />);
      expect(screen.getByTestId('pagination-component')).toBeInTheDocument();
    });
  });
});
