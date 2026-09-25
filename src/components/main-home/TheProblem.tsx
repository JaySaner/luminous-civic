import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Mail, Phone, FileSpreadsheet, FileText, Smartphone, ArrowDown, Zap } from 'lucide-react';

const oldChannels = [
  { icon: Smartphone, label: 'WhatsApp' },
  { icon: Mail, label: 'Email' },
  { icon: Phone, label: 'Phone Calls' },
  { icon: FileText, label: 'Forms' },
  { icon: FileSpreadsheet, label: 'Excel' },
  { icon: MessageSquare, label: 'Paper Registers' },
];

const problemChain = [
  'Scattered, Unstructured Reports',
  'Manual Processing & Re-entry',
  'Wrong or Delayed Routing',
  'No Visibility or Accountability',
  'Delayed Resolution',
];

export const TheProblem: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden" style={{ background: '#FAFBFF' }}>
      <div className="absolute inset-0 lc-dot-bg opacity-25 pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border"
            style={{ background: '#FEF2F2', color: '#991B1B', borderColor: '#FCA5A520' }}>
            The Common Problem
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-900 tracking-tight font-headline leading-tight">
            Reporting Is Easy.<br />
            <span style={{ color: '#2447E8' }}>Resolution Is the Real Problem.</span>
          </h2>
          <p className="text-base text-slate-500 font-medium">
            Organizations manage issues through scattered, disconnected channels — creating chaos, delays and blind spots.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — Scattered channels */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6">Issues Are Reported Through...</h3>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {oldChannels.map((ch, i) => {
                const Icon = ch.icon;
                return (
                  <motion.div
                    key={ch.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    className="flex items-center gap-3 bg-white rounded-xl p-3.5 border border-slate-200"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#F1F5F9' }}>
                      <Icon size={15} className="text-slate-500" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">{ch.label}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Arrow and "This causes" label */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3">This causes...</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Problem chain */}
            <div className="space-y-2">
              {problemChain.map((problem, i) => (
                <div key={problem} className="flex items-center gap-3">
                  <div className="flex-col items-center flex-shrink-0 hidden sm:flex">
                    {i > 0 && <div className="w-px h-3 bg-red-200" />}
                    <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center" style={{ borderColor: '#EF4444', background: '#FEF2F2' }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    </div>
                  </div>
                  <div className="flex-1 bg-white border border-red-100 rounded-xl px-4 py-2.5">
                    <span className="text-sm font-semibold text-slate-700">{problem}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Luminous Civic Solution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="rounded-3xl overflow-hidden border" style={{ borderColor: '#2447E8' + '25', background: '#EEF3FF' }}>
              {/* Header */}
              <div className="px-6 py-5 border-b" style={{ borderColor: '#2447E8' + '15', background: 'white' }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white" style={{ background: '#2447E8' }}>
                    <Zap size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-900">Luminous Civic</div>
                    <div className="text-xs text-slate-500">One Report-to-Resolution Platform</div>
                  </div>
                </div>
              </div>

              {/* Solution Flow */}
              <div className="p-6 space-y-3">
                {[
                  { step: '01', label: 'One reporting channel', sub: 'Citizen, employee or QR scan', color: '#2447E8' },
                  { step: '02', label: 'AI structures the report', sub: 'Category, priority, summary', color: '#2447E8' },
                  { step: '03', label: 'Automatically routed', sub: 'Right authority or department', color: '#2447E8' },
                  { step: '04', label: 'Live SLA tracking', sub: 'Visible progress & deadlines', color: '#079669' },
                  { step: '05', label: 'Issue resolved', sub: 'Audit trail & analytics', color: '#38B94A' },
                ].map((item, i) => (
                  <div key={item.step} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[11px] font-black flex-shrink-0"
                      style={{ background: item.color }}>
                      {item.step}
                    </div>
                    <div className="flex-1 bg-white rounded-xl px-4 py-2.5 border border-slate-100">
                      <div className="text-sm font-semibold text-slate-800">{item.label}</div>
                      <div className="text-[11px] text-slate-400">{item.sub}</div>
                    </div>
                    {i < 4 && (
                      <div className="absolute">
                        {/* connector handled by spacing */}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom badge */}
              <div className="px-6 pb-6">
                <div className="rounded-2xl px-4 py-3 text-center font-bold text-sm text-white"
                  style={{ background: 'linear-gradient(90deg, #2447E8, #079669)' }}>
                  Report → Resolve → Analyze → Prevent
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
