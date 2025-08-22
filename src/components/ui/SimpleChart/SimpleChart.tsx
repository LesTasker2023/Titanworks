// EMERGENCY: Create a simple chart replacement to eliminate Recharts bloat
// This replaces complex charts with simple visual elements for Vercel 250MB limit

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
      <div className={`space-y-2 ${className}`}>
        {data.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>{item.name}</span>
              <span className="font-mono">{item.value}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="h-2 rounded-full"
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
      <div className={`space-y-2 ${className}`}>
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color || `hsl(${index * 60}, 70%, 50%)` }}
              />
              <span>{item.name}</span>
            </div>
            <span className="font-mono">
              {item.value} ({Math.round((item.value / total) * 100)}%)
            </span>
          </div>
        ))}
      </div>
    );
  }

  // Default to simple list for line charts
  return (
    <div className={`space-y-1 ${className}`}>
      {data.map((item, index) => (
        <div key={index} className="flex justify-between text-sm">
          <span>{item.name}</span>
          <span className="font-mono">{item.value}</span>
        </div>
      ))}
    </div>
  );
};
