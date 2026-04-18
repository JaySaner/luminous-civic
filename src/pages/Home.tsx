import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Check, Landmark, History, Brain, FileText, AtSign, FileCode, LayoutDashboard, ArrowRight, CloudUpload, PlusCircle, Trash2, Send, Download, TrendingUp, MapPin, Loader2 } from 'lucide-react';
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
  
  // Form fields
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
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const generateReport = async () => {
    if (!preview) return;
    
    setIsAnalyzing(true);
    setAnalysisStep(0);

    // Start animation sequence
    const runSteps = async () => {
      for (let i = 0; i < steps.length; i++) {
        setAnalysisStep(i);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    };

    try {
      // Ensure user is logged in before saving
      const currentUser = user || auth.currentUser;
      if (!currentUser) {
        throw new Error("User not authenticated");
      }

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
      
      // Save to Firestore
      const reportRef = doc(db, 'reports', reportId);
      try {
        await setDoc(reportRef, reportData);
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `reports/${reportId}`);
      }
      
      // Navigate to report page
      navigate(`/report?id=${reportId}`);
    } catch (error) {
      console.error("Analysis failed", error);
      // ErrorBoundary will catch Firestore errors thrown by handleFirestoreError
      if (!(error instanceof Error && error.message.startsWith('{'))) {
        alert("Analysis failed. Please try again.");
      }
    } finally {
      setIsAnalyzing(false);
      setAnalysisStep(0);
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-surface">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-8 flex flex-col items-center text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            {/* Language Selection Tab */}
            <div className="flex justify-center mb-12">
              <div className="bg-white/50 backdrop-blur-xl p-1.5 rounded-2xl border border-outline-variant flex gap-1 shadow-xl">
                {[
                  { id: 'en', label: 'English' },
                  { id: 'hi', label: 'हिन्दी (Hindi)' },
                  { id: 'mr', label: 'मराठी (Marathi)' }
                ].map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setLanguage(lang.id as any)}
                    className={cn(
                      "px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                      language === lang.id 
                        ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105" 
                        : "text-on-surface-variant hover:bg-white/50"
                    )}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            <span className="inline-block px-4 py-1.5 mb-6 text-primary bg-primary/10 rounded-full text-xs font-bold tracking-wider uppercase font-headline">
              {t('processing')}
            </span>
            <h1 className="font-headline font-extrabold text-6xl lg:text-7xl leading-tight mb-8 text-on-surface">
              {t('heroTitle').split('AI')[0]}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                {language === 'en' ? 'Problems in Seconds' : (language === 'hi' ? 'सेकंडों में' : 'सेकंदात')}
              </span> <br/>
              {language === 'en' ? 'with AI' : (language === 'hi' ? 'AI के साथ' : 'AI सह')}
            </h1>
            <p className="text-on-surface-variant text-xl mb-12 leading-relaxed mx-auto max-w-2xl">
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <button 
                onClick={() => document.getElementById('report')?.scrollIntoView({ behavior: 'smooth' })}
                className="civic-pulse-gradient text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:scale-105 transition-transform"
              >
                {t('startReporting')}
              </button>
              <button 
                onClick={() => {
                  document.getElementById('report')?.scrollIntoView({ behavior: 'smooth' });
                  setTimeout(detectLocation, 800);
                }}
                className="bg-white/50 backdrop-blur text-on-surface px-10 py-5 rounded-full font-bold text-lg hover:bg-white/80 transition-colors flex items-center gap-2"
              >
                <MapPin size={20} />
                {t('useLocation')}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-24">
            <h2 className="font-headline font-bold text-4xl mb-6">{t('aboutTitle')}</h2>
            <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
              {t('aboutSubtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: Check, title: t('feature1Title'), desc: t('feature1Desc'), color: "primary" },
              { icon: Landmark, title: t('feature2Title'), desc: t('feature2Desc'), color: "secondary" },
              { icon: History, title: t('feature3Title'), desc: t('feature3Desc'), color: "tertiary" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-lg shadow-sm hover:shadow-xl transition-all group"
              >
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform", `bg-${item.color}/10 text-${item.color}`)}>
                  <item.icon size={32} />
                </div>
                <h3 className="font-headline font-bold text-2xl mb-4">{item.title}</h3>
                <p className="text-on-surface-variant leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Flow Section */}
      <section className="py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="font-headline font-bold text-4xl mb-16 text-center">The Seamless Flow</h2>
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 relative">
            {[
              { step: 1, title: "Upload Image", desc: "Capture the problem instantly." },
              { step: 2, title: "AI Detects", desc: "Problem categorized by AI." },
              { step: 3, title: "Authority Mapping", desc: "Linked to relevant office." },
              { step: 4, title: "Complaint Formed", desc: "Professional doc generated." },
              { step: 5, title: "Track Status", desc: "Real-time resolution data." }
            ].map((item, i) => (
              <div key={i} className="flex-1 text-center relative z-10">
                <div className="w-20 h-20 civic-pulse-gradient text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold border-8 border-surface shadow-xl">
                  {item.step}
                </div>
                <h4 className="font-bold text-xl mb-2">{item.title}</h4>
                <p className="text-on-surface-variant text-sm px-4">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Report Interaction */}
      <section className="py-20 bg-surface-container-low/30 scroll-mt-20" id="report">
        <div className="max-w-4xl mx-auto px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-12 shadow-2xl relative overflow-hidden border border-outline-variant"
          >
            <div className="absolute top-0 left-0 w-2 h-full civic-pulse-gradient"></div>
            <h2 className="font-headline font-bold text-3xl mb-10 text-center">{t('readyToFix')}</h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <label className="dashed-border min-h-[300px] flex flex-col items-center justify-center p-8 text-center group hover:bg-primary/5 transition-colors cursor-pointer relative rounded-2xl">
                  <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                  <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <CloudUpload size={32} />
                  </div>
                  <h4 className="text-lg font-bold mb-1">{t('uploadEvidence')}</h4>
                  <p className="text-on-surface-variant text-sm">{t('snapPhoto')}</p>
                </label>

                {preview && (
                  <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant relative overflow-hidden animate-in fade-in slide-in-from-bottom-4">
                    <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-lg mb-2" referrerPolicy="no-referrer" />
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold truncate max-w-[200px]">EVIDENCE_CAPTURE.JPG</span>
                      <button onClick={() => {setPreview(null); setResult(null);}} className="text-error cursor-pointer hover:scale-110 transition-transform">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="space-y-2 text-left">
                  <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">{t('fullName')}</label>
                  <input 
                    type="text" 
                    placeholder={t('fullName')}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2 text-left">
                  <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">{t('email')}</label>
                  <input 
                    type="email" 
                    placeholder="your@email.com"
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2 text-left">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">{t('address')}</label>
                    <button 
                      onClick={detectLocation}
                      disabled={isDetectingLocation}
                      className="text-xs font-bold text-primary flex items-center gap-1 hover:underline disabled:opacity-50"
                    >
                      {isDetectingLocation ? <Loader2 size={12} className="animate-spin" /> : <MapPin size={12} />}
                      {isDetectingLocation ? "Detecting..." : t('useLocation')}
                    </button>
                  </div>
                  <input 
                    type="text" 
                    placeholder={t('address')}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
                <div className="space-y-2 text-left">
                  <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Description</label>
                  <textarea 
                    placeholder={t('describeIssue')}
                    rows={4}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                {/* Login-error message */}
                {loginError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 font-medium">
                    ⚠️ {loginError}
                  </div>
                )}

                {!user ? (
                  /* Sign-in button — always enabled, no form required */
                  <button
                    onClick={async () => {
                      setLoginError(null);
                      try {
                        await loginWithGoogle();
                      } catch (error: any) {
                        console.error("Sign-in error:", error);
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
                  /* Generate Report button — requires image + form */
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
      <section className="py-32 bg-surface-container-low/50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-8">
            {[
              { icon: Brain, title: "AI Detection", desc: "Computer vision trained on urban maintenance datasets.", span: "md:col-span-3 lg:col-span-4", color: "text-primary" },
              { icon: FileText, title: "Complaint Gen", desc: "NLP engine drafts persuasive, legally-sound reports.", span: "md:col-span-3 lg:col-span-4", color: "text-secondary" },
              { icon: AtSign, title: "Email Integration", desc: "Direct bridge to official city council and utility inboxes.", span: "md:col-span-6 lg:col-span-4", color: "text-tertiary" },
              { icon: FileCode, title: "Smart PDF Export", desc: "Download evidence-packed documents for your personal records or physical filing.", span: "md:col-span-4 lg:col-span-6", color: "text-primary" },
              { icon: LayoutDashboard, title: "Dashboard", desc: "Centralized hub for all your civic activities.", span: "md:col-span-2 lg:col-span-3", color: "text-secondary" },
              { icon: ArrowRight, title: "Follow-Up", desc: "Automated nudges if responses are delayed.", span: "md:col-span-6 lg:col-span-3", color: "text-tertiary" }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                className={cn(feature.span, "glass-panel p-8 rounded-lg shadow-sm hover:shadow-lg transition-all")}
              >
                <feature.icon className={cn(feature.color, "mb-6")} size={40} />
                <h4 className="font-headline font-bold text-xl mb-3">{feature.title}</h4>
                <p className="text-on-surface-variant text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Screen Analysis Overlay */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-on-surface/95 backdrop-blur-xl flex items-center justify-center p-8"
          >
            <div className="max-w-2xl w-full text-center">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mb-12 relative inline-block"
              >
                <div className="w-32 h-32 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Brain className="text-primary animate-pulse" size={48} />
                </div>
              </motion.div>

              <h2 className="text-white font-headline font-extrabold text-4xl mb-4 tracking-tight">
                Luminous AI Analysis
              </h2>
              <p className="text-white/50 font-bold uppercase tracking-[0.3em] text-xs mb-12">
                Processing Civic Intelligence
              </p>

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
                      animate={{ 
                        opacity: i <= analysisStep ? 1 : 0.2,
                        x: i === analysisStep ? 0 : (i < analysisStep ? 0 : -20),
                        scale: i === analysisStep ? 1.05 : 1
                      }}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl transition-all",
                        i === analysisStep ? "bg-white/10 border border-white/20" : "bg-transparent"
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                        i < analysisStep ? "bg-green-500 text-white" : (i === analysisStep ? "bg-primary text-white" : "bg-white/10 text-white/30")
                      )}>
                        {i < analysisStep ? <Check size={16} /> : i + 1}
                      </div>
                      <span className={cn(
                        "font-bold uppercase tracking-widest text-sm",
                        i === analysisStep ? "text-white" : "text-white/30"
                      )}>
                        {step}
                      </span>
                      {i === analysisStep && (
                        <Loader2 className="ml-auto text-primary animate-spin" size={20} />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="font-headline font-bold text-3xl mb-16 text-center">Built for Scale</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { val: "85%", label: "Time Saved", desc: "Average reduction in report filing time for citizens.", color: "primary" },
              { val: "Simple", label: "Easy Use", desc: "Designed for everyone from teens to seniors.", color: "secondary" },
              { val: "Unified", label: "City Management", desc: "Centralized database for all municipal departments.", color: "tertiary" },
              { val: "3x", label: "Faster Resolution", desc: "Issues are resolved significantly faster with AI-routing.", color: "primary" }
            ].map((stat, i) => (
              <div key={i} className={cn("p-8 rounded-lg bg-surface-container-low border-b-4", `border-${stat.color}`)}>
                <h4 className={cn("font-bold text-4xl mb-2", `text-${stat.color}`)}>{stat.val}</h4>
                <p className="font-bold mb-2">{stat.label}</p>
                <p className="text-on-surface-variant text-sm">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
