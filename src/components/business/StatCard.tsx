import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color?: 'blue' | 'emerald' | 'amber' | 'purple' | 'rose' | 'cyan';
  trend?: {
    value: string;
    isUp: boolean;
  };
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color = 'blue',
  trend
}) => {
  const colorStyles = {
    blue: 'from-blue-500/10 to-indigo-500/5 text-blue-400 border-blue-500/20 icon-bg-blue-500/20',
    emerald: 'from-emerald-500/10 to-teal-500/5 text-emerald-400 border-emerald-500/20 icon-bg-emerald-500/20',
    amber: 'from-amber-500/10 to-yellow-500/5 text-amber-400 border-amber-500/20 icon-bg-amber-500/20',
    purple: 'from-purple-500/10 to-fuchsia-500/5 text-purple-400 border-purple-500/20 icon-bg-purple-500/20',
    rose: 'from-rose-500/10 to-pink-500/5 text-rose-400 border-rose-500/20 icon-bg-rose-500/20',
    cyan: 'from-cyan-500/10 to-sky-500/5 text-cyan-400 border-cyan-500/20 icon-bg-cyan-500/20',
  };

  return (
    <div className={`p-5 rounded-2xl bg-gradient-to-br ${colorStyles[color]} border backdrop-blur-xl shadow-lg transition-all hover:scale-[1.01]`}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">{title}</p>
        <div className={`p-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <h3 className="text-3xl font-extrabold text-white tracking-tight">{value}</h3>
        {trend && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${trend.isUp ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
            {trend.isUp ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>
      {subtitle && <p className="mt-1 text-xs text-slate-400 font-medium">{subtitle}</p>}
    </div>
  );
};
