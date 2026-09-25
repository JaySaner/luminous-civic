import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle, Users, Building2, MapPin, QrCode, BarChart2, Clock, Cpu, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const TwoPlatforms: React.FC = () => {
  const navigate = useNavigate();

  const civicFeatures = [
    'Easy issue reporting with photo & location',
    'AI issue categorization & analysis',
    'Authority mapping & routing',
    'Legal-grade complaint generation',
    'Real-time tracking by tracking number',
    'Citizen feedback on resolution',
  ];

  const businessFeatures = [
    'Custom reporting portals & QR codes',
    'AI triage — category, priority & action',
    'Department & employee assignment',
    'SLA tracking with live countdown',
    'Analytics & issue pattern detection',
    'Multi-location & multi-department',
  ];

  return (
    <section id="platforms" className="py-20 lg:py-28 bg-white relative">
      <div className="absolute inset-0 lc-dot-bg opacity-30 pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border"
            style={{ background: '#EEF3FF', color: '#2447E8', borderColor: '#2447E8' + '25' }}>
            One Platform. Two Experiences.
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-900 tracking-tight font-headline leading-tight">
            One Platform. Two Ways to Create Impact.
          </h2>
          <p className="text-base text-slate-500 font-medium">
            Whether for public civic issues or private organizational operations — the same structured Report-to-Resolution workflow.
          </p>
        </div>

        {/* Two Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

          {/* CARD 1 — CIVIC PLATFORM */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-blue-200 hover:shadow-2xl transition-all duration-300 flex flex-col"
            style={{ boxShadow: '0 4px 24px rgba(36,71,232,0.06)' }}
          >
            {/* Top bar accent */}
            <div className="h-1 w-full" style={{ background: '#2447E8' }} />

            {/* Top Visual Area */}
            <div className="relative h-52 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0B1736 0%, #1a2d6e 100%)' }}>
              <div className="absolute inset-0 lc-dot-bg opacity-20" />
              {/* Map pin UI mockup */}
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="w-full max-w-sm">
                  {/* Simulated map */}
                  <div className="bg-white/10 border border-white/20 rounded-2xl p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white text-xs font-bold">Civic Issue Map</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ background: '#EEF3FF', color: '#2447E8' }}>Live</span>
                    </div>
                    {/* Map grid */}
                    <div className="relative h-20 bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                      <div className="absolute inset-0 lc-grid-bg opacity-30" />
                      <div className="absolute top-4 left-8 animate-lc-pulse-ring">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: '#2447E8' }}>
                          <MapPin size={8} className="text-white" />
                        </div>
                      </div>
                      <div className="absolute top-8 left-24">
                        <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center" style={{ background: '#EF4444' }}>
                          <MapPin size={7} className="text-white" />
                        </div>
                      </div>
                      <div className="absolute bottom-3 right-12">
                        <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center" style={{ background: '#38B94A' }}>
                          <MapPin size={7} className="text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top label */}
              <div className="absolute top-5 left-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white" style={{ background: '#2447E8' }}>
                  <Users size={12} />
                  CIVIC PLATFORM
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 flex flex-col flex-grow">
              <div className="mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">For Citizens & Government</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 font-headline mb-3">
                Report Civic Issues. Drive Real Change.
              </h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
                Report civic problems with photos, descriptions and location. AI identifies the issue, maps it to the responsible authority and enables transparent tracking until resolution.
              </p>

              {/* Feature List */}
              <div className="space-y-2.5 mb-8 flex-grow">
                {civicFeatures.map((f) => (
                  <div key={f} className="flex items-start gap-2.5">
                    <CheckCircle size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#2447E8' }} />
                    <span className="text-sm text-slate-600 font-medium">{f}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('/civic')}
                className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-bold text-white rounded-xl transition-all hover:shadow-lg group/btn"
                style={{ background: '#2447E8' }}
              >
                Explore Civic Platform
                <ArrowRight size={15} className="group-hover/btn:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* CARD 2 — BUSINESS PLATFORM */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-teal-200 hover:shadow-2xl transition-all duration-300 flex flex-col"
            style={{ boxShadow: '0 4px 24px rgba(7,150,105,0.06)' }}
          >
            {/* Top bar accent */}
            <div className="h-1 w-full" style={{ background: '#079669' }} />

            {/* Top Visual Area */}
            <div className="relative h-52 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0B1736 0%, #065a3e 100%)' }}>
              <div className="absolute inset-0 lc-dot-bg opacity-20" />
              {/* Dashboard mockup */}
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="w-full max-w-sm">
                  <div className="bg-white/10 border border-white/20 rounded-2xl p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white text-xs font-bold">Business Dashboard</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1" style={{ background: '#EAF8F1', color: '#065F46' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        Live
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[['47', 'Total'], ['12', 'Open'], ['28', 'Active'], ['7', 'Done']].map(([v, l]) => (
                        <div key={l} className="bg-white/10 rounded-lg p-1.5 text-center">
                          <div className="text-sm font-black text-white">{v}</div>
                          <div className="text-[8px] text-white/60">{l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Top label */}
              <div className="absolute top-5 left-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white" style={{ background: '#079669' }}>
                  <Building2 size={12} />
                  BUSINESS & INDUSTRY
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 flex flex-col flex-grow">
              <div className="mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">For Organizations & Operations</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 font-headline mb-3">
                Structured Issue Management for Your Organization.
              </h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
                Give employees and customers a simple way to report workplace, facility, maintenance and safety issues through custom forms, links or QR codes.
              </p>

              {/* Feature List */}
              <div className="space-y-2.5 mb-8 flex-grow">
                {businessFeatures.map((f) => (
                  <div key={f} className="flex items-start gap-2.5">
                    <CheckCircle size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#079669' }} />
                    <span className="text-sm text-slate-600 font-medium">{f}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('/business-platform')}
                className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-bold text-white rounded-xl transition-all hover:shadow-lg group/btn"
                style={{ background: '#079669' }}
              >
                Explore Business Platform
                <ArrowRight size={15} className="group-hover/btn:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
