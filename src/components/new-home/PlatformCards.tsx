import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle, Building, Users, Shield, Factory, Sparkles, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PlatformCards: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="platforms" className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles size={14} />
            <span>Dual Ecosystem Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight font-headline">
            Two Core Platforms. One Mission.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            Whether for public municipalities or private enterprise operations, Luminous Civic delivers end-to-end report-to-resolution intelligence.
          </p>
        </div>

        {/* Side-by-Side Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          
          {/* CARD 1 — CITIZENS & GOVERNMENT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
          >
            {/* Top Visual Graphic Container */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-emerald-950">
              <img
                src="https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80"
                alt="Civic City Environment"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              <div className="absolute top-6 left-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/90 backdrop-blur-md text-white text-xs font-bold tracking-wider uppercase shadow-md">
                <Users size={14} />
                <span>FOR CITIZENS & GOVERNMENT</span>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl sm:text-3xl font-black text-white font-headline leading-tight drop-shadow-md">
                  Build Better Cities Together
                </h3>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 space-y-6 flex-grow flex flex-col justify-between">
              <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
                Report civic issues like potholes, garbage, water leakage, streetlights and more. Help authorities respond faster and make communities cleaner and safer.
              </p>

              {/* Supporting Benefits */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
                <div className="flex flex-col items-start gap-1">
                  <span className="text-emerald-600 text-xs font-bold flex items-center gap-1">
                    <CheckCircle size={14} /> Clean Cities
                  </span>
                  <span className="text-[11px] text-slate-500">Cleaner public spaces</span>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <span className="text-emerald-600 text-xs font-bold flex items-center gap-1">
                    <CheckCircle size={14} /> Governance
                  </span>
                  <span className="text-[11px] text-slate-500">Fast response SLA</span>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <span className="text-emerald-600 text-xs font-bold flex items-center gap-1">
                    <CheckCircle size={14} /> Empowered
                  </span>
                  <span className="text-[11px] text-slate-500">Active engagement</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => navigate('/report')}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/20 hover:shadow-xl hover:shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 group/btn mt-2"
              >
                <span>Report a Civic Issue</span>
                <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* CARD 2 — BUSINESSES & INDUSTRIES */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
          >
            {/* Top Visual Graphic Container */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-blue-950">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
                alt="Business Corporate Facility"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              <div className="absolute top-6 left-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/90 backdrop-blur-md text-white text-xs font-bold tracking-wider uppercase shadow-md">
                <Factory size={14} />
                <span>FOR BUSINESSES & INDUSTRIES</span>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl sm:text-3xl font-black text-white font-headline leading-tight drop-shadow-md">
                  Smarter Operations, Stronger Organizations
                </h3>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 space-y-6 flex-grow flex flex-col justify-between">
              <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
                A dedicated platform for companies, factories, hospitals, campuses and other organizations to streamline issue reporting, assignment, tracking and resolution.
              </p>

              {/* Supporting Benefits */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
                <div className="flex flex-col items-start gap-1">
                  <span className="text-blue-600 text-xs font-bold flex items-center gap-1">
                    <Activity size={14} /> Efficiency
                  </span>
                  <span className="text-[11px] text-slate-500">Automated triage</span>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <span className="text-blue-600 text-xs font-bold flex items-center gap-1">
                    <Shield size={14} /> Safety
                  </span>
                  <span className="text-[11px] text-slate-500">Safer workplaces</span>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <span className="text-blue-600 text-xs font-bold flex items-center gap-1">
                    <Building size={14} /> Data-Driven
                  </span>
                  <span className="text-[11px] text-slate-500">Root cause insights</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => navigate('/business/login')}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 transition-all flex items-center justify-center gap-2 group/btn mt-2"
              >
                <span>Explore for Business</span>
                <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
