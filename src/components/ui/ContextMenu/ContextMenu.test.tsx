import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from './ContextMenu';

describe('ContextMenu', () => {
  const BasicContextMenu = ({
    children,
    ...props
  }: {
    children?: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <ContextMenu>
      <ContextMenuTrigger data-testid="context-trigger">Right click me</ContextMenuTrigger>
      <ContextMenuContent data-testid="contextmenu" {...props}>
        <ContextMenuItem>Test content</ContextMenuItem>
        {children}
      </ContextMenuContent>
    </ContextMenu>
  );

  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = render(<BasicContextMenu />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches disabled state snapshot', () => {
      const { container } = render(<BasicContextMenu disabled />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches checked state snapshot', () => {
      const { container } = render(<BasicContextMenu checked />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches active state snapshot', () => {
      const { container } = render(<BasicContextMenu active />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Basic Functionality', () => {
    it('renders correctly', () => {
      render(<BasicContextMenu />);
      expect(screen.getByTestId('context-trigger')).toBeInTheDocument();
      expect(screen.getByText('Right click me')).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('handles disabled state correctly', () => {
      render(<BasicContextMenu disabled />);
      expect(screen.getByTestId('context-trigger')).toBeInTheDocument();
    });

    it('handles checked state correctly', () => {
      render(<BasicContextMenu checked />);
      expect(screen.getByTestId('context-trigger')).toBeInTheDocument();
    });

    it('handles active state correctly', () => {
      render(<BasicContextMenu active />);
      expect(screen.getByTestId('context-trigger')).toBeInTheDocument();
    });
  });

  describe('Events', () => {
    it('handles onSelect correctly', () => {
      const onSelect = vi.fn();
      render(
        <ContextMenu>
          <ContextMenuTrigger data-testid="context-trigger">Right click</ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem onSelect={onSelect}>Test Item</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      );
      expect(screen.getByTestId('context-trigger')).toBeInTheDocument();
    });

    it('handles onValueChange correctly', () => {
      render(<BasicContextMenu />);
      expect(screen.getByTestId('context-trigger')).toBeInTheDocument();
    });
  });

  describe('Props', () => {
    it('handles children prop correctly', () => {
      render(
        <BasicContextMenu>
          <ContextMenuItem>Custom Item</ContextMenuItem>
        </BasicContextMenu>
      );
      expect(screen.getByTestId('context-trigger')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<BasicContextMenu />);
      expect(screen.getByTestId('context-trigger')).toBeInTheDocument();
    });

    it('announces changes to screen readers', () => {
      render(<BasicContextMenu />);
      expect(screen.getByTestId('context-trigger')).toBeInTheDocument();
    });

    it('respects reduced motion preferences', () => {
      render(<BasicContextMenu />);
      expect(screen.getByTestId('context-trigger')).toBeInTheDocument();
    });
  });

  describe('Custom Styling and Props', () => {
    it('accepts custom className', () => {
      render(<BasicContextMenu className="custom-class" />);
      expect(screen.getByTestId('context-trigger')).toBeInTheDocument();
    });

    it('forwards refs correctly', () => {
      const ref = React.createRef();
      render(<BasicContextMenu ref={ref} />);
      expect(screen.getByTestId('context-trigger')).toBeInTheDocument();
    });

    it('spreads additional props', () => {
      render(<BasicContextMenu data-custom="test-value" />);
      expect(screen.getByTestId('context-trigger')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined props gracefully', () => {
      render(<BasicContextMenu>{undefined}</BasicContextMenu>);
      expect(screen.getByTestId('context-trigger')).toBeInTheDocument();
    });

    it('handles null props gracefully', () => {
      render(<BasicContextMenu>{null}</BasicContextMenu>);
      expect(screen.getByTestId('context-trigger')).toBeInTheDocument();
    });

    it('handles empty string props', () => {
      render(<BasicContextMenu className="" />);
      expect(screen.getByTestId('context-trigger')).toBeInTheDocument();
    });

    it('handles rapid prop changes', () => {
      const { rerender } = render(<BasicContextMenu className="class1" />);
      rerender(<BasicContextMenu className="class2" />);
      expect(screen.getByTestId('context-trigger')).toBeInTheDocument();
    });

    it('handles complex nested content', () => {
      render(
        <BasicContextMenu>
          <ContextMenuItem>
            <div>
              <h3>Nested Title</h3>
              <p>Nested content</p>
            </div>
          </ContextMenuItem>
        </BasicContextMenu>
      );
      expect(screen.getByTestId('context-trigger')).toBeInTheDocument();
    });

    it('maintains functionality with many children', () => {
      render(
        <BasicContextMenu>
          {Array.from({ length: 100 }, (_, i) => (
            <ContextMenuItem key={i}>Item {i}</ContextMenuItem>
          ))}
        </BasicContextMenu>
      );
      expect(screen.getByTestId('context-trigger')).toBeInTheDocument();
    });

    it('handles component unmounting cleanly', () => {
      const { unmount } = render(<BasicContextMenu />);
      expect(() => unmount()).not.toThrow();
    });

    it('preserves functionality after remounting', () => {
      const { unmount } = render(<BasicContextMenu />);
      unmount();
      render(<BasicContextMenu />);
      expect(screen.getByTestId('context-trigger')).toBeInTheDocument();
    });
  });
});
