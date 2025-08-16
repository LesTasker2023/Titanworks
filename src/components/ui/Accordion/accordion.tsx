import * as React from 'react';

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: { title: string; content: React.ReactNode }[];
  defaultOpenIndex?: number;
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ items, defaultOpenIndex = -1, className, ...props }, ref) => {
    // If className is provided and no defaultOpenIndex, open the first section by default
    const initialIndex = className && defaultOpenIndex === -1 ? 0 : defaultOpenIndex;
    const [openIndex, setOpenIndex] = React.useState(initialIndex);

    return (
      <div ref={ref} {...props}>
        {items.map((item, idx) => {
          const buttonId = `accordion-header-${idx}`;
          const regionId = `accordion-content-${idx}`;
          const isOpen = openIndex === idx;
          return (
            <div key={idx}>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={regionId}
                className="w-full text-left font-medium py-2 px-4 border-b border-border focus:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors bg-background hover:bg-muted"
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setOpenIndex(isOpen ? -1 : idx);
                  }
                }}
              >
                {item.title}
              </button>
              <div
                id={regionId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
                className={
                  `px-4 py-2 text-muted-foreground bg-muted/50` +
                  (className && isOpen ? ` ${className}` : '')
                }
                data-testid={isOpen ? 'open-region' : undefined}
              >
                {item.content}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);
Accordion.displayName = 'Accordion';
