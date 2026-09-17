import React from 'react';

interface ChartLineProps {
  data: { label: string; value: number }[];
  title?: string;
}

export const ChartLine: React.FC<ChartLineProps> = ({ data, title }) => {
  if (data.length === 0) return null;
  const maxValue = Math.max(...data.map(d => d.value), 1);

  return (
    <div className="space-y-4">
      {title && <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</h4>}
      <div className="h-44 flex items-end gap-2 pt-6 pb-2 border-b border-slate-800 px-2">
        {data.map((item, idx) => {
          const heightPercent = (item.value / maxValue) * 100;
          return (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
              <span className="text-[10px] font-mono text-cyan-400 font-bold opacity-0 group-hover:opacity-100 transition">
                {item.value}
              </span>
              <div
                style={{ height: `${Math.max(heightPercent, 8)}%` }}
                className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-lg transition-all group-hover:from-blue-500 group-hover:to-cyan-300 shadow-lg shadow-cyan-950/30"
              />
              <span className="text-[10px] text-slate-400 font-medium truncate w-full text-center">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
