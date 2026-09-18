import React from 'react';
import type { BusinessStatus, IssuePriority, IssueStatus } from '@/lib/business/types';

export const StatusBadge: React.FC<{ status: IssueStatus | BusinessStatus | string }> = ({ status }) => {
  const styles: Record<string, string> = {
    // Business statuses
    active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    inactive: 'bg-slate-500/10 text-slate-400 border-slate-500/30',
    suspended: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    // Issue statuses
    new: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    in_progress: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    under_review: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    resolved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    closed: 'bg-slate-500/10 text-slate-400 border-slate-500/30',
    escalated: 'bg-rose-500/10 text-rose-400 border-rose-500/30 animate-pulse',
  };

  const label = status.replace('_', ' ').toUpperCase();

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[status.toLowerCase()] || 'bg-slate-800 text-slate-300 border-slate-700'}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-75"></span>
      {label}
    </span>
  );
};

export const PriorityBadge: React.FC<{ priority: IssuePriority }> = ({ priority }) => {
  const p = (priority || '').toString().toLowerCase();
  const styleMap: Record<string, string> = {
    low: 'bg-slate-500/10 text-slate-400 border-slate-500/30',
    medium: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    high: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    critical: 'bg-rose-500/10 text-rose-400 border-rose-500/30 shadow-sm shadow-rose-900/30'
  };
  const style = styleMap[p] || 'bg-slate-500/10 text-slate-400 border-slate-500/30';
  const label = (priority || '').toString().charAt(0).toUpperCase() + (priority || '').toString().slice(1).toLowerCase();

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold border ${style}`}>
      {label}
    </span>
  );
};
