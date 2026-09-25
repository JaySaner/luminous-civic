import React from 'react';
import { motion } from 'motion/react';
import { QrCode, Cpu, Send, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

export const BusinessWorkflow: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: QrCode,
      title: 'Scan QR / Custom Portal',
      desc: 'Employees, visitors, or facility staff scan physical QR codes attached to locations or access the company portal.',
      color: '#2447E8',
      bg: 'bg-indigo-50 text-[#2447E8]',
    },
    {
      num: '02',
      icon: Cpu,
      title: 'AI Auto-Triage',
      desc: 'Gemini AI analyzes issue description & photo proof, assessing severity, category, and urgency level instantly.',
      color: '#079669',
      bg: 'bg-emerald-50 text-[#079669]',
    },
    {
      num: '03',
      icon: Send,
      title: 'Auto-Department Route',
      desc: 'System automatically routes the ticket to the correct department (e.g. Electrical, Plumbing, HVAC, IT, Security).',
      color: '#2447E8',
      bg: 'bg-[#EEF3FF] text-[#2447E8]',
    },
    {
      num: '04',
      icon: Clock,
      title: 'SLA Tracking & Alerts',
      desc: 'Live countdown timers start based on priority. Automated notifications escalate unhandled issues before breach.',
      color: '#d97706',
      bg: 'bg-amber-50 text-amber-600',
    },
    {
      num: '05',
      icon: CheckCircle2,
      title: 'Resolution & Audit Log',
      desc: 'Technicians upload resolution photo proof, closing the ticket with a full compliance and audit record.',
      color: '#38B94A',
      bg: 'bg-green-50 text-[#38B94A]',
    },
  ];

  return (
    <section id="solutions" className="py-20 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#079669]/10 text-[#079669] text-xs font-semibold mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>End-to-End Operational Flow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1736] tracking-tight">
            How Luminous Civic Works in Business Environments
          </h2>
          <p className="mt-4 text-base text-slate-600">
            A seamless, 5-step operational workflow engineered to eliminate delays and ensure total accountability.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-50 rounded-xl p-5 border border-slate-200 relative flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${step.bg}`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-black text-slate-300">{step.num}</span>
                </div>
                <h3 className="text-base font-bold text-[#0B1736] mb-2">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <div className="w-6 h-6 rounded-full bg-white border border-slate-300 flex items-center justify-center text-slate-400">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
