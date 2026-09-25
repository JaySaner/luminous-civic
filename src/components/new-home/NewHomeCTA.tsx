import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mail, Users, Cpu, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NewHomeCTAProps {
  onOpenContact: () => void;
}

export const NewHomeCTA: React.FC<NewHomeCTAProps> = ({ onOpenContact }) => {
  const navigate = useNavigate();

  return (
    <section className="relative py-24 sm:py-32 bg-slate-950 overflow-hidden text-white">
      {/* Background Photographic Image with Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=80')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        {/* Main Headings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4 max-w-4xl mx-auto"
        >
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-emerald-400 font-mono">
            BE THE CHANGE
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-headline leading-tight">
            Report. Resolve. Build a Better Tomorrow.
          </h2>
          <p className="text-base sm:text-xl text-slate-300 font-medium max-w-2xl mx-auto">
            Join thousands of citizens, authorities, and business leaders using Luminous Civic to turn problems into progress.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <button
            onClick={() => navigate('/report')}
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-base rounded-full shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-3 group"
          >
            <span>Get Started Today</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenContact}
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-base rounded-full backdrop-blur-md transition-all flex items-center justify-center gap-2"
          >
            <Mail size={18} />
            <span>Contact Us</span>
          </button>
        </motion.div>

        {/* Bottom Script Tagline & Badges */}
        <div className="pt-12 border-t border-white/10 max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 text-xs text-slate-400 font-semibold">
            <span className="flex items-center gap-1.5"><Users size={16} className="text-emerald-400" /> People</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><Cpu size={16} className="text-blue-400" /> Technology</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-purple-400" /> Impact</span>
          </div>

          <div className="text-white/80 font-serif italic text-lg sm:text-xl drop-shadow-md">
            A Brighter Tomorrow Together ✨
          </div>
        </div>

      </div>
    </section>
  );
};
