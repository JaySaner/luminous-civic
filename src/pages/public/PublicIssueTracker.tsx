import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { StatusBadge, PriorityBadge } from '@/components/business/StatusBadge';
import { TimelineVertical } from '@/components/business/TimelineVertical';
import { getReportByTrackingNumber, getIssueTimeline, getBusiness } from '@/lib/business/businessDb';
import { formatSLARemainingTime } from '@/lib/business/slaEngine';
import type { BusinessIssue, IssueTimelineEvent, Business } from '@/lib/business/types';
import { Search, Clock, ShieldAlert, CheckCircle2, Building2, Sparkles, ArrowLeft, Loader2 } from 'lucide-react';

export const PublicIssueTracker: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCode = searchParams.get('code') || '';

  const [trackingNumber, setTrackingNumber] = useState(initialCode);
  const [issue, setIssue] = useState<BusinessIssue | null>(null);
  const [timeline, setTimeline] = useState<IssueTimelineEvent[]>([]);
  const [business, setBusiness] = useState<Business | null>(null);

  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialCode) {
      handleSearch(initialCode);
    }
  }, [initialCode]);

  async function handleSearch(codeToSearch: string) {
    if (!codeToSearch.trim()) return;
    setLoading(true);
    setError('');
    setSearched(true);

    try {
      const foundIssue = await getReportByTrackingNumber(codeToSearch.trim());
      if (foundIssue) {
        setIssue(foundIssue);
        const events = await getIssueTimeline(foundIssue.id);
        setTimeline(events);
        const b = await getBusiness(foundIssue.businessId);
        setBusiness(b);
      } else {
        setIssue(null);
        setError(`No report found for tracking number "${codeToSearch}". Please double check your code.`);
      }
    } catch (e: any) {
      console.error(e);
      setError('Error fetching report details. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(trackingNumber);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-white pb-16">
      {/* Top Header */}
      <header className="bg-slate-900/90 border-b border-slate-800/80 backdrop-blur-xl px-6 py-6 sticky top-0 z-30 shadow-xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white font-bold shadow-md">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-white">Public Issue Tracker</h1>
              <p className="text-xs text-slate-400">Luminous Civic Resolution Portal</p>
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto mt-8 px-6 space-y-8 animate-fade-in">
        {/* Search Bar */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-xl backdrop-blur-xl space-y-4">
          <h2 className="text-xl font-extrabold text-white">Track Your Report Status</h2>
          <p className="text-xs text-slate-400">Enter your unique 10-character tracking code (e.g. <code className="text-cyan-400">LUM-26-X89AB</code>):</p>

          <form onSubmit={onFormSubmit} className="flex gap-3">
            <input
              type="text"
              placeholder="e.g. LUM-26-AB123"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 font-mono text-sm uppercase font-bold focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg transition flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />} Search
            </button>
          </form>

          {error && <p className="text-xs text-rose-400 font-medium">{error}</p>}
        </div>

        {/* Issue Details View */}
        {issue && (
          <div className="space-y-6">
            {/* Status Header Card */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-xl backdrop-blur-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
                <div>
                  <span className="text-[11px] font-mono text-cyan-400 font-bold">TRACKING #: {issue.trackingNumber}</span>
                  <h2 className="text-xl font-extrabold text-white mt-1">{issue.title}</h2>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">Organization: {business?.name || 'Business Tenant'}</p>
                </div>
                <div className="flex items-center gap-3">
                  <PriorityBadge priority={issue.priority} />
                  <StatusBadge status={issue.status} />
                </div>
              </div>

              {/* SLA Target Banner */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <div>
                    <p className="text-xs font-bold text-white">Resolution SLA Deadline</p>
                    <p className="text-[11px] text-slate-400">{new Date(issue.slaDeadline).toLocaleString()}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${issue.slaEscalated ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'}`}>
                  {formatSLARemainingTime(issue.slaDeadline, issue.status)}
                </span>
              </div>

              {/* Issue Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Report Description</h4>
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
                      <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800/60">
                        {entries.map(([key, val]) => {
                          const formattedKey = key
                            .replace(/^f_/, '')
                            .replace(/_/g, ' ')
                            .replace(/\b\w/g, l => l.toUpperCase());

                          const displayVal = typeof val === 'object' ? JSON.stringify(val) : String(val);

                          return (
                            <div key={key} className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-slate-800/40 pb-1.5 last:border-b-0">
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
                    <p className="text-sm text-slate-200 bg-slate-950 p-4 rounded-2xl border border-slate-800/60 leading-relaxed whitespace-pre-wrap">
                      {cleanText}
                    </p>
                  );
                })()}
              </div>

              {/* Attached Evidence Photos */}
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
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Submitted Photo Evidence</h4>
                    <div className="flex items-center gap-3 overflow-x-auto pb-2">
                      {images.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={`Evidence ${i + 1}`}
                          className="w-28 h-28 rounded-2xl object-cover border border-slate-700 shadow-md cursor-pointer hover:scale-105 transition"
                          onClick={() => window.open(img, '_blank')}
                        />
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* AI Analysis Summary */}
              {issue.aiAnalysis && (
                <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-800/30 space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <h4 className="text-xs font-bold text-cyan-400 uppercase">AI Automated Triage Summary</h4>
                  </div>
                  <p className="text-xs text-slate-300">{issue.aiAnalysis.summary}</p>
                  <p className="text-[11px] text-slate-400">Suggested Action: {issue.aiAnalysis.suggestedAction}</p>
                </div>
              )}
            </div>

            {/* Resolution Progress Timeline */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-xl backdrop-blur-xl space-y-6">
              <h3 className="text-base font-bold text-white">Live Action History Timeline</h3>
              <TimelineVertical events={timeline} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
