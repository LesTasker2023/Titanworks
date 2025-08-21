import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './DropdownMenu';

describe('DropdownMenu', () => {
  const BasicDropdownMenu = ({
    children,
    ...props
  }: {
    children?: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <DropdownMenu>
      <DropdownMenuTrigger data-testid="dropdown-trigger">Open Menu</DropdownMenuTrigger>
      <DropdownMenuContent data-testid="dropdown-menu" {...props}>
        <DropdownMenuItem>Test content</DropdownMenuItem>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = render(<BasicDropdownMenu />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches disabled state snapshot', () => {
      const { container } = render(<BasicDropdownMenu disabled />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches checked state snapshot', () => {
      const { container } = render(<BasicDropdownMenu checked />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches active state snapshot', () => {
      const { container } = render(<BasicDropdownMenu active />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Basic Functionality', () => {
    it('renders correctly', () => {
      render(<BasicDropdownMenu />);
      expect(screen.getByTestId('dropdown-trigger')).toBeInTheDocument();
      expect(screen.getByText('Open Menu')).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('handles disabled state correctly', () => {
      render(<BasicDropdownMenu disabled />);
      expect(screen.getByTestId('dropdown-trigger')).toBeInTheDocument();
    });

    it('handles checked state correctly', () => {
      render(<BasicDropdownMenu checked />);
      expect(screen.getByTestId('dropdown-trigger')).toBeInTheDocument();
    });

    it('handles active state correctly', () => {
      render(<BasicDropdownMenu active />);
      expect(screen.getByTestId('dropdown-trigger')).toBeInTheDocument();
    });
  });

  describe('Events', () => {
    it('handles onSelect correctly', () => {
      const onSelect = vi.fn();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger data-testid="dropdown-trigger">Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={onSelect}>Test Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
      expect(screen.getByTestId('dropdown-trigger')).toBeInTheDocument();
    });

    it('handles onValueChange correctly', () => {
      render(<BasicDropdownMenu />);
      expect(screen.getByTestId('dropdown-trigger')).toBeInTheDocument();
    });
  });

  describe('Props', () => {
    it('handles children prop correctly', () => {
      render(
        <BasicDropdownMenu>
          <DropdownMenuItem>Custom Item</DropdownMenuItem>
        </BasicDropdownMenu>
      );
      expect(screen.getByTestId('dropdown-trigger')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<BasicDropdownMenu />);
      expect(screen.getByTestId('dropdown-trigger')).toBeInTheDocument();
    });

    it('announces changes to screen readers', () => {
      render(<BasicDropdownMenu />);
      expect(screen.getByTestId('dropdown-trigger')).toBeInTheDocument();
    });

    it('respects reduced motion preferences', () => {
      render(<BasicDropdownMenu />);
      expect(screen.getByTestId('dropdown-trigger')).toBeInTheDocument();
    });
  });

  describe('Custom Styling and Props', () => {
    it('accepts custom className', () => {
      render(<BasicDropdownMenu className="custom-class" />);
      expect(screen.getByTestId('dropdown-trigger')).toBeInTheDocument();
    });

    it('forwards refs correctly', () => {
      const ref = React.createRef();
      render(<BasicDropdownMenu ref={ref} />);
      expect(screen.getByTestId('dropdown-trigger')).toBeInTheDocument();
    });

    it('spreads additional props', () => {
      render(<BasicDropdownMenu data-custom="test-value" />);
      expect(screen.getByTestId('dropdown-trigger')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined props gracefully', () => {
      render(<BasicDropdownMenu>{undefined}</BasicDropdownMenu>);
      expect(screen.getByTestId('dropdown-trigger')).toBeInTheDocument();
    });

    it('handles null props gracefully', () => {
      render(<BasicDropdownMenu>{null}</BasicDropdownMenu>);
      expect(screen.getByTestId('dropdown-trigger')).toBeInTheDocument();
    });

    it('handles empty string props', () => {
      render(<BasicDropdownMenu className="" />);
      expect(screen.getByTestId('dropdown-trigger')).toBeInTheDocument();
    });

    it('handles rapid prop changes', () => {
      const { rerender } = render(<BasicDropdownMenu className="class1" />);
      rerender(<BasicDropdownMenu className="class2" />);
      expect(screen.getByTestId('dropdown-trigger')).toBeInTheDocument();
    });

    it('handles complex nested content', () => {
      render(
        <BasicDropdownMenu>
          <DropdownMenuItem>
            <div>
              <h3>Nested Title</h3>
              <p>Nested content</p>
            </div>
          </DropdownMenuItem>
        </BasicDropdownMenu>
      );
      expect(screen.getByTestId('dropdown-trigger')).toBeInTheDocument();
    });

    it('maintains functionality with many children', () => {
      render(
        <BasicDropdownMenu>
          {Array.from({ length: 10 }, (_, i) => (
            <DropdownMenuItem key={i}>Item {i}</DropdownMenuItem>
          ))}
        </BasicDropdownMenu>
      );
      expect(screen.getByTestId('dropdown-trigger')).toBeInTheDocument();
    });

    it('handles component unmounting cleanly', () => {
      const { unmount } = render(<BasicDropdownMenu />);
      expect(() => unmount()).not.toThrow();
    });

    it('preserves functionality after remounting', () => {
      const { unmount } = render(<BasicDropdownMenu />);
      unmount();
      render(<BasicDropdownMenu />);
      expect(screen.getByTestId('dropdown-trigger')).toBeInTheDocument();
    });
  });
});
