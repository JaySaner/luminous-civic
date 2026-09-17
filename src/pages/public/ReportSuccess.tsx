import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { CheckCircle2, Copy, Check, Search, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const ReportSuccess: React.FC = () => {
  const { trackingNumber } = useParams<{ trackingNumber: string }>();
  const [copied, setCopied] = useState(false);

  const trackUrl = `${window.location.origin}/portal/track?code=${trackingNumber}`;

  const handleCopy = () => {
    if (!trackingNumber) return;
    navigator.clipboard.writeText(trackingNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-6 font-sans selection:bg-cyan-500 selection:text-white">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 text-center animate-fade-in relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex p-4 rounded-3xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Report Logged Successfully
          </span>
          <h1 className="text-2xl font-extrabold text-white">Thank You for Your Feedback</h1>
          <p className="text-xs text-slate-400 mt-1">Your report has been received and routed to the assigned department for resolution.</p>
        </div>

        {/* Tracking Number Card */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Your Official Tracking Number</p>
          <div className="flex items-center justify-center gap-3">
            <span className="font-mono text-2xl font-extrabold text-cyan-400 tracking-wider">
              {trackingNumber}
            </span>
            <button
              onClick={handleCopy}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
              title="Copy tracking code"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-[10px] text-slate-500">Save this code to check resolution progress anytime.</p>
        </div>

        {/* QR Code for instant mobile tracking */}
        <div className="p-4 bg-white rounded-2xl inline-block shadow-lg mx-auto">
          <QRCodeSVG value={trackUrl} size={130} />
        </div>

        <div className="space-y-3 pt-2">
          <Link
            to={`/portal/track?code=${trackingNumber}`}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-cyan-950/50 transition active:scale-95 flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" /> Track Status Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
