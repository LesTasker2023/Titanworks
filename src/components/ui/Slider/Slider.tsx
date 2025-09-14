'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';
import './Slider.scss';

import { cn } from '@/lib/utils';

// Helper function to generate BEM classes based on props
function getSliderClasses(variant: string = 'default', size: string = 'default'): string {
  return cn('slider', `slider--variant-${variant}`, `slider--size-${size}`);
}

function getTrackClasses(
  variant: string = 'default',
  size: string = 'default',
  orientation: string = 'horizontal'
): string {
  return cn(
    'slider__track',
    `slider__track--variant-${variant}`,
    `slider__track--size-${size}`,
    `slider__track--orientation-${orientation}`
  );
}

function getRangeClasses(variant: string = 'default', orientation: string = 'horizontal'): string {
  return cn(
    'slider__range',
    `slider__range--variant-${variant}`,
    `slider__range--orientation-${orientation}`
  );
}

function getThumbClasses(variant: string = 'default', size: string = 'default'): string {
  return cn('slider__thumb', `slider__thumb--variant-${variant}`, `slider__thumb--size-${size}`);
}

export interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  variant?: 'default' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'default' | 'lg' | 'xl';
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
        <div className={cn('slider__loading', className)}>
          <div className="slider__loading-track" />
          <div className="slider__loading-spinner" />
        </div>
      );
    }

    const sliderElement = (
      <SliderPrimitive.Root
        ref={ref}
        className={cn(getSliderClasses(variant, size), className)}
        orientation={orientation}
        value={value || internalValue}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        {...props}
      >
        <SliderPrimitive.Track
          className={getTrackClasses(variant, size, orientation as 'horizontal' | 'vertical')}
        >
          <SliderPrimitive.Range
            className={getRangeClasses(variant, orientation as 'horizontal' | 'vertical')}
          />
        </SliderPrimitive.Track>
        {/* Render one or two thumbs based on value length */}
        {(value || internalValue).map((_, i) => (
          <SliderPrimitive.Thumb key={i} className={getThumbClasses(variant, size)} />
        ))}
      </SliderPrimitive.Root>
    );

    if (!showValue) {
      return sliderElement;
    }

    // Value display positioning
    if (orientation === 'vertical') {
      return (
        <div className="slider__value-display">
          {valuePosition === 'left' && (
            <span className="slider__value-display-value">{displayValue}</span>
          )}
          {sliderElement}
          {valuePosition === 'right' && (
            <span className="slider__value-display-value">{displayValue}</span>
          )}
        </div>
      );
    }

    return (
      <div className="slider__container">
        {valuePosition === 'top' && (
          <div className="slider__value-display-center">
            <span className="slider__value-display-value">{displayValue}</span>
          </div>
        )}
        {sliderElement}
        {valuePosition === 'bottom' && (
          <div className="slider__value-display-center">
            <span className="slider__value-display-value">{displayValue}</span>
          </div>
        )}
      </div>
    );
  }
);

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
