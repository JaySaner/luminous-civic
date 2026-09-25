import React from 'react';
import { motion } from 'motion/react';
import { Clock, ShieldAlert, AlertCircle, CheckCircle2, BellRing, ArrowUpRight } from 'lucide-react';

export const SLASection: React.FC = () => {
  const slaTiers = [
    {
      level: 'Critical Hazard',
      target: '< 15 mins',
      escalation: 'Supervisors & SMS Alert',
      color: 'text-red-600 bg-red-50 border-red-200',
      badge: 'P1 - Immediate',
    },
    {
      level: 'High Operational Impact',
      target: '< 1 Hour',
      escalation: 'Department Manager Alert',
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      badge: 'P2 - High',
    },
    {
      level: 'Standard Maintenance',
      target: '< 4 Hours',
      escalation: 'Team Lead Daily Digest',
      color: 'text-[#2447E8] bg-indigo-50 border-indigo-200',
      badge: 'P3 - Standard',
    },
    {
      level: 'Low / Routine Request',
      target: '< 24 Hours',
      escalation: 'Scheduled Maintenance Batch',
      color: 'text-[#079669] bg-emerald-50 border-emerald-200',
      badge: 'P4 - Low',
    },
  ];

  return (
    <section className="py-20 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 text-xs font-semibold mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>SLA Guarantee & Escalation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1736] tracking-tight">
            Never Let a Maintenance Issue Fall Through the Cracks
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Configure target response and resolution SLAs by priority. Automated escalation notifications ensure accountability before a breach happens.
          </p>
        </div>

        {/* 4 SLA Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {slaTiers.map((tier, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`p-6 rounded-2xl border ${tier.color} space-y-4 shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white border border-current">
                  {tier.badge}
                </span>
                <Clock className="w-4 h-4" />
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">{tier.level}</h3>
                <div className="text-2xl font-black text-slate-900 mt-1">{tier.target}</div>
                <div className="text-[11px] text-slate-500 font-medium">Target Resolution Window</div>
              </div>

              <div className="pt-2 border-t border-slate-200/80 space-y-1">
                <div className="text-[10px] font-semibold uppercase text-slate-400">Escalation Trigger</div>
                <div className="text-xs font-medium text-slate-700 flex items-center gap-1">
                  <BellRing className="w-3 h-3 text-amber-500 shrink-0" />
                  <span>{tier.escalation}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
