import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  Check, Landmark, History, Brain, FileText, AtSign, FileCode,
  LayoutDashboard, ArrowRight, CloudUpload, Trash2, MapPin,
  Loader2, TrendingUp, Users, Clock, Globe, Zap, Camera
} from 'lucide-react';

import { analyzeCivicIssue, type AnalysisResult } from '@/src/lib/gemini';
import { cn, compressImage } from '@/src/lib/utils';
import { db, auth, loginWithGoogle, handleFirestoreError, OperationType } from '@/src/lib/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useFirebase } from '@/src/lib/FirebaseProvider';
import { useLanguage } from '@/src/lib/LanguageProvider';

export const Home = () => {
  const navigate = useNavigate();
  const { user } = useFirebase();
  const { language, setLanguage, t } = useLanguage();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    description: ''
  });

  const detectLocation = () => {
    if (!("geolocation" in navigator)) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData(prev => ({
          ...prev,
          address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)} (Auto-detected)`
        }));
        setIsDetectingLocation(false);
      },
      (error) => {
        console.error("Error detecting location:", error);
        setIsDetectingLocation(false);
        alert("Unable to detect location. Please enter it manually.");
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  const steps = [
    "Initializing Neural Engine...",
    "Scanning Image Artifacts...",
    "Identifying Civic Issue...",
    "Mapping Municipal Authority...",
    "Drafting Legal Complaint...",
    "Finalizing Report Package..."
  ];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => { setPreview(reader.result as string); };
    reader.readAsDataURL(file);
  };

  const generateReport = async () => {
    if (!preview) return;
    setIsAnalyzing(true);
    setAnalysisStep(0);
    const runSteps = async () => {
      for (let i = 0; i < steps.length; i++) {
        setAnalysisStep(i);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    };
    try {
      const currentUser = user || auth.currentUser;
      if (!currentUser) throw new Error("User not authenticated");
      const [aiResult, compressedPreview] = await Promise.all([
        analyzeCivicIssue(preview),
        compressImage(preview),
        runSteps()
      ]);
      const reportId = `LC-${Math.floor(Math.random() * 90000) + 10000}`;
      const reportData = {
        id: reportId,
        userId: currentUser.uid,
        name: formData.name,
        address: formData.address,
        email: formData.email || currentUser.email || '',
        description: formData.description,
        issueType: aiResult.issueType,
        location: aiResult.location,
        authority: aiResult.authority,
        legalComplaint: aiResult.legalComplaint,
        preview: compressedPreview,
        status: 'Processing',
        createdAt: new Date().toISOString()
      };
      const reportRef = doc(db, 'reports', reportId);
      try {
        await setDoc(reportRef, reportData);
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `reports/${reportId}`);
      }
      navigate(`/report?id=${reportId}`);
    } catch (error) {
      console.error("Analysis failed", error);
      if (!(error instanceof Error && error.message.startsWith('{'))) {
        alert("Analysis failed. Please try again.");
      }
    } finally {
      setIsAnalyzing(false);
      setAnalysisStep(0);
    }
  };

  const flowSteps = [
    {
      step: 1,
      icon: Camera,
      title: "Upload Image",
      subtitle: "Capture the Problem",
      desc: "Snap or upload a photo of any civic issue — pothole, broken streetlight, garbage dump, waterlogging, or encroachment. Our system accepts all common image formats.",
      color: "from-blue-500 to-indigo-600",
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
      badge: "Start Here"
    },
    {
      step: 2,
      icon: Brain,
      title: "AI Detects",
      subtitle: "Smart Recognition",
      desc: "Google Gemini Vision AI scans the image in real-time, categorizes the issue type, estimates severity, and pinpoints the exact civic department responsible.",
      color: "from-violet-500 to-purple-600",
      bg: "bg-violet-50",
      iconColor: "text-violet-600",
      badge: "Powered by Gemini"
    },
    {
      step: 3,
      icon: MapPin,
      title: "Authority Mapping",
      subtitle: "Right Department",
      desc: "Using location data and issue type, we automatically identify the correct municipal body — Municipal Corporation, PWD, MSEDCL, or local water authority.",
      color: "from-emerald-500 to-teal-600",
      bg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      badge: "Auto-Routed"
    },
    {
      step: 4,
      icon: FileText,
      title: "Complaint Formed",
      subtitle: "Legal-Grade Doc",
      desc: "An NLP engine drafts a formal, legally-sound complaint in proper government format — complete with citations, timelines, and a demand for resolution.",
      color: "from-orange-500 to-amber-600",
      bg: "bg-orange-50",
      iconColor: "text-orange-600",
      badge: "Professional"
    },
    {
      step: 5,
      icon: TrendingUp,
      title: "Track Status",
      subtitle: "Real-Time Updates",
      desc: "Monitor your complaint through every stage — from submission to in-progress to resolved. Get notified when authorities take action on your report.",
      color: "from-rose-500 to-pink-600",
      bg: "bg-rose-50",
      iconColor: "text-rose-600",
      badge: "Live Tracking"
    }
  ];

  return (
    <div className="pt-20 overflow-x-hidden">

      {/* ── Hero Section ── */}
      <section className="relative min-h-[88vh] flex items-center bg-white overflow-hidden border-b border-gray-100">

        {/* Subtle dot-grid background — barely visible */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)', backgroundSize: '28px 28px', opacity: 0.45 }} />
        {/* Soft blue tint top-right */}
        <div className="absolute top-0 right-0 w-[520px] h-[520px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at top right, rgba(23,60,229,0.06) 0%, transparent 70%)' }} />

        <div className="max-w-7xl mx-auto px-8 lg:px-12 relative z-10 w-full py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* ── Left: Copy ── */}
            <div>
              {/* Language selector — compact, top of column */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="flex mb-10">
                <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
                  {[{ id: 'en', label: 'EN' }, { id: 'hi', label: 'हि' }, { id: 'mr', label: 'म' }].map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => setLanguage(lang.id as any)}
                      className={cn(
                        "px-4 py-1.5 rounded-md text-sm font-semibold transition-all",
                        language === lang.id
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      )}
                    >{lang.label}</button>
                  ))}
                </div>
              </motion.div>

              {/* Eyebrow label */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }} className="flex items-center gap-3 mb-6">
                <span className="inline-block w-8 h-px bg-primary" />
                <span className="text-primary text-xs font-bold tracking-widest uppercase">AI-Powered Civic Reporting</span>
              </motion.div>

              {/* Main headline */}
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-headline font-extrabold text-[2.75rem] lg:text-[3.5rem] xl:text-[4rem] leading-[1.1] tracking-tight text-gray-950 mb-6"
              >
                {language === 'en' && (<>Report civic issues.<br /><span style={{ color: '#173ce5' }}>Get results fast.</span></>)}
                {language === 'hi' && (<>नागरिक समस्याएं रिपोर्ट करें।<br /><span style={{ color: '#173ce5' }}>तेज़ी से समाधान पाएं।</span></>)}
                {language === 'mr' && (<>नागरी समस्या नोंदवा।<br /><span style={{ color: '#173ce5' }}>जलद निराकरण मिळवा।</span></>)}
              </motion.h1>

              {/* Supporting paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="text-gray-500 text-lg leading-relaxed mb-10 max-w-lg"
              >
                {t('heroSubtitle')}
              </motion.p>

              {/* CTA row */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.26 }} className="flex flex-wrap items-center gap-4 mb-12">
                <button
                  onClick={() => document.getElementById('report')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-base text-white transition-all hover:opacity-90 active:scale-95"
                  style={{ background: '#173ce5' }}
                >
                  {t('startReporting')} <ArrowRight size={17} />
                </button>
                <button
                  onClick={() => { document.getElementById('report')?.scrollIntoView({ behavior: 'smooth' }); setTimeout(detectLocation, 800); }}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-base text-gray-700 bg-white border border-gray-200 transition-all hover:border-gray-300 hover:bg-gray-50 active:scale-95"
                >
                  <MapPin size={17} className="text-gray-400" /> {t('useLocation')}
                </button>
              </motion.div>

              {/* Stats row — minimal, data-driven */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.38 }} className="flex items-center gap-8 pt-8 border-t border-gray-100">
                {[
                  { value: '85%', label: 'Time saved vs traditional filing' },
                  { value: '3×', label: 'Faster issue resolution' },
                  { value: '40+', label: 'Issue types detected by AI' },
                ].map((stat, i) => (
                  <div key={i} className={cn(i > 0 && 'pl-8 border-l border-gray-100')}>
                    <p className="font-headline font-extrabold text-2xl text-gray-900">{stat.value}</p>
                    <p className="text-gray-400 text-xs mt-0.5 leading-tight max-w-[90px]">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── Right: Visual card ── */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                {/* Main card */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_8px_40px_rgba(0,0,0,0.08)] overflow-hidden">
                  {/* Card top bar */}
                  <div className="px-5 py-3.5 border-b border-gray-100 flex items-center gap-3 bg-gray-50/70">
                    <div className="flex gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-400" />
                      <span className="w-3 h-3 rounded-full bg-yellow-400" />
                      <span className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <span className="text-xs text-gray-400 font-medium mx-auto">luminous-civic.app / report</span>
                  </div>

                  {/* Card body */}
                  <div className="p-6 space-y-4">
                    {/* Issue detected */}
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-50 border border-blue-100">
                      <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                        <Brain size={18} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">AI Detected</p>
                        <p className="text-sm font-bold text-gray-900">Pothole — High Severity</p>
                        <p className="text-xs text-gray-500 mt-0.5">Routed → Municipal Corporation PWD</p>
                      </div>
                      <div className="ml-auto flex-shrink-0">
                        <span className="text-[10px] font-bold px-2 py-1 rounded-full text-green-700 bg-green-100">Confirmed</span>
                      </div>
                    </div>

                    {/* Complaint preview */}
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Generated Complaint</p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        "This is to bring to your kind attention a critical road infrastructure issue at <span className="font-semibold text-gray-900">Survey No. 42, MG Road</span>. A substantial pothole measuring approximately 3×2 ft has developed..."
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <FileText size={13} className="text-primary" />
                        <span className="text-xs text-primary font-semibold">Download PDF</span>
                        <span className="ml-auto text-xs text-gray-400">ID: LC-38421</span>
                      </div>
                    </div>

                    {/* Status tracker */}
                    <div className="flex items-center gap-3">
                      {['Submitted', 'Reviewed', 'In Progress', 'Resolved'].map((s, i) => (
                        <React.Fragment key={i}>
                          <div className="text-center">
                            <div className={cn("w-5 h-5 rounded-full mx-auto mb-1 flex items-center justify-center",
                              i < 3 ? "bg-primary" : "bg-gray-200"
                            )}>
                              {i < 3 && <Check size={10} className="text-white" />}
                            </div>
                            <p className={cn("text-[9px] font-semibold whitespace-nowrap", i < 3 ? "text-primary" : "text-gray-400")}>{s}</p>
                          </div>
                          {i < 3 && <div className={cn("flex-1 h-0.5 mb-4", i < 2 ? "bg-primary" : "bg-gray-200")} />}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating mini badge */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-2.5 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
                    <Check size={13} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">Issue resolved</p>
                    <p className="text-[10px] text-gray-400">2 days after filing</p>
                  </div>
                </div>

                {/* Floating authority tag */}
                <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-2.5 flex items-center gap-2">
                  <Landmark size={14} className="text-primary" />
                  <span className="text-xs font-bold text-gray-800">Authority Mapped</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── About / Features Section ── */}
      <section className="py-32 bg-surface-container-low relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="inline-block px-4 py-1.5 mb-4 rounded-full text-xs font-bold tracking-wider uppercase" style={{ background: 'rgba(23,60,229,0.08)', color: '#173ce5' }}>
              Why Luminous Civic
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-headline font-bold text-4xl lg:text-5xl mb-6">{t('aboutTitle')}</motion.h2>
            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-on-surface-variant text-lg max-w-2xl mx-auto">{t('aboutSubtitle')}</motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Check, title: t('feature1Title'), desc: t('feature1Desc'), gradient: 'from-blue-500 to-indigo-600', bg: 'bg-blue-50', extra: 'Supports JPEG, PNG, HEIC formats. Works even in low light.' },
              { icon: Landmark, title: t('feature2Title'), desc: t('feature2Desc'), gradient: 'from-violet-500 to-purple-600', bg: 'bg-violet-50', extra: 'Covers all municipal bodies — MCGM, PMC, NMMC, PWD, MSEDCL and more.' },
              { icon: History, title: t('feature3Title'), desc: t('feature3Desc'), gradient: 'from-teal-500 to-emerald-600', bg: 'bg-teal-50', extra: 'Download PDF, share tracking link, get status updates as your issue resolves.' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 group border border-outline-variant relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5 -translate-y-8 translate-x-8" style={{ background: `linear-gradient(135deg, ${item.bg === 'bg-blue-50' ? '#173ce5' : item.bg === 'bg-violet-50' ? '#632ce5' : '#005e6a'}, transparent)` }} />
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform", item.bg)}>
                  <item.icon size={32} className={item.gradient.includes('blue') ? 'text-blue-600' : item.gradient.includes('violet') ? 'text-violet-600' : 'text-teal-600'} />
                </div>
                <h3 className="font-headline font-bold text-2xl mb-3">{item.title}</h3>
                <p className="text-on-surface-variant leading-relaxed mb-4">{item.desc}</p>
                <p className="text-xs text-on-surface-variant/70 border-t border-outline-variant pt-4">{item.extra}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Seamless Flow Section ── */}
      <section className="py-32 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #f7f9fb 0%, #eef1ff 50%, #f7f9fb 100%)' }}>
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(23,60,229,0.1) 0%, transparent 70%)' }} />
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(99,44,229,0.1) 0%, transparent 70%)' }} />
        </div>

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="inline-block px-4 py-1.5 mb-4 rounded-full text-xs font-bold tracking-wider uppercase" style={{ background: 'rgba(99,44,229,0.08)', color: '#632ce5' }}>
              How It Works
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-headline font-bold text-4xl lg:text-5xl mb-4">
              The Seamless Flow
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-on-surface-variant text-lg max-w-xl mx-auto">
              From a simple photo to a formal complaint — our AI handles everything in 5 intelligent steps.
            </motion.p>
          </div>

          {/* Desktop Flow — 3-row grid: badges / circles+connectors / text */}
          <div className="hidden lg:block">
            {/* ── ROW 1: Badges ── */}
            <div className="grid grid-cols-[1fr_40px_1fr_40px_1fr_40px_1fr_40px_1fr] mb-4">
              {flowSteps.map((item, i) => (
                <React.Fragment key={i}>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                    className="flex justify-center"
                  >
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase whitespace-nowrap" style={{ background: 'rgba(23,60,229,0.08)', color: '#173ce5' }}>
                      {item.badge}
                    </span>
                  </motion.div>
                  {/* empty spacer for arrow column */}
                  {i < flowSteps.length - 1 && <div />}
                </React.Fragment>
              ))}
            </div>

            {/* ── ROW 2: Circles + connecting line + arrows ── */}
            <div className="grid grid-cols-[1fr_40px_1fr_40px_1fr_40px_1fr_40px_1fr] items-center mb-6 relative">
              {/* Full-width connecting line behind everything */}
              <div className="absolute left-[calc(50%/9)] right-[calc(50%/9)] top-1/2 -translate-y-1/2 h-0.5 z-0 pointer-events-none" style={{ background: 'linear-gradient(90deg, #173ce5, #632ce5, #10b981, #f97316, #f43f5e)' }}>
                <div className="absolute inset-0 opacity-40" style={{ background: 'inherit', filter: 'blur(3px)' }} />
              </div>

              {flowSteps.map((item, i) => (
                <React.Fragment key={i}>
                  {/* Circle */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, type: 'spring', stiffness: 200 }}
                    whileHover={{ scale: 1.12, y: -4 }}
                    className="flex justify-center relative z-10"
                  >
                    <div className="relative">
                      <div className={cn("w-20 h-20 rounded-full flex items-center justify-center text-white shadow-2xl bg-gradient-to-br", item.color)}>
                        <item.icon size={30} />
                      </div>
                      {/* Step number */}
                      <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-white text-xs font-black flex items-center justify-center shadow-lg" style={{ color: '#173ce5', border: '2px solid #173ce5' }}>
                        {item.step}
                      </div>
                      {/* Glow */}
                      <div className={cn("absolute inset-0 rounded-full opacity-25 blur-lg scale-125 -z-10 bg-gradient-to-br", item.color)} />
                    </div>
                  </motion.div>

                  {/* Arrow connector */}
                  {i < flowSteps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12 + 0.25 }}
                      className="flex justify-center z-20"
                    >
                      <div className="w-9 h-9 rounded-full flex items-center justify-center shadow-md" style={{ background: 'white', border: '2px solid rgba(99,44,229,0.25)' }}>
                        <ArrowRight size={16} style={{ color: '#632ce5' }} />
                      </div>
                    </motion.div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* ── ROW 3: Title + Subtitle + Description ── */}
            <div className="grid grid-cols-[1fr_40px_1fr_40px_1fr_40px_1fr_40px_1fr] gap-y-0">
              {flowSteps.map((item, i) => (
                <React.Fragment key={i}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + 0.1 }}
                    className="text-center px-2"
                  >
                    <h4 className="font-headline font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: '#632ce5' }}>{item.subtitle}</p>
                    <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                  {/* empty spacer for arrow column */}
                  {i < flowSteps.length - 1 && <div />}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Mobile / Tablet Flow — vertical with arrows */}
          <div className="flex lg:hidden flex-col items-center gap-0">
            {flowSteps.map((item, i) => (
              <React.Fragment key={i}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-6 w-full max-w-lg bg-white rounded-2xl p-6 shadow-md border border-outline-variant"
                >
                  <div className="relative flex-shrink-0">
                    <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl bg-gradient-to-br", item.color)}>
                      <item.icon size={28} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white text-[10px] font-black flex items-center justify-center shadow" style={{ color: '#173ce5', border: '1.5px solid #173ce5' }}>{item.step}</div>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#632ce5' }}>{item.badge}</span>
                    <h4 className="font-headline font-bold text-lg mt-0.5 mb-1">{item.title}</h4>
                    <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
                {i < flowSteps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center my-2"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-0.5 h-4" style={{ background: 'linear-gradient(to bottom, #632ce5, transparent)' }} />
                      <div className="w-8 h-8 rounded-full flex items-center justify-center shadow" style={{ background: 'white', border: '2px solid rgba(99,44,229,0.3)' }}>
                        <ArrowRight size={14} className="rotate-90" style={{ color: '#632ce5' }} />
                      </div>
                      <div className="w-0.5 h-4" style={{ background: 'linear-gradient(to bottom, transparent, #632ce5)' }} />
                    </div>
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* CTA under flow */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }} className="text-center mt-16">
            <p className="text-on-surface-variant mb-6 text-base">Ready to experience it yourself?</p>
            <button
              onClick={() => document.getElementById('report')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-white text-lg shadow-xl hover:scale-105 transition-transform"
              style={{ background: 'linear-gradient(135deg, #173ce5, #632ce5)', boxShadow: '0 8px 24px rgba(99,44,229,0.35)' }}
            >
              File a Complaint Now <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── Report Interaction ── */}
      <section className="py-24 bg-surface-container-low/30 scroll-mt-20" id="report">
        <div className="max-w-4xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-12 shadow-2xl relative overflow-hidden border border-outline-variant"
          >
            <div className="absolute top-0 left-0 w-2 h-full civic-pulse-gradient" />
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5 -translate-y-20 translate-x-20" style={{ background: 'radial-gradient(circle, #632ce5, transparent)' }} />
            <h2 className="font-headline font-bold text-3xl mb-2 text-center">{t('readyToFix')}</h2>
            <p className="text-center text-on-surface-variant mb-10 text-sm">Fill in your details, upload a photo, and let AI do the rest.</p>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <label className="dashed-border min-h-[300px] flex flex-col items-center justify-center p-8 text-center group hover:bg-primary/5 transition-colors cursor-pointer relative rounded-2xl">
                  <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                  <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <CloudUpload size={32} />
                  </div>
                  <h4 className="text-lg font-bold mb-1">{t('uploadEvidence')}</h4>
                  <p className="text-on-surface-variant text-sm">{t('snapPhoto')}</p>
                  <p className="text-xs text-on-surface-variant/50 mt-2">JPEG, PNG, HEIC supported</p>
                </label>

                {preview && (
                  <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant relative overflow-hidden animate-in fade-in slide-in-from-bottom-4">
                    <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-lg mb-2" referrerPolicy="no-referrer" />
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold truncate max-w-[200px]">EVIDENCE_CAPTURE.JPG</span>
                      <button onClick={() => { setPreview(null); setResult(null); }} className="text-error cursor-pointer hover:scale-110 transition-transform">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {[
                  { label: t('fullName'), type: 'text', key: 'name', placeholder: t('fullName'), extra: null },
                  { label: t('email'), type: 'email', key: 'email', placeholder: 'your@email.com', extra: null },
                ].map((field) => (
                  <div key={field.key} className="space-y-2 text-left">
                    <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      value={(formData as any)[field.key]}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    />
                  </div>
                ))}

                <div className="space-y-2 text-left">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">{t('address')}</label>
                    <button onClick={detectLocation} disabled={isDetectingLocation} className="text-xs font-bold text-primary flex items-center gap-1 hover:underline disabled:opacity-50">
                      {isDetectingLocation ? <Loader2 size={12} className="animate-spin" /> : <MapPin size={12} />}
                      {isDetectingLocation ? "Detecting..." : t('useLocation')}
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder={t('address')}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>

                <div className="space-y-2 text-left">
                  <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Description</label>
                  <textarea
                    placeholder={t('describeIssue')}
                    rows={4}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                {loginError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 font-medium">
                    ⚠️ {loginError}
                  </div>
                )}

                {!user ? (
                  <button
                    onClick={async () => {
                      setLoginError(null);
                      try {
                        await loginWithGoogle();
                      } catch (error: any) {
                        const msg = error?.code === 'auth/popup-blocked'
                          ? 'Popup was blocked by your browser. Please allow popups for localhost and try again.'
                          : error?.code === 'auth/popup-closed-by-user'
                            ? 'Sign-in was cancelled. Please try again.'
                            : error?.code === 'auth/unauthorized-domain'
                              ? 'This domain is not authorized in Firebase. Please follow the Firebase Console setup steps.'
                              : error?.message || 'Sign-in failed. Check browser console for details.';
                        setLoginError(msg);
                      }
                    }}
                    className="w-full civic-pulse-gradient text-white py-6 rounded-full font-bold text-xl shadow-lg hover:shadow-primary/25 transition-all mt-4"
                  >
                    {t('signIn')}
                  </button>
                ) : (
                  <button
                    onClick={generateReport}
                    disabled={!preview || isAnalyzing || !formData.name || !formData.address}
                    className="w-full civic-pulse-gradient text-white py-6 rounded-full font-bold text-xl shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                  >
                    {isAnalyzing ? t('analyzing') : t('generateReport')}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Features Bento Grid ── */}
      <section className="py-32 bg-surface-container-low/50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 mb-4 rounded-full text-xs font-bold tracking-wider uppercase" style={{ background: 'rgba(23,60,229,0.08)', color: '#173ce5' }}>Capabilities</span>
            <h2 className="font-headline font-bold text-4xl">Everything You Need</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">
            {[
              { icon: Brain, title: "AI Detection", desc: "Computer vision trained on urban maintenance datasets. Identifies 40+ civic issue types with 95%+ accuracy.", span: "md:col-span-3 lg:col-span-4", color: "text-primary", bg: "bg-blue-50" },
              { icon: FileText, title: "Complaint Generator", desc: "NLP engine drafts persuasive, legally-sound reports in proper government format with all required citations.", span: "md:col-span-3 lg:col-span-4", color: "text-secondary", bg: "bg-violet-50" },
              { icon: AtSign, title: "Email Integration", desc: "Direct bridge to official city council and utility inboxes. CC authorities automatically for faster response.", span: "md:col-span-6 lg:col-span-4", color: "text-tertiary", bg: "bg-teal-50" },
              { icon: FileCode, title: "Smart PDF Export", desc: "Download evidence-packed documents for your personal records or physical filing with a single click.", span: "md:col-span-4 lg:col-span-6", color: "text-primary", bg: "bg-indigo-50" },
              { icon: LayoutDashboard, title: "Dashboard", desc: "Centralized hub for all your civic activities and history.", span: "md:col-span-2 lg:col-span-3", color: "text-secondary", bg: "bg-purple-50" },
              { icon: Clock, title: "Follow-Up", desc: "Automated nudges if responses are delayed beyond SLA timelines.", span: "md:col-span-6 lg:col-span-3", color: "text-tertiary", bg: "bg-emerald-50" }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className={cn(feature.span, "glass-panel p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group")}
              >
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform", feature.bg)}>
                  <feature.icon className={feature.color} size={24} />
                </div>
                <h4 className="font-headline font-bold text-xl mb-2">{feature.title}</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Section ── */}
      <section className="py-32 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0e27 0%, #130a2e 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #173ce5, transparent)', filter: 'blur(60px)' }} />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #632ce5, transparent)', filter: 'blur(60px)' }} />
        </div>
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-headline font-bold text-3xl mb-4 text-center text-white">Built for Scale</motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-white/40 text-center mb-16 text-base max-w-xl mx-auto">Luminous Civic is engineered to handle thousands of citizens and millions of complaints with zero friction.</motion.p>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { val: "85%", label: "Time Saved", desc: "Average reduction in report filing time for citizens vs. traditional methods.", icon: TrendingUp, color: "#60a5fa" },
              { val: "Simple", label: "Easy to Use", desc: "Designed for everyone — from teenagers to senior citizens with no technical knowledge.", icon: Users, color: "#a78bfa" },
              { val: "Unified", label: "City Management", desc: "Centralized database for all municipal departments across districts.", icon: Globe, color: "#34d399" },
              { val: "3×", label: "Faster Resolution", desc: "Issues resolved significantly faster through AI-powered smart routing to right authority.", icon: Zap, color: "#fb923c" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="p-8 rounded-2xl transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${stat.color}20` }}>
                  <stat.icon size={20} style={{ color: stat.color }} />
                </div>
                <h4 className="font-headline font-bold text-4xl mb-1" style={{ color: stat.color }}>{stat.val}</h4>
                <p className="font-bold text-white mb-2">{stat.label}</p>
                <p className="text-white/40 text-sm leading-relaxed">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Full Screen Analysis Overlay ── */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-on-surface/95 backdrop-blur-xl flex items-center justify-center p-8"
          >
            <div className="max-w-2xl w-full text-center">
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mb-12 relative inline-block">
                <div className="w-32 h-32 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Brain className="text-primary animate-pulse" size={48} />
                </div>
              </motion.div>
              <h2 className="text-white font-headline font-extrabold text-4xl mb-4 tracking-tight">Luminous AI Analysis</h2>
              <p className="text-white/50 font-bold uppercase tracking-[0.3em] text-xs mb-12">Processing Civic Intelligence</p>
              <div className="space-y-8">
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary shadow-[0_0_20px_rgba(99,44,229,0.8)]"
                    initial={{ width: "0%" }}
                    animate={{ width: `${((analysisStep + 1) / steps.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {steps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: i <= analysisStep ? 1 : 0.2, x: i === analysisStep ? 0 : (i < analysisStep ? 0 : -20), scale: i === analysisStep ? 1.05 : 1 }}
                      className={cn("flex items-center gap-4 p-4 rounded-xl transition-all", i === analysisStep ? "bg-white/10 border border-white/20" : "bg-transparent")}
                    >
                      <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm", i < analysisStep ? "bg-green-500 text-white" : (i === analysisStep ? "bg-primary text-white" : "bg-white/10 text-white/30"))}>
                        {i < analysisStep ? <Check size={16} /> : i + 1}
                      </div>
                      <span className={cn("font-bold uppercase tracking-widest text-sm", i === analysisStep ? "text-white" : "text-white/30")}>{step}</span>
                      {i === analysisStep && <Loader2 className="ml-auto text-primary animate-spin" size={20} />}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
