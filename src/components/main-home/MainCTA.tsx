import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MainCTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden" style={{ background: '#0B1736' }}>
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />
      {/* Blue glow top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[80px] pointer-events-none"
        style={{ background: 'rgba(36,71,232,0.15)' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
            style={{ background: 'rgba(36,71,232,0.2)', color: '#93C5FD', border: '1px solid rgba(36,71,232,0.3)' }}>
            Every Problem Deserves a Path to Resolution
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-white tracking-tight font-headline leading-[1.08]">
            Every Problem Deserves a{' '}
            <span style={{ color: '#38B94A' }}>Path to Resolution.</span>
          </h2>

          <p className="text-lg text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Explore the platform built for cities, communities and organizations. One Report-to-Resolution workflow for every real-world problem.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => navigate('/civic')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-white rounded-xl transition-all hover:opacity-90 group"
              style={{ background: '#2447E8' }}
            >
              Explore Civic Platform
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/business-platform')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold rounded-xl border transition-all hover:bg-white/5 group"
              style={{ color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}
            >
              Explore Business Platform
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-6 text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <span>People</span>
            <span>·</span>
            <span>Technology</span>
            <span>·</span>
            <span>Solutions</span>
            <span>·</span>
            <span>Stronger Tomorrows</span>
          </div>
          <div className="text-sm font-semibold" style={{ color: '#38B94A' }}>
            Cleaner Cities · Safer Communities · Smarter Organizations
          </div>
        </motion.div>
      </div>
    </section>
  );
};
