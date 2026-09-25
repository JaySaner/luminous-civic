import React from 'react';
import { motion } from 'motion/react';
import { Camera, Cpu, Send, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Report',
    desc: 'Submit a photo, description and location of the issue.',
    icon: Camera,
    color: '#2447E8',
    bg: '#EEF3FF',
  },
  {
    num: '02',
    title: 'AI Analyze',
    desc: 'AI understands, categorizes and prioritizes the issue automatically.',
    icon: Cpu,
    color: '#6366F1',
    bg: '#EEF3FF',
  },
  {
    num: '03',
    title: 'Route & Assign',
    desc: 'Issue is sent to the right authority, department or team.',
    icon: Send,
    color: '#079669',
    bg: '#EAF8F1',
  },
  {
    num: '04',
    title: 'Track',
    desc: 'Monitor progress, SLA status and updates in real time.',
    icon: Clock,
    color: '#D97706',
    bg: '#FEF3C7',
  },
  {
    num: '05',
    title: 'Resolve',
    desc: 'Issue is closed. Outcome captured. Audit trail recorded.',
    icon: CheckCircle2,
    color: '#38B94A',
    bg: '#DCFCE7',
  },
];

export const CoreWorkflow: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border"
            style={{ background: '#EEF3FF', color: '#2447E8', borderColor: '#2447E8' + '25' }}>
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-900 tracking-tight font-headline leading-tight">
            From Report to Resolution.
          </h2>
          <p className="text-base text-slate-500 font-medium">
            A structured five-step workflow — from the moment an issue is reported to when it's resolved and analyzed.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-3 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.num}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="relative bg-white rounded-2xl p-5 border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-300 group flex flex-col"
                >
                  {/* Step Number */}
                  <span className="text-[11px] font-black tracking-widest mb-4 font-mono" style={{ color: step.color + '80' }}>
                    {step.num}
                  </span>

                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-105"
                    style={{ background: step.bg }}>
                    <Icon size={20} style={{ color: step.color }} />
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-black text-slate-900 font-headline mb-2">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-500 font-medium leading-relaxed flex-grow">
                    {step.desc}
                  </p>

                  {/* Bottom accent */}
                  <div className="mt-4 h-0.5 rounded-full w-8 transition-all duration-300 group-hover:w-16"
                    style={{ background: step.color }} />
                </motion.div>

                {/* Arrow connector (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute items-center justify-center"
                    style={{
                      top: '50%',
                      left: `calc(${(index + 1) * 20}% - 12px)`,
                      transform: 'translateY(-50%)',
                      zIndex: 10
                    }}>
                    <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                      <ArrowRight size={11} className="text-slate-400" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-sm font-semibold text-slate-400">
            Works for <span className="text-slate-700 font-bold">Citizens</span> ·{' '}
            <span className="text-slate-700 font-bold">Employees</span> ·{' '}
            <span className="text-slate-700 font-bold">Customers</span> ·{' '}
            <span className="text-slate-700 font-bold">Management</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
