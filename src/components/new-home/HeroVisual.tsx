import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const HeroVisual: React.FC = () => {
  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[4/3] lg:aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-b from-blue-900 via-slate-900 to-slate-950 border border-slate-800">
      {/* Background Graphic - Modern City Skyline Illustration/Composite */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-85 mix-blend-luminosity scale-105 transform hover:scale-100 transition-transform duration-1000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80')`
        }}
      />
      {/* Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-blue-900/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-transparent" />

      {/* Decorative Floating Cursive Taglines */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-6 left-6 sm:top-10 sm:left-10 text-white/90 font-serif italic text-sm sm:text-base md:text-lg tracking-wide max-w-[200px] sm:max-w-xs drop-shadow-md pointer-events-none"
      >
        "Real Issues <br />
        <span className="pl-4">Real Solutions</span> <br />
        <span className="pl-8 text-emerald-300 font-bold">Brighter Tomorrows</span>"
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-6 right-6 sm:top-8 sm:right-8 text-white/80 font-serif italic text-xs sm:text-sm text-right drop-shadow-md pointer-events-none hidden sm:block"
      >
        Cleaner Cities • Stronger Businesses <br />
        <span className="text-blue-300 font-semibold">Better Lives</span>
      </motion.div>

      {/* Person Profile Silhouette Graphic / Cutout Emulation */}
      <div className="absolute right-0 bottom-0 w-1/2 h-4/5 flex items-end justify-end overflow-hidden pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
          alt="Citizen envisioning progress"
          className="w-full h-full object-cover object-top rounded-tl-full opacity-90 mix-blend-overlay border-l-2 border-t-2 border-white/20 shadow-2xl"
        />
      </div>

      {/* Floating Card Overlay 1 — "Report • Track • Resolve" */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="absolute top-1/3 right-6 sm:right-12 bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl p-4 sm:p-5 text-white shadow-2xl max-w-[190px] sm:max-w-[220px]"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-300">Live Platform</span>
        </div>
        <h4 className="text-base sm:text-lg font-black leading-tight font-headline">
          Report <br />
          <span className="text-blue-300">Track</span> <br />
          <span className="text-emerald-300">Resolve</span>
        </h4>
        <p className="text-[11px] text-white/80 mt-2 font-medium border-t border-white/10 pt-2 flex items-center justify-between">
          <span>Make an Impact</span>
          <CheckCircle2 size={14} className="text-emerald-400" />
        </p>
      </motion.div>

      {/* Floating Card Overlay 2 — "A smarter tomorrow starts with you." */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-2xl border border-white text-slate-900 max-w-[240px] sm:max-w-xs flex items-center gap-4"
      >
        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-600/30">
          <ArrowRight size={20} className="-rotate-45" />
        </div>
        <div>
          <h5 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
            A smarter tomorrow starts with you.
          </h5>
          <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 font-medium">
            AI-powered issue resolution
          </p>
        </div>
      </motion.div>
    </div>
  );
};
