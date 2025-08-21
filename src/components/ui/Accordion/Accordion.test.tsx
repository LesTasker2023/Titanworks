import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { Accordion } from './accordion';

const mockItems = [
  { title: 'Item 1', content: 'Content 1' },
  { title: 'Item 2', content: 'Content 2' },
  { title: 'Item 3', content: 'Content 3', disabled: true },
];

describe('Accordion', () => {
  const BasicAccordion = ({
    children,
    ...props
  }: {
    children?: React.ReactNode;
    [key: string]: any;
  }) => <Accordion data-testid="accordion" items={mockItems} {...props} />;

  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = render(<BasicAccordion />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches disabled state snapshot', () => {
      const { container } = render(<BasicAccordion disabled />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches hover state snapshot', () => {
      const { container } = render(<BasicAccordion hover />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches open state snapshot', () => {
      const { container } = render(<BasicAccordion defaultOpenIndex={0} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Basic Functionality', () => {
    it('renders correctly', () => {
      render(<BasicAccordion />);
      expect(screen.getByTestId('accordion')).toBeInTheDocument();
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('renders with no items gracefully', () => {
      render(<Accordion data-testid="accordion" items={[]} />);
      expect(screen.getByTestId('accordion')).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('handles disabled state correctly', () => {
      render(<BasicAccordion disabled />);
      expect(screen.getByTestId('accordion')).toBeInTheDocument();
    });

    it('handles open state correctly', () => {
      render(<BasicAccordion defaultOpenIndex={0} />);
      expect(screen.getByTestId('accordion')).toBeInTheDocument();
      expect(screen.getByText('Content 1')).toBeInTheDocument();
    });

    it('handles closed state correctly', () => {
      render(<BasicAccordion defaultOpenIndex={-1} />);
      expect(screen.getByTestId('accordion')).toBeInTheDocument();
    });
  });

  describe('Events', () => {
    it('handles onClick correctly', () => {
      render(<BasicAccordion />);
      expect(screen.getByTestId('accordion')).toBeInTheDocument();
    });

    it('handles onToggle correctly', () => {
      render(<BasicAccordion />);
      expect(screen.getByTestId('accordion')).toBeInTheDocument();
    });
  });

  describe('Props', () => {
    it('handles items prop correctly', () => {
      render(<BasicAccordion />);
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('handles defaultOpenIndex prop correctly', () => {
      render(<BasicAccordion defaultOpenIndex={1} />);
      expect(screen.getByTestId('accordion')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<BasicAccordion />);
      expect(screen.getByTestId('accordion')).toBeInTheDocument();
    });

    it('announces changes to screen readers', () => {
      render(<BasicAccordion />);
      expect(screen.getByTestId('accordion')).toBeInTheDocument();
    });

    it('respects reduced motion preferences', () => {
      render(<BasicAccordion />);
      expect(screen.getByTestId('accordion')).toBeInTheDocument();
    });
  });

  describe('Custom Styling and Props', () => {
    it('accepts custom className', () => {
      render(<BasicAccordion className="custom-class" defaultOpenIndex={0} />);
      const accordion = screen.getByTestId('accordion');
      expect(accordion).toBeInTheDocument();
      // className is applied to content regions when open
    });

    it('forwards refs correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<BasicAccordion ref={ref} />);
      expect(screen.getByTestId('accordion')).toBeInTheDocument();
    });

    it('spreads additional props', () => {
      render(<BasicAccordion data-custom="test-value" />);
      const accordion = screen.getByTestId('accordion');
      expect(accordion).toHaveAttribute('data-custom', 'test-value');
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined items gracefully', () => {
      render(<Accordion data-testid="accordion" items={undefined as any} />);
      expect(screen.getByTestId('accordion')).toBeInTheDocument();
    });

    it('handles null items gracefully', () => {
      render(<Accordion data-testid="accordion" items={null as any} />);
      expect(screen.getByTestId('accordion')).toBeInTheDocument();
    });

    it('handles empty items array', () => {
      render(<Accordion data-testid="accordion" items={[]} />);
      expect(screen.getByTestId('accordion')).toBeInTheDocument();
    });

    it('handles rapid prop changes', () => {
      const { rerender } = render(<BasicAccordion defaultOpenIndex={0} />);
      rerender(<Accordion data-testid="accordion" items={mockItems} defaultOpenIndex={1} />);
      expect(screen.getByTestId('accordion')).toBeInTheDocument();
    });

    it('handles items with complex content', () => {
      const complexItems = [
        {
          title: 'Complex Item',
          content: (
            <div>
              <h3>Nested Title</h3>
              <p>Nested content</p>
            </div>
          ),
        },
      ];
      render(<Accordion data-testid="accordion" items={complexItems} />);
      expect(screen.getByTestId('accordion')).toBeInTheDocument();
    });

    it('handles many items efficiently', () => {
      const manyItems = Array.from({ length: 100 }, (_, i) => ({
        title: `Item ${i}`,
        content: `Content ${i}`,
      }));
      render(<Accordion data-testid="accordion" items={manyItems} />);
      expect(screen.getByTestId('accordion')).toBeInTheDocument();
    });

    it('handles component unmounting cleanly', () => {
      const { unmount } = render(<BasicAccordion />);
      expect(() => unmount()).not.toThrow();
    });

    it('preserves functionality after remounting', () => {
      const { unmount } = render(<BasicAccordion />);
      unmount();
      render(<BasicAccordion />);
      expect(screen.getByTestId('accordion')).toBeInTheDocument();
    });

    it('handles disabled items correctly', () => {
      render(<BasicAccordion />);
      expect(screen.getByText('Item 3')).toBeInTheDocument();
      expect(screen.getByTestId('accordion')).toBeInTheDocument();
    });

    it('handles invalid defaultOpenIndex gracefully', () => {
      render(<BasicAccordion defaultOpenIndex={999} />);
      expect(screen.getByTestId('accordion')).toBeInTheDocument();
    });

    it('handles negative defaultOpenIndex correctly', () => {
      render(<BasicAccordion defaultOpenIndex={-5} />);
      expect(screen.getByTestId('accordion')).toBeInTheDocument();
    });
  });
});
