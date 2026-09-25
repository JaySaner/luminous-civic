import React from 'react';
import { motion } from 'motion/react';
import { Users, Landmark, Briefcase, Building2, BarChart2 } from 'lucide-react';

const stakeholders = [
  {
    icon: Users,
    title: 'Citizens',
    color: '#2447E8',
    bg: '#EEF3FF',
    points: ['Simple issue reporting', 'Track status anytime', 'Transparent resolution'],
  },
  {
    icon: Landmark,
    title: 'Government',
    color: '#2447E8',
    bg: '#EEF3FF',
    points: ['Structured inbound issues', 'Better routing & accountability', 'City-level data & analytics'],
  },
  {
    icon: Briefcase,
    title: 'Employees',
    color: '#079669',
    bg: '#EAF8F1',
    points: ['Quick workplace reporting', 'QR or link-based access', 'Anonymous submission option'],
  },
  {
    icon: Building2,
    title: 'Businesses',
    color: '#079669',
    bg: '#EAF8F1',
    points: ['Faster issue resolution', 'Clear SLA visibility', 'Department accountability'],
  },
  {
    icon: BarChart2,
    title: 'Management',
    color: '#0B1736',
    bg: '#F1F5F9',
    points: ['Real-time analytics', 'Recurring problem detection', 'Operational intelligence'],
  },
];

export const MultipleStakeholders: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden" style={{ background: '#FAFBFF' }}>
      <div className="absolute inset-0 lc-dot-bg opacity-25 pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border"
            style={{ background: '#EEF3FF', color: '#2447E8', borderColor: '#2447E8' + '25' }}>
            Multiple Stakeholders
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-900 tracking-tight font-headline leading-tight">
            One Platform. Multiple Stakeholders.
          </h2>
          <p className="text-base text-slate-500 font-medium">
            Luminous Civic serves everyone in the issue lifecycle — from the person who reports to the team that resolves.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {stakeholders.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white rounded-2xl p-5 border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-105"
                  style={{ background: s.bg }}>
                  <Icon size={18} style={{ color: s.color }} />
                </div>
                <h3 className="text-sm font-black text-slate-900 font-headline mb-3">{s.title}</h3>
                <div className="space-y-1.5">
                  {s.points.map((p) => (
                    <p key={p} className="text-xs text-slate-500 font-medium leading-snug flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: s.color }} />
                      {p}
                    </p>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl border border-slate-200 bg-white text-sm font-bold text-slate-700">
            <span style={{ color: '#2447E8' }}>Report</span>
            <span className="text-slate-300">→</span>
            <span style={{ color: '#079669' }}>Resolve</span>
            <span className="text-slate-300">→</span>
            <span style={{ color: '#079669' }}>Analyze</span>
            <span className="text-slate-300">→</span>
            <span style={{ color: '#0B1736' }}>Prevent</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
