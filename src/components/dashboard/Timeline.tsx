import React from 'react';
import { CheckCircle2, Clock, HardHat, AlertCircle, ShieldAlert } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export type IssueStatus = 'Processing' | 'Pending' | 'In Progress' | 'Resolved' | 'Escalated';

interface TimelineProps {
  status: IssueStatus;
  isEscalated?: boolean;
}

export const Timeline: React.FC<TimelineProps> = ({ status, isEscalated }) => {
  const steps = [
    { label: 'Processing', icon: Clock, color: 'bg-surface-container-high' },
    { label: 'Pending', icon: Clock, color: 'bg-amber-500' },
    { label: 'In Progress', icon: HardHat, color: 'bg-blue-500' },
    { label: 'Resolved', icon: CheckCircle2, color: 'bg-green-500' },
    { label: 'Escalated', icon: ShieldAlert, color: 'bg-red-500', hidden: !isEscalated }
  ].filter(s => !s.hidden);

  const currentStepIndex = steps.findIndex(s => s.label === status);

  return (
    <div className="relative flex justify-between items-start w-full py-8">
      {/* Connector Line */}
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-surface-container-high -translate-y-1/2 z-0" />
      <div 
        className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 z-0 transition-all duration-500" 
        style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
      />

      {steps.map((step, i) => {
        const isActive = i <= currentStepIndex;
        const isCurrent = i === currentStepIndex;
        const Icon = step.icon;

        return (
          <div key={step.label} className="relative z-10 flex flex-col items-center gap-2">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-4 border-white",
              isActive ? step.color : "bg-surface-container-high",
              isCurrent && "ring-4 ring-primary/20 scale-110"
            )}>
              <Icon size={18} className={isActive ? "text-white" : "text-on-surface-variant/40"} />
            </div>
            <span className={cn(
              "text-[10px] font-bold uppercase tracking-widest",
              isActive ? "text-on-surface" : "text-on-surface-variant/40"
            )}>
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
