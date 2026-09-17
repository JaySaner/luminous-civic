import React, { useEffect, useState } from 'react';
import { SuperAdminLayout } from '@/components/business/SuperAdminLayout';
import { StatCard } from '@/components/business/StatCard';
import { ChartDonut } from '@/components/business/ChartDonut';
import { ChartLine } from '@/components/business/ChartLine';
import { listBusinesses, listBusinessIssues } from '@/lib/business/businessDb';
import type { Business } from '@/lib/business/types';
import { BarChart3, Building2, ShieldCheck, TrendingUp, Sparkles } from 'lucide-react';

export const PlatformAnalytics: React.FC = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [totalIssues, setTotalIssues] = useState(0);

  useEffect(() => {
    async function loadData() {
      try {
        const bList = await listBusinesses();
        setBusinesses(bList);
        let count = 0;
        for (const b of bList) {
          const issues = await listBusinessIssues(b.id);
          count += issues.length;
        }
        setTotalIssues(count);
      } catch (e) {
        console.error(e);
      }
    }
    loadData();
  }, []);

  const planData = [
    { label: 'Starter', value: businesses.filter(b => b.subscriptionPlan === 'Starter').length, color: '#64748b' },
    { label: 'Pro', value: businesses.filter(b => b.subscriptionPlan === 'Pro').length, color: '#3b82f6' },
    { label: 'Enterprise', value: businesses.filter(b => b.subscriptionPlan === 'Enterprise').length, color: '#a855f7' }
  ];

  const industryData = [
    { label: 'Hospitality', value: businesses.filter(b => b.industryType.includes('Hospitality')).length, color: '#0ea5e9' },
    { label: 'Retail', value: businesses.filter(b => b.industryType.includes('Retail')).length, color: '#f59e0b' },
    { label: 'Healthcare', value: businesses.filter(b => b.industryType.includes('Healthcare')).length, color: '#10b981' },
    { label: 'Other', value: businesses.filter(b => !b.industryType.includes('Hospitality') && !b.industryType.includes('Retail') && !b.industryType.includes('Healthcare')).length, color: '#64748b' }
  ];

  return (
    <SuperAdminLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Platform Level Metrics
          </span>
          <h1 className="text-2xl font-extrabold text-white">Platform SaaS Analytics</h1>
          <p className="text-sm text-slate-400">Global tenant growth, subscription tier distributions, and ecosystem utilization.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <StatCard
            title="Total Tenant Organizations"
            value={businesses.length}
            subtitle="Registered business entities"
            icon={Building2}
            color="cyan"
          />
          <StatCard
            title="Total Platform Issues Logged"
            value={totalIssues}
            subtitle="Across all tenants"
            icon={TrendingUp}
            color="blue"
          />
          <StatCard
            title="Active Enterprise Accounts"
            value={businesses.filter(b => b.subscriptionPlan === 'Enterprise').length}
            subtitle="Top tier SLA subscriptions"
            icon={ShieldCheck}
            color="purple"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-400" /> Subscription Tier Breakdown
            </h3>
            <ChartDonut data={planData} />
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-cyan-400" /> Industry Vertical Distribution
            </h3>
            <ChartDonut data={industryData} />
          </div>
        </div>
      </div>
    </SuperAdminLayout>
  );
};
