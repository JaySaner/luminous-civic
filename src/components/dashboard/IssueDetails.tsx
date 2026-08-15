import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Calendar, ShieldAlert, MessageSquare, CheckCircle2, AlertTriangle, ArrowLeft, Share2, Printer, Search } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Issue, IssueStatus } from './IssueCard';
import { Timeline } from './Timeline';
import { FeedbackModal } from './FeedbackModal';

interface IssueDetailsProps {
  issue: Issue | null;
  onClose: () => void;
  onUpdateStatus: (id: string, newStatus: IssueStatus) => void;
  onFeedbackSubmit: (id: string, feedback: any) => void;
  onEscalate: (id: string) => void;
}

export const IssueDetails: React.FC<IssueDetailsProps> = ({ issue, onClose, onUpdateStatus, onFeedbackSubmit, onEscalate }) => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const navigate = useNavigate();

  if (!issue) return null;

  const isEscalated = (dateStr: string) => {
    const created = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.ceil((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays > 15;
  };

  const escalated = isEscalated(issue.createdAt);

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-y-0 right-0 z-40 w-full max-w-2xl bg-surface shadow-2xl border-l border-outline-variant overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-outline-variant px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-surface-container-low rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-on-surface-variant" />
          </button>
          <div>
            <h2 className="text-xl font-bold font-headline text-on-surface">Issue Details</h2>
            <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">Case ID: {issue.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              onClose();
              navigate(`/track?id=${issue.id}`);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold hover:bg-primary/20 transition-colors"
          >
            <Search size={14} />
            Track Case
          </button>
          <button className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant">
            <Share2 size={20} />
          </button>
          <button className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant">
            <Printer size={20} />
          </button>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="p-8 space-y-10">
        {/* Escalation Banner */}
        {escalated && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border-2 border-red-500/20 p-6 rounded-3xl flex items-start gap-4 shadow-sm"
          >
            <div className="w-12 h-12 rounded-2xl bg-red-500 flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-red-500/20">
              <ShieldAlert size={24} />
            </div>
            <div>
              <h4 className="text-red-900 font-bold text-lg mb-1">Escalated to Media</h4>
              <p className="text-red-800/70 text-sm leading-relaxed">
                This issue has been escalated to local media outlets due to a delay exceeding 15 days. Public pressure has been applied to ensure immediate administrative action.
              </p>
            </div>
          </motion.div>
        )}

        {!escalated && issue.status !== 'Resolved' && (
          <div className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldAlert size={20} className="text-on-surface-variant/40" />
              <p className="text-sm font-bold text-on-surface-variant">Issue not resolved yet?</p>
            </div>
            <button 
              onClick={() => onEscalate(issue.id)}
              className="bg-red-500 text-white px-6 py-2 rounded-full font-bold text-xs hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
            >
              Send to Media
            </button>
          </div>
        )}

        {/* Hero Image */}
        <div className="relative rounded-[2.5rem] overflow-hidden aspect-video shadow-2xl border-4 border-white">
          <img 
            src={issue.image} 
            alt={issue.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-6 left-6 flex gap-2">
            <span className="bg-primary/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
              {issue.category}
            </span>
            <span className={cn(
              "backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg",
              issue.status === 'Resolved' ? "bg-green-500/90 text-white" : "bg-white/90 text-on-surface"
            )}>
              {issue.status}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold font-headline tracking-tight text-on-surface leading-tight">
            {issue.title}
          </h1>
          
          <div className="flex flex-wrap gap-6 text-sm font-bold text-on-surface-variant/60">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-primary" />
              <span>{issue.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-secondary" />
              <span>Reported on {new Date(issue.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant/40 mb-4">Description</h4>
            <p className="text-on-surface-variant leading-relaxed text-lg">
              {issue.description}
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant/40 border-b border-outline-variant pb-2">Resolution Timeline</h4>
          <Timeline status={issue.status} isEscalated={escalated} />
        </div>

        {/* Feedback Section */}
        {issue.status === 'Resolved' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-primary/5 border-2 border-primary/20 p-8 rounded-3xl text-center space-y-6"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <MessageSquare size={32} className="text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold font-headline mb-2">Help us improve!</h3>
              <p className="text-on-surface-variant max-w-md mx-auto">Your feedback is crucial for maintaining accountability and improving our civic services.</p>
            </div>
            <button 
              onClick={() => setIsFeedbackOpen(true)}
              className="civic-pulse-gradient text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:scale-105 transition-transform flex items-center justify-center gap-2 mx-auto"
            >
              <CheckCircle2 size={20} />
              Give Feedback
            </button>
          </motion.div>
        )}

        {/* Authority Info */}
        <div className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
              <AlertTriangle size={24} className="text-amber-500" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">Assigned Authority</p>
              <p className="font-bold text-on-surface">{issue.authority}</p>
            </div>
          </div>
          <button className="text-primary font-bold text-sm hover:underline">Contact Dept</button>
        </div>
      </div>

      <FeedbackModal 
        isOpen={isFeedbackOpen} 
        onClose={() => setIsFeedbackOpen(false)}
        onSubmit={(feedback) => onFeedbackSubmit(issue.id, feedback)}
      />
    </motion.div>
  );
};
