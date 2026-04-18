import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, ShieldAlert, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { IssueStatus } from './Timeline';

export type { IssueStatus };

export interface Issue {
  id: string;
  title: string;
  description: string;
  location: string;
  status: IssueStatus;
  image: string;
  createdAt: string; // ISO string
  authority: string;
  category: string;
}

interface IssueCardProps {
  issue: Issue;
  onClick: (issue: Issue) => void;
}

export const IssueCard: React.FC<IssueCardProps> = ({ issue, onClick }) => {
  const isEscalated = (dateStr: string) => {
    const created = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.ceil((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays > 15;
  };

  const escalated = isEscalated(issue.createdAt);

  const getStatusColor = (status: IssueStatus) => {
    switch (status) {
      case 'Resolved': return "bg-green-100 text-green-700";
      case 'In Progress': return "bg-blue-100 text-blue-700";
      case 'Escalated': return "bg-red-100 text-red-700";
      case 'Processing': return "bg-surface-container-high text-on-surface-variant";
      default: return "bg-amber-100 text-amber-700";
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onClick(issue)}
      className={cn(
        "group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all cursor-pointer border-2",
        escalated ? "border-red-500/30" : "border-transparent"
      )}
    >
      <div className="flex gap-6 items-start">
        <div className="relative w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 shadow-inner">
          <img 
            src={issue.image} 
            alt={issue.title} 
            className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
            referrerPolicy="no-referrer"
          />
          {escalated && (
            <div className="absolute top-2 left-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg">
              <ShieldAlert size={14} />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <div className="flex flex-wrap gap-2">
              <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", getStatusColor(issue.status))}>
                {issue.status}
              </span>
              {escalated && (
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider animate-pulse">
                  Escalated to Media
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">
              {new Date(issue.createdAt).toLocaleDateString()}
            </span>
          </div>

          <h3 className="text-xl font-bold font-headline text-on-surface mb-2 truncate group-hover:text-primary transition-colors">
            {issue.title}
          </h3>
          <p className="text-on-surface-variant text-sm line-clamp-2 mb-4 leading-relaxed">
            {issue.description}
          </p>

          <div className="flex items-center gap-4 text-xs font-bold text-on-surface-variant/60">
            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="text-primary" />
              <span className="truncate">{issue.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} />
              <span>{issue.category}</span>
            </div>
          </div>
        </div>

        <div className="self-center p-2 rounded-full bg-surface-container-low text-on-surface-variant/20 group-hover:bg-primary/10 group-hover:text-primary transition-all">
          <ChevronRight size={24} />
        </div>
      </div>
    </motion.div>
  );
};
