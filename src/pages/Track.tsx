import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Calendar, Construction, Map, Check, HardHat, PartyPopper, Bell, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { db, handleFirestoreError, OperationType } from '@/src/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export const Track = () => {
  const [searchId, setSearchId] = useState('');
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = async () => {
    if (!searchId.trim()) return;
    
    setLoading(true);
    setError(null);
    setReport(null);

    try {
      const docRef = doc(db, 'reports', searchId.trim());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setReport({ id: docSnap.id, ...docSnap.data() });
      } else {
        setError("Case ID not found. Please verify the ID and try again.");
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, `reports/${searchId}`);
      setError("An error occurred while fetching the report.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusStep = (status: string) => {
    const steps = ['Processing', 'Authority Notified', 'Unit Assigned', 'Resolved'];
    return steps.indexOf(status);
  };

  const currentStepIndex = report ? getStatusStep(report.status) : -1;

  return (
    <main className="pt-32 pb-20 px-6 max-w-screen-xl mx-auto">
      <header className="mb-16 text-center max-w-3xl mx-auto">
        <h1 className="font-headline font-extrabold text-4xl md:text-5xl tracking-tight text-on-surface mb-6">
          Resolution <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Intelligence</span>
        </h1>
        <p className="text-on-surface-variant text-lg mb-10 leading-relaxed">
          Enter your unique complaint ID to witness the real-time AI-orchestrated restoration of your civic environment.
        </p>
        
        <div className="relative max-w-xl mx-auto group">
          <div className="absolute -inset-1 civic-pulse-gradient rounded-full blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
          <div className="relative flex items-center bg-white rounded-full p-2 shadow-xl">
            <Search className="ml-6 text-on-surface-variant/50" size={20} />
            <input 
              className="w-full bg-transparent border-none focus:ring-0 px-4 py-3 text-on-surface font-medium placeholder:text-on-surface-variant/40" 
              placeholder="Enter Complaint ID (e.g., LC-8829-X)" 
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
            />
            <button 
              onClick={handleTrack}
              disabled={loading}
              className="civic-pulse-gradient text-white px-8 py-3 rounded-full font-bold transition-all hover:shadow-primary/25 disabled:opacity-50 flex items-center gap-2"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}
              Track Case
            </button>
          </div>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-error font-bold flex items-center justify-center gap-2"
          >
            <AlertCircle size={18} />
            {error}
          </motion.div>
        )}
      </header>

      <AnimatePresence mode="wait">
        {report ? (
          <motion.div 
            key="report-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            <div className="lg:col-span-7">
              <div className="glass-panel rounded-lg overflow-hidden shadow-2xl">
                <div className="relative h-72 w-full overflow-hidden">
                  <img 
                    src={report.preview} 
                    alt="Urban Infrastructure" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-primary/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      CASE ID: {report.id}
                    </span>
                  </div>
                </div>
                <div className="p-8 md:p-10">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
                    <div>
                      <h3 className="font-headline font-bold text-2xl text-on-surface mb-2">{report.issueType}</h3>
                      <div className="flex items-center text-on-surface-variant gap-2">
                        <MapPin className="text-primary" size={18} />
                        <span className="font-medium">{report.address}</span>
                      </div>
                    </div>
                    <div className="bg-secondary/10 border border-secondary/20 px-4 py-2 rounded-xl">
                      <span className="text-secondary font-bold text-xs tracking-tight uppercase">High Priority</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-surface-container-low p-6 rounded-lg">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60 mb-3">AI Legal Complaint</h4>
                      <p className="text-on-surface-variant leading-relaxed text-sm italic">
                        "{report.legalComplaint}"
                      </p>
                    </div>
                    {report.description && (
                      <div className="bg-amber-50 p-6 rounded-lg border border-amber-100">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-amber-800/60 mb-3">Citizen Description</h4>
                        <p className="text-amber-900 leading-relaxed text-sm font-medium">
                          "{report.description}"
                        </p>
                      </div>
                    )}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        { icon: Calendar, label: "Reported", val: new Date(report.createdAt).toLocaleDateString() },
                        { icon: Construction, label: "Assigned To", val: currentStepIndex >= 2 ? "Unit 404 (Auto)" : "Pending" },
                        { icon: Map, label: "Location", val: report.location }
                      ].map((item, i) => (
                        <div key={i} className="bg-surface-container-low p-4 rounded-lg flex flex-col items-center text-center">
                          <item.icon className="text-primary mb-2" size={20} />
                          <span className="text-[10px] text-on-surface-variant/60 font-bold uppercase">{item.label}</span>
                          <span className="text-xs font-bold text-on-surface">{item.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-surface-container-low rounded-lg p-8 md:p-10 border border-outline-variant">
                <h3 className="font-headline font-bold text-2xl text-on-surface mb-10">Resolution Journey</h3>
                <div className="relative space-y-12">
                  <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-on-surface-variant/10"></div>
                  
                  {[
                    { status: "Report Submitted", time: "Completed", desc: "Validated by Luminous AI and logged into the public ledger.", icon: Check, active: currentStepIndex >= 0 },
                    { status: "Authority Notified", time: currentStepIndex >= 1 ? "Completed" : "Pending", desc: `Automated dispatch sent to ${report.authority} central hub.`, icon: Bell, active: currentStepIndex >= 1 },
                    { status: "Unit Assigned", time: currentStepIndex >= 2 ? "Completed" : "Pending", desc: "Autonomous repair unit allocation and dispatch.", icon: HardHat, active: currentStepIndex >= 2 },
                    { status: "Resolved", time: currentStepIndex >= 3 ? "Completed" : "Pending", desc: "System restoration complete. Final quality audit performed.", icon: PartyPopper, active: currentStepIndex >= 3 }
                  ].map((step, i) => (
                    <div key={i} className={cn("relative flex gap-6 items-start transition-opacity", !step.active && "opacity-40")}>
                      <div className={cn(
                        "z-10 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg",
                        step.active ? "civic-pulse-gradient" : "bg-on-surface-variant/20"
                      )}>
                        <step.icon size={16} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-bold text-on-surface">{step.status}</h4>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">{step.time}</span>
                        </div>
                        <p className="text-sm text-on-surface-variant">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-12 py-4 border-2 border-on-surface-variant/10 rounded-full font-bold text-on-surface-variant hover:bg-white transition-all flex items-center justify-center gap-2">
                  <Bell size={18} />
                  Notify Me on Completion
                </button>
              </div>
            </div>
          </motion.div>
        ) : !loading && (
          <motion.div 
            key="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center"
          >
            <Search className="mx-auto text-on-surface-variant/10 mb-6" size={80} />
            <p className="text-on-surface-variant font-medium">Enter a valid Case ID above to see the real-time resolution status.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};
