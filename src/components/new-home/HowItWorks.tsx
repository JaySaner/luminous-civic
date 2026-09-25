import React from 'react';
import { motion } from 'motion/react';
import { Camera, Cpu, Send, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Report',
      desc: 'Submit an issue with description, photo and location.',
      icon: Camera,
      badgeColor: 'bg-emerald-100 text-emerald-700',
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200'
    },
    {
      num: '02',
      title: 'AI Analyze',
      desc: 'Understand, categorize and prioritize the issue automatically.',
      icon: Cpu,
      badgeColor: 'bg-blue-100 text-blue-700',
      iconBg: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      num: '03',
      title: 'Route & Assign',
      desc: 'Send the issue to the correct authority, department or team.',
      icon: Send,
      badgeColor: 'bg-purple-100 text-purple-700',
      iconBg: 'bg-purple-50 text-purple-600 border-purple-200'
    },
    {
      num: '04',
      title: 'Track',
      desc: 'Monitor progress and SLA status in real time.',
      icon: Clock,
      badgeColor: 'bg-amber-100 text-amber-700',
      iconBg: 'bg-amber-50 text-amber-600 border-amber-200'
    },
    {
      num: '05',
      title: 'Resolve',
      desc: 'Close the issue and capture verifiable outcomes.',
      icon: CheckCircle2,
      badgeColor: 'bg-emerald-100 text-emerald-700',
      iconBg: 'bg-emerald-500 text-white border-emerald-600 shadow-lg shadow-emerald-500/30'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <span>HOW IT WORKS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight font-headline">
            A Simple Process. A Bigger Impact.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            From reporting to resolution — powered by AI intelligence.
          </p>
        </div>

        {/* Desktop / Tablet Horizontal Workflow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 lg:gap-4 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative bg-slate-50 rounded-3xl p-6 border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Arrow Connector on Desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-400 items-center justify-center shadow-sm">
                    <ArrowRight size={14} />
                  </div>
                )}

                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-black tracking-widest text-slate-400 font-mono">
                      {step.num}
                    </span>
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${step.iconBg} transition-transform group-hover:scale-110`}>
                      <Icon size={22} />
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mb-2 font-headline">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
