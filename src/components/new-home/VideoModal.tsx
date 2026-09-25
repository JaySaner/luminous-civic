import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 px-6 border-b border-slate-800 bg-slate-950/50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Luminous Civic Platform Overview
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Video / Demo Content Frame */}
            <div className="relative aspect-video w-full bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/10">
                <Play size={36} className="ml-1 fill-blue-400 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Report-to-Resolution Platform Overview
              </h3>
              <p className="text-slate-400 max-w-md text-sm mb-6">
                Discover how Luminous Civic turns civic and organizational issues into structured, accountable progress through AI intelligence.
              </p>
              
              <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 rounded-full px-5 py-2">
                <span className="text-xs font-semibold text-blue-400">Interactive Preview</span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400">Duration 2:15</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
