import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, QrCode, ShieldCheck, Zap, Building2, Layers, CheckCircle2, Clock, BarChart3, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BusinessHeroProps {
  onRequestDemo?: () => void;
}

export const BusinessHero: React.FC<BusinessHeroProps> = ({ onRequestDemo }) => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-32 pb-20 lg:pt-36 lg:pb-28 bg-[#0B1736] text-white overflow-hidden">
      {/* Background Decorative Gradient Blobs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#079669]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#2447E8]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#079669]/20 border border-[#079669]/30 text-[#079669] text-xs font-semibold tracking-wide uppercase mb-4">
                <Building2 className="w-3.5 h-3.5" />
                <span>Enterprise & Facility Operations</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Turn Operational Friction into{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-emerald-300 to-green-400">
                  Instant Resolution
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed"
            >
              Streamline facility maintenance, campus issues, hospital requests, and corporate service tickets. QR-based reporting, AI automatic triage, precise department routing, and SLA tracking in one platform.
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-2 text-xs text-slate-300 font-medium"
            >
              <span className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 flex items-center gap-1.5">
                <QrCode className="w-3.5 h-3.5 text-emerald-400" /> Instant QR Scan
              </span>
              <span className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-indigo-400" /> AI Auto-Triage
              </span>
              <span className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-teal-400" /> SLA & Escalations
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <button
                onClick={onRequestDemo}
                className="px-6 py-3.5 rounded-xl font-semibold text-white bg-[#079669] hover:bg-[#068059] shadow-lg shadow-[#079669]/25 transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <span>Request Enterprise Demo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => navigate('/business/login')}
                className="px-6 py-3.5 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Business Portal Sign In</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Dashboard UI Preview Mockup */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-2xl bg-[#0f1f48] border border-slate-700/80 p-5 shadow-2xl backdrop-blur-sm"
            >
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-slate-400 ml-2">Luminous Operations Suite</span>
                </div>
                <div className="text-[11px] font-medium px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Live System Preview
                </div>
              </div>

              {/* Sample Dashboard Content */}
              <div className="space-y-4">
                {/* Metric Summary Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-[#0B1736] p-3 rounded-lg border border-slate-800">
                    <div className="text-[11px] text-slate-400 font-medium">Open Issues</div>
                    <div className="text-xl font-extrabold text-white mt-0.5">24</div>
                    <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> 8 resolved today
                    </div>
                  </div>
                  <div className="bg-[#0B1736] p-3 rounded-lg border border-slate-800">
                    <div className="text-[11px] text-slate-400 font-medium">AI Auto-Assigned</div>
                    <div className="text-xl font-extrabold text-[#079669] mt-0.5">96.4%</div>
                    <div className="text-[10px] text-slate-400 mt-1">Zero manual triage</div>
                  </div>
                  <div className="bg-[#0B1736] p-3 rounded-lg border border-slate-800">
                    <div className="text-[11px] text-slate-400 font-medium">Avg SLA Time</div>
                    <div className="text-xl font-extrabold text-[#2447E8] mt-0.5">18m</div>
                    <div className="text-[10px] text-emerald-400 mt-1">Within target SLA</div>
                  </div>
                </div>

                {/* Real-time Ticket Feed Mockup */}
                <div className="bg-[#0B1736] rounded-xl border border-slate-800 p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                    <span className="font-semibold text-slate-300">Recent Incident Stream</span>
                    <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded">Auto-Routed</span>
                  </div>

                  {/* Sample Ticket 1 */}
                  <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                        <QrCode className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-200">AC Leaking in Conference Rm B</div>
                        <div className="text-[10px] text-slate-400">Scanned QR #BLD-2-FL3 · HVAC Dept</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 shrink-0">
                      Assigned (SLA 45m)
                    </span>
                  </div>

                  {/* Sample Ticket 2 */}
                  <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-200">Elevator 3 Indicator Bleep</div>
                        <div className="text-[10px] text-slate-400">AI Priority High · Electrical Dept</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-300 shrink-0">
                      In Progress
                    </span>
                  </div>
                </div>

                {/* Footer Note in mockup */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Sample layout derived from live organization portal</span>
                  <span className="text-[#079669] font-medium hover:underline cursor-pointer" onClick={() => navigate('/business/login')}>
                    Test Live Demo →
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
