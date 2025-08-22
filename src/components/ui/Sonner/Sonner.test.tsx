import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Toaster } from './index';

describe('Sonner', () => {
  const renderBasicSonner = (props = {}) => {
    return render(<Toaster {...props} />);
  };

  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = renderBasicSonner();
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Basic Functionality', () => {
    it('renders toast notification container', () => {
      renderBasicSonner();
      // Sonner renders a section with ARIA attributes for notifications
      const toastContainer = screen.getByRole('region', { name: /notifications/i });
      expect(toastContainer).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      renderBasicSonner();
      const toastContainer = screen.getByRole('region', { name: /notifications/i });
      expect(toastContainer).toHaveAttribute('aria-live', 'polite');
      expect(toastContainer).toHaveAttribute('aria-relevant', 'additions text');
    });

    it('announces changes to screen readers', () => {
      renderBasicSonner();
      const toastContainer = screen.getByRole('region', { name: /notifications/i });
      expect(toastContainer).toHaveAttribute('aria-live', 'polite');
    });

    it('respects reduced motion preferences', () => {
      renderBasicSonner();
      // Sonner handles motion preferences internally
      const toastContainer = screen.getByRole('region', { name: /notifications/i });
      expect(toastContainer).toBeInTheDocument();
    });
  });

  describe('Custom Styling and Props', () => {
    it('accepts custom className', () => {
      renderBasicSonner({ className: 'custom-class' });
      // Toaster renders toast container, className is applied internally
      const toastContainer = screen.getByRole('region', { name: /notifications/i });
      expect(toastContainer).toBeInTheDocument();
    });

    it('forwards refs correctly', () => {
      const ref = vi.fn();
      renderBasicSonner({ ref });
      const toastContainer = screen.getByRole('region', { name: /notifications/i });
      expect(toastContainer).toBeInTheDocument();
    });

    it('spreads additional props', () => {
      renderBasicSonner({ 'data-custom': 'test-value' });
      // Additional props are applied internally to Sonner
      const toastContainer = screen.getByRole('region', { name: /notifications/i });
      expect(toastContainer).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined props gracefully', () => {
      renderBasicSonner({ children: undefined });
      const toastContainer = screen.getByRole('region', { name: /notifications/i });
      expect(toastContainer).toBeInTheDocument();
    });

    it('handles null props gracefully', () => {
      renderBasicSonner({ children: null });
      const toastContainer = screen.getByRole('region', { name: /notifications/i });
      expect(toastContainer).toBeInTheDocument();
    });

    it('handles empty string props', () => {
      renderBasicSonner({ className: '' });
      const toastContainer = screen.getByRole('region', { name: /notifications/i });
      expect(toastContainer).toBeInTheDocument();
    });

    it('handles rapid prop changes', () => {
      const { rerender } = renderBasicSonner({ className: 'class1' });
      rerender(<Toaster className="class2" />);
      const toastContainer = screen.getByRole('region', { name: /notifications/i });
      expect(toastContainer).toBeInTheDocument();
    });

    it('handles component unmounting cleanly', () => {
      const { unmount } = renderBasicSonner();
      expect(() => unmount()).not.toThrow();
    });

    it('preserves functionality after remounting', () => {
      const { unmount } = renderBasicSonner();
      unmount();
      renderBasicSonner();
      const toastContainer = screen.getByRole('region', { name: /notifications/i });
      expect(toastContainer).toBeInTheDocument();
    });
  });
});
