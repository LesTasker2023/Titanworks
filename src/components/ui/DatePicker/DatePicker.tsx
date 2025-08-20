'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';

import Button from '@/components/ui/Button/button';
import { Calendar } from '@/components/ui/Calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover/PopoverReal';
import { cn } from '@/lib/utils';

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
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground',
              className
            )}
            {...props}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, dateFormat) : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
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
