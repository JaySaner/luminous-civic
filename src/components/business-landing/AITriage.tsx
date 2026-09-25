import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Zap, Sparkles, CheckCircle2, ShieldAlert, FileText, ArrowRight } from 'lucide-react';

export const AITriage: React.FC = () => {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2447E8]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive AI Inspection Card */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 shadow-2xl backdrop-blur-sm space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                  <span className="text-sm font-bold text-white">Gemini AI Triage Engine</span>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded font-mono">
                  Confidence: 98.6%
                </span>
              </div>

              {/* Input Image & Text Preview */}
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-700/80 space-y-2">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Raw Input Stream</div>
                <div className="text-xs text-slate-200">"Water is pooling near server rack #4 in IT room B. Smells like hot plastic."</div>
              </div>

              {/* AI Processing Output Breakdown */}
              <div className="space-y-2.5 pt-1">
                <div className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" /> Extracted Intelligence & Auto-Dispatch
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-700">
                    <span className="text-[10px] text-slate-400 block">Category</span>
                    <span className="font-bold text-amber-400">Electrical & Water Leak</span>
                  </div>
                  <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-700">
                    <span className="text-[10px] text-slate-400 block">Urgency Level</span>
                    <span className="font-bold text-red-400 flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5" /> High Risk (SLA: 15m)
                    </span>
                  </div>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700 text-xs space-y-1">
                  <div className="text-[10px] text-slate-400 font-semibold">Automated Actions Triggered</div>
                  <div className="text-slate-200 flex items-center gap-1.5 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Dispatched to On-Call IT Infrastructure & Facilities Team</span>
                  </div>
                  <div className="text-slate-200 flex items-center gap-1.5 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>SMS Alert sent to Lead Administrator</span>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>

          {/* Right Column: Text Explanation */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              <span>AI-Powered Operations Engine</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Instant AI Triage & Severity Classification
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
              Human dispatchers can't read every ticket in seconds. Gemini AI instantly analyzes issue text and photos, assigning accurate severity, target department, and SLA urgency in milliseconds.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#079669]/20 text-[#079669] flex items-center justify-center shrink-0 mt-0.5">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">99%+ Category Accuracy</h4>
                  <p className="text-xs text-slate-400">Eliminates misassigned tickets and back-and-forth department disputes.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#2447E8]/20 text-[#2447E8] flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldAlert className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Safety Risk Flagging</h4>
                  <p className="text-xs text-slate-400">Automatically elevates electrical hazards, chemical leaks, or structural risks for immediate response.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
