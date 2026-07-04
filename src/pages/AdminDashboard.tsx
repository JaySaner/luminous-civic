import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { Loader2, CheckCircle2, Clock, AlertCircle, MapPin, User, Mail, FileText, Search, X, ChevronDown, ChevronUp, Shield, BarChart3, AlertTriangle, Truck, Building2, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface Report {
  id: string;
  userId: string;
  name: string;
  address: string;
  email: string;
  description: string;
  issueType: string;
  authority: string;
  legalComplaint: string;
  location: string;
  status: string;
  createdAt: string;
  preview: string;
}

const ALL_STATUSES = ['Processing', 'Authority Notified', 'Unit Assigned', 'Resolved'] as const;

const statusConfig: Record<string, { color: string; bg: string; border: string; icon: React.ReactNode }> = {
  'Processing': { color: 'text-amber-600', bg: 'bg-amber-500/10', border: 'border-amber-500/20', icon: <Clock size={16} /> },
  'Authority Notified': { color: 'text-blue-600', bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: <Building2 size={16} /> },
  'Unit Assigned': { color: 'text-purple-600', bg: 'bg-purple-500/10', border: 'border-purple-500/20', icon: <Truck size={16} /> },
  'Resolved': { color: 'text-green-600', bg: 'bg-green-500/10', border: 'border-green-500/20', icon: <CheckCircle2 size={16} /> },
};

const formatDate = (dateStr: string) => {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  } catch {
    return dateStr;
  }
};

export const AdminDashboard = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const reportsRef = collection(db, 'reports');
    const q = query(reportsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reportsList: Report[] = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      } as Report));
      setReports(reportsList);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching reports:", err);
      setError(`Failed to load reports: ${err.message}`);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateStatus = async (reportId: string, newStatus: string) => {
    setUpdatingId(reportId);
    try {
      const reportRef = doc(db, 'reports', reportId);
      await updateDoc(reportRef, { status: newStatus });
    } catch (err) {
      console.error("Error updating status:", err);
      handleFirestoreError(err, OperationType.UPDATE, `reports/${reportId}`);
    } finally {
      setUpdatingId(null);
    }
  };

  // Stats
  const stats = {
    total: reports.length,
    processing: reports.filter(r => r.status === 'Processing').length,
    notified: reports.filter(r => r.status === 'Authority Notified').length,
    assigned: reports.filter(r => r.status === 'Unit Assigned').length,
    resolved: reports.filter(r => r.status === 'Resolved').length,
  };

  // Filter
  const filteredReports = reports.filter(report => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || (
      report.id.toLowerCase().includes(q) ||
      report.name.toLowerCase().includes(q) ||
      report.address.toLowerCase().includes(q) ||
      report.issueType.toLowerCase().includes(q) ||
      report.authority.toLowerCase().includes(q)
    );
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface gap-4">
        <Loader2 className="text-primary animate-spin" size={48} />
        <p className="font-bold text-on-surface-variant animate-pulse uppercase tracking-widest text-xs">Loading Admin Panel...</p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-32 bg-surface min-h-screen px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl civic-pulse-gradient flex items-center justify-center">
                <Shield size={20} className="text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold font-headline tracking-tight text-on-surface">Admin Control Panel</h1>
            </div>
            <p className="text-on-surface-variant">Manage and oversee all civic reports across the platform.</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
          <div
            onClick={() => setStatusFilter('all')}
            className={cn(
              "p-5 rounded-2xl border cursor-pointer transition-all hover:shadow-md",
              statusFilter === 'all' ? "bg-primary/10 border-primary/30 shadow-md" : "bg-white border-outline-variant"
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 size={18} className="text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Total</span>
            </div>
            <p className="text-3xl font-extrabold text-on-surface">{stats.total}</p>
          </div>
          <div
            onClick={() => setStatusFilter('Processing')}
            className={cn(
              "p-5 rounded-2xl border cursor-pointer transition-all hover:shadow-md",
              statusFilter === 'Processing' ? "bg-amber-500/10 border-amber-500/30 shadow-md" : "bg-white border-outline-variant"
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              <Clock size={18} className="text-amber-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Processing</span>
            </div>
            <p className="text-3xl font-extrabold text-amber-600">{stats.processing}</p>
          </div>
          <div
            onClick={() => setStatusFilter('Authority Notified')}
            className={cn(
              "p-5 rounded-2xl border cursor-pointer transition-all hover:shadow-md",
              statusFilter === 'Authority Notified' ? "bg-blue-500/10 border-blue-500/30 shadow-md" : "bg-white border-outline-variant"
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              <Building2 size={18} className="text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Notified</span>
            </div>
            <p className="text-3xl font-extrabold text-blue-600">{stats.notified}</p>
          </div>
          <div
            onClick={() => setStatusFilter('Unit Assigned')}
            className={cn(
              "p-5 rounded-2xl border cursor-pointer transition-all hover:shadow-md",
              statusFilter === 'Unit Assigned' ? "bg-purple-500/10 border-purple-500/30 shadow-md" : "bg-white border-outline-variant"
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              <Truck size={18} className="text-purple-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Assigned</span>
            </div>
            <p className="text-3xl font-extrabold text-purple-600">{stats.assigned}</p>
          </div>
          <div
            onClick={() => setStatusFilter('Resolved')}
            className={cn(
              "p-5 rounded-2xl border cursor-pointer transition-all hover:shadow-md",
              statusFilter === 'Resolved' ? "bg-green-500/10 border-green-500/30 shadow-md" : "bg-white border-outline-variant"
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 size={18} className="text-green-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Resolved</span>
            </div>
            <p className="text-3xl font-extrabold text-green-600">{stats.resolved}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8 relative group">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search className={cn(
              "transition-colors",
              searchQuery ? "text-primary" : "text-on-surface-variant/40"
            )} size={20} />
          </div>
          <input
            type="text"
            placeholder="Search by ID, Name, Address, Issue Type, or Authority..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-outline-variant rounded-2xl py-4 pl-14 pr-12 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm group-hover:shadow-md"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-6 flex items-center text-on-surface-variant/40 hover:text-on-surface transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Result count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-bold text-on-surface-variant">
            Showing {filteredReports.length} of {reports.length} reports
            {statusFilter !== 'all' && <span className="text-primary ml-1">· Filtered by: {statusFilter}</span>}
          </p>
          {statusFilter !== 'all' && (
            <button onClick={() => setStatusFilter('all')} className="text-xs font-bold text-primary hover:underline">
              Clear filter
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-8 flex items-center gap-3">
            <AlertCircle size={20} />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Reports List */}
        <div className="grid gap-5">
          <AnimatePresence mode="popLayout">
            {filteredReports.map((report) => {
              const isExpanded = expandedId === report.id;
              const sc = statusConfig[report.status] || statusConfig['Processing'];
              const isUpdating = updatingId === report.id;

              return (
                <motion.div
                  key={report.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-3xl shadow-sm border border-outline-variant hover:shadow-md transition-all overflow-hidden"
                >
                  {/* Main Row */}
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Image Preview */}
                      <div className="w-full lg:w-44 h-44 rounded-2xl overflow-hidden shrink-0 bg-surface-container-low border border-outline-variant">
                        <img
                          src={report.preview}
                          alt="Evidence"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-grow space-y-3 min-w-0">
                        <div className="flex flex-wrap justify-between items-start gap-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-lg">
                                {report.issueType}
                              </span>
                              <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant bg-surface-container-low px-2.5 py-1 rounded-lg">
                                {report.id}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold text-on-surface">{report.authority}</h3>
                          </div>

                          <div className={cn("px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border flex items-center gap-1.5", sc.bg, sc.color, sc.border)}>
                            {sc.icon}
                            {report.status}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-3 text-sm text-on-surface-variant">
                          <div className="flex items-center gap-2">
                            <User size={15} className="shrink-0 text-on-surface-variant/50" />
                            <span className="truncate">{report.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail size={15} className="shrink-0 text-on-surface-variant/50" />
                            <span className="truncate">{report.email || '—'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={15} className="shrink-0 text-on-surface-variant/50" />
                            <span className="truncate">{report.address}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={15} className="shrink-0 text-on-surface-variant/50" />
                            <span className="truncate">{formatDate(report.createdAt)}</span>
                          </div>
                        </div>

                        {report.description && (
                          <p className="text-sm text-on-surface-variant line-clamp-2 bg-surface-container-low px-4 py-2.5 rounded-xl border border-outline-variant">
                            {report.description}
                          </p>
                        )}
                      </div>

                      {/* Status Update + Expand */}
                      <div className="flex lg:flex-col justify-between items-end gap-3 shrink-0">
                        {/* Status dropdown */}
                        <div className="relative">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1 block">Update Status</label>
                          <select
                            value={report.status}
                            disabled={isUpdating}
                            onChange={(e) => updateStatus(report.id, e.target.value)}
                            className={cn(
                              "appearance-none px-5 py-2.5 pr-10 rounded-xl font-bold text-sm border cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-primary/20",
                              sc.bg, sc.color, sc.border,
                              isUpdating && "opacity-50 cursor-wait"
                            )}
                          >
                            {ALL_STATUSES.map(s => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                          {isUpdating && (
                            <Loader2 size={14} className="absolute right-3 top-[50%] animate-spin text-primary" />
                          )}
                        </div>

                        {/* Expand button */}
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : report.id)}
                          className="flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-container transition-colors"
                        >
                          <Eye size={14} />
                          {isExpanded ? 'Collapse' : 'View Details'}
                          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Detail */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-outline-variant">
                          <div className="grid md:grid-cols-2 gap-6">
                            {/* Full Image */}
                            <div>
                              <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-3">Evidence Image</h4>
                              <div className="rounded-2xl overflow-hidden border border-outline-variant">
                                <img
                                  src={report.preview}
                                  alt="Full evidence"
                                  className="w-full h-auto max-h-96 object-contain bg-surface-container-low"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                            </div>

                            {/* Legal Complaint */}
                            <div>
                              <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-3">Legal Complaint</h4>
                              <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant text-sm text-on-surface leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto">
                                {report.legalComplaint || 'No legal complaint generated.'}
                              </div>

                              <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-3 mt-6">Location Info</h4>
                              <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant text-sm text-on-surface-variant">
                                <div className="flex items-start gap-2">
                                  <MapPin size={16} className="shrink-0 mt-0.5 text-primary" />
                                  <span>{report.location || report.address}</span>
                                </div>
                              </div>

                              <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-3 mt-6">Report Meta</h4>
                              <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant text-xs text-on-surface-variant space-y-1">
                                <p><strong>Report ID:</strong> {report.id}</p>
                                <p><strong>User ID:</strong> {report.userId}</p>
                                <p><strong>Created:</strong> {formatDate(report.createdAt)}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredReports.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-outline-variant">
              <div className="w-20 h-20 rounded-full bg-surface-container-low flex items-center justify-center mx-auto mb-6">
                <FileText size={40} className="text-on-surface-variant/30" />
              </div>
              <h3 className="text-xl font-bold text-on-surface">
                {searchQuery || statusFilter !== 'all' ? 'No matching reports' : 'No reports found'}
              </h3>
              <p className="text-on-surface-variant">
                {searchQuery || statusFilter !== 'all' ? 'Try adjusting your search or filter.' : 'All quiet on the civic front.'}
              </p>
              {(searchQuery || statusFilter !== 'all') && (
                <button
                  onClick={() => { setSearchQuery(''); setStatusFilter('all'); }}
                  className="mt-6 text-primary font-bold hover:underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
