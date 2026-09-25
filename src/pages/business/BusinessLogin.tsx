import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useBusinessContext } from '@/components/business/BusinessContext';
import { LCLogo } from '@/components/common/LCLogo';
import { Building2, Shield, Lock, Mail, ArrowRight, Sparkles, Loader2, Globe, Eye, EyeOff } from 'lucide-react';

export const BusinessLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login, loginGoogle } = useBusinessContext();

  const [activeTab, setActiveTab] = useState<'business' | 'super_admin'>('business');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTabChange = (tab: 'business' | 'super_admin') => {
    setActiveTab(tab);
    setError('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await login(email.trim(), password);
      if (res?.role === 'super_admin') {
        navigate('/super-admin/dashboard');
      } else {
        navigate('/business/dashboard');
      }
    } catch (err: any) {
      console.error('Login failed:', err);
      setError(err.message || 'Invalid email or password. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setGoogleLoading(true);
    try {
      await loginGoogle();
      navigate('/super-admin/dashboard');
    } catch (err: any) {
      console.error('Google sign-in error:', err);
      setError(err.message || 'Google sign-in failed. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-6 relative overflow-hidden font-sans selection:bg-blue-500 selection:text-white">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Brand Link */}
      <div className="absolute top-8 left-8 flex items-center gap-4">
        <LCLogo darkBg />
        <Link to="/" className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900/60 px-4 py-2 rounded-full border border-slate-800 backdrop-blur-md transition">
          <Globe className="w-3.5 h-3.5 text-cyan-400" /> Back to Main Landing
        </Link>
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex p-3.5 rounded-3xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-xl shadow-blue-950/50 border border-blue-400/30">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-2">
              <Sparkles className="w-3 h-3" /> Enterprise & Business Portal
            </span>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Portal Access</h1>
            <p className="text-sm text-slate-400 mt-1">Select your workspace role to sign in</p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
          <button
            type="button"
            onClick={() => handleTabChange('business')}
            className={`py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 ${
              activeTab === 'business'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" /> Business Workspace
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('super_admin')}
            className={`py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 ${
              activeTab === 'super_admin'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4" /> Super Admin
          </button>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900/70 border border-slate-800/90 rounded-3xl p-8 shadow-2xl backdrop-blur-2xl space-y-6">
          {error && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold leading-relaxed">
              {error}
            </div>
          )}



          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                {activeTab === 'business' ? 'Business Account Email' : 'Super Admin Email'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                <input
                  type="email"
                  id="login-email"
                  placeholder={activeTab === 'business' ? 'admin@yourbusiness.com' : 'superadmin@platform.com'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="login-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300 transition"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              id="login-submit-btn"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-blue-950/60 transition active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Authenticating...
                </>
              ) : (
                <>
                  Sign In to {activeTab === 'business' ? 'Business Workspace' : 'Super Admin'} <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Google Sign-In for Super Admin only */}
          {activeTab === 'super_admin' && (
            <>
              <div className="relative flex items-center justify-center my-2">
                <div className="border-t border-slate-800 w-full" />
                <span className="bg-slate-900 px-3 text-[10px] font-bold uppercase text-slate-500 absolute">OR</span>
              </div>
              <button
                type="button"
                id="google-login-btn"
                onClick={handleGoogleLogin}
                disabled={googleLoading}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-bold transition flex items-center justify-center gap-2"
              >
                {googleLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4 text-cyan-400" />}
                Sign In with Google (Super Admin)
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
