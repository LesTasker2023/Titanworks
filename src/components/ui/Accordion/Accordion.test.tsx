import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Accordion } from './accordion';

describe('Accordion', () => {
  const items = [
    { title: 'Section 1', content: 'Content 1' },
    { title: 'Section 2', content: 'Content 2' },
    { title: 'Section 3', content: 'Content 3' },
  ];

  it('renders all section titles', () => {
    render(<Accordion items={items} />);
    items.forEach(item => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  it('opens and closes sections on click', () => {
    render(<Accordion items={items} />);
    const firstButton = screen.getByText('Section 1');
    fireEvent.click(firstButton);
    expect(screen.getByText('Content 1')).toBeVisible();
    fireEvent.click(firstButton);
    expect(screen.getByText('Content 1')).not.toBeVisible();
  });

  it('only one section is open at a time', () => {
    render(<Accordion items={items} />);
    const firstButton = screen.getByText('Section 1');
    const secondButton = screen.getByText('Section 2');
    fireEvent.click(firstButton);
    expect(screen.getByText('Content 1')).toBeVisible();
    fireEvent.click(secondButton);
    expect(screen.getByText('Content 1')).not.toBeVisible();
    expect(screen.getByText('Content 2')).toBeVisible();
  });

  it('respects defaultOpenIndex', () => {
    render(<Accordion items={items} defaultOpenIndex={2} />);
    expect(screen.getByText('Content 3')).toBeVisible();
  });

  it('applies custom className', () => {
    render(<Accordion items={items} className="custom-class" />);
    expect(screen.getByRole('region')).toHaveClass('custom-class');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<Accordion items={items} ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it('is accessible via keyboard', () => {
    render(<Accordion items={items} />);
    const firstButton = screen.getByText('Section 1');
    firstButton.focus();
    expect(firstButton).toHaveFocus();
    fireEvent.keyDown(firstButton, { key: 'Enter' });
    expect(screen.getByText('Content 1')).toBeVisible();
  });

  // --- BEGIN: MASSIVE TEST EXPANSION ---
  it('renders with a single item', () => {
    render(<Accordion items={[{ title: 'Only', content: 'Just one' }]} />);
    expect(screen.getByText('Only')).toBeInTheDocument();
    expect(screen.getByText('Just one')).not.toBeVisible();
  });

  it('renders with no items', () => {
    render(<Accordion items={[]} />);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('handles duplicate section titles', () => {
    const dupItems = [
      { title: 'Dup', content: 'A' },
      { title: 'Dup', content: 'B' },
    ];
    render(<Accordion items={dupItems} />);
    expect(screen.getAllByText('Dup').length).toBe(2);
  });

  it('renders long content and titles', () => {
    const long = 'L'.repeat(1000);
    render(<Accordion items={[{ title: long, content: long }]} />);
    const elements = screen.getAllByText(long);
    expect(elements.length).toBeGreaterThan(0);
    expect(elements[0]).toBeInTheDocument();
  });

  it('handles special characters in titles/content', () => {
    render(<Accordion items={[{ title: 'Üñîçødë', content: '<b>HTML?</b>' }]} />);
    expect(screen.getByText('Üñîçødë')).toBeInTheDocument();
    expect(screen.getByText('<b>HTML?</b>')).toBeInTheDocument();
  });

  it('does not crash with null/undefined items', () => {
    expect(() =>
      render(<Accordion items={null as unknown as Array<{ title: string; content: string }>} />)
    ).not.toThrow();
    expect(() =>
      render(
        <Accordion items={undefined as unknown as Array<{ title: string; content: string }>} />
      )
    ).not.toThrow();
  });

  it('applies ARIA attributes for accessibility', () => {
    render(<Accordion items={items} defaultOpenIndex={0} />);
    const region = screen.getByRole('region');
    expect(region).toHaveAttribute('aria-label');
  });

  it('has correct tab order for all buttons', () => {
    render(<Accordion items={items} />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach(btn => expect(btn.tabIndex).toBe(0));
  });

  it('supports keyboard navigation with ArrowDown/ArrowUp', () => {
    render(<Accordion items={items} />);
    const buttons = screen.getAllByRole('button');
    buttons[0].focus();
    fireEvent.keyDown(buttons[0], { key: 'ArrowDown' });
    expect(buttons[1]).toHaveFocus();
    fireEvent.keyDown(buttons[1], { key: 'ArrowUp' });
    expect(buttons[0]).toHaveFocus();
  });

  it('does not open disabled sections', () => {
    type DisabledAccordionItem = { title: string; content: string; disabled?: boolean };
    const disabledItems: DisabledAccordionItem[] = [
      { title: 'A', content: 'A', disabled: true },
      { title: 'B', content: 'B' },
    ];
    render(<Accordion items={disabledItems} />);
    const firstButton = screen.getByRole('button', { name: 'A' });
    expect(firstButton).toBeDisabled();
    fireEvent.click(firstButton);
    // Content should remain hidden since the section is disabled
    const contentDiv = document.getElementById('accordion-content-0');
    expect(contentDiv).toHaveAttribute('hidden');
  });

  it('handles rapid toggling without error', () => {
    render(<Accordion items={items} />);
    const firstButton = screen.getByText('Section 1');
    for (let i = 0; i < 10; i++) {
      fireEvent.click(firstButton);
    }
    // After 10 clicks (even number), content should be hidden since it starts closed
    const contentDiv = document.getElementById('accordion-content-0');
    expect(contentDiv).toHaveAttribute('hidden');
  });

  it('renders correctly with a large number of items', () => {
    const many = Array.from({ length: 100 }, (_, i) => ({ title: `T${i}`, content: `C${i}` }));
    render(<Accordion items={many} />);
    expect(screen.getByText('T99')).toBeInTheDocument();
  });

  it('matches snapshot when all closed', () => {
    const { asFragment } = render(<Accordion items={items} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot when one open', () => {
    const { asFragment } = render(<Accordion items={items} defaultOpenIndex={1} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders RTL correctly', () => {
    const { container } = render(<Accordion items={items} dir="rtl" />);
    expect(container.firstChild).toHaveAttribute('dir', 'rtl');
  });

  it('does not propagate click events if stopped', () => {
    const handleClick = vi.fn();
    render(
      <div onClick={handleClick}>
        <Accordion items={[{ title: 'A', content: 'A' }]} />
      </div>
    );
    fireEvent.click(screen.getByRole('button', { name: 'A' }));
    // Accordion should stop propagation, so handleClick should not be called
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('handles missing required props gracefully', () => {
    expect(() =>
      render(
        <Accordion items={undefined as unknown as Array<{ title: string; content: string }>} />
      )
    ).not.toThrow();
  });

  it('works inside a form', () => {
    render(
      <form>
        <Accordion items={items} />
      </form>
    );
    expect(screen.getByText('Section 1')).toBeInTheDocument();
  });

  it('works inside a modal/portal', () => {
    const Modal = ({ children }: { children: React.ReactNode }) => {
      return <div id="modal-root">{children}</div>;
    };
    render(
      <Modal>
        <Accordion items={items} />
      </Modal>
    );
    expect(screen.getByText('Section 1')).toBeInTheDocument();
  });

  it('forwards ref to HTMLDivElement', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Accordion items={items} ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it('supports dark mode/theming', () => {
    render(<Accordion items={items} data-theme="dark" />);
    // The data-theme attribute should be on the root div container
    const container = screen.getByRole('button', { name: 'Section 1' }).parentElement
      ?.parentElement;
    expect(container).toHaveAttribute('data-theme', 'dark');
  });

  it('does not break on previously fixed bug: empty string title', () => {
    render(<Accordion items={[{ title: '', content: 'No title' }]} />);
    expect(screen.getByText('No title')).toBeInTheDocument();
  });

  it('does not break on previously fixed bug: null content', () => {
    render(<Accordion items={[{ title: 'T', content: null }]} />);
    expect(screen.getByText('T')).toBeInTheDocument();
  });
  // --- END: MASSIVE TEST EXPANSION ---
});
