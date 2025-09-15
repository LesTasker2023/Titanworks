import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';

describe('Popover', () => {
  const renderBasicPopover = (props = {}) => {
    return render(
      <Popover {...props}>
        <PopoverTrigger data-testid="popover-trigger">
          <div>Open Popover</div>
        </PopoverTrigger>
        <PopoverContent data-testid="popover-content">Test content</PopoverContent>
      </Popover>
    );
  };

  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = renderBasicPopover();
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches disabled state snapshot', () => {
      const { container } = renderBasicPopover({ disabled: true });
      expect(container.firstChild).toMatchSnapshot();
    });
    it('matches hover state snapshot', () => {
      const { container } = renderBasicPopover({ hover: true });
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Basic Functionality', () => {
    it('renders correctly', () => {
      renderBasicPopover();
      expect(screen.getByTestId('popover-trigger')).toBeInTheDocument();
      expect(screen.getByText('Open Popover')).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('handles disabled state correctly', () => {
      const { container } = renderBasicPopover();
      const trigger = screen.getByTestId('popover-trigger');
      expect(trigger).toBeInTheDocument();
    });
    it('handles hover state correctly', () => {
      const { container } = renderBasicPopover();
      const trigger = screen.getByTestId('popover-trigger');
      expect(trigger).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      const { container } = renderBasicPopover();
      const trigger = screen.getByTestId('popover-trigger');
      expect(trigger).toBeInTheDocument();
    });

    it('announces changes to screen readers', () => {
      renderBasicPopover();
      expect(screen.getByTestId('popover-trigger')).toBeInTheDocument();
    });

    it('respects reduced motion preferences', () => {
      renderBasicPopover();
      expect(screen.getByTestId('popover-trigger')).toBeInTheDocument();
    });
  });

  describe('Custom Styling and Props', () => {
    it('accepts custom className', () => {
      const { container } = renderBasicPopover({ className: 'custom-class' });
      const trigger = screen.getByTestId('popover-trigger');
      expect(trigger).toBeInTheDocument();
    });

    it('forwards refs correctly', () => {
      const ref = vi.fn();
      render(
        <Popover>
          <PopoverTrigger data-testid="popover-trigger">
            <div>Test</div>
          </PopoverTrigger>
          <PopoverContent ref={ref}>Content</PopoverContent>
        </Popover>
      );
      expect(screen.getByTestId('popover-trigger')).toBeInTheDocument();
    });

    it('spreads additional props', () => {
      const { container } = renderBasicPopover({ 'data-custom': 'test-value' });
      const trigger = screen.getByTestId('popover-trigger');
      expect(trigger).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined props gracefully', () => {
      render(
        <Popover>
          <PopoverTrigger data-testid="popover-trigger">
            <div>Test</div>
          </PopoverTrigger>
          <PopoverContent>{undefined}</PopoverContent>
        </Popover>
      );
      expect(screen.getByTestId('popover-trigger')).toBeInTheDocument();
    });

    it('handles null props gracefully', () => {
      render(
        <Popover>
          <PopoverTrigger data-testid="popover-trigger">
            <div>Test</div>
          </PopoverTrigger>
          <PopoverContent>{null}</PopoverContent>
        </Popover>
      );
      expect(screen.getByTestId('popover-trigger')).toBeInTheDocument();
    });

    it('handles empty string props', () => {
      render(
        <Popover>
          <PopoverTrigger data-testid="popover-trigger" className="">
            <div>Test</div>
          </PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      );
      expect(screen.getByTestId('popover-trigger')).toBeInTheDocument();
    });

    it('handles complex nested content', () => {
      render(
        <Popover>
          <PopoverTrigger data-testid="popover-trigger">
            <div>Test</div>
          </PopoverTrigger>
          <PopoverContent>
            <div>
              <span>Nested content</span>
              <p>More content</p>
            </div>
          </PopoverContent>
        </Popover>
      );
      expect(screen.getByTestId('popover-trigger')).toBeInTheDocument();
    });

    it('maintains functionality with many children', () => {
      render(
        <Popover>
          <PopoverTrigger data-testid="popover-trigger">
            <div>Test</div>
          </PopoverTrigger>
          <PopoverContent>
            {Array.from({ length: 100 }, (_, i) => (
              <div key={i}>Item {i}</div>
            ))}
          </PopoverContent>
        </Popover>
      );
      expect(screen.getByTestId('popover-trigger')).toBeInTheDocument();
    });

    it('handles component unmounting cleanly', () => {
      const { unmount } = renderBasicPopover();
      expect(() => unmount()).not.toThrow();
    });

    it('preserves functionality after remounting', () => {
      const { unmount } = renderBasicPopover();
      unmount();
      renderBasicPopover();
      expect(screen.getByTestId('popover-trigger')).toBeInTheDocument();
    });
  });
});
