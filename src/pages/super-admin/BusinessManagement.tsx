import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SuperAdminLayout } from '@/components/business/SuperAdminLayout';
import { StatusBadge } from '@/components/business/StatusBadge';
import { EmptyState } from '@/components/business/EmptyState';
import { ConfirmModal } from '@/components/business/ConfirmModal';
import { listBusinesses, updateBusiness } from '@/lib/business/businessDb';
import type { Business, BusinessStatus } from '@/lib/business/types';
import { 
  Building2, 
  Search, 
  Filter, 
  PlusCircle, 
  ExternalLink, 
  MoreVertical, 
  QrCode, 
  Globe, 
  Edit3, 
  Trash2, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle 
} from 'lucide-react';

export const BusinessManagement: React.FC = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [filtered, setFiltered] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [planFilter, setPlanFilter] = useState<string>('all');

  const [selectedBiz, setSelectedBiz] = useState<Business | null>(null);
  const [modalAction, setModalAction] = useState<'toggle' | 'delete' | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const data = await listBusinesses();
      setBusinesses(data);
      setFiltered(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let result = businesses;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(b => b.name.toLowerCase().includes(term) || b.slug.toLowerCase().includes(term) || b.industryType.toLowerCase().includes(term));
    }
    if (statusFilter !== 'all') {
      result = result.filter(b => b.status === statusFilter);
    }
    if (planFilter !== 'all') {
      result = result.filter(b => b.subscriptionPlan === planFilter);
    }
    setFiltered(result);
  }, [searchTerm, statusFilter, planFilter, businesses]);

  const handleToggleStatus = async () => {
    if (!selectedBiz) return;
    const newStatus: BusinessStatus = selectedBiz.status === 'active' ? 'inactive' : 'active';
    await updateBusiness(selectedBiz.id, { status: newStatus });
    setBusinesses(prev => prev.map(b => b.id === selectedBiz.id ? { ...b, status: newStatus } : b));
    setSelectedBiz(null);
    setModalAction(null);
  };

  return (
    <SuperAdminLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Business & Industry Tenants</h1>
            <p className="text-sm text-slate-400">View, manage, and configure all onboarded organizations across the platform.</p>
          </div>
          <Link
            to="/super-admin/businesses/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-950/40 transition active:scale-95"
          >
            <PlusCircle className="w-4 h-4" /> Onboard New Tenant
          </Link>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80 backdrop-blur-xl">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search business name, slug, industry..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-semibold focus:outline-none focus:border-cyan-500"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>

            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-semibold focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Plans</option>
              <option value="Starter">Starter</option>
              <option value="Pro">Pro</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>
        </div>

        {/* Table View */}
        {loading ? (
          <div className="p-12 text-center text-slate-400">Loading business tenants...</div>
        ) : filtered.length === 0 ? (
          <EmptyState
            title="No Businesses Match Filters"
            description="Try clearing your search query or status filter criteria."
            actionLabel="Reset Filters"
            onAction={() => { setSearchTerm(''); setStatusFilter('all'); setPlanFilter('all'); }}
          />
        ) : (
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl overflow-hidden shadow-xl backdrop-blur-xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-4 px-5">Organization</th>
                  <th className="py-4 px-5">Industry</th>
                  <th className="py-4 px-5">Public Portal Link</th>
                  <th className="py-4 px-5">Plan</th>
                  <th className="py-4 px-5">Status</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-800/30 transition">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        {b.logoUrl ? (
                          <img src={b.logoUrl} alt={b.name} className="w-10 h-10 rounded-xl object-cover border border-slate-700" />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center border border-cyan-500/30 text-sm">
                            {b.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-white text-base">{b.name}</div>
                          <div className="text-xs text-slate-400 font-mono">ID: {b.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-xs text-slate-300 font-medium">{b.industryType}</td>
                    <td className="py-4 px-5">
                      <a
                        href={`/portal/${b.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:underline bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800"
                      >
                        <Globe className="w-3.5 h-3.5" /> /portal/{b.slug}
                      </a>
                    </td>
                    <td className="py-4 px-5">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        {b.subscriptionPlan}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <StatusBadge status={b.status} />
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/super-admin/businesses/${b.id}`}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 transition"
                          title="Manage Tenant"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => { setSelectedBiz(b); setModalAction('toggle'); }}
                          className={`p-2 rounded-lg transition ${b.status === 'active' ? 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'}`}
                          title={b.status === 'active' ? 'Deactivate' : 'Activate'}
                        >
                          {b.status === 'active' ? <XCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal for status toggle */}
        <ConfirmModal
          isOpen={modalAction === 'toggle' && !!selectedBiz}
          title={`${selectedBiz?.status === 'active' ? 'Deactivate' : 'Activate'} ${selectedBiz?.name}?`}
          message={`Are you sure you want to change the active status of ${selectedBiz?.name}? Inactive businesses cannot receive public reports or allow employee logins.`}
          confirmLabel={selectedBiz?.status === 'active' ? 'Deactivate Account' : 'Activate Account'}
          onConfirm={handleToggleStatus}
          onCancel={() => { setSelectedBiz(null); setModalAction(null); }}
        />
      </div>
    </SuperAdminLayout>
  );
};
