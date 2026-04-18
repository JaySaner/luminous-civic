import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, X, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: { rating: number; comment: string; resolved: boolean }) => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [step, setStep] = useState<'initial' | 'rating' | 'reopen'>('initial');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  const handleInitialResponse = (resolved: boolean) => {
    if (resolved) {
      setStep('rating');
    } else {
      setStep('reopen');
    }
  };

  const handleSubmit = () => {
    onSubmit({ rating, comment, resolved: step === 'rating' });
    onClose();
    // Reset state
    setTimeout(() => {
      setStep('initial');
      setRating(0);
      setComment('');
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-surface-container-low rounded-full transition-colors"
          >
            <X size={20} className="text-on-surface-variant" />
          </button>

          <div className="p-10">
            {step === 'initial' && (
              <div className="text-center space-y-8">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={40} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-headline mb-2">Is your issue resolved?</h3>
                  <p className="text-on-surface-variant">Please confirm if the reported problem has been fixed to your satisfaction.</p>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleInitialResponse(false)}
                    className="flex-1 py-4 rounded-2xl border-2 border-outline-variant font-bold hover:bg-surface-container-low transition-all"
                  >
                    No, Not Yet
                  </button>
                  <button 
                    onClick={() => handleInitialResponse(true)}
                    className="flex-1 py-4 rounded-2xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                  >
                    Yes, It's Fixed
                  </button>
                </div>
              </div>
            )}

            {step === 'rating' && (
              <div className="text-center space-y-8">
                <div>
                  <h3 className="text-2xl font-bold font-headline mb-2">Rate the Resolution</h3>
                  <p className="text-on-surface-variant">How would you describe your experience with the resolution process?</p>
                </div>
                
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 transition-transform hover:scale-125"
                    >
                      <Star 
                        size={36} 
                        className={cn(
                          "transition-colors",
                          (hoverRating || rating) >= star ? "fill-amber-400 text-amber-400" : "text-outline-variant"
                        )} 
                      />
                    </button>
                  ))}
                </div>

                <textarea 
                  placeholder="Tell us more about the resolution (optional)..."
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none text-sm"
                />

                <button 
                  onClick={handleSubmit}
                  disabled={rating === 0}
                  className="w-full py-4 rounded-2xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Submit Feedback
                </button>
              </div>
            )}

            {step === 'reopen' && (
              <div className="text-center space-y-8">
                <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto">
                  <AlertCircle size={40} className="text-amber-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-headline mb-2">Reopening Issue</h3>
                  <p className="text-on-surface-variant">We're sorry the issue wasn't resolved. Your report will be reopened and prioritized for further inspection.</p>
                </div>
                <button 
                  onClick={handleSubmit}
                  className="w-full py-4 rounded-2xl bg-amber-500 text-white font-bold shadow-lg shadow-amber-500/20 hover:scale-105 transition-all"
                >
                  Confirm & Reopen
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
