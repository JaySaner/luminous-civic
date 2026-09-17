import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BusinessLayout } from '@/components/business/BusinessLayout';
import { useBusinessContext } from '@/components/business/BusinessContext';
import { StatCard } from '@/components/business/StatCard';
import { StatusBadge, PriorityBadge } from '@/components/business/StatusBadge';
import { EmptyState } from '@/components/business/EmptyState';
import { listBusinessIssues, listEmployees, listDepartments } from '@/lib/business/businessDb';
import type { BusinessIssue, BusinessDepartment } from '@/lib/business/types';
import { 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  Users, 
  PlusCircle, 
  QrCode, 
  Globe, 
  ArrowRight, 
  Sparkles,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

export const BusinessDashboard: React.FC = () => {
  const { business } = useBusinessContext();
  const [issues, setIssues] = useState<BusinessIssue[]>([]);
  const [departments, setDepartments] = useState<BusinessDepartment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const issueList = await listBusinessIssues(business?.id);
        setIssues(issueList);
        if (business?.id) {
          const deptList = await listDepartments(business.id);
          setDepartments(deptList);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [business?.id]);

  const newIssues = issues.filter(i => i.status === 'new');
  const inProgressIssues = issues.filter(i => i.status === 'in_progress');
  const resolvedIssues = issues.filter(i => i.status === 'resolved');
  const slaBreachedCount = issues.filter(i => i.slaEscalated && i.status !== 'resolved' && i.status !== 'closed').length;

  const activeSlug = business?.slug || 'aissms-coe';

  return (
    <BusinessLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-900/90 to-blue-950/40 p-6 rounded-3xl border border-slate-800/80 shadow-2xl">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Operations Control Desk
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {business?.name || 'Business'} Dashboard
            </h1>
            <p className="text-sm text-slate-400 mt-1">Real-time issue tracking, SLA deadline enforcement, and public reporting management.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`/portal/${activeSlug}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-400 font-bold text-sm shadow-lg transition active:scale-95"
            >
              <Globe className="w-4 h-4" /> Public Portal Link <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <Link
              to="/business/forms/builder"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-blue-950/50 transition active:scale-95"
            >
              <PlusCircle className="w-4 h-4" /> Form Builder
            </Link>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="New Unassigned Reports"
            value={newIssues.length}
            subtitle="Requires triage & assignment"
            icon={AlertCircle}
            color="sky"
          />
          <StatCard
            title="Active In-Progress"
            value={inProgressIssues.length}
            subtitle="Currently under resolution"
            icon={Clock}
            color="amber"
          />
          <StatCard
            title="SLA Breach Alerts"
            value={slaBreachedCount}
            subtitle="Resolution deadline missed"
            icon={ShieldAlert}
            color="rose"
            trend={slaBreachedCount > 0 ? { value: 'Urgent Action', isUp: false } : undefined}
          />
          <StatCard
            title="Resolved Issues"
            value={resolvedIssues.length}
            subtitle="Successfully closed tickets"
            icon={CheckCircle2}
            color="emerald"
          />
        </div>

        {/* Recent Reports Table & Triage */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 shadow-xl backdrop-blur-xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-400" /> Recent Incoming Issues
                </h3>
                <p className="text-xs text-slate-400">Reports submitted via public portal or internal staff</p>
              </div>
              <Link
                to="/business/issues"
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                View All Issues <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {loading ? (
              <div className="p-8 text-center text-slate-400 text-sm">Loading issue queue...</div>
            ) : issues.length === 0 ? (
              <EmptyState
                title="No Issues Reported Yet"
                description="Share your public portal URL or QR code with customers and employees to start collecting feedback."
                actionLabel="View Public Portal Setup"
                onAction={() => window.location.href = '/business/portal-settings'}
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-950/60 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Tracking #</th>
                      <th className="py-3 px-4">Title / Category</th>
                      <th className="py-3 px-4">Priority</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {issues.slice(0, 5).map((issue) => (
                      <tr key={issue.id} className="hover:bg-slate-800/30 transition">
                        <td className="py-3.5 px-4 font-mono text-xs font-bold text-cyan-400">
                          {issue.trackingNumber}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white text-sm">{issue.title}</div>
                          <div className="text-[11px] text-slate-400">{issue.category}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <PriorityBadge priority={issue.priority} />
                        </td>
                        <td className="py-3.5 px-4">
                          <StatusBadge status={issue.status} />
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <Link
                            to={`/business/issues/${issue.id}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 transition"
                          >
                            Manage <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Quick Actions & QR Code Callout */}
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 shadow-xl backdrop-blur-xl">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <QrCode className="w-5 h-5 text-blue-400" /> Public Portal QR Code
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Print or share this QR code on posters, tables, or brochures so customers can submit instant complaints directly to your team.
              </p>
              <Link
                to="/business/portal-settings"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold border border-slate-700 transition"
              >
                <QrCode className="w-4 h-4" /> Download / Print QR Code
              </Link>
            </div>

            <div className="bg-gradient-to-br from-blue-950/40 to-slate-900 border border-blue-800/30 rounded-3xl p-6 shadow-xl space-y-3">
              <h3 className="text-base font-bold text-white">Department Structure</h3>
              <p className="text-xs text-slate-300">
                You have <strong className="text-white">{departments.length} active departments</strong> configured for auto-routing incoming reports.
              </p>
              <Link
                to="/business/departments"
                className="inline-block text-xs font-bold text-blue-400 hover:text-blue-300"
              >
                Manage Departments →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </BusinessLayout>
  );
};
