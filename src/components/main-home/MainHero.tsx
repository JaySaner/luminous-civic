import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  MapPin, 
  Cpu, 
  Building2, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  Play, 
  AlertTriangle, 
  Camera, 
  Brain, 
  Check, 
  Search, 
  ChevronDown, 
  ArrowLeft,
  Leaf,
  QrCode,
  Clock,
  Layers,
  ShieldCheck,
  Wrench,
  Zap,
  Landmark,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MainHero: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'both' | 'civic' | 'business'>('both');

  return (
    <section className="relative pt-[90px] pb-16 overflow-hidden bg-gradient-to-b from-[#EEF4FF]/90 via-[#F6F9FF] to-white">
      {/* Background Decorative Grid & Glow Effects */}
      <div className="absolute inset-0 lc-dot-bg opacity-30 pointer-events-none" />
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        
        {/* Top Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-start mb-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide bg-blue-500/10 text-[#2447E8] border border-blue-500/20 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#2447E8]" />
            <span>AI-POWERED REPORT-TO-RESOLUTION FOR CITIES & ENTERPRISES</span>
          </div>
        </motion.div>

        {/* Hero Grid: Left Content, Right Interactive Dual 3D Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* LEFT COLUMN — Main Headline & Dual Platform Options */}
          <div className="lg:col-span-5 space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0B1736] tracking-tight font-headline leading-[1.05]"
            >
              From Problems{' '}
              <span className="relative inline-block text-[#2447E8]">
                to Progress.
                <svg
                  className="absolute -bottom-2 left-0 right-0 w-full"
                  height="10"
                  viewBox="0 0 240 10"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 7 Q 60 2, 120 6 T 237 4"
                    stroke="#079669"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed"
            >
              One platform with two dedicated solutions — powering civic issue reporting for citizens and smart facility operations for organizations.
            </motion.p>

            {/* Platform Highlights List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="space-y-3 pt-1"
            >
              <div
                onClick={() => setActiveTab('civic')}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  activeTab === 'civic' || activeTab === 'both'
                    ? 'bg-blue-50/80 border-blue-200 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-[#2447E8] text-white flex items-center justify-center shrink-0">
                  <Landmark className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    Civic Platform
                    <span className="text-[10px] font-normal px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                      Citizens & Cities
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Public issue reporting, AI authority mapping, department routing & community resolution.
                  </p>
                </div>
              </div>

              <div
                onClick={() => setActiveTab('business')}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  activeTab === 'business' || activeTab === 'both'
                    ? 'bg-emerald-50/80 border-emerald-200 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-[#079669] text-white flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    Business & Industry Platform
                    <span className="text-[10px] font-normal px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      Enterprise & Facilities
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    QR-code issue reporting, AI triage, automated department dispatch, SLA timers & analytics.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
            >
              <button
                onClick={() => navigate('/civic')}
                className="px-6 py-3.5 rounded-xl font-bold text-xs text-white bg-[#2447E8] hover:bg-blue-700 shadow-lg shadow-blue-600/25 transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <span>Explore Civic Platform</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate('/business-platform')}
                className="px-6 py-3.5 rounded-xl font-bold text-xs text-white bg-[#079669] hover:bg-[#068059] shadow-lg shadow-[#079669]/25 transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <span>Explore Business Platform</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* RIGHT COLUMN — Dual Platform 3D Showcase */}
          <div className="lg:col-span-7 relative">
            
            {/* View Mode Selector Bar */}
            <div className="flex items-center justify-between mb-3 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm max-w-md mx-auto lg:mx-0">
              <span className="text-[11px] font-bold text-slate-500 pl-2">Preview Mode:</span>
              <div className="flex items-center gap-1 text-xs">
                <button
                  onClick={() => setActiveTab('both')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    activeTab === 'both' ? 'bg-[#0B1736] text-white shadow' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Dual Split View
                </button>
                <button
                  onClick={() => setActiveTab('civic')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    activeTab === 'civic' ? 'bg-[#2447E8] text-white shadow' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Civic Map
                </button>
                <button
                  onClick={() => setActiveTab('business')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    activeTab === 'business' ? 'bg-[#079669] text-white shadow' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Business Ops
                </button>
              </div>
            </div>

            {/* DUAL PLATFORM VISUAL DISPLAY */}
            <AnimatePresence mode="wait">
              {activeTab === 'both' && (
                <motion.div
                  key="both"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative"
                >
                  {/* LEFT CARD — CIVIC PLATFORM SHOWCASE */}
                  <div className="bg-slate-900 rounded-2xl border border-slate-700 p-4 text-white shadow-2xl space-y-3 relative overflow-hidden group hover:border-blue-500 transition-colors">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                      <div className="flex items-center gap-2">
                        <Landmark className="w-4 h-4 text-blue-400" />
                        <span className="text-xs font-bold text-white">Civic Issue Platform</span>
                      </div>
                      <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded font-mono border border-blue-500/30">
                        City Live Feed
                      </span>
                    </div>

                    {/* Incident Photo Preview */}
                    <div className="relative h-28 rounded-xl overflow-hidden bg-slate-800">
                      <img
                        src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=400&q=80"
                        alt="Pothole Damage"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-[#2447E8]/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                        <Sparkles className="w-3 h-3" /> AI City Analysis
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-bold text-slate-100">Deep Pothole Hazard</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">FC Road, Shivajinagar · PMC Authority</div>
                    </div>

                    {/* AI Dispatch Box */}
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-[10px] space-y-1">
                      <div className="text-blue-400 font-semibold flex items-center gap-1">
                        <Cpu className="w-3 h-3" /> Auto-Routed to Public Works
                      </div>
                      <div className="text-slate-300 flex justify-between">
                        <span>Severity: High</span>
                        <span className="text-amber-400 font-bold">Status: In Progress</span>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate('/civic')}
                      className="w-full py-2 rounded-lg bg-[#2447E8] text-white text-xs font-bold text-center hover:bg-blue-600 transition-colors shadow flex items-center justify-center gap-1.5"
                    >
                      <span>Open Civic Platform</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* RIGHT CARD — BUSINESS PLATFORM SHOWCASE */}
                  <div className="bg-slate-900 rounded-2xl border border-slate-700 p-4 text-white shadow-2xl space-y-3 relative overflow-hidden group hover:border-emerald-500 transition-colors">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold text-white">Business Platform</span>
                      </div>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono border border-emerald-500/30">
                        Facility Suite
                      </span>
                    </div>

                    {/* Incident Photo Preview */}
                    <div className="relative h-28 rounded-xl overflow-hidden bg-slate-800">
                      <img
                        src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80"
                        alt="HVAC Facility Leak"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-[#079669]/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                        <QrCode className="w-3 h-3" /> QR Code Scan #TB-304
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-bold text-slate-100">AC Unit Water Leak</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Tower B · Conf Room 3 · HVAC Dept</div>
                    </div>

                    {/* SLA Timer Box */}
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-[10px] space-y-1">
                      <div className="text-emerald-400 font-semibold flex items-center justify-between">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> SLA Countdown</span>
                        <span className="font-mono text-amber-400 font-bold">18m 42s</span>
                      </div>
                      <div className="text-slate-300 flex justify-between">
                        <span>Technician: Assigned</span>
                        <span className="text-emerald-400 font-bold">SLA On Track</span>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate('/business-platform')}
                      className="w-full py-2 rounded-lg bg-[#079669] text-white text-xs font-bold text-center hover:bg-[#068059] transition-colors shadow flex items-center justify-center gap-1.5"
                    >
                      <span>Open Business Platform</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'civic' && (
                <motion.div
                  key="civic"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  className="bg-slate-900 rounded-2xl border border-slate-700 p-5 text-white shadow-2xl space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Landmark className="w-5 h-5 text-blue-400" />
                      <div>
                        <div className="text-sm font-bold text-white">Civic Issue & Map Platform</div>
                        <div className="text-[10px] text-slate-400">Public issues • Citizen reporting • Authority routing</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      Live City Map
                    </span>
                  </div>

                  <div className="relative h-56 bg-[#101b3b] rounded-xl overflow-hidden p-3 border border-slate-800">
                    <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 500 250">
                      <path d="M-10 150 Q 150 110, 300 180 T 510 130" stroke="#3b82f6" strokeWidth="20" fill="none" />
                      <path d="M100 0 L 100 250 M 0 100 L 500 100 M 350 0 L 350 250" stroke="#475569" strokeWidth="3" strokeDasharray="4 4" fill="none" />
                    </svg>

                    <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-bold text-slate-200 border border-slate-700">
                      Pune City Command Area
                    </div>

                    <div className="absolute top-1/3 left-1/4 flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-xs shadow-lg animate-bounce">
                        !
                      </div>
                      <span className="text-[9px] bg-slate-900/90 text-slate-200 px-1.5 py-0.5 rounded mt-0.5">Shivajinagar · Road Damage</span>
                    </div>

                    <div className="absolute top-1/2 left-1/2 flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-lg">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[9px] bg-slate-900/90 text-slate-200 px-1.5 py-0.5 rounded mt-0.5">Sadashiv Peth · Garbage</span>
                    </div>

                    <div className="absolute bottom-8 right-1/3 flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-lg">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[9px] bg-slate-900/90 text-slate-200 px-1.5 py-0.5 rounded mt-0.5">Karve Nagar · Resolved</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                      <div className="text-[10px] text-slate-400">Open Reports</div>
                      <div className="text-sm font-extrabold text-white mt-0.5">24</div>
                    </div>
                    <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                      <div className="text-[10px] text-slate-400">Assigned</div>
                      <div className="text-sm font-extrabold text-amber-400 mt-0.5">8</div>
                    </div>
                    <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                      <div className="text-[10px] text-slate-400">Resolved Today</div>
                      <div className="text-sm font-extrabold text-emerald-400 mt-0.5">12</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'business' && (
                <motion.div
                  key="business"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  className="bg-slate-900 rounded-2xl border border-slate-700 p-5 text-white shadow-2xl space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-emerald-400" />
                      <div>
                        <div className="text-sm font-bold text-white">Business Operations & Facility Suite</div>
                        <div className="text-[10px] text-slate-400">QR reporting • AI triage • Auto dispatch • SLA tracking</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Facility Ops
                    </span>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-200">Active Work Order Stream</span>
                      <span className="text-[10px] text-emerald-400">SLA Compliance: 98.4%</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 flex justify-between items-center">
                        <div>
                          <div className="font-semibold text-slate-200">Elevator 2 Bleep Signal</div>
                          <div className="text-[10px] text-slate-400">Scanned QR #ELV-2 · Electrical Dept</div>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 font-bold">
                          In Progress
                        </span>
                      </div>

                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 flex justify-between items-center">
                        <div>
                          <div className="font-semibold text-slate-200">Server Room AC Temperature High</div>
                          <div className="text-[10px] text-slate-400">AI Priority High · HVAC Dept</div>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-bold">
                          Dispatched (SLA 15m)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                      <div className="text-[10px] text-slate-400">Active Techs</div>
                      <div className="text-sm font-extrabold text-white mt-0.5">38</div>
                    </div>
                    <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                      <div className="text-[10px] text-slate-400">AI Auto-Triage</div>
                      <div className="text-sm font-extrabold text-emerald-400 mt-0.5">96.8%</div>
                    </div>
                    <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                      <div className="text-[10px] text-slate-400">Avg Resolution</div>
                      <div className="text-sm font-extrabold text-[#2447E8] mt-0.5">22m</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

        {/* BOTTOM 5-STEP WORKFLOW BAR & CENTERED BRAND TAGLINE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-14 pt-8 border-t border-slate-200/80 space-y-6"
        >
          {/* 5 Process Step Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
            
            {/* Step 1 */}
            <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200/80 shadow-sm">
              <div className="w-9 h-9 rounded-full bg-blue-500/10 text-[#2447E8] flex items-center justify-center shrink-0">
                <Camera className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">1. REPORT / SCAN QR</div>
                <div className="text-[10px] text-slate-500">Citizen photo or QR code scan</div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200/80 shadow-sm">
              <div className="w-9 h-9 rounded-full bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0">
                <Brain className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">2. AI AUTO-TRIAGE</div>
                <div className="text-[10px] text-slate-500">Gemini AI assesses urgency</div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200/80 shadow-sm">
              <div className="w-9 h-9 rounded-full bg-teal-500/10 text-[#079669] flex items-center justify-center shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">3. DIRECT DISPATCH</div>
                <div className="text-[10px] text-slate-500">Routes to city or facility team</div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200/80 shadow-sm">
              <div className="w-9 h-9 rounded-full bg-indigo-500/10 text-[#2447E8] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">4. SLA & TRACKING</div>
                <div className="text-[10px] text-slate-500">Live countdown & status updates</div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200/80 shadow-sm">
              <div className="w-9 h-9 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">5. VERIFIED RESOLUTION</div>
                <div className="text-[10px] text-slate-500">Photo proof & compliance log</div>
              </div>
            </div>

          </div>

          {/* Centered Tagline Pill */}
          <div className="flex justify-center pt-1">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#0B1736] text-white shadow-xl border border-slate-700 text-xs">
              <div className="w-6 h-6 rounded-full bg-[#079669]/20 text-[#079669] flex items-center justify-center shrink-0 font-bold">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <span className="font-semibold text-slate-200">
                Cleaner Cities • Stronger Communities • Smarter Solutions
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
