import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, CheckCircle2, ShieldAlert, MapPin, Cpu, BarChart2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AIIntelligence: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles size={14} className="text-blue-400" />
            <span>POWERED BY AI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-headline text-white leading-tight">
            Intelligence That Understands <br className="hidden sm:inline" /> Real-World Problems
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed max-w-2xl">
            Our AI analyzes images and descriptions to identify issue type, severity, location and the appropriate department — helping ensure problems reach the right people instantly.
          </p>
          <div>
            <button
              onClick={() => navigate('/report')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full shadow-lg shadow-blue-600/30 transition-all text-sm mt-2"
            >
              <span>See AI in Action</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Realistic Product Visual Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Mobile Frame with AI Analysis Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            {/* Mobile Phone Mockup Container */}
            <div className="relative w-full max-w-[320px] aspect-[9/18] bg-slate-950 rounded-[40px] p-3 border-4 border-slate-800 shadow-2xl overflow-hidden ring-1 ring-white/10">
              {/* Camera Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-full z-30" />
              
              {/* Screen Content */}
              <div className="relative w-full h-full bg-slate-900 rounded-[30px] overflow-hidden flex flex-col justify-between p-4 pt-8">
                {/* Photo Preview */}
                <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-slate-700">
                  <img
                    src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80"
                    alt="Road Pothole Issue"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                    <MapPin size={10} /> FC Road, Pune
                  </div>
                </div>

                {/* Overlaid AI Analysis Result Card */}
                <div className="bg-slate-800/90 backdrop-blur-xl border border-slate-700 rounded-2xl p-4 shadow-xl text-left space-y-2 mt-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-700">
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <Cpu size={14} className="text-blue-400" /> AI Analysis Result
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-wider bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-md">
                      Verified
                    </span>
                  </div>

                  <div className="text-xs space-y-1.5 pt-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Category:</span>
                      <span className="font-bold text-white">Road Infrastructure</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Severity:</span>
                      <span className="bg-red-500/20 text-red-400 text-[10px] font-black px-2 py-0.5 rounded">HIGH</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Priority:</span>
                      <span className="bg-amber-500/20 text-amber-300 text-[10px] font-black px-2 py-0.5 rounded">HIGH</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Department:</span>
                      <span className="font-bold text-white">Public Works</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Suggested Action:</span>
                      <span className="font-semibold text-emerald-300">Repair road surface</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-700/80 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="flex items-center gap-1 text-blue-400 font-bold">
                      <Sparkles size={10} /> Powered by Gemini AI
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Desktop Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
          >
            {/* Dashboard Header Bar */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-sm font-extrabold text-white">Live Central Triage Dashboard</span>
              </div>
              <span className="text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">
                Real-Time Monitoring
              </span>
            </div>

            {/* Metrics KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                <span className="text-xs text-slate-400 font-semibold block">Total Issues</span>
                <span className="text-2xl font-black text-white mt-1 block">128</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                <span className="text-xs text-blue-400 font-semibold block">In Progress</span>
                <span className="text-2xl font-black text-blue-400 mt-1 block">96</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                <span className="text-xs text-emerald-400 font-semibold block">Resolved</span>
                <span className="text-2xl font-black text-emerald-400 mt-1 block">28</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                <span className="text-xs text-red-400 font-semibold block">SLA Breached</span>
                <span className="text-2xl font-black text-red-400 mt-1 block">4</span>
              </div>
            </div>

            {/* Map & Categories Bar Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              {/* Map Graphic Preview */}
              <div className="sm:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-4 relative min-h-[160px] overflow-hidden flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-slate-400 font-bold mb-2">
                  <span className="flex items-center gap-1"><MapPin size={12} className="text-blue-400" /> Geographic Heatmap</span>
                  <span className="text-emerald-400 text-[10px]">Active Sync</span>
                </div>
                {/* Simulated map background grid */}
                <div className="w-full h-24 bg-slate-950 rounded-xl border border-slate-800 relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
                  <div className="w-4 h-4 rounded-full bg-blue-500/30 border border-blue-400 animate-ping absolute top-6 left-12" />
                  <div className="w-4 h-4 rounded-full bg-red-500/30 border border-red-400 animate-ping absolute bottom-6 right-16" />
                  <div className="w-4 h-4 rounded-full bg-emerald-500/30 border border-emerald-400 animate-ping absolute top-10 right-24" />
                </div>
              </div>

              {/* Issues by Category */}
              <div className="sm:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="text-xs text-slate-400 font-bold flex items-center gap-1">
                  <BarChart2 size={12} className="text-purple-400" /> Issues by Category
                </div>

                <div className="space-y-2 text-[11px]">
                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Roads</span>
                      <span className="font-bold">52%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full w-[52%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Garbage</span>
                      <span className="font-bold">28%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[28%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Water Supply</span>
                      <span className="font-bold">20%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full w-[20%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
