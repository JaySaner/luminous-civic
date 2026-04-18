import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, X, Info, ShieldAlert } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export type NotificationType = 'success' | 'error' | 'info' | 'escalation';

export interface NotificationItem {
  id: string;
  message: string;
  type: NotificationType;
}

interface NotificationProps {
  notifications: NotificationItem[];
  onRemove: (id: string) => void;
}

export const Notification: React.FC<NotificationProps> = ({ notifications, onRemove }) => {
  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            layout
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            className={cn(
              "pointer-events-auto flex items-center gap-4 p-6 rounded-3xl shadow-2xl border-2 min-w-[320px] max-w-md",
              notif.type === 'success' && "bg-green-50 border-green-500/20 text-green-900",
              notif.type === 'error' && "bg-red-50 border-red-500/20 text-red-900",
              notif.type === 'info' && "bg-blue-50 border-blue-500/20 text-blue-900",
              notif.type === 'escalation' && "bg-red-500 border-red-600 text-white shadow-red-500/20"
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm",
              notif.type === 'success' && "bg-green-500 text-white",
              notif.type === 'error' && "bg-red-500 text-white",
              notif.type === 'info' && "bg-blue-500 text-white",
              notif.type === 'escalation' && "bg-white text-red-500"
            )}>
              {notif.type === 'success' && <CheckCircle2 size={20} />}
              {notif.type === 'error' && <AlertCircle size={20} />}
              {notif.type === 'info' && <Info size={20} />}
              {notif.type === 'escalation' && <ShieldAlert size={20} />}
            </div>
            
            <div className="flex-1">
              <p className="text-sm font-bold leading-tight">{notif.message}</p>
            </div>

            <button 
              onClick={() => onRemove(notif.id)}
              className="p-1 hover:bg-black/5 rounded-full transition-colors"
            >
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
