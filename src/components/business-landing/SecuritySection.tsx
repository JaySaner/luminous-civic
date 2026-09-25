import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, Key, Server, FileCheck, EyeOff } from 'lucide-react';

export const SecuritySection: React.FC = () => {
  const securityFeatures = [
    {
      icon: Lock,
      title: 'AES-256 & TLS 1.3 Encryption',
      desc: 'All issue data, attachments, and user credentials are encrypted in transit and at rest.',
    },
    {
      icon: Server,
      title: 'Tenant Data Isolation',
      desc: 'Strict organization-level data segregation ensures your internal tickets remain private.',
    },
    {
      icon: Key,
      title: 'Role-Based Access Control',
      desc: 'Granular permissions restrict sensitive department tickets to authorized personnel only.',
    },
    {
      icon: FileCheck,
      title: 'Complete Compliance Audit Logs',
      desc: 'Immutable logs track every status change, timestamp, and technician resolution.',
    },
  ];

  return (
    <section id="features" className="py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Enterprise Security & Data Privacy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built to Meet Bank-Grade Security Standards
          </h2>
          <p className="mt-4 text-base text-slate-300">
            We understand facility data contains sensitive infrastructure details. Our platform is architected for zero-trust security.
          </p>
        </div>

        {/* 4 Security Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityFeatures.map((sec, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3 hover:border-slate-600 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-[#079669]/20 text-[#079669] flex items-center justify-center">
                <sec.icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">{sec.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{sec.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
