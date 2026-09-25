import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Eye, ShieldCheck, Database, Layers, CheckSquare, RefreshCw, ArrowRight } from 'lucide-react';

export const WhyLuminousCivic: React.FC = () => {
  const values = [
    {
      title: 'AI-Powered',
      desc: 'Understand and prioritize issues intelligently without human error.',
      icon: Cpu,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'Transparent',
      desc: 'Track every single issue from submission to final resolution in real time.',
      icon: Eye,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    {
      title: 'Accountable',
      desc: 'Every issue is automatically assigned to a designated department or team with explicit SLAs.',
      icon: ShieldCheck,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      title: 'Data-Driven',
      desc: 'Turn raw issue reports into structured operational insights and heatmaps.',
      icon: Database,
      color: 'text-amber-600',
      bg: 'bg-amber-50'
    },
    {
      title: 'Scalable',
      desc: 'Architected for cities, industrial campuses, and multi-location enterprise facilities.',
      icon: Layers,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50'
    },
    {
      title: 'Action-Oriented',
      desc: 'Engineered specifically for resolution, not simply collecting complaints.',
      icon: CheckSquare,
      color: 'text-teal-600',
      bg: 'bg-teal-50'
    }
  ];

  const flywheelSteps = [
    { step: 'REPORT', desc: 'Capture issue with photo & geo-tag' },
    { step: 'RESOLVE', desc: 'Triage, assign & close issue' },
    { step: 'ANALYZE', desc: 'Identify patterns & root causes' },
    { step: 'PREVENT', desc: 'Optimize infrastructure & prevent repeat issues' }
  ];

  return (
    <section id="why-us" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <span>WHY LUMINOUS CIVIC</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight font-headline">
            Built for Action, Not Just Registration
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            Luminous Civic turns scattered problems into structured, accountable and measurable progress.
          </p>
        </div>

        {/* 6 Value Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {values.map((v, idx) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-8 hover:bg-white hover:border-slate-200 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-2xl ${v.bg} ${v.color} flex items-center justify-center mb-5 shadow-sm`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2 font-headline">
                  {v.title}
                </h3>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* SECTION 11 — REPORT → RESOLVE → LEARN FLYWHEEL */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mb-10 space-y-3">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
              <RefreshCw size={14} className="animate-spin-slow" /> Deeper Product Philosophy
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-headline">
              Report → Resolve → Analyze → Prevent
            </h3>
            <p className="text-slate-300 text-sm sm:text-base font-medium">
              Every resolved issue creates data that helps organizations identify recurring problems and make better long-term decisions.
            </p>
          </div>

          {/* 4 Step Loop Graphic */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {flywheelSteps.map((item, idx) => (
              <div key={idx} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 relative space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-blue-400">0{idx + 1}</span>
                  {idx < flywheelSteps.length - 1 && (
                    <ArrowRight size={14} className="text-slate-600 hidden lg:block" />
                  )}
                </div>
                <h4 className="text-lg font-black text-white font-headline">
                  {item.step}
                </h4>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
