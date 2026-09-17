import React, { useState } from 'react';
import { SuperAdminLayout } from '@/components/business/SuperAdminLayout';
import { Settings, Shield, Sparkles, CheckCircle2, Save } from 'lucide-react';

export const PlatformSettings: React.FC = () => {
  const [apiKeyStatus, setApiKeyStatus] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <SuperAdminLayout>
      <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Platform Settings & Integrations</h1>
          <p className="text-sm text-slate-400">Configure global AI models, default SLA policy templates, and platform security rules.</p>
        </div>

        {saved && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> Platform configurations saved successfully.
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-4">
              <Sparkles className="w-5 h-5 text-cyan-400" /> Gemini AI Engine Configuration
            </h3>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Gemini 2.5 Flash Triage Engine</p>
                  <p className="text-[11px] text-slate-400">Automated severity classification & complaint drafting</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  CONNECTED
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  System Super Admin Email
                </label>
                <input
                  type="email"
                  readOnly
                  value="jaysaner2006@gmail.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 font-mono text-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-lg transition"
              >
                <Save className="w-4 h-4" /> Save Platform Settings
              </button>
            </div>
          </div>
        </form>
      </div>
    </SuperAdminLayout>
  );
};
