import React from 'react';
import { motion } from 'motion/react';
import { BarChart3, TrendingUp, CheckCircle2, Clock, PieChart, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const BusinessDashboardSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#079669]/10 text-[#079669] text-xs font-semibold">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Executive Operational Intelligence</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1736] tracking-tight">
              Real-Time Facility Analytics & SLA Reporting
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              Gain complete visibility across all facilities. Monitor resolution times, track department performance, identify recurring equipment failures, and optimize operational budgets.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#2447E8]/10 text-[#2447E8] flex items-center justify-center shrink-0">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">40% Faster Issue Resolution</h4>
                  <p className="text-[11px] text-slate-500">Automated triage removes manual dispatch overhead.</p>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#079669]/10 text-[#079669] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">98.5% SLA Compliance</h4>
                  <p className="text-[11px] text-slate-500">Escalation alerts eliminate forgotten work orders.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigate('/business/login')}
                className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#0B1736] hover:bg-slate-800 shadow transition-colors flex items-center gap-2"
              >
                <span>Launch Business Portal Demo</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Right Visual Column: Sample Analytics Dashboard Mockup */}
          <div className="lg:col-span-7">
            <div className="bg-[#0B1736] p-6 rounded-2xl border border-slate-700 shadow-2xl text-white space-y-5">
              <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <div>
                  <h4 className="text-sm font-bold text-white">Global Operations Control Center</h4>
                  <p className="text-[10px] text-slate-400">Sample analytics dashboard • Live feed demo</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  4 Active Sites
                </span>
              </div>

              {/* Grid of KPI Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400">Total Tickets (Month)</div>
                  <div className="text-xl font-extrabold text-white mt-1">428</div>
                  <div className="text-[9px] text-emerald-400 mt-0.5">↑ 12% vs last mo</div>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400">Avg Resolution</div>
                  <div className="text-xl font-extrabold text-emerald-400 mt-1">34 mins</div>
                  <div className="text-[9px] text-slate-400 mt-0.5">Target: 45 mins</div>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400">SLA Breach Rate</div>
                  <div className="text-xl font-extrabold text-indigo-400 mt-1">1.2%</div>
                  <div className="text-[9px] text-emerald-400 mt-0.5">↓ 3.4% improvement</div>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400">Staff Rating</div>
                  <div className="text-xl font-extrabold text-amber-400 mt-1">4.9 / 5</div>
                  <div className="text-[9px] text-slate-400 mt-0.5">Based on 310 ratings</div>
                </div>
              </div>

              {/* Department Resolution Bar Mockup */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-300">Department Resolution Breakdown</span>
                  <span className="text-[10px] text-slate-500">Live SLA status</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-300">Electrical & Power</span>
                      <span className="text-emerald-400 font-semibold">98% SLA Met</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '98%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-300">HVAC & Climate Control</span>
                      <span className="text-emerald-400 font-semibold">95% SLA Met</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-[#079669] rounded-full" style={{ width: '95%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-300">Plumbing & Water</span>
                      <span className="text-indigo-400 font-semibold">92% SLA Met</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-[#2447E8] rounded-full" style={{ width: '92%' }} />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
