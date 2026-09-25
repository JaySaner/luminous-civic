import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, ShieldCheck, Zap, Award, CheckCircle2, DollarSign } from 'lucide-react';

export const BusinessBenefits: React.FC = () => {
  const benefits = [
    {
      stat: '55%',
      label: 'Faster Resolution Times',
      desc: 'Instant QR scan + AI auto-triage bypasses manual logging steps.',
      color: 'text-[#2447E8]',
    },
    {
      stat: '0 Hours',
      label: 'Manual Dispatch Overhead',
      desc: 'Technicians receive routed tickets directly on their mobile device.',
      color: 'text-[#079669]',
    },
    {
      stat: '100%',
      label: 'Compliance Audit Trail',
      desc: 'Complete digital history of all requests, photo proof, and SLA timestamps.',
      color: 'text-[#38B94A]',
    },
    {
      stat: '3.2x',
      label: 'Return on Investment',
      desc: 'Prevents costly equipment failures through early hazard detection.',
      color: 'text-[#0B1736]',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#EEF3FF]/50 to-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#079669]/10 text-[#079669] text-xs font-semibold mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Proven Business Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1736] tracking-tight">
            Measurable Operational Returns for Your Enterprise
          </h2>
          <p className="mt-4 text-base text-slate-600">
            See how streamlining facility management delivers immediate efficiency gains across your team.
          </p>
        </div>

        {/* 4 Benefit Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow text-center space-y-3"
            >
              <div className={`text-4xl sm:text-5xl font-extrabold ${b.color}`}>
                {b.stat}
              </div>
              <h3 className="text-base font-bold text-slate-900">{b.label}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
