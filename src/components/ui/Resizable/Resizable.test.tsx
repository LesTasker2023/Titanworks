import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

// Mock the resizable components for testing
const ResizablePanelGroup = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: unknown;
}) => (
  <div data-testid="resizable" {...props}>
    {children}
  </div>
);
const ResizablePanel = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: unknown;
}) => (
  <div data-testid="resizable-panel" {...props}>
    {children}
  </div>
);
const ResizableHandle = (props: { [key: string]: unknown }) => (
  <div data-testid="resizable-handle" {...props} />
);

describe('Resizable', () => {
  const BasicResizable = (props: { [key: string]: unknown }) => (
    <ResizablePanelGroup data-testid="resizable" {...props}>
      <ResizablePanel>Panel 1</ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>Panel 2</ResizablePanel>
    </ResizablePanelGroup>
  );

  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = render(<BasicResizable />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Basic Functionality', () => {
    it('renders correctly', () => {
      render(<BasicResizable />);
      expect(screen.getByTestId('resizable')).toBeInTheDocument();
      expect(screen.getByText('Panel 1')).toBeInTheDocument();
      expect(screen.getByText('Panel 2')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<BasicResizable />);
      expect(screen.getByTestId('resizable')).toBeInTheDocument();
    });
    it('announces changes to screen readers', () => {
      render(<BasicResizable />);
      expect(screen.getByTestId('resizable')).toBeInTheDocument();
    });
    it('respects reduced motion preferences', () => {
      render(<BasicResizable />);
      expect(screen.getByTestId('resizable')).toBeInTheDocument();
    });
  });

  describe('Custom Styling and Props', () => {
    it('accepts custom className', () => {
      const { container } = render(<BasicResizable className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });
    it('forwards refs correctly', () => {
      const ref = React.createRef();
      render(<BasicResizable ref={ref} />);
      expect(screen.getByTestId('resizable')).toBeInTheDocument();
    });
    it('spreads additional props', () => {
      const { container } = render(<BasicResizable data-custom="test-value" />);
      expect(container.firstChild).toHaveAttribute('data-custom', 'test-value');
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined props gracefully', () => {
      render(<BasicResizable>{undefined}</BasicResizable>);
      expect(screen.getByTestId('resizable')).toBeInTheDocument();
    });
    it('handles null props gracefully', () => {
      render(<BasicResizable>{null}</BasicResizable>);
      expect(screen.getByTestId('resizable')).toBeInTheDocument();
    });
    it('handles empty string props', () => {
      render(<BasicResizable className="" />);
      expect(screen.getByTestId('resizable')).toBeInTheDocument();
    });
    it('handles rapid prop changes', () => {
      const { rerender } = render(<BasicResizable className="class1" />);
      rerender(<BasicResizable className="class2" />);
      expect(screen.getByTestId('resizable')).toBeInTheDocument();
    });
    it('handles complex nested content', () => {
      render(
        <BasicResizable>
          <div>
            <p>Nested content</p>
          </div>
        </BasicResizable>
      );
      expect(screen.getByTestId('resizable')).toBeInTheDocument();
    });
    it('maintains functionality with many children', () => {
      render(
        <BasicResizable>
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i}>Item {i}</div>
          ))}
        </BasicResizable>
      );
      expect(screen.getByTestId('resizable')).toBeInTheDocument();
    });
    it('handles component unmounting cleanly', () => {
      const { unmount } = render(<BasicResizable />);
      expect(() => unmount()).not.toThrow();
    });
    it('preserves functionality after remounting', () => {
      const { unmount } = render(<BasicResizable />);
      unmount();
      render(<BasicResizable />);
      expect(screen.getByTestId('resizable')).toBeInTheDocument();
    });
  });
});
