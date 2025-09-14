// EMERGENCY: Create a simple chart replacement to eliminate Recharts bloat
// This replaces complex charts with simple visual elements for Vercel 250MB limit

import './SimpleChart.scss';

export const SimpleChart = ({
  data,
  type = 'bar',
  className = '',
}: {
  data: Array<{ name: string; value: number; color?: string }>;
  type?: 'bar' | 'pie' | 'line';
  className?: string;
}) => {
  const maxValue = Math.max(...data.map(d => d.value));

  if (type === 'bar') {
    return (
      <div className={`simple-chart__bar-container ${className}`}>
        {data.map((item, index) => (
          <div key={index} className="simple-chart__bar-item">
            <div className="simple-chart__bar-header">
              <span className="simple-chart__bar-label">{item.name}</span>
              <span className="simple-chart__bar-value">{item.value}</span>
            </div>
            <div className="simple-chart__bar-track">
              <div
                className="simple-chart__bar-progress"
                style={{
                  width: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: item.color || 'hsl(var(--surface-interactive))',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'pie') {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    return (
      <div className={`simple-chart__pie-container ${className}`}>
        {data.map((item, index) => (
          <div key={index} className="simple-chart__pie-item">
            <div className="simple-chart__pie-label-group">
              <div
                className="simple-chart__pie-indicator"
                style={{ backgroundColor: item.color || `hsl(${index * 60}, 70%, 50%)` }}
              />
              <span className="simple-chart__pie-label">{item.name}</span>
            </div>
            <span className="simple-chart__pie-value">
              {item.value} ({Math.round((item.value / total) * 100)}%)
            </span>
          </div>
        ))}
      </div>
    );
  }

  // Default to simple list for line charts
  return (
    <div className={`simple-chart__line-container ${className}`}>
      {data.map((item, index) => (
        <div key={index} className="simple-chart__line-item">
          <span className="simple-chart__line-label">{item.name}</span>
          <span className="simple-chart__line-value">{item.value}</span>
        </div>
      ))}
    </div>
  );
};
