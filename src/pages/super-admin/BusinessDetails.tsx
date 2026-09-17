import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { SuperAdminLayout } from '@/components/business/SuperAdminLayout';
import { StatusBadge } from '@/components/business/StatusBadge';
import { StatCard } from '@/components/business/StatCard';
import { getBusiness, updateBusiness, listBusinessIssues, listEmployees } from '@/lib/business/businessDb';
import type { Business, BusinessIssue, BusinessEmployee } from '@/lib/business/types';
import { 
  Building2, 
  ArrowLeft, 
  Globe, 
  QrCode, 
  ShieldCheck, 
  Clock, 
  Save, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink,
  Sparkles,
  Loader2
} from 'lucide-react';

export const BusinessDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [business, setBusiness] = useState<Business | null>(null);
  const [issues, setIssues] = useState<BusinessIssue[]>([]);
  const [employees, setEmployees] = useState<BusinessEmployee[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Editable fields
  const [name, setName] = useState('');
  const [subscriptionPlan, setSubscriptionPlan] = useState<'Starter' | 'Pro' | 'Enterprise'>('Pro');
  const [status, setStatus] = useState<'active' | 'inactive' | 'suspended'>('active');
  
  // SLA config editable fields
  const [lowHours, setLowHours] = useState(48);
  const [medHours, setMedHours] = useState(24);
  const [highHours, setHighHours] = useState(12);
  const [critHours, setCritHours] = useState(4);

  useEffect(() => {
    if (!id) return;
    async function loadData() {
      try {
        const b = await getBusiness(id!);
        if (b) {
          setBusiness(b);
          setName(b.name);
          setSubscriptionPlan(b.subscriptionPlan);
          setStatus(b.status);
          if (b.slaConfig) {
            setLowHours(b.slaConfig.resolutionHoursLow || 48);
            setMedHours(b.slaConfig.resolutionHoursMedium || 24);
            setHighHours(b.slaConfig.resolutionHoursHigh || 12);
            setCritHours(b.slaConfig.resolutionHoursCritical || 4);
          }
        }
        const issueList = await listBusinessIssues(id!);
        setIssues(issueList);
        const empList = await listEmployees(id!);
        setEmployees(empList);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setSaving(true);
    setMessage('');
    try {
      await updateBusiness(id, {
        name,
        subscriptionPlan,
        status,
        slaConfig: {
          resolutionHoursLow: Number(lowHours),
          resolutionHoursMedium: Number(medHours),
          resolutionHoursHigh: Number(highHours),
          resolutionHoursCritical: Number(critHours),
          autoEscalate: true
        }
      });
      setMessage('Tenant settings and SLA rules updated successfully.');
    } catch (e: any) {
      console.error(e);
      setMessage('Failed to save updates: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <SuperAdminLayout>
        <div className="p-12 text-center text-slate-400">Loading business details...</div>
      </SuperAdminLayout>
    );
  }

  if (!business) {
    return (
      <SuperAdminLayout>
        <div className="p-12 text-center text-slate-400">
          <p>Business tenant not found.</p>
          <Link to="/super-admin/businesses" className="text-cyan-400 underline font-semibold mt-2 inline-block">
            Back to Business List
          </Link>
        </div>
      </SuperAdminLayout>
    );
  }

  return (
    <SuperAdminLayout>
      <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/super-admin/businesses')}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-white">{business.name}</h1>
                <StatusBadge status={business.status} />
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">Slug: /portal/{business.slug} • Industry: {business.industryType}</p>
            </div>
          </div>

          <a
            href={`/portal/${business.slug}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-400 text-xs font-bold transition"
          >
            <Globe className="w-4 h-4" /> Open Public Portal <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {message && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> {message}
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <StatCard
            title="Total Tenant Issues"
            value={issues.length}
            subtitle="Public & internal items"
            icon={Building2}
            color="cyan"
          />
          <StatCard
            title="Active SLA Escalations"
            value={issues.filter(i => i.slaEscalated).length}
            subtitle="Breached timeframe"
            icon={AlertTriangle}
            color="rose"
          />
          <StatCard
            title="Staff Roster"
            value={employees.length}
            subtitle="Active portal users"
            icon={Users}
            color="blue"
          />
        </div>

        {/* Configuration Form */}
        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800/80 pb-4">
              <ShieldCheck className="w-5 h-5 text-cyan-400" /> Tenant Configuration & Subscription
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Subscription Tier
                </label>
                <select
                  value={subscriptionPlan}
                  onChange={(e) => setSubscriptionPlan(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
                >
                  <option value="Starter">Starter</option>
                  <option value="Pro">Pro</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Tenant Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>

            {/* SLA Configuration */}
            <div className="pt-6 border-t border-slate-800/80 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" /> SLA Target Resolution Deadlines (Hours)
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Low Priority</label>
                  <input
                    type="number"
                    value={lowHours}
                    onChange={(e) => setLowHours(Number(e.target.value))}
                    className="w-full bg-transparent text-white font-bold text-base focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-500">Hours</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <label className="block text-[11px] font-bold text-blue-400 uppercase mb-1">Medium Priority</label>
                  <input
                    type="number"
                    value={medHours}
                    onChange={(e) => setMedHours(Number(e.target.value))}
                    className="w-full bg-transparent text-white font-bold text-base focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-500">Hours</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <label className="block text-[11px] font-bold text-amber-400 uppercase mb-1">High Priority</label>
                  <input
                    type="number"
                    value={highHours}
                    onChange={(e) => setHighHours(Number(e.target.value))}
                    className="w-full bg-transparent text-white font-bold text-base focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-500">Hours</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <label className="block text-[11px] font-bold text-rose-400 uppercase mb-1">Critical Priority</label>
                  <input
                    type="number"
                    value={critHours}
                    onChange={(e) => setCritHours(Number(e.target.value))}
                    className="w-full bg-transparent text-white font-bold text-base focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-500">Hours</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-bold shadow-lg shadow-cyan-950/50 transition active:scale-95 disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Changes
              </button>
            </div>
          </div>

          {/* Quick Info Side Panel */}
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 shadow-xl backdrop-blur-xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <QrCode className="w-5 h-5 text-cyan-400" /> Public Portal Link
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct your customers or employees to submit complaints and feedback via the custom URL:
              </p>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-400 select-all break-all">
                {window.location.origin}/portal/{business.slug}
              </div>
            </div>
          </div>
        </form>
      </div>
    </SuperAdminLayout>
  );
};
