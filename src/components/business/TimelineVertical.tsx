import React from 'react';
import type { IssueTimelineEvent } from '@/lib/business/types';
import { CheckCircle2, Clock, AlertCircle, User, FileText, ArrowRight } from 'lucide-react';

export const TimelineVertical: React.FC<{ events: IssueTimelineEvent[] }> = ({ events }) => {
  if (events.length === 0) {
    return <div className="text-xs text-slate-500 py-4 text-center">No timeline history recorded yet.</div>;
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'submitted': return <FileText className="w-4 h-4 text-cyan-400" />;
      case 'assigned': return <User className="w-4 h-4 text-blue-400" />;
      case 'status_changed': return <Clock className="w-4 h-4 text-amber-400" />;
      case 'escalated': return <AlertCircle className="w-4 h-4 text-rose-400" />;
      default: return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
      {events.map((evt) => (
        <div key={evt.id} className="relative group">
          {/* Node Icon */}
          <div className="absolute -left-6 top-0.5 p-1 rounded-full bg-slate-900 border border-slate-700">
            {getActionIcon(evt.action)}
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 shadow-md space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white capitalize">{evt.action.replace('_', ' ')}</span>
              <span className="text-[11px] text-slate-400 font-mono">
                {new Date(evt.timestamp).toLocaleString()}
              </span>
            </div>

            <p className="text-xs text-slate-300 font-medium">{evt.notes}</p>

            <div className="flex items-center gap-2 text-[10px] text-slate-400 pt-1">
              <span>By <strong className="text-slate-200">{evt.actorName}</strong></span>
              <span>•</span>
              <span className="capitalize text-cyan-400 font-semibold">{evt.actorRole}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
