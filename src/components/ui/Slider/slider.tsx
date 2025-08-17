'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const sliderVariants = cva('relative flex w-full touch-none select-none items-center', {
  variants: {
    variant: {
      default: 'data-[orientation=vertical]:flex-col',
      success: 'data-[orientation=vertical]:flex-col',
      warning: 'data-[orientation=vertical]:flex-col',
      danger: 'data-[orientation=vertical]:flex-col',
    },
    size: {
      sm: 'h-3',
      default: 'h-4',
      lg: 'h-5',
      xl: 'h-6',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

const trackVariants = cva('relative grow overflow-hidden rounded-full bg-primary/20', {
  variants: {
    variant: {
      default: 'bg-primary/20',
      success: 'bg-green-200',
      warning: 'bg-yellow-200',
      danger: 'bg-red-200',
    },
    size: {
      sm: 'h-1',
      default: 'h-1.5',
      lg: 'h-2',
      xl: 'h-2.5',
    },
    orientation: {
      horizontal: 'w-full',
      vertical: 'w-1.5 h-full',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    orientation: 'horizontal',
  },
});

const rangeVariants = cva('absolute bg-primary', {
  variants: {
    variant: {
      default: 'bg-primary',
      success: 'bg-green-600',
      warning: 'bg-yellow-600',
      danger: 'bg-red-600',
    },
    orientation: {
      horizontal: 'h-full',
      vertical: 'w-full',
    },
  },
  defaultVariants: {
    variant: 'default',
    orientation: 'horizontal',
  },
});

const thumbVariants = cva(
  'block rounded-full border bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-primary/50',
        success: 'border-green-600/50',
        warning: 'border-yellow-600/50',
        danger: 'border-red-600/50',
      },
      size: {
        sm: 'h-3 w-3',
        default: 'h-4 w-4',
        lg: 'h-5 w-5',
        xl: 'h-6 w-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
    VariantProps<typeof sliderVariants> {
  showValue?: boolean;
  valuePosition?: 'top' | 'bottom' | 'left' | 'right';
  loading?: boolean;
  formatValue?: (value: number) => string;
}

const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      showValue = false,
      valuePosition = 'top',
      loading = false,
      formatValue,
      orientation = 'horizontal',
      value,
      defaultValue,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<number[]>(
      value || defaultValue || [0]
    );

    React.useEffect(() => {
      if (value) {
        setInternalValue(value);
      }
    }, [value]);

    const handleValueChange = React.useCallback(
      (newValue: number[]) => {
        if (!value) {
          setInternalValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [value, onValueChange]
    );

    const displayValue = React.useMemo(() => {
      const currentValue = value || internalValue;
      if (currentValue.length === 2) {
        if (formatValue) {
          return `${formatValue(currentValue[0])} – ${formatValue(currentValue[1])}`;
        }
        return `${currentValue[0]?.toString() || '0'} – ${currentValue[1]?.toString() || '0'}`;
      }
      if (formatValue && currentValue[0] !== undefined) {
        return formatValue(currentValue[0]);
      }
      return currentValue[0]?.toString() || '0';
    }, [value, internalValue, formatValue]);

    if (loading) {
      return (
        <div
          className={cn('flex items-center gap-2', sliderVariants({ variant, size, className }))}
        >
          <div className="animate-pulse rounded-full bg-muted h-1.5 w-full" />
          <div className="animate-spin w-3 h-3 border border-gray-300 border-t-gray-600 rounded-full" />
        </div>
      );
    }

    const sliderElement = (
      <SliderPrimitive.Root
        ref={ref}
        className={cn(sliderVariants({ variant, size, className }))}
        orientation={orientation}
        value={value || internalValue}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        {...props}
      >
        <SliderPrimitive.Track
          className={trackVariants({
            variant,
            size,
            orientation: orientation as 'horizontal' | 'vertical',
          })}
        >
          <SliderPrimitive.Range
            className={rangeVariants({
              variant,
              orientation: orientation as 'horizontal' | 'vertical',
            })}
          />
        </SliderPrimitive.Track>
        {/* Render one or two thumbs based on value length */}
        {(value || internalValue).map((_, i) => (
          <SliderPrimitive.Thumb key={i} className={thumbVariants({ variant, size })} />
        ))}
      </SliderPrimitive.Root>
    );

    if (!showValue) {
      return sliderElement;
    }

    // Value display positioning
    if (orientation === 'vertical') {
      return (
        <div className="flex items-center gap-2">
          {valuePosition === 'left' && (
            <span className="text-sm font-medium min-w-8 text-right">{displayValue}</span>
          )}
          {sliderElement}
          {valuePosition === 'right' && (
            <span className="text-sm font-medium min-w-8">{displayValue}</span>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {valuePosition === 'top' && (
          <div className="flex justify-center">
            <span className="text-sm font-medium">{displayValue}</span>
          </div>
        )}
        {sliderElement}
        {valuePosition === 'bottom' && (
          <div className="flex justify-center">
            <span className="text-sm font-medium">{displayValue}</span>
          </div>
        )}
      </div>
    );
  }
);

Slider.displayName = SliderPrimitive.Root.displayName;

export default Slider;
export { rangeVariants, sliderVariants, thumbVariants, trackVariants };
