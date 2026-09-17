import React from 'react';

interface ChartDonutProps {
  data: { label: string; value: number; color: string }[];
  title?: string;
}

export const ChartDonut: React.FC<ChartDonutProps> = ({ data, title }) => {
  const total = data.reduce((acc, item) => acc + item.value, 0);
  if (total === 0) {
    return <div className="text-xs text-slate-500 py-6 text-center">No category data recorded.</div>;
  }

  let accumulatedAngle = 0;
  const slices = data.map((item) => {
    const percentage = item.value / total;
    const angle = percentage * 360;
    const startAngle = accumulatedAngle;
    accumulatedAngle += angle;
    return { ...item, percentage, startAngle, angle };
  });

  return (
    <div className="space-y-4">
      {title && <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</h4>}
      <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
        {/* SVG Donut */}
        <div className="relative w-36 h-36">
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            {slices.map((slice, i) => {
              const strokeDasharray = `${slice.percentage * 282.7} 282.7`;
              const strokeDashoffset = -((slice.startAngle / 360) * 282.7);
              return (
                <circle
                  key={i}
                  cx="50"
                  cy="50"
                  r="45"
                  fill="transparent"
                  stroke={slice.color}
                  strokeWidth="10"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-500"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-xl font-extrabold text-white">{total}</span>
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Total</span>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-2 flex-1">
          {data.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md" style={{ backgroundColor: item.color }} />
                <span className="text-slate-300 font-medium">{item.label}</span>
              </div>
              <span className="font-mono text-white font-bold">{item.value} ({Math.round((item.value / total) * 100)}%)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
