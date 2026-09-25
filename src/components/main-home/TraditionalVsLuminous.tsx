import React from 'react';
import { motion } from 'motion/react';
import { X, Check } from 'lucide-react';

const traditional = [
  'WhatsApp / Email / Phone Calls',
  'Unstructured, hard-to-process reports',
  'Manual routing to departments',
  'No visibility on issue status',
  'Delayed, inconsistent response',
  'Spreadsheet-based tracking',
];

const luminous = [
  'One unified reporting platform',
  'AI-structured reports with context',
  'Intelligent, automated routing',
  'Real-time status & SLA tracking',
  'Defined response windows & alerts',
  'Analytics & recurring issue detection',
];

export const TraditionalVsLuminous: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border"
            style={{ background: '#EEF3FF', color: '#2447E8', borderColor: '#2447E8' + '25' }}>
            Why Luminous Civic
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-900 tracking-tight font-headline leading-tight">
            From Scattered Problems to Structured Action.
          </h2>
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-slate-200 shadow-xl"
        >
          {/* Traditional Column */}
          <div className="bg-slate-50 border-r border-slate-200">
            <div className="px-7 py-6 border-b border-slate-200 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center">
                <X size={16} className="text-slate-500" />
              </div>
              <div>
                <div className="text-sm font-black text-slate-700">Traditional Approach</div>
                <div className="text-xs text-slate-400">How most organizations operate today</div>
              </div>
            </div>
            <div className="p-6 space-y-3">
              {traditional.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="flex items-start gap-3 bg-white rounded-xl p-3.5 border border-slate-200"
                >
                  <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X size={10} className="text-red-500" />
                  </div>
                  <span className="text-sm text-slate-600 font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Luminous Civic Column */}
          <div className="bg-white" style={{ background: '#FAFEFF' }}>
            <div className="px-7 py-6 border-b flex items-center gap-3" style={{ borderColor: '#2447E8' + '15', background: '#EEF3FF' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ background: '#2447E8' }}>
                <Check size={16} />
              </div>
              <div>
                <div className="text-sm font-black" style={{ color: '#0B1736' }}>Luminous Civic</div>
                <div className="text-xs" style={{ color: '#2447E8' + '99' }}>Structured Report-to-Resolution</div>
              </div>
            </div>
            <div className="p-6 space-y-3">
              {luminous.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="flex items-start gap-3 bg-white rounded-xl p-3.5 border"
                  style={{ borderColor: '#079669' + '25' }}
                >
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: '#EAF8F1' }}>
                    <Check size={10} style={{ color: '#079669' }} />
                  </div>
                  <span className="text-sm text-slate-700 font-semibold">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
