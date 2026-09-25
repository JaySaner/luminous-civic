import React from 'react';
import { motion } from 'motion/react';
import { Landmark, Factory, Cross, GraduationCap, Home, MoreHorizontal } from 'lucide-react';

export const WhoWeServe: React.FC = () => {
  const categories = [
    { title: 'Municipal Corporations', icon: Landmark },
    { title: 'Industries & Factories', icon: Factory },
    { title: 'Hospitals', icon: Cross },
    { title: 'Educational Campuses', icon: GraduationCap },
    { title: 'Residential Societies', icon: Home },
    { title: 'And Many More', icon: MoreHorizontal }
  ];

  return (
    <section className="py-16 bg-slate-50 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">
            TRUSTED BY COMMUNITIES AND ORGANIZATIONS
          </span>
          <h3 className="text-2xl font-black text-slate-900 font-headline mt-1">
            Built for Real-World Ecosystems
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-white border border-slate-200/80 rounded-2xl p-4 text-center hover:shadow-md hover:border-blue-300 transition-all flex flex-col items-center justify-center space-y-2 group"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-600 flex items-center justify-center transition-colors">
                  <Icon size={20} />
                </div>
                <span className="text-xs font-bold text-slate-800 leading-tight">
                  {cat.title}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
