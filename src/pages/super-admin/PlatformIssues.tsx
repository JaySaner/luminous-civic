import React, { useEffect, useState } from 'react';
import { SuperAdminLayout } from '@/components/business/SuperAdminLayout';
import { StatusBadge, PriorityBadge } from '@/components/business/StatusBadge';
import { SLATimer } from '@/components/business/SLATimer';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { BusinessIssue } from '@/lib/business/types';
import { AlertCircle, Search, ShieldAlert } from 'lucide-react';

export const PlatformIssues: React.FC = () => {
  const [issues, setIssues] = useState<BusinessIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadIssues() {
      try {
        const snap = await getDocs(collection(db, 'business_issues'));
        const list = snap.docs.map(d => d.data() as BusinessIssue);
        setIssues(list);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadIssues();
  }, []);

  const filtered = issues.filter(i => 
    i.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    i.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SuperAdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Global Issue Feed</h1>
          <p className="text-sm text-slate-400">System-wide monitoring feed of reports logged across all business tenants.</p>
        </div>

        <div className="flex items-center gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search tracking # or issue title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400">Loading global feed...</div>
        ) : (
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-4 px-5">Tracking Code</th>
                  <th className="py-4 px-5">Issue Title</th>
                  <th className="py-4 px-5">Tenant ID</th>
                  <th className="py-4 px-5">Priority</th>
                  <th className="py-4 px-5">Status</th>
                  <th className="py-4 px-5">SLA Deadline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filtered.map((issue) => (
                  <tr key={issue.id} className="hover:bg-slate-800/30 transition">
                    <td className="py-4 px-5 font-mono text-xs font-bold text-cyan-400">{issue.trackingNumber}</td>
                    <td className="py-4 px-5">
                      <div className="font-bold text-white text-sm">{issue.title}</div>
                      <div className="text-[11px] text-slate-400">{issue.category}</div>
                    </td>
                    <td className="py-4 px-5 font-mono text-xs text-slate-400">{issue.businessId}</td>
                    <td className="py-4 px-5"><PriorityBadge priority={issue.priority} /></td>
                    <td className="py-4 px-5"><StatusBadge status={issue.status} /></td>
                    <td className="py-4 px-5"><SLATimer deadline={issue.slaDeadline} status={issue.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </SuperAdminLayout>
  );
};
