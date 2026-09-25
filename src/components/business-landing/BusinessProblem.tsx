import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Mail, PhoneCall, AlertTriangle, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const BusinessProblem: React.FC = () => {
  const painPoints = [
    {
      icon: MessageSquare,
      title: 'Scattered Communication',
      desc: 'Maintenance requests lost in WhatsApp groups, personal emails, or verbal complaints.',
    },
    {
      icon: AlertTriangle,
      title: 'No SLA Accountability',
      desc: 'No clear response windows, leading to unattended leaks, broken HVAC, or safety hazards.',
    },
    {
      icon: PhoneCall,
      title: 'Wrong Department Routing',
      desc: 'Facilities teams waste hours re-assigning tickets manually to correct technicians.',
    },
    {
      icon: ShieldAlert,
      title: 'Zero Executive Visibility',
      desc: 'Management lacks real-time dashboards on resolution rates, department backlog, or vendor performance.',
    },
  ];

  return (
    <section id="overview" className="py-20 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 text-xs font-semibold mb-3">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>The Internal Facility Challenge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1736] tracking-tight">
            How Operational Friction Slows Down Your Organization
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            When facility issues are reported through unstructured channels, repair times skyrocket, employee productivity drops, and audit trails vanish.
          </p>
        </div>

        {/* 4 Pain Point Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {painPoints.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div className="w-12 h-12 rounded-lg bg-red-50 text-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Solution Bridge Banner */}
        <div className="mt-14 p-8 rounded-2xl bg-[#0B1736] text-white flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center lg:text-left">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#079669]">
              The Luminous Civic Business Solution
            </div>
            <h3 className="text-2xl font-bold text-white">
              One Unified Operational Engine for All Your Facilities
            </h3>
            <p className="text-sm text-slate-300 max-w-2xl">
              Replace chaos with structured QR reporting, AI triage, automated department dispatch, and live executive analytics.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <span className="px-4 py-2 rounded-lg bg-[#079669] text-white text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> 100% Automated Workflow
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
