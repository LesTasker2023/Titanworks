import { stripTransientProps } from '@/utils/stripTransientProps';
import * as React from 'react';
import './Accordion.scss';

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: { title: string; content: React.ReactNode; disabled?: boolean }[];
  defaultOpenIndex?: number;
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ items = [], defaultOpenIndex = -1, className, ...props }, ref) => {
    // If className is provided and no defaultOpenIndex, open the first section by default
    const initialIndex = className && defaultOpenIndex === -1 ? 0 : defaultOpenIndex;
    const [openIndex, setOpenIndex] = React.useState(initialIndex);
    const [, setFocusedIndex] = React.useState(0);

    // Safety check for items
    if (!items || !Array.isArray(items)) {
      return <div ref={ref} {...stripTransientProps(props)} />;
    }

    const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setOpenIndex(openIndex === idx ? -1 : idx);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (idx + 1) % items.length;
        setFocusedIndex(nextIndex);
        // Focus the next button
        const nextButton = document.getElementById(`accordion-header-${nextIndex}`);
        nextButton?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = idx === 0 ? items.length - 1 : idx - 1;
        setFocusedIndex(prevIndex);
        // Focus the previous button
        const prevButton = document.getElementById(`accordion-header-${prevIndex}`);
        prevButton?.focus();
      }
    };

    return (
      <div ref={ref} {...stripTransientProps(props)}>
        {items.map((item, idx) => {
          const buttonId = `accordion-header-${idx}`;
          const regionId = `accordion-content-${idx}`;
          const isOpen = openIndex === idx;
          const isDisabled = item.disabled;
          return (
            <div key={idx}>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={regionId}
                disabled={isDisabled}
                className="accordion__button"
                onClick={e => {
                  e.stopPropagation();
                  if (!isDisabled) {
                    setOpenIndex(isOpen ? -1 : idx);
                  }
                }}
                onKeyDown={e => handleKeyDown(e, idx)}
              >
                {item.title}
              </button>
              <div
                id={regionId}
                role="region"
                aria-labelledby={buttonId}
                aria-label={`Content for ${item.title}`}
                hidden={!isOpen}
                className={`accordion__content${!isOpen ? ' accordion__content--hidden' : ''}${
                  className && isOpen ? ` ${className}` : ''
                }`}
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
