import React from 'react';
import type { IssuePriority, IssueStatus, BusinessDepartment } from '@/lib/business/types';
import { Search, Filter, ShieldAlert } from 'lucide-react';

interface IssueFiltersProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  statusFilter: string;
  onStatusChange: (val: string) => void;
  priorityFilter: string;
  onPriorityChange: (val: string) => void;
  departmentFilter: string;
  onDepartmentChange: (val: string) => void;
  departments: BusinessDepartment[];
  showEscalatedOnly: boolean;
  onToggleEscalated: () => void;
}

export const IssueFilters: React.FC<IssueFiltersProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  departmentFilter,
  onDepartmentChange,
  departments,
  showEscalatedOnly,
  onToggleEscalated
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80 backdrop-blur-xl">
      <div className="relative w-full lg:w-72">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
        <input
          type="text"
          placeholder="Search tracking #, title, reporter..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-semibold focus:outline-none focus:border-blue-500"
        >
          <option value="all">All Statuses</option>
          <option value="new">New / Unassigned</option>
          <option value="in_progress">In Progress</option>
          <option value="under_review">Under Review</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => onPriorityChange(e.target.value)}
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
          onChange={(e) => onDepartmentChange(e.target.value)}
          className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-semibold focus:outline-none focus:border-blue-500"
        >
          <option value="all">All Departments</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>

        <button
          onClick={onToggleEscalated}
          className={`px-3 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
            showEscalatedOnly
              ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 shadow-sm shadow-rose-950/50'
              : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          SLA Breached
        </button>
      </div>
    </div>
  );
};
