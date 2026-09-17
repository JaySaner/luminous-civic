import React, { useState, useEffect } from 'react';
import { BusinessLayout } from '@/components/business/BusinessLayout';
import { useBusinessContext } from '@/components/business/BusinessContext';
import { updateBusiness } from '@/lib/business/businessDb';
import { fileToBase64 } from '@/lib/business/businessStorage';
import { Settings, Shield, Clock, Upload, Save, CheckCircle2, Loader2, Palette } from 'lucide-react';

export const BusinessSettings: React.FC = () => {
  const { business, refreshBusiness } = useBusinessContext();

  const [name, setName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#2563eb');
  const [accentColor, setAccentColor] = useState('#06b6d4');

  // SLA
  const [lowHours, setLowHours] = useState(48);
  const [medHours, setMedHours] = useState(24);
  const [highHours, setHighHours] = useState(12);
  const [critHours, setCritHours] = useState(4);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (business) {
      setName(business.name);
      setLogoUrl(business.logoUrl || '');
      setPrimaryColor(business.branding?.primaryColor || '#2563eb');
      setAccentColor(business.branding?.accentColor || '#06b6d4');
      if (business.slaConfig) {
        setLowHours(business.slaConfig.resolutionHoursLow || 48);
        setMedHours(business.slaConfig.resolutionHoursMedium || 24);
        setHighHours(business.slaConfig.resolutionHoursHigh || 12);
        setCritHours(business.slaConfig.resolutionHoursCritical || 4);
      }
    }
  }, [business]);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const b64 = await fileToBase64(e.target.files[0]);
      setLogoUrl(b64);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!business?.id) return;
    setSaving(true);
    setMessage('');

    try {
      await updateBusiness(business.id, {
        name,
        logoUrl: logoUrl || undefined,
        branding: { primaryColor, accentColor },
        slaConfig: {
          resolutionHoursLow: Number(lowHours),
          resolutionHoursMedium: Number(medHours),
          resolutionHoursHigh: Number(highHours),
          resolutionHoursCritical: Number(critHours),
          autoEscalate: true
        }
      });
      await refreshBusiness();
      setMessage('Business settings & SLA configuration saved successfully.');
    } catch (err: any) {
      console.error(err);
      setMessage('Error saving settings: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <BusinessLayout>
      <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Business & SLA Settings</h1>
          <p className="text-sm text-slate-400">Configure your business branding, SLA targets, and portal theme preferences.</p>
        </div>

        {message && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> {message}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-8">
          {/* Section 1: Business Identity & Branding */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800/80 pb-4">
              <Palette className="w-5 h-5 text-blue-400" /> Branding & Visual Theme
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Business / Brand Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Brand Logo
                </label>
                <div className="flex items-center gap-4">
                  {logoUrl ? (
                    <img src={logoUrl} alt="Logo" className="w-14 h-14 rounded-2xl object-cover border border-slate-700" />
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-dashed border-slate-800 flex items-center justify-center text-slate-500">
                      <Upload className="w-6 h-6" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-blue-400 hover:file:bg-slate-700 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Primary Theme Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer p-1"
                  />
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Accent Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer p-1"
                  />
                  <input
                    type="text"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: SLA Deadlines */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800/80 pb-4">
              <Clock className="w-5 h-5 text-amber-400" /> Service Level Agreement (SLA) Targets
            </h3>
            <p className="text-xs text-slate-400">Set maximum allowed hours for resolution based on priority levels.</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Low Priority</label>
                <input
                  type="number"
                  value={lowHours}
                  onChange={(e) => setLowHours(Number(e.target.value))}
                  required
                  className="w-full bg-transparent text-white font-bold text-xl focus:outline-none"
                />
                <span className="text-xs text-slate-500 font-medium">Hours to resolve</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <label className="block text-xs font-bold text-blue-400 uppercase mb-1">Medium Priority</label>
                <input
                  type="number"
                  value={medHours}
                  onChange={(e) => setMedHours(Number(e.target.value))}
                  required
                  className="w-full bg-transparent text-white font-bold text-xl focus:outline-none"
                />
                <span className="text-xs text-slate-500 font-medium">Hours to resolve</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <label className="block text-xs font-bold text-amber-400 uppercase mb-1">High Priority</label>
                <input
                  type="number"
                  value={highHours}
                  onChange={(e) => setHighHours(Number(e.target.value))}
                  required
                  className="w-full bg-transparent text-white font-bold text-xl focus:outline-none"
                />
                <span className="text-xs text-slate-500 font-medium">Hours to resolve</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <label className="block text-xs font-bold text-rose-400 uppercase mb-1">Critical Priority</label>
                <input
                  type="number"
                  value={critHours}
                  onChange={(e) => setCritHours(Number(e.target.value))}
                  required
                  className="w-full bg-transparent text-white font-bold text-xl focus:outline-none"
                />
                <span className="text-xs text-slate-500 font-medium">Hours to resolve</span>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-blue-950/50 transition active:scale-95 disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} Save Settings
            </button>
          </div>
        </form>
      </div>
    </BusinessLayout>
  );
};
