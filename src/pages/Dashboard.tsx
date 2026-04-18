import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, Clock, HardHat, CheckCircle2, Search, Filter, ChevronRight, Droplets, Lightbulb, Construction, Trash2, Loader2, AlertCircle, ShieldAlert, Plus } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { DashboardLayout } from '@/src/components/dashboard/DashboardLayout';
import { IssueCard, Issue } from '@/src/components/dashboard/IssueCard';
import { IssueDetails } from '@/src/components/dashboard/IssueDetails';
import { Notification, NotificationItem } from '@/src/components/dashboard/Notification';
import { db, handleFirestoreError, OperationType } from '@/src/lib/firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { useFirebase } from '@/src/lib/FirebaseProvider';

// Dummy Data Simulation
const DUMMY_ISSUES: Issue[] = [
  {
    id: 'LC-8829-X',
    title: 'Major Pothole on Main St',
    description: 'A deep pothole has formed near the intersection of Main and 5th. It is causing significant traffic delays and posing a danger to cyclists and smaller vehicles.',
    location: '123 Main St, Downtown',
    status: 'In Progress',
    image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    authority: 'Dept. of Public Works',
    category: 'Infrastructure'
  },
  {
    id: 'LC-9012-A',
    title: 'Broken Streetlight',
    description: 'The streetlight at the corner of Oak and Pine has been flickering for weeks and has now completely failed. The area is very dark at night, raising safety concerns.',
    location: 'Corner of Oak & Pine',
    status: 'Pending',
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    authority: 'Electrical Utility Dept.',
    category: 'Safety'
  },
  {
    id: 'LC-7734-B',
    title: 'Illegal Dumping Site',
    description: 'Large amount of construction debris and old furniture has been dumped in the vacant lot behind the community center. It is attracting pests and looks terrible.',
    location: 'Behind Community Center',
    status: 'Resolved',
    image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    authority: 'Sanitation & Waste Management',
    category: 'Sanitation'
  },
  {
    id: 'LC-5521-C',
    title: 'Water Main Leak',
    description: 'Significant water leakage from a pipe under the sidewalk. Water is pooling on the street and causing a slip hazard. Potential for sinkhole formation.',
    location: '456 West Ave',
    status: 'In Progress',
    image: 'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days ago (Escalated)
    authority: 'Water & Sewage Authority',
    category: 'Utilities'
  },
  {
    id: 'LC-4410-D',
    title: 'Graffiti on Public Library',
    description: 'Extensive graffiti has appeared on the side wall of the public library. It needs to be removed to maintain the building\'s appearance and deter further vandalism.',
    location: 'Central Public Library',
    status: 'Resolved',
    image: 'https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago (Escalated)
    authority: 'Parks & Recreation Dept.',
    category: 'Maintenance'
  }
];

import { useLanguage } from '@/src/lib/LanguageProvider';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useFirebase();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [issues, setIssues] = useState<Issue[]>(DUMMY_ISSUES);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [loading, setLoading] = useState(true);

  // Real-time Firestore Sync
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const reportsRef = collection(db, 'reports');
    const q = query(
      reportsRef, 
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reportsList: Issue[] = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.issueType || 'Untitled Report',
          description: data.description || 'No description provided.',
          location: data.location || data.address || 'Unknown Location',
          status: data.status as any,
          image: data.preview || 'https://images.unsplash.com/photo-1586767050894-135882c871c1?auto=format&fit=crop&q=80&w=1000',
          createdAt: data.createdAt,
          authority: data.authority || 'Pending Assignment',
          category: data.issueType || 'General'
        };
      });
      
      reportsList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      // Combine real reports with dummy data for demo purposes
      // If user has real reports, they appear at the top
      setIssues([...reportsList, ...DUMMY_ISSUES]);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'reports');
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Check for escalations on mount
  useEffect(() => {
    if (loading) return;
    
    const escalatedIssues = issues.filter(issue => {
      const created = new Date(issue.createdAt);
      const now = new Date();
      const diffDays = Math.ceil((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays > 15 && issue.status !== 'Resolved';
    });

    if (escalatedIssues.length > 0) {
      addNotification(`System Alert: ${escalatedIssues.length} issues have been escalated to media due to delays.`, 'escalation');
    }
  }, [loading, issues]);

  const addNotification = (message: string, type: any = 'success') => {
    const id = Math.random().toString(36).substring(7);
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeNotification(id), 5000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleUpdateStatus = (id: string, newStatus: any) => {
    setIssues(prev => prev.map(issue => 
      issue.id === id ? { ...issue, status: newStatus } : issue
    ));
    addNotification(`Issue ${id} marked as ${newStatus}`);
  };

  const handleFeedbackSubmit = (id: string, feedback: any) => {
    if (feedback.resolved) {
      addNotification("Feedback submitted successfully. Thank you for your input!");
    } else {
      handleUpdateStatus(id, 'In Progress');
      addNotification("Issue marked as unresolved. It has been reopened and prioritized.", "info");
    }
    setSelectedIssue(null);
  };

  const handleEscalate = (id: string) => {
    setIssues(prev => prev.map(issue => 
      issue.id === id ? { ...issue, createdAt: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString() } : issue
    ));
    addNotification(`Issue ${id} has been escalated to media.`, 'escalation');
  };

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          issue.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All Statuses' || issue.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { icon: TrendingUp, label: t('totalReports'), val: issues.length.toString(), color: "primary" },
    { icon: Clock, label: t('pending'), val: issues.filter(r => r.status === 'Pending').length.toString(), color: "amber-500" },
    { icon: HardHat, label: t('inProgress'), val: issues.filter(r => r.status === 'In Progress').length.toString(), color: "blue-500" },
    { icon: CheckCircle2, label: t('resolved'), val: issues.filter(r => r.status === 'Resolved').length.toString(), color: "green-500" }
  ];

  if (loading) {
    return (
      <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
          <Loader2 className="text-primary animate-spin" size={48} />
          <p className="font-bold text-on-surface-variant animate-pulse uppercase tracking-widest text-xs">Syncing Your Civic Data...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="space-y-12">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-extrabold font-headline tracking-tight text-on-surface">{t('dashboard')}</h1>
            <p className="text-on-surface-variant mt-2 text-lg">Overseeing resolution of your community reports with AI-powered tracking.</p>
          </motion.div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="civic-pulse-gradient text-white px-8 py-4 rounded-full font-bold shadow-xl flex items-center gap-2"
          >
            <Plus size={20} />
            {t('newReport')}
          </motion.button>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-panel p-8 rounded-3xl shadow-sm transition-all hover:shadow-xl border border-outline-variant"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={cn("p-4 rounded-2xl", `bg-${stat.color}/10 text-${stat.color}`)}>
                  <stat.icon size={28} />
                </div>
                <span className={cn("text-[10px] font-bold uppercase tracking-widest", `text-${stat.color}`)}>Live</span>
              </div>
              <h3 className="text-on-surface-variant font-bold text-xs uppercase tracking-widest mb-1">{stat.label}</h3>
              <div className="text-4xl font-extrabold font-headline">{stat.val}</div>
            </motion.div>
          ))}
        </section>

        {/* Main Content Area */}
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Column: List */}
          <section className={cn(
            "transition-all duration-500",
            selectedIssue ? "lg:col-span-5" : "lg:col-span-12"
          )}>
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-outline-variant">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-10">
                <h2 className="text-2xl font-bold font-headline">Recent Reports</h2>
                <div className="flex gap-4 w-full sm:w-auto">
                  <select 
                    className="appearance-none pl-6 pr-12 py-3 rounded-2xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary/50 text-sm font-bold cursor-pointer"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option>All Statuses</option>
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                {filteredIssues.length > 0 ? (
                  filteredIssues.map((issue, i) => (
                    <IssueCard 
                      key={issue.id} 
                      issue={issue} 
                      onClick={setSelectedIssue} 
                    />
                  ))
                ) : (
                  <div className="py-20 text-center">
                    <AlertCircle className="mx-auto text-on-surface-variant/20 mb-4" size={64} />
                    <h3 className="text-xl font-bold text-on-surface mb-2">No Reports Found</h3>
                    <p className="text-on-surface-variant">Try adjusting your search or filters.</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Right Column: Details (Desktop) */}
          <AnimatePresence>
            {selectedIssue && (
              <div className="lg:col-span-7 hidden lg:block">
                <div className="sticky top-32">
                  <IssueDetails 
                    issue={selectedIssue} 
                    onClose={() => setSelectedIssue(null)}
                    onUpdateStatus={handleUpdateStatus}
                    onFeedbackSubmit={handleFeedbackSubmit}
                    onEscalate={handleEscalate}
                  />
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Details Overlay */}
      <AnimatePresence>
        {selectedIssue && (
          <div className="lg:hidden">
            <IssueDetails 
              issue={selectedIssue} 
              onClose={() => setSelectedIssue(null)}
              onUpdateStatus={handleUpdateStatus}
              onFeedbackSubmit={handleFeedbackSubmit}
              onEscalate={handleEscalate}
            />
          </div>
        )}
      </AnimatePresence>

      <Notification 
        notifications={notifications} 
        onRemove={removeNotification} 
      />
    </DashboardLayout>
  );
};
