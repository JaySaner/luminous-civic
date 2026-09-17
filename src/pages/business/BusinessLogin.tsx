import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useBusinessContext } from '@/components/business/BusinessContext';
import { Building2, Shield, Lock, Mail, ArrowRight, Sparkles, Loader2, Globe, KeyRound } from 'lucide-react';

export const BusinessLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login, loginGoogle, loginDemoAdmin } = useBusinessContext();

  const [email, setEmail] = useState('jaysaner2006@gmail.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email.trim(), password);
      if (email.trim().toLowerCase() === 'jaysaner2006@gmail.com') {
        navigate('/super-admin/dashboard');
      } else {
        navigate('/business/dashboard');
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err.message || 'Invalid credentials. You can also sign in with Google or use Quick Access below.');
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
      console.error("Google sign-in error:", err);
      setError(err.message || 'Google sign-in failed. Try Quick Access mode below.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleQuickDemoAdmin = () => {
    loginDemoAdmin();
    navigate('/super-admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-6 relative overflow-hidden font-sans selection:bg-blue-500 selection:text-white">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Brand Link */}
      <div className="absolute top-8 left-8">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900/60 px-4 py-2 rounded-full border border-slate-800 backdrop-blur-md transition">
          <Globe className="w-3.5 h-3.5 text-cyan-400" /> Back to Main Civic Portal
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
              <Sparkles className="w-3 h-3" /> Enterprise SaaS & Super Admin
            </span>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Business Portal</h1>
            <p className="text-sm text-slate-400 mt-1">Sign in to Super Admin Control Center or Business Workspace</p>
          </div>
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
                Account Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                <input
                  type="email"
                  placeholder="jaysaner2006@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                  type="password"
                  placeholder="Enter any password (e.g. Admin@123456)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-blue-950/60 transition active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Authenticating...
                </>
              ) : (
                <>
                  Sign In with Password <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-2">
            <div className="border-t border-slate-800 w-full" />
            <span className="bg-slate-900 px-3 text-[10px] font-bold uppercase text-slate-500 absolute">OR</span>
          </div>

          {/* Alternative Super Admin Auth Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-bold transition flex items-center justify-center gap-2"
            >
              {googleLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4 text-cyan-400" />}
              Sign In as Super Admin with Google
            </button>

            <button
              onClick={handleQuickDemoAdmin}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600/30 to-blue-600/30 hover:from-cyan-600/50 hover:to-blue-600/50 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg"
            >
              <KeyRound className="w-4 h-4 text-cyan-400" />
              ⚡ Instant Super Admin Access (1-Click)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
