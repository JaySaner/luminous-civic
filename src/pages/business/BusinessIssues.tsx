import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BusinessLayout } from '@/components/business/BusinessLayout';
import { useBusinessContext } from '@/components/business/BusinessContext';
import { StatusBadge, PriorityBadge } from '@/components/business/StatusBadge';
import { SLATimer } from '@/components/business/SLATimer';
import { EmptyState } from '@/components/business/EmptyState';
import { listBusinessIssues, listDepartments, updateIssueStatus } from '@/lib/business/businessDb';
import type { BusinessIssue, BusinessDepartment, IssueStatus } from '@/lib/business/types';
import { AlertCircle, Search, Filter, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const BusinessIssues: React.FC = () => {
  const { business, businessUser } = useBusinessContext();
  const [issues, setIssues] = useState<BusinessIssue[]>([]);
  const [filtered, setFiltered] = useState<BusinessIssue[]>([]);
  const [departments, setDepartments] = useState<BusinessDepartment[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [showEscalatedOnly, setShowEscalatedOnly] = useState(false);

  useEffect(() => {
    loadData();
  }, [business?.id]);

  async function loadData() {
    setLoading(true);
    try {
      const issueList = await listBusinessIssues(business?.id);
      setIssues(issueList);
      setFiltered(issueList);
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

  useEffect(() => {
    let result = issues;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(i => 
        i.title.toLowerCase().includes(term) || 
        i.trackingNumber.toLowerCase().includes(term) || 
        i.reporterName?.toLowerCase().includes(term)
      );
    }
    if (statusFilter !== 'all') result = result.filter(i => i.status === statusFilter);
    if (priorityFilter !== 'all') result = result.filter(i => i.priority === priorityFilter);
    if (departmentFilter !== 'all') result = result.filter(i => i.assignedDepartmentId === departmentFilter);
    if (showEscalatedOnly) result = result.filter(i => i.slaEscalated);

    setFiltered(result);
  }, [searchTerm, statusFilter, priorityFilter, departmentFilter, showEscalatedOnly, issues]);

  return (
    <BusinessLayout>
      <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Issue & Ticket Directory</h1>
            <p className="text-sm text-slate-400">View and triage all public and internal reported issues under active SLA timelines.</p>
          </div>
        </div>

        {/* Filters Toolbar */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80 backdrop-blur-xl">
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search tracking #, title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-semibold focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="in_progress">In Progress</option>
              <option value="under_review">Under Review</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-semibold focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>

            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-semibold focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Departments</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>

            <button
              onClick={() => setShowEscalatedOnly(!showEscalatedOnly)}
              className={`px-3 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
                showEscalatedOnly
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 shadow-sm'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              SLA Breached
            </button>
          </div>
        </div>

        {/* Master Issues Table */}
        {loading ? (
          <div className="p-12 text-center text-slate-400">Loading issue directory...</div>
        ) : filtered.length === 0 ? (
          <EmptyState
            title="No Matching Issues Found"
            description="Try adjusting your status, priority, or search criteria."
            actionLabel="Reset Filters"
            onAction={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setPriorityFilter('all');
              setDepartmentFilter('all');
              setShowEscalatedOnly(false);
            }}
          />
        ) : (
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl overflow-hidden shadow-xl backdrop-blur-xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-4 px-5">Tracking Code</th>
                  <th className="py-4 px-5">Issue Title</th>
                  <th className="py-4 px-5">Priority</th>
                  <th className="py-4 px-5">Status</th>
                  <th className="py-4 px-5">SLA Countdown</th>
                  <th className="py-4 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filtered.map((issue) => (
                  <tr key={issue.id} className="hover:bg-slate-800/30 transition">
                    <td className="py-4 px-5 font-mono text-xs font-bold text-cyan-400">
                      {issue.trackingNumber}
                    </td>
                    <td className="py-4 px-5">
                      <div className="font-bold text-white text-sm">{issue.title}</div>
                      <div className="text-[11px] text-slate-400">Category: {issue.category} • Reporter: {issue.reporterName || 'Anonymous'}</div>
                    </td>
                    <td className="py-4 px-5">
                      <PriorityBadge priority={issue.priority} />
                    </td>
                    <td className="py-4 px-5">
                      <StatusBadge status={issue.status} />
                    </td>
                    <td className="py-4 px-5">
                      <SLATimer deadline={issue.slaDeadline} status={issue.status} />
                    </td>
                    <td className="py-4 px-5 text-right">
                      <Link
                        to={`/business/issues/${issue.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 transition"
                      >
                        Manage Ticket <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </BusinessLayout>
  );
};
