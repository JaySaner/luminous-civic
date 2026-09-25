import React from 'react';
import { motion } from 'motion/react';
import { Leaf, Shield, TrendingUp, BarChart3, Quote } from 'lucide-react';

export const ImpactSection: React.FC = () => {
  const impacts = [
    {
      title: 'Cleaner Environments',
      desc: 'Reduced civic issues and healthier communities across urban and suburban zones.',
      icon: Leaf,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-100'
    },
    {
      title: 'Safer Communities',
      desc: 'Faster response times to critical hazards, hazards prevention, and urgent infrastructure risks.',
      icon: Shield,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100'
    },
    {
      title: 'More Efficient Organizations',
      desc: 'Better operational visibility, department accountability, and SLA compliance.',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-100'
    },
    {
      title: 'Data-Driven Decision Making',
      desc: 'Deep analytical insights that help leadership identify recurring problems and prevent future failures.',
      icon: BarChart3,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-100'
    }
  ];

  return (
    <section id="impact" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider">
            <span>OUR IMPACT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight font-headline">
            Creating Cleaner Spaces and Stronger Systems
          </h2>
        </div>

        {/* 4 Cards + Quote Block Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {impacts.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`bg-slate-50 border ${item.borderColor} rounded-3xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl ${item.bgColor} ${item.color} flex items-center justify-center mb-6 shadow-sm`}>
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2 font-headline">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}

          {/* Testimonial Quote Block (Spans 2 columns on lg or sits nicely) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden"
          >
            <Quote className="absolute right-6 top-6 text-blue-200/50 w-24 h-24 pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Platform Vision</span>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900 font-headline leading-snug">
                “Technology should bring people and solutions closer. Luminous Civic does exactly that.”
              </p>
            </div>

            <div className="pt-4 border-t border-blue-200/60 mt-6 flex items-center justify-between relative z-10">
              <span className="text-xs font-bold text-slate-600">— A Smarter Tomorrow</span>
              <span className="text-[11px] font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">Civic & Enterprise Ready</span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
