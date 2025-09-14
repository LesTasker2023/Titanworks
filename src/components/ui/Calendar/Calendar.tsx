'use client';

import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import * as React from 'react';
import { DayButton, DayPicker, getDefaultClassNames } from 'react-day-picker';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import './Calendar.scss';

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant'];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('calendar', className)}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: date => date.toLocaleString('default', { month: 'short' }),
        ...formatters,
      }}
      classNames={{
        root: cn('calendar__root', defaultClassNames.root),
        months: cn('calendar__months', defaultClassNames.months),
        month: cn('calendar__month', defaultClassNames.month),
        nav: cn('calendar__nav', defaultClassNames.nav),
        button_previous: cn(
          `button button--${buttonVariant} button--icon`,
          'calendar__button-previous',
          defaultClassNames.button_previous
        ),
        button_next: cn(
          `button button--${buttonVariant} button--icon`,
          'calendar__button-next',
          defaultClassNames.button_next
        ),
        month_caption: cn('calendar__month-caption', defaultClassNames.month_caption),
        dropdowns: cn('calendar__dropdowns', defaultClassNames.dropdowns),
        dropdown_root: cn('calendar__dropdown-root', defaultClassNames.dropdown_root),
        dropdown: cn('calendar__dropdown', defaultClassNames.dropdown),
        caption_label: cn(
          'calendar__caption-label',
          captionLayout === 'label'
            ? 'calendar__caption-label--label'
            : 'calendar__caption-label--button',
          defaultClassNames.caption_label
        ),
        table: 'calendar__table',
        weekdays: cn('calendar__weekdays', defaultClassNames.weekdays),
        weekday: cn('calendar__weekday', defaultClassNames.weekday),
        week: cn('calendar__week', defaultClassNames.week),
        week_number_header: cn(
          'calendar__week-number-header',
          defaultClassNames.week_number_header
        ),
        week_number: cn('calendar__week-number', defaultClassNames.week_number),
        day: cn('calendar__day', defaultClassNames.day),
        range_start: cn('calendar__range-start', defaultClassNames.range_start),
        range_middle: cn('calendar__range-middle', defaultClassNames.range_middle),
        range_end: cn('calendar__range-end', defaultClassNames.range_end),
        today: cn('calendar__today', defaultClassNames.today),
        outside: cn('calendar__outside', defaultClassNames.outside),
        disabled: cn('calendar__disabled', defaultClassNames.disabled),
        hidden: cn('calendar__hidden', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />;
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return <ChevronLeftIcon className={cn('calendar__chevron', className)} {...props} />;
          }

          if (orientation === 'right') {
            return <ChevronRightIcon className={cn('calendar__chevron', className)} {...props} />;
          }

          return <ChevronDownIcon className={cn('calendar__chevron', className)} {...props} />;
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="calendar__week-number">{children}</div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <div
      className={cn('calendar-day-container', {
        'calendar-day-container--selected': modifiers.selected,
      })}
      style={
        modifiers.selected
          ? {
              background: 'var(--brand-primary)',
              borderRadius: '6px',
              padding: '0px',
            }
          : {}
      }
    >
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        data-day={day.date.toLocaleDateString()}
        data-selected-single={
          modifiers.selected &&
          !modifiers.range_start &&
          !modifiers.range_end &&
          !modifiers.range_middle
        }
        data-range-start={modifiers.range_start}
        data-range-end={modifiers.range_end}
        data-range-middle={modifiers.range_middle}
        className={cn(
          'calendar-day-button',
          {
            'calendar-day-button--today': modifiers.today,
            'calendar-day-button--selected': modifiers.selected,
            'calendar-day-button--range-middle': modifiers.range_middle,
            'calendar-day-button--range-start': modifiers.range_start,
            'calendar-day-button--range-end': modifiers.range_end,
          },
          defaultClassNames.day,
          className
        )}
        style={
          modifiers.selected
            ? ({
                '--tw-ring-color': 'var(--brand-primary)',
                outlineColor: 'var(--brand-primary)',
                background: 'var(--brand-primary) !important',
                color: '#ffffff !important',
                border: '2px solid var(--brand-primary) !important',
                fontWeight: '600',
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
              } as React.CSSProperties & { '--tw-ring-color': string })
            : ({
                '--tw-ring-color': 'var(--brand-primary)',
                outlineColor: 'var(--brand-primary)',
              } as React.CSSProperties & { '--tw-ring-color': string })
        }
        {...props}
      />
    </div>
  );
}

export { Calendar, CalendarDayButton };
