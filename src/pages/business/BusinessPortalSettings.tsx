import React, { useState } from 'react';
import { BusinessLayout } from '@/components/business/BusinessLayout';
import { useBusinessContext } from '@/components/business/BusinessContext';
import { QRCodeGenerator } from '@/components/business/QRCodeGenerator';
import { QrCode, Copy, Check, Globe, Code, Sparkles, ExternalLink } from 'lucide-react';

export const BusinessPortalSettings: React.FC = () => {
  const { business } = useBusinessContext();
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  const portalUrl = business?.slug ? `${window.location.origin}/portal/${business.slug}` : '';
  const embedCode = `<iframe src="${portalUrl}" width="100%" height="700 font-bold" frameborder="0" style="border:0; border-radius:16px;"></iframe>`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(portalUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(embedCode);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2000);
  };

  return (
    <BusinessLayout>
      <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
        <div>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Public Engagement Tools
          </span>
          <h1 className="text-2xl font-extrabold text-white">Public Portal & QR Settings</h1>
          <p className="text-sm text-slate-400">Share your custom reporting portal link, print QR posters, or embed the form into your website.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: QR Generator */}
          {portalUrl && (
            <QRCodeGenerator
              url={portalUrl}
              businessName={business?.name || 'Business'}
              logoUrl={business?.logoUrl}
            />
          )}

          {/* Right Column: Links & Web Embed */}
          <div className="space-y-6">
            {/* Direct Portal Link */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 shadow-xl backdrop-blur-xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-cyan-400" /> Direct Portal Link
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Share this URL directly with your customers, staff, or citizens to submit issues and track status.
              </p>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={portalUrl}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 font-mono text-xs focus:outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1.5"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  {copiedLink ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Web iFrame Embed Widget */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 shadow-xl backdrop-blur-xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-400" /> Website Embed Code (iFrame)
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Paste this HTML snippet into your business website to seamlessly render the issue reporting portal.
              </p>

              <div className="space-y-3">
                <textarea
                  readOnly
                  rows={3}
                  value={embedCode}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs focus:outline-none select-all"
                />
                <button
                  onClick={handleCopyEmbed}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg transition flex items-center justify-center gap-2"
                >
                  {copiedEmbed ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copiedEmbed ? 'Embed Code Copied to Clipboard!' : 'Copy Website Embed Snippet'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BusinessLayout>
  );
};
