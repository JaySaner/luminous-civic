import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SuperAdminLayout } from '@/components/business/SuperAdminLayout';
import { StatCard } from '@/components/business/StatCard';
import { StatusBadge } from '@/components/business/StatusBadge';
import { EmptyState } from '@/components/business/EmptyState';
import { listBusinesses, listBusinessIssues } from '@/lib/business/businessDb';
import type { Business } from '@/lib/business/types';
import { 
  Building2, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  PlusCircle, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  Clock
} from 'lucide-react';

export const SuperAdminDashboard: React.FC = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBusinesses: 0,
    activeTenants: 0,
    totalIssues: 0,
    slaBreaches: 0,
    enterpriseCount: 0
  });

  useEffect(() => {
    async function loadDashboard() {
      try {
        const bList = await listBusinesses();
        setBusinesses(bList);

        let totalIssuesCount = 0;
        let slaBreachCount = 0;

        for (const biz of bList) {
          const issues = await listBusinessIssues(biz.id);
          totalIssuesCount += issues.length;
          slaBreachCount += issues.filter(i => i.slaEscalated).length;
        }

        setStats({
          totalBusinesses: bList.length,
          activeTenants: bList.filter(b => b.status === 'active').length,
          totalIssues: totalIssuesCount,
          slaBreaches: slaBreachCount,
          enterpriseCount: bList.filter(b => b.subscriptionPlan === 'Enterprise' || b.subscriptionPlan === 'Pro').length
        });
      } catch (err) {
        console.error("Failed loading super admin dashboard", err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  return (
    <SuperAdminLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 p-6 rounded-3xl border border-slate-800/80 shadow-2xl">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Super Admin Control Hub
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Platform Overview</h1>
            <p className="text-sm text-slate-400 mt-1">Manage business tenants, SLA policies, custom forms, and system-wide issue metrics.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/super-admin/businesses/new"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-950/50 transition-all active:scale-95"
            >
              <PlusCircle className="w-5 h-5" /> Onboard Business
            </Link>
          </div>
        </div>

        {/* Executive KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Active Business Tenants"
            value={stats.activeTenants}
            subtitle={`Out of ${stats.totalBusinesses} total onboarded`}
            icon={Building2}
            color="cyan"
            trend={{ value: '100% operational', isUp: true }}
          />
          <StatCard
            title="Total Tenant Issues"
            value={stats.totalIssues}
            subtitle="Public & internal reported cases"
            icon={TrendingUp}
            color="blue"
          />
          <StatCard
            title="SLA Breach Alerts"
            value={stats.slaBreaches}
            subtitle="Issues past resolution deadline"
            icon={AlertTriangle}
            color="rose"
          />
          <StatCard
            title="Pro & Enterprise Subscriptions"
            value={stats.enterpriseCount}
            subtitle="High-tier business accounts"
            icon={ShieldCheck}
            color="purple"
          />
        </div>

        {/* Business Directory & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Table View */}
          <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 shadow-xl backdrop-blur-xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-cyan-400" /> Onboarded Businesses
                </h3>
                <p className="text-xs text-slate-400">Recent tenants registered on Luminous Civic</p>
              </div>
              <Link
                to="/super-admin/businesses"
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {loading ? (
              <div className="p-8 text-center text-slate-400 text-sm">Loading business directory...</div>
            ) : businesses.length === 0 ? (
              <EmptyState
                title="No Businesses Onboarded Yet"
                description="Get started by onboarding your first business tenant or industry partner."
                actionLabel="Onboard First Business"
                onAction={() => window.location.href = '/super-admin/businesses/new'}
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-950/60 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Business Name</th>
                      <th className="py-3 px-4">Industry</th>
                      <th className="py-3 px-4">Plan</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {businesses.slice(0, 5).map((b) => (
                      <tr key={b.id} className="hover:bg-slate-800/30 transition">
                        <td className="py-3.5 px-4 font-semibold text-white flex items-center gap-3">
                          {b.logoUrl ? (
                            <img src={b.logoUrl} alt={b.name} className="w-8 h-8 rounded-lg object-cover border border-slate-700" />
                          ) : (
                            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center border border-cyan-500/30 text-xs">
                              {b.name.charAt(0)}
                            </div>
                          )}
                          <div>
                            <div>{b.name}</div>
                            <div className="text-[11px] text-slate-400 font-normal">/{b.slug}</div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-xs text-slate-300">{b.industryType}</td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                            {b.subscriptionPlan}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <StatusBadge status={b.status} />
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <Link
                            to={`/super-admin/businesses/${b.id}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 transition"
                          >
                            Manage <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Quick Platform Controls & System Status */}
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 shadow-xl backdrop-blur-xl">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" /> Platform AI Status
              </h3>
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-white">Gemini 2.5 Flash Engine</p>
                    <p className="text-[11px] text-slate-400">Automated Triage & Form Gen</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    ONLINE
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-white">SLA Engine Realtime Monitor</p>
                    <p className="text-[11px] text-slate-400">Dynamic Escalation Rules</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    ACTIVE
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-950/30 to-blue-950/30 border border-cyan-800/30 rounded-3xl p-6 shadow-xl">
              <h3 className="text-base font-bold text-white mb-2">Need to setup a public portal?</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Every onboarded business gets an immediate dedicated public link at <code className="text-cyan-400 bg-slate-900 px-1 py-0.5 rounded">/portal/:slug</code> with QR code generation.
              </p>
              <Link
                to="/super-admin/businesses"
                className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300"
              >
                Explore Business Portals →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SuperAdminLayout>
  );
};
