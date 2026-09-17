import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BusinessLayout } from '@/components/business/BusinessLayout';
import { useBusinessContext } from '@/components/business/BusinessContext';
import { StatusBadge, PriorityBadge } from '@/components/business/StatusBadge';
import { SLATimer } from '@/components/business/SLATimer';
import { AIAnalysisCard } from '@/components/business/AIAnalysisCard';
import { TimelineVertical } from '@/components/business/TimelineVertical';
import { getIssueDetails, getIssueTimeline, updateIssueStatus, assignIssue, listEmployees } from '@/lib/business/businessDb';
import type { BusinessIssue, IssueTimelineEvent, BusinessEmployee, IssueStatus } from '@/lib/business/types';
import { 
  ArrowLeft, 
  User, 
  Clock, 
  CheckCircle2, 
  ShieldAlert, 
  Save, 
  Sparkles, 
  MessageSquare,
  FileText,
  Loader2
} from 'lucide-react';

export const BusinessIssueDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { businessUser, superAdmin } = useBusinessContext();

  const [issue, setIssue] = useState<BusinessIssue | null>(null);
  const [timeline, setTimeline] = useState<IssueTimelineEvent[]>([]);
  const [employees, setEmployees] = useState<BusinessEmployee[]>([]);
  const [loading, setLoading] = useState(true);

  // Status & Notes Modal
  const [newStatus, setNewStatus] = useState<IssueStatus>('in_progress');
  const [notes, setNotes] = useState('');
  const [selectedStaff, setSelectedStaff] = useState('');
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!id) return;
    loadIssue();
  }, [id]);

  async function loadIssue() {
    setLoading(true);
    try {
      const data = await getIssueDetails(id!);
      if (data) {
        setIssue(data);
        setNewStatus(data.status);
        const events = await getIssueTimeline(data.id);
        setTimeline(events);
        const empList = await listEmployees(data.businessId);
        setEmployees(empList);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!issue) return;
    setUpdating(true);
    setMessage('');
    try {
      const actorName = businessUser?.name || superAdmin?.name || 'Staff User';
      const actorRole = businessUser?.role || 'admin';

      await updateIssueStatus(issue.id, newStatus, actorName, actorRole, notes);

      if (selectedStaff) {
        const emp = employees.find(e => e.id === selectedStaff);
        if (emp) {
          await assignIssue(issue.id, emp.id, emp.name, actorName);
        }
      }

      await loadIssue();
      setMessage('Ticket status & assignment updated successfully.');
      setNotes('');
    } catch (err: any) {
      console.error(err);
      setMessage('Failed to update status: ' + err.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <BusinessLayout>
        <div className="p-12 text-center text-slate-400">Loading ticket details...</div>
      </BusinessLayout>
    );
  }

  if (!issue) {
    return (
      <BusinessLayout>
        <div className="p-12 text-center text-slate-400">
          <p>Ticket not found.</p>
          <Link to="/business/issues" className="text-blue-400 underline font-semibold mt-2 inline-block">
            Back to Issues Directory
          </Link>
        </div>
      </BusinessLayout>
    );
  }

  return (
    <BusinessLayout>
      <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/business/issues')}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-cyan-400 font-extrabold text-sm">{issue.trackingNumber}</span>
                <PriorityBadge priority={issue.priority} />
                <StatusBadge status={issue.status} />
              </div>
              <h1 className="text-2xl font-extrabold text-white mt-1">{issue.title}</h1>
            </div>
          </div>

          <SLATimer deadline={issue.slaDeadline} status={issue.status} />
        </div>

        {message && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Ticket Info & AI Analysis */}
          <div className="lg:col-span-2 space-y-6">
            {/* Ticket Card */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl backdrop-blur-xl">
              <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800/80 pb-3">
                <FileText className="w-5 h-5 text-blue-400" /> Report Content & Details
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Problem Description
                  </label>
                  {(() => {
                    let parsed: Record<string, any> | null = null;
                    if (issue.description?.trim().startsWith('{') || issue.description?.trim().startsWith('[')) {
                      try {
                        parsed = JSON.parse(issue.description);
                      } catch (e) {
                        parsed = null;
                      }
                    }

                    if (parsed && typeof parsed === 'object') {
                      const entries = Object.entries(parsed).filter(([_, v]) => {
                        if (typeof v === 'string' && v.startsWith('data:image')) return false;
                        return true;
                      });

                      return (
                        <div className="space-y-2.5 bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
                          {entries.map(([key, val]) => {
                            const formattedKey = key
                              .replace(/^f_/, '')
                              .replace(/_/g, ' ')
                              .replace(/\b\w/g, l => l.toUpperCase());

                            const displayVal = typeof val === 'object' ? JSON.stringify(val) : String(val);

                            return (
                              <div key={key} className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-slate-800/40 pb-2 last:border-b-0">
                                <span className="text-xs font-bold text-slate-400">{formattedKey}</span>
                                <span className="text-xs font-semibold text-white leading-relaxed">{displayVal}</span>
                              </div>
                            );
                          })}
                        </div>
                      );
                    }

                    const cleanText = issue.description?.replace(/data:image\/[a-zA-Z]+;base64,[^"\s]+/g, '[Image Evidence Attached Below]') || 'No detailed description provided.';
                    return (
                      <p className="text-sm text-slate-200 bg-slate-950 p-4 rounded-2xl border border-slate-800/80 leading-relaxed whitespace-pre-wrap">
                        {cleanText}
                      </p>
                    );
                  })()}
                </div>

                {/* Evidence Image Preview */}
                {(() => {
                  const images = [...(issue.images || [])];
                  if (issue.description && issue.description.includes('data:image')) {
                    const matches = issue.description.match(/data:image\/[a-zA-Z]+;base64,[^"\s\)\}]+/g);
                    if (matches) {
                      matches.forEach(m => {
                        if (!images.includes(m)) images.push(m);
                      });
                    }
                  }
                  if (images.length === 0) return null;

                  return (
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Attached Evidences & Photo Evidence ({images.length})
                      </label>
                      <div className="flex items-center gap-3 overflow-x-auto pb-2">
                        {images.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt={`Evidence ${i + 1}`}
                            className="w-32 h-32 rounded-2xl object-cover border border-slate-700 shadow-md cursor-pointer hover:scale-105 transition"
                            onClick={() => window.open(img, '_blank')}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {/* Reporter Metadata */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase">Reporter</span>
                    <span className="text-xs font-semibold text-white">{issue.reporterName || 'Anonymous'}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase">Assigned Staff</span>
                    <span className="text-xs font-semibold text-cyan-400">{issue.assignedEmployeeName || 'Unassigned'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Analysis Component */}
            <AIAnalysisCard analysis={issue.aiAnalysis} />

            {/* Action History Timeline */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-xl backdrop-blur-xl space-y-4">
              <h3 className="text-base font-bold text-white">Action History & Audit Log</h3>
              <TimelineVertical events={timeline} />
            </div>
          </div>

          {/* Action Control Desk */}
          <div className="space-y-6">
            <form onSubmit={handleUpdateStatus} className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 shadow-xl backdrop-blur-xl sticky top-24 space-y-5">
              <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800/80 pb-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Resolution Control Desk
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Update Ticket Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:outline-none focus:border-blue-500"
                >
                  <option value="new">New</option>
                  <option value="in_progress">In Progress</option>
                  <option value="under_review">Under Review</option>
                  <option value="resolved">Resolved (Close SLA)</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Assign Staff Member
                </label>
                <select
                  value={selectedStaff}
                  onChange={(e) => setSelectedStaff(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:outline-none focus:border-blue-500"
                >
                  <option value="">Keep Current Assignment ({issue.assignedEmployeeName || 'None'})</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>{emp.name} ({emp.role})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Resolution Notes / Activity Log
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe action taken, dispatch details, or customer response..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={updating}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-blue-950/50 transition active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Status & Log Activity
              </button>
            </form>
          </div>
        </div>
      </div>
    </BusinessLayout>
  );
};
