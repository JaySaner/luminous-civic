import React from 'react';
import { motion } from 'motion/react';
import { FileText, Users, Zap, ShieldCheck } from 'lucide-react';

export const NewHomeMetrics: React.FC = () => {
  const metrics = [
    {
      icon: FileText,
      value: '25,000+',
      label: 'Issues Reported',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Users,
      value: '500+',
      label: 'Active Organizations',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Zap,
      value: '70%',
      label: 'Faster Resolution',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      icon: ShieldCheck,
      value: 'Cleaner & Safer',
      label: 'Communities',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    }
  ];

  return (
    <section className="relative z-20 -mt-6 sm:-mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100"
      >
        {metrics.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className={`flex items-center gap-4 ${index > 0 ? 'pt-4 md:pt-0 md:pl-6' : ''}`}
            >
              <div className={`w-12 h-12 rounded-2xl ${item.bgColor} ${item.color} flex items-center justify-center shrink-0 shadow-sm`}>
                <Icon size={24} />
              </div>
              <div>
                <h4 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight font-headline">
                  {item.value}
                </h4>
                <p className="text-xs sm:text-sm font-semibold text-slate-500">
                  {item.label}
                </p>
              </div>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
};
