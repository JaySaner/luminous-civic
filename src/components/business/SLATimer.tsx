import React, { useState, useEffect } from 'react';
import { formatSLARemainingTime, isSLAEscalated } from '@/lib/business/slaEngine';
import { Clock, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface SLATimerProps {
  deadline: string;
  status: string;
}

export const SLATimer: React.FC<SLATimerProps> = ({ deadline, status }) => {
  const [timeText, setTimeText] = useState('');
  const [escalated, setEscalated] = useState(false);

  useEffect(() => {
    function updateTimer() {
      setTimeText(formatSLARemainingTime(deadline, status));
      setEscalated(isSLAEscalated(deadline, status));
    }
    updateTimer();
    const interval = setInterval(updateTimer, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, [deadline, status]);

  if (status === 'resolved' || status === 'closed') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
        <CheckCircle2 className="w-3.5 h-3.5" /> SLA Met
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${
      escalated 
        ? 'bg-rose-500/10 text-rose-400 border-rose-500/30 animate-pulse' 
        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
    }`}>
      {escalated ? <ShieldAlert className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
      {timeText}
    </span>
  );
};
