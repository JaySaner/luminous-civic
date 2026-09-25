import React from 'react';
import { motion } from 'motion/react';

const techItems = [
  {
    name: 'React 19 + TypeScript',
    sub: 'Vite · Modern UI framework',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#2447E8">
        <path d="M12 9.861a2.14 2.14 0 1 0 0 4.28 2.14 2.14 0 0 0 0-4.28zm-5.992 6.394l-.472-.12C2.018 15.246 0 13.737 0 11.996s2.018-3.25 5.536-4.139l.472-.119.133.468a23.53 23.53 0 0 0 1.363 3.578l.101.213-.101.213a23.307 23.307 0 0 0-1.363 3.578l-.133.467zM5.317 8.95c-2.674.751-4.315 1.9-4.315 3.046 0 1.145 1.641 2.294 4.315 3.046a24.95 24.95 0 0 1 1.182-3.046A24.752 24.752 0 0 1 5.317 8.95zm12.675 7.305l-.133-.467a23.361 23.361 0 0 0-1.364-3.578l-.101-.213.101-.213a23.42 23.42 0 0 0 1.364-3.578l.133-.468.473.119c3.517.889 5.535 2.398 5.535 4.14s-2.018 3.25-5.535 4.139l-.473.119zm-.491-4.259c.48 1.039.877 2.06 1.182 3.046 2.675-.752 4.315-1.901 4.315-3.046 0-1.146-1.641-2.294-4.315-3.046a24.788 24.788 0 0 1-1.182 3.046z"/>
      </svg>
    ),
    color: '#2447E8',
    bg: '#EEF3FF',
  },
  {
    name: 'Firebase + Firestore',
    sub: 'Real-time database · Auth',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#F59E0B">
        <path d="M3.89 15.672L6.255.461A.542.542 0 0 1 7.27.288l2.543 4.771zm16.794 3.692l-2.473-4.796-7.756-15.28a.543.543 0 0 0-1.017.144L6.801 16.19l11.924 2.44a.535.535 0 0 0 1.958.734zM14.302 2.498l2.34 6.811 1.528-3.003a.542.542 0 0 0-.061-.578z"/>
      </svg>
    ),
    color: '#F59E0B',
    bg: '#FEF3C7',
  },
  {
    name: 'Google Gemini AI',
    sub: 'Gemini 2.5 Flash · Vision AI',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <defs>
          <linearGradient id="gemini-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4F46E5"/>
            <stop offset="100%" stopColor="#0EA5E9"/>
          </linearGradient>
        </defs>
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 3l2.5 5.5H9.5L12 5zm0 14l-2.5-5.5h5L12 19zm-7-7l5.5-2.5v5L5 12zm14 0l-5.5 2.5v-5L19 12z" fill="url(#gemini-grad)"/>
      </svg>
    ),
    color: '#4F46E5',
    bg: '#EEF2FF',
  },
  {
    name: 'Firebase Storage',
    sub: 'Image uploads · Base64',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#079669">
        <path d="M20 6h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-5 0H9V4h6v2z"/>
      </svg>
    ),
    color: '#079669',
    bg: '#EAF8F1',
  },
  {
    name: 'GIS / Maps',
    sub: 'Location · Issue mapping',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#0B1736">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    ),
    color: '#0B1736',
    bg: '#F1F5F9',
  },
  {
    name: 'Analytics + SLA Engine',
    sub: 'Resolution metrics · Insights',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#6366F1">
        <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"/>
      </svg>
    ),
    color: '#6366F1',
    bg: '#EEF2FF',
  },
];

export const TechStack: React.FC = () => {
  return (
    <section className="py-20 lg:py-24 relative overflow-hidden" style={{ background: '#FAFBFF' }}>
      <div className="absolute inset-0 lc-dot-bg opacity-25 pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border"
            style={{ background: '#EEF3FF', color: '#2447E8', borderColor: '#2447E8' + '25' }}>
            Technology
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-headline">
            Built with Modern Technology.
          </h2>
          <p className="text-sm text-slate-500 font-medium">Simple. Modern. Scalable.</p>
        </div>

        {/* Tech Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {techItems.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className="bg-white rounded-2xl p-4 border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all duration-300 text-center flex flex-col items-center gap-3"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: tech.bg }}>
                {tech.icon}
              </div>
              <div>
                <div className="text-xs font-black text-slate-800 leading-snug">{tech.name}</div>
                <div className="text-[10px] text-slate-400 font-medium mt-0.5">{tech.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
