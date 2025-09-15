'use client';

import * as React from 'react';
// EMERGENCY: Import only used Recharts components instead of entire library
import { Legend, ResponsiveContainer, Tooltip } from 'recharts';

import { cn } from '@/lib/utils';
import { stripTransientProps } from '@/utils/stripTransientProps';

interface ChartPayloadItem {
  name?: string;
  dataKey?: string;
  value?: unknown;
  payload?: Record<string, unknown>;
  color?: string;
  fill?: string;
}

// Format: { THEME_NAME: CSS_SELECTOR }

const THEMES = { light: '', dark: '.dark' } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />');
  }

  return context;
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    config: ChartConfig;
    children: React.ComponentProps<typeof ResponsiveContainer>['children'];
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn('chart', className)}
        {...stripTransientProps({
          active: undefined,
          hover: undefined,
          loading: undefined,
          error: undefined,
          ...props,
        })}
      >
        <ChartStyle id={chartId} config={config} />
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = 'Chart';

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([, config]) => config.theme || config.color);

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join('\n')}
}
`
          )
          .join('\n'),
      }}
    />
  );
};

const ChartTooltip = Tooltip;

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof Tooltip> &
    React.ComponentProps<'div'> & {
      hideLabel?: boolean;
      hideIndicator?: boolean;
      indicator?: 'line' | 'dot' | 'dashed';
      nameKey?: string;
      labelKey?: string;
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = 'dot',
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart();

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null;
      }

      const [item] = payload;
      const key = `${labelKey || item?.dataKey || item?.name || 'value'}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      const value =
        !labelKey && typeof label === 'string'
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label;

      if (labelFormatter) {
        return (
          <div className={cn('chart-tooltip__label', labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        );
      }

      if (!value) {
        return null;
      }

      return <div className={cn('chart-tooltip__label', labelClassName)}>{value}</div>;
    }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

    if (!active || !payload?.length) {
      return null;
    }

    const nestLabel = payload.length === 1 && indicator !== 'dot';

    return (
      <div ref={ref} className={cn('chart-tooltip', className)}>
        {!nestLabel ? tooltipLabel : null}
        <div className="chart-tooltip__content">
          {(payload as Array<Record<string, unknown>>).map(
            (item: Record<string, unknown>, index: number) => {
              const key = `${nameKey || item.name || item.dataKey || 'value'}`;
              const itemConfig = getPayloadConfigFromPayload(config, item, key);
              const indicatorColor =
                color || (item.payload as Record<string, unknown>)?.fill || item.color;

              return (
                <div
                  key={String(item.dataKey || index)}
                  className={cn(
                    'chart-tooltip__item',
                    indicator === 'dot' && 'chart-tooltip__item--dot'
                  )}
                >
                  {item?.value !== undefined && item.name ? (
                    <div className="chart-tooltip__item-simple">
                      <span className="chart-tooltip__item-name">
                        {itemConfig?.label || String(item.name)}
                      </span>
                      <span className="chart-tooltip__item-value">{String(item.value)}</span>
                    </div>
                  ) : (
                    <>
                      {itemConfig?.icon ? (
                        <itemConfig.icon />
                      ) : (
                        !hideIndicator && (
                          <div
                            className={cn('chart-tooltip__indicator', {
                              'chart-tooltip__indicator--dot': indicator === 'dot',
                              'chart-tooltip__indicator--line': indicator === 'line',
                              'chart-tooltip__indicator--dashed': indicator === 'dashed',
                              'chart-tooltip__indicator--nested':
                                nestLabel && indicator === 'dashed',
                            })}
                            style={
                              {
                                '--color-bg': indicatorColor,
                                '--color-border': indicatorColor,
                              } as React.CSSProperties
                            }
                          />
                        )
                      )}
                      <div
                        className={cn(
                          'chart-tooltip__item-content',
                          nestLabel
                            ? 'chart-tooltip__item-content--nested'
                            : 'chart-tooltip__item-content--normal'
                        )}
                      >
                        <div className="chart-tooltip__item-details">
                          {nestLabel ? tooltipLabel : null}
                          <span className="chart-tooltip__item-name">
                            {itemConfig?.label || String(item.name || '')}
                          </span>
                        </div>
                        {item.value !== undefined && item.value !== null && (
                          <span className="chart-tooltip__item-value">{String(item.value)}</span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>
    );
  }
);
ChartTooltipContent.displayName = 'ChartTooltip';

const ChartLegend = Legend;

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    hideIcon?: boolean;
    nameKey?: string;
    payload?: Array<Record<string, unknown>>;
    verticalAlign?: 'top' | 'bottom';
  }
>(({ className, hideIcon = false, payload = [], verticalAlign = 'bottom', nameKey }, ref) => {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn(
        'chart-legend',
        verticalAlign === 'top' ? 'chart-legend--top' : 'chart-legend--bottom',
        className
      )}
    >
      {payload.map((item: Record<string, unknown>) => {
        const key = `${nameKey || item.dataKey || 'value'}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);

        return (
          <div key={String(item.value || Math.random())} className="chart-legend__item">
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="chart-legend__indicator"
                style={{
                  backgroundColor: String(item.color || '#000'),
                }}
              />
            )}
            {itemConfig?.label}
          </div>
        );
      })}
    </div>
  );
});
ChartLegendContent.displayName = 'ChartLegend';

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
  if (typeof payload !== 'object' || payload === null) {
    return undefined;
  }

  const payloadPayload =
    'payload' in payload && typeof payload.payload === 'object' && payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  if (key in payload && typeof payload[key as keyof typeof payload] === 'string') {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === 'string'
  ) {
    configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string;
  }

  return configLabelKey in config ? config[configLabelKey] : config[key as keyof typeof config];
}

export {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
};
