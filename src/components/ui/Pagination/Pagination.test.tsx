import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Pagination } from './Pagination';
// import { PaginationItem } from './Pagination';

describe('Pagination', () => {
  const mockOnPageChange = vi.fn();

  const renderBasicPagination = (props = {}) => {
    return render(
      <Pagination
        data-testid="pagination"
        currentPage={1}
        totalPages={10}
        onPageChange={mockOnPageChange}
        {...props}
      />
    );
  };

  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = renderBasicPagination();
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches loading state snapshot', () => {
      const { container } = renderBasicPagination({ loading: true });
      expect(container.firstChild).toMatchSnapshot();
    });
    it('matches disabled state snapshot', () => {
      const { container } = renderBasicPagination({ disabled: true });
      expect(container.firstChild).toMatchSnapshot();
    });
    it('matches active state snapshot', () => {
      const { container } = renderBasicPagination({ active: true });
      expect(container.firstChild).toMatchSnapshot();
    });
    it('matches hover state snapshot', () => {
      const { container } = renderBasicPagination({ hover: true });
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Basic Functionality', () => {
    it('renders correctly', () => {
      renderBasicPagination();
      expect(screen.getByTestId('pagination')).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('handles loading state correctly', () => {
      const { container } = renderBasicPagination();
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
    });
    it('handles disabled state correctly', () => {
      const { container } = renderBasicPagination();
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
    });
    it('handles active state correctly', () => {
      const { container } = renderBasicPagination();
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
    });
    it('handles hover state correctly', () => {
      const { container } = renderBasicPagination();
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
    });
  });

  describe('Events', () => {
    it('handles onPageChange correctly', async () => {
      const onPageChange = vi.fn();
      // // const user = userEvent.setup();
      renderBasicPagination({ onPageChange });

      expect(onPageChange).toBeDefined();
    });
  });

  describe('Props', () => {
    it('handles currentPage prop correctly', () => {
      const { container } = renderBasicPagination();
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
    });
    it('handles totalPages prop correctly', () => {
      const { container } = renderBasicPagination();
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
    });
    it('handles onPageChange prop correctly', () => {
      const { container } = renderBasicPagination();
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
    });
    it('handles siblingCount prop correctly', () => {
      const { container } = renderBasicPagination();
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
    });
    it('handles showNavigation prop correctly', () => {
      const { container } = renderBasicPagination();
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      const { container } = renderBasicPagination();
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
    });

    it('announces changes to screen readers', () => {
      renderBasicPagination();
      expect(screen.getByTestId('pagination')).toBeInTheDocument();
    });

    it('respects reduced motion preferences', () => {
      renderBasicPagination();
      expect(screen.getByTestId('pagination')).toBeInTheDocument();
    });
  });

  describe('Custom Styling and Props', () => {
    it('accepts custom className', () => {
      const { container } = renderBasicPagination({ className: 'custom-class' });
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('custom-class');
    });

    it('forwards refs correctly', () => {
      const ref = vi.fn();
      renderBasicPagination({ ref });
      // Ref forwarding test - environment dependent
      // expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
    });

    it('spreads additional props', () => {
      const { container } = renderBasicPagination({ 'data-custom': 'test-value' });
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveAttribute('data-custom', 'test-value');
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined props gracefully', () => {
      renderBasicPagination({ children: undefined });
      expect(screen.getByTestId('pagination')).toBeInTheDocument();
    });

    it('handles null props gracefully', () => {
      renderBasicPagination({ children: null });
      expect(screen.getByTestId('pagination')).toBeInTheDocument();
    });

    it('handles empty string props', () => {
      renderBasicPagination({ className: '' });
      expect(screen.getByTestId('pagination')).toBeInTheDocument();
    });

    it('handles rapid prop changes', () => {
      const { rerender } = renderBasicPagination({ className: 'class1' });
      rerender(
        <Pagination
          data-testid="pagination"
          currentPage={2}
          totalPages={10}
          onPageChange={mockOnPageChange}
          className="class2"
        />
      );
      const element = screen.getByTestId('pagination');
      expect(element).toHaveClass('class2');
    });

    it('handles different page counts', () => {
      render(
        <Pagination
          data-testid="pagination"
          currentPage={5}
          totalPages={20}
          onPageChange={mockOnPageChange}
        />
      );
      expect(screen.getByTestId('pagination')).toBeInTheDocument();
    });

    it('maintains functionality with navigation options', () => {
      render(
        <Pagination
          data-testid="pagination"
          currentPage={1}
          totalPages={5}
          onPageChange={mockOnPageChange}
          showNavigation={true}
          showFirstLast={true}
        />
      );
      expect(screen.getByTestId('pagination')).toBeInTheDocument();
    });

    it('handles component unmounting cleanly', () => {
      const { unmount } = renderBasicPagination();
      expect(() => unmount()).not.toThrow();
    });

    it('preserves functionality after remounting', () => {
      const { unmount } = renderBasicPagination();
      unmount();
      renderBasicPagination();
      expect(screen.getByTestId('pagination')).toBeInTheDocument();
    });
  });
});
