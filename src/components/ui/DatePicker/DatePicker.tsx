'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/Button';
import { Calendar } from '@/components/ui/Calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { cn } from '@/lib/utils';
import './DatePicker.scss';

export interface DatePickerProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  disabledDates?: (date: Date) => boolean;
  dateFormat?: string;
}

const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      date,
      onDateChange,
      placeholder = 'Pick a date',
      disabled = false,
      className,
      disabledDates,
      dateFormat = 'PPP',
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            disabled={disabled}
            className={cn(
              'datePicker__trigger',
              !date && 'datePicker__trigger--placeholder',
              className
            )}
            {...props}
          >
            <CalendarIcon className="datePicker__icon" />
            {date ? format(date, dateFormat) : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="datePicker__content" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={selectedDate => {
              onDateChange?.(selectedDate);
              setOpen(false);
            }}
            disabled={disabledDates}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );
  }
);

DatePicker.displayName = 'DatePicker';

export { DatePicker };
