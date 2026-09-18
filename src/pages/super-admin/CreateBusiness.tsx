import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SuperAdminLayout } from '@/components/business/SuperAdminLayout';
import { createBusiness, createDepartment, createLocation } from '@/lib/business/businessDb';
import { registerBusinessUser } from '@/lib/business/businessAuth';
import { fileToBase64 } from '@/lib/business/businessStorage';
import { INDUSTRY_PRESETS, DEFAULT_SLA_CONFIG } from '@/lib/business/types';
import { 
  Building2, 
  UserPlus, 
  ShieldCheck, 
  Upload, 
  CheckCircle2, 
  ArrowLeft,
  Sparkles,
  Loader2
} from 'lucide-react';

export const CreateBusiness: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [industryType, setIndustryType] = useState('Hospitality & Hotels');
  const [subscriptionPlan, setSubscriptionPlan] = useState<'Starter' | 'Pro' | 'Enterprise'>('Pro');
  const [logoBase64, setLogoBase64] = useState<string>('');
  
  // Admin credentials
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  // Auto slug generation
  const handleNameChange = (val: string) => {
    setName(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const b64 = await fileToBase64(e.target.files[0]);
      setLogoBase64(b64);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !slug || !adminEmail || !adminPassword || !adminName) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      // 1. Create Business Document
      const biz = await createBusiness({
        name,
        slug,
        industryType,
        subscriptionPlan,
        status: 'active',
        logoUrl: logoBase64 || undefined,
        departments: [
          { id: 'dept_general', name: 'General Support', code: 'GEN' },
          { id: 'dept_ops', name: 'Operations & Maintenance', code: 'OPS' }
        ],
        locations: [
          { id: 'loc_main', name: 'Headquarters / Main Facility' }
        ],
        slaConfig: DEFAULT_SLA_CONFIG
      });

      // Ensure businessId field matches id for cross-reference lookups
      if (biz.id && !(biz as any).businessId) {
        await import('@/lib/business/businessDb').then(({ updateBusiness }) =>
          updateBusiness(biz.id, { ...(biz as any), businessId: biz.id })
        );
      }

      // 2. Create Initial Default Departments & Locations in sub-collections
      await createDepartment({ businessId: biz.id, name: 'Customer Service', code: 'CS' });
      await createDepartment({ businessId: biz.id, name: 'Maintenance & Repairs', code: 'MAINT' });
      await createLocation({ businessId: biz.id, name: 'Main Campus', address: 'Primary Business Facility' });

      // 3. Register Business Admin User account
      await registerBusinessUser(
        adminEmail,
        adminPassword,
        adminName,
        biz.id,
        'admin'
      );

      navigate('/super-admin/businesses');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to create business tenant. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SuperAdminLayout>
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/super-admin/businesses')}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Tenant Onboarding Wizard
            </span>
            <h1 className="text-2xl font-extrabold text-white">Onboard New Business / Industry</h1>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm font-medium">
            {error}
          </div>
        )}

        {/* Onboarding Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Business Profile */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800/80 pb-4">
              <Building2 className="w-5 h-5 text-cyan-400" /> Organization Profile
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Business Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Grand Apex Resort & Spa"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Public Portal Slug *
                </label>
                <div className="flex items-center rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
                  <span className="px-3 text-xs text-slate-500 font-mono">/portal/</span>
                  <input
                    type="text"
                    placeholder="grand-apex"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    required
                    className="w-full py-3 pr-4 bg-transparent text-cyan-400 text-sm font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Industry Category *
                </label>
                <select
                  value={industryType}
                  onChange={(e) => setIndustryType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
                >
                  {INDUSTRY_PRESETS.map((ind) => (
                    <option key={ind.name} value={ind.name}>
                      {ind.name} ({ind.description})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Subscription Tier *
                </label>
                <select
                  value={subscriptionPlan}
                  onChange={(e) => setSubscriptionPlan(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
                >
                  <option value="Starter">Starter (Basic Portal)</option>
                  <option value="Pro">Pro (Custom Forms & SLAs)</option>
                  <option value="Enterprise">Enterprise (Full AI & Analytics)</option>
                </select>
              </div>
            </div>

            {/* Logo Upload */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Business Logo / Branding Image
              </label>
              <div className="flex items-center gap-4">
                {logoBase64 ? (
                  <img src={logoBase64} alt="Logo preview" className="w-16 h-16 rounded-2xl object-cover border border-slate-700" />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-dashed border-slate-800 flex items-center justify-center text-slate-500">
                    <Upload className="w-6 h-6" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-cyan-400 hover:file:bg-slate-700 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Admin Account Provisioning */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800/80 pb-4">
              <UserPlus className="w-5 h-5 text-cyan-400" /> Initial Business Admin Account
            </h3>
            <p className="text-xs text-slate-400">These credentials will allow the business administrator to sign into their portal dashboard.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Admin Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sarah Jenkins"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Admin Email Address *
                </label>
                <input
                  type="email"
                  placeholder="admin@grandapex.com"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Set Initial Password *
                </label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/super-admin/businesses')}
              className="px-6 py-3 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 text-sm font-semibold hover:bg-slate-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-bold shadow-lg shadow-cyan-950/50 transition active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Provisioning Tenant...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" /> Complete Onboarding
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </SuperAdminLayout>
  );
};
